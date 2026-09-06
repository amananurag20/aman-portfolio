export type DeviceId = "ai" | "mobile" | "desktop" | "systems";
export type DeskProject = {
  id: DeviceId; device: string; category: string; title: string; color: string;
  summary: string; ownership: string; stack: string[]; image?: string; imageAlt?: string;
  href: string; cta: string; source?: string; video?: string;
  steps: { title: string; detail: string }[]; tradeoff: string;
};

export const PROJECTS: DeskProject[] = [
  {
    id: "ai", device: "Laptop", category: "APPLIED AI / CRM", title: "AgentCore", color: "#ff687d",
    summary: "A customer conversation, connected from the first message to human support.",
    ownership: "Architecture and delivery of a multi-tenant AI CRM: RAG knowledge, customer chat, voice agents, bookings, lead management, and human handoff.",
    stack: ["Next.js", "PostgreSQL", "RAG", "LangChain", "Socket.IO"],
    image: "/assests/agentcore-dashboard.png", imageAlt: "AgentCore dashboard from the portfolio",
    href: "/#agentcore", cta: "Read the case study",
    steps: [
      { title: "Receive", detail: "A customer enters through website chat, WhatsApp, or voice. The conversation belongs to a tenant and its access rules." },
      { title: "Retrieve", detail: "Retrieve relevant knowledge for the tenant and use it to ground the assistant’s response." },
      { title: "Resolve", detail: "Continue the workflow or hand the conversation to a person with its context intact." },
    ],
    tradeoff: "Automation needs a human handoff path. Tenant boundaries and retrieval quality are part of the product, alongside the model.",
  },
  {
    id: "mobile", device: "Phone", category: "REACT NATIVE / REAL-TIME", title: "Virtual Focus Room", color: "#80dcff",
    summary: "A shared place to focus, collaborate, and stay connected across devices.",
    ownership: "Built React Native/Expo, React, and Electron clients for a co-working workspace with video, chat, screen sharing, and a shared whiteboard.",
    stack: ["React Native", "Expo", "WebRTC", "Socket.IO"],
    href: "https://virtual-focus-room.vercel.app/", cta: "Open the web app",
    source: "https://github.com/amananurag20/Virtual-focus-room/tree/main/focus-room-app", video: "wLVO5xj3O2Q",
    steps: [
      { title: "Join", detail: "Connect to a shared room and establish the signaling channel that coordinates participants." },
      { title: "Connect", detail: "Exchange WebRTC offers, answers, and ICE candidates to establish the media connection." },
      { title: "Collaborate", detail: "Coordinate chat and shared whiteboard events while media travels through its own connection." },
    ],
    tradeoff: "Shared product behavior still needs platform-specific work: media permissions, connection recovery, and mobile lifecycle handling.",
  },
  {
    id: "desktop", device: "Monitor", category: "ELECTRON / NATIVE INTEGRATION", title: "Beyond the browser", color: "#a8e8c0",
    summary: "Desktop software that connects web interfaces to native capabilities.",
    ownership: "Built Trace Venue’s offline-first local sync and POS printing. In Virtual Focus Room, implemented Electron desktop capture through IPC and tray integration.",
    stack: ["Electron", "IPC", "Local sync", "POS printing"],
    href: "/#experience", cta: "Explore desktop experience",
    source: "https://github.com/amananurag20/Virtual-focus-room/tree/main/focus-room-electronjs", video: "wLVO5xj3O2Q",
    steps: [
      { title: "Request", detail: "The application interface requests a native capability through a narrow preload bridge." },
      { title: "Handle", detail: "The main process handles the operation through IPC rather than exposing native APIs directly to the page." },
      { title: "Respond", detail: "Send the result back to the interface and make success, failure, and offline state visible to the user." },
    ],
    tradeoff: "Native access adds capability and responsibility. Keep the bridge small and account for platform differences during distribution.",
  },
  {
    id: "systems", device: "Server", category: "BACKEND / DISTRIBUTED WORK", title: "AlgoCode", color: "#c4abff",
    summary: "Follow a program from submission to a result, one service at a time.",
    ownership: "Built code evaluation services with BullMQ/Redis queues, Docker-based Python and Java execution, and Socket.IO result delivery.",
    stack: ["TypeScript", "Fastify", "BullMQ", "Redis", "Docker"],
    image: "/assests/project/algocode/a0.png", imageAlt: "AlgoCode project screenshot from the portfolio",
    href: "/#systems-lab", cta: "Try the queue playground",
    source: "https://github.com/amananurag20/Full-backend-algocode",
    steps: [
      { title: "Queue", detail: "The submission API accepts work and places it in a queue, separating request handling from execution." },
      { title: "Execute", detail: "A worker runs Python or Java in a container and collects the output for evaluation." },
      { title: "Deliver", detail: "Return evaluation feedback through the result delivery path so the interface can update the submission." },
    ],
    tradeoff: "A queue absorbs bursts but adds waiting and retry decisions. Containers also need explicit resource and security limits.",
  },
];

export const JOURNEY = [
  { year: "2020–2024", title: "Build the foundation", detail: "B.Tech CSE (AI), CT University. Gold medalist; CGPA 8.67/10.", href: "/#about" },
  { year: "2023–2026", title: "Ship across platforms", detail: "Intern to Full Stack Developer at Klovertel. Web, React Native, Electron, CRM, and real-time operations.", href: "/#experience" },
  { year: "2026–NOW", title: "Own the system", detail: "Senior Full Stack Developer at Skyclad Ventures. AI customer engagement and Payment Center delivery.", href: "/#agentcore" },
];

export const TOUR_STOP_MS = 7500;
export function tourStop(elapsed: number) { return Math.min(PROJECTS.length - 1, Math.floor(elapsed / TOUR_STOP_MS)); }
export function deviceFromQuery(value: string | null): DeviceId { return PROJECTS.find(project => project.id === value)?.id ?? "ai"; }
