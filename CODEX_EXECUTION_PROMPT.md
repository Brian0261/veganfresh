# Ejecuta VEGANFRESH íntegramente desde la raíz de este repositorio

Actúa como Technical Lead, desarrollador Astro/Cloudflare, SEO técnico, implementador UI/UX, ingeniero de seguridad y QA. **Implementa la aplicación completa P0**, no solo scaffolding. Ejecuta la tarea en las sesiones y herramientas disponibles dejando estado en el repositorio. Esta carpeta es un paquete documental/visual, NO una app de producción existente.

## 1. Lee fuentes de verdad en este orden

1. `AGENTS.md`, `CODEX_START_HERE.md`, `docs/00-project/DECISION_LOG.md` y `manifests/SPECIFICATION_INDEX.md`.
2. `docs/03-seo/SITE_ARCHITECTURE.md`, `KEYWORD_PAGE_MAPPING.md`, `SEO_REQUIREMENTS.md`, `SEO_STRATEGY.md` y `SEO_OPPORTUNITY_MATRIX.md`.
3. Para cada URL consulta `docs/02-design/PAGE_SPECIFICATIONS.md`, `docs/04-content/COPYWRITING.md` y `manifests/PAGE_ASSET_MAPPING.md`; visualiza screenshots en `design/mockups/desktop/` y `design/mockups/mobile/`, wireframes y assets.
4. Para backend lee `docs/05-technical/TECHNICAL_ARCHITECTURE.md`, `SECURITY_REQUIREMENTS.md`, `PRIVACY_CHECKLIST.md` y `ANALYTICS_PLAN.md`. Para criterios y fases lee `docs/06-codex/IMPLEMENTATION_PLAN.md`, `TESTING_STRATEGY.md` y `ACCEPTANCE_CRITERIA.md`.

## 2. Identidad aprobada y arte

**Usa exclusivamente el PRIMER logotipo A**. Autoridad original: `public/assets/brand/logo-original-preserved.png`; versiones claras/oscuras en `public/assets/brand/`. Nunca utilizar la propuesta B. Reproduce el sistema de color/typography, composiciones y imágenes aprobadas; evita heroes genéricos, cards de ecommerce, stock ficticio, degradados/animaciones decorativos. Los HTML en `design/reference-layouts/` son referencias visuales, NO implementación de producción.

## 3. Alcance P0 obligatorio

Implementa y prueba HTML prerenderizado para las cinco páginas comerciales: `/`, `/productos/`, `/frutas-al-por-mayor/`, `/verduras-al-por-mayor/`, `/proveedor-restaurantes/`. Implementa también `/cotizar/`, `/privacidad/`, 404 real, `POST /api/cotizaciones`, robots/sitemap y Open Graph según condiciones. ` /productos/ ` es un **índice de productos para consulta**, no un inventario: nunca mostrar stock, precios, SKU ni fichas ficticias; confirmar disponibilidad al cotizar. Añade enlace a Productos en header/footer y desde home/categorías. Integra copy y metadatos exactamente desde los documentos actualizados.

**NO crear ni publicar P1/P2**: productos individuales como papa/cebolla/tomate/limón/palta, hoteles/catering, categorías avanzadas o páginas por distritos. No enlazar rutas inexistentes ni incluirlas en sitemap. Deja arquitectura extensible y documentación de futura validación, no stubs indexables.

## 4. Tecnología y operaciones

Solo **pnpm** (nunca npm, npx, yarn o bun): Node.js 24.22.3 LTS objetivo, pnpm 11.28.11, Astro 7.4.11 base estable; verifica soporte/compatibilidad de Wrangler y adaptador antes de congelar dependencias. Configura `.node-version`, `packageManager` y **genera lockfile real** mediante instalación con pnpm, scripts dev/build/typecheck/test/lint/e2e/preview/deploy y CI con `pnpm install --frozen-lockfile`.

Arquitectura: Astro SSG/Workers Static Assets + API Worker; persistencia D1 de leads; Turnstile validado en servidor, idempotencia/rate limiting y avisos comerciales con credenciales privadas. Si no hay keys/domain/legal, modo local claramente simulado con pruebas, **sin** activaciones remotas ni datos falsos. No despliegues producción ni alteres cuentas, DNS, facturación, credenciales o datos personales sin autorización.

## 5. Seguridad, privacidad y SEO técnico

Validación en servidor, errores sin datos personales, restricciones de logging, CSP y headers adecuados, protección de endpoints, WCAG 2.2 AA, uso de reduced-motion, keyboard/focus y accesibilidad de formularios. `quote_form_success` **solo** tras D1 exitoso; clic en WhatsApp no significa venta. No enviar listas, correo, teléfono o nombre a GA4.

HTML SEO debe estar disponible sin JS: title/H1/description/canonical únicos por intención; breadcrumbs coherentes; schema `Organization`/`WebSite` solo con hechos comprobados, `BreadcrumbList` solo si visible; **no** Offer/Product/rating para catálogo de consultas. Sitemap solo URLs indexables autorizadas; staging y funcionales noindex. Dominio, razón social/RUC, canales y datos legales siguen pendientes: documenta y bloquea indexación y captura real hasta validación.

## 6. Implementar, probar y corregir de extremo a extremo

Sigue las fases en `docs/06-codex/IMPLEMENTATION_PLAN.md`, y tras cada una actualiza `IMPLEMENTATION_STATUS.md` con archivos, comandos ejecutados, resultados, bloqueos y próximos pasos. Ejecuta tests de build/HTML sin JS, enlaces, rutas no publicadas, formulario (201/422/429/503, duplicados, fallo correo/DB), seguridad, SEO y accesibilidad. Usa Playwright u otra herramienta real: captura **todas las ocho vistas** a 1440×900 y 390×844, verifica también 320/768/1024/1920, compara por página con mockups, corrige diferencias hasta cumplir `docs/02-design/VISUAL_QA.md`. No sustituyas los gráficos aprobados por recursos genéricos.

Registra resultados Lighthouse/CWV reales cuando el entorno lo permita; mediciones de laboratorio no equivalen a campo. No marques pruebas no ejecutadas como aprobadas. Si faltan herramientas externas, registra limitación y procedimiento exacto.

## 7. Cierre

Entrega aplicación P0 preparada para configuración y despliegue, pruebas e informes de visual QA, auditoría SEO, privacidad/seguridad, scripts pnpm reales, guía de despliegue y `IMPLEMENTATION_STATUS.md` con pendientes reales. **No** declarar sitio publicado ni SEO/rendimiento validado en producción si faltan dominio, secretos, revisión jurídica, contenidos o pruebas. En caso de conflicto: decisión logo A actual > `AGENTS.md` > ADR y sitemap P0 > copy/página > diseño/mockup > documentación complementaria > detalles internos. Empieza ahora y continúa fase a fase sin detenerte tras crear estructura o una página.
