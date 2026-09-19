const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
test('unmarked five-second gesture opens local statistics without credentials',async()=>{
 const element=()=>({events:{},setAttribute(){},addEventListener(type,fn){this.events[type]=fn}});
 const first=element(),second=element(),dialog={...element(),open:false,showModal(){this.open=true},close(){this.open=false;this.events.close?.()},replaceChildren(){}};
 let now=10000,rendered=0;
 const context={panelUnlocked:false,Date:{now:()=>now},document:{querySelectorAll:()=>[first],getElementById:id=>id==='owner-title-trigger'?second:dialog},ensureStudyCore:async()=>({}),addPanelStyles(){},renderPanel(){rendered++},setTimeout:(_,ms)=>{assert.equal(ms,5000);return 1},clearTimeout(){}};
 const source=fs.readFileSync(require.resolve('../owner-mode.js'),'utf8');
 vm.runInNewContext(source.slice(source.indexOf('function setupPanelTrigger('),source.indexOf('let request=0,panelReady=false;')),context);
 context.setupPanelTrigger();assert.equal(typeof first.events.click,'function');
 await second.events.click();assert.equal(rendered,0);
 first.events.click();now+=4999;await second.events.click();assert.equal(rendered,1);assert.equal(dialog.open,true);assert.equal(context.panelUnlocked,true);
 assert.equal(second.title,undefined);
 dialog.close();assert.equal(context.panelUnlocked,false);await second.events.click();assert.equal(rendered,1);
 first.events.click();now+=5001;await second.events.click();assert.equal(rendered,1);assert.equal(dialog.open,false);
 first.events.keydown({key:'Enter',preventDefault(){}});second.events.keydown({key:' ',preventDefault(){}});await new Promise(setImmediate);assert.equal(rendered,2);
});
