"use client";

import React, { useEffect, useRef, useState } from "react";
import { Calendar, ArrowUpRight } from "lucide-react";

/* ═══════════════════════ LatestNews Component ═══════════════════════ */

export default function LatestNews() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(22px)",
    transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const newsItems = [
    {
      badge: "INDUSTRY NEWS",
      image: "/news_ai_chip.png",
      date: "JANUARY 3, 2025",
      title: "Microsoft Expects to Spend $80 Bn on Ai-enabled data centers in fiscal 2025",
      excerpt: "Microsoft announces massive investment in AI-enabled data center infrastructure, signaling..",
      category: "Industry News",
      hasCornerCut: true,
    },
    {
      badge: "INDUSTRY NEWS",
      image: "/news_ai_network.png",
      date: "DECEMBER 28, 2024",
      title: "AI Power: Expanding data center capacity to meet growing demand",
      excerpt: "Comprehensive overview of data center modernization strategies, capacity planning, and..",
      category: "Industry News",
      hasCornerCut: false,
    },
  ];

  return (
    <section
      id="latest-news"
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#04070f] py-20 md:py-28"
    >
      {/* ── Ambient Glows ── */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-blue-500/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-blue-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* ── Top decorative line ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* ── Heading Block ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16">
          <div className="flex flex-col items-start" style={fadeUp(0)}>
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.12] bg-[#02050c]/85 backdrop-blur-md mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
              <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[9px] font-bold text-white/70 tracking-[0.25em] uppercase">
                NEWS & INSIGHTS
              </span>
            </div>
            {/* Title */}
            <h2 className="text-[34px] sm:text-[40px] md:text-[44px] font-extrabold tracking-tight leading-[1.1]">
              LATEST <span className="text-[#3daeff]">NEWS</span>
            </h2>
            {/* Description */}
            <p className="text-[12px] md:text-[13px] text-white/45 max-w-[480px] leading-[1.8] mt-4 font-normal">
              Stay ahead of the curve with the latest developments from USDC - your trusted partner in digital infrastructure.
            </p>
          </div>

          {/* Browse All News Button */}
          <div className="flex items-start md:items-center" style={fadeUp(100)}>
            <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#3daeff] hover:bg-[#2fa0f0] text-white font-extrabold text-xs tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(61,174,255,0.2)] hover:shadow-[0_4px_25px_rgba(61,174,255,0.3)] cursor-pointer group">
              Browse All News
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </span>
            </button>
          </div>
        </div>

        {/* ── News Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 md:mb-20">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 sm:p-8 rounded-2xl bg-[#eaeef6] border border-white/[0.08] relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                ...fadeUp(150 + idx * 100),
              }}
            >
              {/* Top-Right Triangular cut-out (only on first card, or as specified by hasCornerCut) */}
              {item.hasCornerCut && (
                <div className="absolute top-0 right-0 w-16 h-16 z-20 pointer-events-none">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon points="0,0 100,0 100,100" fill="#04070f" />
                    <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  </svg>
                  {/* Arrow overlay */}
                  <div className="absolute top-2.5 right-2.5">
                    <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2.2} />
                  </div>
                </div>
              )}

              {/* Top Left Badge inside Card */}
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-black/15 bg-black/[0.03] text-[8px] font-extrabold text-black/60 tracking-wider mb-6 uppercase w-fit">
                {item.badge}
              </div>

              {/* Card Main Grid (Thumbnail Left, Text Right) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                
                {/* Left Thumbnail Image */}
                <div className="sm:col-span-5 w-full relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl bg-black/10 border border-black/[0.06]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right Text Content */}
                <div className="sm:col-span-7 flex flex-col justify-between min-h-[160px] h-full">
                  <div>
                    {/* Date Block */}
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-black/40 uppercase mb-2.5">
                      <Calendar className="w-3.5 h-3.5 text-black/30" />
                      <span>{item.date}</span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-black text-[14px] sm:text-[15px] font-black leading-snug tracking-tight mb-2 hover:text-[#0091ff] transition-colors duration-200">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-black/55 text-[10.5px] md:text-[11px] leading-relaxed mb-4 font-normal">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Footer Category Section */}
                  <div>
                    {/* Divider */}
                    <div className="w-full h-px bg-black/[0.08] my-3" />
                    
                    <div className="flex items-center gap-2 text-[9px] font-bold text-black/50 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full border border-black/20 bg-transparent" />
                      <span>{item.category}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom Metrics Capsule Bar ── */}
        <div
          className="w-full rounded-2xl md:rounded-full border border-white/[0.08] bg-[#070b14]/90 backdrop-blur-md py-6 px-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 relative overflow-hidden"
          style={{
            boxShadow: "0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
            ...fadeUp(350),
          }}
        >
          {/* Background subtle glow inside metrics bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] via-transparent to-blue-500/[0.02] pointer-events-none" />

          {/* Metric 1 */}
          <div className="flex items-center gap-4">
            <span className="text-[34px] md:text-[38px] font-extrabold text-[#3daeff] leading-none tracking-tight">
              100+
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-white/45 tracking-[0.2em] uppercase leading-snug">
              ARTICLES PUBLISHED
            </span>
          </div>

          {/* Divider 1 */}
          <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-[#3daeff]/30 to-transparent" />

          {/* Metric 2 */}
          <div className="flex items-center gap-4">
            <span className="text-[34px] md:text-[38px] font-extrabold text-[#3daeff] leading-none tracking-tight">
              12K+
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-white/45 tracking-[0.2em] uppercase leading-snug">
              ARTICLES PUBLISHED
            </span>
          </div>

          {/* Divider 2 */}
          <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-[#3daeff]/30 to-transparent" />

          {/* Metric 3 */}
          <div className="flex items-center gap-4">
            <span className="text-[34px] md:text-[38px] font-extrabold text-[#3daeff] leading-none tracking-tight">
              5
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-white/45 tracking-[0.2em] uppercase leading-snug">
              MONTHLY READERS
            </span>
          </div>
        </div>

      </div>

      {/* ── Bottom decorative line ── */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
}
