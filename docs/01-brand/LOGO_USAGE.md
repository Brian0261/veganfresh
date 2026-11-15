# Identidad definitiva — LOGOTIPO 1 / variante A

**Fuente original inalterada:** `public/assets/brand/logo-original-preserved.png` — recuperado de `brand/logo-previous.png` del ZIP anterior, imagen RGBA 2107×699. El símbolo contiene una V geométrica verde, tres figuras terracota arriba y dos bandas diagonales a la derecha; palabra completa en mayúsculas VEGANFRESH. **No es la variante B**.

## Versiones autorizadas y origen
- `public/assets/brand/logo-primary.png` — imagen original con márgenes transparentes recortados, sin rediseño.
- `public/assets/brand/logo-inverse.png` — misma silueta, verdes convertidos a marfil para fondos oscuros; terracota conservado.
- `logo-primary.webp` y `logo-inverse.webp` — derivados WebP sin pérdida a un tercio de las dimensiones de cada PNG, con las variantes PNG como respaldo.
- `public/assets/brand/logo-mono.png` y `logo-mono-white.png` — misma silueta en un solo color.
- `public/assets/brand/logo-symbol.png` — recorte del símbolo original, no una V nueva.
- `public/assets/brand/favicon-32.png`, `favicon-48.png`, `favicon-180.png`, `favicon-512.png`, `favicon.ico`, `favicon.svg` — isotipo original centrado; comprobar legibilidad real a 16 px.
- SVG `logo-primary.svg`, `logo-inverse.svg`, `logo-mono.svg`, `logo-symbol.svg` contienen PNG incrustado **para fidelidad exacta**; no son paths vectoriales editables ni se deben anunciar como vectorización. Una vectorización editable requiere reconstrucción y control de fidelidad, sin cambiar geometría.

## Aplicaciones
- Header claro: `logo-primary.png` ancho 218px desktop, 168px mobile según mockup; no distorsionar.
- Footer oscuro: `logo-inverse.png` sin filtros CSS que alteren terracota.
- Favicon isotipo; si en 16px pierde lectura, usar la misma silueta a 32px donde sea posible, sin cambiarla.
- Área de respeto: al menos 0.25 de la altura visible del isotipo en alrededor; preservar proporciones y escala.
- No redibujar, no sustituir tipografía ni cambiar colores originales por decisiones de sistema de diseño. Evitar fotografías de operaciones falsas.
- Añadir descriptor B2B como texto HTML **separado del arte** cuando ayude a desambiguar el nombre, sin alterar el logo: «FRUTAS Y VERDURAS · SUMINISTRO MAYORISTA».
- La disponibilidad registral y legal del nombre/dibujo no está comprobada.
