/* Slangify research worksheet. Example values are illustrative, never measured. */
(() => {
  'use strict';
  const KEY = 'slangify.research-worksheet.v1';
  const groups = [
    { id:'A', label:'Группа A · контекст', mode:'context' },
    { id:'B', label:'Группа B · обычный способ', mode:'classic' },
    { id:'C', label:'Группа C · смешанный способ', mode:'mixed' }
  ];
  const ids = groups.flatMap(g => [1,2,3].map(n => g.id + String(n).padStart(2,'0')));
  const rowFields = ['grade','age','pre','post','delayed','writing','minutes'];
  const metaFields = ['duration','lessons','lessonMinutes','expressions','activities','aiUsed','aiModel','checked','correct','corrected','surveyCount','surveyResults','notes'];
  const exampleValues = [
    ['9',14,12,24,22,5,245], ['9',14,14,25,22,6,255], ['9',15,15,25,23,5,275],
    ['9',14,12,19,17,3,205], ['9',15,14,20,18,4,220], ['9',14,15,21,19,4,235],
    ['9',14,12,22,20,4,250], ['9',15,14,23,21,5,275], ['9',14,15,24,22,5,285]
  ];
  const example = {
    rows: Object.fromEntries(ids.map((id,i) => [id, Object.fromEntries(rowFields.map((field,j) => [field,String(exampleValues[i][j])]))])),
    meta: { duration:'2 недели', lessons:'6', lessonMinutes:'40', expressions:'30',
      activities:'Определения, ситуации, практика и короткие тесты',
      aiUsed:'Нет', aiModel:'Не применялась', checked:'0',correct:'0',corrected:'0',
      surveyCount:'9',surveyResults:'7 из 9 выбрали задания с примерами (вымышленный ответ)',
      notes:'Эти строки показывают формат отчёта; они не являются результатами школьного эксперимента.' }
  };
  const empty = () => ({rows:Object.fromEntries(ids.map(id=>[id,Object.fromEntries(rowFields.map(f=>[f,'']))])),
    meta:Object.fromEntries(metaFields.map(f=>[f,'']))});
  function read() {
    const data=empty();
    try {
      const raw=JSON.parse(localStorage.getItem(KEY)||'null');
      for(const id of ids)for(const field of rowFields)
        if(typeof raw?.rows?.[id]?.[field]==='string')data.rows[id][field]=raw.rows[id][field].slice(0,40);
      for(const field of metaFields)
        if(typeof raw?.meta?.[field]==='string')data.meta[field]=raw.meta[field].slice(0,1000);
    } catch {}
    return data;
  }
  function save(data,status) {
    try {localStorage.setItem(KEY,JSON.stringify(data));status.textContent='Настоящие данные сохранены в этом браузере.'}
    catch {status.textContent='Не удалось сохранить данные в этом браузере.'}
  }
  const numeric=(v,max)=>v!==''&&v!=null&&Number.isInteger(Number(v))&&Number(v)>=0&&Number(v)<=max?Number(v):null;
  function field(type,scope,id,name,value,min,max) {
    const input=document.createElement('input');input.type=type;input.value=value??'';
    input.dataset.scope=scope;input.dataset.field=name;if(id)input.dataset.row=id;
    if(type==='number'){input.min=String(min);input.max=String(max);input.step='1'}
    else input.maxLength=1000;
    input.setAttribute('aria-label',(id?id+' · ':'')+name);
    return input;
  }
  const title=(tag,text)=>{const node=document.createElement(tag);node.textContent=text;return node};
  const cell=(tag,child)=>{const el=document.createElement(tag);el.append(child);return el};
  function percent(values,max) {
    const scored=values.map(v=>numeric(v,max)).filter(v=>v!==null);
    return scored.length?Math.round(scored.reduce((a,b)=>a+b,0)/(scored.length*max)*100)+'% (n='+scored.length+')':'—';
  }
  function groupCard(group,data) {
    const rows=[1,2,3].map(n=>data.rows[group.id+'0'+n]);
    const minutes=rows.map(r=>numeric(r.minutes,100000)).filter(v=>v!==null);
    const active=minutes.length?Math.round(minutes.reduce((a,b)=>a+b,0)/minutes.length)+' мин (n='+minutes.length+')':'—';
    const completed=rows.filter(r=>['pre','post','delayed'].some(f=>r[f]!=='')).length;
    const card=document.createElement('article');card.className='rs-group-card';
    card.append(title('h4',group.label),title('p','Участников с результатом: '+completed+' / 3'));
    for(const [name,field,max] of [['Pre-test','pre',30],['Post-test','post',30],['Delayed-test','delayed',30],['Письмо','writing',6]]){
      const line=document.createElement('div');line.className='rs-score';
      line.append(title('span',name),title('strong',percent(rows.map(r=>r[field]),max)));card.append(line);
    }
    const line=document.createElement('div');line.className='rs-score';
    line.append(title('span','Активное время, среднее'),title('strong',active));card.append(line);
    return card;
  }
  function renderSheet(container,profiles,study) {
    let mode='example',actual=read();
    const section=document.createElement('section');section.className='research-sheet';
    const style=document.createElement('style');style.textContent=`
      .research-sheet{border:1px solid var(--line,#d9dfda);border-radius:16px;padding:18px;margin:18px 0 24px;background:var(--surface,#fff);color:var(--ink,#232e29)}
      .research-sheet h3{margin:0 0 8px;font-size:22px}.research-sheet h4{margin:0 0 8px;font-size:16px}
      .research-sheet p{line-height:1.5}.rs-muted{color:var(--muted,#657069);font-size:13px}
      .rs-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}.rs-tabs button,.rs-import{border:1px solid var(--line,#d9dfda);border-radius:10px;background:var(--surface-alt,#f0f1ec);color:inherit;padding:10px 13px;cursor:pointer}
      .rs-tabs button[aria-pressed=true]{background:var(--ink,#232e29);color:var(--surface,#fff)}
      .rs-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:14px 0 20px}
      .rs-group-card{border:1px solid var(--line,#d9dfda);border-radius:12px;padding:14px;background:var(--surface-alt,#f0f1ec)}
      .rs-group-card p{font-size:12px;margin:0 0 10px;color:var(--muted,#657069)}
      .rs-score{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-top:1px solid var(--line,#d9dfda);font-size:12px}.rs-score strong{text-align:right;font-size:12px}
      .rs-table-wrap{overflow:auto;border:1px solid var(--line,#d9dfda);border-radius:12px}
      .research-sheet table{border-collapse:collapse;width:100%;min-width:760px;font-size:13px}
      .research-sheet th,.research-sheet td{border-bottom:1px solid var(--line,#d9dfda);padding:8px;text-align:left}
      .research-sheet th{background:var(--surface-alt,#f0f1ec)}.research-sheet td input{width:72px}
      .research-sheet input,.research-sheet textarea{box-sizing:border-box;padding:8px;border-radius:8px;border:1px solid var(--line,#d9dfda);background:var(--surface,#fff);color:var(--ink,#232e29);font:inherit}
      .rs-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:14px 0}
      .rs-fields label{display:flex;flex-direction:column;gap:5px;font-size:13px}.rs-fields input,.rs-fields textarea{width:100%}.rs-fields textarea{min-height:66px;resize:vertical}
      .rs-subtitle{font-size:17px;margin:23px 0 9px}.rs-banner{padding:10px 12px;border-radius:10px;background:var(--surface-alt,#f0f1ec);font-size:13px}
      @media(max-width:720px){.rs-cards,.rs-fields{grid-template-columns:1fr}.research-sheet{padding:14px}.research-sheet table{min-width:710px}}
    `;section.append(style,title('h3','Данные исследования · группы A, B, C'));
    const intro=title('p','Каждой группе отведено три места: A01–A03, B01–B03 и C01–C03. Вносите только измеренные результаты.');
    intro.className='rs-muted';section.append(intro);
    const tabs=document.createElement('div');tabs.className='rs-tabs';
    for(const [value,label] of [['example','Пример заполнения'],['actual','Мои результаты']]){
      const button=title('button',label);button.type='button';button.onclick=()=>{mode=value;update()};tabs.append(button);
    }
    section.append(tabs);
    const content=document.createElement('div');section.append(content);container.append(section);
    function update() {
      const data=mode==='example'?example:actual,editable=mode==='actual';content.replaceChildren();
      for(const button of tabs.children)button.setAttribute('aria-pressed',String(button.textContent===(editable?'Мои результаты':'Пример заполнения')));
      const banner=title('p',editable?'Настоящие результаты: пустые поля не учитываются. Данные сохраняются только в этом браузере.':'ПРИМЕР · Все числа и ответы ниже вымышлены и не учитываются в настоящей статистике.');
      banner.className='rs-banner';content.append(banner);
      if(editable){
        const pull=title('button','Подставить сохранённые сессии');pull.type='button';pull.className='rs-import';
        pull.onclick=()=>{for(const g of groups){const found=profiles.filter(p=>p.research&&!p.demo&&p.group===g.mode).sort((a,b)=>a.created-b.created).slice(0,3);
          found.forEach((p,i)=>{const row=actual.rows[g.id+'0'+(i+1)];for(const stage of ['pre','post','delayed'])if(row[stage]==='')row[stage]=String(study.score(p,stage)?.correct??'');
            if(row.minutes==='')row.minutes=String(Math.round(p.activeSeconds/60));});
        }save(actual,status);update()};content.append(pull);
      }
      let cards=document.createElement('div');cards.className='rs-cards';groups.forEach(g=>cards.append(groupCard(g,data)));content.append(cards);
      const participantTitle=title('h4','1. Участники · '+(editable?'заполнено '+ids.filter(id=>Object.values(data.rows[id]).some(Boolean)).length+' из 9':'9 вымышленных участников'));
      content.append(participantTitle);
      const total=title('p','A: A01–A03 · B: B01–B03 · C: C01–C03. Класс и возраст указаны в строках ниже.');total.className='rs-muted';content.append(total);
      content.append(title('h4','2–5. Pre-test, Post-test, Delayed-test и самостоятельное письмо'));
      const wrap=document.createElement('div');wrap.className='rs-table-wrap';const table=document.createElement('table');
      const head=document.createElement('tr');for(const label of ['Код','Класс','Возраст','Pre /30','Post /30','72ч /30','Письмо /6','Активно, мин'])head.append(cell('th',title('span',label)));
      table.append(cell('thead',head));const body=document.createElement('tbody');
      for(const g of groups)for(let n=1;n<=3;n++){const id=g.id+'0'+n,row=document.createElement('tr');row.append(cell('th',title('span',id)));
        for(const f of rowFields){const value=data.rows[id][f],max=f==='writing'?6:['pre','post','delayed'].includes(f)?30:f==='age'?25:f==='minutes'?100000:12;
          const child=editable?field(f==='grade'?'text':'number','row',id,f,value,0,max):title('span',f==='minutes'?Math.floor(Number(value)/60)+' ч '+String(Number(value)%60).padStart(2,'0')+' мин':value);
          row.append(cell('td',child));
        }body.append(row)}
      table.append(body);wrap.append(table);content.append(wrap);
      const status=title('p','');status.className='rs-muted';if(editable)content.append(status);
      const fieldSets=[
        ['6. Эксперимент',[['duration','Продолжительность','text'],['lessons','Количество занятий','number'],['lessonMinutes','Минут в занятии','number']]],
        ['7. Slangify',[['expressions','Сколько выражений реально изучили','number'],['activities','Какие задания использовали','textarea'],['aiUsed','Использовали ИИ?','text'],['aiModel','Какой именно ИИ','text']]],
        ['8. Проверка ответов ИИ',[['checked','Проверено ответов','number'],['correct','Верно','number'],['corrected','Исправлено','number']]],
        ['9. Анкета',[['surveyCount','Число учеников','number'],['surveyResults','Главные результаты','textarea']]],
        ['10. Другое',[['notes','Замечания','textarea']]]
      ];
      for(const [heading,items] of fieldSets){content.append(title('h4',heading));const grid=document.createElement('div');grid.className='rs-fields';
        for(const [key,label,type] of items){const box=document.createElement('label');box.append(title('span',label));let control;
          if(editable){if(type==='textarea'){control=document.createElement('textarea');control.value=data.meta[key];control.maxLength=1000;control.dataset.scope='meta';control.dataset.field=key}
            else control=field(type,'meta',null,key,data.meta[key],0,10000);}
          else {control=title('div',data.meta[key]||'—');control.className='rs-banner';}
          box.append(control);grid.append(box)}content.append(grid)}
      if(editable)content.oninput=e=>{const input=e.target,scope=input.dataset.scope,key=input.dataset.field;if(!scope||!key)return;
        if(scope==='row'){actual.rows[input.dataset.row][key]=input.value;const replacement=document.createElement('div');replacement.className='rs-cards';groups.forEach(g=>replacement.append(groupCard(g,actual)));cards.replaceWith(replacement);cards=replacement;participantTitle.textContent='1. Участники · заполнено '+ids.filter(id=>Object.values(actual.rows[id]).some(Boolean)).length+' из 9'}
        else actual.meta[key]=input.value;
        save(actual,status);
      };
    }
    update();
  }
  window.SlangResearchWorksheet={render:renderSheet};
})();
