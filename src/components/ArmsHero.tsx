"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

/* Load the Three.js canvas only on the client — no SSR */
const ArmsDataCentreModel = dynamic(
  () => import("@/components/ArmsDataCentreModel"),
  { ssr: false }
);

export default function ArmsHero() {
  return (
    <section className="relative w-full min-h-screen bg-[#04070f] text-white flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden select-none">

      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-blue-600/[0.07] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-1/3 w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[15%] left-[-5%] w-[400px] h-[400px] bg-blue-900/[0.05] rounded-full blur-[100px] pointer-events-none z-0" />

      {/* ── Subtle grid line backdrop ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_75%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col items-start text-left">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
                The People Behind The Power
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[82px] font-bold tracking-tight leading-[1.05] text-white mb-2 font-sans">
              ARMS
            </h1>

            {/* Subheading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[48px] xl:text-[62px] font-bold tracking-tight leading-[1.05] text-[#3daeff] mb-8 font-sans whitespace-nowrap">
              MODULAR SYSTEMS
            </h2>

            {/* Description */}
            <p className="text-[14px] md:text-[15px] text-white/65 font-normal leading-[1.8] max-w-[580px] mb-10 font-sans">
              Each ARMS 200 unit delivers up to 600 µW of computation power in a compact,
              rapidly deployable package. The ARMS 200 is LiquidPowerX&apos;s premier modular
              datacenter platform, each module capable of supporting up to 600 kW of critical
              IT load and is designed for Tier III redundancy (concurrent maintainability).
            </p>

            {/* CTA */}
            <Link href="#arms-specs"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl text-white text-[13px] font-bold cursor-pointer transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #3daeff 0%, #0068d6 100%)",
                boxShadow: "0 0 0 1px rgba(61,174,255,0.3), 0 8px 28px rgba(61,174,255,0.3)",
              }}>
              <span>Explore Specs</span>
              <span className="flex items-center justify-center w-5 h-5 rounded-full border border-white/40 group-hover:border-white transition-colors duration-300">
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>

          {/* ── RIGHT: 3D Model ── */}
          <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[620px] rounded-2xl overflow-hidden self-start lg:-mt-8"
            style={{
              background: "radial-gradient(ellipse at 50% 60%, rgba(61,174,255,0.04) 0%, rgba(4,7,15,0.0) 70%)",

            }}>
            {/* Corner glows */}
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse at top left, rgba(61,174,255,0.06) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse at bottom right, rgba(61,174,255,0.06) 0%, transparent 70%)" }} />

            <ArmsDataCentreModel />
          </div>

        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
    </section>
  );
}
