import { indexablePaths, siteOrigin } from '../src/config/release.mjs';
import { robots, sitemap } from '../src/config/crawl.mjs';
import { quoteApi } from './api.ts';
import { isLocal, liveConfigured, type Env } from './env.ts';
import { processNotifications } from './notifications.ts';

const apiPath = '/api/cotizaciones';
const challengeOrigin = 'https://challenges.cloudflare.com';

function withHeaders(original: Response, path: string, live: boolean) {
  const response = new Response(original.body, original);
  const headers = response.headers;
  const challenge = live && path === '/cotizar/';
  headers.set('Content-Security-Policy', [
    "default-src 'self'", "base-uri 'none'", "object-src 'none'", "frame-ancestors 'none'", "form-action 'self'",
    `script-src 'self'${challenge ? ' ' + challengeOrigin : ''}`,
    `style-src 'self'${challenge ? " 'unsafe-inline'" : ''}`,
    "img-src 'self'", "font-src 'self'",
    `frame-src ${challenge ? challengeOrigin : "'none'"}`,
    "connect-src 'self'",
  ].join('; '));
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  if (live) headers.set('Strict-Transport-Security', 'max-age=31536000');
  if (!live || !indexablePaths.includes(path) || response.status !== 200) {
    headers.set('X-Robots-Tag', 'noindex, follow');
  }
  if (path.startsWith('/_astro/') && response.ok) headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  else if (path.startsWith('/api/') || path.startsWith('/cotizar') || path === '/robots.txt' || path === '/sitemap.xml') headers.set('Cache-Control', 'no-store');
  else if (headers.get('Content-Type')?.includes('text/html')) headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  return response;
}

function crawlFile(request: Request, path: string, live: boolean) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
  }
  const isSitemap = path === '/sitemap.xml';
  return new Response(request.method === 'HEAD' ? null : isSitemap ? sitemap(live) : robots(live), {
    headers: { 'Content-Type': isSitemap ? 'application/xml; charset=utf-8' : 'text/plain; charset=utf-8' },
  });
}

async function staticAssets(request: Request, env: Env, url: URL) {
  const { pathname: path } = url;
  if (path !== '/404' && path !== '/404/' && path !== '/404.html' && !path.startsWith('/api/')) {
    return env.ASSETS.fetch(request);
  }
  const fallback = await env.ASSETS.fetch(new Request(new URL('/__missing-page__', url), { method: request.method === 'HEAD' ? 'HEAD' : 'GET' }));
  return new Response(fallback.body, { status: 404, headers: fallback.headers });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const live = liveConfigured(env);
    if (live && siteOrigin && url.origin !== siteOrigin && !isLocal(url) &&
        (request.method === 'GET' || request.method === 'HEAD')) {
      const canonical = new URL(siteOrigin);
      canonical.pathname = url.pathname;
      canonical.search = url.search;
      return withHeaders(Response.redirect(canonical.href, 301), path, false);
    }
    const liveHost = live && url.origin === siteOrigin;
    if (path === '/robots.txt' || path === '/sitemap.xml') return withHeaders(crawlFile(request, path, liveHost), path, liveHost);
    const response = path === apiPath || path === apiPath + '/' ? await quoteApi(request, env, ctx)
      : await staticAssets(request, env, url);
    return withHeaders(response, path, liveHost);
  },
  async scheduled(_event, env) {
    if (liveConfigured(env)) await processNotifications(env);
  },
} satisfies ExportedHandler<Env>;
