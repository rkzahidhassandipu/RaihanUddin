"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import { useHero } from "@/app/hooks/useHero";

export default function TestimonialSlider() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const { data, loading, error } = useHero();

  // Safe fallback in case data isn't loaded yet
  const testimonialsSection = data?.testimonials || {
    title: "",
    subtitle: "",
    images: [],
  };

  useEffect(() => {
    const animations: gsap.core.Tween[] = [];

    // Row 1: Left to Right
    if (row1Ref.current) {
      const totalWidth = row1Ref.current.scrollWidth / 2;
      animations.push(gsap.to(row1Ref.current, {
        x: -totalWidth,
        duration: 35,
        ease: "none",
        repeat: -1,
      }));
    }

    // Row 2: Right to Left
    if (row2Ref.current) {
      const totalWidth = row2Ref.current.scrollWidth / 2;
      gsap.set(row2Ref.current, { x: -totalWidth });
      animations.push(gsap.to(row2Ref.current, {
        x: 0,
        duration: 40,
        ease: "none",
        repeat: -1,
      }));
    }

    return () => {
      animations.forEach(anim => anim.kill());
    };
  }, [testimonialsSection.images]);  if (loading)
    return <p className="text-white text-center mt-20">Loading testimonials...</p>;
  if (error)
    return <p className="text-white text-center mt-20">Failed to load testimonials.</p>;

  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="w-4/5 mx-auto mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-500 mb-2 flex justify-center items-center gap-3">
          {(() => {
            const parts = testimonialsSection.title.split(' ');
            const firstWord = parts[0] || '';
            const rest = parts.slice(1).join(' ');
            return rest ? (
              <>{firstWord} <BsFillQuestionDiamondFill className="text-red-500" /> {rest}</>
            ) : (
              <>{firstWord}</>
            );
          })()}
        </h2>        <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full mb-8" />
        <p className="text-center text-sm sm:text-base text-gray-400 mt-2 mb-10">
          {testimonialsSection.subtitle}
        </p>
      </div>

      <div
        className="space-y-12 relative w-4/5 mx-auto"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        {/* Row 1: Left to Right */}
        <div
          className="flex whitespace-nowrap gap-6 will-change-transform"
          ref={row1Ref}
        >
          {[...testimonialsSection.images, ...testimonialsSection.images].map(
            (img, i) => (
              <div key={`r1-${i}`} className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0">
                <img
                  src={img}
                  className="w-full h-full object-cover rounded-3xl border border-white/10"
                  alt="client"
                />
              </div>
            )
          )}
        </div>

        {/* Row 2: Right to Left */}
        <div
          className="flex whitespace-nowrap gap-6 will-change-transform"
          ref={row2Ref}
        >
          {[...testimonialsSection.images, ...testimonialsSection.images].map(
            (img, i) => (
              <div key={`r2-${i}`} className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0">
                <img
                  src={img}
                  className="w-full h-full object-cover rounded-3xl border border-white/10"
                  alt="client"
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
