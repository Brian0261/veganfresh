# Pruebas de implementación

Entorno local Windows, Node 24.22.3, pnpm 11.28.11, Astro 7.4.11, Wrangler 4.161.0, Playwright 1.65.1 con Chromium 159 y Lighthouse 13.6.0.

| Comando o prueba | Resultado |
|---|---|
| `pnpm install --frozen-lockfile` | Instalación reproducible con lockfile de pnpm. |
| `pnpm build` | Ocho vistas prerenderizadas, robots y sitemap. |
| `pnpm lint` / `pnpm typecheck` | Correctos. Astro y TypeScript sin errores. |
| `pnpm test` | 5/5. Esquema, lista de indexación, modo cerrado, Siteverify simulado y D1 local. Incluye concurrencia, token rechazado, 409, 429, 503 de D1, fallo y reintento de correo, y borrado por retención. |
| `pnpm e2e` | 12/12. Worker local con D1, HTML sin JS, enlaces, headers, 404, SEO, seis tamaños, 16 barridos Axe, teclado, estado de envío y reintento con la misma llave, persistencia y contrato HTTP. |
| `pnpm audit` | Sin vulnerabilidades conocidas en el registro al ejecutar. Se actualizó typescript-eslint y fijó minimatch 11.0.1 para resolver el aviso moderado GHSA-g3hv-75wg-m249 de lint. |
| `pnpm run deploy --dry-run` | Worker empaquetado. 22,65 KiB, 7,70 KiB gzip. |
| `pnpm run deploy --production` | Comprobación negativa. Bloqueado localmente antes de invocar Wrangler remoto. |
| `pnpm preview` | GET cotizador 200 con campos deshabilitados. POST 503 con captación cerrada. |
| Simulacro usando `wrangler d1 export --local` y `d1 execute --local --file` | Respaldo y restauración aislada de datos ficticios. Origen y destino confirmaron una solicitud y un intento de notificación. |

## Lighthouse

Lighthouse móvil con simulación sobre loopback. JSON y métricas en `qa/lighthouse/`. Las calificaciones SEO reflejan el `noindex` y la ausencia deliberada de canonical absoluto en la vista previa. El presupuesto de imagen se verificó sobre el WebP aprobado de 1280 px (210 414 bytes). El JS propio y CSS comprimidos se consultan en `qa/lighthouse/summary.json`.

| Vista | Rendimiento | Accesibilidad | SEO | LCP laboratorio | CLS |
|---|---:|---:|---:|---:|---:|
| Home (3 corridas) | 97–99 | 100 | 66 | 2,012–2,607 s (mediana 2,016 s) | 0–0,016 |
| Productos | 100 | 100 | 66 | 0,822 s | 0,001 |
| Frutas | 100 | 100 | 66 | 1,353 s | 0,001 |
| Verduras | 100 | 100 | 66 | 1,343 s | 0,001 |
| Restaurantes | 100 | 100 | 66 | 1,872 s | 0,001 |
| Cotizar (3 corridas) | 100 | 100 | 66 | 0,804–0,828 s | 0 |

El bundle de cotización y navegación suma 3925 bytes gzip de JS propio. El CSS compartido suma 4579 bytes gzip. Los derivados WebP de la marca A redujeron la descarga del logo. Una corrida de portada superó 2,5 s de LCP de laboratorio.

Los valores reproducidos en laboratorio no representan el p75 de visitantes. INP de campo, CrUX, Search Console y rendimiento en producción quedan pendientes.
