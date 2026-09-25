(() => {
  'use strict';
  const S = window.SlangStudy;
  const endpoint = String(window.SLANGIFY_CONFIG?.resultsEndpoint || '').replace(/\/$/, '');
  const configured = /^https:\/\/[^/]+$/.test(endpoint);
  const sent = new Set();
  let sending = false, needsRetry = false;
  function getPayloads() {
    if (!S) return [];
    let state;
    try { state = S.parse(localStorage.getItem(S.key) || ''); } catch { return []; }
    return state.profiles.filter(p => p.research && p.shareAnonymous && !p.demo).map(p => ({
      version: S.corpus.version, sessionId: p.id, group: p.group,
      pre: S.score(p, 'pre')?.correct ?? null,
      post: S.score(p, 'post')?.correct ?? null,
      delayed: S.score(p, 'delayed')?.correct ?? null,
      earlyDelayed: !!(p.tests.delayed?.started && p.tests.delayed.started < S.due(p))
    }));
  }
  async function sync() {
    if (!configured) return;
    if (sending) { needsRetry = true; return; }
    sending = true;
    try {
      do {
        needsRetry = false;
        for (const payload of getPayloads()) {
          const fingerprint = JSON.stringify(payload);
          if (sent.has(fingerprint)) continue;
          try {
            const response = await fetch(endpoint + '/result', {
              method: 'POST', headers: { 'Content-Type': 'application/json' }, body: fingerprint
            });
            if (response.ok) sent.add(fingerprint);
          } catch { /* Retry on the next save, page visit or return online. */ }
        }
      } while (needsRetry);
    } finally { sending = false; }
  }
  async function aggregate() {
    if (!configured) throw Error('Shared service not connected');
    const response = await fetch(endpoint + '/aggregate', { cache: 'no-store' });
    if (!response.ok) throw Error('Shared service unavailable');
    return response.json();
  }
  window.SlangSharedResults = { configured, aggregate, sync };
  window.addEventListener('slangify:progress-saved', sync);
  window.addEventListener('online', sync);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync, { once: true });
  else sync();
})();