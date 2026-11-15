# ENTREGABLE G — Arquitectura técnica, leads y despliegue

## ADR-001 (aceptación propuesta, 13-11-2026)

**Decisión:** Astro 7.4.11 SSG + Cloudflare Workers Static Assets/API + Cloudflare D1 + Turnstile + Resend. Estado: recomendada/pendiente de aprobación y configuración de cuentas. Alternativas consideradas en `docs/00-project/TECHNOLOGY_RESEARCH.md`.

## Diagrama lógico

```
Google / visitante B2B
       │ HTTPS + CDN
       ▼
Cloudflare Worker con Static Assets
       │ ├── páginas Astro SSG: /, /frutas..., /verduras..., /proveedor..., /cotizar...
       │ └── POST /api/cotizaciones (NO CORS abierto)
       │                   │
       │                   ├─ límite / body JSON ≤16 KB / schema allowlist
       │                   ├─ Cloudflare Turnstile Siteverify (servidor)
       │                   ├─ normalización segura + idempotencia
       │                   ├─ INSERT Cloudflare D1 (lead + estado aviso)
       │                   └─ POST Resend transaccional (solo aviso de lead)
       │                             └─ email al responsable comercial verificado
       └── Cloudflare logs agregados + Search Console / analítica aprobada
```

## Renderizado y gestión de contenidos

Todas las páginas públicas se generan en build (`output: static`). La ruta de cotización se presenta en HTML estático con JavaScript no bloqueante para enviar JSON al Worker. El endpoint es la única ruta de ejecución dinámica pública; no hay login ni panel admin en alcance v1. Astro Content Collections o archivos tipados sirven para contenido; cambios via PR auditables y preview de deploy; no almacenar catálogo privado.

**Interacción simple:** preferir HTML/form nativo con mejora progresiva; si JS falla y se necesita envío, especificar alternativa accesible (POST form tradicional que devuelve un estado HTML) o declarar la dependencia JS y probarla. No hay carrito ni cuentas de cliente.

## API `POST /api/cotizaciones` — contrato

**Request JSON** (UTF-8, máximo 16 KB):

```json
{
  "companyName": "Empresa ejemplo",
  "contactName": "Nombre de contacto",
  "email": "compras@ejemplo.test",
  "phone": "+51 999 999 999",
  "businessType": "restaurant_chain",
  "district": "Distrito de Lima",
  "productsAndQuantities": "Tomate: 50 kg; naranjas: 30 kg (ejemplo, no inventario)",
  "frequency": "weekly",
  "locationCount": 2,
  "comments": "Información adicional opcional",
  "privacyAcknowledged": true,
  "turnstileToken": "token-producido-en-cliente"
}
```

**No reutilizar este request de ejemplo como dato de cliente real.** No se almacenará el token Turnstile. Cabecera `Idempotency-Key` UUID aleatorio por intento lógico, persistida como hash con índice único; el cliente no debe crear ID nuevo en reintentos de red del mismo envío.

**Orden de procesamiento:** (1) HTTPS y origen permitido, (2) Content-Type y payload size, (3) esquema allowlist, normalización/validación y campo honeypot, (4) límites IP/riesgo sin registrar datos en claro, (5) Siteverify servidor, (6) inserción D1 transaccional con `id` ULID/UUID no adivinable e idempotency unique, (7) aviso Resend con estado de envío y reintento con backoff, (8) respuesta. Turnstile single-use; la revalidación de token después de una reintento idempotente no debe generar duplicación; resolver idempotencia antes de intentos repetidos con controles para impedir replay sin token válido inicial.

**Respuesta 201:** `{ "ok":true, "reference":"VF-<identificador seguro>" }` después de persistir. **Duplicado legítimo 200:** mismo `reference` si idempotencia coincide y ya fue validado; no revelar referencia de un tercero mediante llave predecible. **422:** campos con mensajes genéricos. **429:** límite. **503:** persistencia no confirmada. **Nunca** devolver detalles internos de D1/Resend ni correo.

**Almacenamiento D1 mínimo:**

- `leads`: `id` TEXT PK, `created_at` UTC, `company_name`, `contact_name`, `email`, `phone`, `business_type`, `district`, `products_and_quantities`, `frequency`, `location_count`, `comments`, `privacy_notice_version`, `marketing_consent` BOOLEAN NULL, `source_page`, `utm_source/medium/campaign` allowlist y longitud, `status` enum (`new`, `qualified`, `quoted`, `won`, `lost`); `notification_status` enum (`pending`,`sent`,`failed`), `idempotency_hash` UNIQUE, `updated_at`. Índices por fecha/status; nunca guardar IP cruda en leads.
- `notification_attempts`: `lead_id`, número intento, estado, `occurred_at`, error categoría sin PII; purgar por retención.
- `security_counters`: claves seudónimas con TTL y limpieza (o usar Rate Limiting de Cloudflare si habilitado), sin exponer identificadores.

**Exposición interna:** v1 sin UI administrativa. Extraer por consola autorizada / exportación cifrada periódica, acceso a Cloudflare limitado a responsables. Para panel posterior: Auth y RBAC, auditoría, MFA, sesiones y permisos; no crear un panel sin necesidad.

## Correo y fallos

- Resend usa dominio remitente verificado y secret `RESEND_API_KEY` en Workers secrets. Los avisos son transaccionales con resumen mínimo y link a gestión interna segura cuando exista. No incluir todos los datos personales en asunto ni logging.
- Si D1 guarda y Resend falla: responder éxito, `notification_status=failed` y alertar/reintentar de forma limitada. Si D1 falla: no confirmar éxito.
- Doble envío: manejar idempotencia, detección de spam, límites. No garantizar exactly-once fuera de D1; demostrar con tests de concurrencia.

## Hosting y DNS

- Entorno `preview`: subdominio temporal **no indexable**; secretos separados, base D1 diferente, Turnstile testing keys. Nunca usar datos personales reales en staging.
- `production`: dominio validado, TLS y redirección HTTPS, políticas HTTP seguras, deploy por commit/artefacto con pruebas pasadas y revisiones.
- Activos con hash: `Cache-Control: public,max-age=31536000,immutable`; HTML público TTL corto/revalidate recomendado según comportamiento real de plataforma; no cachear POST ni datos de leads; purga coherente al deploy.
- Imágenes: `srcset`/`sizes` generados por pipeline, fotos AVIF/WebP, SVG iconos; `fetchpriority=high` solo LCP hero y `loading=lazy` bajo pliegue. Evitar dependencia de Cloudflare Images al inicio si build ya optimiza.

## Secretos y variables

**Públicos (build-time):** `PUBLIC_SITE_URL` (solo dominio real), `PUBLIC_TURNSTILE_SITE_KEY` (sitekey pública), `PUBLIC_GA_MEASUREMENT_ID` opcional tras aprobación, URLs de páginas; ninguno ficticio.

**Privados (runtime):** `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `D1` binding, `ALLOWED_ORIGIN`, claves para tasa/hashes, configuración de privacy notice y runtime. Separar dev/staging/prod, rotación y mínimo privilegio; secretos no en logs/código.

## CI/CD y test

PR → lint/prettier/typecheck → tests unitarios de componentes/esquemas → integración Worker/D1 local → Playwright navegadores 320/390/768/1440, formulario y keyboard → validación SEO (titulares, canonicals, sitemap) → auditoría de dependencias → build → preview noindex → aprobación → deploy producción → smoke test del GET y POST controlado con claves de testing → revisión Search Console.

**Rollback:** versión anterior del Worker/static assets; migraciones D1 expansivas/compatibles; Time Travel no equivale a rollback automático del esquema. Hacer backups y prueba de restauración cada mes.

## Observabilidad

- Disponibilidad del sitio y endpoint POST (sin pruebas que creen leads reales).
- Tasa de respuestas HTTP 4xx/5xx, turnstile success/fail agregado, eventos de errores sin PII, tiempo de respuesta por endpoint, estado de notificaciones fallidas y leads no notificados en >15min (umbral propuesto para alerta, no SLA comercial).
- Retención de logs mínima y definida, datos enmascarados; acceso auditado.

## Esquema de despliegue / source of truth

El repositorio contendrá código Astro, `content`, `public/assets` seleccionados, `wrangler.jsonc` / bindings sin secretos, migraciones D1, pruebas, guías de operación. Los archivos de especificación ya están distribuidos en `docs/` y queda versionada; Codex organiza código interno libremente.

**Fuente oficial:** https://docs.astro.build/en/guides/deploy/cloudflare/ ; https://developers.cloudflare.com/workers/static-assets/ ; https://developers.cloudflare.com/d1/reference/time-travel/


## Cambio SEO 2026-11-13: página `/productos/`

`/productos/` es HTML Astro **prerenderizado**, con lista semántica de familias/nombres consultables, enlaces a categorías y CTA; no requiere base de datos de catálogo, ecommerce, stock ni filtros rastreables. D1 sigue almacenando **exclusivamente leads y estados comerciales**, NO inventario. Preselección de `?origen=productos` en cotizador es contexto UX/atribución saneada; no cambia canonical o sitemap. El nuevo hub no modifica API, Turnstile, seguridad ni arquitectura Cloudflare aprobada. Futuros P1/P2 requieren aprobación y diseño/metadata antes de crear rutas.
