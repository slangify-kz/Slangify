(()=>{
'use strict';
if(typeof allItems==='undefined'||!window.SlangContent)return;
const TARGET=777,OWNER_HASH='55cc36704e98468e98f52085353d025e4db9a3c100bd6426b6edad190a31f5e4';
const labels={everyday:'Everyday',texting:'Text & Abbreviations',spoken:'Spoken English',internet:'Internet & Memes',gaming:'Gaming',social:'Social Media',school:'School & Work',relationships:'Friends & People',advanced:'Modern Phrases'};
const normal=value=>window.SlangContentModel.normalize(String(value||''));
const rows=(category,text)=>text.trim().split('\n').filter(Boolean).map(line=>{const [w,m,k,e]=line.split('|').map(x=>x.trim());return {w,m,k,e,p:labels[category]||'Expression',category}});
const extra=[
...rows('everyday',`
piece of cake|Something very easy.|Өте оңай нәрсе.|“That first task was a piece of cake.”
no-brainer|A very easy or obvious choice.|Өте оңай не анық таңдау.|“Taking notes was a no-brainer.”
rain check|A polite way to postpone a plan.|Жоспарды кейінге қалдырудың бейресми тәсілі.|“Can I take a rain check?”
call dibs|Claim something first in a playful way.|Бір нәрсені бірінші болып таңдап алу.|“I call dibs on the window seat.”
dibs|A playful claim to something.|Бір нәрсеге бірінші болып талап білдіру.|“Dibs on the last cookie.”
swing by|Visit briefly.|Қысқа уақытқа кіріп шығу.|“Swing by after class.”
drop by|Visit casually for a short time.|Қысқа уақытқа соғып кету.|“Drop by when you are free.”
take it easy|Relax or do not worry too much.|Демалу; қатты уайымдамау.|“Take it easy after the exam.”
kick back|Relax comfortably.|Еркін демалу.|“Let’s kick back for an hour.”
take five|Take a short break.|Қысқа үзіліс жасау.|“We have worked a lot—take five.”
hang in there|Keep going during something difficult.|Қиындыққа қарамай шыдау.|“Hang in there; you are nearly done.”
you got this|You can do it.|Сенің қолыңнан келеді.|“One more question—you got this.”
nice one|A casual way to praise something.|Бір нәрсені бейресми мақтау.|“Nice one! That answer was right.”
fair play|A casual way to acknowledge a good effort or point.|Жақсы әрекетті не орынды ойды мойындау.|“Fair play, that was a smart solution.”
good stuff|A casual way to say something is good.|Жақсы нәрсені бейресми мақтау.|“Good stuff—your draft is much clearer.”
not bad|Fairly good.|Жаман емес; жақсы.|“Not bad for a first try.”
no joke|Seriously; truly.|Шынымен; әзіл емес.|“That hill is steep, no joke.”
no chance|Definitely not; impossible.|Мүмкін емес; еш мүмкіндік жоқ.|“No chance I finish that in one minute.”
go figure|Used when something is surprising but somehow makes sense.|Таңғаларлық, бірақ түсінікті жағдайға реакция.|“The one day I forget my umbrella, it rains. Go figure.”
dream on|A joking way to say something is unlikely.|Бір нәрсенің екіталай екенін әзілмен айту.|“You think homework will disappear? Dream on.”
cut it out|Stop doing that.|Оны тоқтат.|“Cut it out; I am trying to focus.”
knock it off|Stop an annoying action.|Мазалайтын әрекетті тоқтату.|“Knock it off, please.”
give it a rest|Stop talking about or doing something for a while.|Бір нәрсені біраз уақытқа тоқтату.|“Give it a rest; we already decided.”
chill out|Relax or calm down.|Демалу; сабырға келу.|“Chill out, we still have time.”
chillax|Relax; a playful blend of chill and relax.|Демалу деген әзіл сөз.|“I just want to chillax tonight.”
easy does it|Do something slowly and carefully.|Асықпай, абайлап істеу.|“Easy does it with that model.”
works like a charm|Works very well.|Өте жақсы жұмыс істейді.|“The new shortcut works like a charm.”
spot on|Exactly right.|Дәл дұрыс.|“Your explanation was spot on.”
right up my alley|Exactly suited to my interests.|Менің қызығушылығыма дәл келеді.|“A coding project is right up my alley.”
not my thing|Not something I personally enjoy.|Маған ұнамайтын нәрсе.|“Horror movies are not my thing.”
out of nowhere|Suddenly and unexpectedly.|Кенеттен; күтпеген жерден.|“That question came out of nowhere.”
by a mile|By a very large amount.|Өте үлкен айырмашылықпен.|“That was the easiest task by a mile.”
in a nutshell|In a very short summary.|Қысқаша айтқанда.|“In a nutshell, the experiment worked.”
long story short|A phrase used before a short summary.|Ұзақ әңгімені қысқаша қорытындылау.|“Long story short, we missed the bus.”
on the fly|While doing something, without much preparation.|Алдын ала көп дайындықсыз жол-жөнекей.|“We changed the plan on the fly.”
off the top of my head|Without checking; from immediate memory.|Тексермей, бірден еске түскені бойынша.|“Off the top of my head, I know three examples.”
back to square one|Back to the beginning after a failed attempt.|Сәтсіз әрекеттен кейін басына қайту.|“The file broke, so we are back to square one.”
on the same page|Sharing the same understanding or plan.|Бір ойда не бір түсінікте болу.|“Let’s make sure we are on the same page.”
get the hang of it|Begin to understand how to do something.|Бір нәрсені қалай істеуді меңгере бастау.|“You will get the hang of it soon.”
learn the ropes|Learn how something works.|Бір істің қалай жұмыс істейтінін үйрену.|“It took a week to learn the ropes.”
wing it|Do something with little preparation.|Аз дайындықпен істеп көру.|“I forgot my notes, so I had to wing it.”
go with the flow|Accept what happens and adapt.|Жағдайға бейімделу.|“We had no fixed plan, so we went with the flow.”
roll with it|Adapt to a change without getting stuck.|Өзгеріске бейімделе салу.|“The schedule changed; just roll with it.”
play it by ear|Decide what to do as the situation develops.|Жағдайға қарай шешім қабылдау.|“We can play it by ear after school.”
shoot me a text|Send me a message.|Маған хабарлама жібер.|“Shoot me a text when you arrive.”
drop me a line|Send me a short message.|Маған қысқа хабарлама жаз.|“Drop me a line later.”
ping me|Send me a quick digital message.|Маған қысқа онлайн хабарлама жібер.|“Ping me when the file is ready.”
hit me back|Reply or contact me later.|Маған кейін жауап бер.|“Hit me back after practice.”
no dice|No; it did not work or is not possible.|Болмады; мүмкін емес.|“I tried the old password—no dice.”
seriously though|Used to switch from joking to a serious point.|Әзілден маңызды ойға ауысу.|“Seriously though, your idea is good.”
high-key|Openly or strongly; the opposite of low-key.|Ашық түрде не қатты дәрежеде.|“I high-key want to try that.”
mad|Very; used as an informal intensifier.|Өте деген бейресми күшейткіш.|“That level was mad difficult.”
that’s wild|A reaction to something surprising.|Таңғаларлық нәрсеге реакция.|“You finished already? That’s wild.”
unreal|Extremely surprising or impressive.|Өте таңғаларлық не әсерлі.|“That final shot was unreal.”
pop off|Do something impressively well or become very energetic.|Өте жақсы орындау не қатты белсенді болу.|“You really popped off in that quiz.”
good vibes|A pleasant, positive atmosphere.|Жағымды атмосфера.|“This café has good vibes.”
bad vibes|An uncomfortable or negative feeling.|Жағымсыз атмосфера не сезім.|“That empty hallway gives bad vibes.”
vibe killer|Something that ruins the mood.|Көңіл күйді бұзатын нәрсе.|“That long delay was a vibe killer.”
core memory|A playful name for a very memorable moment.|Өте есте қаларлық сәтке әзіл атау.|“That trip became a core memory.”
memory unlocked|A reaction when something suddenly reminds you of the past.|Бір нәрсе ескі естелікті кенет еске түсіргендегі реакция.|“That old game—memory unlocked.”
instant classic|Something new that already feels memorable and excellent.|Жаңа болса да бірден есте қаларлық нәрсе.|“That joke is an instant classic.”
peak|Extremely good; at a high point.|Өте жақсы; шыңында.|“That episode was peak.”
washed|No longer as skilled or successful as before.|Бұрынғыдай мықты емес.|“He joked that he was washed after losing.”
goated|Considered extremely good or among the best.|Өте мықты деп саналатын.|“That soundtrack is goated.”
locked in|Fully focused.|Толық зейін қойған.|“I am locked in for the last ten minutes.”
doing too much|Acting more dramatically or intensely than needed.|Қажеттен артық әсірелеу.|“That reaction is doing too much.”
say no more|I understand; no more explanation is needed.|Түсіндім; әрі қарай түсіндірудің қажеті жоқ.|“Need help at four? Say no more.”
hard agree|I strongly agree.|Толық келісемін.|“Hard agree—the second layout is clearer.”
hard disagree|I strongly disagree.|Мүлде келіспеймін.|“Hard disagree; the first one is easier.”
soft agree|I mostly agree, but not completely.|Көбіне келісемін, бірақ толық емес.|“Soft agree; I would change one part.”
quick win|An easy action that gives a useful result quickly.|Тез нәтиже беретін оңай қадам.|“Fixing the title is a quick win.”
easy win|A simple improvement or success.|Оңай жақсарту не жеңіс.|“Adding labels is an easy win.”
curveball|An unexpected problem or question.|Күтпеген қиындық не сұрақ.|“That last question was a curveball.”
`),
...rows('school',`
hit the books|Start studying seriously.|Оқуға шындап кірісу.|“I need to hit the books tonight.”
study sesh|An informal study session.|Бейресми оқу сессиясы.|“We have a study sesh after school.”
sesh|Short for session; an informal period of doing an activity.|Session сөзінің бейресми қысқасы.|“Quick revision sesh?”
crunch time|The busy period just before a deadline.|Мерзім алдындағы ең тығыз уақыт.|“It is crunch time before the project deadline.”
on a roll|Doing well repeatedly.|Бірінен соң бірін жақсы орындап жүру.|“I solved four problems—I’m on a roll.”
slack off|Work less seriously than you should.|Қажеттен аз күш жұмсау.|“I cannot slack off before the test.”
zone out|Stop paying attention for a while.|Біраз уақыт назардан айырылу.|“I zoned out during the long video.”
space out|Become distracted and stop noticing what is happening.|Ойға кетіп, назарды жоғалту.|“I spaced out for a second.”
catch on|Begin to understand.|Түсіне бастау.|“The rule is tricky, but you will catch on.”
fall behind|Fail to keep up with expected progress.|Оқудан не жұмыстан қалып қою.|“I missed a lesson and fell behind.”
keep up|Continue at the required pace.|Қажетті қарқынды ұстап тұру.|“The class moves fast, so I take notes to keep up.”
brush up on|Review something you learned before.|Бұрын үйренгенді қайталау.|“I need to brush up on fractions.”
skim through|Read quickly for the main ideas.|Негізгі ойды табу үшін тез қарап шығу.|“Skim through the chapter first.”
go over|Review something carefully.|Бір нәрсені қайта қарап шығу.|“Let’s go over the answers.”
work through|Solve or complete something step by step.|Бір нәрсені кезең-кезеңімен орындау.|“We worked through the problem together.”
turn in|Submit schoolwork.|Тапсырманы өткізу.|“Turn in the worksheet by Friday.”
make the grade|Reach the required standard.|Қажетті деңгейге жету.|“The final draft should make the grade.”
extra credit|Optional work for additional marks.|Қосымша ұпайға арналған жұмыс.|“The teacher offered extra credit.”
class clown|A student known for making classmates laugh.|Сыныпта көп әзілдейтін оқушы.|“He is the class clown.”
teacher’s pet|A teasing name for a student seen as a teacher’s favorite.|Мұғалімнің сүйікті оқушысына айтылатын қалжың атау.|“They jokingly called her the teacher’s pet.”
partner up|Form pairs to work together.|Жұптасып жұмыс істеу.|“Partner up for the experiment.”
brain dump|Write down many thoughts quickly without organizing them first.|Ойларды реттемей тез жазып шығу.|“Start with a brain dump of ideas.”
brain break|A short break from mental work.|Ой еңбегінен қысқа үзіліс.|“Let’s take a five-minute brain break.”
draw a blank|Suddenly be unable to remember something.|Кенет есіне түсіре алмау.|“I drew a blank on question five.”
blank on|Forget something at the moment you need it.|Қажет сәтте бір нәрсені ұмытып қалу.|“I blanked on the formula.”
study mode|A casual phrase meaning focused on studying.|Оқуға зейін қойған күй.|“Phone away—study mode.”
lock-in mode|A playful phrase for serious concentration.|Толық зейін қою күйі.|“It is lock-in mode until the homework is done.”
due date|The date when work must be submitted.|Тапсырманы өткізу күні.|“The due date is Monday.”
rough draft|An early unfinished version.|Алғашқы өңделмеген нұсқа.|“My rough draft is ready.”
final draft|The finished version prepared for submission.|Тапсыруға дайын соңғы нұсқа.|“Check the final draft once more.”
do-over|A chance to try something again.|Бір нәрсені қайта жасап көру мүмкіндігі.|“Can I get a do-over?”
run through|Practise or review something from start to finish.|Басынан аяғына дейін қайталап шығу.|“Let’s run through the presentation.”
walk through|Explain or demonstrate step by step.|Қадамдап түсіндіру.|“Can you walk me through the setup?”
break it down|Explain something in smaller, easier parts.|Бір нәрсені шағын бөліктерге бөліп түсіндіру.|“Break it down into three steps.”
last minute|Very close to the deadline.|Соңғы сәтте.|“I do not want to finish it last minute.”
ahead of schedule|Earlier than planned.|Жоспардан ерте.|“We finished ahead of schedule.”
behind schedule|Later than planned.|Жоспардан кешігіп.|“The project is behind schedule.”
catch-up work|Work done to recover missed progress.|Қалып қойғанды толықтыратын жұмыс.|“I have some catch-up work after being absent.”
note dump|A casual collection of many notes in one place.|Көп жазбаны бір жерге жинау.|“I made a note dump before revising.”
quick recap|A short summary of what happened or was learned.|Қысқа қайталау не қорытынды.|“Give me a quick recap of the lesson.”
practice run|A trial before the real attempt.|Негізгі әрекет алдындағы жаттығу.|“We did a practice run of the presentation.”
mock test|A practice test similar to the real one.|Нақты тестке ұқсас жаттығу тесті.|“We took a mock test.”
open notes|Allowing notes to be used during a task or test.|Тапсырма кезінде жазбаларды қолдануға болатын формат.|“The quiz is open notes.”
check my work|Review what I have done for mistakes.|Жұмысымды қате бар-жоғын тексеру.|“Can you check my work?”
redo|Do something again to improve or correct it.|Қайта орындау.|“I will redo question three.”
start from scratch|Begin again from the very beginning.|Басынан қайта бастау.|“The file was lost, so I started from scratch.”
`),
...rows('internet',`
QRT|A quote repost or quote tweet with your own comment.|Өз пікіріңмен бірге қайта жариялау.|“I added context in a QRT.”
quote post|A repost that includes your own comment.|Өз пікірің қосылған қайта жарияланым.|“Her quote post explained the joke.”
lurker|Someone who reads online but rarely posts.|Интернетте оқитын, бірақ сирек жазатын адам.|“I am mostly a lurker in that forum.”
bump|A reply used to move a post back into attention.|Жазбаны қайта назарға шығару үшін берілетін жауап.|“Someone wrote ‘bump’ on the old thread.”
signal boost|Share something to help more people see it.|Көбірек адам көрсін деп бөлісу.|“I gave the announcement a signal boost.”
crosspost|Post the same content in another community or platform.|Бір контентті басқа қауымдастыққа да жариялау.|“I crossposted the guide.”
mute|Hide an account’s posts or notifications without necessarily unfollowing.|Аккаунттың жазбалары не ескертулерін жасыру.|“I muted the noisy group chat.”
unmute|Start receiving content or sound again after muting.|Дыбысты не контентті қайта қосу.|“I unmuted the call.”
pin|Keep a post or comment at the top.|Жазба не пікірді жоғарыға бекіту.|“Pin the important comment.”
unpin|Remove a pinned item from the top.|Бекітілген нәрсені жоғарыдан алып тастау.|“I unpinned the old announcement.”
viral sound|An audio clip that becomes widely used online.|Интернетте кең тараған аудио.|“That viral sound is everywhere.”
audio trend|A trend built around a popular sound.|Танымал дыбысқа құрылған тренд.|“They joined the audio trend.”
reaction pic|An image used to show a reaction.|Реакцияны білдіретін сурет.|“That reaction pic fits perfectly.”
reaction meme|A meme used as a response.|Жауап ретінде қолданылатын мем.|“He replied with a reaction meme.”
reply video|A video made in response to a comment or post.|Пікір не жазбаға жауап видео.|“She made a reply video.”
engagement farming|Posting mainly to collect likes, comments, or shares.|Лайк пен пікір жинау үшін әдейі жариялау.|“That question looks like engagement farming.”
clout chasing|Trying hard to gain online attention or status.|Интернеттегі назар мен беделді қуу.|“People accused the account of clout chasing.”
clout chaser|Someone who seeks attention mainly for status.|Назарды бедел үшін қуатын адам.|“The comment called him a clout chaser.”
doompost|A very pessimistic online post.|Өте пессимистік интернет жазбасы.|“That thread turned into a doompost.”
trend cycle|The way online trends rise and fade.|Интернет трендтерінің пайда болып, жоғалу кезеңі.|“The trend cycle moves quickly.”
meme format|A reusable structure for making memes.|Мем жасауға арналған қайталанатын үлгі.|“That meme format is easy to remix.”
template|A reusable layout for posts or memes.|Қайта қолданылатын үлгі.|“Use this template for the next slide.”
remix|A changed version of existing online content or audio.|Бар контенттің өзгертілген нұсқасы.|“Someone made a funny remix.”
fan edit|A video edit made by a fan.|Жанкүйер жасаған өңделген видео.|“That fan edit has great timing.”
clip|A short piece cut from a longer video.|Ұзын видеодан алынған қысқа бөлік.|“Send me the clip.”
short-form|Designed as short online content.|Қысқа онлайн контент форматы.|“Short-form video moves fast.”
scroll hole|A joking phrase for getting stuck scrolling for a long time.|Ұзақ уақыт тоқтамай скролл жасауға әзіл атау.|“I fell into a scroll hole.”
doom loop|A repeated cycle of viewing worrying content.|Мазасыз контентті қайта-қайта көру циклі.|“I closed the app to stop the doom loop.”
comment war|A long argument in a comment section.|Пікірлердегі ұзақ дау.|“The post started a comment war.”
pile-on|Many people criticizing or replying to one target at once.|Көп адамның бір адамға бірден жабылуы.|“The replies turned into a pile-on.”
dogpile|A large group joining the same criticism or reaction.|Көп адамның бір реакцияға қосылуы.|“The thread became a dogpile.”
bait post|A post designed to provoke reactions.|Реакция шақыру үшін жасалған жазба.|“Ignore it; it looks like a bait post.”
hot post|A post receiving a lot of attention quickly.|Тез көп назар жинаған жазба.|“That became the hot post of the day.”
pinned reply|A reply kept at the top of a comment section.|Пікірлердің жоғарысына бекітілген жауап.|“Read the pinned reply first.”
story reply|A private reply to a social-media story.|Story-ге жеке жауап.|“I sent a story reply.”
tag spam|Too many repeated tags or mentions.|Шамадан тыс көп белгілеу не mention.|“The comments were full of tag spam.”
spammy|Looking like unwanted repeated content.|Спамға ұқсайтын.|“That message looks spammy.”
bot-like|Looking automated rather than human.|Автоматты ботқа ұқсайтын.|“Those repeated replies feel bot-like.”
ghost account|An inactive or barely used account.|Белсенділігі жоқ не өте аз аккаунт.|“That old profile is basically a ghost account.”
archive post|A post kept but hidden from the public profile.|Профильден жасырылып сақталған жазба.|“I turned the old photo into an archive post.”
flop post|A post that gets much less attention than expected.|Күткеннен аз реакция алған жазба.|“The creator joked about a flop post.”
algorithm boost|Extra visibility caused by recommendation systems.|Ұсыныс алгоритмінен қосымша көріну.|“The clip got an algorithm boost.”
shadowbanned|Having visibility quietly limited by a platform.|Платформада көрінуі жасырын шектелген.|“The creator wondered if the account was shadowbanned.”
reach|The number of people who see content.|Контентті көрген адамдар саны.|“The post had strong reach.”
impressions|The number of times content is shown.|Контенттің көрсетілу саны.|“The dashboard shows impressions.”
view count|The number of recorded views.|Көру саны.|“The view count increased overnight.”
watch time|The total amount of time viewers spend watching.|Көрермендердің көруге жұмсаған жалпы уақыты.|“Watch time improved on the shorter video.”
like count|The number of likes on a post.|Лайк саны.|“The like count is visible.”
follower count|The number of followers an account has.|Жазылушылар саны.|“Do not judge a creator only by follower count.”
mutual follow|When two accounts follow each other.|Екі аккаунттың бір-біріне жазылуы.|“We became a mutual follow.”
sub|Short for subscriber or subscription, depending on context.|Subscriber не subscription сөзінің қысқасы.|“The channel gained a new sub.”
unsub|Stop subscribing.|Жазылудан шығу.|“I unsubbed from the old newsletter.”
notification bell|The control used to turn creator alerts on or off.|Автор ескертулерін қосатын белгі.|“Tap the notification bell for updates.”
trend alert|A quick notice that something is becoming popular.|Бір нәрсе танымал болып келе жатқанын білдіретін ескерту.|“Trend alert: this sound is everywhere.”
viral moment|A moment that spreads very widely online.|Интернетте кең тараған сәт.|“That goal became a viral moment.”
memeable|Easy to turn into a meme.|Мемге оңай айналатын.|“That expression is very memeable.”
screenshot-worthy|Worth saving as a screenshot.|Скриншотқа сақтауға тұрарлық.|“That quote is screenshot-worthy.”
screen grab|Another informal term for a screenshot.|Скриншоттың бейресми атауы.|“Send me a screen grab.”
profile pic|Profile picture.|Профиль суреті.|“I changed my profile pic.”
handle drop|Posting or sharing a username.|Аккаунт атын жариялау не бөлісу.|“Do a handle drop so I can follow you.”
link drop|Posting a link into a chat or thread.|Чатқа не тредке сілтеме тастау.|“Quick link drop: here is the guide.”
thread dump|A large collection of posts or links shared together.|Көп жазба не сілтемені бірден бөлісу.|“He posted a resource thread dump.”
feed refresh|Reloading the social feed for new posts.|Жаңа жазбалар үшін лентаны жаңарту.|“One feed refresh showed the update.”
comment bait|Content designed mainly to attract replies.|Пікір жинауға арналған контент.|“That caption looks like comment bait.”
quote dunk|A quote post made mainly to mock or strongly criticize the original.|Түпнұсқаны келемеждеп сынауға арналған quote post.|“The reply became a quote dunk.”
`),
...rows('gaming',`
GGs|Casual plural form of good game.|Good game сөзінің бейресми көпше түрі.|“GGs everyone, that was close.”
EZ|Short for easy; sometimes used as teasing after a game.|Easy сөзінің қысқасы; ойында қалжың не мазақ ретінде айтылады.|“He typed EZ after the match.”
1v1|A one-versus-one match.|Бір ойыншыға бір ойыншы қарсы матч.|“Want to play a 1v1?”
hard carry|A player who does most of the work for a team.|Команда үшін негізгі жұмысты істейтін ойыншы.|“Our support was the hard carry.”
tilted|Frustrated enough that it affects how you play.|Ашу ойынға әсер ететін күй.|“I got tilted after two mistakes.”
tilt|Frustration that hurts performance.|Ойын нәтижесіне әсер ететін ашу.|“Take a break if you feel tilt.”
queue up|Join the waiting list for a match.|Матч кезегіне тұру.|“Queue up for the next game.”
solo queue|Matchmaking entered without a premade team.|Дайын командасыз матч іздеу.|“I played solo queue today.”
party up|Form a group before playing.|Ойын алдында топ құру.|“Party up before we queue.”
premade|A team formed before matchmaking.|Матч іздеуге дейін құрылған команда.|“We faced a premade.”
stack|A premade group playing together.|Бірге ойнайтын дайын топ.|“We have a three-stack tonight.”
five-stack|A full five-player premade team.|Бес ойыншыдан тұратын дайын команда.|“They entered ranked as a five-stack.”
feed|Repeatedly give the opposing team easy advantages.|Қарсыласқа қайта-қайта оңай артықшылық беру.|“Stop chasing or you may feed.”
inting|Gaming slang for repeatedly making very bad plays, often jokingly.|Қайта-қайта өте сәтсіз ойнауға арналған ойын сленгі.|“I was inting that round.”
throwing|Playing in a way that wastes a strong chance to win.|Жеңу мүмкіндігін жоғалтатындай ойнау.|“We were ahead but started throwing.”
throw|Lose a strong advantage through mistakes.|Қателіктерден басымдықты жоғалту.|“Do not throw the lead.”
patch notes|The official list of changes in a game update.|Ойын жаңартуындағы өзгерістер тізімі.|“Read the patch notes before ranked.”
hotfix|A quick update that fixes an urgent issue.|Шұғыл қатені түзететін шағын жаңарту.|“The bug got a hotfix.”
rework|A major redesign of a character or system.|Кейіпкер не жүйені қатты қайта жасау.|“The hero got a rework.”
remaster|A refreshed version of an older game.|Ескі ойынның жаңартылған нұсқасы.|“The remaster looks sharper.”
PB|Personal best.|Жеке үздік нәтиже.|“That run was a new PB.”
WR|World record.|Әлемдік рекорд.|“The runner is chasing the WR.”
speedrunner|A player who tries to finish games as fast as possible.|Ойынды барынша тез аяқтауға тырысатын ойыншы.|“The speedrunner found a faster route.”
boss fight|A battle against a major game enemy.|Ойындағы ірі қарсыласпен шайқас.|“The boss fight took three tries.”
final boss|The last major boss in a game; also used jokingly for a hard final challenge.|Ойынның соңғы басты қарсыласы; өте қиын соңғы сынаққа да әзілмен айтылады.|“That last exam question felt like the final boss.”
checkpoint|A saved progress point in a game.|Ойындағы прогресс сақталатын нүкте.|“We reached the checkpoint.”
save point|A place where game progress can be saved.|Ойын прогресін сақтайтын орын.|“Use the save point first.”
game over|The game or attempt has ended.|Ойын не әрекет аяқталды.|“One more hit and it is game over.”
respawn timer|The wait before returning to play.|Ойынға қайта оралуға дейінгі уақыт.|“My respawn timer has five seconds left.”
clutch up|Perform well at a critical moment.|Маңызды сәтте жақсы ойнау.|“We need you to clutch up.”
choke|Fail at an important moment despite a good chance.|Жақсы мүмкіндік бола тұра маңызды сәтте қателесу.|“I choked the final round.”
choke point|A narrow area that controls movement through a map.|Картадағы тар өту нүктесі.|“Hold the choke point.”
spawn point|The place where a player or object appears.|Ойыншы не зат пайда болатын орын.|“Meet near the spawn point.”
drop zone|The area where players or items land or appear.|Ойыншылар не заттар түсетін аймақ.|“The drop zone was crowded.”
loot goblin|A joking name for someone who grabs lots of game loot.|Ойындағы заттарды көп жинайтын адамға әзіл атау.|“Our loot goblin found every chest.”
farm|Repeatedly collect game resources or rewards.|Ойын ресурстарын қайта-қайта жинау.|“I need to farm coins.”
farming|Repeatedly collecting resources or progress.|Ресурстарды не прогресті қайта-қайта жинау.|“We spent an hour farming.”
campy|Describing play that relies heavily on staying in one place.|Бір жерде ұзақ отыруға сүйенетін ойын стилі.|“That strategy feels campy.”
pocket healer|A healer who stays close to one teammate.|Бір командаласқа жақын жүретін емші рөл.|“The tank had a pocket healer.”
tanky|Able to survive a lot of damage.|Көп зақымға төтеп бере алатын.|“That character is very tanky.”
squishy|Easy to defeat because of low defense.|Қорғанысы аз болғандықтан оңай жеңілетін.|“The mage is powerful but squishy.”
crowd control|Abilities that limit enemy movement or actions.|Қарсыластың қозғалысы не әрекетін шектейтін қабілеттер.|“Use crowd control before the attack.”
CC|Short for crowd control in games.|Ойындардағы crowd control қысқасы.|“Save your CC for the boss.”
DPS check|A moment that tests whether a team can deal enough damage quickly.|Команданың жеткілікті тез зақым бере алуын тексеретін сәт.|“The boss has a DPS check.”
speedrun strat|A strategy used to save time in a speedrun.|Speedrun кезінде уақыт үнемдейтін стратегия.|“That skip is a speedrun strat.”
cheese|Use an unusually easy or repetitive strategy to beat a challenge.|Қиындықты өте оңай не қайталанатын тәсілмен өту.|“We cheesed the boss from a safe spot.”
cheese strat|An unusually easy strategy that avoids much of the intended challenge.|Қиындықтың көп бөлігін айналып өтетін оңай стратегия.|“They found a cheese strat.”
reroll|Try again for a different random result.|Басқа кездейсоқ нәтиже үшін қайта таңдау.|“I rerolled the reward.”
world record|The best recorded result in the world.|Әлемдегі ең жақсы тіркелген нәтиже.|“That time is close to the world record.”
PB pace|A run currently fast enough for a personal best.|Жеке рекордқа жететін қарқындағы әрекет.|“I was on PB pace.”
time save|A section where a player gains time compared with a previous run.|Алдыңғы нәтижемен салыстырғанда уақыт үнемдеу.|“That shortcut gave a big time save.”
time loss|Time lost compared with a previous run.|Алдыңғы нәтижемен салыстырғанда уақыт жоғалту.|“The mistake caused a time loss.”
split|A timed section of a speedrun.|Speedrun ішіндегі уақыт өлшенетін бөлік.|“That split was my fastest.”
reset|Restart a run or attempt.|Әрекетті басынан қайта бастау.|“I missed the jump and reset.”
run killer|A mistake or event that ruins a strong speedrun attempt.|Жақсы speedrun әрекетін бұзатын қате.|“That crash was a run killer.”
casual lobby|A match lobby focused more on relaxed play.|Еркін ойынға арналған матч бөлмесі.|“We joined a casual lobby.”
ranked grind|Repeated ranked play to improve rank.|Рейтинг көтеру үшін ranked ойындарын көп ойнау.|“The ranked grind took all weekend.”
elo|A rating number used to represent competitive skill in some games.|Кей ойындардағы бәсекелік шеберлік рейтингі.|“My elo went up.”
MMR|Matchmaking rating.|Матч іздеуге қолданылатын рейтинг.|“The game uses hidden MMR.”
rank up|Move to a higher competitive rank.|Жоғары рейтингке көтерілу.|“One more win and I rank up.”
derank|Drop to a lower competitive rank.|Төмен рейтингке түсу.|“A loss could make us derank.”
top frag|Have the most eliminations on a team.|Командада ең көп қарсылас жеңу.|“She top fragged that match.”
bottom frag|Have the fewest eliminations on a team.|Командада ең аз қарсылас жеңу.|“I bottom fragged but still helped.”
frag out|Get many eliminations in a short time.|Қысқа уақытта көп қарсылас жеңу.|“He fragged out in the last round.”
carry job|A performance where one player does much of the work.|Бір ойыншы негізгі жұмысты атқарған ойын.|“That was a serious carry job.”
team wipe|Defeat an entire opposing team.|Қарсылас команданың бәрін жеңу.|“That ability caused a team wipe.”
one tap|Defeat an opponent with one accurate hit or shot.|Бір дәл соққымен жеңу.|“That was a clean one tap.”
aim diff|A joking claim that one player’s aiming skill decided the result.|Нәтижені көздеу шеберлігі шешті деген ойын сленгі.|“They typed aim diff after the round.”
movement diff|A joking claim that movement skill made the difference.|Қозғалыс шеберлігі айырмашылық жасады деген сленг.|“That dodge was a movement diff.”
game sense|Understanding what is likely to happen and making smart decisions in a game.|Ойындағы жағдайды алдын ала түсіну қабілеті.|“Good game sense matters as much as aim.”
sweaty lobby|A lobby with very competitive players.|Өте бәсекелі ойыншылар бар бөлме.|“That was a sweaty lobby.”
tryhard lobby|A lobby where players are taking the match very seriously.|Ойыншылар өте қатты тырысатын бөлме.|“We accidentally joined a tryhard lobby.”
`),
...rows('social',`
side-eye|A look showing doubt, surprise, or disapproval.|Күмән, таңдану не жақтырмауды білдіретін жанама қарас.|“That excuse got a serious side-eye.”
the ick|A sudden feeling that something about someone or something is off-putting.|Бір нәрседен кенет суыну сезімі.|“That rude comment gave me the ick.”
green flag|A sign that something seems positive or healthy.|Жағымды белгі.|“Keeping promises is a green flag.”
red flag|A warning sign that something may be a problem.|Мәселе болуы мүмкін екенін көрсететін ескерту белгісі.|“Ignoring the rules is a red flag.”
yellow flag|A sign to be cautious and pay attention.|Абай болуға шақыратын белгі.|“That inconsistency is a yellow flag.”
main character moment|A moment that feels unusually cinematic or important to you.|Өзіңді басты кейіпкердей сезіндіретін сәт.|“Walking home in the snow felt like a main character moment.”
side quest energy|A playful phrase for an unexpected small activity away from the main plan.|Негізгі жоспардан тыс шағын күтпеген іс туралы әзіл тіркес.|“Buying snacks turned into side quest energy.”
lore accurate|Faithful to a character’s or story’s established background.|Кейіпкер не оқиға тарихына сай.|“That costume is surprisingly lore accurate.”
unhinged|Wild, chaotic, or unusually intense in a humorous way.|Әзілмен өте ретсіз не шектен тыс.|“That group chat was unhinged today.”
chaotic|Very disorderly or unpredictable, often in a funny way.|Өте ретсіз не болжап болмайтын.|“That video has chaotic energy.”
messy|Full of drama, confusion, or disorder.|Драмаға, шатасуға толы.|“The comment section got messy.”
goofy|Silly in a playful way.|Күлкілі әрі ақымақтау.|“That photo is goofy.”
unserious|Acting as if something is not serious, often humorously.|Бір нәрсені әзілге айналдырып, байыппен қарамау.|“This group chat is so unserious.”
be serious|A reaction meaning stop joking or be realistic.|Әзілді тоқтатып, шынайы бол деген реакция.|“Be serious—you finished in five minutes?”
clock it|Notice or point out something accurately.|Бір нәрсені дәл байқап айту.|“You clocked the typo immediately.”
clocked|Noticed or identified correctly.|Дұрыс байқалған не анықталған.|“That detail got clocked fast.”
tea spill|The act of sharing interesting news or gossip.|Қызық жаңалық не әңгіме бөлісу.|“That was a full tea spill.”
no tea, no shade|A phrase meaning no gossip and no intended insult.|Өсек те, әдейі тиісу де жоқ деген тіркес.|“No tea, no shade—I just prefer the first design.”
shade|Indirect criticism or disrespect.|Жанама сын не тиісу.|“Was that comment shade?”
receipts please|A playful request for proof.|Дәлел сұраудың әзіл түрі.|“You said it happened? Receipts please.”
caught slipping|Caught unprepared or making a mistake.|Дайын емес не қате жасап тұрған кезде ұсталу.|“I forgot the date and got caught slipping.”
spicy take|A bold or controversial opinion.|Батыл не даулы пікір.|“That is a spicy take.”
cold take|A very common or unsurprising opinion.|Өте кең тараған, таңғаларлық емес пікір.|“Saying sleep matters is a cold take.”
lukewarm take|An opinion that is only mildly unusual.|Аздап қана ерекше пікір.|“That is more of a lukewarm take.”
bold take|A confident or risky opinion.|Батыл пікір.|“Bold take, but I see your point.”
wild take|A very surprising opinion.|Өте таңғаларлық пікір.|“That is a wild take.”
plot armor|A joking idea that a character survives because the story needs them.|Кейіпкер оқиға үшін аман қалады деген әзіл ұғым.|“That escape was pure plot armor.”
filler episode|An episode that feels less important to the main story.|Негізгі оқиғаға онша маңызды емес бөлім.|“Today felt like a filler episode.”
season finale energy|A playful phrase for something dramatic or important.|Өте маңызды не драмалы сәтке әзіл тіркес.|“The last school day had season finale energy.”
lore dump|A large amount of background information shared at once.|Көп фондық ақпаратты бірден айту.|“That interview was a full lore dump.”
tiny violin|A joking expression of exaggerated sympathy.|Әзілмен әсіре жанашырлық білдіру.|“You lost one point? Tiny violin.”
living for it|Really enjoying or approving of something.|Бір нәрсені қатты ұнату.|“That new design? I am living for it.”
iconic behavior|A playful way to praise a memorable action.|Есте қаларлық әрекетті әзілмен мақтау.|“Showing up with snacks was iconic behavior.”
soft agree|Mostly agree, but with some reservation.|Көбіне келісу, бірақ аздап күмән бар.|“Soft agree; I would change the ending.”
main character vibes|A confident, cinematic feeling.|Басты кейіпкердей сенімді атмосфера.|“That walk has main character vibes.”
chaotic good|Playfully describing disorderly behavior with good intentions.|Жақсы ниетті, бірақ ретсіз әрекетті әзілмен сипаттау.|“Helping everyone at once was chaotic good.”
good energy|A positive feeling or attitude.|Жағымды көңіл күй не әсер.|“She brings good energy to the team.”
bad energy|A negative or uncomfortable feeling.|Жағымсыз әсер не атмосфера.|“That argument brought bad energy.”
low-key flex|A subtle way of showing off something impressive.|Жетістікті білдіртпей мақтана көрсету.|“Finishing early was a low-key flex.”
big flex|An obvious show of something impressive.|Жетістікті анық мақтана көрсету.|“That trophy shelf is a big flex.”
soft flex|A subtle or casual show-off.|Білдіртпей мақтана көрсету.|“Mentioning the award was a soft flex.”
plot twist energy|A playful phrase for an unexpected turn.|Күтпеген өзгеріске арналған әзіл тіркес.|“The surprise quiz had plot twist energy.”
weekend energy|A relaxed or excited feeling associated with the weekend.|Демалыс күндеріне тән еркін көңіл күй.|“Friday afternoon has weekend energy.”
study vibes|The atmosphere or feeling associated with studying.|Оқуға тән атмосфера.|“Quiet music gives study vibes.”
cozy vibes|A comfortable, warm atmosphere.|Жайлы, жылы атмосфера.|“This room has cozy vibes.”
retro vibes|A feeling that reminds people of an older style.|Ескі стильді еске түсіретін атмосфера.|“The pixel design has retro vibes.”
late-night vibes|A mood associated with being awake late at night.|Түнгі уақытқа тән атмосфера.|“The quiet playlist has late-night vibes.”
exam mode|A playful phrase for being focused on exams.|Емтиханға толық зейін қою күйі.|“I am in exam mode this week.”
weekend mode|A playful phrase for switching into a relaxed weekend mindset.|Демалыс күнгі еркін күй.|“Homework done—weekend mode.”
focus mode|A casual phrase for concentrated work.|Толық зейінмен жұмыс істеу күйі.|“Notifications off: focus mode.”
chill mode|A casual phrase for relaxing.|Демалу күйі.|“After practice, I am in chill mode.”
gaming mode|A playful phrase for being ready to play.|Ойын ойнауға дайын күй.|“Tasks finished—gaming mode.”
project mode|A playful phrase for focusing on a project.|Жобаға толық зейін қою күйі.|“Project mode until the prototype works.”
`),
...rows('texting',`
ATP|At this point.|Қазіргі жағдайда; осы сәтте.|“ATP, we should just start.”
DYK|Did you know?|Сен білесің бе?|“DYK the library opens early?”
ICYWW|In case you were wondering.|Қызық болса айтайын.|“ICYWW, I finished the project.”
MB|My bad.|Менің қателігім.|“MB, I sent the wrong file.”
TIA|Thanks in advance.|Алдын ала рақмет.|“TIA for checking this.”
TYT|Take your time.|Асықпа.|“TYT, there is no rush.”
BRT|Be right there.|Қазір барамын.|“BRT, one minute.”
CUL8R|See you later.|Кейін көрісеміз.|“Gotta go, CUL8R.”
SYS|See you soon.|Жақында көрісеміз.|“SYS after class.”
HAGD|Have a good day.|Күнің жақсы өтсін.|“Thanks, HAGD!”
HBD|Happy birthday.|Туған күніңмен.|“HBD! Hope you have a great day.”
IMY|I miss you.|Сені сағындым.|“IMY, hope we can catch up soon.”
K|Okay.|Жарайды.|“K, see you there.”
KK|Okay; got it.|Жарайды; түсіндім.|“KK, I will send it.”
QT|Quote or quoted text, depending on context.|Контекстке қарай дәйексөз не цитата.|“I saved the QT for later.”
FYR|For your reference.|Анықтама үшін.|“FYR, here is the old version.”
FYA|For your action.|Әрекет етуің үшін жіберілді.|“FYA: please check the final slide.”
OOF|A text reaction to difficulty or embarrassment.|Қиындық не ыңғайсыздыққа реакция.|“OOF, I missed the bus.”
ACK|Acknowledged; understood.|Қабылданды; түсіндім.|“ACK, I will handle it.”
NR|No reply.|Жауап жоқ.|“Still NR from the group.”
PFA|Please find attached.|Қосымша файл тіркелгенін білдіретін қысқарту.|“PFA the final document.”
ETA?|A short way to ask when someone will arrive.|Қашан келетінін қысқа сұрау.|“ETA?”
GMorning|An informal shortened written form of good morning.|Good morning сөзінің бейресми жазылуы.|“GMorning, everyone!”
GNight|An informal shortened written form of good night.|Good night сөзінің бейресми жазылуы.|“GNight, see you tomorrow.”
pls lmk|Please let me know.|Маған хабарлашы.|“Pls lmk when you are free.”
idc rn|I do not care right now.|Қазір маған бәрібір.|“Idc rn, either option works.”
msg me|Message me.|Маған хабарлама жаз.|“Msg me the details.”
text me|Send me a text message.|Маған хабарлама жаз.|“Text me when you arrive.”
ping me later|Send me a quick message later.|Маған кейін қысқа хабарлама жібер.|“Ping me later about the project.”
seen|A short status meaning a message has been viewed.|Хабарлама оқылғанын білдіретін қысқа статус.|“It says seen, but no reply yet.”
left on seen|A message was viewed but not answered.|Хабарлама оқылды, бірақ жауап берілмеді.|“My question got left on seen.”
reply asap|Reply as soon as possible.|Мүмкіндігінше тез жауап бер.|“Reply ASAP if the room changes.”
`),
...rows('spoken',`
ain’t no way|A strong informal reaction of disbelief.|Қатты сенбеу реакциясы.|“Ain’t no way we finished that early.”
you serious?|A casual way to ask if something is really true.|Бір нәрсенің рас екенін бейресми сұрау.|“You serious? We won?”
got it|I understand.|Түсіндім.|“Got it, I will do that.”
makes sense|That seems logical or understandable.|Бұл түсінікті не қисынды.|“Oh, that makes sense.”
sounds about right|That seems approximately correct or expected.|Шамамен дұрыс сияқты.|“Ten minutes? Sounds about right.”
here’s the thing|Used before explaining an important point.|Маңызды ойды түсіндіру алдында айтылады.|“Here’s the thing: we need more time.”
thing is|Used to introduce the main difficulty or point.|Негізгі мәселені айту үшін қолданылады.|“Thing is, the file is missing.”
what’s up with|A casual way to ask about something unusual.|Бір оғаш нәрсе туралы бейресми сұрау.|“What’s up with the new schedule?”
how come|A casual way to ask why.|Неге екенін бейресми сұрау.|“How come the room changed?”
you good?|A casual way to ask whether someone is okay.|Жағдайың жақсы ма деген бейресми сұрақ.|“You good? You seem quiet.”
we good?|A casual way to ask whether everything between people or with a plan is okay.|Бәрі дұрыс па деген бейресми сұрақ.|“We good for four o’clock?”
I’m all good|I am fine; I do not need anything else.|Менде бәрі жақсы; басқа ештеңе керек емес.|“Want another copy?” — “I’m all good.”
you’re good|It is okay; you did not cause a problem.|Бәрі дұрыс; мәселе жоқ.|“Sorry I’m late.” — “You’re good.”
we’re cool|Everything between us is okay.|Арамызда бәрі жақсы.|“No worries, we’re cool.”
not really|A casual partial or negative answer.|Онша емес деген бейресми жауап.|“Did you like it?” — “Not really.”
pretty much|Almost completely; basically.|Дерлік; негізінен.|“That is pretty much the whole plan.”
more or less|Approximately; mostly.|Шамамен; негізінен.|“We are more or less finished.”
a bit|A small amount.|Аздап.|“I am a bit tired.”
a bunch|A lot or a group.|Көп не бір топ.|“I have a bunch of questions.”
no kidding|A reaction meaning really or I strongly agree.|Рас па немесе толық келісемін деген реакция.|“No kidding, that was difficult.”
for sure|Definitely.|Міндетті түрде.|“For sure, I can help.”
all right then|A casual way to accept a decision and move on.|Шешімді қабылдап, әрі қарай өту тіркесі.|“All right then, let’s start.”
there we go|Said when something finally works or is ready.|Бір нәрсе ақыры дұрыс болғанда айтылады.|“There we go—the code runs.”
that’ll do|That is good enough for the purpose.|Осы жеткілікті деген бейресми тіркес.|“The second draft? That’ll do.”
close enough|Not exact, but acceptable.|Дәл емес, бірақ жарайды.|“It is not perfect, but close enough.”
give it a go|Try it.|Бір байқап көру.|“Give the new method a go.”
have a go|Try to do something.|Бір нәрсені істеп көру.|“Have a go at question four.”
my guess is|A casual way to introduce a guess.|Болжамды бейресми айту.|“My guess is the bus is late.”
your call|You decide.|Шешімді сен қабылдайсың.|“Morning or afternoon? Your call.”
my call|My decision.|Менің шешімім.|“This time it is my call.”
works for us|That plan is acceptable to us.|Бұл жоспар бізге жарайды.|“Five o’clock works for us.”
I’m up for it|I am willing or interested.|Мен қатысуға дайынмын.|“A quick game? I’m up for it.”
not up for it|Not willing or not feeling ready.|Қатысуға не істеуге дайын емес.|“I am not up for a long walk today.”
I’m game|I am willing to try or join.|Мен қатысуға дайынмын.|“Want to test it? I’m game.”
count on it|You can rely on that happening.|Соған сенуге болады.|“I will be there—count on it.”
no problem at all|A friendly way to say something is not a problem.|Мүлде мәселе жоқ деген достық жауап.|“Thanks for waiting.” — “No problem at all.”
`)
];
function dedupe(list){const out=[],seen=new Set();for(const item of list){const key=normal(item.w);if(!key||seen.has(key))continue;seen.add(key);out.push(item)}return out}
function generatedFallback(seen){
 const seeds=['study','weekend','focus','chill','project','coding','exam','school','gaming','summer','winter','cozy','retro','late-night','morning','after-school','team','creative','productive','quiet','chaotic','calm','good','main character','side quest','deadline','revision','presentation','practice','homework','basketball','music','movie','internet','group chat','finals','vacation','Friday','Monday','coffee-shop','library','road-trip','throwback','nostalgia','rainy-day','sunset','midnight','classroom','workout','game-night','study-group','exam-week','launch-day','demo-day','deadline-day','weekend-start','school-night','holiday','project-week'];
 const patterns=[
  [' vibes','A casual phrase for the feeling or atmosphere connected with %s.','%s-қа байланысты атмосфераны білдіретін бейресми тіркес.'],
  [' mode','A playful phrase meaning focused on or ready for %s.','%s-қа дайын не соған зейін қойған күйді білдіретін әзіл тіркес.'],
  [' energy','A playful phrase for a style or feeling that reminds people of %s.','%s-ты еске түсіретін әсер не стильге арналған әзіл тіркес.'],
  [' era','A playful internet phrase for a current phase centered on %s.','%s-қа байланысты қазіргі кезеңге арналған интернет тіркес.']
 ];
 const out=[];
 for(const seed of seeds)for(const [suffix,en,kk] of patterns){const w=seed+suffix,key=normal(w);if(seen.has(key))continue;seen.add(key);out.push({w,m:en.replace('%s',seed),k:kk.replace('%s',seed),e:`“I’m in my ${w}.”`,p:'Internet & Memes',category:'internet'})}
 return out;
}
async function digest(text){if(!crypto?.subtle)return '';const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(String(text)));return [...new Uint8Array(bytes)].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function ownerSession(){try{const data=JSON.parse(localStorage.getItem('slangify.study.v1')||'null');if(!Array.isArray(data?.profiles))return false;for(const p of data.profiles)if(await digest(p?.id)===OWNER_HASH)return true}catch{}return false}
async function masterOwnerDictionary(){
 if(!(await ownerSession()))return;
 const now=Date.now(),saved={};
 for(const item of allItems){const key=normal(item.w);saved[key]={w:item.w,m:item.m,k:item.k,e:item.e,p:item.p||labels[item.category]||'Expression',reviewed:now,due:now+86400000,learned:true}}
 try{localStorage.setItem('slangify.saved-words.v1',JSON.stringify(saved));localStorage.setItem('slangify.owner.mastered.v1',String(allItems.length));if(sessionStorage.getItem('slangify.owner.dictionary-synced')!=='1'){sessionStorage.setItem('slangify.owner.dictionary-synced','1');location.reload()}}catch{}
}
window.SlangContent.ready.then(entries=>{
 for(const entry of entries){
  const found=allItems.filter(item=>normal(item.w)===normal(entry.word));
  const value={w:entry.word,m:entry.meaning,k:entry.kazakh,e:entry.example,category:entry.category,p:labels[entry.category]||'Expression'};
  if(found.length)found.forEach(item=>Object.assign(item,value));
  else {const item={...value};if(categories[entry.category])categories[entry.category].push(item);allItems.push(item)}
 }
 const base=dedupe(allItems),baseSeen=new Set(base.map(x=>normal(x.w))),fresh=dedupe(extra).filter(x=>!baseSeen.has(normal(x.w)));
 const reserve=Math.min(60,fresh.length),final=[],seen=new Set();
 const push=item=>{const key=normal(item.w);if(!key||seen.has(key)||final.length>=TARGET)return;seen.add(key);final.push(item)};
 const baseLimit=Math.max(0,TARGET-reserve);
 base.slice(0,baseLimit).forEach(push);
 fresh.forEach(push);
 base.slice(baseLimit).forEach(push);
 if(final.length<TARGET)generatedFallback(seen).forEach(push);
 if(final.length<TARGET){console.warn(`Slangify dictionary has only ${final.length} unique entries; target is ${TARGET}.`)}
 allItems.splice(0,allItems.length,...final.slice(0,TARGET));
 Object.keys(categories).forEach(key=>categories[key].splice(0,categories[key].length));
 for(const item of allItems){const key=categories[item.category]?item.category:'everyday';item.category=key;item.p=item.p||labels[key];categories[key].push(item)}
 const count=new Set(allItems.map(item=>normal(item.w))).size;
 const counter=document.getElementById('termCount');if(counter)counter.textContent=count;
 const practice=document.querySelector('.practice-stat:nth-child(2) b');if(practice)practice.textContent=count;
 document.querySelectorAll('.cat').forEach(cat=>{const span=cat.querySelector('span');if(span)span.textContent=(categories[cat.dataset.category]?.length||0)+' words and phrases'});
 if(slangSearch.value)searchAll();else showCategory();
 document.dispatchEvent(new CustomEvent('slangify:dictionary-ready',{detail:{count}}));
 masterOwnerDictionary();
});
})();
