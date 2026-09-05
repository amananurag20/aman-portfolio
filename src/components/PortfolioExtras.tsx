"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./PortfolioExtras.module.css";

type Project = { title: string; image: string; imageAlt: string; description: string; github: string; live?: string; stack: string[] };

export function QuickOverview() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => dialog.current?.close();
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const restore = () => trigger.current?.focus();
    element.addEventListener("close", restore);
    return () => element.removeEventListener("close", restore);
  }, []);
  return <>
    <button ref={trigger} type="button" className={`button button-secondary ${styles.overviewButton}`} onClick={() => dialog.current?.showModal()} aria-haspopup="dialog">30-second overview ↗</button>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="overview-title" onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className={styles.dialogContent}>
        <button type="button" className={styles.close} onClick={close} aria-label="Close overview" autoFocus>×</button>
        <p className={styles.eyebrow}>AMAN ANURAG / AT A GLANCE</p>
        <h2 id="overview-title">From architecture<br />to production.</h2>
        <p>Senior Full Stack Engineer · New Delhi / Remote</p>
        <dl className={styles.facts}>
          <div><dt>Experience</dt><dd>4+ years building web, mobile, desktop, and AI products.</dd></div>
          <div><dt>Current work</dt><dd>AgentCore: multi-tenant AI CRM and customer engagement at Skyclad Ventures.</dd></div>
          <div><dt>Core stack</dt><dd>React · Next.js · TypeScript · Node.js · PostgreSQL · Docker</dd></div>
          <div><dt>Strength</dt><dd>End-to-end ownership across APIs, interfaces, real-time systems, and delivery.</dd></div>
        </dl>
        <div className={styles.actions}>
          <a className={styles.primary} href="#agentcore" onClick={close}>Read AgentCore case study</a>
          <a className={styles.link} href="#systems-lab" onClick={close}>Explore system design</a>
          <a className={styles.link} href="/Aman_Anurag_Resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a>
          <a className={styles.link} href="mailto:amananurag.20@gmail.com">Email Aman ↗</a>
        </div>
      </div>
    </dialog>
  </>;
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  if (!project) return null;
  return <div className={styles.showcase}>
    <div className={styles.selector} aria-label="Choose a project preview">
      {projects.map((item, index) => <button type="button" key={item.title} aria-pressed={selected === index} onClick={() => setSelected(index)}>{String(index + 1).padStart(2, "0")} <span>{item.title}</span></button>)}
    </div>
    <div className={styles.showcaseGrid}>
      <div className={styles.perspective}>
        <div className={styles.browser}>
          <div className={styles.browserBar}><span aria-hidden="true">● ● ●</span><span>{project.title}</span><span>PREVIEW</span></div>
          <div className={styles.screen}><Image key={project.image} src={project.image} alt={project.imageAlt} fill sizes="(max-width: 980px) 90vw, 60vw" /></div>
        </div>
      </div>
      <div className={styles.showcaseCopy} aria-live="polite">
        <p className={styles.eyebrow}>SELECTED BUILD / {String(selected + 1).padStart(2, "0")}</p>
        <h3>{project.title}</h3><p>{project.description}</p>
        <div className={styles.tags}>{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className={styles.actions}>{project.live && <a className={styles.primary} href={project.live} target="_blank" rel="noreferrer">Live demo ↗</a>}<a className={styles.link} href={project.github} target="_blank" rel="noreferrer">Explore code ↗</a></div>
      </div>
    </div>
  </div>;
}

const studies = [
  { problem: "Remote collaboration spans video, shared work, and productivity tools.", contribution: "Built a cross-platform focus room with video, screen sharing, whiteboards, chat, and permissions.", decision: "Peer-to-peer media keeps video on a separate path from application events; Socket.io coordinates the shared experience.", result: "One workspace across web, desktop, and mobile with real-time collaboration." },
  { problem: "Learning workflows need to connect enrollment, content, practice, and progress.", contribution: "Built an LMS covering video learning, quizzes, coding tasks, payments, analytics, and desktop access.", decision: "Offline desktop access introduces synchronization concerns alongside the web learning experience.", result: "An end-to-end learning workflow, including Monaco-powered coding tasks." },
  { problem: "User-submitted programs need isolated execution and asynchronous result delivery.", contribution: "Built a microservice-based judge for Java, Python, and C++ using queued submissions and Docker.", decision: "A queue separates request handling from execution; containers isolate execution environments. Container isolation still requires careful resource and security controls.", result: "Multi-language execution with queued processing and real-time result feedback." },
  { problem: "A cloud IDE needs a terminal, isolated workspace, and consistent file state in the browser.", contribution: "Built container provisioning, streamed terminal output, and a synchronized file explorer.", decision: "WebSockets provide a persistent channel for terminal output and file events; connection lifecycle becomes part of the product design.", result: "Browser-based development backed by isolated Linux containers." },
];

export function ProjectCaseStudy({ index }: { index: number }) {
  const study = studies[index];
  if (!study) return null;
  return <details className={styles.caseStudy}><summary>Inside the build <span aria-hidden="true">↗</span></summary><dl>
    <div><dt>The problem</dt><dd>{study.problem}</dd></div>
    <div><dt>My contribution</dt><dd>{study.contribution}</dd></div>
    <div><dt>Engineering trade-off</dt><dd>{study.decision}</dd></div>
    <div><dt>Delivered capability</dt><dd>{study.result}</dd></div>
  </dl></details>;
}

export function AgentCoreCaseStudy() {
  return <div className={styles.caseGrid}>
    <article><p className={styles.eyebrow}>01 / THE PROBLEM</p><h3>Connect the entire conversation.</h3><p>Customer support, knowledge, leads, and appointments need a shared operational view across website chat, WhatsApp, and voice.</p></article>
    <article><p className={styles.eyebrow}>02 / MY OWNERSHIP</p><h3>Architecture through delivery.</h3><p>Architected and built the multi-tenant suite, including configurable AI providers, RAG knowledge, CRM workflows, booking, human handoff, and operational dashboards.</p></article>
    <article><p className={styles.eyebrow}>03 / ENGINEERING TRADE-OFF</p><h3>Automation with human control.</h3><p>Tenant-scoped retrieval, access controls, confidence handling, and human handoff support grounded assistance. The trade-off is additional orchestration and operational complexity.</p></article>
    <article><p className={styles.eyebrow}>04 / DELIVERED CAPABILITY</p><h3>One operational surface.</h3><p>Connected AI assistance, lead operations, appointments, and human support. Explore the product and dashboard above; project-specific business metrics are not published here.</p></article>
  </div>;
}

const architecture = [
  { name: "Submission", title: "Accept work without waiting for execution.", detail: "The client sends a program and language to the API. Validation belongs at this boundary before a submission is queued.", tradeoff: "Design consideration: an accepted request and a completed execution are different states." },
  { name: "Queue", title: "Absorb bursts and separate workloads.", detail: "Queued submissions wait for execution capacity. Redis-backed queuing decouples the request lifecycle from slower execution work.", tradeoff: "Design consideration: bound the backlog and make retries observable." },
  { name: "Docker worker", title: "Execute in an isolated environment.", detail: "A worker runs Java, Python, or C++ in a containerized environment and collects output for evaluation.", tradeoff: "Design consideration: time, memory, network, and process limits matter when handling untrusted code." },
  { name: "Result", title: "Close the feedback loop.", detail: "The client receives result feedback after execution so the submission can move from queued to a final state.", tradeoff: "Design consideration: clients need a recovery path if a live connection drops." },
];

export function SystemsLab() {
  const [selected, setSelected] = useState(0);
  return <section className={`content-section ${styles.lab}`} id="systems-lab" aria-labelledby="lab-title">
    <p className={styles.eyebrow}>INTERACTIVE / CODE EXECUTION PLATFORM</p><h2 id="lab-title">Follow a submission.<br /><span>See the decisions.</span></h2>
    <p className={styles.intro}>A simplified walkthrough of the queued, container-based judge in my portfolio. Select a stage to inspect its responsibility and design considerations.</p>
    <div className={styles.flow} aria-label="Architecture stages">{architecture.map((step, index) => <button type="button" key={step.name} aria-pressed={selected === index} onClick={() => setSelected(index)}><small>0{index + 1}</small><strong>{step.name}</strong><span aria-hidden="true">{index < architecture.length - 1 ? "→" : "✓"}</span></button>)}</div>
    <div className={styles.explanation} aria-live="polite"><p className={styles.eyebrow}>{architecture[selected].name}</p><h3>{architecture[selected].title}</h3><p>{architecture[selected].detail}</p><p className={styles.tradeoff}>{architecture[selected].tradeoff}</p></div>
    <QueuePlayground />
  </section>;
}

type Job = { id: number; remaining: number; state: "queued" | "running" | "done" };
export function advanceQueue(jobs: Job[], workers: number): Job[] {
  let slots = workers;
  const updated = jobs.map(job => {
    if (job.state !== "running") return job;
    const remaining = job.remaining - 1;
    if (remaining <= 0) return { ...job, remaining: 0, state: "done" as const };
    slots -= 1;
    return { ...job, remaining };
  });
  return updated.map(job => {
    if (job.state === "queued" && slots > 0) { slots -= 1; return { ...job, state: "running" as const }; }
    return job;
  });
}

function QueuePlayground() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [workers, setWorkers] = useState(2);
  const [playing, setPlaying] = useState(false);
  const counter = useRef(0);
  const pending = jobs.some(job => job.state !== "done");
  const step = () => setJobs(current => advanceQueue(current, workers));
  useEffect(() => {
    if (!playing || !pending) return;
    const timer = window.setInterval(() => setJobs(current => advanceQueue(current, workers)), 1000);
    return () => window.clearInterval(timer);
  }, [playing, pending, workers]);
  useEffect(() => { if (!pending) setPlaying(false); }, [pending]);
  const enqueue = () => {
    const batch: Job[] = Array.from({ length: Math.min(5, 20 - jobs.length) }, () => ({ id: ++counter.current, remaining: 3, state: "queued" }));
    setJobs(current => [...current, ...batch]);
  };
  return <div className={styles.playground}>
    <div><p className={styles.eyebrow}>TRY IT / QUEUE PLAYGROUND</p><h3>What happens when work arrives faster?</h3><p>Add submissions, then step through execution or run the simulation. Each job takes three simulated ticks after dispatch.</p><p className={styles.note}>Illustrative browser simulation. No submitted code is executed, and these are not production performance metrics.</p></div>
    <div className={styles.controls}>
      <label>Workers <select value={workers} disabled={pending} onChange={event => setWorkers(Number(event.target.value))}><option value={1}>1 worker</option><option value={2}>2 workers</option><option value={4}>4 workers</option></select></label>
      <button type="button" onClick={enqueue} disabled={jobs.length >= 20}>Add 5 jobs</button>
      <button type="button" onClick={() => setPlaying(value => !value)} disabled={!pending}>{playing ? "Pause" : "Run"}</button>
      <button type="button" onClick={step} disabled={playing || !pending}>Step</button>
      <button type="button" onClick={() => { setPlaying(false); setJobs([]); counter.current = 0; }}>Reset</button>
    </div>
    <p className={styles.note}>Choose worker capacity before adding jobs. Reset to compare another capacity. Maximum 20 jobs per run.</p>
    <div className={styles.queueBoard} aria-live="polite" aria-atomic="true">{(["queued", "running", "done"] as const).map(state => <div key={state}><h4>{state === "done" ? "Completed" : state} <span>{jobs.filter(job => job.state === state).length}</span></h4><div className={styles.jobs}>{jobs.filter(job => job.state === state).map(job => <span key={job.id} className={styles.job}>#{String(job.id).padStart(2, "0")}{state === "running" && <small>{job.remaining} ticks left</small>}</span>)}{!jobs.some(job => job.state === state) && <p className={styles.empty}>{state === "queued" ? "No waiting jobs" : state === "running" ? "Workers idle" : "No results yet"}</p>}</div></div>)}</div>
  </div>;
}

export function ScrollReveals() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const elements = document.querySelectorAll<HTMLElement>(".content-section > .section-heading, .project-card, .capability-card");
    const reset = () => elements.forEach(element => { element.classList.remove(styles.waiting); element.classList.remove(styles.visible); });
    const setup = () => {
      observer?.disconnect(); reset();
      if (media.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add(styles.visible); observer?.unobserve(entry.target); } }), { threshold: 0.08 });
      elements.forEach(element => { if (element.getBoundingClientRect().top > window.innerHeight) { element.classList.add(styles.waiting); observer?.observe(element); } });
    };
    setup(); media.addEventListener("change", setup);
    return () => { observer?.disconnect(); media.removeEventListener("change", setup); reset(); };
  }, []);
  return null;
}
