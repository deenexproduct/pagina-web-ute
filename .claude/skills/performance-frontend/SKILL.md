---
name: performance-frontend
description: Core Web Vitals + budgets de performance para QUEM Central. LCP, INP, CLS, TTFB, FCP. Optimización de imágenes con astro:assets, fonts variable, JS minimal, CSS crítico inline, prefetch, bundle splitting. Triggers — "Lighthouse bajó", "LCP alto", "CLS", "INP", "qué peso tiene", "WebPageTest", "preload font", "imágenes pesan", "bundle size", "perf budget".
---

# Performance frontend — QUEM Central

Target: **Lighthouse 95+ en las 4 categorías** (Performance, Accessibility, Best Practices, SEO). Sin trampas.

## Core Web Vitals — qué optimizar

### LCP (Largest Contentful Paint) — objetivo <2.5s

El "elemento más grande visible above-the-fold". En QUEM Central suele ser:
- El `<h1>` del Hero ("QUEM Central")
- O el panel mockup lateral

**Optimizaciones**:

- **Fonts: preload el woff2 del display** (Inter Variable) que renderea el `<h1>`:
  ```html
  <link rel="preload" as="font" type="font/woff2" href="/_astro/inter-variable-XXX.woff2" crossorigin>
  ```
  Astro hashea el filename, así que es difícil de hardcodear. Alternativa: usar `<link rel="preconnect">` para fonts.gstatic.com (ya en `BaseLayout.astro`).

- **Inline CSS crítico**: `astro.config.mjs` ya tiene `inlineStylesheets: 'auto'` que decide automáticamente.

- **No bloquear con JS sync**: todos los scripts del proyecto son `<script>` (Astro los procesa como `type="module"` defer) o React islands con `client:idle`/`client:visible`. Nada bloquea.

### INP (Interaction to Next Paint) — objetivo <200ms

Tiempo entre que el usuario interactúa (click, tap, keypress) y la siguiente pintura.

**Optimizaciones**:

- **React islands solo donde hay interactividad real**. Hoy solo `SmoothScroll.tsx`.
- **Listeners pasivos**: `window.addEventListener('scroll', fn, { passive: true })` para no bloquear scroll.
- **Throttle / debounce** para handlers caros. Hoy el scroll handler en Header.astro es simple (toggle de class), sin throttling necesario.
- **`requestIdleCallback`** para work no urgente:
  ```js
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => doExpensiveWork());
  } else {
    setTimeout(doExpensiveWork, 200);
  }
  ```

### CLS (Cumulative Layout Shift) — objetivo <0.1

Saltos visuales mientras carga.

**Optimizaciones**:

- **Imágenes con `width` + `height`** (o `aspect-ratio`) siempre. Astro `<Image>` lo agrega auto.
- **Fonts con `font-display: swap`** + `size-adjust` cuando aplica. Variable fonts ayudan.
- **No insertar contenido above existing** post-load (newsletter banner que aparece después → empuja todo).
- **Reservar espacio** para skeletons / lazy-loaded UI con `min-height`.
- **Animaciones SOLO en transform/opacity** — nunca en height/width/margin.

### TTFB — objetivo <800ms

Time to First Byte. CDN-bound.

- **Static site en GitHub Pages**: TTFB ~50-200ms desde CDN.
- **Vercel**: similar.
- Si en el futuro hay SSR: cachear con `s-maxage` + `stale-while-revalidate`.

### FCP — objetivo <1.8s

First Contentful Paint. Hoy el sitio es estático → FCP muy rápido (~500ms desde CDN).

## Budgets

| Tipo                  | Budget                  |
|-----------------------|-------------------------|
| HTML por página       | < 50 KB gzipped         |
| CSS total inline      | < 14 KB (1 RTT)         |
| JS total above-fold   | < 90 KB gzipped         |
| Imagen Hero (LCP)     | < 200 KB                |
| Fuentes (todas)       | < 200 KB combinado      |
| Total page weight     | < 1 MB                  |

Verificar:
```bash
pnpm build && du -sh dist/* | sort -h
```

## Imágenes — patrón canónico

```astro
---
import { Image } from 'astro:assets';
import heroImg from '../assets/hero-logistica.jpg';
---

<Image
  src={heroImg}
  alt="Operación logística QUEM Central"
  widths={[640, 1024, 1440, 1920]}
  sizes="(max-width: 768px) 100vw, 60vw"
  loading="eager"
  format="webp"
  quality={85}
/>
```

Reglas:
- **Importar** la imagen (no usar path string a `public/`) → Astro la optimiza.
- **`widths`** array → genera srcset multi-resolución.
- **`sizes`** → indica al browser qué tamaño cargar.
- **`loading="eager"`** SOLO para el LCP. Resto = lazy default.
- **`format="webp"`** o `"avif"`.
- **`quality`** entre 75 (thumbnails) y 90 (hero).

## Fuentes — `@fontsource-variable`

QUEM Central usa Inter + Fraunces variables, self-hosted via npm:

```css
@import '@fontsource-variable/inter/index.css';
```

Beneficios:
- Un solo archivo woff2 por familia (~80 KB) cubre todos los pesos 100-900.
- `font-display: swap` por default → texto visible inmediato.
- Sin requests a fonts.googleapis.com (privacy + speed).

Para preload el archivo crítico, identificar el hash post-build:
```bash
find dist/_astro -name "inter-variable*"
```

Y agregar al `<head>`:
```html
<link rel="preload" as="font" type="font/woff2" href="/_astro/inter-variable-XXX.woff2" crossorigin>
```

## CSS — optimizaciones

- **Scoped per-component** ya minimiza duplicación.
- **`@import 'tailwindcss'` + `@theme inline`** genera solo las utilities usadas (purge automático).
- **No `@apply` masivo** — Tailwind v4 lo desaconseja.
- **Critical CSS inline** vía `inlineStylesheets: 'auto'`.

## JS — minimizar

- **0 KB JS** si la página es totalmente estática.
- **Islands con `client:idle` o `client:visible`** — JS no bloquea LCP.
- **Importar dinámicamente** cuando aplica:
  ```js
  document.addEventListener('click', async () => {
    const { default: bigLib } = await import('./bigLib.js');
    bigLib.doStuff();
  });
  ```

## Prefetch

`astro.config.mjs` ya tiene:
```js
prefetch: { prefetchAll: true, defaultStrategy: 'viewport' }
```

Eso precarga `<a href="/...">` cuando entran al viewport. En landing única con anchors no aplica mucho — útil cuando hay multi-página.

## Lighthouse local

```bash
pnpm build && pnpm preview
# en otro terminal:
npx lighthouse http://localhost:4321 --view --emulated-form-factor=mobile
```

Apuntar a: **Performance ≥ 95**, **Accessibility 100**, **Best Practices ≥ 95**, **SEO 100**.

Si baja una métrica:
- **Performance** → revisar Treemap del LH para ver qué bundle pesa más.
- **A11y** → resolver issues listados.
- **Best Practices** → suele ser cookies / HTTPS / inseguro.
- **SEO** → meta tags, alt, viewport.

## PageSpeed Insights (datos de campo real)

Cuando el sitio tenga tráfico, https://pagespeed.web.dev/ muestra Core Web Vitals reales de Chrome UX Report. Útil para auditar regresiones en producción.

## WebPageTest avanzado

Para análisis profundo: https://www.webpagetest.org/

- **Test desde múltiples ubicaciones** (AR, US, EU).
- **Throttle 3G / 4G**.
- **Waterfall** detallado de cada request.
- **Filmstrip** del render visual.

## Anti-patrones

- **Cargar fonts externas con `<link href="fonts.googleapis.com/...">`** sin preconnect → ~300ms perdidos.
- **Imágenes JPG sin convertir a WebP/AVIF** → 30-50% más peso.
- **JS sync en `<head>`** sin defer → bloquea render.
- **CSS de framework completo sin purge** → 200+ KB inservibles.
- **`@import 'big-css-file.css'` en CSS** → bloquea CRP (Critical Rendering Path).
- **Iconos como `<img src="icon.png">`** → request por cada uno. Usar SVG inline.
- **Tracking de N analytics + tag managers** — cada uno suma ~30-50 KB de JS.
- **Sliders carousel pesados** (Swiper, Slick) en hero — degradan LCP.
- **`autoplay` de video** en mobile — Chrome lo bloquea + degrada performance.

## Debug rápido cuando "está lento"

1. **Lighthouse mobile** → identificar la métrica que más baja.
2. **DevTools → Network → Disable cache** → recargar → ver qué tarda.
3. **DevTools → Performance** → grabar 3s → identificar long tasks (rojo).
4. **DevTools → Coverage** → ver % de CSS/JS sin usar.
5. **Source maps + Lighthouse Treemap** → archivos JS que dominan el bundle.

## Para producción QUEM Central

Cuando se haga el deploy real al dominio:

- [ ] Verify HTTPS + HSTS headers.
- [ ] Cache-Control para `/_astro/*` (immutable, max-age 1 año).
- [ ] Cache-Control para `/*.html` (s-maxage, stale-while-revalidate).
- [ ] CSP (Content-Security-Policy) básico.
- [ ] Brotli compression en CDN.
- [ ] Image CDN si las fotos crecen mucho (Cloudinary, ImageKit).
- [ ] Real User Monitoring (RUM): Vercel Analytics, Plausible, etc.
