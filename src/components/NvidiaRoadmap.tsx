"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ────────────────────── Floating Feature Label ────────────────────── */
function FeatureLabel({
  icon,
  text,
  className,
  delay,
  inView,
}: {
  icon: React.ReactNode;
  text: string;
  className?: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div
      className={`absolute z-20 ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div className="flex items-center gap-2 px-3.5 py-[7px] rounded-full bg-[#080e1e]/90 border border-white/[0.08] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <span className="text-[#3daeff] text-[11px] flex-shrink-0">{icon}</span>
        <span className="text-[9px] font-semibold text-white/75 tracking-[0.16em] uppercase whitespace-nowrap">
          {text}
        </span>
      </div>
    </div>
  );
}

/* ──────────────────── Timeline Dot ──────────────────── */
function TimelineDot({ active }: { active?: boolean }) {
  return (
    <div className="absolute -left-[29px] top-[2px] flex items-center justify-center">
      <div
        className={`w-[10px] h-[10px] rounded-full ${
          active ? "bg-[#3daeff]" : "bg-[#3daeff]/60"
        }`}
        style={{
          boxShadow: active
            ? "0 0 10px rgba(61,174,255,0.5), 0 0 20px rgba(61,174,255,0.2)"
            : "0 0 6px rgba(61,174,255,0.25)",
        }}
      />
    </div>
  );
}

/* ──────────────────────── Main Section ──────────────────────── */
export default function NvidiaRoadmap() {
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
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const timelineItems = [
    {
      num: "01",
      title: "BLACKWELL",
      desc: "Optimized for high-density AI training and large-scale inference workloads.",
    },
    {
      num: "02",
      title: "ORACLE BLACKWELL",
      desc: "Purpose-built infrastructure supporting enterprise-scale AI deployment.",
    },
    {
      num: "03",
      title: "VERA RUBIN",
      desc: "Future-ready architecture designed for the next generation of AI compute.",
    },
  ];

  const stats = [
    { value: "120KW", label: "PER RACK" },
    { value: "DLC", label: "LIQUID\nCOOLING" },
    { value: "100%", label: "AI\nREADY" },
    { value: "4 Weeks", label: "DEPLOYM\nENT" },
  ];

  return (
    <section
      id="nvidia-roadmap"
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#04070f]"
      style={{ minHeight: "700px" }}
    >
      {/* ── Ambient glows ── */}
      <div className="absolute top-[-20%] left-[-12%] w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[10%] w-[600px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-cyan-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* ── Top decorative line ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:py-28">
        {/* ═══ Header: Badge + Heading + Description ═══ */}
        <div className="mb-14 md:mb-16">
          {/* Pill Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 backdrop-blur-md mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]"
            style={fadeUp(0)}
          >
            <span className="w-6 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/65 tracking-[0.22em] uppercase font-sans">
              GPU PLATFORM SUPPORT
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-extrabold tracking-[-0.02em] leading-[1.02] mb-6"
            style={fadeUp(80)}
          >
            <span className="text-white block">BUILT FOR</span>
            <span className="text-white block">NVIDIA&apos;S ROADMAP</span>
          </h2>

          {/* Description */}
          <p
            className="text-[13px] md:text-[14px] text-white/40 leading-[1.8] max-w-[440px] font-normal"
            style={fadeUp(160)}
          >
            The ARMS200 is engineered to support NVIDIA&apos;s highest-density
            AI compute platforms – today and into the next generation.
          </p>
        </div>

        {/* ═══ Main Grid: Images + Timeline ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_auto_0.85fr] gap-8 lg:gap-0 items-start mb-16">
          {/* ── Left Column: Hardware Images with Floating Labels ── */}
          <div
            className="relative"
            style={{
              minHeight: "400px",
              ...fadeUp(240),
            }}
          >
            {/* Primary GPU Image */}
            <div
              className="absolute top-[8%] left-[8%] w-[84%] rounded-lg overflow-hidden"
              style={{
                transform: "perspective(900px) rotateY(-3deg) rotateX(1.1deg)",
                boxShadow:
                  "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <div className="relative">
                <Image
                  src="/gpu_board_1.png"
                  alt="GPU server circuit board – direct-to-chip cooling"
                  width={640}
                  height={400}
                  className="w-full h-auto object-cover"
                  style={{ display: "block" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04070f]/30 via-transparent to-transparent" />
              </div>
            </div>

            {/* ── Floating Feature Labels ── */}
            {/* ⚡ Power Ready — top left */}
            <FeatureLabel
              icon={
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              }
              text="POWER READY"
              className="top-[-6px] left-[-4px]"
              delay={500}
              inView={inView}
            />

            {/* ❄ Direct-to-Chip Cooling — top center-right */}
            <FeatureLabel
              icon={
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                </svg>
              }
              text="DIRECT-TO-CHIP COOLING"
              className="top-[15%] right-[-2%] lg:right-[2%]"
              delay={600}
              inView={inView}
            />

            {/* ⬡ GPU Optimized — bottom left */}
            <FeatureLabel
              icon={
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="2" x2="9" y2="4" />
                  <line x1="15" y1="2" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="22" />
                  <line x1="15" y1="20" x2="15" y2="22" />
                  <line x1="2" y1="9" x2="4" y2="9" />
                  <line x1="2" y1="15" x2="4" y2="15" />
                  <line x1="20" y1="9" x2="22" y2="9" />
                  <line x1="20" y1="15" x2="22" y2="15" />
                </svg>
              }
              text="GPU OPTIMIZED"
              className="bottom-[20%] left-[-4%]"
              delay={700}
              inView={inView}
            />

            {/* 🌐 High-Speed Networking — bottom right */}
            <FeatureLabel
              icon={
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              }
              text="HIGH-SPEED NETWORKING"
              className="bottom-[2%] right-[8%] lg:right-[12%]"
              delay={800}
              inView={inView}
            />
          </div>

          {/* ── Center: Vertical Timeline Line ── */}
          <div
            className="hidden lg:flex flex-col items-center mx-8 xl:mx-12"
            style={fadeUp(350)}
          >
            <div
              className="w-px flex-1 min-h-[340px]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(61,174,255,0.35) 0%, rgba(61,174,255,0.15) 60%, transparent 100%)",
              }}
            />
          </div>

          {/* ── Right Column: Timeline Items ── */}
          <div className="relative pl-7 lg:pl-7 pt-2" style={fadeUp(400)}>
            {/* Mobile-only vertical line */}
            <div
              className="lg:hidden absolute left-0 top-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(61,174,255,0.35) 0%, rgba(61,174,255,0.15) 60%, transparent 100%)",
              }}
            />

            {timelineItems.map((item, i) => (
              <div
                key={item.num}
                className="relative mb-12 last:mb-0"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(16px)",
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${500 + i * 120}ms`,
                }}
              >
                <TimelineDot active={i === 0} />
                <span className="text-[11px] font-semibold text-[#3daeff]/80 tracking-[0.18em] block mb-2">
                  {item.num}
                </span>
                <h3 className="text-[15px] md:text-[16px] font-bold text-white tracking-[0.06em] mb-2.5 uppercase">
                  {item.title}
                </h3>
                <p className="text-[11px] md:text-[12px] text-white/30 leading-[1.75] max-w-[260px] font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ Bottom Stats Bar ═══ */}
        <div
          className="inline-grid grid-cols-2 md:grid-cols-4 border border-white/[0.06] rounded-lg overflow-hidden max-w-[580px]"
          style={fadeUp(700)}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-start justify-center px-5 py-4 bg-[#060c18]/50 ${
                i < stats.length - 1 ? "border-r border-white/[0.06]" : ""
              }`}
            >
              <span className="text-[20px] md:text-[22px] font-bold text-white tracking-tight leading-none mb-1.5">
                {stat.value}
              </span>
              <span className="text-[8px] font-semibold text-white/25 tracking-[0.2em] uppercase whitespace-pre-line leading-[1.4]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom decorative line ── */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
}
