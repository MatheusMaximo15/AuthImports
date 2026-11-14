// Servidor local para testar o site: node serve.js e abra http://localhost:4321
// O site (pasta site/) fica na raiz do endereço; a versão antiga em /antigo/.
// Imita o Cloudflare Pages: cabeçalhos do site/_headers, /troca serve troca.html
// e endereço inexistente devolve 404 com a página 404.html.
const http = require('http'), fs = require('fs'), path = require('path');
const SITE = path.join(__dirname, 'site');
const ANTIGO = path.join(__dirname, 'antigo');
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml'
};

// cabeçalhos do bloco "/*" do site/_headers, para testar a CSP aqui
const CABECALHOS = {};
try {
  let dentro = false;
  const linhas = fs.readFileSync(path.join(SITE, '_headers'), 'utf8').split('\n');
  for (const bruta of linhas) {
    const linha = bruta.replace('\r', '');
    if (/^\S/.test(linha)) { dentro = linha.trim() === '/*'; continue; }
    const m = dentro && linha.match(/^\s+([\w-]+):\s*(.+)$/);
    if (m) CABECALHOS[m[1]] = m[2];
  }
} catch (_) { /* sem _headers: serve sem */ }

const existe = f => fs.existsSync(f) && fs.statSync(f).isFile();

http.createServer((req, res) => {
  for (const [k, v] of Object.entries(CABECALHOS)) res.setHeader(k, v);
  let p = decodeURIComponent(req.url.split('?')[0]);
  let raiz = SITE;
  if (p === '/antigo' || p.startsWith('/antigo/')) {
    raiz = ANTIGO;
    p = p.slice('/antigo'.length) || '/';
    if (p === '/') p = '/authimports-demo.html';
  }
  if (p.endsWith('/')) p += 'index.html';
  let f = path.join(raiz, p);
  if (!path.extname(f) && existe(f + '.html')) f += '.html';
  if (!f.startsWith(raiz) || !existe(f)) {
    const p404 = path.join(SITE, '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return existe(p404) ? fs.createReadStream(p404).pipe(res) : res.end('não encontrado');
  }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(4321, () => console.log('Site: http://localhost:4321   Versão antiga: http://localhost:4321/antigo/'));
