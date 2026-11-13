/* Catálogo e ficha do aparelho.
   Os dados vêm das três tabelas públicas da loja (novembro de 2026).
   A ficha técnica é a do modelo, não a do aparelho: estado e bateria vão no vídeo. */

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
// g garantia em meses · r pronta entrega · img foto · f ficha · c cor do render 3D · y geração
export const P = [
  { n:'iPhone 11', s:256, k:'semi', p:1780, v:1549, b:100, bn:1, g:6, r:1, img:'ip11', f:'ip11', c:'preto', y:11 },
  { n:'iPhone 12', s:128, k:'semi', p:2060, v:1799, b:100, bn:1, g:6, r:1, img:'ip12', f:'ip12', c:'azul', y:12 },
  { n:'iPhone 13', s:128, k:'semi', p:2640, v:2299, g:6, img:'ip13', f:'ip13', c:'azul', y:13 },
  { n:'iPhone 13', s:256, k:'semi', p:2985, v:2599, g:6, img:'ip13_256', f:'ip13', c:'preto', y:13 },
  { n:'iPhone 13 Pro', s:128, k:'semi', p:3215, v:2799, g:6, img:'ip13pro', f:'ip13p', c:'titanio', y:13 },
  { n:'iPhone 13 Pro', s:256, k:'semi', p:3560, v:3099, g:6, img:'ip13pro256', f:'ip13p', c:'dourado', y:13 },
  { n:'iPhone 13 Pro Max', s:128, k:'semi', p:3560, v:3099, b:100, bn:1, g:6, r:1, img:'ip13pm', f:'ip13pm', c:'titanio', y:13 },
  { n:'iPhone 13 Pro Max', s:256, k:'semi', p:4135, v:3599, g:6, img:'ip13pm256', f:'ip13pm', c:'preto', y:13 },
  { n:'iPhone 14', s:128, k:'semi', p:2985, v:2599, g:6, img:'ip14', f:'ip14', c:'azul', y:14 },
  { n:'iPhone 14', s:256, k:'semi', p:3330, v:2899, g:6, img:'ip14_256', f:'ip14', c:'titanio', y:14 },
  { n:'iPhone 14 Plus', s:128, k:'semi', p:3100, v:2699, b:86, g:6, r:1, img:'ip14plus', f:'ip14pl', c:'preto', y:14 },
  { n:'iPhone 14 Pro', s:128, k:'semi', p:3675, v:3199, g:6, img:'ip14pro', f:'ip14p', c:'preto', y:14 },
  { n:'iPhone 14 Pro', s:256, k:'semi', p:4020, v:3499, g:6, img:'ip14pro256', f:'ip14p', c:'dourado', y:14 },
  { n:'iPhone 14 Pro Max', s:128, k:'semi', p:4250, v:3699, g:6, img:'ip14pm', f:'ip14pm', c:'titanio', y:14 },
  { n:'iPhone 14 Pro Max', s:256, k:'semi', p:4595, v:3999, g:6, img:'ip14pm256', f:'ip14pm', c:'preto', y:14 },
  { n:'iPhone 15', s:128, k:'semi', p:3675, v:3199, b:100, bn:1, g:6, r:1, img:'ip15_pronta', f:'ip15', c:'azul', y:15 },
  { n:'iPhone 15', s:256, k:'semi', p:3900, v:3399, b:89, g:6, r:1, img:'ip15', f:'ip15', c:'preto', y:15 },
  { n:'iPhone 15 Pro', s:128, k:'semi', p:4365, v:3799, g:6, img:'ip15pro', f:'ip15p', c:'titanio', y:15 },
  { n:'iPhone 15 Pro', s:256, k:'semi', p:4710, v:4099, g:6, img:'ip15pro256', f:'ip15p', c:'preto', y:15 },
  { n:'iPhone 15 Pro Max', s:256, k:'semi', p:5280, v:4599, g:6, img:'ip15pm', f:'ip15pm', c:'titanio', y:15 },
  { n:'iPhone 16', s:128, k:'semi', p:4595, v:3999, g:6, img:'ip16', f:'ip16', c:'azul', y:16 },
  { n:'iPhone 16 Pro', s:128, k:'semi', p:5280, v:4599, g:6, img:'ip16pro', f:'ip16p', c:'titanio', y:16 },
  { n:'iPhone 16 Pro', s:256, k:'semi', p:5630, v:4899, g:6, img:'ip16pro256', f:'ip16p', c:'preto', y:16 },
  { n:'iPhone 16 Pro Max', s:256, k:'semi', p:6030, v:5249, b:90, g:6, r:1, img:'ip16pm', f:'ip16pm', c:'dourado', y:16 },
  { n:'iPhone 17 Pro Max', s:256, k:'semi', p:8040, v:6999, b:96, g:6, r:1, img:'ip17pm', f:'ip17pm', c:'titanio', y:17 },
  { n:'iPad 9', s:64, k:'semi', p:2060, v:1799, b:97, g:6, r:1, img:'ipad9', f:'ipad9', c:'titanio', y:9, sem3d:1 },
  { n:'MacBook M2', s:256, k:'semi', p:5500, v:4799, b:89, g:6, r:1, img:'mac', f:'mac', c:'titanio', y:15, sem3d:1 },
  { n:'Apple Watch S5 Nike 44 mm', s:0, k:'semi', p:1149, v:999, b:84, g:6, r:1, img:'watch5', f:'watch5', c:'preto', y:5, sem3d:1 },
  { n:'Apple Watch SE 2 44 mm', s:0, k:'semi', p:1665, v:1449, b:100, g:6, r:1, img:'watchse', f:'watchse', c:'preto', y:10, sem3d:1, nota:'Garantia Apple até junho de 2027' },

  { n:'iPhone 15', s:128, k:'lacrado', p:4940, v:4299, g:12, img:'ip15lac', f:'ip15', c:'azul', y:15 },
  { n:'iPhone 16', s:128, k:'lacrado', p:5510, v:4799, g:12, img:'ip16', f:'ip16', c:'titanio', y:16 },
  { n:'iPhone 17', s:256, k:'lacrado', p:6660, v:5799, g:12, img:'ip17', f:'ip17', c:'azul', y:17 },
  { n:'iPhone 17 Pro', s:256, k:'lacrado', p:8499, v:7399, g:12, img:'ip17pro', f:'ip17p', c:'dourado', y:17 },
  { n:'iPhone 17 Pro Max', s:256, k:'lacrado', p:8960, v:7799, g:12, img:'ip17pm', f:'ip17pm', c:'titanio', y:17 },
  { n:'iPhone 17 Pro Max', s:512, k:'lacrado', p:10900, v:9499, g:12, img:'ip17pm512', f:'ip17pm', c:'preto', y:17 },
  { n:'iPhone 18 Pro', s:256, k:'lacrado', p:10100, v:8799, g:12, img:'ip18pro', c:'titanio', y:18 },
  { n:'iPhone 18 Pro', s:512, k:'lacrado', p:11700, v:10199, g:12, img:'ip18pro512', c:'dourado', y:18 },
  { n:'iPhone 18 Pro Max', s:256, k:'lacrado', p:11250, v:9799, g:12, img:'ip18pm', c:'preto', y:18 },
  { n:'iPhone 18 Pro Max', s:512, k:'lacrado', p:13430, v:11699, g:12, img:'ip18pm512', c:'titanio', y:18 }
];

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const nome = p => p.n + (p.s ? ' de ' + p.s + ' GB' : '');
// quanto o preco a vista corta do total parcelado, nos numeros da propria loja
export const desconto = p => Math.round((1 - p.v / p.p) * 100);

function cartao(p, i, extra) {
  const id = 'aparelho-' + i;
  const selo = p.r
    ? '<span class="sel sel--agora">Na loja hoje</span>'
    : (p.k === 'lacrado' ? '<span class="sel">Lacrado</span>' : '');
  const fatos = (p.s ? p.s + ' GB · ' : '')
    + (p.k === 'lacrado' ? 'lacrado' : 'seminovo')
    + '<span class="f-gar"> · ' + p.g + ' meses de garantia</span>'
    + (p.b ? ' · bateria ' + p.b + '%' : '');
  const corte = desconto(p);
  const marca = corte ? `<span class="sel sel--desc">−${corte}%</span>` : '';

  return `<a class="tile prod span-3${extra ? ' ' + extra : ''}" href="#${id}" id="${id}" data-ficha="${i}">
  <div class="tile__media">${selo}${marca}<img src="assets/img/${p.img}.webp" alt="${esc(nome(p))}" loading="lazy" width="320" height="320"></div>
  <div class="tile__head"><h3>${esc(p.n)}</h3><span class="tile__price">${brl.format(p.v)}</span></div>
  <p class="tile__facts">${fatos}<span class="tile__par">10x de ${brl.format(Math.round(p.p / 10))} sem juros</span></p>
</a>`;
}

export function montarCatalogo(alvo, lista, extra) {
  alvo.innerHTML = lista.map(o => cartao(o.p, o.i, extra)).join('');
}

/* ---------- a ficha, num <dialog> ---------- */

let dlg, render = null;

function linhas(p) {
  const f = FICHAS[p.f];
  const rows = [];
  if (p.s) rows.push(['Armazenamento', p.s + ' GB']);
  if (f && f.tela) rows.push(['Tela', f.tela]);
  if (f && f.chip) rows.push(['Chip', f.chip]);
  if (f && f.cam) rows.push(['Câmera', f.cam]);
  if (f && f.porta) rows.push(['Conexão', f.porta]);
  if (f && f.extra) rows.push(['Também tem', f.extra]);
  rows.push(['Condição', p.k === 'lacrado' ? 'Lacrado, caixa fechada' : 'Seminovo, testado pela loja']);
  rows.push(['Garantia', p.g + ' meses pela loja']);
  rows.push(['Acompanha', p.k === 'lacrado' ? 'Caixa fechada e nota' : 'Cabo, carregador e nota']);
  const corte = desconto(p);
  if (corte > 0) rows.push(['Desconto à vista', brl.format(p.p - p.v) + ' a menos que o parcelado']);
  if (p.b) rows.push(['Saúde da bateria', p.b + '%' + (p.bn ? ', bateria nova' : '')]);
  if (p.nota) rows.push(['Observação', p.nota]);
  return rows;
}

export function abrirFicha(i) {
  const p = P[i];
  if (!p || !dlg) return;
  const f = FICHAS[p.f];
  const corpo = dlg.querySelector('.ficha__corpo');
  const palco = dlg.querySelector('.ficha__palco');

  dlg.querySelector('.ficha__nome').textContent = nome(p);
  dlg.querySelector('.ficha__linha').textContent =
    (p.k === 'lacrado' ? 'Lacrado' : 'Seminovo') + ' · ' + p.g + ' meses de garantia pela loja';
  dlg.querySelector('.ficha__preco b').textContent = brl.format(p.v);
  dlg.querySelector('.ficha__par').textContent = 'ou 10x de ' + brl.format(Math.round(p.p / 10)) + ' sem juros';
  corpo.innerHTML = linhas(p)
    .map(([k, v]) => `<div class="ficha__row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
  if (!f) {
    corpo.insertAdjacentHTML('beforeend',
      '<div class="ficha__row"><dt>Ficha técnica</dt><dd>A loja confirma no WhatsApp.</dd></div>');
  }

  // a foto da loja ja mostra o aparelho de frente e de costas
  palco.innerHTML = '';
  const img = document.createElement('img');
  img.className = 'ficha__foto';
  img.src = 'assets/img/' + p.img + '.webp';
  img.alt = nome(p) + ', de frente e de costas';
  palco.appendChild(img);

  dlg.querySelector('.ficha__wa').dataset.wa = String(i);
  if (!dlg.open) dlg.showModal();
}

export function ligarFicha(el, mountFn) {
  dlg = el;
  render = mountFn;
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.querySelector('.ficha__fechar').addEventListener('click', () => dlg.close());
  // ao fechar, o palco e esvaziado: o contexto WebGL do render nao fica aberto
  dlg.addEventListener('close', () => { dlg.querySelector('.ficha__palco').innerHTML = ''; });
}
