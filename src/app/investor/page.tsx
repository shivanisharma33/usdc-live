"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FileText,
  Calendar,
  TrendingUp,
  Newspaper,
  Shield,
  Mail,
  ArrowUpRight,
  Download,
  ChevronRight,
  Clock,
} from "lucide-react";

// Timeframe configuration
interface TimeframeData {
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  high: string;
  low: string;
  volume: string;
  chartPath: string;
}

const timeframeConfig: Record<string, TimeframeData> = {
  "1D": {
    price: "34.82",
    change: "+1.45",
    changePercent: "+4.34%",
    isPositive: true,
    high: "35.10",
    low: "33.20",
    volume: "1.24M",
    chartPath: "M 0 150 Q 50 120, 100 180 T 200 100 T 300 140 T 400 90 T 500 110 T 600 60",
  },
  "1W": {
    price: "35.40",
    change: "+2.03",
    changePercent: "+6.08%",
    isPositive: true,
    high: "36.20",
    low: "32.80",
    volume: "5.82M",
    chartPath: "M 0 160 Q 60 140, 120 130 T 240 150 T 360 100 T 480 80 T 600 50",
  },
  "1M": {
    price: "36.95",
    change: "+3.58",
    changePercent: "+10.73%",
    isPositive: true,
    high: "37.50",
    low: "31.40",
    volume: "24.1M",
    chartPath: "M 0 180 Q 70 170, 140 120 T 280 130 T 420 80 T 560 60 T 600 30",
  },
  "3M": {
    price: "32.10",
    change: "-2.72",
    changePercent: "-7.81%",
    isPositive: false,
    high: "38.20",
    low: "30.15",
    volume: "76.4M",
    chartPath: "M 0 80 Q 70 110, 140 150 T 280 180 T 420 160 T 560 130 T 600 150",
  },
  "6M": {
    price: "38.50",
    change: "+7.65",
    changePercent: "+24.80%",
    isPositive: true,
    high: "40.20",
    low: "28.50",
    volume: "162.8M",
    chartPath: "M 0 190 Q 90 150, 180 130 T 360 90 T 540 60 T 600 20",
  },
  "ALL": {
    price: "42.30",
    change: "+19.80",
    changePercent: "+88.00%",
    isPositive: true,
    high: "44.50",
    low: "18.20",
    volume: "520.4M",
    chartPath: "M 0 200 Q 100 160, 200 120 T 400 80 T 600 10",
  },
};

export default function InvestorPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("1M");
  const [animateChart, setAnimateChart] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // Set static or current formatted date
    const date = new Date();
    setCurrentDate(
      date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  const handleTimeframeChange = (timeframe: string) => {
    setAnimateChart(true);
    setSelectedTimeframe(timeframe);
    setTimeout(() => setAnimateChart(false), 500);
  };

  const activeData = timeframeConfig[selectedTimeframe];

  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden selection:bg-[#3daeff] selection:text-black">
      {/* Navbar component */}
      <Navbar />

      <main className="flex-grow">
        
        {/* ── HERO SECTION ── */}
        <section className="relative min-h-[560px] md:min-h-[680px] flex items-center px-4 sm:px-6 pt-28 pb-20 md:pt-36 border-b border-white/5 overflow-hidden">
          {/* Background Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#3daeff]/[0.06] blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#3daeff]/[0.04] blur-[140px]" />
            
            {/* Subtle grid line overlay */}
            <div 
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
                maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-[860px] mx-auto flex flex-col items-center text-center">
            {/* Center Content: Text copy */}
            <div className="flex flex-col items-center text-center transition-all duration-700">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#3daeff]/30 bg-[#3daeff]/5 backdrop-blur-sm mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] shadow-[0_0_8px_rgba(61,174,255,0.8)] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#3daeff]">
                  Investor Relations
                </span>
              </div>

              {/* Title */}
              <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold uppercase tracking-tighter mb-6 text-white leading-[0.95]">
                Investor{" "}
                <span className="bg-gradient-to-r from-[#3daeff] to-[#0ea5e9] bg-clip-text text-transparent">
                  Center
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-10 max-w-xl">
                Powering the future of enterprise-scale AI infrastructure. Access financial performance reports, corporate governance files, and the latest business developments from USDC Corporation.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/usdc-deck.pdf"
                  target="_blank"
                  className="group inline-flex items-center gap-3 bg-[#3daeff] px-7 py-4 rounded-xl text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_40px_rgba(61,174,255,0.2)] hover:shadow-[0_0_50px_rgba(61,174,255,0.35)]"
                >
                  <span>Latest Presentation</span>
                  <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  href="/sec-filings"
                  className="group inline-flex items-center gap-3 bg-white/[0.03] border border-white/10 px-7 py-4 rounded-xl text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/[0.06] hover:border-white/20 transition-all backdrop-blur-sm"
                >
                  <span>SEC Filings</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ── STOCK PERFORMANCE & CHART SECTION ── */}
        <section className="py-20 lg:py-24 px-4 sm:px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Left & Center: Interactive Stock Chart */}
              <div className="lg:col-span-2 bg-[#080808]/80 border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 flex flex-col backdrop-blur-md">
                
                {/* Header of Chart container */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-semibold uppercase tracking-tight mb-2">
                      Stock Performance
                    </h2>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-medium">
                      Real-time market tracking (NASDAQ: USDC)
                    </p>
                  </div>
                  
                  {/* Timeframe selector tabs */}
                  <div className="flex flex-wrap justify-center gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/5">
                    {["1D", "1W", "1M", "3M", "6M", "ALL"].map((timeframe) => {
                      const isActive = selectedTimeframe === timeframe;
                      return (
                        <button
                          key={timeframe}
                          onClick={() => handleTimeframeChange(timeframe)}
                          className={`px-4 py-1.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#3daeff] text-black shadow-lg shadow-[#3daeff]/20"
                              : "text-white/40 hover:text-white"
                          }`}
                        >
                          {timeframe}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Animated Chart Canvas (SVG mockup) */}
                <div className="flex-1 min-h-[350px] w-full bg-white/[0.01] border border-white/5 rounded-2xl relative overflow-hidden p-6 flex flex-col justify-end">
                  {/* Subtle Grid backdrop inside chart */}
                  <div className="absolute inset-0 grid grid-rows-5 grid-cols-6 pointer-events-none opacity-5">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div key={i} className="border-t border-l border-white" />
                    ))}
                  </div>

                  {/* SVG Chart Graphic */}
                  <div className="absolute inset-x-6 top-12 bottom-12">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 200">
                      {/* Gradient fill underneath the stock line */}
                      <defs>
                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3daeff" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#3daeff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Area pathway */}
                      <path
                        d={`${activeData.chartPath} L 600 200 L 0 200 Z`}
                        fill="url(#chartGlow)"
                        className={`transition-all duration-500 ease-in-out ${
                          animateChart ? "opacity-30 scale-y-95 origin-bottom" : "opacity-100"
                        }`}
                      />

                      {/* Line pathway */}
                      <path
                        d={activeData.chartPath}
                        fill="none"
                        stroke={activeData.isPositive ? "#00e878" : "#ff4a4a"}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        className={`transition-all duration-500 ease-in-out ${
                          animateChart ? "opacity-40 scale-y-95 origin-bottom" : "opacity-100"
                        }`}
                      />

                      {/* Glowing Endpoint marker */}
                      <circle
                        cx="600"
                        cy={activeData.chartPath.slice(-2)}
                        r="5"
                        fill={activeData.isPositive ? "#00e878" : "#ff4a4a"}
                        className={`animate-ping ${animateChart ? "opacity-0" : "opacity-100"}`}
                      />
                    </svg>
                  </div>

                  {/* Legend labels */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] text-white/20 border-t border-white/5 pt-4 mt-auto">
                    <span>Performance data is mock historical tracking.</span>
                    <span>Source: Market Center</span>
                  </div>
                </div>

              </div>

              {/* Right: Stock Price and News Card Column */}
              <div className="space-y-6">
                
                {/* Nasdaq Ticker details */}
                <div className="bg-[#080808]/80 border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[280px] backdrop-blur-md">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[12px] font-black uppercase tracking-[0.12em] text-white/30 mb-2">
                          Nasdaq: USDC
                        </div>
                        {/* Interactive price loader */}
                        <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2 font-sans flex items-baseline gap-1">
                          <span>${activeData.price}</span>
                          <span className="text-[10px] text-white/30 font-medium font-sans">USD</span>
                        </div>
                      </div>

                      <div className="text-right text-[10px] text-white/30">
                        <div className="mb-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                          {currentDate || "LIVE"}
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                          <Clock className="w-3 h-3 text-white/30" />
                          <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">
                            Delayed 15m
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stock Metrics summary */}
                    <div className="mt-6 grid grid-cols-2 gap-4 text-sm border-t border-white/5 pt-5">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          Change
                        </div>
                        <div className={`font-bold font-sans ${activeData.isPositive ? "text-[#00e878]" : "text-[#ff4a4a]"}`}>
                          {activeData.change}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          Change %
                        </div>
                        <div className={`font-bold font-sans ${activeData.isPositive ? "text-[#00e878]" : "text-[#ff4a4a]"}`}>
                          {activeData.changePercent}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          Volume
                        </div>
                        <div className="text-white font-semibold font-sans">{activeData.volume}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          Open
                        </div>
                        <div className="text-white font-semibold font-sans">$33.37</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          Today&apos;s High
                        </div>
                        <div className="text-white font-semibold font-sans">${activeData.high}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          Today&apos;s Low
                        </div>
                        <div className="text-white font-semibold font-sans">${activeData.low}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 text-xs text-white/30">
                    <div className="flex items-center justify-between">
                      <div>
                        Market Cap: <span className="text-white font-semibold">$14.2B</span>
                      </div>
                      <div>
                        Avg Vol: <span className="text-white font-semibold">980.5K</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Latest Press Announcements Feed */}
                <div className="bg-[#080808]/80 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md">
                  <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-6 pb-3 border-b border-white/5 text-center lg:text-left">
                    Latest Announcements
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="block text-center lg:text-left space-y-1 group">
                      <div className="text-[9px] font-semibold text-[#3daeff] tracking-widest uppercase">
                        June 18, 2026
                      </div>
                      <Link 
                        href="/press-release" 
                        className="block text-sm font-semibold text-white/80 hover:text-[#3daeff] transition-colors leading-snug"
                      >
                        USDC Announces Strong Q1 2026 Financial Performance Reports
                      </Link>
                    </div>

                    <div className="block text-center lg:text-left space-y-1 group">
                      <div className="text-[9px] font-semibold text-[#3daeff] tracking-widest uppercase">
                        June 02, 2026
                      </div>
                      <Link 
                        href="/press-release" 
                        className="block text-sm font-semibold text-white/80 hover:text-[#3daeff] transition-colors leading-snug"
                      >
                        USDC Acquires Prime Real Estate in Northern Virginia for 20MW Campus Expansion
                      </Link>
                    </div>

                    <div className="block text-center lg:text-left space-y-1 group">
                      <div className="text-[9px] font-semibold text-[#3daeff] tracking-widest uppercase">
                        May 14, 2026
                      </div>
                      <Link 
                        href="/press-release" 
                        className="block text-sm font-semibold text-white/80 hover:text-[#3daeff] transition-colors leading-snug"
                      >
                        USDC and Partners Deploy Hydro-Power Liquid Cooling System to ARMS Infrastructure
                      </Link>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <Link
                      href="/press-release"
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <span>View All Announcements</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ── INVESTOR RESOURCES SECTION ── */}
        <section className="py-20 lg:py-24 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            
            {/* Section Title */}
            <div className="mb-12 lg:mb-16 flex flex-col items-center sm:items-start text-center sm:text-left">
              <h2 className="text-3xl font-semibold uppercase tracking-tighter mb-4">
                Investor Resources
              </h2>
              <div className="h-[2px] w-12 bg-[#3daeff] rounded-full" />
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Card 1: SEC Filings */}
              <Link
                href="/sec-filings"
                className="group relative bg-[#0a0a0a]/60 border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#3daeff]/35 transition-all duration-500 block text-center sm:text-left flex flex-col items-center sm:items-start backdrop-blur-sm"
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-[#3daeff] group-hover:bg-[#3daeff]/10 transition-all mx-auto sm:mx-0 mb-6">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-tight">
                    SEC Filings
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    Access financial statements, quarterly reports, and compliance files.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3daeff] hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

              {/* Card 2: Events & Presentations */}
              <Link
                href="/investor"
                className="group relative bg-[#0a0a0a]/60 border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#3daeff]/35 transition-all duration-500 block text-center sm:text-left flex flex-col items-center sm:items-start backdrop-blur-sm"
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-[#3daeff] group-hover:bg-[#3daeff]/10 transition-all mx-auto sm:mx-0 mb-6">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-tight">
                    Events &amp; Presentations
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    View upcoming earnings webcasts and past investor presentations.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3daeff] hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

              {/* Card 3: Stock Information */}
              <Link
                href="/investor"
                className="group relative bg-[#0a0a0a]/60 border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#3daeff]/35 transition-all duration-500 block text-center sm:text-left flex flex-col items-center sm:items-start backdrop-blur-sm"
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-[#3daeff] group-hover:bg-[#3daeff]/10 transition-all mx-auto sm:mx-0 mb-6">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-tight">
                    Stock Information
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    Detailed historical performance and real-time market pricing metrics.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3daeff] hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

              {/* Card 4: Press Releases */}
              <Link
                href="/press-release"
                className="group relative bg-[#0a0a0a]/60 border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#3daeff]/35 transition-all duration-500 block text-center sm:text-left flex flex-col items-center sm:items-start backdrop-blur-sm"
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-[#3daeff] group-hover:bg-[#3daeff]/10 transition-all mx-auto sm:mx-0 mb-6">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-tight">
                    Press Releases
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    Read the latest press distributions and statements from USDC.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3daeff] hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

              {/* Card 5: Governance */}
              <Link
                href="/management-team"
                className="group relative bg-[#0a0a0a]/60 border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#3daeff]/35 transition-all duration-500 block text-center sm:text-left flex flex-col items-center sm:items-start backdrop-blur-sm"
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-[#3daeff] group-hover:bg-[#3daeff]/10 transition-all mx-auto sm:mx-0 mb-6">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-tight">
                    Governance
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    View documents and leadership structure behind corporate oversight.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3daeff] hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

              {/* Card 6: Contact IR */}
              <Link
                href="/contact"
                className="group relative bg-[#0a0a0a]/60 border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#3daeff]/35 transition-all duration-500 block text-center sm:text-left flex flex-col items-center sm:items-start backdrop-blur-sm"
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-[#3daeff] group-hover:bg-[#3daeff]/10 transition-all mx-auto sm:mx-0 mb-6">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-tight">
                    Contact IR
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    Connect with our dedicated investor relations support channels.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3daeff] hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

            </div>

          </div>
        </section>

      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
