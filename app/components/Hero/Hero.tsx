"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import BgTextAnimation from "./BgTextAnimation";
import { TypeAnimation } from "react-type-animation";
import VideoModal from "./VideoModal";
import { FaPlay } from "react-icons/fa";



export default function Hero() {
  const { hero } = portfolioData;
  const { about } = portfolioData;

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('${hero.bgImage}')` }}
    >
      <div className="w-4/5 mx-auto px-6 lg:px-12 min-h-screen flex items-center relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-center w-full relative z-10">
          
          {/* Left Content */}
          <div className="space-y-8 lg:pr-8">
            <div className="space-y-2">
              <p className="text-gray-400 text-xs tracking-[0.3em] uppercase font-medium">
                {hero.greeting}
              </p>
              <h1 className="text-[3.5rem] lg:text-[3rem] xl:text-[4rem] font-bold leading-[0.95] tracking-tight">
                {hero.name}
              </h1>
              <div className="mt-4">
                <TypeAnimation
                  sequence={hero.roles}
                  wrapper="h2"
                  speed={50}
                  className="text-xl sm:text-2xl font-semibold text-red-600"
                  repeat={Infinity}
                />
              </div>
            </div>

           
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
            <div>
              <h3 className="text-2xl font-bold mb-6">{about.heading}</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                {about.description}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-5 font-medium">
                {about.socialLabel}
              </p>
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
      </div>
      {/* Background Scrolling Text from JSON */}
      <BgTextAnimation text={hero.bgScrollingText} />
    </div>
  );
}