export const DURATION = 30;
export const TRAVEL_TIME = 3.2;
export const SKILLS = [
  { label: "Python", short: "PY", color: "#ffcf6b", project: "Code Execution Platform", detail: "Queued, container-based execution for Python, Java, and C++.", href: "/#systems-lab" },
  { label: "RAG / AI", short: "AI", color: "#c6a2ff", project: "AgentCore", detail: "Tenant-scoped knowledge retrieval, AI support, and human handoff.", href: "/#agentcore" },
  { label: "React Native", short: "RN", color: "#80e2ff", project: "Virtual Focus Room", detail: "A shared co-working experience across web, mobile, and desktop.", href: "/#projects" },
  { label: "Electron", short: "EL", color: "#99f3d2", project: "Trace Venue", detail: "Offline-first desktop workflows, native integrations, and POS printing.", href: "/#experience" },
] as const;

export type Mode = "explore" | "sprint";
export type Action = "jump" | "slide";
export type Item = { id: number; lane: number; born: number; travel: number; kind: "skill" | "obstacle" | "shield" | "magnet"; obstacle?: "block" | "hurdle" | "gate"; skill: number; label: string; resolved: boolean };
export type Burst = { lane: number; born: number; color: string; text: string };
export type Run = { time: number; lane: number; visualLane: number; nextRow: number; nextSpawn: number; seed: number; mode: Mode; items: Item[]; score: number; collected: number; hits: number; discoveries: number[]; notice: string; noticeUntil: number; lastSkill: number | null; hitUntil: number; jumpAt: number; slideAt: number; combo: number; bestCombo: number; dodges: number; shieldUntil: number; magnetUntil: number; bursts: Burst[] };
export const JUMP_TIME = 0.95;
export const SLIDE_TIME = 0.85;
export const SECTORS = [
  { name: "BUILD", color: "#ff507c", sky: "#281324" },
  { name: "SHIP", color: "#68dfff", sky: "#102739" },
  { name: "SCALE", color: "#b699ff", sky: "#231736" },
];
export function createRun(mode: Mode = "sprint", seed = 1): Run {
  return { time: 0, lane: 1, visualLane: 1, nextRow: 0, nextSpawn: 0.8, seed: seed >>> 0, mode, items: [], score: 0, collected: 0, hits: 0, discoveries: [], notice: "Collect skills. Jump barriers. Slide under gates.", noticeUntil: 4, lastSkill: null, hitUntil: 0, jumpAt: -10, slideAt: -10, combo: 0, bestCombo: 0, dodges: 0, shieldUntil: 0, magnetUntil: 0, bursts: [] };
}
export function movePlayer(run: Run, direction: number) {
  if (Number.isFinite(direction)) run.lane = Math.max(0, Math.min(2, run.lane + Math.sign(direction)));
}
export function performAction(run: Run, action: Action) {
  if (run.time >= DURATION || run.time - run.jumpAt < JUMP_TIME || run.time - run.slideAt < SLIDE_TIME) return false;
  if (action === "jump") run.jumpAt = run.time; else run.slideAt = run.time;
  return true;
}
export function multiplier(run: Run) { return Math.min(4, 1 + Math.floor(Math.max(0, run.combo - 1) / 4)); }
export function sectorAt(time: number) { return SECTORS[Math.min(2, Math.floor(time / 10))]; }
function randomLane(run: Run) { run.seed = (Math.imul(run.seed, 1664525) + 1013904223) >>> 0; return run.seed % 3; }
function burst(run: Run, lane: number, color: string, text: string) { run.bursts.push({ lane, born: run.time, color, text }); }
function notice(run: Run, text: string) { run.notice = text; run.noticeUntil = run.time + 2; }

function tick(run: Run, dt: number) {
  run.time = Math.min(DURATION, run.time + dt);
  run.visualLane += (run.lane - run.visualLane) * (1 - Math.exp(-22 * dt));
  while (run.nextSpawn < 26 && run.time >= run.nextSpawn) {
    const row = run.nextRow++, born = run.nextSpawn;
    const lane = row === 0 ? 1 : randomLane(run);
    const skill = row % SKILLS.length;
    const travel = run.mode === "explore" ? 3.6 : 3.2 - born / DURATION * 0.9;
    const actionRow = row > 1 && row % 3 === 2;
    const obstacle = actionRow ? (row % 2 ? "gate" : "hurdle") : "block";
    const obstacleLane = actionRow ? lane : (lane + 1 + row % 2) % 3;
    // Resolve obstacles first so a failed jump/slide cannot also collect its token.
    run.items.push({ id: row * 3, lane: obstacleLane, born, travel, kind: "obstacle", obstacle, skill: 0, label: obstacle === "hurdle" ? "JUMP" : obstacle === "gate" ? "SLIDE" : "DODGE", resolved: false });
    run.items.push({ id: row * 3 + 1, lane, born, travel, kind: "skill", skill, label: SKILLS[skill].short, resolved: false });
    if (row % 4 === 3) {
      const powerLane = (lane + (obstacleLane === (lane + 1) % 3 ? 2 : 1)) % 3;
      const kind = row % 8 === 3 ? "shield" : "magnet";
      run.items.push({ id: row * 3 + 2, lane: powerLane, born, travel, kind, skill: 0, label: kind === "shield" ? "SHIELD" : "MAGNET", resolved: false });
    }
    run.nextSpawn += run.mode === "explore" ? 1.75 : 1.6 - born / DURATION * 0.42;
  }
  const blocked = new Set<number>();
  const lane = Math.round(run.visualLane);
  for (const item of run.items) {
    if (item.resolved || run.time < item.born + item.travel) continue;
    item.resolved = true;
    const sameLane = item.lane === lane;
    if (item.kind === "obstacle") {
      if (!sameLane) continue;
      const jumpProgress = (run.time - run.jumpAt) / JUMP_TIME;
      const sliding = run.time - run.slideAt < SLIDE_TIME;
      const avoided = (item.obstacle === "hurdle" && jumpProgress > 0.12 && jumpProgress < 0.88) || (item.obstacle === "gate" && sliding);
      if (avoided) { run.score += 50; run.dodges++; burst(run, lane, "#9cf3d4", "+50 CLEAN MOVE"); }
      else if (run.shieldUntil > run.time) { run.shieldUntil = 0; notice(run, "Shield absorbed the hit. Keep your combo!"); burst(run, lane, "#7ceeff", "SHIELD SAVE"); }
      else { run.hits++; run.combo = 0; run.score = Math.max(0, run.score - 50); run.hitUntil = run.time + 0.55; blocked.add(Math.floor(item.id / 3)); notice(run, "Bump! −50. Jump low barriers, slide under gates."); burst(run, lane, "#ff9b88", "−50"); }
    } else if (item.kind === "skill") {
      if ((!sameLane && run.magnetUntil <= run.time) || blocked.has(Math.floor(item.id / 3))) { run.combo = 0; continue; }
      run.collected++; run.combo++; run.bestCombo = Math.max(run.bestCombo, run.combo);
      const points = 100 * multiplier(run); run.score += points; run.lastSkill = item.skill;
      if (!run.discoveries.includes(item.skill)) run.discoveries.push(item.skill);
      notice(run, `${SKILLS[item.skill].label} → ${SKILLS[item.skill].project}`);
      burst(run, lane, SKILLS[item.skill].color, `+${points}`);
    } else if (sameLane) {
      if (item.kind === "shield") { run.shieldUntil = run.time + 8; notice(run, "Shield online: absorbs one hit within 8 seconds."); }
      else { run.magnetUntil = run.time + 6; notice(run, "Magnet online: collect across all lanes for 6 seconds."); }
      burst(run, lane, "#7ceeff", item.label);
    }
  }
  run.items = run.items.filter(item => run.time < item.born + item.travel + 0.25);
  run.bursts = run.bursts.filter(effect => run.time - effect.born < 0.9);
}

export function advanceRun(run: Run, seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0 || run.time >= DURATION) return;
  let remaining = Math.min(seconds, DURATION - run.time);
  // Small simulation steps keep action windows and collisions stable across frame rates.
  while (remaining > 1e-8) { const dt = Math.min(1 / 120, remaining); tick(run, dt); remaining -= dt; }
  if (DURATION - run.time < 1e-7) run.time = DURATION;
}
