# Auditoría SEO P0

| Comprobación | Resultado local |
|---|---|
| Ocho vistas | HTML prerenderizado, `lang="es-PE"` y un H1, title y description únicos por vista. Metadatos cotejados con la matriz de arquitectura. |
| Catálogo | 12 ejemplos visibles como texto. Aviso de disponibilidad en el primer viewport desktop/móvil. Productos enlazado desde header, pie, home y categorías. |
| Rastreo | HTML comercial legible sin JS. Menú y enlaces internos funcionales. 404 personalizado devuelve estado 404, incluidas las rutas futuras probadas. |
| Previews | `noindex, follow` en meta y cabeceras HTML. Robots permite leer HTML y excluye el API. Sitemap XML de cero URLs, sin anunciarlo en robots. |
| Publicación | La lista de cinco rutas elegibles se cruza con las rutas aprobadas en el release. Cotizar, privacidad y 404 quedan excluidas. El Worker vacía el sitemap cuando la configuración activa no supera los requisitos. |
| Canonical y OG | Titles, descripciones, locale y sitio renderizados. Canonical y URLs absolutas de OG esperan el origen confirmado. 404 no tiene canonical. |
| Datos estructurados | Plantillas Organization y WebSite en home, BreadcrumbList en las cuatro vistas con navegación de migas. Solo con dominio válido. Sin fichas, ofertas, reseñas o valoraciones. |

Verificación en `tests/e2e/site.spec.ts` y prueba de la lista de indexación en `tests/unit/quote.test.ts`. La portada usa la meta description del sitemap, que tiene precedencia sobre la variación de copy. Los textos comerciales que esperan validación se detallan en `docs/00-project/ADR-008.md`.

Los resultados SEO de Lighthouse sobre loopback reflejan el bloqueo de indexación de la vista previa y la ausencia de canonical absoluto. Quedan pendientes dominio único, Rich Results Test, Search Console, crawl de producción y datos de campo.
