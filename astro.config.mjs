// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Sitio definitivo: https://quem-central.com (TODO confirmar compra y switch DNS).
// Para preview en GitHub Pages, exportar antes del build:
//   PUBLIC_SITE=https://<owner>.github.io PUBLIC_BASE=/<repo>/ pnpm build
// Defaults caen al dominio final.
const SITE_URL = process.env.PUBLIC_SITE || 'https://quem-central.com';
const BASE = process.env.PUBLIC_BASE || '/';

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
