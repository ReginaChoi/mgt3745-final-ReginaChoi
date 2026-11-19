// Page evals for app.js (F-03 AC-6, AC-13 to AC-16, and the guardrail).
// These run offline: app.js is loaded into a small fake DOM with a fake
// fetch, so they never write a row to the production D1 table and are safe to
// run during a user session window (worker.test.js is not).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const APP = readFileSync(new URL('../app.js', import.meta.url), 'utf8');

class El {
  constructor(tag = 'div') {
    this.tag = tag; this.children = []; this.listeners = {}; this.attrs = {};
    this.dataset = {}; this.style = {}; this.hidden = false; this.disabled = false;
    this.value = ''; this.className = ''; this._text = '';
  }
  get textContent() { return this._text + this.children.map(c => c.textContent).join(''); }
  set textContent(v) { this._text = String(v); this.children = []; }
  get scrollHeight() { return 40 + this.value.length; }
  append(...c) { this.children.push(...c); }
  replaceChildren(...c) { this._text = ''; this.children = c; }
  setAttribute(k, v) { this.attrs[k] = v; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(type, fn) { (this.listeners[type] ??= []).push(fn); }
  fire(type) { return Promise.all((this.listeners[type] ?? []).map(fn => fn({ preventDefault() {} }))); }
  focus() {} select() {}
  querySelector() { return (this.submitButton ??= new El('button')); }
}

function load({ serverRows = [], stored = null } = {}) {
  const els = {};
  const document = {
    querySelector: sel => (els[sel] ??= new El()),
    createElement: tag => new El(tag),
  };
  const rows = serverRows.map(r => ({ ...r }));
  const store = new Map(stored ? [['skillpath-my-evidence', JSON.stringify(stored)]] : []);
  const net = { posts: 0 };
  const fetch = async (url, opts = {}) => {
    if (opts.method === 'POST') {
      net.posts++;
      await new Promise(r => setTimeout(r, 20));
      const b = JSON.parse(opts.body);
      rows.push({ path_id: b.pathId, skill_name: b.skillName, evidence_text: b.evidenceText.trim() });
      return { ok: true, status: 201, text: async () => '' };
    }
    return { ok: true, status: 200, json: async () => rows.map(r => ({ ...r })) };
  };
  const localStorage = { getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) };
  vm.runInNewContext(APP, { document, fetch, localStorage, navigator: {}, console, setTimeout });
  const $ = sel => els[sel];
  return {
    $, net, store,
    ready: () => new Promise(r => setTimeout(r, 10)),
    async choosePath(id) { $('#path-select').value = id; await $('#path-select').fire('change'); },
    async save(skill, text) {
      $('#skill-select').value = skill; $('#evidence-input').value = text;
      await $('#evidence-form').fire('submit');
    },
    evidenced: () => $('#skill-list').children.filter(li => li.textContent.includes('Not yet') === false && li.children.length > 1).length,
  };
}

const OTHERS = [
  { path_id: 'forensic', skill_name: 'Reading financial statements critically', evidence_text: 'someone else' },
  { path_id: 'audit', skill_name: 'Reviewing documents for missing detail', evidence_text: 'eval-1794972181674' },
];

test('AC-6: another visitor\'s evidence (and test rows) are not shown as mine', async () => {
  const p = load({ serverRows: OTHERS });
  await p.ready();
  await p.choosePath('forensic');
  assert.equal(p.evidenced(), 0);
  assert.ok(!p.$('#skill-list').textContent.includes('someone else'));
  assert.match(p.$('#path-progress').textContent, /0 of 3/);
});

test('AC-15 and AC-16: a save shows what was saved, and progress counts it', async () => {
  const p = load({ serverRows: OTHERS });
  await p.ready();
  await p.choosePath('forensic');
  await p.save('Reading financial statements critically', '  ACCT 4101 case: traced a revenue misstatement  ');
  const status = p.$('#save-status').textContent;
  assert.match(status, /^Saved\./);
  assert.match(status, /ACCT 4101 case: traced a revenue misstatement/);
  assert.match(status, /Reading financial statements critically/);
  assert.equal(p.evidenced(), 1);
  assert.match(p.$('#path-progress').textContent, /1 of 3/);
  assert.equal(p.$('#evidence-input').value, '');
});

test('AC-16: says when every skill on the path has evidence', async () => {
  const p = load();
  await p.ready();
  await p.choosePath('audit');
  for (const s of ['Reviewing documents for missing detail', 'Applying compliance rules', 'Explaining findings to a client']) {
    await p.save(s, 'evidence for ' + s);
  }
  assert.match(p.$('#path-progress').textContent, /^Done: all 3 skills/);
  assert.equal(p.$('#path-progress').dataset.state, 'complete');
});

test('AC-13: two quick submits send one POST', async () => {
  const p = load();
  await p.ready();
  await p.choosePath('audit');
  p.$('#skill-select').value = 'Applying compliance rules';
  p.$('#evidence-input').value = 'once';
  await Promise.all([p.$('#evidence-form').fire('submit'), p.$('#evidence-form').fire('submit')]);
  assert.equal(p.net.posts, 1);
  assert.equal(p.$('#evidence-form').submitButton.disabled, false);
});

test('Guardrail: a save remembered by this browser but missing from GET /entries is not shown as Evidenced', async () => {
  const p = load({ stored: [{ pathId: 'audit', skillName: 'Applying compliance rules', evidenceText: 'deleted row' }] });
  await p.ready();
  await p.choosePath('audit');
  assert.equal(p.evidenced(), 0);
});

test('AC-14: the evidence box grows with the text and shows the count', async () => {
  const p = load();
  await p.ready();
  const box = p.$('#evidence-input');
  box.value = 'x'.repeat(150);
  await box.fire('input');
  assert.equal(box.style.height, (40 + 150) + 'px');
  assert.equal(p.$('#evidence-count').textContent, '150 / 200 characters');
});
