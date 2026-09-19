(function(root){
'use strict';
// Distractors are reviewed against the stated meaning, not just the sentence grammar.
const rows=[
 ['back','Be right back.','Қазір қайтып келемін.','_____ — I need to get some water.',['brb'],['idk','gg','FYI']],
 ['honest','Honestly; I want to give my honest opinion.','Шынымды айтсам.','_____, I liked the first version more.',['tbh','ngl'],['brb','idk']],
 ['unknown','I do not know.','Білмеймін.','_____ when the bus arrives. Let’s check.',['idk'],['ASAP','gg','DM']],
 ['game','Good game: a friendly message after a match.','Жақсы ойын: ойыннан кейінгі жылы сөз.','_____! That was a close match.',['gg'],['FYI','AFK','idk']],
 ['away','Away from keyboard.','Компьютерден алыстап кеттім.','I’m _____ for a few minutes.',['AFK'],['GOAT','POV','ASAP']],
 ['urgent','As soon as possible.','Мүмкіндігінше тез.','Please send the file _____.',['ASAP'],['idk','FYI','gg']],
 ['mistake','My mistake; I accept responsibility.','Менің қателігім.','Oops, _____. I sent the wrong page.',['my bad','my fault'],['no cap','no worries']],
 ['message','Direct message: a private message.','Жеке хабарлама.','Send me a _____ with the address.',['DM'],['POV','FOMO','GOAT']],
 ['info','For your information.','Ақпарат үшін.','_____, the lesson starts at nine.',['FYI'],['gg','idk','AFK']],
 ['relax','Relax; take it easy.','Демалу; босаңсу.','Let’s _____ at home after the exam.',['chill','kick back'],['cram','rage quit']],
 ['study','Study a lot in a short time before a test.','Тест алдында қысқа уақытта көп оқу.','I need to _____ for tomorrow’s exam.',['cram'],['ghost','repost','nerf']],
 ['easy','Something very easy.','Өте оңай нәрсе.','That first task was a _____.',['piece of cake'],['curveball','vibe killer','heads-up']],
 ['warning','An advance warning.','Алдын ала ескерту.','Just a _____: practice starts earlier.',['heads-up'],['meme','noob','crush']],
 ['excellent','Do very well on a test.','Тестті өте жақсы тапсыру.','You’re going to _____ that test.',['ace'],['lag','ghost','repost']],
 ['together','Spend time together socially.','Бірге уақыт өткізу.','Want to _____ at the park?',['hang out'],['nerf','repost','zone out']],
 ['truth','No lie; I am being truthful.','Өтірік емес; шынымды айтып тұрмын.','That was my best score, _____.',['no cap'],['idk','AFK','FOMO']],
 ['viewpoint','Point of view.','Көзқарас.','The caption starts with _____: you are the new student.',['POV'],['DM','FYI','brb']],
 ['novice','A beginner; often used teasingly in games.','Жаңадан бастаушы; ойында әзіл не мазақ болуы мүмкін.','I’m a _____, so please explain the controls.',['noob'],['GOAT','bestie','meme']],
 ['agree','Okay; agreed.','Жарайды; келістік.','Meet at six? — _____.',['bet'],['idk','nope','brb']],
 ['short','In a short summary.','Қысқаша айтқанда.','_____, we finished the project on time.',['in a nutshell','long story short'],['out of nowhere','on the fly']],
 ['surprise','An unexpected problem or question.','Күтпеген қиындық не сұрақ.','That last question was a _____.',['curveball'],['piece of cake','quick win','no-brainer']],
 ['focus','Fully focused on a task.','Тапсырмаға толық зейін қойған.','I am _____ for these last ten minutes.',['locked in'],['AFK','washed','noob']],
 ['claim','A playful first claim to something.','Бір нәрсені бірінші болып таңдау.','_____ on the window seat!',['dibs'],['FOMO','POV','gg']],
 ['later','A request to postpone a plan.','Жоспарды кейінге қалдыруды сұрау.','Can I take a _____? I’m busy today.',['rain check'],['heads-up','DM','curveball']]
];
const questions=rows.map(([id,meaning,kazakh,sentence,answers,wrong])=>({id,meaning,kazakh,sentence,answers,options:[...answers,...wrong]}));
const grade=(q,selected)=>Array.isArray(selected)&&selected.length===q.answers.length&&new Set(selected).size===selected.length&&selected.every(x=>q.answers.includes(x));
function shuffle(items,random=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const api={questions,grade,shuffle};if(typeof module!=='undefined')module.exports=api;else root.SlangDaily=api;
})(typeof window!=='undefined'?window:globalThis);
