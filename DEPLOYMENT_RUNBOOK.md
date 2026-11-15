# Despliegue y operación de VEGANFRESH

## Desarrollo local

Usa Node 24.22.3 y pnpm 11.28.11. El lockfile fija Astro 7.4.11, Wrangler 4.161.0 y sus dependencias.

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm preview
pnpm preview --demo
```

`dev` sirve la edición de las vistas en Astro. `preview` compila, aplica migraciones a D1 local y sirve el Worker en `127.0.0.1:4321` con la captación cerrada. `preview --demo` permite envíos ficticios desde loopback con D1 local y simuladores de Turnstile y correo. Puedes usar `--port 4323 --persist-to .wrangler/otra-base` para aislar otra sesión de pruebas.

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm exec playwright install chromium
pnpm e2e
pnpm audit
pnpm run deploy --dry-run
```

Playwright arranca su propio servidor y D1 de pruebas en el puerto 4322. Para Lighthouse, inicia `pnpm preview --demo` en otra terminal y ejecuta `pnpm lighthouse`. El workflow de CI repite la instalación congelada y verifica la aplicación sin credenciales remotas.

## Preparar la publicación tras autorización

1. Comercial aprueba el copy, ejemplos consultables, flujo de revisión y antecedente de la cadena. Reemplaza los textos provisionales según las marcas `[VALIDAR]` registradas en `COPYWRITING.md`. Registra la aprobación de las páginas que se abrirán a indexación.
2. Jurídico valida el responsable real, RUC, domicilio, canal de derechos, base jurídica, subencargados, transferencias, plazo de conservación y procedimiento de borrado. Sustituye el borrador de `src/pages/privacidad/index.astro` y el aviso breve del formulario por sus versiones aprobadas. Verifica también registro del banco de datos, tratamiento de respaldos y acceso. Solo después retira `TODO_LEGAL` y actualiza `privacyApproved` en `src/config/release.mjs`.
3. Configura en `src/config/release.mjs` el origen HTTPS exacto del dominio principal, las referencias de aprobación comercial, jurídica y técnica, la versión de aviso y la lista explícita de rutas aprobadas. Configura `PUBLIC_TURNSTILE_SITE_KEY` en la sesión de build y comprueba que el widget se limita al host previsto.
4. En una cuenta Cloudflare autorizada, verifica el dominio y los certificados. Prepara una D1 independiente por entorno. Sustituye la base local en el archivo de publicación por el ID y nombre reales. Configura la ruta `custom_domain` del Worker, `VEGANFRESH_MODE=live` y `ALLOWED_ORIGIN` igual al origen aprobado. Conserva `workers_dev` y `preview_urls` deshabilitados para producción. Coordina reglas HTTPS y redirecciones de otros hosts en Cloudflare según el dominio aprobado. Los datos y claves del entorno de pruebas son independientes.
5. Carga mediante el gestor de secretos de Workers `TURNSTILE_SECRET_KEY`, `QUOTE_HMAC_SECRET` (aleatorio, al menos 32 caracteres), `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL` y `LEAD_NOTIFICATION_SENDER` (dominio remitente verificado). Configura `LEAD_RETENTION_DAYS` con el plazo entero aprobado. Evita imprimir variables, compartir exportaciones o incluir PII en logs. Coordina la rotación del secreto HMAC porque la clave nueva invalida la deduplicación de intentos iniciados con la anterior.
6. Ejecuta la batería local desde el commit de lanzamiento. Aplica `pnpm exec wrangler d1 migrations apply DB --remote` solo sobre el binding verificado y con autorización operativa. Revisa `pnpm run deploy --dry-run` y, con aprobación expresa, ejecuta `pnpm run deploy --production`. El script de producción verifica los bloqueos de release, datos legales, dominio, D1 y sitekey. El Worker exige adicionalmente secretos y configuración de ejecución para activar captación.
7. Haz smoke test del origen HTTPS, 404 real, sitemap/robots, canonicals, OG y headers. Verifica en un entorno aislado y con datos ficticios el widget accesible, Siteverify, persistencia, recepción de aviso, rechazo de token y retry. Nunca uses el simulador loopback como prueba de terceros. Revisa las URLs aprobadas con Search Console y Rich Results Test después de verificar el dominio.

## Operación y recuperación

- Inspecciona códigos 4xx/5xx, conteos agregados y estado de avisos desde accesos restringidos. Define alertas sin PII y valida destinatario, resolución y escalamiento.
- La tarea programada intenta avisos pendientes cada cinco minutos. Reserva cada aviso en D1 y reintenta hasta cuatro intentos dentro de 23 horas. La clave de idempotencia del proveedor reduce dobles envíos; verifica los avisos fallidos agotados mediante conteos y conciliación interna. La tarea programa el borrado de solicitudes según la retención aprobada y elimina el hash del challenge vencido; aplica a copias y exportaciones su política por separado. [Idempotencia de Resend](https://resend.com/changelog/idempotency-keys)
- Para un simulacro usa `pnpm preview --demo` con la D1 local predeterminada y datos inventados. Exporta con `pnpm exec wrangler d1 export DB --local --output .wrangler/respaldo.sql` e importa con `pnpm exec wrangler d1 execute DB --local --persist-to .wrangler/restaurada --file .wrangler/respaldo.sql`. Comprueba referencias, totales, tablas dependientes y acceso. En producción, documenta bookmarks, permisos, cifrado de exportaciones y una prueba de recuperación autorizada antes de depender de Time Travel. [Recuperación D1](https://developers.cloudflare.com/d1/reference/time-travel/)
- Ante una regresión, revisa el historial de despliegues y revierte al identificador del Worker validado con `pnpm exec wrangler rollback <version>` tras autorización. La reversión de código no revierte D1. Coordina esquema compatible, snapshot y aprobación de recuperación antes de revertir datos.
