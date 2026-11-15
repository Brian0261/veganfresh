# Despliegue y operación

La guía ejecutable de la implementación P0 está en [DEPLOYMENT_RUNBOOK.md](../../DEPLOYMENT_RUNBOOK.md). Las notas siguientes documentan los requisitos de partida.

- Git PR: lint, typecheck, unit/integration, test visual, build, auditoría de dependencia; preview con `noindex` y acceso limitado; aprobar antes de prod.
- Workers Static Assets + Worker POST `/api/cotizaciones`; configuración de D1 y Turnstile separadas en preview/prod; Resend requiere dominio remitente verificado.
- Variables públicas únicamente si no son secretos: `PUBLIC_SITE_URL`, `PUBLIC_TURNSTILE_SITE_KEY`, `PUBLIC_GA_MEASUREMENT_ID` opcional. Secretos por gestor Workers: `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `ALLOWED_ORIGIN`. No subir `.dev.vars` ni tokens.
- Cuentas, DNS, dominio, RUC, correo, WhatsApp y aviso legal son **pendientes externos**. No desplegar a producción con datos ficticios ni hacerlo sin consentimiento.
- Compilar con `pnpm build` y desplegar con script `pnpm deploy` (Wrangler invocado como dependencia del proyecto). Conservar lockfile y Node exacto.
- Configurar CSP consistente con scripts, Turnstile, GA aprobado; no usar CSP que rompa Turnstile silenciosamente.
- Definir backup D1 y restauración probada; revisión de retención PII; monitoreo 4xx/5xx y cola de emails fallidos sin registrar PII.
- Rollback del Worker + migraciones D1 compatibles hacia adelante; despliegue condicionado a QA, privacidad y fuente legal definitiva.

## Gating SEO en lanzamiento 2026-11-13

- Verificar `/productos/` disponible, canonical en dominio definitivo, meta robots habilitada solo tras validación del copy y catálogo orientativo; sitemap solo de las cinco P0 indexables aprobadas. Funcionales noindex.
- No publicar rutas P1/P2 inexistentes, ni “páginas en construcción” con status 200. Nueva página P1 necesita gate SEO + comercial + diseño + assets y una revisión de sitemap.
- La muestra de competidores es cualitativa y no autoriza prometer posiciones ni ingresos. Controlar GSC indexación/CTR orgánico real tras deploy.
