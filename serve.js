// Servidor local para testar o site: node serve.js e abra http://localhost:4321
// O site (pasta site/) fica na raiz do endereço; a versão antiga em /antigo/.
const http = require('http'), fs = require('fs'), path = require('path');
const SITE = path.join(__dirname, 'site');
const ANTIGO = path.join(__dirname, 'antigo');
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff'
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let raiz = SITE;
  if (p === '/antigo' || p.startsWith('/antigo/')) {
    raiz = ANTIGO;
    p = p.slice('/antigo'.length) || '/';
    if (p === '/') p = '/authimports-demo.html';
  }
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(raiz, p);
  if (!f.startsWith(raiz) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('não encontrado');
  }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(4321, () => console.log('Site: http://localhost:4321   Versão antiga: http://localhost:4321/antigo/'));
