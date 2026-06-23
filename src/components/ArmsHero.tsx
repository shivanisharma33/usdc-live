"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ArmsHero() {
  return (
    <section className="relative w-full min-h-screen bg-[#04070f] text-white flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden select-none">

      {/* ── Ambient Background Glows ── */}
      {/* Large glowing aura on the right side */}
      <div className="absolute top-1/2 right-[-20%] -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-blue-600/[0.06] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Subtle cyan helper glow in bottom-center */}
      <div className="absolute bottom-[-10%] left-1/3 w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Subtle grid line backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_75%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Single Column Layout - Content Centered */}
        <div className="flex flex-col items-start text-left relative z-20 animate-fade-in">

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
              The People Behind The Power
            </span>
          </div>

          {/* Main Heading - ARMS */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-bold tracking-tight leading-[1.05] text-white mb-2 font-sans">
            ARMS
          </h1>

          {/* Subheading - MODULAR SYSTEMS in Cyan */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold tracking-tight leading-[1.05] text-[#3daeff] mb-8 font-sans">
            MODULAR SYSTEMS
          </h2>

          {/* Description */}
          <p className="text-[14px] md:text-[15px] text-white/70 font-normal leading-[1.75] max-w-[650px] mb-12 font-sans">
            Each ARMS 200 unit delivers up to 600 µW of computation power in a compact, rapidly deployable package. The ARMS 200 is LiquidPowerX's premier modular datacenter platform, each module capable of supporting up to 600 kW of critical IT load and is designed for Tier III redundancy (concurrent maintainability).
          </p>

          {/* Metrics Card Section */}
          <div className="w-full max-w-[420px] border border-white/[0.15] rounded-[16px] bg-[#04070f]/40 backdrop-blur-sm p-6 md:p-8">
            <div className="flex items-center justify-between gap-6">
              {/* Metric 1: 40 MW */}
              <div className="flex flex-col items-center flex-1">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 whitespace-nowrap font-sans">
                  40 MW
                </div>
                <div className="text-[9px] font-semibold text-white/50 tracking-[0.15em] uppercase font-sans">
                  Power Capacity
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/[0.2] to-white/0" />

              {/* Metric 2: 12 MONTH */}
              <div className="flex flex-col items-center flex-1">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 whitespace-nowrap font-sans">
                  12 MONTH
                </div>
                <div className="text-[9px] font-semibold text-white/50 tracking-[0.15em] uppercase font-sans">
                  Deployment
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Separator Border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

    </section>
  );
}
