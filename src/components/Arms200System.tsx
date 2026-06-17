"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Zap, Clock } from "lucide-react";

/* ───────────────────────────── Wave Canvas ──────────────────────────── */
function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * Math.min(window.devicePixelRatio, 2);
      canvas.height = height * Math.min(window.devicePixelRatio, 2);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(
        Math.min(window.devicePixelRatio, 2),
        Math.min(window.devicePixelRatio, 2)
      );
    };
    resize();
    window.addEventListener("resize", resize);

    const ROWS = 60;
    const COLS = 120;

    const animate = (time: number) => {
      animRef.current = requestAnimationFrame(animate);
      const t = time * 0.001;

      ctx.clearRect(0, 0, width, height);

      // Draw wave particles only in the bottom-right area
      const startX = width * 0.35;
      const startY = height * 0.55;
      const areaW = width * 0.65;
      const areaH = height * 0.45;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const u = col / COLS;
          const v = row / ROWS;

          const x = startX + u * areaW;
          const baseY = startY + v * areaH;

          // Wave displacement
          const wave1 = Math.sin(u * 6 + t * 0.8 + v * 3) * 8;
          const wave2 = Math.sin(u * 3 - t * 0.5 + v * 5) * 5;
          const wave3 = Math.cos(u * 8 + t * 1.2) * 3;

          const y = baseY + wave1 + wave2 + wave3;

          // Color - blue with varying intensity
          const elevation = (wave1 + wave2 + wave3) / 16;
          const intensity = Math.max(0, 0.15 + elevation * 0.4);
          const blueBase = Math.min(1, 0.4 + elevation * 0.6);

          // Fade edges
          const fadeX = Math.min(u * 3, 1) * Math.min((1 - u) * 5, 1);
          const fadeY = Math.min(v * 4, 1) * Math.min((1 - v) * 3, 1);
          const alpha = intensity * fadeX * fadeY * 0.6;

          if (alpha < 0.01) continue;

          const r = Math.floor(10 + elevation * 30);
          const g = Math.floor(80 + blueBase * 80);
          const b = Math.floor(180 + blueBase * 75);

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

/* ──────────────────────────── Main Section ───────────────────────────── */
export default function Arms200System() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="arms200-system"
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#04070f] border-t border-white/[0.03]"
      style={{ minHeight: "620px" }}
    >
      {/* ── Ambient glows ── */}
      <div className="absolute top-[-20%] left-[-12%] w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[10%] w-[600px] h-[400px] bg-blue-500/[0.05] rounded-full blur-[130px] pointer-events-none" />

      {/* ── Wave particle canvas ── */}
      <WaveCanvas />

      {/* ── Horizontal rule / top decorative line ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* ── Content Grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* ══════ LEFT COLUMN ══════ */}
          <div className="flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 backdrop-blur-md mb-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-1000 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <span className="w-3.5 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[10px] font-semibold text-white/80 tracking-[0.2em] uppercase font-sans">
                THE OPPORTUNITY
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-4xl sm:text-5xl md:text-[56px] lg:text-[60px] font-bold tracking-tight leading-[1.05] mb-7 transition-all duration-1000 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "100ms",
              }}
            >
              <span className="text-white">ARMS 200</span>
              <br />
              <span className="text-[#0091ff]">SYSTEM</span>
            </h2>

            {/* Description paragraphs */}
            <div
              className="space-y-5 mb-12 transition-all duration-1000 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "200ms",
              }}
            >
              <p className="text-[13px] md:text-[14px] text-white/45 leading-[1.75] max-w-[480px] font-normal">
                The ARMS 200 is USDC&apos;s proprietary modular data-center
                platform. Each module delivers up to 600 kW of critical IT load
                and is designed for Tier III redundancy
                (concurrentmaintainability).
              </p>
              <p className="text-[13px] md:text-[14px] text-white/45 leading-[1.75] max-w-[480px] font-normal">
                The system&apos;s prefabricated architecture allows rapid
                on-site assembly and integration with chilled-water or
                direct-to-chip cooling systems, making the ideal solution for
                AI-ready infrastructure.
              </p>
            </div>

            {/* Stats Row */}
            <div
              className="flex items-center gap-6 transition-all duration-1000 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "350ms",
              }}
            >
              {/* Stat 1: Power Capacity */}
              <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-white/[0.06] bg-[#060c18]/60 backdrop-blur-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/[0.08] border border-blue-400/[0.12]">
                  <Zap className="w-5 h-5 text-[#3daeff]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none">
                    40MW+
                  </span>
                  <span className="text-[9px] font-semibold text-white/35 tracking-[0.18em] uppercase mt-1.5">
                    POWER CAPACITY
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/[0.08] to-white/0" />

              {/* Stat 2: Deployment Timeline */}
              <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-white/[0.06] bg-[#060c18]/60 backdrop-blur-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/[0.08] border border-blue-400/[0.12]">
                  <Clock className="w-5 h-5 text-[#3daeff]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none">
                    ≤ 12 Month
                  </span>
                  <span className="text-[9px] font-semibold text-white/35 tracking-[0.18em] uppercase mt-1.5">
                    DEPLOYMENT TIMELINE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ══════ RIGHT COLUMN — ARMS 200 Image ══════ */}
          <div
            className="flex justify-center lg:justify-end items-center transition-all duration-1000 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(40px)",
              transitionDelay: "200ms",
            }}
          >
            <div className="relative w-full max-w-[560px]">
              {/* Glow behind image */}
              <div className="absolute inset-0 -inset-x-8 -inset-y-8 bg-blue-500/[0.06] rounded-[40px] blur-[60px] pointer-events-none" />

              {/* The server image */}
              <Image
                src="/arms200_cabinet.jpg"
                alt="ARMS 200 Modular Data Center System"
                width={560}
                height={620}
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_60px_rgba(0,100,255,0.15)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom decorative line ── */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
}
