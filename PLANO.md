# Auth Imports — plano do site

Documento de trabalho. Atualizado em 13 de novembro de 2026.

---

## 1. Decisões já tomadas

| Tema | Decisão |
|---|---|
| Entrega | Arquivos locais. Sem artifact do Claude. |
| Hospedagem | **Cloudflare Pages**. Plano gratuito permite uso comercial, banda ilimitada, CDN e certificado inclusos. |
| Vercel | **Descartado.** Tecnicamente bom, mas o plano Hobby é de uso não comercial e o pago sai ~US$ 20/mês. |
| Framework | **Astro** com adaptador Cloudflare (ver seção 3) |
| Banco e autenticação | **Supabase** |
| Planilha como fonte | **Descartado** |
| Custo inicial | **Zero**. Nada de serviço pago na largada. |
| Fonte | Google Fonts. Nada de licença paga (a Medina usa TT Norms Pro, que é paga). |
| Identidade | Paleta própria. **Não** copiar o laranja da Medina. |
| Troca de aparelho | **A loja faz.** Fase 5 confirmada, deixa de ser condicional. |
| Quem alimenta o catálogo | **A própria loja.** Painel precisa ser para leigo, não para técnico. |

Ação principal do site: **"Entrar em contato"**, idêntica em nav, hero, fechamento, formulário, ficha e barra do telefone — o kit exige que seja a mesma palavra em todos.

### O que ainda não foi decidido

- Domínio (`authimports.com.br` ou outro) e quem registra
- Número de WhatsApp da loja (sem ele o botão copia a mensagem em vez de abrir a conversa)
- Com que frequência a loja atualiza preço e estoque (ver seção 7, risco 1)
- Formato da campanha promocional: **na demonstração ficou modal ao abrir** (`assets/campanha.js`); confirmar com a loja
- Se a loja quer receber o pedido de troca por WhatsApp ou por e-mail

---

## 2. Estado atual

Protótipo pronto e revisado, em `site/`:

- `index.html` — página única, 6 seções
- `assets/catalogo.js` — dados dos 39 aparelhos e a ficha
- `assets/img/` — logo da loja e 38 recortes de produto, extraídos dos PNG originais do Canva
- `assets/` — kit de design (CSS/JS do sistema, movimento, layout, momentos)

Construído sobre a skill `design-taste-frontend`: paleta e tipografia sorteadas (papel quente + nogueira, Instrument Serif), hero sorteado, um momento de rolagem sorteado. Passou no `copy-lint` sem falhas. O gate fechou com 6 falhas abertas, 5 delas a mesma: grade de catálogo com cards repetidos, que é inerente a catálogo de loja.

### Pendência no código

Três alterações começadas e **não terminadas** em `assets/catalogo.js`:

1. cálculo do desconto à vista — pronto
2. selo de porcentagem no card — **sem o CSS**, os dois selos se empilham no mesmo canto
3. linhas "Acompanha" e "Desconto à vista" na ficha — pronto

Decidir: desfazer ou terminar junto da Fase 1.

---

## 3. Arquitetura alvo

```
Cloudflare Pages  (runtime Workers, CDN global, certificado)
 └── Astro + adaptador Cloudflare
      ├── páginas públicas  → renderizadas no servidor, indexáveis
      │     └── cache em KV  → servem mesmo com o Supabase fora
      └── /admin            → protegido por login
            └── Supabase (Postgres + Auth + Storage)
```

### Por que Astro e não Next.js

Cloudflare Pages roda no runtime **Workers**, não em Node. Next.js funciona lá, mas precisa de camada de compatibilidade (`@cloudflare/next-on-pages` ou OpenNext), e o ISR do Next não funciona nativamente — vira atrito de manutenção.

Astro tem adaptador oficial da Cloudflare, é mais leve e foi feito para site de conteúdo com ilhas de interatividade. Que é exatamente o que um catálogo é: páginas estáticas com busca e filtro.

### Por que renderizar no servidor, e não página estática pura

A Medina é uma SPA que busca os dados no navegador. Resultado: **tela de carregamento com logo em toda troca de rota**, e catálogo que o Google não lê direito. Se a gente repetir isso, repete o defeito.

Renderizando no servidor e cacheando, resolve três coisas:

- catálogo indexável no Google — principal ganho de SEO do projeto
- sem tela de carregamento
- página continua respondendo mesmo com o Supabase fora do ar

### Risco do plano gratuito do Supabase

**Projeto gratuito é pausado após cerca de uma semana sem atividade.** Loja com pouco tráfego pode bater nisso e o site aparecer vazio.

Mitigação: cache em Cloudflare KV, revalidado quando o painel salva. A página serve a última versão boa mesmo com o banco pausado. Confirmar os limites vigentes do plano gratuito na hora de criar o projeto — eles mudam.

### Custo total na largada

Zero. Cloudflare Pages gratuito, Supabase gratuito. O único gasto é o domínio: `.com.br` sai por volta de R$ 40 ao ano no Registro.br, e quem paga é o cliente.

---

## 4. Modelo de dados (Supabase)

Rascunho inicial. O ponto central é **modelo com variantes**, não SKU solto — é a diferença estrutural que a Medina acertou e o nosso protótipo ainda não tem.

### `modelos`
| coluna | tipo | nota |
|---|---|---|
| `id` | uuid | |
| `nome` | text | "iPhone 13 Pro" |
| `categoria` | text | iphone, ipad, mac, watch, acessorio |
| `geracao` | int | para o filtro por geração |
| `ordem` | int | ordenação manual na vitrine |
| `ativo` | bool | |

### `variantes`
| coluna | tipo | nota |
|---|---|---|
| `id` | uuid | |
| `modelo_id` | uuid | |
| `armazenamento` | text | "128GB" |
| `cor` | text | |
| `condicao` | text | lacrado, seminovo |
| `preco_vista` | int | centavos |
| `preco_parcelado` | int | centavos, total em 10x |
| `bateria` | int | null quando lacrado |
| `garantia_meses` | int | 6 ou 12 |
| `pronta_entrega` | bool | o "na loja hoje" |
| `disponivel` | bool | gera o estado "indisponível" no card |
| `foto_id` | text | referência no Storage |

O card mostra `a partir de` = menor `preco_vista` entre as variantes do modelo.

### `campanha`
| coluna | tipo |
|---|---|
| `ativa` | bool |
| `titulo` | text |
| `linha` | text |
| `validade` | date |
| `cor` | text |
| `link` | text |
| `imagem_id` | text |
| `inicio` / `fim` | timestamp — agendamento |

Campanha é **texto vivo com campos**, não imagem com texto embutido. A Medina sobe um PNG com "Black November" escrito dentro: não indexa, não se adapta no celular, e exige designer toda vez que muda uma data.

### `textos`
Pares chave/valor para hero, garantia, entrega e os fatos da faixa de confiança.

### `pedidos`
Registro dos formulários de "pedir o vídeo": nome, whatsapp, variante, data, origem.

### Segurança
RLS ligada em tudo. Leitura pública apenas nas colunas que a vitrine usa. Escrita só para usuário autenticado com papel de administrador. Nunca expor a chave de serviço no navegador — só a chave anônima, e ela só enxerga o que a RLS permite.

---

## 5. Fases

### Fase 1 — estrutura do catálogo
1. Agrupar por modelo com variantes. 39 SKUs viram cerca de 24 cards.
2. Chips de capacidade no card; preço reage à escolha.
3. "A partir de R$ X" quando houver mais de uma variante.
4. Chips de categoria: Todos, iPhone, iPad, Mac, Watch.
5. Seções nomeadas em vez de paginação.
6. Estado "indisponível" no card.
7. Terminar ou desfazer o selo de desconto pendente.

### Fase 2 — página de produto
8. Endereço próprio por modelo — o principal ganho de SEO.
9. Chips de capacidade e cor, com variante indisponível apagada.
10. Sanfonas de garantia, pagamento e entrega.
11. Desconto à vista em número. O 13 Pro sai R$ 416 mais barato à vista; ninguém mostra isso.

### Fase 3 — conversão
12. Barra de ação fixa no rodapé do celular.
13. Mensagem de WhatsApp pronta por aparelho.
14. Faixa de confiança sob o hero.
15. Meta Pixel e GA4 — **passo de deploy, não de protótipo.** Exigem IDs reais que a loja ainda não tem, e script de rastreio com ID falso não mede nada. Entra junto com o domínio.

### Fase 4 — Supabase e painel
16. Projeto no Supabase, tabelas acima, RLS.
17. Migrar os 39 aparelhos do arquivo para o banco.
18. Login de administrador (Supabase Auth, e-mail e senha).
19. `/admin` — lista de modelos, edição de variante, upload de foto no Storage.
20. Bloco de campanha com liga/desliga e agendamento.
21. Edição dos textos do hero e das seções.
22. Deploy no Cloudflare Pages, ligado ao repositório: push na branch principal publica sozinho.
23. Cache em KV com revalidação disparada pelo painel ao salvar.

### Fase 5 — troca de aparelho
**Confirmado: a loja faz troca.**

> **Estado:** simulador pronto na demonstração (`site/assets/troca.js`), com valores **fictícios**. Item 28 (tabela `avaliacoes`) e a tabela real da loja continuam pendentes.

24. Assistente de 4 passos, com indicador numerado: escolher aparelho, avaliar o atual, ver a simulação, combinar a entrega.
25. Avaliação do aparelho do cliente: modelo, armazenamento, saúde da bateria, tela original sim/não, estado de conservação em três níveis.
26. **Faixa** de valor, nunca número fechado, com a ressalva de que depende de avaliação presencial. Exemplo: "de R$ 1.400 a R$ 1.700".
27. Encaminhamento para o WhatsApp com o resumo da avaliação já escrito.
28. Tabela `avaliacoes` no Supabase: cada simulação vira registro. A loja passa a ter histórico do que o cliente declarou.

#### O que a loja precisa definir antes

Não é tela, é operação. Três perguntas:

- **Tabela de entrada.** Quanto a loja paga por cada modelo em cada estado. Sem isso, a simulação não calcula nada.
- **Quanto a bateria e a tela trocada derrubam o valor.** Percentual ou valor fixo.
- **Quem dá a palavra final** e em quanto tempo.

Com esses três números o cálculo é simples: valor base do modelo, menos desconto por estado, menos desconto por bateria abaixo de um limite, menos desconto se a tela não for original. A faixa sai de ±10% sobre o resultado.

#### Dá para fazer melhor que a referência

A Medina tem esse fluxo e **está quebrado agora**: o campo "Modelo do iPhone" mostra "Nenhum modelo disponível". A lista de modelos aceitos está vazia.

Duas melhorias sobre o deles:
- Mostrar **quanto falta pagar** já na simulação, não só o valor do usado. É a pergunta que o cliente tem na cabeça.
- ~~Deixar simular sem preencher contato.~~ **Revisto:** o cliente pediu que os valores apareçam só no final, depois de avaliação e contato preenchidos. O contato vira o passo 3 e o resultado o passo 4. Diferença para a Medina: o nosso pede o contato depois das perguntas sobre o aparelho, não antes.

### Fase 6 — institucional
27. Páginas de garantia, entrega, trocas e devoluções, privacidade, termos.

Hoje a Auth Imports não tem nenhuma. Loja que vende sem política de troca publicada fica exposta no Código de Defesa do Consumidor.

---

## 6. O que a referência ensinou

A Medina Store (`medinastore.com.br`), analisada em 13/11/2026. Construída sob medida pela onethsoftwares, React com Tailwind, 607 KB, GTM + GA4 + Google Ads + Meta Pixel.

**Aproveitar:** catálogo por modelo com variantes e "a partir de"; chips de categoria; variante indisponível apagada; sanfonas na página de produto; stepper numerado no fluxo de troca; ressalva jurídica na estimativa.

**Não repetir:** tela de carregamento a cada rota; carrossel no hero; bloco de avaliações do Google vazio; botão de voltar ao topo flutuante; texto dentro de imagem; fonte paga.

---

## 7. Riscos

1. **O catálogo desatualizar.** Maior risco do projeto. Quem alimenta é a própria loja, então o painel tem que ser para leigo.

   A frequência ninguém sabe ainda — mas **o comportamento atual já responde**: nas três páginas do Canva, o iPhone 13 Pro Max de 128GB aparece a R$ 3.099 numa e R$ 3.199 na outra. Ou seja, hoje eles atualizam página por página e esquecem de alguma. O processo já falha.

   Conclusão de projeto: assumir frequência alta e fazer o painel **pensado para o celular**, com edição de preço direto na lista e o "na loja hoje" num toque só. Nada de formulário longo por produto. Se a frequência for baixa, um painel rápido não atrapalha; se for alta, um painel lento mata o projeto.

   Vantagem estrutural do banco: o preço passa a existir **uma vez só**. A divergência de hoje deixa de ser possível.
2. **Supabase gratuito pausa por inatividade.** Mitigado por cache no servidor.
3. **Preços desatualizados na apresentação.** Os do protótipo são de novembro de 2026. Conferir antes de mostrar.
4. **Divergência nas tabelas atuais.** O 13 Pro Max de 128GB sai R$ 3.099 na página de pronta entrega e R$ 3.199 na de seminovos. Dois preços para o mesmo aparelho. Bom argumento de venda, e precisa ser resolvido na migração.
5. **Cliente pedir o laranja da Medina.** Copiar identidade de concorrente enfraquece justamente o argumento da proposta.
