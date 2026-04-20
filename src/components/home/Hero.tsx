"use client";

import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const ADMIN_CURSOR_CLICKS = 3;
const ADMIN_CURSOR_RESET_MS = 800;

export default function Hero() {
  const cursorClicksRef = useRef(0);
  const cursorResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onBlinkingCursorClick = useCallback(async () => {
    if (cursorResetTimerRef.current) {
      clearTimeout(cursorResetTimerRef.current);
      cursorResetTimerRef.current = null;
    }
    cursorClicksRef.current += 1;
    if (cursorClicksRef.current < ADMIN_CURSOR_CLICKS) {
      cursorResetTimerRef.current = setTimeout(() => {
        cursorClicksRef.current = 0;
      }, ADMIN_CURSOR_RESET_MS);
      return;
    }
    cursorClicksRef.current = 0;
    try {
      await fetch("/api/admin/unlock", {
        method: "POST",
        credentials: "same-origin",
      });
      window.location.href = "/admin/login";
    } catch {
      cursorClicksRef.current = 0;
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden pb-12 pt-32 px-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start gap-12">
        {/* Editorial Label */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="absolute top-24 left-8 md:left-12 flex items-center gap-4"
        >
          <span className="w-12 h-[1px] bg-primary"></span>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">01 HUMAN INTELLIGENCE ONLY (POWERED BY AI)</span>
        </motion.div>
        
        {/* Massive Typographic Anchor */}
        <h1 className="text-5xl md:text-8xl lg:text-[9rem] leading-[0.85] font-display font-black tracking-tighter uppercase text-foreground">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Adapt.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted"
          >
            Unlearn.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Relearn<motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.5, 0.5001, 1] }}
              className="cursor-pointer select-none text-primary font-bold"
              onClick={onBlinkingCursorClick}
              role="presentation"
              aria-hidden
            >
              _
            </motion.span>
          </motion.div>
        </h1>
        
        {/* Asymmetrical Body */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 md:mt-24">
          <div className="hidden md:block md:col-span-1 border-r border-border h-full"></div>
          <div className="md:col-span-5 md:col-start-7 flex flex-col items-start gap-8 md:gap-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-base md:text-lg text-foreground font-sans leading-relaxed"
            >
              From Nepal to Australia. My journey is defined by continuous growth, crafting premium digital experiences, and deeply embracing the evolving web ecosystem.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full md:w-auto bg-primary text-primary-foreground uppercase cursor-pointer text-xs tracking-widest font-bold px-10 py-5 hover:bg-foreground hover:text-background transition-colors duration-0 flex items-center justify-center gap-3"
            >
              <span>Unpack the Repo</span>
              <Terminal className="w-4 h-4" strokeWidth={3} />
            </motion.button>
          </div>
        </div> 
      </div>
    </section>
  );
}
