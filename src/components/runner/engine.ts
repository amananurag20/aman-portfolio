export const DURATION = 45;
export const LANE_WIDTH = 2.65;
export const FIXED_STEP = 1 / 120;
export const SKILLS = [
  { label: "Python", short: "PY", color: "#ffcf6b", project: "Code Execution Platform", detail: "Queued, container-based execution for Python, Java, and C++.", href: "/#systems-lab" },
  { label: "RAG / AI", short: "AI", color: "#c6a2ff", project: "AgentCore", detail: "Tenant-scoped knowledge retrieval, AI support, and human handoff.", href: "/#agentcore" },
  { label: "React Native", short: "RN", color: "#80e2ff", project: "Virtual Focus Room", detail: "A shared co-working experience across web, mobile, and desktop.", href: "/#projects" },
  { label: "Electron", short: "EL", color: "#99f3d2", project: "Trace Venue", detail: "Offline-first desktop workflows, native integrations, and POS printing.", href: "/#experience" },
] as const;
export type Mode = "recruiter" | "endless";
export type Action = "jump" | "slide";
export type Obstacle = "block" | "hurdle" | "gate" | "moving" | "gap";
export type Power = "shield" | "magnet" | "double" | "boost";
export type Item = { id: number; rowId: number; lane: number; distance: number; kind: "skill" | "obstacle" | "ramp" | Power; obstacle?: Obstacle; skill: number; resolved: boolean; collected: boolean; phase: number };
export type Cue = "coin" | "hit" | "power" | "jump" | "slide" | "finish";
export type Burst = { id: number; lane: number; born: number; color: string; text: string };
export type Run = {
  mode: Mode; seed: number; time: number; distance: number; speed: number; accumulator: number;
  lane: number; visualLane: number; height: number; velocity: number; slideUntil: number;
  nextRow: number; nextSpawn: number; nextId: number; items: Item[];
  score: number; collected: number; hits: number; lives: number; discoveries: number[];
  combo: number; bestCombo: number; dodges: number; ramps: number;
  shieldUntil: number; magnetUntil: number; doubleUntil: number; boostUntil: number; hitUntil: number;
  finished: null | "checkpoint" | "out"; lastSkill: number | null; notice: string; noticeUntil: number;
  bursts: Burst[]; cue: Cue; cueId: number; blockedRows: number[];
};
export const SECTORS = [
  { name: "NEON DISTRICT", color: "#ff527a", sky: "#100f23" },
  { name: "SERVER TUNNEL", color: "#5be2ff", sky: "#091c26" },
  { name: "ROOFTOP DEPLOY", color: "#c2a0ff", sky: "#24182f" },
];
export function sectorAt(time: number, mode: Mode = "endless") { return SECTORS[Math.floor((mode === "recruiter" ? Math.min(time, DURATION - 0.001) : time) / 15) % 3]; }
export function laneX(lane: number) { return (lane - 1) * LANE_WIDTH; }
export function itemZ(run: Run, item: Item) { return run.distance - item.distance; }
export function itemLane(run: Run, item: Item) { return item.obstacle === "moving" ? item.lane + Math.sin(itemZ(run, item) * 0.14 + item.phase) * 0.38 : item.lane; }
export function isSliding(run: Run) { return run.time < run.slideUntil && run.height < 0.1; }
export function playerHeight(run: Run) {
  const ramp = run.items.find(item => item.kind === "ramp" && !item.resolved && Math.abs(laneX(item.lane) - laneX(run.visualLane)) < 0.92 && itemZ(run, item) >= -2 && itemZ(run, item) <= 0);
  const slope = ramp ? (itemZ(run, ramp) + 2) * 0.3 : 0;
  return Math.max(run.height, slope) + (run.boostUntil > run.time ? 0.45 : 0);
}
export function multiplier(run: Run) { return Math.min(4, 1 + Math.floor(Math.max(0, run.combo - 1) / 6)) * (run.doubleUntil > run.time ? 2 : 1); }
function cue(run: Run, type: Cue) { run.cue = type; run.cueId++; }
function notice(run: Run, text: string) { run.notice = text; run.noticeUntil = run.time + 2.4; }
function burst(run: Run, color: string, text: string) { run.bursts.push({ id: run.cueId, lane: run.visualLane, born: run.time, color, text }); }
function random(run: Run) { run.seed = (Math.imul(run.seed, 1664525) + 1013904223) >>> 0; return run.seed / 4294967296; }
function spawn(run: Run) {
  while (run.nextSpawn < run.distance + 108) {
    const rowId = run.nextRow++, d = run.nextSpawn;
    const lane = rowId < 2 ? 1 : Math.floor(random(run) * 3);
    const skill = rowId % 4;
    const add = (kind: Item["kind"], offset: number, atLane: number, obstacle?: Obstacle) => run.items.push({ id: run.nextId++, rowId, lane: atLane, distance: d + offset, kind, obstacle, skill, resolved: false, collected: false, phase: random(run) * Math.PI * 2 });
    for (const offset of [-7, -3.5, 0]) add("skill", offset, lane);
    if (rowId >= 2) {
      if (rowId % 8 === 6) { add("ramp", -5, lane); add("obstacle", 6, lane, "gap"); }
      else if (rowId % 7 === 5) add("obstacle", 0, lane, "gap");
      else if (rowId % 3 === 2) add("obstacle", 0, lane, rowId % 2 ? "gate" : "hurdle");
      else add("obstacle", 0, (lane + 1) % 3, rowId % 4 === 0 ? "moving" : "block");
    }
    // Power-up lane stays clear of this row's obstacle and skill trail.
    if (rowId % 3 === 1) add((["shield", "magnet", "double", "boost"] as const)[Math.floor(rowId / 3) % 4], 3, (lane + 2) % 3);
    run.nextSpawn += Math.max(26, 33 - run.time * 0.05);
  }
}
export function createRun(mode: Mode = "recruiter", seed = 1): Run {
  const run: Run = { mode, seed: seed >>> 0, time: 0, distance: 0, speed: 17, accumulator: 0, lane: 1, visualLane: 1, height: 0, velocity: 0, slideUntil: 0, nextRow: 0, nextSpawn: 43, nextId: 0, items: [], score: 0, collected: 0, hits: 0, lives: 3, discoveries: [], combo: 0, bestCombo: 0, dodges: 0, ramps: 0, shieldUntil: 0, magnetUntil: 0, doubleUntil: 0, boostUntil: 0, hitUntil: 0, finished: null, lastSkill: null, notice: "Follow the tokens. Your first trail is straight ahead.", noticeUntil: 4, bursts: [], cue: "coin", cueId: 0, blockedRows: [] };
  spawn(run); return run;
}
export function movePlayer(run: Run, direction: number) { if (!run.finished && Number.isFinite(direction)) run.lane = Math.max(0, Math.min(2, run.lane + Math.sign(direction))); }
export function performAction(run: Run, action: Action) {
  if (run.finished || run.height > 0.05 || run.velocity > 0 || isSliding(run)) return false;
  if (action === "jump") { run.velocity = 10.5; run.height = 0.01; cue(run, "jump"); }
  else { run.slideUntil = run.time + 0.85; cue(run, "slide"); }
  return true;
}
function takeHit(run: Run, item: Item) {
  if (run.boostUntil > run.time || run.hitUntil > run.time) return;
  if (run.shieldUntil > run.time) { run.shieldUntil = 0; run.hitUntil = run.time + 0.65; cue(run, "power"); notice(run, "Shield saved you. Keep the combo!"); burst(run, "#80edff", "SHIELD SAVE"); return; }
  run.hits++; if (run.mode === "endless") run.lives--;
  run.combo = 0; run.score = Math.max(0, run.score - 50); run.hitUntil = run.time + 0.9;
  run.blockedRows.push(item.rowId); cue(run, "hit"); burst(run, "#ff8d87", "−50");
  notice(run, item.obstacle === "gap" ? "Gap ahead: jump or take the ramp." : "Jump low barriers. Slide gates. Dodge tall blocks.");
  if (run.mode === "endless" && run.lives <= 0) { run.finished = "out"; cue(run, "finish"); }
}
function tick(run: Run, dt: number) {
  const previousDistance = run.distance;
  run.time += dt;
  run.speed = (17 + Math.min(11, run.time * 0.16)) * (run.boostUntil > run.time ? 1.28 : 1);
  run.distance += run.speed * dt;
  run.visualLane += (run.lane - run.visualLane) * (1 - Math.exp(-19 * dt));
  if (run.height > 0 || run.velocity > 0) { run.height = Math.max(0, run.height + run.velocity * dt); run.velocity -= 25 * dt; if (!run.height) run.velocity = 0; }
  spawn(run);
  // Sort by collision distance and obstacle priority, so renderer and physics agree.
  run.items.sort((a, b) => a.distance - b.distance || (a.kind === "obstacle" ? -1 : b.kind === "obstacle" ? 1 : a.id - b.id));
  for (const item of run.items) {
    if (item.resolved) continue;
    const sameLane = Math.abs(laneX(run.visualLane) - laneX(itemLane(run, item))) < 0.92;
    const z = itemZ(run, item);
    const gapActive = item.obstacle === "gap" && z >= -2.5 && z <= 2.5;
    const crossed = previousDistance < item.distance && run.distance >= item.distance;
    if (item.obstacle === "gap") {
      if (gapActive && sameLane && playerHeight(run) < 0.7 && run.boostUntil <= run.time) { item.resolved = true; takeHit(run, item); }
      else if (z > 2.5) { item.resolved = true; if (sameLane) { run.dodges++; run.score += 50; } }
      if (run.finished) break;
      continue;
    }
    if (!crossed) { if (z > 3) item.resolved = true; continue; }
    item.resolved = true;
    if (item.kind === "obstacle") {
      if (!sameLane) continue;
      const avoided = (item.obstacle === "hurdle" && playerHeight(run) > 0.7) || (item.obstacle === "gate" && isSliding(run));
      if (avoided) { run.dodges++; run.score += 50; burst(run, "#adf6d3", "+50 CLEAN MOVE"); }
      else takeHit(run, item);
    } else if (item.kind === "ramp") {
      if (sameLane && run.boostUntil <= run.time) { run.height = Math.max(0.6, run.height); run.velocity = 12; run.slideUntil = 0; run.ramps++; cue(run, "jump"); notice(run, "Ramp launch! Clear the gap."); }
    } else if (item.kind === "skill") {
      if ((!sameLane && run.magnetUntil <= run.time) || run.blockedRows.includes(item.rowId)) { run.combo = 0; continue; }
      item.collected = true; run.collected++; run.combo++; run.bestCombo = Math.max(run.bestCombo, run.combo);
      const points = 100 * multiplier(run); run.score += points; run.lastSkill = item.skill;
      if (!run.discoveries.includes(item.skill)) run.discoveries.push(item.skill);
      cue(run, "coin"); notice(run, `${SKILLS[item.skill].label} → ${SKILLS[item.skill].project}`); burst(run, SKILLS[item.skill].color, `+${points}`);
    } else if (sameLane && !run.blockedRows.includes(item.rowId)) {
      item.collected = true; cue(run, "power");
      if (item.kind === "shield") { run.shieldUntil = run.time + 10; notice(run, "Shield: one saved hit within 10 seconds."); }
      if (item.kind === "magnet") { run.magnetUntil = run.time + 8; notice(run, "Magnet: skill trails from every lane for 8 seconds."); }
      if (item.kind === "double") { run.doubleUntil = run.time + 8; notice(run, "Double points: stacks with your combo for 8 seconds."); }
      if (item.kind === "boost") { run.boostUntil = run.time + 6; notice(run, "Deploy Boost: hoverboard, extra speed, and protection for 6 seconds."); }
      burst(run, "#8cf3ef", item.kind.toUpperCase());
    }
    if (run.finished) break;
  }
  run.items = run.items.filter(item => itemZ(run, item) < 18);
  run.blockedRows = run.blockedRows.filter(row => run.items.some(item => item.rowId === row));
  run.bursts = run.bursts.filter(effect => run.time - effect.born < 0.9).slice(-24);
  if (run.mode === "recruiter" && run.time >= DURATION - 1e-7) { run.time = DURATION; run.finished = "checkpoint"; cue(run, "finish"); }
}
export function advanceRun(run: Run, seconds: number) {
  if (run.finished || !Number.isFinite(seconds) || seconds <= 0) return;
  run.accumulator += Math.min(seconds, 1);
  while (run.accumulator >= FIXED_STEP - 1e-9 && !run.finished) { tick(run, FIXED_STEP); run.accumulator -= FIXED_STEP; }
}
