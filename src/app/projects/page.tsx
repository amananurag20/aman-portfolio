
"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3dcard";
import Image from "next/image";
import { LinkPreviewDemo } from "@/components/linkpreview";
import ProjectGallery from "@/components/ProjectGallery";

const courseManagementImages = [
  "/assests/project/course management/c1.png",
  "/assests/project/course management/c2.png",
  "/assests/project/course management/c3.png",
  "/assests/project/course management/c4.png",
  "/assests/project/course management/c5.png",
  "/assests/project/course management/c6.png",
  "/assests/project/course management/c7.png",
  "/assests/project/course management/c8.png",
  "/assests/project/course management/c10.png",
  "/assests/project/course management/c11.png",
  "/assests/project/course management/c12.png",
];

const projectIdxImages = [
  "/assests/project/project-idx/p0.png",
  "/assests/project/project-idx/p0.1.png",
  "/assests/project/project-idx/p0.3.png",
  "/assests/project/project-idx/p1.png",
  "/assests/project/project-idx/p2.png",
];

const peacefulMindImages = [
  "/assests/project/meditationapp/m1.png",
  "/assests/project/meditationapp/m2.png",
  "/assests/project/meditationapp/m3.png",
  "/assests/project/meditationapp/m4.png",
  "/assests/project/meditationapp/m5.png",
  "/assests/project/meditationapp/m6.png",
];

const algoCodeImages = [
  "/assests/project/algocode/a0.png",
  "/assests/project/algocode/a1.png",
  "/assests/project/algocode/a2.png",
];

const otherProjects = [
  {
    title: "Blog App (MERN)",
    description: "Full-stack blogging platform",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    links: [
      { name: "Frontend", url: "https://github.com/amananurag20/blog-frontend" },
      { name: "Backend", url: "https://github.com/amananurag20/blog-backend" }
    ]
  },
  {
    title: "Netflix GPT",
    description: "Netflix clone with AI recommendations",
    stack: ["React", "Redux", "OpenAI API"],
    links: [{ name: "GitHub", url: "https://github.com/amananurag20/netflix-gpt" }]
  },
  {
    title: "URL Shortener",
    description: "Modern URL shortening service",
    stack: ["Next.js", "Server Actions", "PostgreSQL"],
    links: [{ name: "GitHub", url: "https://github.com/amananurag20/url-shortner-nextjs" }]
  },
  {
    title: "CoinGecko Clone",
    description: "Crypto tracker using CoinGecko API",
    stack: ["React", "Chart.js", "API"],
    links: [{ name: "GitHub", url: "https://github.com/amananurag20/coingeko" }]
  },
  {
    title: "Hangman Game",
    description: "Classic word guessing game",
    stack: ["JavaScript", "HTML", "CSS"],
    links: [{ name: "GitHub", url: "https://github.com/amananurag20/hangman-5-game" }]
  },
  {
    title: "Ping Pong Game",
    description: "Browser-based Ping Pong",
    stack: ["JavaScript", "Canvas API"],
    links: [{ name: "GitHub", url: "https://github.com/amananurag20/ping-pong-game-javascript" }]
  },
  {
    title: "Tier List Maker",
    description: "Drag and drop tier list creator",
    stack: ["JavaScript", "Drag & Drop API"],
    links: [{ name: "GitHub", url: "https://github.com/amananurag20/tier-list-javascript" }]
  },
  {
    title: "Pokedex",
    description: "Pokemon encyclopedia application",
    stack: ["React", "PokeAPI"],
    links: [{ name: "GitHub", url: "https://github.com/amananurag20/pokedex" }]
  },
  {
    title: "Todo App (MERN)",
    description: "Task management application",
    stack: ["MERN Stack", "JWT Auth"],
    links: [{ name: "GitHub", url: "https://github.com/amananurag20/Todo-mern" }]
  },
  {
    title: "Tic Tac Toe",
    description: "Classic strategy game",
    stack: ["React", "Game Logic"],
    links: [{ name: "GitHub", url: "https://github.com/amananurag20/tictactoe-javascript" }]
  }
];

export default function Component() {
  return (
    <section className="w-full py-4 md:py-8 lg:py-12">
      <div className="container px-4 md:px-6">
        <div className="space-y-6">
          
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-700 pb-2">
            Top Projects
          </h2>

          <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-transparent dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Course Management System
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  React 19 | Node.js | MongoDB | Redux Toolkit | Docker | TailwindCSS
                </CardItem>

                <CardItem
                  translateZ="100"
                  rotateX={0}
                  rotateZ={-3}
                  className="w-full mt-4"
                >
                  <Image
                    src="/assests/project/course management/c2.png"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="Course Management System"
                  />
                </CardItem>

                <div className="flex justify-between items-center mt-6">
                  <CardItem translateZ={20}>
                    <ProjectGallery 
                      images={courseManagementImages} 
                      projectName="Course Management System" 
                    />
                  </CardItem>

                  <CardItem
                    translateZ={20}
                    translateX={40}
                    as="a"
                    href="https://github.com/amananurag20/course-management"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium dark:text-white hover:text-emerald-500 transition-colors"
                  >
                    <GitHubLogoIcon className="w-5 h-5" />
                    GitHub
                  </CardItem>
                </div>

                <CardItem translateZ="50" className="w-full mt-8">
                  <h3 className="text-sm font-bold text-neutral-600 dark:text-neutral-200 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                    Key Features & Technical Highlights:
                  </h3>
                  <div className="space-y-3">
                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">📚</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Comprehensive LMS Core</strong>
                      </div>
                      <p className="pl-6">Full-featured course management with enrollment system, structured video tutorials with progress tracking, and secure payment integration.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">💻</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Advanced Code Playground</strong>
                      </div>
                      <p className="pl-6">Integrated Monaco Editor with multi-language support. Executes code safely in sandboxed Docker containers via backend API.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">📝</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Interactive Study Tools</strong>
                      </div>
                      <p className="pl-6">Markdown-based note-taking system with PDF export functionality, plus real-time quiz engine with immediate feedback and scoring.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">📱</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Ed-Reels Platform</strong>
                      </div>
                      <p className="pl-6">TikTok-style educational short videos with swipeable interface, optimized for quick concept revision and mobile engagement.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">🔧</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Admin Dashboard & Analytics</strong>
                      </div>
                      <p className="pl-6">Powerful admin panel for content management, user administration, and detailed learning analytics with visual data representation.</p>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-transparent dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Cloud-Based IDE (Project IDX Clone)
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  React.js | Node.js | Docker | WebSocket | Monaco Editor | xterm.js
                </CardItem>

                <CardItem
                  translateZ="100"
                  rotateX={0}
                  rotateZ={-3}
                  className="w-full mt-4"
                >
                  <Image
                    src="/assests/project/project-idx/p0.png"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="Cloud-Based IDE"
                  />
                </CardItem>

                <div className="flex justify-between items-center mt-6">
                  <CardItem translateZ={20}>
                    <ProjectGallery 
                      images={projectIdxImages} 
                      projectName="Cloud-Based IDE" 
                    />
                  </CardItem>

                  <CardItem
                    translateZ={20}
                    translateX={40}
                    as="a"
                    href="https://github.com/amananurag20/Project-idx-react"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium dark:text-white hover:text-emerald-500 transition-colors"
                  >
                    <GitHubLogoIcon className="w-5 h-5" />
                    GitHub
                  </CardItem>
                </div>

                <CardItem translateZ="50" className="w-full mt-8">
                  <h3 className="text-sm font-bold text-neutral-600 dark:text-neutral-200 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                    Key Features & Technical Highlights:
                  </h3>
                  <div className="space-y-3">
                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">🐳</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Isolated Docker Environments</strong>
                      </div>
                      <p className="pl-6">Dynamically provisions secure Linux containers for each project using Dockerode, ensuring consistency and isolation.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">⚡</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Real-Time Terminal</strong>
                      </div>
                      <p className="pl-6">Full-featured in-browser terminal (xterm.js) connected via WebSockets, allowing shell command execution and server start-up.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">💻</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Pro-Level Code Editor</strong>
                      </div>
                      <p className="pl-6">Integrated Monaco Editor with syntax highlighting, synced in real-time with the container file system via custom watchers.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">🔄</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Live Application Preview</strong>
                      </div>
                      <p className="pl-6">Built-in browser component that proxies internal container ports, allowing users to view their running applications instantly.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">📂</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Full File System Control</strong>
                      </div>
                      <p className="pl-6">Real-time file explorer supporting CRUD operations, powered by Chokidar for instant sync between UI and backend.</p>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-transparent dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Peaceful Mind (Meditation App)
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  React Native | Expo | TypeScript | NativeWind | Expo AV
                </CardItem>
                
                <CardItem
                  translateZ="100"
                  rotateX={0}
                  rotateZ={-3}
                  className="w-full mt-4"
                >
                  <Image
                    src="/assests/project/meditationapp/m1.png"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="Peaceful Mind App"
                  />
                </CardItem>

                <div className="flex justify-between items-center mt-6">
                  <CardItem translateZ={20}>
                    <ProjectGallery 
                      images={peacefulMindImages} 
                      projectName="Peaceful Mind App" 
                    />
                  </CardItem>

                  <CardItem
                    translateZ={20}
                    translateX={40}
                    as="div"
                    className="flex gap-2"
                  >
                    <a
                      href="https://drive.google.com/file/d/1gl97lQOc9e8MN-eB3401Lx8oBBNN4MGi/view?usp=drivesdk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium dark:text-white hover:text-emerald-500 transition-colors"
                    >
                      <span className="text-lg">📱</span>
                      Download APK
                    </a>
                    <a
                      href="https://github.com/amananurag20/mindfullness-react-native-"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium dark:text-white hover:text-emerald-500 transition-colors"
                    >
                      <GitHubLogoIcon className="w-5 h-5" />
                      GitHub
                    </a>
                  </CardItem>
                </div>

                <CardItem translateZ="50" className="w-full mt-8">
                  <h3 className="text-sm font-bold text-neutral-600 dark:text-neutral-200 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                    Key Features & Technical Highlights:
                  </h3>
                  <div className="space-y-3">
                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">🎧</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Immersive Audio Engine</strong>
                      </div>
                      <p className="pl-6">Custom audio player built with expo-av supporting background playback, seamless looping, and synchronized countdown timers.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">🔔</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Smart Habit Building</strong>
                      </div>
                      <p className="pl-6">Robust local push notification system using expo-notifications to schedule personalized daily reminders and build consistency.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">📱</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Smooth Navigation</strong>
                      </div>
                      <p className="pl-6">Implemented file-based routing with Expo Router for a clean, scalable navigation structure and native-like transitions.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">📊</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Wellness Dashboard</strong>
                      </div>
                      <p className="pl-6">Visual dashboard displaying engagement metrics, active streaks, and curated meditation sessions for Sleep, Focus, and Anxiety.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">⚡</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Optimized Performance</strong>
                      </div>
                      <p className="pl-6">Built with Type-safe props and optimized asset loading for a fluid, lag-free user experience on both iOS and Android.</p>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-transparent dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  AlgoCode (Microservices Online Judge)
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  TypeScript | Fastify | Redis | Docker | Microservices | Socket.io
                </CardItem>
                <CardItem
                  translateZ="100"
                  rotateX={0}
                  rotateZ={-3}
                  className="w-full mt-4"
                >
                  <Image
                    src="/assests/project/algocode/a0.png"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="AlgoCode Platform"
                  />
                </CardItem>

                <div className="flex justify-between items-start mt-6">
                  <CardItem translateZ={20} className="self-center">
                    <ProjectGallery 
                      images={algoCodeImages} 
                      projectName="AlgoCode Platform" 
                    />
                  </CardItem>

                  <CardItem
                    translateZ={20}
                    translateX={40}
                    className="flex flex-col gap-2 items-end w-2/3"
                  >
                    <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1">Microservices Repos:</div>
                    <div className="flex flex-wrap justify-end gap-2">
                      <a href="https://github.com/amananurag20/amanCodeFrontend-master" className="flex items-center gap-1.5 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-[10px] hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-colors dark:text-neutral-300">
                        <GitHubLogoIcon className="w-3 h-3" /> Frontend
                      </a>
                      <a href="https://github.com/amananurag20/Algocode-SubmissionService" className="flex items-center gap-1.5 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-[10px] hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-colors dark:text-neutral-300">
                        <GitHubLogoIcon className="w-3 h-3" /> Submission
                      </a>
                      <a href="https://github.com/amananurag20/Algocode-Evaluator-Service" className="flex items-center gap-1.5 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-[10px] hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-colors dark:text-neutral-300">
                        <GitHubLogoIcon className="w-3 h-3" /> Evaluator
                      </a>
                      <a href="https://github.com/amananurag20/AlgoCode-Problem-Service" className="flex items-center gap-1.5 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-[10px] hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-colors dark:text-neutral-300">
                        <GitHubLogoIcon className="w-3 h-3" /> Problem
                      </a>
                      <a href="https://github.com/amananurag20/amanCode-Socket-Service" className="flex items-center gap-1.5 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-[10px] hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-colors dark:text-neutral-300">
                        <GitHubLogoIcon className="w-3 h-3" /> Socket
                      </a>
                    </div>
                  </CardItem>
                </div>

                <CardItem translateZ="50" className="w-full mt-8">
                  <h3 className="text-sm font-bold text-neutral-600 dark:text-neutral-200 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                    Key Features & Technical Highlights:
                  </h3>
                  <div className="space-y-3">
                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">🏗️</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Microservices Architecture</strong>
                      </div>
                      <p className="pl-6">Decoupled system with 4 specialized services (Submission, Problem, Evaluator, Socket) ensuring scalability and independent scaling.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">⚡</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Asynchronous Processing</strong>
                      </div>
                      <p className="pl-6">Robust submission pipeline using Redis & BullMQ to process code jobs asynchronously, preventing blocking under high load.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">🔒</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Sandboxed Execution</strong>
                      </div>
                      <p className="pl-6">Secure code runner using Docker containers to execute untrusted user code (C++, Java, Python) in isolated environments.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">🔄</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">Real-Time Feedback</strong>
                      </div>
                      <p className="pl-6">Integrated Socket.io to push live status updates ("Running", "Accepted", "TLE") from the backend to the client instantly.</p>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-500">🚀</span>
                        <strong className="text-neutral-700 dark:text-neutral-200">High-Performance API</strong>
                      </div>
                      <p className="pl-6">Submission Service built with Fastify to handle high-throughput API requests with minimal overhead.</p>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-8 border-b border-neutral-200 dark:border-neutral-700 pb-2">
              Other Noteworthy Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {otherProjects.map((project, index) => (
                <div 
                  key={index} 
                  className="flex flex-col p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all hover:shadow-lg group"
                >
                  <h3 className="text-lg font-bold text-neutral-700 dark:text-neutral-200 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 h-10 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-3">
                    {project.links.map((link, i) => (
                      <a 
                        key={i} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        <GitHubLogoIcon className="w-3.5 h-3.5" />
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}