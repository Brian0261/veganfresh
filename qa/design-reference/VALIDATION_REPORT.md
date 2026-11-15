# Informe de validación del paquete de diseño

**Fecha:** 15 de noviembre de 2026. **Rama/commit inspeccionados mediante GitHub:** `Brian0261/veganfresh`, `main`, `07a91590b64554bb22ef74ec7519020fb8a2bb0d`.

## Pruebas realmente ejecutadas

- Integridad de identidad: se comparó el hash Git blob del logo A autoritativo en el paquete antiguo con GitHub (`6431ea1d1b9e51f3a4ffae106526f67861c6d258`): coincide. No se incluyó ni recomendó el logo B.
- Se recuperó el árbol real del repositorio remoto mediante conector GitHub y se leyeron `AGENTS.md`, `DECISION_LOG.md`, componentes `Header.astro`, `Art.astro`, estilos `site.css`, configuración de páginas, fuentes de categorías y páginas relevantes. No se ejecutó `git clone` por falta de salida de red en el contenedor; no se verificó ejecución de esa copia del repo.
- Imágenes editoriales: 16 variantes WebP (8 derivadas desktop + 8 mobile) y SVG original; recortes y compresión reales, ver checksums `manifests/ASSET_INTEGRITY.json`.
- Renderizado de 8 páginas HTML de referencia a 320, 390, 768, 1024, 1440 y 1920 px = **48 comprobaciones**, con **48 PASS** para `scrollWidth <= viewport`, imágenes cargadas y H1 único. Los screenshots full-page fueron guardados para 1440 y 390.
- 16 mockups (8 desktop y 8 mobile), 7 detalles ampliados, 3 storyboards de interacción estática.
- Script offline `scripts/validate_upgrade.py`: **17/17 comprobaciones superadas**; resultados JSON en `qa/VALIDATION_RESULTS.json`. Entre ellas se verificaron rutas del mapeo, imagen PNG/WebP decodificable, documentos base, identidad original, hashes e inexistencia de rutas a directorios temporales dentro de documentación de diseño.
- ZIP: integridad comprobada tras creación (registrar aparte en el mensaje de entrega).

## No ejecutado / no declarar como probado

- **No se corrió el proyecto Astro GitHub ni `pnpm build/test`**: esta etapa no modifica el código de producción ni posee checkout ejecutable actual.
- **No se midieron CWV/Lighthouse reales** ni accesibilidad automatizada o manual completa de la implementación futura.
- **No se probó funcionalidad de los estados del formulario**; se entregan storyboards estáticos. Los flujos D1/Turnstile siguen en el código de producción del repo y requieren regresión tras rediseño.
- **No se produjo una sesión completa de imágenes fotográficas nuevas**. Los WebP comparten un único bodegón sintético previo; antes de aprobar arte final es recomendable obtener material fotográfico independiente y con procedencia conocida.
- No hubo commits, pushes, merges, PR ni despliegues.

## Riesgos abiertos

1. Tipografía de las maquetas utiliza EB Garamond/Arial disponible en el renderizador; el sitio real debe usar su Newsreader/DM Sans y corregir métricas con screenshots reales.
2. Contrato de privacidad y contacto aún pendientes de información del negocio. No activarlos artificialmente.
3. El repositorio puede cambiar luego del SHA inspeccionado; rebase conceptual necesario, evitando sobrescribir avances.
4. Antiguas ilustraciones siguen en uso vía `src/components/Art.astro`; no borrar antes de reemplazar importaciones y confirmar con búsquedas y tests.

**Resultado:** paquete de diseño y especificación apto para revisión y ejecución de Codex, **NO web rediseñada en producción ni set fotográfico final aprobado**.
