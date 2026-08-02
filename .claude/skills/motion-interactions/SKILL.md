---
name: motion-interactions
description: Animaciones premium con Motion 12 / GSAP+ScrollTrigger / Lenis. Scroll storytelling, parallax sutil, micro-interacciones en CTAs, reveal por viewport, smooth scroll. Triggers — "animar X", "entrada por scroll", "parallax", "hover de un botón", "transición entre páginas", "que aparezca cuando", "scroll storytelling", "se mueve raro en mobile". NO usar para layout (eso es ux-ui-design) ni para optimización general (eso es seo-performance).
---

# Motion + interactions UTE

UTE no es un sitio sin animaciones, pero **no es Awwwards-bait**. Cada animación tiene que tener un motivo: guiar atención, dar feedback, aliviar transiciones bruscas, comunicar premium. Animar por animar resta.

## Stack

- **Motion 12** (`motion`, sucesor de framer-motion) — animaciones imperativas y declarativas, integra bien con React islands. **Default para componente React interactivo**.
- **GSAP 3** + ScrollTrigger — para timelines complejas vinculadas a scroll (parallax pesado, scroll storytelling). Más manejable que IntersectionObserver crudo cuando hay 3+ elementos coreografeados.
- **Lenis 1.3** — smooth scroll. Ya integrado en `src/components/SmoothScroll.tsx`, cliente `client:idle`, **condicional a `prefers-reduced-motion: no-preference`**.
- **CSS transitions** — para hovers simples (transform, color, opacity). No traer Motion para esto.

## Regla 1 — `prefers-reduced-motion: reduce` siempre

Hard rule. Tres formas de respetarlo según el caso:

### CSS

`global.css` ya neutraliza durations + animations:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Si agregás keyframes custom, envolvelos:

```css
@media (prefers-reduced-motion: no-preference) {
  .my-fancy {
    animation: float 4s ease-in-out infinite;
  }
}
```

### JS / Motion

Usá `prefersReducedMotion()` de `src/lib/motion.ts`:

```tsx
import { prefersReducedMotion, reveal } from '@/lib/motion';

const isReduced = prefersReducedMotion();
const props = isReduced ? {} : reveal;
```

### Lenis

Ya cortado en `SmoothScroll.tsx`. **No instanciar Lenis sin chequear primero**.

## Regla 2 — Performance budget

Animar `transform`, `opacity`, `filter` (con cuidado). **Nunca** animar `top/left/width/height` salvo Layout micro de UI no críticos. Cada propiedad costosa requiere justificarse.

- Componentes con animación de entrada → `will-change: transform, opacity` solo durante la transición, no permanente.
- Antes de mergear, abrir DevTools → Performance, grabar el scroll por la página. **60fps consistente** o lo cortás.
- Mobile chequear en device real (iPhone SE 2020 / Android mid-range). El simulator miente.

## Regla 3 — Tokens de motion

Salen de `tokens.css`:

```
--ease-emphasized   cubic-bezier(0.2, 0, 0, 1)      → entradas, hovers premium
--ease-out-expo     cubic-bezier(0.16, 1, 0.3, 1)   → reveals largos
--ease-out-quart    cubic-bezier(0.25, 1, 0.5, 1)   → defaults UI
--ease-expressive   cubic-bezier(0.65, 0, 0.35, 1)  → toggles, accordions

--dur-instant   80ms     → tooltips, micro feedback
--dur-fast      160ms    → hover de UI
--dur-normal    260ms    → page transitions, focus
--dur-slow      420ms    → reveals
--dur-slower    640ms    → reveals editoriales
--dur-cinematic 1.4s     → solo Hero / hero subhead
```

Los mismos están duplicados en `src/lib/motion.ts` como JS objects (`ease`, `dur`).

## Patrones por contexto

### Hover en CTAs

CSS-only:

```css
.cta {
  transition:
    transform var(--dur-fast) var(--ease-standard),
    background-color var(--dur-fast) var(--ease-standard);
}
.cta:hover {
  transform: translateY(-1px);
  background-color: var(--color-brand-600);
}
.cta:active {
  transform: translateY(0);
}
```

No usar Motion para esto. CSS es más liviano y respeta `prefers-reduced-motion` automáticamente.

### Reveal por viewport (Motion)

```tsx
import { motion } from 'motion/react';
import { reveal } from '@/lib/motion';

<motion.h2 {...reveal}>Título que aparece</motion.h2>;
```

`reveal` preset: opacity 0→1, y 24→0, duration 0.64s, ease outExpo, viewport once. **Stagger** entre items secuenciales con `transition.delay`.

### Scroll storytelling (GSAP)

Solo para coreografías de 3+ elementos pinned. Para reveals individuales, Motion es mejor.

```tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

useEffect(() => {
  if (prefersReducedMotion()) return;
  const ctx = gsap.context(() => {
    gsap
      .timeline({
        scrollTrigger: { trigger: '.scene', start: 'top top', end: '+=200%', pin: true, scrub: 1 },
      })
      .to(/* ... */);
  }, scope);
  return () => ctx.revert();
}, []);
```

Notas:

- `gsap.context()` con `ctx.revert()` en cleanup es **no negociable** (memory leaks si no).
- `scrub: 1` (no `true`) — atado al scroll con un poco de inercia, mejor sensación.
- En React island, montar como `client:visible` (no `client:load`) para no bloquear LCP.

### Parallax sutil

Background image que se mueve a ~0.3x del scroll. Solo en hero o un bloque específico. Mejor con CSS `background-attachment: fixed` cuando aplica (cuidado mobile) o GSAP con `y` modulado.

### Page transitions

Astro tiene `<ClientRouter />` (View Transitions API nativo). Para institucional con pocas páginas, **no es necesario** todavía — añade complejidad y bug surface. Si más adelante hay más de 4 páginas y se siente lento navegando, evaluamos.

## Lenis — smooth scroll

Configurado en `src/components/SmoothScroll.tsx`:

- `lerp: 0.1` — suave pero responsivo.
- `smoothWheel: true`, `syncTouch: false` — touch nativo (interferir con touch es UX horrible mobile).
- Se monta `client:idle` para no bloquear LCP.
- Agrega `class="has-lenis"` a `<html>` y quita `scroll-behavior: smooth` del CSS (los pisa).

Si necesitás `scrollTo()` programático con Lenis, importá la instancia desde un contexto compartido (TODO: crear `useLenis()` cuando aparezca el caso).

## Micro-interacciones que sí valen

- Cursor con un dot/halo que sigue al puntero (solo desktop, `hover:hover`). Idea visual de marca candidata.
- Botón que cambia el icono direccional al hover (`→` ligeramente más a la derecha).
- Número de teléfono que copia al click + flash de "Copiado".
- Texto display con underline animado que aparece al hover de un link de cita.

## Micro-interacciones que NO

- Loaders saltarines en page load.
- Skeletons en componentes ya cargados.
- Tilt 3D en cards (gimmick).
- Cualquier cosa que requiera el cursor "para descubrir" funcionalidad clave (a11y rompe).
- Sound effects (a menos que el cliente lo pida explícitamente y firme el costo de UX).

## Debug rápido cuando "se mueve raro"

1. ¿`prefers-reduced-motion: reduce` está activo? (devtools → rendering)
2. ¿El elemento tiene `will-change` permanente? Removerlo.
3. ¿Está animando width/height? Pasar a transform: scale.
4. ¿Hay layout shift en el viewport durante la animación? Reservar espacio con min-height.
5. ¿Lenis se montó dos veces? (revisar HMR en dev — destroy en cleanup).
