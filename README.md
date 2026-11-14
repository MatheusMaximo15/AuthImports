# Auth Imports — demonstração de site

Protótipo de site para a **Auth Imports**, loja de iPhone seminovo e lacrado.
Feito para apresentar à loja e fechar o trabalho. **Não é o site final.**

O cliente ainda não contratou. Tudo aqui serve para mostrar como o site *pode* ficar.

---

## Como abrir

```bash
node serve.js
```

Abre em `http://localhost:4321/site/`.

Não tem build, não tem dependência. É HTML, CSS e JS servidos direto.

---

## O que tem na pasta

| Caminho | O que é |
|---|---|
| `site/index.html` | início: hero, garantia e como a compra funciona |
| `site/estoque.html` | aparelhos na loja hoje, com a ficha |
| `site/catalogo.html` | tabela de encomenda com busca e filtros, com a ficha |
| `site/troca.html` | simulador de troca |
| `site/contato.html` | formulário de contato |
| `site/assets/pagina.js` | o que as páginas dividem: menu, ficha, recado para o contato |
| `site/assets/catalogo.js` | os 39 aparelhos e a ficha técnica |
| `site/assets/img/` | logo da loja e 38 recortes de produto |
| `site/assets/` (resto) | kit de design (ver aviso abaixo) |
| `PLANO.md` | **leia antes de mexer** — decisões, fases, modelo de dados |
| `authimports-demo.html` | versão antiga, arquivo único. Serve de "antes e depois" |
| `src/` | fonte da versão antiga |
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

Sobre a skill [`design-taste-frontend`](https://skills.sh) (tasteskill 2.5). Paleta, tipografia, hero e momento de rolagem foram **sorteados pela skill**, não escolhidos por gosto — é o método dela.

- Paleta `warm-paper-walnut`: papel quente `#f7f3ec`, tinta `#2a2622`, nogueira `#7a4a2c`
- Tipografia `instrument-serif`: Instrument Serif + Instrument Sans
- Hero `product`, nav `nav-split`, close `close-type`, botões `pill`
- Momento `word-highlight`: a frase da garantia acende palavra por palavra ao rolar

A primeira versão era preto com verde neon. O cliente achou "cara de IA" — com razão: near-black com um verde ácido é um dos padrões que as próprias regras de design do Claude listam como marca de página gerada por IA.

### Verificação

```bash
S=~/.claude/skills/design-taste-frontend
node $S/scripts/copy-lint.mjs site/index.html --kind product
node $S/assets/layout/check.mjs --url site/index.html --profile .taste-skill/chrome --sizes 1440x900,390x844
node $S/scripts/gate.mjs site/index.html
```

`copy-lint` passa sem falhas. O gate fechou com **6 falhas abertas**, 5 delas a mesma: grade de catálogo com cards repetidos — inerente a catálogo de loja. As justificativas estão em `site/.taste-skill/waivers.json` (não versionado; recriar se precisar rodar o gate).

---

## Avisos para quem continuar

**1. Três alterações pendentes em `assets/catalogo.js`.**
Cálculo de desconto à vista e duas linhas novas na ficha estão prontos. O **selo de porcentagem no card está sem CSS** — os dois selos se empilham no mesmo canto. Terminar ou desfazer.

**2. O kit de design pesa 37 MB e a página usa uma fração.**
Carregado de verdade: `system.css`, `ui/cards.css`, `ui/base.css`, `motion/motion.css`, `layout/layout.css`, `icons/icon.css`, `system.js`, `motion/motion.js`, `layout/layout.js`, `ui/ui.js`, `moments/moments.js`, `moments/lib.js`, `moments/word-highlight/*`.
As pastas `photos`, `scenes`, `objects`, `components`, `diagrams` e `backgrounds` não são usadas. Dá para podar.

**3. Não copiar a Medina Store.**
`medinastore.com.br` é a referência que o cliente mandou. Analisada em 13/11/2026, com o que aproveitar e o que evitar no `PLANO.md` seção 6. **A paleta laranja é a identidade deles** — copiar enfraquece justamente o argumento da proposta.

**4. O 3D foi removido, de propósito.**
Teve render parado e teve aparelho feito de primitivas. Nenhum dos dois convenceu. Modelo de verdade precisa de malha real (Blender ou um glTF licenciado) e esbarra em direito de desenho industrial da Apple. Decisão: usar as fotos reais da loja.

**5. Divergência de preço no site atual deles.**
iPhone 13 Pro Max 128GB: R$ 3.099 numa página, R$ 3.199 na outra. Mantive o da pronta entrega. É bom argumento de venda e precisa ser resolvido na migração.

---

## Próximo passo

Fase 1 do `PLANO.md`: agrupar o catálogo **por modelo com variantes**, em vez de 39 SKUs soltos. Vira cerca de 24 cards com chips de capacidade e "a partir de R$ X".

É a maior melhoria estrutural pendente, e a que mais aproxima do que a referência faz bem.
