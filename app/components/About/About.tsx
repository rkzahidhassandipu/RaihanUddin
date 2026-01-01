"use client";

import React from "react";
import { Code, Heart, User } from "lucide-react";
// ধরুন portfolioData অন্য ফাইল থেকে আসছে
// import { portfolioData } from '../data/portfolioData';
export const portfolioData = {
  // ... অন্যান্য ডাটা
  about: {
    heading: "About Me",
    subtitle: "Who I am, what I do, and how I got here",
    journeyTitle: "My Journey",
    journeyParagraphs: [
      "I am a professional Web Developer with a deep passion for building modern and responsive web applications. I've been working in the web development field for a long time, but my journey has not been easy. Despite trying multiple times and following many YouTube tutorials and playlists, I struggled due to the lack of proper guidance.",
      "Recently, I completed a comprehensive course from Programming Hero, which completely changed my perspective. From there, I gained a clear understanding of how to learn new technologies, how to think like a developer, and how to stay motivated throughout a project.",
    ],
    interests: [
      {
        iconName: "Code",
        title: "Web Developer",
        desc: "Building modern full-stack applications with clean and scalable code.",
        points: [
          "MERN Stack (MongoDB, Express.js, React.js, Node.js)",
          "Firebase authentication (Email/Password + Google)",
          "Stripe payment integration",
          "Responsive UI with Tailwind CSS",
        ],
      },
      {
        iconName: "Heart",
        title: "Graphic Designer",
        desc: "Creating visually appealing and user-focused designs.",
        points: [
          "Social media design",
          "Branding and logo design",
          "T-shirt and motion graphics",
          "4+ years of hands-on experience",
        ],
      },
    ],
  },
  // ... অন্যান্য ডাটা
};
// আইকন ম্যাপার ফাংশন
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Code":
      return <Code className="w-8 h-8" />;
    case "Heart":
      return <Heart className="w-8 h-8" />;
    default:
      return <User className="w-8 h-8" />;
  }
};

export default function AboutMe() {
  const { about } = portfolioData;

  return (
    <section
      id="about"
      className="relative py-16 px-4 sm:px-6 md:px-8 bg-black"
    >
      <div className="relative z-10 w-4/5 mx-auto rounded-xl">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-red-400">
          {about.heading}
        </h2>

        <div className="h-1 w-20 bg-gradient-to-r from-red-400 to-red-600 mx-auto mb-8 rounded-full" />
        <p className="text-center text-sm sm:text-base text-gray-400 mt-2 mb-10">
          {about.subtitle}
        </p>

        <div className="grid gap-10">
          {/* My Journey Box */}
          <div className="bg-zinc-900/70 p-6 sm:p-8 rounded-xl backdrop-blur-sm border border-red-500/20 shadow-md">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {about.journeyTitle}
            </h3>

            {about.journeyParagraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed"
              >
                {para}
              </p>
            ))}

            {/* Interest Cards Mapping */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 mt-8">
              {about.interests.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-black to-red-500/20 p-6 rounded-xl border border-red-500/10 shadow-lg hover:scale-[1.02] transition-transform text-left"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-white">
                    {getIcon(item.iconName)}
                  </div>
                  <h2 className="text-white font-bold text-xl mb-2">
                    {item.title}
                  </h2>
                  <p className="text-white/70 mb-3 text-sm">{item.desc}</p>
                  <ul className="list-disc list-inside space-y-1 text-white/60 text-xs sm:text-sm">
                    {item.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
