import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateQuote } from '../../src/lib/quote.ts';
import { commercialPaths, getReleaseState } from '../../src/config/release.mjs';
import { fixture } from '../fixture.ts';

test('normaliza y minimiza el requerimiento', () => {
  const outcome = validateQuote({ ...fixture, email: ' COMPRAS@EXAMPLE.TEST ', source: 'verduras', comments: '   ', district: '  SAN  MARTIN DE PORRES ' });
  assert.equal(outcome.data?.email, 'compras@example.test');
  assert.equal(outcome.data?.comments, null);
  assert.equal(outcome.data?.sourcePage, '/verduras-al-por-mayor/');
  assert.equal(outcome.data?.district, 'San Martín de Porres');
  assert.equal(Object.hasOwn(outcome.data!, 'turnstileToken'), false);
});

test('rechaza tipos, longitudes, enums inválidos y campos ajenos', () => {
  assert.equal(validateQuote({ ...fixture, website: 'campo automatizado' }).data, undefined);
  assert.equal(validateQuote({ ...fixture, ruc: '000' }).data, undefined);
  assert.equal(validateQuote(null).data, undefined);
  assert.equal(validateQuote([]).data, undefined);
  const { errors } = validateQuote({
    ...fixture, district: '12', frequency: 'invalid', productsAndQuantities: 'v', email: 'mal',
    locationCount: null, privacyAcknowledged: false, phone: '()-   ', source: 'unknown', turnstileToken: '',
  });
  assert.deepEqual(new Set(Object.keys(errors)), new Set([
    'district', 'frequency', 'productsAndQuantities', 'email', 'locationCount', 'privacyAcknowledged', 'phone',
    'source', 'turnstileToken',
  ]));
});

test('la lista de indexación solo admite páginas comerciales con aprobaciones y dominio', () => {
  const config = {
    origin: 'https://verificacion-veganfresh.example.pe', commercialApproval: 'fixture', legalApproval: 'fixture',
    technicalApproval: 'fixture', privacyNoticeVersion: 'fixture',
    indexablePaths: [...commercialPaths, '/cotizar/', '/privacidad/', '/proveedor-hoteles/'],
  };
  assert.deepEqual(getReleaseState(config, true).indexablePaths, commercialPaths);
  assert.deepEqual(getReleaseState(config, false).indexablePaths, []);
  assert.deepEqual(getReleaseState({ ...config, origin: 'https://preview.workers.dev' }, true).indexablePaths, []);
  assert.deepEqual(getReleaseState({ ...config, legalApproval: '' }, true).indexablePaths, []);
});
