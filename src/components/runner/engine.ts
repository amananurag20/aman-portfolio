export const DURATION = 30;
export const TRAVEL_TIME = 3.2;
export const SKILLS = [
  { label: "Python", short: "PY", color: "#ffcf6b", project: "Code Execution Platform", detail: "Queued, container-based execution for Python, Java, and C++.", href: "/#systems-lab" },
  { label: "RAG / AI", short: "AI", color: "#c6a2ff", project: "AgentCore", detail: "Tenant-scoped knowledge retrieval, AI support, and human handoff.", href: "/#agentcore" },
  { label: "React Native", short: "RN", color: "#80e2ff", project: "Virtual Focus Room", detail: "A shared co-working experience across web, mobile, and desktop.", href: "/#projects" },
  { label: "Electron", short: "EL", color: "#99f3d2", project: "Trace Venue", detail: "Offline-first desktop workflows, native integrations, and POS printing.", href: "/#experience" },
] as const;

export type Item = { id: number; lane: number; born: number; kind: "skill" | "obstacle"; skill: number; label: string; resolved: boolean };
export type Run = { time: number; lane: number; nextRow: number; items: Item[]; score: number; collected: number; hits: number; discoveries: number[]; notice: string; noticeUntil: number; lastSkill: number | null; hitUntil: number };
export function createRun(): Run {
  return { time: 0, lane: 1, nextRow: 0, items: [], score: 0, collected: 0, hits: 0, discoveries: [], notice: "Find your lane. Collect your stack.", noticeUntil: 4, lastSkill: null, hitUntil: 0 };
}
export function movePlayer(run: Run, direction: number) {
  run.lane = Math.max(0, Math.min(2, run.lane + Math.sign(direction)));
}

// A fixed course makes retries fair. Each row has a token and only one obstacle.
export function advanceRun(run: Run, seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0 || run.time >= DURATION) return;
  run.time = Math.min(DURATION, run.time + seconds);
  while (run.nextRow < 16 && run.time >= 0.8 + run.nextRow * 1.55) {
    const row = run.nextRow++;
    const lane = [1, 0, 2, 1, 2, 0, 1, 2][row % 8];
    const skill = row % SKILLS.length;
    const born = 0.8 + row * 1.55;
    run.items.push({ id: row * 2, lane, born, kind: "skill", skill, label: SKILLS[skill].short, resolved: false });
    run.items.push({ id: row * 2 + 1, lane: (lane + 1 + row % 2) % 3, born, kind: "obstacle", skill: 0, label: ["BUG", "OUTAGE", "FAILED BUILD"][row % 3], resolved: false });
  }
  for (const item of run.items) {
    if (item.resolved || run.time < item.born + TRAVEL_TIME) continue;
    item.resolved = true;
    if (item.lane !== run.lane) continue;
    if (item.kind === "skill") {
      run.collected += 1; run.score += 100; run.lastSkill = item.skill;
      if (!run.discoveries.includes(item.skill)) run.discoveries.push(item.skill);
      const skill = SKILLS[item.skill];
      run.notice = `${skill.label} → ${skill.project}`;
      run.noticeUntil = run.time + 2.5;
    } else {
      run.hits += 1; run.score = Math.max(0, run.score - 25);
      run.hitUntil = run.time + 0.6;
      run.notice = "Bump! −25 points. Keep building.";
      run.noticeUntil = run.time + 1.6;
    }
  }
  run.items = run.items.filter(item => run.time < item.born + TRAVEL_TIME + 0.25);
}
