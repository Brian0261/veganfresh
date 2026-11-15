# VEGANFRESH

Aplicación P0 de cotizaciones mayoristas para empresas de Lima. Las páginas se generan con Astro y la API se ejecuta en Cloudflare Workers. La vista previa se entrega con la indexación y la captación real cerradas.

## Empezar

Usa Node 24.22.3 y pnpm 11.28.11.

```bash
pnpm install --frozen-lockfile
pnpm preview
```

Abre `http://127.0.0.1:4321/`. Ejecuta `pnpm preview --demo` para probar el cotizador con datos ficticios en D1 local. Usa `pnpm dev` para editar las vistas con recarga. La preparación operativa está en [DEPLOYMENT_RUNBOOK.md](DEPLOYMENT_RUNBOOK.md).

## Sitemap P0

`/` · `/productos/` · `/frutas-al-por-mayor/` · `/verduras-al-por-mayor/` · `/proveedor-restaurantes/` (comerciales, index condicional); `/cotizar/` · `/privacidad/` y 404 (funcionales/noindex). Endpoint: `POST /api/cotizaciones`. Fichas individuales y otros sectores son **P1/P2, no se publican todavía**.

## Investigación SEO (sin volumen ni ranking inventado)

`docs/03-seo/SEO_STRATEGY.md`, `COMPETITOR_ANALYSIS.md`, `SERP_ANALYSIS.md`, `KEYWORD_RESEARCH.md`, `SEO_OPPORTUNITY_MATRIX.md`, `SITE_ARCHITECTURE.md`, `KEYWORD_PAGE_MAPPING.md`, `CONTENT_EXPANSION_ROADMAP.md` y `SEO_AUDIT_CHANGELOG.md`.

## Diseño y pruebas

Las ocho vistas cuentan con mockups 1440/390 y wireframes en `design/`. Consulta [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md), [TEST_REPORT.md](TEST_REPORT.md), [VISUAL_QA.md](VISUAL_QA.md), [SEO_AUDIT.md](SEO_AUDIT.md) y [SECURITY_REVIEW.md](SECURITY_REVIEW.md) para ver la evidencia del build y las pruebas.

## Datos pendientes antes de publicar

RUC/razón social, dominio, WhatsApp/correo, disponibilidad y especificaciones del catálogo, condiciones comerciales, cobertura distrital, privacidad revisada, credenciales y comprobaciones reales de SEO/security/performance. Sin ellos no declarar el sitio listo en producción.
