import type { APIRoute } from 'astro';
import { robots } from '../config/crawl.mjs';

export const GET: APIRoute = () => new Response(
  robots(import.meta.env.VEGANFRESH_RELEASE === '1'),
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
