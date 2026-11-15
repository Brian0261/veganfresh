# ENTREGABLE G — Analítica B2B y medición de leads

## Principio

Clic ≠ lead; lead ≠ cotización; cotización ≠ cliente. `quote_form_success` solo tras persistencia confirmada en D1; la calificación y el cierre ocurren en seguimiento comercial.

## Eventos

| Evento | Cuándo se dispara | Parámetros seguros | Objetivo / destino |
|---|---|---|---|
| `quote_form_start` | primer campo modificado por usuario, una vez por sesión | page_path, category, business_type si existe | fricción de formulario |
| `quote_form_submit` | clic en enviar con validación cliente pasada | page_path, source CTA | intentos (no conversiones) |
| `quote_form_success` | respuesta API 201/200 confirmada (D1) | `request_id` seudónimo NO identificable, page_path, origin | **conversión primaria** |
| `quote_form_error` | error validación/429/5xx | error_category general, page_path | mejorar formulario |
| `contact_cta_click` | click CTA a /cotizar | source_section/page | navegación a cotización |
| `catalog_category_view` | visita real de ruta productos, frutas o verduras | category slug | interés de catálogo |
| `whatsapp_click` | solo cuando exista WhatsApp real y el usuario pulse | page_path, source_section | interacción secundaria, NO conversión comercial |

NUNCA registrar nombres, teléfonos, correos, listas de producto libre, URL con email, IDs reales ni parámetros sensibles en GA4.

## Proceso comercial y estados

- `new` lead almacenado
- `qualified` comprador B2B viable, datos verificables y volumen relacionado
- `quoted` cotización emitida por el equipo
- `won` compra/relación comercial confirmada
- `lost` descartado o no cerrado con motivo opcional categorizado

**Métricas:** leads recibidos, ratio lead calificado/leads recibidos, cotizaciones/leads calificados, nuevos clientes/cotizaciones, tiempo hasta contacto, gastos tecnológicos por lead, crecimiento de consultas no marcarias desde GSC, contribución atribuida con cautela. Debe existir responsable del pipeline, no basta con analytics web.

## Fuente y consentimiento

Capturar `utm_source`, `utm_medium`, `utm_campaign` con allowlist/longitud; `referrer` si aporta y privacidad lo permite; `landing_page`. No forzar keyword orgánica individual porque Google no la expone como parámetro de URL; asociar consultas de Search Console a landing pages de forma agregada.

**Herramientas:** Search Console imprescindibles; GA4 cuando se autorice uso y aviso. Dashboard interno futuro: CSV/BI anonimizado desde D1. Usar `event_id` para deduplicación si se envía tanto cliente como servidor. Evitar duplicar `quote_form_success` en refresh.

## Plan de validación

1. Pruebas con cuenta y datos ficticios en staging no mezclados con prod.
2. Validar trigger exacto de éxito tras 201 D1, sin dispararse en 422/429/5xx.
3. Verificar que UTMs pueden atribuirse sin PII en URL.
4. Comprobar rechazo/consentimiento según política aprobada.
5. Verificar eventos con herramientas de depuración sin copiar correos al log.
6. Tras publicar, confrontar el total de leads en D1 vs conteo analítico; explicar diferencias por bloqueadores/consentimiento.

## Medición del nuevo hub de productos

Evento `catalog_category_view` admite `category='productos'|'frutas'|'verduras'`; `catalog_product_interest` solo si existe interacción real futura en interfaz (no evento automático por cada nombre visible). Comparar leads `source_page=/productos/` calificados con rutas de categoría; jamás equiparar impresión de chips de productos con intención de compra. No registrar lista libre de productos en GA4.
