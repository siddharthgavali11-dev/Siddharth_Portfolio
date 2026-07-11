"use client";

import React, { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./SocialIcons";
import { resumeData } from "../utils/resumeData";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const tempErrors: typeof errors = {};
    if (!name.trim()) tempErrors.name = "Full name is required.";
    
    if (!email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    
    if (!message.trim()) tempErrors.message = "Message cannot be empty.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    // Simulate API Form Submission latency
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      // Reset status after a few seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-white/1 dark:bg-black/10">
      <div className="absolute right-1/4 top-1/4 w-80 h-80 rounded-full bg-neon-purple/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-wider">
            Get In <span className="text-glow-gradient">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-neon-cyan to-neon-purple mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          {/* Column 1: Info & Map Placeholder */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Contact details */}
            <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-neon-cyan" />
                Contact Info
              </h3>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-foreground/45 uppercase tracking-wider">
                    Email Address
                  </h4>
                  <a
                    href={`mailto:${resumeData.email}`}
                    className="text-sm font-bold text-foreground hover:text-neon-cyan transition duration-300"
                  >
                    {resumeData.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-foreground/45 uppercase tracking-wider">
                    Phone Number
                  </h4>
                  <a
                    href={`tel:${resumeData.phone}`}
                    className="text-sm font-bold text-foreground hover:text-neon-purple transition duration-300"
                  >
                    {resumeData.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-neon-magenta/10 border border-neon-magenta/20 flex items-center justify-center text-neon-magenta shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-foreground/45 uppercase tracking-wider">
                    Location
                  </h4>
                  <p className="text-sm font-bold text-foreground">
                    {resumeData.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder Graphic */}
            <div className="glass p-6 rounded-3xl border border-white/10 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden group select-none min-h-[200px]">
              {/* Animated Radar Rings */}
              <div className="absolute w-24 h-24 rounded-full border border-neon-cyan/20 animate-ping pointer-events-none" />
              <div className="absolute w-36 h-36 rounded-full border border-neon-purple/10 animate-pulse pointer-events-none" />

              <div className="w-9 h-9 rounded-full bg-neon-cyan/10 border border-neon-cyan flex items-center justify-center mb-3.5 z-10 shadow-lg shadow-neon-cyan/25">
                <MapPin className="w-4 h-4 text-neon-cyan" />
              </div>
              <h4 className="font-bold text-sm text-foreground mb-1 z-10">Based in Maharashtra</h4>
              <p className="text-[10px] font-mono text-foreground/50 z-10">
                Ready to relocate or work remotely
              </p>
            </div>
          </div>

          {/* Column 2: Form */}
          <div className="lg:col-span-7">
            <div className="glass p-8 sm:p-10 rounded-3xl border border-white/10 h-full">
              <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-neon-purple" />
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-foreground/60">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl glass border focus:outline-none text-sm transition-all duration-300 ${
                      errors.name 
                        ? "border-red-500/50 focus:border-red-500" 
                        : "border-white/10 focus:border-neon-cyan/50"
                    }`}
                    placeholder="Enter name"
                  />
                  {errors.name && <p className="text-[10px] font-mono text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-foreground/60">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl glass border focus:outline-none text-sm transition-all duration-300 ${
                      errors.email 
                        ? "border-red-500/50 focus:border-red-500" 
                        : "border-white/10 focus:border-neon-cyan/50"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-[10px] font-mono text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-mono text-foreground/60">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl glass border focus:outline-none text-sm transition-all duration-300 ${
                      errors.message 
                        ? "border-red-500/50 focus:border-red-500" 
                        : "border-white/10 focus:border-neon-cyan/50"
                    }`}
                    placeholder="Describe your inquiry..."
                  />
                  {errors.message && <p className="text-[10px] font-mono text-red-500 mt-1">{errors.message}</p>}
                </div>

                {/* Submission State Banner */}
                {status === "success" && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 rounded-xl text-xs flex items-center gap-3.5 animate-pulse">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <span>Message received successfully! I will get back to you shortly.</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4.5 rounded-xl bg-linear-to-r from-neon-cyan to-neon-purple text-dark-bg font-extrabold text-xs uppercase tracking-widest cursor-pointer hover:opacity-90 active:scale-98 transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-neon-cyan/15 disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <span className="w-5 h-5 rounded-full border-2 border-dark-bg border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
