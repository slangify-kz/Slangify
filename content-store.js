(()=>{
'use strict';
const model=window.SlangContentModel;
const store={entries:[],error:false,get(word){return this.entries.find(item=>model.normalize(item.word)===model.normalize(word))}};
store.ready=fetch('content/entries.json',{cache:'no-store',credentials:'omit'}).then(r=>{if(!r.ok)throw Error('Content unavailable');return r.json()}).then(raw=>{store.entries=model.manifest(raw).entries;return store.entries}).catch(()=>{store.error=true;return []});
window.SlangContent=store;
})();
