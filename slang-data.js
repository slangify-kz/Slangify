(() => {
  const rows = (label, text) => text.trim().split('\n').filter(Boolean).map(line => {
    const [w, m, k, e] = line.split('|').map(part => part.trim());
    return { w, m, k, e, p: label };
  });

  window.EXTRA_SLANG = {
    texting: rows('Text & Abbreviations', `
AFAIK|As far as I know.|Менің білуімше.|“AFAIK, the lesson starts at nine.”
AKA|Also known as.|Басқаша атауы.|“Sam Lee, AKA DJ Sky.”
AMA|Ask me anything.|Маған кез келген сұрақ қой.|“I’m doing an AMA tonight.”
ATM|At the moment.|Қазіргі сәтте.|“I’m busy ATM.”
B4|Before.|Дейін; бұрын.|“Finish it B4 Friday.”
BBL|Be back later.|Кейін қайтып келемін.|“I have class, BBL.”
BBS|Be back soon.|Жақында қайтып келемін.|“BBS, one minute.”
BC|Because.|Өйткені.|“I left BC it was late.”
BDAY|Birthday.|Туған күн.|“Happy bday!”
BFF|Best friend forever.|Ең жақын дос.|“She is my BFF.”
BRB|Be right back.|Қазір қайтып келемін.|“BRB, someone is calling.”
BTW|By the way.|Айтпақшы.|“BTW, great presentation.”
CU|See you.|Кездескенше.|“CU tomorrow.”
CYA|See you.|Көріскенше.|“Cya after school.”
DM|Direct message.|Жеке хабарлама.|“Send me a DM.”
DND|Do not disturb.|Мазаламаңыз.|“My phone is on DND.”
ETA|Estimated time of arrival.|Болжалды келу уақыты.|“What’s your ETA?”
F2F|Face to face.|Бетпе-бет.|“Let’s discuss it F2F.”
FAQ|Frequently asked questions.|Жиі қойылатын сұрақтар.|“Check the FAQ first.”
FOMO|Fear of missing out.|Бір қызықтан қалып қою қорқынышы.|“FOMO made me join.”
FTW|For the win; used to praise something.|Ең жақсысы деген мақтау.|“Teamwork FTW!”
FWIW|For what it’s worth.|Пайдасы тисе айтайын.|“FWIW, I liked your idea.”
G2G|Got to go.|Кетуім керек.|“G2G, talk later.”
GJ|Good job.|Жарайсың; жақсы жұмыс.|“GJ on the project.”
GL|Good luck.|Сәттілік.|“GL on your test.”
GLHF|Good luck, have fun.|Сәттілік, көңілді ойна.|“GLHF, everyone.”
GM|Good morning.|Қайырлы таң.|“GM! How are you?”
GN|Good night.|Қайырлы түн.|“GN, see you tomorrow.”
GR8|Great.|Керемет.|“That sounds GR8.”
HBU|How about you?|Ал сен ше?|“I’m fine, HBU?”
HMU|Hit me up; contact me.|Маған хабарлас.|“HMU after class.”
HRU|How are you?|Қалың қалай?|“HRU today?”
ICYMI|In case you missed it.|Көрмей қалсаң деп айтайын.|“ICYMI, the date changed.”
IDC|I don’t care.|Маған бәрібір.|“IDC which one we choose.”
IDK|I don’t know.|Білмеймін.|“IDK the answer yet.”
IIRC|If I remember correctly.|Дұрыс есімде болса.|“IIRC, it starts at ten.”
IK|I know.|Білемін.|“IK, you told me.”
IKR|I know, right?|Иә, солай ғой?|“IKR? It was amazing.”
IMO|In my opinion.|Менің ойымша.|“IMO, option two is better.”
IMHO|In my humble opinion.|Менің қарапайым пікірімше.|“IMHO, the first design is clearer.”
IRL|In real life.|Шынайы өмірде.|“We finally met IRL.”
ISTG|I swear to God; strong emphasis.|Шынымен деп қатты айту.|“ISTG, I sent the file.”
IYKYK|If you know, you know.|Түсінетін адам түсінеді.|“That ending— IYKYK.”
JK|Just kidding.|Жай әзілдедім.|“JK, don’t worry.”
JS|Just saying.|Жай ғана айтып тұрмын.|“JS, we could leave earlier.”
LMK|Let me know.|Маған хабарла.|“LMK when you’re ready.”
LOL|Laughing out loud.|Қатты күлу; күлкілі.|“LOL, that was funny.”
LMAO|Laughing very hard; contains profanity.|Өте қатты күлу; дөрекі қысқарту.|“LMAO, that clip was hilarious.”
MSG|Message.|Хабарлама.|“Send me a msg.”
NBD|No big deal.|Ештеңе етпейді.|“Thanks!” — “NBD.”
NGL|Not gonna lie.|Шынымды айтсам.|“NGL, that was difficult.”
NM|Not much.|Еш жаңалық жоқ.|“What’s up?” — “NM.”
NP|No problem.|Мәселе жоқ.|“Thanks!” — “NP.”
NVM|Never mind.|Қоя сал; маңызды емес.|“NVM, I found it.”
OFC|Of course.|Әрине.|“OFC I’ll help.”
OMG|Oh my gosh; a surprised reaction.|Таңдану реакциясы.|“OMG, we won!”
OMW|On my way.|Жолдамын.|“OMW, see you soon.”
OOO|Out of office.|Жұмыс орнында жоқ.|“I’m OOO until Monday.”
PLS|Please.|Өтінемін.|“Reply pls.”
PLZ|Please.|Өтінемін.|“Plz send the notes.”
PM|Private message.|Жеке хабарлама.|“PM me the details.”
PPL|People.|Адамдар.|“A lot of ppl joined.”
RN|Right now.|Дәл қазір.|“I’m studying RN.”
ROFL|Rolling on the floor laughing.|Өте қатты күлу.|“ROFL, what a joke.”
SMH|Shaking my head; disappointment or disbelief.|Көңілі толмау не сенбеу реакциясы.|“SMH, he forgot again.”
SRSLY|Seriously.|Шынымен.|“SRSLY, is that true?”
TBH|To be honest.|Шынымды айтсам.|“TBH, I prefer this one.”
TBF|To be fair.|Әділін айтқанда.|“TBF, everyone tried.”
TBT|Throwback Thursday; an old memory post.|Бұрынғы естелік жарияланымы.|“TBT to our school trip.”
TGIF|Thank goodness it’s Friday.|Жұма болғанына қуану.|“TGIF! Long week.”
THX|Thanks.|Рақмет.|“Thx for helping.”
TMI|Too much information.|Артық жеке ақпарат.|“TMI, but okay.”
TTYL|Talk to you later.|Кейін сөйлесеміз.|“I have to go, TTYL.”
TY|Thank you.|Рақмет.|“TY for the answer.”
TYSM|Thank you so much.|Көп рақмет.|“TYSM for your help.”
U|You.|Сен; сіз.|“Are u ready?”
UR|Your or you’re, depending on context.|Сенің немесе сенсің; контекстке байланысты.|“Check ur messages.”
W/|With.|Бірге; -мен.|“I’m w/ my team.”
W/O|Without.|-сыз; онсыз.|“Don’t leave w/o me.”
W8|Wait.|Күте тұр.|“W8 a second.”
WB|Welcome back.|Қайта келгеніңмен.|“WB! We missed you.”
WDYM|What do you mean?|Не айтқың келеді?|“WDYM by that?”
WFH|Work from home.|Үйден жұмыс істеу.|“I’m WFH today.”
WIP|Work in progress.|Әлі жасалып жатқан жұмыс.|“The design is a WIP.”
WYD|What are you doing?|Не істеп жатырсың?|“WYD after school?”
WYA|Where are you?|Қайдасың?|“WYA? We’re waiting.”
YK|You know.|Білесің ғой.|“It was strange, yk?”
YOLO|You only live once.|Өмір бір-ақ рет беріледі.|“I tried it—YOLO.”
YW|You’re welcome.|Оқасы жоқ.|“YW, happy to help.”
TL;DR|Too long; didn’t read; a short summary.|Ұзақ мәтіннің қысқаша қорытындысы.|“TL;DR: the plan worked.”
NSFW|A warning that content may be inappropriate for school or work.|Мектепке не жұмысқа лайық емес контент туралы ескерту.|“The post was marked NSFW.”
AF|Very or extremely; contains profanity.|Өте деген күшейткіш; дөрекі.|“That test was hard AF.”
WTF|A strong surprised reaction; contains profanity.|Қатты таңдану реакциясы; дөрекі.|“WTF just happened?”
WTH|What the heck; a surprised reaction.|Не болып кетті деген таңдану.|“WTH was that?”
FFS|A frustrated reaction; contains profanity.|Қатты ренжу реакциясы; дөрекі.|“FFS, it froze again.”
FML|A frustrated reaction about one’s situation; contains profanity.|Жағдайға қатты ренжу; дөрекі.|“I missed the bus—FML.”
STFU|A very rude command to be quiet; contains profanity.|Үндеме деген өте дөрекі бұйрық.|“STFU is rude, so avoid it.”
LMFAO|Laughing extremely hard; contains profanity.|Өте қатты күлу; дөрекі қысқарту.|“LMFAO, that was unexpected.”
IDTS|I don’t think so.|Олай деп ойламаймын.|“IDTS, but let’s check.”
DW|Don’t worry.|Уайымдама.|“DW, we have time.”
SRY|Sorry.|Кешір.|“Sry, I’m late.”
OBV|Obviously.|Әрине; анық.|“OBV, we need a plan.”
PROB|Probably.|Мүмкін; сірә.|“I’ll prob go tomorrow.”
DEF|Definitely.|Міндетті түрде.|“I’ll def join.”
THO|Though.|Дегенмен.|“It was fun tho.”
CUZ|Because.|Өйткені.|“I stayed home cuz it rained.”
RLY|Really.|Шынымен.|“Rly? That’s great.”
TXT|Text message.|Мәтіндік хабарлама.|“Send me a txt.”
ILY|I love you; also used warmly with family and friends.|Сені жақсы көремін; жақындарға айтылады.|“ILY, Mom.”
ILYSM|I love you so much.|Сені қатты жақсы көремін.|“ILYSM, Grandma.”
XOXO|Hugs and kisses; a warm sign-off.|Құшақ пен жылы тілек білдіретін қоштасу.|“Thanks again, xoxo.”
`,),

    spoken: rows('Spoken English', `
ain’t|Informal form of am not, is not, are not, or have not.|Am not, is not, are not сөздерінің бейресми түрі.|“It ain’t ready yet.”
gonna|Going to.|Going to сөзінің ауызекі түрі.|“I’m gonna study.”
wanna|Want to.|Want to сөзінің ауызекі түрі.|“Do you wanna join?”
gotta|Have got to; must.|Істеу керек.|“I gotta go.”
kinda|Kind of; somewhat.|Сәл; біршама.|“I’m kinda tired.”
sorta|Sort of; somewhat.|Сияқты; біршама.|“It’s sorta difficult.”
lemme|Let me.|Маған рұқсат ет.|“Lemme check.”
gimme|Give me.|Маған бер.|“Gimme a minute.”
dunno|Don’t know.|Білмеймін.|“I dunno yet.”
outta|Out of.|-дан шығу; таусылу.|“We’re outta time.”
lotta|A lot of.|Көп.|“That’s a lotta work.”
c’mon|Come on.|Қане; қойшы.|“C’mon, let’s go.”
’cause|Because.|Өйткені.|“I stayed ’cause it rained.”
’em|Them.|Оларды.|“Tell ’em the news.”
ya|You.|Сен; сіз.|“See ya later.”
y’all|You all.|Сендер; сіздер.|“How are y’all?”
imma|I’m going to.|Мен ... істеймін деген ауызекі түр.|“Imma call later.”
tryna|Trying to.|Істеуге тырысып жатыр.|“I’m tryna focus.”
shoulda|Should have.|Істеуім керек еді.|“I shoulda checked.”
coulda|Could have.|Істей алар еді.|“We coulda won.”
woulda|Would have.|Істер еді.|“I woulda helped.”
mighta|Might have.|Мүмкін болған шығар.|“It mighta changed.”
musta|Must have.|Болған болуы керек.|“You musta missed it.”
hafta|Have to.|Істеу керек.|“I hafta finish this.”
oughta|Ought to; should.|Істеген дұрыс.|“You oughta rest.”
gotcha|I understand; I got you.|Түсіндім.|“Gotcha, no problem.”
whatcha|What are you or what do you.|Не істеп жатырсың деген ауызекі түр.|“Whatcha doing?”
howdy|An informal hello.|Бейресми сәлем.|“Howdy, everyone!”
nah|An informal no.|Жоқ деген бейресми түр.|“Nah, I’m good.”
yeah|An informal yes.|Иә деген бейресми түр.|“Yeah, that works.”
uh-huh|Yes; I agree or understand.|Иә; түсіндім.|“Uh-huh, I understand.”
uh-uh|No; disagreement.|Жоқ деген ауызекі дыбыс.|“Uh-uh, not today.”
mm-hmm|Yes; listening or agreeing.|Иә; тыңдап тұрмын.|“Mm-hmm, go on.”
sup|What’s up; hello.|Не жаңалық; сәлем.|“Sup, everyone?”
wassup|What’s up; hello.|Не жаңалық; сәлем.|“Wassup, bro?”
gotta bounce|I need to leave.|Кетуім керек.|“It’s late, gotta bounce.”
catch ya later|See you later.|Кейін кездесеміз.|“Catch ya later!”
long time no see|We have not met for a long time.|Көптен көріспедік.|“Hey, long time no see!”
no worries|It is okay; no problem.|Ештеңе етпейді.|“No worries, I can wait.”
you bet|Certainly; you’re welcome.|Әрине; оқасы жоқ.|“Can you help?” — “You bet.”
there you go|Used when giving something or when someone succeeds.|Міне; дұрыс істедің.|“There you go, you solved it.”
here you go|Used when handing something to someone.|Міне, алыңыз.|“Here you go—your notebook.”
hang on|Wait for a short time.|Күте тұр.|“Hang on a second.”
hold on|Wait; stop briefly.|Күте тұр; тоқтай тұр.|“Hold on, I’m coming.”
give me a break|Stop being unfair or unbelievable.|Қойшы; әділетсіз болма.|“Give me a break, that’s not true.”
beats me|I do not know.|Мен де білмеймін.|“Where is it?” — “Beats me.”
no way|Impossible; strong surprise or refusal.|Мүмкін емес; қатты таңдану.|“No way, you won!”
way to go|Well done.|Жарайсың.|“Way to go, team!”
I mean|Used to clarify or correct a thought.|Ойды нақтылау үшін айтылады.|“I mean, we can try again.”
you know|Used to check shared understanding.|Білесің ғой.|“It was strange, you know?”
right on|Strong agreement or approval.|Толық келісу не мақұлдау.|“You finished? Right on!”
for real|Seriously; truly.|Шынымен.|“Are you for real?”
real quick|Very quickly.|Өте тез.|“Can I ask real quick?”
bunch of|Many; a group of.|Бір топ; көп.|“I have a bunch of ideas.”
tons of|A very large amount.|Өте көп.|“We have tons of time.”
grab a bite|Get something to eat.|Тамақтанып алу.|“Let’s grab a bite.”
head out|Leave a place.|Жолға шығу; кету.|“I’m going to head out.”
call it a day|Stop working for today.|Бүгінгі жұмысты аяқтау.|“Let’s call it a day.”
`,),

    internet: rows('Internet & Memes', `
algorithm|A system that decides what content you see.|Қандай контент көретініңді анықтайтын жүйе.|“The algorithm showed me this.”
alt account|A secondary online account.|Қосымша интернет аккаунт.|“That is my alt account.”
anon|An anonymous person online.|Интернеттегі жасырын адам.|“An anon posted the answer.”
avatar|A picture or character representing a user.|Пайдаланушыны көрсететін сурет не кейіпкер.|“I changed my avatar.”
bait|Content designed to provoke a reaction.|Реакция тудыру үшін жасалған контент.|“Don’t reply; it’s bait.”
rage bait|Content made to make people angry.|Адамдарды ашуландыру үшін жасалған контент.|“That headline is rage bait.”
block|Prevent an account from contacting you.|Аккаунттың саған жазуына тыйым салу.|“I blocked the spam account.”
bookmark|Save a post or page for later.|Жазбаны кейінге сақтау.|“Bookmark this guide.”
bot|An automated account or program.|Автоматты аккаунт не бағдарлама.|“That reply looks like a bot.”
canon|Officially true in a story or fictional world.|Оқиға әлемінде ресми түрде шын.|“That detail is canon.”
canon event|An important event treated as unavoidable.|Маңызды әрі міндеттідей көрінетін оқиға.|“It felt like a canon event.”
clickbait|A title designed mainly to get clicks.|Басу үшін әдейі қызықты жасалған тақырып.|“The title was clickbait.”
clout|Online influence or attention.|Интернеттегі бедел не назар.|“They did it for clout.”
comment section|The area where people reply to a post.|Жазбаға пікір қалдыратын бөлім.|“Check the comment section.”
copypasta|Text copied and reposted many times.|Қайта-қайта көшіріліп жарияланатын мәтін.|“That paragraph is copypasta.”
cringe|Embarrassing or uncomfortable to watch.|Көруге ұят не ыңғайсыз.|“That old video is cringe.”
cursed|Strange or unsettling in a funny way.|Күлкілі түрде оғаш.|“This image is cursed.”
delulu|Playfully unrealistic or overly hopeful.|Әзілмен шындықтан алшақ үміттену.|“I’m delulu, but maybe we’ll win.”
doomscroll|Keep reading negative news for too long.|Жағымсыз жаңалықтарды ұзақ қарай беру.|“I need to stop doomscrolling.”
edit|A remixed or stylized video.|Өңделген қысқа видео.|“That football edit is great.”
engagement|Likes, comments, shares, and other reactions.|Лайк, пікір, бөлісу сияқты белсенділік.|“The post got high engagement.”
face reveal|Showing one’s face online for the first time.|Интернетте жүзін алғаш рет көрсету.|“The creator did a face reveal.”
fan account|An account dedicated to a person or topic.|Бір адамға не тақырыпқа арналған аккаунт.|“It’s a fan account.”
fandom|A community of fans.|Жанкүйерлер қауымы.|“The fandom made new art.”
feed|The stream of posts shown to a user.|Пайдаланушыға көрінетін жазбалар таспасы.|“My feed is full of sports.”
finsta|A private secondary Instagram account.|Жеке қосымша Instagram аккаунты.|“She posts casual photos on her finsta.”
hashtag|A word after # used to label content.|Контент тақырыбын белгілейтін # сөзі.|“Add a useful hashtag.”
hype|Strong attention or excitement.|Қатты қызығушылық пен назар.|“The game has a lot of hype.”
influencer|A creator with influence over an audience.|Аудиторияға ықпалы бар контент авторы.|“The influencer reviewed it.”
lore|Background story or shared history.|Оқиғаның артындағы тарих.|“Explain the full lore.”
lurk|Read online without posting.|Жазбай, сырттай қарап жүру.|“I usually lurk in that forum.”
main character energy|Confident behavior that attracts attention.|Басты кейіпкердей сенімді мінез.|“That entrance had main character energy.”
mod|A moderator who manages an online community.|Интернет қауымдастығын басқаратын модератор.|“Ask a mod for help.”
mutuals|People who follow each other.|Бір-біріне жазылған пайдаланушылар.|“We became mutuals.”
notifications|Alerts about online activity.|Интернет белсенділігі туралы ескертулер.|“Turn off notifications for class.”
OP|Original poster; the person who started a post.|Жазбаны алғаш жариялаған адам.|“OP added more details.”
pfp|Profile picture.|Профиль суреті.|“I like your new pfp.”
ratioed|Receiving a poor reaction compared with replies.|Жауаптармен салыстырғанда аз қолдау алу.|“The post got ratioed.”
reaction|A response using an emoji, image, or video.|Эмодзи, сурет не видео түріндегі жауап.|“Her reaction was funny.”
reply guy|Someone who replies to many posts for attention.|Назар үшін көп жазбаға жауап беретін адам.|“He became a reply guy.”
screenshot|A captured image of a screen.|Экранның түсірілген суреті.|“Send a screenshot.”
shadowban|Quietly limit an account’s visibility.|Аккаунт көрінуін жасырын шектеу.|“The creator thinks they were shadowbanned.”
ship|Want two fictional characters or people to be a pair.|Екі кейіпкерді жұп ретінде елестету.|“Fans ship those characters.”
simp|A mocking term for someone seen as overly devoted; can be insulting.|Біреуге шамадан тыс жағынатын адамға айтылатын келемеж сөз.|“Calling people a simp can be rude.”
stan|Be a very enthusiastic fan.|Өте белсенді жанкүйер болу.|“I stan this team.”
streamer|Someone who broadcasts live online.|Интернетте тікелей эфир жүргізетін адам.|“The streamer started a live session.”
subtweet|A post about someone without naming them.|Атын атамай біреу туралы жазба жариялау.|“That sounded like a subtweet.”
tag|Mention or label someone in a post.|Жазбада біреуді белгілеу.|“Tag me in the photo.”
take|An opinion or interpretation.|Пікір не түсіндіру.|“That’s an interesting take.”
tea|Interesting gossip or news.|Қызық әңгіме не жаңалық.|“What’s the tea?”
timeline|A stream of social media posts.|Әлеуметтік желідегі жазбалар таспасы.|“It’s all over my timeline.”
troll|Someone who provokes people online.|Интернетте әдейі арандататын адам.|“Don’t feed the troll.”
unfriend|Remove someone from a friends list.|Біреуді достар тізімінен өшіру.|“They unfriended the fake account.”
unfollow|Stop following an account.|Аккаунттан жазылудан шығу.|“I unfollowed that page.”
verified|Marked as an authentic or notable account.|Ресми не танымал екені расталған аккаунт.|“The account is verified.”
vlog|A video diary or video blog.|Видео күнделік не видеоблог.|“She uploaded a travel vlog.”
W|A win or something good.|Жеңіс не жақсы нәрсе.|“That update is a W.”
L|A loss or something bad.|Жеңіліс не жаман нәтиже.|“Missing the bus was an L.”
W take|A good opinion.|Жақсы әрі орынды пікір.|“That’s a W take.”
L take|A bad opinion.|Сәтсіз не орынсыз пікір.|“People called it an L take.”
wholesome|Positive, kind, and uplifting.|Жылы, мейірімді әрі жағымды.|“That video was wholesome.”
brainrot|Content or a topic someone cannot stop thinking about.|Ойдан кетпейтін интернет контенті не тақырып.|“This game is my current brainrot.”
rizz|Charm or skill in social interaction and flirting.|Адаммен сөйлесудегі тартымдылық.|“He has confident rizz.”
sigma|A meme label for an independent, self-confident person.|Тәуелсіз, өзіне сенімді адам туралы мем атауы.|“The comment used sigma as a joke.”
skibidi|A playful nonsense meme word with no fixed meaning.|Тұрақты мағынасы жоқ әзіл-мем сөз.|“They said skibidi as a joke.”
mid|Average or disappointing.|Орташа не көңіл көншітпейтін.|“The sequel was mid.”
cooked|In trouble, exhausted, or likely to fail.|Қиын жағдайда не қатты шаршаған.|“I forgot the deadline—I’m cooked.”
let them cook|Let someone continue because their idea may work.|Идеясы жүзеге асуы мүмкін, жалғастыра берсін.|“Wait, let her cook.”
lock in|Focus seriously on a task.|Іске толық зейін қою.|“We need to lock in.”
aura|A person’s perceived confidence or presence.|Адамнан сезілетін сенімділік пен әсер.|“That entrance had aura.”
aura points|Imaginary points gained or lost for cool behavior.|Әдемі не ыңғайсыз әрекетке берілетін ойдан шығарылған ұпай.|“That save earned aura points.”
6-7|A viral nonsense phrase used as a flexible reaction.|Әртүрлі реакция ретінде қолданылатын мағынасыз вирустық тіркес.|“Someone shouted 6-7 as a meme.”
Gen Z stare|A blank look given instead of an expected response.|Күтілген жауап орнына үнсіз, бос қарау.|“The clip joked about the Gen Z stare.”
`,),

    everyday: rows('Everyday', `
awesome|Very good or impressive.|Өте жақсы; керемет.|“That idea is awesome.”
cool|Good, fashionable, or acceptable.|Жақсы; сәнді; жарайды.|“Cool, see you later.”
dope|Very good or impressive.|Өте керемет.|“That design is dope.”
sick|Excellent or impressive in slang.|Сленгте керемет деген сөз.|“That move was sick.”
fire|Extremely good.|Өте керемет.|“This song is fire.”
epic|Extremely impressive or exciting.|Өте әсерлі не қызық.|“That comeback was epic.”
solid|Reliable or quite good.|Сенімді не жақсы.|“That’s a solid plan.”
sketchy|Suspicious or unsafe-looking.|Күдікті көрінетін.|“That link looks sketchy.”
shady|Dishonest or suspicious.|Адал емес не күдікті.|“That deal seems shady.”
salty|Annoyed, often after losing.|Ренжіген, әсіресе жеңілгеннен кейін.|“He’s salty about the game.”
extra|Overly dramatic or excessive.|Шамадан тыс әсірелейтін.|“That reaction was extra.”
pressed|Upset or bothered.|Ренжіген не мазасыз.|“Why are you so pressed?”
shook|Very surprised.|Қатты таңданған.|“I was shook by the ending.”
I’m dead|That is extremely funny.|Өте күлкілі деген реакция.|“That joke—I’m dead.”
weak|Laughing very hard.|Қатты күлу реакциясы.|“That video has me weak.”
no biggie|It is not a big problem.|Үлкен мәселе емес.|“No biggie, we can fix it.”
no sweat|No problem; easily done.|Мәселе жоқ; оңай.|“Can you help?” — “No sweat.”
easy peasy|Very easy.|Өте оңай.|“The first task was easy peasy.”
bummer|A disappointing situation.|Көңілсіз жағдай.|“The event was canceled—bummer.”
rough|Difficult or unpleasant.|Қиын не жағымсыз.|“That was a rough day.”
sweet|Great; good news.|Керемет; жақсы жаңалық.|“Sweet, we finished early.”
blast|A very fun time.|Өте көңілді уақыт.|“We had a blast.”
rip-off|Something unfairly expensive or poor value.|Бағасы орынсыз қымбат нәрсе.|“That price is a rip-off.”
I’m good|No thanks, or I am fine.|Жоқ, рақмет немесе жағдайым жақсы.|“Want more?” — “I’m good.”
count me in|I want to join.|Мені де қос; қатысамын.|“A movie night? Count me in.”
count me out|I do not want to join.|Мені қоспа; қатыспаймын.|“A 6 a.m. run? Count me out.”
works for me|I agree with that plan.|Бұл жоспар маған жарайды.|“Meet at four?” — “Works for me.”
all good|Everything is okay.|Бәрі жақсы; мәселе жоқ.|“Sorry!” — “All good.”
give it a shot|Try something.|Бір байқап көру.|“Give the new method a shot.”
nail it|Do something very well.|Бір нәрсені өте жақсы орындау.|“You nailed the presentation.”
`,),

    gaming: rows('Gaming', `
DPS|Damage per second; also a damage-focused role.|Секундына келетін зақым; шабуыл рөлі.|“Our team needs more DPS.”
HP|Health points.|Денсаулық ұпайы.|“My HP is low.”
XP|Experience points.|Тәжірибе ұпайы.|“This quest gives lots of XP.”
PvP|Player versus player.|Ойыншының ойыншыға қарсы ойыны.|“This zone allows PvP.”
PvE|Player versus environment.|Ойыншылардың ойын әлеміне қарсы ойыны.|“We mainly play PvE.”
MMO|Massively multiplayer online game.|Көп ойыншы қатысатын онлайн ойын.|“That MMO has a huge world.”
RPG|Role-playing game.|Рөлдік ойын.|“It’s an open-world RPG.”
FPS|First-person shooter; also frames per second.|Бірінші жақтан атыс ойыны; кадр жиілігі.|“This FPS runs at 120 FPS.”
BR|Battle royale.|Корольдік шайқас жанры.|“They play a BR together.”
RTS|Real-time strategy game.|Нақты уақыттағы стратегия ойыны.|“That classic is an RTS.”
RNG|Random number generation; game randomness.|Ойындағы кездейсоқтық жүйесі.|“Bad RNG gave me the wrong item.”
AoE|Area of effect.|Белгілі аумаққа әсер ету.|“Use an AoE ability.”
cooldown|Time before an ability can be used again.|Қабілетті қайта қолдануға дейінгі уақыт.|“The skill is on cooldown.”
crit|A critical hit that deals extra damage.|Қосымша зақым беретін сыни соққы.|“That attack was a crit.”
tank|A role that absorbs damage for a team.|Команда үшін зақымды қабылдайтын рөл.|“Our tank protected us.”
healer|A role that restores teammates’ health.|Команда денсаулығын қалпына келтіретін рөл.|“The healer saved the team.”
support|A role that helps teammates.|Командаға көмектесетін рөл.|“I usually play support.”
frag|A defeat of an opponent, especially in shooters.|Қарсыласты жеңу, көбіне атыс ойынында.|“He got three frags.”
smurf|An experienced player using a low-level account.|Төмен деңгейлі аккаунттағы тәжірибелі ойыншы.|“That new account might be a smurf.”
sweaty|Playing with extreme effort and competitiveness.|Өте қатты тырысып, бәсекелі ойнау.|“That lobby was sweaty.”
tryhard|Someone who tries extremely hard to win.|Жеңу үшін шамадан тыс тырысатын ойыншы.|“They called him a tryhard.”
cracked|Extremely skilled at a game.|Ойында өте шебер.|“She is cracked at this game.”
diff|A gap in skill between opposing roles or players.|Қарсы ойыншылар шеберлігінің айырмасы.|“That was a team diff.”
skill issue|A teasing way to blame a mistake on ability.|Қатені шеберліктің аздығымен әзілдеп түсіндіру.|“Missed again? Skill issue.”
meta|The most effective current strategy.|Қазіргі ең тиімді стратегия.|“That character is in the meta.”
build|A chosen setup of skills and items.|Қабілет пен заттардың таңдалған жиынтығы.|“Try this new build.”
loadout|Equipment chosen before a match.|Матчқа дейін таңдалған жабдық.|“Change your loadout.”
lobby|The waiting area before a match.|Матч алдындағы күту бөлмесі.|“Join my lobby.”
matchmaking|The system that finds players for a match.|Матчқа ойыншылар табатын жүйе.|“Matchmaking took a minute.”
ping|Connection delay measured in milliseconds.|Миллисекундпен өлшенетін байланыс кідірісі.|“My ping is too high.”
DC|Disconnect from a game.|Ойыннан байланыс үзілуі.|“I might DC.”
wipe|The whole team is defeated.|Бүкіл команданың жеңілуі.|“That attack caused a wipe.”
revive|Bring a teammate back into play.|Командаласты ойынға қайта қосу.|“Can you revive me?”
aggro|An enemy’s attention toward a player.|Қарсыластың ойыншыға бағытталған назары.|“The tank has aggro.”
side quest|An optional task outside the main story.|Негізгі оқиғадан бөлек қосымша тапсырма.|“I’m doing a side quest.”
`,),

    social: rows('Social Media', `
aesthetic|A consistent visual style or mood.|Біркелкі визуал стиль не көңіл күй.|“Her page has a calm aesthetic.”
archive|Hide a post without deleting it.|Жазбаны өшірмей жасыру.|“I archived the old photo.”
bio|Short profile information.|Профильдегі қысқа ақпарат.|“The link is in my bio.”
carousel|A post containing several swipeable items.|Бірнеше сырғытылатын суреті бар жазба.|“The tips are in a carousel.”
close friends|A private audience list for stories.|Stories үшін жабық достар тізімі.|“I shared it with close friends.”
collab|A collaboration between creators.|Авторлардың бірлескен жұмысы.|“They posted a collab.”
content|Material posted online.|Интернетке жарияланған материал.|“She makes study content.”
engagement rate|The percentage of viewers who interact.|Әрекет жасаған көрермендер пайызы.|“The post has a strong engagement rate.”
explore page|A page recommending new content.|Жаңа контент ұсынатын бет.|“The reel reached the explore page.”
followers|People subscribed to an account.|Аккаунтқа жазылған адамдар.|“The page gained new followers.”
following|Accounts a user subscribes to.|Пайдаланушы жазылған аккаунттар.|“Check your following list.”
handle|An account’s @ username.|Аккаунттың @ аты.|“What’s your handle?”
link in bio|A web link placed in a profile description.|Профиль сипаттамасындағы сілтеме.|“Details are in the link in bio.”
live|A real-time online broadcast.|Нақты уақыттағы интернет эфир.|“They are live now.”
livestream|A video broadcast in real time.|Нақты уақытта көрсетілетін видео.|“We watched the livestream.”
mention|Tag someone by username.|Біреуді аккаунт атымен белгілеу.|“Thanks for the mention.”
photo dump|A casual post with several mixed photos.|Бірнеше әртүрлі суреті бар еркін жазба.|“She shared a summer photo dump.”
pinned|Kept at the top of a profile or comments.|Профиль не пікірлердің жоғарғы жағына бекітілген.|“Read the pinned comment.”
reel|A short vertical social video.|Қысқа тік әлеуметтік видео.|“That reel was useful.”
short|A short-form vertical video.|Қысқа тік форматтағы видео.|“He uploaded a new short.”
storytime|A post or video telling a personal story.|Жеке оқиғаны баяндайтын видео не жазба.|“This is a quick storytime.”
subscribe|Choose to receive a creator’s updates.|Автор жаңалықтарына жазылу.|“Subscribe for new lessons.”
thumbnail|The preview image for a video.|Видеоның алдын ала суреті.|“The thumbnail is clear.”
upload|Put a file or post online.|Файлды не жазбаны интернетке салу.|“I’ll upload it tonight.”
soft launch|Hint at news without revealing everything.|Жаңалықты толық ашпай ишаралау.|“The project got a soft launch.”
hard launch|Announce something openly and fully.|Бір нәрсені ашық әрі толық жариялау.|“They did a hard launch today.”
`,),

    school: rows('School & Work', `
all-nighter|Staying awake all night to work or study; usually unhealthy.|Түні бойы ұйықтамай оқу не жұмыс істеу; денсаулыққа пайдалы емес.|“He regretted pulling an all-nighter.”
pop quiz|A short unexpected test.|Күтпеген қысқа бақылау.|“We had a pop quiz.”
open-book|A test where books or notes are allowed.|Кітап не жазба қолдануға болатын тест.|“It’s an open-book exam.”
group project|An assignment completed by a team.|Топпен орындалатын тапсырма.|“Our group project is due Friday.”
GPA|Grade point average.|Орташа оқу көрсеткіші.|“Her GPA improved.”
extracurricular|An activity outside normal classes.|Сабақтан тыс іс-шара.|“Basketball is an extracurricular activity.”
office hours|Scheduled time to ask a teacher or colleague questions.|Мұғалімге не әріптеске сұрақ қоятын белгіленген уақыт.|“Visit during office hours.”
syllabus|A course outline and schedule.|Курстың жоспары мен кестесі.|“Read the syllabus.”
rubric|A guide showing how work is graded.|Жұмыстың қалай бағаланатынын көрсететін нұсқаулық.|“Check the rubric first.”
study buddy|A person you study with.|Бірге оқитын серіктес.|“My study buddy helped me review.”
study group|A group that learns together.|Бірге оқитын топ.|“We formed a study group.”
retake|Take a test again.|Тестті қайта тапсыру.|“I can retake the quiz.”
extension|Extra time to finish work.|Жұмысты аяқтауға қосымша уақыт.|“She requested an extension.”
make-up test|A test taken later because the original was missed.|Өткізіп алған тестті кейін тапсыру.|“The make-up test is Monday.”
touch base|Talk briefly to exchange updates.|Қысқаша сөйлесіп, жаңалық алмасу.|“Let’s touch base tomorrow.”
circle back|Return to a topic later.|Тақырыпқа кейін қайта оралу.|“We’ll circle back after lunch.”
bandwidth|Available time or energy for a task.|Тапсырмаға жететін уақыт не күш.|“I don’t have the bandwidth today.”
EOD|End of day.|Күннің соңы.|“Please send it by EOD.”
COB|Close of business.|Жұмыс күнінің соңы.|“Reply before COB.”
TBD|To be determined.|Кейін анықталады.|“The location is TBD.”
TBA|To be announced.|Кейін хабарланады.|“The winner is TBA.”
PTO|Paid time off.|Ақылы демалыс уақыты.|“She is on PTO.”
hybrid|Partly remote and partly in person.|Бір бөлігі онлайн, бір бөлігі офлайн.|“It is a hybrid schedule.”
sync|A short meeting to coordinate.|Жұмысты үйлестіруге арналған қысқа кездесу.|“We have a team sync.”
agenda|A list of meeting topics.|Кездесу тақырыптарының тізімі.|“Check today’s agenda.”
minutes|Written notes from a meeting.|Кездесудің жазбаша қорытындысы.|“Please share the minutes.”
follow up|Contact someone again about a topic.|Бір тақырып бойынша қайта хабарласу.|“I’ll follow up tomorrow.”
loop in|Include someone in a conversation or project.|Біреуді әңгімеге не жобаға қосу.|“Loop in the designer.”
hand off|Transfer work to another person.|Жұмысты басқа адамға тапсыру.|“I’ll hand it off to the team.”
back burner|A lower-priority task for later.|Кейінге қалдырылған маңызы төмен іс.|“Put that idea on the back burner.”
`,),

    relationships: rows('Friends & People', `
buddy|A friend.|Дос.|“He’s my study buddy.”
pal|A friend.|Дос.|“Thanks, pal.”
mate|A friend, especially in British or Australian English.|Дос, әсіресе британ не австралия ағылшынында.|“How are you, mate?”
crew|A close group of people.|Жақын адамдар тобы.|“The whole crew came.”
circle|A group of friends or contacts.|Достар не таныстар ортасы.|“She has a small circle.”
mutual friend|A friend shared by two people.|Екі адамға ортақ дос.|“We met through a mutual friend.”
acquaintance|Someone you know but not closely.|Жақын емес таныс адам.|“He is an acquaintance from school.”
roomie|Roommate.|Бір бөлмеде тұратын адам.|“My roomie is studying.”
classmate|Someone in the same class.|Сыныптас.|“Ask your classmate.”
teammate|Someone on the same team.|Командалас.|“My teammate passed the ball.”
bond|A close connection.|Жақын байланыс.|“They formed a strong bond.”
chemistry|A natural connection between people.|Адамдар арасындағы табиғи үйлесім.|“The team has good chemistry.”
meet up|Meet someone informally.|Бейресми кездесіп алу.|“Let’s meet up after class.”
tag along|Join a group that is going somewhere.|Топқа ілесіп бару.|“Can I tag along?”
be there for|Support someone.|Біреуді қолдау.|“Friends are there for each other.”
look out for|Protect or help someone.|Біреуді қорғау не көмектесу.|“Teammates look out for one another.”
cheer up|Become happier or help someone feel happier.|Көңілін көтеру.|“That message cheered him up.”
let down|Disappoint someone.|Біреудің көңілін қалдыру.|“I don’t want to let the team down.”
grow apart|Become less close over time.|Уақыт өте алыстау.|“Some friends grow apart.”
patch things up|Become friendly again after conflict.|Реніштен кейін қайта татуласу.|“They patched things up.”
clear the air|Talk openly to remove tension.|Кернеуді жою үшін ашық сөйлесу.|“They met to clear the air.”
get on someone’s nerves|Annoy someone.|Біреудің жүйкесіне тию.|“That noise gets on my nerves.”
hit it off|Like each other immediately.|Бірден тіл табысу.|“The new teammates hit it off.”
get to know|Learn more about someone.|Біреуді жақынырақ тану.|“It takes time to get to know people.”
lose touch|Stop communicating over time.|Уақыт өте хабарласпай кету.|“We lost touch after school.”
reconnect|Start communicating again.|Қайта хабарласа бастау.|“Old friends reconnected.”
go-to person|The person usually asked for help.|Көмек үшін жиі жүгінетін адам.|“She’s our go-to person for design.”
left on read|A message was seen but not answered.|Хабарлама оқылды, бірақ жауап берілмеді.|“My question was left on read.”
dry text|A very short message that feels uninterested.|Қызықпағандай көрінетін өте қысқа хабарлама.|“‘K’ can feel like a dry text.”
double text|Send another message before getting a reply.|Жауап келмей тұрып тағы хабарлама жіберу.|“He double-texted to add a detail.”
`,),

    advanced: rows('Modern Phrases', `
spill the tea|Share interesting gossip or news.|Қызық әңгіме не жаңалықты айту.|“Come on, spill the tea.”
throw shade|Criticize someone indirectly.|Біреуді жанама түрде сынау.|“That comment threw shade.”
clap back|Reply quickly and strongly to criticism.|Сынға тез әрі өткір жауап беру.|“She clapped back with facts.”
roast|Make sharp jokes about someone or something.|Біреу не бір нәрсе туралы өткір қалжың айту.|“They roasted the old logo.”
savage|Bold, harsh, or impressively direct.|Өткір, батыл не тым тура.|“That reply was savage.”
iconic|Very memorable and admired.|Есте қаларлық әрі керемет.|“That moment was iconic.”
understood the assignment|Did exactly what was needed very well.|Қажет нәрсені дәл әрі өте жақсы орындады.|“She understood the assignment.”
rent-free|Staying in someone’s thoughts for a long time.|Біреудің ойынан ұзақ уақыт кетпеу.|“That song lives rent-free in my head.”
hits different|Feels unusually strong or special.|Басқаша әрі ерекше әсер етеді.|“This song hits different at night.”
it is what it is|The situation cannot easily be changed.|Жағдайды өзгерту қиын, амал жоқ.|“We lost, but it is what it is.”
say less|I understand; no more explanation is needed.|Түсіндім; әрі қарай түсіндіру қажет емес.|“Meet at six?” — “Say less.”
no shot|No chance; strong disbelief.|Мүмкін емес; қатты сенбеу.|“No shot that happened.”
big yikes|A strong reaction to something awkward or bad.|Өте ыңғайсыз не жаман нәрсеге реакция.|“That mistake was a big yikes.”
oof|A reaction to pain, difficulty, or embarrassment.|Ауыр, қиын не ыңғайсыз жағдайға реакция.|“Oof, that was close.”
mood|That matches how I feel.|Бұл менің көңіл күйіме сай.|“Sleeping all weekend? Mood.”
relatable|Easy to connect with from your own experience.|Өз тәжірибеңе ұқсас, түсінікті.|“That school meme is relatable.”
facts|I strongly agree; that is true.|Толық келісемін; бұл рас.|“Practice matters.” — “Facts.”
period|Used to emphasize that a statement is final.|Ойдың нақты әрі соңғы екенін күшейтеді.|“Everyone deserves respect, period.”
ate|Did something extremely well.|Бір нәрсені өте жақсы орындады.|“She ate that performance.”
left no crumbs|Did something perfectly.|Бір нәрсені мінсіз орындады.|“The team ate and left no crumbs.”
serve|Present something impressively.|Бір нәрсені әсерлі көрсету.|“That design serves simplicity.”
giving|Reminds people of a particular style or feeling.|Белгілі бір стиль не әсерді еске салады.|“It’s giving summer.”
coded|Having the qualities of something without being exactly it.|Бір нәрсеге ұқсас белгісі бар.|“That outfit is hero-coded.”
era|A current personal phase or style.|Қазіргі өмір кезеңі не стилі.|“I’m in my reading era.”
plot twist|An unexpected change.|Күтпеген өзгеріс.|“Plot twist: we finished early.”
deep cut|A lesser-known reference appreciated by fans.|Аз адам білетін, жанкүйерлер түсінетін сілтеме.|“That joke was a deep cut.”
underrated|Better than most people recognize.|Көп адам бағаламай жүрген жақсы нәрсе.|“That book is underrated.”
overrated|Praised more than it deserves.|Лайығынан артық мақталған.|“I think that trend is overrated.”
slept on|Not getting enough attention or praise.|Жеткілікті бағаланбай жүрген.|“This feature is slept on.”
blown away|Very impressed or surprised.|Қатты әсерлену не таңдану.|“I was blown away by the result.”
game changer|Something that greatly improves a situation.|Жағдайды қатты өзгертетін нәрсе.|“Search is a game changer.”
next level|Much better or more advanced.|Әлдеқайда жақсы не дамыған.|“That project is next level.”
take the L|Accept a loss or mistake.|Жеңілісті не қатені мойындау.|“We took the L and learned.”
take the W|Accept or celebrate a win.|Жеңісті қабылдау не тойлау.|“The team took the W.”
hard pass|A definite no.|Нақты бас тарту.|“A six-hour meeting? Hard pass.”
hot mess|A very disorganized situation.|Өте ретсіз жағдай.|“My notes are a hot mess.”
vibe check|A quick judgment of the mood or attitude.|Көңіл күй не атмосфераны жылдам бағалау.|“The room passed the vibe check.”
reality check|A reminder of the real situation.|Шынайы жағдайды еске салу.|“The result was a reality check.”
sneak peek|A short early preview.|Алдын ала қысқа көрсетілім.|“Here’s a sneak peek.”
`,),
  };
})();
