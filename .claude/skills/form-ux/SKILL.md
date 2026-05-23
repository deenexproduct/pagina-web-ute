---
name: form-ux
description: UX de formularios — validation patterns, error states, success states, prevención de errores, conversion. Específico para el form de contacto comercial de QUEM Central. Triggers — "form de contacto", "validación", "error state", "submit handler", "Formspree / Netlify Forms / endpoint propio", "honeypot", "captcha", "tipos de consulta".
---

# Form UX — QUEM Central

El form actual está en `src/sections/Contacto.astro`. Hoy hace **mailto fallback**: el submit arma un email con los datos. Funciona pero no es óptimo para conversion ni para tracking.

## Estado actual

```ts
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = new FormData(form);
  // ... arma mailto y redirige
  window.location.href = `mailto:comercial@quem-central.com?...`;
});
```

Pros: cero backend, funciona offline.
Cons:
- Depende del cliente de email del usuario.
- No hay confirmación visual de envío.
- Sin tracking de conversiones.
- Spam-able (cualquier bot dispara mailtos).

## Mejorar — opciones de backend

### Opción 1: **Formspree** (recomendado para landing)

Free tier: 50 envíos/mes. Setup en 5 min.

```html
<form action="https://formspree.io/f/XXXXX" method="POST">
  <!-- mismos inputs -->
</form>
```

Sin JS: redirect a thank-you page de Formspree. Con JS: fetch JSON + custom success state.

Pros: setup instantáneo, anti-spam incluido (honeypot), envía a email + dashboard.
Cons: marca Formspree visible en plan free.

### Opción 2: **Netlify Forms** (si se deploya en Netlify)

Setup: agregar `data-netlify="true"` al `<form>`. Cero código backend.

```html
<form name="contacto" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contacto">
  <p hidden><label>No completar: <input name="bot-field"></label></p>
  <!-- inputs -->
</form>
```

Free tier: 100/mes.

### Opción 3: **Endpoint propio** (Vercel Functions / Cloudflare Workers)

Más control, más trabajo. Para QUEM Central B2B con leads valiosos, vale la pena cuando hay 100+ leads/mes.

```ts
// api/contact.ts
export async function POST({ request }: { request: Request }) {
  const data = await request.json();
  // Validate, save to DB, send to email, push to CRM (HubSpot, Pipedrive)
  await sendEmail(data);
  await crmPush(data);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
```

Mientras tanto, **mailto está OK** para validar interés inicial.

## Patrones de UX

### 1. Validation inline (no on-submit)

Mostrar error en cada field cuando el user sale del field (blur), no esperar al submit.

```js
form.querySelectorAll('input, select, textarea').forEach((field) => {
  field.addEventListener('blur', () => {
    if (!field.checkValidity()) {
      field.closest('.field')?.setAttribute('data-invalid', 'true');
    } else {
      field.closest('.field')?.removeAttribute('data-invalid');
    }
  });
});
```

```css
.field[data-invalid='true'] input {
  border-color: var(--color-danger);
}
.field[data-invalid='true'] .field-error { display: block; }
.field-error { display: none; color: var(--color-danger); }
```

### 2. Required indicator visible

En el label, no solo en el `required` attribute:

```html
<label for="nombre">Nombre y apellido <span aria-label="obligatorio">*</span></label>
<input id="nombre" name="nombre" required>
```

Asterisco rojo o muted ayuda a escanear.

### 3. Placeholder ≠ Label

Nunca usar `placeholder` como label. Cuando el user empieza a escribir, pierde el contexto.

```html
<!-- MAL -->
<input placeholder="Tu email">

<!-- BIEN -->
<label for="email">Email</label>
<input id="email" placeholder="ejemplo@empresa.com">
```

Placeholder = ejemplo / formato hint. Label = qué pide el input.

### 4. Autocomplete attributes

Sumar `autocomplete` para que el browser auto-rellene:

```html
<input name="nombre" autocomplete="name">
<input name="empresa" autocomplete="organization">
<input name="telefono" autocomplete="tel">
<input name="email" autocomplete="email">
```

Acelera completar el form 3-5x en mobile.

### 5. `inputmode` para tipos numéricos

```html
<input type="tel" inputmode="tel">
```

En mobile, abre teclado numérico, no QWERTY completo.

### 6. Success state — no redirect

En vez de redirigir a `/thank-you`, reemplazar el form con un panel de éxito en el mismo lugar:

```html
<div data-form-wrap>
  <form data-form>...</form>
  <div data-form-success hidden>
    <div class="success-icon">
      <svg viewBox="0 0 24 24" fill="none"><path d="m4 12 6 6 10-14" stroke="var(--color-success)" stroke-width="3"/></svg>
    </div>
    <h3>Recibimos tu consulta</h3>
    <p>Te responde el equipo comercial en menos de 48hs.</p>
    <button data-form-reset>Enviar otra consulta</button>
  </div>
</div>
```

Animar entrada con scale + opacity (ver skill `micro-interactions`).

### 7. Honeypot anti-spam

Field hidden que los bots completan pero humanos no:

```html
<div class="visually-hidden" aria-hidden="true">
  <label>No completar este campo si sos humano:
    <input name="website" tabindex="-1" autocomplete="off">
  </label>
</div>
```

```js
if (data.get('website')) {
  // bot. Descartar silencioso.
  return;
}
```

Mejor que reCAPTCHA porque no daña UX.

### 8. Loading state

Spinner durante envío + disable submit para evitar doble-click:

```js
submit.setAttribute('aria-busy', 'true');
submit.disabled = true;
try {
  await fetch(...);
  showSuccess();
} catch (e) {
  showError(e);
} finally {
  submit.setAttribute('aria-busy', 'false');
  submit.disabled = false;
}
```

## Tipos de consulta — analytics

Para QUEM Central, el `<select>` "Tipo de consulta" tiene valor para sales ops:

```ts
const tipos = [
  'Compra B2B',
  'Corner QUEM',
  'Franquicias',
  'Proveedores / marcas',
  'Inversores',
  'Otro',
];
```

Cuando se conecte a un CRM, **mapear cada tipo a una cola/persona distinta**:
- Compra B2B → ventas@
- Corner QUEM → Joaquín (Director Expansión)
- Franquicias → Joaquín
- Inversores → Matías o Walter
- Proveedores/marcas → comercial@
- Otro → contacto@ (triage)

## Reducir fricción

- **Pocos campos**: el actual tiene 6. OK para B2B (más fricción = leads más calificados). Para B2C reducir a 3.
- **Phone OPCIONAL**: muchos no quieren dar tel inicialmente. Hoy `tel` está sin `required` → bien.
- **Empresa OPCIONAL**: igual. Algunos consultan freelance.
- **Mensaje OBLIGATORIO**: previene leads vacíos.

## Track de conversiones

Cuando haya analytics (Plausible / GA4), evento custom:

```js
window.plausible?.('Form submit', { props: { tipo: data.get('tipo') } });
```

O en GA4: `gtag('event', 'generate_lead', { value: 1, currency: 'ARS', form_type: tipo });`.

## Multi-step (cuando aplique)

Si el form crece a 10+ campos (cotizador de franquicia, etc.), splitear en 2-3 pasos con barra de progreso. Mantener todos los pasos en un mismo `<form>` para no perder datos en navegación.

Hoy no aplica.

## Patrones a EVITAR

- **Captcha v2 con imágenes ("seleccioná los semáforos")** — terrible UX, abandono alto. Mejor honeypot.
- **Validation que muestra error en rojo desde el primer keystroke** — agresivo. Esperar al blur.
- **Submit que no da feedback** — usuario clickea 3 veces, mandando 3 leads.
- **Disabled submit hasta que todo es válido** — usuario no sabe qué le falta. Mejor permitir submit y mostrar errores específicos.
- **Reset button al lado de submit** — riesgo de borrar todo accidental.
- **Forms con auto-focus en el primer field al cargar** — molesta en mobile (sube el teclado de golpe).

## Mejoras concretas para el form actual de QUEM Central

Listado priorizado:

1. **Conectar a Formspree** o **Vercel Function** — eliminar mailto fallback.
2. **Success state** in-place (no redirect mailto).
3. **Validation inline** on blur (no solo on submit).
4. **Honeypot** anti-spam.
5. **`aria-busy` + spinner** durante envío.
6. **Autocomplete attributes** (ya están en algunos campos, completar).
7. **`inputmode="tel"`** en teléfono.
8. **Routing por tipo de consulta** a distintos emails / colas CRM.
9. **Analytics**: evento custom `Form submit` con `tipo`.
