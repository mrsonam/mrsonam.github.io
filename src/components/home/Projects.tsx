"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/projects";
import { X, ExternalLink, Code2, ArrowUpRight } from "lucide-react";

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    if (selectedId) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedId]);

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-8 py-32 relative">
      <div className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b border-border pb-8 md:pb-12">
        <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none text-foreground">
          Featured<br/>Work.
        </h2>
        <p className="text-foreground/70 max-w-sm text-xs md:text-sm font-sans tracking-widest uppercase md:text-right">
          Selected projects demonstrating rigorous architecture & production-ready UX.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setSelectedId(project.id)}
            className="cursor-pointer border border-border bg-background hover:bg-secondary transition-colors duration-300 group flex flex-col"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Project Cover Block */}
            <motion.div layoutId={`cover-${project.id}`} className="h-48 md:h-64 w-full bg-foreground relative flex items-center justify-center overflow-hidden shrink-0">
               <motion.span layoutId={`title-cover-${project.id}`} className="text-background font-display font-black text-4xl md:text-6xl tracking-tighter uppercase p-6 md:p-8 text-center mix-blend-difference">
                 {project.title.split(" ")[0]}
               </motion.span>
               <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>

            <motion.div layoutId={`content-${project.id}`} className="p-6 md:p-8 flex flex-col flex-grow">
              <motion.h3 layoutId={`title-${project.id}`} className="text-2xl md:text-3xl font-display font-black tracking-tighter uppercase mb-4">
                {project.title}
              </motion.h3>
              <motion.p layoutId={`desc-${project.id}`} className="text-foreground/70 font-sans text-sm md:text-base mb-6 md:mb-8 flex-grow">
                {project.shortDescription}
              </motion.p>
              
              <motion.div layoutId={`tags-${project.id}`} className="flex flex-wrap gap-2 mt-auto">
                {project.stack.slice(0, 3).map(tech => (
                  <span key={tech} className="bg-foreground text-background text-[9px] md:text-[10px] font-bold tracking-widest uppercase px-2 py-1 md:px-3 md:py-1.5">
                    {tech}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Modal State */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[100]"
              onClick={() => setSelectedId(null)}
            />
            
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 md:py-12 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedProject.id}`}
                className="w-full h-full max-w-7xl max-h-screen bg-background border border-border pointer-events-auto flex flex-col overflow-hidden"
                style={{ originX: 0.5, originY: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                
                {/* Modal Header Cover */}
                <motion.div layoutId={`cover-${selectedProject.id}`} className="relative w-full h-40 md:h-72 bg-foreground shrink-0 flex items-center justify-center overflow-hidden">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-3 md:p-4 bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-20 cursor-pointer"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                  </button>
                  <motion.span layoutId={`title-cover-${selectedProject.id}`} className="text-background font-display font-black text-4xl md:text-9xl tracking-tighter uppercase px-12 md:px-8 text-center mix-blend-difference">
                    {selectedProject.title}
                  </motion.span>
                </motion.div>

                {/* Modal Content - Scrollable */}
                <motion.div layoutId={`content-${selectedProject.id}`} className="flex-1 overflow-y-auto bg-background p-6 md:p-16">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-12 mb-12 md:mb-16 border-b border-border pb-12 md:pb-16">
                    <div className="flex-1">
                      <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-3xl md:text-6xl font-display font-black tracking-tighter uppercase mb-4 md:mb-6 text-foreground">
                        {selectedProject.title}
                      </motion.h3>
                      <motion.p layoutId={`desc-${selectedProject.id}`} className="text-lg md:text-xl text-foreground/80 max-w-2xl font-sans leading-relaxed">
                        {selectedProject.shortDescription}
                      </motion.p>
                    </div>

                    <div className="flex flex-col gap-3 md:gap-4 shrink-0 mt-2">
                      {selectedProject.github && (
                        <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 md:gap-8 p-3 md:p-4 border border-border hover:bg-foreground hover:text-background transition-colors font-bold tracking-widest uppercase text-[10px] md:text-xs w-full md:w-48">
                          <span>Source Code</span>
                          <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />
                        </a>
                      )}
                      {selectedProject.link && (
                        <a href={selectedProject.link} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 md:gap-8 p-3 md:p-4 bg-primary text-primary-foreground hover:bg-foreground transition-colors font-bold tracking-widest uppercase text-[10px] md:text-xs w-full md:w-48 border border-transparent">
                          <span>Live Project</span>
                          <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />
                        </a>
                      )}
                    </div>
                  </div>

                  <motion.div layoutId={`tags-${selectedProject.id}`} className="flex flex-wrap gap-2 mb-12 md:mb-16">
                    {selectedProject.stack.map(tech => (
                      <span key={tech} className="bg-secondary text-foreground px-4 py-2 md:px-6 md:py-3 text-[10px] md:text-xs font-bold tracking-widest uppercase border border-border">
                        {tech}
                      </span>
                    ))}
                  </motion.div>

                  {/* Case Study Data */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 border-t border-border pt-12 md:pt-16"
                  >
                    <div className="space-y-4 md:space-y-6">
                      <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-3 md:gap-4">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary" />
                        The Problem
                      </h4>
                      <p className="text-foreground/80 font-sans leading-relaxed text-base md:text-lg">
                        {selectedProject.details.problem}
                      </p>
                    </div>
                    <div className="space-y-4 md:space-y-6">
                      <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-3 md:gap-4">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-foreground" />
                        The Solution
                      </h4>
                      <p className="text-foreground/80 font-sans leading-relaxed text-base md:text-lg">
                        {selectedProject.details.solution}
                      </p>
                    </div>
                    <div className="space-y-4 md:space-y-6">
                      <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-3 md:gap-4 border-b border-foreground pb-3 md:pb-4">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-foreground" />
                        The Outcome
                      </h4>
                      <p className="text-foreground font-sans leading-relaxed text-base md:text-lg font-bold">
                        {selectedProject.details.outcome}
                      </p>
                    </div>
                  </motion.div>

                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
