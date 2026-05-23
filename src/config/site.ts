/**
 * site.ts — Config central de la web institucional de QUEM Central.
 *
 * Fuente única de verdad para todo lo VARIABLE o PENDIENTE de definir
 * por el cliente. Cualquier dato que pueda cambiar (dominio, mails,
 * WhatsApp, cargos, métricas, links a la app por categoría, etc.)
 * vive acá y se importa en los componentes.
 *
 * Reglas:
 *   - Si algo está marcado con `// TODO` o `pending: true`, NO renderizar
 *     hasta confirmación del cliente. Usar fallback explícito.
 *   - Si agregás una nueva variable que el cliente debe confirmar,
 *     marcala con `// TODO confirmar con cliente`.
 */

/* -------------------------------------------------------------------------- */
/*  DOMINIO + APP                                                             */
/* -------------------------------------------------------------------------- */

/** Dominio institucional. Sujeto a compra final. */
export const SITE_DOMAIN = 'quem-central.com'; // TODO confirmar compra del dominio

/** URL pública del sitio. */
export const SITE_URL = `https://${SITE_DOMAIN}`;

/** URL base de la app/catálogo donde sucede la conversión. */
export const APP_BASE_URL = 'https://app.quem-central.com'; // TODO confirmar app deploy

/* -------------------------------------------------------------------------- */
/*  CONTACTO — MAILS Y WHATSAPP                                               */
/* -------------------------------------------------------------------------- */

/**
 * Mails institucionales sugeridos una vez comprado el dominio.
 * Recomendación del brief: comercial@ para B2B, ventas@ para pedidos.
 */
export const EMAILS = {
  comercial: 'comercial@quem-central.com', // TODO confirmar mail institucional
  ventas: 'ventas@quem-central.com',       // TODO confirmar mail institucional
  contacto: 'contacto@quem-central.com',   // TODO confirmar mail institucional
} as const;

/**
 * WhatsApp comercial. Cuando esté definido, todos los CTAs "Contactar por
 * WhatsApp" deben usar `https://wa.me/<numero>`. Mientras esté vacío,
 * los CTAs redirigen a `/contacto`.
 *
 * Formato: solo dígitos, con código de país (sin "+"), sin espacios.
 * Ejemplo cuando se defina: '5491112345678'.
 */
export const WHATSAPP = ''; // TODO confirmar WhatsApp final

/** Helper: link efectivo para CTAs "Contactar por WhatsApp". */
export const whatsappLink = (): string =>
  WHATSAPP ? `https://wa.me/${WHATSAPP}` : '/contacto';

/* -------------------------------------------------------------------------- */
/*  EQUIPO DIRECTIVO                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Cargo de Joaquín Sepúlveda. Default = recomendación del brief.
 * GATE del cliente: confirmar o cambiar.
 *
 * Opciones del brief:
 *   - 'Director de Expansión Comercial'  (recomendado)
 *   - 'Director de Desarrollo de Negocios'
 *   - 'Director de Franquicias y Corners'
 *   - 'Director Comercial'
 *   - 'Head of Business Development'
 */
export const JOAQUIN_TITLE = 'Director de Expansión Comercial'; // TODO confirmar cargo con cliente

export interface TeamMember {
  name: string;
  title: string;
  org?: string;
  photo?: string; // path relativo a src/assets/team/...
}

export const TEAM: ReadonlyArray<TeamMember> = [
  { name: 'Walter Giaccaglia', title: 'Presidente', org: 'QUEM S.A.' },
  { name: 'Matías Giaccaglia', title: 'CEO', org: 'QUEM Central' },
  { name: 'Joaquín Sepúlveda', title: JOAQUIN_TITLE },
] as const;

/* -------------------------------------------------------------------------- */
/*  MÉTRICAS — QUEM EN NÚMEROS                                                */
/* -------------------------------------------------------------------------- */

/**
 * Toggle de la sección "QUEM en números".
 *   - `false` (default): renderiza la versión institucional suave del brief,
 *     sin datos duros, hasta que el cliente confirme.
 *   - `true`: renderiza la versión con datos en `METRICS`.
 *
 * NO INVENTAR NÚMEROS. Esta es regla dura del brief.
 */
export const SHOW_METRICS = false; // TODO confirmar métricas con cliente

/**
 * Métricas a publicar cuando `SHOW_METRICS = true`. Hoy todas vacías —
 * completar SOLO con datos confirmados por el cliente.
 */
export const METRICS = {
  yearsOfOperation: null,      // TODO años de operación
  monthlyOrders: null,         // TODO volumen de pedidos
  logisticsNetwork: null,      // TODO red logística
  coverageZones: null,         // TODO zonas de cobertura
  activeUnits: null,           // TODO unidades activas
  productCategories: null,     // TODO categorías de producto
  b2bClients: null,            // TODO clientes B2B activos
  commercialPoints: null,      // TODO puntos comerciales
} as const;

/* -------------------------------------------------------------------------- */
/*  CATEGORÍAS DE PRODUCTO                                                    */
/* -------------------------------------------------------------------------- */

export interface Category {
  /** slug para la URL en la app: `${APP_BASE_URL}/categoria/<slug>`. */
  slug: string;
  /** Nombre visible en la card. */
  nombre: string;
  /**
   * Path relativo al asset de foto. Hoy placeholder — reemplazar por
   * fotos reales reutilizadas de la web anterior cuando se descarguen.
   * Si está vacío, la card cae a un placeholder visual.
   */
  foto?: string;
  /**
   * URL final para esa categoría en la app. Si está vacío,
   * se construye automáticamente con APP_BASE_URL + slug.
   */
  appUrl?: string;
}

/** Helper: URL final por categoría. */
export const categoryUrl = (cat: Category): string =>
  cat.appUrl ?? `${APP_BASE_URL}/categoria/${cat.slug}`;

/** Categorías iniciales — orden del brief. */
export const CATEGORIES: ReadonlyArray<Category> = [
  { slug: 'bunuelos',     nombre: 'Buñuelos' },     // TODO foto definitiva
  { slug: 'empanadas',    nombre: 'Empanadas' },    // TODO foto definitiva
  { slug: 'hamburguesas', nombre: 'Hamburguesas' }, // TODO foto definitiva
  { slug: 'frutas',       nombre: 'Frutas' },       // TODO foto definitiva
  { slug: 'franui',       nombre: 'Franui' },       // TODO foto definitiva
  { slug: 'postres',      nombre: 'Postres' },      // TODO foto definitiva
  { slug: 'pizzas',       nombre: 'Pizzas' },       // TODO foto definitiva
  { slug: 'pescados',     nombre: 'Pescados' },     // TODO foto definitiva
  { slug: 'verduras',     nombre: 'Verduras' },     // TODO foto definitiva
  { slug: 'rebozados',    nombre: 'Rebozados' },    // TODO foto definitiva
  { slug: 'tartas',       nombre: 'Tartas' },       // TODO foto definitiva
] as const;

/* -------------------------------------------------------------------------- */
/*  NAVEGACIÓN                                                                */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  label: string;
  href: string;
}

/** Menú principal del header. Orden del brief. */
export const NAV_PRIMARY: ReadonlyArray<NavItem> = [
  { label: 'Inicio',            href: '/' },
  { label: 'QUEM Central',      href: '/#quem-central' },
  { label: 'Ecosistema',        href: '/ecosistema' },
  { label: 'Unidades de negocio', href: '/unidades-de-negocio' },
  { label: 'Corner QUEM',       href: '/corner-quem' },
  { label: 'Productos',         href: '/productos' },
  { label: 'Franquicias',       href: '/franquicias' },
  { label: 'Contacto',          href: '/contacto' },
] as const;

/* -------------------------------------------------------------------------- */
/*  SEO                                                                       */
/* -------------------------------------------------------------------------- */

export const SEO = {
  siteName: 'QUEM Central',
  defaultTitle: 'QUEM Central | Plataforma integral de alimentos congelados',
  titleTemplate: '%s · QUEM Central',
  defaultDescription:
    'QUEM Central integra abastecimiento B2B, distribución, logística especializada, franquicias, corners y tecnología para el desarrollo comercial de alimentos congelados.',
  keywords: [
    'alimentos congelados B2B',
    'distribución de congelados',
    'proveedor de alimentos congelados',
    'franquicias de alimentos congelados',
    'corner de congelados',
    'logística de alimentos congelados',
    'comprar congelados online',
    'QUEM Central',
  ],
  defaultOgImage: '/og-default.jpg', // TODO og-default con marca real (1200×630)
  locale: 'es_AR',
  twitterHandle: '', // TODO confirmar handle si existe
} as const;

/* -------------------------------------------------------------------------- */
/*  DIRECCIÓN COMERCIAL (opcional)                                            */
/* -------------------------------------------------------------------------- */

/**
 * Dirección física. Si está vacía, no se renderiza schema.org PostalAddress
 * con detalle, solo `addressCountry`.
 */
export const ADDRESS = {
  streetAddress: '', // TODO confirmar dirección comercial si corresponde
  city: '',          // TODO
  region: '',        // TODO
  postalCode: '',    // TODO
  country: 'AR',
} as const;

/* -------------------------------------------------------------------------- */
/*  REDES SOCIALES                                                            */
/* -------------------------------------------------------------------------- */

export const SOCIAL = {
  instagram: '', // TODO confirmar @ Instagram
  linkedin: '',  // TODO confirmar LinkedIn empresa
  // facebook: '', // sumar si el cliente lo confirma
} as const;
