# Aman Anurag — Engineering Portfolio

My work across applied AI, real-time systems, web, React Native, and Electron.

[Portfolio](https://aman-portfolio-sigma-eight.vercel.app/) · [GitHub profile](https://github.com/amananurag20) · [LinkedIn](https://www.linkedin.com/in/aman-anurag-a160441b7)

## Explore the portfolio

- `/` — experience, selected projects, AgentCore case study, technical toolkit, and an interactive queue playground.
- `/desk` — a selectable 3D developer desk, project demos, engineering walkthroughs, career milestones, and an optional 30-second tour.
- `/play` — Career Rush, an original Three.js runner with Recruiter and Endless modes. Skill discoveries link to the relevant desk project.

## Developer Desk

Four original, procedural devices connect the interaction to real work:

| Device | Work |
| --- | --- |
| Laptop | AgentCore: AI CRM, RAG, customer engagement, and human handoff |
| Phone | Virtual Focus Room: React Native/Expo and WebRTC collaboration |
| Monitor | Electron: native integration, desktop capture, offline sync, and POS experience |
| Server | AlgoCode: BullMQ/Redis queues, Docker execution, and result delivery |

Click a device or use the equivalent labeled buttons. Drag to orbit, use arrow keys to select, and choose **Focus device** for a closer view. The guided tour can be paused or ended. Motion can be turned off; the operating system’s reduced-motion preference is respected.

The device screens are illustrative navigation surfaces. Project screenshots and the existing Virtual Focus Room video are shown separately, with labels. Video loads only when opened. Architecture steps explain the implementation; they do not execute code or represent live production traffic.

### How it is built

- **Next.js App Router + React + TypeScript** for routes, content, state, and accessible controls.
- **Three.js** for the scene, original device geometry, camera, lighting, and raycast selection. The renderer is imported dynamically on the desk route.
- `src/components/desk/content.ts` holds project information, tour order, and career milestones.
- `DeveloperDesk.tsx` owns the tour, device selection, project details, video playback, and graphics lifecycle.
- `scene.ts` owns rendering and resource disposal. Geometry, materials, and textures are reused within the scene; pixel density is capped at 1.5.
- Animation stops when the desk is offscreen or the tab is hidden. Reduced motion uses on-demand rendering. WebGL failure leaves project controls, content, and contact links available.
- Local styles are scoped to the desk. Existing portfolio and game features remain accessible independently.

## Run locally

```bash
npm ci
npm run dev
```

Open the local address printed by Next.js, then visit `/desk` or `/play`.

```bash
npm run build
npm run test:runner
```

The runner checks cover physics, action guards, obstacle interactions, power-ups, scoring, deterministic frame-rate replay, and bounded endless generation. Build and logic checks are separate from browser playtesting and real-device performance measurements.
