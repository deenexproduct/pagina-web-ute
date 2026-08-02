/**
 * utils.ts — Helpers de i18n. Patrón oficial de Astro, sin dependencias.
 *
 * Routing: `es` es el default y NO lleva prefijo (`/`), `en` va bajo
 * `/en/`. Configurado en `astro.config.mjs`.
 *
 * Uso típico en una sección:
 *
 *   ---
 *   import { getLangFromUrl, useTranslations } from '../i18n/utils';
 *   const lang = getLangFromUrl(Astro.url);
 *   const t = useTranslations(lang);
 *   const COPY = { es: { titulo: '…' }, en: { titulo: '…' } } as const;
 *   const c = COPY[lang];
 *   ---
 *   <h2>{c.titulo}</h2>
 *   <a href={…}>{t('cta.contacto')}</a>
 */

import { UI, DEFAULT_LANG, type Lang, type UIKey } from './ui';

/**
 * Detecta el idioma a partir del pathname.
 *
 * Tiene que ser robusto al base path: en GitHub Pages el sitio vive en
 * `/<repo>/`, así que `/quem-central-preview/en/` también es inglés.
 */
export function getLangFromUrl(url: URL): Lang {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let path = url.pathname;

  if (base && path.startsWith(base)) {
    path = path.slice(base.length);
  }

  const [, first] = path.split('/');
  if (first && first in UI) return first as Lang;
  return DEFAULT_LANG;
}

/** Devuelve la función de traducción para un idioma. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return UI[lang][key] ?? UI[DEFAULT_LANG][key];
  };
}

/**
 * Compone una ruta interna respetando idioma Y base path.
 *
 *   localizedPath('/#contacto', 'es')  → '/#contacto'
 *   localizedPath('/#contacto', 'en')  → '/en/#contacto'
 *
 * Anchors puros y URLs externas pasan tal cual.
 */
export function localizedPath(path: string, lang: Lang): string {
  if (!path) return path;
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  let p = path.startsWith('/') ? path : `/${path}`;

  /* `trailingSlash: 'never'` en astro.config: con prefijo de idioma, la
     raíz es `/en` y no `/en/`, y un ancla queda `/en#contacto`. Sin esta
     normalización el selector de idioma apuntaba a `/en/`, que da 404. */
  if (prefix) {
    if (p === '/') p = '';
    else if (p.startsWith('/#')) p = p.slice(1);
  }

  return `${base}${prefix}${p}` || '/';
}

/**
 * Ruta equivalente de la página actual en el otro idioma.
 * Es lo que consume el selector ES/EN del header.
 */
export function alternatePath(url: URL, target: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let path = url.pathname;

  if (base && path.startsWith(base)) path = path.slice(base.length);

  /* Sacar el prefijo de idioma actual, si lo tiene. */
  const segments = path.split('/').filter(Boolean);
  if (segments[0] && segments[0] in UI) segments.shift();

  const rest = segments.length ? `/${segments.join('/')}` : '/';
  return localizedPath(rest, target);
}

/** Todos los idiomas, para generar hreflang. */
export const ALL_LANGS = Object.keys(UI) as Lang[];

export { DEFAULT_LANG };
export type { Lang };
