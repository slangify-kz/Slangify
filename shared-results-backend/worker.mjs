// Slangify aggregate-only research results service.
// Bind D1 as DB and set a private, random RESULT_SALT in the Worker environment.
const ORIGIN = 'https://slangify-kz.github.io';
const APP_VERSION = 'core30-v1';
const send = (data, status = 200, origin = ORIGIN) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': origin, 'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type' }
});
const validScore = x => x === null || Number.isInteger(x) && x >= 0 && x <= 30;
async function hashId(id, salt) {
  const bytes = new TextEncoder().encode(salt + ':' + id);
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), b => b.toString(16).padStart(2, '0')).join('');
}
const round = (x, n) => n ? Math.round(x / n * 10) / 10 : null;
function summarize(rows) {
  const summary = group => {
    const all = rows.filter(r => group === 'all' || r.study_group === group);
    // Never expose scores from fewer than three participants in a group.
    if (all.length < 3) return { group, count: all.length, hidden: true };
    const stage = name => { const values = all.map(r => r[name]).filter(Number.isInteger);
      return { count: values.length, mean: values.length >= 3 ? round(values.reduce((a,b)=>a+b,0)*100, values.length*30) : null }; };
    const paired = all.filter(r => Number.isInteger(r.pre) && Number.isInteger(r.post));
    const retained = all.filter(r => Number.isInteger(r.delayed) && !r.early_delayed);
    return { group, count: all.length, pre: stage('pre'), post: stage('post'),
      delayed: {count: retained.length, mean: retained.length >= 3 ?
        round(retained.reduce((n,r)=>n+r.delayed,0)*100, retained.length*30) : null},
      paired: paired.length,
      gain: paired.length >= 3 ? round(paired.reduce((n,r)=>n+r.post-r.pre,0)*100, paired.length*30) : null };
  };
  return { updated: new Date().toISOString(), cohortMinimum: 3,
    groups: ['all','context','classic','mixed'].map(summary) };
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    if (origin && origin !== ORIGIN) return send({ error: 'Origin not allowed' }, 403);
    if (request.method === 'OPTIONS') return new Response(null, {
      status: 204, headers: { 'Access-Control-Allow-Origin': ORIGIN, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type', 'Vary': 'Origin' }
    });
    if (!env.DB || !env.RESULT_SALT || env.RESULT_SALT.length < 32) return send({ error:'Service is not configured' }, 503);
    const url = new URL(request.url);
    if (url.pathname === '/aggregate' && request.method === 'GET') {
      const result = await env.DB.prepare('SELECT study_group, pre, post, delayed, early_delayed FROM results WHERE version = ?').bind(APP_VERSION).all();
      return send(summarize(result.results || []));
    }
    if (url.pathname !== '/result' || request.method !== 'POST') return send({ error:'Not found' }, 404);
    const size = Number(request.headers.get('Content-Length') || 0);
    if (size > 1000) return send({ error:'Payload too large' }, 413);
    let data;
    try { const body = await request.text(); if (body.length > 1000) throw Error(); data = JSON.parse(body); }
    catch { return send({ error:'Invalid JSON' }, 400); }
    if (!data || data.version !== APP_VERSION || !/^S-[A-F0-9]{8}-[A-Z0-9]{1,16}$/.test(data.sessionId)
      || !['classic','context','mixed'].includes(data.group) || ![data.pre,data.post,data.delayed].every(validScore)
      || typeof data.earlyDelayed !== 'boolean') return send({ error:'Invalid result' }, 400);
    if (data.post !== null && data.pre === null || data.delayed !== null && data.post === null)
      return send({ error:'Invalid test sequence' }, 400);
    const id = await hashId(data.sessionId, env.RESULT_SALT);
    // A score update can replace the same session, so retries never create duplicates.
    await env.DB.prepare(`INSERT INTO results (session_hash, version, study_group, pre, post, delayed, early_delayed, updated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(session_hash) DO UPDATE SET pre=excluded.pre, post=excluded.post,
        delayed=excluded.delayed, early_delayed=excluded.early_delayed, updated=excluded.updated`)
      .bind(id, APP_VERSION, data.group, data.pre, data.post, data.delayed, Number(data.earlyDelayed), Date.now()).run();
    return send({ saved:true });
  }
};
export { summarize };
