"use client";

import React, { useRef, useEffect } from "react";
import Hero from "./components/Hero/Hero";
import AboutMe from "./components/About/About";
import Projects from "./components/projects/Projects";
import SkillsSection from "./components/skills/Skills";
import TestimonialSlider from "./components/Testimonials/Testimonials";
import GetInTouch from "./components/GetInTouch/GetInTouch";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // পুরো পেজের সাপেক্ষে মাউসের পজিশন বের করা
      const x = e.pageX; 
      const y = e.pageY;

      // CSS Variables সেট করা যা পুরো পেজ জুড়ে কাজ করবে
      containerRef.current.style.setProperty("--global-mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--global-mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main 
      ref={containerRef} 
      className="relative bg-[#030712] min-h-screen overflow-x-hidden"
    >
      {/* GLOBAL MOUSE FOLLOW COLOR (পুরো পেজ জুড়ে মাউসের গ্লো) */}
      <div
        className="pointer-events-none absolute inset-0 z-50 hidden lg:block"
        style={{
          background: `radial-gradient(600px circle at var(--global-mouse-x) var(--global-mouse-y), rgba(239, 68, 68, 0.15), transparent 80%)`,
          height: "100%",
          width: "100%",
        }}
      />

      <div className="relative z-10">
        <Hero />
        <AboutMe />
        <Projects />
        <SkillsSection />
        <TestimonialSlider />
        <GetInTouch />
      </div>
    </main>
  );
}