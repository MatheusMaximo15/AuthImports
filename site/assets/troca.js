/* Simulador de troca: o cliente dá o iPhone usado e vê quanto falta pagar.

   ATENÇÃO — os valores abaixo são FICTÍCIOS, só para a demonstração.
   Na versão oficial a loja entrega a tabela real (valor por modelo e estado,
   quanto bateria e tela trocada derrubam). Tudo que a loja precisa preencher
   está neste bloco de dados; o cálculo mais abaixo não muda.

   Conta: valor base do modelo (ajustado pelo armazenamento)
          menos desconto de conservação, de bateria e de tela trocada.
   O resultado nunca é um número fechado: sai uma faixa de ±10%, porque o
   valor final depende de avaliação presencial. */

import { G, nomeVar } from './catalogo.js';

/* ---------- dados fictícios (a loja substitui) ---------- */

// base: valor do aparelho perfeito no armazenamento "ref" · gb: opções do modelo
export const MODELOS = [
  { id: 'ip11',   n: 'iPhone 11',         base:  850, ref: 128, gb: [64, 128, 256] },
  { id: 'ip12',   n: 'iPhone 12',         base: 1150, ref: 128, gb: [64, 128, 256] },
  { id: 'ip13',   n: 'iPhone 13',         base: 1550, ref: 128, gb: [128, 256, 512] },
  { id: 'ip13p',  n: 'iPhone 13 Pro',     base: 1950, ref: 128, gb: [128, 256, 512, 1024] },
  { id: 'ip13pm', n: 'iPhone 13 Pro Max', base: 2250, ref: 128, gb: [128, 256, 512, 1024] },
  { id: 'ip14',   n: 'iPhone 14',         base: 1800, ref: 128, gb: [128, 256, 512] },
  { id: 'ip14pl', n: 'iPhone 14 Plus',    base: 1950, ref: 128, gb: [128, 256, 512] },
  { id: 'ip14p',  n: 'iPhone 14 Pro',     base: 2350, ref: 128, gb: [128, 256, 512, 1024] },
  { id: 'ip14pm', n: 'iPhone 14 Pro Max', base: 2700, ref: 128, gb: [128, 256, 512, 1024] },
  { id: 'ip15',   n: 'iPhone 15',         base: 2300, ref: 128, gb: [128, 256, 512] },
  { id: 'ip15pl', n: 'iPhone 15 Plus',    base: 2500, ref: 128, gb: [128, 256, 512] },
  { id: 'ip15p',  n: 'iPhone 15 Pro',     base: 2900, ref: 128, gb: [128, 256, 512, 1024] },
  { id: 'ip15pm', n: 'iPhone 15 Pro Max', base: 3400, ref: 256, gb: [256, 512, 1024] },
  { id: 'ip16',   n: 'iPhone 16',         base: 2900, ref: 128, gb: [128, 256, 512] },
  { id: 'ip16p',  n: 'iPhone 16 Pro',     base: 3600, ref: 128, gb: [128, 256, 512, 1024] },
  { id: 'ip16pm', n: 'iPhone 16 Pro Max', base: 4200, ref: 256, gb: [256, 512, 1024] },
  { id: 'ip17',   n: 'iPhone 17',         base: 3900, ref: 256, gb: [256, 512] },
  { id: 'ip17p',  n: 'iPhone 17 Pro',     base: 5000, ref: 256, gb: [256, 512, 1024] },
  { id: 'ip17pm', n: 'iPhone 17 Pro Max', base: 5600, ref: 256, gb: [256, 512, 1024] }
];

// cada degrau de armazenamento acima ou abaixo do "ref" mexe no valor
const PASSO_GB = 0.08;
// largura da faixa mostrada ao cliente
const FOLGA = 0.10;

// desconto em percentual do valor, por resposta
export const ESTADOS = [
  { id: 'perfeito', n: 'Perfeito',        d: 'Sem riscos nem marcas de uso',  corte: 0 },
  { id: 'leve',     n: 'Leves marcas',    d: 'Quase imperceptíveis',          corte: 0.10 },
  { id: 'visivel',  n: 'Marcas visíveis', d: 'Riscos ou amassados à mostra',  corte: 0.25 }
];
export const BATERIAS = [
  { id: 'alta',  n: '90% ou mais',  d: 'Bateria em ótimo estado',        corte: 0 },
  { id: 'media', n: '80 a 89%',     d: 'Desgaste normal',                corte: 0.05 },
  { id: 'baixa', n: 'Abaixo de 80%', d: 'Troca de bateria à vista',      corte: 0.12 },
  { id: 'nsei',  n: 'Não sei',      d: 'Contamos como 80 a 89%',         corte: 0.05 }
];
export const TELAS = [
  { id: 'sim', n: 'Sim, original',   d: 'Nunca foi trocada',             corte: 0 },
  { id: 'nao', n: 'Não é original',  d: 'Já trocou ou não tem certeza',  corte: 0.15 }
];

/* ---------- cálculo ---------- */

const dezenas = n => Math.round(n / 10) * 10;

/** Faixa de valor do aparelho do cliente. Devolve null se faltar resposta. */
export function calcular({ modelo, gb, estado, bateria, tela }) {
  const m = MODELOS.find(x => x.id === modelo);
  const e = ESTADOS.find(x => x.id === estado);
  const b = BATERIAS.find(x => x.id === bateria);
  const t = TELAS.find(x => x.id === tela);
  if (!m || !e || !b || !t || !m.gb.includes(gb)) return null;

  const base = m.base * (1 + PASSO_GB * (m.gb.indexOf(gb) - m.gb.indexOf(m.ref)));
  let v = base;
  const descontos = [];
  const corta = (rotulo, pct) => {
    if (!pct) return;
    const tira = v * pct;
    v -= tira;
    descontos.push({ rotulo, valor: dezenas(tira) });
  };
  corta('Estado: ' + e.n.toLowerCase(), e.corte);
  corta('Bateria: ' + b.n.toLowerCase(), b.corte);
  corta('Tela que não é original', t.corte);

  return { base: dezenas(base), descontos, min: dezenas(v * (1 - FOLGA)), max: dezenas(v * (1 + FOLGA)) };
}

/** Quanto falta pagar pelo aparelho desejado, também em faixa. */
export function diferenca(preco, faixa) {
  return {
    min: Math.max(0, preco - faixa.max),
    max: Math.max(0, preco - faixa.min),
    cobre: faixa.max >= preco
  };
}

/* ---------- tela ---------- */

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const faixaTxt = (a, b) => a === b ? brl.format(a) : 'de ' + brl.format(a) + ' a ' + brl.format(b);
const gbTxt = n => n >= 1024 ? (n / 1024) + ' TB' : n + ' GB';

const PASSOS = ['Aparelho que você quer', 'Seu aparelho', 'Seus dados', 'Resultado'];

const estado = { alvo: '', alvoVar: 0, modelo: '', gb: 0, estado: '', bateria: '', tela: '', nome: '', zap: '' };
let raiz, passo = 1;

const q = s => raiz.querySelector(s);
const qa = s => [...raiz.querySelectorAll(s)];

function radios(nome, legenda, dica, lista) {
  return `<fieldset class="troca__grupo">
    <legend>${legenda}</legend>${dica ? `<p class="t-small muted troca__dica">${dica}</p>` : ''}
    <div class="troca__opcoes">${lista.map(o => `<label class="troca__op">
      <input type="radio" name="tr-${nome}" value="${o.id}">
      <span><b>${esc(o.n)}</b><small>${esc(o.d)}</small></span></label>`).join('')}</div>
  </fieldset>`;
}

function opcoesAlvo() {
  const grupo = (rotulo, lista) => lista.length
    ? `<optgroup label="${rotulo}">${lista.map(g =>
        `<option value="${g.id}">${esc(g.n)}${g.k === 'lacrado' ? ' (lacrado)' : ''}</option>`).join('')}</optgroup>` : '';
  const ord = (a, b) => a.min - b.min;
  return '<option value="">Ainda não escolhi</option>'
    + grupo('Na loja hoje', G.filter(g => g.pronta).sort(ord))
    + grupo('Seminovos sob encomenda', G.filter(g => !g.pronta && g.k !== 'lacrado').sort(ord))
    + grupo('Lacrados', G.filter(g => g.k === 'lacrado').sort(ord));
}

function montar() {
  raiz.innerHTML = `
  <ol class="troca__passos" aria-label="Etapas da simulação">
    ${PASSOS.map((n, i) => `<li data-p="${i + 1}"><span class="troca__num" aria-hidden="true">${i + 1}</span><span class="troca__rot">${n}</span></li>`).join('')}
  </ol>

  <section class="troca__painel" data-painel="1" aria-labelledby="tr-h1">
    <h3 id="tr-h1" tabindex="-1">Qual aparelho você quer levar?</h3>
    <p class="t-small muted">Opcional. Serve para mostrar quanto falta pagar depois da troca.</p>
    <div class="troca__campos">
      <div class="field"><label for="tr-alvo">Aparelho</label><select id="tr-alvo">${opcoesAlvo()}</select></div>
      <div class="field"><label for="tr-alvo-gb">Armazenamento</label><select id="tr-alvo-gb" disabled><option>Escolha o aparelho</option></select></div>
    </div>
    <div class="btn-row"><button class="btn btn--secondary" type="button" data-ir="2">Continuar</button></div>
  </section>

  <section class="troca__painel" data-painel="2" aria-labelledby="tr-h2" hidden>
    <h3 id="tr-h2" tabindex="-1">Conte sobre o seu iPhone</h3>
    <p class="t-small muted">Responda com sinceridade: a loja confirma tudo na avaliação.</p>
    <div class="troca__campos">
      <div class="field"><label for="tr-modelo">Modelo</label><select id="tr-modelo">
        <option value="">Escolha o modelo</option>${MODELOS.map(m => `<option value="${m.id}">${esc(m.n)}</option>`).join('')}</select></div>
      <div class="field"><label for="tr-gb">Armazenamento</label><select id="tr-gb" disabled><option value="">Escolha o modelo</option></select></div>
    </div>
    ${radios('bateria', 'Saúde da bateria', 'Em Ajustes, Bateria, Saúde da bateria.', BATERIAS)}
    ${radios('tela', 'A tela é original?', '', TELAS)}
    ${radios('estado', 'Estado de conservação', '', ESTADOS)}
    <div class="btn-row">
      <button class="btn btn--secondary" type="button" data-ir="1">Voltar</button>
      <button class="btn btn--secondary" type="button" data-ir="3" id="tr-ver" disabled>Continuar</button>
    </div>
  </section>

  <section class="troca__painel" data-painel="3" aria-labelledby="tr-h3" hidden>
    <h3 id="tr-h3" tabindex="-1">Para quem a loja manda a avaliação?</h3>
    <p class="t-small muted">O valor da troca aparece logo depois.</p>
    <div class="troca__campos">
      <div class="field"><label for="tr-nome">Seu nome</label>
        <input id="tr-nome" type="text" autocomplete="name" aria-describedby="tr-nome-err">
        <p class="field__error" id="tr-nome-err" hidden>Escreva o nome que a loja deve chamar.</p></div>
      <div class="field"><label for="tr-zap">Seu WhatsApp</label>
        <input id="tr-zap" type="tel" autocomplete="tel" inputmode="tel" placeholder="(11) 91234-5678" aria-describedby="tr-zap-err">
        <p class="field__error" id="tr-zap-err" hidden>Escreva o número com DDD.</p></div>
    </div>
    <div class="btn-row">
      <button class="btn btn--secondary" type="button" data-ir="2">Voltar</button>
      <button class="btn btn--secondary" type="button" id="tr-resultado">Ver o resultado</button>
    </div>
  </section>

  <section class="troca__painel" data-painel="4" aria-labelledby="tr-h4" hidden>
    <h3 id="tr-h4" tabindex="-1">O que a loja pode pagar pelo seu aparelho</h3>
    <div id="tr-sim"></div>
    <div id="tr-fim"></div>
    <div class="btn-row">
      <button class="btn btn--secondary" type="button" data-ir="2">Voltar e ajustar</button>
      <a class="btn btn--primary" href="#contato" id="tr-contato">Entrar em contato</a>
      <button class="btn btn--secondary" type="button" id="tr-copiar">Copiar mensagem</button>
    </div>
    <p class="t-small muted" id="tr-aviso">A mensagem sai pronta com a avaliação. O número da loja entra na versão final.</p>
  </section>`;
}

/* ---------- estado e etapas ---------- */

const modeloAtual = () => MODELOS.find(m => m.id === estado.modelo);
const grupoAlvo = () => G.find(g => g.id === estado.alvo);
const faixa = () => calcular(estado);
const completo = () => !!faixa();
const nomeOk = () => estado.nome.trim().length >= 2;
const zapOk = () => { const d = estado.zap.replace(/\D/g, ''); return d.length === 10 || d.length === 11; };
const contatoOk = () => nomeOk() && zapOk();

function pintarAlvo() {
  const gb = q('#tr-alvo-gb');
  q('#tr-alvo').value = estado.alvo;
  const gr = grupoAlvo();
  if (!gr) {
    gb.disabled = true;
    gb.innerHTML = '<option>Escolha o aparelho</option>';
    return;
  }
  gb.disabled = gr.vars.length < 2;
  gb.innerHTML = gr.vars.map((v, i) =>
    `<option value="${i}">${v.s ? gbTxt(v.s) : 'Modelo único'} · ${brl.format(v.v)} à vista</option>`).join('');
  gb.value = String(estado.alvoVar);
}

function pintarMeu() {
  const m = modeloAtual();
  const sel = q('#tr-gb');
  q('#tr-modelo').value = estado.modelo;
  if (!m) {
    sel.disabled = true;
    sel.innerHTML = '<option value="">Escolha o modelo</option>';
  } else {
    sel.disabled = false;
    sel.innerHTML = m.gb.map(n => `<option value="${n}">${gbTxt(n)}</option>`).join('');
    sel.value = String(estado.gb);
  }
  ['bateria', 'tela', 'estado'].forEach(k =>
    qa(`input[name="tr-${k}"]`).forEach(r => { r.checked = r.value === estado[k]; }));
  q('#tr-ver').disabled = !completo();
}

function rotulo(lista, id) { return (lista.find(x => x.id === id) || {}).n || ''; }

function pintarSimulacao() {
  const r = faixa();
  const m = modeloAtual();
  if (!r) { q('#tr-sim').innerHTML = ''; return; }
  const alvo = grupoAlvo();
  let falta = '';
  if (alvo) {
    const v = alvo.vars[estado.alvoVar];
    const d = diferenca(v.v, r);
    falta = `<div class="troca__falta">
      <p class="t-small muted">Para levar o ${esc(nomeVar(alvo, v))}, de ${brl.format(v.v)} à vista</p>
      ${d.cobre
        ? `<p class="troca__valor">A troca pode cobrir o aparelho</p>
           <p class="t-small muted">Se o valor passar do preço, a loja confirma a diferença na avaliação.</p>`
        : `<p class="troca__valor">Faltam ${faixaTxt(d.min, d.max)}</p>`}
    </div>`;
  }
  q('#tr-sim').innerHTML = `
    <p class="t-small muted">${esc(m.n)} de ${gbTxt(estado.gb)}</p>
    <p class="troca__valor troca__valor--grande">${faixaTxt(r.min, r.max)}</p>
    <dl class="troca__conta">
      <div class="ficha__row"><dt>Valor do aparelho perfeito</dt><dd>${brl.format(r.base)}</dd></div>
      ${r.descontos.map(d => `<div class="ficha__row"><dt>${esc(d.rotulo)}</dt><dd>− ${brl.format(d.valor)}</dd></div>`).join('')}
    </dl>
    ${falta}
    <p class="t-small muted troca__ressalva">Valor estimado. O número final depende da avaliação do aparelho na loja.</p>
    <p class="demo-note">Demonstração: valores fictícios. A loja define a tabela real.</p>`;
}

function textoResumo() {
  const m = modeloAtual();
  return m.n + ' de ' + gbTxt(estado.gb) + ', bateria ' + rotulo(BATERIAS, estado.bateria).toLowerCase()
    + ', tela ' + (estado.tela === 'sim' ? 'original' : 'não original')
    + ', estado ' + rotulo(ESTADOS, estado.estado).toLowerCase();
}

function mensagem() {
  const r = faixa();
  const alvo = grupoAlvo();
  const v = alvo && alvo.vars[estado.alvoVar];
  return 'Olá, Auth Imports! Aqui é ' + estado.nome.trim() + '. Quero dar meu iPhone na troca'
    + (alvo ? ' por um ' + nomeVar(alvo, v) + ' (' + (alvo.k === 'lacrado' ? 'lacrado' : 'seminovo') + ')' : '')
    + '. Meu aparelho: ' + textoResumo() + '. A simulação do site deu '
    + faixaTxt(r.min, r.max) + '. Podem avaliar?';
}

function pintarFim() {
  if (!completo()) return;
  q('#tr-fim').innerHTML = `
    <p class="troca__fim-txt">A loja avalia o aparelho de perto e confirma o valor. Esta é a mensagem que vai com o seu pedido:</p>
    <blockquote class="troca__msg">${esc(mensagem())}</blockquote>`;
}

function ir(n) {
  // os valores só aparecem depois da avaliação e do contato preenchidos
  if (n >= 3 && !completo()) n = 2;
  if (n >= 4 && !contatoOk()) n = 3;
  passo = n;
  qa('[data-painel]').forEach(p => { p.hidden = Number(p.dataset.painel) !== n; });
  qa('.troca__passos li').forEach(li => {
    const i = Number(li.dataset.p);
    li.classList.toggle('is-atual', i === n);
    li.classList.toggle('is-feito', i < n);
    if (i === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
  });
  if (n === 4) { pintarSimulacao(); pintarFim(); }
  const h = q(`[data-painel="${n}"] h3`);
  if (h) h.focus({ preventScroll: true });
  const topo = raiz.getBoundingClientRect().top;
  if (topo < 0 || topo > innerHeight * 0.5) {
    raiz.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
}

/** Chamado pela ficha do aparelho: já deixa o desejado escolhido. */
export function escolherAlvo(id, idx = 0) {
  if (!raiz || !G.some(g => g.id === id)) return;
  estado.alvo = id;
  estado.alvoVar = Number(idx) || 0;
  pintarAlvo();
  ir(1);
}

export function ligarTroca(el) {
  raiz = el;
  montar();
  pintarAlvo();
  pintarMeu();
  ir(1);

  raiz.addEventListener('click', e => {
    const b = e.target.closest('[data-ir]');
    if (b && !b.disabled) ir(Number(b.dataset.ir));
  });

  q('#tr-alvo').addEventListener('change', e => {
    estado.alvo = e.target.value;
    estado.alvoVar = 0;
    const gr = grupoAlvo();
    if (gr) estado.alvoVar = Math.max(0, gr.vars.findIndex(v => v.v === gr.min));
    pintarAlvo();
  });
  q('#tr-alvo-gb').addEventListener('change', e => { estado.alvoVar = Number(e.target.value) || 0; });

  q('#tr-modelo').addEventListener('change', e => {
    estado.modelo = e.target.value;
    const m = modeloAtual();
    estado.gb = m ? m.ref : 0;
    pintarMeu();
  });
  q('#tr-gb').addEventListener('change', e => { estado.gb = Number(e.target.value); pintarMeu(); });
  ['bateria', 'tela', 'estado'].forEach(k =>
    qa(`input[name="tr-${k}"]`).forEach(r => r.addEventListener('change', () => { estado[k] = r.value; pintarMeu(); })));

  // passo 3: contato antes do resultado
  const erro = (id, mostrar) => {
    q('#' + id + '-err').hidden = !mostrar;
    q('#' + id).setAttribute('aria-invalid', mostrar ? 'true' : 'false');
  };
  q('#tr-nome').addEventListener('input', e => { estado.nome = e.target.value; if (nomeOk()) erro('tr-nome', false); });
  q('#tr-zap').addEventListener('input', e => { estado.zap = e.target.value; if (zapOk()) erro('tr-zap', false); });
  q('#tr-resultado').addEventListener('click', () => {
    erro('tr-nome', !nomeOk());
    erro('tr-zap', !zapOk());
    if (!contatoOk()) { q(nomeOk() ? '#tr-zap' : '#tr-nome').focus(); return; }
    ir(4);
  });

  // leva nome, WhatsApp e o resumo para o formulário da loja
  q('#tr-contato').addEventListener('click', () => {
    const preencher = (id, v) => { const c = document.getElementById(id); if (c) c.value = v; };
    if (!completo() || !contatoOk()) return;
    preencher('f-nome', estado.nome.trim());
    preencher('f-zap', estado.zap.trim());
    preencher('f-modelo', 'Troca: ' + textoResumo());
  });

  const copiar = q('#tr-copiar');
  copiar.addEventListener('click', async () => {
    if (!completo()) return;
    const texto = mensagem();
    const avisar = palavra => {
      copiar.textContent = palavra;
      setTimeout(() => { copiar.textContent = 'Copiar mensagem'; }, 1800);
    };
    try {
      await navigator.clipboard.writeText(texto);
      avisar('Copiado');
    } catch (_) {
      // sem permissão de área de transferência: a mensagem já está na tela
      avisar('Selecione o texto acima');
    }
  });
}
