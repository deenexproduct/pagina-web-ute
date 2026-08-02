# Skills del proyecto QUEM Central

Skills versionadas en el repo — viajan con el proyecto, las edita cualquier sesión futura. Cada carpeta = un skill, con `SKILL.md` adentro (frontmatter YAML + instrucciones).

## Skills propias (14)

### Arquitectura y contenido

| Skill                                                 | Para qué                                                                          |
| ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| [`landing-page`](./landing-page/SKILL.md)             | Arquitectura de secciones de landing, jerarquía de CTAs, copy framework UTE-tono. |
| [`brand-quem-central`](./brand-quem-central/SKILL.md) | Voz, paleta, tipografía y reglas visuales de QUEM Central / Corner QÜEM.          |
| [`ux-ui-design`](./ux-ui-design/SKILL.md)             | Sistema de diseño: tokens, escala fluida, grilla, estados, accesibilidad WCAG AA. |

### Stack frontend

| Skill                                                           | Para qué                                                                                                |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [`tailwind-v4`](./tailwind-v4/SKILL.md)                         | Patrones de Tailwind v4 CSS-first — `@theme inline`, oklch, container queries, layers.                  |
| [`astro-patterns`](./astro-patterns/SKILL.md)                   | Patrones avanzados de Astro 6 — islands, client directives, scoped styles, `<Image>`, view transitions. |
| [`responsive-mobile-first`](./responsive-mobile-first/SKILL.md) | Breakpoints, tipografía fluida con `clamp()`, touch targets ≥44px, layout 320px → 4K.                   |

### Visual y motion

| Skill                                                   | Para qué                                                                                 |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [`icon-system`](./icon-system/SKILL.md)                 | SVG inline custom — stroke 1.6, viewBox 24/28/32, currentColor, sin librerías de iconos. |
| [`motion-interactions`](./motion-interactions/SKILL.md) | Motion 12 / GSAP+ScrollTrigger / Lenis, presets, reglas de `prefers-reduced-motion`.     |
| [`micro-interactions`](./micro-interactions/SKILL.md)   | Hover, focus, active, loading, success, error states. Patrones específicos del proyecto. |
| [`scroll-storytelling`](./scroll-storytelling/SKILL.md) | Scroll-spy, reveal por viewport, Lenis smooth scroll, scroll-padding, parallax sutil.    |

### Calidad

| Skill                                                     | Para qué                                                                                     |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`a11y-deep`](./a11y-deep/SKILL.md)                       | WCAG 2.2 AA profundo, ARIA patterns, focus management, lectores, navegación por teclado.     |
| [`performance-frontend`](./performance-frontend/SKILL.md) | Core Web Vitals, budgets, optimización de imágenes/fonts/JS/CSS, Lighthouse 95+.             |
| [`seo-performance`](./seo-performance/SKILL.md)           | Meta + Open Graph, schema.org `Organization`/`LocalBusiness`, sitemap.                       |
| [`form-ux`](./form-ux/SKILL.md)                           | UX de formularios — validation patterns, error/success states, Formspree/Netlify, anti-spam. |

## Marketplace oficial — qué está disponible globalmente

Skills del plugin oficial (`anthropic-skills`) disponibles sin versionar acá:

- `anthropic-skills:skill-creator` — crear/editar/medir skills.
- `anthropic-skills:consolidate-memory` — gestión de memoria persistente.
- `anthropic-skills:docx`, `:pptx`, `:xlsx`, `:pdf` — generar y leer Office/PDF (útil para brochures, decks de prensa).

Y de plugins community potencialmente útiles:

- `engineering:code-review`, `:testing-strategy`, `:documentation`, `:system-design`, `:architecture`, `:deploy-checklist`, `:debug`.
- `landing-builder` — patrones generales de landing pages.
- `frontend-slides` — presentaciones HTML.

Para explorar más marketplaces oficiales / community: ejecutar `/plugin` en sesión de Claude Code y navegar a Discover.

## Cómo se invocan

Las skills se activan **automáticamente** cuando lo que escribís coincide con su `description` (frontmatter). No hace falta tipearlas. Si querés forzar una, escribí `/<nombre-skill>`.

Para ver qué skills están activas en una sesión: la lista aparece en el system reminder al inicio.
