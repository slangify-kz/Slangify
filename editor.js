(()=>{
'use strict';
const $=id=>document.getElementById(id),model=window.SlangContentModel,client=window.SlangEditorAPI.createClient();
let manifest=null,catalog=[],baseline=null,existingVideo=null,upload=null,previewURL='',serial=0,loggedIn=false,busy=false,dirty=false,poll=0;
function status(text,error=false){$('status').textContent=text;$('status').dataset.error=String(error)}
function lock(value){busy=value;$('editFields').disabled=value;$('loadWord').disabled=value;$('reload').disabled=value;$('logout').disabled=value}
function clearPreview(){serial++;upload=null;$('preview').pause();$('preview').removeAttribute('src');$('preview').load();$('preview').hidden=true;if(previewURL){URL.revokeObjectURL(previewURL);previewURL=''}$('videoFile').value='';$('fileStatus').textContent=''}
function signOut(){poll++;client.logout();loggedIn=false;manifest=null;baseline=null;existingVideo=null;dirty=false;clearPreview();$('loginPanel').hidden=false;$('editorPanel').hidden=true;$('logout').hidden=true;$('accessKey').value='';$('wordForm').reset();$('wordForm').hidden=true}
async function refresh(){
 const data=await client.load();manifest=data.manifest;
 if(!catalog.length){const r=await fetch('content/catalog.json',{cache:'no-store',credentials:'omit'});if(!r.ok)throw Error('Не удалось загрузить список слов. Попробуй ещё раз.');const raw=await r.json();if(!Array.isArray(raw))throw Error('Не удалось прочитать список слов.');catalog=raw.map(model.entry)}
 const words=[...new Set([...catalog,...manifest.entries].map(e=>e.word))].sort((a,b)=>a.localeCompare(b));
 $('wordList').replaceChildren(...words.map(word=>{const option=document.createElement('option');option.value=word;return option}));
}
function videoFields(){
 const enabled=!$('removeVideo').checked&&!!(upload||existingVideo);
 $('videoFields').hidden=!enabled;
 for(const id of ['videoTitle','caption','credit','license'])$(id).required=enabled;
 $('rights').required=enabled&&!!upload;
}
function openWord(){
 const word=$('lookup').value.trim();if(!word){$('lookup').focus();return}
 const id=model.normalize(word);baseline=manifest.entries.find(e=>model.normalize(e.word)===id)||null;
 const item=baseline||catalog.find(e=>model.normalize(e.word)===id)||{word,category:'everyday',meaning:'',kazakh:'',example:'',note:''};
 clearPreview();$('wordForm').reset();existingVideo=item.video||null;
 for(const field of ['word','category','meaning','kazakh','example','note'])$(field).value=item[field]||'';
 $('wordForm').hidden=false;$('removeVideo').checked=false;$('rights').checked=false;
 for(const [field,prop] of [['videoTitle','title'],['caption','caption'],['credit','credit'],['license','license']])$(field).value=existingVideo?.[prop]||'';
 if(existingVideo){$('preview').src=existingVideo.src;$('preview').hidden=false;$('fileStatus').textContent='У этого слова уже есть видео.'}
 videoFields();dirty=false;status('Открыто: '+item.word);$('meaning').focus();
}
$('loginForm').addEventListener('submit',async event=>{
 event.preventDefault();$('loginButton').disabled=true;status('Проверяю доступ владельца…');
 let value=$('accessKey').value;$('accessKey').value='';
 try{const login=client.login(value);value='';await login;await refresh();loggedIn=true;$('loginPanel').hidden=true;$('editorPanel').hidden=false;$('logout').hidden=false;status('Можно менять тексты и добавлять видео.');$('lookup').focus()}
 catch(e){client.logout();status(e.message,true)}
 finally{value='';$('loginButton').disabled=false}
});
$('logout').onclick=()=>{signOut();status('Ты вышел. Ключ удалён из памяти вкладки.')};
$('loadWord').onclick=openWord;
$('lookup').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();openWord()}});
$('reload').onclick=async()=>{lock(true);try{await refresh();$('wordForm').hidden=true;dirty=false;status('Данные обновлены. Снова открой нужное слово.')}catch(e){status(e.message,true)}finally{lock(false)}};
$('removeVideo').onchange=()=>{if($('removeVideo').checked)clearPreview();else if(existingVideo){$('preview').src=existingVideo.src;$('preview').hidden=false}videoFields();dirty=true};
$('videoFile').addEventListener('change',async()=>{
 const file=$('videoFile').files?.[0];if(!file)return;
 clearPreview();const attempt=serial;
 try{
  const extension=/\.webm$/i.test(file.name)?'webm':/\.mp4$/i.test(file.name)?'mp4':null;
  if(!extension||file.size>15*1024*1024)throw Error('Выбери MP4 или WebM не больше 15 МБ.');
  $('fileStatus').textContent='Проверяю видео…';
  const path='media/clip-'+crypto.randomUUID()+'.'+extension,bytes=new Uint8Array(await file.arrayBuffer());
  if(attempt!==serial)return;
  const candidate={path,bytes};window.SlangEditorAPI.validateUpload(candidate,path);
  previewURL=URL.createObjectURL(file);const video=$('preview');
  video.onloadedmetadata=()=>{if(attempt!==serial)return;if(!Number.isFinite(video.duration)||video.duration<=0||video.duration>60){clearPreview();videoFields();status('Выбери короткий отрывок до 60 секунд.',true);return}upload=candidate;$('removeVideo').checked=false;video.hidden=false;$('fileStatus').textContent=file.name+' · '+video.duration.toFixed(1)+' сек. · '+(file.size/1048576).toFixed(1)+' МБ';if(!$('videoTitle').value)$('videoTitle').value=$('word').value+' — spoken example';$('rights').checked=false;videoFields();dirty=true;status('Видео готово. Добавь произнесённую фразу и источник.')};
  video.onerror=()=>{if(attempt!==serial)return;clearPreview();videoFields();status('Браузер не смог открыть видео. Попробуй MP4 с H.264.',true)};
  video.src=previewURL;video.load();
 }catch(e){if(attempt===serial){clearPreview();videoFields();status(e.message,true)}}
});
$('wordForm').addEventListener('input',()=>{dirty=true});
async function watchPublication(revision){
 const request=++poll;
 for(let i=0;i<24;i++){
  if(request!==poll||!loggedIn)return;
  try{const r=await fetch('content/entries.json?revision='+encodeURIComponent(revision),{cache:'no-store',credentials:'omit'});if(r.ok){const data=model.manifest(await r.json());if(data.revision===revision){if(request===poll)status('Опубликовано. Обнови Slangify — изменения доступны посетителям.');return}}}catch{}
  await new Promise(resolve=>setTimeout(resolve,6000));
 }
 if(request===poll&&loggedIn)status('Изменения сохранены в GitHub. Публикация ещё не подтверждена; обнови сайт через несколько минут.');
}
$('wordForm').addEventListener('submit',async event=>{
 event.preventDefault();if(!loggedIn||busy)return;
 if($('fileStatus').textContent==='Проверяю видео…'){status('Дождись проверки видео.');return}
 if(!$('wordForm').reportValidity())return;
 const item={};for(const field of ['word','category','meaning','kazakh','example','note'])item[field]=$(field).value;
 const video=!$('removeVideo').checked&&(upload||existingVideo);
 if(video){item.video={src:upload?.path||existingVideo.src,title:$('videoTitle').value,caption:$('caption').value,credit:$('credit').value,license:$('license').value};if(!upload&&existingVideo.captions)item.video.captions=existingVideo.captions}
 lock(true);poll++;status(upload?'Загружаю видео и сохраняю слово…':'Сохраняю слово…');
 try{
  const result=await client.publish(item,{baseline,upload:$('removeVideo').checked?null:upload});
  manifest=result.manifest;baseline=result.item;existingVideo=result.item.video||null;dirty=false;
  clearPreview();videoFields();$('wordForm').hidden=true;
  status('Изменения сохранены в GitHub. Жду публикации сайта…');watchPublication(result.manifest.revision);
 }catch(e){status(e.message+' Твой текст остался в форме.',true)}
 finally{lock(false)}
});
window.addEventListener('pagehide',()=>{client.logout();loggedIn=false;poll++;clearPreview()});
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue=''}});
})();
