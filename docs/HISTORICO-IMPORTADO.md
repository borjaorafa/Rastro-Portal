# Histórico importado do Rastro

O arquivo `docs/historico.json` contém **100 registros históricos** extraídos da documentação do pacote `Rastro-v2.34.0.58.1-COMPLETO.zip`, originalmente em `Windows/Projeto/Rastro/motor/interface/historico-atualizacoes.json`.

- Os registros foram convertidos para histórico documental, sem arquivos de download.
- 280 descrições pontuais de alteração foram preservadas.
- Os dados originais não comprovam datas de lançamento nem disponibilidade de instaladores.
- O histórico não equivale a GitHub Releases publicados ou a versões homologadas para clientes.
- A página exibe inicialmente 12 registros, com busca textual e carregamento incremental.
- O validador `scripts/validar-historico.mjs` protege o número de registros, a unicidade e o estado documental.
- As próximas versões instaláveis ficam em `docs/versoes.json`, somente após autorização e testes.
- **Não foram publicadas alterações no License Manager nem no software desktop.**

Para recuperar instaladores de versões anteriores, cada pacote deve ser localizado, analisado, testado, ter SHA-256 calculado e ser enviado ao armazenamento **privado** de releases, nunca a este repositório público.