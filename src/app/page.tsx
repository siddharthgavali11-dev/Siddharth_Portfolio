import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Timeline from "../components/Timeline";
import Projects from "../components/Projects";
import ProfilesAndAchievements from "../components/ProfilesAndAchievements";
import ResumeViewer from "../components/ResumeViewer";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      {/* Premium Sticky Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex flex-col w-full relative">
        {/* 1. Hero Landing Block */}
        <Hero />

        {/* 2. Biography summary */}
        <About />

        {/* 3. Skills details */}
        <Skills />

        {/* 4. Experience & Education combined Scroll timeline */}
        <Timeline />

        {/* 5. Projects Case Studies */}
        <Projects />

        {/* 6. Dynamic Git stats and milestones */}
        <ProfilesAndAchievements />

        {/* 7. PDF CV viewer and download triggers */}
        <ResumeViewer />

        {/* 8. Interactive Form */}
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
