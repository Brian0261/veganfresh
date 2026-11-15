# Contrato de fidelidad visual / QA

1. Antes de página: leer `manifests/PAGE_ASSET_MAPPING.md`, especificaciones, copy, assets y ambos screenshots.
2. Renderizar la URL de implementación real a **1440×900** y **390×844** y guardar **capturas full-page**; añadir 320, 768, 1024, 1920.
3. Comparar visualmente secciones completas, tipografía, logo, recorte de imagen y botones frente a los PNG de `design/mockups/` y las reglas de `PAGE_SPECIFICATIONS.md`.
4. Tolerancias objetivo donde sean comparables: altura header ±2px; márgenes y gutters ±8px; separación reiterada ±8px; font-size ±2px; diferencias cromáticas no permitidas en tokens; recortes pueden variar con ratios y contenido, pero no cortar el sujeto.
5. Mostrar overlays o diffs de screenshots con Playwright y herramienta de diferencias si disponible, luego inspección humana; snapshots con anti-aliasing distinto no fallan por unos píxeles aislados.
6. Bloqueantes: logo B/incorrecto; secciones faltantes; texto de relleno; hero sustituido; CTA no visible; colisiones; overflow 320; formulario ilegible; bordes/gradientes añadidos sin especificación; iconos o imágenes genéricas; contenido fuera de contexto comercial.
7. Repetir prueba tras correcciones y adjuntar resultado en `IMPLEMENTATION_STATUS.md`; no declarar visual QA aprobada basándose solo en el mockup original.
8. Fuente de verdad: copy y orden de página (docs) > geometría de mocks si el screenshot contiene fallback tipográfico > arte vectorial/raster aprobado. Cuando dudas sean sustantivas: crear ADR y detener publicación, no inventar aprobación.

## Gate SEO visual 2026-11-13

Comparar ahora **ocho vistas** (`home`, `productos`, `frutas`, `verduras`, `restaurantes`, `cotizar`, `privacidad`, `404`) a 1440×900 y 390×844; comprobar 320,768,1024,1920. El catálogo P0 necesita hero distinto al de home, familias editoriales sin tarjetas estándar, aviso visible sin scroll oculto, listas sin badges de stock, CTA y logo A. Reportar diferencias de contenido actualizado si screenshot abrevia texto; no reescribir SEO solo para caber en la imagen.
