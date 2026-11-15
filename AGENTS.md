# VEGANFRESH — contrato persistente para Codex (SEO 2026-11-13)

**Objetivo:** crear web de cotización de frutas y verduras exclusivamente al por mayor B2B para empresas en Lima. No ecommerce minorista. No inventar precio, stock, entrega, cobertura, clientes, certificaciones, contacto, RUC ni infraestructura.

## Precedencia — fuente de verdad

1. **Logo A original** elegido expresamente: `public/assets/brand/logo-original-preserved.png`. Nunca usar B. Variantes de uso en `public/assets/brand/`; ver `docs/01-brand/LOGO_USAGE.md`.
2. Este `AGENTS.md`, `docs/00-project/DECISION_LOG.md` y datos comerciales confirmados.
3. Arquitectura técnica `docs/05-technical/TECHNICAL_ARCHITECTURE.md` y sitemap **vigente** `docs/03-seo/SITE_ARCHITECTURE.md`.
4. SEO y navegación: `docs/03-seo/KEYWORD_PAGE_MAPPING.md`, `SEO_REQUIREMENTS.md` y `SEO_STRATEGY.md`.
5. Texto público por URL `docs/04-content/COPYWRITING.md`, layout `docs/02-design/PAGE_SPECIFICATIONS.md`, diseño/tokens y mockups.
6. Detalles internos que Codex elija sin contradecir contrato.

## Leer según tarea, no todo al mismo tiempo

Punto de entrada `CODEX_START_HERE.md` e índice `manifests/SPECIFICATION_INDEX.md`. Para página, cargar `PAGE_SPECIFICATIONS.md`, `COPYWRITING.md`, `SITE_ARCHITECTURE.md`, y su fila de `manifests/PAGE_ASSET_MAPPING.md`. Para formularios, seguridad y privacidad, cargar los docs de `docs/05-technical/`. Para diseño, ver capturas 1440/390 y `VISUAL_QA.md`.

## Scope explícito y prioridades

- **P0 comerciales:** `/`, `/productos/`, `/frutas-al-por-mayor/`, `/verduras-al-por-mayor/`, `/proveedor-restaurantes/`. Implementar todas, prerenderizadas y con copy aprobado; indexación en producción **condicionada a revisión comercial/legal y dominio**.
- **P0 funcionales:** `/cotizar/`, `/privacidad/`, 404 HTTP real, `POST /api/cotizaciones`, robots y sitemap (solo indexables). Cotizar/privacidad noindex y fuera de sitemap.
- **P1/P2 = investigación futura, NO publicar ni enlazar URLs inexistentes:** papa/cebolla/tomate/limón/palta individuales, hoteles/catering y familias/productos adicionales. No construir stubs ni páginas por distritos. Ver `SEO_OPPORTUNITY_MATRIX.md`.
- **`/productos/` es consulta orientativa, NO inventario:** nombres de frutas/verduras como ejemplos, aviso de disponibilidad por confirmar, sin precios/SKU/Offer/Product rich results ni carrito.

## Stack obligatorio

Astro 7.4.11 base estable sujeta a prueba de compatibilidad, Node.js 24.22.3 LTS `.node-version`, pnpm 11.28.11 **exclusivamente** (`docs/05-technical/TOOLCHAIN_VERSIONS.md`), Cloudflare Workers Static Assets/API, D1, Turnstile servidor y alertas con proveedor por secreto. Generar `pnpm-lock.yaml` real al instalar. No npm, npx, yarn, bun o lockfiles ajenos. No modificar DNS, secrets, cuentas, deploy de producción o datos externos sin autorización.

## Calidad no negociable

HTML sin JS para contenido SEO, noindex staging, único H1/meta/canonical por URL, sitemap solo páginas autorizadas. Validación servidor, protección anti-spam, idempotencia D1, protección PII, WCAG 2.2 AA, foco accesible y reduced motion. CTA de cotización solo marca éxito tras persistencia real. No seguimiento PII/stock ni analítica sin requisitos de privacidad.

Conservar sistema editorial y assets A; no generar imágenes genéricas ni sustituir dibujos existentes. Comparar páginas P0 con screenshots `design/mockups/` a 1440/390 y también 320/768/1024/1920. Tests y reporte antes de cerrar fase. Si faltan datos, configuración segura y bloqueos documentados; NO fingir pruebas/producción.
