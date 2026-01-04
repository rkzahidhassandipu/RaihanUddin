import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBehance,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="relative bg-[#030712] text-white py-12 px-4 border-t border-red-500/20 shadow-[0_-10px_30px_rgba(239,68,68,0.05)]"
    >
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-red-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center space-y-8">
        {/* Name & Role */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Raihan <span className="text-red-500">Uddin</span>
          </h3>
          <p className="inline-block text-slate-400 font-medium mt-2 text-sm uppercase tracking-widest">
            Full Stack Web Developer
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 text-xl">
          {[
            { icon: <FaGithub />, href: "https://github.com/rkzahidhassandipu" },
            { icon: <FaLinkedin />, href: "https://linkedin.com/in/rkzahidhassandipu" },            { icon: <FaBehance />, href: "https://www.behance.net/rkzahidhassandipu" },
            { icon: <FaEnvelope />, href: "mailto:rkrazzakhan01731@gmail.com" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 border border-white/10 hover:border-red-500/50 p-4 rounded-full transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative z-10 group-hover:text-red-500 transition-colors">
                {social.icon}
              </div>
              <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/5 rounded-full blur-md transition-all" />
            </a>
          ))}
        </div>

        {/* Separator Line */}
        <div className="h-[1px] w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Credits */}
        <div className="text-sm text-slate-500">
          <p>
            Created by{" "}
            <span className="font-semibold text-slate-300">Raihan Uddin</span> • ©
            2025 All rights reserved
          </p>
          <p className="text-xs text-slate-600 mt-2 tracking-wide">
            Built with <span className="text-red-500">Next.js</span>, <span className="text-red-500">Tailwind CSS</span> & GSAP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;