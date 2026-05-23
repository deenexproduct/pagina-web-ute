---
name: responsive-mobile-first
description: Breakpoints, tipografía fluida con clamp(), touch targets ≥44px, layout que no se rompe de 320px a 4K. Triggers — "se ve mal en mobile", "qué breakpoint uso", "fluid type", "touch hit area", "se corta en iPad", "ancho del container", "el menu hamburguesa", "scroll horizontal indeseado". NO usar para motion (motion-interactions) ni SEO/perf (seo-performance).
---

# Responsive + mobile-first UTE

UTE empieza en mobile y crece. **No al revés**. Probar primero en 320px, después en 4K. Si en 320 algo se rompe, la página está rota — punto.

## Breakpoints

Definidos en `tokens.css` como `--bp-*` (referencia). Tailwind v4 usa los breakpoints estándar:

| Token / TW | Min width | Uso                              |
|------------|-----------|----------------------------------|
| `xs` (custom) | 360px | smallest target real (iPhone SE) |
| `sm`       | 640px     | mobile landscape, phablet         |
| `md`       | 768px     | tablet portrait                   |
| `lg`       | 1024px    | tablet landscape, laptop          |
| `xl`       | 1280px    | desktop                           |
| `2xl`      | 1536px    | wide desktop                      |

**No usar `xs` ni `2xl` salvo necesidad clara** — 90% del responsive vive entre `sm` y `lg`.

## Mobile-first real

CSS escrito así:

```css
/* default = mobile */
.hero__grid { grid-template-columns: 1fr; gap: var(--space-5); }

@media (min-width: 768px) {
  .hero__grid {
    grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
    grid-template-areas: 'title meta';
  }
}
```

Tailwind:
```html
<div class="grid grid-cols-1 gap-5 md:grid-cols-[8fr_4fr] md:gap-7">
```

**Mal**:
```css
.hero__grid { grid-template-columns: 8fr 4fr; }
@media (max-width: 767px) { .hero__grid { grid-template-columns: 1fr; } }
```

Esto es desktop-first y siempre termina con bugs en mobile.

## Tipografía fluida (no usar media queries para text size)

La escala en `tokens.css` ya tiene `clamp(min, fluid, max)` calibrada para 320→1440. **No agregues media queries para cambiar `font-size`**.

Si necesitás un tamaño distinto, usar otro token:

```css
/* mal */
.hero__title { font-size: 32px; }
@media (min-width: 768px) { .hero__title { font-size: 64px; } }

/* bien */
.hero__title { font-size: var(--font-size-display); }  /* clamp 64→144px */
```

Si **realmente** necesitás un valor que no está en la escala, agregalo a `tokens.css` con su clamp. No hardcodees.

## Spacing fluido

Para padding-block de sections y gutters laterales:

```css
.section-y { padding-block: var(--space-section); }       /* clamp(4rem, 7vw, 10rem) */
.container-content { padding-inline: var(--space-gutter); } /* clamp(1.25rem, 4vw, 3rem) */
```

Para spacing interno de bloques **fijo** (gaps entre elementos), usar la escala step (`--space-3`, `--space-5`, ...). No fluidos.

## Container

Variables:
- `--container-max: 1440px` — ancho máx de contenido.
- `--container-content: 72ch` — bloques de texto.

Helper en `global.css`:
```css
.container-content {
  width: 100%;
  max-width: var(--container-max);
  padding-inline: var(--space-gutter);
  margin-inline: auto;
}
```

Para bloques de texto largo (artículos, prensa), envolver en un `<div style="max-width: var(--container-content)">` dentro del container.

## Touch targets ≥44×44px

iOS HIG y WCAG. Cualquier control interactivo (botón, link inline, icono clickeable) **mínimo 44×44px de área tocable**, no de visible.

Implementación:
```css
.cta { min-height: 44px; min-width: 44px; padding: 0.9rem 1.5rem; }
```

Si visualmente parece más chico (un icon button de 24px), usar padding o `:before` invisible para extender el hit area:

```css
.icon-button { position: relative; }
.icon-button::before {
  content: '';
  position: absolute;
  inset: -10px;  /* 24 + 20 = 44 */
}
```

Links inline en texto corrido = excepción aceptable (no se puede dar 44px sin destruir el flow). Pero si es CTA disfrazado de link, dar el tamaño.

## Layouts típicos

### Grilla asimétrica responsive

Pattern de Hero y Propuesta:
```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: var(--space-7);
  }
}
```

`minmax(0, Nfr)` evita que items con contenido grande revienten la grilla (default `minmax(auto, Nfr)`).

### Stack vertical en mobile, side-by-side en desktop

```css
.row { display: grid; gap: var(--space-5); }
@media (min-width: 640px) { .row { grid-template-columns: repeat(2, 1fr); } }
```

### Lista numerada (Experiencia)

```css
.list li { grid-template-columns: 1fr; }   /* mobile: stack */
@media (min-width: 768px) {
  .list li { grid-template-columns: 6rem minmax(0, 1fr) minmax(0, 2fr); }
}
```

### Sticky header (cuando se agregue)

```css
header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  backdrop-filter: blur(var(--blur-md));
}
```

Tener en cuenta `100vh` vs `100svh`:
- `100vh` — incluye chrome del browser → CLS al scroll en mobile.
- `100svh` — small viewport, sin chrome → estable.
- `100dvh` — dynamic, ajusta al chrome → para hero full-bleed.

## Imágenes responsive

Con `<Image>` de Astro:

```astro
<Image
  src={heroImg}
  alt="..."
  widths={[640, 1024, 1440, 1920]}
  sizes="(max-width: 768px) 100vw, 80vw"
  loading="eager"
/>
```

Sin `sizes`, el browser asume 100vw y descarga la versión grande siempre. **Siempre poner `sizes`** para imágenes que no son full-bleed.

## Anti-patrones

- **`overflow-x: hidden` en body** para tapar bug responsive. Encontrá el elemento que sobresale y arreglálo.
- **`100vw` para containers** — incluye scrollbar, genera 17px de horizontal scroll en desktop Windows. Usar `100%`.
- **Cambiar text-size con media queries** cuando hay clamp disponible.
- **`display: none` para mobile** sin alternativa — escondés contenido a 60% de usuarios.
- **Hamburger menu por default** — si tenés 4 links, fit en mobile inline.
- **Touch target chico** porque "en desktop se ve fine".
- **Tablet ignorado** (768–1023) — es un breakpoint real, especialmente en hotelería/restaurantes (la gente reserva desde el iPad de la oficina).

## Debug rápido

1. Devtools → toggle device (iPhone SE, iPad mini, Pixel 7).
2. Devtools → responsive mode → arrastrar desde 320 hasta 1920 lentamente. Cualquier "salto" feo se ve.
3. Real device — un iPhone barato y un Android mid-range. El simulator omite cosas.
4. Rotar — landscape mobile es un layout aparte, especialmente con notch.
5. **Cubre teclado virtual** — abrir un input cerca del bottom, ver si quedan tapeados los CTAs.

## Checklist responsive antes de mergear

- [ ] 320px no scroll horizontal indeseado.
- [ ] iPhone SE landscape (568×320) — no se rompe el Hero.
- [ ] iPad portrait (768) — layout intermedio existe, no salta directo a desktop.
- [ ] 1440 — el container respeta `--container-max`, no se estira infinito.
- [ ] 4K (2560+) — texto no minúsculo, contenido se mantiene en `--container-max`.
- [ ] Touch targets ≥44 — devtools inspector mide visualmente.
- [ ] Imágenes con `sizes` no descargan más KB de los necesarios (devtools → Network).
