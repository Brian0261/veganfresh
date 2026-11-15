import { releaseReady, siteOrigin } from '../src/config/release.mjs';

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  QUOTE_LIMITER: { limit(options: { key: string }): Promise<{ success: boolean }> };
  VEGANFRESH_MODE?: string;
  ALLOWED_ORIGIN?: string;
  TURNSTILE_SECRET_KEY?: string;
  QUOTE_HMAC_SECRET?: string;
  RESEND_API_KEY?: string;
  LEAD_NOTIFICATION_EMAIL?: string;
  LEAD_NOTIFICATION_SENDER?: string;
  LEAD_RETENTION_DAYS?: string;
}

export const isLocal = (url: URL) => ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
export const isDemo = (env: Env, url: URL) => env.VEGANFRESH_MODE === 'demo' && isLocal(url);
export const liveConfigured = (env: Env) => Boolean(
  releaseReady && siteOrigin && env.VEGANFRESH_MODE === 'live' && env.ALLOWED_ORIGIN === siteOrigin &&
  env.DB && env.QUOTE_LIMITER && env.TURNSTILE_SECRET_KEY &&
  env.QUOTE_HMAC_SECRET && env.QUOTE_HMAC_SECRET.length >= 32 &&
  env.RESEND_API_KEY && env.LEAD_NOTIFICATION_EMAIL && env.LEAD_NOTIFICATION_SENDER &&
  /^[1-9]\d{0,5}$/.test(env.LEAD_RETENTION_DAYS ?? ''),
);
