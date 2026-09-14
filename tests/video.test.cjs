const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../learning-upgrade.js'),'utf8');
function setup(entries=[],error=false){
 const nodes={};let dialog;
 class Element{
  constructor(){this.events={};this.dataset={};this.playbackRate=1;this.currentTime=3;this.pauses=0;this.plays=0;this.html=''}
  setAttribute(name,value){this[name]=value}
  removeAttribute(name){delete this[name]}
  addEventListener(type,fn){this.events[type]=fn}
  append(){}
  focus(){}
  pause(){this.pauses++}
  play(){this.plays++;return Promise.resolve()}
  load(){}
  showModal(){this.open=true}
  close(){this.open=false;this.events.close?.()}
  querySelector(selector){return nodes[selector]||null}
  set innerHTML(value){
   this.html=value;
   if(this===dialog){for(const key of Object.keys(nodes))delete nodes[key];nodes['#studio-body']=new Element()}
   if(value.includes('<video'))for(const key of ['video','#video-status','[data-video-replay]','[data-video-speed]'])nodes[key]=new Element();
  }
  get innerHTML(){return this.html}
 }
 dialog=new Element();
 const speech={count:0,cancel(){},speak(){this.count++}};
 const window={speechSynthesis:speech,SlangContent:{entries,error,ready:Promise.resolve(entries),get:w=>entries.find(e=>e.word===w)}};
 vm.runInNewContext(source,{window,localStorage:{getItem:()=>null,setItem(){}},document:{body:{append(){}},activeElement:null,createElement:tag=>tag==='dialog'?dialog:new Element(),querySelector:()=>null,getElementById:()=>null},speechSynthesis:speech,SpeechSynthesisUtterance:function(word){this.text=word}});
 const click=dataset=>dialog.events.click({target:{closest:()=>({dataset,setAttribute(){}})}});
 return {window,dialog,nodes,click,speech};
}
const clip={word:'okay',meaning:'All right.',kazakh:'Жарайды.',example:'Okay, let us go.',video:{src:'media/okay-apollo.mp4',title:'Okay',caption:'Okay, let us go.',credit:'NASA',license:'Public domain'}};
test('video uses a local native player with replay and slower playback',async()=>{
 const a=setup([clip]);a.window.SlangStudio.open({w:'okay',m:'All right.',k:'Жарайды.',e:'Okay.'});a.click({studio:'video'});await Promise.resolve();
 assert.match(a.nodes['#studio-body'].html,/src="media\/okay-apollo.mp4"/);
 assert.doesNotMatch(a.nodes['#studio-body'].html,/<iframe|https?:/);
 const player=a.nodes.video;a.click({videoReplay:''});assert.equal(player.currentTime,0);assert.equal(player.plays,1);
 a.click({videoSpeed:''});assert.equal(player.playbackRate,.75);a.click({videoSpeed:''});assert.equal(player.playbackRate,1);
 a.dialog.close();assert.equal(player.pauses,1);
});
test('empty clip state is honest and pronunciation remains native',async()=>{
 const a=setup();a.window.SlangStudio.open({w:'lowkey',m:'A little.',k:'Аздап.',e:'I lowkey like it.'});a.click({studio:'video'});await Promise.resolve();
 assert.match(a.nodes['#studio-body'].html,/not been added/);assert.doesNotMatch(a.nodes['#studio-body'].html,/<video/);
 a.click({studio:'speak'});assert.equal(a.speech.count,1);
});
test('late content cannot reopen a dismissed player',async()=>{
 const a=setup([clip]);a.window.SlangStudio.open({w:'okay'});a.click({studio:'video'});a.dialog.close();await Promise.resolve();assert.equal(a.dialog.html,'');
});
test('external widgets and their advertising are absent from application code',()=>{
 assert.doesNotMatch(source,/youglish|fluently|youtube|createElement\('iframe'\)/i);
});
