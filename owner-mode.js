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
  for(const profile of state.profiles){if(await digest(profile?.id)===OWNER_HASH)return profile}
  return null;
}
function masterCore(state,profile){
  if(!window.SlangStudy?.words||!profile)return false;
  let changed=false;
  for(const w of window.SlangStudy.words){
    const before=profile.lessons?.[w.id]||{};
    const next={
      done:true,
      attempts:Math.max(1,Number(before.attempts)||0),
      best:Math.max(10,Number(before.best)||0),
      quickAttempts:Math.max(1,Number(before.quickAttempts)||0),
      quickBest:Math.max(6,Number(before.quickBest)||0),
      fullAttempts:Math.max(1,Number(before.fullAttempts)||0),
      fullBest:Math.max(10,Number(before.fullBest)||0),
      sentence:typeof before.sentence==='string'&&before.sentence?before.sentence:`Practice example with ${w.word}.`,
      context:['friends','school','formal','interview'].includes(before.context)?before.context:'friends'
    };
    profile.lessons??={};
    if(JSON.stringify(before)!==JSON.stringify(next)){profile.lessons[w.id]=next;changed=true}
  }
  if(changed){profile.updated=Date.now();try{localStorage.setItem(STUDY_KEY,JSON.stringify(state))}catch{}}
  return changed;
}
function hideAggregateTools(isOwner){
  document.documentElement.dataset.slangifyOwner=isOwner?'true':'false';
  if(isOwner)return;
  const phrases=[
    'compare learning modes','keep or combine your data','paired results','download csv','full backup',
    'import a slangify','combine data','all participants','group comparison','research export'
  ];
  document.querySelectorAll('#studyView section,#studyView .panel,#studyView article,#studyView details,#studyView div').forEach(el=>{
    const own=[...el.children].some(child=>/^(H1|H2|H3|H4|SUMMARY|BUTTON|A)$/.test(child.tagName));
    if(!own)return;
    const text=(el.textContent||'').trim().toLowerCase();
    if(phrases.some(p=>text.includes(p)))el.hidden=true;
  });
  document.querySelectorAll('#studyView button,#studyView a').forEach(el=>{
    const t=(el.textContent||'').trim().toLowerCase();
    if(phrases.some(p=>t.includes(p)))el.hidden=true;
  });
}
async function apply(){
  const state=readState(),owner=await ownerProfile(state),isOwner=!!owner;
  if(isOwner){
    const changed=masterCore(state,owner);
    if(changed&&state.active===owner.id){
      const status=document.getElementById('studyStatus');
      if(status){status.textContent='Owner profile: all Core 30 words are marked completed.';status.classList.add('show');setTimeout(()=>status.classList.remove('show'),3500)}
    }
  }
  hideAggregateTools(isOwner);
  const view=document.getElementById('studyView');
  if(view){
    let queued=false;
    new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;hideAggregateTools(isOwner)})}).observe(view,{childList:true,subtree:true});
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0),{once:true});else setTimeout(apply,0);
})();
