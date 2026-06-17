"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    "Investor",
    "News & insight",
    "Management Team",
    "Career",
    "About us",
    "Location",
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        isScrolled
          ? "bg-[#04070f]/75 border-b border-white/[0.06] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] h-[70px]"
          : "bg-transparent h-[85px]"
      }`}
    >
      {/* Left Section - USDC Logo */}
      <div className="flex-shrink-0">
        <a href="#" className="hover:opacity-80 transition-opacity duration-200">
          <Image
            src="/USDC_3 1.png"
            alt="USDC Logo"
            width={140}
            height={50}
            className="h-[46px] w-auto transition-all duration-300"
            priority
          />
        </a>
      </div>

      {/* Center Navigation with Glassmorphism Effect (Desktop Only) */}
      <nav className="hidden md:flex items-center justify-between gap-6 mx-auto px-8 py-2.5 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-[10px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.3)] flex-1 ml-8 mr-8 max-w-4xl transition-all duration-300">
        <div className="flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="relative text-white text-[13px] font-medium hover:text-[#3daeff] transition-colors duration-300 py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#3daeff] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left font-sans"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-5 bg-white/[0.12]" />

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            aria-label="Toggle theme"
            className="relative flex items-center justify-center w-[34px] h-[34px] pt-[4px] hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          >
            <Image
              src="/Group 2.png"
              alt="Theme"
              width={100}
              height={100}
              className="absolute w-[46px] h-[46px] max-w-none"
            />
          </button>

          {/* Contact Us Button */}
          <button className="flex items-center justify-center gap-2 h-[34px] px-4 bg-gradient-to-r from-[#3daeff] to-[#0082f3] hover:from-[#58c4ff] hover:to-[#0091ff] rounded-[10px] text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(61,174,255,0.25)] hover:shadow-[0_4px_16px_rgba(61,174,255,0.35)] transition-all duration-300 cursor-pointer">
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </button>
        </div>
      </nav>

      {/* Right Section */}
      <div className="flex md:hidden items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-11 h-11 text-white hover:text-[#3daeff] transition-colors duration-200 cursor-pointer border border-white/[0.08] bg-white/[0.03]"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5.5 h-5.5" />
          ) : (
            <Menu className="w-5.5 h-5.5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#04070f]/95 border-b border-white/[0.08] backdrop-blur-xl flex flex-col py-6 px-8 gap-4 md:hidden shadow-[0_10px_30px_rgba(0,0,0,0.65)] animate-in slide-in-from-top-3 duration-300">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-[14px] font-[500] hover:text-[#3daeff] transition-colors duration-200 py-2 border-b border-white/[0.03] font-sans"
            >
              {link}
            </a>
          ))}

          <div className="flex items-center justify-between gap-4 mt-2">
            {/* Theme toggle mobile */}
            <button className="relative w-[42px] h-[42px] pt-[4px] border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
              <Image
                src="/Group 2.png"
                alt="Theme"
                width={100}
                height={100}
                className="absolute w-[54px] h-[54px] max-w-none"
              />
            </button>
            
            <button className="flex items-center justify-center gap-2 flex-grow h-[42px] bg-gradient-to-r from-[#3daeff] to-[#0082f3] rounded-[10px] text-[12px] font-bold text-white hover:from-[#58c4ff] hover:to-[#0091ff] transition-all duration-200">
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
