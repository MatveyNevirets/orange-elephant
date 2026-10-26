import {readFile,writeFile} from 'node:fs/promises';
try{process.loadEnvFile('.env');}catch(error){if(error.code!=='ENOENT')throw error;}
const input=process.argv[2]||process.env.SITE_URL;if(!input)throw new Error('Supply your domain: npm run seo -- https://your-domain.ru');
const url=new URL(input);if(url.protocol!=='https:')throw new Error('Use an HTTPS origin');const origin=url.origin;
await writeFile('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url><url><loc>${origin}/privacy</loc></url></urlset>`);
await writeFile('public/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
let html=await readFile('index.html','utf8');html=html.replace(/<link rel="canonical"[^>]*>/g,'').replace(/<meta property="og:url"[^>]*>/g,'').replace(/<meta property="og:image"[^>]*>/g,`<meta property="og:image" content="${origin}/media/photo-14.webp"/>`);html=html.replace('</head>',`<link rel="canonical" href="${origin}/"/><meta property="og:url" content="${origin}/"/></head>`);await writeFile('index.html',html);console.log('SEO domain configured:',origin);
