"use client";

import { motion } from "framer-motion";
import { Mail, Briefcase, Code2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ContactFooter() {
  const socialLinks = [
    {
      name: "Email",
      url: "mailto:sonamsrp8@gmail.com",
      icon: <Mail className="w-6 h-6" />
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/sonam-wangdi-sherpa",
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      name: "GitHub",
      url: "https://github.com/mrsonam",
      icon: <Code2 className="w-6 h-6" />
    }
  ];

  return (
    <footer className="w-full bg-foreground text-background pt-24 md:pt-32 pb-12 px-6 md:px-8 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-start min-h-[50vh] md:min-h-[60vh] justify-between">
        
        <div className="mb-16 md:mb-24 space-y-8 md:space-y-12 w-full flex flex-col">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[14vw] md:text-[8rem] font-display font-black tracking-tighter uppercase leading-[0.8] text-background"
          >
            Let's Build<br/>
            <span className="text-primary">Something.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl font-sans max-w-2xl text-background/80 leading-relaxed"
          >
            I am currently seeking Software Engineer and developer roles, specializing in fullstack development. Let's connect and create exceptional digital experiences.
          </motion.p>
        </div>

        <div className="w-full flex justify-end mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto">
            {socialLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center justify-between gap-8 md:gap-12 px-6 py-4 md:px-8 md:py-6 bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-0 border border-background cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    {link.icon}
                    <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">
                      {link.name}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-background/20 text-xs font-bold tracking-widest uppercase text-background/50">
          <p>© {new Date().getFullYear()} Sonam Wangdi Sherpa.</p>
          <p className="mt-4 md:mt-0 flex items-center gap-4 px-4 py-2 border border-background/20 text-background">
            Architecture & Execution
          </p>
        </div>
        
      </div>
    </footer>
  );
}
