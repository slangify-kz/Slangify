(()=>{
'use strict';
if(typeof allItems==='undefined'||!window.SlangContent)return;
window.SlangContent.ready.then(entries=>{
 const normal=window.SlangContentModel.normalize;
 for(const entry of entries){
  const found=allItems.filter(item=>normal(item.w)===normal(entry.word));
  const value={w:entry.word,m:entry.meaning,k:entry.kazakh,e:entry.example};
  if(found.length)found.forEach(item=>Object.assign(item,value));
  else {const item={...value,p:'Expression',category:entry.category};categories[entry.category].push(item);allItems.push(item)}
 }
 const count=new Set(allItems.map(item=>normal(item.w))).size;
 const counter=document.getElementById('termCount');if(counter)counter.textContent=count;
 const practice=document.querySelector('.practice-stat:nth-child(2) b');if(practice)practice.textContent=count;
 document.querySelectorAll('.cat').forEach(cat=>{cat.querySelector('span').textContent=categories[cat.dataset.category].length+' words and phrases'});
 if(slangSearch.value)searchAll();else showCategory();
});
})();
