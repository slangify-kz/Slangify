const {test}=require('node:test'),assert=require('node:assert/strict'),S=require('../study-core.js');
const profile=(seed=42,group='context')=>S.newProfile({seed,group,research:true,assignment:'random',now:1000000000});
function complete(p,s,correct=30,now=1000001000){S.startTest(p,s,now);const qs=S.assessment(p,s);qs.forEach((q,i)=>S.answerTest(p,s,i<correct?q.correct:(q.correct+1)%q.options.length,1500,now+1000));}
function lessons(p){S.words.forEach(w=>p.lessons[w.id]={done:true,attempts:1,best:8,sentence:'An original fictional example.',context:'friends'})}
test('30 sourced entries, ten valid tasks each, unique options and reproducible balanced tests',()=>{
  assert.equal(S.words.length,30);assert.equal(new Set(S.words.map(w=>w.id)).size,30);
  S.words.forEach(w=>{assert.match(w.source,/^https:\/\/(www.merriam-webster.com|dictionary.cambridge.org)\//);assert.ok(w.kk&&w.good&&w.bad);const qs=S.practice(w);assert.equal(qs.length,10);qs.forEach(q=>{assert.equal(new Set(q.options).size,q.options.length);assert.ok(q.correct>=0&&q.correct<q.options.length)})});
  for(let seed=1;seed<=20;seed++){const p=profile(seed);for(const s of S.stages){const qs=S.assessment(p,s);assert.deepEqual(qs,S.assessment(p,s));assert.equal(new Set(qs.map(q=>q.wordId)).size,30);for(const skill of ['meaning','context','neutral'])assert.equal(qs.filter(q=>q.skill===skill).length,10);for(const n of [2,4]){const totals=Array(n).fill(0);qs.filter(q=>q.options.length===n).forEach(q=>totals[q.correct]++);assert.ok(Math.max(...totals)-Math.min(...totals)<=1)}}}
  assert.notDeepEqual(S.assessment(profile(1),'pre'),S.assessment(profile(2),'pre'));
});
test('pre/post/delayed gates and one final answer per question',()=>{
  const p=profile();assert.throws(()=>S.startTest(p,'post'));assert.throws(()=>S.startTest(p,'delayed'));complete(p,'pre',20);assert.equal(S.score(p,'pre').percent,67);assert.throws(()=>S.startTest(p,'pre'));assert.throws(()=>S.answerTest(p,'pre',0,100));assert.throws(()=>S.startTest(p,'post'));lessons(p);complete(p,'post',27,1000010000);const due=S.due(p);assert.throws(()=>S.startTest(p,'delayed',due-1));complete(p,'delayed',24,due);assert.equal(S.score(p,'delayed').percent,80);assert.deepEqual(S.cleanProfile(p),p);
});
test('reload preserves test order and answers without treating incomplete tests as zero',()=>{
  const p=profile();S.startTest(p,'pre',1000000200);const q=S.assessment(p,'pre')[0];S.answerTest(p,'pre',q.correct,2500,1000000300);assert.equal(S.score(p,'pre'),null);const parsed=S.parse(JSON.stringify({version:1,profiles:[p],active:p.id})).profiles[0];assert.deepEqual(S.assessment(p,'pre'),S.assessment(parsed,'pre'));assert.equal(parsed.tests.pre.answers.length,1);assert.equal(S.startTest(parsed,'pre').answers.length,1);assert.throws(()=>S.answerTest(parsed,'pre',9,10));
});
test('paired reports compare the same participants and exclude unfinished stages',()=>{
  const a=profile(1),b=profile(2),c=profile(3,'classic');complete(a,'pre',15);lessons(a);complete(a,'post',24,1000010000);complete(b,'pre',30);const gs=S.groups([a,b,c]);const g=gs.find(g=>g.group==='context');assert.equal(g.n,2);assert.equal(g.paired,1);assert.equal(g.pre,50);assert.equal(g.post,80);assert.equal(g.gain,30);assert.equal(g.delayed,null);assert.equal(gs[0].pre,null);assert.ok(S.csv([a,b,c]).startsWith('\uFEFF"code"'));assert.equal(S.csv([a,b,c]).split('\r\n').length,4);
});
test('imports validate values, strip extra fields, reject unsupported data and deduplicate safely',()=>{
  const p=profile();complete(p,'pre',25);const envelope={version:1,active:p.id,profiles:[p]};assert.equal(S.parse(JSON.stringify(envelope)).active,p.id);assert.throws(()=>S.parse('{'));assert.throws(()=>S.parse(JSON.stringify({...envelope,version:2})));assert.throws(()=>S.parse(JSON.stringify({...envelope,profiles:[p,p]})));const bad=structuredClone(p);bad.tests.pre.answers[0].choice=7;assert.throws(()=>S.cleanProfile(bad));const group=structuredClone(p);group.group='administrator';assert.throws(()=>S.cleanProfile(group));const html=structuredClone(p);html.id='<img src=x>';assert.throws(()=>S.cleanProfile(html));
  assert.equal(S.merge([p],[p]).profiles.length,1);const future=structuredClone(p);lessons(future);complete(future,'post',28,1000010000);const m=S.merge([p],[future]);assert.equal(m.updated,1);assert.equal(m.profiles.length,1);assert.ok(m.profiles[0].tests.post.completed);assert.equal(S.merge(m.profiles,[p]).updated,0);const conflict=structuredClone(future);conflict.group='classic';assert.throws(()=>S.merge([p],[conflict]));
});
