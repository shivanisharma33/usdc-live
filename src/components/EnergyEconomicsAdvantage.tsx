"use client";

import React from "react";
import { Shield, Activity, Clock, TrendingUp } from "lucide-react";

export default function EnergyEconomicsAdvantage() {
  return (
    <section className="w-full bg-[#04070f] py-16 md:py-24 border-t border-white/[0.03] select-none">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-start">
        
        {/* Left-Aligned Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
          <span className="text-[10px] font-semibold text-white/90 tracking-[0.25em] uppercase font-sans">
            THE ENERGY ECONOMICS ADVANTAGE
          </span>
        </div>

        {/* Left-Aligned Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 font-sans leading-[1.1] uppercase max-w-[900px]">
          Built For Long-Term <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3daeff] to-blue-500">
            Economic Advantage.
          </span>
        </h2>

        {/* Left-Aligned Description */}
        <p className="text-[14px] md:text-[15px] text-white/50 leading-[1.8] max-w-[560px] mb-16 font-sans">
          USDC transforms powered assets into AI-ready infrastructure by integrating energy, facilities, cooling, and compute into a scalable deployment platform.
        </p>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-[1160px]">
          
          {/* Card 1: Strategic Independence */}
          <div className="relative group rounded-2xl border border-white/[0.08] hover:border-[#0091ff]/30 bg-[#02050c]/25 backdrop-blur-md p-8 md:p-10 transition-all duration-500 hover:shadow-[0_4px_30px_rgba(0,145,255,0.06)] flex flex-col justify-between min-h-[380px]">
            <div>
              {/* Header Title with Shield Icon */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] group-hover:bg-[#3daeff]/10 border border-white/10 group-hover:border-[#3daeff]/30 flex items-center justify-center transition-colors duration-300">
                  <Shield className="w-5 h-5 text-white/60 group-hover:text-[#3daeff] transition-colors" />
                </div>
                <h3 className="text-base md:text-lg font-extrabold tracking-wider text-white uppercase font-sans">
                  Strategic Independence
                </h3>
              </div>

              {/* Description Paragraph */}
              <p className="text-sm text-white/60 leading-[1.7] mb-8 font-sans">
                While competitors lease capacity and wait years in utility interconnection queues, our vertical integration strategy places us years ahead. We control the power source, dictating our own timelines.
              </p>
            </div>

            {/* Inner Sub-Card Metric */}
            <div className="border border-white/[0.06] rounded-xl bg-[#02050c]/50 p-5 flex items-center gap-4.5 hover:border-[#3daeff]/20 transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-[#3daeff]/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5.5 h-5.5 text-[#3daeff]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-none font-sans">
                  0 Wait Time
                </span>
                <span className="text-[9px] font-bold text-white/35 tracking-wider uppercase mt-1.5 font-mono">
                  For Primary Grid Queue Approvals
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Margin Expansion */}
          <div className="relative group rounded-2xl border border-white/[0.08] hover:border-[#0091ff]/30 bg-[#02050c]/25 backdrop-blur-md p-8 md:p-10 transition-all duration-500 hover:shadow-[0_4px_30px_rgba(0,145,255,0.06)] flex flex-col justify-between min-h-[380px]">
            <div>
              {/* Header Title with ECG/Pulse Icon */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] group-hover:bg-[#3daeff]/10 border border-white/10 group-hover:border-[#3daeff]/30 flex items-center justify-center transition-colors duration-300">
                  <Activity className="w-5 h-5 text-white/60 group-hover:text-[#3daeff] transition-colors" />
                </div>
                <h3 className="text-base md:text-lg font-extrabold tracking-wider text-white uppercase font-sans">
                  Margin Expansion
                </h3>
              </div>

              {/* Description Paragraph */}
              <p className="text-sm text-white/60 leading-[1.7] mb-8 font-sans">
                The shift from standard enterprise colocation to AI-centric infrastructure requires massive power density. By owning the generation, we capture the margin at every step of the energy-to-compute conversion.
              </p>
            </div>

            {/* Inner Sub-Card Metric */}
            <div className="border border-white/[0.06] rounded-xl bg-[#02050c]/50 p-5 flex items-center gap-4.5 hover:border-[#3daeff]/20 transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-[#3daeff]/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5.5 h-5.5 text-[#3daeff]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-none font-sans">
                  Highest Value
                </span>
                <span className="text-[9px] font-bold text-white/35 tracking-wider uppercase mt-1.5 font-mono">
                  Yield Per Megawatt Generated
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
