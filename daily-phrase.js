(()=>{
'use strict';
const situations=[
 ['brb','You need a short break from a chat.','_____ — I need to get some water.',['brb','tbh','gg','idk'],'Be right back.','Қазір қайтып келемін.'],
 ['my bad','You sent a friend the wrong homework page.','Oops, _____. Here is the right one.',['my bad','no cap','FOMO','AFK'],'My mistake; sorry.','Менің қателігім; кешір.'],
 ['idk','Your friend asks when the next bus comes, but you are unsure.','_____. Let’s check the timetable.',['idk','gg','ASAP','slay'],'I do not know.','Білмеймін.'],
 ['ngl','You want to admit that an exam was difficult.','_____, that exam was harder than I expected.',['ngl','brb','DM','noob'],'Not going to lie; honestly.','Шынымды айтсам.'],
 ['gg','A game has just finished and you want to be friendly.','_____! That was a close match.',['gg','FYI','cram','sus'],'Good game.','Жақсы ойын.'],
 ['lowkey','You like a song but do not want to make a big deal of it.','I _____ like this song.',['lowkey','ASAP','brb','deadline'],'A little, or without making it obvious.','Аздап; білдіртпей.'],
 ['hang out','You want to spend time with a friend after school.','Want to _____ at the park?',['hang out','nerf','repost','ace'],'Spend time together.','Бірге уақыт өткізу.'],
 ['cram','You left your studying until the night before an exam.','I need to _____ for tomorrow’s test.',['cram','ghost','buff','repost'],'Study a lot in a short time.','Қысқа уақытта көп оқу.'],
 ['FYI','You are giving a classmate useful information.','_____, the lesson starts at nine today.',['FYI','gg','brb','GOAT'],'For your information.','Ақпарат үшін.'],
 ['catch up','You missed a lesson and want to learn what you missed.','I need to _____ on yesterday’s work.',['catch up','rage quit','ghost','flex'],'Do what you missed.','Қалып қойғанды толықтыру.'],
 ['tbh','A friend asks for your honest opinion of a game.','_____, I liked the first version more.',['tbh','AFK','POV','brb'],'To be honest.','Шынымды айтсам.'],
 ['heads-up','You want to warn a friend about a schedule change.','Just a _____: practice starts earlier today.',['heads-up','noob','crush','meme'],'An advance warning.','Алдын ала ескерту.'],
 ['ace','Your friend did very well on a difficult test.','You’re going to _____ the next one too.',['ace','lag','repost','ghost'],'Do very well on a test.','Емтиханды өте жақсы тапсыру.'],
 ['chill','Your exams are over and you want a quiet evening.','Let’s _____ at home for a while.',['chill','cram','nerf','spawn'],'Relax.','Демалу.']
];
const norm=s=>String(s).trim().toLowerCase();
const key='slangify.daily-phrase.v1';
function dateKey(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function setup(){
 const host=document.querySelector('.search-tools');if(!host)return;
 const box=document.createElement('section');box.className='daily-phrase';box.setAttribute('aria-label','Phrase of the day');host.before(box);
 let day=dateKey(),seed=[...day].reduce((v,c)=>(v*31+c.charCodeAt(0))>>>0,17),index=seed%situations.length,first=true;
 function render(){
  const item=situations[index],options=[...item[3]];
  for(let i=options.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[options[i],options[j]]=[options[j],options[i]]}
  box.replaceChildren();
  const top=document.createElement('div');top.className='daily-top';
  const heading=document.createElement('h2');heading.textContent=first?'Phrase of the day':'One more situation';
  const tag=document.createElement('span');tag.textContent='ONE MINUTE · REAL LIFE';top.append(heading,tag);
  const situation=document.createElement('p');situation.className='daily-situation';situation.textContent=item[1];
  const gap=document.createElement('p');gap.className='daily-gap';gap.textContent=item[2];
  const group=document.createElement('div');group.className='daily-options';group.setAttribute('role','group');group.setAttribute('aria-label','Choose the missing expression');
  const feedback=document.createElement('p');feedback.className='daily-feedback';feedback.setAttribute('role','status');
  const actions=document.createElement('div');actions.className='daily-actions';actions.hidden=true;
  let answered=false;
  function choose(answer,persist=true){
   if(answered)return;answered=true;
   group.querySelectorAll('button').forEach(b=>{b.disabled=true;b.setAttribute('aria-pressed',String(b.textContent===answer));if(norm(b.textContent)===norm(item[0]))b.dataset.correct='true'});
   gap.textContent=item[2].replace('_____',item[0]);
   feedback.textContent=(norm(answer)===norm(item[0])?'You got it. ':'The answer is '+item[0]+'. ')+item[4]+' · '+item[5];
   actions.hidden=false;
   if(first&&persist)try{localStorage.setItem(key,JSON.stringify({day,word:item[0],answer}))}catch{}
  }
  options.forEach(option=>{const b=document.createElement('button');b.type='button';b.textContent=option;b.onclick=()=>choose(option);group.append(b)});
  const learn=document.createElement('button');learn.type='button';learn.textContent='Explore this word';
  learn.onclick=()=>window.SlangStudio?.open({w:item[0],m:item[4],k:item[5],e:item[2].replace('_____',item[0]),p:'Everyday English'});
  const next=document.createElement('button');next.type='button';next.textContent='Another situation →';next.onclick=()=>{index=(index+1+Math.floor(Math.random()*(situations.length-1)))%situations.length;first=false;render();box.querySelector('button').focus()};
  actions.append(learn,next);box.append(top,situation,gap,group,feedback,actions);
  if(first)try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved?.day===day&&saved.word===item[0]&&options.includes(saved.answer))choose(saved.answer,false)}catch{}
 }
 render();
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&dateKey()!==day){day=dateKey();seed=[...day].reduce((v,c)=>(v*31+c.charCodeAt(0))>>>0,17);index=seed%situations.length;first=true;render()}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();
