"use client";

import React from "react";
import Image from "next/image";

export default function WaterFreeCooling() {

  return (
    <section className="w-full relative overflow-hidden bg-[#04070f] text-white">
      {/* ── Top decorative line matching other sections ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] bg-cyan-500/[0.02] rounded-full blur-[100px] pointer-events-none" />


      <div className="wfc-root relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-20 select-none">

        {/* ═════════ SPLIT: CONTENT LEFT / IMAGE RIGHT ═════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">

          {/* LEFT: Content */}
          <div className="flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 backdrop-blur-md mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
              <span className="w-6 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[10px] font-semibold text-white/65 tracking-[0.22em] uppercase font-sans">
                COOLING WITHOUT WATER CONSUMPTION
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-[34px] sm:text-[44px] md:text-[48px] lg:text-[52px] leading-[1.06] font-extrabold tracking-[-0.02em] text-white mb-6">
              High-Density Compute.{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#3daeff]">
                Zero Ongoing Water Consumption.
              </span>
            </h2>

            {/* Paragraphs */}
            <p className="text-[#a0aec0] text-[14px] sm:text-[15px] leading-[1.75] mb-4 max-w-[520px] font-normal">
              Traditional data centers can rely on evaporative cooling, creating continuous demand for local water resources.{" "}
              <strong className="text-white font-semibold">USDC&apos;s modular data center architecture takes a different approach.</strong>
            </p>
            <p className="text-[#a0aec0] text-[14px] sm:text-[15px] leading-[1.75] mb-6 max-w-[520px] font-normal">
              Our closed-loop liquid cooling system continuously recirculates coolant to remove heat from high-density AI and HPC infrastructure—without the ongoing water consumption associated with evaporative cooling.
            </p>

            {/* Divider Line */}
            <div className="h-[1px] w-[220px] bg-gradient-to-r from-white/20 to-transparent my-6" />

            {/* Checklist */}
            <ul className="flex flex-col gap-3.5 list-none p-0 m-0">
              <li className="flex items-center gap-3.5 text-white/90 text-[14px] font-medium">
                <span className="relative flex-shrink-0 w-[22px] h-[22px] rounded-[6px] border border-[#3daeff]/40 bg-[#3daeff]/10 flex items-center justify-center">
                  <span className="w-[5px] h-[9px] border-r-[1.7px] border-b-[1.7px] border-[#3daeff] rotate-[42deg] -translate-y-0.5" />
                </span>
                No evaporative cooling
              </li>
              <li className="flex items-center gap-3.5 text-white/90 text-[14px] font-medium">
                <span className="relative flex-shrink-0 w-[22px] h-[22px] rounded-[6px] border border-[#3daeff]/40 bg-[#3daeff]/10 flex items-center justify-center">
                  <span className="w-[5px] h-[9px] border-r-[1.7px] border-b-[1.7px] border-[#3daeff] rotate-[42deg] -translate-y-0.5" />
                </span>
                No ongoing water consumption for cooling
              </li>
              <li className="flex items-center gap-3.5 text-white/90 text-[14px] font-medium">
                <span className="relative flex-shrink-0 w-[22px] h-[22px] rounded-[6px] border border-[#3daeff]/40 bg-[#3daeff]/10 flex items-center justify-center">
                  <span className="w-[5px] h-[9px] border-r-[1.7px] border-b-[1.7px] border-[#3daeff] rotate-[42deg] -translate-y-0.5" />
                </span>
                High-density AI &amp; HPC cooling
              </li>
            </ul>
          </div>

          {/* RIGHT: Cooling System Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <Image
              src="/cooling-system.jpg"
              alt="USDC Closed-Loop Cooling System — server racks with recirculating coolant pipes, heat exchanger, and zero-evaporation design"
              width={1024}
              height={700}
              className="w-full h-auto object-cover"
              priority={false}
            />
          </div>

        </div>

        {/* ═════════ NUMBERED POINTS (01–04) ═════════ */}
        <div className="mt-16 md:mt-20 mb-8 text-center">
          <h3 className="m-0 text-[14px] sm:text-[15px] font-semibold text-white/60 tracking-[0.06em]">
            Designed for efficient, water-conscious infrastructure
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {/* Point 01 */}
          <div className="group relative bg-gradient-to-b from-[#070c1a]/90 via-[#050914]/95 to-[#02050c]/90 border border-white/[0.08] hover:border-[#3daeff]/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <span className="font-mono text-[12px] font-semibold tracking-[0.16em] text-[#3daeff] block mb-3.5">
              01
              <span className="block w-[26px] h-[1.5px] bg-[#3daeff] mt-2.5 rounded-full shadow-[0_0_8px_rgba(61,174,255,0.5)]" />
            </span>
            <h4 className="text-[15px] font-bold text-white tracking-[0.01em] mb-2.5">
              No Evaporative Cooling
            </h4>
            <p className="text-[13px] leading-[1.65] text-[#a0aec0] m-0 font-normal">
              Eliminates cooling systems that continuously consume water through evaporation.
            </p>
          </div>

          {/* Point 02 */}
          <div className="group relative bg-gradient-to-b from-[#070c1a]/90 via-[#050914]/95 to-[#02050c]/90 border border-white/[0.08] hover:border-[#3daeff]/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <span className="font-mono text-[12px] font-semibold tracking-[0.16em] text-[#3daeff] block mb-3.5">
              02
              <span className="block w-[26px] h-[1.5px] bg-[#3daeff] mt-2.5 rounded-full shadow-[0_0_8px_rgba(61,174,255,0.5)]" />
            </span>
            <h4 className="text-[15px] font-bold text-white tracking-[0.01em] mb-2.5">
              Closed-Loop Cooling
            </h4>
            <p className="text-[13px] leading-[1.65] text-[#a0aec0] m-0 font-normal">
              Coolant is continuously recirculated through the system for efficient, controlled heat removal.
            </p>
          </div>

          {/* Point 03 */}
          <div className="group relative bg-gradient-to-b from-[#070c1a]/90 via-[#050914]/95 to-[#02050c]/90 border border-white/[0.08] hover:border-[#3daeff]/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <span className="font-mono text-[12px] font-semibold tracking-[0.16em] text-[#3daeff] block mb-3.5">
              03
              <span className="block w-[26px] h-[1.5px] bg-[#3daeff] mt-2.5 rounded-full shadow-[0_0_8px_rgba(61,174,255,0.5)]" />
            </span>
            <h4 className="text-[15px] font-bold text-white tracking-[0.01em] mb-2.5">
              AI-Ready Density
            </h4>
            <p className="text-[13px] leading-[1.65] text-[#a0aec0] m-0 font-normal">
              Supports high-density GPU and HPC environments while maintaining efficient thermal performance.
            </p>
          </div>

          {/* Point 04 */}
          <div className="group relative bg-gradient-to-b from-[#070c1a]/90 via-[#050914]/95 to-[#02050c]/90 border border-white/[0.08] hover:border-[#3daeff]/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <span className="font-mono text-[12px] font-semibold tracking-[0.16em] text-[#3daeff] block mb-3.5">
              04
              <span className="block w-[26px] h-[1.5px] bg-[#3daeff] mt-2.5 rounded-full shadow-[0_0_8px_rgba(61,174,255,0.5)]" />
            </span>
            <h4 className="text-[15px] font-bold text-white tracking-[0.01em] mb-2.5">
              Greater Deployment Flexibility
            </h4>
            <p className="text-[13px] leading-[1.65] text-[#a0aec0] m-0 font-normal">
              Reduces dependence on local water resources, enabling deployment in water-constrained regions.
            </p>
          </div>
        </div>

        {/* ═════════ RESULT BANNER ═════════ */}
        <div className="mt-16 md:mt-20 border border-white/[0.08] rounded-2xl bg-gradient-to-b from-[#070c1a]/90 via-[#050914]/95 to-[#02050c]/90 p-10 md:p-14 text-center relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          {/* Subtle Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(61,174,255,0.04) 0.5px, transparent 0.5px),
                linear-gradient(to bottom, rgba(61,174,255,0.04) 0.5px, transparent 0.5px)
              `,
              backgroundSize: "42px 42px",
            }}
          />

          {/* Tag */}
          <div className="font-mono text-[11px] font-semibold tracking-[0.26em] text-[#3daeff] uppercase inline-flex items-center gap-3.5 mb-6 relative z-10">
            <span className="w-7 h-[1px] bg-gradient-to-r from-transparent to-[#3daeff]" />
            The Result
            <span className="w-7 h-[1px] bg-gradient-to-r from-[#3daeff] to-transparent" />
          </div>

          {/* Title */}
          <h3 className="m-0 text-[24px] sm:text-[32px] md:text-[38px] lg:text-[42px] leading-[1.22] font-extrabold tracking-[-0.015em] text-white relative z-10">
            Less water dependence. Efficient heat removal.<br className="hidden sm:inline" />
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#3daeff] mt-1">
              Infrastructure built for the AI era.
            </span>
          </h3>
        </div>

      </div>
    </section>
  );
}
