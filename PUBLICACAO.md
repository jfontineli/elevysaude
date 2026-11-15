# Publicação — Elevy

## Configuração prevista

- Repositório GitHub: `https://github.com/jfontineli/elevysaude`, branch de produção `main`.
- Cloudflare Pages conectado ao GitHub.
- Framework: `None`.
- Comando de build: `exit 0`.
- Diretório de saída: `site`.
- Diretório raiz: padrão (raiz do repositório).

Cada push na `main` publica uma nova versão no projeto Cloudflare Pages `elevysaude`. A URL oficial é **https://elevysaude.com.br/** e a URL técnica permanece disponível em `https://elevysaude.pages.dev/`.

### Estado em 14/11/2026

- Projeto `elevysaude` criado no Cloudflare Pages com origem GitHub configurada.
- Primeira versão publicada e validada em `https://elevysaude.pages.dev/`.
- Publicação inicial realizada manualmente no projeto já conectado ao GitHub.
- Integração **Cloudflare Workers and Pages** autorizada para `jfontineli/elevysaude`.
- Deploy automático pela branch `main` confirmado com sucesso em 14/11/2026.

## Domínio próprio

- Domínio canônico: `https://elevysaude.com.br/`.
- Versão alternativa: `https://www.elevysaude.com.br/` (deve redirecionar permanentemente para a versão sem `www`).
- Registrador: Registro.br.
- Servidores DNS: `dana.ns.cloudflare.com` e `dean.ns.cloudflare.com`.
- CNAME raiz (`@`): `elevysaude.pages.dev`, com proxy Cloudflare.
- CNAME `www`: `elevysaude.pages.dev`, com proxy Cloudflare.
- Registros MX e TXT preexistentes foram preservados.
- Domínio raiz e HTTPS validados em 15/11/2026; validação final de `www` e regra 301 ainda devem ser confirmadas.

## Checklist de lançamento

- Confirmar responsável técnico, registro profissional e informações obrigatórias para divulgação.
- Confirmar categorias, produtos/protocolos, condições de compra e atendimento.
- Confirmar se o endereço publicado é o local de atendimento.
- Testar um pedido de compra e um pedido de agendamento em celular real.
- Conferir compartilhamento social, HTTPS e redirecionamento canônico.
- Manter originais e qualquer arquivo privado fora de `site/`.
