"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

/* ═══════════════════════ Footer Component ═══════════════════════ */

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscribe action
  };

  const socialLinks = [
    {
      href: "#",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      href: "#",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      href: "#",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
        </svg>
      ),
    },
    {
      href: "#",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
  ];

  const contactItems = [
    {
      label: "EMAIL US",
      value: "HELLO@USDC.COM",
      icon: <Mail className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />,
    },
    {
      label: "CALL US",
      value: "(555) 123-4567",
      icon: <Phone className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />,
    },
    {
      label: "USDC HEADQUARTERS",
      value: "218 NW 24TH ST 2ND FL, MIAMI, FL 33127",
      icon: <MapPin className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />,
    },
  ];

  return (
    <footer className="w-full relative overflow-hidden bg-[#04070f] border-t border-white/[0.05] pt-16 pb-10">
      {/* ── Ambient Glows ── */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-12">

        {/* ── Top Grid (Columns) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Logo & Description Column (Left) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <Image
              src="/USDC_3 1.png"
              alt="USDC Logo"
              width={140}
              height={50}
              className="h-[46px] w-auto"
              priority
            />
            <p className="text-[12px] text-white/45 max-w-[420px] leading-[1.8] mt-6 font-normal">
              Powering the future of data with state-of-the-art infrastructure and solutions designed for the demands of the digital economy.
            </p>
            {/* Horizontal Blue Gradient Rule */}
            <div className="w-full h-px bg-gradient-to-r from-blue-500/35 via-blue-500/10 to-transparent my-6" />
            {/* Social Media Link Squares */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-9 h-9 border border-white/12 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links Column (Middle) */}
          <div className="lg:col-span-3 flex flex-col items-start md:pl-10">
            <h4 className="text-[11.5px] font-black text-white/90 uppercase tracking-widest mb-6">
              Company
            </h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { label: "Home", href: "/" },
                { label: "About us", href: "/about" },
                { label: "Our Team", href: "#" },
                { label: "Latest News", href: "#" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-[11px] text-white/45 hover:text-[#3daeff] transition-colors duration-200 font-bold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column (Right) */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h4 className="text-[11.5px] font-black text-white/90 uppercase tracking-widest mb-6">
              Contact Us
            </h4>
            <div className="flex flex-col gap-5">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  {/* White Circular Icon Holder */}
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  {/* Contact Text labels */}
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-white/35 tracking-wider uppercase leading-none mb-1">
                      {item.label}
                    </span>
                    <span className="text-[10px] sm:text-[10.5px] font-black text-white/80 tracking-wide uppercase leading-tight">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Middle Row (Stay Updated & Newsletter) ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-8 border-t border-white/[0.05] border-b border-white/[0.05]">
          {/* Subscribe Description */}
          <div className="flex flex-col items-start gap-1.5">
            <h4 className="text-[12px] font-black text-white/95 uppercase tracking-widest">
              Stay Updated
            </h4>
            <p className="text-[11.5px] text-white/45 max-w-[340px] leading-relaxed font-normal">
              Subscribe to our newsletter for the latest insights and data center news.
            </p>
          </div>
          {/* Newsletter Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex items-center gap-3 w-full max-w-[520px]"
          >
            <input
              type="email"
              placeholder="Enter Your Email"
              required
              className="flex-grow px-5 py-3 rounded-xl bg-[#080d1a]/60 border border-white/[0.08] text-xs text-white placeholder-white/30 outline-none focus:border-[#0091ff] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#3daeff] hover:bg-[#2fa0f0] text-black font-black text-xs tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(61,174,255,0.15)] cursor-pointer"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

        {/* ── Bottom Row (Copyright & Policy) ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/30 font-bold font-sans">
          <span>© 2026 USDC. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
