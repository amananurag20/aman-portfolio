import { NextResponse } from 'next/server';

// ==========================================
// AMAN ANURAG - PORTFOLIO DATA
// ==========================================

const PROFILE = {
  name: "Aman Anurag",
  title: "Senior Full Stack Engineer",
  location: "New Delhi, India",
  email: "amananurag.20@gmail.com",
  github: "https://github.com/amananurag20",
  linkedin: "https://www.linkedin.com/in/aman-anurag-a160441b7",
  education: "B.Tech in Computer Science Engineering (CT University, 2020–2024) - CGPA: 8.67/10.0, Gold Medalist"
};

const SKILLS = {
  frontend: ["React.js", "Next.js", "TypeScript", "JavaScript", "React Native", "Tailwind CSS", "Material UI", "Radix UI", "Redux Toolkit", "Zustand"],
  backend: ["Node.js", "Express.js", "Fastify", "MongoDB", "PostgreSQL", "Prisma", "Redis", "RabbitMQ", "Socket.io", "WebRTC"],
  devops: ["Docker", "Electron.js", "AWS (EC2, ECS, S3)", "Jenkins", "CI/CD", "Code Signing", "App Notarization"],
  ai: ["OpenAI API", "LangChain", "LangGraph", "RAG Pipelines", "Embeddings", "Vector Search", "Pinecone", "Weaviate", "Hugging Face", "PyTorch", "TensorFlow", "ANN", "CNN", "Prompt Engineering", "AI Evaluation", "Human Handoff"]
};

const EXPERIENCES = [
  {
    period: "February 2026 - Present",
    title: "Senior Full Stack Developer",
    company: "Skyclad Ventures",
    location: "Dubai, UAE (Remote)",
    projects: [
      "Architected and built AgentCore, a multi-tenant AI CRM and customer-engagement suite with RAG knowledge, embeddable chat, lead scoring and routing, WhatsApp automation, voice agents, appointments, proposals, human handoff, and live operational dashboards",
      "Leading end-to-end development of Payment Center across 20+ payment and configuration workflows",
      "Built 30+ reusable React and TypeScript components, reducing repeated frontend effort by about 35%",
      "Designed and integrated 25+ APIs for payments, authentication, RBAC, payer data, audits, and operations",
      "Reduced frontend-backend integration issues by about 40% through shared contracts and validation patterns"
    ]
  },
  {
    period: "January 2023 - January 2026",
    title: "Full Stack Developer (Promoted from Intern)",
    company: "Klovertel Private Limited",
    location: "New Delhi, India",
    projects: [
      "Architected a MERN accommodation system with a React Native app serving 500+ daily users",
      "Built Trace Venue, an offline-first Electron desktop application with POS thermal printer integration",
      "Engineered LeadNest CRM for 10,000+ records with pipeline management, RBAC, exports, and fuzzy search",
      "Delivered real-time integrations spanning Twilio Voice, WhatsApp, Firebase, SignalR, and Socket.io"
    ]
  }
];

const PROJECTS = {
  top: [
    {
      name: "Virtual Focus Room",
      description: "Cross-platform virtual co-working product with WebRTC video and audio, screen sharing, collaborative whiteboards, file-enabled chat, tiered permissions, and productivity tools across web, desktop, and mobile",
      tech: ["React", "Electron.js", "React Native", "WebRTC", "Socket.io"],
      github: "https://github.com/amananurag20/Virtual-focus-room"
    },
    {
      name: "Course Management System (LMS)",
      description: "Comprehensive Learning Management System with Code Playground using Monaco Editor with Docker-based sandboxed execution, Ed-Reels for TikTok-style educational videos, interactive quizzes, and markdown note-taking with PDF export",
      tech: ["React 19", "Node.js", "MongoDB", "Redux Toolkit", "Docker", "TailwindCSS"],
      github: "https://github.com/amananurag20/course-management"
    },
    {
      name: "Cloud-Based IDE (Project IDX Clone)",
      description: "Full-stack browser-based development environment with dynamically provisioned Docker containers using Dockerode, real-time terminal via xterm.js connected through WebSockets, Monaco Editor with file system sync, and live app preview",
      tech: ["React.js", "Node.js", "Docker", "WebSocket", "Monaco Editor", "xterm.js"],
      github: "https://github.com/amananurag20/Project-idx-react"
    },
    {
      name: "Peaceful Mind (Meditation App)",
      description: "Cross-platform mobile app for mindfulness with custom audio engine built with Expo AV for background playback, local push notifications for habit building, and smooth native-like navigation using Expo Router",
      tech: ["React Native", "Expo", "TypeScript", "NativeWind", "Expo AV"],
      github: "https://github.com/amananurag20/mindfullness-react-native-",
      apk: "https://drive.google.com/file/d/1gl97lQOc9e8MN-eB3401Lx8oBBNN4MGi/view"
    },
    {
      name: "AlgoCode (Microservices Online Judge)",
      description: "Scalable microservices-based coding platform like LeetCode with 4 decoupled services, Redis & BullMQ for async processing, and sandboxed Docker execution for C++, Java, Python",
      tech: ["TypeScript", "Fastify", "Redis", "Docker", "Microservices", "Socket.io"],
      repos: {
        frontend: "https://github.com/amananurag20/amanCodeFrontend-master",
        submission: "https://github.com/amananurag20/Algocode-SubmissionService",
        evaluator: "https://github.com/amananurag20/Algocode-Evaluator-Service",
        problem: "https://github.com/amananurag20/AlgoCode-Problem-Service",
        socket: "https://github.com/amananurag20/amanCode-Socket-Service"
      }
    }
  ],
  other: [
    { name: "Blog App (MERN)", description: "Full-stack blogging platform", tech: ["MongoDB", "Express", "React", "Node.js"], github: { frontend: "https://github.com/amananurag20/blog-frontend", backend: "https://github.com/amananurag20/blog-backend" } },
    { name: "Netflix GPT", description: "Netflix clone with AI recommendations", tech: ["React", "Redux", "OpenAI API"], github: "https://github.com/amananurag20/netflix-gpt" },
    { name: "URL Shortener", description: "Modern URL shortening service", tech: ["Next.js", "Server Actions", "PostgreSQL"], github: "https://github.com/amananurag20/url-shortner-nextjs" },
    { name: "CoinGecko Clone", description: "Crypto tracker using CoinGecko API", tech: ["React", "Chart.js", "API"], github: "https://github.com/amananurag20/coingeko" },
    { name: "Hangman Game", description: "Classic word guessing game", tech: ["JavaScript", "HTML", "CSS"], github: "https://github.com/amananurag20/hangman-5-game" },
    { name: "Ping Pong Game", description: "Browser-based Ping Pong", tech: ["JavaScript", "Canvas API"], github: "https://github.com/amananurag20/ping-pong-game-javascript" },
    { name: "Tier List Maker", description: "Drag and drop tier list creator", tech: ["JavaScript", "Drag & Drop API"], github: "https://github.com/amananurag20/tier-list-javascript" },
    { name: "Pokedex", description: "Pokemon encyclopedia application", tech: ["React", "PokeAPI"], github: "https://github.com/amananurag20/pokedex" },
    { name: "Todo App (MERN)", description: "Task management application", tech: ["MERN Stack", "JWT Auth"], github: "https://github.com/amananurag20/Todo-mern" },
    { name: "Tic Tac Toe", description: "Classic strategy game", tech: ["React", "Game Logic"], github: "https://github.com/amananurag20/tictactoe-javascript" }
  ]
};

// Suggested questions for each topic
const SUGGESTED_QUESTIONS = {
  greeting: [
    "What's your work experience?",
    "What projects have you built?",
    "What are your technical skills?",
    "How can I contact you?"
  ],
  about: [
    "Tell me about your projects",
    "What technologies do you work with?",
    "Are you available for hire?",
    "What's your work experience?"
  ],
  contact: [
    "Tell me about yourself",
    "What projects have you built?",
    "Are you available for hire?",
    "What are your skills?"
  ],
  experience: [
    "What projects have you built?",
    "Tell me about your frontend skills",
    "Tell me about your backend skills",
    "How can I contact you?"
  ],
  skills: [
    "Tell me about your React experience",
    "Tell me about your Node.js experience",
    "What projects have you built?",
    "Are you available for hire?"
  ],
  projects: [
    "Tell me about your work experience",
    "What technologies do you use?",
    "Tell me about Docker and DevOps",
    "How can I contact you?"
  ],
  education: [
    "What's your work experience?",
    "What projects have you built?",
    "What are your technical skills?",
    "Are you available for hire?"
  ],
  frontend: [
    "Tell me about your backend skills",
    "What projects use React?",
    "Tell me about your work experience",
    "Are you available for hire?"
  ],
  backend: [
    "Tell me about your frontend skills",
    "Tell me about Docker and DevOps",
    "What projects have you built?",
    "How can I contact you?"
  ],
  devops: [
    "Tell me about your projects",
    "What's your work experience?",
    "Tell me about your backend skills",
    "Are you available for hire?"
  ],
  hire: [
    "What's your work experience?",
    "What projects have you built?",
    "What are your technical skills?",
    "Tell me about yourself"
  ],
  default: [
    "Tell me about yourself",
    "What's your work experience?",
    "What projects have you built?",
    "What are your technical skills?"
  ]
};

// ==========================================
// RESPONSE MATCHING LOGIC
// ==========================================

interface ResponseWithSuggestions {
  text: string;
  suggestions: string[];
}

function findResponse(message: string): ResponseWithSuggestions {
  const lowerMessage = message.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|hola|namaste|greetings)/i.test(lowerMessage)) {
    return {
      text: `👋 Hello! I'm **Aman Anurag**, a Senior Full Stack Engineer with 4+ years of experience building scalable web, mobile, desktop, real-time, and AI-powered products.\n\nFeel free to ask me about:\n- 💼 My work experience\n- 🛠️ Technical skills\n- 🚀 Projects I've built\n- 📬 How to contact me\n\nWhat would you like to know?`,
      suggestions: SUGGESTED_QUESTIONS.greeting
    };
  }

  // Who are you / Introduction
  if (/who (are you|is aman)|about yourself|introduce|tell me about you/i.test(lowerMessage)) {
    return {
      text: `I'm **${PROFILE.name}**, a ${PROFILE.title} based in ${PROFILE.location}. I build scalable product and platform experiences across web, mobile, desktop, real-time systems, and applied AI.\n\n🎓 **Education:** ${PROFILE.education}\n\nAt **Skyclad Ventures**, I architected **AgentCore**, a multi-tenant AI CRM and customer-engagement suite spanning RAG knowledge, website chat, WhatsApp, voice agents, leads, appointments, proposals, and human handoff. I also lead end-to-end Payment Center delivery across frontend architecture, backend integrations, API contracts, RBAC, audit flows, and releases. Previously, I spent three years at **Klovertel Private Limited** building CRM, hospitality, fleet, analytics, mobile, and desktop products.\n\n📧 Email: ${PROFILE.email}\n🔗 [GitHub](${PROFILE.github}) | [LinkedIn](${PROFILE.linkedin})`,
      suggestions: SUGGESTED_QUESTIONS.about
    };
  }

  // Contact Information
  if (/contact|email|reach|connect|linkedin|github/i.test(lowerMessage)) {
    return {
      text: `📬 **Contact Information:**\n\n- 📧 **Email:** ${PROFILE.email}\n- 💻 **GitHub:** [${PROFILE.github}](${PROFILE.github})\n- 💼 **LinkedIn:** [${PROFILE.linkedin}](${PROFILE.linkedin})\n\nFeel free to reach out! I'm always open to discussing new opportunities and interesting projects.`,
      suggestions: SUGGESTED_QUESTIONS.contact
    };
  }

  // Experience
  if (/experience|work|job|career|company|skyclad|agentcore|ai crm|whatsapp|payment center|klovertel|appypay|leadnest|trace venue|supra/i.test(lowerMessage)) {
    let response = `💼 **My Professional Experience:**\n\n`;
    EXPERIENCES.forEach(exp => {
      response += `### ${exp.title} at ${exp.company}\n`;
      response += `📍 ${exp.location} | 📅 ${exp.period}\n\n`;
      response += `**Key Contributions:**\n`;
      exp.projects.slice(0, 4).forEach(proj => {
        response += `- ${proj}\n`;
      });
      response += `\n`;
    });
    return {
      text: response,
      suggestions: SUGGESTED_QUESTIONS.experience
    };
  }

  // Skills
  if (/skill|technology|tech stack|what (do you|can you) (know|use)/i.test(lowerMessage)) {
    return {
      text: `🛠️ **My Technical Skills:**\n\n**💻 Frontend:**\n${SKILLS.frontend.join(", ")}\n\n**🔧 Backend:**\n${SKILLS.backend.join(", ")}\n\n**☁️ DevOps & Tools:**\n${SKILLS.devops.join(", ")}\n\n**🤖 AI & ML:**\n${SKILLS.ai.join(", ")}`,
      suggestions: SUGGESTED_QUESTIONS.skills
    };
  }

  // Projects
  if (/project|portfolio|built|created|developed|lms|ide|algocode|meditation/i.test(lowerMessage)) {
    let response = `🚀 **My Notable Projects:**\n\n`;

    PROJECTS.top.forEach((proj: any) => {
      response += `---\n\n`;
      response += `📁 **${proj.name}**\n\n`;
      response += `${proj.description}\n\n`;
      response += `**🛠️ Tech Stack:** ${proj.tech.join(", ")}\n\n`;

      if (proj.github) {
        response += `🔗 **GitHub:** [View Repository](${proj.github})\n`;
      }
      if (proj.apk) {
        response += `📱 **Download APK:** [Get App](${proj.apk})\n`;
      }
      if (proj.repos) {
        response += `🔗 **Microservices Repos:**\n`;
        response += `- [Frontend](${proj.repos.frontend})\n`;
        response += `- [Submission Service](${proj.repos.submission})\n`;
        response += `- [Evaluator Service](${proj.repos.evaluator})\n`;
        response += `- [Problem Service](${proj.repos.problem})\n`;
        response += `- [Socket Service](${proj.repos.socket})\n`;
      }
      response += `\n`;
    });

    response += `---\n\n**🎯 Other Projects:** Blog App, Netflix GPT, URL Shortener, CoinGecko Clone, Pokedex, and more!\n`;
    response += `\n📂 View all projects on my [GitHub Profile](${PROFILE.github})`;

    return {
      text: response,
      suggestions: SUGGESTED_QUESTIONS.projects
    };
  }

  // Education
  if (/education|degree|college|university|study|qualification/i.test(lowerMessage)) {
    return {
      text: `🎓 **Education:**\n\n**B.Tech in Computer Science Engineering**\nCT University (2020–2024)\n📊 CGPA: 8.67/10.0\n🏅 Gold Medalist for the highest CGPA in the School of Engineering & Technology`,
      suggestions: SUGGESTED_QUESTIONS.education
    };
  }

  // React/Frontend specific
  if (/react|next\.?js|frontend|ui|component/i.test(lowerMessage)) {
    return {
      text: `⚛️ **Frontend Expertise:**\n\nI have extensive experience with **React.js**, **Next.js**, and **TypeScript**, including:\n\n- Building reusable product systems with Redux Toolkit and Zustand\n- UI libraries including Material UI, Tailwind CSS, and Radix UI\n- Data-heavy dashboards, complex workflows, and real-time interfaces\n- Cross-platform mobile applications with React Native\n\n**Recent Work:** Built 30+ reusable React and TypeScript components for Payment Center, reducing repeated frontend effort by about 35%.`,
      suggestions: SUGGESTED_QUESTIONS.frontend
    };
  }

  // Backend specific
  if (/node|express|backend|api|database|mongodb|postgres/i.test(lowerMessage)) {
    return {
      text: `🔧 **Backend Expertise:**\n\nI specialize in building scalable backend systems:\n\n- **Node.js** with Express.js and Fastify\n- **Databases:** MongoDB, PostgreSQL, Prisma, and Redis\n- **Real-time:** WebRTC, Socket.io, SignalR, and RabbitMQ\n- **Security:** JWT authentication, RBAC, validation, audit trails, and secure APIs\n\n**Recent Work:** Designed and integrated 25+ APIs for payments, authentication, RBAC, payer data management, audit flows, and operational settings.`,
      suggestions: SUGGESTED_QUESTIONS.backend
    };
  }

  // Docker/DevOps
  if (/docker|devops|deploy|kubernetes|aws|cloud/i.test(lowerMessage)) {
    return {
      text: `☁️ **DevOps & Infrastructure:**\n\nI have hands-on experience with:\n\n- **Containerization:** Docker, Docker Compose, and Dockerode\n- **Cloud:** AWS EC2, ECS/Fargate, ECR, S3, IAM, and CloudWatch\n- **Delivery:** Jenkins and CI/CD pipelines\n- **Desktop releases:** code signing, notarization, and auto-update systems\n\nI have deployed containerized Node.js services on ECS and built production Electron applications with offline-first synchronization.`,
      suggestions: SUGGESTED_QUESTIONS.devops
    };
  }

  // Hire / Available
  if (/hire|available|opportunity|job|position|work with|freelance/i.test(lowerMessage)) {
    return {
      text: `🎯 I'm currently a **Senior Full Stack Developer at Skyclad Ventures** and always interested in ambitious products, high-ownership engineering roles, and challenging technical conversations.\n\n**Best way to reach me:**\n📧 ${PROFILE.email}\n💼 [LinkedIn](${PROFILE.linkedin})\n\nLet's connect and discuss how I can contribute to your team.`,
      suggestions: SUGGESTED_QUESTIONS.hire
    };
  }

  // Default response
  return {
    text: `Thanks for your question! I'm **Aman Anurag**, a Senior Full Stack Engineer.\n\nI can tell you about:\n- 💼 **Experience** - My work at Skyclad Ventures and Klovertel\n- 🛠️ **Skills** - React, Node.js, TypeScript, AI, Docker, AWS, and more\n- 🚀 **Projects** - Virtual Focus Room, LMS, Cloud IDE, and AlgoCode\n- 📬 **Contact** - How to reach me\n\nWhat would you like to know more about?`,
    suggestions: SUGGESTED_QUESTIONS.default
  };
}

// ==========================================
// API ROUTE HANDLERS
// ==========================================

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    const { text, suggestions } = findResponse(message);

    return NextResponse.json({
      response: text,
      suggestedQuestions: suggestions,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: 'Server error', details: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "online",
    message: "Aman Anurag's Portfolio Assistant API is ready",
    version: "2.0.0"
  });
}
