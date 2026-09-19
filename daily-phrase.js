(()=>{
'use strict';
const D=window.SlangDaily;if(!D)return;
const key='slangify.daily-phrase.v6';
const dateKey=()=>new Date().toLocaleDateString('sv-SE');
function setup(){
 const host=document.querySelector('.search-tools');if(!host)return;
 const box=document.createElement('section');box.className='daily-phrase';box.setAttribute('aria-label','Daily slang practice');host.before(box);
 let day=dateKey(),round=0,queue=[];
 const dailyIndex=()=>[...day].reduce((n,c)=>(n*31+c.charCodeAt(0))>>>0,17)%D.questions.length;
 let index=dailyIndex();
 function render(){
  const q=D.questions[index],options=D.shuffle(q.options);let selected=[],answered=false;
  box.replaceChildren();
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n};
  const top=el('div','daily-top');top.append(el('h2','',round?'One more situation':'Phrase of the day'),el('span','','QUESTION '+(round+1)+' · '+D.questions.length+' SITUATIONS'));
  const hint=el('div','daily-clue');hint.append(el('span','','Meaning to express'),el('p','',q.meaning));
  const kk=el('p','',q.kazakh);kk.lang='kk';hint.append(kk);
  const sentence=el('p','daily-gap',q.sentence);
  const instruction=el('p','daily-situation',q.answers.length===1?'Choose 1 answer · Бір жауапты таңда':'Choose 2 answers · Екі жауапты таңда');instruction.id='daily-instruction';
  const group=el('div','daily-options');group.setAttribute('role','group');group.setAttribute('aria-labelledby','daily-instruction');
  const check=el('button','daily-check','Check answer');check.type='button';check.disabled=true;
  const feedback=el('p','daily-feedback');feedback.setAttribute('role','status');
  const actions=el('div','daily-actions');actions.hidden=true;
  function paint(){group.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(selected.includes(b.textContent))));check.disabled=selected.length!==q.answers.length}
  function finish(persist=true){
   if(answered||selected.length!==q.answers.length)return;answered=true;
   const correct=D.grade(q,selected);
   group.querySelectorAll('button').forEach(b=>{b.disabled=true;if(q.answers.includes(b.textContent))b.dataset.correct='true';else if(selected.includes(b.textContent))b.dataset.wrong='true'});
   sentence.textContent=q.answers.map(a=>q.sentence.replace('_____',a)).join(' / ');
   feedback.textContent=(correct?'Correct! ':'Answer'+(q.answers.length===2?'s':'')+': '+q.answers.join(' + ')+'. ')+q.meaning+' · '+q.kazakh;
   check.hidden=true;actions.hidden=false;
   if(!round&&persist)try{localStorage.setItem(key,JSON.stringify({day,id:q.id,selected}))}catch{}
  }
  for(const option of options){const b=el('button','',option);b.type='button';b.setAttribute('aria-pressed','false');b.onclick=()=>{if(answered)return;if(q.answers.length===1)selected=[option];else if(selected.includes(option))selected=selected.filter(x=>x!==option);else if(selected.length<2)selected.push(option);else {feedback.textContent='Two selected. Tap one to change it.';return}feedback.textContent='';paint()};group.append(b)}
  check.onclick=()=>finish();
  for(const word of q.answers){const learn=el('button','','Explore '+word);learn.type='button';learn.onclick=()=>{const item=typeof allItems!=='undefined'?allItems.find(x=>x.w.toLowerCase()===word.toLowerCase()):null;window.SlangStudio?.open(item||{w:word,m:q.meaning,k:q.kazakh,e:q.sentence.replace('_____',word),p:'Everyday English'})};actions.append(learn)}
  const next=el('button','','Next question →');next.type='button';next.onclick=()=>{if(!queue.length)queue=D.shuffle(D.questions.map((_,i)=>i).filter(i=>i!==index));index=queue.pop();round++;render();box.querySelector('.daily-options button').focus()};actions.append(next);
  box.append(top,hint,sentence,instruction,group,check,feedback,actions);
  if(!round)try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved?.day===day&&saved.id===q.id&&Array.isArray(saved.selected)&&saved.selected.length===q.answers.length&&new Set(saved.selected).size===saved.selected.length&&saved.selected.every(x=>options.includes(x))){selected=saved.selected;paint();finish(false)}}catch{}
 }
 render();
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&dateKey()!==day){day=dateKey();round=0;queue=[];index=dailyIndex();render()}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();
