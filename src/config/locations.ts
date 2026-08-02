/* ========================================================================== *
 *  ⚠️  DATASET DUMMY — ESTAS NO SON UBICACIONES REALES DE QUEM  ⚠️
 *
 *  Spec Fase 1, punto 7: "Mapa interactivo con pines de tiendas y córners.
 *  Datos dummy hasta que llegue el Excel."
 *
 *  QUÉ ES ESTO
 *  Doce registros INVENTADOS. Los barrios, localidades y avenidas sí son
 *  reales, y las coordenadas caen donde dicen (±100 m) para que el mapa se
 *  vea creíble en la demo — pero las alturas, los nombres y la existencia
 *  misma de cada punto son de relleno.
 *
 *  POR QUÉ 12 Y NO 21
 *  El sitio ya publica un dato REAL y sourceado de prensa ("21 tiendas",
 *  cobertura "AMBA + PBA"). La distribución de acá abajo —7 tiendas + 5
 *  córners, CABA + Gran Buenos Aires + La Plata— es coherente con eso sin
 *  contradecirlo. No llegamos a 21 a propósito: inventar 21 direcciones
 *  sería fabricar un dato, y este proyecto tiene como regla dura no
 *  inventar métricas. Doce alcanza para probar el mapa.
 *
 *  ANTES DE PUBLICAR
 *      grep -rn "LOCATIONS_ARE_DUMMY" src/
 *  Si sigue en `true`, el mapa está mostrando datos falsos. Reemplazar
 *  LOCATIONS con el Excel del cliente y poner la constante en `false`.
 *  `Ubicaciones.astro` lee esa constante y, mientras esté prendida, muestra
 *  un aviso visible de que son ubicaciones de ejemplo. Es deliberado:
 *  preferimos el cartel a que alguien maneje 40 minutos hasta una tienda
 *  que no existe.
 * ========================================================================== */

/**
 * Tipo de punto de venta.
 *   - `tienda`: local QUEM (propio o franquiciado), puerta a la calle.
 *   - `corner`: córner dentro de un comercio de terceros que ya opera.
 */
export type LocationTipo = 'tienda' | 'corner';

export interface Location {
  /** Slug estable. Se usa como `data-loc-id` y como ancla en el DOM. */
  id: string;
  /** Nombre visible. Proper noun: NO se traduce. */
  nombre: string;
  tipo: LocationTipo;
  /** Calle y altura. Sin ciudad — eso va en `ciudad`. */
  direccion: string;
  /** Ciudad o partido. 'CABA' para Capital, '<Partido>, PBA' para provincia. */
  ciudad: string;
  lat: number;
  lng: number;
}

/**
 * Bandera de seguridad. `true` = el dataset de abajo es de relleno.
 * Greppable a propósito (ver el bloque de arriba).
 */
export const LOCATIONS_ARE_DUMMY = true;

/**
 * Ubicaciones. Orden de render: primero tiendas, después córners — el
 * componente respeta este orden tal cual, así el listado se lee agrupado
 * sin necesidad de ordenarlo en runtime.
 */
export const LOCATIONS: ReadonlyArray<Location> = [
  /* ---------- Tiendas ---------------------------------------------- */
  {
    id: 'palermo',
    nombre: 'QUEM Palermo',
    tipo: 'tienda',
    direccion: 'Av. Santa Fe 3253',
    ciudad: 'CABA',
    lat: -34.5889,
    lng: -58.4106,
  },
  {
    id: 'belgrano',
    nombre: 'QUEM Belgrano',
    tipo: 'tienda',
    direccion: 'Av. Cabildo 2120',
    ciudad: 'CABA',
    lat: -34.5626,
    lng: -58.4563,
  },
  {
    id: 'caballito',
    nombre: 'QUEM Caballito',
    tipo: 'tienda',
    direccion: 'Av. Rivadavia 5140',
    ciudad: 'CABA',
    lat: -34.6188,
    lng: -58.4408,
  },
  {
    id: 'villa-urquiza',
    nombre: 'QUEM Villa Urquiza',
    tipo: 'tienda',
    direccion: 'Av. Triunvirato 4230',
    ciudad: 'CABA',
    lat: -34.5731,
    lng: -58.4885,
  },
  {
    id: 'vicente-lopez',
    nombre: 'QUEM Vicente López',
    tipo: 'tienda',
    direccion: 'Av. Maipú 1240',
    ciudad: 'Vicente López, PBA',
    lat: -34.5286,
    lng: -58.4772,
  },
  {
    id: 'lomas-de-zamora',
    nombre: 'QUEM Lomas de Zamora',
    tipo: 'tienda',
    direccion: 'Av. Hipólito Yrigoyen 8940',
    ciudad: 'Lomas de Zamora, PBA',
    lat: -34.7601,
    lng: -58.4021,
  },
  {
    id: 'la-plata',
    nombre: 'QUEM La Plata',
    tipo: 'tienda',
    direccion: 'Calle 12 nº 1245',
    ciudad: 'La Plata, PBA',
    lat: -34.9187,
    lng: -57.9545,
  },

  /* ---------- Córners ----------------------------------------------- */
  {
    id: 'nunez',
    nombre: 'QUEM Núñez',
    tipo: 'corner',
    direccion: 'Av. Cabildo 3900',
    ciudad: 'CABA',
    lat: -34.5464,
    lng: -58.4623,
  },
  {
    id: 'san-isidro',
    nombre: 'QUEM San Isidro',
    tipo: 'corner',
    direccion: 'Av. Centenario 850',
    ciudad: 'San Isidro, PBA',
    lat: -34.4712,
    lng: -58.5131,
  },
  {
    id: 'ramos-mejia',
    nombre: 'QUEM Ramos Mejía',
    tipo: 'corner',
    direccion: 'Av. de Mayo 180',
    ciudad: 'Ramos Mejía, PBA',
    lat: -34.6417,
    lng: -58.5665,
  },
  {
    id: 'quilmes',
    nombre: 'QUEM Quilmes',
    tipo: 'corner',
    direccion: 'Av. Rivadavia 320',
    ciudad: 'Quilmes, PBA',
    lat: -34.7203,
    lng: -58.2543,
  },
  {
    id: 'tigre',
    nombre: 'QUEM Tigre',
    tipo: 'corner',
    direccion: 'Av. Cazón 1420',
    ciudad: 'Tigre, PBA',
    lat: -34.4264,
    lng: -58.5796,
  },
] as const;

/** Cuántos puntos hay de un tipo. Lo consume la leyenda del mapa. */
export const countByTipo = (tipo: LocationTipo): number =>
  LOCATIONS.filter((l) => l.tipo === tipo).length;
