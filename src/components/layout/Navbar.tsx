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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? "py-3 px-6" : "py-4 px-8"
      } rounded-full border border-black/5 dark:border-white/5 bg-white/60 dark:bg-black/60 shadow-lg shadow-black/5 backdrop-blur-xl`}
    >
      <ul className="flex items-center gap-6 text-sm font-medium text-neutral-800 dark:text-neutral-200">
        <li>
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link href="#work" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Work
          </Link>
        </li>
      </ul>
    </motion.nav>
  );
}
