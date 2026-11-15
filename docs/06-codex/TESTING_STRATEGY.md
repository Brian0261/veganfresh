# Estrategia de pruebas

**Unitarias:** validación de esquema allowlist, longitud y tipos; escape output, fuentes de mensajes; lógica de idempotencia y doble envío.
**Integración:** D1 local, Turnstile verificación simulada segura, Resend mock sin correo externo, límites HTTP 400/405/413/422/429/503, fallos de almacenamiento, notificación diferida.
**E2E:** Playwright en 320/390/768/1024/1440/1920; nav, links, accesibilidad formulario, errores, reintentos, menús, focus, FAQs, CTAs, no overflow.
**SEO:** HTML generado, títulos, H1, canónicos, robots, sitemap, JSON-LD, noindex staging, 404 HTTP real.
**A11y:** axe-core automatizado + teclado/manual; WCAG 2.2 AA.
**Visual:** PNGs `design/mockups/{desktop,mobile}` por página; diferencias relevantes bloquean merge. Herramienta snapshot con tolerancias solo para anti-aliasing; inspect manual composición.
**Performance:** build y Lighthouse bajo condiciones reproducibles; objetivos campo percentil 75 LCP≤2.5s, INP≤200ms, CLS≤0.1; no prometer resultados no medidos.
**Seguridad:** tests csrf/origen, rate limit, tokens single-use, no PII en logs, dependencias, CSP, secretos y backups.
**Realización:** CI con comandos exclusivamente `pnpm`; guardar evidencia en `IMPLEMENTATION_STATUS.md`.

## Test adicional catálogo y rutas futuras

- E2E: `/productos/` link nav, 12 nombres de consulta visibles sin atributos stock/precio; CTA lleva a `/cotizar/?origen=productos`; fotos/ilus cargan y alt útil.
- SEO: sitemap incluye `/productos/` si habilitada; **no** `/productos/papa-al-por-mayor/` ni cualquier P1/P2; previews noindex.
- Snapshots 1440×900, 390×844, 320 px, 768/1024/1920 para P0 catálogo; comparar con `design/mockups/.../productos-*`.
- Comprobar no enlaces a /productos/<slug>/ para productos todavía inexistentes y que la descripción de catálogo no se copie en fichas futuras.
