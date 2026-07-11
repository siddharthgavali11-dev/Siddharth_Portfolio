"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, Variants} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Star, GitFork, Users, BookOpen, Layers } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./SocialIcons";
import { resumeData } from "../utils/resumeData";

interface GithubUserData {
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  name: string;
}

interface LanguageShare {
  name: string;
  percentage: number;
  color: string;
}

export default function ProfilesAndAchievements() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [githubUser, setGithubUser] = useState<GithubUserData | null>(null);
  const [languages, setLanguages] = useState<LanguageShare[]>([]);
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    // Dynamic GitHub API Fetching for user siddharthgavali11-dev
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        // Profile Info
        const userRes = await fetch("https://api.github.com/users/siddharthgavali11-dev");
        if (userRes.ok) {
          const userData = await userRes.json();
          setGithubUser({
            avatar_url: userData.avatar_url,
            public_repos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            bio: userData.bio || "Aspiring Software Developer",
            name: userData.name || "Siddharth Gavali"
          });
        }

        // Repos for stars & languages calculation
        const reposRes = await fetch("https://api.github.com/users/siddharthgavali11-dev/repos?per_page=100");
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          
          // Calculate stars
          let totalStars = 0;
          const langMap: { [key: string]: number } = {};
          
          reposData.forEach((repo: any) => {
            totalStars += repo.stargazers_count;
            if (repo.language) {
              langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            }
          });
          setStars(totalStars);

          // Calculate language percentages
          const totalLangsCount = Object.values(langMap).reduce((a, b) => a + b, 0);
          const colorsMap: { [key: string]: string } = {
            Java: "#b07219",
            Python: "#3572A5",
            JavaScript: "#f1e05a",
            HTML: "#e34c26",
            CSS: "#563d7c",
            Dart: "#00B4AB",
            "C++": "#f34b7d",
            TypeScript: "#3178c6"
          };

          const calculatedLangs = Object.keys(langMap).map((key) => ({
            name: key,
            percentage: Math.round((langMap[key] / totalLangsCount) * 100),
            color: colorsMap[key] || "#cbd5e1"
          })).sort((a, b) => b.percentage - a.percentage).slice(0, 4);

          setLanguages(calculatedLangs);
        }
      } catch (err) {
        console.error("Error fetching GitHub details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  // Pre-compiled mock stats in case API limit exceeded
  const staticGithubUser: GithubUserData = {
    avatar_url: "https://github.com/siddharthgavali11-dev.png",
    public_repos: 5,
    followers: 12,
    following: 15,
    bio: "Aspiring Software Developer",
    name: "Siddharth Gavali"
  };

  const activeUser = githubUser || staticGithubUser;
  const activeLangs = languages.length > 0 ? languages : [
    { name: "Java", percentage: 50, color: "#b07219" },
    { name: "JavaScript", percentage: 25, color: "#f1e05a" },
    { name: "HTML/CSS", percentage: 15, color: "#e34c26" },
    { name: "Python", percentage: 10, color: "#3572A5" }
  ];

  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 12 } }
  };

  // Simulated contributions list (90 cells).
  //
  // HYDRATION FIX: Math.random() must never run during render, since the
  // server and the client would each generate different values, causing
  // React's hydration check to fail (server HTML != client HTML).
  //
  // Instead, we start with a stable, deterministic array (all "no
  // contribution") so server and first client render match exactly, then
  // generate the real random colors inside useEffect — which only runs in
  // the browser, after hydration is already complete.
  const [contributions, setContributions] = useState<string[]>(
    () => Array(90).fill("bg-white/5")
  );

  useEffect(() => {
    const list: string[] = [];
    for (let i = 0; i < 90; i++) {
      const rand = Math.random();
      let colorClass = "bg-white/5"; // No contributions
      if (rand > 0.85) colorClass = "bg-emerald-800"; // Light contribution
      else if (rand > 0.7) colorClass = "bg-emerald-600"; // Medium
      else if (rand > 0.5) colorClass = "bg-emerald-400"; // High
      list.push(colorClass);
    }
    setContributions(list);
  }, []);

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-white/1 dark:bg-black/10" ref={ref}>
      <div className="absolute left-0 top-1/4 w-80 h-80 rounded-full bg-neon-magenta/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-wider">
            Achievements & <span className="text-glow-gradient">Profiles</span>
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-neon-cyan to-neon-purple mx-auto mt-4 rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Column 1: Achievements & Awards Badges */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass p-8 rounded-3xl border border-white/10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-neon-cyan" />
                  Key Achievements
                </h3>
                <ul className="space-y-4">
                  {resumeData.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-sm text-foreground/75 leading-relaxed flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan shrink-0 mt-2" />
                      <span className="text-justify">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Award Badges Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                {resumeData.awards.map((award, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/5 dark:bg-white/5 light:bg-black/5 rounded-2xl border border-white/5 hover:border-neon-purple/40 hover:scale-105 transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-neon-purple/10 flex items-center justify-center border border-neon-purple/20 mb-3 group-hover:scale-110 transition duration-300">
                      <Award className="w-5 h-5 text-neon-purple" />
                    </div>
                    <h4 className="text-xs font-bold text-foreground line-clamp-1">{award.title}</h4>
                    <p className="text-[10px] text-foreground/50 mt-1 line-clamp-1">{award.issuer}</p>
                    <span className="text-[9px] font-mono text-neon-cyan/80 mt-2 font-bold">{award.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 2: Live GitHub Statistics Card */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="glass p-8 rounded-3xl border border-white/10 h-full flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <img
                      src={activeUser.avatar_url}
                      alt={activeUser.name}
                      className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5"
                    />
                    <div>
                      <h3 className="font-bold text-foreground flex items-center gap-1.5">
                        {activeUser.name}
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-neon-cyan/15 text-neon-cyan font-mono border border-neon-cyan/20">
                          Live
                        </span>
                      </h3>
                      <p className="text-xs text-foreground/50 font-mono">
                        github.com/siddharthgavali11-dev
                      </p>
                    </div>
                  </div>

                  {/* External Links buttons */}
                  <div className="flex gap-2">
                    <a
                      href={resumeData.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-neon-cyan/50 text-foreground/80 hover:text-white transition duration-300"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={resumeData.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-neon-purple/50 text-foreground/80 hover:text-white transition duration-300"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={resumeData.socials.hackerrank}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-neon-magenta/50 text-foreground/80 hover:text-white font-mono text-xs font-bold flex items-center justify-center"
                      title="HackerRank Profile"
                    >
                      H⠵
                    </a>
                  </div>
                </div>

                {/* Git statistics grids */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-black/20 dark:bg-black/35 light:bg-black/5 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center">
                    <BookOpen className="w-4 h-4 text-neon-cyan mb-1.5" />
                    <span className="text-lg font-mono font-black text-foreground">
                      {activeUser.public_repos}
                    </span>
                    <span className="text-[10px] text-foreground/50 uppercase font-mono mt-1">
                      Repos
                    </span>
                  </div>
                  <div className="p-4 bg-black/20 dark:bg-black/35 light:bg-black/5 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center">
                    <Star className="w-4 h-4 text-yellow-500 mb-1.5" />
                    <span className="text-lg font-mono font-black text-foreground">{stars}</span>
                    <span className="text-[10px] text-foreground/50 uppercase font-mono mt-1">
                      Stars
                    </span>
                  </div>
                  <div className="p-4 bg-black/20 dark:bg-black/35 light:bg-black/5 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center">
                    <Users className="w-4 h-4 text-neon-purple mb-1.5" />
                    <span className="text-lg font-mono font-black text-foreground">
                      {activeUser.followers}
                    </span>
                    <span className="text-[10px] text-foreground/50 uppercase font-mono mt-1">
                      Followers
                    </span>
                  </div>
                </div>

                {/* Most Used Languages */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-4 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    Dominant Stack
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {activeLangs.map((lang, lIdx) => (
                      <div key={lIdx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="flex items-center gap-1.5 text-foreground/80">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: lang.color }}
                            />
                            {lang.name}
                          </span>
                          <span className="text-foreground/40">{lang.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${lang.percentage}%`,
                              backgroundColor: lang.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid Contribution heat map representation */}
              <div className="pt-6 border-t border-white/5">
                <h4 className="text-xs font-mono text-foreground/40 uppercase tracking-widest mb-3">
                  Interactive Activity Board
                </h4>
                <div className="flex gap-1 overflow-x-auto hide-scrollbar p-1 glass rounded-xl border border-white/5 w-fit max-w-full">
                  <div className="grid grid-flow-col grid-rows-7 gap-1">
                    {contributions.map((color, idx) => (
                      <div
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-sm transition duration-300 hover:scale-125 ${color}`}
                        title="Simulated Git Commit Node"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2.5 text-[9px] font-mono text-foreground/30 px-1">
                  <span>Less</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 rounded bg-white/5" />
                    <div className="w-2 h-2 rounded bg-emerald-800" />
                    <div className="w-2 h-2 rounded bg-emerald-600" />
                    <div className="w-2 h-2 rounded bg-emerald-400" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
