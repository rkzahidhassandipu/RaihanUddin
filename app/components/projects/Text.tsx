"use client";

import React, { useEffect, useRef } from "react";import { Card, CardHeader, CardContent } from "@/components/ui/card";
import gsap from "gsap";

type Experience = {
  title: string;
  company: string;
  description: string;
};

const experiences: Experience[] = [
  {
    title: "Full-Stack Project",
    company: "Tech Corp",
    description: "Built scalable UI with Next.js and secure APIs.",
  },
  {
    title: "UI/UX Revamp",
    company: "Design Studio",
    description: "Redesigned dashboards with Tailwind + shadcn/ui.",
  },
];

export default function Test() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // CSS Variables সেট করা হচ্ছে যা বর্ডার ইফেক্ট কন্ট্রোল করবে
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="relative bg-black text-white py-16 px-6">
      <h2 className="text-3xl font-bold text-center text-red-500 mb-8">
        Featured Projects
      </h2>

      <div className="space-y-12">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            ref={(el) => { if (el) cardsRef.current[idx] = el; }}
            onMouseMove={(e) => handleMouseMove(e, idx)}
            className="group relative rounded-xl border border-white/10 bg-gray-900 p-[1px] transition-all duration-300 hover:border-transparent"
          >
            {/* Border Gradient Overlay: 
                মাউস মুভমেন্ট অনুযায়ী এই লেয়ারটি বর্ডারের মতো কাজ করবে 
            */}
            <div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(239, 68, 68, 0.4), transparent 40%)`,
              }}
            />

            <Card className="relative bg-black border-none rounded-xl h-full w-full overflow-hidden">
              <CardHeader>
                <h3 className="text-xl font-bold text-red-400">{exp.title}</h3>
                <p className="text-gray-400 text-sm">{exp.company}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{exp.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}