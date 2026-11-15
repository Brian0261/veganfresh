# Matriz de aceptación visual para Codex

## Pruebas

1. Levantar aplicación existente con `pnpm` según scripts reales del repo. Obtener baseline de cada URL en el commit a implementar.
2. Para cada una de las 8 rutas, capturar 1440×900, 390×844, y controlar 320×700, 768×1024, 1024×768, 1920×1080. `fullPage:true` para comparación por página.
3. Comparar por secciones correspondientes con `design/mockups/*` y detalles `design/details/*`; respetar diferencias de fuente real Newsreader/DM Sans frente a EB Garamond/Arial de las maquetas.
4. Comprobar indicadores visuales por región: (a) logo A, color y ubicación; (b) orden de bloques, (c) número de líneas y jerarquía de titulares, (d) mismo archivo fuente de cada imagen y recorte responsive, (e) CTA visible, (f) formulario y estados, (g) estados nav, (h) FAQ.
5. Tolerancias orientativas: alineación de contenedores ±8px desktop/±6 mobile, separación entre secciones ±16px, tamaños de componentes ±8px, sin tolerancia a imagen equivocada o logotipo B. Las métricas tipográficas dependen de las fuentes efectivamente disponibles; juzgar saltos de línea y envoltura, no diferencias de píxel imposibles.
6. Medir desbordamientos DOM, imágenes rotas, fondos y contraste, rotación móvil, foco, keyboard, 200% zoom y reduced-motion. Compruebe que los links no referencien rutas no existentes.
7. Ejecutar auditoría de performance y SEO técnica en la app Astro real; fotos no pueden bloquear LCP, responsive debe evitar CLS.

## Stop conditions

P0 = Logo no A, CTA inaccesible, contenido SEO oculto sin JS, formulario bloqueado sin feedback, scrollbar horizontal, hero sin imagen requerida, texto blanco ilegible, datos reales simulados, links rotos, testimonios inventados. No declarar aprobado.

**Importante:** las 48 verificaciones reportadas para las maquetas solo comprueban widths/imagen/H1 en la referencia HTML. NO son pruebas de la aplicación Astro, interacciones, seguridad, lighthouse ni compatibilidad con Cloudflare.
