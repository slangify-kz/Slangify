const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
test('owner panel requires both clicks in order and the active owner profile',()=>{
 const element=()=>({events:{},setAttribute(){},addEventListener(type,fn){this.events[type]=fn}});
 const first=element(),second=element(),dialog={...element(),open:false,showModal(){this.open=true},close(){this.open=false}};
 let owner=true,rendered=0;
 const context={document:{querySelectorAll:()=>[first],getElementById:id=>id==='owner-title-trigger'?second:dialog},active:()=>owner,addPanelStyles(){},renderPanel(){rendered++},setTimeout:()=>1,clearTimeout(){}};
 const source=fs.readFileSync(require.resolve('../owner-mode.js'),'utf8');
 vm.runInNewContext(source.slice(source.indexOf('function setupPanelTrigger('),source.indexOf('let request=0,panelReady=false;')),context);
 context.setupPanelTrigger(false);assert.equal(first.events.click,undefined);
 context.setupPanelTrigger(true);second.events.click();assert.equal(rendered,0);
 first.events.click();second.events.click();assert.equal(rendered,1);assert.equal(dialog.open,true);
 dialog.close();second.events.click();assert.equal(rendered,1);
 first.events.click();owner=false;second.events.click();assert.equal(rendered,1);assert.equal(dialog.open,false);
 owner=true;first.events.keydown({key:'Enter',preventDefault(){}});second.events.keydown({key:' ',preventDefault(){}});assert.equal(rendered,2);
});
