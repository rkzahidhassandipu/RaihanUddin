"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHero } from "../../hooks/useHero";
import { SkillItem } from "../../types/dataTypes";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const { data, loading, error } = useHero();
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  // Safe access: fallback to empty object/array if data not loaded
  const skills = data?.skills || { title: "", subtitle: "", items: [] };

  useEffect(() => {
    if (!skills.items.length) return; // don't run if no skills yet

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
  }, [skills.items]); // run effect when skills.items change

  if (loading) return <p className="text-white text-center mt-20">Loading skills...</p>;
  if (error) return <p className="text-white text-center mt-20">Failed to load skills.</p>;

  return (
    <section 
      id="skills"
      ref={sectionRef} 
      className="bg-black py-20 transition-colors"
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
          {skills.items.map((skill: SkillItem, index: number) => (
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
