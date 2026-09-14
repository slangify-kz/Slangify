const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../learning-upgrade.js'), 'utf8');

// Simulate the provider's documented events without making network requests.
function setup(loaded = false) {
  const nodes = {}, scripts = [], widgets = [], timers = new Map();
  let timerId = 0;
  class Element {
    constructor() { this.events = {}; this.dataset = {}; this.isConnected = true; this.disabled = false; }
    setAttribute() {}
    addEventListener(type, fn) { this.events[type] = fn; }
    append() {}
    focus() {}
    remove() { this.isConnected = false; }
    querySelector(selector) { return nodes[selector] || null; }
    showModal() { this.open = true; }
    close() { this.open = false; this.events.close?.(); }
    set innerHTML(value) {
      this.html = value;
      if (this === dialog) {
        Object.values(nodes).forEach(el => el.isConnected = false);
        Object.keys(nodes).forEach(key => delete nodes[key]);
        nodes['#studio-body'] = new Element();
        if (value.includes('id="youglish-host"')) {
          for (const key of ['#youglish-host', '#yg-status', '[data-yg-next]', '[data-yg-replay]']) nodes[key] = new Element();
          nodes['[data-yg-next]'].dataset.ygNext = '';
          nodes['[data-yg-replay]'].dataset.ygReplay = '';
          nodes['[data-yg-next]'].disabled = nodes['[data-yg-replay]'].disabled = true;
        }
      }
    }
  }
  const dialog = new Element();
  function Widget(id, options) {
    this.id = id; this.options = options; this.nextCalls = 0; this.replays = 0; this.pauses = 0; this.closed = false;
    this.fetch = (...args) => this.query = args;
    this.next = () => { this.nextCalls++; options.events.onVideoChange({trackNumber: this.nextCalls + 1}); };
    this.replay = () => this.replays++;
    this.pause = () => this.pauses++;
    this.close = () => this.closed = true;
    this.setAdsLocation = mask => this.adMask = mask;
    widgets.push(this);
  }
  const window = loaded ? {YG: {Widget}} : {};
  const context = vm.createContext({window,
    localStorage: {getItem: () => null, setItem() {}},
    document: {body: {append() {}}, head: {appendChild: script => scripts.push(script)},
      activeElement: null, createElement: tag => tag === 'dialog' ? dialog : new Element(),
      querySelector: () => null, getElementById: id => nodes['#' + id] || null},
    setTimeout: (fn, delay) => {timers.set(++timerId, {fn, delay}); return timerId;},
    clearTimeout: id => timers.delete(id)
  });
  vm.runInContext(source, context);
  const click = button => dialog.events.click({target: {closest: () => button}});
  const action = name => click({dataset: {studio: name}});
  const open = word => window.SlangStudio.open({w: word, m: 'Meaning', k: 'Мағына', e: 'Example', p: 'Everyday'});
  return {nodes, scripts, widgets, timers, window, dialog, Widget, click, action, open,
    ready() {window.YG = {Widget}; window.onYouglishAPIReady();}};
}

test('video loads on initial API callback and accepts empty data attributes', () => {
  const a = setup(); a.open('lowkey'); a.action('video');
  assert.equal(a.scripts.length, 1); a.ready();
  const w = a.widgets[0]; assert.deepEqual(w.query, ['lowkey', 'english', 'us']);
  assert.equal(w.options.restrictionMode, 1);
  assert.equal(w.adMask, 0);
  assert.match(a.dialog.html, /<details class="video-info">/);
  assert.equal(w.options.width, undefined, 'provider uses container width on phones');
  w.options.events.onFetchDone({totalResult: 20});
  for (let i = 0; i < 4; i++) a.click(a.nodes['[data-yg-next]']);
  assert.equal(w.nextCalls, 4); assert.equal(a.nodes['[data-yg-next]'].disabled, true);
  a.click(a.nodes['[data-yg-next]']); assert.equal(w.nextCalls, 4);
  a.click(a.nodes['[data-yg-replay]']); assert.equal(w.replays, 1);
  w.options.events.onCaptionConsumed(); assert.equal(w.pauses, 1);
  a.action('meaning'); assert.equal(w.closed, true);
});

test('an already loaded API and fewer than five results work', () => {
  const a = setup(true); a.open('gonna'); a.action('video');
  assert.equal(a.scripts.length, 0); assert.equal(a.widgets.length, 1);
  a.widgets[0].options.events.onFetchDone({totalResult: 1});
  assert.equal(a.nodes['[data-yg-next]'].disabled, true);
  assert.equal(a.nodes['[data-yg-replay]'].disabled, false);
  a.widgets[0].options.events.onFetchDone({totalResult: 0});
  assert.match(a.nodes['#yg-status'].textContent, /No matching/);
});

test('late callbacks cannot open a player for a closed or different word', () => {
  const a = setup(); a.open('lowkey'); a.action('video');
  a.open('gonna'); a.action('video'); a.ready();
  assert.equal(a.widgets.length, 1); assert.equal(a.widgets[0].query[0], 'gonna');
  const status = a.nodes['#yg-status']; a.action('close');
  a.widgets[0].options.events.onFetchDone({totalResult: 10});
  assert.equal(status.textContent, undefined); assert.equal(a.widgets[0].closed, true);
});

test('script errors and timeouts produce a usable fallback', () => {
  for (const fail of ['error', 'timeout']) {
    const a = setup(); a.open('lowkey'); a.action('video');
    if (fail === 'error') a.scripts[0].onerror();
    else [...a.timers.values()].find(t => t.delay === 15000).fn();
    assert.match(a.nodes['#yg-status'].textContent, /unavailable/);
    assert.match(a.dialog.html, /https:\/\/youglish.com\/pronounce\/lowkey\/english\/us/);
    assert.equal(a.nodes['[data-yg-next]'].disabled, true);
  }
});
