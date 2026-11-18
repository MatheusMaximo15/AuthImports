/* Contato da loja. É o único lugar para trocar o número e o Instagram.

   whatsapp: só dígitos, com DDI e DDD. Ex.: '5511912345678'.
   instagram: o usuário, sem @. Ex.: 'authimports'.

   Enquanto o número estiver vazio, os botões abrem o WhatsApp com a mensagem
   pronta e a pessoa escolhe o contato. Sem Instagram, o ícone some. */

export const LOJA = {
  whatsapp: '553198880979',
  instagram: 'auth_imports',
  // Identidade da loja, passada pelo dono. Quem compra seminovo de um
  // desconhecido procura endereço e CNPJ antes de qualquer outra coisa.
  razao: 'Auth Imports',
  cnpj: '37815326000187',
  endereco: 'R. José Monteiro, 440 — Sala 5',
  bairro: 'Centro',
  cidade: 'Juatuba',
  uf: 'MG',
  cep: '35675-000'
};

/** CNPJ no formato que o brasileiro reconhece: 00.000.000/0000-00. */
export function cnpjFormatado() {
  const d = (LOJA.cnpj || '').replace(/\D/g, '');
  if (d.length !== 14) return '';
  return d.slice(0, 2) + '.' + d.slice(2, 5) + '.' + d.slice(5, 8) + '/' + d.slice(8, 12) + '-' + d.slice(12);
}

/** O número como se escreve no Brasil: +55 31 9888-0979. O link do WhatsApp
    some quando a pessoa está no desktop sem o WhatsApp Web, e aí ela precisa
    do número para digitar no telefone. */
export function numeroFormatado() {
  const d = (LOJA.whatsapp || '').replace(/\D/g, '');
  if (d.length < 12) return '';
  const pais = d.slice(0, 2), ddd = d.slice(2, 4), resto = d.slice(4);
  const meio = resto.length > 8 ? resto.slice(0, 5) : resto.slice(0, 4);
  return '+' + pais + ' ' + ddd + ' ' + meio + '-' + resto.slice(meio.length);
}

/** O endereço em uma linha, sem os campos que a loja não preencheu. */
export function enderecoLinha() {
  const l = LOJA;
  const partes = [l.endereco, l.bairro, [l.cidade, l.uf].filter(Boolean).join(' ')].filter(Boolean);
  return partes.join(' · ') + (l.cep ? ' · ' + l.cep : '');
}

export const MENSAGEM_PADRAO = 'Olá, Auth Imports! Vim pelo site e quero saber dos aparelhos disponíveis.';

export function linkWhatsApp(texto = MENSAGEM_PADRAO) {
  const numero = LOJA.whatsapp.replace(/\D/g, '');
  return 'https://wa.me/' + numero + (texto ? '?text=' + encodeURIComponent(texto) : '');
}

export function linkInstagram() {
  const u = LOJA.instagram.replace(/^@/, '').trim();
  return u ? 'https://instagram.com/' + encodeURIComponent(u) : '';
}

/* ícones (WhatsApp: glifo oficial simplificado; Instagram: desenhado em traço) */
export const ICONE_WHATSAPP = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41"/></svg>';
export const ICONE_INSTAGRAM = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>';
