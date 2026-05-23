# src/assets/brand/

Acá viven los assets oficiales de marca de **QUEM Central**.

## TODO — descargar del Drive autorizado

El logo definitivo está en Drive del cliente y **requiere login** para verlo desde un navegador externo. Yo (asistente) no tengo acceso a archivos con login — el logo lo descarga el dueño de la cuenta y lo coloca acá.

Archivos que tienen que vivir en esta carpeta cuando lleguen:

| Archivo                       | Uso                                                  |
|-------------------------------|------------------------------------------------------|
| `logo-quem-central.svg`       | Logo primary, full color, SVG vector                 |
| `logo-quem-central-mono.svg`  | Logo mono, para fondos con poco contraste            |
| `logo-quem-central-dark.svg`  | Logo para fondos oscuros (footer, header dark, etc.) |
| `isotipo-quem-central.svg`    | Solo isotipo, sin texto, para favicons/avatars       |
| `brand-guidelines.pdf`        | Brand kit oficial de QUEM S.A. (paleta, tipografía, dos/donts) |

Mientras no estén los archivos, los componentes que rendereen el logo deben mostrar un fallback tipográfico ("QUEM Central" en tipografía display) — no debe romperse el layout.

## Pendientes relacionados

- Confirmar paleta corporativa final de QUEM S.A. para enchufar en `src/styles/tokens.css`.
- Confirmar tipografía oficial (si difiere de Inter / Fraunces actual).
- Set completo de favicons (16, 32, 180 apple-touch, 192/512 maskable).
- `og-default.jpg` (1200×630) con el logo definitivo.
