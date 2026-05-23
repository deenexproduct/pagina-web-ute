# Skills del proyecto QUEM Central

Skills versionadas en el repo — viajan con el proyecto, las edita cualquier sesión futura. Cada carpeta = un skill, con `SKILL.md` adentro (frontmatter YAML + instrucciones).

## Skills propias (6)

| Skill                                                            | Para qué                                                              |
|------------------------------------------------------------------|-----------------------------------------------------------------------|
| [`landing-page`](./landing-page/SKILL.md)                        | Arquitectura de secciones, jerarquía de CTAs, patrones de conversión, copy framework. |
| [`ux-ui-design`](./ux-ui-design/SKILL.md)                        | Sistema de diseño: escala tipográfica fluida, spacing, grilla, tokens, accesibilidad WCAG AA, estados. |
| [`motion-interactions`](./motion-interactions/SKILL.md)          | Animaciones con Motion / GSAP+ScrollTrigger, scroll storytelling, micro-interacciones, respetando `prefers-reduced-motion`. |
| [`seo-performance`](./seo-performance/SKILL.md)                  | Meta + Open Graph, schema.org `Organization`/`LocalBusiness`, sitemap, Core Web Vitals, objetivo Lighthouse 95+. |
| [`responsive-mobile-first`](./responsive-mobile-first/SKILL.md)  | Breakpoints, tipografía fluida con `clamp()`, touch targets ≥44px, layout que no se rompe de 320px a 4K. |
| [`brand-quem-central`](./brand-quem-central/SKILL.md)            | Voz, paleta, tipografía y reglas visuales de QUEM Central (dirección corporativo moderno + acento dorado pálido reemplazada por azul corporativo + acento verde). |

## Marketplace oficial — qué está disponible globalmente

Skills del plugin oficial (`anthropic-skills`) disponibles sin versionar acá:

- `anthropic-skills:skill-creator`
- `anthropic-skills:consolidate-memory`
- `anthropic-skills:docx`, `anthropic-skills:pptx`, `anthropic-skills:xlsx`, `anthropic-skills:pdf`

Y de plugins community/cowork potencialmente útiles:

- `engineering:code-review`, `engineering:testing-strategy`, `engineering:documentation`, `engineering:system-design`, `engineering:architecture`, `engineering:deploy-checklist`, `engineering:debug`.
- `landing-builder` (referencia, aunque QUEM Central es institucional, no landing de conversión).

Para revisar el marketplace oficial: abrir `/plugin` en una sesión de Claude Code y navegar a Discover.

## Cómo se invocan

Las skills se activan **automáticamente** cuando lo que escribís coincide con su `description` (frontmatter). No hace falta tipearlas. Si querés forzar una, escribí `/<nombre-skill>`.
