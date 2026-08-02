/**
 * press.ts — Notas de prensa donde QUEM aparece o cuyo contexto es
 * relevante para el grupo (franquicias, congelados, historia del equipo).
 *
 * Editar acá para sumar/quitar notas. Ordenadas por fecha desc.
 *
 * DOS PIEZAS, DOS REGLAS DE IDIOMA:
 *   - `title` / `excerpt` son contenido de los medios (títulos reales y
 *     resúmenes de la nota). Van SIEMPRE en español, también en la
 *     versión EN del sitio: traducir el título de un artículo publicado
 *     es inventar una cita que no existe. La sección los marca con
 *     `lang="es"` para que un lector de pantalla en inglés no los
 *     pronuncie como si fueran ingleses.
 *   - `tag` es clasificación NUESTRA, no del medio. Por eso es bilingüe.
 *
 * REGLA DE MARCA: no inventamos métricas ni notas. Todo lo de acá es
 * cobertura publicada y verificable en la URL de cada ítem.
 */

import type { Lang } from '../i18n/ui';

/** Medios cubiertos. `otro` es el fallback para cualquier medio nuevo. */
export type OutletSlug = 'la-nacion' | 'iprofesional' | 'tn' | 'clarin' | 'infobae' | 'otro';

/**
 * Tratamiento tipográfico del wordmark en la franja de prensa.
 *
 * No tenemos los logos oficiales de los medios (son marcas registradas y
 * no se pueden bajar sin licencia), así que la franja se construye con
 * wordmarks tipográficos: el nombre del medio compuesto con la familia,
 * el peso y el tracking que se parecen a su cabecera real, todo en
 * escala de grises. Es honesto y se lee profesional.
 *
 * Las clases concretas viven en PrensaList.astro y usan solo tokens.
 */
export type WordmarkStyle =
  /** Diario tradicional: serif con peso alto (La Nación, Clarín). */
  | 'broadsheet'
  /** Medio digital de negocios: sans semibold, tracking cerrado. */
  | 'digital'
  /** Sans muy pesada en minúscula (Infobae). */
  | 'heavy'
  /** Sigla de canal: sans extrabold en mayúscula (TN). */
  | 'sigla'
  /** Fallback sobrio para medios sin tratamiento propio. */
  | 'neutral';

export const WORDMARK_BY_OUTLET: Record<OutletSlug, WordmarkStyle> = {
  'la-nacion': 'broadsheet',
  clarin: 'broadsheet',
  iprofesional: 'digital',
  infobae: 'heavy',
  tn: 'sigla',
  otro: 'neutral',
};

export interface PressItem {
  /** Nombre del medio tal como lo firma (es el texto del wordmark). */
  outlet: string;
  /** Slug del medio: elige el tratamiento del wordmark y agrupa la franja. */
  outletSlug: OutletSlug;
  /** Fecha de publicación (ISO YYYY-MM-DD). */
  date: string;
  /** Título del artículo. Cita literal del medio — no se traduce. */
  title: string;
  /** Bajada / sumario corto. Contenido del medio — no se traduce. */
  excerpt: string;
  /** URL al artículo original. */
  url: string;
  /** Clasificación propia, bilingüe. */
  tag?: Record<Lang, string>;
  /** ¿Mención directa a QUEM? Sirve para destacar visualmente. */
  featured?: boolean;
  /**
   * Logo oficial del medio (path dentro de /public, ej. `/medios/tn.svg`).
   *
   * PENDIENTE DEL CLIENTE: hoy ninguna nota lo trae, así que la franja
   * muestra el wordmark tipográfico. Apenas se cargue acá un archivo con
   * licencia de uso, la franja usa la imagen sin tocar nada más — el
   * logo GANA sobre el wordmark.
   */
  logo?: string;
}

export const PRESS: ReadonlyArray<PressItem> = [
  {
    outlet: 'TN',
    outletSlug: 'tn',
    date: '2026-05-09',
    title:
      'Nació en Saladillo, cosechaba choclos y hoy lidera una empresa que factura US$6 millones al año',
    excerpt:
      'Empresario del interior escalando una operación de congelados con franquicias, corners y red B2B.',
    url: 'https://tn.com.ar/economia/2026/05/09/nacio-en-saladillo-cosechaba-choclos-y-hoy-lidera-una-empresa-que-factura-us6-millones-al-ano/',
    tag: { es: 'Historia del equipo', en: 'Founders' },
    featured: true,
  },
  {
    outlet: 'iProfesional',
    outletSlug: 'iprofesional',
    date: '2026-02-15', // TODO confirmar fecha exacta cuando esté el dato
    title: '5 buenas franquicias para invertir y tener un negocio llave en mano en 2026',
    excerpt:
      'Selección de franquicias llave en mano para 2026. Incluye modelos del ecosistema Qüem.',
    url: 'https://www.iprofesional.com/negocios/443965-5-buenas-franquicias-para-invertir-y-tener-negocio-llave-en-mano-en-2026',
    tag: { es: 'Franquicias', en: 'Franchising' },
    featured: true,
  },
  {
    outlet: 'iProfesional',
    outletSlug: 'iprofesional',
    date: '2025-11-01', // TODO confirmar fecha exacta
    title: 'Boom de franquicias low cost: cuánta plata hay que invertir y qué ventajas ofrecen',
    excerpt: 'Crecimiento de las microfranquicias en Argentina. Contexto del modelo Corner Qüem.',
    url: 'https://www.iprofesional.com/negocios/435719-cuanto-salen-las-microfranquicias-y-que-ventajas-ofrecen',
    tag: { es: 'Microfranquicias', en: 'Micro-franchising' },
  },
  {
    outlet: 'La Nación',
    outletSlug: 'la-nacion',
    date: '2023-10-16',
    title:
      'Se hizo socio para ayudar a un amigo y terminó adquiriendo un emprendimiento de congelados que factura $800 millones al año',
    excerpt:
      'Walter Giaccaglia invirtió US$250.000 en 2018 para adquirir el 60% de Qüem. En 2022 sumó el paquete accionario completo junto a Matías Giaccaglia y Joaquín Sepúlveda. Hoy: 21 tiendas (15 franquiciadas) y expansión proyectada a Colombia.',
    url: 'https://www.lanacion.com.ar/economia/se-hizo-socio-para-ayudar-a-un-amigo-y-termino-adquiriendo-un-emprendimiento-de-congelados-que-nid16102023/',
    tag: { es: 'Historia de QUEM', en: 'Company story' },
    featured: true,
  },
];

/** Un medio de la franja, ya resuelto: wordmark o logo + nota a la que apunta. */
export interface PressOutlet {
  slug: OutletSlug;
  /** Nombre del medio, tal como se compone el wordmark. */
  name: string;
  /** Tratamiento tipográfico a aplicar si no hay logo. */
  wordmark: WordmarkStyle;
  /** Logo oficial si alguna nota del medio lo trae. Gana sobre el wordmark. */
  logo?: string;
  /** Nota a la que lleva el logo: la destacada, si no la más reciente. */
  href: string;
  /** Cuántas notas tiene ese medio (hoy solo informativo). */
  count: number;
}

/**
 * Agrupa PRESS por medio para armar la franja de autoridad.
 *
 * Conserva el orden de aparición (PRESS ya viene por fecha desc), así la
 * franja y la lista de abajo cuentan la misma historia en el mismo orden.
 */
export const pressOutlets = (
  items: ReadonlyArray<PressItem> = PRESS,
): ReadonlyArray<PressOutlet> => {
  const orden: OutletSlug[] = [];
  const grupos = new Map<OutletSlug, PressItem[]>();

  for (const item of items) {
    const grupo = grupos.get(item.outletSlug);
    if (grupo) {
      grupo.push(item);
    } else {
      grupos.set(item.outletSlug, [item]);
      orden.push(item.outletSlug);
    }
  }

  return orden.flatMap<PressOutlet>((slug) => {
    const notas = grupos.get(slug) ?? [];
    /* La destacada manda; si el medio no tiene ninguna, la más reciente. */
    const principal = notas.find((n) => n.featured) ?? notas[0];
    if (!principal) return [];

    const logo = notas.find((n) => n.logo && n.logo.length > 0)?.logo;

    return [
      {
        slug,
        name: principal.outlet,
        wordmark: WORDMARK_BY_OUTLET[slug],
        href: principal.url,
        count: notas.length,
        /* exactOptionalPropertyTypes: la clave no existe si no hay logo. */
        ...(logo ? { logo } : {}),
      },
    ];
  });
};
