# ENTREGABLE G — Seguridad, privacidad y cumplimiento (Perú)

**Normativa:** Ley N.º 29733 y reglamento aprobado por Decreto Supremo 016-2024-JUS, vigente desde el 31-03-2025 según Autoridad Nacional. Este documento es especificación técnica, NO opinión jurídica; asesor/a local debe aprobar política, base legal, posibles transferencias transfronterizas, seguridad, obligaciones de registro y retención.

## Modelo de amenazas (proporcional)

| Riesgo | Mitigación exigida | Evidencia de aceptación |
|---|---|---|
| Spam/abuso formulario | Turnstile + Siteverify obligatorio, rate limiting y honeypot accesible | tokens falsos/expirados rechazados; 429 tras umbral configurable |
| XSS / HTML inyectado | esquema allowlist, normalización servidor, salida escapada, CSP restrictiva | payload `<script>` se trata como texto o rechaza; no ejecución en email/admin |
| Inyección SQL | consultas D1 parametrizadas; no concatenar SQL de usuario | tests con comillas/inyección; query segura |
| CSRF/origen | mismo origen, `Origin`/`Referer` apropiados con política definida; `SameSite` si hay cookies; JSON Content-Type; Turnstile | request cross-origin rechazada; evaluar si auth/cookies existen antes de usar tokens CSRF |
| Enumeración/leads | ningún GET público de leads; no mostrar información por ID | GET /api/cotizaciones 405/404; sin fuga por mensajes de error |
| Duplicados | idempotencia + restricción UNIQUE | 2 requests repetidas generan 1 lead |
| Divulgación en logs | redacción de PII/token/secret, errores con IDs genéricos | logs no contienen correo, teléfono ni body de request |
| Exceso de privilegios | token CI acotado, cuentas MFA, D1 binding privado, audit trail | revisión permisos documentada |
| Pérdida de datos | D1 Time Travel + exportaciones cifradas protegidas y restauración probada | simulacro recupera muestra sin exponer PII |
| Dependencias y supply chain | lockfile, scans, actualizaciones, revisión PR | dependencia crítica bloquea deploy salvo excepción aprobada |

## Cabeceras y transporte

HTTPS y redirección forzada; HSTS después de verificar subdominios y certificados; `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` mínima, frame protection por `Content-Security-Policy: frame-ancestors 'none'` si no existen embeds legítimos. Política CSP: `default-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'`; aperturas específicas a Turnstile y analytics únicamente si están implantados, con `script-src` sin `unsafe-inline` cuando sea posible y nonce/hash conforme stack. No imponer HSTS preload sin evaluar subdominios.

## Validación de formulario

- Aplicar validación server-side a todos los campos de `PAGE_SPECIFICATIONS.md`. Reject unknown fields o ignorar de forma explícita; no confiar en atributos HTML.
- Máximo 16 KB, no uploads, no HTML enriquecido ni URLs externas en requerimiento salvo texto limitado; trim, NFC Unicode, límites longitudes; escapes en notificaciones HTML.
- No almacenar `turnstileToken`, ni el honeypot, ni contraseñas porque el sitio no tiene usuarios.
- Protección rate limit: escala por IP de confianza que provee edge, control anti-NAT false positive; permitir recuperación tras 429 y adaptar umbrales tras tráfico real. Definir `Retry-After`.
- Almacenar consent version + fecha según base legal revisada; no agrupar aceptación de política y consentimiento opcional de marketing.

## Privacidad y gobernanza de leads

- **Responsable:** entidad real de Veganfresh, pendiente de identificar. Publicación bloqueada hasta razón social/RUC y canal de derechos verificados.
- **Finalidad esencial:** responder solicitud de cotización y mantener trazabilidad comercial requerida; finalidades opcionales (publicidad) por consentimiento separado si se aprueban.
- **Minimización:** evitar DNI, RUC obligatorio, fecha de nacimiento o datos sensibles; `locationCount` y `frequency` opcionales.
- **Subencargados:** documentar Cloudflare (alojamiento/procesamiento), Resend (email) y cualquier analytics. Revisar transferencia internacional, cláusulas/contratos, regiones y mecanismos aplicables en Perú.
- **Retención:** seleccionar plazo y disparadores con asesoría legal (p. ej., datos no convertidos vs clientes), configurar purga automática y bitácora de eliminaciones; **NO inventar plazo legal universal**.
- **Derechos:** establecer contacto verificable, identidad del solicitante, flujo de acceso/rectificación/cancelación/oposición y plazos legales aplicables con asesoría.
- **Acceso:** 1–2 responsables comerciales designados, MFA; exportaciones cifradas y retención controlada; no enviar hoja completa a WhatsApp personal.
- **Backups:** controlar acceso a Time Travel/exportaciones y borrado de copias según obligaciones; las políticas de seguridad deben cubrir restauraciones y borrados.
- **Analytics:** si utiliza cookies/identificadores, consentimientos y aviso según revisión legal. GA4 no implica automáticamente cumplimiento ni incumplimiento; configurar según contexto.

## Seguridad de WhatsApp cuando se active

Solo añadir enlace `https://wa.me/<numero_REAL>` una vez verificado por el propietario, junto con finalidad; no generar números de ejemplo. No enviar automáticamente datos completos de terceros; al pulsar, abrir mensaje precargado sin información sensible salvo autorización del usuario.

## Reglas y fuentes

- https://www.gob.pe/institucion/anpd/normas-legales/6554453-16-2024-jus
- https://www.gob.pe/institucion/anpd/campa%C3%B1as/128319-nuevo-reglamento-de-proteccion-de-datos-personales
- https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
- https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
