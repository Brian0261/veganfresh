# Alcance del MVP y exclusiones
- Implementar cinco páginas comerciales P0 en Lima: home, productos (índice orientativo), frutas, verduras, restaurantes, además de cotizar/privacidad/404. El paso de noindex a index requiere validación del contenido y entorno de producción.
- Comprador: restaurante grande/mediano, cadenas, catering, hoteles, comedores; nunca consumidor final.
- Sin carrito, checkout, pagos, cuenta de cliente, marketplace, ERP o administración privada en esta versión.
- Formulario con persistencia D1, Turnstile y aviso transaccional mediante secretos, cuando existan credenciales; no inventar integración WhatsApp.
- No garantizar stock, surtido permanente, reparto a cualquier distrito ni SLA sin aceptación del propietario.
- Entorno staging con `noindex` y sin datos personales reales.
- No publicar página legal sin responsable/titular, finalidad, conservación y revisión jurídica. Ver `docs/05-technical/PRIVACY_CHECKLIST.md`.

- **Futuros P1/P2 excluidos del MVP:** fichas papa, cebolla, tomate, limón, palta, sectores adicionales y categorías finas. No construir rutas vacías ni enlazar URLs inexistentes.
