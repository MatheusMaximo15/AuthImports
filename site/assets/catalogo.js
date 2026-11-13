/* Catálogo e ficha do aparelho.
   Os dados vêm das três tabelas públicas da loja (novembro de 2026).

   Fase 1: o catálogo passou a ser POR MODELO, não por SKU. Cada cartão é um
   modelo numa condição ("iPhone 13 Pro, seminovo") e carrega as capacidades
   como variantes. O preço do cartão é o menor das variantes.
   A ficha técnica é a do modelo; estado e bateria são da unidade e vão no vídeo. */

const FICHAS = {
  'ip11':    { tela: '6,1" Liquid Retina', chip: 'A13 Bionic', cam: 'Dupla de 12 MP', porta: 'Lightning', extra: 'Face ID' },
  'ip12':    { tela: '6,1" Super Retina XDR', chip: 'A14 Bionic', cam: 'Dupla de 12 MP', porta: 'Lightning', extra: '5G, Ceramic Shield' },
  'ip13':    { tela: '6,1" Super Retina XDR', chip: 'A15 Bionic', cam: 'Dupla de 12 MP', porta: 'Lightning', extra: 'Modo Cinema' },
  'ip13p':   { tela: '6,1" XDR ProMotion 120 Hz', chip: 'A15 Bionic', cam: 'Tripla de 12 MP', porta: 'Lightning', extra: 'Macro, tele 3x' },
  'ip13pm':  { tela: '6,7" XDR ProMotion 120 Hz', chip: 'A15 Bionic', cam: 'Tripla de 12 MP', porta: 'Lightning', extra: 'Macro, tele 3x' },
  'ip14':    { tela: '6,1" Super Retina XDR', chip: 'A15 Bionic', cam: 'Dupla de 12 MP', porta: 'Lightning', extra: 'Detecção de acidente' },
  'ip14pl':  { tela: '6,7" Super Retina XDR', chip: 'A15 Bionic', cam: 'Dupla de 12 MP', porta: 'Lightning', extra: 'Detecção de acidente' },
  'ip14p':   { tela: '6,1" XDR ProMotion 120 Hz', chip: 'A16 Bionic', cam: 'Tripla, principal de 48 MP', porta: 'Lightning', extra: 'Dynamic Island' },
  'ip14pm':  { tela: '6,7" XDR ProMotion 120 Hz', chip: 'A16 Bionic', cam: 'Tripla, principal de 48 MP', porta: 'Lightning', extra: 'Dynamic Island' },
  'ip15':    { tela: '6,1" Super Retina XDR', chip: 'A16 Bionic', cam: 'Dupla, principal de 48 MP', porta: 'USB‑C', extra: 'Dynamic Island' },
  'ip15p':   { tela: '6,1" XDR ProMotion 120 Hz', chip: 'A17 Pro', cam: 'Tripla, principal de 48 MP', porta: 'USB‑C', extra: 'Titânio, Botão de Ação' },
  'ip15pm':  { tela: '6,7" XDR ProMotion 120 Hz', chip: 'A17 Pro', cam: 'Tripla, tele de 5x', porta: 'USB‑C', extra: 'Titânio, Botão de Ação' },
  'ip16':    { tela: '6,1" Super Retina XDR', chip: 'A18', cam: 'Dupla, principal de 48 MP', porta: 'USB‑C', extra: 'Controle da Câmera' },
  'ip16p':   { tela: '6,3" XDR ProMotion 120 Hz', chip: 'A18 Pro', cam: 'Tripla, principal de 48 MP', porta: 'USB‑C', extra: 'Titânio, tele de 5x' },
  'ip16pm':  { tela: '6,9" XDR ProMotion 120 Hz', chip: 'A18 Pro', cam: 'Tripla, principal de 48 MP', porta: 'USB‑C', extra: 'Titânio, tele de 5x' },
  'ip17':    { tela: '6,3" Super Retina XDR', chip: 'A19', cam: 'Dupla, principal de 48 MP', porta: 'USB‑C', extra: 'ProMotion' },
  'ip17p':   { tela: '6,3" XDR ProMotion 120 Hz', chip: 'A19 Pro', cam: 'Tripla, principal de 48 MP', porta: 'USB‑C', extra: 'Titânio' },
  'ip17pm':  { tela: '6,9" XDR ProMotion 120 Hz', chip: 'A19 Pro', cam: 'Tripla, principal de 48 MP', porta: 'USB‑C', extra: 'Titânio' },
  'ipad9':   { tela: '10,2" Retina', chip: 'A13 Bionic', cam: '8 MP atrás, 12 MP na frente', porta: 'Lightning', extra: 'Compatível com Apple Pencil' },
  'mac':     { chip: 'Apple M2', cam: 'Câmera FaceTime HD de 1080p', porta: 'MagSafe e dois USB‑C', extra: '8 GB de memória, SSD de 256 GB' },
  'watch5':  { tela: 'Retina sempre ativa', chip: 'S5 SiP', porta: 'Carregador magnético', extra: 'GPS, caixa de 44 mm' },
  'watchse': { tela: 'Retina', chip: 'S8 SiP', porta: 'Carregador magnético', extra: 'GPS, detecção de acidente, 44 mm' }
};

// n modelo · s GB · k condição · p total em 10x · v à vista · b bateria · bn bateria nova
// g garantia em meses · r pronta entrega · img foto · f ficha · y geração
const P = [
  { n:'iPhone 11', s:256, k:'semi', p:1780, v:1549, b:100, bn:1, g:6, r:1, img:'ip11', f:'ip11', y:11 },
  { n:'iPhone 12', s:128, k:'semi', p:2060, v:1799, b:100, bn:1, g:6, r:1, img:'ip12', f:'ip12', y:12 },
  { n:'iPhone 13', s:128, k:'semi', p:2640, v:2299, g:6, img:'ip13', f:'ip13', y:13 },
  { n:'iPhone 13', s:256, k:'semi', p:2985, v:2599, g:6, img:'ip13_256', f:'ip13', y:13 },
  { n:'iPhone 13 Pro', s:128, k:'semi', p:3215, v:2799, g:6, img:'ip13pro', f:'ip13p', y:13 },
  { n:'iPhone 13 Pro', s:256, k:'semi', p:3560, v:3099, g:6, img:'ip13pro256', f:'ip13p', y:13 },
  { n:'iPhone 13 Pro Max', s:128, k:'semi', p:3560, v:3099, b:100, bn:1, g:6, r:1, img:'ip13pm', f:'ip13pm', y:13 },
  { n:'iPhone 13 Pro Max', s:256, k:'semi', p:4135, v:3599, g:6, img:'ip13pm256', f:'ip13pm', y:13 },
  { n:'iPhone 14', s:128, k:'semi', p:2985, v:2599, g:6, img:'ip14', f:'ip14', y:14 },
  { n:'iPhone 14', s:256, k:'semi', p:3330, v:2899, g:6, img:'ip14_256', f:'ip14', y:14 },
  { n:'iPhone 14 Plus', s:128, k:'semi', p:3100, v:2699, b:86, g:6, r:1, img:'ip14plus', f:'ip14pl', y:14 },
  { n:'iPhone 14 Pro', s:128, k:'semi', p:3675, v:3199, g:6, img:'ip14pro', f:'ip14p', y:14 },
  { n:'iPhone 14 Pro', s:256, k:'semi', p:4020, v:3499, g:6, img:'ip14pro256', f:'ip14p', y:14 },
  { n:'iPhone 14 Pro Max', s:128, k:'semi', p:4250, v:3699, g:6, img:'ip14pm', f:'ip14pm', y:14 },
  { n:'iPhone 14 Pro Max', s:256, k:'semi', p:4595, v:3999, g:6, img:'ip14pm256', f:'ip14pm', y:14 },
  { n:'iPhone 15', s:128, k:'semi', p:3675, v:3199, b:100, bn:1, g:6, r:1, img:'ip15_pronta', f:'ip15', y:15 },
  { n:'iPhone 15', s:256, k:'semi', p:3900, v:3399, b:89, g:6, r:1, img:'ip15', f:'ip15', y:15 },
  { n:'iPhone 15 Pro', s:128, k:'semi', p:4365, v:3799, g:6, img:'ip15pro', f:'ip15p', y:15 },
  { n:'iPhone 15 Pro', s:256, k:'semi', p:4710, v:4099, g:6, img:'ip15pro256', f:'ip15p', y:15 },
  { n:'iPhone 15 Pro Max', s:256, k:'semi', p:5280, v:4599, g:6, img:'ip15pm', f:'ip15pm', y:15 },
  { n:'iPhone 16', s:128, k:'semi', p:4595, v:3999, g:6, img:'ip16', f:'ip16', y:16 },
  { n:'iPhone 16 Pro', s:128, k:'semi', p:5280, v:4599, g:6, img:'ip16pro', f:'ip16p', y:16 },
  { n:'iPhone 16 Pro', s:256, k:'semi', p:5630, v:4899, g:6, img:'ip16pro256', f:'ip16p', y:16 },
  { n:'iPhone 16 Pro Max', s:256, k:'semi', p:6030, v:5249, b:90, g:6, r:1, img:'ip16pm', f:'ip16pm', y:16 },
  { n:'iPhone 17 Pro Max', s:256, k:'semi', p:8040, v:6999, b:96, g:6, r:1, img:'ip17pm', f:'ip17pm', y:17 },
  { n:'iPad 9', s:64, k:'semi', p:2060, v:1799, b:97, g:6, r:1, img:'ipad9', f:'ipad9', y:9 },
  { n:'MacBook M2', s:256, k:'semi', p:5500, v:4799, b:89, g:6, r:1, img:'mac', f:'mac', y:15 },
  { n:'Apple Watch S5 Nike 44 mm', s:0, k:'semi', p:1149, v:999, b:84, g:6, r:1, img:'watch5', f:'watch5', y:5 },
  { n:'Apple Watch SE 2 44 mm', s:0, k:'semi', p:1665, v:1449, b:100, g:6, r:1, img:'watchse', f:'watchse', y:10, nota:'Garantia Apple até junho de 2027' },

  { n:'iPhone 15', s:128, k:'lacrado', p:4940, v:4299, g:12, img:'ip15lac', f:'ip15', y:15 },
  { n:'iPhone 16', s:128, k:'lacrado', p:5510, v:4799, g:12, img:'ip16', f:'ip16', y:16 },
  { n:'iPhone 17', s:256, k:'lacrado', p:6660, v:5799, g:12, img:'ip17', f:'ip17', y:17 },
  { n:'iPhone 17 Pro', s:256, k:'lacrado', p:8499, v:7399, g:12, img:'ip17pro', f:'ip17p', y:17 },
  { n:'iPhone 17 Pro Max', s:256, k:'lacrado', p:8960, v:7799, g:12, img:'ip17pm', f:'ip17pm', y:17 },
  { n:'iPhone 17 Pro Max', s:512, k:'lacrado', p:10900, v:9499, g:12, img:'ip17pm512', f:'ip17pm', y:17 },
  { n:'iPhone 18 Pro', s:256, k:'lacrado', p:10100, v:8799, g:12, img:'ip18pro', y:18 },
  { n:'iPhone 18 Pro', s:512, k:'lacrado', p:11700, v:10199, g:12, img:'ip18pro512', y:18 },
  { n:'iPhone 18 Pro Max', s:256, k:'lacrado', p:11250, v:9799, g:12, img:'ip18pm', y:18 },
  { n:'iPhone 18 Pro Max', s:512, k:'lacrado', p:13430, v:11699, g:12, img:'ip18pm512', y:18 }
];

/* ---------- agrupamento por modelo ---------- */

function categoria(nome) {
  if (/^iPad/.test(nome)) return 'ipad';
  if (/^MacBook/.test(nome)) return 'mac';
  if (/^Apple Watch/.test(nome)) return 'watch';
  return 'iphone';
}

const slug = s => s.toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Um grupo = um modelo numa condição. As capacidades viram variantes. */
export const G = (() => {
  const mapa = new Map();
  P.forEach(p => {
    const chave = p.n + '|' + p.k;
    if (!mapa.has(chave)) {
      mapa.set(chave, {
        id: slug(p.n + '-' + p.k),
        n: p.n, k: p.k, g: p.g, y: p.y,
        cat: categoria(p.n),
        vars: []
      });
    }
    mapa.get(chave).vars.push(p);
  });
  const lista = [...mapa.values()];
  lista.forEach(gr => {
    gr.vars.sort((a, b) => a.s - b.s);
    gr.min = Math.min(...gr.vars.map(v => v.v));
    gr.pronta = gr.vars.some(v => v.r);
    gr.img = (gr.vars.find(v => v.r) || gr.vars[0]).img;
  });
  return lista;
})();

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const desconto = v => Math.round((1 - v.v / v.p) * 100);
export const nomeVar = (gr, v) => gr.n + (v.s ? ' de ' + v.s + ' GB' : '');

/* ---------- cartão ---------- */

function cartao(gr) {
  const selo = gr.pronta
    ? '<span class="sel sel--agora">Na loja hoje</span>'
    : (gr.k === 'lacrado' ? '<span class="sel">Lacrado</span>' : '');

  const chips = gr.vars.filter(v => v.s).map(v =>
    `<span class="cap">${v.s} GB</span>`).join('');

  const varios = gr.vars.length > 1;

  return `<a class="tile prod span-3" href="#${gr.id}" id="${gr.id}" data-grupo="${gr.id}">
  <div class="tile__media">${selo}<img src="assets/img/${gr.img}.webp" alt="${esc(gr.n)}, de frente e de costas" loading="lazy" width="320" height="320"></div>
  <div class="tile__head"><h3>${esc(gr.n)}</h3></div>
  <p class="tile__facts">${gr.k === 'lacrado' ? 'Lacrado' : 'Seminovo'}<span class="f-gar"> · ${gr.g} meses de garantia</span></p>
  ${chips ? `<div class="caps">${chips}</div>` : ''}
  <p class="prod__preco">${varios ? '<span class="prod__apd">A partir de</span>' : ''}<b>${brl.format(gr.min)}</b></p>
</a>`;
}

export function montarCatalogo(alvo, lista) {
  alvo.innerHTML = lista.map(cartao).join('');
}

/* ---------- a ficha, num <dialog> ---------- */

let dlg, atual = null, iVar = 0;

function linhas(gr, v) {
  const f = FICHAS[v.f];
  const rows = [];
  if (v.s) rows.push(['Armazenamento', v.s + ' GB']);
  if (f && f.tela) rows.push(['Tela', f.tela]);
  if (f && f.chip) rows.push(['Chip', f.chip]);
  if (f && f.cam) rows.push(['Câmera', f.cam]);
  if (f && f.porta) rows.push(['Conexão', f.porta]);
  if (f && f.extra) rows.push(['Também tem', f.extra]);
  rows.push(['Condição', gr.k === 'lacrado' ? 'Lacrado, caixa fechada' : 'Seminovo, testado pela loja']);
  rows.push(['Garantia', gr.g + ' meses pela loja']);
  rows.push(['Acompanha', gr.k === 'lacrado' ? 'Caixa fechada e nota' : 'Cabo, carregador e nota']);
  if (v.b) rows.push(['Saúde da bateria', v.b + '%' + (v.bn ? ', bateria nova' : '')]);
  rows.push(['Disponibilidade', v.r ? 'Na loja hoje' : 'Sob encomenda, no mesmo dia']);
  const corte = desconto(v);
  if (corte > 0) rows.push(['Desconto à vista', brl.format(v.p - v.v) + ' a menos que o parcelado']);
  if (v.nota) rows.push(['Observação', v.nota]);
  if (!f) rows.push(['Ficha técnica', 'A loja confirma no WhatsApp.']);
  return rows;
}

function pintarFicha() {
  const gr = atual, v = gr.vars[iVar];
  dlg.querySelector('.ficha__nome').textContent = nomeVar(gr, v);
  dlg.querySelector('.ficha__linha').textContent =
    (gr.k === 'lacrado' ? 'Lacrado' : 'Seminovo') + ' · ' + gr.g + ' meses de garantia pela loja';
  dlg.querySelector('.ficha__preco b').textContent = brl.format(v.v);
  dlg.querySelector('.ficha__par').textContent = 'ou 10x de ' + brl.format(Math.round(v.p / 10)) + ' sem juros';
  dlg.querySelector('.ficha__corpo').innerHTML = linhas(gr, v)
    .map(([k, val]) => `<div class="ficha__row"><dt>${esc(k)}</dt><dd>${esc(val)}</dd></div>`).join('');

  const img = dlg.querySelector('.ficha__foto');
  img.src = 'assets/img/' + v.img + '.webp';
  img.alt = nomeVar(gr, v) + ', de frente e de costas';

  // capacidades selecionáveis
  const caps = dlg.querySelector('.ficha__caps');
  const comGB = gr.vars.filter(x => x.s).length > 0;
  caps.hidden = !comGB;
  if (comGB) {
    caps.innerHTML = gr.vars.map((x, i) =>
      `<button class="cap cap--btn" type="button" data-var="${i}" aria-pressed="${i === iVar}">${x.s} GB</button>`).join('');
  }
  dlg.querySelector('.ficha__wa').dataset.modelo = nomeVar(gr, v);
}

export function abrirFicha(id) {
  const gr = G.find(x => x.id === id);
  if (!gr || !dlg) return;
  atual = gr;
  iVar = Math.max(0, gr.vars.findIndex(v => v.v === gr.min));
  pintarFicha();
  if (!dlg.open) dlg.showModal();
}

export function ligarFicha(el) {
  dlg = el;
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.querySelector('.ficha__fechar').addEventListener('click', () => dlg.close());
  dlg.querySelector('.ficha__caps').addEventListener('click', e => {
    const b = e.target.closest('[data-var]');
    if (!b) return;
    iVar = Number(b.dataset.var);
    pintarFicha();
  });
}
