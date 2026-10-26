import {prices,rub} from './prices';
const min=(predicate:(p:typeof prices[number])=>boolean)=>Math.min(...prices.filter(predicate).map(p=>p.amount));
export const pricing={
 trial:min(p=>p.category.includes('Пробное')),
 single:min(p=>p.format==='group'&&p.category.includes('Разовое')),
 individual:min(p=>p.format==='individual'&&p.category.includes('Разовое')),
 annual:min(p=>p.category.includes('Годовой')),
 groupProgram:min(p=>p.category==='Групповые занятия'),
 individualProgram:min(p=>p.category==='Индивидуальные занятия')
};
export const priceHighlights=[
 {label:'Знакомимся',title:'Пробное в группе',price:rub(pricing.trial),note:'Для направлений с пробным занятием'},
 {label:'Пробуем ещё',title:'Разовое в группе',price:'от '+rub(pricing.single),note:'Стоимость зависит от направления'},
 {label:'Свой темп',title:'Индивидуально',price:'от '+rub(pricing.individual),note:'Разовое занятие по выбранному предмету'},
 {label:'Надолго',title:'Годовой абонемент',price:'от '+rub(pricing.annual),note:'Направление и условия уточняйте'}
];
