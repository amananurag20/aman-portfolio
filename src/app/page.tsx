import type { ReactNode } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  CloudCog,
  Code2,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MonitorSmartphone,
  Play,
  Radio,
  ServerCog,
} from "lucide-react";

const experience = [
  {
    period: "FEB 2026 — PRESENT",
    role: "Senior Full Stack Developer",
    company: "Skyclad Ventures",
    location: "Dubai, UAE · Remote",
    description:
      "Leading end-to-end delivery for Payment Center—from payer experiences and reusable UI systems to API contracts, RBAC, audit flows, and production releases.",
    highlights: [
      "20+ payment and configuration workflows",
      "30+ reusable React and TypeScript components",
      "25+ backend APIs designed and integrated",
      "~40% fewer frontend–backend integration issues",
    ],
  },
  {
    period: "JAN 2023 — JAN 2026",
    role: "Full Stack Developer",
    company: "Klovertel Private Limited",
    location: "New Delhi, India",
    description:
      "Promoted from intern and grew into full product ownership across SaaS, CRM, hospitality, fleet, analytics, mobile, and offline-first desktop systems.",
    highlights: [
      "Systems serving 500+ daily users",
      "50,000+ secure API requests handled daily",
      "10,000+ CRM records with export and fuzzy search",
      "99.9% uptime across real-time integrations",
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Virtual Focus Room",
    eyebrow: "WEB · DESKTOP · MOBILE",
    description:
      "A cross-platform virtual co-working space with peer-to-peer video, screen sharing, collaborative whiteboards, chat, permissions, and integrated productivity tools.",
    stack: ["React", "Electron", "React Native", "WebRTC", "Socket.io"],
    image: "/assests/studybud.png",
    imageAlt: "Virtual productivity platform interface",
    live: "https://virtual-focus-room.vercel.app",
    github: "https://github.com/amananurag20/Virtual-focus-room",
  },
  {
    number: "02",
    title: "Course Management System",
    eyebrow: "LEARNING PLATFORM",
    description:
      "An end-to-end LMS with enrollment, structured video learning, progress tracking, quizzes, Monaco-powered coding tasks, payments, analytics, and offline desktop access.",
    stack: ["React", "Node.js", "MongoDB", "Electron", "Docker"],
    image: "/assests/project/course management/c1.png",
    imageAlt: "Course management system login interface",
    live: "https://course-management-opal.vercel.app/",
    github: "https://github.com/amananurag20/course-management",
  },
  {
    number: "03",
    title: "Code Execution Platform",
    eyebrow: "DISTRIBUTED SYSTEMS",
    description:
      "A LeetCode-style, microservice-based judge that executes Java, Python, and C++ safely in Docker, with queued submissions and real-time result feedback.",
    stack: ["TypeScript", "Fastify", "Redis", "Docker", "AWS"],
    image: "/assests/project/algocode/a0.png",
    imageAlt: "Code execution platform interface",
    github: "https://github.com/amananurag20/AlgoCode-Problem-Service",
  },
  {
    number: "04",
    title: "Project IDX Clone",
    eyebrow: "CLOUD DEVELOPMENT",
    description:
      "A browser-based cloud IDE that provisions isolated Linux containers, streams terminal output over WebSockets, and keeps a real-time file explorer synchronized.",
    stack: ["React", "TypeScript", "Dockerode", "Zustand", "WebSockets"],
    image: "/assests/project/project-idx/p1.png",
    imageAlt: "Cloud IDE project dashboard",
    github: "https://github.com/amananurag20/Project-idx-react",
  },
];

const capabilities = [
  {
    icon: Code2,
    title: "Product engineering",
    items: "React, Next.js, React Native, TypeScript, Redux, Zustand, Tailwind CSS, Material UI",
  },
  {
    icon: ServerCog,
    title: "Backend systems",
    items: "Node.js, Express, Fastify, REST APIs, WebSockets, Socket.io, WebRTC, RabbitMQ",
  },
  {
    icon: Database,
    title: "Data & architecture",
    items: "PostgreSQL, MongoDB, Prisma, Redis, multi-tenancy, RBAC, caching, transactions",
  },
  {
    icon: BrainCircuit,
    title: "Applied AI",
    items: "RAG pipelines, LangChain, LangGraph, OpenAI API, Pinecone, Weaviate, Hugging Face",
  },
  {
    icon: MonitorSmartphone,
    title: "Desktop & mobile",
    items: "Electron, IPC, context isolation, native integrations, offline-first sync, auto-updates",
  },
  {
    icon: CloudCog,
    title: "Cloud delivery",
    items: "AWS EC2, ECS, S3, Docker, Jenkins, CI/CD, code signing, app notarization",
  },
];

const stats = [
  ["4+", "Years building"],
  ["25+", "APIs delivered"],
  ["50K+", "Daily API requests"],
  ["99.9%", "Platform uptime"],
];

function SectionLabel({ episode, children }: { episode: string; children: ReactNode }) {
  return (
    <div className="section-label">
      <span className="signal-dot" />
      <span className="section-label-accent">{episode}</span>
      <span className="section-label-rule" />
      <span>{children}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="portfolio-shell">
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Aman Anurag home">
          AMAN<span>.</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Work</a>
          <a href="#stack">Stack</a>
        </div>
        <a className="nav-cta" href="#contact">
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-noise" />
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />

        <div className="hero-copy">
          <div className="availability-pill reveal-up">
            <span className="signal-dot" />
            Senior full-stack engineer · New Delhi / Remote
          </div>
          <p className="hero-kicker reveal-up delay-one">PRODUCTS. PLATFORMS. INTELLIGENCE.</p>
          <h1 className="hero-title reveal-up delay-two">
            I engineer systems
            <span>built to perform.</span>
          </h1>
          <p className="hero-summary reveal-up delay-three">
            I&apos;m Aman Anurag. I turn complex product ideas into reliable web, mobile, desktop,
            and AI-powered experiences—from architecture to production.
          </p>
          <div className="hero-actions reveal-up delay-four">
            <a className="button button-primary" href="#projects">
              <Play size={16} fill="currentColor" /> View selected work
            </a>
            <a className="button button-secondary" href="/Aman_Anurag_Resume.pdf" target="_blank">
              <Download size={16} /> Résumé
            </a>
          </div>
        </div>

        <aside className="hero-console reveal-up delay-three" aria-label="Engineering profile summary">
          <div className="console-topline">
            <span>ENGINEERING PROFILE</span>
            <span className="console-live"><Radio size={12} /> LIVE</span>
          </div>
          <div className="console-command">
            <span className="prompt">$</span>
            <span>whoami</span>
          </div>
          <div className="console-name">AMAN ANURAG</div>
          <div className="console-role">Senior Full Stack Developer</div>
          <div className="console-grid">
            <div><span>FOCUS</span><strong>Product + Platform</strong></div>
            <div><span>SPECIALTY</span><strong>AI + Real-time</strong></div>
            <div><span>CURRENT</span><strong>Skyclad Ventures</strong></div>
            <div><span>STATUS</span><strong className="green-text">Shipping</strong></div>
          </div>
          <div className="console-track"><span /></div>
        </aside>

        <div className="hero-footer">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={16} />
          <span>PORTFOLIO / 2026</span>
        </div>
      </section>

      <section className="content-section about-section" id="about">
        <div className="section-heading">
          <SectionLabel episode="01">THE BRIEF</SectionLabel>
          <h2>Full ownership.<br /><span>Zero handoffs.</span></h2>
        </div>
        <div className="about-grid">
          <p className="about-lead">
            I work across the entire product surface: system design, APIs, frontend experiences,
            AI integrations, DevOps, and release delivery.
          </p>
          <div className="about-detail">
            <p>
              Over four years, I&apos;ve shipped fintech workflows, multi-tenant CRM products,
              real-time collaboration tools, mobile apps, and offline-first desktop software.
              My best work lives where product judgment and technical depth meet.
            </p>
            <div className="location-row"><MapPin size={16} /> New Delhi, India · Working globally</div>
          </div>
        </div>
        <div className="stats-grid">
          {stats.map(([value, label]) => (
            <div className="stat-card" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section experience-section" id="experience">
        <div className="section-heading horizontal-heading">
          <div>
            <SectionLabel episode="02">THE TIMELINE</SectionLabel>
            <h2>Experience,<br /><span>measured in impact.</span></h2>
          </div>
          <BriefcaseBusiness className="heading-icon" strokeWidth={1} />
        </div>
        <div className="timeline">
          {experience.map((job, index) => (
            <article className="timeline-row" key={job.company}>
              <div className="timeline-index">0{index + 1}</div>
              <div className="timeline-meta">
                <span>{job.period}</span>
                <small>{job.location}</small>
              </div>
              <div className="timeline-content">
                <p className="timeline-company">{job.company}</p>
                <h3>{job.role}</h3>
                <p className="timeline-description">{job.description}</p>
                <div className="highlight-list">
                  {job.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section projects-section" id="projects">
        <div className="section-heading projects-heading">
          <div>
            <SectionLabel episode="03">SELECTED SYSTEMS</SectionLabel>
            <h2>Built beyond<br /><span>the browser.</span></h2>
          </div>
          <p>Four products that show how I think about architecture, interaction, and scale.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-${index + 1}`} key={project.title}>
              <div className="project-image-wrap">
                <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 900px) 100vw, 50vw" />
                <div className="project-image-shade" />
                <span className="project-number">{project.number}</span>
                <div className="project-links">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                      <Play size={16} fill="currentColor" /> Live
                    </a>
                  )}
                  <a href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>
                    <Github size={16} /> Code
                  </a>
                </div>
              </div>
              <div className="project-copy">
                <span className="project-eyebrow">{project.eyebrow}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="stack-row">
                  {project.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
        <a className="text-link" href="https://github.com/amananurag20" target="_blank" rel="noreferrer">
          Explore all repositories <ArrowUpRight size={16} />
        </a>
      </section>

      <section className="content-section stack-section" id="stack">
        <div className="section-heading stack-heading">
          <SectionLabel episode="04">TECHNICAL DEPTH</SectionLabel>
          <h2>One engineer.<br /><span>Every layer.</span></h2>
        </div>
        <div className="capabilities-grid">
          {capabilities.map(({ icon: Icon, title, items }, index) => (
            <article className="capability-card" key={title}>
              <div className="capability-top">
                <Icon size={25} strokeWidth={1.5} />
                <span>0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{items}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section proof-section">
        <div className="proof-card education-card">
          <div className="proof-icon"><GraduationCap size={26} /></div>
          <div>
            <span className="project-eyebrow">EDUCATION / 2020—2024</span>
            <h3>B.Tech in Computer Science Engineering</h3>
            <p>CT University · CGPA 8.67 / 10.0</p>
          </div>
        </div>
        <div className="proof-card medal-card">
          <Image src="/assests/achivements/Gold medal.png" alt="Aman Anurag receiving a gold medal" fill sizes="(max-width: 800px) 100vw, 45vw" />
          <div className="medal-overlay" />
          <div className="medal-copy">
            <Award size={28} />
            <span>GOLD MEDALIST</span>
            <h3>Highest CGPA in the School of Engineering & Technology.</h3>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <SectionLabel episode="05">START A CONVERSATION</SectionLabel>
        <h2>Have a hard problem?<br /><span>Let&apos;s build the answer.</span></h2>
        <p>I&apos;m always interested in ambitious products, high-ownership roles, and engineering conversations.</p>
        <div className="contact-actions">
          <a className="button button-primary" href="mailto:amananurag.20@gmail.com">
            <Mail size={17} /> Email me
          </a>
          <a className="social-link" href="https://www.linkedin.com/in/aman-anurag-a160441b7" target="_blank" rel="noreferrer">
            <Linkedin size={18} /> LinkedIn <ArrowUpRight size={14} />
          </a>
          <a className="social-link" href="https://github.com/amananurag20" target="_blank" rel="noreferrer">
            <Github size={18} /> GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="brand">AMAN<span>.</span></div>
        <p>Designed and engineered by Aman Anurag.</p>
        <a href="#top">Back to top <ArrowUpRight size={14} /></a>
      </footer>
    </main>
  );
}
