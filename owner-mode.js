(()=>{
'use strict';
const STUDY_KEY='slangify.study.v1';
const OWNER_HASH='55cc36704e98468e98f52085353d025e4db9a3c100bd6426b6edad190a31f5e4';
const enc=new TextEncoder();
async function digest(text){
 if(!crypto?.subtle)return '';
 const bytes=await crypto.subtle.digest('SHA-256',enc.encode(String(text)));
 return [...new Uint8Array(bytes)].map(x=>x.toString(16).padStart(2,'0')).join('');
}
function readState(){try{return JSON.parse(localStorage.getItem(STUDY_KEY)||'null')}catch{return null}}
async function ownerProfile(state){
 if(!state?.profiles?.length)return null;
 for(const profile of state.profiles)if(await digest(profile?.id)===OWNER_HASH)return profile;
 return null;
}
function ensureStudyCore(){
 if(window.SlangStudy)return Promise.resolve(window.SlangStudy);
 return new Promise(resolve=>{
  const found=document.querySelector('script[data-slangify-study-core]');
  if(found){found.addEventListener('load',()=>resolve(window.SlangStudy||null),{once:true});found.addEventListener('error',()=>resolve(null),{once:true});return}
  const script=document.createElement('script');script.src='study-core.js?v=20260917b';script.dataset.slangifyStudyCore='true';script.onload=()=>resolve(window.SlangStudy||null);script.onerror=()=>resolve(null);document.head.appendChild(script);
 });
}
function masterCore(state,profile){
 if(!window.SlangStudy?.words||!profile)return false;
 let changed=false;profile.lessons??={};
 for(const w of window.SlangStudy.words){
  const before=profile.lessons[w.id]||{};
  const next={done:true,attempts:Math.max(1,Number(before.attempts)||0),best:Math.max(10,Number(before.best)||0),quickAttempts:Math.max(1,Number(before.quickAttempts)||0),quickBest:Math.max(6,Number(before.quickBest)||0),fullAttempts:Math.max(1,Number(before.fullAttempts)||0),fullBest:Math.max(10,Number(before.fullBest)||0),sentence:typeof before.sentence==='string'&&before.sentence?before.sentence:`Practice example with ${w.word}.`,context:['friends','school','formal','interview'].includes(before.context)?before.context:'friends'};
  if(JSON.stringify(before)!==JSON.stringify(next)){profile.lessons[w.id]=next;changed=true}
 }
 if(changed){profile.updated=Date.now();try{localStorage.setItem(STUDY_KEY,JSON.stringify(state))}catch{}}
 return changed;
}
function hideAggregateTools(){
 document.documentElement.dataset.slangifyOwner='hidden-panel';
 const phrases=['compare learning modes','keep or combine your data','paired results','download csv','full backup','import a slangify','combine data','all participants','group comparison','research export'];
 const hide=()=>{
  document.querySelectorAll('#studyView section,#studyView .panel,#studyView article,#studyView details,#studyView div').forEach(el=>{
   const own=[...el.children].some(child=>/^(H1|H2|H3|H4|SUMMARY|BUTTON|A)$/.test(child.tagName));if(!own)return;
   const text=(el.textContent||'').trim().toLowerCase();if(phrases.some(p=>text.includes(p)))el.hidden=true;
  });
  document.querySelectorAll('#studyView button,#studyView a').forEach(el=>{const t=(el.textContent||'').trim().toLowerCase();if(phrases.some(p=>t.includes(p)))el.hidden=true});
 };
 hide();const view=document.getElementById('studyView');if(view){let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;hide()})}).observe(view,{childList:true,subtree:true})}
}
function addPanelStyles(){
 if(document.getElementById('slangify-owner-panel-style'))return;
 const style=document.createElement('style');style.id='slangify-owner-panel-style';style.textContent=`
 .owner-results{width:min(1120px,94vw);max-height:88vh;padding:0;border:1px solid var(--line,#d9dfda);border-radius:18px;background:var(--surface,#fff);color:var(--ink,#232e29);box-shadow:0 24px 80px #0004}.owner-results::backdrop{background:#10161299;backdrop-filter:blur(4px)}
 .owner-results-head{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;gap:16px;align-items:flex-start;padding:22px 24px;background:var(--surface,#fff);border-bottom:1px solid var(--line,#d9dfda)}.owner-results h2{margin:0;font-size:24px}.owner-results-head p{margin:5px 0 0;color:var(--muted,#657069);font-size:12px}.owner-results-close{border:1px solid var(--line,#d9dfda);background:var(--surface-alt,#f0f1ec);border-radius:10px;padding:9px 12px}
 .owner-results-body{padding:22px 24px 28px}.owner-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:18px}.owner-stat{padding:14px;border:1px solid var(--line,#d9dfda);border-radius:12px;background:var(--surface-alt,#f0f1ec)}.owner-stat b{display:block;font-size:22px}.owner-stat span{font-size:11px;color:var(--muted,#657069)}
 .owner-group{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:18px}.owner-group-card{padding:14px;border:1px solid var(--line,#d9dfda);border-radius:12px}.owner-group-card b{display:block;margin-bottom:4px}.owner-group-card span{font-size:12px;color:var(--muted,#657069)}
 .owner-table-wrap{overflow:auto;border:1px solid var(--line,#d9dfda);border-radius:12px}.owner-results table{border-collapse:collapse;width:100%;min-width:900px;font-size:12px}.owner-results th,.owner-results td{padding:10px 11px;border-bottom:1px solid var(--line,#d9dfda);text-align:left;white-space:nowrap}.owner-results th{position:sticky;top:0;background:var(--surface-alt,#f0f1ec);font-size:10px;text-transform:uppercase;letter-spacing:.04em}.owner-results tr:last-child td{border-bottom:0}.owner-results-note{margin:0 0 16px;color:var(--muted,#657069);font-size:12px}.owner-results-actions{display:flex;justify-content:flex-end;margin-top:14px}.owner-results-actions button{border:1px solid var(--line,#d9dfda);background:var(--surface-alt,#f0f1ec);border-radius:10px;padding:9px 13px}
 @media(max-width:720px){.owner-summary{grid-template-columns:repeat(2,minmax(0,1fr))}.owner-group{grid-template-columns:1fr}.owner-results-head,.owner-results-body{padding-left:16px;padding-right:16px}}
 `;document.head.appendChild(style);
}
function fmtPercent(score){return score?score.percent+'%':'—'}
function fmtDate(ms){if(!ms)return '—';try{return new Date(ms).toLocaleString()}catch{return '—'}}
function renderPanel(dialog){
 const state=readState(),study=window.SlangStudy,profiles=(state?.profiles||[]).filter(p=>!p.demo),research=profiles.filter(p=>p.research);
 dialog.replaceChildren();
 const head=document.createElement('div');head.className='owner-results-head';const titleWrap=document.createElement('div');const title=document.createElement('h2');title.textContent='Research results';const sub=document.createElement('p');sub.textContent='Hidden owner view · local browser data';titleWrap.append(title,sub);const close=document.createElement('button');close.className='owner-results-close';close.type='button';close.textContent='Close';close.onclick=()=>dialog.close();head.append(titleWrap,close);
 const body=document.createElement('div');body.className='owner-results-body';const note=document.createElement('p');note.className='owner-results-note';note.textContent='This panel shows every participant profile currently stored or merged in this browser. GitHub Pages cannot automatically collect results from people using other devices.';body.appendChild(note);
 const postDone=research.filter(p=>study?.score?.(p,'post')).length,delayedDone=research.filter(p=>study?.score?.(p,'delayed')).length,wordsDone=profiles.reduce((n,p)=>n+Object.values(p.lessons||{}).filter(x=>x.done).length,0);
 const summary=document.createElement('div');summary.className='owner-summary';[['Participants',profiles.length],['Research sessions',research.length],['Post-tests',postDone],['72h tests',delayedDone]].forEach(([label,value])=>{const card=document.createElement('div');card.className='owner-stat';const b=document.createElement('b');b.textContent=String(value);const s=document.createElement('span');s.textContent=label;card.append(b,s);summary.appendChild(card)});body.appendChild(summary);
 if(study?.groups){const groups=document.createElement('div');groups.className='owner-group';for(const g of study.groups(profiles)){const card=document.createElement('div');card.className='owner-group-card';const b=document.createElement('b');b.textContent=(g.group==='context'?'Context learning':'Classic learning')+' · n='+g.n;const s=document.createElement('span');s.textContent=`Paired ${g.paired} · Pre ${g.pre==null?'—':Math.round(g.pre)+'%'} · Post ${g.post==null?'—':Math.round(g.post)+'%'} · Gain ${g.gain==null?'—':(g.gain>=0?'+':'')+Math.round(g.gain)+' pp'} · 72h ${g.delayed==null?'—':Math.round(g.delayed)+'%'}`;card.append(b,s);groups.appendChild(card)}body.appendChild(groups)}
 const wrap=document.createElement('div');wrap.className='owner-table-wrap';const table=document.createElement('table'),thead=document.createElement('thead'),trh=document.createElement('tr');['Code','Mode','Words','Pre','Post','72h','Gain','Active','AI','Updated'].forEach(text=>{const th=document.createElement('th');th.textContent=text;trh.appendChild(th)});thead.appendChild(trh);table.appendChild(thead);const tbody=document.createElement('tbody');
 for(const p of profiles.slice().sort((a,b)=>(b.updated||0)-(a.updated||0))){const pre=study?.score?.(p,'pre'),post=study?.score?.(p,'post'),delayed=study?.score?.(p,'delayed'),gain=pre&&post?post.percent-pre.percent:null,done=Object.values(p.lessons||{}).filter(x=>x.done).length;const values=[p.id,p.research?(p.group==='context'?'Context':'Classic'):'Practice',done,fmtPercent(pre),fmtPercent(post),fmtPercent(delayed),gain==null?'—':(gain>=0?'+':'')+gain+' pp',Math.round((p.activeSeconds||0)/60)+' min',p.aiChecks||0,fmtDate(p.updated)];const tr=document.createElement('tr');values.forEach(value=>{const td=document.createElement('td');td.textContent=String(value);tr.appendChild(td)});tbody.appendChild(tr)}
 if(!profiles.length){const tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=10;td.textContent='No participant data is stored in this browser yet.';tr.appendChild(td);tbody.appendChild(tr)}table.appendChild(tbody);wrap.appendChild(table);body.appendChild(wrap);
 const actions=document.createElement('div');actions.className='owner-results-actions';const refresh=document.createElement('button');refresh.type='button';refresh.textContent='Refresh';refresh.onclick=()=>renderPanel(dialog);actions.appendChild(refresh);body.appendChild(actions);dialog.append(head,body);
}
function setupPanelTrigger(isOwner){
 if(!isOwner)return;const first=document.querySelector('.tagline'),second=document.querySelector('main#home h1,.hero h1');if(!first||!second)return;
 addPanelStyles();let dialog=document.getElementById('ownerResultsPanel');if(!dialog){dialog=document.createElement('dialog');dialog.id='ownerResultsPanel';dialog.className='owner-results';dialog.setAttribute('aria-label','Research results');document.body.appendChild(dialog)}
 let armed=false,timer=null;first.addEventListener('click',()=>{armed=true;clearTimeout(timer);timer=setTimeout(()=>armed=false,7000)});second.addEventListener('click',()=>{if(!armed)return;armed=false;clearTimeout(timer);renderPanel(dialog);if(!dialog.open)dialog.showModal()});dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
}
async function apply(){
 hideAggregateTools();await ensureStudyCore();const state=readState(),owner=await ownerProfile(state),isOwner=!!owner;
 if(isOwner){const changed=masterCore(state,owner);if(changed&&state.active===owner.id){const status=document.getElementById('studyStatus');if(status){status.textContent='Owner profile: all Core 30 words are marked completed.';status.classList.add('show');setTimeout(()=>status.classList.remove('show'),3500)}}}
 setupPanelTrigger(isOwner);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0),{once:true});else setTimeout(apply,0);
})();