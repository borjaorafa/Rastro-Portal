#requires -Version 5.1
# Rastro · Cria/valida repositório de releases; não envia instaladores.
[CmdletBinding()]
param([string]$Repositorio='borjaorafa/Rastro-Releases')
$ErrorActionPreference='Stop'
try {
 if($Repositorio -cnotmatch '^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$'){throw 'Nome de repositório inválido.'}
 if(-not(Get-Command gh -ErrorAction SilentlyContinue)){throw 'Instale GitHub CLI: winget install --id GitHub.cli -e'}
 & gh auth status *> $null
 if($LASTEXITCODE -ne 0){throw 'Faça login: gh auth login'}
 $usuario=(& gh api user --jq .login | Out-String).Trim()
 if($LASTEXITCODE -ne 0 -or $usuario -cne $Repositorio.Split('/')[0]){throw 'GitHub CLI autenticado em conta diferente do proprietário.'}
 $json=& gh repo view $Repositorio --json isPrivate,isArchived,nameWithOwner 2>$null
 if($LASTEXITCODE -ne 0){
  Write-Host ('Repositório ausente: '+$Repositorio)
  if((Read-Host 'Digite CRIAR para criar o repositório PRIVADO') -cne 'CRIAR'){throw 'Operação cancelada.'}
  & gh repo create $Repositorio --private --add-readme --description 'Pacotes de atualizacao privados do Rastro - RBS Technology'
  if($LASTEXITCODE -ne 0){throw 'Falha ao criar repositório.'}
  $json=& gh repo view $Repositorio --json isPrivate,isArchived,nameWithOwner
  if($LASTEXITCODE -ne 0){throw 'Falha ao conferir repositório.'}
 }
 $dados=$json|ConvertFrom-Json
 if(-not $dados.isPrivate -or $dados.isArchived){throw 'Repositório encontrado, mas não é privado e ativo.'}
 [Environment]::SetEnvironmentVariable('RBS_GITHUB_REPOSITORIO',$Repositorio,'User')
 Write-Host ('PRONTO: '+$Repositorio+' é privado e ativo.') -ForegroundColor Green
 Write-Host 'Nenhuma release, credencial nem alteração em produção foi criada.'
} catch { Write-Host ('BLOQUEADO: '+$_.Exception.Message) -ForegroundColor Red; exit 1 }
