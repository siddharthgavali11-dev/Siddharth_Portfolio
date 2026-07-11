"use client";

import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, Terminal, Search } from "lucide-react";
import { motion, AnimatePresence, Variants} from "framer-motion";
import { resumeData } from "../utils/resumeData";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    // Detect scroll for background styling
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Intersection Observer to highlight current active section
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Focus center viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Track each section in observer
    navLinks.forEach((link) => {
      const section = document.getElementById(link.href.replace("#", ""));
      if (section) observer.observe(section);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
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

  const triggerCommandPalette = () => {
    // Dispatch a custom event to open the command palette
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full overflow-x-hidden transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-2 group cursor-pointer text-xl font-bold font-sans tracking-wider shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-linear-to-tr from-neon-cyan to-neon-purple flex items-center justify-center text-dark-bg font-mono font-extrabold shadow-lg shadow-neon-cyan/20 group-hover:shadow-neon-purple/35 transition-all duration-300">
            SG
          </div>
          <span className="hidden sm:inline-block text-foreground group-hover:text-neon-cyan transition-colors duration-300">
            Siddharth.G
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center min-w-0">
          <ul className="flex items-center gap-1 glass py-1.5 px-2 rounded-full border border-white/5 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative text-xs font-semibold px-3 py-2 rounded-full transition-all duration-300 uppercase tracking-wide select-none whitespace-nowrap ${
                      isActive
                        ? "text-neon-cyan"
                        : "text-foreground/75 hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white/5 dark:bg-white/5 light:bg-black/5 rounded-full border-t border-white/10 dark:border-white/10 light:border-black/5 shadow-md"
                        transition={{ type: "spring" as const, stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Utilities & Controls */}
        <div className="hidden xl:flex items-center gap-2.5 shrink-0">
          {/* Command Palette Trigger */}
          <button
            onClick={triggerCommandPalette}
            className="flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-xl glass border border-white/10 dark:border-white/10 light:border-black/5 text-foreground/80 hover:border-neon-purple/50 cursor-pointer whitespace-nowrap"
            title="Open Command Palette (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-neon-purple shrink-0" />
            <span>Search</span>
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] uppercase font-sans font-bold">
              Ctrl+K
            </kbd>
          </button>

          <ThemeToggle />

          <a
            href="#resume"
            onClick={(e) => handleNavClick(e, "#resume")}
            className="px-4 py-2.5 rounded-xl bg-linear-to-r from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/50 hover:border-neon-purple text-neon-cyan hover:text-white transition-all duration-300 font-semibold text-xs tracking-wider uppercase shadow-lg shadow-neon-cyan/5 hover:shadow-neon-purple/10 whitespace-nowrap"
          >
            Resume
          </a>
        </div>

        {/* Mobile / Tablet Navbar Buttons (now covers up to xl breakpoint) */}
        <div className="flex xl:hidden items-center gap-3 shrink-0">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl glass border border-white/10 text-foreground cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[70px] z-30 p-6 glass border-b border-white/10 shadow-2xl block xl:hidden max-h-[calc(100vh-70px)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-5">
              {/* Search Shortcut for Mobile */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerCommandPalette();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 text-foreground/80 font-mono text-sm"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-neon-purple" />
                  <span>Command Palette</span>
                </div>
                <kbd className="bg-white/15 px-2 py-0.5 rounded text-[10px] font-sans">
                  Tap Search
                </kbd>
              </button>

              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`block py-3 px-4 rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 uppercase ${
                          isActive
                            ? "bg-linear-to-r from-neon-cyan/20 to-neon-purple/5 border-l-4 border-neon-cyan text-neon-cyan pl-6"
                            : "text-foreground/85 hover:bg-white/5"
                        }`}
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <a
                href="#resume"
                onClick={(e) => handleNavClick(e, "#resume")}
                className="w-full text-center py-4 rounded-xl bg-linear-to-r from-neon-cyan to-neon-purple text-dark-bg font-bold tracking-widest uppercase shadow-lg shadow-neon-cyan/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
