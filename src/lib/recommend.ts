import {programs,type Category,type Format} from '../content/programs';
export function recommend(age:number,interest:Category,format:Format){return programs.filter(p=>age>=p.min&&age<=p.max&&p.formats.includes(format)&&!(p.id==='english'&&format==='Группа'&&age>12)&&!p.id.startsWith('school-')).sort((a,b)=>Number(b.category===interest)-Number(a.category===interest)).slice(0,4);}
