# Rastro | Distribuição segura de instaladores

**Estado atual:** o portal público está operacional, mas o download autorizado do Rastro **não foi implementado**.

## Componentes e responsabilidades

1. **GitHub Pages / Rastro-Portal (público):** apresenta produto, histórico, notas, tamanho, hash SHA-256, requisitos e botão para iniciar o download por um canal autenticado. **Não** possui tokens nem pacotes privados.
2. **Armazenamento privado (a definir):** GitHub Releases de repositório privado ou alternativa equivalente, com artefatos identificados pela versão. Nunca colocar instaladores restritos no Rastro-Portal público.
3. **RBS License Manager (backend):** autentica o cliente, valida licença ativa, produto Rastro, autorização, versão/canal, registra auditoria e solicita arquivo privado em nome do cliente.
4. **Rastro (desktop):** verifica atualização disponibilizada, informa novidades, baixa arquivo autorizado, confere SHA-256/assinatura, executa atualização com rollback quando cabível.

## Contrato proposto (a validar com código do License Manager)

### GET /api/rastro/versoes
Resposta contendo versões homologadas compatíveis com o cliente e o produto, sem URLs temporárias de download nem segredos.

### POST /api/rastro/versoes/{versao}/download
**Requer autenticação e autorização no servidor.** O License Manager:
- identifica licença e máquina/cliente;
- checa se a licença autoriza Rastro e a versão/canal;
- obtém arquivo de armazenamento privado por credencial exclusiva do backend;
- devolve stream autenticado ou URL de curta duração segura quando o armazenamento permitir;
- aplica expiração, limite de taxa e auditoria.

Exemplo de resposta somente após validação (valores ilustrativos):

```json
{
  "versao": "X.Y.Z",
  "arquivo": "Rastro-Setup.exe",
  "tamanhoBytes": 12345678,
  "sha256": "HASH_SHA256_DE_64_CARACTERES",
  "expiraEm": "DATA_E_HORA_ISO8601",
  "urlTemporaria": "URL_GERADA_SOMENTE_NO_BACKEND"
}
```

### Restrições obrigatórias

- Nunca usar credencial GitHub, token do License Manager, API key ou URL assinada na página estática.
- Nunca divulgar link `browser_download_url` de pacote restrito.
- Não confiar apenas em licença verificada pelo JavaScript ou pelo aplicativo desktop.
- Proteger contra distribuição cruzada de produtos/clientes e repetição abusiva.
- Conferir hash SHA-256 e assinatura do instalador antes de executar.
- Prever atualização segura, com backup/rollback e controle de versões.
- **Nenhum endpoint acima foi criado ou validado neste passo.**

## Fluxo de publicação operacional

1. Compilar e testar o Rastro no Windows.
2. Assinar o instalador, se houver certificado de assinatura disponível.
3. Executar `scripts/PREPARAR-RELEASE.bat` com caminho do instalador e número da versão.
4. Validar hash/tamanho e anexar o instalador ao armazenamento privado.
5. Cadastrar a versão no License Manager e verificar permissões de acesso.
6. Testar download com licença válida e inválida, hash e aplicação da atualização.
7. Somente então marcar a versão como `publicada` em `docs/versoes.json` e usar uma URL HTTPS de início de sessão/download autenticado.

## Formato do catálogo público

```json
{
  "versao": "X.Y.Z",
  "estado": "publicada",
  "publicadaEm": "AAAA-MM-DD",
  "resumo": "O que mudou",
  "notas": ["Correção A", "Melhoria B"],
  "plataforma": "Windows",
  "arquivo": "Rastro-Setup.exe",
  "tamanhoBytes": 12345678,
  "sha256": "64 caracteres hexadecimais",
  "distribuicao": "controlada",
  "urlDownload": "https://SEU-ENDPOINT-DE-AUTORIZACAO"
}
```

Em `rascunho`, mantenha `urlDownload` vazia. O catálogo é validado pelo GitHub Actions; a segurança real depende do backend.

## Próxima integração

Analisar o código-fonte atual do RBS License Manager e o instalador do Rastro para mapear os endpoints, autenticação existente, migrações necessárias, fluxo de atualização, logs, testes e compatibilidade. **Não criar tabelas ou alterar produção sem revisão técnica.**
