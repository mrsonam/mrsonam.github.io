import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AboutBento from "@/components/home/AboutBento";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <Hero />
      <AboutBento />
    </div>
  );
}
