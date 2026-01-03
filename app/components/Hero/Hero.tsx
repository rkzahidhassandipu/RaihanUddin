"use client";
import React from "react";
import BgTextAnimation from "./BgTextAnimation";
import VideoModal from "./VideoModal";
import { TypeAnimation } from "react-type-animation";
import { useHero } from "@/app/hooks/useHero";

export default function Hero() {
  const { data, loading, error } = useHero();

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>;
  if (error) return <p className="text-white text-center mt-20">Error: {error}</p>;
  if (!data?.hero) return <p className="text-white text-center mt-20">No hero data found.</p>;

  const { hero, about } = data;

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('${hero.bgImage}')` }}
    >
      <div className="w-4/5 mx-auto px-6 lg:px-12 min-h-screen flex items-center relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-center w-full relative z-10">
          
          {/* Left Content */}
          <div className="space-y-8 lg:pr-8">
            <p className="text-gray-400 text-xs tracking-[0.3em] uppercase font-medium">{hero.greeting}</p>
            <h1 className="text-[3rem] lg:text-[2.7rem] xl:text-[3.2rem] font-bold leading-[0.95] tracking-tight">{hero.name}</h1>
            <TypeAnimation
              sequence={hero.roles}
              wrapper="h2"
              speed={5}
              className="text-xl sm:text-2xl font-semibold text-red-600"
              repeat={Infinity}
            />
            <VideoModal videoLink={hero.videoUrl} videoIcon={hero.buttons} />
          </div>

          {/* Middle Image */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-[450px]">
              <img
                src={hero.profileImg}
                alt={hero.name}
                className="w-full h-auto object-cover"
                style={{ filter: "brightness(0.9) contrast(1.1)" }}
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 lg:pl-8">
            <h3 className="text-2xl font-bold mb-6">{about.heading}</h3>
            <p className="text-gray-400 leading-relaxed text-base">{about.description}</p>

            <p className="text-sm text-gray-400 mb-5 font-medium">{about.socialLabel}</p>
            <div className="flex gap-3">
              {about.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="w-11 h-11 bg-[#1a1a1a] rounded-md flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BgTextAnimation text={hero.bgScrollingText} />
    </div>
  );
}
