import type { ReactNode } from "react";
import Image from "next/image";
import InteractivePortrait from "@/components/InteractivePortrait";
import { QuickOverview, ProjectShowcase, ProjectCaseStudy, AgentCoreCaseStudy, SystemsLab, ScrollReveals } from "@/components/PortfolioExtras";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronRight,
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
  ServerCog,
} from "lucide-react";

const experience = [
  {
    period: "FEB 2026 — PRESENT",
    role: "Senior Full Stack Developer",
    company: "Skyclad Ventures",
    location: "Dubai, UAE · Remote",
    description:
      "Owning architecture and end-to-end product delivery across AI-powered customer engagement and fintech platforms—from product decisions and system design to production releases.",
    work: [
      {
        eyebrow: "FLAGSHIP · AI BUSINESS SUITE",
        title: "AgentCore",
        featured: true,
        description:
          "Architected and built a multi-tenant AI CRM and customer-engagement suite. The platform brings together configurable AI providers, RAG-powered knowledge, embeddable website chat, lead capture and routing, WhatsApp automation, voice agents, appointment booking, proposals, human handoff, and real-time operational dashboards.",
        tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "RAG", "WhatsApp", "Twilio", "Socket.io"],
      },
      {
        eyebrow: "FINTECH · PAYMENTS",
        title: "Payment Center",
        featured: false,
        description:
          "Led payer-side frontend delivery and backend integration across payment configuration, authentication, payer data, audit, and operational workflows. Defined shared API contracts, validation, error handling, and release flows for dependable cross-team delivery.",
        tags: ["React", "TypeScript", "Redux Toolkit", "Material UI", "RBAC", "REST APIs"],
      },
    ],
    highlights: [
      "20+ payment and configuration workflows",
      "30+ reusable React and TypeScript components",
      "25+ backend APIs designed and integrated",
      "~35% less repeated frontend effort",
      "~40% fewer frontend–backend integration issues",
    ],
  },
  {
    period: "JAN 2023 — JAN 2026",
    role: "Full Stack Developer · Promoted from Intern",
    company: "Klovertel Private Limited",
    location: "New Delhi, India",
    description:
      "Promoted from intern and grew into full product ownership across SaaS, CRM, hospitality, fleet, analytics, mobile, and offline-first desktop systems.",
    work: [
      {
        eyebrow: "CRM · AUTOMATION",
        title: "LeadNest CRM",
        featured: false,
        description:
          "Engineered a lead-management platform with multi-stage pipelines, a drag-and-drop form builder, visual automation rules, advanced filters, RBAC, team hierarchy, audit logs, SignalR notifications, and high-volume table workflows with Excel/PDF export.",
        tags: ["React", "Vite", "Tailwind CSS", "TanStack Table", "SignalR", "RBAC"],
      },
      {
        eyebrow: "HOSPITALITY · FLEET",
        title: "Accommodation & Driver Operations",
        featured: false,
        description:
          "Built web and React Native operations systems for real-time bookings, room allocation, payments, live GPS tracking, geospatial route optimization, and automated dispatch—supporting more than 500 daily users.",
        tags: ["MERN", "React Native", "Socket.io", "MongoDB Geo", "Payments"],
      },
      {
        eyebrow: "DESKTOP · OFFLINE FIRST",
        title: "Trace Venue",
        featured: false,
        description:
          "Developed a cross-platform Electron venue application with secure IPC, local database synchronization, native integrations, POS thermal printing, and offline-first operation for dependable service without internet connectivity.",
        tags: ["Electron", "IPC", "Local sync", "POS printing", "Auto-update"],
      },
      {
        eyebrow: "FINTECH · ANALYTICS",
        title: "AppyPay & Supra.tools",
        featured: false,
        description:
          "Delivered merchant onboarding, KYC and payment-method workflows for AppyPay, plus interactive Next.js product analytics for Supra.tools. Built reusable theming and state patterns while simplifying complex operational decisions.",
        tags: ["Next.js", "Material UI", "Redux Toolkit", "KYC", "Analytics"],
      },
    ],
    highlights: [
      "Systems serving 500+ daily users",
      "50,000+ secure API requests handled daily",
      "10,000+ CRM records with export and fuzzy search",
      "40% faster fleet response and analytics",
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
    items: "AI agents, RAG pipelines, embeddings, vector search, prompt engineering, model integration",
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

const aiExpertise = [
  {
    number: "01",
    title: "Generative AI & agents",
    description:
      "Building structured AI workflows with OpenAI APIs, LangChain, and LangGraph—including tool use, conversation memory, provider abstraction, prompt design, and reliable fallback paths.",
    tools: ["OpenAI API", "LangChain", "LangGraph", "Prompt engineering"],
  },
  {
    number: "02",
    title: "RAG & knowledge systems",
    description:
      "Designing ingestion-to-answer pipelines with document extraction, OCR, classification, chunking, embeddings, tenant-scoped retrieval, grounded responses, citations, and evaluation workflows.",
    tools: ["RAG", "Embeddings", "Pinecone", "Weaviate", "Vector search", "OCR"],
  },
  {
    number: "03",
    title: "ML foundations",
    description:
      "Hands-on foundations in neural networks and deep learning using Python, PyTorch, and TensorFlow, including ANN and CNN architectures and model experimentation with Hugging Face tooling.",
    tools: ["Python", "PyTorch", "TensorFlow", "ANN", "CNN", "Hugging Face"],
  },
  {
    number: "04",
    title: "Production AI operations",
    description:
      "Shipping AI inside multi-tenant products with usage and cost visibility, confidence handling, human handoff, knowledge quarantine, access controls, auditability, and real-time monitoring.",
    tools: ["Multi-tenancy", "RBAC", "Human handoff", "Evaluation", "Observability"],
  },
];

const agentCoreCapabilities = [
  {
    number: "01",
    title: "Grounded AI support",
    description:
      "Organization-approved knowledge moves through extraction, OCR, classification, chunking, embeddings, tenant-scoped retrieval, citations, and evaluation before it reaches customers.",
  },
  {
    number: "02",
    title: "Omnichannel engagement",
    description:
      "Website chat, WhatsApp, and voice interactions share one operational layer with conversation memory, confidence fallbacks, real-time inbox events, and human handoff.",
  },
  {
    number: "03",
    title: "CRM & revenue operations",
    description:
      "Lead capture, deduplication, scoring, routing, configurable pipelines, follow-ups, appointments, proposals, itineraries, and customer outcomes form one connected workflow.",
  },
  {
    number: "04",
    title: "Enterprise controls",
    description:
      "Multi-tenant isolation, product entitlements, granular RBAC, audit history, provider health, usage visibility, and human approval keep AI operations secure and accountable.",
  },
];

const agentCoreFlow = [
  "Web · WhatsApp · Voice",
  "Agent orchestration",
  "RAG knowledge",
  "CRM · Booking · Proposals",
  "Human ops · Analytics",
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
      <ScrollReveals />
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Aman Anurag home">
          AMAN<span>.</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#stack">Skills</a>
          <a href="#projects">Work</a>
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
            I build products
            <span>that scale.</span>
          </h1>
          <p className="hero-summary reveal-up delay-three">
            I&apos;m Aman Anurag—a Senior Full Stack Engineer building AI-powered SaaS, CRM,
            and real-time platforms from architecture to production.
          </p>
          <div className="hero-proof-row reveal-up delay-three" aria-label="Core strengths">
            <span>Product architecture</span>
            <span>End-to-end delivery</span>
            <span>Production ownership</span>
          </div>
          <div className="hero-actions reveal-up delay-four">
            <a className="button button-primary" href="#projects">
              <Play size={16} fill="currentColor" /> View selected work
            </a>
            <a className="button button-secondary" href="/Aman_Anurag_Resume.pdf" target="_blank">
              <Download size={16} /> Résumé
            </a>
            <QuickOverview />
          </div>
        </div>

        <InteractivePortrait />

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
                <div className="experience-work-grid">
                  {job.work.map((work) => (
                    <article className={`experience-work-card${work.featured ? " is-featured" : ""}`} key={work.title}>
                      <div className="experience-work-topline">
                        <span>{work.eyebrow}</span>
                        {work.featured && <strong>NEW</strong>}
                      </div>
                      <h4>{work.title}</h4>
                      <p>{work.description}</p>
                      <div className="experience-stack">
                        {work.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                      {work.featured && (
                        <div className="experience-case-actions">
                          <a className="experience-case-link" href="#agentcore">
                            Explore case study <ChevronRight size={14} />
                          </a>
                          <a
                            className="experience-case-link"
                            href="https://dev-app.keogramlabs.com/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Live product <ArrowUpRight size={14} />
                          </a>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
                <p className="impact-label">MEASURED OUTCOMES</p>
                <div className="highlight-list">
                  {job.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section agentcore-section" id="agentcore">
        <div className="agentcore-hero">
          <div className="agentcore-intro">
            <SectionLabel episode="CASE STUDY">SKYCLAD VENTURES · 2026</SectionLabel>
            <p className="agentcore-overline">ARCHITECTED &amp; BUILT END-TO-END</p>
            <h2>AgentCore<span>.</span></h2>
            <p className="agentcore-lead">
              A multi-tenant AI business suite that unifies customer conversations,
              trusted knowledge, lead operations, appointments, and sales workflows.
            </p>
            <div className="agentcore-actions">
              <a
                className="button button-primary"
                href="https://dev-app.keogramlabs.com/"
                target="_blank"
                rel="noreferrer"
              >
                View live product <ArrowUpRight size={16} />
              </a>
              <span>DEV DEPLOYMENT · AUTHENTICATION REQUIRED</span>
            </div>
          </div>
          <aside className="ownership-card" aria-label="Aman's ownership on AgentCore">
            <span className="ownership-label">MY OWNERSHIP</span>
            <ul>
              <li><strong>01</strong> Product and system architecture</li>
              <li><strong>02</strong> Frontend and backend engineering</li>
              <li><strong>03</strong> AI, RAG, and channel integrations</li>
              <li><strong>04</strong> DevOps and production delivery</li>
            </ul>
          </aside>
        </div>

        <div className="agentcore-value-strip">
          <div><strong>1</strong><span>Unified business suite</span></div>
          <div><strong>3</strong><span>Customer channels</span></div>
          <div><strong>RAG</strong><span>Grounded knowledge</span></div>
          <div><strong>HITL</strong><span>Human-in-the-loop</span></div>
        </div>

        <figure className="agentcore-dashboard-showcase">
          <div className="dashboard-browser-bar">
            <div><span /><span /><span /></div>
            <p>AGENTCORE / LIVE OPERATIONS DASHBOARD</p>
            <strong>PRODUCTION UI</strong>
          </div>
          <div className="dashboard-image-wrap">
            <Image
              src="/assests/agentcore-dashboard.png"
              alt="AgentCore operations dashboard showing live conversations, channel workload, bookings, and human handoffs"
              fill
              sizes="(max-width: 900px) 100vw, 1320px"
              className="agentcore-dashboard-image"
            />
          </div>
          <figcaption>
            A unified operational view across customer chat, WhatsApp, voice, appointments,
            lead activity, AI usage, service health, and human-attention queues.
          </figcaption>
        </figure>

        <div className="architecture-block">
          <div className="architecture-copy">
            <span className="project-eyebrow">SYSTEM ARCHITECTURE</span>
            <h3>One connected operating flow.</h3>
            <p>
              Each layer is designed as part of the product—not as an isolated AI demo—so customer intent
              becomes grounded assistance, structured CRM data, and an actionable human workflow.
            </p>
          </div>
          <div className="architecture-flow" aria-label="AgentCore architecture flow">
            {agentCoreFlow.map((step, index) => (
              <div className="architecture-step" key={step}>
                <span>0{index + 1}</span>
                <strong>{step}</strong>
                {index < agentCoreFlow.length - 1 && <ChevronRight size={17} />}
              </div>
            ))}
          </div>
        </div>

        <div className="agentcore-capability-grid">
          {agentCoreCapabilities.map((capability) => (
            <article key={capability.title}>
              <span>{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>

        <AgentCoreCaseStudy />

        <div className="case-study-proof">
          <span>PRODUCTION ENGINEERING, NOT A PROTOTYPE</span>
          <p>
            Designed across Next.js, NestJS, PostgreSQL, Prisma, Redis/BullMQ, Socket.io,
            Twilio, configurable AI providers, and vector retrieval—with security and observability built in.
          </p>
        </div>
      </section>

      <section className="content-section stack-section" id="stack">
        <div className="section-heading stack-heading">
          <SectionLabel episode="03">SKILLS &amp; EXPERTISE</SectionLabel>
          <h2>Technical depth.<br /><span>Across every layer.</span></h2>
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
        <div className="ai-depth-panel">
          <div className="ai-depth-heading">
            <div>
              <span className="project-eyebrow">APPLIED AI / PRODUCTION SYSTEMS</span>
              <h3>From model capability<br />to reliable product.</h3>
            </div>
            <p>
              My AI work goes beyond calling a model API. I build the knowledge pipelines,
              agent workflows, product interfaces, controls, and operational feedback loops around it.
            </p>
          </div>
          <div className="ai-depth-grid">
            {aiExpertise.map((area) => (
              <article className="ai-depth-card" key={area.title}>
                <span className="ai-depth-number">{area.number}</span>
                <h4>{area.title}</h4>
                <p>{area.description}</p>
                <div className="stack-row">
                  {area.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section projects-section" id="projects">
        <div className="section-heading projects-heading">
          <div>
            <SectionLabel episode="04">SELECTED SYSTEMS</SectionLabel>
            <h2>Built beyond<br /><span>the browser.</span></h2>
          </div>
          <p>Four products that show how I think about architecture, interaction, and scale.</p>
        </div>
        <ProjectShowcase projects={projects} />
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
                <ProjectCaseStudy index={index} />
              </div>
            </article>
          ))}
        </div>
        <a className="text-link" href="https://github.com/amananurag20" target="_blank" rel="noreferrer">
          Explore all repositories <ArrowUpRight size={16} />
        </a>
      </section>

      <SystemsLab />

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
        <p>
          Open to Senior Full Stack, Product Engineer, and Applied AI Engineer opportunities
          where I can own ambitious systems from architecture through production.
        </p>
        <div className="target-role-row" aria-label="Target roles">
          <span>Senior Full Stack</span>
          <span>Product Engineering</span>
          <span>Applied AI</span>
        </div>
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

