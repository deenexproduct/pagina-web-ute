---
name: a11y-deep
description: Accesibilidad profunda — WCAG 2.2 AA, ARIA patterns avanzados, focus management, lectores de pantalla, navegación por teclado, alternativas a JS. Triggers — "es accesible esto?", "aria-label", "aria-describedby", "role=", "focus trap", "skip link", "keyboard nav", "contraste insuficiente", "screen reader test", "VoiceOver", "NVDA".
---

# Accesibilidad profunda — QUEM Central

WCAG 2.2 AA es el piso. La web institucional B2B también atraviesa procesos de licitación que **exigen** accesibilidad — no es solo "buena práctica".

## Checklist por componente

### Para CADA section de la landing

- [ ] `<section>` con `aria-labelledby="<id>"` que apunta al heading.
- [ ] Heading dentro de la section con ese id.
- [ ] Imágenes decorativas con `alt=""` (cadena vacía explícita).
- [ ] Imágenes con info: `alt` descriptivo (no "imagen de…").
- [ ] Color contrast: text-primary sobre bg ≥ 4.5:1; large text (24px+) ≥ 3:1.
- [ ] Touch targets ≥ 44×44px (incluyendo padding clickeable).

### Para nav / header

- [ ] `<nav aria-label="Navegación principal">`.
- [ ] Active item con `aria-current="page"` (o `"true"` si es anchor activo).
- [ ] Mobile menu toggle con `aria-controls="<menu-id>"` + `aria-expanded="true|false"`.
- [ ] Mobile menu con `hidden` attribute cuando cerrado (no `display: none` via CSS solo).
- [ ] Logo link con `aria-label="QUEM Central · inicio"`.

### Para form

- [ ] `<label for="<id>">` por cada input.
- [ ] Required indicado en label visible (asterisco *) + `required` attribute.
- [ ] Error con `role="alert"` o `aria-live="polite"`.
- [ ] Error vinculado al input con `aria-describedby="<error-id>"` + `aria-invalid="true"`.
- [ ] Submit con `aria-busy="true"` durante envío.
- [ ] Success message con `role="status"` o `aria-live="polite"`.

### Para CTAs / botones

- [ ] `<button>` para acciones (no `<a>`); `<a>` para navegación.
- [ ] Botones de solo icon: `aria-label="Acción"` explícito.
- [ ] Link que abre en nueva pestaña: indicar en label o con icon: "Comprar online (abre en nueva ventana)".
- [ ] `:focus-visible` claro, no removido.

## Skip link

Ya implementado en `BaseLayout.astro`:

```astro
<a href="#main" class="skip-link">Saltar al contenido</a>
<main id="main">...</main>
```

CSS en `global.css`: aparece al focus, escondido por default con `transform: translateY(-200%)`. Critical para usuarios de teclado/lector.

## Patrones ARIA del proyecto

### Card link con texto + icono

```astro
<a class="card" href="..." aria-label="Empanadas — abrir en app">
  <div class="card__photo" aria-hidden="true">
    <svg ...>
  </div>
  <span class="card__name">Empanadas</span>
</a>
```

`aria-hidden="true"` en el photo wrap porque es decorativo. El `aria-label` del link da el contexto completo (nombre + acción).

### Section destacada con tag visual

```astro
<header class="head">
  <div class="head-tag" role="presentation">Sección destacada</div>
  <p class="eyebrow">04 · Corner QÜEM</p>
  <h2 id="title">Corner QÜEM</h2>
</header>
```

El tag visual es `role="presentation"` para que el lector no lo lea como heading. El h2 es el único título semántico.

### Stats sin contexto

```astro
<dl class="stats">
  <div>
    <dt>Cobertura</dt>
    <dd>AMBA + PBA</dd>
  </div>
</dl>
```

`<dl>` + `<dt>`/`<dd>` es semántico para pares label-value. Mejor que `<div><span>...</span></div>`.

### Mobile menu

```astro
<button
  type="button"
  aria-controls="mobile-nav"
  aria-expanded={open ? 'true' : 'false'}
  data-menu-toggle
>
  <span class="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
  <svg aria-hidden="true">...</svg>
</button>

<div id="mobile-nav" hidden={!open}>
  <nav aria-label="Navegación mobile">...</nav>
</div>
```

El `hidden` attr es preferido a `display: none` porque algunos lectores aún leen `display: none` content.

## Focus management

Cuando se abre el mobile menu, **mover el focus al primer link** para que usuario de teclado pueda navegar inmediato:

```js
toggle.addEventListener('click', () => {
  const open = ...;
  menu.hidden = !open;
  if (open) {
    menu.querySelector('a')?.focus();
  } else {
    toggle.focus(); // volver al toggle al cerrar
  }
});
```

Hoy el Header.astro NO hace esto explícitamente. Sumar como mejora.

### Focus trap (modal/drawer)

Si se agrega un modal:

```js
const focusable = modal.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
const first = focusable[0];
const last = focusable[focusable.length - 1];

modal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
  if (e.key === 'Escape') closeModal();
});
```

## Contrast — cómo verificar

DevTools → Inspect → click en el color → muestra el ratio. WCAG mínimos:

| Texto                   | Mínimo  |
|-------------------------|---------|
| Body (< 18pt regular)   | 4.5:1   |
| Large (18pt+ o 14pt bold) | 3:1   |
| Icon meaningful         | 3:1     |
| UI components borders   | 3:1     |

Para auditar todo el sitio: **Lighthouse → Accessibility → Contrast**.

Para diseñar con contrast en mente, herramienta: [oklch.com](https://oklch.com) — visualiza ratios al cambiar L/C/H.

## Navegación por teclado — checklist

Sin tocar el mouse, recorrer toda la web. Debería:

- [ ] **Tab** mueve focus en orden visual lógico.
- [ ] **Shift+Tab** retrocede.
- [ ] **Enter** activa links y botones.
- [ ] **Espacio** activa botones (no links).
- [ ] **Esc** cierra menus/modales.
- [ ] **Flecha abajo** en select abre opciones.
- [ ] El focus es SIEMPRE visible.
- [ ] Skip link aparece al focus.

Si algo NO funciona, hay un bug a11y.

## Lectores de pantalla — test

- **macOS VoiceOver**: ⌘F5 para activar, Ctrl+Opt para navegar.
- **Windows NVDA**: gratis, descargar de nvaccess.org.
- **iOS VoiceOver**: Settings → Accessibility.
- **Android TalkBack**: Settings → Accessibility.

Test mínimo:
1. Activar VO.
2. Recorrer la web entera con flechas.
3. ¿Cada sección anuncia su heading?
4. ¿Los links anuncian destino sin solo "Click aquí"?
5. ¿El form anuncia errores cuando los hay?

## Anti-patrones

- **`<div onclick>`** — no recibe focus, no es accesible por teclado, no anuncia. Usar `<button>`.
- **Color como única forma de info** — agregar icono o texto. Ej: error solo en rojo → agregar ⚠ + "Email inválido".
- **`tabindex="0"` en div** — workaround. Usar elemento semántico.
- **`tabindex="-1"` para todo** — saca elementos del flow del teclado.
- **`aria-label` repitiendo el texto visible** — redundante. El lector lee 2 veces.
- **Texto en imagen** sin `alt` con el texto.
- **`alt="image-123.jpg"`** o `alt="logo"` — describí qué muestra/significa.
- **Forms sin label** — el placeholder NO es label. Usuario pierde el contexto cuando empieza a escribir.
- **Auto-play de video/audio con sonido** — terrible para a11y (y para todo).
- **Scroll-jacking sin opt-out** — Lenis está OK porque sigue ratio del browser. Si fuera scroll-snap agresivo → cortar.
- **`prefers-reduced-motion` ignorado** — usuarios con vertigo / migrañas se ven afectados.

## Tooling

- **Axe DevTools** — extensión Chrome/Firefox. Audit automatizado.
- **Lighthouse → Accessibility** — target 100/100.
- **WAVE** — webaim.org/wave. Visualiza issues en la página.
- **Keyboard navigation test** — manual, no hay sustituto.

## Compliance

Para clientes B2B con licitaciones (gobierno, salud, finanzas), apuntar:
- **WCAG 2.2 AA** (mínimo).
- **EAA** (European Accessibility Act, aplica desde junio 2025 a productos digitales en EU).
- Documentar el reporte Lighthouse + axe en un PDF de compliance.
