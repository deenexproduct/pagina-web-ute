/**
 * press.ts — Notas de prensa donde QÜEM Central / Qüem aparece o cuyo
 * contexto es relevante para la compañía (franquicias, congelados,
 * historia del equipo).
 *
 * Editar acá para sumar/quitar notas. Ordenadas por fecha desc.
 *
 * Estructura: cada nota lleva medio, slug del medio (para wordmark),
 * fecha, título, bajada y URL externa.
 */

export interface PressItem {
  /** Nombre del medio. */
  outlet: string;
  /** Slug del medio para color/tag (`la-nacion`, `iprofesional`, `tn`). */
  outletSlug: 'la-nacion' | 'iprofesional' | 'tn' | 'clarin' | 'infobae' | 'otro';
  /** Fecha de publicación (ISO YYYY-MM-DD). */
  date: string;
  /** Título del artículo. */
  title: string;
  /** Bajada / sumario corto (1-3 líneas). */
  excerpt: string;
  /** URL al artículo original. */
  url: string;
  /** Tag corto opcional (e.g., "Historia de QÜEM", "Franquicias"). */
  tag?: string;
  /** ¿Mención directa a QÜEM/Qüem? Sirve para destacar visualmente. */
  featured?: boolean;
}

export const PRESS: ReadonlyArray<PressItem> = [
  {
    outlet: 'TN',
    outletSlug: 'tn',
    date: '2026-05-09',
    title:
      'Nació en Saladillo, cosechaba choclos y hoy lidera una empresa que factura US$6 millones al año',
    excerpt:
      'Perfil de un empresario del interior que escala una operación gastronómica de alimentos congelados con presencia en franquicias, corners y red comercial B2B.',
    url: 'https://tn.com.ar/economia/2026/05/09/nacio-en-saladillo-cosechaba-choclos-y-hoy-lidera-una-empresa-que-factura-us6-millones-al-ano/',
    tag: 'Historia del equipo',
    featured: true,
  },
  {
    outlet: 'iProfesional',
    outletSlug: 'iprofesional',
    date: '2026-02-15', // TODO confirmar fecha exacta cuando esté el dato
    title: '5 buenas franquicias para invertir y tener un negocio llave en mano en 2026',
    excerpt:
      'Selección de franquicias argentinas con modelos llave en mano para 2026. Mención al ecosistema de franquicias y corners de alimentos congelados.',
    url: 'https://www.iprofesional.com/negocios/443965-5-buenas-franquicias-para-invertir-y-tener-negocio-llave-en-mano-en-2026',
    tag: 'Franquicias',
    featured: true,
  },
  {
    outlet: 'iProfesional',
    outletSlug: 'iprofesional',
    date: '2025-11-01', // TODO confirmar fecha exacta
    title: 'Boom de franquicias low cost: cuánta plata hay que invertir y qué ventajas ofrecen',
    excerpt:
      'Análisis del crecimiento de las microfranquicias en Argentina. Inversión inicial, modelos operativos y ventajas comerciales — contexto del modelo Corner Qüem.',
    url: 'https://www.iprofesional.com/negocios/435719-cuanto-salen-las-microfranquicias-y-que-ventajas-ofrecen',
    tag: 'Microfranquicias',
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
    tag: 'Historia de Qüem',
    featured: true,
  },
] as const;
