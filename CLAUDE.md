# CLAUDE.md — QUEM · landing institucional

Memoria de proyecto para futuras sesiones. Si algo de acá choca con la realidad del repo, **manda la realidad** — y después actualizá este archivo.

> **Historia de marca**: el proyecto nació como "UTE / Meet & Quem", pasó a **QUEM Central** (2026-05-23) y en **Fase 1 (2026-07-27)** se reposicionó otra vez: ahora **QUEM es el grupo** y "Qüem Central" es **una de sus 4 unidades**. Toda referencia a UTE / Palta / Emplatame / Meet & Quem / Marcos Aldazabal está prohibida en el producto. El repo se sigue llamando `pagina-web-ute` (local y en `deenexproduct/pagina-web-ute`) por compatibilidad.

---

## ⚠️ Fase 1 — leer antes de tocar nada

El sitio se **reconstruyó según** `QUEM_Landing_Fase1_Spec.md` (spec del cliente, jul 2026). Esto **derogó** las reglas anteriores del proyecto. Si venís con contexto viejo, esto es lo que cambió:

| Antes                                       | Ahora (Fase 1)                                           |
| ------------------------------------------- | -------------------------------------------------------- |
| Qüem Central = marca madre                  | **QUEM = grupo**; Central es una unidad                  |
| CTA "Comprar online" siempre visible        | **No existe.** Toda CTA va a contacto o WhatsApp         |
| Catálogo de 11 categorías con deep-link app | Fuera de Fase 1                                          |
| Solo español                                | **Bilingüe ES/EN** (`/` y `/en`)                         |
| `/corner-quem` enlazada desde el nav        | **Despublicada**: `noindex`, fuera del nav y del sitemap |
| Form con `mailto:`                          | `fetch` a un form-backend, con estados reales            |

**Regla dura de Fase 1**: ninguna CTA deriva a subwebs ni a `app.quem-central.com`. Todo va al formulario (con el interés preseleccionado) o a WhatsApp.

---

## Objetivo

Landing institucional de **QUEM**, grupo de alimentos congelados (cliente de Deenex). Construye percepción de escala, solidez y operación de grupo. **La conversión de la fase es el formulario de contacto.**

- Audiencias: mayoristas gastronómicos → franquiciados/córners → inversores → proveedores.
- Métrica: leads calificados por el form, segmentados por interés.
- Fuente de verdad del contenido: `docs/brief-quem-central.md` + el spec de Fase 1.

---

## Stack

- **Astro 6** + TypeScript strictest. Sitio **estático** (sin backend propio).
- **Tailwind CSS v4** vía `@tailwindcss/vite` (CSS-first).
- **Leaflet 1.9** self-hosted para el mapa de ubicaciones (tiles CARTO/OSM). Sin Google Maps: pide API key con billing.
- **Motion 12** + **GSAP 3** disponibles; **Lenis 1.3** smooth scroll (condicionado a `prefers-reduced-motion`).
- **@fontsource-variable/inter** + **fraunces** self-hosted (Fraunces reservada, default Inter).
- **@astrojs/sitemap**, imágenes con **Sharp**.
- **ESLint 10** + **Prettier 3** + `astro check`.
- Deploy target: **Vercel** (no deployear sin OK del owner).

Node mínimo 22.12. Package manager **pnpm 10** (no mezclar con npm).

> `@astrojs/react` está en `package.json` pero **no** en `integrations` de `astro.config.mjs`. No hay islands React. Si vas a agregar uno, primero sumá la integración.

---

## i18n — cómo se escribe copy en este proyecto

**Regla dura: cero strings visibles hardcodeados en el markup.** Incluye `aria-label`, `alt`, `placeholder` y `title`.

Routing: `es` es default sin prefijo (`/`), `en` vive en `/en`. Configurado en `astro.config.mjs`. `trailingSlash: 'never'`.

- **Strings compartidos** (nav, CTAs recurrentes, footer, a11y, SEO) → `src/i18n/ui.ts`, se leen con `t('clave')`.
- **Copy propio de una sección** → un `const COPY = { es: {...}, en: {...} } as const` **co-locado arriba del `.astro`**. Así ninguna sección pisa a otra y el archivo se lee solo.

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const COPY = { es: { titulo: 'Algo' }, en: { titulo: 'Something' } } as const;
const c = COPY[lang];
---

<h2>{c.titulo}</h2>
```

Para links internos: `localizedPath(path, lang)`. Para el form: `contactLink(interes?, lang)`.
**Siempre pasá `lang`** — sin él, un CTA en `/en` devuelve al visitante a la home en español.

---

## Config central — `src/config/site.ts`

Fuente única de verdad de todo lo variable o pendiente. No hardcodees nada en markup.

- `BRAND` — grupo, razón social, wordmark, `logoSvg` (vacío → lockup tipográfico de fallback).
- `UNIDADES` — las 4 del spec: Tiendas · Central · Smart · Origen. **3 tienen `draft: true`**.
- `INTERESES` — **diccionario canónico**, las 6 opciones del form. Lo consumen el form, las 4 tarjetas y el ruteo. `OPCIONES_DESTACADAS` es el subconjunto de 4. **Nunca duplicar esta lista.**
- `contactLink(interes?, lang)` / `whatsappLink(msg?, lang)` — helpers de CTA.
- `FORM_ENDPOINT` + `FORM_ACCESS_KEY` → `hasFormBackend()`. Vacíos → el form degrada a `mailto:` y lo avisa en la UI.
- `HERO_VIDEO` → `hasHeroVideo()`. Vacío → el hero renderiza su fondo tratado sin video.
- `STORE_LINKS`, `SOCIAL` + `activeSocials()`, `WHATSAPP` + `hasWhatsapp()`, `ALIADOS`, `METRICS`, `NAV_PRIMARY`, `ADDRESS`, `SEO`, `ANALYTICS`.

**Patrón de degradación elegante**: si un dato está vacío, el componente lo oculta o muestra un placeholder deliberado. Nunca un link muerto ni un hueco roto. Replicalo en todo lo nuevo.

Dato nuevo que el cliente deba confirmar → `// TODO confirmar con cliente`.

---

## Arquitectura de la home

El orden vive en `src/layouts/Home.astro`, compartido por `/` y `/en`. Es el de los 12 puntos del spec:

1. Header (sticky, nav de 5 anclas, selector ES/EN, CTA Contacto)
2. `HeroCorporativo` — `#hero`
3. `Opciones` — `#opciones`, las 4 tarjetas (hub navegacional)
4. `DescargarApp` — `#descargar-app` (app de QUEM **Tiendas**, consumidor final)
5. `QuienesSomos` — `#nosotros` (absorbe las métricas de prensa)
6. `UnidadesDeNegocio` — `#unidades`
7. `Ubicaciones` — `#ubicaciones` (mapa Leaflet lazy + lista server-side)
8. `CTABand` ×3, intercaladas (mayorista / franquicia / inversión)
9. `PrensaList` — `#prensa`
10. `Aliados` (se auto-oculta: `ALIADOS` está vacío)
11. `Contacto` — `#contacto`
12. Footer + `SocialDock` flotante (se auto-oculta: no hay redes cargadas)

Rutas: `/`, `/en`, `/corner-quem` (**despublicada**, `noindex`), `/404`.

**IDs canónicos**: los ancla `NAV_PRIMARY` y los ilumina el scroll-spy del header. No renombrar de un solo lado.

**Secciones fuera de Fase 1**: viven en `docs/fase2-sections/` con su propio README. No están rotas — salieron de scope. Están fuera de `src/` para que `astro check` no las tipe contra el `site.ts` nuevo.

---

## Dirección de arte

Mood: grupo sólido, institucional, con escala. No parece tienda online.

Paleta en `src/styles/tokens.css` — **oliva/dorado**:

| Rol        | Hex       | Uso                                |
| ---------- | --------- | ---------------------------------- |
| Crema base | `#F8F9FB` | bg light                           |
| Tinta      | `#111623` | text-primary                       |
| Brand 500  | `#93936E` | oliva (links, isotipo, eyebrows)   |
| Accent 500 | `#E1DF84` | dorado (énfasis, CTA sobre oscuro) |

> Si alguna vez ves `oklch()` con hue **azul (~254) o verde (~155)**, es residuo de una paleta abandonada: tokenizalo al oliva/dorado.

Tipografía: Inter variable. Display = 600-700 con `--tracking-tightest`. Fraunces disponible pero **reservada**.

Botones: `.btn-primary` (oliva) · `.btn-secondary` (dorado) · `.btn-outline` · `.btn-ghost`. Touch targets ≥44×44 obligatorio.

**Cero estilos hardcodeados**: color, tipografía, spacing, radii, sombras, easings y duraciones salen de `tokens.css`.

---

## Reglas de contenido no negociables

1. La marca visible es **QUEM** (grupo). Cero menciones a UTE / Palta / Emplatame / Meet & Quem / Marcos Aldazabal — **esto incluye el contenido de videos e imágenes**, no solo el texto.
2. **Ninguna CTA a subwebs ni a la app B2B.** Todo va al form (con interés preseleccionado) o a WhatsApp.
3. **No inventar métricas.** `METRICS` son datos reales sourceados de prensa (La Nación, oct. 2023) y la atribución se renderiza. Si un número no tiene fuente, no se publica.
4. Copy marcado `draft: true` es borrador pendiente de aprobación del cliente. Es greppable a propósito.
5. Footer dice "Creado por Deenex".

---

## Comandos

```bash
pnpm dev      # dev server (4321)
pnpm build    # build producción → dist/
pnpm check    # astro check (TS + Astro)
pnpm lint     # ESLint, cero warnings tolerados
pnpm format   # Prettier write
```

Los tres gates (`check`, `lint`, `build`) tienen que pasar antes de cualquier PR.

---

## Gates (preguntar antes de hacer)

- Revertir cualquiera de las decisiones de producto de Fase 1 (ver la tabla de arriba).
- Definir qué son **"QUEM Smart"** y **"QUEM Origen"** — hoy el copy es inferido.
- Mergear PR, deploy a producción, comprar/conectar dominio.
- Cualquier cosa que toque credenciales o archivos con login (logo en el Drive).

---

## TODOs abiertos — bloquean la publicación

**Bloquean desarrollo**

- [ ] Confirmar qué son "Smart" y "Origen", y si "Smart" (unidad) y "Smart Market" (interés) son lo mismo.
- [ ] Los 6 mails de ruteo de `INTERESES` (o al menos si son 6 buzones o uno con etiquetas).
- [ ] Alta del form-backend → `FORM_ENDPOINT` + `FORM_ACCESS_KEY`. **Hoy el form degrada a `mailto:`.**

**Bloquean solo el swap de placeholder**

- [ ] Logo definitivo (SVG + variantes) → `BRAND.logoSvg`.
- [ ] **Video del hero**: nativo 16:9 o 21:9, ≥1920×1080, 8-12 s, sin audio, sin subtítulos quemados, sin marcas de terceros. El anterior se retiró (ver abajo).
- [ ] Fotos: planta, depósito, cámara de frío, flota, tiendas, córners, y una por unidad. **Hoy no hay ni un asset institucional en el repo.**
- [ ] Logos de aliados/proveedores (`ALIADOS`) y de medios de prensa (`PressItem.logo`).
- [ ] Relevamiento real de ubicaciones → reemplazar `src/config/locations.ts` (hoy `LOCATIONS_ARE_DUMMY = true`).
- [ ] `WHATSAPP`, `STORE_LINKS`, `SOCIAL`, `ADDRESS`, `ANALYTICS.plausibleDomain`.
- [ ] Compra del dominio → canonical, sitemap, robots.
- [ ] og-default.jpg con el logo real (1200×630).

---

## Trampas conocidas

- **`docs/legacy-assets/`** tiene el `hero.mp4` original y su poster. **No republicarlos**: llevan marca _Emplatame_ y watermark _@MEETYQUEM_ quemadas, prohibidas por la regla #1. Era además un video vertical de celular con subtítulos quemados.
- **Lenis intercepta el scroll programático.** `window.scrollTo` y `scrollIntoView` no siempre funcionan al testear con un navegador headless; el lazy-load del mapa depende de un scroll real.
- **`trailingSlash: 'never'`**: `/en/` da 404, `/en` funciona. `localizedPath` ya normaliza esto — no lo rompas.
- El linter de a11y solo inspecciona 2 niveles de anidado en `<label>`; las cards de radio del form están a 3, por eso `eslint.config.js` sube `depth` en vez de apagar la regla.

---

## Skills del proyecto

Versionadas en `.claude/skills/`: `landing-page`, `ux-ui-design`, `motion-interactions`, `seo-performance`, `responsive-mobile-first`, `brand-quem-central`, `a11y-deep`, `astro-patterns`, `form-ux`, `icon-system`, `micro-interactions`, `performance-frontend`, `scroll-storytelling`, `tailwind-v4`, `ux-writing-es-ar`.

> Varias de estas skills traen contexto **anterior** a Fase 1 (mencionan "Comprar online", paleta azul/verde, o Qüem Central como marca madre). Cuando choquen con este archivo, **manda este archivo**.
