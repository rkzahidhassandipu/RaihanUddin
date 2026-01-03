"use client";
import React from "react";
import BgTextAnimation from "./BgTextAnimation";
import VideoModal from "./VideoModal";
import { TypeAnimation } from "react-type-animation";
import { useHero } from "@/app/hooks/useHero";
import * as FaIcons from "react-icons/fa";

const DynamicIcon = ({ name }: { name: string }) => {
  // Clean the string (remove extra spaces)
  const iconName = name?.trim();
  const IconComponent = (FaIcons as any)[iconName];
  
  if (!IconComponent) {
    return <span className="text-[10px] text-gray-500">No Icon</span>;
  }
  return <IconComponent className="text-xl" />;
};

export default function Hero() {
  const { data, loading, error } = useHero();

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>;
  if (error) return <p className="text-white text-center mt-20">Error: {error}</p>;
  if (!data?.hero) return <p className="text-white text-center mt-20">No hero data found.</p>;

  const { hero, about } = data;

  // Prepare sequence for animation
  const typeSequence = hero.roles.flatMap((role: string) => [role, 2000]);

  return (
    <div
    id="hero"
      className="min-h-screen text-white relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('${hero.bgImage}')` }}
    >
      <div className="w-4/5 mx-auto min-h-screen flex items-center relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-center w-full relative z-10">
          
          {/* Left Content */}
          <div className="space-y-8 lg:pr-8">
            <p className="text-gray-400 text-xs tracking-[0.3em] uppercase font-medium">{hero.greeting}</p>
            <h1 className="text-[3rem] lg:text-[2.7rem] xl:text-[3.2rem] font-bold leading-[0.95] tracking-tight">{hero.name}</h1>
            <TypeAnimation
              sequence={typeSequence}
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
            
            {/* FIXED SECTION: Mapping over the socials array */}
            <div className="flex gap-3">
              {about.socials?.map((social: any, index: number) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a1a] text-3xl rounded-md flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  {/* Using social.platform OR social.icon based on your JSON */}
                  <DynamicIcon name={social.platform || social.icon} />
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