/**
 * site.ts — Config central de la landing institucional de QUEM.
 *
 * FUENTE ÚNICA DE VERDAD para todo lo VARIABLE o PENDIENTE de definir
 * por el cliente. Cualquier dato que pueda cambiar (dominio, mails,
 * WhatsApp, unidades, links de app, ubicaciones) vive acá.
 *
 * ── FASE 1 ───────────────────────────────────────────────────────────
 * Scope: home institucional + contacto. Toda CTA deriva a contacto o
 * WhatsApp — nunca a subwebs. Todo se monta con placeholders; el swap
 * de assets no rompe la estructura.
 *
 * Reglas:
 *   - `draft: true` marca copy de borrador pendiente de aprobación del
 *     cliente. Se renderiza igual (el spec pide "copy en borrador"),
 *     pero es greppable para la ronda de revisión.
 *   - Los campos vacíos ('') son placeholders: los componentes degradan
 *     elegantemente y NO renderizan links muertos.
 *   - Si agregás algo que el cliente debe confirmar, marcalo
 *     `// TODO confirmar con cliente`.
 */

/* `ui.ts` no importa nada de acá, así que no hay ciclo. */
import { DEFAULT_LANG, type Lang } from '../i18n/ui';

/* -------------------------------------------------------------------------- */
/*  MARCA                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Identidad del grupo.
 *
 * DECISIÓN DE PRODUCTO (Fase 1): QUEM es la marca madre / grupo, y
 * "Qüem Central" es UNA de sus 4 unidades de negocio — no la marca
 * paraguas. Esto sale del punto 6 del spec ("Unidades de negocio:
 * Tiendas · Central · Smart · Origen").
 *
 * Antes de Fase 1 el sitio entero estaba construido como si Qüem
 * Central fuera la marca madre. Si el cliente revierte esta decisión,
 * hay que revisar: SEO, JSON-LD, Header, Footer, hero y este archivo.
 */
export const BRAND = {
  /** Nombre del grupo, tal como se muestra. */
  group: 'QUEM',
  /** Razón social / entidad legal. */
  legal: 'QUEM S.A.',
  /** Wordmark del header y footer mientras no llegue el logo definitivo. */
  wordmark: 'QUEM',
  /** Bajada corta del wordmark. Vacío = no se renderiza. */
  wordmarkSuffix: 'Grupo',
  /**
   * Path al SVG del logo definitivo, relativo a /public.
   * Vacío → se renderiza el lockup tipográfico de fallback.
   */
  logoSvg: '', // TODO logo definitivo desde el Drive del cliente
} as const;

/* -------------------------------------------------------------------------- */
/*  DOMINIO                                                                   */
/* -------------------------------------------------------------------------- */

/** Dominio institucional. Sujeto a compra final. */
export const SITE_DOMAIN = 'quem-central.com'; // TODO confirmar compra del dominio

/** URL pública del sitio. */
export const SITE_URL = `https://${SITE_DOMAIN}`;

/* -------------------------------------------------------------------------- */
/*  HELPERS DE LINK                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Prefija links internos con el base path de Astro (GitHub Pages usa
 * `/<repo>/`; en prod con dominio propio usa `/`).
 *
 * Anchors puros (`#contacto`) y externos (`https://…`) pasan tal cual.
 */
export const link = (path: string): string => {
  if (!path) return path;
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:')
  ) {
    return path;
  }
  if (path.startsWith('#')) return path;

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}` || '/';
};

/* -------------------------------------------------------------------------- */
/*  UNIDADES DE NEGOCIO — spec punto 6                                        */
/* -------------------------------------------------------------------------- */

export type UnidadSlug = 'tiendas' | 'central' | 'smart' | 'origen';

export interface Unidad {
  slug: UnidadSlug;
  /** Nombre visible. */
  nombre: string;
  /** Una línea. El spec pide exactamente eso: "imagen + una línea". */
  linea: string;
  /** Path a la imagen en /public. Vacío → placeholder visual. */
  imagen: string;
  /** `true` = copy de borrador, pendiente de aprobación del cliente. */
  draft?: boolean;
}

/**
 * Las 4 unidades del grupo (spec punto 6).
 *
 * GATE DEL CLIENTE: "Smart" y "Origen" no existían en ninguna forma en
 * el código ni en el brief previo. El copy de abajo es INFERIDO y está
 * marcado `draft: true`. Confirmar qué son antes de publicar.
 */
export const UNIDADES: ReadonlyArray<Unidad> = [
  {
    slug: 'tiendas',
    nombre: 'QUEM Tiendas',
    linea: 'La red de puntos de venta al consumidor final, con app propia de pedidos.',
    imagen: '', // TODO foto de tienda
    draft: true,
  },
  {
    slug: 'central',
    nombre: 'QUEM Central',
    linea: 'Abastecimiento, logística de frío y distribución para gastronómicos y comercios.',
    imagen: '', // TODO foto de depósito / flota
  },
  {
    slug: 'smart',
    nombre: 'QUEM Smart',
    linea: 'Formatos de venta desatendida para oficinas, edificios y espacios de alto tránsito.',
    imagen: '', // TODO foto de formato Smart
    draft: true, // TODO confirmar con cliente qué es exactamente "Smart"
  },
  {
    slug: 'origen',
    nombre: 'QUEM Origen',
    linea: 'Desarrollo de producto y vínculo directo con la producción.',
    imagen: '', // TODO foto de producción / origen
    draft: true, // TODO confirmar con cliente qué es exactamente "Origen"
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  INTERESES — spec punto 11 (desplegable del formulario)                    */
/* -------------------------------------------------------------------------- */

export type InteresValue =
  | 'mayorista'
  | 'franquicia'
  | 'corner'
  | 'smart-market'
  | 'inversion'
  | 'otro';

export interface Interes {
  value: InteresValue;
  label: string;
  /** Microcopy de la card / hint del form. */
  desc: string;
  /** Ícono declarativo. Cada componente mapea el nombre a su SVG. */
  icon: string;
  /**
   * Ruteo por variable (spec punto 11). Mail al que va la consulta.
   * Vacío → cae a EMAILS.contacto.
   */
  email: string;
}

/**
 * Diccionario canónico de intereses. Es la ÚNICA lista.
 *
 * Lo consumen:
 *   - el desplegable del formulario (spec punto 11, las 6 opciones)
 *   - el bloque de "las 4 opciones" (spec punto 3, las primeras 4)
 *   - el ruteo del backend de forms
 *
 * Antes había dos listas que matcheaban por string exacto y divergían
 * en silencio. No volver a duplicar.
 */
export const INTERESES: ReadonlyArray<Interes> = [
  {
    value: 'mayorista',
    label: 'Mayorista',
    desc: 'Abastecimiento con logística de frío para gastronómicos y comercios.',
    icon: 'truck',
    email: '', // TODO mail de ruteo mayorista
  },
  {
    value: 'franquicia',
    label: 'Franquicias',
    desc: 'Abrir una unidad propia con identidad y respaldo del grupo.',
    icon: 'building',
    email: '', // TODO mail de ruteo franquicias
  },
  {
    value: 'corner',
    label: 'Córners',
    desc: 'Retail congelado llave en mano dentro de tu espacio.',
    icon: 'corner',
    email: '', // TODO mail de ruteo córners
  },
  {
    value: 'smart-market',
    label: 'Smart Market',
    desc: 'Venta desatendida para oficinas, edificios y espacios de alto tránsito.',
    icon: 'smart',
    email: '', // TODO mail de ruteo smart market
  },
  {
    value: 'inversion',
    label: 'Inversión',
    desc: 'Sumarse al crecimiento del grupo como inversor.',
    icon: 'chart',
    email: '', // TODO mail de ruteo inversión
  },
  {
    value: 'otro',
    label: 'Otro',
    desc: 'Prensa, proveedores y todo lo que no entre arriba.',
    icon: 'dots',
    email: '', // TODO mail de ruteo general
  },
] as const;

/**
 * Las 4 opciones del bloque navegacional central (spec punto 3).
 * Subconjunto ordenado de INTERESES — no es una lista aparte.
 */
export const OPCIONES_DESTACADAS: ReadonlyArray<InteresValue> = [
  'mayorista',
  'franquicia',
  'corner',
  'smart-market',
] as const;

/** Helper: buscar un interés por su value. */
export const getInteres = (value: InteresValue): Interes | undefined =>
  INTERESES.find((i) => i.value === value);

/* -------------------------------------------------------------------------- */
/*  CONTACTO                                                                  */
/* -------------------------------------------------------------------------- */

export const EMAILS = {
  comercial: 'comercial@quem-central.com', // TODO confirmar mail institucional
  contacto: 'contacto@quem-central.com', // TODO confirmar mail institucional
} as const;

/**
 * WhatsApp comercial. Solo dígitos con código de país, sin "+" ni espacios.
 * Ejemplo cuando se defina: '5491112345678'.
 *
 * Un solo valor prende: el botón del form, el dock flotante de redes y
 * el `contactPoint` del JSON-LD.
 */
export const WHATSAPP = ''; // TODO confirmar WhatsApp final

export const hasWhatsapp = (): boolean => WHATSAPP.length > 0;

/**
 * Link efectivo de WhatsApp. Cae al form de contacto si no hay número,
 * respetando el idioma en ese fallback.
 */
export const whatsappLink = (mensaje?: string, lang: Lang = DEFAULT_LANG): string => {
  if (!WHATSAPP) return contactLink(undefined, lang);
  const q = mensaje ? `?text=${encodeURIComponent(mensaje)}` : '';
  return `https://wa.me/${WHATSAPP}${q}`;
};

/**
 * Link al form de contacto con el interés ya preseleccionado.
 * El wizard lee `?interes=` y abre directo en el paso siguiente.
 *
 * Es el mecanismo que pide el spec punto 3: "cada opción deriva al
 * contacto correspondiente a su unidad de negocio".
 *
 * OJO CON EL IDIOMA: pasá siempre `lang`. Sin él, un CTA en `/en/`
 * devolvía `/#contacto` y sacaba al visitante a la home en español —
 * el formulario es el mecanismo de conversión de la fase, así que ese
 * salto perdía el lead. Componemos la ruta acá en vez de delegar en
 * `link()` porque hay que intercalar el prefijo de idioma.
 */
export const contactLink = (interes?: InteresValue, lang: Lang = DEFAULT_LANG): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  /* `trailingSlash: 'never'`, así que para EN es `/en` sin barra final. */
  const path = lang === DEFAULT_LANG ? '/' : `/${lang}`;
  const q = interes ? `?interes=${encodeURIComponent(interes)}` : '';
  return `${base}${path}${q}#contacto`;
};

/**
 * Endpoint del backend de formularios.
 *
 * Fase 1 usa un servicio externo porque el sitio es estático y el
 * dominio todavía no está comprado (sin dominio no hay SPF/DKIM, así
 * que un backend propio mandaría a spam).
 *
 * Recomendado: Web3Forms (gratis, ~250 envíos/mes) o Formspree.
 * Vacío → el form degrada a `mailto:` y lo avisa en la UI.
 */
export const FORM_ENDPOINT = ''; // TODO dar de alta el form backend y pegar la URL
export const FORM_ACCESS_KEY = ''; // TODO access key del proveedor

export const hasFormBackend = (): boolean => FORM_ENDPOINT.length > 0 && FORM_ACCESS_KEY.length > 0;

/** Mail de ruteo efectivo para un interés dado. */
export const routeEmail = (interes?: InteresValue): string => {
  const found = interes ? getInteres(interes) : undefined;
  return found?.email || EMAILS.contacto;
};

/* -------------------------------------------------------------------------- */
/*  APP QUEM TIENDAS — spec punto 4                                           */
/* -------------------------------------------------------------------------- */

/**
 * La app del punto 4 es la de QUEM TIENDAS (consumidor final), NO la
 * del grupo ni el catálogo B2B. El spec pide aclararlo en el bloque.
 *
 * Links vacíos → los badges degradan a la sección de contacto en vez
 * de apuntar a un link muerto.
 */
export const STORE_LINKS = {
  googlePlay: '', // TODO link de Google Play
  appStore: '', // TODO link de App Store
} as const;

export const hasStoreLinks = (): boolean =>
  STORE_LINKS.googlePlay.length > 0 || STORE_LINKS.appStore.length > 0;

/* -------------------------------------------------------------------------- */
/*  HERO — spec punto 2                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Video de fondo del hero (autoplay, muteado, loop).
 *
 * VACÍO A PROPÓSITO. El asset que había en `public/video/hero.mp4` se
 * movió a `docs/legacy-assets/` porque tenía marca **Emplatame** y
 * watermark **@MEETYQUEM** quemados — ambas prohibidas por la regla de
 * contenido #1 de este proyecto. Era además un video vertical de
 * celular con subtítulos quemados, pillarboxeado a 4:3.
 *
 * Mientras esté vacío, el hero renderiza su fondo tratado sin video.
 * Cuando llegue el asset definitivo: dejarlo en `public/video/`,
 * completar estas constantes y se prende solo.
 *
 * Pedir al cliente: nativo 16:9 o 21:9, ≥1920×1080, 8-12 s en loop,
 * SIN audio, SIN subtítulos quemados, SIN marcas de terceros.
 */
export const HERO_VIDEO = {
  mp4: '', // TODO video institucional definitivo
  webm: '',
  poster: '',
} as const;

export const hasHeroVideo = (): boolean => HERO_VIDEO.mp4.length > 0;

/* -------------------------------------------------------------------------- */
/*  UBICACIONES — spec punto 7 (dataset en src/config/locations.ts)           */
/* -------------------------------------------------------------------------- */

/** Centro inicial del mapa (AMBA). */
export const MAP_CENTER = { lat: -34.6037, lng: -58.3816, zoom: 10 } as const;

/* -------------------------------------------------------------------------- */
/*  MÉTRICAS — spec punto 5 ("números clave")                                 */
/* -------------------------------------------------------------------------- */

/**
 * DECISIÓN DE PRODUCTO: el spec pide "números clave (dummy)", pero el
 * sitio ya publica datos REALES y sourceados de prensa. Se conservan
 * los reales — es trust ganado, y este proyecto tiene como regla dura
 * no inventar métricas.
 */
export interface Metric {
  value: string;
  label: string;
  detail: string;
}

export const METRICS: ReadonlyArray<Metric> = [
  { value: '2018', label: 'Fundada', detail: 'operación continua' },
  { value: '21', label: 'Tiendas', detail: '15 franquiciadas' },
  { value: '$800M', label: 'Facturación', detail: 'anual reportada' },
  { value: 'AMBA + PBA', label: 'Cobertura propia', detail: '+ Colombia 2026' },
] as const;

export const METRICS_SOURCE = {
  text: 'Fuente: La Nación, oct. 2023. Mencionado también en iProfesional y TN.',
} as const;

/* -------------------------------------------------------------------------- */
/*  ALIADOS — spec punto 10                                                   */
/* -------------------------------------------------------------------------- */

export interface LogoItem {
  name: string;
  /** Path al logo en /public. Vacío → el item no se renderiza. */
  logo: string;
  url?: string;
}

/**
 * Franja de logos de proveedores / aliados.
 * Vacío → la sección entera se auto-oculta (patrón del proyecto).
 */
export const ALIADOS: ReadonlyArray<LogoItem> = [
  // TODO logos de aliados y proveedores (6-10, SVG o PNG transparente)
] as const;

/* -------------------------------------------------------------------------- */
/*  NAVEGACIÓN — spec punto 1                                                 */
/* -------------------------------------------------------------------------- */

export type NavKey = 'nosotros' | 'unidades' | 'ubicaciones' | 'prensa' | 'contacto';

export interface NavItem {
  /** Clave de traducción en src/i18n/ui.ts. */
  key: NavKey;
  href: string;
  sectionId: string;
}

/**
 * Menú del header. El spec punto 1 fija EXACTAMENTE estos 5 anclas.
 *
 * Los ids tienen que coincidir con el `id` de cada `<section>` para que
 * el scroll-spy del header los ilumine.
 *
 * Salieron del nav en Fase 1 (las secciones siguen existiendo en el
 * repo, fuera de la home): Plataforma, Productos, Garantías, Partners
 * y Corner Qüem — esta última porque es una subweb y el spec pide
 * scroll único sin derivar a subwebs.
 */
export const NAV_PRIMARY: ReadonlyArray<NavItem> = [
  { key: 'nosotros', href: '/#nosotros', sectionId: 'nosotros' },
  { key: 'unidades', href: '/#unidades', sectionId: 'unidades' },
  { key: 'ubicaciones', href: '/#ubicaciones', sectionId: 'ubicaciones' },
  { key: 'prensa', href: '/#prensa', sectionId: 'prensa' },
  { key: 'contacto', href: '/#contacto', sectionId: 'contacto' },
] as const;

/* -------------------------------------------------------------------------- */
/*  REDES SOCIALES — regla transversal (dock flotante)                        */
/* -------------------------------------------------------------------------- */

/**
 * Las 4 que pide el spec, en orden de render.
 * Vacías → el dock no renderiza ese ícono. Si están las 4 vacías, el
 * dock no se monta. WhatsApp sale de la constante WHATSAPP.
 */
export const SOCIAL = {
  youtube: '', // TODO URL de YouTube
  facebook: '', // TODO URL de Facebook
  instagram: '', // TODO URL de Instagram
} as const;

export type SocialKey = keyof typeof SOCIAL;

/** Redes efectivamente configuradas, en orden. */
export const activeSocials = (): ReadonlyArray<{ key: SocialKey; url: string }> =>
  (Object.keys(SOCIAL) as SocialKey[])
    .filter((k) => SOCIAL[k].length > 0)
    .map((k) => ({ key: k, url: SOCIAL[k] }));

/* -------------------------------------------------------------------------- */
/*  DIRECCIÓN                                                                 */
/* -------------------------------------------------------------------------- */

export const ADDRESS = {
  streetAddress: '', // TODO confirmar dirección comercial
  city: '',
  region: '',
  postalCode: '',
  /** Código ISO 3166-1, para `addressCountry` del PostalAddress. */
  country: 'AR',
  /** Nombre humano del país, para `Country.name` del JSON-LD: ese campo
      espera un nombre, no un código. Publicar "AR" ahí era un dato mal
      tipado para el consumidor del schema. */
  countryName: 'Argentina',
} as const;

export const hasAddress = (): boolean => ADDRESS.streetAddress.length > 0;

/* -------------------------------------------------------------------------- */
/*  SEO                                                                       */
/* -------------------------------------------------------------------------- */

export const SEO = {
  siteName: 'QUEM',
  defaultOgImage: '/og-default.jpg', // TODO og-default con el logo real (1200×630)
  twitterHandle: '', // TODO confirmar handle si existe
} as const;

/* -------------------------------------------------------------------------- */
/*  ANALYTICS                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Plausible: sin cookies, sin banner de consentimiento, ~1KB.
 * Vacío → no se inyecta el script.
 *
 * Sin esto el sitio sale sin medir NINGUNA conversión, justo cuando el
 * mecanismo de conversión de la fase es el formulario.
 */
export const ANALYTICS = {
  plausibleDomain: '', // TODO alta en plausible.io + pegar el dominio
  plausibleHost: 'https://plausible.io',
} as const;
