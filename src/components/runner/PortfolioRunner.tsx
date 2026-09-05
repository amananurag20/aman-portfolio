"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { advanceRun, createRun, DURATION, movePlayer, performAction, multiplier, sectorAt, Mode, Action, SKILLS } from "./engine";
import type { World } from "./renderer3d";
import { GameAudio } from "./audio";
import styles from "./PortfolioRunner.module.css";

type Status = "ready" | "countdown" | "running" | "paused" | "finished";
const initialHud = { time: 0, score: 0, collected: 0, hits: 0, lives: 3, distance: 0, speed: 17, discoveries: [] as number[], notice: "Follow the tokens. Your first trail is straight ahead.", lastSkill: null as number | null, combo: 0, bestCombo: 0, multiplier: 1, dodges: 0, shield: 0, magnet: 0, double: 0, boost: 0, result: null as null | "checkpoint" | "out" };

export default function PortfolioRunner() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const world = useRef<World | null>(null);
  const run = useRef(createRun());
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const finishTitle = useRef<HTMLHeadingElement>(null);
  const pausedButton = useRef<HTMLButtonElement>(null);
  const audio = useRef<GameAudio | null>(null);
  const lastCue = useRef(0);
  const course = useRef(1);
  const calmRef = useRef(true);
  const [mode, setMode] = useState<Mode>("recruiter");
  const [countdown, setCountdown] = useState(3);
  const [best, setBest] = useState<Record<Mode, number>>({ recruiter: 0, endless: 0 });
  const [status, setStatus] = useState<Status>("ready");
  const [hud, setHud] = useState(initialHud);
  const [calm, setCalm] = useState(true);
  const [sound, setSound] = useState(false);
  const [graphics, setGraphics] = useState<"loading" | "ready" | "lost" | "unavailable">("loading");
  const [expanded, setExpanded] = useState(false);
  const [graphicsMessage, setGraphicsMessage] = useState("");
  const paint = useCallback(() => world.current?.render(run.current, calmRef.current), []);
  const snapshot = useCallback(() => {
    const r = run.current, remaining = (end: number) => Math.max(0, end - r.time);
    setHud({ time: r.time, score: r.score, collected: r.collected, hits: r.hits, lives: r.lives, distance: r.distance, speed: r.speed, discoveries: [...r.discoveries], notice: r.time <= r.noticeUntil ? r.notice : "Jump barriers. Slide pipes. Follow your stack.", lastSkill: r.lastSkill, combo: r.combo, bestCombo: r.bestCombo, multiplier: multiplier(r), dodges: r.dodges, shield: remaining(r.shieldUntil), magnet: remaining(r.magnetUntil), double: remaining(r.doubleUntil), boost: remaining(r.boostUntil), result: r.finished });
  }, []);
  const playCue = useCallback(() => {
    if (run.current.cueId !== lastCue.current) { audio.current?.play(run.current.cue); lastCue.current = run.current.cueId; }
  }, []);
  const focusTrack = () => canvas.current?.focus({ preventScroll: true });
  const activateAudio = (enabled: boolean) => { if (!audio.current) audio.current = new GameAudio(); void audio.current.enable(enabled); };

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("aman-career-rush-best-v1") || "{}");
      const valid = (v: unknown) => typeof v === "number" && Number.isFinite(v) && v >= 0 && v < 1e12 ? Math.floor(v) : 0;
      setBest({ recruiter: valid(stored?.recruiter), endless: valid(stored?.endless) });
    } catch {}
    return () => { audio.current?.dispose(); audio.current = null; };
  }, []);
  useEffect(() => {
    if (status !== "finished" || hud.score <= best[mode]) return;
    const next = { ...best, [mode]: hud.score }; setBest(next);
    try { localStorage.setItem("aman-career-rush-best-v1", JSON.stringify(next)); } catch {}
  }, [status, hud.score, mode, best]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => { calmRef.current = media.matches; setCalm(media.matches); paint(); };
    change(); media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, [paint]);

  // Own the WebGL lifecycle independently of controls, preferences and React renders.
  useEffect(() => {
    const surface = canvas.current;
    if (!surface) return;
    let cancelled = false, instance: World | null = null, observer: ResizeObserver | null = null;
    const lost = (event: Event) => { event.preventDefault(); setGraphics("lost"); setStatus(current => current === "running" || current === "countdown" ? "paused" : current); audio.current?.pause(); };
    const restored = () => { if (cancelled) return; setGraphics("ready"); setGraphicsMessage("Graphics restored. Resume when you’re ready."); paint(); };
    surface.addEventListener("webglcontextlost", lost); surface.addEventListener("webglcontextrestored", restored);
    void import("./renderer3d").then(({ createWorld }) => {
      if (cancelled) return;
      instance = createWorld(surface); world.current = instance;
      const resize = () => { if (cancelled || !instance) return; const rect = surface.getBoundingClientRect(); instance.resize(rect.width, rect.height); instance.render(run.current, calmRef.current); };
      observer = new ResizeObserver(resize); observer.observe(surface); resize(); setGraphics("ready");
    }).catch(() => { if (!cancelled) { setGraphics("unavailable"); setGraphicsMessage("3D graphics could not start here. Try a WebGL2-capable browser; every project below is still available."); } });
    return () => { cancelled = true; observer?.disconnect(); surface.removeEventListener("webglcontextlost", lost); surface.removeEventListener("webglcontextrestored", restored); instance?.dispose(); if (world.current === instance) world.current = null; };
  }, [paint]);
  useEffect(() => {
    const pause = () => { setStatus(current => current === "running" || current === "countdown" ? "paused" : current); audio.current?.pause(); };
    const visibility = () => { if (document.hidden) pause(); };
    document.addEventListener("visibilitychange", visibility); window.addEventListener("blur", pause);
    const observer = new IntersectionObserver(entries => { if (!entries[0]?.isIntersecting) pause(); }, { threshold: 0.05 });
    if (stage.current) observer.observe(stage.current);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); window.removeEventListener("blur", pause); };
  }, []);
  useEffect(() => {
    if (status !== "countdown") return;
    let remaining = 3; setCountdown(remaining);
    const timer = window.setInterval(() => { remaining--; if (!remaining) { window.clearInterval(timer); setStatus("running"); } else setCountdown(remaining); }, 1000);
    return () => window.clearInterval(timer);
  }, [status]);
  useEffect(() => {
    if (status === "finished") finishTitle.current?.focus({ preventScroll: true });
    if (status === "paused") { audio.current?.pause(); pausedButton.current?.focus({ preventScroll: true }); }
    if (status !== "running" || graphics !== "ready") { paint(); return; }
    focusTrack(); let frame = 0, last = 0, lastHud = -1;
    const loop = (now: number) => {
      if (last) advanceRun(run.current, Math.min((now - last) / 1000, 0.1));
      last = now; paint(); playCue();
      if (run.current.time - lastHud > 0.1) { snapshot(); lastHud = run.current.time; }
      if (run.current.finished) { snapshot(); setStatus("finished"); return; }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop); return () => cancelAnimationFrame(frame);
  }, [status, graphics, paint, snapshot, playCue]);

  const start = () => { if (graphics !== "ready") return; run.current = createRun(mode, course.current); lastCue.current = 0; snapshot(); paint(); activateAudio(sound); setCountdown(3); setStatus("countdown"); focusTrack(); };
  const resume = () => { if (graphics !== "ready") return; activateAudio(sound); setStatus("running"); focusTrack(); };
  const move = (direction: number) => { if (status === "running") { movePlayer(run.current, direction); focusTrack(); } };
  const action = (kind: Action) => { if (status === "running") { performAction(run.current, kind); playCue(); focusTrack(); } };
  const latest = hud.lastSkill === null ? null : SKILLS[hud.lastSkill];
  const stageName = sectorAt(hud.time, mode);
  const finishRun = () => { run.current.finished = "checkpoint"; snapshot(); setStatus("finished"); audio.current?.pause(); };

  return <main className={`${styles.page} ${expanded ? styles.expanded : ""}`}>
    <nav className={styles.nav} aria-label="Game navigation"><Link href="/" className={styles.brand}>AMAN<span>.</span></Link><span>INTERACTIVE PORTFOLIO / 3D EDITION</span><Link href="/#projects">Back to the work ↗</Link></nav>
    <header className={styles.header}><div><p className={styles.eyebrow}>A LITTLE PLAY. A LOT OF ENGINEERING.</p><h1>Aman: <span>Career Rush.</span></h1><p>Run the city. Collect your stack. Chase what&apos;s next.</p></div><div className={styles.headerActions}><a href="/Aman_Anurag_Resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a><a href="mailto:amananurag.20@gmail.com">Let&apos;s talk ↗</a></div></header>
    <section ref={stage} className={styles.game} aria-label="Career Rush game">
      <div className={styles.hud}><div><small>{mode === "recruiter" ? "TIME LEFT" : "HEARTS"}</small><strong>{mode === "recruiter" ? Math.max(0, Math.ceil(DURATION - hud.time)) + "s" : "♥".repeat(hud.lives) + "♡".repeat(3-hud.lives)}</strong></div><div><small>SCORE</small><strong>{String(hud.score).padStart(5, "0")}</strong></div><div><small>COMBO</small><strong>×{hud.multiplier}<em>{hud.combo} chain</em></strong></div><div className={styles.distance}><small>DISTANCE</small><strong>{Math.floor(hud.distance)}m</strong></div><div className={styles.hudButtons}><button type="button" onClick={() => setExpanded(value => !value)} aria-pressed={expanded}>{expanded ? "Compact" : "Expand"}</button><button type="button" disabled={status === "ready" || status === "finished" || graphics !== "ready"} onClick={() => status === "paused" ? resume() : setStatus("paused")}>{status === "paused" ? "Resume" : "Pause"}</button></div></div>
      <div className={styles.viewport}>
        <canvas ref={canvas} tabIndex={0} aria-label="3D runner. Arrows or A/D change lanes. Up/W/Space jumps. Down/S slides. P/Escape pauses." aria-describedby="career-controls" style={{ touchAction: status === "running" ? "none" : "pan-y" }} onKeyDown={event => {
          if (["ArrowLeft","ArrowRight","a","A","d","D"].includes(event.key) && status === "running") { event.preventDefault(); if (!event.repeat) move(["ArrowLeft","a","A"].includes(event.key) ? -1 : 1); }
          if (["ArrowUp","w","W"," ","ArrowDown","s","S"].includes(event.key) && status === "running") { event.preventDefault(); if (!event.repeat) action(["ArrowDown","s","S"].includes(event.key) ? "slide" : "jump"); }
          if (["p","P","Escape"].includes(event.key) && (status === "running" || status === "paused")) { event.preventDefault(); if (!event.repeat) status === "running" ? setStatus("paused") : resume(); }
        }} onPointerDown={event => { pointer.current = { x:event.clientX, y:event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); focusTrack(); }} onPointerUp={event => {
          const initial = pointer.current; pointer.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          if (!initial) return; const dx=event.clientX-initial.x, dy=event.clientY-initial.y;
          if (Math.max(Math.abs(dx),Math.abs(dy)) > 22) Math.abs(dx)>Math.abs(dy) ? move(dx>0?1:-1) : action(dy<0?"jump":"slide");
        }} onPointerCancel={() => { pointer.current = null; }}>Explore the project links below if interactive graphics are unavailable.</canvas>
        <div className={styles.zone} style={{ color: stageName.color }}><span>0{Math.floor((mode==="recruiter"?Math.min(hud.time,44.999):hud.time)/15)%3+1}</span>{stageName.name}</div>
        {status === "running" && <div className={styles.powers} aria-label="Active power-ups">{([['Shield',hud.shield],['Magnet',hud.magnet],['2× points',hud.double],['Deploy boost',hud.boost]] as [string,number][]).filter(([,time])=>time>0).map(([name,time])=><span key={name}>{name}<strong>{Math.ceil(time)}s</strong></span>)}</div>}
        {status === "running" && <div className={styles.trackTip}>↑ Jump · ↓ Slide · ← → Move</div>}
        {(status !== "running" || graphics !== "ready") && <div className={styles.overlay}>
          {status === "ready" && <div className={styles.startPanel}><p className={styles.eyebrow}>MEET YOUR NEXT ENGINEER</p><h2>Ready for<br />a new kind of<br /><span>portfolio run?</span></h2><p>Jump, slide, ride the ramps. Discover the projects behind Python, AI, mobile, and desktop engineering.</p><div className={styles.modeChoice} aria-label="Choose game mode"><button type="button" aria-pressed={mode==="recruiter"} onClick={()=>{setMode("recruiter");run.current=createRun("recruiter",course.current);paint();}}>Recruiter Run<small>45 seconds · forgiving</small></button><button type="button" aria-pressed={mode==="endless"} onClick={()=>{setMode("endless");run.current=createRun("endless",course.current);paint();}}>Endless Mode<small>3 hearts · rising speed</small></button></div><button type="button" className={styles.primary} onClick={start} disabled={graphics!=="ready"}>{graphics==="loading"?"Loading 3D city…":"Let’s run →"}</button><small className={styles.best}>BEST {mode==="recruiter"?"RECRUITER":"ENDLESS"}: {best[mode]} POINTS</small></div>}
          {status === "countdown" && <div className={styles.centerPanel}><p className={styles.eyebrow}>TAKE YOUR LANE</p><strong className={styles.countdown} role="status">{countdown}</strong><p>↑ Jump · ↓ Slide · ← → Move</p></div>}
          {status === "paused" && <div className={styles.centerPanel}><p className={styles.eyebrow}>PIT STOP</p><h2>Ready when<br />you are.</h2><p>Your run and power-ups are paused.</p><div className={styles.actions}><button ref={pausedButton} type="button" className={styles.primary} onClick={resume} disabled={graphics!=="ready"}>Continue →</button><button type="button" className={styles.secondary} onClick={start} disabled={graphics!=="ready"}>Restart course</button><button type="button" className={styles.secondary} onClick={finishRun}>Finish & explore projects</button></div></div>}
          {status === "finished" && <div className={styles.centerPanel}><p className={styles.eyebrow}>{hud.result==="out"?"THAT WAS A RUN":"OPPORTUNITY REACHED"}</p><h2 ref={finishTitle} tabIndex={-1}>Let&apos;s build<br /><span>what&apos;s next.</span></h2><p>{hud.score} points · {Math.floor(hud.distance)}m · {hud.bestCombo} best chain</p><div className={styles.awards}>{hud.hits===0&&<span>Clean run</span>}{hud.discoveries.length===4&&<span>Full stack explorer</span>}<span>{hud.dodges} clean moves</span></div><div className={styles.actions}><Link className={styles.primary} href="/#projects">Explore my projects ↗</Link><a className={styles.secondary} href="mailto:amananurag.20@gmail.com">Contact Aman ↗</a><button type="button" className={styles.secondary} onClick={start}>Retry</button><button type="button" className={styles.secondary} onClick={()=>{course.current++;start();}}>New course</button><button type="button" className={styles.secondary} onClick={()=>{setStatus("ready");run.current=createRun(mode,course.current);snapshot();paint();}}>Change mode</button></div></div>}
          {(graphics==="unavailable"||graphics==="lost")&&<p className={styles.error} role="alert">{graphics==="lost"?"Graphics interrupted. Your run is paused while the browser restores the scene.":graphicsMessage}</p>}
        </div>}
      </div>
      <div className={styles.notice} role="status">{graphicsMessage && graphics==="ready" ? graphicsMessage : hud.notice}</div>
      <div className={styles.controls} id="career-controls"><div className={styles.pad}><button type="button" disabled={status!=="running"} aria-label="Move left" onClick={()=>move(-1)}>←<small>LEFT</small></button><button type="button" disabled={status!=="running"} aria-label="Jump" onClick={()=>action("jump")}>↑<small>JUMP</small></button><button type="button" disabled={status!=="running"} aria-label="Slide" onClick={()=>action("slide")}>↓<small>SLIDE</small></button><button type="button" disabled={status!=="running"} aria-label="Move right" onClick={()=>move(1)}>→<small>RIGHT</small></button><span>Arrows / WASD / swipe<br /><small>Space jump · P / Esc pause</small></span></div><div className={styles.settings}><button type="button" aria-pressed={sound} onClick={()=>{setSound(!sound);activateAudio(!sound);}}>Sound {sound?"on":"off"}</button><button type="button" aria-pressed={calm} onClick={()=>{calmRef.current=!calm;setCalm(!calm);paint();}}>Reduced motion {calm?"on":"off"}</button></div></div>
    </section>
    <section className={styles.below}><article className={styles.discovery}><p className={styles.eyebrow}>{latest?"LATEST DISCOVERY":"PLAY WITH PURPOSE"}</p><h2>{latest?.project ?? "Every skill leads to real work."}</h2><p>{latest?.detail ?? "Catch skill trails to explore the systems I build. Résumé and project links are always available—playing is optional."}</p>{latest&&<Link href={latest.href}>Explore this project ↗</Link>}</article><div className={styles.legend}><span>↑ <strong>Barrier / gap</strong> Jump or change lanes</span><span>↓ <strong>Overhead pipe</strong> Slide</span><span>↔ <strong>Moving block</strong> Dodge</span><span>↗ <strong>Ramp</strong> Automatic launch</span><span>◆ <strong>Power-ups</strong> Shield · Magnet · 2× · Boost</span></div></section>
    <section className={styles.collection} aria-labelledby="collection-title"><p className={styles.eyebrow}>BEHIND THE GAME</p><h2 id="collection-title">A stack built for real products.</h2><div className={styles.cards}>{SKILLS.map((skill,index)=><Link className={styles.skillCard} href={skill.href} key={skill.label}><span className={styles.token} style={{color:skill.color}}>{skill.short}</span><small>{hud.discoveries.includes(index)?"DISCOVERED":"EXPLORE"}</small><h3>{skill.label}</h3><p>{skill.project}</p><span className={styles.cardArrow} aria-hidden="true">↗</span></Link>)}</div></section>
    <footer className={styles.footer}>Career Rush by Aman Anurag · Original 3D character and world · Best scores stay in this browser.</footer>
  </main>;
}
