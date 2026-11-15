# Revisión de seguridad y privacidad P0

| Control | Evidencia local |
|---|---|
| Captación cerrada | La compilación normal renderiza los campos deshabilitados. El Worker predeterminado responde 503 a POST. El modo explícito demo se limita a loopback. |
| Límite y origen | Same-origin estricto, JSON, UUID v4 idempotente, 16 KiB por cabecera y lectura del stream. Esquema de campos permitido, límites, enums, distritos, NFC, honeypot y confirmación del aviso. |
| Abuso | Rate limit Cloudflare por clave HMAC del identificador IP del edge, ocho intentos por minuto y `Retry-After`. Siteverify valida éxito, host y action. Restricción ÚNICA temporal para el HMAC del token, incluso si Siteverify admite dos verificaciones cercanas. |
| Escritura | D1 usa SQL parametrizado y sesiones primarias. Dos POST concurrentes con la misma llave y el mismo contenido guardan una fila. Repetir la llave con otro contenido devuelve 409. Un fallo de D1 devuelve 503. |
| Avisos | D1 confirma primero. La simulación de proveedor fallido deja la fila y la tarea puede reintentar. Aviso externo con referencia e instrucciones de acceso interno. |
| PII | Sin acceso público a leads ni logs de cuerpo o secretos en Worker. Token sin almacenar en claro. HMAC del token se limpia tras su vida útil y margen. La prueba verifica borrado de leads y sus intentos asociados. |
| Cabeceras | CSP, no framing, nosniff, política de permisos, no-store en API/cotizador. La política de Turnstile solo se habilita en el cotizador con configuración activa. HSTS solo en el origen activo. |
| Instrumentación | Evento DOM local `quote_form_success` en modo real tras 201/200 persistido, sin payload ni transmisión. La simulación y los errores no lo disparan. Analítica externa y UTMs deshabilitadas. |

Los distritos corresponden a la provincia de Lima y describen el lugar del requerimiento. La cobertura de cada solicitud queda sujeta a evaluación. [Referencia territorial de la PCM](https://www.gob.pe/institucion/pcm/campa%C3%B1as/4355-limametropolitana-informacion-territorial)

Las pruebas usan D1 local y respuestas simuladas para Siteverify y Resend. Deben completarse los controles externos de identidad, aviso, conservación, subencargados, derechos, RBAC/MFA, recuperación remota, secretos, HTTPS y proveedores antes de habilitar recepción real.
