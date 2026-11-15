# ENTREGABLE A — Selección tecnológica y costos (13-11-2026)

## Comparación técnica (evaluación cualitativa)

| Stack | Ventajas para Veganfresh | Limitaciones | Elección |
|---|---|---|---|
| **Astro SSG + Worker** | HTML completamente renderizado, mínimo JS de cliente por defecto, páginas estructuradas, contenido Git, endpoint separado | Rebuild al editar catálogo; CMS opcional futuro | **Seleccionado** |
| Next.js | Potente full-stack, SSR/SSG/React, ecosistema amplio, evoluciona hacia portal de compras | Complejidad de runtime e hidratación innecesaria para 5 páginas mayormente estáticas | No, hasta que exista portal autenticado |
| Nuxt | SSR/SSG y buen ecosistema Vue | Similares ventajas a Next sin necesidad actual de SPA | No |
| SvelteKit | Buen rendimiento y rutas server | Ecosistema y decisiones de runtime mayores que un sitio editorial básico | Alternativa válida |
| WordPress clásico | CMS accesible a equipo no técnico, extensiones SEO, fácil edición | Seguridad y mantenimiento de plugins, hosting PHP, superficie de ataque; diseño a medida requiere disciplina | Alternativa si edición frecuente desde admin es esencial |
| WordPress headless + Astro | CMS potente + frontend ligero | Dos sistemas, API, permisos, mantenimiento y más costo | Sobrearquitectura inicial |
| HTML estático manual | Costo y JS muy bajos | Mantenimiento de navegación, páginas y SEO manual a escala | Adecuado como prototipo; no producción elegida |

**SEO no está garantizado por el framework.** Google puede indexar HTML prerenderizado en cualquiera de los stacks; Astro se elige por reducir complejidad para un sitio predominantemente editorial B2B.

## Selección aprobada

- **Frontend:** Astro versión estable compatible con `@astrojs/cloudflare` que apruebe CI. Mantener `output: 'static'`; HTML SSG para todas las rutas públicas.
- **Interactividad:** elementos nativos (`<details>` FAQ, links, forms); JavaScript mínimo para menú móvil y mejora de UX del formulario. No SPA ni hidratación global.
- **Catalogación inicial:** contenido tipado de Astro (archivos en Git), familias de productos editables bajo PR. No inventar SKUs, precios o existencia. CMS posterior solo si un usuario sin Git debe editar semanalmente.
- **Runtime API:** Cloudflare Worker con ruta POST `/api/cotizaciones`, en el mismo dominio; resuelve D1, Turnstile y email. Se puede implementar como Worker con Static Assets y rutas/API según arquitectura comprobada por Codex y documentación vigente.
- **BBDD:** Cloudflare D1 exclusivamente para leads y estados técnicos; no expuesta por navegador. El CRM/gestión comercial queda manual mediante exportación autorizada hasta contar con interfaz privada.
- **Correo:** Resend (solo aviso, no fuente única de datos); usar dirección real verificada. En el evento de fallo de correo, lead queda en D1 con estado `notification_pending` para reintento controlado.
- **Anti-bot:** Turnstile Free y Siteverify servidor, más límite de frecuencia por IP/huella de riesgo y honeypot. No guardar IP en texto claro por defecto.
- **Analítica:** Search Console + eventos de conversión; GA4 opcional tras validación de privacidad, consentimiento y configuración. No cargar trackers por defecto en prototipo.
- **Hosting:** Cloudflare Workers Static Assets/CDN global; dominio propio cuando se confirme; GitHub Actions con pruebas y `wrangler deploy` por ambiente.
- **Observabilidad:** métricas Worker, errores y eventos agregados sin PII en logs; métricas de la base y comprobación programada de cola de avisos.
- **Resiliencia:** D1 Time Travel 30 días en motor nuevo y exportaciones protegidas acordes a política de retención; nunca almacenar claves en Git.

## Estimación de tarifas — fuentes 13-11-2026 (no factura ni promesa)

- Cloudflare Workers Free: hasta 100.000 solicitudes/día al Worker (según documentación de límites); activos estáticos servidos directamente son gratuitos/ilimitados bajo las reglas de Static Assets. Workers Paid comienza desde US$5/mes; los límites y modalidades pueden cambiar.
- D1 Free: hasta 5 millones filas leídas/día, 100.000 escritas/día y 5 GB de almacenamiento (restricciones adicionales). Plan pagado paga por excedentes; revisar al contratar.
- Turnstile Free: hasta 20 widgets por cuenta; requiere verificación servidor.
- Resend Free: hasta 3.000 correos/mes con límite 100/día; plan Pro orientativo US$20/mes. Enviar 1 aviso por lead, gestionar duplicados.
- Dominio, correo profesional, asesoría legal, servicio de DNS de pago, fotos y analítica de pago no están incluidos.

## Criterio de revisar decisiones

Migrar a SSR o crear un CMS solo si hay: contenido que dependa del usuario/sesión, variaciones comerciales por cliente, catálogo editable diariamente por personal no técnico, o portal autenticado de compras. Ninguna de esas capacidades está confirmada hoy.

## Fuentes

- https://docs.astro.build/en/reference/configuration-reference/
- https://docs.astro.build/en/guides/deploy/cloudflare/
- https://developers.cloudflare.com/workers/static-assets/
- https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
- https://developers.cloudflare.com/workers/platform/pricing/
- https://developers.cloudflare.com/d1/platform/pricing/
- https://developers.cloudflare.com/d1/reference/time-travel/
- https://developers.cloudflare.com/turnstile/plans/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://resend.com/pricing

## Comparación de hosting y servicios (precios públicos de referencia, 13-11-2026)

| Proveedor | A favor | Costos publicados relevantes | Por qué no / sí |
|---|---|---|---|
| **Cloudflare Workers + Static Assets + D1** | activos estáticos servidos directamente sin costo por request bajo sus reglas, Worker y DB integrados, Turnstile | Free Worker hasta 100.000 req/día; Paid desde US$5/mes; D1 cuotas separadas | **Seleccionado** por arquitectura pequeña y un solo dominio/API |
| **Vercel** | muy buen flujo previews, despliegue Next/Astro, funciones y CDN | Pro US$20/mes según página de precios; revisar uso comercial del plan Hobby en términos actuales | Válido, pero no aporta mejora SEO automática y necesitaríamos decidir BD/antibot externo igualmente |
| **AWS Amplify Hosting** | CI/CD, CDN y ecosistema AWS (S3/Lambda/DynamoDB/SES) | tarifas de referencia fuera de free tier: builds US$0.01/min, transferencia US$0.15/GB servido y almacenaje US$0.023/GB-mes; varía por región/consumo | Válido, pero más servicios y configuración para una web informativa con un formulario |
| **WordPress hosting gestionado** | editor de contenidos y backups según plan | no se verificó un único precio comparable por variedad de proveedores | no es necesario para cinco páginas comerciales P0 gestionadas en Git |

**No extrapolar el ahorro sin tráfico real.** Si se incorpora portal de pedidos, un stack AWS/Next.js puede volverse útil y hay que revisar ADR con requisitos concretos. El dominio y email corporativo se presupuestan aparte.

**Fuentes adicionales:** https://vercel.com/pricing ; https://vercel.com/docs/plans/hobby ; https://aws.amazon.com/amplify/pricing/
