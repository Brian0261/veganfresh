# Registro de decisiones aprobadas — 13 noviembre 2026

| ID | Decisión | Estado | Motivo | Fuente |
|---|---|---|---|---|
| ADR-001 | Sitio híbrido B2B con cinco páginas comerciales P0 (incluye `/productos/`), cotizar, privacidad y 404 | Aprobado como especificación | Intención diferenciada SEO, CTA claro | `docs/03-seo/SITE_ARCHITECTURE.md` |
| ADR-002 | Astro SSG + Cloudflare Workers + D1 + Turnstile + notificación transaccional | Aprobado como solución objetivo, configuración pendiente | Rápido, SEO prerenderizado, API acotada | `docs/05-technical/TECHNICAL_ARCHITECTURE.md` |
| ADR-003 | **Primer logo A, NO segundo B**; PNG anterior intacto como autoridad geométrica | APROBADO EXPLÍCITAMENTE por usuario | Preferencia irreversible sin nueva autorización | `public/assets/brand/logo-original-preserved.png` |
| ADR-004 | pnpm exclusivamente + Node.js 24 LTS | Aprobado | Soporte y reproducibilidad | `docs/05-technical/TOOLCHAIN_VERSIONS.md` |
| ADR-005 | No usar imágenes generadas como evidencia operativa | Aprobado | Veracidad comercial | `manifests/ASSET_MANIFEST.md` |

| ADR-006 | **Añadir `/productos/` P0 indexable condicionado como índice orientativo de consultas, no inventario; fichas específicas solo P1/P2 previa validación** | Propuesta SEO aprobada para especificación, contenido y publicación sujetos a revisión | Observación de catálogo B2B Verfrut y oferta por producto REN/Majhova/Vameja; no volúmenes medidos | `docs/03-seo/SEO_STRATEGY.md`, `SERP_ANALYSIS.md` |
| ADR-007 | Mantener rutas de categoría y restaurantes, evitar páginas por distrito y blogs genéricos; mejorar navegación con «Productos» | Propuesta SEO de especificación | Intenciones distintas y prevención de duplicados | `docs/03-seo/KEYWORD_PAGE_MAPPING.md` |

En caso de disputa visual: el PNG original de A tiene prioridad sobre SVG raster embebidos, mockups y descripciones. No autorizar automáticamente variantes de icono alteradas. Todo cambio a identidad exige aprobación expresa.
