"use client";

import React from "react";

export default function Arms200Advantages() {
  return (
    <section className="relative w-full py-20 md:py-32 bg-[#04070f] text-white overflow-hidden select-none">

      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] right-[-15%] w-[800px] h-[800px] bg-blue-600/[0.04] rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Grid Layout - Left Content, Right Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column - Content */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
                What Is ARMS 200
              </span>
            </div>

            {/* Main Title - ARMS 200 in Cyan */}
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-[#3daeff] mb-4 font-sans">
              ARMS 200
            </h2>

            {/* Subtitle - Advantages in White */}
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-8 font-sans">
              Advantages
            </h3>

            {/* Description */}
            <p className="text-[14px] md:text-[15px] text-white/70 font-normal leading-[1.75] max-w-[500px] font-sans">
              DigiPowerX is built around a simple but powerful thesis: the company that controls power controls the compute. By owning the full infrastructure stack from energy generation through GPU compute, DigiPowerX can serve AI and HPC customers faster, cheaper, and at greater scale than any pure-play competitor.
            </p>

          </div>

          {/* Right Column - 3D Model Image */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <div className="w-full max-w-[600px] flex items-center justify-center">
              <img
                src="/USDC (5) 2.png"
                alt="ARMS 200 3D Model"
                className="w-full h-auto object-contain drop-shadow-[0_20px_60px_rgba(61,174,255,0.15)]"
              />
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
