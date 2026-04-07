"use client";

import { motion } from "framer-motion";

export default function AboutBento() {
  return (
    <section id="about" className="w-full max-w-6xl mx-auto px-6 py-24 pb-48">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        
        {/* Core Story Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-2 row-span-2 relative overflow-hidden rounded-[2rem] bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 p-8 flex flex-col justify-end"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div className="relative z-10 space-y-6 max-w-lg">
            <h3 className="text-3xl font-extrabold tracking-tight">The Journey.</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              I began my frontend development journey in 2021 back in Nepal, immersing myself in React and modern UI engineering. In June 2024, I brought that passion across the world to Australia.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              Currently pursuing my Master's in IT, I constantly blend academic theory with real-world technical execution.
            </p>
          </div>
        </motion.div>

        {/* Current Role Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative overflow-hidden rounded-[2rem] bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 p-8 flex flex-col justify-between group"
        >
          <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 transition-transform group-hover:scale-110 duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Current</span>
            <h4 className="text-2xl font-bold mt-2">Intern @ QX Tech</h4>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400">
              Refining my craft, architecting robust UIs, and learning the nuances of scalable production code.
            </p>
          </div>
        </motion.div>

        {/* Future Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative overflow-hidden rounded-[2rem] bg-blue-600 text-white p-8 flex flex-col justify-between group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
          
          <div className="relative z-10 w-14 h-14 rounded-full border border-white/20 bg-white/10 flex items-center justify-center backdrop-blur-sm transition-transform group-hover:-rotate-12 duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
          <div className="relative z-10">
            <span className="text-xs font-bold tracking-widest text-white/70 uppercase">June (Upcoming)</span>
            <h4 className="text-2xl font-bold mt-2">Available for full-time mid-level roles</h4>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
