"use client";

import React, { useEffect } from "react";
import { motion, useAnimation, Variants} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { resumeData } from "../utils/resumeData";

interface TimelineItemProps {
  type: "experience" | "education";
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  scoreOrDetails: string | string[];
  index: number;
}

function TimelineCard({ type, title, subtitle, location, duration, scoreOrDetails, index }: TimelineItemProps) {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const isLeft = index % 2 === 0;

  const cardVariants : Variants = {
    hidden: { 
      opacity: 0, 
      x: isLeft ? -50 : 50 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring" as const, stiffness: 85, damping: 14, delay: 0.1 } 
    }
  };

  return (
    <div ref={ref} className="relative flex flex-col md:flex-row items-center justify-center mb-16 w-full group">
      {/* Central Connector Node */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full glass border-2 border-neon-cyan/40 flex items-center justify-center z-10 group-hover:border-neon-purple group-hover:shadow-lg group-hover:shadow-neon-purple/20 transition-all duration-300">
        {type === "experience" ? (
          <Briefcase className="w-4 h-4 text-neon-cyan group-hover:text-neon-purple transition-colors" />
        ) : (
          <GraduationCap className="w-4 h-4 text-neon-purple group-hover:text-neon-cyan transition-colors" />
        )}
      </div>

      {/* Left Column (Desktop) */}
      <div className="w-full md:w-1/2 pr-0 md:pr-12 pl-12 md:pl-0 flex justify-end">
        {isLeft && (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={controls}
            className="w-full max-w-lg glass p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-neon-cyan/35 transition-all duration-300 relative"
          >
            {/* Corner arrow */}
            <div className="absolute top-6 -right-2 hidden md:block w-4 h-4 bg-dark-card rotate-45 border-t border-r border-white/10" />

            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neon-cyan text-[10px] font-mono uppercase tracking-wider">
                {type}
              </span>
              <div className="flex items-center gap-1 text-foreground/50 text-xs font-mono">
                <Calendar className="w-3.5 h-3.5 text-neon-purple" />
                <span>{duration}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
            <h4 className="text-sm font-semibold text-neon-purple mb-4">{subtitle}</h4>

            <div className="flex items-center gap-1.5 text-foreground/60 text-xs mb-5">
              <MapPin className="w-3.5 h-3.5 text-neon-cyan" />
              <span>{location}</span>
            </div>

            {/* List details */}
            <ul className="space-y-2.5 text-sm text-foreground/70">
              {Array.isArray(scoreOrDetails) ? (
                scoreOrDetails.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-neon-cyan/80 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start gap-2 font-mono text-neon-cyan font-bold text-sm bg-white/5 px-3.5 py-2 rounded-xl border border-white/5 w-fit">
                  Grade: {scoreOrDetails}
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Right Column (Desktop) */}
      <div className="w-full md:w-1/2 pl-12 md:pl-12 flex justify-start">
        {!isLeft && (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={controls}
            className="w-full max-w-lg glass p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-neon-purple/35 transition-all duration-300 relative"
          >
            {/* Corner arrow */}
            <div className="absolute top-6 -left-2 hidden md:block w-4 h-4 bg-dark-card rotate-45 border-b border-l border-white/10" />

            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neon-purple text-[10px] font-mono uppercase tracking-wider">
                {type}
              </span>
              <div className="flex items-center gap-1 text-foreground/50 text-xs font-mono">
                <Calendar className="w-3.5 h-3.5 text-neon-cyan" />
                <span>{duration}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
            <h4 className="text-sm font-semibold text-neon-cyan mb-4">{subtitle}</h4>

            <div className="flex items-center gap-1.5 text-foreground/60 text-xs mb-5">
              <MapPin className="w-3.5 h-3.5 text-neon-purple" />
              <span>{location}</span>
            </div>

            {/* List details */}
            <ul className="space-y-2.5 text-sm text-foreground/70">
              {Array.isArray(scoreOrDetails) ? (
                scoreOrDetails.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-neon-purple/80 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start gap-2 font-mono text-neon-purple font-bold text-sm bg-white/5 px-3.5 py-2 rounded-xl border border-white/5 w-fit">
                  Grade: {scoreOrDetails}
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Timeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  // Compile timeline items chronological layout
  const timelineItems = [
    {
      type: "education" as const,
      title: resumeData.education[0].degree,
      subtitle: resumeData.education[0].institution,
      location: resumeData.education[0].location,
      duration: resumeData.education[0].duration,
      scoreOrDetails: resumeData.education[0].details,
    },
    {
      type: "education" as const,
      title: resumeData.education[1].degree,
      subtitle: resumeData.education[1].institution,
      location: resumeData.education[1].location,
      duration: resumeData.education[1].duration,
      scoreOrDetails: resumeData.education[1].score,
    },
    {
      type: "experience" as const,
      title: resumeData.experience[0].role,
      subtitle: resumeData.experience[0].company,
      location: resumeData.experience[0].location,
      duration: resumeData.experience[0].duration,
      scoreOrDetails: resumeData.experience[0].responsibilities,
    },
    {
      type: "education" as const,
      title: resumeData.education[2].degree,
      subtitle: resumeData.education[2].institution,
      location: resumeData.education[2].location,
      duration: resumeData.education[2].duration,
      scoreOrDetails: resumeData.education[2].score,
    }
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black/10 dark:bg-black/30">
      {/* Section anchor for education as well */}
      <div id="education" className="absolute top-[35%] w-1 h-1 pointer-events-none" />

      {/* Decorative gradient glowing spheres */}
      <div className="absolute left-0 top-1/4 w-80 h-80 rounded-full bg-neon-purple/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-24">
          <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-wider">
            Experience & <span className="text-glow-gradient">Education</span>
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-neon-cyan to-neon-purple mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline body wrapper */}
        <div className="relative w-full flex flex-col items-center" ref={ref}>
          {/* Vertical central divider line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 dark:bg-white/15 light:bg-black/10 transform -translate-x-1/2">
            {/* Glowing animated scroll indicator on central connector line */}
            <motion.div 
              initial={{ height: "0%" }}
              animate={inView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-linear-to-b from-neon-cyan via-neon-purple to-neon-magenta shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />
          </div>

          {timelineItems.map((item, idx) => (
            <TimelineCard
              key={idx}
              type={item.type}
              title={item.title}
              subtitle={item.subtitle}
              location={item.location}
              duration={item.duration}
              scoreOrDetails={item.scoreOrDetails}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
