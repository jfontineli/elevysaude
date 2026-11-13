# Publicação — Elevy

## Configuração prevista

- Repositório GitHub próprio, branch de produção `main`.
- Cloudflare Pages conectado ao GitHub.
- Framework: `None`.
- Comando de build: `exit 0`.
- Diretório de saída: `site`.
- Diretório raiz: padrão (raiz do repositório).

Cada push na `main` publicará uma nova versão. Primeiro valide a URL `pages.dev` efetivamente fornecida pela Cloudflare; depois substitua a URL provisória `https://elevy.pages.dev/` em `site/index.html`, `site/config.js`, `site/robots.txt` e `site/sitemap.xml` pela URL canônica real.

## Domínio próprio

O domínio ainda não foi informado. Quando estiver definido:

1. Adicione primeiro o domínio canônico em **Cloudflare Pages → Custom domains** e use exatamente o destino fornecido pelo painel.
2. Configure também a versão alternativa (`www` ou raiz) e crie um redirecionamento permanente 301 para a versão canônica.
3. No Registro.br, só altere os registros indicados pela configuração real do Cloudflare. Exporte e preserve antes todos os registros existentes, especialmente MX, SPF, DKIM e demais TXT de e-mail.
4. Aguarde a emissão do certificado e valide HTTPS nos dois endereços, a tag canônica, `robots.txt` e `sitemap.xml`.

Não presuma valores de CNAME, A/AAAA ou nameservers: eles dependem do projeto e da zona criada no login do cliente. A URL `pages.dev`, o repositório e qualquer instrução exata de DNS devem ser preenchidos aqui depois da criação real.

## Checklist de lançamento

- Confirmar responsável técnico, registro profissional e informações obrigatórias para divulgação.
- Confirmar categorias, produtos/protocolos, condições de compra e atendimento.
- Confirmar se o endereço publicado é o local de atendimento.
- Testar um pedido de compra e um pedido de agendamento em celular real.
- Conferir compartilhamento social, HTTPS e redirecionamento canônico.
- Manter originais e qualquer arquivo privado fora de `site/`.
