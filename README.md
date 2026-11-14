# Elevy — primeira versão

Site institucional responsivo e estático para a Elevy, com visual claro e acolhedor. A página apresenta Priscila, enfermeira especialista em estética avançada e gestão clínica, e oferece um catálogo pesquisável com 24 produtos em quatro categorias. O visitante pode selecionar vários itens e encaminhar uma única lista pelo WhatsApp **(61) 99141-6144**, escolhendo entre comprar suplementações ou solicitar um agendamento. O site não armazena dados nem confirma compra ou horário.

O perfil público `@suplementacao_injetavel` confirmou atendimento no Gama–DF e em Luziânia–GO, além dos temas energia, cabelos e unhas, imunidade e bem-estar. Os posts e conteúdos internos dos destaques exigem login; nomes de produtos, preços, composições e depoimentos não foram inferidos.

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
- `site/products.js`: nomes, categorias e descrições educativas dos produtos.
- `FONTES.md`: referências institucionais usadas nas descrições do catálogo.
- `site/config.js`: WhatsApp, Instagram, endereço, mapa e URL canônica.
- `site/assets/`: versões publicáveis das mídias.
- `PUBLICACAO.md`: configuração do GitHub e Cloudflare Pages.

Antes de publicar, confirmar o registro profissional, a lista real de produtos/protocolos, o endereço de Luziânia e o domínio. Não foram incluídos preços, nomes de ativos, depoimentos ou promessas clínicas não confirmadas.
