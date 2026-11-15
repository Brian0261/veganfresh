# Responsive / medidas observables

Los tamaños de cabecera, contenedor y alturas de imagen vigentes se detallan en [UPGRADE_RESPONSIVE.md](UPGRADE_RESPONSIVE.md).

| Ancho | Contenedor y gutters | Cabecera | Layout |
|---|---|---|---|
| 320–389 | 20px laterales, min-width 0 | 68px, menú ≥44px | Una columna, CTA ancho disponible, H1 ≤43px |
| 390–767 | 20px laterales | 68px, menú accesible | Una columna, H1 referencia 46px home |
| 768–900 | 28px laterales | Menú móvil/tablet | 1–2 columnas según espacio; nunca navbar comprimida |
| 901–1100 | 28px laterales | Header desktop si cabe sin overflow | Hero compacto sin superposición |
| 1101–1920 | max 1240px + márgenes auto | 88px | Retícula 12 columnas, 24px gap |

- Mockups principales: 1440px y 390px, de página completa. Pruebas adicionales: 320, 768, 1024 y 1920px.
- No implementar layout por escalado de una sola imagen; CSS responsive real. Reservar ratios para evitar CLS; usar `min-width:0` y wrap en grid.
- Orden DOM semántico igual en desktop y móvil; invertir visualmente fotos solo si no afecta orden de lectura. Ver `docs/02-design/PAGE_SPECIFICATIONS.md`.

## Actualización SEO /Productos/ y navegación (2026-11-13)

La navegación desktop agrega «Productos»: mantener cinco enlaces sin comprimir objetivos táctiles; si 768–1150px no permite caber, menú responsive accesible. Referencia mockups a 1440/390. Hub Productos: hero texto antes que ilustración en DOM y en móvil, familias en filas apiladas, lista de nombres de 4 columnas desktop a 2 mobile, y 320px sin scroll horizontal. No esconder aviso no-inventario con CSS/JS.
