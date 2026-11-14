/* Campanha promocional: o aviso que aparece quando o site abre.

   Os campos abaixo são os mesmos da tabela `campanha` planejada para o
   Supabase (PLANO.md, seção 4). Na versão final a loja edita tudo isso no
   painel, sem mexer em código: liga e desliga, escreve o texto, escolhe as
   datas. Aqui o conteúdo é de DEMONSTRAÇÃO.

   É texto de verdade, não imagem com texto dentro: aparece no Google, se
   ajusta ao celular e não precisa de designer para trocar uma data.

   Regras de exibição:
   - só dentro do período (inicio/fim) e com `ativa: true`;
   - uma vez por visita (some ao fechar e não volta até fechar o navegador);
   - nunca por cima da ficha de um aparelho aberta por link;
   - `?campanha` no endereço força a exibição, para apresentar ao cliente. */

export const CAMPANHA = {
  ativa: true,
  selo: 'Campanha de demonstração',
  titulo: 'Black November',
  linha: 'Condições especiais em iPhones seminovos e lacrados durante todo o mês. Fale com a loja e peça a sua.',
  validade: 'Até 30 de novembro',
  acao: 'Ver o catálogo',
  link: 'catalogo.html',
  inicio: '2026-11-01T00:00:00-03:00',
  fim: '2026-11-30T23:59:59-03:00'
};

const CHAVE = 'authimports:campanha-vista';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function noPeriodo(c, agora = new Date()) {
  const ini = c.inicio ? new Date(c.inicio) : null;
  const fim = c.fim ? new Date(c.fim) : null;
  return (!ini || agora >= ini) && (!fim || agora <= fim);
}

function jaVista() {
  try { return sessionStorage.getItem(CHAVE) === '1'; } catch (_) { return false; }
}
function marcarVista() {
  try { sessionStorage.setItem(CHAVE, '1'); } catch (_) { /* sem armazenamento: aparece de novo na próxima página */ }
}

function montar(c) {
  const dlg = document.createElement('dialog');
  dlg.className = 'campanha';
  dlg.setAttribute('aria-labelledby', 'campanha-titulo');
  dlg.innerHTML = `
    <button class="campanha__fechar" type="button" aria-label="Fechar o aviso">
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
    </button>
    <div class="campanha__in">
      ${c.selo ? `<p class="campanha__selo">${esc(c.selo)}</p>` : ''}
      <h2 class="campanha__titulo" id="campanha-titulo">${esc(c.titulo)}</h2>
      ${c.linha ? `<p class="campanha__linha">${esc(c.linha)}</p>` : ''}
      ${c.validade ? `<p class="campanha__validade">${esc(c.validade)}</p>` : ''}
      <div class="btn-row">
        ${c.link ? `<a class="btn campanha__acao" href="${esc(c.link)}">${esc(c.acao || 'Saiba mais')}</a>` : ''}
        <button class="btn campanha__depois" type="button">Agora não</button>
      </div>
    </div>`;
  document.body.appendChild(dlg);

  const fechar = () => { marcarVista(); dlg.close(); };
  dlg.querySelector('.campanha__fechar').addEventListener('click', fechar);
  dlg.querySelector('.campanha__depois').addEventListener('click', fechar);
  dlg.addEventListener('cancel', marcarVista);
  dlg.addEventListener('click', e => { if (e.target === dlg) fechar(); });
  const acao = dlg.querySelector('.campanha__acao');
  if (acao) acao.addEventListener('click', marcarVista);
  dlg.addEventListener('close', () => dlg.remove());
  return dlg;
}

export function mostrarCampanha(c = CAMPANHA, { forcar = false } = {}) {
  if (!forcar && (!c.ativa || !noPeriodo(c) || jaVista())) return null;
  const dlg = montar(c);
  dlg.showModal();
  // o foco vai para a ação, não para o fechar: quem quer fechar tem Esc
  const acao = dlg.querySelector('.campanha__acao');
  if (acao) acao.focus({ preventScroll: true });
  return dlg;
}

// abre pouco depois da página, para não cobrir o primeiro quadro
const forcar = new URLSearchParams(location.search).has('campanha');
setTimeout(() => {
  if (document.querySelector('dialog[open]')) return; // ficha aberta por link
  mostrarCampanha(CAMPANHA, { forcar });
}, 700);
