(function(root){
'use strict';
const model=typeof module!=='undefined'&&module.exports?require('./content-model.js'):root.SlangContentModel;
const REPO='slangify-kz/Slangify',OWNER_ID=328250154,FILE='content/entries.json';
const decode=value=>new TextDecoder().decode(Uint8Array.from(atob(value.replace(/\s/g,'')),c=>c.charCodeAt(0)));
function base64(bytes){let binary='';for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));return btoa(binary)}
function validateUpload(upload,src){
 if(!upload||!(upload.bytes instanceof Uint8Array)||upload.bytes.length<12||upload.bytes.length>15*1024*1024)throw Error('Видео должно быть не больше 15 МБ.');
 model.mediaPath(upload.path);if(upload.path!==src)throw Error('Файл не совпадает с выбранным видео.');
 const b=upload.bytes,mp4=String.fromCharCode(...b.subarray(4,8))==='ftyp',webm=b[0]===0x1a&&b[1]===0x45&&b[2]===0xdf&&b[3]===0xa3;
 if(!(upload.path.endsWith('.mp4')&&mp4)&&!(upload.path.endsWith('.webm')&&webm))throw Error('Выбери настоящий файл MP4 или WebM.');
}
function createClient(fetcher=fetch){
 let token='',verified=false;
 const logout=()=>{token='';verified=false};
 async function request(path,method='GET',body){
  if(!token)throw Error('Сначала войди в редактор.');
  let r;try{r=await fetcher('https://api.github.com'+path,{method,cache:'no-store',credentials:'omit',headers:{Accept:'application/vnd.github+json',Authorization:'Bearer '+token,'X-GitHub-Api-Version':'2026-03-10',...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})})}catch{throw Error('Не удалось связаться с GitHub. Проверь интернет.')}
  if(!r.ok){const error=Error(r.status===401?'Ключ недействителен или истёк. Войди снова.':r.status===403?'GitHub не разрешил действие. Проверь доступ Contents: Read and write и срок действия ключа.':r.status===409||r.status===422?'Сайт изменился или GitHub отклонил запись. Заново загрузи данные перед публикацией.':'GitHub не выполнил действие ('+r.status+').');error.status=r.status;if(r.status===401)logout();throw error}
  return r.status===204?null:r.json();
 }
 async function verify(){
  const user=await request('/user');if(user.id!==OWNER_ID){logout();throw Error('Редактор доступен только владельцу Slangify.')}
  const repo=await request('/repos/'+REPO);if(repo.owner?.id!==OWNER_ID||!repo.permissions?.push){logout();throw Error('У ключа нет права изменять Slangify.')}verified=true;
 }
 async function login(value){logout();token=String(value||'').trim();if(!token)throw Error('Вставь ключ GitHub.');try{await verify()}catch(e){logout();throw e}}
 async function load(){
  if(!verified)throw Error('Сначала войди в редактор.');
  const ref=await request('/repos/'+REPO+'/git/ref/heads/main'),head=ref.object.sha;
  const commit=await request('/repos/'+REPO+'/git/commits/'+head),file=await request('/repos/'+REPO+'/contents/'+FILE+'?ref='+head);
  if(file.encoding!=='base64'||!file.content)throw Error('Не удалось прочитать словарь. Изменения не отправлены.');
  return {head,tree:commit.tree.sha,manifest:model.manifest(JSON.parse(decode(file.content)))};
 }
 async function publish(raw,{baseline=null,upload=null}={}){
  if(!verified)throw Error('Сначала войди в редактор.');
  const item=model.entry(raw);if(upload)validateUpload(upload,item.video?.src);
  await verify();const latest=await load(),id=model.normalize(item.word),existing=latest.manifest.entries.find(e=>model.normalize(e.word)===id)||null;
  if(JSON.stringify(existing)!==JSON.stringify(baseline))throw Error('Это слово изменено в другой вкладке. Заново загрузи данные перед публикацией.');
  if(item.video&&item.video.src!==existing?.video?.src&&!upload)throw Error('Для нового видео нужно выбрать файл.');
  const entries=latest.manifest.entries.filter(e=>model.normalize(e.word)!==id);entries.push(item);
  const manifest=model.manifest({version:1,revision:crypto.randomUUID(),entries}),content=JSON.stringify(manifest,null,2)+'\n';
  if(new TextEncoder().encode(content).length>950000)throw Error('Файл словаря слишком большой. Публикация отменена.');
  const tree=[];
  if(upload){const blob=await request('/repos/'+REPO+'/git/blobs','POST',{encoding:'base64',content:base64(upload.bytes)});tree.push({path:upload.path,mode:'100644',type:'blob',sha:blob.sha})}
  const blob=await request('/repos/'+REPO+'/git/blobs','POST',{encoding:'utf-8',content});tree.push({path:FILE,mode:'100644',type:'blob',sha:blob.sha});
  const treeObject=await request('/repos/'+REPO+'/git/trees','POST',{base_tree:latest.tree,tree});
  const commit=await request('/repos/'+REPO+'/git/commits','POST',{message:'Update Slangify word: '+item.word.replace(/[\r\n]/g,' '),tree:treeObject.sha,parents:[latest.head]});
  await request('/repos/'+REPO+'/git/refs/heads/main','PATCH',{sha:commit.sha,force:false});
  return {commit:commit.sha,manifest,item};
 }
 return {login,logout,load,publish};
}
const api={createClient,validateUpload};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.SlangEditorAPI=api;
})(typeof window==='undefined'?{}:window);
