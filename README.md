# Elevy — primeira versão

Site institucional responsivo e estático para a Elevy, com duas jornadas principais: comprar suplementações e solicitar um agendamento. Todo pedido é preparado no navegador e encaminhado ao WhatsApp **(61) 99141-6144**; o site não armazena dados nem confirma compra ou horário.

## Visualizar e testar

Requer Node.js 20 ou superior.

```sh
npm install
npm start
```

Abra `http://localhost:4173`. Para executar as verificações estáticas e os testes Playwright em desktop e celular:

```sh
npm test
```

## Edição

- `site/index.html`: conteúdo e estrutura da página.
- `site/styles.css`: identidade visual e responsividade.
- `site/app.js`: menu, categorias e composição da mensagem.
- `site/config.js`: WhatsApp, Instagram, endereço, mapa e URL canônica.
- `site/assets/`: versões publicáveis das mídias.
- `PUBLICACAO.md`: configuração do GitHub e Cloudflare Pages.

Antes de publicar, confirmar responsável técnico/registro, lista real de produtos ou protocolos, endereço e domínio. Não foram incluídos preços, benefícios clínicos, depoimentos ou credenciais não confirmados.
