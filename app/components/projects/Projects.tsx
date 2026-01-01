"use client";

import React, { useEffect, useRef } from "react";
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import ProjectSlider from "./ProjectSlider";
import gsap from "gsap";
// data/projectsData.ts

export const projectsData = {
  project: {
    title: "Featured Projects",
    subtitle:
      "A selection of real-world projects highlighting my experience in full-stack development, UI design, and backend systems.",
  },

  experiences: [
    {
      title: "FoodExpiry",
      company: "Food Expiry Tracker System",
      location: "Remote",
      duration: "2025",
      createdAt: "Jan 12, 2025",
      updatedAt: "Dec 28, 2025",
      status: "published",
      type: "Personal Project",
      description:
        "Developed a full-stack application to help users reduce food waste by tracking the expiry dates of their stored food items.",
      achievements: [
        "Implemented secure JWT-based API with user-specific access control",
        "Built custom expiry countdown logic and dynamic badge system",
        "Integrated Firebase authentication",
        "Designed responsive UI with Tailwind & Framer Motion",
        "Created modular CRUD system",
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT"],
      links: {
        live: "https://assignment11-d0983.web.app/",
        github: "https://github.com/rkzahidhassandipu/Food-Expiry-Tracker-A-11",
      },
      images: [
        "https://i.postimg.cc/nVyCsz3x/Screenshot-40.png",
        "https://i.postimg.cc/rsxyG1fk/Screenshot-41.png",
        "https://i.postimg.cc/76pYTsM9/Screenshot-42.png",
      ],
    },

    {
      title: "GardenHub",
      company: "Gardening Community & Resource Hub",
      location: "Remote",
      duration: "2025",
      createdAt: "Feb 05, 2025",
      updatedAt: "Dec 20, 2025",
      status: "published",
      type: "Personal Project",
      description:
        "Built a full-stack community platform for gardening enthusiasts to share tips and connect.",
      achievements: [
        "Full CRUD and like system",
        "Firebase authentication",
        "Dark/light theme UI",
        "Secure deployment",
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Firebase"],
      links: {
        live: "https://gardeners-a1082.web.app/",
        github: "https://github.com/rkzahidhassandipu/GardenHub-A-10",
      },
      images: [
        "https://i.postimg.cc/kG9ZR7Sc/Screenshot-35.png",
        "https://i.postimg.cc/L4BGKZd0/Screenshot-36.png",
        "https://i.postimg.cc/D0gNqRdK/Screenshot-37.png",
      ],
    },

    {
      title: "Boxify",
      company: "Subscription Box Service Platform",
      location: "Remote",
      duration: "2025",
      createdAt: "Mar 10, 2025",
      updatedAt: "Dec 15, 2025",
      status: "published",
      type: "Personal Project",
      description:
        "Subscription box platform with Firebase authentication and protected routes.",
      achievements: [
        "Firebase email & Google login",
        "Protected routes",
        "Profile update system",
        "SwiperJS integration",
      ],
      technologies: ["React", "Firebase", "Tailwind CSS", "React Router"],
      links: {
        live: "https://subscriptionbox-34c8e.web.app/",
        github: "https://github.com/rkzahidhassandipu/Boxify_Authentication_A_9",
      },
      images: [
        "https://i.postimg.cc/YqXYygkH/Screenshot-43.png",
        "https://i.postimg.cc/3xVp3Tdf/Screenshot-44.png",
        "https://i.postimg.cc/rmLrtNGS/Screenshot-45.png",
      ],
    },
  ],
};


const Projects = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { project, experiences } = projectsData;

  useEffect(() => {
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
  }, []);

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

  return (
    <section
      id="projects"
      className="relative bg-black text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
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
          {project.title}
        </h2>

        <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-8 rounded-full" />

        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-12 text-center">
          {project.subtitle}
        </p>

        <div className="relative space-y-16 border-l-2 border-red-500/40 pl-6">
          {experiences
            .filter((exp) => exp.status === "published")
            .slice(0, 3)
            .map((exp, idx) => (
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
                          {exp.technologies.map((tech, i) => (
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
                          {exp.achievements.map((ach, i) => (
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
                              href={url}
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
