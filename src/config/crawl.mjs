import { indexablePaths, siteOrigin } from './release.mjs';

/** @param {boolean} live */
export function robots(live) {
  return 'User-agent: *\nDisallow: /api/\n' +
    (live && siteOrigin && indexablePaths.length ? `Sitemap: ${siteOrigin}/sitemap.xml\n` : '');
}

/** @param {boolean} live */
export function sitemap(live) {
  const origin = siteOrigin;
  const urls = live && origin
    ? indexablePaths.map(path => `  <url><loc>${new URL(path, origin).href}</loc></url>\n`).join('')
    : '';
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>\n`;
}
