"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants} from "framer-motion";
import { Search, Compass, SunMoon, Mail, Phone, FileText, ArrowRight, CornerDownLeft } from "lucide-react";
import { resumeData } from "../utils/resumeData";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Listen for Ctrl+K / Cmd+K keys
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    // Listen for custom navbar event triggers
    const handleOpenTrigger = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenTrigger);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenTrigger);
    };
  }, []);

  // Autofocus input when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden"; // block background scroll
    } else {
      document.body.style.overflow = "unset";
      setSearch("");
    }
  }, [isOpen]);

  const items = [
    { name: "Navigate to Home", category: "Navigation", icon: <Compass className="w-4 h-4 text-neon-cyan" />, action: () => scrollToSection("home") },
    { name: "Navigate to About", category: "Navigation", icon: <Compass className="w-4 h-4 text-neon-cyan" />, action: () => scrollToSection("about") },
    { name: "Navigate to Skills", category: "Navigation", icon: <Compass className="w-4 h-4 text-neon-cyan" />, action: () => scrollToSection("skills") },
    { name: "Navigate to Experience", category: "Navigation", icon: <Compass className="w-4 h-4 text-neon-cyan" />, action: () => scrollToSection("experience") },
    { name: "Navigate to Projects", category: "Navigation", icon: <Compass className="w-4 h-4 text-neon-cyan" />, action: () => scrollToSection("projects") },
    { name: "Navigate to Education", category: "Navigation", icon: <Compass className="w-4 h-4 text-neon-cyan" />, action: () => scrollToSection("education") },
    { name: "Navigate to Contact", category: "Navigation", icon: <Compass className="w-4 h-4 text-neon-cyan" />, action: () => scrollToSection("contact") },
    { name: "Toggle Theme (Light / Dark)", category: "Actions", icon: <SunMoon className="w-4 h-4 text-neon-purple" />, action: () => toggleTheme() },
    { name: "Copy Email Address", category: "Contact", icon: <Mail className="w-4 h-4 text-neon-magenta" />, action: () => copyText(resumeData.email, "Email copied!") },
    { name: "Copy Phone Number", category: "Contact", icon: <Phone className="w-4 h-4 text-neon-magenta" />, action: () => copyText(resumeData.phone, "Phone number copied!") },
    { name: "Download PDF Resume", category: "Actions", icon: <FileText className="w-4 h-4 text-neon-blue" />, action: () => triggerResumeDownload() }
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const toggleTheme = () => {
    setIsOpen(false);
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const copyText = (text: string, successMessage: string) => {
    setIsOpen(false);
    navigator.clipboard.writeText(text);
    alert(successMessage); // standard fallback for quick feedback
  };

  const triggerResumeDownload = () => {
    setIsOpen(false);
    const link = document.createElement("a");
    link.href = "/SIDDHARTH_GAVALI.pdf";
    link.download = "Siddharth_Gavali_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4">
          {/* Backdrop blur clickoff */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Palette Box container */}
          <motion.div
            initial={{ scale: 0.97, y: -10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl glass border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[60vh]"
          >
            {/* Input area */}
            <div className="flex items-center px-4 py-3 border-b border-white/10">
              <Search className="w-5 h-5 text-foreground/45 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search section..."
                className="w-full bg-transparent border-0 px-3 py-1.5 text-sm text-foreground focus:outline-none placeholder-foreground/35 focus:ring-0"
              />
              <kbd className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase font-sans font-bold">
                esc
              </kbd>
            </div>

            {/* List area */}
            <div className="flex-1 overflow-y-auto p-2 space-y-4">
              {filteredItems.length > 0 ? (
                // Group categories
                ["Navigation", "Actions", "Contact"].map((cat) => {
                  const catItems = filteredItems.filter((i) => i.category === cat);
                  if (catItems.length === 0) return null;
                  return (
                    <div key={cat} className="space-y-1">
                      <h4 className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest px-3 py-2">
                        {cat}
                      </h4>
                      {catItems.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={item.action}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 hover:text-white transition duration-250 flex items-center justify-between text-xs sm:text-sm text-foreground/80 group cursor-pointer focus:outline-none focus:bg-white/5"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 group-hover:scale-105 transition">
                              {item.icon}
                            </div>
                            <span>{item.name}</span>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-[10px] font-mono text-neon-cyan transition-all">
                            <span>Execute</span>
                            <CornerDownLeft className="w-3.5 h-3.5" />
                          </div>
                        </button>
                      ))}
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs sm:text-sm text-foreground/40 font-mono">
                  No commands found matching "{search}"
                </div>
              )}
            </div>

            {/* Palette Footer help */}
            <div className="px-4 py-2.5 border-t border-white/5 bg-dark-bg/25 flex justify-between items-center text-[10px] font-mono text-foreground/45">
              <span>Use Up/Down keys to navigate</span>
              <span>Press enter to trigger</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
