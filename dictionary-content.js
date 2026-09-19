(()=>{
'use strict';
if(typeof allItems==='undefined'||!window.SlangContent)return;
window.SlangContent.ready.then(entries=>{
 const normal=window.SlangContentModel.normalize;
 const byWord=new Map();for(const item of allItems)if(!byWord.has(normal(item.w)))byWord.set(normal(item.w),item);
 for(const entry of [...(window.SlangAdditions||[]),...entries]){
  const old=byWord.get(normal(entry.word));
  byWord.set(normal(entry.word),{...old,w:entry.word,m:entry.meaning,k:entry.kazakh,e:entry.example,category:entry.category,p:old?.p||'Expression'});
 }
 allItems.splice(0,allItems.length,...byWord.values());
 Object.keys(categories).forEach(key=>categories[key].splice(0));
 for(const item of allItems){const key=categories[item.category]?item.category:'everyday';categories[key].push(item)}
 const count=allItems.length;
 const counter=document.getElementById('termCount');if(counter)counter.textContent=count;
 const practice=document.querySelector('.practice-stat:nth-child(2) b');if(practice)practice.textContent=count;
 document.querySelectorAll('.cat').forEach(cat=>{const span=cat.querySelector('span');if(span)span.textContent=categories[cat.dataset.category].length+' words and phrases'});
 if(slangSearch.value)searchAll();else showCategory();
 document.dispatchEvent(new CustomEvent('slangify:dictionary-ready',{detail:{count}}));
});
})();
