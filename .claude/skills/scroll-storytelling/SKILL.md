---
name: scroll-storytelling
description: Scroll-driven animations, scroll-spy nav, scroll reveal con IntersectionObserver, GSAP ScrollTrigger, Lenis smooth scroll, CSS scroll-driven animations nativas. Triggers — "animar al scroll", "scroll spy", "reveal sections", "parallax sutil", "scroll-driven CSS", "scroll-margin", "smooth scroll", "lenis", "scrollytelling".
---

# Scroll storytelling — QUEM Central

Patrones para narrar a través del scroll. La landing tiene 12 bloques verticales — bien orquestados, el scroll cuenta una historia. Mal hechos = ruido.

## Stack del proyecto

- **Lenis 1.3** — smooth scroll vanilla. En `src/components/SmoothScroll.tsx`, montado con `client:idle`. Cortado por `prefers-reduced-motion`.
- **IntersectionObserver** — usado en Header.astro para scroll-spy del nav.
- **CSS** — `scroll-behavior: smooth` (fallback), `scroll-padding-top` para anchors no tapados.
- **GSAP + ScrollTrigger** — instalado pero hoy NO se usa. Disponible si se necesita scrollytelling pesado.
- **CSS scroll-driven animations nativas** — Chrome 115+. Aún no broad support, polyfill via JS.

## Scroll spy del nav (ya implementado)

`Header.astro` usa IntersectionObserver con `rootMargin: '-25% 0px -55% 0px'` para detectar la sección en el "carril central" del viewport.

```js
const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (visible) setActive(visible.target.id);
  },
  { rootMargin: '-25% 0px -55% 0px', threshold: 0 },
);
```

El `rootMargin` define un "carril" virtual dentro del viewport. Solo cuando una sección entra ahí, se marca activa. Evita flickering entre secciones.

## Smooth scroll con Lenis

Lenis intercepta el scroll del browser y lo interpola. Setup ya está:

```ts
// src/components/SmoothScroll.tsx
const lenis = new Lenis({
  lerp: 0.1,             // 0.1 = suave, 0.05 = ultra-suave, 0.2 = rápido
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.2,
  syncTouch: false,      // touch nativo en mobile (interferir es UX horrible)
});
```

`lerp` es el lag perceptual. Sweet spot 0.08–0.12.

**No usar Lenis si**:
- El usuario tiene `prefers-reduced-motion: reduce` (ya está respetado).
- Browser no soporta requestAnimationFrame (raro).

## Anchors no tapados por header sticky

En `global.css`:

```css
html {
  scroll-padding-top: calc(var(--header-height) + 1rem);
}
```

Cuando el browser navega a `#corner-quem`, deja `4.5rem + 1rem = 88px` de margen arriba. La sección no queda escondida bajo el header.

Para offsets distintos por sección, usar `scroll-margin-top` en el target:

```css
#corner-quem { scroll-margin-top: 6rem; }
```

## Reveal por viewport con Motion (presets del proyecto)

`src/lib/motion.ts` exporta presets para usar con la lib `motion`:

```ts
export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px -10% 0px' },
  transition: { duration: dur.slower, ease: ease.outExpo },
};
```

Uso en componente React:

```tsx
import { motion } from 'motion/react';
import { reveal } from '@/lib/motion';

<motion.h2 {...reveal}>Título que aparece</motion.h2>
```

**Hoy NO está usado** en QUEM Central — la web es 99% estática. Si querés agregar reveal por scroll a las secciones, convertir el wrapper en React island con `client:visible`:

```astro
<Reveal client:visible>
  <h2>Sección que aparece al scroll</h2>
</Reveal>
```

Costo: agregar JS de motion (~6 KB gzipped). Decisión performance vs polish.

## Reveal con IntersectionObserver (sin React)

Mejor performance para 5+ elementos. CSS + vanilla JS:

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
}
[data-reveal][data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  [data-reveal] { opacity: 1; transform: none; }
}
```

```js
const items = document.querySelectorAll('[data-reveal]');
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.setAttribute('data-revealed', '');
        obs.unobserve(e.target);
      }
    });
  },
  { rootMargin: '0px 0px -10% 0px' },
);
items.forEach((i) => obs.observe(i));
```

Plug-and-play: marcar elementos con `data-reveal` y se animan al entrar.

## GSAP ScrollTrigger — cuando vale la pena

GSAP + ScrollTrigger está instalado. Útil para:

- **Scrub animations** (animación atada al progreso del scroll, no a viewport entry):
  ```js
  gsap.to('.hero__title', {
    y: 200,
    opacity: 0,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
  ```
  Texto que se va arriba mientras hacés scroll, atado al scroll position.

- **Pin sections** (sección que se "fija" mientras el contenido interno scrollea):
  ```js
  gsap.timeline({
    scrollTrigger: { trigger: '.scene', start: 'top top', end: '+=200%', pin: true, scrub: 1 },
  })
    .to('.layer-1', { x: 200 })
    .to('.layer-2', { x: -200 }, '<');
  ```

- **Horizontal scroll sections**.

Para QUEM Central institucional, **probablemente NO necesario**. Sumar solo si:
- Hay sección storytelling (e.g., "Cómo funciona Corner QÜEM" con scroll horizontal step-by-step).
- Cliente pide algo cinematográfico para el hero.

Costo: ~30 KB gzipped (GSAP core + ScrollTrigger).

## CSS scroll-driven animations (futuro)

Chrome/Edge 115+, Safari/Firefox detrás. Sin JS, animaciones atadas al scroll:

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.section {
  animation: fade-up linear;
  animation-timeline: view();
  animation-range: entry 0% entry 50%;
}
```

`animation-timeline: view()` atea la animación a la posición del elemento en viewport. `animation-range: entry 0% entry 50%` define el rango.

Cuando el support sea mainstream (~2026), migrar a esto y bajar JS.

## Parallax sutil

Para el hero, mover el background a velocidad distinta al contenido. Patrón ligero:

```css
.hero__bg {
  transform: translateY(var(--parallax, 0));
}
```

```js
window.addEventListener('scroll', () => {
  document.querySelector('.hero__bg')?.style.setProperty('--parallax', `${window.scrollY * 0.3}px`);
}, { passive: true });
```

`0.3` = el bg se mueve al 30% del scroll. Cortar con `prefers-reduced-motion`.

Hoy QUEM Central NO usa parallax. Si se agrega, sutil — más de 0.3 se siente "demo de portfolio".

## Sticky reveal con CSS

Para sección "Qué incluye el modelo" (Corner Incluye), patrón sticky:

```html
<section class="sticky-section">
  <div class="sticky-section__sticky">
    <h2>Título que queda fijo</h2>
  </div>
  <div class="sticky-section__cards">
    <div>Card 1</div>
    <div>Card 2</div>
    <div>Card 3</div>
  </div>
</section>
```

```css
.sticky-section { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; }
.sticky-section__sticky { position: sticky; top: 6rem; align-self: start; height: max-content; }
```

El título se queda fijo mientras las cards scrollean. Storytelling sutil.

## Anti-patrones

- **`smooth-scroll` con duración fija** (e.g., 800ms para cualquier distancia) — se siente lento en distancias cortas.
- **Hijack del scroll** (scroll-snap agresivo, scrolljacking) — usuario pierde control.
- **Animaciones de reveal lentas** (>1s) — el usuario ya scrolleó más.
- **Reveal en EVERY element** — fatiga visual. Aplicar a section heads y cards principales solamente.
- **GSAP cargado para una sola interacción simple** — usar IntersectionObserver vanilla.
- **`scroll-behavior: smooth` + Lenis** sin coordinar — pelean. Por eso `html.has-lenis { scroll-behavior: auto; }`.
- **Parallax fuerte en mobile** — drenaje de batería + jank.

## Test de scroll storytelling

1. Scrollear de top a bottom lentamente. ¿Cada sección "presenta" naturalmente?
2. Scrollear rápido. ¿Las animaciones se sienten apuradas o se ven mal?
3. `prefers-reduced-motion: reduce` activado. ¿Sigue siendo legible?
4. Mobile real, dedo en pantalla. ¿Lenis no interfiere con scroll nativo?
5. Tab navigation. ¿El scroll-padding-top hace que el elemento focused quede visible?
