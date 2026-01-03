"use client";

import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center group cursor-pointer">
      <h1 className="text-2xl font-bold flex items-center gap-3">
        {/* Animated Icon Circle */}
        <div className="relative w-11 h-11 bg-[#FF5757] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,87,87,0.4)] transition-transform duration-300 group-hover:rotate-[360deg]">
          <span className="text-white text-xl font-black italic">R</span>
          
          {/* Subtle Ring Effect */}
          <div className="absolute inset-0 border-2 border-white/20 rounded-full scale-110 group-hover:scale-100 transition-transform duration-500"></div>
        </div>

        {/* Text Logo with Gradient Hover */}
        <div className="flex flex-col leading-tight">
          <span className="text-white text-xl tracking-tight font-extrabold group-hover:text-[#FF5757] transition-colors duration-300">
            Raihan <span className="text-[#FF5757] group-hover:text-white transition-colors duration-300">Uddin</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">
            Portfolio
          </span>
        </div>
      </h1>
    </div>
  );
};

export default Logo;