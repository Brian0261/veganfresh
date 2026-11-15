import { defineConfig } from 'astro/config';
import { siteOrigin } from './src/config/release.mjs';

export default defineConfig({
  output: 'static',
  site: siteOrigin ?? undefined,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
  devToolbar: { enabled: false },
});
