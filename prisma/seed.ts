import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Set DATABASE_URL or DIRECT_URL for seeding.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPasscode = await bcrypt.hash("000000", 12);
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      passcodeHash: hashedPasscode,
    },
  });
  console.log("✅ Admin settings seeded (default passcode: 000000)");

  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();

  const experiences = [
    {
      company: "QX Tech",
      role: "Intern",
      employmentType: "Internship",
      startDate: "Mar 2026",
      endDate: "Present",
      datesDisplay: "Mar 2026 - Present",
      location: "Canberra, ACT, Australia · On-site",
      description:
        "Refining my craft, architecting robust UIs, and learning the nuances of scalable production code and agentic workflows.",
      skills: [
        "Next.js",
        "Prompt Writing",
        "Agentic Workflows",
        "Tailwind CSS",
      ],
      orderIndex: 0,
    },
    {
      company: "EKbana Solutions Pte. Ltd",
      role: "Associate Frontend Developer",
      employmentType: "Full-time",
      startDate: "Dec 2021",
      endDate: "May 2024",
      datesDisplay: "Dec 2021 - May 2024",
      location: "Nepal",
      description:
        "Spearheaded frontend development across multiple client projects. Worked extensively with React and Next.js to deliver high-performance, responsive web interfaces, seamlessly integrating complex REST APIs for dynamic features.",
      skills: [
        "Next.js",
        "React.js",
        "JavaScript",
        "API Integration",
        "Responsive Web Design",
      ],
      orderIndex: 1,
    },
    {
      company: "EKbana Solutions Pte. Ltd",
      role: "Frontend Intern",
      employmentType: "Internship",
      startDate: "Sep 2021",
      endDate: "Dec 2021",
      datesDisplay: "Sep 2021 - Dec 2021",
      location: "Lalitpur District, Nepal",
      description:
        "Gained hands-on foundational skills in modern web development. Assisted senior engineers in building modular UI components and laid the groundwork for my professional software engineering career.",
      skills: ["HTML", "CSS", "JavaScript", "Web Development"],
      orderIndex: 2,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log(`✅ ${experiences.length} experiences seeded`);

  const projects = [
    {
      title: "Conscious Spending Plan",
      shortDescription:
        "Obsidian Ledger UI Migration & Core Re-architecture.",
      description:
        "**Obsidian Ledger UI Migration & Core Re-architecture.**\n\n### Problem\nUsers needed a friction-free way to manage complex non-cash account operations without being overwhelmed by standard, bright analytical dashboards.\n\n### Solution\nMigrated the entire interface to a custom 'Obsidian Ledger' dark mode design system. Replaced hardcoded values with fluid, semantic CSS variables and implemented robust category validation schemas.\n\n### Outcome\nDelivered a visually striking, highly accessible financial dashboard that prioritizes cognitive ease, data legibility, and a distinctly premium user experience.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      websiteUrl: "https://concious-spending.vercel.app",
      githubUrl: null,
      imagePath: null,
      color: "from-blue-900 to-slate-900",
      orderIndex: 0,
    },
    {
      title: "Soilmates",
      shortDescription: "A fully offline-capable Digital Greenhouse PWA.",
      description:
        "**A fully offline-capable Digital Greenhouse PWA.**\n\n### Problem\nPlant care applications are typically bloated and fail to account for offline scenarios or varying ambient light environments in real-world use.\n\n### Solution\nEngineered a dual-aesthetic system ('Botanical Solarium' light mode / 'Midnight Conservatory' dark mode) with a custom 'Resting' offline state. Architected the dashboard purely around actionable tasks.\n\n### Outcome\nShipped a lightweight, highly-performant Progressive Web App featuring optimized CSS animations and a flawless mobile-first floating dock UI.",
      tech: ["React", "TypeScript", "Framer Motion", "PWA"],
      websiteUrl: null,
      githubUrl: "https://github.com/mrsonam",
      imagePath: null,
      color: "from-emerald-900 to-emerald-950",
      orderIndex: 1,
    },
    {
      title: "Real-time Chat Ecosystem",
      shortDescription: "A low-latency WebSocket communication platform.",
      description:
        "**A low-latency WebSocket communication platform.**\n\n### Problem\nBuilding low-latency, state-heavy communication interfaces often leads to massive prop-drilling, UI blocking, and terrible multi-client synchronization.\n\n### Solution\nArchitected a real-time event-driven chat system utilizing WebSockets for instant message delivery, wrapped cleanly in a highly structured Ant Design interface to separate logic from presentation.\n\n### Outcome\nCreated a highly performant communication network capable of instantaneous state resolution across multiple clients without dropping connection integrity.",
      tech: ["React", "Socket.io", "TypeScript", "Ant Design"],
      websiteUrl: null,
      githubUrl: "https://github.com/mrsonam/chat-app-react-socket.io-antd",
      imagePath: null,
      color: "from-indigo-900 to-purple-900",
      orderIndex: 2,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`✅ ${projects.length} projects seeded`);

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
