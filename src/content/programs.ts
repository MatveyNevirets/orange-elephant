export type Category='Творчество'|'Движение'|'Интеллект'|'Языки'|'Подготовка к школе';
export type Format='Группа'|'Индивидуально';
export interface Program {id:string;title:string;priceName:string;category:Category;min:number;max:number;ageLabel:string;formats:Format[];description:string;image:number;icon:string;color:string;}
export const programs:Program[]=[
 {id:'painting',title:'Живопись',priceName:'Живопись',category:'Творчество',min:5,max:12,ageLabel:'5–12 лет',formats:['Группа'],description:'Пробовать краски, замечать красоту и придумывать свои истории на бумаге.',image:14,icon:'palette',color:'peach'},
 {id:'chess',title:'Шахматы',priceName:'Шахматы',category:'Интеллект',min:4,max:12,ageLabel:'4–12 лет',formats:['Группа'],description:'Разбираться в правилах, обдумывать ходы и искать собственные решения.',image:19,icon:'chess',color:'green'},
 {id:'clay',title:'ИЗО и лепка',priceName:'Изо-лепка',category:'Творчество',min:3,max:5,ageLabel:'3–5 лет',formats:['Группа'],description:'Знакомиться с цветом и формой, творить и работать руками.',image:11,icon:'palette',color:'yellow'},
 {id:'dance',title:'Современные танцы',priceName:'Танцы современные',category:'Движение',min:4,max:12,ageLabel:'4–12 лет',formats:['Группа'],description:'Чувствовать ритм, осваивать движения и выражать себя в танце.',image:3,icon:'spark',color:'pink'},
 {id:'english',title:'Английский язык',priceName:'Английский язык',category:'Языки',min:5,max:13,ageLabel:'5–12 лет · индивидуально до 13',formats:['Группа','Индивидуально'],description:'Знакомиться с языком и практиковаться в подходящем ребёнку формате.',image:18,icon:'book',color:'blue'},
 {id:'school',title:'Подготовка к школе',priceName:'Подготовка к школе',category:'Подготовка к школе',min:5,max:7,ageLabel:'5–7 лет',formats:['Группа','Индивидуально'],description:'Постепенно знакомиться с учебными задачами и привычкой заниматься.',image:20,icon:'book',color:'yellow'},
 {id:'intellect',title:'Развитие интеллекта',priceName:'Развитие интеллекта',category:'Интеллект',min:2,max:5,ageLabel:'2–5 лет',formats:['Группа'],description:'Исследовать, сравнивать и решать первые познавательные задачи.',image:24,icon:'sun',color:'green'},
 {id:'garden',title:'Мини-сад',priceName:'Мини-сад',category:'Интеллект',min:2.5,max:10,ageLabel:'2,5–10 лет',formats:['Группа'],description:'Проводить время в детском пространстве и знакомиться с новыми занятиями.',image:5,icon:'heart',color:'peach'},
 {id:'break',title:'Брейк-данс',priceName:'Брейк-данс',category:'Движение',min:5,max:12,ageLabel:'5–12 лет',formats:['Группа'],description:'Знакомиться с культурой брейкинга и осваивать новые движения.',image:3,icon:'spark',color:'pink'},
 {id:'fight',title:'Рукопашный бой',priceName:'Рукопашный бой',category:'Движение',min:4,max:12,ageLabel:'4–12 лет',formats:['Группа'],description:'Знакомиться с дисциплиной и двигательными упражнениями.',image:4,icon:'spark',color:'blue'},
 ...['Русский язык','Математика','Окружающий мир','Чтение','Каллиграфия'].map((title,i):Program=>({id:'school-'+i,title,priceName:title,category:'Интеллект',min:6,max:13,ageLabel:'1–5 класс',formats:['Индивидуально'],description:'Индивидуальные занятия по школьному предмету. Программу и уровень обсудите с педагогом.',image:20,icon:'book',color:'green'}))
 ];
export const otherDirections=['Скорочтение','Монтессори','Ментальная арифметика','Группы продлённого дня','Джаз-модерн, джаз-фанк и хип-хоп'];
export const categories:Category[]=['Творчество','Движение','Интеллект','Языки','Подготовка к школе'];
