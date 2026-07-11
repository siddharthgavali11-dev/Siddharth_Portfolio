"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence, Variants} from "framer-motion";
import { resumeData } from "../utils/resumeData";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting = `Hi there! I'm Siddharth's portfolio assistant. I can answer questions about his technical skills, academic projects, education, and professional experience. Ask me anything!`;

  useEffect(() => {
    setMessages([
      {
        id: "greet",
        sender: "ai",
        text: initialGreeting,
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const suggestionChips = [
    "Tell me about StudentSync",
    "What are his core skills?",
    "Where did he intern?",
    "Show education details",
    "How to contact him?"
  ];

  // Match intent and return markdown response
  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();

    // 1. Projects
    if (q.includes("project") || q.includes("studentsync") || q.includes("lendflow") || q.includes("quiz")) {
      if (q.includes("studentsync")) {
        const p = resumeData.projects[0];
        return `**${p.title}** is a mobile/backend system.\n\n* **Tech Stack**: ${p.techStack.join(", ")}\n* **Problem**: ${p.caseStudy.problem}\n* **Solution**: ${p.caseStudy.solution}\n* **Repository**: [Link](${p.githubUrl})`;
      }
      if (q.includes("lendflow")) {
        const p = resumeData.projects[1];
        return `**${p.title}** is a private lending dashboard.\n\n* **Tech Stack**: ${p.techStack.join(", ")}\n* **Details**: ${p.description}\n* **Problem**: ${p.caseStudy.problem}\n* **Repository**: [Link](${p.githubUrl})`;
      }
      if (q.includes("quiz")) {
        const p = resumeData.projects[2];
        return `**${p.title}** is a performant web quiz application.\n\n* **Tech Stack**: ${p.techStack.join(", ")}\n* **Details**: ${p.description}\n* **Repository**: [Link](${p.githubUrl})`;
      }
      return `Siddharth has built several key projects:\n\n1. **StudentSync**: Smart Attendance System (Flutter, Firebase)\n2. **LendFlow**: Money Lending Dashboard (Bootstrap, Chart.js, LocalStorage)\n3. **Online Quiz App**: Responsive dynamic quiz dashboard.\n\nAsk me about a specific project to learn its architecture and challenges!`;
    }

    // 2. Skills
    if (q.includes("skill") || q.includes("java") || q.includes("python") || q.includes("language") || q.includes("dsa") || q.includes("oop") || q.includes("backend")) {
      return `Siddharth's technical capabilities include:\n\n* **Languages**: Java, Python, C++, JavaScript, SQL\n* **Web/APIs**: HTML5, CSS3, Bootstrap, Tailwind, REST API Integration\n* **Core Concepts**: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Problem Solving\n* **Tools**: Git, GitHub, VS Code, Canva`;
    }

    // 3. Experience / Internship
    if (q.includes("experience") || q.includes("intern") || q.includes("work") || q.includes("wolfox")) {
      const exp = resumeData.experience[0];
      return `Siddharth completed a **${exp.role}** internship at **${exp.company}** (Kolhapur):\n\n* **Duration**: ${exp.duration}\n* **Responsibilities**:\n  - Developed responsive web pages using HTML5, CSS3, and Bootstrap.\n  - Resolved front-end bugs and refined user experience.\n  - Collaborated in Agile sprint planning and Git workflows.`;
    }

    // 4. Education / BTech / College / Diploma
    if (q.includes("education") || q.includes("college") || q.includes("btech") || q.includes("diploma") || q.includes("ssc") || q.includes("gpa")) {
      return `Siddharth's academic background:\n\n1. **B.Tech (CSBS)**:KIT College of Engineering, Kolhapur (2024 - 2027) | **CGPA: 7.7 / 10**\n2. **Diploma (CSE)**: Government Polytechnic, Miraj (2021 - 2024) | **85.54% (First Class with Distinction)**\n3. **SSC**: New English School, Miraj (2020 - 2021) | **79.40%**`;
    }

    // 5. Achievements / Awards / NCC
    if (q.includes("achievement") || q.includes("award") || q.includes("ncc") || q.includes("certif")) {
      return `Here are Siddharth's prominent accolades:\n\n* **NCC 'A' Certificate**: 16 Maharashtra Battalion NCC, Sangli (11/07/2019).\n* **C Programming Certification**: A+ Grade from Phoenix Computer Education Center (15/05/2022).\n* **Diploma distinction**: Graduated top-tier with 85.54% distinction marks in CSE.`;
    }

    // 6. Contact / Email / Resume / Phone
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("location") || q.includes("resume") || q.includes("hire")) {
      return `You can get in touch with Siddharth directly:\n\n* ✉️ **Email**: [siddharthgavali55@gmail.com](mailto:${resumeData.email})\n* 📞 **Phone**: [${resumeData.phone}](tel:${resumeData.phone})\n* 📍 **Location**: ${resumeData.location}\n* 💼 **LinkedIn**: [Profile](${resumeData.socials.linkedin})\n* 🛠️ **GitHub**: [github.com/siddharthgavali11-dev](${resumeData.socials.github})`;
    }

    // Default Fallback
    return `I'm not completely sure about that. I can provide details regarding Siddharth's **Skills**, **Projects** (StudentSync, LendFlow, Quiz App), **Work Experience** (Wolfox Intern), **Education**, or **Contact Information**. Try asking something like: *"What is StudentSync?"* or *"What are his programming languages?"*`;
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // 2. Simulate AI Typing response
    setIsTyping(true);
    setTimeout(() => {
      const aiReply = generateResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "ai",
          text: aiReply,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-linear-to-tr from-neon-cyan to-neon-purple text-dark-bg flex items-center justify-center shadow-xl shadow-neon-cyan/20 cursor-pointer focus:outline-none hover:scale-105 active:scale-95 transition-all duration-300"
          whileHover={{ rotate: 15 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Chat window panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[400px] h-[500px] glass border border-white/10 rounded-3xl shadow-2xl z-40 overflow-hidden flex flex-col"
          >
            {/* Header info */}
            <div className="p-4 border-b border-white/10 bg-dark-bg/30 backdrop-blur-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-neon-cyan/25 to-neon-purple/20 flex items-center justify-center border border-neon-cyan/40">
                  <Sparkles className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">AI Assistant</h4>
                  <span className="text-[10px] font-mono text-neon-cyan uppercase">Siddharth's Resume Agent</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-foreground/50 hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat list area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start gap-2.5 max-w-[82%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                      msg.sender === "user" 
                        ? "bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan" 
                        : "bg-neon-purple/10 border-neon-purple/20 text-neon-purple"
                    }`}>
                      {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-linear-to-tr from-neon-cyan/15 to-neon-blue/20 text-foreground border border-neon-cyan/20 rounded-tr-none"
                        : "bg-white/5 text-foreground/90 border border-white/5 rounded-tl-none"
                    }`}>
                      {msg.text.split("\n").map((line, idx) => {
                        // Very simple markdown bold syntax rendering in frontend chatbot bubble
                        let rendered = line;
                        
                        // Handle Bold text **some text**
                        if (rendered.includes("**")) {
                          const parts = rendered.split("**");
                          return (
                            <p key={idx} className="mb-1">
                              {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-neon-cyan font-bold">{p}</strong> : p)}
                            </p>
                          );
                        }
                        
                        // Handle links [text](url)
                        if (rendered.includes("[")) {
                          const match = rendered.match(/\[(.*?)\]\((.*?)\)/);
                          if (match) {
                            const before = rendered.substring(0, match.index);
                            const text = match[1];
                            const url = match[2];
                            const after = rendered.substring((match.index || 0) + match[0].length);
                            return (
                              <p key={idx} className="mb-1">
                                {before}
                                <a href={url} target="_blank" rel="noopener noreferrer" className="text-neon-purple hover:underline font-bold">
                                  {text}
                                </a>
                                {after}
                              </p>
                            );
                          }
                        }

                        return <p key={idx} className="mb-1">{line}</p>;
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border bg-neon-purple/10 border-neon-purple/20 text-neon-purple">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-foreground/35 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-foreground/35 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-foreground/35 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick chips suggestion wrapper */}
            {messages.length === 1 && (
              <div className="p-3 bg-black/10 border-t border-white/5 flex gap-1.5 flex-wrap">
                {suggestionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip)}
                    className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 hover:bg-neon-cyan/15 hover:text-neon-cyan border border-white/5 hover:border-neon-cyan/30 text-foreground/60 transition cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Message input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 border-t border-white/10 bg-dark-bg/40 backdrop-blur-lg flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects..."
                className="flex-1 px-4 py-2.5 text-xs rounded-xl glass border border-white/10 text-foreground placeholder-foreground/40 focus:outline-none focus:border-neon-cyan/50"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-linear-to-tr from-neon-cyan to-neon-purple text-dark-bg flex items-center justify-center cursor-pointer hover:opacity-90 active:scale-95 transition-all shadow-md shadow-neon-cyan/5"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
