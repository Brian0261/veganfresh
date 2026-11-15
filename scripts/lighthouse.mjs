import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import lighthouse from 'lighthouse';
import { load } from 'cheerio';
import { gzipSync } from 'node:zlib';

const origin = process.argv[2] || 'http://127.0.0.1:4321';
const url = new URL(origin);
if (url.hostname !== '127.0.0.1' || url.protocol !== 'http:') throw new Error('Indica una vista previa HTTP local en 127.0.0.1.');
const runPaths = ['/', '/productos/', '/frutas-al-por-mayor/', '/verduras-al-por-mayor/', '/proveedor-restaurantes/', '/cotizar/', '/privacidad/'];
const reportDirectory = 'qa/lighthouse';
await mkdir(reportDirectory, { recursive: true });

const profile = await mkdtemp(join(tmpdir(), 'veganfresh-lighthouse-'));
const browser = spawn(chromium.executablePath(), [
  '--headless', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0',
  `--user-data-dir=${profile}`,
], { stdio: 'ignore' });
try {
  let port;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      port = Number((await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split(/\r?\n/)[0]);
      break;
    } catch (error) {
      if (error.code !== 'ENOENT' || browser.exitCode !== null) throw error;
      await delay(250);
    }
  }
  if (!port) throw new Error('Chromium no abrió el puerto de depuración.');
  const summary = [];
  for (const path of runPaths) {
    const name = path.split('/')[1] || 'home';
    for (const run of ['home', 'cotizar'].includes(name) ? [1, 2, 3] : [1]) {
      const result = await lighthouse(new URL(path, origin).href, {
        port, logLevel: 'error', output: 'json',
        onlyCategories: ['performance', 'accessibility', 'seo'],
      });
      const { lhr } = result;
      await writeFile(join(reportDirectory, `${name}-${run}.json`), result.report);
      if (lhr.runtimeError) {
        throw new Error(`Lighthouse en ${path}: ${lhr.runtimeError.code}. ${lhr.runtimeError.message}`);
      }
      summary.push({
        page: path, run, performance: Math.round(lhr.categories.performance.score * 100),
        accessibility: Math.round(lhr.categories.accessibility.score * 100), seo: Math.round(lhr.categories.seo.score * 100),
        lcpMs: Math.round(lhr.audits['largest-contentful-paint'].numericValue),
        cls: Number(lhr.audits['cumulative-layout-shift'].numericValue.toFixed(3)),
        tbtMs: Math.round(lhr.audits['total-blocking-time'].numericValue),
        indexingBlocked: lhr.audits['is-crawlable'].score === 0,
      });
    }
  }
  const html = await readFile('dist/cotizar/index.html', 'utf8');
  const weights = await Promise.all([...html.matchAll(/(?:src|href)="(\/_astro\/[^"]+?\.(?:css|js))"/g)].map(async ([, path]) => ({
    file: path, gzipBytes: gzipSync(await readFile('dist' + path)).length,
  })));
  const home = load(await readFile('dist/index.html', 'utf8'));
  const heroPath = home('main img[fetchpriority="high"]').attr('src');
  if (!heroPath?.startsWith('/assets/')) throw new Error('No se encontró la imagen principal de la portada.');
  const hero = await readFile(join('dist', heroPath.slice(1)));
  await writeFile(join(reportDirectory, 'summary.json'), JSON.stringify({ summary, weights, desktopHeroBytes: hero.length }, null, 2) + '\n');
  console.table(summary);
} finally {
  if (browser.exitCode === null) {
    await new Promise(resolve => {
      browser.once('exit', resolve);
      browser.kill();
    });
  }
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
