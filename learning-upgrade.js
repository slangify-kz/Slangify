(()=>{
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const key='slangify.saved-words.v1';let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}');if(!saved||Array.isArray(saved)||typeof saved!=='object')saved={};}catch{}
  const dialog=document.createElement('dialog');dialog.className='word-studio';dialog.setAttribute('aria-label','Word studio');document.body.append(dialog);
  let current=null,step=0,roundScore=0,checked=false,lastFocus=null,ygWidget=null,ygLoading=false,ygQueue=[],ygTrack=0,ygTotal=0,videoRequest=0,videoTimer=null;
  const normalize=s=>String(s).trim().toLowerCase().replace(/[’']/g,"'");
  const getWords=()=>typeof allItems!=='undefined'?allItems.map(adapt):(window.SlangStudy?.words||[]).map(adapt);
  function adapt(w){return {w:w.w||w.word,m:w.m||w.en,k:w.k||w.kk,e:w.e||w.example,p:w.p||w.kind||'Expression',neutral:w.neutral||''}}
  function persist(){try{localStorage.setItem(key,JSON.stringify(saved));return true}catch{return false}}
  function show(w){current=adapt(w);lastFocus=document.activeElement;if(!dialog.open)dialog.showModal();meaning()}
  function disposeVideo(){videoRequest++;clearTimeout(videoTimer);try{ygWidget?.pause();ygWidget?.close()}catch{}ygWidget=null;ygTrack=0;ygTotal=0}
  function shell(body){disposeVideo();dialog.innerHTML=`<p class="studio-label">WORD STUDIO · ${esc(current.p)}</p><div class="studio-top"><h2>${esc(current.w)}</h2><button data-studio="close" aria-label="Close word studio">✕</button></div><div class="studio-tabs"><button data-studio="meaning">Meaning</button><button data-studio="learn">Learn · 6 steps</button><button data-studio="video">Video</button><button data-studio="save" aria-pressed="${!!saved[normalize(current.w)]}">${saved[normalize(current.w)]?'Saved ✓':'Save word'}</button></div><div id="studio-body">${body}</div>`}
  function meaning(){shell(`<div class="studio-meaning"><p>${esc(current.m)}</p><p lang="kk">${esc(current.k)}</p></div><p class="studio-example">${esc(current.e)}</p><div class="learning-tools"><button data-studio="speak">Listen to pronunciation</button><button class="primary" data-studio="learn">Start learning →</button></div><p class="studio-note">Learn through recall, a sentence gap and a short memory check. Your saved words stay in this browser.</p>`)}
  function loadYouGlish(done){
    if(window.YG?.Widget){done(true);return}
    ygQueue.push(done);if(ygLoading)return;ygLoading=true;
    const script=document.createElement('script');let timer,settled=false;
    const finish=ok=>{if(settled)return;settled=true;clearTimeout(timer);ygLoading=false;if(!ok)script.remove();ygQueue.splice(0).forEach(fn=>fn(ok))};
    window.onYouglishAPIReady=()=>finish(!!window.YG?.Widget);
    script.async=true;script.src='https://youglish.com/public/emb/widget.js';script.charset='utf-8';script.onerror=()=>finish(false);
    timer=setTimeout(()=>finish(false),15000);document.head.appendChild(script);
  }
  function mountYouGlish(){
    const host=document.getElementById('youglish-host'),status=document.getElementById('yg-status'),next=dialog.querySelector('[data-yg-next]'),replay=dialog.querySelector('[data-yg-replay]');
    if(!host)return;
    const request=++videoRequest,word=current.w,id=`yg-widget-${request}`;
    const active=()=>request===videoRequest&&dialog.open&&host.isConnected;
    const unavailable=()=>{if(!active())return;clearTimeout(videoTimer);status.textContent='The embedded player is unavailable. Open YouGlish results to watch the matching clips.';host.innerHTML='<p class="studio-feedback">You can still open real speech examples using the link below.</p>';next.disabled=true;replay.disabled=true};
    const update=()=>{next.disabled=ygTotal<2||ygTrack>=ygTotal;replay.disabled=!ygTotal};
    host.innerHTML='<div class="yg-widget-loading">Loading real speech clips…</div>';
    videoTimer=setTimeout(unavailable,25000);
    loadYouGlish(ok=>{
      if(!active())return;if(!ok){unavailable();return}
      host.innerHTML=`<div id="${id}"></div>`;
      try{
        ygWidget=new window.YG.Widget(id,{autoStart:0,components:28,restrictionMode:1,videoQuality:'default',captionSize:22,title:'%query% · real speech (%i% of %total%)',events:{
          onFetchDone:event=>{if(!active())return;clearTimeout(videoTimer);ygTotal=Math.max(0,Math.min(5,Number(event.totalResult)||0));ygTrack=ygTotal?1:0;status.textContent=ygTotal?`Clip 1 of ${ygTotal}. Press play to hear the expression.`:'No matching clips were found for this expression.';update()},
          onVideoChange:event=>{if(!active())return;clearTimeout(videoTimer);const raw=Number(event.trackNumber);ygTrack=Math.max(1,Math.min(ygTotal||5,Number.isFinite(raw)?raw:1));status.textContent=ygTotal?`Clip ${ygTrack} of ${ygTotal}.`:'Preparing the first clip…';update()},
          onCaptionConsumed:()=>{if(active())ygWidget?.pause()},
          onError:()=>{if(!active())return;clearTimeout(videoTimer);status.textContent='This clip cannot play here. Try Next clip or open YouGlish results.';update()}
        }});
        ygWidget.fetch(word,'english','us');
      }catch{unavailable()}
    });
  }
  function videos(){const query=encodeURIComponent(current.w);shell(`<h3>Hear it in real conversation</h3><p class="studio-note">Real YouTube speech containing <strong>${esc(current.w)}</strong>, found by YouGlish. Playback pauses after the matching line. Explore up to five available matches; some expressions may have fewer results.</p><div id="youglish-host" class="youglish-host"></div><p id="yg-status" class="studio-note" role="status" aria-live="polite">Preparing real speech clips…</p><div class="learning-tools"><button data-yg-replay disabled>Replay line ↻</button><button data-yg-next disabled>Next clip →</button><a href="https://youglish.com/pronounce/${query}/english/us" target="_blank" rel="noopener noreferrer">Open YouGlish results ↗</a></div><p class="studio-note"><a href="https://youglish.com" target="_blank" rel="noopener noreferrer">Powered by YouGlish.com</a> · video services may use cookies. <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube terms</a> · <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google privacy</a></p>`);mountYouGlish()}
  function speak(){if(!('speechSynthesis'in window)){feedback('Pronunciation is unavailable in this browser.');return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(current.w);u.lang='en-US';u.rate=.85;speechSynthesis.speak(u)}
  function feedback(text){const el=document.createElement('p');el.className='studio-feedback';el.setAttribute('role','status');el.textContent=text;dialog.querySelector('#studio-body').append(el)}
  const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  function begin(){step=0;roundScore=0;question()}
  function question(){checked=false;const name=['Remember the meaning','Find the word','Complete the sentence','Recall in Kazakh','Use it yourself','Final memory check'][step];let content='';
    if(step===0)content=`<p>Read the meanings. Say the word once, then hide the card and recall both meanings.</p><div class="studio-meaning" id="memory-card"><p>${esc(current.m)}</p><p lang="kk">${esc(current.k)}</p></div><button data-studio="hide">Hide meanings</button><button data-studio="next">I recalled it →</button>`;
    if(step===1){const options=shuffle([current.w,...shuffle([...new Set(getWords().filter(w=>normalize(w.w)!==normalize(current.w)).map(w=>w.w))]).slice(0,3)]);content=`<p>${esc(current.m)}</p><div class="studio-options">${options.map(o=>`<button data-choice="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;}
    if(step===2||step===5){const safe=current.w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const sentence=current.e.replace(new RegExp(safe,'ig'),'_____');content=`<p class="studio-example">${esc(step===2&&sentence!==current.e?sentence:current.k)}</p><label for="recall-word">Type the expression from memory</label><input id="recall-word" class="studio-answer" autocomplete="off" spellcheck="false"><button class="primary" data-studio="check">Check answer</button>`;}
    if(step===3)content=`<p lang="kk">${esc(current.k)}</p><p>Say the English meaning before revealing it.</p><button data-studio="reveal">Reveal meaning</button>`;
    if(step===4)content=`<p>Write a short message to a friend using <strong>${esc(current.w)}</strong>.</p><label for="own-message">Your message</label><textarea id="own-message" class="studio-answer" maxlength="240" rows="3"></textarea><button data-studio="sentence">Save my example</button><p class="studio-note">This saves your practice; it does not grade grammar.</p>`;
    shell(`<p class="studio-label">${step+1} / 6 · ${name}</p><progress class="studio-progress" value="${step}" max="6"></progress>${content}`);
    if(step!==0){const h=dialog.querySelector('.studio-top h2');h.textContent=step===4?current.w:'Recall the expression'}
  }
  function advance(){if(step<5){step++;question();return}const id=normalize(current.w);saved[id]={...current,...saved[id],reviewed:Date.now(),due:Date.now()+86400000};const ok=persist();shell(`<p class="studio-label">ROUND COMPLETE</p><h3>One word closer.</h3><p>${roundScore}/3 checked recall answers correct.</p><p class="studio-note">${ok?'Saved for a review tomorrow.':'Browser storage is unavailable; this review is saved for this visit only.'} The full 10-question test remains separate.</p><button data-studio="learn">Try a fresh round</button><button data-studio="meaning">Back to word</button>`)}
  dialog.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=b.dataset.studio;
    if(b.dataset.ygNext!==undefined){if(b.disabled||!ygWidget||!ygTotal||ygTrack>=ygTotal)return;b.disabled=true;ygWidget.next();return}
    if(b.dataset.ygReplay!==undefined){if(!b.disabled&&ygWidget)ygWidget.replay();return}
    if(b.dataset.choice!==undefined){if(checked)return;checked=true;const right=normalize(b.dataset.choice)===normalize(current.w);if(right)roundScore++;dialog.querySelectorAll('[data-choice]').forEach(x=>x.disabled=true);feedback(right?'Correct!':`Answer: ${current.w}`);dialog.querySelector('#studio-body').insertAdjacentHTML('beforeend','<button data-studio="next">Continue →</button>');return}
    if(a==='close')dialog.close();if(a==='meaning')meaning();if(a==='learn')begin();if(a==='video')videos();if(a==='speak')speak();if(a==='next')advance();
    if(a==='save'){const id=normalize(current.w);if(saved[id])delete saved[id];else saved[id]={...current,due:Date.now()};const ok=persist();b.textContent=saved[id]?'Saved ✓':'Save word';b.setAttribute('aria-pressed',String(!!saved[id]));if(!ok)feedback('Saved for this visit only; browser storage is unavailable.')}
    if(a==='hide'){dialog.querySelector('#memory-card').hidden=!dialog.querySelector('#memory-card').hidden;b.textContent=dialog.querySelector('#memory-card').hidden?'Show meanings':'Hide meanings'}
    if(a==='reveal'){feedback(current.m);b.disabled=true;dialog.querySelector('#studio-body').insertAdjacentHTML('beforeend','<button data-studio="next">Continue →</button>')}
    if(a==='check'){if(checked)return;const input=dialog.querySelector('#recall-word');if(!input.value.trim()){input.focus();return}checked=true;const right=normalize(input.value)===normalize(current.w);if(right)roundScore++;b.disabled=true;feedback(right?'Correct!':`Answer: ${current.w}`);dialog.querySelector('#studio-body').insertAdjacentHTML('beforeend','<button data-studio="next">Continue →</button>')}
    if(a==='sentence'){const value=dialog.querySelector('#own-message').value.trim();if(value.length<8||!normalize(value).includes(normalize(current.w))){feedback('Add a short sentence containing the expression.');return}const id=normalize(current.w);saved[id]={...current,...saved[id],sentence:value};persist();advance()}
  });
  dialog.addEventListener('close',()=>{disposeVideo();dialog.innerHTML='';if('speechSynthesis'in window)speechSynthesis.cancel();lastFocus?.focus()});
  function library(){lastFocus=document.activeElement;current={w:'Saved words',p:'YOUR COLLECTION'};shell(`<p class="studio-note">Choose a word to recall. Reviews due today appear first.</p><div class="studio-list">${Object.values(saved).sort((a,b)=>(a.due||0)-(b.due||0)).map(w=>`<button data-saved="${esc(normalize(w.w))}"><strong>${esc(w.w)}</strong><span>${(w.due||0)<=Date.now()?'Review today':'Review tomorrow'}</span></button>`).join('')||'<p>No saved words yet. Open a word and choose Save word.</p>'}</div>`);dialog.querySelector('.studio-tabs').remove();dialog.querySelectorAll('[data-saved]').forEach(b=>b.onclick=()=>show(saved[b.dataset.saved]));if(!dialog.open)dialog.showModal()}
  window.SlangStudio={open:show,library};
  function enhanceCourse(){const view=document.getElementById('studyView');if(!view)return;const grid=view.querySelector('.lesson-grid');if(grid&&!view.querySelector('.study-tools')){const box=document.createElement('div');box.className='study-tools';box.innerHTML='<label for="course-find">Find your next word</label><input type="search" id="course-find" placeholder="Word, English meaning or қазақша"><select id="course-filter" aria-label="Filter course words"><option value="all">All words</option><option value="unfinished">To learn</option><option value="done">Completed</option></select><button type="button" id="saved-course">Saved words</button><p id="course-count" role="status"></p>';grid.before(box);box.querySelector('#saved-course').onclick=library;const filter=()=>{const q=normalize(box.querySelector('input').value),mode=box.querySelector('select').value;let n=0;grid.querySelectorAll('.lesson-button').forEach(b=>{const w=window.SlangStudy.byId(b.dataset.word),done=!!b.querySelector('.done');b.hidden=!(normalize([w.word,w.en,w.kk].join(' ')).includes(q)&&(mode==='all'||(mode==='done'?done:!done)));if(!b.hidden)n++});box.querySelector('#course-count').textContent=`${n} words`};box.querySelector('input').oninput=filter;box.querySelector('select').onchange=filter;filter()}
    const header=view.querySelector('.lesson-header');if(header&&!view.querySelector('.studio-launch')){const w=window.SlangStudy.byId(location.hash.split('/')[1]);if(w){const b=document.createElement('button');b.className='btn secondary studio-launch';b.textContent='Word studio · recall & video';b.onclick=()=>show(w);header.after(b)}}
  }
  const view=document.getElementById('studyView');if(view){new MutationObserver(enhanceCourse).observe(view,{childList:true});enhanceCourse()}
  const tools=document.querySelector('.search-tools');if(tools){const bar=document.createElement('div');bar.className='learning-tools';bar.innerHTML='<button type="button" id="saved-dictionary">Saved words</button><button type="button" id="surprise-word">Surprise me</button><a href="course.html#learn">Guided course →</a>';tools.prepend(bar);bar.querySelector('#saved-dictionary').onclick=library;bar.querySelector('#surprise-word').onclick=()=>{const words=getWords();show(words[Math.floor(Math.random()*words.length)])}}
})();
