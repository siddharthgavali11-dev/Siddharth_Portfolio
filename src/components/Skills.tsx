"use client";

import React, { useEffect } from "react";
import { motion, useAnimation, Variants} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { resumeData } from "../utils/resumeData";
import { Code, Layout, Settings, Brain } from "lucide-react";

// Individual skill progress bar component
function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="mb-5" ref={ref}>
      <div className="flex justify-between items-center mb-1 text-sm">
        <span className="font-semibold text-foreground">{name}</span>
        <span className="font-mono text-xs text-foreground/50">{level}%</span>
      </div>
      <div className="w-full h-2.5 bg-black/20 dark:bg-black/35 light:bg-black/10 rounded-full overflow-hidden border border-white/5 relative">
        <motion.div
          custom={level}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { width: "0%" },
            visible: { 
              width: `${level}%`, 
              transition: { duration: 1.2, ease: "easeOut", delay: index * 0.05 } 
            }
          }}
          className="h-full bg-linear-to-r from-neon-cyan to-neon-purple rounded-full relative"
        >
          {/* Subtle glow highlight on top of bar */}
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-linear-to-r from-white/10 to-white/20 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Map category names to modern Lucide icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Programming Languages":
        return <Code className="w-5 h-5 text-neon-cyan" />;
      case "Web & Backend Technologies":
        return <Layout className="w-5 h-5 text-neon-purple" />;
      case "Tools & Platforms":
        return <Settings className="w-5 h-5 text-neon-magenta" />;
      case "Core Concepts":
        return <Brain className="w-5 h-5 text-neon-blue" />;
      default:
        return <Code className="w-5 h-5 text-neon-cyan" />;
    }
  };

  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants : Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 80, damping: 12 } 
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-white/1 dark:bg-black/20" ref={ref}>
      {/* Decorative gradient glowing spots */}
      <div className="absolute left-1/3 top-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/3 w-80 h-80 rounded-full bg-neon-purple/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-wider">
            Technical <span className="text-glow-gradient">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-neon-cyan to-neon-purple mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {resumeData.skills.map((categoryObj, catIdx) => (
            <motion.div
              key={catIdx}
              variants={cardVariants}
              className="glass p-8 rounded-3xl border border-white/10 hover:border-neon-cyan/30 hover:shadow-xl hover:shadow-neon-cyan/5 transition-all duration-500 group flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition duration-300">
                    {getCategoryIcon(categoryObj.category)}
                  </div>
                  <h3 className="text-lg font-bold text-foreground tracking-wide">
                    {categoryObj.category}
                  </h3>
                </div>

                {/* Skill Bars List */}
                <div className="grid grid-cols-1 gap-2">
                  {categoryObj.skills.map((skill, skillIdx) => (
                    <SkillBar
                      key={skillIdx}
                      name={skill.name}
                      level={skill.level}
                      index={skillIdx}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative category tag */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end">
                <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">
                  Comp-Science Fundamentals
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { delay: 0.6, duration: 0.5 } }
          }}
          className="mt-12 glass p-6 rounded-2xl border border-white/5 text-center"
        >
          <p className="text-xs sm:text-sm text-foreground/60 font-mono">
            💡 Bridges technology and corporate business systems with algorithmic efficiency.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
