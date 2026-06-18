"use client";

import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════════ Press Release Hero ═══════════════════════════
   Ultra-premium hero with multi-layered aurora orb, animated star particles,
   scan-line texture, gradient typography, and floating stat counters.
   ═══════════════════════════════════════════════════════════════════════ */

export default function PressReleaseHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  /* ── Particle star field on canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const stars: { x: number; y: number; r: number; a: number; s: number; d: number }[] = [];
    const STAR_COUNT = 80;

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random(),
        s: Math.random() * 0.008 + 0.002,
        d: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      stars.forEach((star) => {
        star.a += star.s * star.d;
        if (star.a >= 1 || star.a <= 0.1) star.d *= -1;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160, 210, 255, ${star.a * 0.6})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
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
            @keyframes auroraShift {
              0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
              33% { transform: translate(-48%, -52%) scale(1.05) rotate(3deg); }
              66% { transform: translate(-52%, -48%) scale(0.97) rotate(-2deg); }
            }
            @keyframes auroraShift2 {
              0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
              50% { transform: translate(-53%, -47%) scale(1.08) rotate(-4deg); }
            }
            @keyframes orbBreath {
              0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
              50% { opacity: 1; transform: translate(-50%, -50%) scale(1.04); }
            }
            @keyframes heroScanline {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100vh); }
            }
          `,
        }}
      />

      {/* ── Star particle canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      />

      {/* ═══ MULTI-LAYERED AURORA ORB ═══ */}

      {/* Layer 1: Outer aurora haze — wide, soft, multi-color */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          width: "1400px",
          height: "1000px",
          animation: "auroraShift 18s ease-in-out infinite",
          background:
            "radial-gradient(ellipse at 40% 45%, rgba(30,100,220,0.18) 0%, rgba(80,50,180,0.08) 30%, rgba(20,80,160,0.04) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Layer 2: Secondary aurora — purple/magenta shifted */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "48%",
          left: "52%",
          width: "900px",
          height: "700px",
          animation: "auroraShift2 14s ease-in-out infinite",
          background:
            "radial-gradient(ellipse at 55% 50%, rgba(100,60,200,0.12) 0%, rgba(60,30,160,0.06) 40%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Layer 3: Primary blue orb — bright, concentrated */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "52%",
          left: "50%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          animation: "orbBreath 8s ease-in-out infinite",
          background:
            "radial-gradient(circle at 45% 40%, rgba(80,180,255,0.45) 0%, rgba(40,130,230,0.25) 25%, rgba(20,80,180,0.1) 50%, transparent 70%)",
          filter: "blur(3px)",
        }}
      />

      {/* Layer 4: Inner core — intense white-blue hotspot */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(200,230,255,0.6) 0%, rgba(100,180,255,0.25) 35%, transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      {/* Layer 5: Rim light — conic crescent for 3D illusion */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "52%",
          left: "50%",
          width: "650px",
          height: "650px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "conic-gradient(from 180deg, transparent 0%, rgba(120,200,255,0.1) 10%, transparent 25%, transparent 65%, rgba(140,180,255,0.06) 80%, transparent 100%)",
          filter: "blur(4px)",
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
      <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Pill Badge */}
        <div
          style={enter(100)}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#3daeff]/20 bg-white/[0.03] backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(61,174,255,0.06)]"
        >
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-[#3daeff] shadow-[0_0_8px_rgba(61,174,255,0.8)]" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#3daeff] cx-pulse" />
          </div>
          <span className="text-[10px] font-bold text-white/70 tracking-[0.2em] uppercase">
            Press &amp; Media Center
          </span>
        </div>

        {/* Heading */}
        <h1
          style={enter(220)}
          className="text-[36px] sm:text-[50px] md:text-[62px] lg:text-[74px] font-extralight tracking-[-0.03em] leading-[1.05] text-white mb-5"
        >
          Discover our{" "}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6ec8ff] via-[#3daeff] to-[#a78bfa] cx-gradient-flow">
              latest
            </span>
          </span>
          <br />
          press releases
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
