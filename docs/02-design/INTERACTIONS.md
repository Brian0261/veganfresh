# Interacciones B2B y comportamiento visual

Las transiciones permitidas en el rediseño se detallan en [UPGRADE_MOTION.md](UPGRADE_MOTION.md).

- Nav: foco visible; menú móvil con `aria-expanded`, cerrar con Escape, click outside si compatible, mantener foco coherente al cerrar. No enlaces a secciones no implementadas.
- Botones primarios: transición background-color 140–180ms `ease-out`, sin rebote. Disabled: no enviar y texto de estado. `:active`: cambio de color sin desplazamiento >1px.
- FAQ: `<details>` accesible, Enter/Espacio nativo; si animar, solo opacidad/transición breve y respetar `prefers-reduced-motion`.
- Form: `idle`, `validation-error`, `submitting`, `success`, `server-error`, `rate-limited`; conservar campos en fallo, enfocar resumen de error y anunciar estado ARIA; `success` solo tras D1 persistido.
- Turnstile debe anunciarse y proporcionar alternativa accesible; no ocultar fallos de verificación.
- CTA WhatsApp no visible ni activo antes de configurar número real. Click no equivale a lead ganado.
- Animaciones opcionales: solo microinteracciones intencionales, no parallax, animación global de secciones, blur flotante ni degradados ornamentales.
- Referencia de skills pública de Emil Kowalski `https://emilkowal.ski/skill`: `animate`, `review-animations`, `animation-performance`, `mobile-native`, `break-ui`. **No se instalaron skills externas ni se ejecutó código remoto**. Lectura y aplicación manual/voluntaria tras revisión de seguridad.

## Nuevo comportamiento del catálogo (2026-11-13)

Los ejemplos de productos son **texto informativo**, no fichas interactuables ni botones sin destino. Cada enlace «Frutas», «Verduras» o «Cotizar» tiene href real; query `origen=productos` solamente preselecciona atribución segura, no crea URL SEO. No implementar filtros, JS, paneles flotantes ni modales sin beneficio demostrado para esta lista de consulta. Menú móvil incorpora «Productos» con estado activo/focus y 44px objetivo táctil.
