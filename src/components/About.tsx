"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, Variants} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Code2, GraduationCap, MapPin, Milestone } from "lucide-react";
import { resumeData } from "../utils/resumeData";

// Animated counter component for statistic counts
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500; // ms
    const increment = value / (duration / 16); // ~60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-3xl sm:text-5xl font-black text-glow-gradient tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants : Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 12 } }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Decorative gradient blur background */}
      <div className="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-neon-purple/5 filter blur-[90px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-neon-cyan/5 filter blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
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
            About <span className="text-glow-gradient">Me</span>
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-neon-cyan to-neon-purple mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Column 1: Stylized Developer Avatar */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-5 flex flex-col justify-center items-center"
          >
            <div className="relative group w-full max-w-[340px] aspect-square rounded-3xl overflow-hidden glass border border-white/10 dark:border-white/10 light:border-black/5 shadow-2xl p-4 transform hover:rotate-2 transition-all duration-500">
              <div className="w-full h-full rounded-2xl bg-linear-to-br from-neon-cyan/20 via-neon-purple/10 to-neon-magenta/20 flex flex-col items-center justify-center p-6 border border-white/5 relative overflow-hidden">
                {/* Glow ring */}
                <div className="absolute -inset-1 bg-linear-to-r from-neon-cyan via-neon-purple to-neon-magenta rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                
                {/* Code icons floating in avatar background */}
                <Code2 className="absolute top-4 left-4 w-6 h-6 text-neon-cyan/30 animate-pulse" />
                <GraduationCap className="absolute bottom-4 right-4 w-6 h-6 text-neon-purple/30 animate-bounce" />
                <Milestone className="absolute top-4 right-4 w-5 h-5 text-neon-magenta/20" />
                
                {/* Core Avatar Frame */}
                <div className="relative z-10 w-28 h-28 rounded-full bg-dark-bg/80 flex items-center justify-center border-2 border-neon-cyan shadow-xl shadow-neon-cyan/10 mb-5 overflow-hidden">
                  {!photoError ? (
                    // Place your photo at /public/photo.jpeg (or update the src below).
                    // If the file is missing or fails to load, it falls back to the
                    // "SG" initials automatically.
                    <img
                      src="/photo.jpeg"
                      alt={resumeData.name}
                      className="w-full h-full object-cover"
                      onError={() => setPhotoError(true)}
                    />
                  ) : (
                    <span className="font-mono text-4xl font-extrabold text-neon-cyan">SG</span>
                  )}
                </div>
                
                <h3 className="relative z-10 text-xl font-bold text-foreground mb-1 select-none">
                  {resumeData.name}
                </h3>
                <p className="relative z-10 text-xs font-mono text-neon-purple font-semibold tracking-widest uppercase mb-4">
                  {resumeData.title}
                </p>

                <div className="relative z-10 flex items-center gap-2 text-foreground/60 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-neon-cyan" />
                  <span>{resumeData.location}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Story & Stats */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div className="glass p-8 sm:p-10 rounded-3xl border border-white/10 shadow-xl mb-8 flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-4">My Story & Objective</h3>
              <p className="text-foreground/75 leading-relaxed text-sm sm:text-base mb-6 text-justify">
                {resumeData.aboutMe}
              </p>
              
              {/* Education Highlights Summary */}
              <div className="border-t border-white/10 pt-6 mt-6">
                <h4 className="text-sm font-mono text-neon-cyan uppercase tracking-widest mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Quick Education Summary
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-foreground">B.Tech in CSBS</span>
                    <span className="text-xs text-foreground/50">KIT College, Kolhapur</span>
                    <span className="text-xs text-neon-purple font-mono mt-1">CGPA: 7.7 (2024-2027)</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-foreground">Diploma in CSE</span>
                    <span className="text-xs text-foreground/50">Govt Polytechnic, Miraj</span>
                    <span className="text-xs text-neon-purple font-mono mt-1">85.54% Distinction (2021-2024)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Counters Row
                Values are computed directly from resumeData.ts so they stay
                accurate automatically as the resume is updated. */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  name: "Years Coding",
                  // Coding journey started with the Diploma (earliest entry
                  // in resumeData.education, "2021 - 2024"). Adjust the
                  // startYear below if you'd like a different baseline.
                  value: new Date().getFullYear() - 2021,
                  suffix: "+"
                },
                {
                  name: "Projects Built",
                  value: resumeData.projects.length,
                  suffix: "+"
                },
                {
                  name: "Skills Acquired",
                  value: resumeData.skills.reduce(
                    (total, category) => total + category.skills.length,
                    0
                  ),
                  suffix: "+"
                },
                {
                  name: "Internships",
                  value: resumeData.experience.length,
                  suffix: ""
                }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="glass p-5 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center group hover:border-neon-cyan/45 hover:scale-105 transition-all duration-300"
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <span className="text-xs text-foreground/60 font-mono mt-2 uppercase tracking-wider group-hover:text-foreground transition-colors">
                    {stat.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
