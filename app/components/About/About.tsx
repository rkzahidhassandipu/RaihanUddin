"use client";

import { Code, Heart, User } from "lucide-react";
import { useHero } from "@/app/hooks/useHero";

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
  const { data, loading, error } = useHero();

  // Wait for data
  if (loading)
    return <p className="text-white text-center mt-20">Loading...</p>;
  if (error || !data?.about)
    return <p className="text-white text-center mt-20">Failed to load data</p>;

  const about = data.about;

  return (
    <section id="about" className="relative py-20 bg-black">
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

            {about?.journeyParagraphs?.map((para: string, idx: number) => (
              <p
                key={idx}
                className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed"
              >
                {para}
              </p>
            ))}

            {/* Interest Cards Mapping */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 mt-8">
              {about?.interests?.map((item, index) => (
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
