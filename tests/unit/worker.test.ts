import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { getPlatformProxy } from 'wrangler';
import { quoteApi, verifyTurnstile } from '../../worker/api.ts';
import { notifyLead, processNotifications } from '../../worker/notifications.ts';
import type { Env } from '../../worker/env.ts';
import { fixture } from '../fixture.ts';

const origin = 'http://localhost';
const request = (data = fixture, key = crypto.randomUUID(), headers: Record<string, string> = {}) =>
  new Request(origin + '/api/cotizaciones', {
    method: 'POST', body: JSON.stringify(data),
    headers: { Origin: origin, 'Content-Type': 'application/json', 'Idempotency-Key': key, ...headers },
  });
const noSideEffects = { waitUntil() {} };

test('cierre seguro, origen, contenido y verificación Siteverify simulada', async () => {
  assert.equal((await quoteApi(request(), {} as Env, noSideEffects)).status, 503);
  assert.equal((await quoteApi(request(), { VEGANFRESH_MODE: 'live' } as Env, noSideEffects)).status, 503);
  const demo = { VEGANFRESH_MODE: 'demo' } as Env;
  assert.equal((await quoteApi(request(fixture, crypto.randomUUID(), { Origin: 'https://externo.example.test' }), demo, noSideEffects)).status, 403);
  assert.equal((await quoteApi(request(fixture, crypto.randomUUID(), { 'Content-Type': 'text/plain' }), demo, noSideEffects)).status, 415);
  const challengeKey = crypto.randomUUID();
  const verify = (body: object) => verifyTurnstile('fixture', {} as Env, 'example.test', challengeKey, async (_url, init) => {
    const sent = JSON.parse(String(init?.body));
    assert.equal(sent.idempotency_key, challengeKey);
    assert.equal(sent.response, 'fixture');
    return Response.json(body);
  });
  assert.equal(await verify({ success: true, hostname: 'example.test', action: 'quote' }), true);
  assert.equal(await verify({ success: true, hostname: 'another.example.test', action: 'quote' }), false);
  assert.equal(await verify({ success: true, hostname: 'example.test', action: 'another' }), false);
  assert.equal(await verify({ success: false, 'error-codes': ['timeout-or-duplicate'] }), false);
  await assert.rejects(verify({ success: false, 'error-codes': ['internal-error'] }));
});

test('D1 local: inserción, concurrencia, fallos, reintentos y retención', async () => {
  const platform = await getPlatformProxy<Env>({ persist: false });
  const setup = await readFile(new URL('../../migrations/0001_leads.sql', import.meta.url), 'utf8');
  try {
    for (const sql of setup.split(';').map(query => query.trim()).filter(Boolean)) {
      await platform.env.DB.prepare(sql).run();
    }
    const env = { ...platform.env, VEGANFRESH_MODE: 'demo',
      QUOTE_LIMITER: { limit: async () => ({ success: true }) } };
    const key = crypto.randomUUID();
    const data = { ...fixture, productsAndQuantities: "Texto de prueba: <script> y comillas ' como texto." };
    const pending: Promise<unknown>[] = [];
    const context = { waitUntil(task: Promise<unknown>) { pending.push(task); } };
    let noticeReference: string | null = null;
    const failNotice: typeof notifyLead = (bindings, id) => notifyLead(bindings, id, false, async (_url, init) => {
      noticeReference = new Headers(init?.headers).get('Idempotency-Key');
      assert.equal(String(init?.body).includes(fixture.email), false);
      return new Response('', { status: 503 });
    });
    const results = await Promise.all([
      quoteApi(request(data, key), env, context, failNotice),
      quoteApi(request(data, key), env, context, failNotice),
    ]);
    assert.deepEqual(results.map(result => result.status).sort(), [200, 201]);
    const payloads = await Promise.all(results.map(response => response.json()));
    assert.equal(payloads[0].reference, payloads[1].reference);
    assert.equal(payloads[0].simulated, true);
    assert.match(payloads[0].reference, /^VF-[a-f0-9-]{36}$/);
    const id = payloads[0].reference;
    const lead = await env.DB.prepare('SELECT * FROM leads').first();
    assert.equal(lead?.products_and_quantities, data.productsAndQuantities);
    assert.equal(await env.DB.prepare('SELECT COUNT(*) AS n FROM leads').first('n'), 1);
    assert.equal(JSON.stringify(lead).includes(fixture.turnstileToken), false);
    assert.equal((await quoteApi(request({ ...data, locationCount: 3 }, key), env, noSideEffects)).status, 409);
    assert.equal((await quoteApi(request({ ...fixture, turnstileToken: 'local-test-fail' }), env, noSideEffects)).status, 422);
    assert.equal((await quoteApi(request(), { ...env, DB: {} as Env['DB'] }, noSideEffects)).status, 503);
    const limited = await quoteApi(request(), { ...env, QUOTE_LIMITER: { limit: async () => ({ success: false }) } }, noSideEffects);
    assert.equal(limited.status, 429);
    assert.equal(limited.headers.get('Retry-After'), '60');
    assert.equal(await env.DB.prepare('SELECT COUNT(*) AS n FROM leads').first('n'), 1);

    assert.equal(pending.length, 1);
    await Promise.all(pending);
    assert.equal(noticeReference, id);
    const failed = await env.DB.prepare('SELECT notification_status, notification_next_at FROM leads WHERE id = ?').bind(id).first();
    assert.equal(failed?.notification_status, 'failed');
    assert.ok(Number(failed?.notification_next_at) > Date.now() / 1000);
    await env.DB.prepare('UPDATE leads SET notification_next_at = 0 WHERE id = ?').bind(id).run();
    let notices = 0;
    const send = async () => { notices += 1; return Response.json({ id: 'fixture' }); };
    await Promise.all([notifyLead(env, id, false, send), notifyLead(env, id, false, send)]);
    assert.equal(notices, 1);
    const attempts = await env.DB.prepare('SELECT status FROM notification_attempts ORDER BY attempt').all();
    assert.deepEqual(attempts.results, [{ status: 'failed' }, { status: 'sent' }]);
    assert.equal(await env.DB.prepare('SELECT notification_status FROM leads WHERE id = ?').bind(id).first('notification_status'), 'sent');
    await env.DB.prepare('UPDATE leads SET created_at = 1 WHERE id = ?').bind(id).run();
    await processNotifications({ ...env, LEAD_RETENTION_DAYS: '1' });
    assert.equal(await env.DB.prepare('SELECT COUNT(*) FROM leads').first('COUNT(*)'), 0);
    assert.equal(await env.DB.prepare('SELECT COUNT(*) FROM notification_attempts').first('COUNT(*)'), 0);
  } finally {
    await platform.dispose();
  }
});
