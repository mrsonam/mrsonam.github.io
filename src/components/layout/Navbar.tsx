"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-5 md:py-6 transition-all duration-300 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border py-4" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="text-xl font-display font-black tracking-tighter uppercase text-foreground">
        Sonam<span className="text-primary">.</span>
      </div>
      <ul className="flex items-center gap-4 md:gap-8 text-[10px] md:text-xs font-bold font-sans tracking-[0.15em] md:tracking-widest uppercase text-foreground">
        <li>
          <Link href="#about" className="hover:text-primary transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link href="#experience" className="hover:text-primary transition-colors hover:font-black">
            Experience
          </Link>
        </li>
        <li>
          <Link href="#projects" className="hover:text-primary transition-colors">
            Work
          </Link>
        </li>
      </ul>
    </motion.nav>
  );
}
