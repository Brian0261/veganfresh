# PRODUCT BRIEF Y AUDITORÍA ANTERIOR

## Hechos confirmados por el propietario

| Campo | Información | Nivel |
|---|---|---|
| Marca comercial | VEGANFRESH | confirmado como nombre utilizado, NO disponibilidad registral |
| Mercado | Lima Metropolitana, Perú | confirmado |
| Modalidad | B2B, venta exclusiva al por mayor | confirmado |
| Oferta | variedad amplia de frutas y verduras | confirmado como intención comercial, NO stock permanente |
| Clientes | cadenas de restaurantes, empresas medianas/grandes y compradores de volumen | segmentos objetivo, no cartera confirmada |
| Caso existente | abastece a una cadena de restaurantes presente en diferentes zonas de Lima | confirmado por propietario; no divulgar marca, número de locales, datos ni volúmenes |
| WhatsApp, dominio, correo, RUC, dirección, plazos | NO proporcionados | PENDIENTES; prohibido fingirlos |

## Perfil de usuario B2B

**Persona P1, principal:** responsable de compras de una cadena de restaurantes: busca proveedor con surtido, procesos claros de cotización, condiciones a validar y comunicación consistente. Sus preguntas son «¿Pueden evaluar mi lista?», «¿Qué datos necesitan?», «¿Cómo acordamos pedidos por sede?». **No afirmar** servicio multisede hasta confirmación.

**P2:** administrador/propietario de restaurante de volumen medio/alto: necesita cotizar frutas y verduras en un solo proceso; valora respuestas claras y evitar contacto que termine en venta minorista.

**P3, secundario:** comprador de catering/hotel/comedor: necesidades parecidas, pero no se justifica página separada sin demanda y contenido propio.

## Trabajos del sitio

- En menos de 5 segundos: qué se vende, que es SOLO B2B, que opera comercialmente en Lima y cómo se cotiza.
- En 30 segundos: mostrar categorías, experiencia confirmada sin revelar clientes, variables que se solicitan y política de disponibilidad.
- En 2 minutos: permitir presentar solicitud con productos, volumen indicativo y datos de contacto, incluso sin WhatsApp.
- Generar lead recuperable aun cuando falle el envío de correo; no basta con un `mailto:` ni enlace a WhatsApp.

## Auditoría del prototipo inicial previo (no incluido como código de producción)

- **Conservar:** enfoque mayorista, organización por categorías, página de restaurantes, mensaje realista, estructura editorial, paleta base, no prometer entregas.
- **Corregir:** el terracota `#C85B3E` alcanza aprox. 4.18:1 con blanco (inferior a 4.5:1 para texto normal); acento pasa a `#AC452B` (5.77:1 con blanco), isotipo de muchos elementos pequeños; textos de demostración publicados como si fuesen web real; formularios sin servidor; logos sin validación legal; ausencia de evaluación visual formal.
- **Descartar como producción:** HTML/CSS/JS monolítico; la política de privacidad incompleta y el formulario local sin envío. **No descartar el contenido útil como referencia.**

## Propuesta de valor y posicionamiento

**Posicionamiento:** «Frutas y verduras al por mayor para empresas de Lima. Cotiza según productos, cantidades y necesidades de tu operación.»

**Dirección de comunicación:** «Lista de productos → evaluación comercial → condiciones a confirmar». Evitar «stock garantizado», «entrega 24 h», «flota propia», «calidad certificada», «precios más bajos».

**Nombre VEGANFRESH:** riesgo de asociación con dieta vegana/minorista. Solución: lockup y descriptor visible «FRUTAS Y VERDURAS · SUMINISTRO MAYORISTA», título B2B y fotografía de productos. No convertirlo en una marca de productos veganos.

## Conversión y medición

- Conversión de web = `quote_form_success` tras escritura válida en D1 (no clic CTA).
- Lead calificado = empresa válida, categoría/productos, volumen/frecuencia, zona objetivo y contacto verificable, marcado manualmente por responsable.
- Oportunidad comercial = lead con cotización o negociación registrada.
- Cliente atribuido = contrato / compra constatada, NO una sesión ni un clic.

## Decisiones no abiertas a improvisación de Codex

B2B, marca, 5 URLs comerciales P0 + rutas funcionales, copy documentado, dirección de arte, ausencia de ecommerce y seguridad de los formularios. Cambios requieren ADR y aprobación del propietario. Detalles internos de carpetas/componentes/pruebas quedan a criterio de Codex.

## Actualización SEO 2026-11-13

La amplitud comercial declarada no equivale a inventario publicado. `docs/03-seo/SEO_STRATEGY.md` amplía investigación a productos y sectores. `/productos/` P0 es un índice **orientativo de nombres consultables** (sin stock/precio); cinco fichas individuales P1 y otras P2 no se publican todavía. La navegación y mockups deben reflejar esta distinción.
