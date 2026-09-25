/* Slangify research worksheet: entered or imported observations only. */
(() => {
  'use strict';
  const KEY = 'slangify.research-worksheet.v1';
  const groups = [
    { code:'A', name:'Group A · Context', mode:'context' },
    { code:'B', name:'Group B · Standard', mode:'classic' },
    { code:'C', name:'Group C · Mixed', mode:'mixed' }
  ];
  const ids = groups.flatMap(g => [1,2,3].map(n => g.code+'0'+n));
  const rowFields = ['grade','age','pre','post','delayed','writing','minutes'];
  const metaFields = ['duration','lessons','lessonMinutes','expressions','activities','aiUsed','aiModel','checked','correct','corrected','surveyCount','surveyResults','notes'];
  const blank = () => ({
    rows:Object.fromEntries(ids.map(id=>[id,Object.fromEntries(rowFields.map(field=>[field,'']))])),
    meta:Object.fromEntries(metaFields.map(field=>[field,'']))
  });
  function read() {
    const result=blank();
    try {
      const saved=JSON.parse(localStorage.getItem(KEY)||'null');
      for(const id of ids)for(const field of rowFields)
        if(typeof saved?.rows?.[id]?.[field]==='string')result.rows[id][field]=saved.rows[id][field].slice(0,40);
      for(const field of metaFields)
        if(typeof saved?.meta?.[field]==='string')result.meta[field]=saved.meta[field].slice(0,1000);
    } catch {}
    return result;
  }
  function save(result,status) {
    try {localStorage.setItem(KEY,JSON.stringify(result));status.textContent='Saved in this browser.'}
    catch {status.textContent='Could not save in this browser.'}
  }
  const element=(tag,text)=>{const el=document.createElement(tag);el.textContent=text;return el};
  const withChild=(tag,child)=>{const el=document.createElement(tag);el.append(child);return el};
  const valid=(value,max)=>value!==''&&value!=null&&Number.isInteger(Number(value))&&Number(value)>=0&&Number(value)<=max?Number(value):null;
  const filled=row=>Object.values(row).some(value=>value!=='');
  const percent=(values,max)=>{
    const numbers=values.map(v=>valid(v,max)).filter(v=>v!==null);
    return numbers.length?Math.round(numbers.reduce((a,b)=>a+b,0)/(numbers.length*max)*100)+'% · n='+numbers.length:'—';
  };
  const time=minutes=>minutes===null?'—':Math.floor(minutes/60)+'h '+String(minutes%60).padStart(2,'0')+'m';
  function groupCard(group,result) {
    const rows=[1,2,3].map(n=>result.rows[group.code+'0'+n]);
    const recorded=rows.filter(row=>['pre','post','delayed'].some(f=>valid(row[f],30)!==null)).length;
    const times=rows.map(row=>valid(row.minutes,100000)).filter(n=>n!==null);
    const avg=times.length?Math.round(times.reduce((a,b)=>a+b,0)/times.length):null;
    const card=element('article','');card.className='rs-group-card';
    card.append(element('h4',group.name),element('p','Recorded participants: '+recorded+' / 3'));
    for(const [label,field,max] of [['Pre-test','pre',30],['Post-test','post',30],['Delayed test','delayed',30],['Independent writing','writing',6]]){
      const line=element('div','');line.className='rs-score';
      line.append(element('span',label),element('strong',percent(rows.map(r=>r[field]),max)));card.append(line);
    }
    const line=element('div','');line.className='rs-score';
    line.append(element('span','Mean active time'),element('strong',avg===null?'—':time(avg)+' · n='+times.length));card.append(line);
    return card;
  }
  function input(type,scope,key,value,id) {
    const control=document.createElement(type==='textarea'?'textarea':'input');
    if(type!=='textarea')control.type=type;
    control.value=value;control.dataset.scope=scope;control.dataset.field=key;
    if(id)control.dataset.row=id;
    if(type==='number'){control.min='0';control.max=key==='writing'?'6':['pre','post','delayed'].includes(key)?'30':key==='age'?'25':'100000';control.step='1'}
    else control.maxLength=1000;
    control.setAttribute('aria-label',(id?id+' · ':'')+key);
    return control;
  }
  function render(container,profiles,study) {
    const data=read();
    const section=document.createElement('section');section.className='research-sheet';
    const style=document.createElement('style');style.textContent=`
      .research-sheet{border:1px solid var(--line,#d9dfda);border-radius:16px;padding:18px;margin:18px 0 24px;background:var(--surface,#fff);color:var(--ink,#232e29)}
      .research-sheet h3{margin:0 0 8px;font-size:22px}.research-sheet h4{margin:20px 0 9px;font-size:16px}
      .research-sheet p{line-height:1.5}.rs-muted{color:var(--muted,#657069);font-size:13px}
      .rs-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:16px 0 22px}
      .rs-group-card{border:1px solid var(--line,#d9dfda);border-radius:12px;padding:14px;background:var(--surface-alt,#f0f1ec)}
      .rs-group-card h4{margin:0 0 8px}.rs-group-card p{font-size:12px;margin:0 0 10px;color:var(--muted,#657069)}
      .rs-score{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-top:1px solid var(--line,#d9dfda);font-size:12px}.rs-score strong{text-align:right}
      .rs-table-wrap{overflow:auto;border:1px solid var(--line,#d9dfda);border-radius:12px}
      .research-sheet table{border-collapse:collapse;width:100%;min-width:760px;font-size:13px}
      .research-sheet th,.research-sheet td{border-bottom:1px solid var(--line,#d9dfda);padding:8px;text-align:left}
      .research-sheet thead th{background:var(--surface-alt,#f0f1ec)}.research-sheet td input{width:72px}
      .research-sheet input,.research-sheet textarea{box-sizing:border-box;padding:8px;border-radius:8px;border:1px solid var(--line,#d9dfda);background:var(--surface,#fff);color:var(--ink,#232e29);font:inherit}
      .rs-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:14px 0}
      .rs-fields label{display:flex;flex-direction:column;gap:5px;font-size:13px}.rs-fields input,.rs-fields textarea{width:100%}.rs-fields textarea{min-height:68px;resize:vertical}
      .rs-import{margin:7px 0 0;border:1px solid var(--line,#d9dfda);border-radius:10px;background:var(--surface-alt,#f0f1ec);color:inherit;padding:10px 13px;cursor:pointer}
      @media(max-width:720px){.rs-cards,.rs-fields{grid-template-columns:1fr}.research-sheet{padding:14px}.research-sheet table{min-width:710px}}
    `;
    section.append(style,element('h3','Study results · Groups A, B and C'));
    const intro=element('p','Three places per group: A01–A03, B01–B03, C01–C03. Group figures are calculated from recorded scores.');
    intro.className='rs-muted';section.append(intro);
    const status=element('p','');status.className='rs-muted';
    const pull=element('button','Import scores from saved sessions');pull.type='button';pull.className='rs-import';
    section.append(pull);
    let cards=document.createElement('div');cards.className='rs-cards';
    const refresh=()=>{const replacement=document.createElement('div');replacement.className='rs-cards';groups.forEach(g=>replacement.append(groupCard(g,data)));cards.replaceWith(replacement);cards=replacement};
    section.append(cards);refresh();
    const participants=element('h4','');section.append(participants);
    const refreshCount=()=>{participants.textContent='1. Participants · '+ids.filter(id=>filled(data.rows[id])).length+' recorded / 9 places'};
    refreshCount();
    const caption=element('p','Group A: context · Group B: standard word-and-translation · Group C: mixed. Grade and age are recorded per participant.');
    caption.className='rs-muted';section.append(caption);
    section.append(element('h4','2–5. Pre-test, post-test, delayed test, independent writing'));
    const wrap=document.createElement('div');wrap.className='rs-table-wrap';const table=document.createElement('table');
    const header=document.createElement('tr');
    for(const label of ['Code','Grade','Age','Pre /30','Post /30','Delayed /30','Writing /6','Active (min)'])header.append(withChild('th',element('span',label)));
    table.append(withChild('thead',header));const body=document.createElement('tbody');
    for(const group of groups)for(let n=1;n<=3;n++){
      const id=group.code+'0'+n,row=document.createElement('tr');row.append(withChild('th',element('span',id)));
      for(const key of rowFields)row.append(withChild('td',input(key==='grade'?'text':'number','row',key,data.rows[id][key],id)));
      body.append(row);
    }
    table.append(body);wrap.append(table);section.append(wrap,status);
    const sections=[
      ['6. Experiment',[['duration','Duration','text'],['lessons','Number of lessons','number'],['lessonMinutes','Minutes per lesson','number']]],
      ['7. Slangify',[['expressions','Expressions taught','number'],['activities','Activities used','textarea'],['aiUsed','AI used?','text'],['aiModel','Which AI?','text']]],
      ['8. AI feedback',[['checked','Answers checked','number'],['correct','Correct','number'],['corrected','Incorrect or corrected','number']]],
      ['9. Questionnaire',[['surveyCount','Students surveyed','number'],['surveyResults','Main findings','textarea']]],
      ['10. Other notes',[['notes','Additional information','textarea']]]
    ];
    for(const [heading,fields] of sections){section.append(element('h4',heading));const grid=document.createElement('div');grid.className='rs-fields';
      for(const [key,label,type] of fields){const wrapper=document.createElement('label');wrapper.append(element('span',label),input(type,'meta',key,data.meta[key]));grid.append(wrapper)}section.append(grid)}
    pull.onclick=()=>{
      for(const group of groups){
        const found=profiles.filter(p=>p.research&&!p.demo&&p.group===group.mode).sort((a,b)=>a.created-b.created).slice(0,3);
        found.forEach((p,i)=>{
          const id=group.code+'0'+(i+1),row=data.rows[id];
          for(const stage of ['pre','post','delayed'])if(row[stage]==='')row[stage]=String(study.score(p,stage)?.correct??'');
          if(row.minutes==='')row.minutes=String(Math.round(p.activeSeconds/60));
          for(const key of ['pre','post','delayed','minutes'])section.querySelector('[data-row="'+id+'"][data-field="'+key+'"]').value=row[key];
        });
      }
      save(data,status);refresh();refreshCount();
    };
    section.oninput=event=>{
      const control=event.target,scope=control.dataset.scope,key=control.dataset.field;if(!scope||!key)return;
      if(scope==='row'){data.rows[control.dataset.row][key]=control.value;refresh();refreshCount()}
      else data.meta[key]=control.value;
      save(data,status);
    };
    container.append(section);
  }
  window.SlangResearchWorksheet={render};
})();
