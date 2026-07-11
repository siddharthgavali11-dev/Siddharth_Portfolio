"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence, Variants} from "framer-motion";
import { ExternalLink, BookOpen, X, ArrowUpRight, CheckCircle, Info } from "lucide-react";
import { GithubIcon as Github } from "./SocialIcons";
import { resumeData, Project } from "../utils/resumeData";

// Interactive 3D Tilt Card component
function ProjectCard({ project, onOpenCaseStudy }: { project: Project; onOpenCaseStudy: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Rotate bounds (max 12 degrees)
    setRotateX(-mouseY * 12);
    setRotateY(mouseX * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-neon-cyan/5 flex flex-col h-full group"
    >
      {/* Dynamic Header visual placeholder */}
      <div 
        className={`h-48 bg-linear-to-tr ${project.imagePlaceholderColor} border-b relative overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none`}
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Glow orb in cover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/5 blur-xl group-hover:scale-125 transition duration-500" />
        
        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-3 shadow-lg">
          <BookOpen className="w-5 h-5 text-foreground" />
        </div>
        <a
          href={
            project.title === "Student Sync"
              ? "https://student-sync-ochre.vercel.app/"
              : project.title === "Money Lending App"
              ? "https://money-lending-app-weld.vercel.app/"
              : project.githubUrl
          }
          target="_blank"
          rel="noopener noreferrer"
          className="group/title flex items-center gap-2 text-lg font-black tracking-wide text-foreground hover:text-neon-cyan transition-all duration-300"
        >
          {project.title}
          <ExternalLink className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-all" />
        </a>
        <span className="text-[10px] font-mono text-neon-cyan uppercase mt-1 tracking-widest">
          Academic Project
        </span>
      </div>

      {/* Card Content body */}
      <div className="p-6 flex flex-col flex-grow" style={{ transform: "translateZ(15px)" }}>
        <p className="text-foreground/75 text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/5 text-foreground/80"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions button group */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          {/* GitHub link */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-foreground font-semibold text-xs uppercase tracking-wider transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          {/* Case Study dialog trigger */}
          <button
            onClick={onOpenCaseStudy}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-neon-cyan/20 to-neon-purple/20 hover:from-neon-cyan/30 hover:to-neon-purple/30 border border-neon-cyan/40 hover:border-neon-purple text-neon-cyan hover:text-white font-semibold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Case Study</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-white/1 dark:bg-black/10">
      {/* Dynamic blurred orbs */}
      <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-neon-purple/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title block */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-wider">
            Featured <span className="text-glow-gradient">Projects</span>
          </h2>
          <p className="text-xs sm:text-sm text-foreground/50 font-mono mt-4 max-w-lg mx-auto">
            🎓 Handcrafted academic systems addressing security, efficiency, and data architecture.
          </p>
          <div className="w-16 h-1 bg-linear-to-r from-neon-cyan to-neon-purple mx-auto mt-4 rounded-full" />
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumeData.projects.map((project, idx) => (
            <ProjectCard
              key={idx}
              project={project}
              onOpenCaseStudy={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Details Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring" as const, stiffness: 260, damping: 25 }}
              className="glass border border-white/10 w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-dark-bg/40 backdrop-blur-lg">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground">
                    {selectedProject.title}
                  </h3>
                  <span className="text-[10px] font-mono text-neon-cyan uppercase mt-1 tracking-wider block">
                    Case Study Analysis
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl glass border border-white/10 text-foreground/80 hover:text-white hover:border-neon-magenta/50 cursor-pointer transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable details wrapper */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-white/5">
                {/* 1. Problem Statement */}
                <div className="pb-6">
                  <h4 className="text-xs font-mono text-neon-purple uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-neon-purple" />
                    Problem Statement
                  </h4>
                  <p className="text-foreground/80 text-sm leading-relaxed pl-6 border-l-2 border-neon-purple/50">
                    {selectedProject.caseStudy.problem}
                  </p>
                </div>

                {/* 2. Solution Details */}
                <div className="pt-6 pb-6">
                  <h4 className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-neon-cyan" />
                    Engineering Solution
                  </h4>
                  <p className="text-foreground/80 text-sm leading-relaxed pl-6 border-l-2 border-neon-cyan/50">
                    {selectedProject.caseStudy.solution}
                  </p>
                </div>

                {/* 3. System Architecture */}
                <div className="pt-6 pb-6">
                  <h4 className="text-xs font-mono text-neon-magenta uppercase tracking-widest mb-4">
                    🛠️ System Architecture
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pl-4">
                    {selectedProject.caseStudy.architecture.map((layer, lIdx) => (
                      <div
                        key={lIdx}
                        className="p-3 bg-white/5 border border-white/5 rounded-xl text-xs font-mono text-foreground/85 flex items-start gap-2.5"
                      >
                        <span className="text-neon-magenta font-black font-sans shrink-0">{lIdx + 1}.</span>
                        <span>{layer}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Challenges & Learnings */}
                <div className="pt-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-mono text-red-400 uppercase tracking-widest mb-3">
                      ⚠️ Core Engineering Challenge
                    </h4>
                    <p className="text-foreground/85 text-xs sm:text-sm leading-relaxed pl-4 border-l-2 border-red-500/40">
                      {selectedProject.caseStudy.challenges}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-3">
                      💡 Project Learnings
                    </h4>
                    <p className="text-foreground/85 text-xs sm:text-sm leading-relaxed pl-4 border-l-2 border-neon-cyan/40">
                      {selectedProject.caseStudy.learning}
                    </p>
                  </div>
                </div>

                {/* 5. Future Roadmap Improvements */}
                <div className="pt-6">
                  <h4 className="text-xs font-mono text-neon-blue uppercase tracking-widest mb-4">
                    🚀 Future Roadmap Additions
                  </h4>
                  <ul className="space-y-3 pl-4">
                    {selectedProject.caseStudy.futureImprovements.map((improvement, impIdx) => (
                      <li key={impIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80">
                        <CheckCircle className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer actions */}
              <div className="p-6 border-t border-white/10 bg-dark-bg/20 backdrop-blur-lg flex items-center justify-end gap-3.5">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-foreground font-bold text-xs uppercase tracking-wider transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-3 rounded-xl bg-linear-to-r from-neon-cyan to-neon-purple text-dark-bg font-extrabold text-xs uppercase tracking-wider cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
