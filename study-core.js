(function(root){
  'use strict';
  const corpus=typeof module!=='undefined'?require('./course-data.js'):root.SlangCourse;
  const words=corpus.words, stages=['pre','post','delayed'], key='slangify.study.v1';
  const rnd=seed=>()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  function shuffle(a,r=Math.random){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  const byId=id=>words.find(w=>w.id===id);
  function question(w,type,variant=0,r=Math.random){
    let prompt,correct,options,skill='meaning';
    // Avoid close synonyms among distractors.
    const similar=[['bro','buddy'],['kinda','lowkey'],['cool','awesome']].find(g=>g.includes(w.word))||[];
    const others=shuffle(words.filter(x=>x.id!==w.id&&!similar.includes(x.word)),r).slice(0,3);
    if(type==='context'){
      const suitable=variant%2===0;skill='context';
      prompt=`Would “${w.word}” fit? ${suitable?w.good:w.bad}`;
      correct=suitable?'Fits this situation':'Better to rephrase';options=['Fits this situation','Better to rephrase'];
    }else if(type==='neutral'){
      skill='neutral';prompt=`Choose the neutral equivalent for “${w.word}” in this course.`;correct=w.neutral;options=[correct,...others.map(x=>x.neutral)];
    }else if(type==='neutralReverse'){
      skill='neutral';prompt=`Which expression has the neutral equivalent “${w.neutral}”?`;correct=w.word;options=[correct,...others.map(x=>x.word)];
    }else if(type==='gap'){
      prompt=w.example.replace(new RegExp(w.word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'),'_____');correct=w.word;options=[correct,...others.map(x=>x.word)];
    }else if(type==='example'){
      prompt=`Which sentence uses “${w.word}”?`;correct=w.example;options=[correct,...others.map(x=>x.example)];
    }else if(type==='reverse'){
      prompt=`Which expression means: ${variant%2?w.kk:w.en}`;correct=w.word;options=[correct,...others.map(x=>x.word)];
    }else{
      prompt=`What does “${w.word}” mean here? ${w.example}`;correct=variant%2?w.kk:w.en;options=[correct,...others.map(x=>variant%2?x.kk:x.en)];
    }
    options=shuffle([...new Set(options)],r);
    return {wordId:w.id,skill,prompt,options,correct:options.indexOf(correct),explain:w.note};
  }
  function assessment(p,stage){
    const n=stages.indexOf(stage);if(n<0)throw Error('Unknown stage');
    const r=rnd(p.seed+n*7919),result=words.map((w,i)=>{
      const t=(i+n)%3;return question(w,['meaning','context','neutral'][t],t===1?Math.floor(i/3)+n:n,r);
    });
    // Random order; 10 items per skill; equally distributed answer positions within each option count.
    for(const count of [2,4]){
      const subset=result.filter(q=>q.options.length===count),positions=shuffle(subset.map((_,i)=>i%count),r);
      subset.forEach((q,i)=>{const answer=q.options[q.correct];q.options=q.options.filter((_,j)=>j!==q.correct);q.options.splice(positions[i],0,answer);q.correct=positions[i]});
    }
    return shuffle(result,r);
  }
  function practice(w){
    return shuffle([question(w,'meaning',0),question(w,'meaning',1),question(w,'neutral'),question(w,'context',0),question(w,'context',1),question(w,'gap'),question(w,'reverse',0),question(w,'reverse',1),question(w,'example'),question(w,'neutralReverse')]);
  }
  function trainingPractice(w){
    // A short learning round: six different retrieval/context moves.
    // `practice` remains the unchanged ten-question full test.
    return shuffle([question(w,'meaning',0),question(w,'context',0),question(w,'neutral'),question(w,'gap'),question(w,'reverse',1),question(w,'example')]);
  }
  function newProfile({research=false,group='context',assignment='self-selected',seenBefore=false,now=Date.now(),seed=Math.floor(Math.random()*4294967295)}={}){
    if(!['context','classic'].includes(group))throw Error('Unknown learning mode');
    const id='S-'+seed.toString(16).padStart(8,'0').toUpperCase()+'-'+now.toString(36).toUpperCase();
    return {id,seed,corpus:corpus.version,created:now,updated:now,research,group,assignment,seenBefore,externalUse:false,delayHours:72,lessons:{},tests:{},activeSeconds:0,aiChecks:0,survey:null,demo:false,demoScores:null};
  }
  function due(p){return p.tests.post?.completed?p.tests.post.completed+p.delayHours*3600000:null}
  function gate(p,stage,now=Date.now()){
    if(!p.research)return 'Create a research session first.';
    if(!stages.includes(stage))return 'Unknown test.';
    if(p.tests[stage]?.completed)return 'This test is already complete.';
    const active=stages.find(s=>p.tests[s]&&!p.tests[s].completed);if(active&&active!==stage)return 'Finish the current test first.';
    if(stage==='pre')return null;
    if(!p.tests.pre?.completed)return 'Complete the pre-test first.';
    if(stage==='post'&&Object.values(p.lessons).filter(x=>x.done).length!==30)return 'Complete all 30 course words first.';
    if(stage==='delayed'&&!p.tests.post?.completed)return 'Complete the post-test first.';
    if(stage==='delayed'&&now<due(p))return 'The delayed test opens 72 hours after your post-test.';
    return null;
  }
  function startTest(p,stage,now=Date.now()){
    const reason=gate(p,stage,now);if(reason)throw Error(reason);
    p.tests[stage]??={started:now,answers:[],completed:null};return p.tests[stage];
  }
  function answerTest(p,stage,choice,ms,now=Date.now()){
    const t=p.tests[stage];if(!t||t.completed)throw Error('No active test');
    const q=assessment(p,stage)[t.answers.length];
    if(!q||!Number.isInteger(choice)||choice<0||choice>=q.options.length)throw Error('Invalid answer');
    t.answers.push({choice,ms:Math.max(0,Math.min(3600000,Math.round(ms)))});
    if(t.answers.length===30)t.completed=Math.max(t.started,now);
    return !!t.completed;
  }
  function score(p,stage){
    const t=p.tests[stage];if(!t?.completed)return null;
    const qs=assessment(p,stage),out={correct:0,total:30,meaning:0,context:0,neutral:0,seconds:0};
    qs.forEach((q,i)=>{const a=t.answers[i];if(a.choice===q.correct){out.correct++;out[q.skill]++}out.seconds+=a.ms/1000});
    const demoPercent=p.demo&&Number.isInteger(p.demoScores?.[stage])?p.demoScores[stage]:null;
    out.percent=demoPercent===null?Math.round(out.correct/30*100):demoPercent;return out;
  }
  const mean=a=>a.length?a.reduce((s,n)=>s+n,0)/a.length:null;
  function groups(profiles){return ['classic','context'].map(group=>{
    const all=profiles.filter(p=>p.research&&!p.demo&&p.group===group),paired=all.filter(p=>score(p,'pre')&&score(p,'post')),retained=paired.filter(p=>score(p,'delayed'));
    return {group,n:all.length,paired:paired.length,delayedN:retained.length,pre:mean(paired.map(p=>score(p,'pre').percent)),post:mean(paired.map(p=>score(p,'post').percent)),gain:mean(paired.map(p=>score(p,'post').percent-score(p,'pre').percent)),delayed:mean(retained.map(p=>score(p,'delayed').percent)),retentionChange:mean(retained.map(p=>score(p,'delayed').percent-score(p,'post').percent)),exposed:all.filter(p=>p.seenBefore||p.externalUse).length,aiChecks:all.reduce((s,p)=>s+p.aiChecks,0),enjoyment:mean(all.filter(p=>p.survey).map(p=>p.survey.enjoyment))};})}
  const number=(v,min,max)=>typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max;
  function cleanProfile(p){
    if(!p||!/^S-[A-F0-9]{8}-[A-Z0-9]{1,16}$/.test(p.id)||p.corpus!==corpus.version||!Number.isInteger(p.seed)||!number(p.seed,0,4294967295)||!number(p.created,1,9e15)||!['context','classic'].includes(p.group)||!['self-selected','random','teacher'].includes(p.assignment)||typeof p.research!=='boolean'||p.delayHours!==72)throw Error('Unsupported or damaged session.');
    const c=newProfile({research:p.research,group:p.group,assignment:p.assignment,seenBefore:!!p.seenBefore,now:p.created,seed:p.seed});if(c.id!==p.id)throw Error('Session code does not match.');
    c.updated=number(p.updated,p.created,9e15)?p.updated:p.created;c.externalUse=!!p.externalUse;c.activeSeconds=number(p.activeSeconds,0,1e8)?p.activeSeconds:0;c.aiChecks=Number.isInteger(p.aiChecks)&&number(p.aiChecks,0,1e6)?p.aiChecks:0;
    c.demo=p.demo===true;if(c.demo){if(!p.demoScores||!stages.every(s=>Number.isInteger(p.demoScores[s])&&number(p.demoScores[s],0,100)))throw Error('Invalid demo scores.');c.demoScores=Object.fromEntries(stages.map(s=>[s,p.demoScores[s]]));}
    for(const w of words){const l=p.lessons?.[w.id];if(l)c.lessons[w.id]={done:l.done===true,...(l.manual===true?{manual:true}:{}),attempts:Number.isInteger(l.attempts)&&number(l.attempts,0,1e5)?l.attempts:0,best:Number.isInteger(l.best)&&number(l.best,0,10)?l.best:0,quickAttempts:Number.isInteger(l.quickAttempts)&&number(l.quickAttempts,0,1e5)?l.quickAttempts:0,quickBest:Number.isInteger(l.quickBest)&&number(l.quickBest,0,6)?l.quickBest:0,fullAttempts:Number.isInteger(l.fullAttempts)&&number(l.fullAttempts,0,1e5)?l.fullAttempts:0,fullBest:Number.isInteger(l.fullBest)&&number(l.fullBest,0,10)?l.fullBest:0,sentence:typeof l.sentence==='string'?l.sentence.slice(0,500):'',context:['friends','school','formal','interview'].includes(l.context)?l.context:'friends'};}
    for(const s of stages){const t=p.tests?.[s];if(!t)continue;
      if(!p.research||!number(t.started,p.created,9e15)||!Array.isArray(t.answers)||t.answers.length>30||(t.completed!==null&&!number(t.completed,t.started,9e15))||!!t.completed!==(t.answers.length===30))throw Error('Invalid assessment data.');
      if(s!=='pre'&&!c.tests.pre?.completed||s==='delayed'&&!c.tests.post?.completed)throw Error('Invalid assessment order.');
      if(s==='post'&&t.started<c.tests.pre.completed||s==='delayed'&&t.started<due(c))throw Error('Invalid assessment dates.');
      const qs=assessment(c,s);c.tests[s]={started:t.started,completed:t.completed,answers:t.answers.map((a,i)=>{if(!Number.isInteger(a.choice)||!number(a.choice,0,qs[i].options.length-1)||!number(a.ms,0,3600000))throw Error('Invalid test response.');return {choice:a.choice,ms:a.ms}})};
    }
    if(p.survey&&['enjoyment','confidence','difficulty'].every(k=>Number.isInteger(p.survey[k])&&number(p.survey[k],1,5)))c.survey={enjoyment:p.survey.enjoyment,confidence:p.survey.confidence,difficulty:p.survey.difficulty};
    return c;
  }
  function parse(text){
    if(typeof text!=='string'||text.length>4e6)throw Error('File is too large (4 MB maximum).');
    const data=JSON.parse(text);if(data.version!==1||!Array.isArray(data.profiles)||data.profiles.length>200)throw Error('Use a Slangify v1 JSON export.');
    const profiles=data.profiles.map(cleanProfile);if(new Set(profiles.map(p=>p.id)).size!==profiles.length)throw Error('Duplicate participant codes.');
    return {version:1,profiles,active:profiles.some(p=>p.id===data.active)?data.active:null,seenBefore:!!data.seenBefore};
  }
  function merge(current,incoming){
    const map=new Map(current.map(p=>[p.id,p]));let added=0,updated=0;
    for(const p of incoming){const old=map.get(p.id);if(!old){map.set(p.id,p);added++;continue}
      if(old.group!==p.group||old.assignment!==p.assignment||old.research!==p.research)throw Error('Conflicting data for '+p.id);
      // Accept a later snapshot only if every existing answer is its exact prefix.
      let compatible=true;for(const s of stages){const a=old.tests[s],b=p.tests[s];if(a&&(!b||a.started!==b.started||a.answers.some((x,i)=>JSON.stringify(x)!==JSON.stringify(b.answers[i]))||a.completed&&a.completed!==b.completed))compatible=false;}
      if(compatible){const a=stages.reduce((n,s)=>n+(old.tests[s]?.answers.length||0),0),b=stages.reduce((n,s)=>n+(p.tests[s]?.answers.length||0),0);if(b>a||b===a&&p.updated>old.updated){const next=structuredClone(p);for(const [id,l] of Object.entries(old.lessons)){if(!next.lessons[id])next.lessons[id]=structuredClone(l);else if(!next.lessons[id].sentence)next.lessons[id].sentence=l.sentence}next.externalUse||=old.externalUse;next.seenBefore||=old.seenBefore;map.set(p.id,next);updated++}}
    }
    if(map.size>200)throw Error('Maximum 200 sessions per browser. Export a backup first.');return {profiles:[...map.values()],added,updated};
  }
  function csv(profiles){
    const cols=['code','group','assignment','corpus','prior_exposure','outside_course','ai_checks','course_words','active_seconds','enjoyment','confidence','difficulty','stage','started_utc','completed_utc','score_percent','meaning_10','context_10','neutral_10','answer_seconds'];
    const rows=[cols];profiles.filter(p=>p.research&&!p.demo).forEach(p=>stages.forEach(s=>{const n=score(p,s);if(n)rows.push([p.id,p.group,p.assignment,p.corpus,p.seenBefore,p.externalUse,p.aiChecks,Object.values(p.lessons).filter(l=>l.done).length,Math.round(p.activeSeconds),p.survey?.enjoyment??'',p.survey?.confidence??'',p.survey?.difficulty??'',s,new Date(p.tests[s].started).toISOString(),new Date(p.tests[s].completed).toISOString(),n.percent,n.meaning,n.context,n.neutral,Math.round(n.seconds)])}));
    const safe=v=>'"'+String(v).replace(/^[=+@-]/,"'$&").replace(/"/g,'""')+'"';return '\uFEFF'+rows.map(row=>row.map(safe).join(',')).join('\r\n');
  }
  const api={words,corpus,key,stages,byId,shuffle,question,practice,trainingPractice,assessment,newProfile,due,gate,startTest,answerTest,score,groups,cleanProfile,parse,merge,csv};
  if(typeof module!=='undefined')module.exports=api;else root.SlangStudy=api;
})(typeof window!=='undefined'?window:globalThis);

