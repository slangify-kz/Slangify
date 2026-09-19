const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
test('both clicks work without a legacy profile while results remain gated',async()=>{
 const element=()=>({events:{},classList:{add(){},remove(){}},setAttribute(){},addEventListener(type,fn){this.events[type]=fn}});
 const first=element(),second=element(),dialog={...element(),open:false,showModal(){this.open=true},close(){this.open=false}};
 let owner=false,rendered=0,access=0;
 const context={document:{querySelectorAll:()=>[first],getElementById:id=>id==='owner-title-trigger'?second:dialog},ensureStudyCore:async()=>({}),addPanelStyles(){},renderPanel(){if(owner)rendered++;else access++},setTimeout:()=>1,clearTimeout(){}};
 const source=fs.readFileSync(require.resolve('../owner-mode.js'),'utf8');
 vm.runInNewContext(source.slice(source.indexOf('function setupPanelTrigger('),source.indexOf('let request=0,panelReady=false;')),context);
 context.setupPanelTrigger();assert.equal(typeof first.events.click,'function');
 await second.events.click();assert.equal(access,0);
 first.events.click();await second.events.click();assert.equal(access,1);assert.equal(rendered,0);assert.equal(dialog.open,true);
 dialog.close();await second.events.click();assert.equal(access,1);
 owner=true;first.events.click();await second.events.click();assert.equal(rendered,1);
 first.events.keydown({key:'Enter',preventDefault(){}});second.events.keydown({key:' ',preventDefault(){}});await new Promise(setImmediate);assert.equal(rendered,2);
});
