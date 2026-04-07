export type ProjectType = {
  id: string;
  title: string;
  shortDescription: string;
  stack: string[];
  link?: string;
  github?: string;
  color: string;
  details: {
    problem: string;
    solution: string;
    outcome: string;
  };
};

export const projects: ProjectType[] = [
  {
    id: "conscious-spending-plan",
    title: "Conscious Spending Plan",
    shortDescription: "Obsidian Ledger UI Migration & Core Re-architecture.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    link: "https://concious-spending.vercel.app",
    color: "from-blue-900 to-slate-900", // A dark, sophisticated vibe representing Obsidian
    details: {
      problem: "Users needed a friction-free way to manage complex non-cash account operations without being overwhelmed by standard, bright analytical dashboards.",
      solution: "Migrated the entire interface to a custom 'Obsidian Ledger' dark mode design system. Replaced hardcoded values with fluid, semantic CSS variables and implemented robust category validation schemas.",
      outcome: "Delivered a visually striking, highly accessible financial dashboard that prioritizes cognitive ease, data legibility, and a distinctly premium user experience."
    }
  },
  {
    id: "soilmates-pwa",
    title: "Soilmates",
    shortDescription: "A fully offline-capable Digital Greenhouse PWA.",
    stack: ["React", "TypeScript", "Framer Motion", "PWA"],
    github: "https://github.com/mrsonam", // Generic link since it's not in the fetched repos
    color: "from-emerald-900 to-emerald-950", // A deep botanical green vibe
    details: {
      problem: "Plant care applications are typically bloated and fail to account for offline scenarios or varying ambient light environments in real-world use.",
      solution: "Engineered a dual-aesthetic system ('Botanical Solarium' light mode / 'Midnight Conservatory' dark mode) with a custom 'Resting' offline state. Architected the dashboard purely around actionable tasks.",
      outcome: "Shipped a lightweight, highly-performant Progressive Web App featuring optimized CSS animations and a flawless mobile-first floating dock UI."
    }
  },
  {
    id: "socket-chat",
    title: "Real-time Chat Ecosystem",
    shortDescription: "A low-latency WebSocket communication platform.",
    stack: ["React", "Socket.io", "TypeScript", "Ant Design"],
    github: "https://github.com/mrsonam/chat-app-react-socket.io-antd",
    color: "from-indigo-900 to-purple-900",
    details: {
      problem: "Building low-latency, state-heavy communication interfaces often leads to massive prop-drilling, UI blocking, and terrible multi-client synchronization.",
      solution: "Architected a real-time event-driven chat system utilizing WebSockets for instant message delivery, wrapped cleanly in a highly structured Ant Design interface to separate logic from presentation.",
      outcome: "Created a highly performant communication network capable of instantaneous state resolution across multiple clients without dropping connection integrity."
    }
  }
];
