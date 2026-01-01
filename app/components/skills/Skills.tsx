"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { portfolioData } from './your-data-path';
export const portfolioData = {
  // ... অন্যান্য ডাটা
  skills: {
    title: "Skills",
    subtitle: "The skills, tools and technologies I am really good at:",
    items: [
      { name: "Javascript", icon: "https://skillicons.dev/icons?i=js" },
      { name: "Typescript", icon: "https://skillicons.dev/icons?i=ts" },
      { name: "React", icon: "https://skillicons.dev/icons?i=react" },
      { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
      { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
      { name: "Express.js", icon: "https://skillicons.dev/icons?i=express" },
      { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
      { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
      { name: "Sass/Scss", icon: "https://skillicons.dev/icons?i=sass" },
      { name: "Tailwindcss", icon: "https://skillicons.dev/icons?i=tailwind" },
      { name: "Bootstrap", icon: "https://skillicons.dev/icons?i=bootstrap" },
      { name: "Figma", icon: "https://skillicons.dev/icons?i=figma" },
      { name: "Git", icon: "https://skillicons.dev/icons?i=git" },
      { name: "GitHub", icon: "https://skillicons.dev/icons?i=github" },
      { name: "JQuery", icon: "https://skillicons.dev/icons?i=jquery" },
      { name: "Docker", icon: "https://skillicons.dev/icons?i=docker" },
      { name: "Redux", icon: "https://skillicons.dev/icons?i=redux" },
      { name: "Prisma", icon: "https://skillicons.dev/icons?i=prisma" },
      { name: "Firebase", icon: "https://skillicons.dev/icons?i=firebase" },
      { name: "Ps", icon: "https://skillicons.dev/icons?i=ps" },
      { name: "Ai", icon: "https://skillicons.dev/icons?i=ai" },
      { name: "XD", icon: "https://skillicons.dev/icons?i=xd" },
      { name: "kali", icon: "https://skillicons.dev/icons?i=kali" },
      { name: "Flowbite", icon: "https://flowbite.com/images/logo.svg" },
      { name: "shadcn", icon: "https://ui.shadcn.com/apple-touch-icon.png" },
    ]
  }
};


gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const { skills } = portfolioData; // JSON থেকে ডাটা নেওয়া হচ্ছে

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-item", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-black py-20 px-4 transition-colors"
    >
      <div className="w-4/5 mx-auto text-center" ref={triggerRef}>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-500 mb-2">
          {skills.title}
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-8 rounded-full" />
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-12 text-center">
          {skills.subtitle}
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-y-12 gap-x-4">
          {skills.items.map((skill, index) => (
            <div 
              key={index} 
              className="skill-item flex flex-col items-center gap-3 group"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="w-12 h-12 md:w-14 md:h-14 object-contain"
                />
              </div>
              <p className="text-slate-400 text-sm md:text-base font-medium">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}