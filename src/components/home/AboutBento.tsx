"use client";

import { motion } from "framer-motion";

export default function AboutBento() {
  return (
    <section id="about" className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24 pb-32 md:pb-48">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-auto md:auto-rows-[300px]">
        
        {/* Core Story Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-2 md:row-span-2 relative bg-secondary p-8 md:p-12 flex flex-col justify-end border border-border/20"
        >
          <div className="relative z-10 space-y-6 max-w-xl">
            <h3 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase leading-[0.9]">The<br/>Journey.</h3>
            <p className="text-foreground/80 font-sans text-base md:text-lg">
              I began my software engineering journey in 2021 back in Nepal, rooted in frontend development and modern UI engineering. Since then, I&apos;ve evolved into building robust fullstack applications. In June 2024, I brought that passion across the world to Australia.
            </p>
            <p className="text-foreground/80 font-sans text-base md:text-lg">
              Currently pursuing my Master&apos;s in IT, I constantly blend academic theory with real-world technical execution.
            </p>
          </div>
        </motion.div>

        {/* Current Role Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative bg-secondary p-8 md:p-12 flex flex-col justify-between group border border-border/20 min-h-[250px] md:min-h-0"
        >
          <div className="text-primary transition-transform group-hover:scale-110 duration-300 origin-left">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><rect width="20" height="14" x="2" y="7" /><path d="M16 21V5h-4v16"/></svg>
          </div>
          <div>
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-primary uppercase">Current</span>
            <h4 className="text-2xl md:text-3xl font-display font-black tracking-tighter uppercase mt-2">Intern<br/>@ QX Tech</h4>
            <p className="mt-4 text-foreground/80 text-sm">
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
          className="relative bg-foreground text-background p-8 md:p-12 flex flex-col justify-between group min-h-[200px] md:min-h-0"
        >
          <div className="relative z-10 text-background transition-transform group-hover:translate-x-4 duration-300">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
          <div className="relative z-10">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-background/60 uppercase">June (Upcoming)</span>
            <h4 className="text-2xl md:text-3xl font-display font-black tracking-tighter uppercase mt-2">Available for roles</h4>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
