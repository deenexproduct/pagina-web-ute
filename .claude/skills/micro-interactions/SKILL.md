---
name: micro-interactions
description: Micro-interacciones — hover, focus-visible, active, loading, success, error states. Patrones específicos del proyecto QUEM Central. Triggers — "estado hover", "feedback al click", "loading state", "success message", "qué transition uso", "focus visible", "scroll spy active state", "form feedback".
---

# Micro-interactions — QUEM Central

Las micro-interacciones son los detalles que hacen sentir la web "viva" sin ser ruidosas. Bien hechas = profesional. Mal hechas = lugar común.

Esta skill es complementaria a `motion-interactions` — ahí va el motion grande (scroll storytelling, parallax). Acá los detalles micro.

## Reglas de oro

1. **Respeto `prefers-reduced-motion: reduce`** — todas las animaciones deben tener fallback estático.
2. **Performance > efectos** — solo `transform`, `opacity`, `filter` (con cuidado). Nunca `top/left/width/height`.
3. **Duración**: 80–260ms para feedback de UI. Más largo = se siente lento.
4. **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (standard) o `var(--ease-out-expo)` para "premium".
5. **Una sola interacción a la vez** — no animar 4 propiedades juntas con timings distintos.

## Tokens motion del proyecto

En `tokens.css`:

```css
--dur-instant: 80ms; /* tooltip show */
--dur-fast: 160ms; /* hover de UI */
--dur-normal: 260ms; /* page transitions */
--dur-slow: 420ms; /* reveals */
--dur-slower: 640ms; /* reveals editoriales */
--dur-cinematic: 1.4s; /* hero subhead */

--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

## Patrones por contexto

### Hover en CTA

```css
.btn {
  transition:
    transform var(--dur-fast) var(--ease-standard),
    background-color var(--dur-fast) var(--ease-standard),
    box-shadow var(--dur-fast) var(--ease-standard);
}
.btn:hover {
  transform: translateY(-1px);
}
.btn:active {
  transform: translateY(0);
}
```

El `translateY(-1px)` da sensación de "se levantó al hover". Active resetea — feedback de click instantáneo.

### Hover en card

```css
.card {
  transition:
    transform var(--dur-fast),
    border-color var(--dur-fast),
    box-shadow var(--dur-fast);
}
.card:hover {
  transform: translateY(-3px);
  border-color: var(--color-brand-300);
  box-shadow: var(--shadow-md);
}
```

3px de elevación es el sweet spot. Más = se siente over-the-top.

### Focus-visible (a11y)

Tokens.css define el focus ring:

```css
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 3px;
  border-radius: var(--radius-xs);
}
```

NUNCA quitar `:focus-visible` sin reemplazo. Para CTAs con `:focus` propio, override:

```css
.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px oklch(from var(--color-brand-500) l c h / 0.4);
}
```

### Nav link underline (header del proyecto)

Patrón del Header.astro:

```css
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--color-brand-500);
  transform: scaleX(0);
  transition: transform var(--dur-normal) var(--ease-out-expo);
}
.nav-link:hover::after,
.nav-link--active::after {
  transform: scaleX(1);
}
```

`scaleX` con `transform-origin: center` da el efecto "underline crece desde el centro". Sin layout shift.

### Pulse dot (eyebrow del Hero)

```css
.eyebrow__dot {
  background: var(--color-accent-500);
  box-shadow: 0 0 0 4px oklch(62% 0.15 155 / 0.18);
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 4px oklch(62% 0.15 155 / 0.18);
  }
  50% {
    box-shadow: 0 0 0 7px oklch(62% 0.15 155 / 0.06);
  }
}
```

Da sensación de "live indicator". Cortar con `@media (prefers-reduced-motion: reduce)`.

### Scroll arrow bounce (scroll hint)

```css
.scroll-hint svg {
  animation: scroll-bounce 2s ease-in-out infinite;
}
@keyframes scroll-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}
```

### Loading state (form submit)

Cuando el form se está enviando:

```html
<button class="btn btn-primary" data-form-submit aria-busy="false">
  <span data-label>Enviar consulta</span>
  <span data-spinner hidden aria-hidden="true">
    <svg viewBox="0 0 24 24" class="spinner">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="60"
        stroke-dashoffset="20"
        fill="none"
      />
    </svg>
  </span>
</button>
```

```css
.spinner {
  width: 1rem;
  height: 1rem;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

[aria-busy='true'] [data-label] {
  display: none;
}
[aria-busy='true'] [data-spinner] {
  display: inline-flex;
}
```

JS:

```js
form.addEventListener('submit', async () => {
  btn.setAttribute('aria-busy', 'true');
  await sendForm();
  btn.setAttribute('aria-busy', 'false');
});
```

Hoy el contacto NO tiene este patrón porque es mailto fallback. Cuando se conecte a Formspree/endpoint, agregar.

### Success state (form sent)

Reemplazar el form con un panel "Mensaje enviado":

```html
<div class="form-success" hidden data-form-success>
  <div class="form-success__check">
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="m4 12 6 6 10-14"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
  <h3>Recibimos tu consulta</h3>
  <p>Te responde el equipo comercial en menos de 48hs.</p>
</div>
```

Animar entrada con scale + opacity:

```css
.form-success {
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity var(--dur-normal),
    transform var(--dur-normal) var(--ease-out-expo);
}
.form-success:not([hidden]) {
  opacity: 1;
  transform: scale(1);
}
```

### Error inline (validation)

```html
<div class="field" data-invalid="true">
  <label for="email">Email</label>
  <input id="email" type="email" aria-describedby="email-err" aria-invalid="true" />
  <span class="field-error" id="email-err">Email inválido</span>
</div>
```

```css
.field[data-invalid='true'] input {
  border-color: var(--color-danger);
  box-shadow: 0 0 0 3px oklch(from var(--color-danger) l c h / 0.18);
}
.field-error {
  color: var(--color-danger);
  font-size: var(--font-size-xs);
  animation: shake 0.4s ease-out;
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}
```

### Cursor custom (opcional, desktop only)

Para dar identidad de marca extra. Solo en `(hover: hover)`:

```css
@media (hover: hover) and (pointer: fine) {
  body {
    cursor:
      url('cursor.svg') 10 10,
      auto;
  }
}
```

Hoy NO implementado. Si se decide agregar, mantenerlo sutil — un dot 10px del color brand, no un cursor decorado.

## Scroll spy active state

Ya implementado en `Header.astro` con IntersectionObserver. La micro-interaction es:

```css
.nav-link--active::after {
  transform: scaleX(1);
}
```

Sin transition flicker entre secciones porque el observer está calibrado para "carril central" del viewport (rootMargin -25% / -55%).

## Anti-patrones

- **Hover sin focus-visible equivalente** — usuarios de teclado quedan ciegos.
- **Animar 5+ propiedades juntas** — el browser no compone, frame drops.
- **Transitions de 600ms+** en UI feedback — se siente lento.
- **`!important` en animaciones** — imposible debugear.
- **Animar `background-image`** — no animable (gradient transition specifics).
- **Spinner sin label "Cargando..."** — a11y rompe (lectores no saben).
- **Toast de éxito que desaparece en 1s** — usuario no llegó a leerlo. Mínimo 4s + persistencia con close button.

## Debug rápido

1. DevTools → Rendering → "Paint flashing" — ¿se repinta de más?
2. Performance tab → grabar interacción → ver si hay frames sobre 16ms.
3. `prefers-reduced-motion: reduce` toggle (en devtools) — ¿la web sigue funcional?
4. Tab a través del nav — ¿todos los items tienen focus-visible?
