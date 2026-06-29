"use client";

import React from "react";
import Image from "next/image";

export default function PowerToComputeDiagram() {
  return (
    <section className="w-full bg-[#000413] py-20 md:py-28 text-white select-none overflow-hidden relative border-t border-white/[0.03]">
      {/* Background ambient lighting */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.02] rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[30%] right-[-10%] w-[600px] h-[600px] bg-sky-500/[0.02] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header Container */}
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 flex flex-col items-center">
        {/* Header Content */}
        <div className="text-center max-w-[800px] mb-12 md:mb-16">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.25em] uppercase font-sans">
              Infrastructure Platform
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight leading-[1.08] text-white mb-6 font-sans uppercase">
            From Power To <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3daeff] to-blue-500">
              GPU Compute
            </span>
          </h2>

          {/* Description */}
          <p className="text-[14px] md:text-[15px] text-white/50 leading-[1.8] max-w-[660px] mx-auto font-sans">
            USDC transforms powered assets into AI-ready infrastructure by integrating energy, facilities, cooling, and compute into a scalable deployment platform.
          </p>
        </div>
      </div>

      {/* ── Schematic Diagram Image (Full Width) ── */}
      <div className="w-full relative flex items-center justify-center mb-16 sm:mb-20 select-none z-10">
        {/* Ambient halo behind the image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-blue-500/[0.04] blur-[120px] pointer-events-none" />
        
        <div className="w-full relative overflow-hidden flex items-center justify-center">
          <Image
            src="/image 50.png"
            alt="From Power To GPU Compute Schematic"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain filter drop-shadow-[0_0_40px_rgba(61,174,255,0.15)]"
            priority
          />
        </div>
      </div>

      {/* Bottom Grid Bar Container */}
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 flex flex-col items-center">
        {/* ── Bottom Grid Bar ── */}
        <div className="w-full border border-white/[0.08] rounded-2xl bg-[#02050c]/60 backdrop-blur-md px-6 py-8 md:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center items-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          
          {/* Column 1 */}
          <div className="flex flex-col items-center">
            <span className="text-[12px] md:text-[13px] font-bold text-white tracking-[0.18em] uppercase font-sans">
              Owned Energy Assets
            </span>
            <div className="w-10 h-[2px] bg-[#3daeff] mt-3.5 rounded-full" />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10 hidden md:block" />
            <span className="text-[12px] md:text-[13px] font-bold text-white tracking-[0.18em] uppercase font-sans">
              Substation Access
            </span>
            <div className="w-10 h-[2px] bg-[#3daeff] mt-3.5 rounded-full" />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10 hidden md:block" />
            <span className="text-[12px] md:text-[13px] font-bold text-white tracking-[0.18em] uppercase font-sans">
              Rapid Deployment
            </span>
            <div className="w-10 h-[2px] bg-[#3daeff] mt-3.5 rounded-full" />
          </div>

          {/* Column 4 */}
          <div className="flex flex-col items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10 hidden md:block" />
            <span className="text-[12px] md:text-[13px] font-bold text-white tracking-[0.18em] uppercase font-sans">
              Integrated Infrastructure
            </span>
            <div className="w-10 h-[2px] bg-[#3daeff] mt-3.5 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}
