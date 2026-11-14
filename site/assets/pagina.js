/* O que toda página do site divide: menu marcando a página atual, os botões
   de WhatsApp e Instagram, o botão flutuante e a ficha do aparelho. */

import { abrirFicha, ligarFicha } from './catalogo.js';
import { linkWhatsApp, linkInstagram, ICONE_WHATSAPP, ICONE_INSTAGRAM } from './loja.js';

/** Marca no menu o link da página aberta (só a troca é outra página). */
export function marcarMenu() {
  const atual = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(a => {
    if ((a.getAttribute('href') || '') === atual) a.setAttribute('aria-current', 'page');
  });
}

/** Liga todo [data-zap] ao WhatsApp da loja e todo [data-insta] ao Instagram. */
export function ligarContatos() {
  document.querySelectorAll('[data-zap]').forEach(a => {
    a.href = linkWhatsApp(a.dataset.zap || undefined);
    a.target = '_blank';
    a.rel = 'noopener';
  });
  const insta = linkInstagram();
  document.querySelectorAll('[data-insta]').forEach(a => {
    if (!insta) { a.hidden = true; return; }
    a.href = insta;
    a.target = '_blank';
    a.rel = 'noopener';
  });
  document.querySelectorAll('[data-icone="whatsapp"]').forEach(s => { s.innerHTML = ICONE_WHATSAPP; });
  document.querySelectorAll('[data-icone="instagram"]').forEach(s => { s.innerHTML = ICONE_INSTAGRAM; });
}

/** O botão verde do WhatsApp, fixo no canto inferior direito. */
export function botaoFlutuante() {
  if (document.querySelector('.zap-flutua')) return;
  const a = document.createElement('a');
  a.className = 'zap-flutua';
  a.href = linkWhatsApp();
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', 'Falar no WhatsApp');
  a.innerHTML = ICONE_WHATSAPP;
  document.body.appendChild(a);
}

/** Liga a ficha do aparelho na página que mostra cartões. */
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
  dlg.querySelector('.ficha__troca').addEventListener('click', e => {
    const b = e.currentTarget;
    location.href = 'troca.html?alvo=' + encodeURIComponent(b.dataset.grupo) + '&var=' + encodeURIComponent(b.dataset.var);
  });
}

/** Ao atualizar, a página volta ao topo em vez de onde o usuário parou.
    Endereço com âncora (#catalogo, #iphone-13-semi) segue indo ao lugar certo. */
export function voltarAoTopo() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) { scrollTo(0, 0); return; }
  // âncora de seção: rola até ela depois que as listas montarem (a ficha tem a própria rota)
  const alvo = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (alvo && alvo.tagName === 'SECTION') {
    addEventListener('load', () => alvo.scrollIntoView({ block: 'start' }), { once: true });
  }
}

/** Tudo que toda página liga ao abrir. */
export function ligarPagina() {
  voltarAoTopo();
  marcarMenu();
  ligarContatos();
  botaoFlutuante();
}
