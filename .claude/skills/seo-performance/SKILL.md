---
name: seo-performance
description: SEO técnico + Core Web Vitals + Lighthouse 95+ en las 4 métricas para UTE. Meta tags, Open Graph, schema.org Restaurant/LocalBusiness, sitemap, robots, fonts/images optimization, bundle budget. Triggers — "OG image", "meta tags", "que aparezca bien en Google / WhatsApp / iMessage", "schema", "JSON-LD", "score de Lighthouse", "LCP/CLS/INP", "performance", "imagen pesa mucho", "fuente flickea". NO usar para layout o motion.
---

# SEO + performance UTE

Objetivo: **Lighthouse 95+ en performance, accessibility, best practices y SEO**. Sin trampas. En mobile 4G simulado.

UTE busca aparecer bien en Google (búsquedas "restaurante autor buenos aires", "menú degustación X") y compartirse bien por WhatsApp/iMessage/Twitter (donde se decide salir a comer).

## Meta tags base

Implementados en `src/layouts/BaseLayout.astro`. Cubre:

- `<title>` con formato `{titulo} · UTE`.
- `<meta name="description">` (descripción de la prop, ~150–160 chars).
- `<link rel="canonical">` calculado dinámicamente.
- `theme-color` light + dark.
- **Open Graph** completo (type, site_name, title, description, url, image, locale `es_AR`).
- **Twitter Card** `summary_large_image`.
- Favicon SVG + apple-touch-icon.
- JSON-LD `Restaurant` (placeholder — completar con datos reales).

Cuando agregués una nueva página, **pasale props `title`, `description`, `image`, `canonicalPath`** al `BaseLayout`. No copies meta a mano.

## og-default.jpg

**Pendiente**: arte para el OG share por defecto. Spec:
- 1200×630 px (ratio 1.91:1).
- PNG o JPG. Si JPG, calidad 80.
- Tipografía display + algún detalle de la marca. Aparece chiquito en WhatsApp — texto grande, sin filigranas.
- Vivir en `public/og-default.jpg`. Override per-page con prop `image="/og-otra.jpg"`.

Para pages internas con identidad propia, generar OG variants (`/og/menu.jpg`, etc.).

## Schema.org JSON-LD

Hoy en `BaseLayout.astro` hay un placeholder `Restaurant`. **Completar cuando esté la data**:

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "UTE",
  "url": "...",
  "image": "...",
  "telephone": "+54 11 ...",
  "priceRange": "$$$",
  "servesCuisine": "Contemporánea",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "Buenos Aires",
    "addressRegion": "CABA",
    "postalCode": "...",
    "addressCountry": "AR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": ..., "longitude": ... },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday", "Wednesday", ...], "opens": "20:00", "closes": "00:00" }
  ],
  "menu": "https://ute.com.ar/menu",
  "acceptsReservations": "True"
}
```

`LocalBusiness` aplica también si más adelante hay info empresarial (CUIT, etc.) — agregarlo además del Restaurant, no en reemplazo.

Validador: https://validator.schema.org/ y https://search.google.com/test/rich-results

## Sitemap + robots

- `@astrojs/sitemap` ya configurado. Genera `sitemap-index.xml` en build.
- Filtro: excluye `/draft/` y `/_*`.
- `robots.txt` apunta al sitemap (cambiar URL cuando esté el dominio real).
- Para páginas que **no** deben indexarse (drafts, reservas confirmadas), pasar `noindex` al `BaseLayout`.

## Core Web Vitals — objetivos y palancas

### LCP (Largest Contentful Paint) — objetivo <2.5s

- El LCP del hero suele ser el `<h1>` o una imagen grande.
- Si es imagen: usar `<Image>` de Astro con `loading="eager"` solo para LCP, `priority` si está disponible.
- Si es texto: garantizar que la fuente display NO bloquee (font-display: swap viene gratis con @fontsource-variable).
- Inline el CSS crítico — Astro lo hace con `inlineStylesheets: 'auto'` (ya en `astro.config.mjs`).
- **No** lazy-load el primer media above-the-fold.

### CLS (Cumulative Layout Shift) — objetivo <0.1

- Siempre `width` y `height` (o `aspect-ratio`) en imágenes.
- Reservar espacio para fuentes con `size-adjust` (variable fonts ayudan).
- Si carga UI tarde (newsletter form), reservar el alto con min-height.
- Animaciones de entrada SIEMPRE en transform/opacity, nunca en height/margin.

### INP (Interaction to Next Paint) — objetivo <200ms

- React islands solo donde hay interactividad real. Más islands = más main-thread.
- Hidratar con `client:idle` o `client:visible` salvo que sea crítico (Hero CTA).
- Para listas largas (menú completo), virtualizar o paginar.
- Si una interacción es pesada, romper con `requestIdleCallback` o `startTransition`.

### TTFB — objetivo <800ms

- Astro estático en Vercel: TTFB es CDN-bound. Generalmente <200ms.
- Si más adelante hay SSR, cachear headers correctamente (`s-maxage`, `stale-while-revalidate`).

## Imágenes

- Pipeline: Sharp ya configurado. Importar imágenes desde `src/assets/images/` con `<Image>` de `astro:assets`.
- Formato: AVIF prioridad, fallback WebP, JPG último recurso. Astro hace srcset automático.
- Comprimir a quality 75–85 según importancia. Hero ~85, thumbnails ~75.
- Lazy load por default. `loading="eager"` solo el primer media.
- Para hero, generar 3 sizes (mobile, tablet, desktop) con `widths={[640, 1280, 1920]}`.

## Fuentes

- Self-hosted via `@fontsource-variable/inter` + `@fontsource-variable/fraunces`. Subsets `latin` y `latin-ext` con `unicode-range`.
- Variable fonts = un solo archivo por familia ≈ 50–80 KB.
- `font-display: swap` viene por default — texto visible inmediato.
- Si latency molesta, preload los `woff2` del Hero en `BaseLayout.astro`:
  ```html
  <link rel="preload" as="font" type="font/woff2" href="..." crossorigin />
  ```
- Cargar SOLO los weights que usás. Reviewerar.

## Bundle budget

Reglas de mano:

| Tipo                  | Budget                  |
|-----------------------|-------------------------|
| HTML por página       | < 30 KB gzipped         |
| CSS total inline      | < 14 KB (1 RTT)         |
| JS total above-fold   | < 90 KB gzipped         |
| Imagen Hero (LCP)     | < 200 KB                |
| Fuentes (todas)       | < 200 KB combinado      |

Verificar con `pnpm build` + `du -sh dist/*`. Si una página supera, identificar y cortar.

## Lighthouse y testing

```bash
pnpm build && pnpm preview
# en otro terminal:
npx lighthouse http://localhost:4321 --view --emulated-form-factor=mobile
```

Métricas que apuntamos: **Performance ≥95**, **Accessibility 100**, **Best Practices ≥95**, **SEO 100**. Si bajan, abrir el reporte y atacar la métrica que más bajó primero.

PageSpeed Insights (datos reales de campo cuando haya tráfico): https://pagespeed.web.dev/

## Pre-deploy checklist

- [ ] `pnpm check` 0 errores.
- [ ] `pnpm lint` 0 warnings.
- [ ] `pnpm build` exitoso, output sano.
- [ ] Lighthouse local ≥95 en las 4.
- [ ] OG share preview validado (https://www.opengraph.xyz/).
- [ ] Schema validado (https://validator.schema.org/).
- [ ] Robots/sitemap accesibles en producción.
- [ ] Favicons y theme-color renderizan en iOS/Android.
- [ ] Canonical apunta al dominio definitivo, no a `ute.example.com`.

## Vercel — headers que ya están

Ver `vercel.json`. Define `Cache-Control: immutable` para fuentes y `_astro/*` (assets hasheados). No agregues headers genéricos en `meta http-equiv`, van en Vercel config o en `_headers`.
