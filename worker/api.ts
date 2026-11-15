import { validateQuote } from '../src/lib/quote.ts';
import { release, siteOrigin } from '../src/config/release.mjs';
import { isDemo, liveConfigured, type Env } from './env.ts';
import { notifyLead } from './notifications.ts';

const maxBytes = 16 * 1024;
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const utf8 = new TextEncoder();
type SavedLead = { id: string; payload_hash: string };

function json(status: number, body: object, headers?: HeadersInit) {
  const response = Response.json(body, { status, headers });
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('X-Robots-Tag', 'noindex');
  return response;
}

function error(status: number, code: string, headers?: HeadersInit) {
  return json(status, { ok: false, code }, headers);
}

async function readJson(request: Request) {
  if (Number(request.headers.get('Content-Length')) > maxBytes) return { error: error(413, 'too_large') };
  if (!request.body) return { error: error(400, 'invalid_json') };
  const reader = request.body.getReader();
  const buffer = new Uint8Array(maxBytes);
  let size = 0;
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      if (size + value.length > maxBytes) {
        void reader.cancel().catch(() => {});
        return { error: error(413, 'too_large') };
      }
      buffer.set(value, size);
      size += value.length;
    }
    return { value: JSON.parse(new TextDecoder('utf-8', { fatal: true, ignoreBOM: false }).decode(buffer.subarray(0, size))) as unknown };
  } catch {
    return { error: error(400, 'invalid_json') };
  } finally {
    reader.releaseLock();
  }
}

async function fingerprint(key: CryptoKey, kind: string, value: string) {
  const bytes = await crypto.subtle.sign('HMAC', key, utf8.encode(`${kind}:${value}`));
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function verifyTurnstile(token: string, env: Env, hostname: string, challengeKey: string, send: typeof fetch = fetch) {
  const result = await send('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token, idempotency_key: challengeKey }),
    signal: AbortSignal.timeout(5000),
  });
  if (!result.ok) throw new Error('Siteverify unavailable');
  const body = await result.json<{ success?: boolean; hostname?: string; action?: string; 'error-codes'?: string[] }>();
  if (body['error-codes']?.some(code => ['internal-error', 'invalid-input-secret', 'missing-input-secret'].includes(code))) {
    throw new Error('Siteverify unavailable');
  }
  return body.success === true && body.hostname === hostname && body.action === 'quote';
}

function replay(saved: SavedLead, payloadHash: string, demo: boolean) {
  return saved.payload_hash === payloadHash
    ? json(200, { ok: true, reference: saved.id, simulated: demo })
    : error(409, 'idempotency_conflict');
}

export async function quoteApi(
  request: Request, env: Env, ctx: Pick<ExecutionContext, 'waitUntil'>, notify = notifyLead,
) {
  if (request.method !== 'POST') return error(405, 'method', { Allow: 'POST' });
  const url = new URL(request.url);
  const demo = isDemo(env, url);
  if (!demo && (!liveConfigured(env) || url.origin !== siteOrigin)) return error(503, 'unavailable');
  if (request.headers.get('Origin') !== url.origin || request.headers.get('Sec-Fetch-Site') === 'cross-site') {
    return error(403, 'origin');
  }
  if (request.headers.get('Content-Type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
    return error(415, 'content_type');
  }
  const idempotencyKey = request.headers.get('Idempotency-Key');
  if (!idempotencyKey || !uuid.test(idempotencyKey)) return error(400, 'idempotency_key');
  try {
    const key = await crypto.subtle.importKey('raw', utf8.encode(demo ? 'veganfresh-local-fixtures-only' : env.QUOTE_HMAC_SECRET!),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const ip = request.headers.get('CF-Connecting-IP');
    if (!demo && !ip) return error(503, 'unavailable');
    const clientBucket = await fingerprint(key, 'rate', demo ? 'loopback' : ip!);
    if (!(await env.QUOTE_LIMITER.limit({ key: clientBucket })).success) {
      return error(429, 'rate_limit', { 'Retry-After': '60' });
    }

    const parsed = await readJson(request);
    if (parsed.error) return parsed.error;
    const validated = validateQuote(parsed.value);
    if (!validated.data) return json(422, { ok: false, code: 'validation', fields: validated.errors });
    const { data, turnstileToken } = validated;
    const [idempotencyHash, payloadHash, challengeHash] = await Promise.all([
      fingerprint(key, 'idempotency', idempotencyKey.toLowerCase()),
      fingerprint(key, 'payload', JSON.stringify(data)),
      fingerprint(key, 'challenge', turnstileToken),
    ]);
    const db = env.DB.withSession('first-primary');
    const find = () => db.prepare('SELECT id, payload_hash FROM leads WHERE idempotency_hash = ?')
      .bind(idempotencyHash).first<SavedLead>();
    const existing = await find();
    if (existing) return replay(existing, payloadHash, demo);

    const verification = await fingerprint(key, 'siteverify', `${idempotencyKey.toLowerCase()}:${challengeHash}`);
    const challengeKey = `${verification.slice(0, 8)}-${verification.slice(8, 12)}-4${verification.slice(13, 16)}-a${verification.slice(17, 20)}-${verification.slice(20, 32)}`;
    const verified = demo ? turnstileToken === 'local-test-pass' : await verifyTurnstile(turnstileToken, env, url.hostname, challengeKey);
    if (!verified) {
      const raced = await find();
      return raced ? replay(raced, payloadHash, demo) : error(422, 'challenge');
    }

    const now = Math.floor(Date.now() / 1000);
    const id = `VF-${crypto.randomUUID()}`;
    const inserted = await db.prepare(`
      INSERT INTO leads (
        id, created_at, updated_at, company_name, contact_name, email, phone, business_type,
        district, products_and_quantities, frequency, location_count, comments, privacy_notice_version,
        source_page, idempotency_hash, payload_hash, challenge_hash, notification_next_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT DO NOTHING RETURNING id
    `).bind(
      id, now, now, data.companyName, data.contactName, data.email, data.phone, data.businessType,
      data.district, data.productsAndQuantities, data.frequency, data.locationCount, data.comments,
      demo ? 'simulacion-local' : release.privacyNoticeVersion, data.sourcePage, idempotencyHash, payloadHash,
      demo ? null : challengeHash, now,
    ).first<{ id: string }>();
    if (!inserted) {
      const raced = await find();
      if (raced) return replay(raced, payloadHash, demo);
      const used = !demo && await db.prepare('SELECT 1 FROM leads WHERE challenge_hash = ?').bind(challengeHash).first();
      return used ? error(422, 'challenge') : error(503, 'unavailable');
    }
    ctx.waitUntil(notify(env, id, demo).catch(() => {
      // La inserción confirmada conserva el aviso pendiente para el siguiente ciclo.
    }));
    return json(201, { ok: true, reference: id, simulated: demo });
  } catch {
    return error(503, 'unavailable');
  }
}
