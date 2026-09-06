"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, Laptop, Monitor, Pause, Play, RotateCcw, Server, Smartphone, X } from "lucide-react";
import { deviceFromQuery, JOURNEY, PROJECTS, TOUR_STOP_MS, tourStop, type DeviceId } from "./content";
import type { DeskScene } from "./scene";
import styles from "./DeveloperDesk.module.css";

const ICONS = [Laptop, Smartphone, Monitor, Server];
type Tour = "idle" | "playing" | "paused" | "finished";
const TOUR_DURATION = PROJECTS.length * TOUR_STOP_MS;

export default function DeveloperDesk() {
  const [selected, setSelected] = useState<DeviceId>("ai");
  const [graphics, setGraphics] = useState<"loading" | "ready" | "lost" | "unavailable">("loading");
  const [calm, setCalm] = useState(true);
  const [focused, setFocused] = useState(false);
  const [tour, setTour] = useState<Tour>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [step, setStep] = useState(0);
  const [video, setVideo] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [journey, setJourney] = useState(2);
  const canvas = useRef<HTMLCanvasElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const world = useRef<DeskScene | null>(null);
  const draw = useRef<() => void>(() => {});
  const options = useRef({ selected: "ai" as DeviceId, calm: true, focused: false });
  const elapsedRef = useRef(0);
  const pointer = useRef<{ id: number; x: number; y: number; lastX: number; lastY: number; moved: boolean } | null>(null);
  const tourButton = useRef<HTMLButtonElement>(null);
  const videoClose = useRef<HTMLButtonElement>(null);
  const videoPlay = useRef<HTMLButtonElement>(null);
  const wasVideo = useRef(false);
  const project = PROJECTS.find(item => item.id === selected)!;
  const index = PROJECTS.indexOf(project);

  const choose = useCallback((id: DeviceId, manual = false) => {
    options.current.selected = id; setSelected(id); setStep(0); setVideo(false); setImageFailed(false);
    world.current?.select(id); draw.current();
    if (manual) { setTour(value => value === "playing" ? "paused" : value); elapsedRef.current = PROJECTS.findIndex(item => item.id === id) * TOUR_STOP_MS; setElapsed(elapsedRef.current); }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = deviceFromQuery(params.get("device")); choose(id);
    if (params.get("tour") === "1") { elapsedRef.current = 0; setElapsed(0); choose("ai"); setTour("playing"); }
    if (params.get("demo") === "1" && PROJECTS.find(item => item.id === id)?.video) setVideo(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => { options.current.calm = media.matches; setCalm(media.matches); world.current?.setCalm(media.matches); draw.current(); };
    change(); media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, [choose]);

  useEffect(() => {
    const element = canvas.current, region = surface.current;
    if (!element || !region) return;
    let cancelled = false, instance: DeskScene | null = null, resizeObserver: ResizeObserver | null = null;
    let observer: IntersectionObserver | null = null, frame = 0, last = 0, visible = true, lost = false;
    const loop = (now: number) => {
      frame = 0;
      if (cancelled || !instance || !visible || lost || document.hidden) return;
      instance.render(last ? Math.min((now - last) / 1000, 0.05) : 1 / 60); last = now;
      if (!options.current.calm) frame = requestAnimationFrame(loop);
    };
    const redraw = () => { cancelAnimationFrame(frame); frame = 0; last = 0; if (!cancelled && visible && !lost && !document.hidden) frame = requestAnimationFrame(loop); };
    draw.current = redraw;
    const contextLost = (event: Event) => { event.preventDefault(); lost = true; cancelAnimationFrame(frame); setGraphics("lost"); setTour(value => value === "playing" ? "paused" : value); };
    const contextRestored = () => { if (cancelled) return; lost = false; setGraphics("ready"); redraw(); };
    const visibility = () => { if (document.hidden) setTour(value => value === "playing" ? "paused" : value); redraw(); };
    element.addEventListener("webglcontextlost", contextLost); element.addEventListener("webglcontextrestored", contextRestored);
    document.addEventListener("visibilitychange", visibility);
    void import("./scene").then(({ createDeskScene }) => {
      if (cancelled) return;
      instance = createDeskScene(element); world.current = instance;
      instance.select(options.current.selected); instance.setCalm(options.current.calm); instance.setFocused(options.current.focused);
      const resize = () => { const rect = element.getBoundingClientRect(); instance?.resize(rect.width, rect.height); redraw(); };
      resizeObserver = new ResizeObserver(resize); resizeObserver.observe(element);
      observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? true; if (!visible) setTour(value => value === "playing" ? "paused" : value); redraw(); }, { threshold: 0.02 });
      observer.observe(region); resize(); setGraphics("ready");
    }).catch(() => { if (!cancelled) { instance?.dispose(); instance = null; world.current = null; setGraphics("unavailable"); } });
    return () => {
      cancelled = true; cancelAnimationFrame(frame); resizeObserver?.disconnect(); observer?.disconnect();
      element.removeEventListener("webglcontextlost", contextLost); element.removeEventListener("webglcontextrestored", contextRestored); document.removeEventListener("visibilitychange", visibility);
      instance?.dispose(); if (world.current === instance) world.current = null; draw.current = () => {};
    };
  }, []);

  useEffect(() => {
    if (tour !== "playing") return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now(); elapsedRef.current = Math.min(TOUR_DURATION, elapsedRef.current + Math.min(now - previous, 250)); previous = now;
      setElapsed(elapsedRef.current);
      const id = PROJECTS[tourStop(elapsedRef.current)].id;
      if (id !== options.current.selected) choose(id);
      if (elapsedRef.current >= TOUR_DURATION) setTour("finished");
    }, 100);
    return () => window.clearInterval(timer);
  }, [tour, choose]);

  useEffect(() => { if (video) videoClose.current?.focus({ preventScroll: true }); else if (wasVideo.current) videoPlay.current?.focus({ preventScroll: true }); wasVideo.current = video; }, [video]);

  const toggleTour = () => {
    setVideo(false);
    if (tour === "playing") { setTour("paused"); return; }
    if (tour !== "paused") { elapsedRef.current = 0; setElapsed(0); choose("ai"); }
    setTour("playing");
  };
  const pick = (clientX: number, clientY: number) => {
    const rect = canvas.current?.getBoundingClientRect();
    if (!rect || rect.width < 1 || rect.height < 1) return null;
    return world.current?.pick((clientX - rect.left) / rect.width * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1) ?? null;
  };
  const stopPointer = (element: HTMLCanvasElement, id: number) => { if (element.hasPointerCapture(id)) element.releasePointerCapture(id); pointer.current = null; };
  const currentJourney = JOURNEY[journey];

  return <main className={styles.page}>
    <nav className={styles.nav} aria-label="Desk navigation">
      <Link className={styles.brand} href="/">AMAN<span>.</span></Link>
      <div><Link href="/#projects">Projects</Link><Link href="/play">Career Rush</Link><a href="/Aman_Anurag_Resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a><a className={styles.contact} href="mailto:amananurag.20@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a></div>
    </nav>
    <header className={styles.header}>
      <div><p className={styles.eyebrow}>THE DEVELOPER DESK</p><h1>Different surfaces.<br /><span>One engineer.</span></h1></div>
      <div className={styles.headerAside}><p>Pick a device. Explore the work behind it.</p><button ref={tourButton} className={styles.primary} type="button" onClick={toggleTour}>{tour === "playing" ? <Pause size={16} /> : <Play size={16} />}{tour === "playing" ? "Pause tour" : tour === "paused" ? "Resume tour" : tour === "finished" ? "Replay tour" : "Take the 30-second tour"}</button></div>
    </header>

    <section className={styles.workspace} aria-label="Interactive project desk">
      <div className={styles.stageColumn}>
        <div className={styles.sceneHeading}><span>01—04 / EXPLORE THE WORK</span><button type="button" aria-pressed={calm} onClick={() => { const next = !calm; setCalm(next); options.current.calm = next; world.current?.setCalm(next); draw.current(); }}>Motion {calm ? "off" : "on"}</button></div>
        <div ref={surface} className={styles.scene}>
          <canvas ref={canvas} tabIndex={graphics === "ready" ? 0 : -1} aria-label="Interactive developer desk. Use left and right arrows to select a device, or use the labeled device buttons below." aria-describedby="desk-help"
            onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); choose(PROJECTS[(index + (event.key === "ArrowRight" ? 1 : 3)) % 4].id, true); } if (event.key === "Home") { event.preventDefault(); choose("ai", true); } if (event.key === "Escape") { setTour(value => value === "playing" ? "paused" : value); world.current?.reset(); options.current.focused = false; setFocused(false); draw.current(); } }}
            onPointerDown={event => { if (event.button !== 0 || !event.isPrimary || graphics !== "ready") return; pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY, moved: false }; event.currentTarget.setPointerCapture(event.pointerId); }}
            onPointerMove={event => {
              const p = pointer.current;
              if (p && p.id === event.pointerId) { if (Math.hypot(event.clientX - p.x, event.clientY - p.y) > 6) p.moved = true; if (p.moved) { world.current?.orbit(event.clientX - p.lastX, event.clientY - p.lastY); setTour(value => value === "playing" ? "paused" : value); draw.current(); } p.lastX = event.clientX; p.lastY = event.clientY; }
              else if (event.pointerType === "mouse") { const id = pick(event.clientX, event.clientY); world.current?.hover(id); event.currentTarget.style.cursor = id ? "pointer" : "grab"; draw.current(); }
            }}
            onPointerUp={event => { const p = pointer.current; if (!p || p.id !== event.pointerId) return; if (!p.moved) { const id = pick(event.clientX, event.clientY); if (id) choose(id, true); } stopPointer(event.currentTarget, event.pointerId); }}
            onPointerCancel={event => stopPointer(event.currentTarget, event.pointerId)} onLostPointerCapture={() => { pointer.current = null; }}
            onPointerLeave={() => { world.current?.hover(null); draw.current(); }}
          >Use the four device buttons to explore every project without 3D graphics.</canvas>
          {graphics !== "ready" && <div className={styles.graphicsFallback} role="status"><Laptop size={38} /><strong>{graphics === "loading" ? "Setting up the desk…" : graphics === "lost" ? "The desk is reconnecting." : "Explore the work below."}</strong><p>{graphics === "loading" ? "You can choose a project while it loads." : "The device buttons, project details, and demos are still available."}</p></div>}
          <div className={styles.sceneTools}><button type="button" disabled={graphics !== "ready"} aria-pressed={focused} onClick={() => { const next = !focused; setFocused(next); options.current.focused = next; world.current?.setFocused(next); draw.current(); }}><Expand size={15} />{focused ? "Whole desk" : "Focus device"}</button><button type="button" disabled={graphics !== "ready"} onClick={() => { world.current?.reset(); setFocused(false); options.current.focused = false; draw.current(); }}><RotateCcw size={15} />Reset view</button></div>
          <p id="desk-help" className={styles.sceneHelp}>Click a device · Drag to look around · Arrow keys to explore</p>
        </div>
        <div className={styles.devices} aria-label="Choose a project device">{PROJECTS.map((item, i) => { const Icon = ICONS[i]; return <button key={item.id} type="button" aria-pressed={selected === item.id} aria-controls="desk-project" onClick={() => choose(item.id, true)} style={{ "--device-color": item.color } as CSSProperties}><Icon size={23} /><span><small>0{i + 1} / {item.device}</small><strong>{["AI & CRM", "Mobile", "Desktop", "Systems"][i]}</strong></span></button>; })}</div>
        <div className={styles.tour}>
          <div><span>{tour === "finished" ? "Tour complete. Let’s talk about your next product." : tour === "playing" ? `Tour · ${index + 1} of 4 · ${project.device}` : tour === "paused" ? "Tour paused. Explore at your own pace." : "Four stops. Architecture, interfaces, native apps, and delivery."}</span>{tour !== "idle" && <button type="button" onClick={() => { setTour("idle"); elapsedRef.current = 0; setElapsed(0); }}>End tour</button>}</div>
          <div className={styles.tourTrack} aria-hidden="true"><span style={{ width: `${elapsed / TOUR_DURATION * 100}%` }} /></div>
          {tour === "finished" && <div className={styles.tourComplete}><a href="mailto:amananurag.20@gmail.com">Contact Aman ↗</a><a href="/Aman_Anurag_Resume.pdf" target="_blank" rel="noreferrer">View résumé ↗</a></div>}
        </div>
      </div>

      <article id="desk-project" className={styles.project} style={{ "--device-color": project.color } as CSSProperties} onFocusCapture={() => setTour(value => value === "playing" ? "paused" : value)}>
        <div className={styles.projectHeading} aria-live="polite" aria-atomic="true"><p className={styles.eyebrow}>{project.category}</p><h2>{project.title}</h2><p>{project.summary}</p></div>
        <div className={styles.tags}>{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
        <p className={styles.ownership}><span>MY CONTRIBUTION</span>{project.ownership}</p>
        <div className={`${styles.media} ${!video && (!project.image || imageFailed) ? styles.mediaCover : ""}`}>
          {video && project.video ? <><iframe key={`${selected}-${project.video}`} src={`https://www.youtube-nocookie.com/embed/${project.video}?autoplay=1&rel=0`} title="Virtual Focus Room — full project video demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /><button ref={videoClose} className={styles.closeVideo} type="button" onClick={() => setVideo(false)} aria-label="Close video"><X size={17} /></button></> : project.image && !imageFailed ? <Image src={project.image} alt={project.imageAlt!} fill sizes="(max-width: 1050px) 90vw, 430px" onError={() => setImageFailed(true)} /> : <div className={styles.demoCover}><Monitor size={32} /><strong>{project.video ? "See Virtual Focus Room in action" : project.title}</strong><span>{project.video ? "Original project walkthrough · web, mobile & desktop project" : "Explore the architecture below"}</span>{project.video && <button ref={videoPlay} type="button" className={styles.primary} onClick={() => { setTour(value => value === "playing" ? "paused" : value); setVideo(true); }}><Play size={16} />Play project demo</button>}</div>}
        </div>
        {project.video && <p className={styles.mediaCaption}>Full Virtual Focus Room recording. <a href={`https://youtu.be/${project.video}`} target="_blank" rel="noreferrer">Watch on YouTube ↗</a></p>}
        <div className={styles.walkthrough}><p className={styles.miniLabel}>INSIDE THE BUILD <span>Illustrative flow</span></p><div className={styles.steps}>{project.steps.map((item, i) => <button type="button" key={item.title} aria-pressed={step === i} onClick={() => { setStep(i); setTour(value => value === "playing" ? "paused" : value); }}><small>0{i + 1}</small>{item.title}{i < 2 && <ChevronRight size={13} />}</button>)}</div><p className={styles.stepDetail} aria-live="polite">{project.steps[step].detail}</p><details className={styles.tradeoff} onToggle={event => { if (event.currentTarget.open) setTour(value => value === "playing" ? "paused" : value); }}><summary>The engineering trade-off</summary><p>{project.tradeoff}</p></details></div>
        <div className={styles.projectLinks}><a className={styles.primary} href={project.href} {...(project.href.startsWith("https:") ? { target: "_blank", rel: "noreferrer" } : {})}>{project.cta}<ArrowUpRight size={16} /></a>{project.source && <a href={project.source} target="_blank" rel="noreferrer">Source code ↗</a>}</div>
      </article>
    </section>

    <section className={styles.journey} aria-labelledby="journey-title"><div><p className={styles.eyebrow}>THE JOURNEY</p><h2 id="journey-title">Experience that<br /><span>connects the dots.</span></h2><Link href="/#experience">Read the full timeline ↗</Link></div><div className={styles.journeyContent}><div className={styles.journeyStops} aria-label="Career milestones">{JOURNEY.map((item, i) => <button type="button" key={item.year} aria-pressed={journey === i} onClick={() => setJourney(i)}><span>{item.year}</span><i aria-hidden="true" /></button>)}</div><div className={styles.journeyDetail} key={journey}><p>{currentJourney.year}</p><h3>{currentJourney.title}</h3><p>{currentJourney.detail}</p><a href={currentJourney.href}>Explore this chapter ↗</a></div><div className={styles.journeyArrows}><button type="button" aria-label="Previous milestone" disabled={journey === 0} onClick={() => setJourney(value => Math.max(0, value - 1))}><ChevronLeft size={18} /></button><button type="button" aria-label="Next milestone" disabled={journey === JOURNEY.length - 1} onClick={() => setJourney(value => Math.min(JOURNEY.length - 1, value + 1))}><ChevronRight size={18} /></button></div></div></section>
    <footer className={styles.footer}><span>AMAN ANURAG / FROM ARCHITECTURE TO PRODUCTION</span><Link href="/play">Take a lap in Career Rush ↗</Link><a href="mailto:amananurag.20@gmail.com">Start a conversation ↗</a></footer>
  </main>;
}
