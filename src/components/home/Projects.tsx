"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import type { ProjectPublic } from "@/lib/content";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  projects: ProjectPublic[];
};

export default function Projects({ projects }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-8 py-32 relative">
      <div className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b border-border pb-8 md:pb-12">
        <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none text-foreground">
          Featured
          <br />
          Work.
        </h2>
        <p className="text-foreground/70 max-w-sm text-xs md:text-sm font-sans tracking-widest uppercase md:text-right">
          Selected projects demonstrating rigorous architecture & production-ready
          UX.
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
            <motion.div
              layoutId={`cover-${project.id}`}
              className={cn(
                "h-48 md:h-64 w-full relative flex items-center justify-center overflow-hidden shrink-0",
                !project.imagePath && `bg-gradient-to-br ${project.color}`,
              )}
            >
              {project.imagePath ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.imagePath}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : null}
              {!project.imagePath ? (
                <motion.span
                  layoutId={`title-cover-${project.id}`}
                  className="relative z-[1] text-background font-display font-black text-4xl md:text-6xl tracking-tighter uppercase p-6 md:p-8 text-center mix-blend-difference"
                >
                  {project.title.split(" ")[0]}
                </motion.span>
              ) : null}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>

            <motion.div
              layoutId={`content-${project.id}`}
              className="p-6 md:p-8 flex flex-col flex-grow"
            >
              <motion.h3
                layoutId={`title-${project.id}`}
                className="text-2xl md:text-3xl font-display font-black tracking-tighter uppercase mb-4"
              >
                {project.title}
              </motion.h3>
              <motion.p
                layoutId={`desc-${project.id}`}
                className="text-foreground/70 font-sans text-sm md:text-base mb-6 md:mb-8 flex-grow"
              >
                {project.shortDescription}
              </motion.p>

              <motion.div
                layoutId={`tags-${project.id}`}
                className="flex flex-wrap gap-2 mt-auto"
              >
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="bg-foreground text-background text-[9px] md:text-[10px] font-bold tracking-widest uppercase px-2 py-1 md:px-3 md:py-1.5"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

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
                <motion.div
                  layoutId={`cover-${selectedProject.id}`}
                  className={cn(
                    "relative w-full h-40 md:h-72 shrink-0 flex items-center justify-center overflow-hidden",
                    !selectedProject.imagePath &&
                      `bg-gradient-to-br ${selectedProject.color}`,
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-3 md:p-4 bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-20 cursor-pointer"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                  </button>
                  {selectedProject.imagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedProject.imagePath}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : null}
                  {!selectedProject.imagePath ? (
                    <motion.span
                      layoutId={`title-cover-${selectedProject.id}`}
                      className="relative z-[1] text-background font-display font-black text-4xl md:text-9xl tracking-tighter uppercase px-12 md:px-8 text-center mix-blend-difference"
                    >
                      {selectedProject.title}
                    </motion.span>
                  ) : null}
                </motion.div>

                <motion.div
                  layoutId={`content-${selectedProject.id}`}
                  className="flex-1 overflow-y-auto bg-background p-6 md:p-16"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-12 mb-12 md:mb-16 border-b border-border pb-12 md:pb-16">
                    <div className="flex-1">
                      <motion.h3
                        layoutId={`title-${selectedProject.id}`}
                        className="text-3xl md:text-6xl font-display font-black tracking-tighter uppercase mb-4 md:mb-6 text-foreground"
                      >
                        {selectedProject.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`desc-${selectedProject.id}`}
                        className="text-lg md:text-xl text-foreground/80 max-w-2xl font-sans leading-relaxed"
                      >
                        {selectedProject.shortDescription}
                      </motion.p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-7 gap-y-2 shrink-0 mt-2 md:mt-0">
                      {selectedProject.github ? (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            className="size-3.5 shrink-0"
                            fill="currentColor"
                          >
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                          </svg>
                          Source
                        </a>
                      ) : null}
                      {selectedProject.link ? (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="size-3.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20" />
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                          </svg>
                          <span>Site</span>
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <motion.div
                    layoutId={`tags-${selectedProject.id}`}
                    className="flex flex-wrap gap-2 mb-12 md:mb-16"
                  >
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-secondary text-foreground px-4 py-2 md:px-6 md:py-3 text-[10px] md:text-xs font-bold tracking-widest uppercase border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="border-t border-border pt-12 md:pt-16 text-foreground/90 text-base md:text-lg leading-relaxed [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_p+p]:mt-4 [&_strong]:text-foreground"
                  >
                    <ReactMarkdown>
                      {selectedProject.descriptionMarkdown}
                    </ReactMarkdown>
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
