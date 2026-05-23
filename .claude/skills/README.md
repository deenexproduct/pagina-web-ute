# Skills del proyecto UTE

Skills versionadas en el repo — viajan con el proyecto, las edita cualquier sesión futura. Cada carpeta = un skill, con `SKILL.md` adentro (frontmatter YAML + instrucciones).

## Skills propias (6)

| Skill                                                     | Para qué                                                              |
|-----------------------------------------------------------|-----------------------------------------------------------------------|
| [`landing-page`](./landing-page/SKILL.md)                 | Arquitectura de secciones, jerarquía de CTAs, patrones de conversión, copy framework. |
| [`ux-ui-design`](./ux-ui-design/SKILL.md)                 | Sistema de diseño: escala tipográfica fluida, spacing, grilla, tokens, accesibilidad WCAG AA, estados (hover/focus/disabled). |
| [`motion-interactions`](./motion-interactions/SKILL.md)   | Animaciones premium con Motion / GSAP+ScrollTrigger, scroll storytelling, micro-interacciones, siempre respetando `prefers-reduced-motion`. |
| [`seo-performance`](./seo-performance/SKILL.md)           | Meta + Open Graph, schema.org `Restaurant`/`LocalBusiness`, sitemap, Core Web Vitals, objetivo Lighthouse 95+ en las 4 métricas. |
| [`responsive-mobile-first`](./responsive-mobile-first/SKILL.md) | Breakpoints, tipografía fluida con `clamp()`, touch targets ≥44px, layout que no se rompe de 320px a 4K. |
| [`brand-ute`](./brand-ute/SKILL.md)                       | Voz, paleta, tipografía y reglas visuales de UTE. **Provisorio hasta brand kit final.**       |

## Marketplace oficial — qué está disponible globalmente

Las siguientes skills llegan vía el plugin oficial de Anthropic (`anthropic-skills`) y están disponibles en cualquier sesión, no hace falta versionarlas acá:

- `anthropic-skills:skill-creator` — crear / mejorar / medir skills.
- `anthropic-skills:consolidate-memory` — gestión de memoria persistente.
- `anthropic-skills:docx`, `anthropic-skills:pptx`, `anthropic-skills:xlsx`, `anthropic-skills:pdf` — generar y leer documentos Office/PDF (útil si UTE necesita brochures, decks de prensa, presupuestos).

Y de plugins community/cowork potencialmente útiles:

- `engineering:code-review` — revisar PRs antes de mergear.
- `engineering:testing-strategy` — diseñar planes de test.
- `engineering:documentation` — escribir docs técnicos / runbooks.
- `engineering:system-design`, `engineering:architecture` — decisiones de arquitectura.
- `engineering:deploy-checklist` — verificación pre-deploy.
- `engineering:debug` — debugging estructurado.
- `frontend-slides` — presentaciones HTML (si en algún momento UTE necesita un deck).
- `landing-builder` — landing pages tradicionales (referencia útil, aunque UTE es institucional, no SaaS).

Si querés agregar más skills al scope de proyecto, instalarlas en `.claude/skills/<nombre>/SKILL.md` y agregar fila en la tabla de arriba. **Revisar el `SKILL.md` antes de confiar en skills de terceros** — leer las instrucciones, entender qué cambian en tu flow.

Para revisar el marketplace oficial de plugins/skills (Discover): abrir `/plugin` en una sesión de Claude Code y navegar a Discover.

## Cómo se invocan

Las skills se activan **automáticamente** cuando lo que escribís coincide con su `description` (frontmatter). No hace falta tipearlas. Si querés forzar una, escribí `/<nombre-skill>` (las que tienen comando registrado).

Para ver qué skills están activas en una sesión, usar la lista que Claude muestra en el system reminder al inicio.
