"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    "Investor",
    "News & insight",
    "Management Team",
    "Career",
    "About us",
    "Location",
  ];

  return (
    <header className="w-full h-[80px] bg-transparent flex items-center justify-between px-8 z-50 relative">
      {/* Left Section - USDC Logo */}
      <div className="flex-shrink-0">
        <a href="#" className="hover:opacity-80 transition-opacity duration-200">
          <Image
            src="/USDC_3 1.png"
            alt="USDC Logo"
            width={140}
            height={50}
            className="h-[50px] w-auto"
            priority
          />
        </a>
      </div>

      {/* Center Navigation with Glassmorphism Effect (Desktop Only) */}
      <nav className="hidden md:flex items-center justify-between gap-6 mx-auto px-8 py-3 bg-white/[0.05] backdrop-blur-[10px] border border-white/[0.1] rounded-[12px] shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] flex-1 ml-6 mr-6">
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-white text-[14px] font-[500] hover:text-[#58c4ff] transition-colors duration-200 whitespace-nowrap"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-white/[0.2]" />

        {/* Dark Mode Toggle */}
        <button
          aria-label="Toggle theme"
          className="flex items-center justify-center w-[40px] h-[40px] hover:opacity-80 transition-opacity duration-200 cursor-pointer"
        >
          <Image
            src="/Group 2.png"
            alt="Theme"
            width={100}
            height={100}
          />
        </button>

        {/* Contact Us Button */}
        <button className="flex items-center justify-center gap-2 h-[36px] px-4 bg-gradient-to-r from-[#58c4ff] to-[#3daeff] hover:from-[#6bd0ff] hover:to-[#4ebfff] rounded-[6px] text-[12px] font-[600] text-white shadow-[0_0_16px_rgba(61,174,255,0.35)] hover:shadow-[0_0_24px_rgba(61,174,255,0.5)] transition-all duration-200 cursor-pointer">
          <Mail className="w-3.5 h-3.5" />
          <span>Contact Us</span>
        </button>
      </nav>

      {/* Right Section */}
      <div className="flex md:hidden items-center gap-6">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-8 h-8 text-white hover:text-[#58c4ff] transition-colors duration-200 cursor-pointer"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-black border-b border-white/[0.1] flex flex-col py-6 px-6 gap-4 md:hidden animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-[14px] font-[500] hover:text-[#58c4ff] transition-colors duration-200 py-2"
            >
              {link}
            </a>
          ))}

          <div className="w-full h-[1px] bg-white/[0.1] my-2" />

          <button className="flex items-center justify-center gap-2 w-full h-[40px] bg-gradient-to-r from-[#58c4ff] to-[#3daeff] rounded-[6px] text-[13px] font-[600] text-white hover:from-[#6bd0ff] hover:to-[#4ebfff] transition-all duration-200">
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </button>
        </div>
      )}
    </header>
  );
}
