# Dirección de arte aprobable: **Archivo de producto / Abastecimiento con criterio**

Fuente de verdad del código al preparar la propuesta: `Brian0261/veganfresh@07a91590b64554bb22ef74ec7519020fb8a2bb0d`, rama `main`. No se ejecutó ni modificó la aplicación remota. Se leyeron `AGENTS.md`, `DECISION_LOG.md`, `DESIGN_SYSTEM.md`, `INTERACTIONS.md`, componentes `Header.astro`, `Art.astro`, página de restaurantes y cotizaciones, `src/content/categories.ts`, `src/config/pages.ts`, y estilos; el árbol confirmó ocho rutas actuales y tests.

## Diagnóstico del estado existente

| Zona | Conservar | Corregir | Razón |
|---|---|---|---|
| Identidad | Logo A y variantes de la familia A (`public/assets/brand/`), verde profundo, marfil, salvia, terracota | Nunca usar logo B; no tocar el raster autoritativo | Decisión explícita y SHA de blob verificado: `6431ea1d1b9e51f3a4ffae106526f67861c6d258` |
| Arquitectura | Astro prerender, Workers/D1/Turnstile, navegación y sitemap P0 | No añadir páginas o JavaScript por estética | SEO/servicio real de cotización |
| Diseño hero | Titular mayorista y CTA | Romper el split 50/50 repetido. Portada con jerarquía de titular + foto panorámica a sangre dentro del contenedor | Evitar plantilla SaaS intercambiable |
| Categorías | Frutas/verduras con información real, sin precios | Sustituir `.svg` simplificados como arte protagonista por fotografía editorial derivada y especificada | Texturas naturales y coherencia visual |
| Restaurantes | Mensaje de compras empresariales y experiencia real | Sustituir ilustración simplificada de plato por bodegón de ingredientes, presentación oscura editorial | Mayor coherencia comercial |
| Catálogo | Índice consultivo `/productos/` | Familias como filas editoriales, nombres como tabla tipográfica, sin SKU/precios | Descubrimiento B2B claro |
| Formulario | Campos/validación, lógica de backend y modo cerrado | Jerarquía y espacio, ayudas y estados visuales; no cambiar contrato ni enviar datos reales | Mejor UX sin regresiones |
| Mobile | Orden lineal y menú nativo accesible | Tipografía de 43–53 px de titulares, medios más grandes y reducción de espacios muertos | Mejor lectura 320–390 px |

## Tres referencias y qué se adapta sin copiar

- **Natoora** — usar jerarquía editorial del producto y textura fotográfica; NO copiar marca, narrativa agrícola o promesas operativas: https://www.natoora.com/pro/
- **ARZA Fresh Produce** — disposición de información B2B y CTA de cotización, NO sus cifras o campos: https://arzafreshproduce.com/
- **Ambroise** — serif expresiva, retículas con aire, fotografía sin sombras; no copiar layout ni assets: https://www.framer.com/marketplace/templates/ambroise/

## Concepto único final

- Contenido como cuaderno comercial de productos, no catálogo minorista ni folleto de agricultura propia.
- Fotos de producto en planos editoriales y recortes amplios, sin personas ni operaciones ficticias.
- Ritmo: hero tipográfico, imagen panorámica, tabla o listado editorial, bloque oscuro de proceso, prueba real sin cifras, cotización.
- No repetir la misma retícula en todas las páginas: `home` titular arriba/foto abajo; `productos` portada tipográfica + panorama + filas; `frutas` imagen vertical izquierda; `verduras` gran bloque oscuro; `restaurantes` bloque oscuro editorial; `cotizar` apoyo izquierdo + formulario.
- Numeraciones y divisores son lenguaje de compra, no decoración masiva. Un único CTA visible en primer tramo de cada página, repetir en cierre.

## Identidad cromática (sin sustitución)

| Token | Valor fuente | Uso |
|---|---|---|
| `--green` | `#15372D` | Marca, texto, CTA principal |
| `--deep` | `#0E2823` | Fondo oscuro y footer |
| `--paper` | `#F6F3EB` | Fondo editorial |
| `--sage` | `#D9E4CD` | Soporte de contenido |
| `--accent` | `#AC452B` | Marcadores editoriales y CTA contextual |
| `--ink` | `#233830` | Texto principal |
| `--muted` | `#52665C` | Texto secundario, verificar contraste |
| `--border` | `#C4CDC3` | Divisores |

`#ede9dc` es un papel auxiliar cromáticamente derivado, no un color de marca nuevo. Usar contraste WCAG AA en combinaciones reales.

## Tipografía y fidelidad

**Sitio**: Newsreader Variable / DM Sans Variable, como estipula el repo. **Mockups rendereados**: sistema local EB Garamond y Arial debido a que la sesión no dispone de los archivos reales; por ello el ajuste de métricas tipográficas se acepta contra las jerarquías y los saltos de línea, NO mediante diferencia pixel a pixel sin normalizar fuentes. No distribuir archivos de fuentes. Tamaños guía: H1 home 88–94 desktop, 45–51 mobile; interiores 62–86 desktop, 43–53 mobile; H2 52–67 desktop / 37–48 mobile; cuerpo 16–18 desktop / 15–17 mobile.

## Licencia y origen

Se reutiliza un bodegón generado editorialmente en fase anterior. No se presenta como una foto real de operaciones, no se introduce nombre de cliente, precios, flota o almacén. Cada recurso nuevo lleva manifiesto y estado de producción visual; reemplazar crops repetidos cuando se disponga de una biblioteca fotográfica autorizada.
