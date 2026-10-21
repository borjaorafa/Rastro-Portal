# Rastro • Portal oficial de versões

Site institucional e central de versões do Rastro, produto da RBS Technology.

**URL:** https://borjaorafa.github.io/Rastro-Portal/

## Identidade visual

- Marca oficial do Rastro: `docs/assets/logo-oficial.svg`.
- Variante de alto contraste: `docs/assets/logo-claro.svg`.
- Ícone: `docs/assets/icone.svg`.
- Paleta: preto, branco e grafite.

## Como publicar

GitHub **Settings → Pages → Deploy from a branch → main → /docs**.

## Catálogo de versões

O arquivo `docs/versoes.json` controla os cartões. Inicialmente, não existem versões homologadas cadastradas. Não há instaladores disponíveis nesta publicação.

Estrutura de item de versão:

```json
{
  "versao": "X.Y.Z",
  "estado": "publicada",
  "publicadaEm": "AAAA-MM-DD",
  "resumo": "Resumo da versão",
  "notas": ["Melhoria A", "Correção B"],
  "tamanhoMB": 0,
  "sha256": "HASH_SHA256_VALIDADO",
  "urlDownload": "https://SEU-ENDPOINT-AUTORIZADO"
}
```

Para downloads controlados, **não use links públicos** para releases privados. O campo `urlDownload` só deve apontar para um endpoint HTTPS autenticado que valide autorização no servidor, preferencialmente integrado ao RBS License Manager. Senhas, tokens e links temporários não devem constar em arquivos públicos.

A função de busca filtra versão, resumo e notas. Apenas versões com estado `publicada` e URL HTTPS são consideradas disponíveis. Mesmo nesses casos, a autorização do download é responsabilidade do servidor.

## Arquivos

- `docs/index.html`: estrutura e SEO.
- `docs/assets/estilos.css`: layout responsivo.
- `docs/assets/aplicativo.js`: catálogo e interações.
- `docs/versoes.json`: lançamentos homologados.

## Pendências

- Validar e cadastrar a versão oficial atual.
- Receber instalador e hash SHA-256.
- Configurar endpoint de download autorizado.
- Vincular a autenticação/licença.
- Adicionar capturas reais do aplicativo quando disponíveis.

© RBS Technology.