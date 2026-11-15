# Especificaciones visuales por URL — VEGANFRESH Design Upgrade

**Base:** `main@07a91590b64554bb22ef74ec7519020fb8a2bb0d` (15-11-2026). Los textos visibles en HTML de referencia son **composición de diseño**; el copy público final se toma primero de `docs/04-content/COPYWRITING.md` vigente en el repo, previa validación de cualquier cambio. **No alterar el H1 SEO exacto sin revisión.** La estructura de secciones se puede reorganizar sin suprimir contenido SEO comercial sustancial.

| Ruta real vigente | Clave | Desktop | Mobile | Fuente de contenido real |
|---|---|---|---|---|
| `/` | home | `design/mockups/desktop/home-1440.png` | `design/mockups/mobile/home-390.png` | `src/pages/index.astro` |
| `/productos/` | productos | `design/mockups/desktop/productos-1440.png` | `design/mockups/mobile/productos-390.png` | `src/pages/productos/index.astro` |
| `/frutas-al-por-mayor/` | frutas | `design/mockups/desktop/frutas-1440.png` | `design/mockups/mobile/frutas-390.png` | `src/layouts/Category.astro`, `src/content/categories.ts` |
| `/verduras-al-por-mayor/` | verduras | `design/mockups/desktop/verduras-1440.png` | `design/mockups/mobile/verduras-390.png` | mismos archivos de categorías |
| `/proveedor-restaurantes/` | restaurantes | `design/mockups/desktop/restaurantes-1440.png` | `design/mockups/mobile/restaurantes-390.png` | `src/pages/proveedor-restaurantes/index.astro` |
| `/cotizar/` | cotizar | `design/mockups/desktop/cotizar-1440.png` | `design/mockups/mobile/cotizar-390.png` | `src/pages/cotizar/index.astro`; conservar funcionalidad |
| `/privacidad/` | privacidad | `design/mockups/desktop/privacidad-1440.png` | `design/mockups/mobile/privacidad-390.png` | `src/pages/privacidad/index.astro` |
| 404 | 404 | `design/mockups/desktop/404-1440.png` | `design/mockups/mobile/404-390.png` | `src/pages/404.astro` |

## 1. `/` — portada editorial, NO hero de dos columnas estándar

1. **Header** de 96px desktop / 70 mobile. Logo A horizontal, nav original cinco ítems y CTA a `/cotizar/`, menú móvil nativo con teclado.
2. **Hero superior** `paper`: etiqueta 11px, H1 SEO actual «Frutas y verduras al por mayor para empresas en Lima.» en Newsreader 88–94px; alineado a la izquierda en área de aprox. 930px, recortes de línea controlados. Bloque secundario a la derecha con texto B2B + CTA verde de 52px. A mobile se apila: H1→descripción→CTA.
3. **Panorama editorial** bajo el texto, contenedor 1280×566; asset `hero-market.webp`; mobile `hero-market-mobile.webp`, altura 335px. Pie con 3 pequeñas clasificaciones no comerciales.
4. **Catálogo por categoría** intro editorial 2/3+1/3, dos fotografías de altura asimétrica: frutas 580px / verduras 460px y offset desktop 118px. Mobile: foto 310px + título + link, repetir. Recursos `fruits-citrus`, `vegetables-still`.
5. **Acceso catálogo `/productos/`** en banda de texto única con link, sin cards añadidas.
6. **Proceso** dark, dos columnas: titular + tres filas numeradas; sin ICON cards.
7. **Sectores** lista dividida por líneas de 1px, restaurante con enlace real; catering y hoteles como texto, NO páginas sin construir.
8. **Experiencia** sage y claim validado sobre cadena de restaurantes sin cifras ni testimonios.
9. **FAQ** nativo sin JS obligatorio, y **CTA terracota** de final, footer oscuro.

**No hacer:** devolver al hero split antiguo, duplicar hero y categorías con fotos iguales, hacer «soluciones 3 cards» o inventar ventajas de reparto. Foto panorama es imagen ilustrativa, no operación real.

## 2. `/productos/` — hub B2B de consulta

1. Introducción `paper`, etiqueta catálogo y **H1 exacto** «Productos de frutas y verduras para cotizar al por mayor.» Desktop 72–82px, máximo dos/tres líneas. Breve aviso de «no stock confirmado» visible; CTA.
2. Panorama editorial `ingredients-board`, 1280×495 desktop / 350px móvil.
3. Filas de familias con layout `1fr 1fr`, foto 330–400px y contenido; solo rutas existentes frutas, verduras; última fila «un mismo requerimiento» es tipográfica, no botón ficticio.
4. Lista de nombres 4 columnas desktop / 2 mobile, serif 29 / 23px, separadores; ejemplos consultivos exactos del repositorio, no productos ofertados con stock.
5. Proceso oscuro: nombre/variedad, cantidad/unidad, frecuencia/zona. FAQ y CTA.

**SEO:** conservar enfoque de índice comercial, no crear filtrado client-side como sustituto de HTML ni fichas individuales P1 no aprobadas.

## 3. `/frutas-al-por-mayor/` — retrato editorial de cítricos

1. Hero de imagen **a la izquierda** 47% de la retícula, 760px de altura en desktop; copy H1 a la derecha, a 84px máximo, cuerpo 18px, CTA. Evita repetir la portada.
2. Mobile orden copy primero, foto después de 350px. Header standard.
3. Familias 3 columnas con regla verde superior y titular Newsreader: cítricos, mesa, tropicales. No usar imágenes repetidas ni precio.
4. Bloque papel auxiliar con «No es solo qué fruta, es cómo la necesitas» y lista tipográfica de características, cantidad y frecuencia.
5. FAQ y CTA final; preservar el H1 y las consultas por frutas de `src/content/categories.ts`.

## 4. `/verduras-al-por-mayor/` — portada verde profundo / foto horizontal

1. Hero dark completo, H1 claro y serif sobre fondo verde, ancho de 1000px, NO texto sobre foto. Subtítulo y CTA crema.
2. Foto editorial de verduras de 1280×520 seguida de barra de clasificación. En móvil hero apilado y foto de 350px.
3. Tres familias como **filas** con número, H3 y descripción, no como 3 cards.
4. Banda sage con crop de hojas de 620px en desktop y mensaje comercial a la derecha.
5. FAQ y CTA, conservando copy real de verduras.

## 5. `/proveedor-restaurantes/` — abastecimiento de cocinas profesionales

1. Hero oscuro con mitad izquierda tipográfica 62–86px, imagen editorial `ingredients-board.webp` a la derecha altura 640px, sin simular instalaciones o cocineros de Veganfresh. Mobile se apila y se mantiene CTA inmediato.
2. Bloque claro: por qué un comprador debe enviar contexto de compra; explicar productos, cantidades, frecuencia, distritos.
3. Bloque sage con 3 requisitos como líneas editoriales, no tarjetas: producto, volumen, locales.
4. Experiencia real de cadena de restaurantes; **nunca** nombre, foto, número o cifra no confirmados.
5. FAQs B2B, CTA a cotización con `origen=restaurantes` como parámetro no indexable.

## 6. `/cotizar/` — formulario con confianza, no landing promocional

1. Columna intro `.88fr`, H1 actual Newsreader, subtítulo breve, tres puntos de orientación de compra y crop editorial discreto.
2. Columna derecha `1.12fr` con formulario blanco, borde 1px y padding 45px, sin sombra. Preservar **nombres reales de campos**, `<fieldset disabled>` de modos cerrados, validaciones, Turnstile y estados. El HTML en `reference-design/cotizar.html` NO implementa envío: es solo vista de diseño.
3. Mantener empresa/contacto/email/teléfono/tipo de negocio, distrito/frecuencia/productos-cantidades/sedes/comentario y privacidad. Las etiquetas no desaparecen al enfocar.
4. Mensaje de aviso de servicio inactivo visible y no confundible con error; envío en producción solo con `releaseReady`, revisión legal y persistencia servidor.
5. Mobile 1 columna (intro→form), campos 1 columna 49px de alto, textarea >=115px, CTA full-width y feedback accesible.

## 7. `/privacidad/` — página de lectura

1. Encabezado editorial con H1 Newsreader 90px desktop/58px móvil, intro y aviso de pendiente legal.
2. Desktop índice en columna izquierda y contenido a la derecha con max-width de lectura; separadores por sección. Mobile índice se omite visualmente si los títulos ya funcionan como navegación secuencial; preservar accesibilidad y contenido.
3. No inventar razón social, RUC, plazos, contacto o finalidad no validada. No convertir un borrador en aviso jurídicamente aprobado.

## 8. `404` — recuperación clara

1. Conservar respuesta HTTP 404, no indexable y enlaces a `/` y `/productos/`.
2. «404.» enorme 170 desktop/125 mobile, titular máximo 65px desktop/48 móvil, CTA verde.
3. Un crop macro de hojas en la otra columna desktop; en móvil, imagen secundaria posterior a los enlaces. No usar modal ni animaciones innecesarias.

## Enlaces y cambios que NO se autorizan

Preservar canónicos y meta de `src/config/pages.ts` salvo que un análisis SEO específico justifique ajustes; preservar `src/config/crawl.mjs`, sitemap, robots, `src/lib/quote.ts`, `src/scripts/quote-form.ts` y endpoints. Nada de reescritura del backend o nuevos servicios para estos diseños.
