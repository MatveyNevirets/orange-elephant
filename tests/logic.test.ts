import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalizePhone,validateLead} from '../src/lib/lead';
import {recommend} from '../src/lib/recommend';
import {prices} from '../src/content/prices';
test('all 53 source prices have distinct ids and valid amounts',()=>{assert.equal(prices.length,53);assert.equal(new Set(prices.map(p=>p.id)).size,53);assert.ok(prices.every(p=>p.amount>0));assert.equal(prices.filter(p=>p.format==='individual').length,14);});
test('Russian phone and consent validation',()=>{assert.equal(normalizePhone('8 (906) 300-50-76'),'79063005076');assert.equal(normalizePhone('9063005076'),'79063005076');assert.ok(validateLead({phone:'+1 234'}).phone);assert.ok(validateLead({consent:false}).consent);});
test('recommendations respect age and format',()=>{assert.equal(recommend(2,'Творчество','Индивидуально').length,0);assert.ok(recommend(13,'Языки','Группа').every(p=>p.id!=='english'));const result=recommend(5,'Творчество','Группа');assert.equal(result[0].id,'painting');assert.ok(result.every(p=>p.min<=5&&p.max>=5));});
