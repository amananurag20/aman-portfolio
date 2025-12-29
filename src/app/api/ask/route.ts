import { NextResponse } from 'next/server';

// ==========================================
// AMAN ANURAG - PORTFOLIO DATA
// ==========================================

const PROFILE = {
  name: "Aman Anurag",
  title: "Full Stack Developer",
  location: "India",
  email: "amananurag.20@gmail.com",
  github: "https://github.com/amananurag20",
  linkedin: "https://www.linkedin.com/in/aman-anurag-a160441b7",
  education: "B.Tech in Computer Science (CT University, 2020–2024) - CGPA: 8.02"
};

const SKILLS = {
  frontend: ["React.js", "Next.js 13/14", "TypeScript", "JavaScript (ES6+)", "React Native (Expo)", "TailwindCSS", "Material-UI", "Framer Motion", "Redux Toolkit", "Zustand", "TanStack Table"],
  backend: ["Node.js", "Express.js", "Fastify", "Hono", "MongoDB", "PostgreSQL", "Redis", "Socket.IO", "SignalR"],
  devops: ["Docker", "Electron.js", "AWS (EC2, S3)", "Vercel", "GitHub Actions", "Nginx"],
  ai: ["TensorFlow.js", "MediaPipe", "Gemini API", "OpenAI API"]
};

const EXPERIENCES = [
  {
    period: "January 2024 - Present",
    title: "Full Stack Developer",
    company: "Klovertel Private Limited",
    location: "New Delhi, India",
    projects: [
      "Trace Venue - Cross-platform desktop application using Electron.js for venue and accommodation management with offline-first architecture",
      "LeadNest CRM - Full-featured CRM platform with dynamic form builder, rule-based automation, real-time notifications using SignalR, and multi-stage lead pipeline management",
      "Drag-and-drop form builder with 15+ field types, multi-step form support, iframe/script embedding",
      "Visual rule builder for lead automation workflows with condition-based triggers",
      "Real-time push notifications with SignalR featuring auto-reconnection and token-based authentication",
      "Role-based access control (RBAC) with granular permissions, team hierarchy management, and audit logging"
    ]
  },
  {
    period: "July 2023 - January 2024",
    title: "Full Stack Developer",
    company: "Klovertel Private Limited",
    location: "New Delhi, India",
    projects: [
      "AppyPay (Digital Payment Platform) - Designed responsive merchant dashboard using Material-UI, implemented dynamic theming system reducing code redundancy by 40%",
      "Merchant registration system with Redux Toolkit for payment method integration, bank account validation, and KYC verification - reduced onboarding time by 35%",
      "Supra.tools - Dynamic product analytics dashboard using Next.js with interactive charts, reduced data analysis time by 40%"
    ]
  },
  {
    period: "Jan 2023 - June 2023",
    title: "Software Developer Intern",
    company: "Klovertel Private Limited",
    location: "New Delhi, India",
    projects: [
      "Developed RESTful APIs using Node.js, Express.js and React, improving operational efficiency by 30%",
      "Enhanced search functionality with debouncing techniques reducing API calls by 60%",
      "Implemented real-time updates via Socket.IO and email notifications using Nodemailer",
      "Optimized image uploads with Cloudinary, resulting in 25% reduction in system response time"
    ]
  }
];

const PROJECTS = {
  top: [
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
      text: `👋 Hello! I'm **Aman Anurag**, a Full Stack Developer specializing in scalable web applications, microservices architecture, and cross-platform development.\n\nFeel free to ask me about:\n- 💼 My work experience\n- 🛠️ Technical skills\n- 🚀 Projects I've built\n- 📬 How to contact me\n\nWhat would you like to know?`,
      suggestions: SUGGESTED_QUESTIONS.greeting
    };
  }

  // Who are you / Introduction
  if (/who (are you|is aman)|about yourself|introduce|tell me about you/i.test(lowerMessage)) {
    return {
      text: `I'm **${PROFILE.name}**, a ${PROFILE.title} based in ${PROFILE.location}. I specialize in building scalable web applications, microservices architecture, and cross-platform mobile development.\n\n🎓 **Education:** ${PROFILE.education}\n\nCurrently working at **Klovertel Private Limited** where I've built enterprise applications like LeadNest CRM, Trace Venue, and AppyPay.\n\n📧 Email: ${PROFILE.email}\n🔗 [GitHub](${PROFILE.github}) | [LinkedIn](${PROFILE.linkedin})`,
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
  if (/experience|work|job|career|company|klovertel|appypay|leadnest|trace venue|supra/i.test(lowerMessage)) {
    let response = `💼 **My Professional Experience:**\n\n`;
    EXPERIENCES.forEach(exp => {
      response += `### ${exp.title} at ${exp.company}\n`;
      response += `📍 ${exp.location} | 📅 ${exp.period}\n\n`;
      response += `**Key Contributions:**\n`;
      exp.projects.slice(0, 3).forEach(proj => {
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
      text: `🎓 **Education:**\n\n**B.Tech in Computer Science**\nCT University (2020–2024)\n📊 CGPA: 8.02`,
      suggestions: SUGGESTED_QUESTIONS.education
    };
  }

  // React/Frontend specific
  if (/react|next\.?js|frontend|ui|component/i.test(lowerMessage)) {
    return {
      text: `⚛️ **Frontend Expertise:**\n\nI have extensive experience with **React.js** and **Next.js 13/14**, including:\n\n- Building dynamic dashboards with TanStack Table and interactive charts\n- State management with Redux Toolkit and Zustand\n- UI libraries: Material-UI, TailwindCSS, Framer Motion\n- Cross-platform mobile apps with React Native & Expo\n\n**Recent Work:** LeadNest CRM features a drag-and-drop form builder with 15+ field types and real-time notifications using SignalR.`,
      suggestions: SUGGESTED_QUESTIONS.frontend
    };
  }

  // Backend specific
  if (/node|express|backend|api|database|mongodb|postgres/i.test(lowerMessage)) {
    return {
      text: `🔧 **Backend Expertise:**\n\nI specialize in building scalable backend systems:\n\n- **Node.js** with Express.js, Fastify, and Hono\n- **Databases:** MongoDB, PostgreSQL, Redis for caching & queues\n- **Real-time:** Socket.IO, SignalR for live updates\n- **Auth:** JWT, NextAuth.js, Clerk, OAuth 2.0\n\n**Recent Work:** Built RESTful APIs for LeadNest CRM and AppyPay, handling complex workflows like KYC verification and multi-stage lead pipelines.`,
      suggestions: SUGGESTED_QUESTIONS.backend
    };
  }

  // Docker/DevOps
  if (/docker|devops|deploy|kubernetes|aws|cloud/i.test(lowerMessage)) {
    return {
      text: `☁️ **DevOps & Infrastructure:**\n\nI have hands-on experience with:\n\n- **Containerization:** Docker, Docker Compose, Dockerode\n- **Desktop Apps:** Electron.js for cross-platform applications\n- **Cloud:** AWS (EC2, S3), Vercel, Render\n- **CI/CD:** GitHub Actions\n\n**Recent Work:** Built Trace Venue - a cross-platform desktop app using Electron.js with offline-first architecture and local database synchronization.`,
      suggestions: SUGGESTED_QUESTIONS.devops
    };
  }

  // Hire / Available
  if (/hire|available|opportunity|job|position|work with|freelance/i.test(lowerMessage)) {
    return {
      text: `🎯 **Yes, I'm open to opportunities!**\n\nI'm currently working as a Full Stack Developer but always interested in discussing:\n\n- 💼 Full-time positions\n- 🤝 Freelance projects\n- 🚀 Exciting tech challenges\n\n**Best way to reach me:**\n📧 ${PROFILE.email}\n💼 [LinkedIn](${PROFILE.linkedin})\n\nLet's connect and discuss how I can contribute to your team!`,
      suggestions: SUGGESTED_QUESTIONS.hire
    };
  }

  // Default response
  return {
    text: `Thanks for your question! I'm **Aman Anurag**, a Full Stack Developer.\n\nI can tell you about:\n- 💼 **Experience** - My work at Klovertel Private Limited\n- 🛠️ **Skills** - React, Node.js, TypeScript, Docker, and more\n- 🚀 **Projects** - LMS, Cloud IDE, AlgoCode, and more\n- 📬 **Contact** - How to reach me\n\nWhat would you like to know more about?`,
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