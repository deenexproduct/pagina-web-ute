# Secciones fuera de Fase 1

Estos componentes **funcionan y están bien construidos**. Salieron de la home porque el spec de
Fase 1 pide una landing institucional de grupo, con scroll único y sin catálogo ni compra online.
No salieron por estar rotos.

Viven fuera de `src/` para que `astro check` no los tipe contra la config nueva de `site.ts`
(que ya no exporta `CATEGORIES`, `TEAM`, `buyOnlineLink`, `APP_IS_LIVE` ni `categoryUrl`).

## Qué hay acá

| Archivo                      | Qué era                                        | Por qué salió                                                                |
| ---------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------- |
| `QueEsQuemCentral.astro`     | "Qué hacemos" de Qüem Central                  | Discurso de unidad, no de grupo. Lo reemplaza `QuienesSomos.astro`           |
| `PlataformaApp.astro`        | Showcase del catálogo B2B                      | Fase 1 no promociona la app B2B. Ojo: montaba el video con marca de terceros |
| `CategoriasProducto.astro`   | Grilla de 11 categorías con deep-link a la app | Es catálogo; Fase 1 no tiene compra online                                   |
| `Garantias.astro`            | SENASA, cadena de frío, plazos, facturación    | Contenido de venta B2B, buen material para Fase 2                            |
| `Ecosistema.astro`           | Producto / logística / cobertura / tecnología  | Se solapa con `UnidadesDeNegocio.astro`                                      |
| `FranquiciasExpansion.astro` | 3 cards: Franquicias, Corner, Alianzas         | Lo reemplaza `Opciones.astro` con las 4 del spec                             |
| `EquipoDirectivo.astro`      | Walter, Matías, Joaquín                        | El spec no pide equipo en Fase 1                                             |
| `QuemEnNumeros.astro`        | Franja de logos de clientes                    | Lo reemplaza `components/ui/LogoStrip.astro`, que es genérico                |
| `ProofStrip.astro`           | Banda de métricas de prensa                    | Absorbido dentro de `QuienesSomos.astro`                                     |
| `corner/CornerTeaser.astro`  | Teaser de Corner en la home                    | `/corner-quem` está despublicada en Fase 1                                   |
| `prensa/PrensaHero.astro`    | Hero de una página de prensa                   | Ya era huérfano antes de Fase 1: esa página nunca existió                    |
| `prensa/PrensaContact.astro` | Contacto de prensa                             | Ídem                                                                         |

## Para recuperar una

```bash
git mv docs/fase2-sections/Garantias.astro src/sections/
```

Después hay que: montarla en `src/layouts/Home.astro`, sumarle el patrón de i18n
(`COPY` co-locado + `getLangFromUrl`), y revisar que no use exports de `site.ts` que ya no existen.

## Además

`legacy-assets/` (carpeta hermana) tiene el `hero.mp4` y su poster, retirados de `public/` porque
llevan marca **Emplatame** y watermark **@MEETYQUEM** quemados — prohibidas por la regla de
contenido #1 del proyecto. No volver a publicarlos.
