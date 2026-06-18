"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Calendar,
  ArrowUpRight,
  Search,
  Filter,
  ChevronDown,
  Sparkles,
  Building2,
  Server,
  Cpu,
  Globe2,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react";

/* ═══════════════════════════ Press Release Grid ═══════════════════════════
   Futuristic, premium press releases listing with filters, animated cards,
   and holographic design elements. Category-tagged, date-sorted entries.
   ═══════════════════════════════════════════════════════════════════════ */

interface PressRelease {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  tag: string;
  icon: React.ElementType;
  featured?: boolean;
}

const pressReleases: PressRelease[] = [
  {
    id: 1,
    category: "PARTNERSHIP",
    date: "June 12, 2025",
    title:
      "USDC Partners with NVIDIA to Deploy Next-Gen Blackwell GPU Clusters Across Global Data Centers",
    excerpt:
      "Strategic partnership accelerates AI infrastructure deployment with NVIDIA's latest Blackwell architecture, enabling unprecedented compute density and energy efficiency across USDC's global network.",
    tag: "AI Infrastructure",
    icon: Cpu,
    featured: true,
  },
  {
    id: 2,
    category: "EXPANSION",
    date: "May 28, 2025",
    title:
      "USDC Announces $2.5 Billion Investment in Sovereign AI Data Centers Across Southeast Asia",
    excerpt:
      "Massive expansion initiative targets key markets in Singapore, Indonesia, and Malaysia to meet surging demand for localized AI compute infrastructure.",
    tag: "Global Expansion",
    icon: Globe2,
    featured: true,
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    date: "May 15, 2025",
    title:
      "Revolutionary Liquid Cooling System Achieves 40% Energy Reduction in AI Workload Operations",
    excerpt:
      "USDC's proprietary advanced cooling technology sets new industry benchmarks for sustainability in high-density compute environments.",
    tag: "Innovation",
    icon: Zap,
  },
  {
    id: 4,
    category: "CORPORATE",
    date: "April 30, 2025",
    title:
      "USDC Achieves Tier IV Certification for All North American Data Center Facilities",
    excerpt:
      "Industry-leading uptime guarantees and fault-tolerant infrastructure design receive highest certification from the Uptime Institute.",
    tag: "Certification",
    icon: Award,
  },
  {
    id: 5,
    category: "PARTNERSHIP",
    date: "April 18, 2025",
    title:
      "Oracle Cloud Infrastructure Selects USDC as Preferred Colocation Partner for Enterprise AI",
    excerpt:
      "Multi-year agreement positions USDC as a key enabler of Oracle's distributed cloud strategy for enterprise AI workloads.",
    tag: "Cloud",
    icon: Server,
  },
  {
    id: 6,
    category: "EXPANSION",
    date: "March 25, 2025",
    title:
      "Groundbreaking Ceremony for USDC's 500MW Hyperscale Campus in Northern Virginia",
    excerpt:
      "The largest single-phase data center development in the region will serve hyperscale cloud providers and AI-native enterprises.",
    tag: "Construction",
    icon: Building2,
  },
  {
    id: 7,
    category: "TECHNOLOGY",
    date: "March 10, 2025",
    title:
      "USDC Launches AI-Powered Predictive Maintenance Platform for Data Center Operations",
    excerpt:
      "Machine learning algorithms analyze thousands of sensor data points in real-time to predict and prevent hardware failures before they impact service.",
    tag: "AI Operations",
    icon: Sparkles,
  },
  {
    id: 8,
    category: "CORPORATE",
    date: "February 22, 2025",
    title:
      "USDC Reports Record Q4 2024 Revenue, Driven by 300% Growth in AI Compute Demand",
    excerpt:
      "Strong financial performance reflects surging enterprise demand for GPU-dense infrastructure and colocation services across all regions.",
    tag: "Financial",
    icon: TrendingUp,
  },
];

const categories = [
  "ALL",
  "PARTNERSHIP",
  "EXPANSION",
  "TECHNOLOGY",
  "CORPORATE",
];

const categoryColors: Record<string, string> = {
  PARTNERSHIP: "#3daeff",
  EXPANSION: "#10b981",
  TECHNOLOGY: "#a855f7",
  CORPORATE: "#f59e0b",
};


export default function PressReleaseGrid() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.08 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const filtered = pressReleases.filter((pr) => {
    const matchCategory =
      activeCategory === "ALL" || pr.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const visible = filtered.slice(0, visibleCount);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#04070f] py-16 md:py-24 overflow-hidden"
    >
      {/* ── Custom Cyberpunk HUD styles ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes cyber-scan {
              0% { top: 0%; opacity: 0; }
              8% { opacity: 0.8; }
              90% { opacity: 0.8; }
              100% { top: 100%; opacity: 0; }
            }
            .cyber-scanline {
              position: absolute;
              left: 0;
              right: 0;
              height: 1px;
              background: linear-gradient(90deg, transparent, rgba(61, 174, 255, 0.45) 50%, transparent);
              opacity: 0;
              pointer-events: none;
              z-index: 15;
            }
            .group:hover .cyber-scanline {
              animation: cyber-scan 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
            }
          `,
        }}
      />

      {/* ── Ambient glows ── */}
      <div className="absolute top-[30%] left-[-8%] w-[400px] h-[400px] bg-blue-500/[0.025] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[350px] h-[350px] bg-purple-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* ── Top decorative line ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3daeff]/15 to-transparent" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        {/* ── Filter / Search Bar ── */}
        <div
          style={fadeUp(0)}
          className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 mb-12 md:mb-16"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(6);
                }}
                className={`px-4 py-2 rounded-xl text-[11px] font-bold tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-[#3daeff]/15 border-[#3daeff]/30 text-[#3daeff] shadow-[0_0_16px_rgba(61,174,255,0.12)]"
                    : "bg-white/[0.02] border-white/[0.06] text-white/45 hover:text-white/70 hover:border-white/12 hover:bg-white/[0.04]"
                }`}
              >
                {cat === "ALL" ? (
                  <span className="flex items-center gap-1.5">
                    <Filter className="w-3 h-3" />
                    All
                  </span>
                ) : (
                  cat
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-[320px] w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <input
              type="text"
              placeholder="Search press releases..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/80 text-[12px] placeholder:text-white/25 focus:outline-none focus:border-[#3daeff]/30 focus:bg-white/[0.04] transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* ── Featured releases (top 2) ── */}
        {activeCategory === "ALL" && searchQuery === "" && (
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-[#3daeff] tracking-[0.25em] uppercase">
                FEATURED RELEASES
              </span>
              <div className="h-px flex-grow bg-gradient-to-r from-[#3daeff]/20 via-[#3daeff]/5 to-transparent" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pressReleases
                .filter((pr) => pr.featured)
                .map((pr, idx) => {
                  const color = categoryColors[pr.category] || "#3daeff";
                  return (
                    <div
                      key={pr.id}
                      style={fadeUp(100 + idx * 80)}
                      className="group relative p-[1.5px] rounded-[24px] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                    >
                      {/* Rotating Holographic Border */}
                      <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none opacity-25 group-hover:opacity-100 transition-opacity duration-500 z-0">
                        <div
                          className="absolute -inset-[50%] cx-spin-slow"
                          style={{
                            background: `conic-gradient(from 0deg, transparent, ${color}50, transparent 25%, transparent 50%, ${color}30, transparent 75%)`,
                          }}
                        />
                      </div>

                      {/* Translucent Glassmorphic Card Container */}
                      <div className="relative z-10 flex flex-col p-8 rounded-[23px] bg-[#070c18]/85 border border-white/[0.05] backdrop-blur-2xl transition-all duration-500 overflow-hidden cursor-pointer h-full">
                        {/* Glass sheen highlight overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.005] via-white/[0.04] to-transparent pointer-events-none" />

                        {/* Inside Corner Accents */}
                        <span className="absolute top-3.5 left-3.5 w-4 h-4 border-t border-l border-[#3daeff]/35 rounded-tl-sm pointer-events-none group-hover:border-[#3daeff]/70 transition-colors z-20" />
                        <span className="absolute top-3.5 right-3.5 w-4 h-4 border-t border-r border-[#3daeff]/35 rounded-tr-sm pointer-events-none group-hover:border-[#3daeff]/70 transition-colors z-20" />
                        <span className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b border-l border-[#3daeff]/35 rounded-bl-sm pointer-events-none group-hover:border-[#3daeff]/70 transition-colors z-20" />
                        <span className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b border-r border-[#3daeff]/35 rounded-br-sm pointer-events-none group-hover:border-[#3daeff]/70 transition-colors z-20" />

                        {/* Header row: Badge + Icon */}
                        <div className="flex items-center justify-between mb-6 z-10">
                          <span
                            className="text-[9px] font-bold tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full border transition-all duration-300"
                            style={{
                              color,
                              borderColor: `${color}30`,
                              background: `linear-gradient(135deg, ${color}12, transparent)`,
                            }}
                          >
                            {pr.category}
                          </span>

                          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.08] group-hover:border-[#3daeff]/40 group-hover:bg-[#3daeff]/10 group-hover:shadow-[0_0_15px_rgba(61,174,255,0.15)] transition-all duration-300">
                            <ArrowUpRight className="w-4 h-4 text-white/45 group-hover:text-[#3daeff] transition-colors" />
                          </div>
                        </div>

                        {/* Icon + Date details */}
                        <div className="flex items-center gap-3 mb-4 z-10">
                          <div
                            className="flex items-center justify-center w-10 h-10 rounded-xl border transition-colors duration-300"
                            style={{
                              borderColor: `${color}18`,
                              background: `linear-gradient(135deg, ${color}0d, transparent)`,
                            }}
                          >
                            <pr.icon className="w-5 h-5" style={{ color }} />
                          </div>

                          <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-[#3daeff]/80" />
                            {pr.date}
                          </div>
                        </div>

                        {/* Title & Excerpt */}
                        <div className="flex-grow z-10">
                          <h3 className="text-[18px] sm:text-[20px] font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-[#3daeff] transition-colors duration-300">
                            {pr.title}
                          </h3>

                          <p className="text-[12.5px] text-white/40 leading-[1.8] mb-6 line-clamp-3">
                            {pr.excerpt}
                          </p>
                        </div>

                        {/* Card Footer Tag */}
                        <div className="mt-auto pt-4 border-t border-white/[0.04] flex items-center justify-between z-10">
                          <span className="text-[9px] font-bold text-white/30 tracking-[0.2em] uppercase">
                            {pr.tag}
                          </span>

                          <span className="text-[9px] font-semibold text-white/45 tracking-[0.08em] group-hover:text-[#3daeff] transition-colors duration-300">
                            VIEW NEWS
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ── Regular press release grid ── */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[10px] font-bold text-white/30 tracking-[0.25em] uppercase">
            PRESS ARCHIVES
          </span>
          <div className="h-px flex-grow bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible
            .filter(
              (pr) =>
                !(
                  pr.featured &&
                  activeCategory === "ALL" &&
                  searchQuery === ""
                )
            )
            .map((pr, idx) => {
              const color = categoryColors[pr.category] || "#3daeff";
              return (
                <div
                  key={pr.id}
                  style={fadeUp(200 + idx * 60)}
                  className="group relative p-[1px] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-[0_6px_20px_rgba(0,0,0,0.25)] h-full"
                >
                  {/* Rotating Holographic Border */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-25 group-hover:opacity-100 transition-opacity duration-500 z-0">
                    <div
                      className="absolute -inset-[50%] cx-spin-slow"
                      style={{
                        background: `conic-gradient(from 0deg, transparent, ${color}45, transparent 25%, transparent 50%, ${color}25, transparent 75%)`,
                      }}
                    />
                  </div>

                  {/* Translucent Glassmorphic Card Container */}
                  <div className="relative z-10 flex flex-col p-6 rounded-[15px] bg-[#070c18]/85 border border-white/[0.05] backdrop-blur-2xl transition-all duration-500 overflow-hidden cursor-pointer h-full">
                    {/* Glass sheen highlight overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.002] via-white/[0.03] to-transparent pointer-events-none" />

                    {/* Inside Corner Accents */}
                    <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#3daeff]/20 rounded-tl-sm pointer-events-none group-hover:border-[#3daeff]/50 transition-colors z-20" />
                    <span className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#3daeff]/20 rounded-tr-sm pointer-events-none group-hover:border-[#3daeff]/50 transition-colors z-20" />
                    <span className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#3daeff]/20 rounded-bl-sm pointer-events-none group-hover:border-[#3daeff]/50 transition-colors z-20" />
                    <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#3daeff]/20 rounded-br-sm pointer-events-none group-hover:border-[#3daeff]/50 transition-colors z-20" />

                    {/* Category Pill + Arrow */}
                    <div className="flex items-center justify-between mb-4 z-10">
                      <span
                        className="text-[8px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border transition-all duration-300"
                        style={{
                          color,
                          borderColor: `${color}20`,
                          background: `linear-gradient(135deg, ${color}08, transparent)`,
                        }}
                      >
                        {pr.category}
                      </span>

                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:border-[#3daeff]/30 group-hover:bg-[#3daeff]/5 transition-all duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#3daeff] transition-colors" />
                      </div>
                    </div>

                    {/* Date details */}
                    <div className="flex items-center gap-1.5 text-[9px] text-white/35 font-medium mb-3 z-10">
                      <Calendar className="w-3.5 h-3.5 text-[#3daeff]/70" />
                      {pr.date}
                    </div>

                    {/* Text Details */}
                    <div className="flex-grow z-10 group-hover:translate-x-0.5 transition-transform duration-300">
                      <h4 className="text-[14px] sm:text-[15px] font-bold text-white/85 group-hover:text-white transition-colors duration-300 line-clamp-3">
                        {pr.title}
                      </h4>

                      <p className="text-[11px] text-white/35 leading-[1.7] mt-3 line-clamp-2">
                        {pr.excerpt}
                      </p>
                    </div>

                    {/* Footer metadata */}
                    <div className="mt-5 pt-3 border-t border-white/[0.03] flex items-center justify-between z-10">
                      <span className="text-[9px] font-semibold text-white/25 tracking-[0.15em] uppercase">
                        {pr.tag}
                      </span>

                      <pr.icon
                        className="w-3.5 h-3.5 text-white/20 group-hover:text-[#3daeff]/70 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* ── Load More ── */}
        {visibleCount < filtered.length && (
          <div style={fadeUp(400)} className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#3daeff]/25 hover:bg-white/[0.05] text-white/60 hover:text-white text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer"
            >
              Load More Releases
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="w-10 h-10 text-white/10 mb-4" />
            <p className="text-white/30 text-[14px] font-medium mb-1">
              No press releases found
            </p>
            <p className="text-white/20 text-[12px]">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* ── Bottom decorative line ── */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3daeff]/10 to-transparent" />
    </section>
  );
}
