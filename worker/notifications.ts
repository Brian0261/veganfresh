import type { Env } from './env.ts';

const maxAttempts = 4;
const lease = 90;
const maxAge = 23 * 3600;
const backoffs = [300, 1800, 7200];
const seconds = () => Math.floor(Date.now() / 1000);

export async function notifyLead(env: Env, id: string, dryRun: boolean, send: typeof fetch = fetch) {
  const now = seconds();
  const claim = crypto.randomUUID();
  const claimed = await env.DB.prepare(`
    UPDATE leads
    SET notification_attempts = notification_attempts + 1, notification_next_at = ?, notification_claim = ?
    WHERE id = ? AND notification_status IN ('pending', 'failed')
      AND notification_attempts < ? AND notification_next_at <= ? AND created_at > ?
    RETURNING notification_attempts AS attempt`
  ).bind(now + lease, claim, id, maxAttempts, now, now - maxAge).first<{ attempt: number }>();
  if (!claimed) return;

  let status = 'sent';
  let errorCategory: string | null = null;
  try {
    if (!dryRun) {
      const response = await send('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': id,
        },
        body: JSON.stringify({
          from: env.LEAD_NOTIFICATION_SENDER,
          to: [env.LEAD_NOTIFICATION_EMAIL],
          subject: 'Nueva solicitud mayorista en VEGANFRESH',
          text: `Se registró la solicitud ${id}. Consulta la base de cotizaciones mediante el acceso interno autorizado.`,
        }),
        signal: AbortSignal.timeout(6000),
      });
      if (!response.ok) {
        status = 'failed';
        errorCategory = 'provider_status';
      }
      await response.body?.cancel();
    }
  } catch {
    status = 'failed';
    errorCategory = 'provider_unavailable';
  }

  const finished = seconds();
  await env.DB.batch([
    env.DB.prepare(`
      INSERT INTO notification_attempts (lead_id, attempt, status, occurred_at, error_category)
      SELECT id, ?, ?, ?, ? FROM leads WHERE id = ? AND notification_claim = ?
    `).bind(claimed.attempt, status, finished, errorCategory, id, claim),
    env.DB.prepare(`
      UPDATE leads SET notification_status = ?, notification_next_at = ?, notification_claim = NULL, updated_at = ?
      WHERE id = ? AND notification_claim = ?
    `).bind(status, finished + (backoffs[claimed.attempt - 1] ?? 0), finished, id, claim),
  ]);
}

export async function processNotifications(env: Env) {
  const now = seconds();
  const pending = await env.DB.prepare(`
    SELECT id FROM leads WHERE notification_status IN ('pending', 'failed') AND notification_next_at <= ?
      AND notification_attempts < ? AND created_at > ? ORDER BY notification_next_at LIMIT 20
  `).bind(now, maxAttempts, now - maxAge).all<{ id: string }>();
  for (const { id } of pending.results) {
    try {
      await notifyLead(env, id, false);
    } catch {
      // El próximo ciclo puede reclamar el aviso al expirar la reserva.
    }
  }
  const expireBefore = now - Number(env.LEAD_RETENTION_DAYS) * 86400;
  await env.DB.prepare('UPDATE leads SET challenge_hash = NULL WHERE challenge_hash IS NOT NULL AND created_at < ?')
    .bind(now - 600).run();
  await env.DB.prepare('DELETE FROM leads WHERE id IN (SELECT id FROM leads WHERE created_at < ? ORDER BY created_at LIMIT 100)')
    .bind(expireBefore).run();
}
