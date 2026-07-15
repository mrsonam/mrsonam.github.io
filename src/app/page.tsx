import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AboutBento from "@/components/home/AboutBento";
import ExperienceSection from "@/components/home/ExperienceSection";
import Projects from "@/components/home/Projects";
import ContactFooter from "@/components/home/ContactFooter";
import { ContentErrorBanner } from "@/components/home/ContentErrorBanner";
import { getHomeContent } from "@/lib/content";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const revalidate = 60;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: getSiteUrl(),
  jobTitle: "Software Engineer",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressCountry: "AU",
  },
  sameAs: [
    "https://github.com/mrsonam",
    "https://www.linkedin.com/in/sonamsrp",
  ],
};

export default async function Home() {
  const { experiences, projects, loadError } = await getHomeContent();

  return (
    <div className="w-full flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
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
