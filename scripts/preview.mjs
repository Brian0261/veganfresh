import { spawn } from 'node:child_process';

const args = process.argv.slice(2);
const demo = args.includes('--demo');
const portIndex = args.indexOf('--port');
const port = portIndex === -1 ? '4321' : args[portIndex + 1];
const stateIndex = args.indexOf('--persist-to');
const state = stateIndex === -1 ? '.wrangler/state' : args[stateIndex + 1];
if (!/^\d{1,5}$/.test(port ?? '') || !state) throw new Error('Puerto o ruta de estado inválidos.');

const env = { ...process.env, VEGANFRESH_DEMO: demo ? '1' : '0', VEGANFRESH_RELEASE: '0' };
const pnpm = process.env.npm_execpath;
if (!pnpm) throw new Error('Ejecuta este script mediante pnpm preview.');

function run(params) {
  const child = spawn(process.execPath, [pnpm, ...params], { env, stdio: 'inherit' });
  return new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('exit', code => code === 0 ? resolve() : reject(new Error(`${params.join(' ')} terminó con código ${code}`)));
  });
}
await run(['build']);
await run(['exec', 'wrangler', 'd1', 'migrations', 'apply', 'DB', '--local', '--persist-to', state]);
await run(['exec', 'wrangler', 'dev', '--local', '--ip', '127.0.0.1', '--port', port,
  '--persist-to', state, '--var', `VEGANFRESH_MODE:${demo ? 'demo' : 'closed'}`]);
