---
name: ux-ui-design
description: Sistema de diseño de UTE — tokens, escala tipográfica fluida, spacing scale, grilla, estados (hover/focus/disabled), accesibilidad WCAG AA. Triggers — "agregar un componente UI", "qué color uso", "qué tamaño de fuente", "cómo manejo el focus", "spacing entre X y Y", "accesibilidad de Z", "estados de un botón/input". NO usar para animaciones (eso es motion-interactions) ni para SEO/Lighthouse (eso es seo-performance).
---

# Sistema de diseño UTE

Toda decisión visual sale de `src/styles/tokens.css`. Si necesitás un valor que no está, **agregalo al token primero**. Hardcodear hex/px en componentes está prohibido (incluso si "solo es esta vez").

## Fuente única de verdad

`src/styles/tokens.css` define:

- **Color** — `--color-neutral-*`, `--color-brand-*`, `--color-accent-*`, semantics (`--color-bg`, `--color-text-primary`, etc.). Todo en `oklch()` para mejor mezcla perceptual.
- **Tipografía** — `--font-display` (Fraunces variable), `--font-sans` (Inter variable), `--font-mono`. Tamaños con `clamp()`: `--font-size-2xs` → `--font-size-display`.
- **Spacing** — `--space-0` a `--space-12` (escala 4px-based) + `--space-section`, `--space-gutter` fluidos.
- **Layout** — `--container-max` (1440px), `--container-content` (72ch).
- **Radii** — `xs` (2px) → `2xl` (24px), `pill`, `circle`.
- **Shadows** — `xs` a `xl`. Sutiles, no Bootstrap.
- **Motion** — `--ease-*`, `--dur-*`. Coordinar con motion-interactions.
- **z-index** — escala semántica (`raised`, `sticky`, `modal`, `toast`, `cursor`).

Estos tokens están expuestos a Tailwind v4 vía `@theme inline` en `global.css`. Eso significa:
- `bg-bg-elevated` → `--color-bg-elevated`
- `text-fg-secondary` → `--color-text-secondary`
- `font-display` → Fraunces
- `text-display` → `--font-size-display` (clamp gigante)
- `rounded-pill`, `shadow-md`, etc.

## Escala tipográfica fluida

Definida con `clamp(min, fluid, max)` calibrada para 320px → 1440px. Esto significa:

- En mobile: tamaños cómodos (16-18px body).
- En desktop wide: tamaños expresivos sin que el display se vuelva ridículo.
- **Cero media queries para text size**. Solo layout cambia con breakpoints.

Tamaños disponibles:

| Token              | Min / Max     | Uso típico                            |
|--------------------|---------------|---------------------------------------|
| `--font-size-2xs`  | 11 → 12px     | uppercase tags, labels muy chicas     |
| `--font-size-xs`   | 12 → 14px     | meta, footers, captions               |
| `--font-size-sm`   | 14 → 16px     | secondary text, ui-controls           |
| `--font-size-base` | 16 → 18px     | body                                  |
| `--font-size-md`   | 18 → 20px     | lede paragraphs, blockquotes chicos   |
| `--font-size-lg`   | 20 → 24px     | subheaders inline                     |
| `--font-size-xl`   | 24 → 30px     | h3                                    |
| `--font-size-2xl`  | 30 → 40px     | h2 con peso medio                     |
| `--font-size-3xl`  | 36 → 52px     | h2 display, quotes destacados         |
| `--font-size-4xl`  | 44 → 72px     | h1 secundario, section titles fuertes |
| `--font-size-5xl`  | 56 → 100px    | display impactante                    |
| `--font-size-display` | 64 → 144px | hero único, una vez por página        |

Tracking + leading van en pares — display siempre con `--leading-tight` (1.05) y `--tracking-tightest` (-0.04em). Body siempre `--leading-relaxed` (1.6) con tracking normal.

## Spacing scale

Escala 4px-based con steps no lineales para forzar ritmo:

```
0 → 0
1 → 4px       sm gaps inline
2 → 8px       gap entre eyebrow y title
3 → 12px      gap interno tight
4 → 16px      gap default
5 → 24px      gap entre cards
6 → 32px      gap entre h y body
7 → 48px      gap entre subsecciones
8 → 64px      gap antes de sección final
9 → 96px      separación generosa
10 → 128px    aire grande
11 → 192px    presencia editorial
12 → 256px    bloque master
```

Más:
- `--space-section` = `clamp(4rem, 7vw, 10rem)` — padding-block de cada `<section>`.
- `--space-gutter` = `clamp(1.25rem, 4vw, 3rem)` — padding lateral del container.

**Regla**: si tu valor de spacing no existe en la escala, no inventes uno — usá el más cercano o ajustá la composición. Las únicas excepciones son `--space-section` y `--space-gutter` que son fluidos por diseño.

## Grilla

- **12 cols** disponibles, gutter = `--space-5` (24px).
- Container max = 1440px, padding lateral = `--space-gutter`.
- En sections, **layouts asimétricos** son la default. Evitar 50/50 — preferir 5/7, 4/8, 7/5.
- En desktop, dejar al menos una columna de aire a un lado en bloques de texto.

## Componentes UI

Conviven dos enfoques:

1. **Astro components con CSS scoped** — cuando la pieza tiene identidad visual (Hero, Quote display, etc.). Permite BEM-ish dentro de `<style>` y aislamiento.
2. **Tailwind utility classes** — para wrappers de layout y componentes muy reutilizables (botones, badges).

Convención: si la pieza aparece **una sola vez** y tiene tipografía/spacing custom → Astro + scoped CSS. Si es reutilizable y se compone (Button con variantes) → Tailwind classes o `clsx()`.

## Estados de los componentes

Todo componente interactivo (botones, links, inputs) tiene **mínimo 4 estados visibles**:

- **default** — descansa.
- **hover** (solo en dispositivos `hover:hover`) — micro feedback. Suele ser `translate-y(-1px)` + cambio de background.
- **focus-visible** — outline 2px de `--color-focus-ring` con offset 3px y border-radius del componente. **NUNCA** quitar el outline sin reemplazarlo.
- **disabled** — `opacity: 0.5`, `pointer-events: none`, `cursor: not-allowed`. Nunca dar la sensación de que el control responde si está disabled.

Activos toggle: `active` (mientras se presiona) usa una transform sutil (translate-y(0.5px)) — no flicker de color.

## Accesibilidad WCAG AA

Reglas no negociables:

- **Contraste**: text-primary sobre bg-base = al menos 4.5:1 para body, 3:1 para texto grande. **Verificar con devtools, no a ojo**. Si dudás, el text-secondary sobre bg-base ya es marginal — testealo.
- **Foco visible siempre**: `:focus-visible` con outline 2px contrastado. Touch devices no muestran (lo maneja el browser), pero teclado sí.
- **Touch targets ≥44×44px**: incluso links inline si son CTAs. CTA primario en Hero tiene `min-height: 44px; min-width: 44px`.
- **Roles semánticos**: usar `<button>`, `<a>`, `<section>`, `<article>` correctamente. `<div>` con onClick es señal de algo mal.
- **Headings jerárquicos**: una `<h1>` por página (en el Hero). Sub-secciones `<h2>`, dentro `<h3>`. No saltar niveles para usar un tamaño.
- **Skip link**: existe en `BaseLayout.astro` — `<a href="#main" class="skip-link">Saltar al contenido</a>`. No tocar.
- **Aria-label** en botones de solo icon, **aria-labelledby** en sections.
- **prefers-reduced-motion**: respetado en `global.css`. Si agregás animación custom, envolver en `@media (prefers-reduced-motion: no-preference)` o cortar duration a 0.01ms.

## Dark mode

Dos triggers:
- `<html data-theme="dark">` — manual (toggle UI).
- `prefers-color-scheme: dark` + sin `data-theme="light"` — automático (system).

Si agregás un color, **agregalo a la sección dark de `tokens.css`** también. Sin excepciones.

## Variables clave que aparecen seguido

```css
/* Texto */
color: var(--color-text-primary);    /* body */
color: var(--color-text-secondary);  /* lede, descripciones */
color: var(--color-text-muted);      /* meta, footnotes */
color: var(--color-text-brand);      /* acentos en italic */
color: var(--color-text-inverted);   /* sobre fondos oscuros */

/* Backgrounds */
background: var(--color-bg);              /* base */
background: var(--color-bg-elevated);     /* cards subidos */
background: var(--color-bg-inverted);     /* sección Contacto */
background: var(--color-surface-subtle);  /* hover ghost */

/* Borders */
border-color: var(--color-border-subtle);
border-color: var(--color-border-strong);

/* Tipografía */
font-family: var(--font-display);
font-family: var(--font-sans);
line-height: var(--leading-relaxed);
letter-spacing: var(--tracking-tighter);

/* Spacing */
padding-block: var(--space-section);
gap: var(--space-5);
margin-inline: auto;
padding-inline: var(--space-gutter);

/* Radii y elevación */
border-radius: var(--radius-pill);
box-shadow: var(--shadow-md);
```
