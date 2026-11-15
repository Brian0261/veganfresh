# Mapa exacto de URL P0 → especificación → mockups → activos

Consultar [PAGE_ASSET_MAP.csv](PAGE_ASSET_MAP.csv) para los recursos editoriales vigentes. Las referencias iniciales quedan en este documento como historial.

Todos los enlaces siguientes son rutas relativas a la raíz `veganfresh/`. Los PNG son **mockups aprobables, no capturas de una web de producción**; el contenido SEO sigue siendo la fuente de verdad incluso si un texto de la captura está abreviado por escala.

| Ruta P0 | Layout/SEO/Copy | Desktop 1440 | Móvil 390 | Wireframes | ID activos | CTA |
|---|---|---|---|---|---|---|
| `/` | `docs/02-design/PAGE_SPECIFICATIONS.md`, `docs/03-seo/SITE_ARCHITECTURE.md`, `docs/04-content/COPYWRITING.md` | `design/mockups/desktop/home-desktop.png` | `design/mockups/mobile/home-mobile.png` | `design/wireframes/home-desktop-wireframe.png`, `design/wireframes/home-mobile-wireframe.png` | IMG-HERO-01, IMG-FRUTAS-01, IMG-VERDURAS-01, LOGO-A-01 | `/cotizar/` y `/productos/` |
| `/productos/` | mismos 3 documentos | `design/mockups/desktop/productos-desktop.png` | `design/mockups/mobile/productos-mobile.png` | `design/wireframes/productos-desktop-wireframe.png`, `design/wireframes/productos-mobile-wireframe.png` | IMG-FRUTAS-01, IMG-VERDURAS-01, LOGO-A-01 | `/cotizar/?origen=productos` |
| `/frutas-al-por-mayor/` | mismos 3 documentos | `design/mockups/desktop/frutas-desktop.png` | `design/mockups/mobile/frutas-mobile.png` | `design/wireframes/frutas-desktop-wireframe.png`, `design/wireframes/frutas-mobile-wireframe.png` | IMG-FRUTAS-01, LOGO-A-01 | `/cotizar/?categoria=frutas` |
| `/verduras-al-por-mayor/` | mismos 3 documentos | `design/mockups/desktop/verduras-desktop.png` | `design/mockups/mobile/verduras-mobile.png` | `design/wireframes/verduras-desktop-wireframe.png`, `design/wireframes/verduras-mobile-wireframe.png` | IMG-VERDURAS-01, LOGO-A-01 | `/cotizar/?categoria=verduras` |
| `/proveedor-restaurantes/` | mismos 3 documentos | `design/mockups/desktop/restaurantes-desktop.png` | `design/mockups/mobile/restaurantes-mobile.png` | `design/wireframes/restaurantes-desktop-wireframe.png`, `design/wireframes/restaurantes-mobile-wireframe.png` | IMG-RESTAURANTES-01, LOGO-A-01 | `/cotizar/?origen=restaurantes` |
| `/cotizar/` | mismos 3 documentos | `design/mockups/desktop/cotizar-desktop.png` | `design/mockups/mobile/cotizar-mobile.png` | `design/wireframes/cotizar-desktop-wireframe.png`, `design/wireframes/cotizar-mobile-wireframe.png` | LOGO-A-01 | POST `/api/cotizaciones` |
| `/privacidad/` | mismos 3 documentos | `design/mockups/desktop/privacidad-desktop.png` | `design/mockups/mobile/privacidad-mobile.png` | `design/wireframes/privacidad-desktop-wireframe.png`, `design/wireframes/privacidad-mobile-wireframe.png` | LOGO-A-01 | solo canales jurídicos comprobados |
| `/404` HTTP 404 | mismos 3 documentos | `design/mockups/desktop/404-desktop.png` | `design/mockups/mobile/404-mobile.png` | `design/wireframes/404-desktop-wireframe.png`, `design/wireframes/404-mobile-wireframe.png` | LOGO-A-01 | `/` y `/productos/` |

## Por sección y componente visual

| Página y bloque | Archivo gráfico real | Variante responsive | Alt / contenido | Carga |
|---|---|---|---|---|
| Global header/logo | `public/assets/brand/logo-primary.png` | WebP derivado y PNG de respaldo | `VEGANFRESH`, enlace inicio | eager |
| Global footer | `public/assets/brand/logo-inverse.png` | WebP derivado y PNG de respaldo | `VEGANFRESH` | lazy si fuera viewport |
| Global favicon | `public/assets/brand/favicon.ico` | 32/48/180/512 disponibles | decorativo | metadata |
| Home hero | `public/assets/images/hero-editorial-1280.webp` | `hero-editorial-320.webp`, `hero-editorial-640.webp`, `hero-editorial-960.webp`, `hero-editorial-mobile.webp` | Bodegón **editorial**, no instalación real | eager / LCP |
| Home frutas + Productos hero/familia | `public/assets/images/frutas-ilustracion.svg` | SVG flexible, PNG de respaldo | Ilustración editorial frutas | eager solo si LCP |
| Home verduras + Productos familia | `public/assets/images/verduras-ilustracion.svg` | SVG flexible, PNG de respaldo | Ilustración editorial hortalizas | lazy |
| Frutas hero | `public/assets/images/frutas-ilustracion.svg` | SVG flexible | Ilustración frutas | eager |
| Verduras hero | `public/assets/images/verduras-ilustracion.svg` | SVG flexible | Ilustración verduras | eager |
| Restaurantes hero | `public/assets/images/ingredientes-restaurantes-ilustracion.svg` | SVG flexible | Ingredientes ilustrados (no cocina real) | eager |
| Cotizar, privacidad, 404 | sin fotografía nueva | n/a | n/a | n/a |
| Social OG | `public/assets/images/og-veganfresh.png` | 1200×630 | Identidad A editorial | metadata |

## Orden de secciones de `/productos/`

Breadcrumb → Hero y aviso de disponibilidad → familias consultables → lista de nombres (NO stock) → datos para cotizar → CTA combinado → FAQs → CTA final → footer. Archivo HTML de referencia **no producción** `design/reference-layouts/productos.html`.

## Política de archivos P1/P2

Las rutas P1/P2 **no tienen** mockups ni assets de publicación porque no se implementan. Cuando sean aprobadas, primero crear los mockups y actualizar este manifiesto; no reutilizar automáticamente fotografías y títulos de otras categorías para generar páginas vacías.
