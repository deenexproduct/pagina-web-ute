# QUEM Central — web institucional

Sitio web institucional de **QUEM Central**, plataforma integral de abastecimiento, distribución y desarrollo comercial de alimentos congelados (cliente de Deenex). Astro + TypeScript + Tailwind v4 + React islands.

> Ver [`CLAUDE.md`](./CLAUDE.md) para convenciones de código, sistema de tokens y reglas de diseño.
> Brief completo del cliente: [`docs/brief-quem-central.md`](./docs/brief-quem-central.md).

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

| Comando             | Qué hace                      |
| ------------------- | ----------------------------- |
| `pnpm dev`          | Dev server con HMR            |
| `pnpm build`        | Build de producción → `dist/` |
| `pnpm preview`      | Servir el build localmente    |
| `pnpm check`        | `astro check` (TS + Astro)    |
| `pnpm lint`         | ESLint sin warnings tolerados |
| `pnpm lint:fix`     | ESLint con autofix            |
| `pnpm format`       | Prettier write sobre todo     |
| `pnpm format:check` | Prettier verify (CI-friendly) |

## Stack

- **Astro 6** + TypeScript estricto (`astro/tsconfigs/strictest`)
- **Tailwind CSS v4** vía `@tailwindcss/vite` (CSS-first)
- **React 19 islands** vía `@astrojs/react`
- **Motion 12** + **GSAP 3** (ScrollTrigger) para animaciones
- **Lenis 1.3** smooth scroll (respeta `prefers-reduced-motion`)
- **@fontsource-variable/inter** + **fraunces** self-hosted (Fraunces reservada)
- **@astrojs/sitemap** + imágenes optimizadas con Sharp
- **ESLint 10** + **Prettier 3**

## Estructura

```
src/
├── assets/brand/       # logo definitivo (TODO descargar de Drive)
├── components/
│   ├── layout/         # Header.astro, Footer.astro
│   └── SmoothScroll.tsx
├── config/site.ts      # CONFIG CENTRAL — dominio, mails, whatsapp, equipo, categorías
├── content/            # content collections (futuro)
├── layouts/BaseLayout.astro
├── lib/motion.ts
├── sections/           # 11 secciones modulares de la home
├── styles/
│   ├── tokens.css      # design tokens — única fuente de verdad
│   └── global.css      # reset + @theme + .btn + bases
└── pages/
    ├── index.astro
    ├── ecosistema.astro
    ├── unidades-de-negocio.astro
    ├── corner-quem.astro
    ├── productos.astro
    ├── franquicias.astro
    └── contacto.astro
```

Detalle de convenciones, tokens, breakpoints y reglas de diseño → `CLAUDE.md`.

## Arquitectura de la home

Orden exacto (del brief):

1. Header sticky con CTA "Comprar online"
2. Hero corporativo
3. Qué es QUEM Central
4. Ecosistema
5. Unidades de negocio
6. Corner QUEM (destacada)
7. Categorías de producto
8. Plataforma / Comprar online
9. Franquicias y expansión
10. QUEM en números (toggle `SHOW_METRICS`)
11. Equipo directivo
12. Contacto (form modular)
13. Footer

## Config central

Todo lo variable o pendiente vive en `src/config/site.ts`: dominio, app URL, mails, WhatsApp, cargo de Joaquín, toggle de métricas, categorías de producto con links a la app, navegación, SEO, redes sociales, dirección comercial.

Cambiar cualquier dato sin tocar markup.

## Deploy

Target: **Vercel** (configuración en `vercel.json`). No deployear sin OK del owner del proyecto.

## Licencia

Propietario · Deenex / QUEM Central — todos los derechos reservados.
