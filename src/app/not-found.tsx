"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants} from "framer-motion";
import { Terminal, Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg text-foreground px-6 relative overflow-hidden bg-grid">
      {/* Decorative neon spots */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-neon-purple/10 filter blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-neon-cyan/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 space-y-8 glass p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
        {/* Error icon badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 15 }}
          className="w-16 h-16 rounded-2xl bg-linear-to-tr from-neon-magenta/20 to-neon-purple/20 border border-neon-magenta flex items-center justify-center mx-auto shadow-lg shadow-neon-magenta/10"
        >
          <AlertCircle className="w-8 h-8 text-neon-magenta animate-bounce" />
        </motion.div>

        {/* Big Code Error */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-8xl font-black font-mono tracking-tight text-glow-gradient animate-glitch"
          >
            404
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-mono text-neon-cyan font-bold tracking-widest uppercase"
          >
            Route Not Resolved
          </motion.h2>
        </div>

        {/* System log simulated text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="p-4 bg-black/40 rounded-xl border border-white/5 text-left font-mono text-xs text-foreground/60 space-y-1"
        >
          <p className="text-neon-purple flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>sys_log: core_router.c</span>
          </p>
          <p className="text-red-400 font-bold">ERROR: Target pathname not indexed.</p>
          <p>Location: window.location.pathname</p>
        </motion.div>

        {/* Back home action button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-linear-to-r from-neon-cyan to-neon-blue hover:from-neon-blue hover:to-neon-purple text-dark-bg font-extrabold text-xs uppercase tracking-widest transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-cyan/20 active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Core</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
