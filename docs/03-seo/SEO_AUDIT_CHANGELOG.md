# Registro de cambios SEO — 2026-11-13

## Origen verificable

ZIP adjunto `/VEGANFRESH_CODEX_READY(1).zip`: 109 archivos en raíz `veganfresh/` al extraer; este registro describe modificaciones a sus copias **reales**. No se reescribió ni sustituyó el logo original A ni se transformaron ilustraciones en fotos de empresa. Esta auditoría es de **especificación**, no una auditoría de tráfico de un dominio publicado.

## Conservado

- Marca A y su logo original `public/assets/brand/logo-original-preserved.png`.
- Astro SSG + Workers/D1/Turnstile; Node LTS/pnpm exclusivo, tratamiento privado de leads, accesibilidad, QA de capturas, arquitectura anti SPA.
- Rutas base `/`, `/frutas-al-por-mayor/`, `/verduras-al-por-mayor/`, `/proveedor-restaurantes/`, `/cotizar/`, `/privacidad/`, 404.
- Estilo editorial (verde petróleo, marfil, acento terracota), activos aprobados y copy B2B con afirmaciones verificables.

## Cambios

| Archivo | Tipo | Descripción |
|---|---|---|
| `docs/03-seo/SEO_STRATEGY.md` | reemplazado | diagnóstico actual, alcance y límites, estrategia P0/P1/P2 |
| `docs/03-seo/COMPETITOR_ANALYSIS.md` | nuevo | comparación de competidores B2B, especialistas y plataformas |
| `docs/03-seo/SERP_ANALYSIS.md` | nuevo | resultados por consulta **sin** inferir ranking local |
| `docs/03-seo/KEYWORD_RESEARCH.md` | nuevo | familias y productos, intención/página, métricas ND |
| `docs/03-seo/SEO_OPPORTUNITY_MATRIX.md` | nuevo | valoración B2B editorial y gates |
| `docs/03-seo/KEYWORD_PAGE_MAPPING.md` | nuevo | asignación de query/URL única, anti-canibalización |
| `docs/03-seo/SITE_ARCHITECTURE.md` | reemplazado | 5 comerciales P0, P1 y P2 no publicadas, SEO title/meta/H1 por URL |
| `docs/03-seo/SEO_REQUIREMENTS.md` | reemplazado | técnicos/schema y mediciones actualizados |
| `docs/03-seo/CONTENT_EXPANSION_ROADMAP.md` | nuevo | 12 meses dependientes de evidencia GSC/CRM |
| `docs/04-content/COPYWRITING.md` | ampliado | `/productos/` completo, home CTA nuevo y declaración de stock |
| `docs/02-design/PAGE_SPECIFICATIONS.md` | ampliado | producto P0 y navegación actualizada |
| `docs/02-design/DESIGN_SYSTEM.md` | ampliado | módulo catálogo editorial y header |
| `design/reference-layouts/*.html` | actualizado | nuevo enlace nav «Productos», home CTA, referencias cruzadas; nuevo `productos.html` |
| `design/mockups/`, `design/wireframes/` | regenerados | capturas 1440/390, wireframes 1440/390 y prueba overflow 320 para 8 vistas; logotipo A intacto |
| `AGENTS.md`, `CODEX_START_HERE.md`, `CODEX_EXECUTION_PROMPT.md` | actualizados | fuente de verdad SEO, scope P0 vs P1/P2, enlace a mockup catálogo |
| `manifests/*`, project/tech/QA docs | actualizados | índices/rutas y criterios de aceptación |

## Por qué NO crear más P0

No hay volúmenes ni dificultad medidos, ni lista SKU real, ni información diferenciada por producto: un P1 se publica solo si pasa validaciones comerciales, de demanda y sustancia. Sin esos datos, cualquier página «limón/palta» sería susceptible de duplicación; no sustituimos evidencia con creatividad editorial.

## Trabajos pendientes

1. Export Lima Keyword Planner/consultas GSC una vez disponible (el volumen actual es ND).
2. Validación del catálogo/condiciones comerciales por propietario.
3. Datos legales, contacto/WhatsApp, dominio y correo oficial; pruebas/deploy son posteriores, responsabilidad Codex.
4. Comprobaciones reales de indexación, rank tracking, competencia móvil y conversiones tras publicar.
