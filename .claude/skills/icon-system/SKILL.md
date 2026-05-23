---
name: icon-system
description: Sistema de iconografía SVG inline custom usado en QUEM Central (sin librerías de íconos externas). Triggers — "agregar icono", "qué icono uso para X", "SVG inline", "icono para categoría/venue/formato", "stroke width", "Heroicons / Lucide / Phosphor — debería usar?".
---

# Icon system — QUEM Central

La web usa **SVG inline custom**, no Heroicons / Lucide / Phosphor / Font Awesome. Razones:

1. **Peso**: cero KB de librería. Solo los iconos que realmente usás.
2. **Coherencia visual**: todos los iconos respetan el mismo grid + stroke width + radio.
3. **Identidad de marca**: el set custom es parte del look de QUEM Central — no se parece a "una web SaaS más".
4. **Performance**: SVG inline = cero requests, cero hidratación.

## Reglas del set

- **ViewBox**: 24×24 (default) o 28×28 (cards grandes) o 32×32 (panels y heroes).
- **Stroke width**: 1.4–1.8. Default 1.6.
- **Stroke-linecap**: `round`.
- **Stroke-linejoin**: `round`.
- **Fill**: `none` por default. Color via `currentColor` para heredar.
- **No mezclar stroke + fill** en el mismo icon. Pick one estilo.
- **Sin texto** dentro del SVG. Si necesitás label, va al lado.

## Snippet base

```astro
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="…" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

## Tamaño en CSS — no en `<svg>` attributes

Atributos `width`/`height` en HTML hacen al SVG raster. Mejor controlar size desde CSS para que herede del padre:

```css
.my-icon { width: 1.5rem; height: 1.5rem; color: var(--color-brand-600); }
.my-icon svg { width: 100%; height: 100%; }
```

⚠️ **Importante**: el reset de `global.css` tiene `img, svg { max-width: 100%; height: auto; }`. Eso puede estirar SVGs sin width fijo. Solución:
- Setear `width`/`height` explícitos en el wrapper.
- O agregar attributes `width="X" height="Y"` al SVG si necesitás bypass del reset.

## Patrones del proyecto

### Iconos por categoría de comida (`CategoriasProducto.astro`)

11 iconos custom, uno por categoría (buñuelos, empanadas, hamburguesas, etc.). Cada uno con un `hue` para gradient tonal del fondo de la card.

Convención: el `path` se define en `ICONS` map dentro del componente. No hay archivos `.svg` separados — todo inline.

### Iconos por venue (`CornerDonde.astro`)

12 iconos custom de tipos de espacio (supermercado, café, club, gym, etc.). Conditional rendering por nombre:

```astro
{v.icon === 'cafe' && (
  <svg viewBox="0 0 32 32" fill="none">
    <path d="M6 12h20v8c0 4-3 8-10 8s-10-4-10-8v-8Z" stroke="currentColor" stroke-width="1.6"/>
  </svg>
)}
```

### Iconos por formato corner (`CornerFormatos.astro`)

5 iconos custom para los formatos (vertical, exhibidor, isla, mini store, grab & go). ViewBox variable (`48x60`, `64x48`, `64x48`, `64x48`, `48x48`) según orientación del freezer.

### Iconos UI (arrows, checks, close, menu)

Mini-set de 4-5 iconos que se repiten en CTAs, validations, mobile menu. Inline en cada componente.

## Si vas a agregar un icono nuevo

1. **Diseñalo en el viewBox 24×24** (o 28×28 si va en card grande).
2. **Path simple** — 1 a 4 paths como máximo. Si necesitás más detalle, probablemente sea una ilustración (no un icono).
3. **Stroke 1.6, round joins/caps**.
4. **Inline en el componente** donde se usa. Si lo usás en 2+ lugares, considera extraerlo a `src/components/icons/<Name>.astro`.

Para componentes icon reutilizables:

```astro
---
// src/components/icons/IconArrowUpRight.astro
interface Props { size?: number; class?: string; }
const { size = 14, class: className = '' } = Astro.props;
---
<svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" class={className}>
  <path d="M3.5 10.5 10.5 3.5M10.5 3.5H5M10.5 3.5V9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

## Color y estados

- **Color**: `currentColor` siempre. El parent controla via CSS `color`.
- **Estados hover**: animar `color` o `transform: scale()` / `rotate()` en el SVG.
- **Filled vs outline**: el proyecto usa outline 99% del tiempo. Filled solo para indicadores (dots, badges).

## Animación

Para iconos que rotan / cambian:

```css
.cta:hover .cta__arrow { transform: translateX(2px); }
.cta { transition: ... }
```

Animar `stroke-dashoffset` para path animations (logo intro). Hoy NO se usa.

## A11y

- `aria-hidden="true"` si el SVG es decorativo (lleva texto al lado).
- `role="img"` + `aria-label="..."` si el SVG ES la única info (botones de solo icon).

## Anti-patrones

- **`@import` de font-icon** (Font Awesome CDN) — 300KB+ de CSS, todos los iconos cargados.
- **`<img src="icon.svg">`** — pierde `currentColor`, no heredan estilos.
- **Diferentes stroke widths** entre iconos del mismo set — rompe coherencia visual.
- **ViewBox extraño** (e.g., `0 0 23.5 27`) — usar siempre múltiplos de 4.
- **Iconos coloreados con fill hardcodeado** — siempre `currentColor`.

## Cuándo SÍ usar una librería

Si necesitás 50+ iconos diferentes (raro en una landing), considerar **Lucide** o **Phosphor**:

```bash
pnpm add @iconify/svelte
```

Pero para QUEM Central no aplica. El set custom + estilo coherente vale más que conveniencia.
