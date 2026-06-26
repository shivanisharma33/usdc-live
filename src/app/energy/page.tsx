import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, ShieldCheck, RefreshCw, Cpu } from "lucide-react";
import Link from "next/link";
import PowerToComputeDiagram from "@/components/PowerToComputeDiagram";
import EnergyStackGrid from "@/components/EnergyStackGrid";
import EnergyEconomicsAdvantage from "@/components/EnergyEconomicsAdvantage";
import SuperiorEconomics from "@/components/SuperiorEconomics";
import PartnerSection from "@/components/PartnerSection";

export const metadata: Metadata = {
  title: "Energy Integration — USDC | Empowering High-Density AI Compute",
  description:
    "Explore USDC's grid-scale energy assets and sustainable infrastructure designed for powering the next generation of dense AI computing clusters.",
};

export default function EnergyPage() {
  const energyFeatures = [
    {
      title: "Utility Substation Integration",
      desc: "Direct integration with utility transmission networks at high voltages (115kV+), bypassing distribution-level bottlenecks and securing massive power headroom.",
      Icon: Zap,
    },
    {
      title: "Renewable Integration",
      desc: "Partnerships with local green grids and dedicated solar, wind, or hydro generation sources to minimize scope 2 emissions and ensure lower carbon intensity.",
      Icon: RefreshCw,
    },
    {
      title: "Concurrent Maintainability",
      desc: "Equipped with redundant high-voltage feeders and on-site substation setups designed to meet Tier III uptime requirements under continuous operations.",
      Icon: ShieldCheck,
    },
    {
      title: "AI Load Balancing",
      desc: "Direct power routing optimization dynamically adjusting load factors according to real-time grid conditions and compute demands.",
      Icon: Cpu,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden">
      {/* Navigation Header */}
      <Navbar />      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-[85vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden select-none">
        {/* Ambient Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-blue-600/[0.06] rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#3daeff]/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

        {/* Subtle grid line backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_75%,transparent_100%)] pointer-events-none z-0" />

        <div className="relative z-10 w-full max-w-[860px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center">

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.25em] uppercase font-sans">
              Infrastructure Platform
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-[1.08] text-white mb-6 font-sans uppercase">
            From Power To <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3daeff] to-blue-500">
              AI Compute
            </span>
          </h1>

          {/* Description */}
          <p className="text-[14px] md:text-[15px] text-white/50 leading-[1.8] max-w-[620px] mb-12 font-sans">
            USDC integrates power, cooling, data center infrastructure, and GPU compute into a unified platform built for next-generation AI workloads.
          </p>

          {/* Capsule Joined Button Group */}
          <div className="inline-flex items-center border border-white/12 rounded-lg bg-[#02050c]/50 p-[1.5px] overflow-hidden backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <Link
              href="/data-center"
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-[#3daeff] hover:bg-[#52b9ff] text-white text-[13px] font-bold rounded-l-[6.5px] transition-all duration-200 cursor-pointer"
            >
              <span>Explore Infrastructure</span>
            </Link>
            <Link
              href="/arms"
              className="group flex items-center justify-center gap-2 px-6 py-3 text-white/80 hover:text-white text-[13px] font-bold transition-all duration-200 cursor-pointer"
            >
              <span>View ARMS 200</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ── POWER TO COMPUTE SCHEMA DIAGRAM SECTION ── */}
      <PowerToComputeDiagram />

      {/* ── ENERGY STACK LAYERS SECTION ── */}
      <EnergyStackGrid />

      {/* ── THE ENERGY ECONOMICS ADVANTAGE SECTION ── */}
      <EnergyEconomicsAdvantage />

      {/* ── SUPERIOR ECONOMICS ADVANTAGE SECTION ── */}
      <SuperiorEconomics />

      {/* ── CORE CAPABILITIES SECTION ── */}
      <section className="w-full relative bg-[#04070f] border-t border-white/[0.03] py-20 md:py-28">
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-sans">
              Core Grid <span className="text-[#3daeff]">Capabilities</span>
            </h2>
            <p className="text-sm text-white/40 leading-relaxed font-sans">
              Our energy infrastructure provides robust and concurrently maintainable capabilities, engineered specifically for high-capacity GPU nodes and long-term scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {energyFeatures.map((feat, idx) => {
              const Icon = feat.Icon;
              return (
                <div
                  key={idx}
                  className="group relative flex items-start gap-5 p-6 rounded-2xl border border-white/[0.06] bg-[#02050c]/30 hover:bg-[#02050c]/60 hover:border-[#0091ff]/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] group-hover:bg-[#3daeff]/10 border border-white/10 group-hover:border-[#3daeff]/30 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-white/60 group-hover:text-[#3daeff] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 transition-colors duration-300 group-hover:text-[#3daeff] font-sans">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-white/45 leading-[1.65] font-sans">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <PartnerSection />

      {/* Footer component */}
      <Footer />
    </div>
  );
}
