# CLAUDE.md — UTE web institucional

Memoria de proyecto para futuras sesiones. Si algo de acá choca con la realidad del repo, **manda la realidad** — y después actualizá este archivo.

---

## Objetivo

Web institucional de **UTE**, propuesta gastronómica de autor (cliente de Deenex). No es una landing más: el objetivo es diferenciarse en el mercado argentino de restaurantes — nivel estudio de diseño premium, no template.

- Tipo de proyecto: site institucional + reservas (no app).
- Audiencia: comensales premium, prensa, posibles partners.
- Métricas que importan: tiempo en página, intención de reserva (clicks a CTA `#reservas`, mailto), Core Web Vitals verdes.
- Si en el futuro hace falta auth/dashboard, **migrar a Next.js 15**. Para institucional, Astro gana.

---

## Stack

- **Astro 6** (`astro`) — el brief original decía Astro 5, pero la 6.x es la stable actual y ya está instalada.
- **TypeScript estricto** — `astro/tsconfigs/strictest` + `verbatimModuleSyntax`.
- **Tailwind CSS v4** vía `@tailwindcss/vite` (CSS-first, sin `tailwind.config.js`).
- **React 19 islands** vía `@astrojs/react`, **solo** para piezas interactivas.
- **Motion 12** (sucesor de framer-motion) + **GSAP 3** con ScrollTrigger para animaciones premium.
- **Lenis 1.3** para smooth scroll, condicionado a `prefers-reduced-motion: no-preference`.
- **@fontsource-variable/inter** + **@fontsource-variable/fraunces** self-hosted.
- **@astrojs/sitemap**, imágenes optimizadas con **Sharp**.
- **ESLint 10** + **Prettier 3** + `astro check`.
- Deploy target: **Vercel** (no deployear sin OK del owner).

Node mínimo: 22.12. `.nvmrc` apunta a `22`.

Package manager: **pnpm 10**. No mezclar con npm.

---

## Estructura

```
pagina-web-ute/
├── .claude/skills/       # skills propias (versionadas)
├── public/               # static assets servidos como-están
├── src/
│   ├── assets/           # imágenes, fuentes optimizadas por Vite
│   ├── components/       # componentes UI compartidos
│   │   ├── ui/           # primitives (Button, etc.)
│   │   └── icons/        # SVG inline
│   ├── content/          # content collections (menu/, novedades/)
│   ├── layouts/          # BaseLayout.astro
│   ├── sections/         # bloques de la home: Hero, Propuesta, ...
│   ├── lib/              # utilities (motion.ts, etc.)
│   ├── styles/
│   │   ├── tokens.css    # design tokens — FUENTE ÚNICA DE VERDAD
│   │   └── global.css    # reset + @theme + bases
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── tsconfig.json
├── eslint.config.js      # flat config
├── .prettierrc.json
├── vercel.json
├── package.json
└── README.md
```

Cualquier nueva sección de la home → `src/sections/`. Cualquier componente reutilizable → `src/components/`. Si dudás, mirá los existentes.

---

## Convenciones de código

- **TS estricto**, sin `any` salvo `// eslint-disable-next-line` justificado.
- Imports tipo: `import type { Foo } from '...'` o `import { type Foo } from '...'` (inline).
- Astro components → `PascalCase.astro`. React → `PascalCase.tsx`.
- Hooks/utils → `camelCase.ts`.
- CSS class names: BEM-ish dentro de `<style>` scoped (`.hero__title`, `.hero__title--italic`). Tailwind para layout rápido en wrappers; CSS scoped cuando la pieza tiene identidad propia.
- **Cero estilos hardcodeados.** Color, tipografía, spacing, radii, sombras, easings y duraciones salen de `src/styles/tokens.css`. Si necesitás un valor que no está → agregalo al token primero.
- React islands solo cuando hay interactividad o estado del lado cliente. Default: Astro estático.
- Format on save: Prettier. Lint pre-commit (TODO: instalar husky cuando se sume CI).

---

## Sistema de tokens

Definidos en `src/styles/tokens.css`. Categorías:

| Categoría     | Prefix          | Notas                                                      |
|---------------|-----------------|------------------------------------------------------------|
| Color         | `--color-*`     | Escala neutral + brand en oklch. Semantics: bg, fg, border.|
| Tipografía    | `--font-*`, `--font-size-*`, `--leading-*`, `--tracking-*` | Tamaños con `clamp()` fluido 320→1440px.|
| Spacing       | `--space-*`     | Escala 4px-based. Más `--space-section`, `--space-gutter` fluidos. |
| Radii         | `--radius-*`    | `xs→2xl` + `pill`, `circle`.                               |
| Sombras       | `--shadow-*`    | Sutiles (no Bootstrap).                                    |
| Motion        | `--ease-*`, `--dur-*` | Curvas premium, durations consistentes.            |
| z-index       | `--z-*`         | Escala semántica.                                          |
| Breakpoints   | `--bp-*`        | Para referencia; en Tailwind se usan utilities.            |

Tailwind v4 mapea estos tokens vía `@theme inline` en `global.css`. Eso significa que `bg-bg-elevated`, `text-fg-secondary`, `font-display`, `text-display`, `rounded-pill`, `shadow-md` salen "gratis".

**Dark mode**: opt-in con `[data-theme="dark"]` en `<html>` o automático con `prefers-color-scheme: dark`. Toggle manual a futuro.

---

## Breakpoints

| BP     | Min width | Uso                                |
|--------|-----------|------------------------------------|
| xs     | 360px     | smallest supported                 |
| sm     | 640px     | mobile landscape / phablet         |
| md     | 768px     | tablet portrait                    |
| lg     | 1024px    | tablet landscape / laptop          |
| xl     | 1280px    | desktop                            |
| 2xl    | 1536px    | wide desktop                       |

**Mobile-first** siempre. Tipografía fluida con `clamp()` — los media queries solo deberían cambiar layout, no tamaños de texto.

---

## Reglas de diseño (Fase 3 — release editorial)

1. **Tokens primero.** Nada hardcodeado. Si lo necesitás, agregalo al token primero.
2. **Layout editorial.** Grilla asimétrica, jerarquía clara, mucho aire. Evitar patrón "hero centrado + 3 cards" típico de SaaS.
3. **Tipografía con carácter.** Display fuerte (Fraunces variable, italics expresivos) + sans neutra (Inter variable) para lectura. Escala fluida con `clamp()`.
4. **Idea visual recurrente.** Un gesto coherente que aparezca en toda la web (línea, textura, grano, cursor custom, transición característica). Define la marca.
5. **Motion con criterio.** Entradas por scroll, parallax sutil, micro-interacciones en CTAs. **Performance > efectos.** Respetar `prefers-reduced-motion: reduce` siempre.
6. **A11y no negociable.** WCAG AA. Foco visible, navegación por teclado, contraste, touch targets ≥44px.
7. **Performance no negociable.** Lighthouse 95+ en las 4 métricas. Imágenes optimizadas (Sharp + `<Image>` de Astro). Fonts variable self-hosted con `font-display: swap`.
8. **Mobile-first real.** El sitio tiene que verse impecable de 320px a 4K. Probar en device, no solo en devtools.

---

## Comandos

```bash
pnpm dev           # dev server (puerto default 4321)
pnpm build         # build producción → dist/
pnpm preview       # servir el build local
pnpm check         # astro check (TS + Astro)
pnpm lint          # ESLint sin warnings tolerados
pnpm lint:fix      # ESLint con autofix
pnpm format        # Prettier write
pnpm format:check  # Prettier verify
```

Pipeline pre-commit a futuro: `check → lint → format:check`.

---

## Gates (preguntar antes de hacer)

- Crear el repo bajo una **org de Deenex** en GitHub (preguntar el nombre).
- Deploy a producción / conectar dominio.
- Cambios que toquen credenciales, pagos, borrados permanentes.
- Elegir la **dirección de arte final** de la marca UTE.

---

## TODOs abiertos (al cierre de scaffold)

- [ ] Confirmar dominio definitivo de UTE → reemplazar `SITE_URL` en `astro.config.mjs` y `vercel.json`.
- [ ] Brand kit UTE: paleta final, tipografías definitivas, logo. Hasta entonces, paleta brand provisoria en tokens.
- [ ] Direcciones de arte (Fase 3) — 2-3 moods para elegir.
- [ ] Reservas: definir si va con formulario propio, integración OpenTable/Tock, o WhatsApp.
- [ ] Schema.org `Restaurant` JSON-LD: completar address, geo, openingHours cuando estén confirmados.
- [ ] og-default.jpg: arte para social share.
- [ ] Favicons completos (apple-touch-icon, maskable, etc.) cuando exista logo final.
- [ ] CI (GitHub Actions): lint + check + build.
- [ ] Husky + lint-staged si suma con el flujo del equipo.

---

## Skills del proyecto

Versionadas en `.claude/skills/`:

- `landing-page` — arquitectura de secciones, jerarquía de CTAs, copy.
- `ux-ui-design` — sistema de diseño, escala, accesibilidad, estados.
- `motion-interactions` — Motion/GSAP, scroll storytelling, reduced-motion.
- `seo-performance` — meta/OG/schema, Core Web Vitals, Lighthouse 95+.
- `responsive-mobile-first` — breakpoints, clamp(), touch targets.
- `brand-ute` — voz, paleta, tipografía, reglas visuales (placeholder hasta brand kit).

Cualquier sesión futura puede leer y editar estas skills. Si una se vuelve genérica → moverla a skills globales.
