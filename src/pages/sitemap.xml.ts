import type { APIRoute } from 'astro';
import { sitemap } from '../config/crawl.mjs';

export const GET: APIRoute = () => new Response(sitemap(import.meta.env.VEGANFRESH_RELEASE === '1'), {
  headers: { 'Content-Type': 'application/xml; charset=utf-8' },
});
