"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants} from "framer-motion";
import { Mail, Phone, ArrowRight, FileDown, Briefcase } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./SocialIcons";
import { resumeData } from "../utils/resumeData";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Aspiring Software Developer",
    "Computer Science Student",
    "Full-Stack Web Enthusiast",
    "Problem Solver"
  ];

  // Typing effect loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = roles[roleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setTypedText(currentFullText.slice(0, typedText.length + 1));
        if (typedText === currentFullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before delete
        } else {
          timer = setTimeout(handleTyping, 70); // Type speed
        }
      } else {
        setTypedText(currentFullText.slice(0, typedText.length - 1));
        if (typedText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
          timer = setTimeout(handleTyping, 35); // Delete speed
        }
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? 35 : 70);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 10 } }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid"
    >
      {/* Dynamic Lighting Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-neon-cyan/8 filter blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-neon-purple/8 filter blur-[120px] animate-pulse-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col items-center justify-center"
        >
          {/* Subheading pill */}
          <motion.div
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full glass border border-white/10 text-neon-cyan text-xs font-mono tracking-widest uppercase mb-6"
          >
            Available for Internships & Projects
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl font-sans font-extrabold tracking-tight mb-4 select-none"
          >
            <span className="text-foreground">I am </span>
            <span className="text-glow-gradient font-black block sm:inline-block">
              {resumeData.name}
            </span>
          </motion.h1>

          {/* Typing Tagline */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-3xl font-mono text-foreground/70 h-10 mb-8 flex items-center justify-center"
          >
            <span className="border-r-2 border-neon-cyan pr-1 animate-pulse select-none">
              {typedText}
            </span>
          </motion.h2>

          {/* Objective statement */}
          <motion.p
            variants={itemVariants}
            className="max-w-3xl text-sm sm:text-base text-foreground/60 leading-relaxed mb-10 text-justify mx-auto"
          >
            {resumeData.objective}
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full max-w-lg"
          >
            {/* View Projects */}
            <button
              onClick={() => handleSmoothScroll("projects")}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-linear-to-r from-neon-cyan to-neon-blue hover:from-neon-blue hover:to-neon-purple text-dark-bg font-extrabold text-sm tracking-wider uppercase cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-cyan/20 active:scale-[0.98]"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Hire Me / Contact */}
            <button
              onClick={() => handleSmoothScroll("contact")}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl glass border border-white/10 hover:border-neon-purple text-foreground hover:text-white font-extrabold text-sm tracking-wider uppercase cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md hover:shadow-neon-purple/10 active:scale-[0.98]"
            >
              <Briefcase className="w-4 h-4 text-neon-purple" />
              <span>Hire Me</span>
            </button>

            {/* Download Resume */}
            <button
              onClick={() => handleSmoothScroll("resume")}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl glass border border-neon-cyan/30 hover:border-neon-cyan/70 text-neon-cyan hover:text-white font-extrabold text-sm tracking-wider uppercase cursor-pointer transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileDown className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            <a
              href={resumeData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass border border-white/10 text-foreground/80 hover:text-neon-cyan hover:border-neon-cyan/50 hover:scale-110 active:scale-95 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={resumeData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass border border-white/10 text-foreground/80 hover:text-neon-purple hover:border-neon-purple/50 hover:scale-110 active:scale-95 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={resumeData.socials.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass border border-white/10 text-foreground/80 hover:text-neon-magenta hover:border-neon-magenta/50 hover:scale-110 active:scale-95 transition-all duration-300"
              aria-label="HackerRank Profile"
            >
              {/* Custom SVG for HackerRank if needed, or terminal styled tag */}
              <span className="font-mono text-xs font-black tracking-tighter">H⠵</span>
            </a>
            <a
              href={`mailto:${resumeData.email}`}
              className="p-3 rounded-xl glass border border-white/10 text-foreground/80 hover:text-neon-cyan hover:border-neon-cyan/50 hover:scale-110 active:scale-95 transition-all duration-300"
              aria-label="Email Siddharth"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={`tel:${resumeData.phone}`}
              className="p-3 rounded-xl glass border border-white/10 text-foreground/80 hover:text-neon-purple hover:border-neon-purple/50 hover:scale-110 active:scale-95 transition-all duration-300"
              aria-label="Call Siddharth"
            >
              <Phone className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Smooth Scroll Indicator (animated mouse icon) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center p-1.5 cursor-pointer"
          onClick={() => handleSmoothScroll("about")}
        >
          <div className="w-1.5 h-2.5 bg-neon-cyan rounded-full animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
