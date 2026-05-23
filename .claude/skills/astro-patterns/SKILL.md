---
name: astro-patterns
description: Patrones avanzados de Astro 6 usados en QUEM Central — islands con client directives, content collections, view transitions, slots, `<Image>` de astro:assets, scoped styles, `is:inline` scripts. Triggers — "componente Astro", "client:idle vs client:visible", "scoped CSS", "view transitions", "content collection", "Image optimization", "Astro vs React".
---

# Astro 6 — patrones del proyecto

QUEM Central es **landing page única** con Astro 6 + TypeScript strictest + React 19 islands.

## Filosofía

- **Default: Astro estático**. Cero JS al cliente.
- **React islands solo donde hay interactividad real** — actualmente solo `SmoothScroll.tsx` (Lenis).
- Las animaciones simples se hacen con CSS + IntersectionObserver vanilla en `<script>` inline. No traer React solo para esto.

## Estructura de un componente Astro

```astro
---
// 1. Frontmatter TypeScript (server-side, build-time)
interface Props {
  title: string;
  showHead?: boolean;
}
const { title, showHead = true } = Astro.props;

// importar otros componentes, utils, data
import Card from '../components/Card.astro';
import { CATEGORIES } from '../config/site';
---

<!-- 2. Template HTML -->
<section class="my-section" aria-labelledby="my-title">
  {showHead && <h2 id="my-title">{title}</h2>}
  {CATEGORIES.map((c) => <Card cat={c} />)}
</section>

<!-- 3. Scripts inline -->
<script>
  // TypeScript que corre en el browser. Astro lo procesa con esbuild.
  const el = document.querySelector('.my-section');
  // ...
</script>

<!-- 4. Estilos scoped por defecto -->
<style>
  .my-section { padding: 2rem; }
</style>
```

## Client directives — cuándo usar cada uno

| Directive          | Cuándo                                                        |
|--------------------|---------------------------------------------------------------|
| **(ninguno)**      | Componente estático (HTML/CSS solo). Default y preferido.     |
| `client:load`      | Hidrata al cargar la página. **Evitar** — bloquea LCP.        |
| `client:idle`      | Hidrata cuando el browser está idle. Para nice-to-have.       |
| `client:visible`   | Hidrata cuando entra al viewport. **Default para islands**.   |
| `client:media`     | Hidrata cuando matchea media query (e.g., `(min-width: 768px)`). |
| `client:only`      | Renderea SOLO client-side (no SSR). Para componentes que tocan `window` al render. |

Ejemplo del proyecto:
```astro
<SmoothScroll client:idle />
```

`idle` porque Lenis no es crítico para el primer render — solo mejora el scroll después.

## Scoped styles

Cada `<style>` dentro de un `.astro` está scoped automáticamente. Astro agrega `data-astro-cid-XXX` y reescribe los selectors. Eso evita colisiones entre componentes.

Para estilos globales: usar `<style is:global>` o ponerlos en `src/styles/global.css`.

Para descendant selectors al final del componente:
```astro
<style>
  .card :global(svg) { width: 1.5rem; }
</style>
```

## Scripts inline vs externos

- **Scripts simples sin imports**: ponerlos directos en `<script>` del componente.
- **Scripts con imports de paquetes npm**: Astro los procesa con esbuild. Funcionan con `import { foo } from 'lib'`.
- **Scripts que NO querés que Astro procese** (ej. snippet de analytics third-party): `<script is:inline>`.

## `<Image>` de astro:assets

Optimiza imágenes en build-time vía Sharp.

```astro
---
import { Image } from 'astro:assets';
import heroImg from '../assets/hero.jpg';
---

<Image
  src={heroImg}
  alt="Operación logística"
  widths={[640, 1024, 1440, 1920]}
  sizes="(max-width: 768px) 100vw, 80vw"
  loading="eager"
  format="webp"
/>
```

Reglas:
- **Importar la imagen** (no usar `src="/foo.jpg"` salvo si está en `public/`).
- Siempre `widths` + `sizes` para que el browser elija la versión correcta.
- `loading="eager"` SOLO para hero. Resto = lazy (default).
- `format="webp"` o `"avif"` — Astro genera el formato + fallback.

## Content collections

Para datos estructurados con schema (Zod). Útil cuando aparezcan: posts de prensa con frontmatter, casos de éxito, FAQs.

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const prensa = defineCollection({
  type: 'data',
  schema: z.object({
    outlet: z.string(),
    date: z.string().date(),
    title: z.string(),
    url: z.string().url(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { prensa };
```

Hoy `src/config/press.ts` cumple el mismo rol sin Zod. Migrar a collections cuando haya 10+ notas o cuando se quiera editor friendly (Markdown).

## View Transitions (Astro `<ClientRouter />`)

Permite transiciones cinematográficas entre páginas. Hoy NO usado porque la landing es single-page con anchors. Si en el futuro se agrega `/casos` o `/blog`, considerar.

```astro
---
import { ClientRouter } from 'astro:transitions';
---
<head>
  <ClientRouter />
</head>
```

Con `transition:name="hero"` en elementos persistentes (logo, header), Astro hace morphing.

## Anti-patrones

- **Hidratar todo con `client:load`** — anula el principio de Astro y degrada Lighthouse.
- **Importar React en `.astro`** — solo en componentes `.tsx`. En `.astro` se importan como tags.
- **Estados/effects en `.astro`** — `.astro` es server-side. Para state, usar React island o vanilla JS en `<script>`.
- **Importar imágenes con string path** desde `src/` — siempre import statement para que Astro las optimice.
- **Mismo `<style>` en N componentes** — extraer a `global.css` o a un componente compartido.

## Cuándo usar React vs Astro vanilla

**React island** si necesitás:
- State complejo (useState, useReducer)
- Side effects (useEffect)
- Form con validación rica
- Componente de librería React (chart, datepicker)

**Astro + vanilla `<script>`** si necesitás:
- Scroll spy (IntersectionObserver)
- Toggle de menu
- Smooth scroll
- Form simple con `addEventListener('submit')`
- Counter de números

Regla práctica: si el componente entero cabe en < 80 líneas de JS vanilla, no traigas React.

## Performance build

- `astro build` genera HTML estático. CSS scoped queda inline (críticos) o en archivos hashed.
- `inlineStylesheets: 'auto'` en `astro.config.mjs` decide automáticamente si inline-ar.
- Pre-fetch: `prefetch: { prefetchAll: true, defaultStrategy: 'viewport' }` precarga links visibles.

## Deploy

- Target: **Vercel** o **GitHub Pages** (legacy from-branch).
- Para GH Pages con base path: `PUBLIC_SITE` + `PUBLIC_BASE` env vars (ver `astro.config.mjs`).
- Script `scripts/deploy-preview.sh` automatiza build + push del `dist/`.
