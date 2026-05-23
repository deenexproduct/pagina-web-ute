---
name: brand-quem-central
description: Voz, paleta, tipografía y reglas visuales de QUEM Central — compañía gastronómica y tecnológica integrada (cliente de Deenex). Dirección de arte = corporativo moderno + paleta neutral cool con acento azul corporativo y acento verde para Comprar online. Triggers — "tono de marca", "voz QUEM", "qué color", "qué tipografía", "este copy suena bien", "se siente QUEM Central", "es coherente con la marca", "esto se aleja del estilo".
---

# Brand QUEM Central

> **Cliente**: QUEM Central (rebrand de UTE / Meet & Quem). La narrativa anterior (Palta, Emplatame, Marcos Aldazabal, Meet & Quem) **NO se usa** — ver brief `docs/brief-quem-central.md` para el detalle.

## Quién es QUEM Central

Plataforma integral de abastecimiento, distribución y desarrollo comercial de alimentos congelados. **No es** un distribuidor mayorista — es una compañía que integra distribución B2B, retail B2C, franquicias, corners, logística especializada, fraccionamiento, tecnología (app/catálogo) y representación comercial de marcas.

## Audiencia (en orden de prioridad)

1. **Clientes B2B gastronómicos** — restaurantes, bares, cafeterías, hoteles, dark kitchens, catering, clubes, instituciones, operadores gastronómicos.
2. **Franquiciados / corners** — personas o empresas que quieren operar formatos comerciales.
3. **Inversores** — evalúan escala, modelo de negocio, unidades activas, logística, tecnología, proyección.
4. **Proveedores / marcas** — buscan representación comercial, distribución, eventos.

La web prioriza B2B y expansión comercial. Inversores ven solidez, pero la web **no es un pitch deck**.

## Posicionamiento

> "QUEM Central es una plataforma integral de abastecimiento, distribución y desarrollo comercial para alimentos congelados."

Mensaje estratégico: **QUEM Central no solo vende productos congelados. Organiza un ecosistema** para que negocios gastronómicos, comercios y marcas puedan operar, abastecerse y crecer con mayor eficiencia.

## Tono — corporativo moderno

Transmite: **solidez · escala · claridad · tecnología · confianza · cercanía comercial · capacidad operativa**.

### Qué SÍ es

- *"Plataforma integral para el abastecimiento y desarrollo comercial de alimentos congelados."*
- *"Integramos distribución B2B, logística especializada, franquicias, corners comerciales y tecnología."*
- *"Un ecosistema diseñado para escalar alimentos congelados."*
- *"Hablemos de cómo trabajar con QUEM Central."*

### Qué NO es

- "Somos los mejores en congelados." (marketing barato)
- "Tu proveedor mayorista de confianza." (tono de catálogo)
- "Revolucionamos la logística de congelados." (startup abstracto)
- "Crecé con nosotros, hacemos magia comercial." (informal)
- "Promesas financieras sin datos." (regla explícita del brief)

### Reglas micro

- **Sin exclamaciones** en copy institucional.
- **Sin emojis** en copy institucional.
- Listas de tres o cuatro elementos (producto · logística · red comercial) — patrón legible.
- "Compra" / "comprar" se reserva para el CTA Comprar online; en el resto se habla de "abastecer", "operar", "desarrollar".
- **No inventar métricas** — regla dura. La sección "QUEM en números" usa la versión institucional suave hasta que el cliente habilite datos (toggle `SHOW_METRICS` en `src/config/site.ts`).
- No mencionar **nunca**: Palta, Emplatame, Marcos Aldazabal, Meet & Quem, "unión estratégica anterior".

## CTA principal

**Comprar online** — siempre visible (header sticky, hero, contacto, footer). Linkea a `APP_BASE_URL` definido en `src/config/site.ts` (default `https://app.quem-central.com`). Color destacado = verde acento (`--color-accent-500` / `#1FB874`).

## Dirección de arte — corporativo moderno

Mood: empresa con ecosistema, sólida, tech-friendly, sin parecer una tienda online. Inspiración: institucional B2B moderno (companies con plataforma + operación). **No** se parece a Aman/restaurante editorial. Sí se parece a una compañía con escala, app y red comercial.

### Reglas visuales

- Jerarquía visual fuerte: el ojo va al CTA Comprar online sin pensarlo.
- Mucho aire, secciones separadas, no apilar contenido sin respirar.
- Foto fuerte en hero: operación / logística / equipo / producto (no solo producto solo).
- Cards con borde sutil (1px `--color-border-subtle`) + hover elevation (translateY + shadow-md). Sin gradientes saturados.
- Iconografía lineal custom (paths simples 1.8 stroke). No emojis, no flat illustrations decorativas.

### Evitar

- Exceso de placas comerciales tipo banner.
- Grillas infinitas de producto (parece supermercado).
- Lenguaje de catálogo mayorista.
- Diseño informal / mucho coloreado.
- Hero centrado SOLO en producto (esto NO es una tienda).

## Paleta — vigente en `src/styles/tokens.css`

| Rol            | Hex      | OKLCH                  | Uso                                          |
|----------------|----------|------------------------|----------------------------------------------|
| **Crema base** | `#F8F9FB` | `oklch(98% 0.003 240)` | bg light, papel cremoso muy sutil            |
| **Tinta**      | `#111623` | `oklch(15% 0.018 240)` | text-primary, headings                       |
| **Brand 500**  | `#2854C5` | `oklch(50% 0.180 250)` | azul corporativo — links, eyebrows, isotipo  |
| **Brand 600**  | `~#1F46AE` | `oklch(43% 0.170 250)` | hover                                        |
| **Accent 500** | `#1FB874` | `oklch(62% 0.150 155)` | verde acento — CTA Comprar online            |
| **Accent 600** | `~#1AA065` | `oklch(54% 0.135 155)` | hover del CTA Comprar online                 |

Roles semánticos:
- `--color-bg` = crema base.
- `--color-bg-inverted` = tinta (footer).
- `--color-text-primary` = tinta sobre crema.
- `--color-text-brand` = azul corporativo (eyebrows, links).
- `--color-text-accent` = verde acento (highlights, success-ish).
- CTA primario (Comprar online) = `.btn .btn-primary` = verde acento.
- CTA secundario (Conocer / Consultar) = `.btn .btn-secondary` = azul corporativo.

### Color reservado

`accent-50` a `accent-900` están definidos pero su uso principal es CTA verde. No usar verde en text body ni en backgrounds amplios — solo accent puntual.

## Tipografía

- **Display + Sans**: Inter variable. Para títulos pesos 600-700 con tracking ajustado, body 400, UI 500. Tracking de display: `--tracking-tightest` (-0.03em).
- **Serif**: Fraunces variable. **Reservada**, no se usa por default. Si más adelante se necesita un detalle expresivo (un quote, un wordmark con personalidad), se puede usar Fraunces italic en pequeñas dosis. Por default, todo es Inter.
- **Mono**: system mono. Solo en código si llegara a aparecer.

Cuando llegue brand kit oficial de QUEM S.A., reemplazar `--font-display` y `--font-sans` por las familias oficiales (self-host woff2 en `src/assets/brand/fonts/`).

## Idea visual recurrente

Gestos que aparecen en toda la web:

1. **Eyebrow numerado**: `01 · Qué es`, `02 · Ecosistema`, ... Tracking-widest, color brand. Aparece arriba de cada section title.
2. **Isotipo "Q" cuadrado**: cuadrado redondeado azul corporativo con la letra "Q" en peso bold, usado en header, footer y favicon mientras no llegue el logo final.
3. **Cards con top-rail**: cards de ecosistema con una línea de 3px arriba en color (brand / accent / neutral) — comunica categoría sin gritar.
4. **CTA verde aspiracional**: el botón Comprar online en verde acento crea un foco visual claro distinto del azul corporativo.
5. **Asimetría 7/5 o 8/4**: hero y muchas secciones en grilla asimétrica, no 50/50.

## Logotipo

**Pendiente.** El logo definitivo está en Drive del cliente con acceso por login — debe descargarlo manualmente quien tiene la cuenta. Hasta entonces, el "logo" en header/footer/favicon es el isotipo "Q" tipográfico azul corporativo (`brand-mark` en CSS scoped del Header).

Cuando llegue:
- `src/assets/brand/logo-quem-central.svg` (full color primary)
- `src/assets/brand/logo-quem-central-mono.svg`
- `src/assets/brand/logo-quem-central-dark.svg` (para footer)
- `src/assets/brand/isotipo-quem-central.svg` (favicon system)

Reemplazar el placeholder `.brand-mark` en `Header.astro` y `Footer.astro` por `<img src={logoSrc} ...>` cuando estén los archivos.

## Motion y la dirección corporativa

Coherente con corporate moderno, el motion es **funcional, mínimo, no decorativo**:

- Fade-up de titles al entrar al viewport (`reveal` preset en `src/lib/motion.ts`).
- Hover de cards: `translateY(-2px)` + `shadow-md` + cambio de borde a `--color-brand-300`.
- Header sticky: cambia de background transparente a opaco al hacer scroll > 8px (no animación cinematográfica).
- Lenis smooth scroll activado (siempre con `prefers-reduced-motion: no-preference`).
- **Sin parallax, sin scroll storytelling, sin cursor custom.** Sobrio.

Ver skill [`motion-interactions`](../motion-interactions/SKILL.md) para implementación.

## Reglas para reviewar en una sesión nueva

1. Leer **primero** este archivo + `docs/brief-quem-central.md`.
2. Cualquier copy nuevo pasa el test "¿esto suena corporate moderno, claro, sin grandilocuencia?". Si suena marketinero o startup-abstracto, no entra.
3. Cualquier cambio visual fuerte (paleta, tipografía, layout) → decírselo al usuario primero, no implementarlo.
4. **NO mencionar** UTE / Meet & Quem / Palta / Emplatame / Marcos Aldazabal en NINGÚN copy. La narrativa anterior está enterrada.
5. Antes de agregar un color, una fuente, una sombra, **agregalo al token primero** en `tokens.css`.

## Pendientes de marca

- [ ] Logo definitivo desde Drive del cliente.
- [ ] Brand kit oficial de QUEM S.A. (paleta, tipografía, dos/donts) para conciliar con tokens actuales.
- [ ] og-default.jpg con logo real (1200×630).
- [ ] Favicon system completo (16/32/180/192/512).
- [ ] Fotos definitivas: productos, corners, tiendas, logística, equipo.
- [ ] WhatsApp final (cuando esté, todos los CTAs "Contactar por WhatsApp" lo usan automáticamente vía `WHATSAPP` en config).
- [ ] Confirmar cargo de Joaquín Sepúlveda (default = Director de Expansión Comercial).
- [ ] Confirmar métricas reales o seguir con `SHOW_METRICS=false`.
