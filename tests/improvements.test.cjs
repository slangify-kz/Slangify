const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const model=require('../content-model.js'),S=require('../study-core.js'),daily=require('../daily-data.js');
const catalog=require('../content/catalog.json');
const source=name=>fs.readFileSync(require.resolve('../'+name),'utf8');
test('777 unique validated entries and 77 additions; every daily answer exists',()=>{
 assert.equal(catalog.length,777);
 assert.equal(new Set(catalog.map(x=>model.normalize(x.word))).size,777);
 catalog.forEach(x=>model.entry(x));
 const context={window:{}};vm.runInNewContext(source('dictionary-additions.js'),context);
 assert.equal(context.window.SlangAdditions.length,77);
 for(const entry of context.window.SlangAdditions){
  assert.match(entry.kazakh,/[а-яәіңғүұқөһ]/i);
  assert.ok(entry.example.toLowerCase().includes(entry.word.toLowerCase()),entry.word);
 }
 const words=new Set(catalog.map(x=>model.normalize(x.word)));
 daily.questions.forEach(q=>q.answers.forEach(a=>assert.ok(words.has(model.normalize(a)),a)));
});
test('daily questions accept exactly the stated one or two answers in any order',()=>{
 assert.equal(daily.questions.length,60);
 assert.equal(new Set(daily.questions.map(q=>q.id)).size,daily.questions.length);
 for(const q of daily.questions){
  assert.ok([1,2].includes(q.answers.length));assert.equal(q.options.length,4);
  assert.equal(new Set(q.options).size,4);
  assert.equal(daily.grade(q,[...q.answers].reverse()),true);
  assert.equal(daily.grade(q,[]),false);
  assert.equal(daily.grade(q,q.options),false);
  assert.equal(daily.grade(q,[q.options.find(x=>!q.answers.includes(x)),...q.answers.slice(1)]),false);
  if(q.answers.length===2){assert.equal(daily.grade(q,[q.answers[0]]),false);assert.equal(daily.grade(q,[q.answers[0],q.answers[0]]),false)}
 }
 const q=daily.questions.find(q=>q.id==='honest');assert.deepEqual(q.answers,['tbh','ngl']);
 const seen=new Set();for(let n=0;n<40;n++)seen.add(daily.shuffle(['yes','a','b','c']).indexOf('yes'));
 assert.ok(seen.size>1,'answer position must vary');
});
test('personal downloads contain only the active participant and do not alter originals',()=>{
 const a=S.newProfile({seed:31,now:1700000000000}),b=S.newProfile({seed:32,now:1700000000000});
 a.lessons.c01={done:true,sentence:'My private practice sentence.'};
 const state={version:1,profiles:[a,b],active:a.id,seenBefore:false},before=JSON.stringify(state);
 const result=S.personalExport(state,true);
 assert.equal(result.profiles.length,1);assert.equal(result.profiles[0].id,a.id);
 assert.equal(result.profiles[0].lessons.c01.sentence,'');
 assert.equal(JSON.stringify(state),before);
 assert.equal(S.personalExport(state).profiles[0].lessons.c01.sentence,'My private practice sentence.');
 assert.equal(S.personalExport({...state,active:null}).profiles.length,0);
});
test('dictionary dedupes base entries, preserves edits, and keeps categories in sync',async()=>{
 const base=catalog.slice(0,700).map(e=>({w:e.word,m:e.meaning,k:e.kazakh,e:e.example,category:e.category}));
 const allItems=[...base,{...base[0]}],categories=Object.fromEntries([...new Set(catalog.map(x=>x.category))].map(k=>[k,[]]));
 const context={allItems,categories,slangSearch:{value:''},showCategory(){},searchAll(){},CustomEvent:class{},document:{getElementById(){return null},querySelector(){return null},querySelectorAll(){return []},dispatchEvent(){}},window:{SlangContentModel:model,SlangContent:{ready:Promise.resolve([{...catalog[0],meaning:'Owner edited definition.'}])}}};
 vm.runInNewContext(source('dictionary-additions.js'),context);vm.runInNewContext(source('dictionary-content.js'),context);
 await new Promise(setImmediate);
 assert.equal(allItems.length,777);assert.equal(allItems[0].m,'Owner edited definition.');
 assert.equal(Object.values(categories).flat().length,777);
 assert.equal(new Set(allItems.map(x=>model.normalize(x.w))).size,777);
});
async function ownerHarness(activeOwner){
 const owner=S.newProfile({seed:11,now:1700000000000}),other=S.newProfile({seed:22,now:1700000000000});
 owner.lessons[S.words[0].id]={done:false,attempts:2,best:3};owner.tests={};
 const state={version:1,profiles:[owner,other],active:activeOwner?owner.id:other.id};
 const storage=new Map([[S.key,JSON.stringify(state)],['slangify.saved-words.v1','{"favorite":{"w":"brb"}}']]),listeners={};
 const hash='55cc36704e98468e98f52085353d025e4db9a3c100bd6426b6edad190a31f5e4';
 const context={TextEncoder,Uint8Array,console,CustomEvent:class {constructor(type,init){this.type=type;this.detail=init?.detail}},crypto:{subtle:{async digest(_,bytes){return Uint8Array.from(Buffer.from(new TextDecoder().decode(bytes)===owner.id?hash:'00'.repeat(32),'hex')).buffer}}},
 localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},allItems:catalog.map(w=>({w:w.word})),
 document:{createElement:()=>({}),readyState:'loading',addEventListener:(k,fn)=>listeners[k]=fn,querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,dispatchEvent(){}},
 window:{SlangStudy:S,addEventListener(){}}};
 vm.runInNewContext(source('owner-mode.js'),context);await listeners.DOMContentLoaded();
 return {context,storage,owner,other,listeners};
}
test('owner completion changes only the active owner and never fabricates test scores',async()=>{
 const {context,storage,owner,other}=await ownerHarness(true),result=JSON.parse(storage.get(S.key));
 assert.equal(Object.values(result.profiles[0].lessons).filter(x=>x.done).length,30);
 assert.equal(result.profiles[0].lessons[S.words[0].id].best,3);
 assert.equal(result.profiles[0].lessons[S.words[0].id].attempts,2);
 assert.deepEqual(result.profiles[0].tests,owner.tests);assert.deepEqual(result.profiles[1],other);
 assert.equal(storage.get('slangify.saved-words.v1'),'{"favorite":{"w":"brb"}}');
 assert.equal(context.window.SlangOwnerProgress.collection().length,777);
 assert.equal(S.cleanProfile(result.profiles[0]).lessons[S.words[0].id].manual,true);
 result.active=other.id;storage.set(S.key,JSON.stringify(result));
 assert.equal(context.window.SlangOwnerProgress.known('brb'),false);
 assert.equal(context.window.SlangOwnerProgress.collection().length,0);
});
test('an owner profile saved in the browser does not complete another active profile',async()=>{
 const {context,storage,owner,other}=await ownerHarness(false),result=JSON.parse(storage.get(S.key));
 assert.deepEqual(result.profiles,[owner,other]);
 assert.equal(context.window.SlangOwnerProgress.active(),false);
});
