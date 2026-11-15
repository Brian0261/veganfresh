# ENTREGABLE D — Especificaciones de diseño por URL

El layout vigente de las ocho vistas está en [UPGRADE_PAGE_SPECIFICATIONS.md](UPGRADE_PAGE_SPECIFICATIONS.md). Esta versión conserva el contexto editorial de la implementación inicial.

**Contrato:** mockups en `design/mockups/` son la referencia de composición a 1440×900 y 390×844 (captura extendida). Documentación de jerarquía e interacciones prevalece sobre errores de renderizado de las referencias; cualquier diferencia relevante requiere ADR y aprobación.

## Reglas globales para todas las páginas

- Header desktop alto 88 px (logo con ancho objetivo 188–210 según espacio; enlaces Inicio, Productos, Frutas, Verduras, Para restaurantes y CTA al borde derecho). Mobile 68 px, marca a x20, menú a la derecha de 44×44. En anchos 768–1100 colapsar navegación si no cabe sin infringir área táctil 44 px; no solapar links.
- Contenedor máximo 1240 px centrado; a 1440 deja 100 px de margen si se aplica max exacto, con margen operativo recomendado 72–100 según el bloque. Los hero full-bleed no exceder viewport.
- Fondo inicial marfil `#F6F3EB`, texto `#15372D`/`#233830`, límites y divisores de 1px `#C4CDC3`; acento `#AC452B` solo en CTAs/índices focales.
- H1 y H2 con Newsreader; UI DM Sans; no usar fuentes sin licencia comercial. H1 máximo 80 desktop/46 mobile; cuerpos 16/1.55; anchors visibles y semántica real.
- Todas las páginas terminan con bloque CTA oscuro (salvo cotizar/privacidad) y footer 3 columnas desktop, una en móvil.
- Imágenes con alt literal, aspecto reservado y recorte dirigido; no convertir ilustración referencial en fotografía «de nuestra operación».
- Header y footer iguales como componentes; no tarjetas con sombras ni bordes redondeados >8 px salvo icono de foco control.
- Desktop 12 columnas, 24 gap; mobile 4 columnas, 12 gap. Ningún contenido saldrá del viewport a 320px.
- Transiciones ≤180 ms salvo excepción documentada; sin autoplay/video/parallax; reduced motion de sistema respetado.

## 1. Página `/` — Home comercial

**Público/SEO:** comprador mayorista Lima; keyword principal `frutas y verduras al por mayor Lima`.

| Orden | Bloque | Objetivo y copy (ver `COPYWRITING.md`) | Composición desktop 1440 | Mobile 390 | Recursos/Estados |
|---|---|---|---|---|---|
| 01 | Header | logo + nav + CTA | 88 px, línea inferior sutil, fondo marfil; nav con underline en inicio | 68 px menú colapsado, botón accesible | Logo A `public/assets/brand/logo-primary.png`; foco + active |
| 02 | Hero | eyebrow `ABASTECIMIENTO B2B · LIMA`; H1, lead y CTA «Solicitar cotización», enlace «Ver categorías» | bloque total ~700 px; texto 7/12 columnas; foto a sangre a 5/12 con margen izquierdo 40 px; H1 en 4 líneas Newsreader 80, lead 20; rotulado vertical «CATÁLOGO / 01» sin tapar foto | apilado: texto → botones → imagen 320×270 aprox, H1 46, dos CTAs uno ancho completo | IMG-HERO-01, carga eager/preload responsive; no overlay texto en imagen |
| 03 | Banda de confianza | `SOLO COMPRAS EMPRESARIALES / LIMA METROPOLITANA / COTIZACIONES POR REQUERIMIENTO` | tres fragmentos separados por reglas, 82px alto; fondo verde | tres líneas 54 px cada una o dos bloques | texto blanco 13/600 |
| 04 | Categorías | H2 `Organiza tu compra por categoría.` + textos y tarjetas «Frutas», «Verduras» | intro 4/12 junto H2 8/12; 2 bloques asimétricos imágenes 4:3, 56px gap; foto o SVG auténtico editorial | apilado, gap 32; imagen 100% 4:3 | IMG-FRUTAS-01 e IMG-VERDURAS-01, rutas específicas; links claramente visibles |
| 05 | Proceso | H2 `De tu lista a una cotización.` + tres pasos | fondo verde petróleo, 5/12 título, 7/12 listado de 3 filas con índices 01/02/03, alto ~530 | una columna, filas separadas | tres pasos son **proceso propuesto**, validar con negocio antes de publicar |
| 06 | Sectores | H2 `Pensado para quienes compran en volumen.` | tres filas editoriales sin tarjetas: restaurantes (enlace), catering, hoteles (sin URLs si no hay contenido específico); reglas 1px, indicador al extremo | una columna filas 90-130px | no prometer que ya atiende catering/hoteles |
| 07 | Antecedente | H2 `Una relación comercial real.` | bloque marfil con cita editorial textual anónima 8/12, 100px margen vertical; sin foto de cliente | texto 22px, sin testimonios fabricados | frase «experiencia abasteciendo una cadena de restaurantes en Lima» confirmada por propietario |
| 08 | FAQ | H2 `Antes de cotizar.` + 4 preguntas | acordeones borde superior e inferior, ancho máx 880, no schema FAQ | apilados | `<details>` nativo; focus visible |
| 09 | CTA final | `Cuéntanos qué necesita tu operación.` | fondo terracota accesible o verde profundo, H2 48 y CTA blanco | H2 34 y CTA ancho completo | enlace /cotizar/ |
| 10 | Footer | marca, rutas, legal | 3 columnas, fondo ink | columna | no datos de contacto ficticios |

**Meta:** `Frutas y verduras al por mayor en Lima | VEGANFRESH` / description en `docs/03-seo/SITE_ARCHITECTURE.md`. **Schema:** WebSite y Organization solo datos fiables. **Enlaces:** `/productos/`, `/frutas-al-por-mayor/`, `/verduras-al-por-mayor/`, `/proveedor-restaurantes/`, `/cotizar/`, `/privacidad/`. **Index:** sí.

## 2. `/frutas-al-por-mayor/` — Categoría frutas

**Público/SEO:** responsables de compras de frutas. Vincular explícitamente `/productos/` como catálogo orientativo, sin duplicar el mismo H1. **Meta/title/H1:** matriz SEO.

| Orden | Sección/copy | Desktop | Mobile | Estados/recursos |
|---|---|---|---|---|
| 01 | Header + breadcrumb `Inicio / Frutas` | patrón global; breadcrumb a 72 px debajo header | 20px margen | BreadcrumbList si breadcrumb visible |
| 02 | Hero `Frutas al por mayor para empresas en Lima.` + intro | H1 68px, texto 7/12, arte 5/12, 100px padding-top | H1 42, imagen debajo | IMG-FRUTAS-01 ilustración referencial |
| 03 | «Qué información ayuda a preparar tu cotización» | título 5/12, 3 especificaciones en columnas finas: variedad, unidad/cantidad, frecuencia | 3 filas sin iconos | contenido útil, nada de precios |
| 04 | «Familias de frutas para consultar» | editoriales: cítricas, de mesa, tropicales; categorías como **ejemplos de consulta**, nunca inventario disponible; paneles sin imagen ni precio | tres filas con divisores | confirmar surtido antes de indexar |
| 05 | «Una consulta comercial más completa» | franja verde, lado izquierdo lista breve de datos y lado derecho CTA | apilada | enlace a `/cotizar/?categoria=frutas` noindex parámetros |
| 06 | FAQ (2–3), CTA y footer | ancho centrado | una columna | no horarios/plazos no validados |

**Enlaces:** Home, Verduras, Restaurantes, Cotizar. **Schema:** BreadcrumbList con URLs reales. **Index:** condicionado al contenido verificado, en caso contrario `noindex,follow` y fuera del sitemap.

## 3. `/verduras-al-por-mayor/` — Categoría verduras

**Público/SEO:** responsables de compras de hortalizas. Vincular explícitamente `/productos/` como catálogo orientativo, sin duplicar el mismo H1.

| Orden | Sección/copy | Desktop | Mobile | Estados/recursos |
|---|---|---|---|---|
| 01 | Header + breadcrumb `Inicio / Verduras` | patrón global | patrón global | breadcrumb visible |
| 02 | Hero `Verduras al por mayor para empresas en Lima.` | fotografía/ilustración 5/12 a **izquierda** y H1/intro 7/12 a derecha (alternancia deliberada); imagen sobre fondo verde | H1 primero en DOM y visual, arte debajo | IMG-VERDURAS-01 |
| 03 | «Especificaciones que facilitan tu cotización» | dos columnas: título 5/12 / matriz de 3 filas 7/12 | apilado | tipo, presentaciones y cantidades, periodicidad |
| 04 | «Familias de hortalizas para consultar» | tres filas editoriales (de hoja, de raíz/tubérculo, de fruto) sin asegurar stock | vertical | sin carrito |
| 05 | «Prepara tu requerimiento» | banda verde y CTA | apilado | preselección `categoria=verduras` |
| 06 | FAQ + CTA + footer | idéntico lenguaje de componentes, contenido propio | mobile | no duplicar texto de frutas |

**Enlaces:** Home, Frutas, Restaurantes, Cotizar. **Schema:** BreadcrumbList, **index:** condicionado.

## 4. `/proveedor-restaurantes/` — Solución sectorial

**Público/SEO:** compradores restaurantes/cadenas; no prometer SLA.

| Orden | Sección/copy | Desktop | Mobile | Estados/recursos |
|---|---|---|---|---|
| 01 | Header + breadcrumb | global | global | inicio / restaurantes |
| 02 | Hero | eyebrow `COMPRAS PARA COCINAS PROFESIONALES`, H1 68, subcopy; fondo marfil con panel verde pequeño de «01/03», arte editorial de ingredientes a derecha en 5/12 | texto antes de imagen, H1 42, imagen 4:3 | IMG-RESTAURANTES-01 es ilustración, no cocina Veganfresh |
| 03 | «Cuando las compras forman parte de la operación» | introducción en 2 columnas con problema/respuesta | una columna | 2 párrafos útiles, no cifras inventadas |
| 04 | «Qué datos necesitamos para evaluar tu solicitud» | tres filas numeradas 01 Productos, 02 Volumen/frecuencia, 03 Locales y distritos | apiladas | explícito: cobertura real por sede sujeta a confirmación |
| 05 | Antecedente confirmado | franja verde oscuro + frase exacta de cadena actual, sin logo | apilada | no usar «testimonio» ni cifras |
| 06 | «De la consulta al acuerdo comercial» | 3 pasos; copy señalizado como propuesto | 3 filas | CTA sectorial |
| 07 | FAQ + CTA + footer | 3 preguntas propias | acordeones | vínculo a frutas y verduras |

**Index:** sí cuando se valida procedimiento y negocio, con nota pendiente en edición. **Schema:** BreadcrumbList. **Enlaces:** Frutas, Verduras, Cotizar, Inicio.

## 5. `/cotizar/` — Conversión y formulario

**Público:** usuario con intención de enviar su lista. **Index:** noindex, follow.

| Orden | Sección/copy | Desktop | Mobile | Interacción |
|---|---|---|---|---|
| 01 | Header simplificado, sin distraer de envío | navegación global, CTA nav puede decir «Cotización» deshabilitado como duplicado | panel mobile normal | no esconder privacidad |
| 02 | Intro H1 `Solicita una cotización mayorista.` | 5/12 título y texto, 7/12 form | apilado título→form | aviso `Solo atendemos compras empresariales` |
| 03 | Sección «Información de contacto» | campos 2 columnas | una columna | empresa*, contacto*, email*, teléfono*, tipo de empresa* |
| 04 | Sección «Tu requerimiento» | productos / cantidades*, distrito*, frecuencia (opcional), sedes opcional y observaciones | textarea alto 160px, resto 48px | no RUC como requerido: se pide al facturar cuando proceda |
| 05 | Privacidad y Turnstile | consentimiento / aviso legal y challenge, CTA enviar ancho 100% | ídem | no preseleccionar consentimiento de marketing; finalidades necesarias y secundarias separadas |
| 06 | Estados | resumen/errores inline cerca del campo; banner éxito distinto de progreso | foco movido a `role=status` tras éxito | `Idempotency-Key`, errores 400/429/503, reintento conserva texto |
| 07 | Footer compacto | incluir legal/contacto | igual | sin WhatsApp ficticio |

**Campos y validaciones:** `companyName` 2–120, `contactName` 2–100, `email` formato/canon ≤254, `phone` 7–20 caracteres permitidos, `businessType` enum, `district` texto de lista ≤60 (validar), `productsAndQuantities` 10–2000, `frequency` enum opcional, `locationCount` 1–100 opcional, `comments` ≤1000; `privacyAcknowledged` true según texto aprobado; `turnstileToken` obligatorio; campos invisibles honeypot no deben bloquear lectores de pantalla. Requerido marca con asterisco y texto.

**No** mostrar éxito por mero clic; API 201 solo después de transacción de D1. Al generar ID, mostrar código no secuencial seguro para comprobación; nunca mostrar datos de otra persona. En fallo de email después de D1, mostrar éxito de recepción (si persistió) y registrar reintento interno.

## 6. `/privacidad/` — Aviso legal

**Estado:** no redactar datos empresariales ficticios; no publicar política contractual final hasta revisión. **Index:** noindex, follow.

- Hero editorial muy sobrio: `Política de privacidad`, fecha/versión real de aprobación, ancho lectura máx 720; sin fotografía.
- Índice interno al inicio (links a anclas): Responsable; Datos y finalidades; Base legal; Proveedores externos; Conservación; Derechos; Seguridad; Cambios; Contacto.
- Cada sección H2 con 24–32px superior/espaciado; body 16px y enlaces subrayados.
- Campos `[POR CONFIRMAR: razón social/RUC/correo privado/periodo/transferencias/registro de banco de datos]` deben impedir publicación (`TODO_LEGAL` chequeado en CI).
- Footer global. La página debe estar disponible desde el formulario cuando esté legalmente aprobada, aunque pueda mantenerse noindex.

## 7. Página 404 y rutas técnicas

- 404: fondo marfil, eyebrow `404 / Página no encontrada`, H1 `Aquí no encontramos esa página.`, texto «Puedes volver al inicio o solicitar una cotización.» y enlaces; HTTP 404 real y noindex.
- `/api/cotizaciones`: POST JSON y CORS same-origin; otros métodos 405 (except preflight si estrictamente necesario), payload máximo 16 KB; JSON de error sin PII.
- Robots/sitemap/manifest son generados desde la configuración de dominio confirmado, sin rutas de staging.

## Interacciones y estados medibles

- Menú móvil: clic, teclado Enter/Espacio, Esc, `aria-expanded`, foco; abrir no bloquea scroll innecesariamente.
- CTA: hover/active/focus por token, sin vibraciones ni movimiento vertical >1px.
- FAQ: `<details>` cerrado por defecto, apertura teclado nativa, sin animación si reduced motion.
- Form: `idle → validating → submitting → success | error | retry`; red error, error por campo, anuncio ARIA; spinner no debe cambiar el ancho del botón.
- No mostrar WhatsApp mientras no exista número real. Al incorporarlo, enlace wa.me con URL registrada y event `whatsapp_click` solo al activarse.

## QA y fidelidad

- Capturas comparativas desktop 1440×900 y móvil 390×844, además 320, 768, 1024 y 1920; revisar scroll a página completa, foco, FAQ abierta y errores del formulario.
- Tolerancias objetivo: contenedor ≤8px, gutters repetidos ≤6px, H1 tamaño ±2px, altura cabecera ±2px, color exacto tokens, relación de aspecto/recorte; ninguna colisión ni overflow horizontal.
- Mockups nunca reemplazan el contrato del contenido: si la captura usa tipografía fallback o imagen provisional, `COPYWRITING.md` y `IMAGE_MANIFEST.md` prevalecen.

## 8. `/productos/` — Nuevo índice de consulta de productos (P0, no inventario)

**Fuente de copia:** sección exacta `/productos/` de `docs/04-content/COPYWRITING.md`.
**Mockups:** `design/mockups/desktop/productos-desktop.png` (1440 ancho) y `design/mockups/mobile/productos-mobile.png` (390); wireframes correspondientes; HTML *solo referencia* `design/reference-layouts/productos.html`.
**Intención propietaria:** listado orientativo/catalogo para formar consulta; no repetir hero de home ni H1 de frutas/verduras.

| Nº | Sección y contenido | Desktop 1440 | Mobile 390 y mínimo 320 | Componente/activos y detalles |
|---|---|---|---|---|
| 01 | Header + breadcrumb `Inicio / Productos` | Alto 88, breadcrumb desde x de contenido | Header 68 + crumb legible en 1–2 líneas | Logo A, nav con Productos activo, enlaces reales |
| 02 | Hero editorial `CATÁLOGO ORIENTATIVO · CONSULTAS B2B`, H1, lead, CTA + aviso disponibilidad | Fondo marfil, 12 columnas, texto 7/12 (H1 64–70/1.02), composición ilustrada a derecha 5/12; 86–100px margen vertical | Texto H1 40–44, imagen debajo (orden en DOM), CTA apilado; aviso visible sin scroll innecesario | Reusar ilustraciones IMG-FRUTAS-01/IMG-VERDURAS-01 como composición de productos, no foto de empresa; carga eager de una sola imagen LCP |
| 03 | `Explora por familia` tres grupos editoriales | Ancho máx 1240; 3 filas alternas con divisores; ilustración junto a primeras 2, tercera tipográfica sin inventar foto | Filas apiladas con gap 20 y borde de 1px | Enlaces reales a frutas y verduras, no cards de ecommerce, sin sombras |
| 04 | `Productos que puedes incluir en tu consulta` 12 nombres | Fondo #D9E4CD; tipografía en 2–4 columnas con líneas divisorias finas, no botones de stock; indicación `ejemplos de consulta` a la vista | Chips semánticos de texto 2 columnas o fila simple, 44px altura si interactivos (pero aquí NO enlaces) | Los nombres son `papa/cebolla/tomate/limón/palta/...`, nunca precio/SKU/stock; no crear fichas P1 |
| 05 | `Qué detalles ayudan a revisar tu lista` | Fondo verde #0E2823; titular 5/12, cuatro filas 7/12 numeradas | Lista secuencial, padding 56–68 | Entrada nombre/variedad, cantidad/unidad, frecuencia/distrito, sedes |
| 06 | `Una misma cotización para tu requerimiento` + CTA | Bloque de descanso de 2 columnas, grande composición tipográfica | Columna con botón ancho completo | Enlace `/cotizar/?origen=productos`, sin WhatsApp falso |
| 07 | FAQ + CTA final y footer | Acordeones nativos (sin FAQ schema), footer rutas P0 | Listado y CTA apilados | No duplicar textos de categoría; privacidad enlazada |

**Gates:** producto/variedad como ejemplo de consulta, no inventario; texto aviso junto al hero y lista; no indexar hasta confirmar contenido legal/comercial, dominio y formulario. Schema solo BreadcrumbList visible; **no** Product/Offer/rating sin datos.
**Interacciones:** familia enlaza a las categorías; CTA preconfigura origen sin abrir nueva URL SEO; ausencia de filtros si no aportan valor a lista pequeña (no introducir buscador de 12 ítems por apariencia).
**Responsive:** 320 sin overflow, 768 abre layout intermedio sin nav comprimida; líneas y fuentes exactas se ajustan al mockup aprobado.
