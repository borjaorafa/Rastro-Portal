@echo off
setlocal
title Rastro - Preparar Release
cd /d "%~dp0"

if "%~1"=="" goto uso
if "%~2"=="" goto uso

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0preparar-release.ps1" -Instalador "%~1" -Versao "%~2" -Resumo "%~3"
set "RESULTADO=%ERRORLEVEL%"
echo.
if not "%RESULTADO%"=="0" echo Falha ao preparar os metadados da versao.
pause
exit /b %RESULTADO%

:uso
echo.
echo USO:
echo PREPARAR-RELEASE.bat "C:\Caminho\Rastro-Setup.exe" "2.34.0-RC11-HF12" "Notas oficiais da versao"
echo.
echo Gera apenas manifesto local com tamanho e hash SHA-256.
echo Nao publica arquivos nem releases automaticamente.
echo.
pause
exit /b 1