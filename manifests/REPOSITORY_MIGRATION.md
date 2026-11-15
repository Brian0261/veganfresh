# Manifiesto de migración acotada — No ejecutar automáticamente

## Repositorio auditado

`Brian0261/veganfresh`, rama `main`, SHA exacto: `07a91590b64554bb22ef74ec7519020fb8a2bb0d` (consulta GitHub connector, 15-11-2026). La copia local para diseñar se basó en el ZIP documental antiguo para conseguir assets y en el **código actual leído directamente en GitHub** para nombres de rutas. No se clonó un checkout del código en el contenedor: esto impide asegurar que una prueba del prototipo estático equivalga a la aplicación real.

## Archivos NUEVOS propuestos (mover con rutas relativas a raíz del repo)

- `public/assets/design-upgrade/*.webp` + `editorial-process.svg`: visuales derivados y diagrama editorial; no sobrescriben recursos anteriores.
- `docs/02-design/UPGRADE_ART_DIRECTION.md`, `UPGRADE_DESIGN_SYSTEM.md`, `UPGRADE_PAGE_SPECIFICATIONS.md`, `UPGRADE_RESPONSIVE.md`, `UPGRADE_MOTION.md`, `UPGRADE_VISUAL_QA.md`: contrato visual específico.
- `design/mockups/desktop/*-1440.png`, `design/mockups/mobile/*-390.png`: 16 mockups individuales de las 8 páginas.
- `design/details/*.png`: 7 ampliaciones y 3 storyboards.
- `manifests/PAGE_ASSET_MAP.csv`, `ASSET_PROVENANCE.md`, `ASSET_INTEGRITY.json`, `REPOSITORY_MIGRATION.md`: trazabilidad.
- `CODEX_DESIGN_IMPLEMENTATION_PROMPT.md`, `qa/RENDER_REPORT.json`, `qa/VALIDATION_REPORT.md`: ejecución y validación.
- `reference-design/*.html`, `style.css`, y `reference-only/*.webp/png`: **solo carpeta de diseño**, no incorporar a `src/` como producción ni hacer indexables estas rutas.

## Archivos del repo que Codex debe MODIFICAR con diff pequeño, únicamente tras confirmar SHA actual

| Ruta real en main | Acción prevista | Restricciones |
|---|---|---|
| `src/styles/site.css` | ajustar diseño general y componentes para nueva retícula, respetando tokens existentes y CSS funcional | no copiar a ciegas `reference-design/style.css` |
| `src/pages/index.astro` | nueva jerarquía de portada y fotos; conservar copy SEO y rutas | mantener H1 y CTA al formulario |
| `src/pages/productos/index.astro` | hub visual por familias e índice tipográfico | NO inventario ni SKU |
| `src/layouts/Category.astro` + `src/content/categories.ts` | permitir composición diferenciada de frutas y verduras sin duplicar contenido | mantener categorías y FAQ reales |
| `src/pages/proveedor-restaurantes/index.astro` | nueva composición editorial B2B, sustituir ilustración | conservar prueba real de cliente sin revelar identidad |
| `src/pages/cotizar/index.astro` | mejorar estructura visual de encabezado y formulario | **no modificar** contrato API, ids, names, Turnstile, modos demo/closed/live ni persistencia |
| `src/pages/privacidad/index.astro` | mejorar ancho y ritmo del texto legal | no convertir borrador en política aprobada |
| `src/pages/404.astro` | recuperación visual con CTA y fotografía ilustrativa | devolver HTTP 404 real |
| `src/components/Header.astro` | mejoras de header responsive y estados | menú con `<details>` o alternativa plenamente accesible, sin trampas de foco |
| `src/components/Art.astro` | adaptar llamada a recursos editoriales o dejar sin referencias según resultado | NO borrar mientras otro componente lo importe |
| `src/components/Footer.astro`, `FinalCta.astro`, `Faq.astro`, `Steps.astro`, `Field.astro` | ajustes de presentación solo si hace falta tras auditar usos | no romper semántica ni eventos |
| `docs/02-design/DESIGN_SYSTEM.md`, `PAGE_SPECIFICATIONS.md`, `RESPONSIVE_RULES.md`, `INTERACTIONS.md`, `VISUAL_QA.md` | agregar enlaces al upgrade aprobado / quitar contradicciones en dirección visual antigua | conservar reglas SEO/accesibilidad no conflictivas |
| `manifests/PAGE_ASSET_MAPPING.md`, `ASSET_MANIFEST.md` | añadir rutas nuevas y dar de baja **solo referencias** a arte obsoleto | no borrar archivos aún |
| `AGENTS.md` | actualizar la oración que prohíbe sustituir dibujos: nuevo upgrade aprobado **sí permite** sustituir simple artwork, preservando logo A | hacerlo mínimo y trazable |
| `tests/e2e/site.spec.ts` y `scripts/compare_captures.py` | actualizar capturas/comparaciones sin debilitar aserciones | pruebas de funcionalidad, no solo screenshots |

## CONSERVAR SIN MODIFICAR por motivos de seguridad, SEO o trazabilidad

`public/assets/brand/logo-original-preserved.png` y demás variantes A; `astro.config.mjs`, `pnpm-lock.yaml`, `package.json` salvo necesidad real; `src/config/pages.ts` (rutas, title/description), `src/config/release.mjs`, `src/config/crawl.mjs`, `src/lib/quote.ts`, `src/scripts/quote-form.ts`, `migrations/0001_leads.sql`, `wrangler.jsonc`, `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`, pruebas unitarias, scripts de despliegue, configuración de privacidad. El upgrade no justifica rediseñarlos.

## Candidatos OBSOLETOS: no borrar todavía

- `public/assets/images/frutas-ilustracion.svg` y `.png`
- `public/assets/images/verduras-ilustracion.svg` y `.png`
- `public/assets/images/ingredientes-restaurantes-ilustracion.svg` y `.png`
- antiguos mockups `design/mockups/desktop/*-desktop.png` y mobile `*-mobile.png` como baseline histórico

Los dibujos están confirmados en `Art.astro` y aún pueden aparecer en documentación/mockups/tests. Tras adaptar referencias, ejecutar `rg` de TODOS los usos incluyendo docs y tests, y solo proponer eliminación en revisión separada; por defecto **conservar** por compatibilidad e historial. El paquete no contiene instrucciones de borrado irreversible.

## Contradicciones detectadas

- `AGENTS.md` actual dice «no sustituir dibujos existentes»; era una restricción de fase anterior, superada por instrucción más reciente explícita del usuario. Debe actualizarse sin afectar prohibición de cambiar logo A.
- `docs/02-design/DESIGN_SYSTEM.md` especifica hero home 56/44, contradice nueva composición superior tipográfica + panorama. El nuevo `UPGRADE_PAGE_SPECIFICATIONS.md` prevalece **solo después de aprobación**; los viejos mockups permanecen como baseline.
- `src/components/Art.astro` carga dibujos simplificados, contradice nueva fotografía editorial; migrar al nuevo componente de imagen optimizada.
- Los mockups nuevos usan EB Garamond/Arial del entorno, la aplicación conserva Newsreader/DM Sans reales: no exigir pixel-perfect contra métricas de fuente diferente; revisar jerarquía y líneas.

## Estrategia para deriva de commit

Antes de copiar: `git fetch`, `git status`, `git rev-parse HEAD`; si HEAD no es el SHA anterior, generar diff entre HEAD real y baseline y registrar rutas con cambios. Aplicar manualmente/selectivamente cada adaptación; no usar copy-recursive que sustituya `src/`, `docs` o `AGENTS.md` completos. Nunca commits, push, PR, merge o deploy sin autorización expresa.
