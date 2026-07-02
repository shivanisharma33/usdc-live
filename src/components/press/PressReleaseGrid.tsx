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
  Clock,
  MoveRight,
} from "lucide-react";

/* ═══════════════════════════ Press Release Grid ═══════════════════════════
   Bento-grid editorial layout with varied card sizes, gradient mesh
   backgrounds, clean modern typography, and cinematic hover effects.
   Featured items get hero-sized treatment; archives flow in a clean grid.
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
  readTime?: string;
}

const pressReleases: PressRelease[] = [
  {
    id: 1,
    category: "PARTNERSHIP",
    date: "June 12, 2025",
    title: "USDC Partners with NVIDIA to Deploy Next-Gen Blackwell GPU Clusters Across Global Data Centers",
    excerpt: "Strategic partnership accelerates AI infrastructure deployment with NVIDIA's latest Blackwell architecture, enabling unprecedented compute density and energy efficiency across USDC's global network.",
    tag: "AI Infrastructure",
    icon: Cpu,
    featured: true,
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "EXPANSION",
    date: "May 28, 2025",
    title: "USDC Announces $2.5 Billion Investment in Sovereign AI Data Centers Across Southeast Asia",
    excerpt: "Massive expansion initiative targets key markets in Singapore, Indonesia, and Malaysia to meet surging demand for localized AI compute infrastructure.",
    tag: "Global Expansion",
    icon: Globe2,
    featured: true,
    readTime: "4 min read",
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    date: "May 15, 2025",
    title: "Revolutionary Liquid Cooling System Achieves 40% Energy Reduction in AI Workload Operations",
    excerpt: "USDC's proprietary advanced cooling technology sets new industry benchmarks for sustainability in high-density compute environments.",
    tag: "Innovation",
    icon: Zap,
    readTime: "3 min read",
  },
  {
    id: 4,
    category: "CORPORATE",
    date: "April 30, 2025",
    title: "USDC Achieves Tier IV Certification for All North American Data Center Facilities",
    excerpt: "Industry-leading uptime guarantees and fault-tolerant infrastructure design receive highest certification from the Uptime Institute.",
    tag: "Certification",
    icon: Award,
    readTime: "3 min read",
  },
  {
    id: 5,
    category: "PARTNERSHIP",
    date: "April 18, 2025",
    title: "Oracle Cloud Infrastructure Selects USDC as Preferred Colocation Partner for Enterprise AI",
    excerpt: "Multi-year agreement positions USDC as a key enabler of Oracle's distributed cloud strategy for enterprise AI workloads.",
    tag: "Cloud",
    icon: Server,
    readTime: "4 min read",
  },
  {
    id: 6,
    category: "EXPANSION",
    date: "March 25, 2025",
    title: "Groundbreaking Ceremony for USDC's 500MW Hyperscale Campus in Northern Virginia",
    excerpt: "The largest single-phase data center development in the region will serve hyperscale cloud providers and AI-native enterprises.",
    tag: "Construction",
    icon: Building2,
    readTime: "3 min read",
  },
  {
    id: 7,
    category: "TECHNOLOGY",
    date: "March 10, 2025",
    title: "USDC Launches AI-Powered Predictive Maintenance Platform for Data Center Operations",
    excerpt: "Machine learning algorithms analyze thousands of sensor data points in real-time to predict and prevent hardware failures before they impact service.",
    tag: "AI Operations",
    icon: Sparkles,
    readTime: "4 min read",
  },
  {
    id: 8,
    category: "CORPORATE",
    date: "February 22, 2025",
    title: "USDC Reports Record Q4 2024 Revenue, Driven by 300% Growth in AI Compute Demand",
    excerpt: "Strong financial performance reflects surging enterprise demand for GPU-dense infrastructure and colocation services across all regions.",
    tag: "Financial",
    icon: TrendingUp,
    readTime: "5 min read",
  },
];

const categories = ["ALL", "PARTNERSHIP", "EXPANSION", "TECHNOLOGY", "CORPORATE"];

const categoryColors: Record<string, string> = {
  PARTNERSHIP: "#3daeff",
  EXPANSION: "#0091ff",
  TECHNOLOGY: "#58c4ff",
  CORPORATE: "#8ab4f8",
};

/* Mesh gradient background per category */
const categoryMeshes: Record<string, string> = {
  PARTNERSHIP: "radial-gradient(ellipse at 15% 80%, rgba(61,174,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(61,174,255,0.08) 0%, transparent 45%)",
  EXPANSION: "radial-gradient(ellipse at 15% 80%, rgba(0,145,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(0,145,255,0.08) 0%, transparent 45%)",
  TECHNOLOGY: "radial-gradient(ellipse at 15% 80%, rgba(88,196,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(88,196,255,0.08) 0%, transparent 45%)",
  CORPORATE: "radial-gradient(ellipse at 15% 80%, rgba(138,180,248,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(138,180,248,0.08) 0%, transparent 45%)",
};


export default function PressReleaseGrid() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const filtered = pressReleases.filter((pr) => {
    const mc = activeCategory === "ALL" || pr.category === activeCategory;
    const ms = searchQuery === "" || pr.title.toLowerCase().includes(searchQuery.toLowerCase()) || pr.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return mc && ms;
  });

  const featured = filtered.filter((pr) => pr.featured);
  const regular = filtered.filter((pr) => !pr.featured).slice(0, visibleCount);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(26px)",
    transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  /* Renders a single card — featured variant is taller with more prominent layout */
  const renderCard = (pr: PressRelease, idx: number, isFeatured: boolean) => {
    const color = categoryColors[pr.category] || "#3daeff";
    const mesh = categoryMeshes[pr.category] || categoryMeshes.PARTNERSHIP;
    const Icon = pr.icon;

    return (
      <article
        key={pr.id}
        style={fadeUp(140 + idx * 70)}
        className={`group relative rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5 ${
          isFeatured ? "min-h-[380px]" : "min-h-[300px]"
        }`}
      >
        {/* ── Card background ── */}
        <div
          className="absolute inset-0 z-0 transition-all duration-700"
          style={{
            background: `${mesh}, linear-gradient(160deg, rgba(8,15,32,0.96) 0%, rgba(4,8,20,0.99) 100%)`,
          }}
        />

        {/* ── Border ── */}
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none z-[1] transition-all duration-500"
          style={{
            border: `1px solid rgba(255,255,255,0.04)`,
          }}
        />
        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            border: `1px solid ${color}20`,
            boxShadow: `inset 0 0 0 1px ${color}08, 0 0 40px ${color}06`,
          }}
        />

        {/* ── Glass highlight ── */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: "linear-gradient(165deg, rgba(255,255,255,0.03) 0%, transparent 40%)",
          }}
        />

        {/* ── Top accent line ── */}
        <div
          className="absolute top-0 left-[8%] right-[8%] h-[1px] z-[3] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-[5] flex flex-col h-full p-7 sm:p-8">
          {/* Header: Category + Icon */}
          <div className="flex items-start justify-between mb-auto">
            <div className="flex flex-col gap-3">
              <span
                className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full w-fit transition-all duration-300"
                style={{
                  color,
                  background: `${color}0c`,
                  border: `1px solid ${color}15`,
                }}
              >
                <span
                  className="w-[5px] h-[5px] rounded-full"
                  style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                />
                {pr.category}
              </span>

              <div className="flex items-center gap-3 text-[10px] text-white/45 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 opacity-60" />
                  {pr.date}
                </span>
                {pr.readTime && (
                  <>
                    <span className="w-[3px] h-[3px] rounded-full bg-white/10" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 opacity-50" />
                      {pr.readTime}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Icon */}
            <div
              className="flex items-center justify-center w-12 h-12 rounded-2xl border flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
              style={{
                borderColor: `${color}15`,
                background: `linear-gradient(135deg, ${color}0c, ${color}04)`,
                boxShadow: `0 0 20px ${color}06`,
              }}
            >
              <Icon
                className="w-5 h-5 transition-all duration-500"
                style={{ color, filter: `drop-shadow(0 0 4px ${color}30)` }}
              />
            </div>
          </div>

          {/* Body: Title + Excerpt */}
          <div className="mt-6">
            <h3
              className={`font-semibold text-white/90 leading-[1.35] mb-3 group-hover:text-white transition-colors duration-300 ${
                isFeatured
                  ? "text-[20px] sm:text-[22px] md:text-[24px]"
                  : "text-[16px] sm:text-[17px]"
              }`}
            >
              {pr.title}
            </h3>

            <p
              className={`text-white/50 leading-[1.7] group-hover:text-white/70 transition-colors duration-300 ${
                isFeatured
                  ? "text-[13px] line-clamp-3"
                  : "text-[12px] line-clamp-2"
              }`}
            >
              {pr.excerpt}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/[0.04]">
            <span className="text-[9px] font-bold text-white/40 tracking-[0.18em] uppercase">
              {pr.tag}
            </span>

            <span
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.06em] transition-all duration-300 group-hover:gap-3"
              style={{ color: `${color}90` }}
            >
              Read article
              <MoveRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: `${color}70` }}
              />
            </span>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 overflow-hidden"
      style={{ background: "#04070f" }}
    >
      {/* ── Ambient glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "50%", width: "1000px", height: "800px",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(30,100,200,0.035) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-6 md:px-12 lg:px-16">
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-14">
          <div
            style={fadeUp(0)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#3daeff]/15 bg-[#3daeff]/[0.04] backdrop-blur-sm mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#3daeff] shadow-[0_0_6px_rgba(61,174,255,0.6)]" />
            <span className="text-[10px] font-bold text-[#3daeff]/80 tracking-[0.2em] uppercase">
              Latest Updates
            </span>
          </div>

          <h2
            style={fadeUp(80)}
            className="text-[32px] sm:text-[42px] md:text-[50px] font-extralight tracking-[-0.02em] leading-[1.08] text-white mb-4"
          >
            Articles{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6ec8ff] via-[#3daeff] to-[#0091ff]">
              for you
            </span>
          </h2>

          <p style={fadeUp(140)} className="text-[13px] text-white/30 leading-[1.7] max-w-[460px]">
            Explore announcements, partnerships, and technology milestones driving the future of infrastructure.
          </p>
        </div>

        {/* ── Filters ── */}
        <div style={fadeUp(100)} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const c = categoryColors[cat] || "#3daeff";
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(8); }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer border ${
                    active
                      ? "bg-white/[0.06] shadow-[0_0_14px_rgba(61,174,255,0.05)]"
                      : "bg-transparent border-white/[0.05] text-white/28 hover:text-white/50 hover:border-white/10"
                  }`}
                  style={active ? { borderColor: `${c}30`, color: c } : undefined}
                >
                  {cat === "ALL" ? (
                    <span className="flex items-center gap-1.5"><Filter className="w-3 h-3" /> All</span>
                  ) : cat}
                </button>
              );
            })}
          </div>

          <div className="relative max-w-[260px] w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/18" />
            <input
              type="text"
              placeholder="Search releases..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(8); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white/80 text-[11px] placeholder:text-white/18 focus:outline-none focus:border-[#3daeff]/20 focus:bg-white/[0.04] transition-all duration-300"
            />
          </div>
        </div>

        {/* ═══════════════ FEATURED — Bento Hero Row ═══════════════ */}
        {activeCategory === "ALL" && searchQuery === "" && featured.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <span style={fadeUp(100)} className="text-[10px] font-bold text-[#3daeff]/60 tracking-[0.25em] uppercase">
                Featured
              </span>
              <div className="h-px flex-grow bg-gradient-to-r from-[#3daeff]/15 to-transparent" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-14">
              {featured.map((pr, idx) => renderCard(pr, idx, true))}
            </div>
          </>
        )}

        {/* ═══════════════ ARCHIVE — 3-Column Grid ═══════════════ */}
        <div className="flex items-center gap-4 mb-6">
          <span style={fadeUp(200)} className="text-[10px] font-bold text-white/20 tracking-[0.25em] uppercase">
            {activeCategory === "ALL" && searchQuery === "" ? "All Releases" : "Results"}
          </span>
          <div className="h-px flex-grow bg-gradient-to-r from-white/8 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(activeCategory !== "ALL" || searchQuery !== ""
            ? filtered.slice(0, visibleCount)
            : regular
          ).map((pr, idx) => renderCard(pr, idx + 2, false))}
        </div>

        {/* ── Load More ── */}
        {visibleCount < filtered.filter((p) => !p.featured).length && activeCategory === "ALL" && searchQuery === "" && (
          <div style={fadeUp(500)} className="flex justify-center mt-14">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="group flex items-center gap-2.5 px-8 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#3daeff]/18 hover:bg-white/[0.04] text-white/40 hover:text-white text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer"
            >
              Load More
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-5">
              <Search className="w-7 h-7 text-white/10" />
            </div>
            <p className="text-white/30 text-[15px] font-medium mb-1.5">No press releases found</p>
            <p className="text-white/20 text-[12px]">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
}
