/* O que toda página do site divide: menu marcando a página atual, os botões
   de WhatsApp e Instagram, o botão flutuante e a ficha do aparelho. */

import { abrirFicha, ligarFicha } from './catalogo.js';
import { LOJA, linkWhatsApp, linkInstagram, cnpjFormatado, enderecoLinha, numeroFormatado, praca,
         ICONE_WHATSAPP, ICONE_INSTAGRAM } from './loja.js';

/** Marca no menu o link da página aberta (só a troca é outra página).
    Na inicial os links são âncoras (#estoque, #catalogo), então comparar com o
    nome do arquivo nunca marcava nada: quem diz a seção atual é `seguirSecoes`. */
export function marcarMenu() {
  // o Cloudflare serve /troca e /politicas sem o .html, então os dois lados
  // são normalizados antes de comparar
  const nu = s => (s || '').split('#')[0].split('?')[0].replace(/\.html$/, '').replace(/^\.?\//, '');
  const atual = nu(location.pathname.split('/').pop()) || 'index';
  document.querySelectorAll('.nav__link').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) return;
    if (nu(href) === atual) a.setAttribute('aria-current', 'page');
  });
}

/** Numa página só, o menu marca a seção que está na tela.
    Por rolagem e não por IntersectionObserver: o observador não entrega
    enquanto a aba está em segundo plano, e aí o menu ficava mudo. */
export function seguirSecoes() {
  const links = [...document.querySelectorAll('.nav__link')]
    .filter(a => (a.getAttribute('href') || '').startsWith('#'));
  const alvos = links.map(a => ({ a, el: document.getElementById(a.getAttribute('href').slice(1)) }))
                     .filter(x => x.el);
  if (!alvos.length) return;

  // a linha de leitura fica a 40% da altura da tela, abaixo do menu fixo
  const pintar = () => {
    const linha = innerHeight * 0.4;
    let atual = null;
    for (const x of alvos) {
      const r = x.el.getBoundingClientRect();
      if (r.top <= linha && r.bottom > linha) { atual = x; break; }
    }
    // o fim da página marca a última seção, que pode ser curta demais
    if (!atual && scrollY + innerHeight >= document.documentElement.scrollHeight - 4) {
      atual = alvos[alvos.length - 1];
    }
    alvos.forEach(x => {
      if (x === atual) x.a.setAttribute('aria-current', 'true');
      else if (x.a.getAttribute('aria-current') === 'true') x.a.removeAttribute('aria-current');
    });
  };

  // limite por relógio e não por requestAnimationFrame, que também para quando
  // a aba está em segundo plano. São quatro medidas por quadro, não pesa.
  let ultimo = 0;
  const agendar = () => {
    const agora = Date.now();
    if (agora - ultimo < 100) return;
    ultimo = agora;
    pintar();
  };
  addEventListener('scroll', agendar, { passive: true });
  addEventListener('resize', agendar);
  pintar();
}

/** Preenche endereço e CNPJ onde a página pedir. Dados em loja.js. */
export function ligarIdentidade() {
  const linha = enderecoLinha(), cnpj = cnpjFormatado();
  document.querySelectorAll('[data-loja-endereco]').forEach(e => { e.textContent = linha; });
  document.querySelectorAll('[data-loja-cnpj]').forEach(e => {
    if (!cnpj) { e.hidden = true; return; }
    e.textContent = 'CNPJ ' + cnpj;
  });
  document.querySelectorAll('[data-loja-cidade]').forEach(e => {
    e.textContent = LOJA.cidade + (LOJA.uf ? ' e região' : '');
  });
  const local = praca();
  document.querySelectorAll('[data-loja-local]').forEach(e => {
    if (!local) { e.hidden = true; return; }
    e.textContent = local;
  });
  const numero = numeroFormatado();
  document.querySelectorAll('[data-loja-numero]').forEach(e => {
    if (!numero) { e.hidden = true; return; }
    e.textContent = numero;
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
  seguirSecoes();
  ligarIdentidade();
  ligarContatos();
  botaoFlutuante();
}
