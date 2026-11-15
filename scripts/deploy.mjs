import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { releaseReady, siteOrigin, indexablePaths } from '../src/config/release.mjs';

const config = JSON.parse(await readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8'));
const privacy = await readFile(new URL('../src/pages/privacidad/index.astro', import.meta.url), 'utf8');
const args = process.argv.slice(2);
const pnpm = process.env.npm_execpath;
if (!pnpm) throw new Error('Ejecuta este script mediante pnpm deploy.');

function run(params, env) {
  const result = spawnSync(process.execPath, [pnpm, ...params], { env, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (args.length === 1 && args[0] === '--dry-run') {
  const env = { ...process.env, VEGANFRESH_DEMO: '0', VEGANFRESH_RELEASE: '0' };
  run(['build'], env);
  run(['exec', 'wrangler', 'deploy', '--dry-run', '--outdir', '.wrangler/bundle'], env);
} else {
  const db = config.d1_databases.find(binding => binding.binding === 'DB');
  const domain = siteOrigin && new URL(siteOrigin).hostname;
  const hasDomain = config.routes?.some(route => route.custom_domain === true && route.pattern === domain);
  if (args.length !== 1 || args[0] !== '--production' || !releaseReady || !indexablePaths.length ||
      /TODO_LEGAL|\[(?:POR CONFIRMAR|RAZÓN SOCIAL|REVISI[ÓO]N|CONTACTO|APROBAR)/i.test(privacy) ||
      config.vars?.VEGANFRESH_MODE !== 'live' || config.vars.ALLOWED_ORIGIN !== siteOrigin ||
      !db?.database_id || !/^[a-f0-9-]{36}$/i.test(db.database_id) || /^0{8}-/.test(db.database_id) ||
      !hasDomain || !process.env.PUBLIC_TURNSTILE_SITE_KEY?.trim()) {
    throw new Error('Despliegue bloqueado. Verifica el dominio, las aprobaciones, el aviso, Turnstile y el binding de producción.');
  }
  const env = { ...process.env, VEGANFRESH_DEMO: '0', VEGANFRESH_RELEASE: '1' };
  run(['build'], env);
  run(['exec', 'wrangler', 'deploy'], env);
}
