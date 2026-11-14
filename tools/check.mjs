import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const root = path.resolve('site');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const ref = match[1];
  if (/^(https?:|mailto:|#)/.test(ref)) continue;
  assert(fs.existsSync(path.join(root, ref)), `Arquivo ausente: ${ref}`);
}
const ids = [...html.matchAll(/id="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs duplicados');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(match[1]), `Âncora ausente: ${match[1]}`);
const context = {window:{}, Object};
vm.runInNewContext(fs.readFileSync(path.join(root, 'config.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'products.js'), 'utf8'), context);
assert.equal(context.window.ELEVY.whatsapp, '5561991416144');
assert.equal(context.window.ELEVY.instagramLabel, '@suplementacao_injetavel');
assert.equal(context.window.ELEVY_PRODUCTS.length, 24);
assert.equal(new Set(context.window.ELEVY_PRODUCTS.map(product => product.id)).size, 24, 'IDs de produtos duplicados');
assert(context.window.ELEVY_PRODUCTS.every(product => product.name && product.category && product.description), 'Produto incompleto');
for (const forbidden of [/R\$/i, /depoimento/i, /\bcura\b/i, /\bgarantid[oa]s?\b/i]) assert(!forbidden.test(html), `Conteúdo não confirmado: ${forbidden}`);
assert(html.includes('Comprar suplementações') && html.includes('Solicitar agendamento') && html.includes('Tirar uma dúvida'));
assert(!html.includes('O que você quer conversar sobre?'));
console.log('OK: arquivos, âncoras, contatos, jornadas e catálogo com 24 produtos confirmados.');
