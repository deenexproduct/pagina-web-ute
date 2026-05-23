// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO: reemplazar por el dominio definitivo de QUEM Central antes de deploy a prod.
const SITE_URL = 'https://quem-central.com';

export default defineConfig({
  site: SITE_URL,
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
