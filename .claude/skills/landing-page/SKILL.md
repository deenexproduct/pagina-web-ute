---
name: landing-page
description: Arquitectura, jerarquía y copy para la home institucional de UTE. Triggers — "agregar sección", "rediseñar hero", "ordenar CTAs", "qué va arriba/abajo", "fluir la página", "estructura de la home", o cualquier decisión sobre orden/objetivo de bloques. NO usar para componentes utilitarios genéricos ni para hacer copy desde cero sin contexto de UTE.
---

# Landing — arquitectura y conversión para UTE

UTE no es una landing de SaaS: es una **web institucional de un restaurante premium**. La métrica de éxito no es "signup", es **intención de reserva** (mailto, click a WhatsApp, scroll completo, retorno al site). El criterio editorial está sobre el de conversión agresiva — pero la conversión sigue siendo el objetivo.

## Las 5 secciones canónicas de la home

Orden fijado en `src/pages/index.astro`. Si cambia, actualizar acá también.

1. **Hero** (`sections/Hero.astro`) — promesa + identidad + CTA primario. Tipografía display gigante con tracking negativo. Layout asimétrico (12 cols, no centrado).
2. **Propuesta** (`sections/Propuesta.astro`) — manifiesto: producto / fuego / mesa. Tres pilares. Da credibilidad antes de pedir reserva.
3. **Experiencia** (`sections/Experiencia.astro`) — recorrido del menú. Lista numerada con números display gigantes. Construye deseo.
4. **PruebaSocial** (`sections/PruebaSocial.astro`) — quote display + 2 referencias breves. Sin estrellas / sin "5 from 200 customers".
5. **Contacto** (`sections/Contacto.astro`) — CTA final, alto contraste (fondo invertido). Mailto + WhatsApp. Cierra fuerte.

A futuro pueden sumarse: **Galería** (después de Propuesta), **Espacio** (entre Experiencia y Prueba Social), **Equipo / Chef**, **Notas de prensa**.

## Jerarquía de CTAs

- **Primario**: "Reservar mesa" — siempre `#reservas` (ancla al final).
- **Secundario / ghost**: "Conocer la experiencia" — `#experiencia`.
- **Cierre**: mailto a `hola@ute.example.com` (cambiar cuando haya dominio real) + WhatsApp.

Reglas:

- **Un CTA primario por viewport** en mobile. En desktop, máximo 2 visibles a la vez.
- Touch target ≥44×44px.
- El CTA primario va en el hero **y** se repite en el cierre. No 6 veces en el medio.
- Nunca un CTA sin contexto antes — siempre que aparece, está precedido por una promesa o una prueba.

## Copy framework

Voz de marca de UTE = editorial, sensorial, sin marketing barato. Reglas:

- **No vender el restaurante** — invitar a la experiencia. Verbos sensoriales > superlativos.
- **No usar**: "el mejor", "número 1", "líder", "revolucionario", "premium" (sí transmitir premium, no decirlo).
- **Sí usar**: "obra", "capítulo", "ritmo", "mesa", "encuentro", "memoria", "tiempo". Sustantivos concretos > adjetivos vacíos.
- **Italics expresivos**: una palabra en italic por párrafo display funciona muy bien con Fraunces. Más que eso, se diluye.
- **Tutear** ("vos") — UTE es argentino, no neutro. Pero formal: "querés ser de los primeros en sentarte, escribinos."

Ejemplos que funcionan en el scaffold actual:

- Hero: _"Una mesa que se queda con vos."_ → promesa sensorial, no funcional.
- Propuesta: _"Producto, paciencia y lugar."_ → ritmo de tres, palabras concretas.
- Contacto: _"Querés ser de los primeros en sentarse, escribinos."_ → invitación directa, sin friction.

## Patrones de conversión que **sí** aplican acá

- **Escasez real** (no fake): "Próxima apertura — 2026" / "Pocas reservas por servicio" — solo si es verdad.
- **Anticipación**: lista de espera previa a apertura. Bien usada genera deseo.
- **Curaduría visible**: mostrar 1 plato por temporada, no 12. Menos es premium.
- **Voz humana**: una firma del chef, un footer con nombre del lugar y año.

## Patrones que **no** aplican

- Reviews con estrellas tipo TripAdvisor — bajan el tono.
- Banners de "como visto en..." con logos de revistas si no son reales o relevantes.
- Live chat / popup de descuento.
- Countdown de oferta — esto no es ecommerce.
- "FAQs" tipo SaaS. Si hace falta resolver dudas (estacionamiento, vegetarianos), una sección sobria al pie funciona mejor.

## Checklist antes de agregar una sección nueva

1. ¿Tiene un objetivo claro distinto al de las que ya existen? Si duplica, edito la existente.
2. ¿Aporta proof, deseo o conversión? Si es solo decorativa, no.
3. ¿Cabe en el flujo: promesa → prueba → deseo → cierre? ¿O rompe el ritmo?
4. ¿Tiene su own `eyebrow` numerado (`01 · …`) coherente con el resto?
5. ¿Respeta el sistema de tokens y los breakpoints? ¿O introduce magic numbers?

## Anti-patrones a evitar

- "Hero centrado + 3 cards" — patrón saas-default. Inmediato no.
- Backgrounds con gradientes blur tipo dashboard.
- Iconos lineal-genéricos (heroicons sin trabajar). Si hay iconografía, que sea custom.
- Mucho contenido above-the-fold. Aire es la marca acá.
- Misma altura de sección para todas — el ritmo vertical se rompe.
