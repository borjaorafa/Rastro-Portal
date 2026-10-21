# Prepara os metadados de uma nova versao do Rastro sem publicar o instalador.
# Compatibilidade: Windows PowerShell 5.1 ou superior.
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)][string]$Instalador,
  [Parameter(Mandatory = $true)][string]$Versao,
  [string]$Resumo = "Notas oficiais a confirmar"
)

$ErrorActionPreference = "Stop"

try {
  $arquivo = Get-Item -LiteralPath $Instalador -ErrorAction Stop
  if ($arquivo.PSIsContainer) { throw "Informe um arquivo de instalacao, nao uma pasta." }
  if ($arquivo.Extension.ToLowerInvariant() -notin @(".exe", ".msi", ".msix", ".msixbundle", ".zip")) {
    throw "Formato nao permitido. Utilize EXE, MSI, MSIX, MSIXBUNDLE ou ZIP."
  }
  if ($Versao -notmatch '^[0-9][0-9A-Za-z._-]{0,95}$') {
    throw "Versao invalida. Exemplo: 2.34.0-RC11-HF12."
  }

  $pastaSaida = Join-Path $PSScriptRoot "..\_releases_locais"
  New-Item -ItemType Directory -Path $pastaSaida -Force | Out-Null

  $hash = (Get-FileHash -LiteralPath $arquivo.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
  $assinatura = "Nao verificada"
  if ($arquivo.Extension -ieq ".exe" -or $arquivo.Extension -ieq ".msi") {
    $assinatura = (Get-AuthenticodeSignature -LiteralPath $arquivo.FullName).Status.ToString()
  }

  $dados = [ordered]@{
    versao = $Versao
    estado = "rascunho"
    publicadaEm = $null
    resumo = $Resumo
    notas = @()
    plataforma = "Windows"
    arquivo = $arquivo.Name
    tamanhoBytes = $arquivo.Length
    sha256 = $hash
    distribuicao = "controlada"
    urlDownload = ""
  }

  $nomeSeguro = $Versao -replace '[^0-9A-Za-z._-]', '_'
  $destino = Join-Path $pastaSaida ("rastro-" + $nomeSeguro + ".json")
  $dados | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $destino -Encoding UTF8

  Write-Host ""
  Write-Host "Rastro | Preparacao de release concluida" -ForegroundColor Green
  Write-Host ("Arquivo:     " + $arquivo.Name)
  Write-Host ("Versao:      " + $Versao)
  Write-Host ("Tamanho:     " + $arquivo.Length + " bytes")
  Write-Host ("SHA-256:     " + $hash)
  Write-Host ("Assinatura:  " + $assinatura)
  Write-Host ("Manifesto:   " + (Resolve-Path -LiteralPath $destino).Path)
  Write-Host ""
  Write-Host "Nenhum instalador foi publicado no GitHub."
  Write-Host "A versao so podera ser liberada apos homologacao, verificacao de licenca e configuracao do download autenticado."
} catch {
  Write-Error $_.Exception.Message
  exit 1
}