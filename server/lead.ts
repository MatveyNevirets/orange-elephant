import type {IncomingMessage,ServerResponse} from 'node:http';
import {randomUUID} from 'node:crypto';
import {normalizePhone,validateLead,type LeadPayload} from '../src/lib/lead';
export interface LeadProvider {send(payload:LeadPayload):Promise<{id:string;demo:boolean}>;}
export class MockLeadProvider implements LeadProvider {
 private records=new Map<string,{payload:LeadPayload;at:number;id:string}>();
 async send(payload:LeadPayload){const now=Date.now();for(const [key,record]of this.records)if(now-record.at>15*60*1000)this.records.delete(key);const existing=this.records.get(payload.requestId);if(existing)return {id:existing.id,demo:true};if(this.records.size>=100)this.records.delete(this.records.keys().next().value!);const id=randomUUID();this.records.set(payload.requestId,{payload,at:now,id});setTimeout(()=>this.records.delete(payload.requestId),15*60*1000).unref();console.info('[lead-demo]',{id,status:'accepted',provider:'mock'});return {id,demo:true};}
}
export class MaxLeadProvider implements LeadProvider {
 constructor(private env:Record<string,string>){}
 async send():Promise<{id:string;demo:boolean}>{if(!this.env.MAX_BOT_TOKEN||!this.env.MAX_CHAT_ID)throw new Error('MAX credentials missing');
 // TODO: Implement official MAX transport after owner supplies bot token, chat id and approves bot access. Never acknowledge delivery until API confirms it.
 throw new Error('MAX provider is not configured');}
}
export function leadMiddleware(env:Record<string,string>={}){
 const provider:LeadProvider=env.LEAD_PROVIDER==='max'?new MaxLeadProvider(env):new MockLeadProvider();
 const rate=new Map<string,{count:number;at:number}>();
 return async(req:IncomingMessage,res:ServerResponse)=>{
 const reply=(status:number,data:unknown)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
 if(req.method!=='POST'){reply(405,{error:'Метод не поддерживается'});return;}
 if(!req.headers['content-type']?.includes('application/json')){reply(415,{error:'Ожидается JSON'});return;}
 if(req.headers.origin&&req.headers.origin!==`http://${req.headers.host}`&&req.headers.origin!==`https://${req.headers.host}`){reply(403,{error:'Недопустимый источник запроса'});return;}
 const now=Date.now();for(const [key,v]of rate)if(now-v.at>60000)rate.delete(key);const ip=req.socket.remoteAddress||'local';const entry=rate.get(ip)||{count:0,at:now};if(entry.count>=10){reply(429,{error:'Слишком много попыток. Попробуйте через минуту.'});return;}entry.count++;rate.set(ip,entry);
 try{let body='';for await(const chunk of req){body+=chunk.toString();if(Buffer.byteLength(body)>16384){reply(413,{error:'Заявка слишком большая'});return;}}let p:unknown;try{p=JSON.parse(body);}catch{reply(400,{error:'Некорректный JSON'});return;}const errors=validateLead(p);if(Object.keys(errors).length){reply(400,{errors,error:'Проверьте поля формы'});return;}const payload=p as LeadPayload;const result=await provider.send({...payload,parentName:payload.parentName.trim(),phone:normalizePhone(payload.phone)});reply(200,{ok:true,...result});}catch{reply(503,{error:'Не удалось отправить. Попробуйте позже или позвоните в центр.'});}
 };
}
