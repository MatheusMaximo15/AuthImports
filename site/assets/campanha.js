/* Campanha promocional: o aviso que aparece na página inicial.

   Os campos abaixo são os da tabela `campanha` planejada para o Supabase
   (PLANO.md, seção 4). Na versão final a loja edita tudo no painel: liga e
   desliga, escreve o texto, troca a foto e escolhe as datas. Aqui o conteúdo
   é de DEMONSTRAÇÃO.

   Regras de exibição (pensadas para não incomodar):
   - só na página inicial (este arquivo só é carregado nela);
   - só com `ativa: true` e dentro do período (inicio/fim);
   - uma vez por campanha: fechou, não volta, nem em outra aba nem amanhã.
     Uma campanha nova (outro `id`) aparece de novo;
   - nunca por cima de outra janela aberta;
   - `?campanha` no endereço força a exibição, para apresentar ao cliente. */

export const CAMPANHA = {
  id: 'black-november-2026',
  ativa: true,
  selo: 'Só em novembro',
  titulo: 'Black November',
  linha: 'Condições especiais em iPhones seminovos e lacrados. Fale com a loja antes que o mês acabe.',
  acao: 'Ver o catálogo',
  link: 'catalogo.html',
  // três aparelhos em leque: o do meio vai na frente. Diferentes da foto do hero.
  imagens: ['assets/img/ip15pm.webp', 'assets/img/ip18pm.webp', 'assets/img/ip16pm.webp'],
  imagensAlt: 'iPhone 15 Pro Max, iPhone 18 Pro Max e iPhone 16 Pro Max em leque',
  inicio: '2026-11-01T00:00:00-03:00',
  fim: '2026-11-30T23:59:59-03:00',
  nota: 'Campanha de demonstração'
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const chave = c => 'authimports:campanha:' + c.id;

function noPeriodo(c, agora = Date.now()) {
  const ini = c.inicio ? Date.parse(c.inicio) : -Infinity;
  const fim = c.fim ? Date.parse(c.fim) : Infinity;
  return agora >= ini && agora <= fim;
}
function jaVista(c) {
  try { return localStorage.getItem(chave(c)) === '1'; } catch (_) { return false; }
}
function marcarVista(c) {
  try { localStorage.setItem(chave(c), '1'); } catch (_) { /* sem armazenamento: nada a lembrar */ }
}

/* ---------- contagem regressiva ---------- */

const doisDigitos = n => String(n).padStart(2, '0');
function falta(fim) {
  let s = Math.max(0, Math.floor((Date.parse(fim) - Date.now()) / 1000));
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;
  return { d, h, m, s };
}
function textoFalta(t) {
  return 'Termina em ' + t.d + (t.d === 1 ? ' dia' : ' dias') + ' e ' + t.h + (t.h === 1 ? ' hora' : ' horas');
}

/* ---------- janela ---------- */

function montar(c) {
  const dlg = document.createElement('dialog');
  dlg.className = 'campanha';
  dlg.setAttribute('aria-labelledby', 'campanha-titulo');
  dlg.innerHTML = `
    <button class="campanha__fechar" type="button" aria-label="Fechar o aviso">
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
    </button>
    <div class="campanha__rolagem">
      ${c.imagens && c.imagens.length ? `<div class="campanha__palco" role="img" aria-label="${esc(c.imagensAlt || '')}">
        ${c.imagens.slice(0, 3).map((src, i) =>
          `<img class="campanha__ap campanha__ap--${i + 1}" src="${esc(src)}" alt="" aria-hidden="true">`).join('')}
      </div>` : ''}
      <div class="campanha__in">
        ${c.selo ? `<p class="campanha__selo"><span class="campanha__ponto" aria-hidden="true"></span>${esc(c.selo)}</p>` : ''}
        <h2 class="campanha__titulo" id="campanha-titulo">${esc(c.titulo)}</h2>
        ${c.linha ? `<p class="campanha__linha">${esc(c.linha)}</p>` : ''}
        ${c.fim ? `<div class="campanha__relogio" role="timer" aria-live="off">
          ${[['d', 'dias'], ['h', 'horas'], ['m', 'min'], ['s', 'seg']].map(([k, r]) =>
            `<div class="campanha__casa"><b data-t="${k}">00</b><span>${r}</span></div>`).join('')}
        </div>` : ''}
        <div class="campanha__acoes">
          ${c.link ? `<a class="btn campanha__acao" href="${esc(c.link)}">${esc(c.acao || 'Saiba mais')}
            <svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8"/><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5"/></svg></a>` : ''}
          <button class="campanha__depois" type="button">Agora não</button>
        </div>
        ${c.nota ? `<p class="campanha__nota">${esc(c.nota)}</p>` : ''}
      </div>
    </div>`;
  document.body.appendChild(dlg);

  // relógio: atualiza a cada segundo enquanto a janela está aberta
  let relogio = null;
  const relogioEl = dlg.querySelector('.campanha__relogio');
  if (relogioEl) {
    const casas = Object.fromEntries([...relogioEl.querySelectorAll('[data-t]')].map(b => [b.dataset.t, b]));
    const tique = () => {
      const t = falta(c.fim);
      casas.d.textContent = doisDigitos(t.d);
      casas.h.textContent = doisDigitos(t.h);
      casas.m.textContent = doisDigitos(t.m);
      casas.s.textContent = doisDigitos(t.s);
      relogioEl.setAttribute('aria-label', textoFalta(t));
    };
    tique();
    relogio = setInterval(tique, 1000);
  }

  const fechar = () => { marcarVista(c); dlg.close(); };
  dlg.querySelector('.campanha__fechar').addEventListener('click', fechar);
  dlg.querySelector('.campanha__depois').addEventListener('click', fechar);
  dlg.addEventListener('cancel', () => marcarVista(c));
  dlg.addEventListener('click', e => { if (e.target === dlg) fechar(); });
  const acao = dlg.querySelector('.campanha__acao');
  if (acao) acao.addEventListener('click', () => marcarVista(c));
  dlg.addEventListener('close', () => { clearInterval(relogio); dlg.remove(); });
  return dlg;
}

export function mostrarCampanha(c = CAMPANHA, { forcar = false } = {}) {
  if (!forcar && (!c.ativa || !noPeriodo(c) || jaVista(c))) return null;
  if (document.querySelector('dialog[open]')) return null;
  const dlg = montar(c);
  dlg.showModal();
  const acao = dlg.querySelector('.campanha__acao');
  if (acao) acao.focus({ preventScroll: true });
  return dlg;
}

// espera a página assentar antes de abrir
const forcar = new URLSearchParams(location.search).has('campanha');
setTimeout(() => mostrarCampanha(CAMPANHA, { forcar }), 1200);
