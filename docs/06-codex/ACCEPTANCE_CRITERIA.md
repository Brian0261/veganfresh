# ENTREGABLE I — Matriz de aceptación y QA

**Estados:** P0 bloquea producción, P1 bloquea aceptación, P2 mejora posterior. No hay pruebas de producción realizadas en este paquete; son requisitos para Codex.

| ID | P | Área | Criterio observable | Método | Estado inicial |
|---|---|---|---|---|---|
| BIZ-01 | P0 | Negocio | H1/lead/CTA especifican venta SOLO B2B y Lima | manual 6 páginas | pendiente implementación |
| BIZ-02 | P0 | Veracidad | No existe flota, plazos, stock, certificación, cliente ni cifra inventados | revisión copy/grep y aprobación dueño | pendiente |
| BIZ-03 | P1 | Cotización | Un comprador puede solicitar productos/volumen/distrito en 2 min sin WhatsApp | test usuario + Playwright | pendiente |
| BRAND-01 | P1 | Marca | Logo correcto en fondos claro/oscuro, sin distorsión y favicon legible 16/32 | screenshot visual | pendiente |
| BRAND-02 | P1 | Color | Tokens exactos y texto AA | script contraste + axe + visual | pendiente |
| UI-01 | P1 | Responsive | Sin overflow horizontal a 320/390/768/1024/1440/1920 | Playwright assert scrollWidth≤innerWidth | pendiente |
| UI-02 | P1 | Fidelidad | Grilla/espacios/títulos/foto comparables a mockups, diferencias justificadas | captura lado a lado | pendiente |
| UI-03 | P1 | Estado | CTA, FAQ, menú, campos: hover/focus/disabled/loading/error/éxito | interacción Playwright/teclado | pendiente |
| A11Y-01 | P0 | Accesibilidad | Navegación completa teclado, skip link, foco visible, labels/errores ARIA, sin bloqueos | manual + axe | pendiente |
| A11Y-02 | P1 | Accesibilidad | WCAG 2.2 AA auditada y movimiento reducido respetado | axe + manual | pendiente |
| SEO-01 | P0 | Crawl | HTML estático contiene H1, copy y enlaces sin ejecutar JS | curl/build HTML | pendiente |
| SEO-02 | P0 | Indexación | canonical absoluto real, noindex preview, sitemap excluye noindex y categorías sin validar | integración automated | pendiente |
| SEO-03 | P1 | On-page | titles/descriptions únicos, H1 1 por URL, lang=es-PE, OG y BreadcrumbList real | HTML parser y Rich Results Test | pendiente |
| SEO-04 | P1 | Navegación | Rutas esperadas 200, 404 inexistente 404, redirects reales 301 si aplica | curl/Playwright | pendiente |
| FORM-01 | P0 | Leads | API 201 SOLO tras INSERT D1 válido; correo fallido no pierde lead | integración con DB/email simulados | pendiente |
| FORM-02 | P0 | Leads | doble submit/idempotency genera 1 lead y referencia consistente | test concurrencia | pendiente |
| FORM-03 | P0 | Seguridad | Turnstile Siteverify falla token inválido/caducado/reusado | integración negativa | pendiente |
| FORM-04 | P0 | Seguridad | validación server allowlist/16KB, CORS cerrado, XSS y SQLi no ejecutables | fuzz/unit/integración | pendiente |
| FORM-05 | P1 | UX | errores 422/429/503 muestran mensajes, reintento conserva texto | e2e | pendiente |
| SEC-01 | P0 | Secretos | claves ausentes del repo, D1 sin consultas públicas, logs sin PII | secret scanner + inspección | pendiente |
| SEC-02 | P0 | HTTP | HTTPS, cabeceras, CSP sin aperturas injustificadas; tokens no publicados | curl/security scan | pendiente |
| SEC-03 | P1 | Backup | restauración de muestra a entorno aislado comprobada | simulacro documentado | pendiente |
| PRIV-01 | P0 | Perú | responsable real, finalidad, privacidad, transferencias, retención y derechos revisados | aprobación jurídica externa | pendiente |
| PRIV-02 | P0 | Captura | formulario no habilitado públicamente antes de PRIV-01 | test gate CI | pendiente |
| PERF-01 | P1 | CWV | objetivo campo p75 LCP≤2.5s, INP≤200ms, CLS≤0.1; segmentar móvil/escritorio | CrUX/RUM post-lanzamiento | sin datos |
| PERF-02 | P1 | Presupuesto | presupuesto inicial propuesto: JS propio del navegador ≤70 KiB gzip, CSS crítico ≤35 KiB gzip, imagen hero ≤250 KiB WebP a 1280, sin fuentes bloqueantes | build/metrías lab | pendiente; umbrales internos no Google |
| PERF-03 | P1 | Lighthouse | mínimo propuesto ≥90 Performance, ≥95 Accessibility/SEO en móvil bajo configuración acordada | Lighthouse CI repetido | sin medición |
| ANALYTICS-01 | P1 | Tracking | `quote_form_success` 1 vez solo tras 201/200 legítimo; no PII | debug GA4 / pruebas | pendiente |
| ANALYTICS-02 | P1 | Comercial | lead calificado y cliente real medidos fuera de web | procedimiento CRM | pendiente |
| OPS-01 | P0 | Despliegue | secrets por entorno, smoke test y rollback probado | CI + runbook | pendiente |
| OPS-02 | P1 | Observabilidad | alertas de fallo API/avisos y backup/retención definidos | simulación incidente | pendiente |

## Umbrales y pruebas visuales

- Referencias `design/mockups/desktop/<pagina>-desktop.png` y `design/mockups/mobile/<pagina>-mobile.png`, viewports 1440×900 y 390×844. La prueba debe capturar página completa y el primer pliegue.
- Deltas permitidos en layout (objetivo de diseño): contenedor ≤8 CSS px, gutters repetidos ≤6 CSS px, H1 ±2 CSS px, header ±2 CSS px. Revisión humana resuelve diferencias de fuentes y contenido largo; algoritmo de píxeles sirve para señalar, no aprobar automáticamente.
- Pruebas a 320 y 1920 extra para overflow y comportamiento responsive; 768/1024 transición de grilla y nav.
- Estado de formulario en mínimo 5 variantes: idle/invalid/submitting/success/server-error y estado anti-bot, revisado con lectores de pantalla.
- Foco real y contraste sobre fotografía: nunca evaluar solo color del token; screenshot captura overlay y texto.

## Metas Google Core Web Vitals (campo)

LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 al percentil 75 por móvil/escritorio. Hasta obtener datos reales, se emplean pruebas de laboratorio como **proxy** y se declara «pendiente de validación real». Objetivos de peso y Lighthouse anteriores son presupuestos propuestos, no estándares oficiales.

## Evidencia de cierre obligatoria

`TEST_REPORT.md` con comandos/resultados, `VISUAL_QA.md` con diferencias y capturas, `SEO_AUDIT.md` con sitemap/canonicals/robots, `SECURITY_REVIEW.md` con riesgos P0 cerrados, `DEPLOYMENT_RUNBOOK.md`, acceso a dashboards solo para usuarios autorizados. No bastan informes de IA sin ejecutar comandos y tests.

## Fuentes oficiales

- https://web.dev/articles/lcp
- https://web.dev/articles/inp
- https://web.dev/articles/cls
- https://www.w3.org/WAI/WCAG22/quickref/
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## Casos nuevos SEO 2026-11-13

| ID | P | Área | Criterio observable | Método | Estado inicial |
|---|---|---|---|---|---|
| SEO-NEW-01 | P0 | Arquitectura | `/productos/` P0 presente, prerenderizada; P1/P2 no crean rutas ni aparecen en sitemap | inspección build + crawler sin JS | pendiente Codex |
| SEO-NEW-02 | P0 | Copy verificable | Catálogo presenta ejemplos, muestra aviso visible y no tiene stock/precio/claim de variedad permanente | grep DOM + revisión comercial | pendiente Codex |
| SEO-NEW-03 | P0 | SEO mapa | Único H1/title/description por ruta, sin canibalización intencional; sitemap/canonicals respetan matriz | test build contra `SITE_ARCHITECTURE.md` | pendiente Codex |
| SEO-NEW-04 | P1 | Navegación | Header/footer/home/categorías enlazan `/productos/`; CTA cotizar funciona y origen no indexa variante | Playwright 320,390,768,1024,1440 | pendiente Codex |
| VIS-NEW-01 | P1 | Mockup | Screenshot de `/productos/` comparado con desktop/mobile; logo A intacto; 320 sin overflow | captura+diff visual manual | pendiente Codex |
| SEO-NEW-05 | P1 | Medición | Diferencia métricas GSC orgánico, `quote_form_success` D1, lead calificado y cliente | test tracking + CRM manual | pendiente configuración |
