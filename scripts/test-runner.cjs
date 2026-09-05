const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const sandbox = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/components/runner/engine.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, sandbox);
const { createRun, advanceRun, movePlayer, performAction, playerHeight, itemZ, itemLane, multiplier, sectorAt, DURATION } = sandbox.exports;
function isolated(mode = 'recruiter') { const r=createRun(mode);r.items=[];r.nextSpawn=1e9;return r; }
function item(r, kind, extra={}) { return { id:1,rowId:0,lane:1,distance:r.distance+5,kind,skill:0,resolved:false,collected:false,phase:0,...extra }; }
let r=isolated();
for(let i=0;i<8;i++)movePlayer(r,-1);assert.equal(r.lane,0);
for(let i=0;i<8;i++)movePlayer(r,1);assert.equal(r.lane,2);
movePlayer(r,NaN);advanceRun(r,NaN);advanceRun(r,-1);assert.equal(r.lane,2);assert.equal(r.time,0);
for(const [obstacle,action,hits] of [['hurdle','jump',0],['gate','slide',0],['block','jump',1],['gate','jump',1],['hurdle','slide',1]]) {
  r=isolated();r.items=[item(r,'obstacle',{obstacle})];assert.equal(performAction(r,action),true);assert.equal(performAction(r,action),false);advanceRun(r,.4);assert.equal(r.hits,hits,`${action} against ${obstacle}`);
}
r=isolated();r.items=[item(r,'obstacle',{obstacle:'gap',distance:5})];performAction(r,'jump');advanceRun(r,.55);assert.equal(r.hits,0,'jump clears full gap');
r=isolated();r.items=[item(r,'obstacle',{obstacle:'gap',distance:1})];advanceRun(r,.1);assert.equal(r.hits,1);advanceRun(r,.5);assert.equal(r.hits,1,'gap only costs one hit');
// Fatal gap must stop the tick before any later token is awarded.
r=isolated('endless');r.lives=1;r.items=[item(r,'obstacle',{obstacle:'gap',distance:-1}),item(r,'skill',{id:2,rowId:1,distance:.05})];advanceRun(r,1/120);assert.equal(r.finished,'out');assert.equal(r.collected,0);assert.equal(r.cue,'finish');
// The ramp raises the rendered feet and launches physics early enough for its gap.
r=isolated();r.items=[item(r,'ramp',{distance:5}),item(r,'obstacle',{id:2,obstacle:'gap',distance:16})];advanceRun(r,.2);assert.ok(playerHeight(r)>0);advanceRun(r,.8);assert.equal(r.ramps,1);assert.equal(r.hits,0);
// Pickups activate actual durations; shield consumes once, boost protects & accelerates.
for(const power of ['shield','magnet','double','boost']) { r=isolated();r.items=[item(r,power)];advanceRun(r,.4);assert.ok(r[power+'Until']>r.time); }
r=isolated();r.shieldUntil=5;r.combo=4;r.items=[item(r,'obstacle',{obstacle:'block'})];advanceRun(r,.4);assert.equal(r.shieldUntil,0);assert.equal(r.hits,0);assert.equal(r.combo,4);advanceRun(r,1);r.items=[item(r,'obstacle',{obstacle:'block'})];advanceRun(r,.4);assert.equal(r.hits,1);assert.equal(r.combo,0);
r=isolated();r.magnetUntil=.6;r.items=[item(r,'skill',{lane:0})];advanceRun(r,.4);assert.equal(r.collected,1);advanceRun(r,.4);r.items=[item(r,'skill',{lane:2})];advanceRun(r,.4);assert.equal(r.collected,1);assert.equal(r.combo,0);
r=isolated();r.combo=6;r.doubleUntil=1;r.items=[item(r,'skill')];advanceRun(r,.4);assert.equal(r.score,400);assert.equal(multiplier(r),4);advanceRun(r,.7);assert.equal(multiplier(r),2);
const boosted=isolated(),plain=isolated();boosted.boostUntil=2;boosted.items=[item(boosted,'obstacle',{obstacle:'block'})];advanceRun(boosted,.5);advanceRun(plain,.5);assert.ok(boosted.distance>plain.distance);assert.equal(boosted.hits,0);
// World coordinates are shared by physics and rendering.
r=isolated();const moving=item(r,'obstacle',{obstacle:'moving',distance:10});r.distance=10;assert.equal(itemZ(r,moving),0);assert.equal(itemLane(r,moving),1);
// Finite mode stops immutably and retains the rooftop sector at its checkpoint.
r=createRun('recruiter',19);for(let i=0;i<2701;i++)advanceRun(r,1/60);assert.equal(r.time,DURATION);assert.equal(r.finished,'checkpoint');assert.equal(sectorAt(r.time,r.mode).name,'ROOFTOP DEPLOY');const ended=JSON.stringify(r);advanceRun(r,1);assert.equal(JSON.stringify(r),ended);
// Endless really continues and keeps a bounded scene even after 10 simulated minutes.
r=createRun('endless',4);r.boostUntil=1e9;let maxItems=0;
for(let i=0;i<36001;i++){r.boostUntil=r.time+100;advanceRun(r,1/60);maxItems=Math.max(maxItems,r.items.length);}
assert.ok(r.time>599);assert.equal(r.finished,null);assert.ok(r.nextRow>300);assert.ok(maxItems<50);assert.ok(r.bursts.length<=24);
const replay=fps=>{const r=createRun('recruiter',19);for(let i=0;i<fps*45+1;i++)advanceRun(r,1/fps);return [r.score,r.hits,r.collected,r.nextRow,Math.round(r.distance*100)];};
assert.deepEqual(replay(30),replay(60));assert.deepEqual(replay(60),replay(120));
console.log('Career Rush checks passed: moves, actions, gaps, ramps, fatal-hit ordering, all power-ups, physics/world alignment, 45-second finish, 10-minute Endless bounds and 30/60/120 FPS replays.');
