"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-screen bg-[#04070f] text-white flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden select-none">

      {/* ── Ambient Background Glows ── */}
      {/* Large glowing aura on the right side behind the globe */}
      <div className="absolute top-1/2 right-[-20%] -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-blue-600/[0.06] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Subtle cyan helper glow in bottom-center */}
      <div className="absolute bottom-[-10%] left-1/3 w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Subtle grid line backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_75%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Row Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── Left Content (Badge, Title, Subtitle, Joined Capsule Button) ── */}
          <div className="lg:col-span-7 flex flex-col items-start text-left relative z-20 animate-fade-in">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
                About Our Company
              </span>
            </div>

            {/* Main Cloned Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold tracking-tight leading-[1.12] text-white mb-6 font-sans">
              Building The Future Of{" "}
              <span className="text-[#3daeff]">
                AI Infrastructure
              </span>
            </h1>

            {/* Description Subtitle */}
            <p className="text-[14px] md:text-[15px] text-white/60 font-normal leading-[1.7] max-w-[530px] mb-10 font-sans">
              Transforming underutilized energy assets into enterprise-scale AI
              infrastructure designed for next-generation compute and AI deployment.
            </p>

            {/* ── Capsule Joined Button Group ── */}
            <div className="inline-flex items-center border border-white/12 rounded-lg bg-[#02050c]/50 p-[1.5px] overflow-hidden backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

              {/* Left Button: Download Overview (Filled blue with white text) */}
              <a
                href="/docs/overview.pdf"
                download
                className="group flex items-center gap-2 px-6 py-3 bg-[#3daeff] hover:bg-[#52b9ff] text-white text-[13px] font-bold rounded-l-[6.5px] transition-all duration-200 cursor-pointer"
              >
                <span>Download Overview</span>
                <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border border-white/40 group-hover:border-white/70 transition-colors">
                  <ArrowRight className="w-2.5 h-2.5 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </a>

              {/* Right Button: Get in Touch (Transparent background) */}
              <Link
                href="/contact"
                className="group flex items-center gap-2 px-6 py-3 text-white/80 hover:text-white text-[13px] font-bold transition-all duration-200 cursor-pointer"
              >
                <span>Get in Touch</span>
                <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border border-white/20 group-hover:border-white/45 transition-colors">
                  <ArrowRight className="w-2.5 h-2.5 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </Link>

            </div>

          </div>

          {/* ── Right Content (Globe Image) ── */}
          <div className="lg:col-span-5 h-[280px] md:h-[380px] lg:h-auto flex items-center justify-center relative select-none z-10">
            {/* Globe image centered for mobile, shifted off-screen on desktop to match image */}
            <div className="w-full max-w-[400px] lg:max-w-none lg:absolute lg:right-[-10vw] lg:w-[48vw] lg:h-[48vw] lg:max-w-[640px] lg:max-h-[640px] flex items-center justify-center pointer-events-none">
              <img
                src="/about_globe.png"
                alt="USDC AI Infrastructure Globe"
                className="w-full h-full object-contain opacity-75 mix-blend-screen filter invert hue-rotate-[195deg] brightness-[1.1] contrast-[1.15]"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Separator Border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

    </section>
  );
}
