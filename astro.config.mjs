// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Sitio definitivo: https://quem-central.com (TODO confirmar compra y switch DNS).
// Mientras tanto, GitHub Pages preview en https://deenexproduct.github.io/pagina-web-ute/
// Toggle vía env: GITHUB_PAGES=1 en el workflow de CI.
const IS_GH_PAGES = process.env.GITHUB_PAGES === '1';
const SITE_URL = IS_GH_PAGES
  ? 'https://deenexproduct.github.io'
  : 'https://quem-central.com';
const BASE = IS_GH_PAGES ? '/pagina-web-ute' : '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE,
  trailingSlash: 'never',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  integrations: [
    react({
      experimentalReactChildren: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/draft/') && !page.includes('/_'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  experimental: {
    clientPrerender: true,
  },
});
