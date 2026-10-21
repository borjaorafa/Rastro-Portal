# Rastro | Portal de versões

Portal de distribuição e documentação do **Rastro**, da **RBS Technology**.

## Ativar GitHub Pages

Em **Settings → Pages**, selecione **Deploy from a branch**, branch `main`, pasta `/docs` e clique em **Save**.

URL prevista: https://borjaorafa.github.io/Rastro-Portal/

## Organização

- `docs/index.html`: página inicial responsiva.
- `docs/assets/estilos.css`: estilos.
- `docs/assets/aplicativo.js`: catálogo de versões.
- `docs/assets/marca.svg`: marca conceitual provisória.
- `docs/versoes.json`: catálogo público de releases.

## Segurança

Este repositório é **público**. Não adicione instaladores confidenciais, senhas, tokens ou código privado. O download para clientes precisa ser autorizado pelo fluxo de licenciamento e distribuição RBS License Manager, sem expor URL privada ou token no JavaScript.

O único item inicialmente exibido no catálogo é **um rascunho de referência**, não um instalador homologado. Botões de download permanecem desativados.

## Como publicar versões

Após homologar o instalador e implementar um endpoint de download autorizado, atualize `docs/versoes.json` com os dados oficiais. Nunca utilize URLs permanentes abertas para um arquivo de acesso restrito.

© RBS Technology.