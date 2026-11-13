const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=__dirname;
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]);
  if(p==='/')p='/authimports-demo.html';
  const f=path.join(ROOT,p);
  if(!f.startsWith(ROOT)||!fs.existsSync(f)){res.writeHead(404);return res.end('nao encontrado');}
  const ext=path.extname(f);
  const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp'};
  res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'});
  fs.createReadStream(f).pipe(res);
}).listen(4321,()=>console.log('http://localhost:4321'));
