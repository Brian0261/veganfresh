import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { load } from 'cheerio';
import { readFile } from 'node:fs/promises';
import { pages } from '../../src/config/pages';
import { fixture, skin } from '../fixture';

const widths = [[320, 700], [390, 844], [768, 1024], [1024, 768], [1440, 900], [1920, 1080]] as const;

test('HTML estático, metadata, links, rutas pendientes y cabeceras', async ({ request, browser }) => {
  const descriptors = Object.values(pages);
  const siteArchitecture = await readFile('docs/03-seo/SITE_ARCHITECTURE.md', 'utf8');
  const headings = new Set<string>();
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const links = new Set<string>();
  for (const [name, path, status] of skin) {
    const result = await request.get(path);
    expect(result.status(), name).toBe(status);
    expect(result.headers()['x-robots-tag']).toContain('noindex');
    expect(result.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(result.headers()['content-security-policy']).toContain("script-src 'self';");
    expect(result.headers()['x-content-type-options']).toBe('nosniff');
    const $ = load(await result.text());
    const descriptor = status === 404 ? pages.missing : descriptors.find(entry => entry.path === path)!;
    expect($('html').attr('lang')).toBe('es-PE');
    expect($('h1')).toHaveLength(1);
    expect($('h1').text()).toBe(descriptor.h1);
    expect(siteArchitecture).toContain(descriptor.h1);
    expect($('title').text()).toBe(descriptor.title);
    expect(siteArchitecture).toContain(descriptor.title);
    expect($('meta[name="description"]').attr('content')).toBe(descriptor.description);
    expect(siteArchitecture).toContain(descriptor.description);
    expect($('meta[name="robots"]').attr('content')).toBe('noindex, follow');
    expect($('link[rel="canonical"],meta[property="og:image"]')).toHaveLength(0);
    expect($('meta[property="og:title"]').attr('content')).toBe(descriptor.title);
    expect($('main header nav,main .breadcrumb').length).toBe(['productos', 'frutas', 'verduras', 'restaurantes'].includes(name) ? 1 : 0);
    expect($('header .brand img').attr('src')).toBe('/assets/brand/logo-primary.png');
    expect($('footer .brand img').attr('src')).toBe('/assets/brand/logo-inverse.png');
    expect($('script[type="application/ld+json"]')).toHaveLength(0);
    if (name === 'productos') expect($('.product-examples li').length).toBe(12);
    expect($('a[href^="/productos/"]').filter((_, a) => ($(a).attr('href') ?? '').split('?')[0] !== '/productos/')).toHaveLength(0);
    headings.add($('h1').text());
    titles.add($('title').text());
    descriptions.add($('meta[name="description"]').attr('content')!);
    $('a[href^="/"]').each((_, a) => { links.add($(a).attr('href')!); });
  }
  expect([headings.size, titles.size, descriptions.size]).toEqual([8, 8, 8]);
  await Promise.all([...links].map(async link => expect((await request.get(link)).status(), link).toBe(200)));
  for (const absent of ['404', '404/', '404.html', 'productos/papa-al-por-mayor/', 'proveedor-hoteles/', 'proveedor-catering/', 'lima/san-isidro/']) {
    expect((await request.get('/' + absent)).status(), absent).toBe(404);
  }
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toBe('User-agent: *\nDisallow: /api/\n');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.headers()['content-type']).toContain('xml');
  expect(load(await sitemap.text(), { xml: true })('url').length).toBe(0);

  const noJs = await browser.newContext({ javaScriptEnabled: false });
  try {
    const staticPage = await noJs.newPage();
    await staticPage.setViewportSize({ width: 390, height: 844 });
    await staticPage.goto('/productos/');
    await expect(staticPage.getByRole('heading', { level: 1 })).toHaveText(pages.productos.h1);
    await staticPage.getByText('Menú', { exact: true }).click();
    await staticPage.locator('#mobile-navigation').getByRole('link', { name: 'Frutas', exact: true }).click();
    await expect(staticPage).toHaveURL(/frutas-al-por-mayor/);
    await staticPage.goto('/cotizar/');
    await expect(staticPage.getByText(/Activa JavaScript/)).toBeVisible();
    await expect(staticPage.getByRole('button', { name: 'Enviar solicitud' })).toBeDisabled();
  } finally {
    await noJs.close();
  }
});

for (const [name, path, status] of skin) {
  test(`${name} en seis tamaños, contraste y capturas`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', entry => {
      if (entry.type() === 'error' && /Content Security Policy|violates/.test(entry.text())) errors.push(entry.text());
    });
    for (const [width, height] of widths) {
      await page.setViewportSize({ width, height });
      const response = await page.goto(path);
      expect(response?.status()).toBe(status);
      await page.evaluate(async () => {
        await document.fonts.ready;
        const images = Array.from(document.images);
        for (const image of images) image.loading = 'eager';
        await Promise.all(images.map(image => image.decode()));
      });

      const metrics = await page.evaluate(() => {
        const header = document.querySelector('header')!;
        const h1 = document.querySelector('h1')!;
        const wrap = header.firstElementChild!;
        const boxes = [...document.querySelectorAll('main section,main form,footer')].map(section => {
          const bounds = section.getBoundingClientRect();
          return { heading: section.querySelector('h1,h2')?.textContent, y: Math.round(bounds.y), height: Math.round(bounds.height) };
        });
        return {
          viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth,
          header: header.getBoundingClientRect().height, gutter: wrap.getBoundingClientRect().left,
          font: getComputedStyle(h1).fontSize, boxes,
        };
      });
      expect(metrics.scrollWidth, `${name} a ${width}px`).toBeLessThanOrEqual(metrics.viewport);
      expect(metrics.header).toBe(width >= 1280 ? 96 : width < 768 ? 70 : 76);
      const expectedHero: Record<string, string> = {
        home: 'hero-market', productos: 'ingredients-board', frutas: 'fruits-citrus',
        verduras: 'vegetables-still', restaurantes: 'ingredients-board',
      };
      if (expectedHero[name]) {
        const hero = page.locator('main img[fetchpriority="high"]');
        await expect(hero).toHaveCount(1);
        const selected = width < 768 ? '-mobile.webp' : '.webp';
        expect(await hero.evaluate(img => (img as HTMLImageElement).currentSrc)).toContain(
          '/assets/design-upgrade/' + expectedHero[name] + selected,
        );
      }

      if (width === 390 || width === 1440) {
        await page.screenshot({ path: `qa/captures/${name}-${width}-first-fold.png`, animations: 'disabled' });
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        expect(axe.violations.map(issue => ({ id: issue.id, nodes: issue.nodes.map(node => node.target) }))).toEqual([]);
      }
      if (name === 'productos' && (width === 390 || width === 1440)) {
        const notice = await page.locator('.catalog-hero .notice').boundingBox();
        expect(notice!.y + notice!.height).toBeLessThanOrEqual(height);
      }
      await page.screenshot({ path: `qa/captures/${name}-${width}.png`, fullPage: true, animations: 'disabled' });
      await test.info().attach('geometría ' + width, { body: JSON.stringify(metrics, null, 2), contentType: 'application/json' });
    }
    expect(errors).toEqual([]);
  });
}

test('teclado, foco, menú móvil, FAQ y movimiento reducido', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const trigger = page.locator('.mobile-menu summary');
  await trigger.focus();
  await page.keyboard.press('Space');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-navigation').getByRole('link', { name: 'Inicio', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#mobile-navigation').getByRole('link', { name: 'Productos', exact: true })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('#mobile-navigation').getByRole('link', { name: 'Inicio', exact: true })).toBeFocused();
  await page.screenshot({ path: 'qa/captures/home-menu-abierto.png' });
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  const question = page.locator('.faq summary').first();
  await question.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.faq').first()).toHaveAttribute('open', '');
  expect(await page.locator('a.button').first().evaluate(link => getComputedStyle(link).transitionDuration)).toBe('0s');
  await page.screenshot({ path: 'qa/captures/home-faq-teclado.png', fullPage: true });
});

test('rotación y reflujo equivalente a zoom del 200 %', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 640, height: 450 }, deviceScaleFactor: 2 });
  try {
    const page = await context.newPage();
    for (const [, path] of skin) {
      await page.goto(path);
      await expect(page.locator('main h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(640);
    }
    await page.goto('/cotizar/');
    await page.setViewportSize({ width: 844, height: 390 });
    const trigger = page.locator('.mobile-menu summary');
    await trigger.focus();
    await page.keyboard.press('Enter');
    const quote = page.locator('#mobile-navigation').getByRole('link', { name: 'Solicitar cotización' });
    await quote.focus();
    await expect(quote).toBeInViewport();
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await expect(page.getByRole('button', { name: 'Enviar solicitud' })).toBeEnabled();
  } finally {
    await context.close();
  }
});

test('cotizador accesible, validación, limitación, reintento idempotente y confirmación', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cotizar/?origen=restaurantes');
  await expect(page.getByText('Consulta para restaurantes.')).toBeVisible();
  await expect(page.getByLabel('Tipo de negocio')).toHaveValue('restaurant');
  await page.getByRole('button', { name: 'Enviar solicitud' }).click();
  await expect(page.locator('#quote-error')).toBeFocused();
  await expect(page.locator('#companyName-error')).toBeVisible();
  await page.screenshot({ path: 'qa/captures/cotizar-validacion.png', fullPage: true });
  await page.locator('#companyName').fill(fixture.companyName);
  await page.locator('#contactName').fill(fixture.contactName);
  await page.locator('#email').fill(fixture.email);
  await page.locator('#phone').fill(fixture.phone);
  await page.locator('#district').fill(fixture.district);
  await page.locator('#productsAndQuantities').fill(fixture.productsAndQuantities);
  await page.getByRole('checkbox').check();
  await page.clock.install();
  const keys: string[] = [];
  let attempts = 0;
  await page.route('**/api/cotizaciones', async route => {
    keys.push(route.request().headers()['idempotency-key']);
    switch (++attempts) {
      case 1: return route.fulfill({ status: 422, json: { ok: false, code: 'challenge' } });
      case 2: return route.fulfill({ status: 429, headers: { 'Retry-After': '1' }, json: { ok: false } });
      case 3: return route.fulfill({ status: 503, json: { ok: false } });
      default: return route.continue();
    }
  });
  await page.getByRole('button', { name: 'Enviar solicitud' }).click();
  await expect(page.locator('#quote-error')).toContainText('No pudimos verificar');
  await page.screenshot({ path: 'qa/captures/cotizar-antibot.png', fullPage: true });
  await page.getByRole('button', { name: 'Volver a intentar' }).click();
  await expect(page.locator('#quote-error')).toContainText('varios intentos');
  await page.clock.fastForward(1100);
  await page.getByRole('button', { name: 'Volver a intentar' }).click();
  await expect(page.locator('#quote-error')).toContainText('No pudimos confirmar');
  await expect(page.locator('#productsAndQuantities')).toHaveValue(fixture.productsAndQuantities);
  await page.screenshot({ path: 'qa/captures/cotizar-servidor.png', fullPage: true });

  let resume!: () => void;
  const hold = new Promise<void>(resolve => { resume = resolve; });
  await page.route('**/api/cotizaciones', async route => { await hold; await route.fallback(); });
  try {
    await page.getByRole('button', { name: 'Volver a intentar' }).click();
    await expect(page.getByRole('button', { name: 'Enviando solicitud…' })).toBeDisabled();
    await page.screenshot({ path: 'qa/captures/cotizar-enviando.png', fullPage: true });
  } finally {
    resume();
  }
  await expect(page.locator('#quote-success')).toBeFocused();
  await expect(page.locator('#quote-success')).toContainText('Simulación guardada en la base local.');
  await expect(page.locator('#quote-success')).toContainText(/VF-[a-f0-9-]{36}/);
  expect(new Set(keys).size).toBe(1);
  expect(keys).toHaveLength(4);
  await page.screenshot({ path: 'qa/captures/cotizar-exito.png', fullPage: true });
});

test('contrato HTTP del API y límite en Worker local', async ({ request, baseURL }) => {
  const url = '/api/cotizaciones';
  const headers = { Origin: baseURL!, 'Idempotency-Key': crypto.randomUUID(), 'Content-Type': 'application/json' };
  const urlInfo = new URL(baseURL!);
  const configuredOrigin = urlInfo.origin;
  expect((await request.get(url)).status()).toBe(405);
  expect((await request.post(url, { headers: { ...headers, Origin: 'https://externo.example.test' }, data: fixture })).status()).toBe(403);
  expect((await request.post(url, { headers: { Origin: configuredOrigin }, data: fixture })).status()).toBe(400);
  expect((await request.post(url, { headers, data: Buffer.from('{') })).status()).toBe(400);
  expect((await request.post(url, { headers, data: Buffer.from('x'.repeat(17 * 1024)) })).status()).toBe(413);
  const invalid = await request.post(url, { headers, data: { ...fixture, email: 'invalid' } });
  expect(invalid.status()).toBe(422);
  expect(await invalid.text()).not.toContain(fixture.companyName);
  expect(invalid.headers()['cache-control']).toBe('no-store');
  const results = [];
  for (let index = 0; index < 9; index += 1) {
    const result = await request.post(url, { headers, data: { ...fixture, email: 'invalid' } });
    results.push(result.status());
    if (result.status() === 429) expect(result.headers()['retry-after']).toBe('60');
  }
  expect(results).toContain(429);
});
