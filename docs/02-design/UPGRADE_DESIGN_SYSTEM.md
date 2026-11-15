# Sistema visual para implementación (especificaciones, no CSS copiable)

**Precedencia:** conservar los tokens del repo en `src/styles/site.css` y `docs/02-design/DESIGN_SYSTEM.md`, salvo ajustes expresamente descritos y validados por UX; no crear un sistema paralelo.

## Diseño base

- Desktop: contenedor 1280px; márgenes 56px a 1440; 12 columnas conceptuales; gutters 24px. Tablet: margen 32px; mobile: 20px (16px a 320). No depender de grid de 12 para formar todos los bloques.
- Header de 96px como referencia nueva, se compacta a 76px en tablet y 70px en mobile; mantener logo A y botón menú con objetivo >=44px. El cambio de altura requiere comprobar scroll y anclas.
- Secciones: desktop 124px de ritmo macro, mobile 70px salvo cabeceras/editorial específicos; línea 1px `--border` para grupos.
- Fotos rectangulares sin radio ni sombra. Hero portada proporción 1280×566 de referencia. Las fotos de categorías no deben reutilizar el mismo encuadre de portada.
- H1/H2 display serif y navegación, labels y descripciones sans. Links de acción subrayados con área táctil >=44px en implementación, aunque la captura estática no pueda mostrarla.
- Botón principal 52px alto, radio 2–4px, verde profundo y texto blanco. Botón claro solo sobre verde oscuro/terracota cuando contraste AA pasa.
- Componentes: Category editorial photo + título + enlace; BusinessTableRow; QuoteProcessRow; EditorialProof; FAQ nativo `<details>`; QuoteForm original con mejora del shell visual; EditorialPhoto y caption solo de clasificación genérica.
- No tarjetas universales, halos, gradientes, backdrop-filter, animaciones de entrada de todas las secciones ni scroll hijacking.

## Fotografía

- `hero-market` horizontal ancho, crop central sobre producto.
- `fruits-citrus` macro cítrico, solo editorial; `vegetables-still` hojas/col; `ingredients-board` macro de ingredientes sin simular cocina real.
- Imágenes con `width`, `height`, `sizes` y `srcset`/`<picture>`; hero LCP eager + fetchpriority high donde corresponda; otros lazy. Evitar cargar al cliente todas las variantes.
- No cambiar `public/assets/brand/logo-original-preserved.png` ni guardar variantes nuevas del símbolo sin revisión.

## Estados

Nav: activo subrayado terracota, hover subrayado con 150ms. Input: normal, focus visible, error textual y `aria-describedby`, disabled, submitting, success. FAQ nativo con marcador +/− y foco. Ver `UPGRADE_MOTION.md`.
