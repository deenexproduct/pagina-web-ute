import type { APIRoute } from 'astro';

import { BRAND, link } from '../config/site';

export const prerender = true;

/**
 * Manifest PWA dinámico.
 *
 * Antes era un JSON estático en `public/` y quedó desincronizado en tres
 * puntos a la vez:
 *   · `name: "Qüem Central"` — posicionamiento pre-Fase 1. Hoy QUEM es el
 *     grupo y Central es UNA de sus 4 unidades, así que quien instalaba la
 *     PWA se llevaba un ícono con la marca vieja.
 *   · `theme_color: "#93936E"` contradecía al `<meta name="theme-color">`
 *     del HTML (`#f8f9fb`), que es el que realmente pinta el chrome.
 *   · los íconos no seguían al base path.
 *
 * Al derivarlo de `BRAND` y de `link()` no puede volver a divergir.
 */
export const GET: APIRoute = () => {
  const manifest = {
    name: BRAND.group,
    short_name: BRAND.wordmark,
    description: 'Grupo de alimentos congelados: abastecimiento, distribución y desarrollo comercial.',
    start_url: link('/'),
    scope: link('/'),
    display: 'standalone',
    background_color: '#f8f9fb',
    /* Espeja al <meta name="theme-color"> del HTML, que espeja --color-bg. */
    theme_color: '#f8f9fb',
    lang: 'es',
    orientation: 'portrait-primary',
    icons: [
      { src: link('/favicon.svg'), sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: link('/apple-touch-icon.png'), sizes: '180x180', type: 'image/png', purpose: 'any' },
      { src: link('/icon-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: link('/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
    categories: ['business', 'food'],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
