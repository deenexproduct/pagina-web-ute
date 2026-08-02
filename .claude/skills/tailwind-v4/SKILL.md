---
name: tailwind-v4
description: Patrones de Tailwind CSS v4 CSS-first usados en QUEM Central — `@theme inline`, `@layer`, oklch colors, container queries, design tokens via custom properties, vite plugin (@tailwindcss/vite). Triggers — "cómo uso Tailwind v4", "@theme", "container query", "oklch en tokens", "cómo agrego un color/spacing a Tailwind", "por qué no me aparece la utility", "Tailwind config". NO usar para escala fluida tipográfica con clamp() (eso es type-system / ux-ui-design).
---

# Tailwind v4 — patrones del proyecto

QUEM Central usa **Tailwind v4 CSS-first** vía `@tailwindcss/vite`. No hay `tailwind.config.js`. Toda la config vive en CSS:

- `src/styles/tokens.css` — `:root` con `--color-*`, `--font-size-*`, etc.
- `src/styles/global.css` — `@import 'tailwindcss'` + `@theme inline { ... }` que mapea las variables a utilidades de Tailwind.

## Cómo agregar un valor nuevo

1. **Agregar al token primero** en `tokens.css`:

   ```css
   :root {
     --color-brand-150: oklch(96% 0.04 252); /* tint nuevo */
   }
   ```

2. **Exponerlo a Tailwind** en `global.css` dentro de `@theme inline`:

   ```css
   @theme inline {
     --color-brand-150: var(--color-brand-150);
   }
   ```

3. **Usar la utility automáticamente generada**:
   ```html
   <div class="bg-brand-150">…</div>
   ```

## Prefijos generados por `@theme`

| `@theme` key          | Utility class generada                                     |
| --------------------- | ---------------------------------------------------------- |
| `--color-<name>`      | `bg-<name>`, `text-<name>`, `border-<name>`, `ring-<name>` |
| `--font-<name>`       | `font-<name>`                                              |
| `--text-<name>`       | `text-<name>` (font-size)                                  |
| `--radius-<name>`     | `rounded-<name>`                                           |
| `--shadow-<name>`     | `shadow-<name>`                                            |
| `--spacing-<name>`    | `p-<name>`, `m-<name>`, `gap-<name>`, etc.                 |
| `--container-<name>`  | `max-w-<name>`                                             |
| `--ease-<name>`       | `ease-<name>`                                              |
| `--breakpoint-<name>` | `<name>:` prefix variant                                   |

## Modo CSS-first

Patrón canónico del proyecto: **mezclar CSS scoped con utilities de Tailwind**.

- **Layout y wrappers** → Tailwind: `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">`.
- **Pieza con identidad visual** (Hero, Card de Equipo) → CSS scoped dentro de `<style>` del `.astro`, con BEM-ish.
- **Botones / chips reutilizables** → clases globales en `global.css` (`.btn`, `.btn-primary`).

No usar `@apply` en producción — Tailwind v4 lo desaconseja por overhead.

## `@layer` — controlar el orden de cascada

Tailwind v4 usa **cascade layers** internamente. Si necesitás overrides, escribilos en `@layer utilities` para ganar especificidad sin `!important`:

```css
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## Colores en oklch

Patrón del proyecto: todos los colores en `oklch()` para mejor mezcla perceptual.

```css
:root {
  --color-brand-500: oklch(42% 0.19 252);
}
```

Ventaja sobre HSL: hue uniforme entre tonos, lightness predecible. Para alpha:

```css
background: oklch(from var(--color-brand-500) l c h / 0.18);
```

Esto **toma** L/C/H de la variable y le aplica el alpha. Útil para tints/shades on-the-fly.

## Container queries

Tailwind v4 los soporta nativos. Para que un card responda al **ancho de su contenedor** (no el viewport):

```html
<div class="@container">
  <div class="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3">…</div>
</div>
```

Breakpoints del container query:

- `@sm:` (24rem ≈ 384px del contenedor)
- `@md:` (28rem)
- `@lg:` (32rem)
- etc. — definibles en `@theme`.

Útil para cards que aparecen en sidebar Y full-width: se adapta al ancho real disponible.

## Reset & preflight

Tailwind v4 trae preflight reset. Si querés desactivarlo (raro), `@import 'tailwindcss/preflight' layer(base);` controla cómo cargarlo.

En el proyecto, NO desactivamos preflight pero **agregamos resets propios** en `global.css` (margin/padding cero, box-sizing, image display block). Eso vive en `@layer base` implícito.

## Anti-patrones

- **`@apply` masivo** — pérdida de performance, código difícil de leer. Usar CSS scoped con custom props.
- **Hardcodear colores hex** en clases (`class="bg-[#1E3E9C]"`) — siempre via token.
- **No usar `@theme inline`** — si el color está solo en `:root` pero no en `@theme`, no se genera la utility de Tailwind.
- **Variables fuera de `:root`** — no funcionan con `@theme inline`. Si necesitás scoping (dark mode), usar otro selector específico (`[data-theme='dark']`) y duplicar.

## Tipografía + Tailwind

Las fuentes están self-hosted via `@fontsource-variable/*` en `global.css`:

```css
@import '@fontsource-variable/inter/index.css';
```

Y mapeadas:

```css
@theme inline {
  --font-display: 'Inter Variable', system-ui, sans-serif;
  --font-sans: 'Inter Variable', system-ui, sans-serif;
}
```

Uso: `font-display` o `font-sans` como utility.

## Cómo NO romper la web

- Antes de agregar una utility custom, chequear si ya existe con el patrón Tailwind. Ej: en vez de `flex-center`, usar `flex items-center justify-center`.
- No mezclar Tailwind con frameworks CSS pesados (Bootstrap, MUI). Pelean por cascade.
- Si una pieza necesita 10+ classes Tailwind para layout simple, abstraela a `.btn` global o CSS scoped.
