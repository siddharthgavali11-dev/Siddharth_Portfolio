"use client";

import React from "react";
import { Heart } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./SocialIcons";
import { resumeData } from "../utils/resumeData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 py-10 relative overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Made with ❤️ */}
        <p className="text-xs sm:text-sm text-foreground/50 font-mono flex items-center gap-1.5 order-2 sm:order-1 select-none">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
          <span>by Siddharth Gavali • © {currentYear}</span>
        </p>

        {/* Brand signature */}
        <div className="order-1 sm:order-2 flex gap-4 items-center">
          <a
            href={resumeData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/40 hover:text-neon-cyan transition duration-300"
            aria-label="GitHub Link"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
          <a
            href={resumeData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/40 hover:text-neon-purple transition duration-300"
            aria-label="LinkedIn Link"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>
          <a
            href={resumeData.socials.hackerrank}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/40 hover:text-neon-magenta transition duration-300 font-mono text-xs font-black tracking-tighter"
            aria-label="HackerRank Link"
          >
            H⠵
          </a>
        </div>
      </div>
    </footer>
  );
}
