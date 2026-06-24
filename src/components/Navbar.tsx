"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Menu, X } from "lucide-react";

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

  const navLinks: { label: string; href: string; dropdown?: { label: string; href: string }[] }[] = [
    { label: "About us", href: "/about" },
    { label: "Investor", href: "/investor" },
    { label: "News & insight", href: "/news-insights" },
    {
      label: "Company",
      href: "#",
      dropdown: [
        { label: "Management Team", href: "/management-team" },
        { label: "Press Release", href: "/press-release" },
      ],
    },
    {
      label: "Infrastructure",
      href: "#",
      dropdown: [
        { label: "ARMS", href: "/arms" },
        { label: "Energy", href: "/energy" },
        { label: "Data Center", href: "/data-center" },
      ],
    },
    { label: "Career", href: "/career" },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${isScrolled
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

      {/* Right-aligned Navigation with Glassmorphism Effect (Desktop Only) */}
      <nav className="hidden md:flex items-center gap-6 ml-auto px-8 py-2.5 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-[10px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300">
        <div className="flex items-center gap-[38px]">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.label} className="relative group/dropdown py-1">
                  <button className="flex items-center gap-1 text-white/80 text-[15px] font-medium hover:text-[#3daeff] transition-colors duration-300 cursor-pointer font-sans">
                    <span>{link.label}</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover/dropdown:rotate-180 text-white/60 group-hover/dropdown:text-[#3daeff]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[180px] bg-[#04070f]/95 border border-white/[0.08] backdrop-blur-xl rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.65)] py-2.5 opacity-0 invisible translate-y-1 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 transition-all duration-300 z-50">
                    {link.dropdown.map((subLink) => (
                      <Link
                        key={subLink.label}
                        href={subLink.href}
                        className="block px-4 py-2 text-[13.5px] text-white/75 hover:text-[#3daeff] hover:bg-white/[0.03] transition-all duration-200 font-sans"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-white/80 text-[15px] font-medium hover:text-[#3daeff] transition-colors duration-300 py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#3daeff] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left font-sans"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-5 bg-white/[0.12]" />

        <div className="flex items-center gap-6">
          {/* Contact Us Button */}
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 h-[34px] px-6 bg-gradient-to-r from-[#3daeff] to-[#0082f3] hover:from-[#58c4ff] hover:to-[#0091ff] rounded-[10px] text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(61,174,255,0.25)] hover:shadow-[0_4px_16px_rgba(61,174,255,0.35)] transition-all duration-300 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </Link>
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
        <div className="absolute top-full left-0 w-full bg-[#04070f]/95 border-b border-white/[0.08] backdrop-blur-xl flex flex-col py-6 px-8 gap-[18px] md:hidden shadow-[0_10px_30px_rgba(0,0,0,0.65)] animate-in slide-in-from-top-3 duration-300">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.label} className="flex flex-col w-full border-b border-white/[0.03] pb-2">
                  <div className="text-white/45 text-[11px] font-bold tracking-[0.15em] uppercase py-1.5 font-sans">
                    {link.label}
                  </div>
                  <div className="flex flex-col pl-4 gap-2 mt-1">
                    {link.dropdown.map((subLink) => (
                      <Link
                        key={subLink.label}
                        href={subLink.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white text-[15px] font-[500] hover:text-[#3daeff] transition-colors duration-200 py-1 font-sans"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-[16px] font-[500] hover:text-[#3daeff] transition-colors duration-200 py-2 border-b border-white/[0.03] font-sans"
              >
                {link.label}
              </Link>
            );
          })}

          <div className="flex items-center justify-center gap-4 mt-2 w-full">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full h-[42px] bg-gradient-to-r from-[#3daeff] to-[#0082f3] rounded-[10px] text-[12px] font-bold text-white hover:from-[#58c4ff] hover:to-[#0091ff] transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
