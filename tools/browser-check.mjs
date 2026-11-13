import {chromium} from '@playwright/test';
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import assert from 'node:assert/strict';

fs.mkdirSync('test-results', {recursive:true});
const server = spawn(process.execPath, ['tools/serve.mjs'], {env:{...process.env, PORT:'4175'}, stdio:'pipe'});
let browser;
try {
  await new Promise((resolve, reject) => { server.stdout.once('data', resolve); server.once('error', reject); setTimeout(() => reject(new Error('Servidor não iniciou')), 15000).unref(); });
  browser = await chromium.launch({channel:'chrome', headless:true});
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto('http://127.0.0.1:4175', {waitUntil:'networkidle'});
  assert.equal(response.status(), 200);
  await page.evaluate(async () => { for (const image of document.images) image.loading = 'eager'; await Promise.all([...document.images].map(image => image.decode().catch(() => {}))); });
  const imageState = await page.locator('.about-picture img').evaluate(image => ({complete:image.complete,naturalWidth:image.naturalWidth,currentSrc:image.currentSrc}));
  assert(imageState.complete && imageState.naturalWidth > 0, JSON.stringify(imageState));
  await page.screenshot({path:'test-results/desktop.png', fullPage:true});
  assert.equal(await page.locator('[data-category]').count(), 4);
  const whatsappLinks = await page.locator('[data-whatsapp]').evaluateAll(links => links.map(link => link.href));
  assert(whatsappLinks.length >= 5);
  assert(whatsappLinks.every(href => href.startsWith('https://wa.me/5561991416144?text=')));
  const instagramLinks = await page.locator('[data-instagram]').evaluateAll(links => links.map(link => link.href));
  assert(instagramLinks.length >= 2);
  assert(instagramLinks.every(href => href === 'https://www.instagram.com/suplementacao_injetavel/'));
  assert((await page.locator('[data-map]').getAttribute('href')).startsWith('https://www.google.com/maps/search/'));
  const unsafeBlank = await page.locator('a[target="_blank"]').evaluateAll(links => links.filter(link => !link.rel.includes('noopener')).length);
  assert.equal(unsafeBlank, 0);
  await page.locator('[data-category="Minerais"]').click();
  assert.equal(await page.locator('#category-select').inputValue(), 'Minerais');
  await page.locator('[name="intent"][value="agendar"]').check();
  await page.locator('[name="name"]').fill('Teste de navegação');
  await page.evaluate(() => { window.open = url => { window.__opened = url; return null; }; });
  await page.locator('#contact-form button[type="submit"]').click();
  const target = await page.evaluate(() => window.__opened);
  assert(target.startsWith('https://wa.me/5561991416144?text='));
  assert(decodeURIComponent(target).includes('agendamento'));
  assert(decodeURIComponent(target).includes('Minerais'));
  for (const width of [320,390,768]) {
    await page.setViewportSize({width,height:844});
    await page.goto('http://127.0.0.1:4175', {waitUntil:'networkidle'});
    await page.evaluate(async () => { for (const image of document.images) image.loading = 'eager'; await Promise.all([...document.images].map(image => image.decode().catch(() => {}))); });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Overflow em ${width}px`);
    await page.locator('.menu-button').click();
    assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'), 'true');
    await page.locator('#main-nav a').first().click();
    assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'), 'false');
    if (width === 390) await page.screenshot({path:'test-results/mobile.png', fullPage:true});
  }
  for (const href of ['styles.css','app.js','config.js','favicon.svg','robots.txt','sitemap.xml','assets/elevy-logo-claro.png','assets/priscila.png']) {
    const asset = await page.request.get(`http://127.0.0.1:4175/${href}`);
    assert.equal(asset.status(), 200, href);
  }
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('OK: desktop, 320/390/768px, menu, categorias, WhatsApp, imagens, arquivos e ausência de overflow/erros JS.');
} finally {
  await browser?.close();
  server.kill();
}
