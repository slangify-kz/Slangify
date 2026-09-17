(()=>{
'use strict';
const situations=[
 ['brb','You need a short break from a chat.','_____ — I need to get some water.',['brb','tbh'],'Be right back.','Қазір қайтып келемін.'],
 ['my bad','You sent a friend the wrong homework page.','Oops, _____. Here is the right one.',['my bad','no cap'],'My mistake; sorry.','Менің қателігім; кешір.'],
 ['idk','Your friend asks when the next bus comes, but you are unsure.','_____. Let’s check the timetable.',['idk','ASAP'],'I do not know.','Білмеймін.'],
 ['ngl','You want to admit that an exam was difficult.','_____, that exam was harder than I expected.',['ngl','brb'],'Not going to lie; honestly.','Шынымды айтсам.'],
 ['gg','A game has just finished and you want to be friendly.','_____! That was a close match.',['gg','FYI'],'Good game.','Жақсы ойын.'],
 ['lowkey','You like a song but do not want to make a big deal of it.','I _____ like this song.',['lowkey','ASAP'],'A little, or without making it obvious.','Аздап; білдіртпей.'],
 ['hang out','You want to spend time with a friend after school.','Want to _____ at the park?',['hang out','repost'],'Spend time together.','Бірге уақыт өткізу.'],
 ['cram','You left your studying until the night before an exam.','I need to _____ for tomorrow’s test.',['cram','ghost'],'Study a lot in a short time.','Қысқа уақытта көп оқу.'],
 ['FYI','You are giving a classmate useful information.','_____, the lesson starts at nine today.',['FYI','brb'],'For your information.','Ақпарат үшін.'],
 ['catch up','You missed a lesson and want to learn what you missed.','I need to _____ on yesterday’s work.',['catch up','ghost'],'Do what you missed.','Қалып қойғанды толықтыру.'],
 ['tbh','A friend asks for your honest opinion of a game.','_____, I liked the first version more.',['tbh','AFK'],'To be honest.','Шынымды айтсам.'],
 ['heads-up','You want to warn a friend about a schedule change.','Just a _____: practice starts earlier today.',['heads-up','meme'],'An advance warning.','Алдын ала ескерту.'],
 ['ace','You want to say someone will do very well on a test.','You’re going to _____ the next one.',['ace','lag'],'Do very well on a test.','Емтиханды өте жақсы тапсыру.'],
 ['chill','Your exams are over and you want a quiet evening.','Let’s _____ at home for a while.',['chill','cram'],'Relax.','Демалу.'],
 ['ASAP','A teammate needs an important file soon.','Please send the final version _____.',['ASAP','IRL'],'As soon as possible.','Мүмкіндігінше тезірек.'],
 ['DM','You want someone to message you privately.','_____ me the details so they stay out of the group chat.',['DM','GG'],'Send a direct message.','Жеке хабарлама жіберу.'],
 ['AFK','You are stepping away from an online game for a minute.','I’ll be _____ for a minute.',['AFK','IMO'],'Away from keyboard.','Компьютерден уақытша алыстау.'],
 ['no cap','You want to stress that you are being serious.','That was the hardest level, _____.',['no cap','BRB'],'Seriously; not lying.','Шынымен; өтірік емес.'],
 ['bet','A friend suggests meeting at five and you agree.','Five o’clock? _____, see you then.',['bet','sus'],'Okay; agreed.','Жарайды; келістік.'],
 ['sus','A link from an unknown account looks suspicious.','That link looks _____.',['sus','lit'],'Suspicious or doubtful.','Күмәнді.'],
 ['flex','Someone keeps showing off a new high score.','Okay, we get it — nice _____.',['flex','ghost'],'A show-off move or display.','Мақтанып көрсету.'],
 ['ghost','Someone suddenly stops replying for days.','He didn’t answer any messages and seemed to _____.',['ghost','ace'],'Stop replying without explanation.','Хабарға жауап бермей жоғалу.'],
 ['slay','A classmate gives an excellent performance.','You absolutely _____ that presentation.',['slay','lag'],'Do something extremely well.','Өте жақсы орындау.'],
 ['GOAT','Your group jokingly calls its best player the greatest ever.','You’re the _____ of our team.',['GOAT','FOMO'],'Greatest of all time.','Барлық уақыттағы ең үздік.'],
 ['FOMO','You feel worried because friends are at an event without you.','I had serious _____ when I saw their photos.',['FOMO','DIY'],'Fear of missing out.','Қызықтан қалып қою қорқынышы.'],
 ['IRL','You have only talked online and will finally meet in person.','We finally met _____ yesterday.',['IRL','BTW'],'In real life.','Шынайы өмірде.'],
 ['BTW','You want to add a side note in a casual message.','_____, the library closes early today.',['BTW','AFK'],'By the way.','Айтпақшы.'],
 ['IMO','You are clearly giving your personal opinion.','_____, the second design is easier to read.',['IMO','BRB'],'In my opinion.','Менің ойымша.'],
 ['IKR','A friend says the new level is difficult and you strongly agree.','_____? I had the same problem.',['IKR','OMW'],'I know, right?','Иә, солай ғой?'],
 ['LMK','You want a friend to tell you when they are ready.','_____ when you finish the homework.',['LMK','NVM'],'Let me know.','Маған хабарла.'],
 ['OMW','You have already left and are traveling to meet friends.','I’m _____ — see you in ten minutes.',['OMW','IDC'],'On my way.','Жолдамын.'],
 ['NVM','You asked for help but then solved the problem yourself.','_____, I figured it out.',['NVM','FYI'],'Never mind.','Қоя сал; маңызды емес.'],
 ['NP','Someone thanks you for a small favor.','“Thanks for the notes!” — “_____.”',['NP','FOMO'],'No problem.','Мәселе жоқ.'],
 ['TTYL','You have to end a chat but plan to talk later.','I have class now, _____.',['TTYL','ASAP'],'Talk to you later.','Кейін сөйлесеміз.'],
 ['HBU','Someone tells you how their day went and asks about yours.','Mine was good. _____?',['HBU','BRB'],'How about you?','Ал сен ше?'],
 ['RN','You mean exactly at this moment.','I’m doing my math homework _____.',['RN','TBT'],'Right now.','Дәл қазір.'],
 ['fr','You strongly agree that something was difficult.','That final question was hard _____.',['fr','DM'],'For real; seriously.','Шынымен.'],
 ['lit','A school event was exciting and fun.','The talent show was _____.',['lit','sus'],'Very exciting or fun.','Өте қызық; керемет.'],
 ['fire','You really like a new song.','This track is _____.',['fire','AFK'],'Extremely good.','Өте керемет.'],
 ['vibe','A quiet café has a relaxed atmosphere.','This place has a really calm _____.',['vibe','cram'],'A feeling or atmosphere.','Атмосфера; көңіл-күй.'],
 ['bummer','An event you wanted to attend gets canceled.','The match got canceled — what a _____.',['bummer','flex'],'A disappointing situation.','Көңілсіз жағдай.'],
 ['all good','A friend apologizes for being a few minutes late.','No worries, it’s _____.',['all good','no cap'],'Everything is okay.','Бәрі жақсы; мәселе жоқ.'],
 ['give it a shot','You want to encourage someone to try a new study method.','It might help, so _____.',['give it a shot','ghost it'],'Try it.','Бір байқап көр.'],
 ['count me in','Friends invite you to a study group and you want to join.','A study session after school? _____.',['count me in','count me out'],'I want to join.','Мені де қос; қатысамын.'],
 ['works for me','A classmate suggests meeting at four and that time is fine.','Four o’clock _____.',['works for me','my bad'],'I agree with that plan.','Бұл жоспар маған жарайды.'],
 ['gotcha','Someone explains the instructions and you understand.','_____, I’ll do it that way.',['gotcha','FOMO'],'I understand.','Түсіндім.'],
 ['for sure','You want to say you will definitely join.','Yeah, I’m coming _____.',['for sure','lowkey'],'Definitely.','Әрине; міндетті түрде.'],
 ['no biggie','A small mistake is easy to fix.','It’s _____ — we can correct it in a minute.',['no biggie','big flex'],'Not a big problem.','Үлкен мәселе емес.'],
 ['hangry','You are irritable because you skipped lunch.','I need a snack; I’m getting _____.',['hangry','stoked'],'Irritable because you are hungry.','Қарны ашқандықтан ашулану.'],
 ['stoked','You are very excited about a school tournament.','I’m _____ for Saturday’s tournament.',['stoked','shady'],'Very excited.','Қатты қуанып, асыға күту.'],
 ['bop','A song is catchy and fun to listen to.','That song is such a _____.',['bop','bummer'],'A catchy, enjoyable song.','Жақсы, есте қалатын ән.'],
 ['banger','A new track is especially good.','This new track is a _____.',['banger','deadline'],'Something excellent, especially a song.','Өте керемет нәрсе, әсіресе ән.'],
 ['mood','A meme perfectly matches how you feel.','That meme is such a _____.',['mood','DM'],'Something that strongly matches your feeling.','Көңіл-күйге дәл келетін нәрсе.'],
 ['same','A friend says they are tired and you feel exactly the same.','“I’m exhausted.” — “_____.”',['same','ASAP'],'I feel the same way.','Мен де солай сезінемін.'],
 ['props','You want to give someone credit for good work.','_____ to you for finishing that project early.',['props','sus'],'Respect or praise.','Мақтау; құрмет.'],
 ['shout-out','You want to publicly thank a teammate.','Quick _____ to Amina for organizing the files.',['shout-out','ghost'],'A public mention of praise or thanks.','Жария алғыс не мақтау.'],
 ['on point','A presentation is accurate and well prepared.','Your examples were _____.',['on point','AFK'],'Exactly right or very well done.','Дәл әрі өте жақсы.'],
 ['rough','A day was difficult and unpleasant.','That was a _____ day.',['rough','fire'],'Difficult or unpleasant.','Қиын не жағымсыз.'],
 ['sweet','You hear good news and react positively.','We finished early? _____.',['sweet','sus'],'Great; good news.','Керемет; жақсы жаңалық.'],
 ['I’m down','A friend asks if you want to join a game and you agree.','Want to play after class? _____.',['I’m down','I’m outta time'],'I want to join.','Қатысуға дайынмын.']
];
const norm=s=>String(s).trim().toLowerCase();
const key='slangify.daily-phrase.v3';
function dateKey(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function setup(){
 const host=document.querySelector('.search-tools');if(!host)return;
 const box=document.createElement('section');box.className='daily-phrase';box.setAttribute('aria-label','Phrase of the day');host.before(box);
 let day=dateKey(),seed=[...day].reduce((v,c)=>(v*31+c.charCodeAt(0))>>>0,17),index=seed%situations.length,first=true,used=new Set([index]),questionNo=1;
 function nextIndex(){
  if(used.size>=situations.length)used=new Set([index]);
  const available=situations.map((_,i)=>i).filter(i=>!used.has(i));
  const i=available[Math.floor(Math.random()*available.length)];used.add(i);return i;
 }
 function render(){
  const item=situations[index],options=[...item[3]];
  for(let i=options.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[options[i],options[j]]=[options[j],options[i]]}
  box.replaceChildren();
  const top=document.createElement('div');top.className='daily-top';
  const heading=document.createElement('h2');heading.textContent=first?'Phrase of the day':'Daily practice';
  const tag=document.createElement('span');tag.textContent=`QUESTION ${questionNo} · ${situations.length} IN BANK · 1 CLEAR ANSWER`;top.append(heading,tag);
  const situation=document.createElement('p');situation.className='daily-situation';situation.textContent=item[1];
  const gap=document.createElement('p');gap.className='daily-gap';gap.textContent=item[2];
  const group=document.createElement('div');group.className='daily-options';group.setAttribute('role','group');group.setAttribute('aria-label','Choose the missing expression');
  const feedback=document.createElement('p');feedback.className='daily-feedback';feedback.setAttribute('role','status');
  const actions=document.createElement('div');actions.className='daily-actions';actions.hidden=true;
  let answered=false;
  function choose(answer,persist=true){
   if(answered)return;answered=true;
   group.querySelectorAll('button').forEach(b=>{b.disabled=true;b.setAttribute('aria-pressed',String(b.textContent===answer));if(norm(b.textContent)===norm(item[0]))b.dataset.correct='true'});
   gap.textContent=item[2].replace('_____',item[0]);
   feedback.textContent=(norm(answer)===norm(item[0])?'You got it. ':'The answer is '+item[0]+'. ')+item[4]+' · '+item[5];
   actions.hidden=false;
   if(first&&persist)try{localStorage.setItem(key,JSON.stringify({day,word:item[0],answer}))}catch{}
  }
  options.forEach(option=>{const b=document.createElement('button');b.type='button';b.textContent=option;b.onclick=()=>choose(option);group.append(b)});
  const learn=document.createElement('button');learn.type='button';learn.textContent='Explore this word';
  learn.onclick=()=>window.SlangStudio?.open({w:item[0],m:item[4],k:item[5],e:item[2].replace('_____',item[0]),p:'Everyday English'});
  const next=document.createElement('button');next.type='button';next.textContent='Next question →';next.onclick=()=>{index=nextIndex();first=false;questionNo++;render();box.querySelector('button').focus()};
  actions.append(learn,next);box.append(top,situation,gap,group,feedback,actions);
  if(first)try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved?.day===day&&saved.word===item[0]&&options.includes(saved.answer))choose(saved.answer,false)}catch{}
 }
 render();
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&dateKey()!==day){day=dateKey();seed=[...day].reduce((v,c)=>(v*31+c.charCodeAt(0))>>>0,17);index=seed%situations.length;first=true;used=new Set([index]);questionNo=1;render()}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();
