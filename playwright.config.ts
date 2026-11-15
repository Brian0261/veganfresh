import { defineConfig } from '@playwright/test';

const external = process.env.VEGANFRESH_QA_URL;
const port = 4322;
const baseURL = external || `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests/e2e',
  workers: 1,
  timeout: 90000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL, trace: 'retain-on-failure', reducedMotion: 'reduce' },
  webServer: external ? undefined : {
    command: `pnpm preview --demo --port ${port} --persist-to test-results/d1`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120000,
    env: { ASTRO_TELEMETRY_DISABLED: '1', WRANGLER_SEND_METRICS: 'false' },
  },
});
