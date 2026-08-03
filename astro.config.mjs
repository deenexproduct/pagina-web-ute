// @ts-check
import { defineConfig } from 'astro/config';
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
  /* Bilingüe ES/EN — regla transversal del spec Fase 1.
     `es` es default y no lleva prefijo; `en` vive bajo /en/. */
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      /* /corner-quem está despublicada en Fase 1 (es una subweb, y el
         spec pide scroll único). Va con noindex, así que tampoco entra
         al sitemap. Revertir cuando Fase 2 habilite subwebs. */
      filter: (page) =>
        !page.includes('/draft/') && !page.includes('/_') && !page.includes('/corner-quem'),
      /* `es`, no `es-AR`: el hreflang del HTML emite `es` y el del sitemap
         emitía `es-AR`. Google toma las dos señales y, al contradecirse,
         descarta el clúster de alternates. Tienen que decir lo mismo. */
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es', en: 'en' },
      },
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
