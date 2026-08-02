---
name: ux-writing-es-ar
description: UX writing en español Argentina para B2B corporativo. Trigger — "revisar copy", "mejorar este texto", "auditoría escritura", "escribir un título", "redactar un CTA", "microcopy", "tono Qüem". Cubre voseo argentino consistente, concisión por tipo de elemento (eyebrow/title/lede/body/CTA), brand voice Qüem (corporativo + cercano + claro), reglas anti-jerga, principios de microcopy accesible, SEO ligero. NO usar para ux-ui-design (eso es otro skill), motion-interactions o componentes UI.
---

# UX writing — Qüem Central (B2B, es-AR)

Toda comunicación escrita en la web debe pasar por estas reglas. Si una pantalla nueva tiene texto, primero pasalo por este filtro y después lo escribís en el componente.

## Brand voice — Qüem en una frase

> Corporativo moderno, claro, directo. Hablamos de **alimentos congelados** sin tecnicismos, con confianza de quien ya escaló operación, pero sin alarde.

Tres ejes (siempre vivos en cada string):

| Eje          | Sí                                | No                                                                 |
| ------------ | --------------------------------- | ------------------------------------------------------------------ |
| **Tono**     | Profesional, sereno, cercano      | Vendedor, marketinero, urgente                                     |
| **Lenguaje** | Concreto, B2B, claridad operativa | Buzzwords, "soluciones", "sinergia", "ecosistema" cuando no aporta |
| **Promesa**  | Lo que SÍ hacemos, hoy            | Aspiracional vago, futurista                                       |

Acid test: si una frase podría estar en la web de cualquier startup, **no es Qüem**. Reescribir más concreta y operativa.

## Voseo argentino (obligatorio)

Argentina = `vos`, NO `tú`. Aplica en TODO copy directo al usuario.

| ❌ Evitar           | ✅ Usar                        |
| ------------------- | ------------------------------ |
| Tú puedes comprar   | Comprá / Podés comprar         |
| Contacta con ventas | Contactá a ventas / Escribinos |
| Conoce el modelo    | Conocé el modelo               |
| Solicita una demo   | Pedí una demo                  |
| Tu empresa          | Tu empresa (igual)             |
| Te ayudamos         | Te ayudamos (igual)            |

Imperativos siempre voseo: **Comprá, Pedí, Conocé, Escribinos, Sumate, Probá**.

Si una frase es declarativa (3ra persona o nosotros), no cambia: "Operamos B2B", "La plataforma centraliza...", "Producto, marca, logística".

## Reglas por tipo de elemento

### Eyebrow (texto chico arriba del title)

- **Función**: orientar al usuario en qué sección está + numerarla.
- **Longitud**: 2-4 palabras tras el número.
- **Formato**: `NN · Categoría`. Numeración consistente con orden de landing.
- **NO incluir** "Qüem" ni "Qüem Central" — el `text-transform: uppercase` rompe la diéresis (Qüem → QÜEM, se ve como marca distinta).
- **NO incluir** verbos largos. Es un label, no oración.

Buenos: `01 · Qué hacemos`, `04 · Modelo comercial`, `10 · Prensa`.
Malos: ~~`01 · Qué es Qüem Central`~~, ~~`08 · Qüem en crecimiento`~~ (rompen visualmente).

### Title (h1, h2 principal de sección)

- **Función**: vender la sección en una frase memorable.
- **Longitud**: 5-9 palabras ideal. Max 12.
- **Estructura recomendada**: `[afirmación corta]. [matiz/promesa].`
  - Las dos frases separadas por punto crean ritmo + balance visual.
  - La segunda frase suele ir con `<em>` para gradient brand.
- **Concreto > abstracto**: número, sustantivo, acción.
- **Voz activa**.
- **Sin signos de admiración**.

Excelentes:

- `9 unidades comerciales. Una sola operación.`
- `11 categorías. Un solo catálogo.`
- `Más que un proveedor. Un ecosistema integrado.`

Pobres:

- ~~`Te ayudamos a crecer con nuestras soluciones integrales`~~ (vendedor, abstracto)
- ~~`Bienvenidos a Qüem Central, donde transformamos la distribución`~~ (largo, saludo innecesario)

### Lede / subtitle (texto debajo del title)

- **Función**: explicar la promesa del title en términos operativos.
- **Longitud**: 1 oración, max 18 palabras. Si necesitás más → es body, no lede.
- **Empezar con concreto**: verbo de acción o sustantivo fuerte.

Buenos:

- `Misma propuesta de marca, formato distinto según el espacio.`
- `Operamos abastecimiento, distribución y desarrollo comercial — de alimentos congelados.`

Pobres:

- ~~`Somos la empresa líder en el rubro, con años de experiencia y un equipo que...`~~ (auto-bombo)

### Body / descripción de card

- **Función**: detalle accionable.
- **Longitud**: max 14 palabras por card. Si una card necesita 3 líneas, está mal segmentada.
- **Sin** "nuestro/nuestra" innecesario. "Producto" > "Nuestro producto" en cards.

Bueno: `Última milla AMBA y Provincia de Buenos Aires.`
Malo: ~~`Nuestra red logística nos permite llegar a todos los rincones del AMBA...`~~

### CTA (botón primario)

- **Función**: una sola acción, claramente accionable.
- **Longitud**: 2-3 palabras. Imperativo voseo.
- **Específico > genérico**: "Comprar online" > "Empezar". "Hablar con ventas" > "Contactanos".
- **Verbo de acción real** (lo que pasa al hacer click).

Buenos: `Comprar online`, `Hablar con ventas`, `Ver formatos`, `Pedí una visita`.
Malos: ~~`Click aquí`~~, ~~`Más info`~~, ~~`Enviar`~~ (genéricos), ~~`¡Quiero saber más!`~~ (urgencia falsa).

### Microcopy (placeholders, labels de form, hints)

- **Placeholders**: NUNCA reemplazar label. Es ejemplo, no instrucción.
- **Labels**: sustantivo + `*` si obligatorio. NO uppercase.
- **Hints**: una línea, debajo del input.
- **Error messages**: humano, accionable. "El email no es válido" > "Error 422".

### Alt text

- **Función**: descripción equivalente, no decorativa.
- **Iconos decorativos**: `aria-hidden="true"` (no alt).
- **Logos**: `Qüem Central · inicio` (rol + acción).
- **Fotos de equipo**: `Retrato de [Nombre Apellido]`.

## Palabras y construcciones prohibidas

Eliminar de TODO copy de la web:

| ❌ Prohibido                                                         | ✅ Reemplazar por                        |
| -------------------------------------------------------------------- | ---------------------------------------- |
| "Soluciones integrales"                                              | qué hacés concretamente                  |
| "Innovación" / "innovador"                                           | qué innovás concretamente                |
| "Calidad superior"                                                   | qué garantiza la calidad                 |
| "Líder en el mercado"                                                | dato o quitar                            |
| "Pasión por X"                                                       | quitar                                   |
| "Hace [N] años" sin dato                                             | quitar hasta confirmar                   |
| "Más de [N]" inventado                                               | NO. Brief explícito: no inventar números |
| Signos `!` en marketing                                              | quitar, salvo errores de form            |
| Emojis decorativos                                                   | quitar                                   |
| "Estamos para vos"                                                   | algo accionable                          |
| Mayúsculas iniciales en cada palabra de título inglés ("Title Case") | usar "Sentence case" en español          |

## Marca: "Qüem" con diéresis

- Forma canónica: **Qüem** (mixed case, con diéresis).
- Nombre legal en cards de equipo: **Qüem S.A.** y **Qüem Central**.
- NO escribir "QUEM" ni "QÜEM" en uppercase manual — el browser ya hace uppercase visual en eyebrows.
- En eyebrows con `text-transform: uppercase`, **evitar** poner "Qüem" porque la diéresis se ve raro mayúscula. Reformular la frase.

## Reglas tipográficas (es-AR)

- **Comillas**: usar las "rectas" (programación CSS no lee bien las «francesas»).
- **Em dash**: `—` (alt+shift+- en Mac). NO `--`.
- **Puntos suspensivos**: `…` (alt+;). NO `...`.
- **Decimales**: coma, no punto (`$1,50`).
- **Miles**: punto (`$1.500`).
- **Porcentajes**: `15 %` con espacio (RAE) o `15%` (uso AR cotidiano). En B2B Argentina, `15%` es más común.
- **Acentos**: SI obligatorios. "Más", "Solo", "Catálogo", "Categorías", etc.
- **eñe** "ñ" y diéresis "ü" cuando corresponda. "Qüem" tiene diéresis siempre.

## Checklist para auditoría de cada string

Al revisar copy existente, pasarlo por estas 8 preguntas:

1. ✅ ¿**Voseo** consistente? (si es directo al usuario)
2. ✅ ¿**Longitud** según tipo de elemento? (eyebrow 2-4 palabras, title <12, body <14, CTA 2-3)
3. ✅ ¿**Concreto** vs abstracto? ¿Hay número, sustantivo fuerte, verbo de acción?
4. ✅ ¿Sin **palabras prohibidas**? (soluciones integrales, líder, pasión, innovación vacía)
5. ✅ ¿**Brand voice**? ¿Suena a Qüem (sereno, B2B) o a startup vendedora?
6. ✅ ¿**Acentos** y **puntuación** correctos? (es-AR)
7. ✅ ¿**Marca "Qüem"** escrita bien? (diéresis, mixed case, NO uppercase manual)
8. ✅ ¿Si fuera **uppercase visual** (eyebrow), preserva legibilidad? (sin "Qüem" → "QÜEM")

Si una string falla 2+ checks → reescribir. Si falla 1, decidir caso por caso.

## Patrones de reescritura habituales

### "Te ofrecemos X" → "X"

Antes: `Te ofrecemos un catálogo digital siempre disponible`
Después: `Catálogo digital siempre disponible`

### "Nuestro equipo se encargará de..." → "Te responde el equipo..."

Antes: `Nuestro equipo se encargará de responder tu consulta a la brevedad`
Después: `Te responde el equipo comercial`

### Adjetivos vagos → datos

Antes: `Logística eficiente y de calidad superior`
Después: `Última milla AMBA + PBA`

### CTA genérico → específico

Antes: `Más información`
Después: `Ver formatos` / `Hablar con ventas`

### Dos frases con "y" → punto

Antes: `Comprá alimentos congelados online y con un click llegan a tu local`
Después: `Comprá alimentos congelados con un click.`

## Referencias y comparables

Tono modelo a estudiar:

- **Stripe (es)**: precisión + claridad operativa
- **Linear**: brevedad agresiva, voz de producto
- **Mercado Libre / dLocal B2B**: voseo + tono argentino corporate
- **Notion (es)**: cercanía sin perder profesional

## Errores que vi en la web Qüem (referencia histórica)

Aprendizajes de auditorías previas:

1. ❌ **`01 · Qué es Qüem Central`** → "Qüem" en uppercase eyebrow rompía visualmente. Fix: `01 · Qué hacemos`.
2. ❌ **`Conocé Qüem`** en scroll cue → "QÜEM" muy raro en uppercase. Fix: `Descubrí más`.
3. ❌ **Tres mensajes "Catálogo digital siempre disponible / Compra online desde un único canal / Acceso directo..."** sobrecargaban Plataforma. Fix: 3 bullets cortas.
4. ❌ **Footer pitch eyebrow** `Empezá a operar con Qüem Central` → mismo problema diéresis. Fix: `Empezá a operar hoy`.
5. ❌ **Cards de Unidades con 2 oraciones** rompían el grid. Fix: 1 oración máx 14 palabras.
6. ❌ **`Te ayudamos a sumar facturación sin complejizar tu operación`** quote larga en Corner Valor. Funcionó como brief original — mantenida tal cual.

## Quick reference por sección de la web Qüem

| Sección                | Eyebrow                              | Title formato                                               |
| ---------------------- | ------------------------------------ | ----------------------------------------------------------- |
| Hero                   | (no eyebrow, brand-tag)              | Promesa 3 líneas                                            |
| Qué hacemos            | `01 · Qué hacemos`                   | Contraste posicional 2 líneas                               |
| Ecosistema             | `02 · Ecosistema`                    | `[N] [unidades]. [Matiz].`                                  |
| Unidades de negocio    | `03 · Unidades de negocio`           | `9 unidades comerciales. Una sola operación.`               |
| Corner Qüem (sub-hero) | `04 · Modelo comercial`              | Promesa transformacional                                    |
| Corner Formatos        | `01 · Formatos` (numeración interna) | `5 formatos. Un solo modelo.`                               |
| Corner Incluye         | `02 · Qué incluye`                   | `Una solución llave en mano.`                               |
| Corner Dónde           | `03 · Dónde funciona`                | `Para espacios con tráfico real.`                           |
| Corner Valor           | `04 · Propuesta de valor`            | `Sumá facturación sin complejizar la operación.`            |
| Categorías             | `05 · Categorías`                    | `[N] categorías. Un solo catálogo.`                         |
| Plataforma             | `06 · Plataforma`                    | `Catálogo, pedidos y compra en una sola app.`               |
| Franquicias            | `07 · Franquicias y expansión`       | `[N] formatos para crecer con Qüem.`                        |
| Números                | `08 · La compañía`                   | `Operación, red comercial y tecnología integradas.`         |
| Equipo                 | `09 · Equipo directivo`              | `El equipo detrás de Qüem Central.`                         |
| Prensa                 | `10 · Prensa`                        | `Qüem en los medios.`                                       |
| Contacto               | `11 · Contacto`                      | `Trabajemos con Qüem.`                                      |
| Footer pitch           | `Empezá a operar hoy`                | `Pedidos, abastecimiento y expansión desde un único canal.` |
