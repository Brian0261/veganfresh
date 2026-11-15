# Inventario de activos comprobados

El uso de los recortes editoriales de esta actualización está documentado en [PAGE_ASSET_MAP.csv](PAGE_ASSET_MAP.csv), [ASSET_PROVENANCE.md](ASSET_PROVENANCE.md) y [ASSET_INTEGRITY.json](ASSET_INTEGRITY.json).

**Ruta base de producción:** `public/assets/`. **Logo aprobado:** primer diseño A. Todos los recursos proceden del ZIP original, salvo derivados técnicos del logotipo A. No se autoriza ninguna fotografía sintética como evidencia de operaciones.

| Archivo | Tipo/procedencia | Descripción/precauciones |
|---|---|---|
| `public/assets/images/frutas-ilustracion.png` | PNG | Ilustración editorial creada para referencia; NO fotografía del negocio |
| `public/assets/images/frutas-ilustracion.svg` | SVG | Ilustración editorial creada para referencia; NO fotografía del negocio |
| `public/assets/images/hero-editorial-1280.webp` | WEBP | Bodegón editorial generado con IA; NO documentación operativa |
| `public/assets/images/hero-editorial-320.webp` | WEBP | Bodegón editorial generado con IA; NO documentación operativa |
| `public/assets/images/hero-editorial-640.webp` | WEBP | Bodegón editorial generado con IA; NO documentación operativa |
| `public/assets/images/hero-editorial-960.webp` | WEBP | Bodegón editorial generado con IA; NO documentación operativa |
| `public/assets/images/hero-editorial-mobile.webp` | WEBP | Bodegón editorial generado con IA; NO documentación operativa |
| `public/assets/images/hero-editorial-original.png` | PNG | Bodegón editorial generado con IA; NO documentación operativa |
| `public/assets/images/ingredientes-restaurantes-ilustracion.png` | PNG | Ilustración editorial creada para referencia; NO fotografía del negocio |
| `public/assets/images/ingredientes-restaurantes-ilustracion.svg` | SVG | Ilustración editorial creada para referencia; NO fotografía del negocio |
| `public/assets/images/og-veganfresh.png` | PNG | OG gráfico actualizado con logotipo A; editorial y sujeto a revisión de metadata |
| `public/assets/images/verduras-ilustracion.png` | PNG | Ilustración editorial creada para referencia; NO fotografía del negocio |
| `public/assets/images/verduras-ilustracion.svg` | SVG | Ilustración editorial creada para referencia; NO fotografía del negocio |

## Branding derivado de logo A

| Archivo | Uso | Naturaleza |
|---|---|---|
| `public/assets/brand/favicon-180.png` | favicon 180 | Recorte/recolor fiel derivado del original |
| `public/assets/brand/favicon-32.png` | favicon 32 | Recorte/recolor fiel derivado del original |
| `public/assets/brand/favicon-48.png` | favicon 48 | Recorte/recolor fiel derivado del original |
| `public/assets/brand/favicon-512.png` | favicon 512 | Recorte/recolor fiel derivado del original |
| `public/assets/brand/favicon.ico` | favicon | Recorte/recolor fiel derivado del original |
| `public/assets/brand/favicon.svg` | favicon | SVG contenedor con raster PNG embebido, **no vector editable** |
| `public/assets/brand/logo-inverse.png` | logo inverse | Recorte/recolor fiel derivado del original |
| `public/assets/brand/logo-inverse.svg` | logo inverse | SVG contenedor con raster PNG embebido, **no vector editable** |
| `public/assets/brand/logo-mono-white.png` | logo mono white | Recorte/recolor fiel derivado del original |
| `public/assets/brand/logo-mono.png` | logo mono | Recorte/recolor fiel derivado del original |
| `public/assets/brand/logo-mono.svg` | logo mono | SVG contenedor con raster PNG embebido, **no vector editable** |
| `public/assets/brand/logo-original-preserved.png` | logo original preserved | Original PNG byte-for-byte |
| `public/assets/brand/logo-primary.png` | logo primary | Recorte/recolor fiel derivado del original |
| `public/assets/brand/logo-primary.svg` | logo primary | SVG contenedor con raster PNG embebido, **no vector editable** |
| `public/assets/brand/logo-symbol.png` | logo symbol | Recorte/recolor fiel derivado del original |
| `public/assets/brand/logo-symbol.svg` | logo symbol | SVG contenedor con raster PNG embebido, **no vector editable** |

## Validación
- HTML de referencia renderizado con assets locales (base64 inyectado en memoria de Playwright); no se introdujeron URL remotas en capturas.
- La hero editorial y las ilustraciones son recursos para exposición de productos, no acreditan infraestructura.
- `og-veganfresh.png` fue **regenerado con el logotipo A** en el paquete actual; revisar textos y metadatos antes de publicar.
- Logo A fuente `public/assets/brand/logo-original-preserved.png` sin modificación. Todas las páginas apuntan a `logo-primary.png` y `logo-inverse.png`.

## Cambio SEO P0 `/productos/` (2026-11-13)

Se reutilizan **exclusivamente** `IMG-FRUTAS-01` → `public/assets/images/frutas-ilustracion.svg` y `IMG-VERDURAS-01` → `public/assets/images/verduras-ilustracion.svg`, con variantes PNG existentes de respaldo. No se necesitan nuevas fotografías, vehículos, bodegas o personas. Se crean mockups `design/mockups/desktop/productos-desktop.png`, `design/mockups/mobile/productos-mobile.png` y wireframes análogos como recursos **documentales**, no assets públicos. El logo A no se altera. Las 12 palabras del catálogo son etiquetas de texto sin imagen/stock.
