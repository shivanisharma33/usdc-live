"use client";

import React, { useEffect, useRef, useState } from "react";
import { Newspaper, Zap, TrendingUp, Globe2 } from "lucide-react";

/* ═══════════════════════════ Press Release Hero ═══════════════════════════
   Immersive futuristic hero for the Press Release page.
   Features animated holographic grid, floating stats, gradient headline.
   ═══════════════════════════════════════════════════════════════════════ */

export default function PressReleaseHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [light, setLight] = useState({ x: 50, y: 40 });
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      setLight({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  const enter = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
    transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const stats = [
    { icon: Newspaper, value: "50+", label: "Press Releases" },
    { icon: TrendingUp, value: "200+", label: "Media Mentions" },
    { icon: Globe2, value: "30+", label: "Global Publications" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[85vh] overflow-hidden flex items-center pt-28 md:pt-32 pb-20"
    >
      {/* ── Animated holographic grid ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,174,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(61,174,255,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 15%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 15%, transparent 70%)",
        }}
      />

      {/* ── Mouse-responsive volumetric light ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] transition-[background] duration-500"
        style={{
          background: `radial-gradient(700px circle at ${light.x}% ${light.y}%, rgba(61,174,255,0.12), transparent 55%)`,
        }}
      />

      {/* ── Ambient glows ── */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/[0.07] rounded-full blur-[160px] pointer-events-none z-[1]" />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-cyan-400/[0.04] rounded-full blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute top-[30%] -right-20 w-[350px] h-[350px] bg-blue-600/[0.05] rounded-full blur-[130px] pointer-events-none z-[1]" />

      {/* ── Horizontal scan line animation ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] opacity-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(61,174,255,0.03) 3px, rgba(61,174,255,0.03) 4px)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div
            style={enter(80)}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#3daeff]/20 bg-[#02050c]/70 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(61,174,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.06)]"
          >
            <div className="relative">
              <Zap className="w-3.5 h-3.5 text-[#3daeff]" />
              <div className="absolute inset-0 w-3.5 h-3.5 bg-[#3daeff] rounded-full blur-[6px] opacity-40" />
            </div>
            <span className="text-[10px] font-bold text-white/80 tracking-[0.25em] uppercase">
              Press &amp; Media Center
            </span>
          </div>

          {/* Heading */}
          <h1
            style={enter(160)}
            className="text-[42px] sm:text-[56px] lg:text-[68px] font-extrabold tracking-tight leading-[1.04] text-white mb-6"
          >
            Press{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] via-[#3daeff] to-[#0091ff] cx-gradient-flow">
                Releases
              </span>
              {/* Underline glow */}
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#3daeff] to-transparent opacity-60" />
            </span>
          </h1>

          {/* Supporting copy */}
          <p
            style={enter(240)}
            className="text-sm md:text-[15px] text-white/55 leading-[1.85] max-w-[620px] mb-12"
          >
            Stay informed with the latest announcements, partnerships, and
            milestones from{" "}
            <span className="text-white/80">USDC</span>. Discover how we&apos;re
            shaping the future of{" "}
            <span className="text-white/80">AI infrastructure</span>,{" "}
            <span className="text-white/80">data centers</span>, and{" "}
            <span className="text-white/80">cloud computing</span>.
          </p>

          {/* Stats row */}
          <div
            style={enter(360)}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm hover:border-[#3daeff]/20 hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#3daeff]/10 border border-[#3daeff]/15">
                  <stat.icon className="w-4 h-4 text-[#3daeff]" />
                  <div className="absolute inset-0 rounded-xl bg-[#3daeff]/5 blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold text-white leading-none tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[9px] font-semibold text-white/40 tracking-[0.15em] uppercase mt-0.5">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#04070f] pointer-events-none z-[2]" />
    </section>
  );
}
