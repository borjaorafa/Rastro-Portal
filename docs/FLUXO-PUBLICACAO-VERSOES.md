# Fluxo de publicações do Rastro

Este documento descreve a política operacional de versões da RBS Technology. **Não contém instaladores nem dados confidenciais.**

## Lançamentos novos

1. Desenvolver, compilar e testar o Rastro em Windows.
2. Assinar o instalador e empacotar a atualização.
3. Enviar a release para um repositório **privado** autorizado no GitHub, conferindo tamanho, assinatura e hash SHA-256.
4. Gerar o relatório JSON de importação, contendo somente metadados, sem tokens e sem links para downloads.
5. Importar o relatório na **Central de Atualizações do RBS License Manager**; conferir versão, canal e descrição antes do registro.
6. Registrar como **RASCUNHO**, testar no Windows piloto e aprovar a liberação gradativa.
7. Após a homologação, disponibilizar informações públicas da versão e notas no Portal Rastro. O download de pacote privado segue condicionado à autorização do License Manager.

A integração do relatório de importação foi **implementada em pacotes locais para homologação**, mas **não implantada em produção**. A criação de releases privadas e liberação para clientes dependem de ambiente, credenciais e testes autorizados.

## Histórico retroativo

- O arquivo [historico.json](historico.json) reúne **100 versões documentais** (da v1.0.0.0 à v2.34.0.58.1) e 280 anotações extraídas da fonte fornecida.
- O histórico está separado de [versoes.json](versoes.json), dedicado a pacotes oficiais disponibilizáveis.
- Não foram identificados instaladores antigos nesses pacotes de código-fonte; não inventamos downloads.
- Datas de lançamento originais permanecem desconhecidas até haver evidência documental.
- Um arquivo de versão histórica só poderá ser disponibilizado depois de recuperado, validado e aprovado.

## Segurança

Não coloque executáveis, arquivos de instalação privados, tokens, credenciais, segredos de assinatura ou links temporários neste repositório público. O GitHub Pages exibe documentação e referências; o acesso a instaladores requer canal autenticado.

© RBS Technology.