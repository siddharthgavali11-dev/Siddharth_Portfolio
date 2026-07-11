"use client";

import React from "react";
import { FileText, Download, Mail, Phone, MapPin, ExternalLink, Calendar, CheckCircle } from "lucide-react";
import { resumeData } from "../utils/resumeData";

export default function ResumeViewer() {
  const triggerResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/SIDDHARTH_GAVALI.pdf";
    link.download = "Siddharth_Gavali_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="py-24 relative overflow-hidden bg-black/10 dark:bg-black/20">
      <div className="absolute left-1/4 top-1/3 w-80 h-80 rounded-full bg-neon-cyan/5 filter blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-wider">
            Curriculum <span className="text-glow-gradient">Vitae</span>
          </h2>
          <p className="text-xs sm:text-sm text-foreground/50 font-mono mt-4">
            📄 View or download the full copy of the professional resume.
          </p>
          <div className="w-16 h-1 bg-linear-to-r from-neon-cyan to-neon-purple mx-auto mt-4 rounded-full" />
        </div>

        {/* Outer Frame */}
        <div className="max-w-4xl mx-auto">
          {/* Action Row */}
          <div className="flex justify-end gap-3.5 mb-6">
            <button
              onClick={triggerResumeDownload}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-linear-to-tr from-neon-cyan to-neon-purple text-dark-bg font-extrabold text-xs uppercase tracking-widest cursor-pointer shadow-lg shadow-neon-cyan/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>

          {/* Interactive Document Panel */}
          <div className="glass border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
            {/* Header branding */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-8 border-b border-white/10 mb-8">
              <div>
                <h3 className="text-3xl font-black tracking-tight text-foreground">
                  {resumeData.name}
                </h3>
                <h4 className="text-sm font-mono text-neon-cyan font-semibold uppercase mt-1 tracking-widest">
                  {resumeData.title}
                </h4>
              </div>
              <div className="text-xs font-mono space-y-1.5 text-foreground/60">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-neon-purple" />
                  <a href={`mailto:${resumeData.email}`} className="hover:text-neon-cyan transition">
                    {resumeData.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neon-purple" />
                  <a href={`tel:${resumeData.phone}`} className="hover:text-neon-cyan transition">
                    {resumeData.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neon-purple" />
                  <span>{resumeData.location}</span>
                </div>
              </div>
            </div>

            {/* Resume sections */}
            <div className="space-y-8">
              {/* Objective */}
              <div>
                <h4 className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-3 border-b border-white/5 pb-1">
                  Career Objective
                </h4>
                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                  {resumeData.objective}
                </p>
              </div>

              {/* Education list */}
              <div>
                <h4 className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-4 border-b border-white/5 pb-1">
                  Education
                </h4>
                <div className="space-y-6">
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-start flex-wrap gap-2 text-xs sm:text-sm">
                      <div>
                        <h5 className="font-bold text-foreground">{edu.degree}</h5>
                        <p className="text-foreground/50 text-xs mt-0.5">{edu.institution}</p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="font-mono text-neon-purple text-xs font-semibold">{edu.duration}</span>
                        <span className="text-[11px] font-mono font-bold mt-1 bg-white/5 px-2 py-0.5 rounded border border-white/5">{edu.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience list */}
              <div>
                <h4 className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-4 border-b border-white/5 pb-1">
                  Work Experience
                </h4>
                <div className="space-y-6">
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} className="text-xs sm:text-sm">
                      <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                        <div>
                          <h5 className="font-bold text-foreground">{exp.role}</h5>
                          <p className="text-foreground/50 text-xs mt-0.5">{exp.company}</p>
                        </div>
                        <span className="font-mono text-neon-purple text-xs font-semibold">{exp.duration}</span>
                      </div>
                      <ul className="space-y-1.5 pl-2 text-foreground/75">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex gap-2 items-start text-xs leading-relaxed">
                            <span className="text-neon-cyan font-bold">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills summary tags */}
              <div>
                <h4 className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-4 border-b border-white/5 pb-1">
                  Technical Skills
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resumeData.skills.map((cat, idx) => (
                    <div key={idx} className="text-xs">
                      <h5 className="font-bold text-foreground/75 mb-2 font-mono">{cat.category}</h5>
                      <p className="text-foreground/60 leading-relaxed">
                        {cat.skills.map((s) => s.name).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards/Certifications */}
              <div>
                <h4 className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-4 border-b border-white/5 pb-1">
                  Certifications & Badges
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resumeData.awards.map((award, idx) => (
                    <div key={idx} className="text-xs flex gap-2.5 items-start">
                      <CheckCircle className="w-4 h-4 text-neon-purple shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold text-foreground">{award.title}</h5>
                        <p className="text-foreground/50 text-[10px]">{award.issuer} • {award.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
