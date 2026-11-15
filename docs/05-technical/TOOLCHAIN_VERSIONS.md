# Herramientas y versiones base — comprobación web 2026-11-13

| Componente | Selección | Fuente oficial | Estado |
|---|---|---|---|
| Node.js | **24.22.3 LTS**, exacta en `.node-version` | https://nodejs.org/en/blog/release y https://nodejs.org/en/about/previous-releases | LTS mantenida |
| pnpm | **11.28.11**, exacta en `packageManager` cuando se cree `package.json` | https://github.com/pnpm/pnpm/releases ; https://pnpm.io/installation | estable, compatible Node 24 |
| Astro | **7.4.11** base, exacto | https://github.com/withastro/astro/releases | parche estable |
| Wrangler | **4.161.0** base, verificar runtime Workers en instalación | https://github.com/cloudflare/workers-sdk/releases | estable |
| Adaptador Cloudflare Astro | seleccionar última versión **estable compatible con Astro 7** al resolver lockfile | https://docs.astro.build/en/guides/deploy/cloudflare/ | pendiente instalación y prueba |

**No hay `package.json` ni `pnpm-lock.yaml` en el paquete de especificación por diseño:** el usuario autorizó que Codex implemente el proyecto. Generarlos vacíos o con dependencias inventadas aparentaría falsamente un bootstrap realizado. Primera fase Codex: inicializar Astro usando pnpm, fijar versiones, ejecutar `pnpm install`, conservar el `pnpm-lock.yaml` generado realmente y verificar `pnpm install --frozen-lockfile` en CI.

Se intentó usar Corepack en este entorno de preparación, pero la resolución DNS de registry.npmjs.org falló; por eso la compatibilidad completa a nivel de dependencias transitivas **no está verificada aquí**. No afirmar que se ejecutó build. Codex debe resolver e inspeccionar compatibilidad y registrar versiones efectivas antes de continuar.

**Con Corepack:** en versión de Node que lo provea y esté habilitado: `corepack enable`; luego `corepack pnpm --version`, `corepack pnpm install`; o instalar pnpm por el procedimiento oficial standalone aprobado. Nunca utilizar npm como gestor del proyecto. No admitir gestores alternativos.
