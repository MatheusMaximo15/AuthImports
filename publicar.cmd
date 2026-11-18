@echo off
rem Publica o site no Cloudflare Pages (authimports.pages.dev).
rem Use com dois cliques neste arquivo, ou digite .\publicar no terminal dentro
rem da pasta do projeto.
rem
rem POR QUE NAO PUBLICA DIRETO DE "site":
rem A skill design-taste-frontend escreve a pasta site\.taste-skill quando roda
rem o checker e o gate (perfis de Chrome, capturas, caches). Sao cerca de 90 MB,
rem e um dos arquivos do perfil tem 35 MB. O Cloudflare Pages recusa qualquer
rem arquivo acima de 25 MB e a publicacao morre com:
rem   Error: Pages only supports files up to 25 MiB in size
rem O arquivo site\.assetsignore NAO resolve: o Pages ignora esse arquivo.
rem Por isso a publicacao sai de uma copia limpa em .publicar\, sem o .taste-skill.
rem
rem RAMO: nome da branch de PRODUCAO do projeto no Cloudflare.
rem Publicar com outro nome gera so uma previa (ex.: teste.authimports.pages.dev).
rem Para conferir: npx wrangler@4 pages deployment list --project-name authimports
rem e veja a coluna Branch da linha com Environment = Production.
set RAMO=main
set PROJETO=authimports

cd /d "%~dp0"

echo Montando a copia limpa em .publicar ...
if exist ".publicar" rmdir /s /q ".publicar"
robocopy "site" ".publicar" /E /XD ".taste-skill" /NFL /NDL /NJH /NJS /NP >nul
rem robocopy devolve 0..7 em caso de sucesso; 8 ou mais e erro de verdade
if errorlevel 8 (
  echo.
  echo ERRO: nao consegui montar a copia em .publicar
  pause
  exit /b 1
)

echo Publicando ...
call npx -y wrangler@4 pages deploy ".publicar" --project-name %PROJETO% --branch %RAMO% --commit-dirty=true
echo.
pause
