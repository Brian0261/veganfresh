# Estado de implementación

| Fase | Evidencia | Estado |
|---|---|---|
| 0. Contrato | Revisión de AGENTS, decisiones, sitemap, copy, mockups, wireframes y logo A original | Alcance P0 confirmado. Dominio y aprobaciones comerciales y legales pendientes. |
| 1. Infraestructura | `package.json`, `pnpm-lock.yaml`, configuración Astro/Workers, scripts y CI. Pasaron instalación congelada, build, typecheck y empaquetado Wrangler. | Local verificado. La CI remota requiere conectar el proyecto a un repositorio. |
| 2. Sistema visual | Componentes de navegación, pie, FAQ y CTA. Tipografías OFL locales, PNG A y derivados WebP de la misma geometría. | Teclado, contraste y responsive verificados en Chromium. |
| 3. Comercial | Cinco rutas comerciales prerenderizadas, catálogo consultable y enlaces internos. | Copy cotejado. Pasos comerciales y catálogo pendientes de confirmación para publicación. |
| 4. Cotizador frontend | Validación accesible, contexto desde catálogo/categoría/restaurantes, estados probados en Playwright. | Simulación disponible en loopback. Captación cerrada por defecto. |
| 5. API y D1 | `worker/api.ts`, `migrations/0001_leads.sql`. `pnpm test` y `pnpm e2e` verifican 201/200, 422, 429, 503, concurrencia y otros códigos. | D1 local comprobada. Siteverify real espera configuración. |
| 6. Avisos y privacidad | Aviso mínimo, reintento con backoff, política en borrador y guardas de publicación. Fallo de correo simulado comprobado. | Responsable, revisión legal, retención, derechos y correo pendientes. |
| 7. SEO técnico | 404 HTTP real, noindex, robots, sitemap, metadatos y plantillas canonical, OG y schema condicionadas al dominio. | Auditado localmente. Indexación y canonical absoluto esperan dominio y aprobaciones. |
| 8. Instrumentación | Evento DOM tras éxito confirmado en modo real y fuentes CTA permitidas. | Analítica externa desactivada. Search Console y UTMs esperan autorización. |
| 9. QA | 5 pruebas unitarias/integración y 12 E2E. 48 capturas full-page y 16 de primer pliegue, más estados y comparaciones. Lighthouse móvil ejecutado. | Ver [TEST_REPORT.md](TEST_REPORT.md), [VISUAL_QA.md](VISUAL_QA.md), [SEO_AUDIT.md](SEO_AUDIT.md) y [SECURITY_REVIEW.md](SECURITY_REVIEW.md). |
| 10. Operación | Empaquetado en seco, prueba de rechazo de producción y restauración de D1 aislada. | Publicación pendiente. Configuración y validaciones externas en [DEPLOYMENT_RUNBOOK.md](DEPLOYMENT_RUNBOOK.md). |

## Pendientes de lanzamiento

- Dominio y certificados, aprobación comercial del flujo y catálogo, razón social/RUC, contactos y política jurídica aprobados.
- D1 de producción, Turnstile, secretos Workers, remitente y destinatario de Resend, criterio de retención y acceso de responsables.
- Pruebas de proveedor en entorno autorizado, lector de pantalla, HTTPS, SEO en dominio real, CI remota, alertas y rollback remoto.
- Métricas de campo tras tráfico real. P1/P2 sigue en el roadmap documental.
