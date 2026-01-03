"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import { HiMenu, HiX } from "react-icons/hi";
import { FaDownload } from "react-icons/fa";
import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";
import Logo from "./logo/Logo";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { name: string; to: string }[] = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Skills", to: "skills" },
    { name: "Contact", to: "contact" },
  ];

  const navLinkClass =
    "hover:text-[#FF5757] cursor-pointer transition-colors duration-300 font-medium text-white";

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href =
      "https://drive.google.com/uc?export=download&id=1aL3MrtQrs1K-b84hj71C_pnRpNgUqIkm";
    link.download = "Raihan-Uddin-Full-stack-developer.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-black/80 shadow-lg border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-[95%] lg:max-w-[90%] mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden lg:flex justify-center flex-1">
          <ul className="flex gap-8 text-base">
            {navLinks.map((link, i) => (
              <ScrollLink
                key={i}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-70}
                className={navLinkClass}
              >
                {link.name}
              </ScrollLink>
            ))}
          </ul>
        </div>

        {/* Social Icons & Resume Button */}
        <div className="hidden lg:flex items-center gap-4">
          
          
          {/* Resume Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-[#FF5757] hover:bg-[#FF4040] px-5 py-2 rounded-full text-white font-semibold cursor-pointer text-sm transition-all shadow-lg ml-2"
          >
            <FaDownload /> Download Resume
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden text-3xl cursor-pointer text-white" onClick={toggleMenu}>
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-[90%] mx-auto px-4 pb-4">
          <ul className="flex flex-col gap-4 text-lg bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            {navLinks.map((link, i) => (
              <ScrollLink
                key={i}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-70}
                className={navLinkClass}
                onClick={toggleMenu}
              >
                {link.name}
              </ScrollLink>
            ))}


            <button
              onClick={() => {
                handleDownload();
                toggleMenu();
              }}
              className="flex items-center justify-center gap-2 bg-[#FF5757] hover:bg-[#FF4040] px-5 py-3 rounded-full text-white font-semibold text-sm transition-colors mt-2"
            >
              <FaDownload /> Download Resume
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;