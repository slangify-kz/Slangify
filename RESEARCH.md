# Slangify: Core 30 research prototype

This release adds a focused English/Kazakh course to the existing dictionary. It implements lessons, ten practice items per course word, an anonymous participant session, three assessments, local persistence, ratings, paired summaries and CSV/JSON exports. It includes no invented participants or learning outcomes.

## What is active

- `course.html`: contextual learning or word-and-translation recall.
- Core 30 (`core30-v1`): dictionary-linked target meanings, original teaching examples, Kazakh explanations, neutral equivalents and audience-specific situations.
- Pre-test, post-test after all 30 lessons, delayed test after 72 hours from post-test completion.
- Thirty items per test: ten meaning, ten appropriateness and ten neutral-equivalent questions. Item types rotate by word across three forms. Question order and correct-option position vary by participant and stage. A resumed test keeps the same questions.
- No answer feedback during assessments. Review is available after the delayed test. The local course pauses during tests and the retention interval.
- Session code, learning mode, assignment method, prior/outside exposure, submitted answers and estimated active time are saved on this browser. Sessions do not synchronize automatically and a code is not a login.
- The report computes paired before/after means, percentage-point changes, delayed means and within-participant delayed-minus-post changes. Missing tests remain missing. Importing the same code does not create duplicate participants.
- CSV contains stage-level scores and ratings. Study JSON contains anonymous responses and timings, excluding written practice sentences. A full backup also includes those sentences.

## Before a classroom study

1. The student and supervisor should settle the hypothesis, participant arrangements, sampling, group assignment and equal learning duration. Follow the school's participation process; use codes instead of names in this app. Keep any code-to-person mapping separately with the study supervisor.
2. Have a teacher review all English and Kazakh content, audience judgements and distractors. Dictionary checks support target meanings, not every teaching scenario. Pilot the three forms: equal structure does not establish equal difficulty or psychometric validity.
3. Freeze the corpus version, study schedule and AI configuration for the entire cohort. A useful initial schedule is one supervised learning period of the same duration in both groups, then an immediate post-test and a delayed test at least 72 hours later. This software records time; it does not enforce a specific learning duration.
4. Random assignment in the browser is a simple independent coin flip, not balanced cohort allocation. Teacher assignments must be recorded as such. Existing word exposure and outside study are confounds and are visible in exports.
5. Collect an export from each participant through the agreed school process; do not commit participant files to this public repository. Import results into one browser for comparison, then export the combined data and keep a backup.
6. Report actual sample sizes, incomplete tests, access problems, exposure, time, AI availability and limitations. A pre/post improvement alone does not prove causation. This implementation contains no significance test or claim of effectiveness.

The control contains recall practice as well as translation. Thus the default comparison is contextual learning versus word/translation/recall, not versus memorization with no retrieval practice. Course completion does not certify sentence correctness or fluent speech.

## AI status and activation

**The deployed GitHub Pages site does not currently have a connected AI service.** The sentence writer saves work and offers a clearly labelled self-check. There is no simulated AI response. This version alone cannot test an AI-specific hypothesis.

The runnable adapter is `server/feedback.mjs` (Node.js 22 or newer; no package dependencies). It uses the [Responses API](https://developers.openai.com/api/docs/guides/text-generation) and [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs). The API key belongs only in server secrets. GitHub Pages hosts static files and cannot run this server.

To connect a server:

1. Deploy the Node adapter to an HTTPS service that can run Node processes.
2. Set server secrets/environment: `OPENAI_API_KEY`, `OPENAI_MODEL` (a model supporting Responses structured output), `ALLOWED_ORIGIN=https://slangify-kz.github.io`. Optional: `PORT`, `DAILY_REQUEST_LIMIT` (default 200 attempts/day). Never place a key in the repository, a browser field, `site-config.js`, or an uploaded screenshot.
3. Start with `node server/feedback.mjs` from the repository root.
4. Set the public `aiEndpoint` in `site-config.js` to the deployed HTTPS URL ending `/api/feedback`, then publish that file.
5. Verify one real successful request with English and Kazakh feedback before announcing that AI is active. Set provider usage limits before opening a public endpoint. Keep the setting fixed within a study.

The adapter validates lengths and field values, allows a configured browser origin, caps attempts, uses a timeout, requests non-stored responses, and does not log sentences. CORS is not authentication. The built-in limits are process-local and reset after restart; behind a proxy the conservative IP limit may cover all visitors. For a public deployment, add a durable edge rate limit and appropriate abuse protection. `store:false` is not a promise of zero provider retention; explain the service's actual data handling before collecting classroom sentences.

Only the word, selected situation and sentence are sent after the learner confirms. The frontend counts successful AI checks separately. Model feedback is advisory and never grades the research tests.

## Scope and limitations

- Data lives in browser storage, which may be cleared or unavailable. Back up before switching devices. Reports are self-reported local records, not authenticated exam records.
- Assessment content is visible in client source; device time and local files can be changed. Use supervised conditions if the study needs that control.
- Active seconds are approximate visible, recently used lesson time; they are not attention measurements. Answer durations exclude hidden intervals and time while paused.
- Slang varies by community and situation; several corpus items are general abbreviations or conversational phrases. No claim of an exhaustive dictionary is made.
- The project used AI-assisted implementation and teaching content. In a school paper, describe the student's own decisions, revisions, tests and analysis accurately. Do not submit generated prose as unaided original research.
- The linked dictionaries are lexical sources, not an academic literature review. The student still needs to select and read the research papers required by the project, document school permissions, conduct the experiment and write the paper using actual findings.

## Verification

Run `node --test tests/study.test.cjs tests/feedback.test.mjs`. Browser checks should cover the course, reload/resume, all ten themes, keyboard navigation and phone widths 320–430 px. Test data is synthetic and exists only in automated tests.
