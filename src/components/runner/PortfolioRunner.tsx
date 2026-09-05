"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { advanceRun, createRun, DURATION, movePlayer, performAction, multiplier, sectorAt, Mode, Action, SKILLS } from "./engine";
import { drawRun } from "./draw";
import styles from "./PortfolioRunner.module.css";

type Status = "ready" | "countdown" | "running" | "paused" | "finished";
const emptyHud = { time: 0, score: 0, collected: 0, hits: 0, discoveries: [] as number[], notice: "Find your lane. Collect your stack.", lastSkill: null as number | null, combo: 0, bestCombo: 0, multiplier: 1, dodges: 0, shield: 0, magnet: 0 };

export default function PortfolioRunner() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const run = useRef(createRun());
  const avatar = useRef<HTMLImageElement | null>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const finishTitle = useRef<HTMLHeadingElement>(null);
  const [mode, setMode] = useState<Mode>("sprint");
  const [countdown, setCountdown] = useState(3);
  const [best, setBest] = useState<Record<Mode, number>>({ explore: 0, sprint: 0 });
  const course = useRef(1);
  const [status, setStatus] = useState<Status>("ready");
  const [hud, setHud] = useState(emptyHud);
  const [calm, setCalm] = useState(true);
  const [canvasAvailable, setCanvasAvailable] = useState(true);
  const paint = useCallback(() => {
    const context = canvas.current?.getContext("2d");
    if (context) drawRun(context, run.current, avatar.current, calm);
  }, [calm]);
  const snapshot = useCallback(() => {
    const r = run.current;
    setHud({ time: r.time, score: r.score, collected: r.collected, hits: r.hits, discoveries: [...r.discoveries], notice: r.time <= r.noticeUntil ? r.notice : "Collect skills. Discover the work behind them.", lastSkill: r.lastSkill, combo: r.combo, bestCombo: r.bestCombo, multiplier: multiplier(r), dodges: r.dodges, shield: Math.max(0, r.shieldUntil-r.time), magnet: Math.max(0, r.magnetUntil-r.time) });
  }, []);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("aman-runner-best-v2") || "{}");
      const valid = (value: unknown) => typeof value === "number" && Number.isFinite(value) && value >= 0 && value < 1000000 ? Math.floor(value) : 0;
      setBest({ explore: valid(stored?.explore), sprint: valid(stored?.sprint) });
    } catch { /* The game works when browser storage is unavailable. */ }
  }, []);
  useEffect(() => {
    if (status !== "finished" || hud.score <= best[mode]) return;
    const next = { ...best, [mode]: hud.score }; setBest(next);
    try { localStorage.setItem("aman-runner-best-v2", JSON.stringify(next)); } catch { /* Session score remains visible. */ }
  }, [status, hud.score, mode, best]);
  useEffect(() => {
    if (status !== "countdown") return;
    let remaining = 3; setCountdown(remaining);
    const timer = window.setInterval(() => {
      remaining -= 1;
      if (remaining === 0) { window.clearInterval(timer); setStatus("running"); }
      else setCountdown(remaining);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [status]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setCalm(media.matches);
    change(); media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (!canvas.current?.getContext("2d")) { setCanvasAvailable(false); return; }
    let alive = true;
    const image = new window.Image(); avatar.current = image;
    image.onload = () => { if (alive) paint(); };
    image.src = "/assests/aman-hero-portrait-v3.png";
    const resize = () => {
      if (!canvas.current) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.current.getBoundingClientRect().width;
      canvas.current.width = Math.max(1, Math.round(width * ratio));
      canvas.current.height = Math.max(1, Math.round(width * 580 / 960 * ratio));
      paint();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas.current); resize();
    return () => { alive = false; image.onload = null; observer.disconnect(); };
  }, [paint]);
  useEffect(() => {
    const pause = () => setStatus(current => current === "running" || current === "countdown" ? "paused" : current);
    const visibility = () => { if (document.hidden) pause(); };
    document.addEventListener("visibilitychange", visibility); window.addEventListener("blur", pause);
    return () => { document.removeEventListener("visibilitychange", visibility); window.removeEventListener("blur", pause); };
  }, []);
  useEffect(() => {
    if (status === "finished") finishTitle.current?.focus();
    if (status !== "running") { paint(); return; }
    canvas.current?.focus({ preventScroll: true });
    let frame = 0, last = 0, lastHud = -1;
    const loop = (now: number) => {
      if (last) advanceRun(run.current, Math.min((now - last) / 1000, 0.1));
      last = now; paint();
      if (run.current.time - lastHud >= 0.1) { snapshot(); lastHud = run.current.time; }
      if (run.current.time >= DURATION) { snapshot(); setStatus("finished"); return; }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [status, paint, snapshot]);

  const focusTrack = () => canvas.current?.focus({ preventScroll: true });
  const start = () => { run.current = createRun(mode, course.current); snapshot(); setCountdown(3); setStatus("countdown"); focusTrack(); };
  const resume = () => { setStatus("running"); focusTrack(); };
  const move = (direction: number) => { if (status === "running") { movePlayer(run.current, direction); paint(); focusTrack(); } };
  const action = (kind: Action) => { if (status === "running") { performAction(run.current, kind); paint(); focusTrack(); } };
  const latest = hud.lastSkill === null ? null : SKILLS[hud.lastSkill];

  return <main className={styles.page}>
    <nav className={styles.nav} aria-label="Game navigation"><Link href="/" className={styles.brand}>AMAN<span>.</span></Link><Link href="/#projects">Back to portfolio ↗</Link></nav>
    <header className={styles.header}><div><p className={styles.eyebrow}>ARCADE EDITION / JUMP · SLIDE · COLLECT</p><h1>Aman&apos;s <span>next role.</span></h1><p>Three sectors. Power-ups. One next opportunity.</p></div><span className={styles.edition}>BUILD<br />SHIP<br />GROW ↗</span></header>
    <div className={styles.gameLayout}>
      <section className={styles.game} aria-label="Aman's Next Role runner game">
        <div className={styles.hud}><div><small>TIME LEFT</small><strong>{Math.max(0, Math.ceil(DURATION - hud.time))}<span>s</span></strong></div><div><small>SCORE</small><strong>{String(hud.score).padStart(4, "0")}</strong></div><div><small>SKILLS</small><strong>{hud.collected}</strong></div><button type="button" disabled={status === "ready" || status === "finished"} onClick={() => status === "paused" ? resume() : setStatus("paused")}>{status === "paused" ? "Resume" : "Pause"}</button></div>
        <div className={styles.runStats}><span style={{ color: sectorAt(hud.time).color }}>{sectorAt(hud.time).name} / {mode.toUpperCase()}</span><span>COMBO <strong>{hud.combo} · ×{hud.multiplier}</strong></span><span>BEST {best[mode]}</span><span>{hud.shield > 0 ? `SHIELD ${Math.ceil(hud.shield)}s` : hud.magnet > 0 ? `MAGNET ${Math.ceil(hud.magnet)}s` : "POWER-UPS OFFLINE"}</span></div>
        <div className={styles.stage}>
          <canvas ref={canvas} width={960} height={580} tabIndex={0} aria-label="Runner track. Left/right or A/D changes lanes. Up, W, or Space jumps. Down or S slides. P or Escape pauses." aria-describedby="runner-controls" style={{ touchAction: status === "running" ? "none" : "pan-y" }} onKeyDown={event => {
            if (["ArrowLeft", "ArrowRight", "a", "A", "d", "D"].includes(event.key) && status === "running") { event.preventDefault(); if (!event.repeat) move(["ArrowLeft", "a", "A"].includes(event.key) ? -1 : 1); }
            if (["ArrowUp", "w", "W", " ", "ArrowDown", "s", "S"].includes(event.key) && status === "running") { event.preventDefault(); if (!event.repeat) action(["ArrowDown", "s", "S"].includes(event.key) ? "slide" : "jump"); }
            if (["p", "P", "Escape"].includes(event.key) && (status === "running" || status === "paused")) { event.preventDefault(); if (!event.repeat) status === "running" ? setStatus("paused") : resume(); }
          }} onPointerDown={event => { pointer.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); focusTrack(); }} onPointerUp={event => {
            const startPoint = pointer.current; pointer.current = null;
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            if (!startPoint) return;
            const dx = event.clientX - startPoint.x, dy = event.clientY - startPoint.y;
            if (Math.max(Math.abs(dx), Math.abs(dy)) > 22) {
              if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : -1);
              else action(dy < 0 ? "jump" : "slide");
            }
          }} onPointerCancel={() => { pointer.current = null; }}>Use the buttons below to explore Aman&apos;s projects without playing.</canvas>
          {status !== "running" && <div className={styles.overlay}>
            {status === "ready" && <div><p className={styles.eyebrow}>A LITTLE PLAY. A LOT OF ENGINEERING.</p><h2>Ready to make<br />your next move?</h2><p>Jump low barriers, slide under gates, and dodge tall blocks. Chain skill tokens for up to 4× points. Shields save a hit; magnets pull in skills.</p><div className={styles.modeChoice} aria-label="Game difficulty"><button type="button" aria-pressed={mode === "explore"} onClick={() => setMode("explore")}>Explore <small>More reaction time</small></button><button type="button" aria-pressed={mode === "sprint"} onClick={() => setMode("sprint")}>Sprint <small>Faster every sector</small></button></div>{canvasAvailable ? <button type="button" className={styles.primary} onClick={start}>Start the run <span aria-hidden="true">→</span></button> : <p>Interactive graphics are unavailable in this browser. You can still explore every project below.</p>}<small>← → move · ↑ / Space jump · ↓ slide · P pause</small></div>}
            {status === "countdown" && <div><p className={styles.eyebrow}>GET READY / {mode.toUpperCase()}</p><strong className={styles.countdown} role="status">{countdown}</strong><p>↑ Jump · ↓ Slide · ← → Move</p></div>}
            {status === "paused" && <div><p className={styles.eyebrow}>TAKE YOUR TIME</p><h2>Run paused.</h2><p>Your timer and power-ups are paused. Ready when you are.</p><div className={styles.actions}><button type="button" className={styles.primary} onClick={resume}>Continue →</button><button type="button" className={styles.secondary} onClick={start}>Restart</button></div></div>}
            {status === "finished" && <div><p className={styles.eyebrow}>OPPORTUNITY REACHED</p><h2 ref={finishTitle} tabIndex={-1}>Let&apos;s build<br />something together.</h2><p>{hud.score} points · {hud.collected} tokens · {hud.bestCombo} best combo</p><div className={styles.awards}>{hud.hits === 0 && <span>Clean run</span>}{hud.discoveries.length === 4 && <span>Full stack explorer</span>}{hud.bestCombo >= 8 && <span>Combo builder</span>}<span>{hud.dodges} clean moves</span></div><div className={styles.actions}><a className={styles.primary} href="mailto:amananurag.20@gmail.com">Contact Aman ↗</a><button type="button" className={styles.secondary} onClick={start}>Retry course</button><button type="button" className={styles.secondary} onClick={() => { course.current += 1; start(); }}>New course</button></div></div>}
          </div>}
        </div>
        <div className={styles.notice} role="status">{hud.notice}</div>
        <div className={styles.controls} id="runner-controls"><div><button type="button" disabled={status !== "running"} aria-label="Move one lane left" onClick={() => move(-1)}>←</button><button type="button" disabled={status !== "running"} aria-label="Move one lane right" onClick={() => move(1)}>→</button><button type="button" disabled={status !== "running"} aria-label="Jump over low barriers" onClick={() => action("jump")}>↑<small>JUMP</small></button><button type="button" disabled={status !== "running"} aria-label="Slide under overhead gates" onClick={() => action("slide")}>↓<small>SLIDE</small></button><span>Arrows / WASD<br /><small>Space jump · P / Esc pause</small></span></div><button type="button" className={styles.motion} aria-pressed={calm} onClick={() => setCalm(value => !value)}>Reduced effects: {calm ? "on" : "off"}</button></div>
      </section>
      <aside className={styles.sidebar}>
        <div className={styles.brief}><p className={styles.eyebrow}>THE MISSION</p><h2>Catch the role.<br />Meet the builder.</h2><p>Collect skills for <strong>100–400 points</strong>. Every four consecutive tokens increase the multiplier. Miss a token or take a hit and the combo resets.</p><p>Jump barriers and slide gates for +50. Hits cost 50 points. Every run reaches the finish, so keep building.</p></div>
        <div className={styles.legend}><span>↑ <strong>Low barrier</strong> Jump</span><span>↓ <strong>Overhead gate</strong> Slide</span><span>↔ <strong>Tall block</strong> Dodge</span><span>S <strong>Shield</strong> One hit / 8s</span><span>M <strong>Magnet</strong> All lanes / 6s</span></div>
        <div className={styles.discovery}><p className={styles.eyebrow}>{latest ? "LATEST DISCOVERY" : "WHAT WILL YOU FIND?"}</p><h3>{latest?.project ?? "A stack built for real products."}</h3><p>{latest?.detail ?? "Collect Python, RAG / AI, React Native, and Electron tokens to discover a different part of my work."}</p>{latest && <Link href={latest.href} onClick={() => setStatus(current => current === "running" || current === "countdown" ? "paused" : current)}>Explore this work ↗</Link>}</div>
        <div className={styles.always}><a className={styles.primary} href="/Aman_Anurag_Resume.pdf" target="_blank" rel="noreferrer">View résumé ↗</a><a href="mailto:amananurag.20@gmail.com">Let&apos;s talk ↗</a><Link href="/#projects">Skip to the work ↗</Link></div>
      </aside>
    </div>
    <section className={styles.collection} aria-labelledby="collection-title"><div><p className={styles.eyebrow}>THE STACK BEHIND THE RUN</p><h2 id="collection-title">Every token has a story.</h2><p>All projects are open to explore, with or without playing.</p></div><div className={styles.cards}>{SKILLS.map((skill, index) => <Link href={skill.href} key={skill.label} className={styles.skillCard}><span className={styles.token} style={{ color: skill.color }}>{skill.short}</span><small>{hud.discoveries.includes(index) ? "COLLECTED" : "EXPLORE"}</small><h3>{skill.label}</h3><p>{skill.project}</p><span className={styles.cardArrow} aria-hidden="true">↗</span></Link>)}</div></section>
    <footer className={styles.footer}>An original portfolio mini-game by Aman Anurag. Best scores stay in this browser. No sign-in required.</footer>
  </main>;
}
