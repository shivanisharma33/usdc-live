"use client";

import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════════ Press Release Hero ═══════════════════════════
   Ultra-premium hero with multi-layered aurora orb, animated star particles,
   scan-line texture, gradient typography, and floating stat counters.
   ═══════════════════════════════════════════════════════════════════════ */

export default function PressReleaseHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  const enter = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(32px)",
    transition: `all 1.3s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[100vh] overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#030810" }}
    >
      {/* ── Custom keyframes ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroScanline {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100vh); }
            }
          `,
        }}
      />





      {/* ── Horizontal scan-line texture ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[3] opacity-[0.04]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(160,210,255,0.15) 2px, rgba(160,210,255,0.15) 3px)",
        }}
      />

      {/* ── Travelling scan bar ── */}
      <div
        className="absolute left-0 w-full h-[1px] pointer-events-none z-[4] opacity-[0.12]"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(61,174,255,0.6) 50%, transparent 90%)",
          animation: "heroScanline 8s linear infinite",
        }}
      />

      {/* ── Dark vignettes ── */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-[5]"
        style={{
          height: "30%",
          background: "linear-gradient(to bottom, #030810 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none z-[5]"
        style={{
          height: "35%",
          background: "linear-gradient(to top, #030810 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-0 left-0 h-full pointer-events-none z-[5]"
        style={{
          width: "20%",
          background: "linear-gradient(to right, #030810 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-full pointer-events-none z-[5]"
        style={{
          width: "20%",
          background: "linear-gradient(to left, #030810 0%, transparent 100%)",
        }}
      />

      {/* ═══ TEXT CONTENT ═══ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Pill Badge */}
        <div
          style={enter(100)}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#3daeff]/20 bg-white/[0.03] backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(61,174,255,0.06)]"
        >

          <span className="text-[10px] font-bold text-white/70 tracking-[0.2em] uppercase">
            Press &amp; Media Center
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10"
        >
          <span className="inline-block animate-slide-up [animation-fill-mode:both] [animation-delay:0ms]">Discover&nbsp;</span>
          <span className="inline-block animate-slide-up [animation-fill-mode:both] [animation-delay:80ms]">our&nbsp;</span>
          <span className="inline-block animate-slide-up [animation-fill-mode:both] [animation-delay:160ms] text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] to-[#0091ff] drop-shadow-[0_4px_18px_rgba(61,174,255,0.25)] select-none">latest</span>
          <br />
          <span className="inline-block animate-slide-up [animation-fill-mode:both] [animation-delay:240ms]">press&nbsp;</span>
          <span className="inline-block animate-slide-up [animation-fill-mode:both] [animation-delay:320ms]">releases</span>
        </h1>

        {/* Subtitle */}
        <p
          style={enter(360)}
          className="text-[14px] md:text-[16px] text-white/40 leading-[1.85] max-w-[520px] font-light mb-12"
        >
          Stay informed with the latest announcements, partnerships, and milestones shaping the future of AI infrastructure.
        </p>

        {/* Stat pills */}
        <div
          style={enter(460)}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {[
            { value: "50+", label: "Press Releases" },
            { value: "200+", label: "Media Mentions" },
            { value: "30+", label: "Publications" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500"
            >
              <span className="text-[18px] font-bold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-[9px] font-semibold text-white/30 tracking-[0.12em] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
