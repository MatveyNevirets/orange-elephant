import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {leadMiddleware} from './lead';
const api=leadMiddleware(process.env as Record<string,string>);
const root=resolve('dist');
const mime:Record<string,string>={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.mp4':'video/mp4','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
createServer(async(req,res)=>{
 const path=new URL(req.url||'/', 'http://localhost').pathname;
 if(path==='/api/lead'){await api(req,res);return;}
 try{
  const file=resolve(root,'.'+decodeURIComponent(path));
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return;}
  let content:Buffer;let extension=path==='/'?'.html':extname(file);
  try{content=await readFile(path==='/'?resolve(root,'index.html'):file);}
  catch{if(extension){res.writeHead(404).end('Не найдено');return;}content=await readFile(resolve(root,'index.html'));extension='.html';}
  const headers={'Content-Type':mime[extension]||'application/octet-stream','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
  if(req.headers.range){
   const range=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
   if(!range||(!range[1]&&!range[2])){res.writeHead(416,{'Content-Range':`bytes */${content.length}`}).end();return;}
   const start=range[1]?Number(range[1]):Math.max(0,content.length-Number(range[2]));
   const end=range[1]&&range[2]?Math.min(Number(range[2]),content.length-1):content.length-1;
   if(start>=content.length||start>end){res.writeHead(416,{'Content-Range':`bytes */${content.length}`}).end();return;}
   res.writeHead(206,{...headers,'Content-Length':end-start+1,'Content-Range':`bytes ${start}-${end}/${content.length}`}).end(req.method==='HEAD'?undefined:content.subarray(start,end+1));return;
  }
  res.writeHead(200,{...headers,'Content-Length':content.length}).end(req.method==='HEAD'?undefined:content);
 }catch{res.writeHead(400).end();}
}).listen(Number(process.env.PORT||3000),'127.0.0.1',()=>console.log('Site: http://127.0.0.1:'+(process.env.PORT||3000)));
