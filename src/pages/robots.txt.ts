import type { APIRoute } from 'astro';

import { SITE_DOMAIN } from '../config/site';

export const prerender = true;

/**
 * robots.txt dinámico.
 *
 * Antes era un archivo estático en `public/` que hardcodeaba el sitemap de
 * `quem-central.com`. Eso tenía dos problemas: el preview de GitHub Pages
 * publicaba `Allow: /` apuntando al sitemap de OTRO sitio, y el archivo no
 * seguía a `PUBLIC_SITE` como sí lo hacen canonical, hreflang y og:url.
 *
 * Ahora se deriva del host real del build:
 *   · dominio institucional → se permite indexar y se declara su sitemap
 *   · cualquier otro host (preview) → `Disallow: /`, coherente con el
 *     `noindex` que BaseLayout emite en ese mismo caso
 */
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL(`https://${SITE_DOMAIN}`);
  const esPreview = base.host !== SITE_DOMAIN;

  const cuerpo = esPreview
    ? [
        '# Preview de staging: no se indexa.',
        '# El sitio institucional vive en https://' + SITE_DOMAIN,
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n')
    : ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', base).href}`, ''].join(
        '\n',
      );

  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
