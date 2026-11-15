# Requisitos SEO técnicos y editoriales para Codex — noviembre 2026

## Indexabilidad y HTML

- Astro genera HTML prerenderizado con H1, copy sustancial, navegación `<a href>` y enlaces internos sin requerir JS. No bloquear contenido de catálogo tras la interacción de cliente. No usar una SPA CSR para páginas P0.
- Una sola URL canónica por intención y único H1 descriptivo. No links a P1/P2 inexistentes ni sitemap de rutas en preparación.
- `robots.txt`: registrar sitemap de dominio real, no usarlo para bloquear una URL donde se necesita que el crawler vea `noindex`; 404 responde HTTP 404; staging fuera de índice. No inventar dominio en meta/canonical.
- Sitemap: solo páginas P0 habilitadas e indexables; excluir `/cotizar/`, `/privacidad/`, 404 y P1/P2.
- Canonical absoluto cuando haya dominio confirmado y URL limpia; query params de formularios/filtros no son páginas independientes. Forzar host/HTTPS y slash final de contenido.
- Para `/productos/` no crear indexación por búsquedas internas, filtros, paginación ficticia, productos sin datos o «stock» inexistente.

## Metadatos y estructura

- Los **exactos** title/description/H1 por ruta están en `SITE_ARCHITECTURE.md`; comprobar que el HTML compilado coincide. Descripciones únicas con utilidad comercial; no stuffing.
- Breadcrumb UI visible en subpáginas; `BreadcrumbList` solo si coincide con la ruta de usuario. `Organization`/`WebSite` en home con nombre y logo propio; `LocalBusiness` solo cuando se confirmen atributos necesarios (dirección/horario si se declara).
- **No** `Product`/`Offer`/`AggregateRating` en hub de ejemplo ni en fichas sin precio, disponibilidad o información propia validada; seguir criterios de Google y requisitos de página de producto específico.
- No añadir FAQPage schema esperando rich results; las FAQ pueden permanecer como ayuda visible.
- OG/Twitter summary con OG imagen A aprobada (sin falsa representación operativa), título y descripción por ruta donde corresponda.
- `<html lang="es-PE">`, viewport, etiquetas semánticas, aria/focus, alt descriptivos, dimensiones para imágenes, `srcset` y formato eficiente, tipografías y LCP adecuados.

## Calidad de contenido

- P0 sólo publica copy de `docs/04-content/COPYWRITING.md` o versión aprobada. Campos marcados `[VALIDAR]` son bloqueo cuando se refieran a claims o información legal esencial.
- Los nombres de frutas/verduras son **ejemplos de consulta**, no catálogo confirmado. Prohibidos «disponible», «entrega garantizada», «flota propia», «24 h», certificaciones, precios, logos de clientes sin respaldo.
- SEO local: solo mercado «Lima Metropolitana» y distritos referidos por el propio comprador en formulario; sin página artificial por distrito.

## Checks automatizables tras implementar

1. Crawlear con JavaScript apagado todas las P0, comprobar H1 y copy, enlaces, status 200 y viewport.
2. En cada URL habilitada comparar title/meta/H1 con matriz; URL canónica única, sitemap válido y HTTP status correcto.
3. Asegurar que staging, `/cotizar/`, privacidad, P1/P2, errores y API no figuran en sitemap.
4. Rich Results Test y Schema Markup Validator sólo para los schema realmente aplicados, sin aceptar errores y sin prometer aparecer.
5. Search Console al publicar dominio, comprobar Coverage/Page Indexing, Inspection, CWV; nunca declarar «ya posicionado» por enviar sitemap.
6. Lighthouse y RUM: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 en percentil 75 de campo para grupos suficientes (objetivos Google); sin suficientes datos de campo, laboratorio = aproximación. Medir en móvil real y ajustar imágenes/JS.
7. Reportar deltas en GSC sobre landing/consulta, no predecir volumen; GA4 consentimiento según legal.

## Fuentes oficiales

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- https://web.dev/articles/vitals
