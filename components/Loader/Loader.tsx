"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Optional: Dispatch an event or update state that loading is finished
      }
    });

    // Entrance: Subtle scale up of the SVG
    tl.fromTo(svgRef.current, 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    // Exit: Fade out the whole container after a short delay
    tl.to(containerRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.6,
      delay: 2, // Keeps loader visible for at least 2 seconds
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712]"
    >
      <div className="relative">
        {/* Glow Effect behind your SVG */}
        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full scale-150" />
        
        {/* Your Custom Animated SVG */}
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="80"
          height="80"
          fill="#EF4444"
          className="relative z-10"
        >
          <rect width="10" height="10" x="1" y="1" rx="1">
            <animate id="SVG7WybndBt" attributeName="x" begin="0;SVGo3aOUHlJ.end" dur="0.2s" values="1;13" />
            <animate id="SVGVoKldbWM" attributeName="y" begin="SVGFpk9ncYc.end" dur="0.2s" values="1;13" />
            <animate id="SVGKsXgPbui" attributeName="x" begin="SVGaI8owdNK.end" dur="0.2s" values="13;1" />
            <animate id="SVG7JzAfdGT" attributeName="y" begin="SVG28A4To9L.end" dur="0.2s" values="13;1" />
          </rect>
          <rect width="10" height="10" x="1" y="13" rx="1">
            <animate id="SVGUiS2jeZq" attributeName="y" begin="SVG7WybndBt.end" dur="0.2s" values="13;1" />
            <animate id="SVGU0vu2GEM" attributeName="x" begin="SVGVoKldbWM.end" dur="0.2s" values="1;13" />
            <animate id="SVGOIboFeLf" attributeName="y" begin="SVGKsXgPbui.end" dur="0.2s" values="1;13" />
            <animate id="SVG14lAaeuv" attributeName="x" begin="SVG7JzAfdGT.end" dur="0.2s" values="13;1" />
          </rect>
          <rect width="10" height="10" x="13" y="13" rx="1">
            <animate id="SVGFpk9ncYc" attributeName="x" begin="SVGUiS2jeZq.end" dur="0.2s" values="13;1" />
            <animate id="SVGaI8owdNK" attributeName="y" begin="SVGU0vu2GEM.end" dur="0.2s" values="13;1" />
            <animate id="SVG28A4To9L" attributeName="x" begin="SVGOIboFeLf.end" dur="0.2s" values="1;13" />
            <animate id="SVGo3aOUHlJ" attributeName="y" begin="SVG14lAaeuv.end" dur="0.2s" values="13;1" />
          </rect>
        </svg>
      </div>

      <p className="mt-8 text-slate-400 font-medium tracking-[0.2em] animate-pulse">
        
      </p>
    </div>
  );
}