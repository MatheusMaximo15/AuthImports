/* O que toda página do site divide: menu marcando a página atual, a ficha do
   aparelho (estoque e catálogo) e o recado que vai para a página de contato.

   O recado (modelo, nome, WhatsApp) passa por sessionStorage, nunca pelo
   endereço: dado pessoal não deve ir parar na URL nem no histórico. */

import { G, abrirFicha, ligarFicha } from './catalogo.js';

const CHAVE = 'authimports:contato';

/** Guarda o que a página de contato deve preencher. */
export function levarParaContato(dados) {
  try { sessionStorage.setItem(CHAVE, JSON.stringify(dados)); } catch (_) { /* sem armazenamento: o cliente preenche à mão */ }
}

/** Na página de contato: preenche o formulário com o recado e o apaga. */
export function preencherContato() {
  let dados = null;
  try {
    dados = JSON.parse(sessionStorage.getItem(CHAVE) || 'null');
    sessionStorage.removeItem(CHAVE);
  } catch (_) { return; }
  if (!dados) return;
  const por = { nome: 'f-nome', zap: 'f-zap', modelo: 'f-modelo' };
  Object.entries(por).forEach(([k, id]) => {
    const campo = document.getElementById(id);
    if (campo && dados[k]) campo.value = dados[k];
  });
}

/** Marca no menu o link da página aberta. */
export function marcarMenu() {
  const atual = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(a => {
    const destino = a.getAttribute('href') || '';
    if (destino === atual) a.setAttribute('aria-current', 'page');
  });
}

/** Endereços antigos (index.html#iphone-13-pro-semi) seguem abrindo a ficha certa. */
export function redirecionarFichaAntiga() {
  const id = decodeURIComponent(location.hash.slice(1));
  const gr = G.find(g => g.id === id);
  if (gr) location.replace((gr.pronta ? 'estoque.html' : 'catalogo.html') + '#' + gr.id);
}

/** Liga a ficha do aparelho nas páginas que mostram cartões. */
export function ligarFichaPagina() {
  const dlg = document.querySelector('dialog.ficha');
  if (!dlg) return;
  ligarFicha(dlg);
  // o clique no cartão só muda o endereço; quem abre a ficha é a rota
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-grupo]');
    if (!a) return;
    if (location.hash.slice(1) === a.dataset.grupo) {
      e.preventDefault();
      abrirFicha(a.dataset.grupo);
    }
  });
  dlg.querySelector('.ficha__wa').addEventListener('click', () => {
    levarParaContato({ modelo: dlg.querySelector('.ficha__wa').dataset.modelo || '' });
  });
  dlg.querySelector('.ficha__troca').addEventListener('click', e => {
    const b = e.currentTarget;
    location.href = 'troca.html?alvo=' + encodeURIComponent(b.dataset.grupo) + '&var=' + encodeURIComponent(b.dataset.var);
  });
}
