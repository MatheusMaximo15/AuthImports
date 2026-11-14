# Auth Imports — demonstração de site

Protótipo de site para a **Auth Imports**, loja de iPhone seminovo e lacrado.
Feito para apresentar à loja e fechar o trabalho. **Não é o site final.**

O cliente ainda não contratou. Tudo aqui serve para mostrar como o site *pode* ficar.

---

## Como abrir

```bash
node serve.js
```

Abre em `http://localhost:4321/`. A versão antiga fica em `http://localhost:4321/antigo/`.

## Como publicar

Dois cliques em `publicar.cmd`, ou `.\publicar` no terminal dentro da pasta do projeto. Não precisa entrar em `site/`: o `wrangler.jsonc` já diz o projeto (`authimports`) e a pasta. Só `site/` vai para o ar; `PLANO.md`, `CLAUDE.md` e `antigo/` ficam de fora.

Na primeira vez o `wrangler` pede login no Cloudflare pelo navegador. A variável `RAMO` no topo do `publicar.cmd` precisa ser a branch de **produção** do projeto (`main`); com outro nome sai só uma prévia (`<ramo>.authimports.pages.dev`).

Não tem build, não tem dependência. É HTML, CSS e JS servidos direto.

---

## O que tem na pasta

| Caminho | O que é |
|---|---|
| `site/index.html` | a vitrine: hero, aparelhos na loja hoje, tabela de encomenda, como a compra funciona |
| `site/troca.html` | simulador de troca |
| `site/estoque.html`, `catalogo.html`, `contato.html` | redirecionam para a inicial (endereços antigos) |
| `site/assets/loja.js` | número do WhatsApp e Instagram da loja |
| `site/assets/pagina.js` | menu, botões de WhatsApp e Instagram, botão flutuante, ficha |
| `site/assets/catalogo.js` | os 39 aparelhos e a ficha técnica |
| `site/assets/img/` | logo da loja e 38 recortes de produto |
| `site/assets/` (resto) | kit de design (ver aviso abaixo) |
| `PLANO.md` | **leia antes de mexer** — decisões, fases, modelo de dados |
| `antigo/` | versão antiga, arquivo único (`authimports-demo.html`) e a fonte dela (`src/`). Serve de "antes e depois" |
| `publicar.cmd` | publica o site no Cloudflare Pages |
| `wrangler.jsonc` | configuração da publicação: projeto e pasta |
| `serve.js` | servidor local de teste |

---

## De onde veio o conteúdo

Tudo foi extraído das três páginas públicas da loja no Canva, em novembro de 2026:

- `authimports.my.canva.site/iphones-pronta-entrega`
- `authimports.my.canva.site/seminovos`
- `authimports.my.canva.site/lacrados`

As páginas do Canva não usam `<img>`: renderizam a partir de um JSON embutido. Os dados saíram desse JSON, o que permitiu casar cada foto com o produto certo pela posição no layout.

**Logo:** extraída do site deles, invertida para branco e montada em versão horizontal — a original é empilhada e fica ilegível em barra de navegação.

**Fotos:** os PNG originais já vêm recortados. Cada um mostra o aparelho **de frente e de costas no mesmo arquivo**, com sobreposição — por isso não dá para separar as duas vistas sem cortar o aparelho ao meio.

**Preços:** os deles, de novembro de 2026. Conferir antes de qualquer apresentação.

---

## Como foi construído

Sobre a skill `design-taste-frontend` (tasteskill 2.5). Estrutura, hero e ritmo vieram do método dela.

- Paleta **preto e branco**: pedido do cliente, gerada a partir do preto do logo da loja
- Tipografia Instrument Serif + Instrument Sans
- Hero `product`, nav `nav-split`, botões `pill`
- Cinco páginas: início, estoque, catálogo, troca e contato

A primeira versão era preto com verde neon e o cliente achou "cara de IA". A segunda foi papel quente com nogueira; o cliente pediu preto e branco.

### Verificação

```bash
S=~/.claude/skills/design-taste-frontend
node $S/scripts/copy-lint.mjs site/index.html --kind product
node $S/assets/layout/check.mjs --url site/index.html --profile .taste-skill/chrome --sizes 1440x900,390x844
node $S/scripts/gate.mjs site/index.html
```

O gate tem falhas conhecidas na grade de catálogo (cards repetidos, inerente a loja). Justificativas em `site/.taste-skill/waivers.json` (não versionado). Veja também "Armadilhas conhecidas" no `CLAUDE.md`.

---

## Avisos para quem continuar

**1. Não copiar a Medina Store.**
`medinastore.com.br` é a referência que o cliente mandou. Analisada em 13/11/2026, com o que aproveitar e o que evitar no `PLANO.md` seção 6. **A paleta laranja é a identidade deles.**

**2. O 3D foi removido, de propósito.**
Render parado e aparelho feito de primitivas não convenceram, e modelo real esbarra em direito de desenho industrial da Apple. Decisão: usar as fotos reais da loja.

**3. Divergência de preço no site atual deles.**
iPhone 13 Pro Max 128GB: R$ 3.099 numa página, R$ 3.199 na outra. Mantive o da pronta entrega. É argumento de venda e precisa ser resolvido na migração.

**4. A troca usa valores fictícios.**
Tabela no topo de `site/assets/troca.js`, avisada na tela. Trocar pela tabela real da loja.

**5. Publicar não é automático.**
O Cloudflare Pages não está ligado ao GitHub. Rode `publicar.cmd`.

---

## Onde paramos e próximo passo

Estado detalhado no `CLAUDE.md`, seção "Onde paramos". Fases 1, 2 e 3 prontas, Fase 5 adiantada com valores fictícios, campanha de demonstração na inicial.

Próximo: Fase 4 (Supabase e painel), só depois que o cliente fechar. Antes disso, dá para fazer rascunho das páginas institucionais (Fase 6).
