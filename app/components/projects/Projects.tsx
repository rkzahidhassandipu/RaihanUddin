"use client";

import React, { useEffect, useRef } from "react";
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import ProjectSlider from "./ProjectSlider";
import gsap from "gsap";
import { useHero } from "@/app/hooks/useHero";

const Projects = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { data, loading, error } = useHero(); // hook always called

  // destructure safely with fallback
  const title = data?.projects?.title || "";
  const subtitle = data?.projects?.subtitle || "";
  const list = data?.projects?.list || [];

  useEffect(() => {
    if (list.length === 0) return; // only run if we have data

    gsap.fromTo(
      cardsRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, [list]); // run when list changes

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // render loading/error states in JSX only
  if (loading)
    return <p className="text-center text-white mt-20">Loading projects...</p>;
  if (error || list.length === 0)
    return (
      <p className="text-center text-white mt-20">Failed to load projects.</p>
    );

  return (
    <section
      id="projects"
      className="relative py-20 bg-black text-white overflow-hidden"
    >
      {/* Background Images */}
      <div
        className="absolute top-0 left-0 w-1/2 h-1/2 bg-cover bg-left-top z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/7PQQZLbb/projects-bg-1.png')",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-cover bg-right-bottom z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/X7G1G0yL/projects-bg-2.png')",
        }}
      />

      <div className="relative z-10 mx-auto w-4/5">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-500 mb-2">
          {title}
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-8 rounded-full" />
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-12 text-center">
          {subtitle}
        </p>

        <div className="relative space-y-16 border-l-2 border-red-500/40 pl-6">
          {list.map((exp: any, idx: number) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              className="group relative rounded-xl p-[1.5px] bg-white/10 overflow-hidden"
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(1000px circle at var(--mouse-x) var(--mouse-y), rgba(239, 68, 68, 0.6), transparent 40%)`,
                }}
              />

              <div className="relative z-10 bg-black/90 p-6 sm:p-8 rounded-xl backdrop-blur-md">
                <span className="absolute -left-[3.4rem] top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-black" />
                <div
                  className={`flex flex-col md:flex-row gap-8 ${
                    idx % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="md:w-1/2">
                    <ProjectSlider images={exp.images} />
                    <div className="mt-4">
                      <h4 className="font-semibold text-red-400 mb-2">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="bg-red-500/20 px-3 py-1 rounded-full text-sm text-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2 space-y-4">
                    <h3 className="text-2xl font-bold text-red-400">
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaBuilding /> {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt /> {exp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt /> {exp.duration}
                      </span>
                      <span className="bg-red-500/20 px-2 py-0.5 rounded text-xs">
                        {exp.type}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm sm:text-base">
                      {exp.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-red-400 mb-2">
                        Key Achievements
                      </h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {exp.achievements.map((ach: string, i: number) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-400 mb-2">
                        Related Links
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {Object.entries(exp.links).map(([key, url]) => (
                          <a
                            key={key}
                            href={typeof url === "string" ? url : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-red-400 hover:underline"
                          >
                            🔗 {key.charAt(0).toUpperCase() + key.slice(1)}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
