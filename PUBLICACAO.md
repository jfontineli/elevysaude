# Publicação — Elevy

## Configuração prevista

- Repositório GitHub: `https://github.com/jfontineli/elevysaude`, branch de produção `main`.
- Cloudflare Pages conectado ao GitHub.
- Framework: `None`.
- Comando de build: `exit 0`.
- Diretório de saída: `site`.
- Diretório raiz: padrão (raiz do repositório).

Cada push na `main` publica uma nova versão em **https://elevysaude.pages.dev/**. Projeto Cloudflare Pages: `elevysaude`, conectado ao repositório GitHub acima.

### Estado em 14/11/2026

- Projeto `elevysaude` criado no Cloudflare Pages com origem GitHub configurada.
- Primeira versão publicada e validada em `https://elevysaude.pages.dev/`.
- Publicação inicial realizada manualmente no projeto já conectado ao GitHub.
- Integração **Cloudflare Workers and Pages** autorizada para `jfontineli/elevysaude`.
- Deploy automático pela branch `main` confirmado com sucesso em 14/11/2026.

## Domínio próprio

O domínio ainda não foi informado. Quando estiver definido:

1. Adicione primeiro o domínio canônico em **Cloudflare Pages → Custom domains** e use exatamente o destino fornecido pelo painel.
2. Configure também a versão alternativa (`www` ou raiz) e crie um redirecionamento permanente 301 para a versão canônica.
3. No Registro.br, só altere os registros indicados pela configuração real do Cloudflare. Exporte e preserve antes todos os registros existentes, especialmente MX, SPF, DKIM e demais TXT de e-mail.
4. Aguarde a emissão do certificado e valide HTTPS nos dois endereços, a tag canônica, `robots.txt` e `sitemap.xml`.

Não presuma valores de CNAME, A/AAAA ou nameservers: eles dependem do domínio que será registrado e da zona criada no login do cliente. Preencha aqui as instruções exatas somente depois da configuração real do domínio.

## Checklist de lançamento

- Confirmar responsável técnico, registro profissional e informações obrigatórias para divulgação.
- Confirmar categorias, produtos/protocolos, condições de compra e atendimento.
- Confirmar se o endereço publicado é o local de atendimento.
- Testar um pedido de compra e um pedido de agendamento em celular real.
- Conferir compartilhamento social, HTTPS e redirecionamento canônico.
- Manter originais e qualquer arquivo privado fora de `site/`.
