"use client";

import React from "react";
import { Zap, Shield, Sun } from "lucide-react";

export default function WhatDrivesUs() {
  return (
    <section className="relative z-10 w-full bg-[#04070f] py-20 lg:py-24 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 text-center select-none">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col items-center mb-16 space-y-6">
        {/* Pill Badge */}
        <div className="inline-flex items-center px-5 py-2 rounded-full border border-blue-500/15 bg-blue-950/20 shadow-[0_0_15px_rgba(59,130,246,0.06)]">
          <span className="text-[10px] font-black text-[#3daeff] tracking-[0.3em] uppercase font-mono">
            What Drives Us
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl font-sans">
          Leadership that turns{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#3daeff] font-extrabold">
            power into compute
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-[14px] md:text-[16px] text-white/50 leading-relaxed max-w-3xl font-sans font-normal pt-2">
          Every member of the USDC team shares a single mandate: move infrastructure from
          conception to deployment with uncommon speed, discipline, and reliability.
        </p>
      </div>

      {/* ── THREE COLUMN CARD CONTAINER ── */}
      <div className="relative w-full rounded-[24px] border border-white/[0.08] bg-[#050915]/40 backdrop-blur-md shadow-2xl overflow-hidden">
        
        {/* Ambient backing glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/[0.015] blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] relative z-10">
          
          {/* Column 1: Speed to deployment */}
          <div className="p-8 md:p-12 lg:p-14 flex flex-col items-start text-left">
            {/* Icon box */}
            <div className="w-12 h-12 rounded-xl border border-[#3daeff]/35 bg-[#3daeff]/5 flex items-center justify-center mb-6">
              <Zap className="w-5 h-5 text-[#3daeff] stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase font-sans">
              Speed to deployment
            </h3>
            <p className="text-[13px] text-white/70 leading-relaxed font-normal">
              Traditional builds take years. The USDC team converts existing energy assets into
              Tier III HPC capacity in under twelve months — operators who move at the pace
              AI demands.
            </p>
          </div>

          {/* Column 2: Operational rigor */}
          <div className="p-8 md:p-12 lg:p-14 flex flex-col items-start text-left">
            {/* Icon box */}
            <div className="w-12 h-12 rounded-xl border border-[#3daeff]/25 bg-[#3daeff]/5 flex items-center justify-center mb-6">
              <Shield className="w-5 h-5 text-[#3daeff] stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase font-sans">
              Operational rigor
            </h3>
            <p className="text-[13px] text-white/70 leading-relaxed font-normal">
              Tier III standards and 99.99% reliability maintained by a team with decades in
              mission-critical facility engineering, power systems, and concurrent maintainability.
            </p>
          </div>

          {/* Column 3: Technical edge */}
          <div className="p-8 md:p-12 lg:p-14 flex flex-col items-start text-left">
            {/* Icon box */}
            <div className="w-12 h-12 rounded-xl border border-[#3daeff]/25 bg-[#3daeff]/5 flex items-center justify-center mb-6">
              <Sun className="w-5 h-5 text-[#3daeff] stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase font-sans">
              Technical edge
            </h3>
            <p className="text-[13px] text-white/70 leading-relaxed font-normal">
              Pioneering direct-to-chip liquid cooling and the proprietary ARMS 200 modular
              platform — engineered for ultra-dense NVIDIA GPU clusters from day one.
            </p>
          </div>

        </div>

        {/* Tech Corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/10 rounded-tl-[24px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/10 rounded-br-[24px] pointer-events-none" />
      </div>

    </section>
  );
}
