"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate offset from center of screen (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Glowing Orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-600/15 blur-[100px] dark:bg-blue-600/25 dark:blur-[120px]"
          animate={{
            x: mousePosition.x * 70,
            y: mousePosition.y * 70,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 20, mass: 0.5 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center space-y-8 mt-12">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400"
        >
          Sonam Wangdi Sherpa
        </motion.span>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Adapt.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-neutral-400 dark:text-neutral-600"
          >
            Unlearn.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Relearn.
          </motion.div>
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
        >
          From Nepal to Australia. My journey is defined by continuous growth, crafting premium digital experiences, and deeply embracing the evolving web ecosystem.
        </motion.p>
      </div>
    </section>
  );
}
