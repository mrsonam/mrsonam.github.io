import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AboutBento from "@/components/home/AboutBento";
import ExperienceSection from "@/components/home/ExperienceSection";
import Projects from "@/components/home/Projects";
import ContactFooter from "@/components/home/ContactFooter";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <Hero />
      <AboutBento />
      <ExperienceSection />
      <Projects />
      <ContactFooter />
    </div>
  );
}
