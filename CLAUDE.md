# CLAUDE.md — QUEM Central web institucional

Memoria de proyecto para futuras sesiones. Si algo de acá choca con la realidad del repo, **manda la realidad** — y después actualizá este archivo.

> **Rebrand**: el proyecto originalmente era "UTE / Meet & Quem". Pasó a llamarse **QUEM Central** (decisión del cliente, 2026-05-23). Toda referencia anterior a UTE / Palta / Emplatame / Meet & Quem / Marcos Aldazabal está eliminada del producto. El nombre del repo local (`pagina-web-ute`) y el repo remoto (`deenexproduct/pagina-web-ute`) quedan por compatibilidad; el package.json y la marca visible son **QUEM Central**.

---

## Objetivo

Web institucional de **QUEM Central** — plataforma integral de abastecimiento, distribución y desarrollo comercial de alimentos congelados (cliente de Deenex). **No es una landing comercial**: construye percepción de escala, solidez, operación y ecosistema. La conversión sucede en la app.

- Tipo: site institucional + derivación a la app vía CTA "Comprar online".
- Audiencias (en orden de prioridad): B2B gastronómicos → franquiciados/corners → inversores → proveedores/marcas.
- Métricas: percepción de marca, intención de compra (clicks a `Comprar online` → app), conversión por canal alternativo (WhatsApp / form contacto).
- Fuente de verdad del contenido: `docs/brief-quem-central.md` (transcripto del brief del cliente).

---

## Stack

- **Astro 6** + TypeScript strictest.
- **Tailwind CSS v4** vía `@tailwindcss/vite` (CSS-first).
- **React 19 islands** (`@astrojs/react`) solo para piezas interactivas.
- **Motion 12** + **GSAP 3** (ScrollTrigger) para animaciones — usar con criterio, motion corporativo no editorial.
- **Lenis 1.3** smooth scroll (condicionado a `prefers-reduced-motion`).
- **@fontsource-variable/inter** + **@fontsource-variable/fraunces** self-hosted (Fraunces reservada, default Inter).
- **@astrojs/sitemap**, imágenes con **Sharp**.
- **ESLint 10** + **Prettier 3** + `astro check`.
- Deploy target: **Vercel** (no deployear sin OK del owner).

Node mínimo: 22.12 (`.nvmrc` apunta a `22`). Package manager: **pnpm 10** (no mezclar con npm).

---

## Config central — `src/config/site.ts`

**Fuente única de verdad para todo lo variable o pendiente.** Importá desde `src/config/site` en los componentes; no hardcodees nada en markup.

Lo que vive en `site.ts`:

- `SITE_DOMAIN` / `SITE_URL` — dominio web institucional. *TODO confirmar compra.*
- `APP_BASE_URL` — base de la app/catálogo (`app.quem-central.com`).
- `EMAILS` — comercial / ventas / contacto. *TODO confirmar.*
- `WHATSAPP` — número final. Mientras esté vacío, todos los CTAs "Contactar por WhatsApp" caen a `/contacto`. *TODO confirmar.*
- `JOAQUIN_TITLE` — default `Director de Expansión Comercial`. *GATE del cliente.*
- `TEAM` — Walter, Matías, Joaquín (en ese orden).
- `SHOW_METRICS` — `false` por default. Cuando el cliente habilite datos reales, poner en `true` y completar `METRICS`. **No inventar números.**
- `CATEGORIES` — 11 categorías iniciales del brief, con slug + nombre + foto + appUrl opcionales.
- `NAV_PRIMARY` — 7 items: Plataforma, Productos, Corner Qüem, Garantías, Prensa, Partners, Contacto. Corner Qüem es la única ruta real (sin sectionId). El resto son anchors a secciones de la home.
- `SEO` — title, description, keywords, og default.
- `ADDRESS` — dirección física si corresponde. *TODO si aplica.*
- `SOCIAL` — instagram, linkedin (vacíos por default; si vacío no se renderiza en footer).

Cualquier dato nuevo que el cliente deba confirmar va con `// TODO confirmar con cliente`.

---

## Estructura

```
pagina-web-ute/                   # nombre histórico del repo
├── .claude/skills/               # skills propias (versionadas)
├── docs/
│   ├── brief-quem-central.md     # transcripción del brief del cliente
│   └── brief-quem-central.pdf
├── public/                       # static assets (favicon, robots, og, video)
├── src/
│   ├── assets/
│   │   └── brand/                # TODO logo definitivo desde Drive
│   ├── components/
│   │   ├── layout/               # Header.astro, Footer.astro
│   │   ├── ui/                   # primitives (ScrollToTop, etc.)
│   │   └── SmoothScrollLenis.astro
│   ├── config/
│   │   └── site.ts               # FUENTE ÚNICA DE VERDAD config variable
│   ├── layouts/
│   │   └── BaseLayout.astro      # SEO + JSON-LD + Header + Footer + scripts
│   ├── lib/                      # utils
│   ├── sections/                 # secciones de la home
│   │   ├── HeroCorporativo.astro
│   │   ├── ProofStrip.astro      # banda trust signal (fuente: La Nación oct 2023)
│   │   ├── QueEsQuemCentral.astro
│   │   ├── PlataformaApp.astro
│   │   ├── CategoriasProducto.astro
│   │   ├── Garantias.astro
│   │   ├── QuemEnNumeros.astro   # logos clientes — oculto hasta tener assets reales
│   │   ├── Ecosistema.astro
│   │   ├── FranquiciasExpansion.astro
│   │   ├── EquipoDirectivo.astro
│   │   ├── Contacto.astro
│   │   ├── UnidadesDeNegocio.astro  # DEAD CODE — no importado en index.astro
│   │   ├── corner/               # secciones de /corner-quem
│   │   │   ├── CornerHero.astro
│   │   │   ├── CornerFormatos.astro
│   │   │   ├── CornerIncluye.astro
│   │   │   ├── CornerDonde.astro
│   │   │   ├── CornerValor.astro
│   │   │   └── CornerTeaser.astro  # teaser en home, importado desde index.astro
│   │   └── prensa/               # secciones de prensa
│   │       ├── PrensaList.astro  # importado en home
│   │       ├── PrensaHero.astro
│   │       └── PrensaContact.astro
│   ├── styles/
│   │   ├── tokens.css            # design tokens — FUENTE ÚNICA DE VERDAD visual
│   │   └── global.css            # reset + @theme + bases + .btn presets
│   └── pages/
│       ├── index.astro           # home
│       ├── corner-quem.astro     # /corner-quem
│       └── 404.astro             # /404
├── astro.config.mjs
├── tsconfig.json
├── eslint.config.js
├── .prettierrc.json
├── vercel.json
├── package.json                  # name: "quem-central-website"
└── README.md
```

Cualquier nueva sección de la home → `src/sections/`. Cualquier componente reutilizable → `src/components/`.

---

## Arquitectura del sitio (orden REAL en index.astro — 2026-05-27)

Home (`/`):
1. Header (sticky, CTA Comprar online siempre visible)
2. HeroCorporativo
3. ProofStrip (trust signal desde prensa pública — siempre visible)
4. QueEsQuemCentral
5. PlataformaApp
6. CategoriasProducto
7. Garantias
8. QuemEnNumeros (logos clientes — **oculto** hasta tener assets reales; `hideSection=true`)
9. PrensaList
10. [divider partners]
11. Ecosistema
12. CornerTeaser (teaser → enlace a `/corner-quem`)
13. FranquiciasExpansion
14. EquipoDirectivo
15. Contacto
16. Footer

Página `/corner-quem`: CornerHero → CornerFormatos → CornerIncluye → CornerDonde → CornerValor.

Rutas activas: `/` (home), `/corner-quem`, `/404`. No existen rutas separadas para ecosistema, unidades, productos, franquicias ni contacto.

> **Dead code**: `UnidadesDeNegocio.astro` existe en `src/sections/` pero NO se importa en `index.astro`. Mantener hasta decisión del cliente sobre si re-integrar o eliminar.

---

## Convenciones de código

- TS estricto, sin `any`.
- Imports tipo: `import type { Foo } from '...'` o inline `import { type Foo }`.
- Astro components → `PascalCase.astro`. React → `PascalCase.tsx`. Utils → `camelCase.ts`.
- CSS class names: BEM-ish dentro de `<style>` scoped (`.hero__title`, `.eco-card__icon`). Tailwind para layout en wrappers.
- **Cero estilos hardcodeados.** Color, tipografía, spacing, radii, sombras, easings y duraciones salen de `src/styles/tokens.css`.
- React islands solo cuando hay interactividad real (SmoothScroll, eventualmente animaciones complejas). Default: Astro estático.

---

## Dirección de arte — corporativo moderno

**Estado vigente** (definido en el rebrand 2026-05-23).

Mood: empresa con ecosistema, sólida, tech-friendly, no parece tienda online. Inspiración: institucional B2B moderno. Evitá tono Aman/restaurante editorial.

### Paleta (en `tokens.css`)

> **Estado real (2026-05-25)**: tokens.css usa paleta editorial oliva/dorado, heredada del sitio UTE original. El brief inicial (2026-05-23) especificaba azul/verde — ese cambio fue revertido deliberadamente. Si se vuelve al azul/verde, actualizar este archivo Y tokens.css.

| Rol            | Hex (aprox) | OKLCH                       | Uso                                        |
|----------------|-------------|-----------------------------|--------------------------------------------|
| Crema base     | `#F8F9FB`   | `oklch(98% 0.003 240)`      | bg light                                   |
| Tinta          | `#111623`   | `oklch(15% 0.018 240)`      | text-primary                               |
| Brand 500      | `#93936E`   | `oklch(60% 0.030 100)`      | oliva/caqui (links, isotipo, eyebrows)     |
| Accent 500     | `#E1DF84`   | `oklch(88% 0.115 105)`      | dorado/amarillo (CTA Comprar online)       |

Roles semánticos: `--color-bg`, `--color-text-primary`, `--color-text-brand` (oliva), `--color-text-accent` (dorado).

### Tipografía

- **Display + Sans**: Inter variable. Display = pesos 600-700 con `--tracking-tightest` (-0.03em).
- **Serif**: Fraunces variable disponible pero **reservada** — no se usa por default. Solo si llegara a aparecer un detalle expresivo puntual.

### CTAs

- **Primario** `.btn .btn-primary` = dorado/accent. Para "Comprar online".
- **Secundario** `.btn .btn-secondary` = oliva/brand. Para CTAs de conversión secundaria.
- **Outline / Ghost** para tertiary.

Touch targets ≥44×44 obligatorio.

---

## Reglas de contenido no-negociables

1. La marca visible es **QUEM Central**. Cero menciones a UTE / Palta / Emplatame / Marcos Aldazabal / Meet & Quem.
2. CTA principal **Comprar online** visible siempre (header sticky + hero + contacto + footer).
3. Categorías de producto **redirigen a la app** vía `categoryUrl()` de `site.ts`. No es catálogo.
4. **No inventar métricas**. `QuemEnNumeros.astro` renderea la versión institucional suave hasta `SHOW_METRICS=true` con datos reales.
5. Equipo: Walter (Presidente QUEM S.A.), Matías (CEO QUEM Central), Joaquín (`JOAQUIN_TITLE`). Nadie más.
6. Footer dice "Creado por Deenex".

---

## Comandos

```bash
pnpm dev           # dev server (puerto default 4321)
pnpm build         # build producción → dist/
pnpm preview       # servir el build local
pnpm check         # astro check (TS + Astro)
pnpm lint          # ESLint sin warnings tolerados
pnpm format        # Prettier write
```

---

## Gates (preguntar antes de hacer)

- Confirmar/cambiar el cargo de Joaquín o habilitar métricas reales.
- Mergear PR, deploy a producción, comprar/conectar dominio.
- Cualquier cosa que toque credenciales, pagos, accesos a archivos con login (logo en Drive).

---

## TODOs abiertos

- [ ] Confirmar dominio `quem-central.com` → reemplazar en `astro.config.mjs`, `public/robots.txt`, `vercel.json` (ya están preparados).
- [ ] Logo definitivo desde Drive (acceso solo del cliente). Va en `src/assets/brand/`.
- [ ] og-default.jpg (1200×630) con logo real.
- [ ] Favicon system completo (16/32/180/192/512) cuando llegue logo.
- [ ] Mails institucionales reales (vienen en `EMAILS` de `site.ts`).
- [ ] WhatsApp final (variable `WHATSAPP` en `site.ts`). Cuando esté, los CTAs "Contactar por WhatsApp" lo usan auto.
- [ ] Cargo de Joaquín Sepúlveda (variable `JOAQUIN_TITLE`).
- [ ] Decisión sobre métricas (`SHOW_METRICS`).
- [ ] Fotos definitivas: productos por categoría, corners, tiendas, logística, equipo.
- [ ] Endpoint real del form de contacto (hoy es mailto cliente). Opciones: Formspree, Netlify Forms, propio backend.
- [ ] CI GitHub Actions: lint + check + build.
- [ ] Redirects desde la web anterior `ute.deenex.tech` cuando se haga el switch DNS.

---

## Skills del proyecto

Versionadas en `.claude/skills/`:

- `landing-page` — arquitectura de secciones y copy framework.
- `ux-ui-design` — sistema de diseño, tokens, accesibilidad.
- `motion-interactions` — Motion/GSAP, reduced-motion.
- `seo-performance` — meta/OG/schema, Lighthouse 95+.
- `responsive-mobile-first` — breakpoints, clamp(), touch targets.
- `brand-quem-central` — voz, paleta, tipografía, reglas visuales actuales.
