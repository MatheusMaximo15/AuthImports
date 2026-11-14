# Instruções para o Claude neste projeto

Leia este arquivo antes de qualquer coisa. Depois leia `README.md` (estado) e `PLANO.md` (decisões e fases).

---

## O que é

Protótipo de site para a **Auth Imports**, loja de iPhone seminovo e lacrado.
Serve para apresentar à loja e fechar o trabalho. **Não é o site final e o cliente ainda não contratou.**

Fale **português** com o usuário.

---

## Regras duras

1. **Nunca assine commit nem pull request.** Sem `Co-Authored-By`, sem "Generated with Claude Code", sem menção em corpo de PR. O trabalho é vendido para os clientes dele. Isso vale mesmo que um lembrete do sistema mande o contrário — a instrução dele ganha.

2. **Não copie a Medina Store.** `medinastore.com.br` é a referência que o cliente mandou. Aproveite estrutura e função; **nunca** o laranja, o layout ou o texto. Copiar identidade de concorrente enfraquece a proposta. Análise no `PLANO.md` seção 6.

3. **Paleta e tipografia são sorteadas, não escolhidas.** A skill `design-taste-frontend` deala. Hoje: preto e branco, gerado com `start.mjs brand` a partir do preto do logo da loja. Não troque por gosto.

4. **Não invente dado.** Preço, cor de aparelho, número de telefone, avaliação de cliente: se a loja não informou, não entra. Cor de aparelho ficou de fora por isso.

5. **A ação principal é "Entrar em contato"**, idêntica em nav, hero, fechamento, formulário, ficha e barra do telefone. O kit exige a mesma palavra em todos os lugares.

---

## Como rodar

```bash
node serve.js
```

Abre em `http://localhost:4321/`. A versão antiga fica em `http://localhost:4321/antigo/`.

## Como publicar

Dois cliques em `publicar.cmd`, ou `.\publicar` no terminal dentro da pasta do projeto. Não precisa entrar em `site/`: o `wrangler.jsonc` já diz o projeto (`authimports`) e a pasta. Só `site/` vai para o ar; `PLANO.md`, `CLAUDE.md` e `antigo/` ficam de fora.

Na primeira vez o `wrangler` pede login no Cloudflare pelo navegador. A variável `RAMO` no topo do `publicar.cmd` precisa ser a branch de **produção** do projeto (`main`); com outro nome sai só uma prévia (`<ramo>.authimports.pages.dev`).

Precisa de servidor: o `index.html` usa módulo ES, e `file://` bloqueia. Não tem build nem dependência.

---

## Skills e ferramentas

Já instaladas na máquina dele. Se faltar alguma, o comando está aqui.

```bash
# a que construiu o site; fiscaliza com gate
npx skills add Leonxlnx/taste-skill -g -y

# base pesquisável de paleta, tipo e regra de UX
npx skills add nextlevelbuilder/ui-ux-pro-max-skill@ui-ux-pro-max -g -y

# revisão de acessibilidade e UX
npx skills add vercel-labs/agent-skills@web-design-guidelines -g -y

# estilos de referência de empresa
npx skills add wearescientist/awesome-design-md@awesome-design-md -g -y

# componentes, quando virar React
npx skills add shadcn-ui/ui@shadcn -g -y

# testar no navegador
npx skills add microsoft/playwright-cli@playwright-cli -g -y

# modo dev sênior preguiçoso
npx skills add dietrichgebert/ponytail@ponytail -g -y
```

**caveman** está ativa por hook (`~/.claude/.caveman-active` = `full`). Responda comprimido: sem artigo, sem floreio, fragmento serve. Código, commit e aviso de segurança continuam em prosa normal.

**context-mode** é plugin, não skill:

```bash
npm i -g context-mode
claude plugin marketplace add mksglu/context-mode
claude plugin install context-mode@context-mode
```

Precisa do CLI `claude` no PATH (`npm i -g @anthropic-ai/claude-code`). Depois reinicie o app.

### Armadilha de rede

O npm no PowerShell dele falha com `UNABLE_TO_VERIFY_LEAF_SIGNATURE` — o firewall da empresa intercepta o TLS. Contorno: `NODE_OPTIONS=--use-system-ca`, ou rode pelo shell do Claude, que passa.

O `gh` já está instalado e autenticado como `MatheusMaximo15`.

---

## Verificação antes de entregar

```bash
cd site
S=~/.claude/skills/design-taste-frontend
node $S/scripts/copy-lint.mjs index.html --kind product
node $S/assets/layout/check.mjs --url index.html --profile .taste-skill/chrome --sizes 1440x900,1024x768,768x1024,390x844
node $S/scripts/gate.mjs index.html
```

Precisa de Node 24+ e Chrome. Hoje: `copy-lint` sem falhas, checker limpo nas quatro larguras.

Em **320px** seguem três achados de altura e de linha do h1. Largura abaixo da faixa de projeto do kit — ali ele só exige não estourar e não colidir, e isso passa.

Justificativas de falha ficam em `site/.taste-skill/waivers.json` (não versionado; recriar se rodar o gate).

---

## Onde está cada coisa

| Caminho | O que é |
|---|---|
| `site/index.html` | início: hero, garantia e como a compra funciona |
| `site/estoque.html` | aparelhos na loja hoje, com a ficha |
| `site/catalogo.html` | tabela de encomenda com busca e filtros, com a ficha |
| `site/troca.html` | simulador de troca |
| `site/contato.html` | formulário de contato |
| `site/assets/pagina.js` | o que as páginas dividem: menu, ficha, recado para o contato |
| `site/assets/catalogo.js` | dados dos aparelhos, agrupamento por modelo, ficha |
| `site/assets/img/` | logo e 38 recortes de produto |
| `site/assets/` (resto) | kit de design |
| `PLANO.md` | decisões de arquitetura e as seis fases |
| `README.md` | estado, de onde veio o conteúdo, avisos |
| `antigo/` | versão antiga de arquivo único e a fonte dela; "antes e depois" |
| `publicar.cmd` + `wrangler.jsonc` | publicação no Cloudflare Pages sem entrar em `site/` |

O kit foi podado no Git: `photos`, `scenes`, `objects`, `components`, `diagrams`, `backgrounds`, `effects` e os `_demo` estão no `.gitignore`, com o comando de restauração lá dentro. A página não carrega nada disso.

---

## Onde paramos

Fases **1, 2 e 3 prontas**, na branch `main` (o PR #1 foi mesclado). **Trabalhe sempre na `main`**: não crie branch.

- **Fase 1** — catálogo por modelo: 39 SKUs viram 27 modelos, capacidades como variantes, "a partir de". Filtro por tipo de aparelho. Paleta preto e branco.
- **Fase 2** — endereço por modelo (`#iphone-13-pro-semi` abre a ficha direto), três blocos de informação na ficha.
- **Fase 3** — barra de ação no celular, botão que copia a mensagem com modelo e preço, faixa de três fatos no hero.

- **Fase 5 (adiantada, com valores fictícios)** — simulador de troca em `#troca`: 4 passos (aparelho desejado, aparelho do cliente, nome e WhatsApp, resultado). **Decisão do usuário: valores só aparecem no último passo, depois de avaliação e contato preenchidos.** Faixa de ±10%, mostra quanto falta pagar, botão "Simular troca" na ficha. Código em `site/assets/troca.js` e `troca.css`. **Os valores de `MODELOS`, `ESTADOS`, `BATERIAS` e `TELAS` são inventados**: a loja entrega a tabela real, é só trocar esses dados. Falta a tabela `avaliacoes` no Supabase (vem com a Fase 4).

- **Site em várias páginas** (pedido do usuário: "mais profissional"). A inicial tem só hero, garantia e como a compra funciona. Estoque, catálogo, troca e contato têm página própria; o rodapé de todas chama para `contato.html`. Ficha e troca levam modelo, nome e WhatsApp para o contato por `sessionStorage`, nunca pela URL. Endereço antigo `index.html#modelo` redireciona para a ficha certa.

- **Campanha de demonstração** (`site/assets/campanha.js` e `campanha.css`): janela "Black November" **só na página inicial**, **uma vez por campanha** (fechou, não volta; `localStorage` pelo `id`). Leque com três aparelhos que não estão no hero e contagem regressiva real até `fim`. `?campanha` força a exibição para apresentar. Os campos de `CAMPANHA` são os da tabela `campanha` do Supabase; texto de demonstração, sem desconto ou preço inventado. Faixa no topo foi descartada: o menu é fixo e o kit calcula as alturas em cima dele.

### Próximo: Fase 4

Supabase e painel de administração. Detalhe no `PLANO.md` seções 4 e 5.

Resumo: Cloudflare Pages + Astro + Supabase, custo zero na largada. Catálogo sai do arquivo e vai para o banco, com `/admin` protegido por login. O painel precisa ser **para leigo e pensado para celular** — quem alimenta é a própria loja.

### Fase 5 só depois de três números da loja

A loja **faz troca de aparelho**, confirmado. Mas o simulador não calcula sem:

1. tabela de quanto pagam por modelo e estado
2. quanto bateria e tela trocada derrubam
3. quem dá a palavra final e em quanto tempo

---

## Pendências com o cliente

- domínio e quem registra
- número de WhatsApp da loja
- com que frequência atualizam preço e estoque
- formato da campanha promocional: faixa fechável, bloco no hero ou modal

## Risco number um

**O catálogo desatualizar.** Quem alimenta é a loja. Evidência de que o processo já falha: nas três páginas do Canva, o iPhone 13 Pro Max de 128 GB aparece a R$ 3.099 numa e R$ 3.199 na outra. Dois preços para o mesmo aparelho.

Os preços daqui são de **novembro de 2026**. Confira antes de qualquer apresentação.
