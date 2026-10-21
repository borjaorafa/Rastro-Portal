# Rastro · Implantação do repositório privado de instaladores

## Separação de ambientes

- **Rastro-Portal:** site público, histórico, notas de versões e documentação.
- **Rastro-Releases:** repositório PRIVADO para os ZIPs de atualização Windows assinados. Não colocar arquivos restritos no Rastro-Portal.
- **RBS License Manager:** controla versões em rascunho, homologação, publicação por canal e autorização de download.

## Criar o repositório privado com segurança

O GitHub conectado ao assistente não disponibiliza uma ação de **criar repositório**. Por isso, a configuração do novo repositório deve ser autorizada no próprio GitHub ou executada com GitHub CLI no Windows.

### Opção A: interface

1. Abrir https://github.com/new
2. Proprietário: `borjaorafa`
3. Nome: `Rastro-Releases`
4. Visibilidade: **Private**
5. Marcar **Add a README file** e criar.
6. Não enviar instaladores neste momento.

### Opção B: GitHub CLI (Windows)

Instalar `gh`: `winget install --id GitHub.cli -e`; autenticar com `gh auth login`.

Criar, somente após conferir a conta autenticada:

```powershell
gh repo create borjaorafa/Rastro-Releases --private --add-readme --description "Pacotes de atualizacao privados do Rastro - RBS Technology"
gh repo view borjaorafa/Rastro-Releases --json isPrivate,isArchived,nameWithOwner
```

Há também um **pacote de configuração Windows** entregue na conversa do projeto com BAT/PowerShell, que verifica a conta, solicita confirmação explícita e define a variável `RBS_GITHUB_REPOSITORIO` no perfil local.

## Integração existente a homologar

O Rastro contém `Windows/Projeto/Rastro/ENVIAR-VERSAO-GITHUB.ps1`, que exige assinatura Authenticode, hash SHA-256, limite de 100 MB e verificação por download de retorno antes de gerar o relatório JSON. O License Manager `v1.55.13` homologação recebe esse JSON e permite registrar a release como rascunho, com liberação posterior.

Primeira execução: canal **INTERNO**, máquina piloto, sem exposição a clientes.

O Worker do License Manager requer `GITHUB_RELEASE_REPO` e o segredo `GITHUB_RELEASE_TOKEN` para consultar os assets privados. O token não deve constar em este repositório, código JavaScript público, logs de navegador ou relatórios de versão. A configuração de produção depende de homologação e aprovação.

## Fluxo futuro

1. Compilar, assinar e testar no Windows.
2. Publicar ZIP privado com a tag de versão única.
3. Conferir tamanho e SHA-256 por download.
4. Importar relatório JSON no License Manager.
5. Registrar **DRAFT**; testar com licença piloto, assinatura e rollback.
6. Aprovar release e rollout no License Manager.
7. Atualizar informações públicas no catálogo do Portal Rastro, sem fornecer URL permanente de arquivo privado.

### Recuperação retroativa

O `docs/historico.json` contém 100 versões documentadas, mas nenhuma delas deve aparecer como download sem recuperação e validação do respectivo pacote executável original. Não atribuir datas que não sejam comprovadas.

## Estado desta etapa

- Política de distribuição documentada.
- Pacote Windows de configuração preparado e ZIP de integridade conferida.
- 41 testes locais do fluxo anterior passaram novamente.
- Nenhum novo repositório privado foi criado por esta conversa.
- Nenhuma release privada, credencial, licença, banco de produção ou cliente foi alterado.
