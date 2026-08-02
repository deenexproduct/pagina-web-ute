/**
 * ui.ts — Diccionario de strings COMPARTIDOS entre secciones.
 *
 * Convención del proyecto:
 *   - Lo compartido (nav, CTAs recurrentes, footer, SEO, a11y) vive acá.
 *   - El copy PROPIO de cada sección vive co-locado en su `.astro`, en
 *     un `const COPY = { es: {...}, en: {...} } as const` arriba del
 *     archivo. Así ninguna sección pisa a otra y el archivo se lee solo.
 *
 * Regla dura: NUNCA hardcodear un string visible en el markup. Si no
 * está acá o en el COPY de la sección, no se renderiza.
 */

export const LANGS = {
  es: 'ES',
  en: 'EN',
} as const;

export type Lang = keyof typeof LANGS;

export const DEFAULT_LANG: Lang = 'es';

/** Locale completo para `<html lang>` y `og:locale`. */
export const LOCALE: Record<Lang, { html: string; og: string }> = {
  es: { html: 'es-AR', og: 'es_AR' },
  en: { html: 'en', og: 'en_US' },
};

export const UI = {
  es: {
    /* Navegación — las claves matchean NavItem['key'] de site.ts */
    'nav.nosotros': 'Nosotros',
    'nav.unidades': 'Unidades',
    'nav.ubicaciones': 'Ubicaciones',
    'nav.prensa': 'Prensa',
    'nav.contacto': 'Contacto',
    'nav.aria': 'Navegación principal',
    'nav.abrir': 'Abrir menú',
    'nav.cerrar': 'Cerrar menú',
    'nav.inicio': 'Ir al inicio',

    /* Idioma */
    'lang.aria': 'Cambiar idioma',
    'lang.es': 'Ver en español',
    'lang.en': 'View in English',

    /* CTAs recurrentes */
    'cta.contacto': 'Contacto',
    'cta.hablemos': 'Hablemos',
    'cta.whatsapp': 'Escribinos por WhatsApp',
    'cta.consultar': 'Consultar',
    'cta.verMas': 'Ver más',

    /* Accesibilidad */
    'a11y.skip': 'Saltar al contenido',
    'a11y.top': 'Volver arriba',
    'a11y.social': 'Redes sociales',

    /* Footer */
    'footer.rights': 'Todos los derechos reservados.',
    'footer.by': 'Creado por Deenex',
    'footer.nav': 'Secciones',
    'footer.contacto': 'Contacto',

    /* Estados genéricos */
    'state.pendiente': 'Próximamente',
    'state.borrador': 'Contenido en revisión',

    /* SEO */
    'seo.title': 'QUEM | Grupo de alimentos congelados',
    'seo.description':
      'QUEM integra tiendas, abastecimiento mayorista, franquicias y desarrollo de producto en alimentos congelados. Operación propia en AMBA y PBA.',
  },

  en: {
    'nav.nosotros': 'About',
    'nav.unidades': 'Units',
    'nav.ubicaciones': 'Locations',
    'nav.prensa': 'Press',
    'nav.contacto': 'Contact',
    'nav.aria': 'Main navigation',
    'nav.abrir': 'Open menu',
    'nav.cerrar': 'Close menu',
    'nav.inicio': 'Back to top',

    'lang.aria': 'Change language',
    'lang.es': 'Ver en español',
    'lang.en': 'View in English',

    'cta.contacto': 'Contact',
    'cta.hablemos': "Let's talk",
    'cta.whatsapp': 'Message us on WhatsApp',
    'cta.consultar': 'Get in touch',
    'cta.verMas': 'Learn more',

    'a11y.skip': 'Skip to content',
    'a11y.top': 'Back to top',
    'a11y.social': 'Social media',

    'footer.rights': 'All rights reserved.',
    'footer.by': 'Built by Deenex',
    'footer.nav': 'Sections',
    'footer.contacto': 'Contact',

    'state.pendiente': 'Coming soon',
    'state.borrador': 'Content under review',

    'seo.title': 'QUEM | Frozen food group',
    'seo.description':
      'QUEM brings together retail stores, wholesale supply, franchises and product development in frozen food. Own operation across AMBA and Buenos Aires province.',
  },
} as const;

export type UIKey = keyof (typeof UI)['es'];
