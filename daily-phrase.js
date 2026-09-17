(()=>{
'use strict';
const DAILY_KEY='slangify.daily-phrase.v5';
const norm=s=>String(s??'').trim().toLowerCase().replace(/[’']/g,"'");
const escRx=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function dateKey(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function seedFrom(text){let h=2166136261>>>0;for(const ch of String(text)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)>>>0}return h||1}
function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
function shuffled(items,seed){const a=[...items],r=rng(seed);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function adapt(entry){return {w:entry.word||entry.w,m:entry.meaning||entry.m||entry.en,k:entry.kazakh||entry.k||entry.kk,e:entry.example||entry.e||'',category:entry.category||entry.p||'Everyday English'}}
function blankExample(item){
 const text=String(item.e||'').trim();if(!text)return '';
 const rx=new RegExp('(^|[^A-Za-z0-9])('+escRx(item.w)+')(?=$|[^A-Za-z0-9])','i');
 return rx.test(text)?text.replace(rx,(m,prefix)=>prefix+'_____'):'';
}
function uniquePool(){
 const source=(typeof allItems!=='undefined'&&Array.isArray(allItems)&&allItems.length?allItems:(window.SlangContent?.entries||[])).map(adapt);
 const out=[],seen=new Set();
 for(const item of source){const key=norm(item.w);if(!key||seen.has(key)||!item.m||!blankExample(item))continue;seen.add(key);out.push(item)}
 return out;
}
function distractors(item,pool,seed){
 const currentCategory=norm(item.category),same=pool.filter(other=>norm(other.w)!==norm(item.w)&&norm(other.category)!==currentCategory),rest=pool.filter(other=>norm(other.w)!==norm(item.w));
 const source=same.length>=3?same:rest;
 const picked=[],seen=new Set([norm(item.w)]);
 for(const other of shuffled(source,seed)){const key=norm(other.w);if(!key||seen.has(key))continue;seen.add(key);picked.push(other.w);if(picked.length===3)break}
 return picked;
}
function loadOwnerMode(){
 if(document.querySelector('script[data-slangify-owner-mode]'))return;
 const script=document.createElement('script');script.src='owner-mode.js?v=20260917b';script.dataset.slangifyOwnerMode='true';document.head.appendChild(script);
}
function setup(){
 const host=document.querySelector('.search-tools');if(!host)return;
 const pool=uniquePool();if(pool.length<4)return;
 const existing=document.querySelector('.daily-phrase');if(existing)existing.remove();
 const box=document.createElement('section');box.className='daily-phrase';box.setAttribute('aria-label','Daily slang practice');host.before(box);
 let day=dateKey(),baseSeed=seedFrom(day),index=baseSeed%pool.length,first=true,questionNo=1,used=new Set([index]);
 function nextIndex(){
  if(used.size>=pool.length)used=new Set([index]);
  const available=[];for(let i=0;i<pool.length;i++)if(!used.has(i))available.push(i);
  const r=rng(baseSeed^seedFrom(String(questionNo)));const next=available[Math.floor(r()*available.length)];used.add(next);return next;
 }
 function render(){
  const item=pool[index],gap=blankExample(item),wrong=distractors(item,pool,baseSeed^seedFrom(item.w)^questionNo),options=shuffled([item.w,...wrong],baseSeed^seedFrom(item.w+'|options|'+questionNo));
  box.replaceChildren();
  const top=document.createElement('div');top.className='daily-top';
  const heading=document.createElement('h2');heading.textContent=first?'Phrase of the day':'Daily practice';
  const tag=document.createElement('span');tag.textContent=`QUESTION ${questionNo} · ${pool.length} IN BANK · 4 OPTIONS · 1 ANSWER`;top.append(heading,tag);
  const situation=document.createElement('p');situation.className='daily-situation';situation.textContent='Choose the slang word or phrase that fits the blank.';
  const sentence=document.createElement('p');sentence.className='daily-gap';sentence.textContent=gap;
  const group=document.createElement('div');group.className='daily-options';group.setAttribute('role','group');group.setAttribute('aria-label','Choose the missing slang expression');
  const feedback=document.createElement('p');feedback.className='daily-feedback';feedback.setAttribute('role','status');
  const actions=document.createElement('div');actions.className='daily-actions';actions.hidden=true;
  let answered=false;
  function choose(answer,persist=true){
   if(answered)return;answered=true;const correct=norm(answer)===norm(item.w);
   group.querySelectorAll('button').forEach(b=>{b.disabled=true;b.setAttribute('aria-pressed',String(b.textContent===answer));if(norm(b.textContent)===norm(item.w))b.dataset.correct='true'});
   sentence.textContent=gap.replace('_____',item.w);
   feedback.textContent=(correct?'You got it. ':'The correct answer is '+item.w+'. ')+item.m+' · '+item.k;
   actions.hidden=false;
   if(first&&persist)try{localStorage.setItem(DAILY_KEY,JSON.stringify({day,word:item.w,answer}))}catch{}
  }
  options.forEach(option=>{const b=document.createElement('button');b.type='button';b.textContent=option;b.onclick=()=>choose(option);group.appendChild(b)});
  const learn=document.createElement('button');learn.type='button';learn.textContent='Explore this word';learn.onclick=()=>window.SlangStudio?.open({w:item.w,m:item.m,k:item.k,e:item.e,p:item.category});
  const next=document.createElement('button');next.type='button';next.textContent='Next question →';next.onclick=()=>{questionNo++;index=nextIndex();first=false;render();box.querySelector('.daily-options button')?.focus()};
  actions.append(learn,next);box.append(top,situation,sentence,group,feedback,actions);
  if(first)try{const saved=JSON.parse(localStorage.getItem(DAILY_KEY)||'null');if(saved?.day===day&&norm(saved.word)===norm(item.w)&&options.some(x=>norm(x)===norm(saved.answer)))choose(saved.answer,false)}catch{}
 }
 render();
 document.addEventListener('visibilitychange',()=>{if(document.hidden||dateKey()===day)return;day=dateKey();baseSeed=seedFrom(day);index=baseSeed%pool.length;first=true;questionNo=1;used=new Set([index]);render()});
}
function startWhenReady(){
 let started=false;const start=()=>{if(started)return;const pool=uniquePool();if(pool.length<4)return;started=true;setup()};
 document.addEventListener('slangify:dictionary-ready',start,{once:true});
 Promise.resolve(window.SlangContent?.ready).then(()=>queueMicrotask(start));
 setTimeout(start,1200);
}
loadOwnerMode();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startWhenReady,{once:true});else startWhenReady();
})();