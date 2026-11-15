import { businessTypes, messages, sourcePages, validateQuote } from '../lib/quote';

type Turnstile = {
  render(target: string, options: Record<string, unknown>): string;
  reset(id: string): void;
};
type QuoteResponse = { ok?: boolean; reference?: string; fields?: Record<string, string>; code?: string };

const form = document.querySelector<HTMLFormElement>('.quote-form');
const fields = document.querySelector<HTMLFieldSetElement>('#quote-fields');
const button = form?.querySelector<HTMLButtonElement>('[type="submit"]');
const feedback = document.getElementById('quote-error');
const success = document.getElementById('quote-success');
const progress = document.getElementById('quote-progress');
const context = document.getElementById('quote-context');
const mode = form?.dataset.mode;
const localHosts = ['localhost', '127.0.0.1', '[::1]'];

if (form && fields && button && feedback && success && progress && context &&
    (mode === 'live' || (mode === 'demo' && localHosts.includes(location.hostname)))) {
  enableQuoteForm(form, fields, button, feedback, success, progress, context, mode === 'demo');
}

function enableQuoteForm(
  form: HTMLFormElement, fields: HTMLFieldSetElement, button: HTMLButtonElement, feedback: HTMLElement,
  success: HTMLElement, progress: HTMLElement, context: HTMLElement, demo: boolean,
) {
  let key = '';
  let snapshot = '';
  let token = demo ? 'local-test-pass' : '';
  let widget: string | undefined;
  let turnstile: Turnstile | undefined;
  let submitting = false;
  let received = false;
  let retryUntil = 0;
  const params = new URLSearchParams(location.search);
  const sourceCandidate = params.get('categoria') ?? params.get('origen') ?? '';
  const source = Object.hasOwn(sourcePages, sourceCandidate) ? sourceCandidate : '';

  if (source) {
    const messagesBySource: Record<string, string> = {
      frutas: 'Consulta por frutas.', verduras: 'Consulta por verduras.',
      productos: 'Consulta desde el catálogo.', restaurantes: 'Consulta para restaurantes.',
    };
    context.textContent = messagesBySource[source];
    context.hidden = false;
    if (source === 'restaurantes') {
      const businessType = form.elements.namedItem('businessType');
      if (businessType instanceof HTMLSelectElement) businessType.value = 'restaurant' satisfies keyof typeof businessTypes;
    }
  }
  fields.disabled = false;
  form.noValidate = true;

  const showErrors = (message: string, errors: Record<string, string> = {}) => {
    for (const [name, text] of Object.entries(errors)) {
      const field = form.elements.namedItem(name);
      if (field instanceof HTMLElement) field.setAttribute('aria-invalid', 'true');
      const hint = document.getElementById(`${name}-error`);
      if (hint && form.contains(hint)) {
        hint.textContent = text;
        hint.hidden = false;
      }
    }
    feedback.textContent = message;
    feedback.hidden = false;
    feedback.focus();
  };

  const resetErrors = () => {
    feedback.hidden = true;
    form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
    form.querySelectorAll<HTMLElement>('.field-error').forEach(hint => { hint.hidden = true; });
  };

  if (!demo) {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => {
      turnstile = (window as Window & { turnstile?: Turnstile }).turnstile;
      widget = turnstile?.render('#turnstile', {
        sitekey: form.dataset.sitekey,
        action: 'quote',
        size: document.getElementById('turnstile')!.clientWidth < 300 ? 'compact' : 'flexible',
        'response-field': false,
        callback: (value: string) => { token = value; },
        'expired-callback': () => { token = ''; },
        'error-callback': () => { token = ''; },
      });
    };
    script.onerror = () => showErrors(messages.challenge);
    document.head.append(script);
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting || received) return;
    resetErrors();
    if (Date.now() < retryUntil) return showErrors(messages.limited);

    const raw = Object.fromEntries(new FormData(form).entries());
    const data = {
      ...raw,
      locationCount: raw.locationCount === '' ? undefined : Number(raw.locationCount),
      privacyAcknowledged: raw.privacyAcknowledged === 'on',
      turnstileToken: token,
      source,
    };
    const result = validateQuote(data);
    if (!result.data) return showErrors(
      Object.keys(result.errors).length === 1 && result.errors.turnstileToken ? messages.challenge : messages.fields,
      result.errors,
    );

    const current = JSON.stringify(result.data);
    if (!key || current !== snapshot) key = crypto.randomUUID();
    snapshot = current;
    submitting = true;
    fields.disabled = true;
    progress.textContent = messages.submitting;
    button.textContent = messages.submitting;

    try {
      const response = await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(15000),
      });
      const body: QuoteResponse = await response.json();
      if ((response.status === 201 || response.status === 200) && body.ok &&
          body.reference && /^VF-[a-f0-9-]{36}$/.test(body.reference)) {
        received = true;
        const title = document.createElement('strong');
        title.textContent = demo ? 'Simulación guardada en la base local.' : messages.success;
        const reference = document.createElement('p');
        reference.textContent = `Código de referencia: ${body.reference}. Conserva este código si necesitas consultarnos.`;
        success.replaceChildren(title, reference);
        if (!demo) {
          const followUp = document.createElement('p');
          followUp.textContent = messages.followUp;
          success.append(followUp);
          document.dispatchEvent(new Event('quote_form_success'));
        }
        form.reset();
        fields.hidden = true;
        success.hidden = false;
        success.focus();
        return;
      }
      if (response.status === 422) {
        showErrors(body.code === 'challenge' ? messages.challenge : messages.fields, body.fields);
      } else if (response.status === 429) {
        const delay = Number(response.headers.get('Retry-After')) || 60;
        retryUntil = Date.now() + Math.min(120, Math.max(1, delay)) * 1000;
        showErrors(messages.limited);
      } else if (response.status === 409) {
        key = '';
        showErrors(messages.conflict);
      } else {
        showErrors(messages.unavailable);
      }
    } catch {
      showErrors(messages.unavailable);
    } finally {
      submitting = false;
      progress.textContent = '';
      fields.disabled = received;
      button.textContent = 'Volver a intentar';
      if (!received && widget !== undefined) {
        token = '';
        turnstile?.reset(widget);
      }
    }
  });
}
