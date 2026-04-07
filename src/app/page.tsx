import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AboutBento from "@/components/home/AboutBento";
import ExperienceSection from "@/components/home/ExperienceSection";
import Projects from "@/components/home/Projects";
import ContactFooter from "@/components/home/ContactFooter";
import { ContentErrorBanner } from "@/components/home/ContentErrorBanner";
import { getHomeContent } from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const { experiences, projects, loadError } = await getHomeContent();

  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <ContentErrorBanner message={loadError} />
      <Hero />
      <AboutBento />
      <ExperienceSection experiences={experiences} />
      <Projects projects={projects} />
      <ContactFooter />
    </div>
  );
}
