import type { Experience, Project } from "@prisma/client";
import prisma from "@/lib/prisma";

export type ExperiencePublic = {
  id: string;
  dates: string;
  location: string | null;
  role: string;
  company: string;
  description: string;
  skills: string[];
};

export type ProjectPublic = {
  id: string;
  title: string;
  shortDescription: string;
  stack: string[];
  link?: string | null;
  github?: string | null;
  color: string;
  descriptionMarkdown: string;
  imagePath?: string | null;
};

export type HomeContent = {
  experiences: ExperiencePublic[];
  projects: ProjectPublic[];
  /** Set when the database read fails (wrong URL, outage, etc.). */
  loadError: string | null;
};

function mapExperience(row: Experience): ExperiencePublic {
  return {
    id: row.id,
    dates: row.datesDisplay,
    location: row.location,
    role: row.role,
    company: row.company,
    description: row.description,
    skills: row.skills,
  };
}

function mapProject(row: Project): ProjectPublic {
  return {
    id: row.id,
    title: row.title,
    shortDescription: row.shortDescription,
    stack: row.tech,
    link: row.websiteUrl,
    github: row.githubUrl,
    color: row.color,
    descriptionMarkdown: row.description,
    imagePath: row.imagePath,
  };
}

/** Fetches home page content in one round-trip; returns empty lists + message on failure. */
export async function getHomeContent(): Promise<HomeContent> {
  try {
    const [experienceRows, projectRows] = await Promise.all([
      prisma.experience.findMany({
        orderBy: { orderIndex: "asc" },
      }),
      prisma.project.findMany({
        orderBy: { orderIndex: "asc" },
      }),
    ]);
    return {
      experiences: experienceRows.map(mapExperience),
      projects: projectRows.map(mapProject),
      loadError: null,
    };
  } catch (e) {
    console.error("[content] getHomeContent failed:", e);
    return {
      experiences: [],
      projects: [],
      loadError:
        "Unable to load portfolio content. Please try again later.",
    };
  }
}
