const test=require('node:test'),assert=require('node:assert/strict');
const model=require('../content-model.js'),api=require('../editor-api.js');
const word={word:'okay',meaning:'All right.',kazakh:'Жарайды.',example:"Okay, let's go.",note:'',category:'everyday'};
const encoded=data=>btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(data))));
function fake(options={}){
 const calls=[],data={version:1,revision:'old',entries:options.entries||[]};
 const fetcher=async(url,init)=>{
  calls.push({url,...init});let value;
  if(url.endsWith('/user'))value={id:options.user??328250154};
  else if(url.endsWith('/Slangify'))value={owner:{id:328250154},permissions:{push:options.push??true}};
  else if(url.endsWith('/git/ref/heads/main'))value={object:{sha:'base'}};
  else if(url.endsWith('/git/commits/base'))value={tree:{sha:'base-tree'}};
  else if(url.includes('/contents/content/entries.json'))value={encoding:'base64',content:encoded(data)};
  else if(init.method==='PATCH'&&options.refConflict)return {ok:false,status:422,json:async()=>({})};
  else if(['POST','PATCH'].includes(init.method))value={sha:'object-'+calls.length};
  else throw Error('Unexpected endpoint');
  return {ok:true,status:200,json:async()=>value};
 };
 return {client:api.createClient(fetcher),calls};
}
test('only the verified owner can enter and logged-out users cannot publish',async()=>{
 const a=fake({user:123});await assert.rejects(a.client.login('test-key'),/владельцу/);
 await assert.rejects(a.client.publish(word),/войди/);
 assert.equal(a.calls.filter(c=>c.method!=='GET').length,0);
 const b=fake({push:false});await assert.rejects(b.client.login('test-key'),/права/);
});
test('owner commit preserves other words and advances main without force',async()=>{
 const other={...word,word:'yep'},a=fake({entries:[other]});
 await a.client.login('test-key');const result=await a.client.publish(word);
 assert.equal(result.manifest.entries.length,2);
 assert.equal(result.manifest.entries.find(e=>e.word==='okay').kazakh,'Жарайды.');
 const writes=a.calls.filter(c=>c.method!=='GET');
 assert.equal(writes.length,4);
 assert.equal(JSON.parse(writes[1].body).base_tree,'base-tree');
 assert.deepEqual(JSON.parse(writes[2].body).parents,['base']);
 assert.equal(JSON.parse(writes[3].body).force,false);
 assert.ok(a.calls.every(c=>c.headers.Authorization==='Bearer test-key'));
 a.client.logout();await assert.rejects(a.client.load(),/войди/);
});
test('a conflicting edit is rejected before creating any blobs',async()=>{
 const a=fake({entries:[word]});await a.client.login('test-key');
 await assert.rejects(a.client.publish({...word,note:'new'},{baseline:null}),/другой вкладке/);
 assert.equal(a.calls.filter(c=>c.method!=='GET').length,0);
});
test('a moving branch is rejected without retrying or forcing',async()=>{
 const a=fake({refConflict:true});await a.client.login('test-key');
 await assert.rejects(a.client.publish(word),/Заново/);
 assert.equal(a.calls.filter(c=>c.method==='PATCH').length,1);
 assert.equal(JSON.parse(a.calls.at(-1).body).force,false);
});
test('native media paths, real file headers and duplicate words are validated',()=>{
 for(const path of ['https://youtube.com/a.mp4','//evil.test/a.mp4','media/../a.mp4','media/a.svg','media/a.mp4?x=1'])assert.throws(()=>model.mediaPath(path));
 const bytes=new Uint8Array(24);bytes.set([102,116,121,112],4);
 assert.doesNotThrow(()=>api.validateUpload({path:'media/sample.mp4',bytes},'media/sample.mp4'));
 assert.throws(()=>api.validateUpload({path:'media/sample.mp4',bytes:new Uint8Array(24)},'media/sample.mp4'));
 assert.throws(()=>model.manifest({version:1,entries:[word,{...word,word:'OKAY'}]}));
 assert.throws(()=>model.entry({...word,category:'__proto__'}));
});
test('new video and text are written in the same commit',async()=>{
 const a=fake(),bytes=new Uint8Array(24);bytes.set([102,116,121,112],4);
 const video={src:'media/sample.mp4',title:'Okay',caption:'Okay, let us go.',credit:'My recording',license:'Original'};
 await a.client.login('test-key');await a.client.publish({...word,video},{upload:{path:video.src,bytes}});
 const treeCall=a.calls.find(c=>c.url.endsWith('/git/trees'));
 assert.deepEqual(JSON.parse(treeCall.body).tree.map(e=>e.path),['media/sample.mp4','content/entries.json']);
});
