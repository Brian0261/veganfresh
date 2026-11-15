# Rediseño editorial de VEGANFRESH

Implementación local del 15 de noviembre de 2026 en `Brian0261/veganfresh`, rama `main`. El árbol inicial estaba limpio y el HEAD coincidía con `07a91590b64554bb22ef74ec7519020fb8a2bb0d`. Se capturó la aplicación inicial como referencia adicional y su suite pasó 12 pruebas. Los cambios quedan en el árbol de trabajo. El HEAD final sigue en el mismo commit.

## Implementación y comparación

Se revisaron los 16 mockups de página completa y los 10 detalles del paquete, incluidas las referencias de menú y estados del formulario. Las comparaciones enlazadas muestran el mockup a la izquierda y la aplicación Astro a la derecha. Las alturas son las de cada PNG completo, en píxeles, expresadas como referencia / aplicación.

| Vista | Comparación a 1440 | Comparación a 390 | Resultado y diferencias |
|---|---|---|---|
| Inicio | [5439 / 5407](qa/captures/home-1440-comparacion-completa.png) | [6067 / 6219](qa/captures/home-390-comparacion-completa.png) | Titular arriba y panorama debajo. Categorías escalonadas, proceso oscuro, sectores en filas, experiencia y FAQ. El lead íntegro y el enlace a productos desplazan la foto hacia abajo en móvil. |
| Productos | [5189 / 5577](qa/captures/productos-1440-comparacion-completa.png) | [5693 / 6070](qa/captures/productos-390-comparacion-completa.png) | Panorama de ingredientes, aviso visible desde el primer viewport, familias editoriales y 12 ejemplos en cuatro o dos columnas. Se conservan raíces y tubérculos, lista combinada y los cuatro requisitos del texto vigente. |
| Frutas | [3319 / 3403](qa/captures/frutas-1440-comparacion-completa.png) | [3782 / 4033](qa/captures/frutas-390-comparacion-completa.png) | Retrato a la izquierda en escritorio y después del CTA en móvil. Tres familias y requisitos en banda de papel auxiliar. Se conservan enlaces de navegación relacionados. |
| Verduras | [3842 / 3868](qa/captures/verduras-1440-comparacion-completa.png) | [3968 / 4422](qa/captures/verduras-390-comparacion-completa.png) | Hero oscuro con foto debajo del texto y familias en filas. Se integró la lista completa de requisitos en la banda salvia con macro de hojas. |
| Para restaurantes | [3576 / 4125](qa/captures/restaurantes-1440-comparacion-completa.png) | [4245 / 4885](qa/captures/restaurantes-390-comparacion-completa.png) | Hero oscuro, tres requisitos de compra como líneas editoriales y antecedente comercial. La diferencia de altura incluye el proceso y enlaces relacionados del sitio vigente. Se ajustó el contraste de los ordinales sobre salvia. |
| Cotizar | [3026 / 2092](qa/captures/cotizar-1440-comparacion-completa.png) | [3331 / 3428](qa/captures/cotizar-390-comparacion-completa.png) | Intro, tres datos para preparar la compra y crop de hojas. Se aplicaron las dos columnas de la especificación escrita. El PNG desktop de referencia deja el aviso a la derecha y baja el formulario a la izquierda. La prueba usa el formulario real con datos ficticios. |
| Privacidad | [2586 / 2314](qa/captures/privacidad-1440-comparacion-completa.png) | [2680 / 2722](qa/captures/privacidad-390-comparacion-completa.png) | Aviso jurídico, índice lateral en escritorio y diez secciones con separadores. En móvil se leen las secciones en orden. |
| 404 | [1310 / 1337](qa/captures/404-1440-comparacion-completa.png) | [1655 / 1690](qa/captures/404-390-comparacion-completa.png) | Numeral, recuperación hacia inicio y productos y foto secundaria. Se conserva el enlace de cotización existente. HTTP 404 confirmado. |

La cabecera mide 96 px en escritorio, 76 px en tablet y 70 px en móvil. Se eligió cabecera estable y menú nativo con foco en el primer enlace al activar con teclado y retorno al botón con Escape. El contenedor llega a 1280 px y queda a 80 px de cada borde a 1440. La versión usa Newsreader y DM Sans del repositorio. Sus métricas, las migas de navegación y el copy íntegro generan diferencias de corte y espaciado con las referencias. Algunos bloques superan la tolerancia orientativa vertical de 16 px.

## Archivos

- `src/styles/site.css`, `src/layouts/Site.astro` y `src/layouts/Category.astro` implementan la retícula, tipografía y composiciones. Se adaptaron las seis páginas con markup propio y el layout compartido de frutas y verduras.
- `src/components/EditorialPhoto.astro` y `EditorialTitle.astro` gestionan las fotos responsivas y el énfasis de títulos. Se ajustaron `Header.astro`, `Faq.astro`, `FinalCta.astro` y `Steps.astro`. El H1 exacto y los metadatos se verifican contra el sitemap documentado.
- `public/assets/design-upgrade/`, `design/details/`, `design/mockups/` y `docs/02-design/UPGRADE_*.md` contienen los recursos y referencias copiados selectivamente. Las evidencias del paquete original están en `qa/design-reference/`.
- `AGENTS.md`, los documentos históricos de diseño y los manifiestos enlazan la dirección actual. Se adaptó `tests/e2e/site.spec.ts` a las medidas y fotografías nuevas. `eslint.config.mjs` excluye el visor generado por Playwright para ejecutar lint también después de una prueba fallida.
- `scripts/compare_captures.py` genera las comparaciones nuevas. `scripts/lighthouse.mjs` mide la imagen LCP del HTML compilado, incluye Privacidad y muestra errores de navegación de Lighthouse.

## Verificación

| Prueba | Resultado |
|---|---|
| `pnpm build`, `pnpm typecheck`, `pnpm lint` | Build de ocho vistas, robots y sitemap. 29 archivos Astro revisados sin diagnósticos. Lint aprobado. |
| `pnpm test` | 5/5. Validación, controles de indexación y cierre, Siteverify simulado, concurrencia, fallos, notificaciones y retención en D1 local. |
| `pnpm e2e` | 13/13 con Worker y Chromium locales. HTML sin JS, H1/title/description, enlaces, robots/sitemap, descarte de rutas futuras, 404, cabeceras y regresión del cotizador. |
| Worker local en modo cerrado | GET del cotizador 200 con campos deshabilitados y aviso visible. POST 503. Privacidad en borrador, sitemap vacío y 404 real. |
| Visual y acceso | 48 capturas completas a 320×700, 390×844, 768×1024, 1024×768, 1440×900 y 1920×1080. Sin desbordamiento horizontal ni imágenes rotas. 16 comprobaciones Axe sin infracciones reportadas, más teclado, rotación, reflujo equivalente a zoom del 200 % y movimiento reducido. |
| `python scripts/compare_captures.py` | 16 comparaciones de primer pliegue con diferencia RGB y 16 comparaciones completas. El [directorio de capturas](qa/captures/) incluye estados de menú, FAQ y formulario. La [línea base](qa/captures/baseline/) contiene 64 capturas de la implementación inicial. |

## Lighthouse móvil de laboratorio

Se ejecutó `pnpm lighthouse http://127.0.0.1:4324` sobre un Worker local recién iniciado en modo demo, con Lighthouse 13.6.0 y Chromium. La vista previa anterior devolvió HTTP 404 tras reconstruir su carpeta de activos. Se repitió la auditoría cuando el Worker nuevo devolvió 200. La tabla muestra la última corrida completa. [Resumen JSON y pesos comprimidos](qa/lighthouse/summary.json)

| Vista | Corridas | Rendimiento | LCP | CLS |
|---|---:|---:|---:|---:|
| Inicio | 3 | 99 | 2,158–2,175 s | 0–0,039 |
| Productos | 1 | 100 | 0,854 s | 0,002 |
| Frutas | 1 | 96 | 2,836 s | 0,039 |
| Verduras | 1 | 94 | 3,052 s | 0,001 |
| Para restaurantes | 1 | 99 | 2,027 s | 0,001 |
| Cotizar | 3 | 100 | 0,812–0,855 s | 0,001–0,009 |
| Privacidad | 1 | 100 | 0,807 s | 0,007 |

Accesibilidad 100 y SEO 66 en todas las corridas. La auditoría detectó el `noindex` intencional de la vista previa. El 404 se verificó mediante Playwright y HTTP. En esta ronda frutas y verduras superaron 2,5 s de LCP móvil. El WebP de portada pesa 225 906 bytes en escritorio y 115 734 en móvil. El CSS compartido pesa 5765 bytes gzip y el JavaScript propio cargado en cotizar suma 3943 bytes gzip. Quedan pendientes INP y demás métricas de campo.

Para repetir en local, inicia `pnpm preview --demo --port 4324` y abre `http://127.0.0.1:4324/`. Ejecuta Playwright y Lighthouse por separado para evitar que ambas tareas compitan por recursos.

## Procedencia y límites

Se verificó SHA-256 y tamaño de los 17 recursos con [ASSET_INTEGRITY.json](manifests/ASSET_INTEGRITY.json). El [mapa de recursos](manifests/PAGE_ASSET_MAP.csv) registra archivo, texto alternativo de referencia y uso. Las seis familias de imágenes usadas en la interfaz proceden de un único bodegón sintético del proyecto. Su uso es editorial provisional. Las variantes de raíz y tomate y el diagrama se conservaron del paquete para referencia. El logo A coincide con el blob `6431ea1d1b9e51f3a4ffae106526f67861c6d258` y con el PNG de referencia del ZIP. Las fuentes locales conservan SIL OFL 1.1. Los recursos y el componente de ilustraciones anteriores se conservan. Las fotos independientes y sus permisos quedan pendientes para aprobar el arte final. [Procedencia del paquete](manifests/ASSET_PROVENANCE.md)

La prueba de envío usa D1 local y verificación simulada. La captación real y la indexación permanecen condicionadas al dominio, la revisión legal y las credenciales. La validación con Turnstile real, lector de pantalla y las métricas de campo quedan pendientes.
