@echo off
rem Publica o site no Cloudflare Pages (authimports.pages.dev).
rem Use com dois cliques neste arquivo, ou digite .\publicar no terminal dentro de E:\AuthImports.
rem So a pasta "site" vai para o ar (configurado no wrangler.jsonc).
rem
rem RAMO: nome da branch de PRODUCAO do projeto no Cloudflare.
rem Publicar com outro nome gera so uma previa (ex.: main.authimports.pages.dev).
rem Para descobrir o nome certo: npx wrangler@4 pages deployment list --project-name authimports
rem e veja a coluna Branch da linha com Environment = Production.
rem Hoje a producao do projeto e a branch do PR #1. Se um dia mudar no painel do Cloudflare, troque aqui.
set RAMO=fase-1/catalogo-por-modelo

cd /d "%~dp0"
call npx -y wrangler@4 pages deploy --branch %RAMO% --commit-dirty=true
echo.
pause
