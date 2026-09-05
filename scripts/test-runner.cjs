const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const sandbox = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/components/runner/engine.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, sandbox);
const { createRun, advanceRun, movePlayer, performAction, multiplier, DURATION } = sandbox.exports;
function isolated() { const r = createRun(); r.nextSpawn = 100; r.time = 1; return r; }
function item(r, kind, extra = {}) { return { id: 0, lane: 1, born: r.time - 0.7, travel: 1, kind, skill: 0, label: 'test', resolved: false, ...extra }; }

let r = isolated();
for (let i = 0; i < 8; i++) movePlayer(r, -1);
assert.equal(r.lane, 0);
for (let i = 0; i < 8; i++) movePlayer(r, 1);
assert.equal(r.lane, 2);
movePlayer(r, NaN); assert.equal(r.lane, 2);
advanceRun(r, NaN); advanceRun(r, -1); assert.equal(r.time, 1);

for (const [obstacle, action, hits] of [['hurdle', 'jump', 0], ['gate', 'slide', 0], ['block', 'jump', 1], ['gate', 'jump', 1], ['hurdle', 'slide', 1]]) {
  r = isolated(); r.items = [item(r, 'obstacle', { obstacle })];
  assert.equal(performAction(r, action), true);
  assert.equal(performAction(r, action), false, 'actions cannot be spammed while active');
  advanceRun(r, 0.31); assert.equal(r.hits, hits, `${action} vs ${obstacle}`);
  assert.equal(r.dodges, hits ? 0 : 1);
}
r = isolated(); r.shieldUntil = 5; r.combo = 4;
r.items = [item(r, 'obstacle', { obstacle: 'block' })]; advanceRun(r, .31);
assert.equal(r.shieldUntil, 0); assert.equal(r.hits, 0); assert.equal(r.combo, 4);
r.items = [item(r, 'obstacle', { obstacle: 'block' })]; advanceRun(r, .31);
assert.equal(r.hits, 1); assert.equal(r.combo, 0); assert.equal(r.score, 0);

r = isolated(); r.magnetUntil = 2;
r.items = [item(r, 'skill', { lane: 0 })]; advanceRun(r, .31);
assert.equal(r.collected, 1);
advanceRun(r, 1); r.items = [item(r, 'skill', { lane: 2 })]; advanceRun(r, .31);
assert.equal(r.collected, 1); assert.equal(r.combo, 0);

r = isolated();
for (let i = 0; i < 9; i++) { r.items = [item(r, 'skill')]; advanceRun(r, .31); }
assert.equal(r.score, 1500); assert.equal(multiplier(r), 3); assert.equal(r.bestCombo, 9);
r.items = [item(r, 'obstacle', { obstacle: 'hurdle' }), item(r, 'skill', { id: 1 })]; advanceRun(r, .31);
assert.equal(r.collected, 9, 'failed action does not collect the token behind it');
assert.equal(r.combo, 0);

// Course generation remains reproducible, every row permits a safe lane, and all
// spawned objects have time to reach the player before the finish in either mode.
for (const mode of ['explore', 'sprint']) {
  for (const seed of [1, 2, 42, 999]) {
    r = createRun(mode, seed);
    for (let i = 0; i < 1801; i++) {
      advanceRun(r, 1 / 60);
      for (const obstacle of r.items.filter(i => i.kind === 'obstacle')) {
        const row = Math.floor(obstacle.id / 3);
        assert.equal(r.items.filter(i => i.kind === 'obstacle' && Math.floor(i.id / 3) === row).length, 1);
        assert.ok(obstacle.born + obstacle.travel < DURATION);
      }
    }
    assert.equal(r.time, DURATION); assert.ok(r.score >= 0); assert.equal(r.items.length, 0);
    const done = JSON.stringify(r); advanceRun(r, 2); assert.equal(JSON.stringify(r), done);
  }
}
const replay = fps => { const r = createRun('sprint', 19); for (let i = 0; i < fps * 30 + 1; i++) advanceRun(r, 1 / fps); return [r.score, r.hits, r.collected, r.nextRow]; };
assert.deepEqual(replay(30), replay(60)); assert.deepEqual(replay(60), replay(120));
console.log('Runner checks passed: actions, collisions, shield, magnet, combos, course safety, finish, and frame-rate consistency.');
