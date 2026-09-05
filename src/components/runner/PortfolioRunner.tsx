"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { advanceRun, createRun, DURATION, movePlayer, SKILLS } from "./engine";
import { drawRun } from "./draw";
import styles from "./PortfolioRunner.module.css";

type Status = "ready" | "running" | "paused" | "finished";
const emptyHud = { time: 0, score: 0, collected: 0, hits: 0, discoveries: [] as number[], notice: "Find your lane. Collect your stack.", lastSkill: null as number | null };

export default function PortfolioRunner() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const run = useRef(createRun());
  const avatar = useRef<HTMLImageElement | null>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const finishTitle = useRef<HTMLHeadingElement>(null);
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
    setHud({ time: r.time, score: r.score, collected: r.collected, hits: r.hits, discoveries: [...r.discoveries], notice: r.time <= r.noticeUntil ? r.notice : "Collect skills. Discover the work behind them.", lastSkill: r.lastSkill });
  }, []);

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
    const pause = () => setStatus(current => current === "running" ? "paused" : current);
    const visibility = () => { if (document.hidden) pause(); };
    document.addEventListener("visibilitychange", visibility); window.addEventListener("blur", pause);
    return () => { document.removeEventListener("visibilitychange", visibility); window.removeEventListener("blur", pause); };
  }, []);
  useEffect(() => {
    if (status === "finished") finishTitle.current?.focus();
    if (status !== "running") { paint(); return; }
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
  const start = () => { run.current = createRun(); snapshot(); setStatus("running"); focusTrack(); };
  const resume = () => { setStatus("running"); focusTrack(); };
  const move = (direction: number) => { if (status === "running") { movePlayer(run.current, direction); paint(); focusTrack(); } };
  const latest = hud.lastSkill === null ? null : SKILLS[hud.lastSkill];

  return <main className={styles.page}>
    <nav className={styles.nav} aria-label="Game navigation"><Link href="/" className={styles.brand}>AMAN<span>.</span></Link><Link href="/#projects">Back to portfolio ↗</Link></nav>
    <header className={styles.header}><div><p className={styles.eyebrow}>AN INTERACTIVE SIDE QUEST / 30 SECONDS</p><h1>Aman&apos;s <span>next role.</span></h1><p>Chase the opportunity. Collect the skills. Discover the engineer.</p></div><span className={styles.edition}>BUILD<br />SHIP<br />GROW ↗</span></header>
    <div className={styles.gameLayout}>
      <section className={styles.game} aria-label="Aman's Next Role runner game">
        <div className={styles.hud}><div><small>TIME LEFT</small><strong>{Math.max(0, Math.ceil(DURATION - hud.time))}<span>s</span></strong></div><div><small>SCORE</small><strong>{String(hud.score).padStart(4, "0")}</strong></div><div><small>SKILLS</small><strong>{hud.collected}</strong></div><button type="button" disabled={status === "ready" || status === "finished"} onClick={() => status === "running" ? setStatus("paused") : resume()}>{status === "paused" ? "Resume" : "Pause"}</button></div>
        <div className={styles.stage}>
          <canvas ref={canvas} width={960} height={580} tabIndex={0} aria-label="Three-lane runner track. Use left and right arrows or A and D to switch lanes. Space or Escape pauses." aria-describedby="runner-controls" onKeyDown={event => {
            if (["ArrowLeft", "ArrowRight", "a", "A", "d", "D"].includes(event.key) && status === "running") { event.preventDefault(); if (!event.repeat) move(["ArrowLeft", "a", "A"].includes(event.key) ? -1 : 1); }
            if ([" ", "Escape"].includes(event.key) && (status === "running" || status === "paused")) { event.preventDefault(); if (!event.repeat) status === "running" ? setStatus("paused") : resume(); }
          }} onPointerDown={event => { pointer.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); focusTrack(); }} onPointerUp={event => {
            const startPoint = pointer.current; pointer.current = null;
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            if (!startPoint) return;
            const dx = event.clientX - startPoint.x, dy = event.clientY - startPoint.y;
            if (Math.abs(dx) > 22 && Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : -1);
          }} onPointerCancel={() => { pointer.current = null; }}>Use the buttons below to explore Aman&apos;s projects without playing.</canvas>
          {status !== "running" && <div className={styles.overlay}>
            {status === "ready" && <div><p className={styles.eyebrow}>ONE RUN. FOUR WAYS TO BUILD.</p><h2>Your next engineer<br />is in the fast lane.</h2><p>Move between lanes to collect skill tokens. Dodge bugs and outages. Every run reaches the opportunity checkpoint.</p>{canvasAvailable ? <button type="button" className={styles.primary} onClick={start}>Start the run <span aria-hidden="true">→</span></button> : <p>Interactive graphics are unavailable in this browser. You can still explore every project below.</p>}<small>← → / A D · Swipe · On-screen buttons</small></div>}
            {status === "paused" && <div><p className={styles.eyebrow}>TAKE YOUR TIME</p><h2>Run paused.</h2><p>Your progress is safe. Ready when you are.</p><div className={styles.actions}><button type="button" className={styles.primary} onClick={resume}>Continue →</button><button type="button" className={styles.secondary} onClick={start}>Restart</button></div></div>}
            {status === "finished" && <div><p className={styles.eyebrow}>OPPORTUNITY REACHED</p><h2 ref={finishTitle} tabIndex={-1}>Let&apos;s build<br />something together.</h2><p>{hud.collected} skill tokens · {hud.discoveries.length} projects discovered · {hud.score} points</p><div className={styles.actions}><a className={styles.primary} href="mailto:amananurag.20@gmail.com">Contact Aman ↗</a><button type="button" className={styles.secondary} onClick={start}>Run again</button></div></div>}
          </div>}
        </div>
        <div className={styles.notice} role="status">{hud.notice}</div>
        <div className={styles.controls} id="runner-controls"><div><button type="button" disabled={status !== "running"} aria-label="Move one lane left" onClick={() => move(-1)}>←</button><button type="button" disabled={status !== "running"} aria-label="Move one lane right" onClick={() => move(1)}>→</button><span>Switch lanes<br /><small>Space / Esc to pause</small></span></div><button type="button" className={styles.motion} aria-pressed={calm} onClick={() => setCalm(value => !value)}>Reduced effects: {calm ? "on" : "off"}</button></div>
      </section>
      <aside className={styles.sidebar}>
        <div className={styles.brief}><p className={styles.eyebrow}>THE MISSION</p><h2>Catch the role.<br />Meet the builder.</h2><p>Skill tokens add <strong>100 points</strong>. Obstacles cost <strong>25 points</strong>. No game over—keep moving.</p><p>Portrait avatar, three lanes, and a fresh look at the work behind the résumé.</p></div>
        <div className={styles.discovery}><p className={styles.eyebrow}>{latest ? "LATEST DISCOVERY" : "WHAT WILL YOU FIND?"}</p><h3>{latest?.project ?? "A stack built for real products."}</h3><p>{latest?.detail ?? "Collect Python, RAG / AI, React Native, and Electron tokens to discover a different part of my work."}</p>{latest && <Link href={latest.href} onClick={() => setStatus(current => current === "running" ? "paused" : current)}>Explore this work ↗</Link>}</div>
        <div className={styles.always}><a className={styles.primary} href="/Aman_Anurag_Resume.pdf" target="_blank" rel="noreferrer">View résumé ↗</a><a href="mailto:amananurag.20@gmail.com">Let&apos;s talk ↗</a><Link href="/#projects">Skip to the work ↗</Link></div>
      </aside>
    </div>
    <section className={styles.collection} aria-labelledby="collection-title"><div><p className={styles.eyebrow}>THE STACK BEHIND THE RUN</p><h2 id="collection-title">Every token has a story.</h2><p>All projects are open to explore, with or without playing.</p></div><div className={styles.cards}>{SKILLS.map((skill, index) => <Link href={skill.href} key={skill.label} className={styles.skillCard}><span className={styles.token} style={{ color: skill.color }}>{skill.short}</span><small>{hud.discoveries.includes(index) ? "COLLECTED" : "EXPLORE"}</small><h3>{skill.label}</h3><p>{skill.project}</p><span className={styles.cardArrow} aria-hidden="true">↗</span></Link>)}</div></section>
    <footer className={styles.footer}>An original portfolio mini-game by Aman Anurag. No sign-in. No leaderboard. Just a little play.</footer>
  </main>;
}
