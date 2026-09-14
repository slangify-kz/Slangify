(function(root){
'use strict';
const categories=['everyday','texting','spoken','internet','gaming','social','school','relationships','advanced'];
const normalize=value=>String(value||'').normalize('NFKC').trim().toLowerCase().replace(/’/g,"'");
function text(value,max,required=false){if(typeof value!=='string'||value.length>max||(required&&!value.trim()))throw Error('Invalid text');return value.trim()}
function mediaPath(value,extensions='mp4|webm'){
  if(typeof value!=='string'||!new RegExp('^media/[a-z0-9][a-z0-9-]{0,100}\\.('+extensions+')$').test(value))throw Error('Only local media files are allowed');return value;
}
function entry(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('Invalid word');
 const result={word:text(raw.word,100,true),meaning:text(raw.meaning,500,true),kazakh:text(raw.kazakh,500,true),example:text(raw.example,700,true),note:text(raw.note||'',1400),category:raw.category};
 if(!categories.includes(result.category)||['__proto__','constructor','prototype'].includes(normalize(result.word)))throw Error('Invalid category or word');
 if(raw.video){const v=raw.video;result.video={src:mediaPath(v.src),title:text(v.title,180,true),caption:text(v.caption,700,true),credit:text(v.credit,250,true),license:text(v.license,250,true)};if(v.captions)result.video.captions=mediaPath(v.captions,'vtt')}
 return result;
}
function manifest(raw){
 if(!raw||raw.version!==1||!Array.isArray(raw.entries)||raw.entries.length>2000)throw Error('Invalid content file');
 const entries=raw.entries.map(entry),keys=new Set();
 for(const item of entries){const id=normalize(item.word);if(keys.has(id))throw Error('Duplicate word');keys.add(id)}
 return {version:1,revision:text(raw.revision||'',100),entries};
}
const api={categories,normalize,mediaPath,entry,manifest};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.SlangContentModel=api;
})(typeof window==='undefined'?{}:window);
