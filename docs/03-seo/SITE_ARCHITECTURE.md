# Arquitectura SEO definitiva — VEGANFRESH (revisión 2026-11-13)

**Estrategia elegida:** arquitectura híbrida con **5 páginas P0 comerciales indexables condicionalmente** (`/`, `/productos/`, `/frutas-al-por-mayor/`, `/verduras-al-por-mayor/`, `/proveedor-restaurantes/`) más cotización, privacidad y 404. La indexación real depende de dominio, legal, formulario, veracidad y aprobación comercial; staging siempre noindex y/o acceso cerrado.

## Sitemap por horizonte y tipos

```text
/                                       P0 / index (home proveedor general)
├── productos/                          P0 / index condicionado (exploración)
├── frutas-al-por-mayor/                P0 / index condicionado (categoría)
├── verduras-al-por-mayor/              P0 / index condicionado (categoría)
├── proveedor-restaurantes/             P0 / index (sector)
├── cotizar/                             P0 / noindex (formulario)
├── privacidad/                          P0 / noindex (legal aprobada)
├── 404                                  P0 / noindex, status 404
├── api/cotizaciones                     técnica POST / no HTML ni sitemap
├── robots.txt                           técnica
└── sitemap-index.xml o sitemap.xml      técnica; SOLO P0 habilitadas

P1 (NO construir ni publicar en lanzamiento):
  /productos/papa-al-por-mayor/
  /productos/cebolla-al-por-mayor/
  /productos/tomate-al-por-mayor/
  /productos/limon-al-por-mayor/
  /productos/palta-al-por-mayor/
  /proveedor-hoteles/ y /proveedor-catering/ (solo con evidencia propia)
P2 (NO publicar):
  /productos/mango-al-por-mayor/, /productos/fresa-al-por-mayor/,
  /productos/platano-al-por-mayor/, /productos/zanahoria-al-por-mayor/,
  categorías de cítricos/hierbas/tubérculos solamente con demanda + catálogo probado
NO crear: páginas de distrito sin contenido distinto, blog recetas, precios diarios ficticios, variaciones sinónimas.
```

**No generar URLs vacías P1/P2, no enlazarlas como publicadas, no incluirlas en sitemap, no crear páginas puerta.**

## Matriz on-page P0 (autoridad canónica de titles, H1 y metadescriptions)

| URL | Segmento/intención | Keyword principal | Title | Meta description | H1 | Indexación |
|---|---|---|---|---|---|---|
| / | jefe de compras / operaciones Lima / Elegir proveedor B2B integral | frutas y verduras al por mayor Lima | Frutas y verduras al por mayor en Lima | VEGANFRESH | Consulta frutas y verduras al por mayor para empresas en Lima. Envía productos, cantidades y zona de atención para evaluar una cotización. | Frutas y verduras al por mayor para empresas en Lima. | index si producción autorizada |
| /productos/ | comprador con lista de varios productos / Explorar surtido de consulta sin prometer inventario | catálogo de frutas y verduras al por mayor Lima | Catálogo de frutas y verduras al por mayor | VEGANFRESH | Explora grupos y ejemplos de frutas y verduras por los que puedes consultar. VEGANFRESH prepara cotizaciones mayoristas para empresas de Lima. | Productos de frutas y verduras para cotizar al por mayor. | index solo tras validación contenido, o noindex fuera sitemap |
| /frutas-al-por-mayor/ | comprador fruta para empresa / Elegir/cotizar categoría frutas | frutas al por mayor Lima | Frutas al por mayor para empresas en Lima | VEGANFRESH | Consulta frutas al por mayor para tu empresa en Lima. Indica variedades, cantidades y frecuencia estimada para solicitar una cotización. | Frutas al por mayor para empresas en Lima. | index tras validación comercial; de otro modo noindex fuera sitemap |
| /verduras-al-por-mayor/ | comprador verduras / Elegir/cotizar verduras/hortalizas | verduras al por mayor Lima | Verduras al por mayor para empresas en Lima | VEGANFRESH | Solicita una cotización mayorista de verduras y hortalizas para tu negocio en Lima. Detalla productos, cantidades y frecuencia. | Verduras al por mayor para empresas en Lima. | index tras validar ejemplos comerciales |
| /proveedor-restaurantes/ | jefe de compras restaurante/cadena / Solicitar proveedor para cocina o cadena gastronómica | proveedor de frutas y verduras para restaurantes | Proveedor de frutas y verduras para restaurantes | VEGANFRESH | Cotiza frutas y verduras para restaurantes y cadenas gastronómicas de Lima. Describe productos, cantidades, distritos y frecuencia de compra. | Frutas y verduras al por mayor para restaurantes. | index tras aprobación datos |
| /cotizar/ | contacto autorizado de empresa / Enviar solicitud | solicitar cotización mayorista (funcional) | Solicitar cotización mayorista | VEGANFRESH | Envía tu solicitud de cotización empresarial indicando frutas o verduras, cantidades y zona de atención. | Solicita una cotización mayorista. | noindex, follow, excluida sitemap |
| /privacidad/ | cualquier titular / Información titular de datos | política de privacidad | Política de privacidad | VEGANFRESH | Conoce los criterios de tratamiento de información recibida mediante formularios de VEGANFRESH. | Política de privacidad. | noindex, follow, excluida sitemap |
| /404 | cualquier visitante / Recuperar navegación | ninguna | Página no encontrada | VEGANFRESH | No encontrada | Aquí no encontramos esa página. | noindex, excluida sitemap |

## Especificaciones URL por URL: contenido, encabezados, schema, enlaces y gate

### / — P0

- **Objetivo comercial:** Elegir proveedor B2B integral.
- **Destinatario:** jefe de compras / operaciones Lima.
- **Keyword:** frutas y verduras al por mayor Lima. **Variaciones:** proveedor de frutas y verduras Lima; distribuidora frutas verduras; abastecimiento empresas.
- **H2 planeados:** Dos categorías para organizar tu solicitud; Productos que puedes consultar; De tu lista a una cotización; Pensado para quienes compran en volumen; Experiencia atendiendo una cadena de restaurantes; Preguntas antes de cotizar. H3 exactos y texto visible: `docs/04-content/COPYWRITING.md`; no generar headings alternativos que compitan.
- **Contenido diferenciador:** ver COPYWRITING.md y PAGE_SPECIFICATIONS.md; no bloques de relleno.
- **Schema:** WebSite + Organization con datos confirmados; no rating. Prohibido inventar Offer, AggregateRating o LocalBusiness con datos incompletos.
- **Assets:** IMG-HERO-01, IMG-FRUTAS-01, IMG-VERDURAS-01. Asociación exacta y mockups en `manifests/PAGE_ASSET_MAPPING.md`.
- **CTA principal:** Solicitar cotización -> /cotizar/; **secundario:** Explorar productos -> /productos/.
- **Publicación:** mercado B2B y claim de cadena revisado; formulario y privacidad válidos. **Robots:** index si producción autorizada.

### /productos/ — P0

- **Objetivo comercial:** Explorar surtido de consulta sin prometer inventario.
- **Destinatario:** comprador con lista de varios productos.
- **Keyword:** catálogo de frutas y verduras al por mayor Lima. **Variaciones:** lista de productos mayoristas; consultar variedades frutas verduras; catálogo para empresas.
- **H2 planeados:** Explora por familia; Productos que puedes incluir en tu consulta; Cómo especificar tu lista; Solicita una cotización para tu empresa; Dudas sobre variedades y disponibilidad. H3 exactos y texto visible: `docs/04-content/COPYWRITING.md`; no generar headings alternativos que compitan.
- **Contenido diferenciador:** catálogo orientativo ordenado por nombres consultables y categorías, no stock.
- **Schema:** BreadcrumbList si visible; NO Product/Offer por catálogo sin precios. Prohibido inventar Offer, AggregateRating o LocalBusiness con datos incompletos.
- **Assets:** IMG-FRUTAS-01, IMG-VERDURAS-01. Asociación exacta y mockups en `manifests/PAGE_ASSET_MAPPING.md`.
- **CTA principal:** Enviar mi lista -> /cotizar/?origen=productos; **secundario:** Ver frutas -> /frutas-al-por-mayor/ y verduras.
- **Publicación:** verificar que nombres sean ejemplos consultables y no anuncio de stock; copy disclaimer en primera pantalla. **Robots:** index solo tras validación contenido, o noindex fuera sitemap.

### /frutas-al-por-mayor/ — P0

- **Objetivo comercial:** Elegir/cotizar categoría frutas.
- **Destinatario:** comprador fruta para empresa.
- **Keyword:** frutas al por mayor Lima. **Variaciones:** proveedor de frutas Lima; cítricos por mayor; frutas para empresas.
- **H2 planeados:** Qué frutas puedes consultar; Qué datos ayudan a cotizar; Familias de frutas; Preguntas sobre variedades; Solicita una cotización. H3 exactos y texto visible: `docs/04-content/COPYWRITING.md`; no generar headings alternativos que compitan.
- **Contenido diferenciador:** ver COPYWRITING.md y PAGE_SPECIFICATIONS.md; no bloques de relleno.
- **Schema:** BreadcrumbList con breadcrumb en UI. Prohibido inventar Offer, AggregateRating o LocalBusiness con datos incompletos.
- **Assets:** IMG-FRUTAS-01. Asociación exacta y mockups en `manifests/PAGE_ASSET_MAPPING.md`.
- **CTA principal:** Cotizar frutas -> /cotizar/?categoria=frutas; **secundario:** Ver catálogo orientativo -> /productos/.
- **Publicación:** copy productos como ejemplos no stock. **Robots:** index tras validación comercial; de otro modo noindex fuera sitemap.

### /verduras-al-por-mayor/ — P0

- **Objetivo comercial:** Elegir/cotizar verduras/hortalizas.
- **Destinatario:** comprador verduras.
- **Keyword:** verduras al por mayor Lima. **Variaciones:** hortalizas al por mayor; proveedor verduras para empresas.
- **H2 planeados:** Grupos de verduras que puedes consultar; Información para cotizar; Familias de hortalizas; Dudas de compra mayorista; Cotización empresarial. H3 exactos y texto visible: `docs/04-content/COPYWRITING.md`; no generar headings alternativos que compitan.
- **Contenido diferenciador:** ver COPYWRITING.md y PAGE_SPECIFICATIONS.md; no bloques de relleno.
- **Schema:** BreadcrumbList con breadcrumb en UI. Prohibido inventar Offer, AggregateRating o LocalBusiness con datos incompletos.
- **Assets:** IMG-VERDURAS-01. Asociación exacta y mockups en `manifests/PAGE_ASSET_MAPPING.md`.
- **CTA principal:** Cotizar verduras -> /cotizar/?categoria=verduras; **secundario:** Ver productos -> /productos/.
- **Publicación:** no prometer abastecimiento constante. **Robots:** index tras validar ejemplos comerciales.

### /proveedor-restaurantes/ — P0

- **Objetivo comercial:** Solicitar proveedor para cocina o cadena gastronómica.
- **Destinatario:** jefe de compras restaurante/cadena.
- **Keyword:** proveedor de frutas y verduras para restaurantes. **Variaciones:** abastecimiento de restaurantes Lima; frutas verduras para cadenas gastronómicas.
- **H2 planeados:** Compras para una cocina o varios locales; Requerimiento por producto, volumen y distrito; Experiencia con una cadena; Cómo cotizar; Preguntas comerciales. H3 exactos y texto visible: `docs/04-content/COPYWRITING.md`; no generar headings alternativos que compitan.
- **Contenido diferenciador:** ver COPYWRITING.md y PAGE_SPECIFICATIONS.md; no bloques de relleno.
- **Schema:** BreadcrumbList con breadcrumb visible. Prohibido inventar Offer, AggregateRating o LocalBusiness con datos incompletos.
- **Assets:** IMG-RESTAURANTES-01. Asociación exacta y mockups en `manifests/PAGE_ASSET_MAPPING.md`.
- **CTA principal:** Cotizar para mi restaurante -> /cotizar/?origen=restaurantes; **secundario:** Ver productos -> /productos/.
- **Publicación:** antecedente anónimo verificado por propietario; nada sobre contratos/entrega. **Robots:** index tras aprobación datos.

### /cotizar/ — P0 funcional

- **Objetivo comercial:** Enviar solicitud.
- **Destinatario:** contacto autorizado de empresa.
- **Keyword:** solicitar cotización mayorista (funcional). **Variaciones:** consulta empresarial frutas verduras.
- **H2 planeados:** Datos de tu empresa; Productos y necesidades; Privacidad; Confirmación. H3 exactos y texto visible: `docs/04-content/COPYWRITING.md`; no generar headings alternativos que compitan.
- **Contenido diferenciador:** ver COPYWRITING.md y PAGE_SPECIFICATIONS.md; no bloques de relleno.
- **Schema:** No especial. Prohibido inventar Offer, AggregateRating o LocalBusiness con datos incompletos.
- **Assets:** LOGO-A-01. Asociación exacta y mockups en `manifests/PAGE_ASSET_MAPPING.md`.
- **CTA principal:** Enviar solicitud -> POST /api/cotizaciones; **secundario:** Volver a productos -> /productos/.
- **Publicación:** legal/infra/form operativo. **Robots:** noindex, follow, excluida sitemap.

### /privacidad/ — P0 legal

- **Objetivo comercial:** Información titular de datos.
- **Destinatario:** cualquier titular.
- **Keyword:** política de privacidad. **Variaciones:** tratamiento de datos.
- **H2 planeados:** Responsable; Finalidades; Base legal; Destinatarios; Conservación; Derechos y contacto. H3 exactos y texto visible: `docs/04-content/COPYWRITING.md`; no generar headings alternativos que compitan.
- **Contenido diferenciador:** ver COPYWRITING.md y PAGE_SPECIFICATIONS.md; no bloques de relleno.
- **Schema:** No especial. Prohibido inventar Offer, AggregateRating o LocalBusiness con datos incompletos.
- **Assets:** LOGO-A-01. Asociación exacta y mockups en `manifests/PAGE_ASSET_MAPPING.md`.
- **CTA principal:** Canal de derechos [pendiente de aprobar]; **secundario:** Volver a inicio -> /.
- **Publicación:** identificación legal y revisión jurídica. **Robots:** noindex, follow, excluida sitemap.

### /404 — P0 funcional

- **Objetivo comercial:** Recuperar navegación.
- **Destinatario:** cualquier visitante.
- **Keyword:** ninguna. **Variaciones:** error 404.
- **H2 planeados:** Navegar categorías. H3 exactos y texto visible: `docs/04-content/COPYWRITING.md`; no generar headings alternativos que compitan.
- **Contenido diferenciador:** ver COPYWRITING.md y PAGE_SPECIFICATIONS.md; no bloques de relleno.
- **Schema:** Ninguno. Prohibido inventar Offer, AggregateRating o LocalBusiness con datos incompletos.
- **Assets:** LOGO-A-01. Asociación exacta y mockups en `manifests/PAGE_ASSET_MAPPING.md`.
- **CTA principal:** Volver al inicio -> /; **secundario:** Explorar productos -> /productos/.
- **Publicación:** servida con HTTP 404. **Robots:** noindex, excluida sitemap.

## Navegación y enlaces internos

- Desktop ≥1024: marca A, «Inicio», «Productos», «Frutas», «Verduras», «Para restaurantes», CTA «Cotizar». Usar nav 5 items sin degradar 44×44 ni solapar; si no cabe en 1024, comportamiento tablet colapsa menú según `RESPONSIVE_RULES.md`.
- Mobile <768: logo A, menú; orden: Inicio, Productos, Frutas, Verduras, Para restaurantes, Solicitar cotización, Privacidad (footer).
- Footer: logo A inverso, enlace a cinco páginas comerciales, cotizar, privacidad y datos de contacto reales solo cuando existan.
- Enlaces: Home → productos/frutas/verduras/restaurantes/cotizar; Productos → frutas/verduras/restaurantes/cotizar; categorías → productos, categoría vecina, restaurantes, cotizar; restaurantes → productos/frutas/verduras/cotizar; formulario → productos/home/privacidad.
- Breadcrumbs en subpáginas (Productos, Frutas, Verduras, Restaurantes) visibles con Home como raíz; `BreadcrumbList` solo si se representan UI y URLs reales.
- Prohibido crear navegación P1/P2 pública hasta aprobación y contenido propio. Query params de formulario `categoria`, `origen` preseleccionan sin crear URLs indexables.

## Canonical, redirecciones y sitemap

- URLs canónicas relativas internas con barra final; canonical **absoluta** solo tras definir dominio verificado (no `example.com` ni placeholder indexable). Forzar HTTPS y host único.
- Sitemap contiene solamente P0 comerciales habilitadas e indexables, **no** formulario, privacidad, 404, endpoint, staging ni páginas P1/P2 en preparación.
- `/productos/?familia=...` y búsqueda filtrada: usar UI cliente sin nuevas páginas indexables; no generes facetas en sitemap; si cambia query de URL, canonical a `/productos/` solo si contenido equivalente.
- Mantener 301 de antiguas `.html` solo si existieron publicaciones; no redirigir variantes jamás publicadas sin evidencia.
- Página 404 debe devolver 404, no una página 200 con H1 error.
- Staging: autenticación preferente o `X-Robots-Tag: noindex` apropiado; no confiar en `robots.txt Disallow` para aplicar noindex a URL previamente indexada.
- Política de privacidad debe ser accesible a usuarios antes de enviar datos cuando esté aprobada, aunque no se incluya en sitemap.

## Priorización SEO / expansión

P1 y P2 en `CONTENT_EXPANSION_ROADMAP.md`. Ninguna ruta está autorizada para indexación sin gates comercial, contenido único, SEO, diseño y legal. Decisión de añadir `/productos/` identificada en `docs/00-project/DECISION_LOG.md`.

## Fuentes de guías

https://developers.google.com/search/docs/fundamentals/seo-starter-guide ; https://developers.google.com/search/docs/essentials/spam-policies ; https://developers.google.com/search/docs/appearance/structured-data/breadcrumb ; https://developers.google.com/search/docs/appearance/structured-data/product-snippet
