---
name: brand-ute
description: Voz, paleta, tipografía y reglas visuales de UTE — propuesta gastronómica de autor (cliente de Deenex). Dirección de arte = Editorial monocromo (alta gama) + acento dorado pálido. Triggers — "tono de marca", "voz UTE", "qué color", "qué tipografía", "este copy suena bien?", "se siente UTE", "es coherente con la marca", "esto se aleja del estilo".
---

# Brand UTE

Dirección de arte vigente: **Editorial monocromo (alta gama) + acento dorado pálido**. Decidido 2026-05-23.

Si más adelante llega un brand kit definitivo del cliente con paleta/tipografías distintas, sobrescribir este archivo entero. Hasta entonces, lo que está acá es la fuente de verdad.

## Quién es UTE

Propuesta gastronómica de autor en Buenos Aires. Cliente de Deenex. Categoría: **fine dining** / **casa gastronómica**.

Audiencia primaria:
- Comensales que eligen *dónde* salir a comer, no *qué* pedir.
- Buscan experiencia editorial: producto, técnica, ambiente, narrativa.
- Sensibles a la curaduría: música, vajilla, papel del menú, tono del staff.
- Comparten: por WhatsApp con un par, por Instagram en stories, no en reseñas masivas.

Audiencia secundaria:
- Prensa gastronómica (BAE, Joy, NYT Travel cuando aplique).
- Partners potenciales (proveedores, sommeliers, otros chefs).
- Equipos de oficina / hotelería buscando catering o privatización.

## Posicionamiento

> "UTE es una casa gastronómica en Buenos Aires. Cocina de autor con producto, fuego y memoria. Una mesa pensada como obra: temporada, ritmo y conversación."

Palabras-ancla: **producto · fuego · mesa · autor · temporada · memoria**.

## Voz de marca

Editorial. Sensorial. Argentina sin neutro forzado. Formal pero cercana — "vos" con respeto.

### Qué SÍ es

- *"Una mesa que se queda con vos."*
- *"Producto, paciencia y lugar."*
- *"Un recorrido en siete tiempos."*
- *"Querés ser de los primeros en sentarse, escribinos."*
- *"Cada plato es un capítulo: empieza por el producto y termina en la conversación."*

### Qué NO es

- "El mejor restaurante de Buenos Aires." (marketing barato)
- "Reservá tu lugar en la experiencia gastronómica del año." (lugar común)
- "Comida saludable y deliciosa para toda la familia." (no es la audiencia)
- "Nuestros platos son una explosión de sabores." (cliché)
- "Click acá para reservar." (UI hablando, no marca)
- "Innovador. Disruptivo. Único." (palabras que no significan nada en este contexto)

### Reglas micro

- **No exclamaciones**. Excepto en redes con justificación.
- **Italics expresivos** — una palabra italic por párrafo display funciona bien con Fraunces. Más, se diluye. Los italics van en **dorado pálido** (`--color-text-brand`).
- **Listas de tres**: "producto, paciencia y lugar" / "temporada, ritmo y conversación". Patrón retórico que se siente UTE.
- **Verbos sensoriales** (sentarse, conocer, esperar, encontrar) > verbos transaccionales.
- **Sin emojis** en copy editorial. En redes, máximo uno con criterio.
- **Sin "click acá"** ni "siguiente paso". El link es el link.

## Dirección de arte — Editorial monocromo (alta gama)

> "Tate Modern como restaurante."

Minimal estricto + un acento. Tipografía gigante como protagonista. Ilustración cero. Asimetría extrema. Mucho aire blanco.

### Mood

- Sensación: revista de arquitectura / boutique foundry / hotelería atemporal (Aman, Le Bernardin website, Frame magazine).
- **No es** rustic-warm con velas en mesa de madera. **No es** ilustración botánica latinoamericana.
- Sí es: papel crema texturado, sombras suaves no dramáticas, una sola cosa en cuadro a la vez, jerarquía visual brutal con tipografía.

## Paleta — definitiva (oklch en `tokens.css`)

| Rol               | Hex          | OKLCH                    | Uso                                              |
|-------------------|--------------|--------------------------|--------------------------------------------------|
| **Crema base**    | #FAF8F3      | `oklch(97% 0.006 80)`    | bg light. Papel cremoso, no blanco puro.         |
| **Tinta**         | #0F0F0E      | `oklch(14% 0.005 80)`    | text-primary. Casi-negro tinta.                  |
| **Dorado pálido** | #B89968      | `oklch(66% 0.058 75)`    | Brand-500. Italics, hover, focus, detalles.      |
| **Dorado dark**   | ~#9E7E50     | `oklch(57% 0.052 70)`    | Brand-600. Italic sobre crema (legible).         |
| **Dorado light**  | ~#D4BD96     | `oklch(78% 0.046 75)`    | Brand-300. Italic sobre tinta (sección Contacto).|

Roles semánticos:

- `--color-bg` = crema base.
- `--color-bg-inverted` = tinta (sección Contacto).
- `--color-text-primary` = tinta sobre crema.
- `--color-text-secondary` = neutral-700 (cálido, no gris).
- `--color-text-brand` = brand-600 — italics expresivos.

### Acento NO

- **No** verdes (`accent-*` están en escala neutra, no activos).
- **No** colores de estados (success/warning/danger) en UI normal. Solo en feedback de formulario / mensajería.
- **No** colores de marca de Deenex (esta marca es UTE, independiente).

## Tipografía

- **Display**: Fraunces variable. Para títulos, italics expresivos, números display de Experiencia.
  - Default display: `font-weight: 300`, `letter-spacing: -0.04em` (`--tracking-tightest`).
  - Italic display = always en `--color-text-brand`.
- **Sans (texto, UI, body)**: Inter variable. Pesos 400 body, 500 medium/UI, 600 ocasional.

**Pendiente upgrade tipográfico**: la dirección "Editorial monocromo alta gama" idealmente usa **GT Sectra Display**, **Apoc**, o **PP Editorial New** como display. Son boutique foundries y requieren licencia (€100–500/site). Hasta que se decida el presupuesto y se compre licencia, Fraunces variable (open source) cumple bien — es serif expresiva con buen italic.

Si se compra GT Sectra / Apoc / PP Editorial:
1. Self-host los `.woff2` en `src/assets/fonts/`.
2. `@font-face` en `tokens.css` o `global.css` (`@font-face` no funciona dentro de `@theme`).
3. Cambiar `--font-display` para apuntar a la nueva familia.
4. Remover `@fontsource-variable/fraunces` de `package.json`.

## Idea visual recurrente

Gestos que se repiten en toda la web, definen la marca:

1. **Eyebrow numerado**: `01 · Propuesta`, `02 · Experiencia`. Letter-tag uppercase con tracking-widest (`--tracking-widest = 0.18em`) y color secondary. Aparece arriba de cada section title.
2. **Italics dorados expresivos**: una palabra/frase clave por display title en italic dorado (`--color-text-brand`). Patrón coreográfico de la composición. Ejemplos vigentes: *"que se queda"*, *"producto, paciencia"*, *"escribinos."*
3. **Números display gigantes**: en listas numeradas (Experiencia), número en Fraunces italic light, ~2xl, color muted. Comunica curaduría + ritmo.
4. **Líneas finitas horizontales**: separan secciones internas y bloques, no son borders pesados. `1px` `--color-border-subtle`.
5. **Asimetría 5/7 o 4/8**: nunca centrado simétrico. La grilla siempre rompe la simetría para crear ritmo editorial.

Candidatos a sumar más adelante (definir cuando llegue Fase 4 / contenido real):
- **Cursor custom desktop** — dot + halo dorado que reacciona al hover de CTAs. Confirmar performance budget antes.
- **Grano sutil en sección Contacto** — overlay PNG ~20kb con `mix-blend-mode: overlay` opacity 0.04. Comunica texture sin overhead.

## Logotipo

**Pendiente.** Hasta que llegue:
- Favicon temporal en `public/favicon.svg`: "u" italic Fraunces sobre cuadro tinta. Sirve solo como token tipográfico — no es logo final.

Cuando llegue el logo definitivo:
- Versión SVG primary (color, full).
- Versión SVG mono (1 color, fondo claro y oscuro).
- Favicon system: 16, 32, 180 (apple-touch), 192/512 (maskable).
- OG default image con logo + display.

## Naming

- **UTE** — nombre del proyecto. Mayúsculas siempre. Sin tildes.
- En meta y JSON-LD: `"name": "UTE"`.
- En email: `hola@<dominio>.<tld>`. Dominio definitivo pendiente.
- En redes: `@ute.<handle>` — pendiente confirmar.

## Motion y la dirección monocroma

Coherente con la dirección elegida, el motion es **cinematográfico pero mínimo**:

- Fade-up de títulos display al entrar al viewport (`reveal` preset, 640ms ease-out-expo).
- **Sin parallax** en imágenes — rompe la sobriedad editorial.
- Hover de CTA: solo `translateY(-1px)` + cambio de background al dorado.
- Italics dorados se mantienen estables, no animan.
- Lenis smooth scroll activado (siempre con prefers-reduced-motion: no-preference).
- Transiciones entre páginas: si se agrega más adelante, fade simple (Astro View Transitions). Sin slide ni zoom.

Ver skill [`motion-interactions`](../motion-interactions/SKILL.md) para implementación.

## Reglas para reviewar este file en una sesión nueva

1. Si abrís una sesión nueva y vas a tocar copy o visuales, **leer este archivo primero**.
2. Cualquier copy que escribas tiene que pasar el test "¿esto suena UTE o suena marketing genérico?". Si dudás, leelo en voz alta — UTE se lee tranquilo.
3. Si proponés un cambio visual fuerte (paleta, tipografía, layout), **antes** decírselo al usuario, no implementarlo. La dirección de arte es decisión del owner.
4. Antes de agregar un color, una fuente, una sombra, una shadow, **agregalo al token primero**. Sin excepciones.

## TODO de marca (cerrar antes de contenido real)

- [ ] Brand kit oficial: logo, naming definitivo, dominio final.
- [ ] Licencia de display tipografía boutique (GT Sectra / Apoc / PP Editorial) — opcional, decisión de presupuesto.
- [ ] og-default.jpg con marca real (1200×630).
- [ ] Favicon system completo (16/32/180/192/512).
- [ ] Logo SVG primary + mono variants.
- [ ] Curaduría de fotos del lugar / equipo cuando haya apertura.
- [ ] Playlist Spotify si va embebida.
