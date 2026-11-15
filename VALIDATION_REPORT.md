# Informe de validación — VEGANFRESH SEO (2026-11-13)

**Objeto:** paquete documental y visual, NO sitio Astro en producción.

## Pruebas realmente ejecutadas

| Comprobación | Resultado | Evidencia |
|---|---|---|
| Recuperación ZIP original | PASS | Archivo adjunto recuperado y extraído: 109 entradas; `veganfresh/` preservada |
| Logotipo A intacto | PASS | SHA256 original = actualizado: `8d835e10db36fff72b70dbc0aff7cef5b3592076471c5d32dadbc500cded0303` |
| `python scripts/validate_package.py` | **21/21 PASS; 0 FAIL** | `manifests/PACKAGE_VALIDATION.json` |
| Índice de documentación y rutas de manifiesto | PASS | Test de archivos existentes + enlaces Markdown locales |
| SVG/raster/favicons legibles | PASS | PIL + XML parser, 29 archivos de `public/assets/` |
| Mockups/wireframes de 8 vistas | PASS | 16 mockups (1440/390) + 16 wireframes (1440/390), dimensiones y apertura verificadas |
| Render Playwright/Chromium de ocho páginas | PASS | 24 ejecuciones a 1440, 390, 320 sin overflow y con imágenes cargadas; `design/mockups/RENDER_REPORT.json` |
| Chequeo adicional de navegadores | **48/48 PASS** | 8 páginas × 320,390,768,1024,1440,1920; sin overflow, con logo A y enlace nav «Productos»; `design/mockups/RESPONSIVE_CHECKS.json` |
| P0, P1, P2, indexación de documentación | PASS | SEO P0 y rutas futuras delimitadas en sitemap/mapa/AGENTS; no archivos HTML P1 generados |
| ZIP final | **PASS** | `zipfile.testzip()` sin errores y comparación de rutas, logo A y prompt exacto tras generar el ZIP |

## Investigación: alcance y limitaciones

Se consultaron sitios públicos de proveedores y documentación oficial Google; las fuentes/consultas están en `SOURCE_REGISTER.md`, `COMPETITOR_ANALYSIS.md` y `SERP_ANALYSIS.md`. **NO** se descargaron exportaciones de Google Perú geo-localizadas, GSC de VEGANFRESH, Keyword Planner, Ahrefs o Semrush; volúmenes, KD, CPC, tráfico y posiciones exactas permanecen **ND**. El conjunto de resultados web no permite una clasificación de rankings ordinales. La estrategia se presenta como priorización cualitativa.

## Pruebas NO ejecutadas (aplicación aún inexistente)

- `pnpm install --frozen-lockfile`, compilación Astro, compatibilidad real de dependencias y deploy Cloudflare.
- POST real contra Workers/D1/Turnstile/Resend, permisos, DNS, correo y avisos comerciales.
- Auditoría Lighthouse/RUM CWV de aplicación real, prueba WCAG 2.2 AA integral, pentest.
- Indexación en Google Search Console, posiciones y conversiones atribuidas a clientes reales.
- Aprobación legal de privacidad, aprobación comercial de inventario/horarios/garantías y disponibilidad registral de marca.

## Contenido de nueva fase

- Se mantiene logo A y diseño editorial.
- Cinco páginas **comerciales P0**: `/`, `/productos/`, `/frutas-al-por-mayor/`, `/verduras-al-por-mayor/`, `/proveedor-restaurantes/` + funcionales cotizar/privacidad/404.
- P1: fichas específicas papa, cebolla, tomate, limón y palta; páginas de hoteles/catering condicionadas.
- P2: otras frutas/verduras/familias investigadas. **No crear URLs P1/P2 ni incluir en sitemap ahora.**
- Nuevo `productos.html` documental, mockups y wireframes, nav y contenido vinculados.

## Siguiente prueba real

Codex debe instalar con pnpm, compilar, tomar capturas de la APP real, probar endpoints y SEO del output; todo gate de negocio/legal antes de publicar. La ausencia de estas pruebas no se informa como un PASS.
