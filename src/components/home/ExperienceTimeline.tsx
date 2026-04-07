"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";

export default function ExperienceTimeline() {
  return (
    <div className="w-full mt-12 md:mt-24 flex flex-col">
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-12 md:py-16 border-t border-border/50 group"
        >
          {/* Left: Date & Meta */}
          <div className="md:col-span-3 flex flex-col">
             <span className="text-lg md:text-xl font-display font-black tracking-tighter uppercase text-primary">
               {exp.dates}
             </span>
             <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted-foreground mt-2 md:mt-4">
               {exp.location}
             </span>
          </div>

          {/* Right: Content */}
          <div className="md:col-span-9 flex flex-col">
            <h4 className="text-2xl md:text-5xl font-display font-black tracking-tighter uppercase mb-2 md:mb-4">{exp.role}</h4>
            <h5 className="text-lg md:text-xl font-bold font-sans text-foreground/80 mb-6 md:mb-8">{exp.company}</h5>
            
            <p className="text-base md:text-lg text-foreground/80 font-sans leading-relaxed max-w-3xl mb-8 md:mb-12">
              {exp.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {exp.skills.map(skill => (
                <span key={skill} className="bg-secondary text-foreground text-[10px] font-bold tracking-widest uppercase px-3 py-2 md:px-4 md:py-3">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
