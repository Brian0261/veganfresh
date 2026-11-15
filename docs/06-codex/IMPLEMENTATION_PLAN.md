# ENTREGABLE H — Plan de implementación por fases y dependencias

| Fase | Depende de | Implementación Codex | Evidencia de finalización | Gate |
|---|---|---|---|---|
| 0. Contrato y ADR | Paquete leído | crear `docs/`, issue de datos pendientes y ADR-001 arquitectura | checklist de documentos, decisiones confirmadas | no contenidos inventados |
| 1. Infra y estructura | 0 | Astro SSG, Cloudflare Wrangler, D1 dev/staging/prod, CI, mocks y secretos vacíos | build, typecheck, preview sin indexación | no secretos en Git |
| 2. Sistema visual | 1 | tokens, tipografías locales bajo licencia, logos, header/footer, buttons, FAQ y focus/reduced motion | Storybook opcional o página QA visual no indexada; snapshots | a11y componentes y tokens exactos |
| 3. Comercial/SEO base | 2 | Home, productos (hub de consultas), frutas, verduras, restaurantes, metadata, breadcrumbs, enlaces | HTML generado y capturas; contenido útil por ruta | sin inventario ni stock inventados |
| 4. Cotizador frontend | 2 | `/cotizar/` con campos, validaciones accesibles, estados | e2e validación y teclado | no JS-only sin alternativa justificada |
| 5. API y D1 | 1,4 | D1 migrations, API JSON, validación, idempotencia, rate limiting, Turnstile | integración con pruebas 201,422,429,503 y duplicados | no confirmar si no guarda |
| 6. Avisos y privacidad | 5, datos legales | Resend, reintentos, aviso privacidad legal, bloqueo si incompleto | tests de caída email + auditoría legal | bloqueo legal P0 antes de producción |
| 7. SEO técnico | 3 | canonical/dominio, sitemap condicionada, robots, 404, schema, OG, redirects | Rich Results Test, curl/sitemap parser, noindex staging | dominio real requerido |
| 8. Instrumentación | 5, revisión legal | eventos definidos, UTMs controladas, Search Console, GA4 opcional | debug sin PII ni doble eventos | cumplimiento privacidad |
| 9. QA profundo | 3–8 | Playwright visual, axe, Lighthouse/PSI, security headers, dependencia scan | matriz llena y reporte de diferencias corregidas | todas las P0 cerradas; P1/P2 no implementadas ni indexadas |
| 10. Deploy y operación | 9 | release, rollback, alertas, D1 backup/export, runbook | smoke tests + simulacro restauración | aprobación de propietario |

## Condiciones para pasar fase

- Fases funcionales: pruebas verdes reales y payloads en staging; nunca datos personales verdaderos.
- Diseño: capturas a seis viewports y revisión contra referencias; documentar diferencias manuales, no solo pixel threshold.
- Seguridad: fuga PII/secret, error de validación, envío duplicado y exposición de D1 son bloqueantes.
- SEO: páginas comerciales indexables con contenido sustancial, canonical en dominio definitivo, noindex en entorno temporal.
- Operación: sin aviso legal aprobado no hay captación real en producción.

## Registro de desviaciones (ADR)

Cada decisión distinta a lo aprobado requiere `ADR-###.md` con problema, alternativas, pruebas, coste, impacto visual/SEO/legal y confirmación del propietario. No introducir frameworks CSS completos, carrusel, CMS ni login por preferencias del implementador.

## Puerta específica SEO del hub P0 (ADR-006)

Antes de aprobar fase 3: `/productos/` debe estar prerenderizada, enlazada en nav/header/footer y categorías, contar con copy completo y disclaimers en primer viewport, screenshot 1440/390/320 sin overflow y **sin** fichas P1 enlazadas. El sitemap solo incluye el hub cuando se habilite indexación con aprobación comercial, nunca automáticamente por existir archivo.
