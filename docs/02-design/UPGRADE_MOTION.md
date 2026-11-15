# Interacciones permitidas y su implementación medible

Referencias verificables: https://emilkowal.ski/skill y https://github.com/emilkowalski/skills; se aplican principios generales, **no** se ejecuta código ni se atribuye literalmente una duración que no se haya confirmado como suya.

| Elemento / evento | Entrada | Salida / reversión | Duración | Easing | Propiedades | Reduced-motion / accesibilidad |
|---|---|---|---|---|---|---|
| Botón CTA / hover y focus | Color base a verde más profundo, subrayado flecha si procede | Revertir al salir | 160ms | cubic-bezier(.2,.7,.2,1) | background-color y color | Sin movimiento espacial; foco 2–3px visible sin depender de hover |
| Navegación / hover, activo | Subrayado aparece (opacity) y enlace mantiene posición | Se retira al dejar hover; activo conserva indicador | 150ms | ease-out | opacity, color | Indicador activo permanente, aria-current |
| Menú móvil / click menú | Panel desplegado desde bajo header, contenido completamente visible, foco en primer enlace | Escape/cierre devuelve foco al trigger | 180ms | ease-out | opacity, transform 0–8px | Sin animación con reduced-motion; mantener contenido accesible con JS desactivado cuando sea viable |
| FAQ / click o teclado | Contenido nativo details visible | Colapsar sin salto cuando corresponda | 0ms recomendado | n/a | nativo | No animar height auto; pantalla lectora y foco |
| Header / scroll down | Con umbral >96px, compactar altura sin causar CLS; mantener visible CTA escritorio | Al subir, vuelve a 96px con transición discreta, sin ocultar menú abierto | 180ms | ease-out | background-color y transform (solo si header fixed cuidadosamente) | Preferir header estable si introduce CLS, foco o error de anclas |
| Revelación editorial / entrar viewport **opcional en una sola región** | Pasar opacity .96→1 y translateY 8→0 | **No** volver a esconder al subir; contenido permanece visible | 240ms | ease-out | opacity y transform | Sin JS el contenido es visible; con reduced-motion no transición |
| Formulario / enviar | El botón cambia a «Enviando…», anuncia `role=status`, bloquea doble envío | En error restablece, conserva datos, foco en resumen; en éxito anuncio tras persistencia D1 | sin delay artificial | n/a | contenido/estado; sin fade obligatorio | `aria-live`, `aria-busy`, focus manager y textos no solo color |

**Prohibido:** reveal repetido en todas las secciones, `transition: all`, parallax de imagen en scroll, scroll hijack, animar tamaños de header provocando desplazamiento. El storyboard `design/details/header-scroll-storyboard.png` es una propuesta condicionada: si no funciona sin CLS, header estático prevalece.

## QA de interacción

Prueba navegación con Tab/Shift+Tab, Enter y Escape, vuelve desde formulario tras error, Zoom 200%, reduced-motion, pausas de scroll up/down y foco dentro del menú durante scroll. No ocultar botón de cotización en mobile si el menú falla.
