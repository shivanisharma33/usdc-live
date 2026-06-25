"use client";

import React from "react";
import { Zap, Clock, Shield, Cpu, ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import WaveBackground from "@/components/WaveBackground";

export default function Hero() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-28 md:pt-36 pb-20 md:pb-28 relative min-h-screen select-none overflow-hidden">

      {/* Particle wave hero animation */}
      <WaveBackground />

      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 backdrop-blur-md mb-8 animate-fade-in shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] relative z-10">
        <span className="w-3.5 h-[1.5px] bg-[#3daeff] rounded-full" />
        <span className="text-[10px] font-semibold text-white/80 tracking-[0.2em] uppercase font-sans">
          Premium Data Center Solutions
        </span>
      </div>

      {/* Hero Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-bold tracking-tight max-w-4xl leading-[1.1] text-white mb-6 animate-slide-up relative z-10">
        Deploy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] to-[#0091ff]">AI Infrastructure</span> <br /> in Weeks Not Years
      </h1>

      {/* Hero Description */}
      <p className="text-sm md:text-base text-white/60 max-w-[640px] font-normal leading-[1.65] mb-10 animate-slide-up [animation-delay:150ms] relative z-10">
        We specialize in building and managing state-of-the-art data centers, providing
        infrastructure solutions tailored for the evolving needs of the digital economy.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto px-4 relative z-10 animate-slide-up [animation-delay:250ms]">
        {/* Explore Data Centers */}
        <Link href="/data-center" className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#3daeff] to-[#0082f3] hover:from-[#58c4ff] hover:to-[#0091ff] text-white text-[13px] font-semibold rounded-[8px] flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(61,174,255,0.25)] hover:shadow-[0_4px_24px_rgba(61,174,255,0.4)] active:scale-[0.98] transition-all duration-200 cursor-pointer">
          <span>Explore Data Centers</span>
          <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border border-white/40">
            <ArrowRight className="w-3 h-3 text-white" />
          </div>
        </Link>

        {/* Download PDF */}
        <Link href="/contact" className="w-full sm:w-auto px-6 py-3.5 border border-white/12 hover:border-white/25 hover:bg-white/[0.02] text-white/90 hover:text-white text-[13px] font-semibold rounded-[8px] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all duration-200 cursor-pointer">
          <span>Download PDF</span>
          <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border border-white/20">
            <ArrowDown className="w-3 h-3 text-white/70" />
          </div>
        </Link>
      </div>

      {/* Metrics Capsule Dashboard */}
      <div className="w-full max-w-5xl bg-[#02050c]/55 backdrop-blur-xl border border-white/[0.08] rounded-[24px] py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.02)] animate-slide-up [animation-delay:350ms]">
        
        {/* Metric 1 */}
        <div className="flex-1 flex flex-col items-center gap-2 text-center w-full">
          <Zap className="w-5 h-5 text-[#3daeff] opacity-90" />
          <span className="text-2xl md:text-[28px] font-bold text-white tracking-tight leading-none">
            40MW+
          </span>
          <span className="text-[9px] font-semibold text-white/40 tracking-[0.2em] uppercase mt-0.5">
            Power Capacity
          </span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-10 bg-gradient-to-b from-white/0 via-white/[0.1] to-white/0" />

        {/* Metric 2 */}
        <div className="flex-1 flex flex-col items-center gap-2 text-center w-full">
          <Clock className="w-5 h-5 text-[#3daeff] opacity-90" />
          <span className="text-2xl md:text-[28px] font-bold text-white tracking-tight leading-none">
            ≤ 12 Months
          </span>
          <span className="text-[9px] font-semibold text-white/40 tracking-[0.2em] uppercase mt-0.5">
            Deployment Timeline
          </span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-10 bg-gradient-to-b from-white/0 via-white/[0.1] to-white/0" />

        {/* Metric 3 */}
        <div className="flex-1 flex flex-col items-center gap-2 text-center w-full">
          <Shield className="w-5 h-5 text-[#3daeff] opacity-90" />
          <span className="text-2xl md:text-[28px] font-bold text-white tracking-tight leading-none">
            TIER III
          </span>
          <span className="text-[9px] font-semibold text-white/40 tracking-[0.2em] uppercase mt-0.5">
            Design Standard
          </span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-10 bg-gradient-to-b from-white/0 via-white/[0.1] to-white/0" />

        {/* Metric 4 */}
        <div className="flex-1 flex flex-col items-center gap-2 text-center w-full">
          <Cpu className="w-5 h-5 text-[#3daeff] opacity-90" />
          <span className="text-2xl md:text-[28px] font-bold text-white tracking-tight leading-none">
            100%
          </span>
          <span className="text-[9px] font-semibold text-white/40 tracking-[0.2em] uppercase mt-0.5">
            AI Ready
          </span>
        </div>
        
      </div>
    </main>
  );
}
