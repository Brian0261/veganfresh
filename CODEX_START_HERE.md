# Iniciar la implementación de VEGANFRESH con Codex

1. Abrir carpeta `veganfresh/` como raíz. Leer `AGENTS.md`, `docs/00-project/DECISION_LOG.md`, `manifests/SPECIFICATION_INDEX.md` y `CODEX_EXECUTION_PROMPT.md`.
2. Confirmar visualmente logo **A** `public/assets/brand/logo-original-preserved.png`; todas las referencias activas deben usarlo.
3. Leer **sitemap P0 definitivo** `docs/03-seo/SITE_ARCHITECTURE.md` y mapa keyword→URL `docs/03-seo/KEYWORD_PAGE_MAPPING.md`. `/productos/` es nueva página P0, no inventario. P1/P2 NO se implementan todavía.
4. Para cada página P0, consultar: `docs/02-design/PAGE_SPECIFICATIONS.md`, `docs/04-content/COPYWRITING.md`, `manifests/PAGE_ASSET_MAPPING.md` y screenshots correspondientes. No copiar los HTML de referencia como producción.
5. Revisar estrategia de expansión en `docs/03-seo/CONTENT_EXPANSION_ROADMAP.md`, pero no construir esas páginas de lanzamiento.
6. Implementar Astro + Cloudflare usando **solo pnpm**, con Node 24.22.3 LTS objetivo; ver versiones verificadas y advertencias en `docs/05-technical/TOOLCHAIN_VERSIONS.md`. Codex debe producir `pnpm-lock.yaml` **real** al inicializar, no simular instalación.
7. Implementar backend de cotización con D1/Turnstile/avisos y mocks locales; condicionar externas y publicación a secretos y validaciones de negocio/privacidad.
8. Ejecutar `docs/06-codex/IMPLEMENTATION_PLAN.md`, probar con `ACCEPTANCE_CRITERIA.md`, repetir visual QA 1440/390 y tamaño 320, y documentar avances en `IMPLEMENTATION_STATUS.md`.

**Estado inicial:** documentación y activos completos; sin aplicación Astro de producción, dominio, credenciales ni datos legales completos. La investigación SEO es cualitativa, NO contiene volúmenes o rankings verificados.
