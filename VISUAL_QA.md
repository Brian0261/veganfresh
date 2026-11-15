# QA visual P0

Playwright capturó las ocho vistas completas a 320×844, 390×844, 768×900, 1024×900, 1440×900 y 1920×1080. Se capturó el primer pliegue de cada vista a 1440×900 y 390×844. Las comparaciones usan PNG del paquete frente a la implementación real en Chromium, con paneles lado a lado y diferencia RGB para el primer pliegue. Se revisaron también composiciones completas a ambas escalas.

| Vista | Primer pliegue desktop | Primer pliegue móvil | Observación de composición |
|---|---|---|---|
| Home | [1440](qa/captures/home-1440-comparacion.png) | [390](qa/captures/home-390-comparacion.png) | Se ajustó el ancho de la fotografía a la retícula 56/44. El recorte móvil conserva cítricos, hojas y tomates. Copy íntegro en la portada, con FAQ plegadas. |
| Productos | [1440](qa/captures/productos-1440-comparacion.png) | [390](qa/captures/productos-390-comparacion.png) | Aviso completo en primer viewport, ilustración y filas editoriales. Los 12 nombres se muestran en cuatro columnas desktop y dos móvil. |
| Frutas | [1440](qa/captures/frutas-1440-comparacion.png) | [390](qa/captures/frutas-390-comparacion.png) | Ilustración derecha en desktop y debajo del CTA en móvil. Enlace de catálogo junto a las familias. |
| Verduras | [1440](qa/captures/verduras-1440-comparacion.png) | [390](qa/captures/verduras-390-comparacion.png) | Ilustración a la izquierda en desktop y datos en filas según especificación. El PNG muestra la otra orientación en desktop. |
| Restaurantes | [1440](qa/captures/restaurantes-1440-comparacion.png) | [390](qa/captures/restaurantes-390-comparacion.png) | Arte aprobado, sección de requerimiento oscura y antecedente anónimo. Los pasos pendientes de validación usan textos de vista previa. |
| Cotizar | [1440](qa/captures/cotizar-1440-comparacion.png) | [390](qa/captures/cotizar-390-comparacion.png) | La demo incluye aviso, campos completos, aceptación de lectura, errores y referencia persistida. Una columna a 390. |
| Privacidad | [1440](qa/captures/privacidad-1440-comparacion.png) | [390](qa/captures/privacidad-390-comparacion.png) | Columna de lectura, aviso jurídico, índice de anclas y estructura completa. El contenido pendiente se distingue visualmente. |
| 404 | [1440](qa/captures/404-1440-comparacion.png) | [390](qa/captures/404-390-comparacion.png) | H1 legible, dos acciones y pie común. El PNG móvil quiebra una palabra del H1; la implementación conserva palabras completas a 390. |

La cabecera mide 88 px a 1440/1920, 76 px a 768/1024 y 68 px a 320/390. El margen de contenido mide 100 px a 1440 y 20 px a 390. La referencia HTML incluye 28 px dentro de un contenedor ya centrado a 1240 px, por lo que el contenido de varios PNG empieza a 128 px. Se aplicó el ancho de contenido indicado en la especificación. Newsreader y DM Sans se sirven localmente bajo OFL. Las diferencias de tipografía, pies y altura de página responden al texto completo, las FAQ cerradas y los tamaños accesibles de interacción. No se verificó equivalencia de píxeles dentro de ±8 px en todas las regiones.

Las 48 combinaciones pasaron la comprobación de overflow. Axe verificó 16 combinaciones de vista y tamaño sin infracciones reportadas. Se probó con teclado el enlace de salto, el menú con Espacio y Escape, devolución del foco y FAQ nativa. Las capturas adicionales del cotizador cubren validación, anti-bot, progreso, error servidor y éxito simulado. Queda pendiente la prueba con lector de pantalla y el widget Turnstile activo en un entorno autorizado.

Para repetir las capturas, ejecuta `pnpm e2e` y consulta `qa/captures/`. Para regenerar los paneles RGB, ejecuta `python scripts/compare_captures.py` con Pillow instalado. La revisión usa el copy y las especificaciones como referencia.
