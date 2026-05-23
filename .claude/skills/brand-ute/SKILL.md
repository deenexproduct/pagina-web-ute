---
name: brand-ute
description: Voz, paleta, tipografía y reglas visuales específicas de UTE — propuesta gastronómica de autor (cliente de Deenex). Triggers — "tono de marca", "voz UTE", "qué color", "qué tipografía", "este copy suena bien?", "se siente UTE", "es coherente con la marca", "esto se aleja del estilo". **PLACEHOLDER**: hasta que esté el brand kit final, esta skill describe la dirección provisoria. Cuando llegue el brand definitivo de Deenex/UTE, reemplazar TODO este archivo.
---

# Brand UTE — provisorio

> ⚠️ **Estado**: dirección provisoria. Falta confirmar paleta final, tipografías definitivas, logotipo, naming oficial, voz aprobada por el cliente. Cuando llegue el brand kit, **sobrescribir este archivo entero** y eliminar este disclaimer.

## Quién es UTE

UTE es una propuesta gastronómica de autor. Cliente de Deenex (agencia/estudio de producto). Categoría: **fine dining** / **casa gastronómica** — no es una cantina, no es ecommerce de delivery, no es una hamburguesería.

Audiencia primaria:
- Comensales que eligen *dónde* salir a comer, no *qué* pedir.
- Buscan experiencia editorial: producto, técnica, ambiente, narrativa.
- Sensibles a la curaduría: música, vajilla, papel del menú, tono del staff.
- Comparten: por WhatsApp con un par, por Instagram en stories, no en reseñas masivas.

Audiencia secundaria:
- Prensa gastronómica (BAE, Buena Vibra, Bondi Live, Joy, NYT Travel cuando aplique).
- Partners potenciales (proveedores, sommeliers, otros chefs).
- Equipos de oficina / hotelería buscando catering o privatización.

## Posicionamiento (working)

> "UTE es una casa gastronómica en Buenos Aires. Cocina de autor con producto, fuego y memoria. Una mesa pensada como obra: temporada, ritmo y conversación."

Palabras-ancla:
- **Producto** (vegetal local, fermentaciones, pesca).
- **Fuego** (brasa, horno, ahumados).
- **Mesa** (vajilla, luz, música, papel — todo cuidado).
- **Autor** (firma del chef, decisiones explícitas).
- **Temporada** (carta que cambia, no manual fijo).
- **Memoria** (referencias locales, cocina latinoamericana sin pretensión).

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
- **Italics expresivos** — una palabra italic por párrafo display funciona bien con Fraunces. Más, se diluye.
- **Listas de tres**: "producto, paciencia y lugar" / "temporada, ritmo y conversación". Patrón retórico que se siente UTE.
- **Verbos sensoriales** (sentarse, conocer, esperar, encontrar) > verbos transaccionales (comprar, suscribirse, reservar... aunque "reservar" sí, en CTA).
- **Sin emojis** en copy editorial. En redes, máximo uno con criterio.
- **Sin "click acá"** ni "siguiente paso". El link es el link.

## Paleta — provisoria

> Hasta que esté el brand definitivo, la paleta provisoria vive en `src/styles/tokens.css`. Es **warm-leaning** (oklch hue 55) para evocar fuego/producto. Si el brand final pide cool/azul/verde, se cambia ahí y propaga.

Roles:
- **Brand 500** — primary acento, hover de CTAs primarios.
- **Brand 300** — italic links en fondos oscuros (sección Contacto).
- **Brand 600** — text-brand en fondos claros.
- **Neutral 0–950** — escala completa. Bg, surface, text.
- **Accent 500** (cool) — placeholder, no usado todavía. Si la dirección final pide un dúo cálido + frío, ya está reservado.

### Light mode (default)

- `bg`: neutral-50 — papel cremoso, no blanco puro.
- `text-primary`: neutral-900 — casi negro, con leve calidez.
- `text-secondary`: neutral-600 — gris cálido para lede.

### Dark mode

- `bg`: neutral-950 — casi negro, no negro puro.
- `text-primary`: neutral-50.
- `text-brand`: brand-300 (más claro para legibilidad en oscuro).

## Tipografía

- **Display**: Fraunces variable. Serif con personalidad, expresiva en italics y light weights. Buena en pesos `300` y `400` con tracking negativo agresivo. **Default del display**: `font-weight: 300`, `letter-spacing: -0.04em`.
- **Sans (texto y UI)**: Inter variable. Neutra, alta legibilidad. Pesos `400` body, `500` UI/medium, `600` ocasional.
- **Mono**: solo system mono. No incluida — no usamos código en UI.

Si el brand final pide otra display (Apoc, GT Sectra, PP Editorial, etc.), reemplazar el `@fontsource-variable/fraunces` por la familia elegida (si tiene paquete fontsource) o self-host manual.

## Idea visual recurrente — propuesta

Hasta que se decida la dirección de arte final, candidatas:

1. **Línea finita horizontal** — entre secciones, dentro de bloques. Comunica orden editorial. Ya está en `Hero.astro` (`.hero__rule`).
2. **Italics gigantes en title** — Fraunces italic light 0.95em line-height, color secondary. Ya aplicado en Hero, Propuesta, Contacto.
3. **Números display** en listas (Experiencia). Fraunces italic, color muted, tamaño 2xl. Comunica curaduría + ritmo.
4. **Eyebrow numerado** — `01 · Propuesta`, `02 · Experiencia`. Letra-tag uppercase con tracking-widest.
5. **Cursor custom** — solo en desktop, dot + halo que reacciona al hover de CTAs. **No implementado** todavía — definir en Fase 4 si lo bancamos en performance.
6. **Grano sutil** en fondos oscuros — overlay PNG ~20kb con `mix-blend-mode: overlay` opacity 0.04. Comunica texture sin overhead. **No implementado**.

## Logotipo

**Pendiente**. Hasta que llegue, favicon es una "u" italic en cuadro negro (`public/favicon.svg`). Sirve solo como token tipográfico — no es el logo final.

Cuando llegue el logo:
- Versión SVG primary (color, full).
- Versión SVG mono (1 color, fondo claro y oscuro).
- Favicon system: 16, 32, 180 (apple-touch), 192/512 (maskable).
- OG default image con logo + display.

## Naming

- **UTE** — nombre del proyecto. Mayúsculas siempre. **Sin tildes**. No es "Ute" ni "ÚTE".
- En meta y JSON-LD: `"name": "UTE"`.
- En email: `hola@<dominio>.<tld>`. Dominio definitivo pendiente.
- En redes: `@ute.somethign` o similar — pendiente confirmar.

## Reglas para reviewer este file en una nueva sesión

Si abrís una sesión nueva y vas a tocar copy o visuales:

1. Leer este archivo **primero**.
2. Si el brand kit final ya llegó, **este archivo debe estar reescrito**. Si está como provisorio (con el disclaimer arriba), seguís en territorio placeholder — todo es cambiable.
3. Cualquier copy que escribas tiene que pasar el test "¿esto suena UTE o suena marketing genérico?". Si dudás, leelo en voz alta — UTE se lee tranquilo.
4. Si proponés un cambio visual fuerte (paleta, tipografía, layout), **antes** decírselo al usuario, no implementarlo. Esto es un gate.

## TODO de marca (cerrar antes de Fase 4 / contenido real)

- [ ] Brand kit oficial de Deenex/UTE: paleta, tipografía, logo, voz aprobada.
- [ ] Dirección de arte elegida (mood final) — esto es gate del usuario.
- [ ] Naming definitivo y dominio final.
- [ ] og-default.jpg con marca real.
- [ ] Favicon system completo (16/32/180/192/512).
- [ ] Logo SVG + variantes.
- [ ] Música de marca / playlist Spotify si va embebida.
- [ ] Curaduría de fotos: pendiente shoot o stock curado.
