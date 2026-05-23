# UTE — web institucional

Sitio web de **UTE**, propuesta gastronómica de autor (cliente de Deenex). Astro + TypeScript + Tailwind v4 + React islands.

> Ver [`CLAUDE.md`](./CLAUDE.md) para convenciones de código, sistema de tokens y reglas de diseño.

## Requisitos

- **Node 22.12+** (`.nvmrc` apunta a `22`)
- **pnpm 10+** (no usar npm/yarn en este repo)

```bash
nvm use            # toma la versión de .nvmrc
corepack enable    # si pnpm no está disponible
```

## Levantar el proyecto

```bash
pnpm install
pnpm dev           # http://localhost:4321
```

## Scripts

| Comando            | Qué hace                                       |
|--------------------|------------------------------------------------|
| `pnpm dev`         | Dev server con HMR                             |
| `pnpm build`       | Build de producción → `dist/`                  |
| `pnpm preview`     | Servir el build localmente                     |
| `pnpm check`       | `astro check` (TS + Astro)                     |
| `pnpm lint`        | ESLint sin warnings tolerados                  |
| `pnpm lint:fix`    | ESLint con autofix                             |
| `pnpm format`      | Prettier write sobre todo                      |
| `pnpm format:check`| Prettier verify (CI-friendly)                  |

## Stack

- **Astro 6** + TypeScript estricto (`astro/tsconfigs/strictest`)
- **Tailwind CSS v4** vía `@tailwindcss/vite` (CSS-first, sin `tailwind.config.js`)
- **React 19 islands** vía `@astrojs/react`, solo en piezas interactivas
- **Motion 12** + **GSAP 3** (ScrollTrigger) para animaciones
- **Lenis 1.3** para smooth scroll (respeta `prefers-reduced-motion`)
- **@fontsource-variable/inter** + **fraunces** self-hosted
- **@astrojs/sitemap** + imágenes optimizadas con Sharp
- **ESLint 10** + **Prettier 3**

## Estructura

```
src/
├── assets/         # imágenes y fuentes optimizadas por Vite
├── components/     # UI compartido
├── content/        # content collections (menú, novedades)
├── layouts/        # BaseLayout.astro
├── sections/       # bloques de la home (Hero, Propuesta, ...)
├── lib/            # utils (motion, etc.)
├── styles/
│   ├── tokens.css  # design tokens — única fuente de verdad
│   └── global.css  # reset + @theme + bases tipográficas
└── pages/index.astro
```

Detalle de convenciones, tokens, breakpoints y reglas de diseño → `CLAUDE.md`.

## Deploy

Target: **Vercel** (configuración en `vercel.json`). No deployear sin OK del owner del proyecto.

## Licencia

Propietario · Deenex / UTE — todos los derechos reservados.
