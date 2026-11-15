# ENTREGABLE B/D — Design system / «Cuaderno de abastecimiento»

## Tokens visuales aprobados para propuesta

```
color.brand.900 = #0E2823
color.brand.700 = #15372D
color.paper = #F6F3EB
color.surface = #FFFFFF
color.sage.100 = #D9E4CD
color.accent.700 = #AC452B
color.ink = #233830
color.muted = #52665C
color.border = #C4CDC3
color.danger = #9D2A2A
font.display = "Newsreader", Georgia, serif
font.ui = "DM Sans", Arial, sans-serif
radius.button = 4px
radius.control = 4px
radius.card = 0px o 4px (sin pills masivas)
shadow.default = none
max.content = 1240px
max.reading = 720px
```

## Métricas / grilla

| Breakpoint | Ancho | Margen lateral | Columnas | Gutter | Header |
|---|---|---|---|---|---|
| desktop | 1280–∞ | 72 px a 1440, mínimo 32 | 12 | 24 px | 88 px |
| tablet | 768–1279 | 32 px | 8 | 20 px | 76 px |
| mobile | 320–767 | 20 px a 390, 16 px mínimo a 320 | 4 | 12 px | 68 px |

Escala espacios base: 4, 8, 12, 16, 24, 32, 48, 64, 80, 112, 144 px. Secciones desktop 104–144 px vertical; tablet 80 px; mobile 56–72 px. No añadir márgenes arbitrarios de 150–300 px entre bloques.

## Escala tipográfica (CSS clamp permitido solo para tamaños intermedios)

| Uso | Desktop 1440 | Mobile 390 | Interlínea | Peso |
|---|---|---|---|---|
| H1 hero | 80 px | 46 px | 0.98–1.04 | Newsreader 400 |
| H1 interior | 68 px | 42 px | 1.02 | Newsreader 400 |
| H2 | 54 px | 35 px | 1.06 | Newsreader 400 |
| H3 | 28 px | 25 px | 1.12 | Newsreader 500 |
| lead | 20 px | 17 px | 1.45 | DM Sans 400 |
| body | 16 px | 16 px | 1.55 | DM Sans 400 |
| label/form | 14 px | 14 px | 1.4 | DM Sans 600 |
| eyebrow | 12 px | 11 px | 1.3; tracking .1em | DM Sans 700 |
| metadata | 13 px | 13 px | 1.45 | DM Sans 500 |

Líneas de H1 2–4 en desktop, 3–5 en mobile; controlar saltos, evitar una palabra huérfana; títulos en español real sin recortes. Probar 320, 390, 768, 1024, 1440 y 1920 CSS px.

## Dirección de arte

- Referencia: composición editorial tipo catálogo B2B / ficha de compras, **no** app SaaS de tarjetas ni tienda ecológica.
- Composición 56/44 en portada: texto a la izquierda con gran serif y fotografía realista editorial a la derecha en bloque recto sin sombra; la fotografía llega al límite interno y tiene un pequeño marcador vertical «01/04» como acento editorial. No es ilustración flotante.
- Uso de índices `01 /`, reglas de 1px y etiquetas pequeñas como sintaxis; no repetir el mismo patrón en todas las secciones.
- Imagen hero foto IA de frutas/verduras **editorial genérica** con aviso en documentación; no colocar texto dentro del bitmap; nunca fingir que son instalaciones de la empresa.
- Bloques de producto combinan fotos/ilustraciones a sangre, título serif y enlaces textuales, no tarjetas de ecommerce con precio.
- Secciones alternan marfil, verde petróleo y blanco; máximo dos secciones oscuras por página para mantener ritmo.
- Sin glassmorphism, gradientes, emojis decorativos ni sombras elevadas; fotografías texturizadas contrastan con geometría de marca sólida.

## Componentes y medidas

| Componente | Desktop | Mobile | Estados / interacción |
|---|---|---|---|
| Header | 88 px, logo 210 px, nav central, CTA 170×46 | 68 px, logo 160 px, botón menú 44×44; panel con enlaces ≥48 px | nav actual subrayado, hover cambiar decoración, foco 2px visible |
| Botón primario | 46–50 px alto, fondo `brand.700`, texto marfil 15/600, radio 4 | ancho 100% cuando CTA principal | hover `brand.900` 140ms; active translateY 1px; disabled opacidad no menor .55, contrastar |
| Botón acento | como primario, fondo `accent.700`, texto blanco | ídem | hover más oscuro, focus ring 2px `brand.900` + offset 3 |
| Enlace texto | subrayado 1px + flecha opcional | área de toque ≥44 px mediante padding | no depender solo de cambio color |
| Separador | 1px `border` | igual | no interactivo |
| Product tile | grilla 2 columnas, sin precio ni compra | apilado, imagen 4:3 | enlace «Explorar frutas» / «Explorar verduras»; hover subrayado, no zoom exagerado |
| Process row | índice 44px + título 26px + descripción 16px | índice 30px y título 23px | sin animación obligatoria |
| FAQ | `<details>`, regla superior 1px, padding 22px 0 | 18px 0; chevron | open/close nativo, foco visible, sin animar altura de forma frágil |
| Form input | mínimo 48 px alto; label persistente, placeholder ejemplo | ancho completo, tipo email/tel | invalid aria-describedby; border peligro + texto, no solo color |
| Confirmation | región role=status luego de persistencia D1 | enfoque en encabezado y código de referencia | nunca prometer éxito antes de respuesta servidor |
| Toast de red | no confundir fallo email con fallo DB | legible 5s o persistente | botón Reintentar respetando idempotency key |

## Microinteracciones, skill Emil Kowalski

**Verificado:** https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md y https://emilkowal.ski/skill ; no se atribuyen reglas que no hayan sido comprobadas.

- Botones/menú: 120–180 ms, `cubic-bezier(.2,.7,.2,1)`, transicionar solo color, transform y opacidad, nunca `transition: all`.
- Acordeones: priorizar comportamiento nativo y estabilidad, evitar movimiento excesivo; animación de opacidad 140 ms solo si no afecta accesibilidad.
- Form envío: progreso accesible (texto «Enviando...» y bloqueo parcial); foco y anuncio de éxito/error.
- Scroll reveal no obligatorio: no introducir elementos ocultos que requieran JS para ser visibles; si se añade progresivamente, 1 sola sección editorial, distancia ≤12 px y deshabilitar con `prefers-reduced-motion`.
- Reducido: todas las transiciones 0 ms o casi 0 en `@media (prefers-reduced-motion: reduce)`; no parallax.

## Accesibilidad operativa

Contraste texto normal ≥4.5:1 y gran texto ≥3:1; focos visibles, enlaces distinguibles, objetivos de puntero como mínimo WCAG 2.2 AA y diseño preferible ≥44×44 px, skip link, main landmarks, navegabilidad sin ratón. No transformar el logo en única etiqueta de inicio.

## QA visual

Screenshots 1440×900 y 390×844 más 320,768,1024,1920; comparación de regiones con mockups de `design/mockups`, tolerancia ≤8 px para margen de contenedor, ≤6 px para distancias repetidas, ≤1 nivel de escala tipográfica. Las diferencias de fuentes/fotos se evalúan manualmente, no por porcentaje ciego de píxeles.


## Módulo catálogo nuevo P0

- Reutilizar header A y tokens existentes, sin cambiar tipografía/colores por SEO. Agregar «Productos» como enlace de navegación y estado activo con subrayado; breakpoint tablet se colapsa si 5 enlaces más CTA no caben.
- `CatalogFamily`: fila editorial con título, texto breve, enlace real y máximo un SVG original reutilizado; sin cuadrícula de 12 fotos de stock.
- `ConsultableExample`: nombre de producto como etiqueta **no clicable** en página P0; no estilo de `ProductCard` con precio, disponibilidad o carrito.
- `CatalogDisclaimer`: aviso visible de «ejemplos de consulta, no inventario» en mismo viewport que el listado; tono sereno (marco fino, no warning alarmista).
- `RequirementSteps`: lista numerada 01-04 en bloque verde profundo, separadores 1px; se extiende del componente de proceso existente.
- La página `/productos/` tiene mockups desktop/mobile en `design/mockups/`; NO aceptar layout genérico.
