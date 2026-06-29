"use client";

import React, { useEffect, useRef, useState } from "react";

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  Icon: React.ComponentType;
}

// 2023 Site Acquisition Icon
const Icon2023 = () => (
  <svg className="w-12 h-12 text-[#3daeff]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M 30,80 L 45,20 L 55,20 L 70,80" />
    <path d="M 40,40 L 60,40" />
    <path d="M 35,60 L 65,60" />
    <path d="M 30,80 L 70,80" />
    <path d="M 45,20 L 35,30 M 55,20 L 65,30" />
    <path d="M 40,40 L 48,20 M 60,40 L 52,20" />
    <path d="M 35,60 L 45,40 M 65,60 L 55,40" />
    <rect x="58" y="55" width="24" height="25" rx="3" fill="#02050c" />
    <path d="M 70,60 L 66,68 L 74,68 L 70,75" stroke="#3daeff" fill="none" strokeWidth="1.2" className="timeline-bolt" />
  </svg>
);

// 2024 Infrastructure Design Icon
const Icon2024 = () => (
  <svg className="w-12 h-12 text-[#3daeff]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="25" y="35" width="50" height="40" rx="4" fill="#02050c" />
    <path d="M 35,35 L 35,20 M 50,35 L 50,20 M 65,35 L 65,20" />
    <circle cx="35" cy="18" r="2" fill="#3daeff" className="timeline-term-1" />
    <circle cx="50" cy="18" r="2" fill="#3daeff" className="timeline-term-2" />
    <circle cx="65" cy="18" r="2" fill="#3daeff" className="timeline-term-3" />
    <line x1="30" y1="45" x2="70" y2="45" stroke="#3daeff" opacity="0.4" />
    <line x1="30" y1="52" x2="70" y2="52" stroke="#3daeff" opacity="0.4" />
    <line x1="30" y1="59" x2="70" y2="59" stroke="#3daeff" opacity="0.4" />
    <line x1="30" y1="66" x2="70" y2="66" stroke="#3daeff" opacity="0.4" />
    <path d="M 50,45 L 47,52 L 53,52 L 50,59" stroke="#3daeff" fill="none" strokeWidth="1.2" className="timeline-bolt" />
  </svg>
);

// 2025 AI Expansion Icon
const Icon2025 = () => (
  <svg className="w-12 h-12 text-[#3daeff]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M 20,40 L 50,25 L 80,40 L 50,55 Z" fill="#02050c" />
    <path d="M 20,40 L 20,70 L 50,85 L 50,55 Z" fill="#02050c" />
    <path d="M 80,40 L 80,70 L 50,85 L 50,55 Z" fill="#02050c" />
    <text x="52" y="70" fill="#3daeff" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" transform="skewY(18)" className="timeline-bolt">ARMS 200</text>
    <line x1="25" y1="44" x2="25" y2="72" stroke="#3daeff" opacity="0.3" className="timeline-rib" style={{ animationDelay: "0s" }} />
    <line x1="30" y1="47" x2="30" y2="75" stroke="#3daeff" opacity="0.3" className="timeline-rib" style={{ animationDelay: "0.2s" }} />
    <line x1="35" y1="50" x2="35" y2="78" stroke="#3daeff" opacity="0.3" className="timeline-rib" style={{ animationDelay: "0.4s" }} />
    <line x1="40" y1="53" x2="40" y2="81" stroke="#3daeff" opacity="0.3" className="timeline-rib" style={{ animationDelay: "0.6s" }} />
    <line x1="45" y1="56" x2="45" y2="84" stroke="#3daeff" opacity="0.3" className="timeline-rib" style={{ animationDelay: "0.8s" }} />
  </svg>
);

// 2026 Operational Deployment Icon
const Icon2026 = () => (
  <svg className="w-12 h-12 text-[#3daeff]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="20" y="25" width="16" height="50" rx="2" fill="#02050c" />
    <rect x="42" y="25" width="16" height="50" rx="2" fill="#02050c" />
    <rect x="64" y="25" width="16" height="50" rx="2" fill="#02050c" />
    {[0, 1, 2, 3].map(i => {
      const cls = i % 3 === 0 ? "timeline-led-a" : i % 3 === 1 ? "timeline-led-b" : "timeline-led-c";
      return (
        <g key={i}>
          <line x1="23" y1={30 + i * 10} x2="33" y2={30 + i * 10} stroke="#3daeff" strokeWidth="1" opacity="0.5" />
          <circle cx="34" cy={30 + i * 10} r="0.7" fill="#3daeff" className={cls} />
          <line x1="45" y1={30 + i * 10} x2="55" y2={30 + i * 10} stroke="#3daeff" strokeWidth="1" opacity="0.5" />
          <circle cx="56" cy={30 + i * 10} r="0.7" fill="#3daeff" className={cls} style={{ animationDelay: "-0.3s" }} />
          <line x1="67" y1={30 + i * 10} x2="77" y2={30 + i * 10} stroke="#3daeff" strokeWidth="1" opacity="0.5" />
          <circle cx="78" cy={30 + i * 10} r="0.7" fill="#3daeff" className={cls} style={{ animationDelay: "-0.6s" }} />
        </g>
      );
    })}
  </svg>
);

// +2030 Capacity Expansion Icon
const Icon2030 = () => (
  <svg className="w-12 h-12 text-[#3daeff]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="50" cy="50" r="28" fill="#02050c" />
    <ellipse cx="50" cy="50" rx="28" ry="10" className="timeline-globe-ellipse" />
    <ellipse cx="50" cy="50" rx="10" ry="28" className="timeline-globe-ellipse" style={{ animationDelay: "-1.5s" }} />
    <g className="timeline-globe-nodes">
      <circle cx="50" cy="22" r="2" fill="#3daeff" />
      <circle cx="50" cy="78" r="2" fill="#3daeff" />
      <circle cx="22" cy="50" r="2" fill="#3daeff" />
      <circle cx="78" cy="50" r="2" fill="#3daeff" />
      <circle cx="32" cy="32" r="2" fill="#3daeff" />
      <circle cx="68" cy="68" r="2" fill="#3daeff" />
    </g>
  </svg>
);

const timelineData: TimelineItem[] = [
  {
    year: "2023",
    title: "SITE ACQUISITION",
    desc: "Identified key energy assets with long-term power potential and strategic infrastructure reach.",
    Icon: Icon2023
  },
  {
    year: "2024",
    title: "INFRASTRUCTURE DESIGN",
    desc: "Designed utility infrastructure and integrated Tier III standard architecture.",
    Icon: Icon2024
  },
  {
    year: "2025",
    title: "AI EXPANSION",
    desc: "Deployed ARMS 200 platform and enabled GPU-ready compute environments.",
    Icon: Icon2025
  },
  {
    year: "2026",
    title: "OPERATIONAL DEPLOYMENT",
    desc: "Scaled infrastructure capacity and onboarded enterprise AI workloads.",
    Icon: Icon2026
  },
  {
    year: "+2030",
    title: "300MW+ POTENTIAL CAPACITY",
    desc: "Expanding multi-site infrastructure network to support next-wave AI growth.",
    Icon: Icon2030
  }
];

export default function AboutJourneySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Track the highest index card that has been scrolled into view
  const [maxIndexReached, setMaxIndexReached] = useState(0);
  // Track percentage height to animate glowing line
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dash line segments grow based on the revealed cards
  const bgLineHeights = ["32px", "25%", "50%", "75%", "100%"];
  const currentBgLineHeight = bgLineHeights[maxIndexReached];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress percentage through the container
      const totalHeight = rect.height - windowHeight + 200;
      const scrolled = -rect.top;
      let progress = scrolled / totalHeight;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      // Determine active index based on thresholds
      let activeIndex = 0;
      if (progress >= 0.75) activeIndex = 4;
      else if (progress >= 0.55) activeIndex = 3;
      else if (progress >= 0.35) activeIndex = 2;
      else if (progress >= 0.15) activeIndex = 1;

      setMaxIndexReached((prev) => Math.max(prev, activeIndex));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#04070f] py-24 md:py-36 text-white select-none relative overflow-hidden border-t border-white/[0.03]">
      {/* Dynamic Keyframe Animations for Blueprint Icons */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes timelineBoltPulse {
            0%, 100% { opacity: 0.45; }
            50% { opacity: 1; filter: drop-shadow(0 0 3px #3daeff); }
          }
          .timeline-bolt {
            animation: timelineBoltPulse 2s ease-in-out infinite;
          }

          @keyframes timelineTerminalPulse {
            0%, 100% { fill-opacity: 0.35; }
            50% { fill-opacity: 1; fill: #5cc4ff; filter: drop-shadow(0 0 3px #3daeff); }
          }
          .timeline-term-1 { animation: timelineTerminalPulse 1.8s ease-in-out infinite; }
          .timeline-term-2 { animation: timelineTerminalPulse 1.8s ease-in-out -0.6s infinite; }
          .timeline-term-3 { animation: timelineTerminalPulse 1.8s ease-in-out -1.2s infinite; }

          @keyframes timelineRibShimmer {
            0%, 100% { stroke-opacity: 0.25; }
            50% { stroke-opacity: 0.85; stroke: #5cc4ff; }
          }
          .timeline-rib {
            animation: timelineRibShimmer 2.8s ease-in-out infinite;
          }

          @keyframes timelineServerLed {
            0%, 100% { fill-opacity: 0.25; }
            50% { fill-opacity: 1; fill: #5cc4ff; }
          }
          .timeline-led-a { animation: timelineServerLed 1.4s ease-in-out infinite; }
          .timeline-led-b { animation: timelineServerLed 1.4s ease-in-out -0.45s infinite; }
          .timeline-led-c { animation: timelineServerLed 1.4s ease-in-out -0.9s infinite; }

          @keyframes timelineGlobePulse {
            0%, 100% { stroke-opacity: 0.4; }
            50% { stroke-opacity: 0.9; stroke: #3daeff; }
          }
          .timeline-globe-ellipse {
            animation: timelineGlobePulse 4s ease-in-out infinite;
          }
          @keyframes rotateNodes {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .timeline-globe-nodes {
            transform-origin: 50px 50px;
            animation: rotateNodes 24s linear infinite;
          }
        `
      }} />

      {/* Background glowing halo */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/[0.02] rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-sky-500/[0.02] rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* LEFT COLUMN: Sticky heading & description */}
        <div className="lg:col-span-5 lg:sticky lg:top-36 lg:h-[fit-content] flex flex-col items-start pr-0 lg:pr-8 mb-8 lg:mb-0">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.25em] uppercase font-sans">
              OUR JOURNEY
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.1] text-white mb-6 font-sans">
            From Energy Assets To <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] to-[#0091ff] drop-shadow-[0_4px_18px_rgba(61,174,255,0.25)] select-none">
              AI Infrastructure
            </span>
          </h2>

          {/* Description */}
          <p className="text-[14.5px] md:text-[15.5px] text-white/60 leading-[1.75] max-w-[480px] font-sans font-normal">
            USDC identifies and transforms underutilized energy assets into enterprise-grade AI infrastructure. By combining power, cooling, networking, and compute, we accelerate deployment timelines from years to months.
          </p>
        </div>

        {/* RIGHT COLUMN: Interactive scrolling timeline */}
        <div className="lg:col-span-7 relative pl-8 sm:pl-10 md:pl-12 lg:pl-10">
          
          {/* Background dashed timeline line (only visible up to the maximum revealed card segment) */}
          <div 
            className="absolute left-4 sm:left-6 md:left-8 lg:left-6 top-4 w-[2px] border-l-2 border-dashed border-white/10 pointer-events-none z-0 transition-all duration-700 ease-out"
            style={{ height: currentBgLineHeight }}
          />

          {/* Active solid glowing scroll progress line (grows smoothly with scroll progress) */}
          <div className="absolute left-4 sm:left-6 md:left-8 lg:left-6 top-4 bottom-4 w-[2px] pointer-events-none z-0">
            <div 
              className="absolute top-0 -left-[2px] w-[2px] bg-gradient-to-b from-[#3daeff] via-[#0091ff] to-blue-500 rounded-full transition-all duration-300 shadow-[0_0_8px_#3daeff]"
              style={{ height: `${Math.max(7, scrollProgress * 100)}%` }}
            />
          </div>

          {/* Timeline Cards Stack */}
          <div className="flex flex-col gap-12 relative z-10">
            {timelineData.map((item, idx) => {
              const Icon = item.Icon;
              
              // Only active card is highlighted
              let isActive = false;
              if (idx === 0) isActive = scrollProgress < 0.15;
              else if (idx === 1) isActive = scrollProgress >= 0.15 && scrollProgress < 0.35;
              else if (idx === 2) isActive = scrollProgress >= 0.35 && scrollProgress < 0.55;
              else if (idx === 3) isActive = scrollProgress >= 0.55 && scrollProgress < 0.75;
              else if (idx === 4) isActive = scrollProgress >= 0.75;

              const isVisible = idx <= maxIndexReached;

              return (
                <div 
                  key={idx}
                  className={`flex items-center gap-4 sm:gap-6 md:gap-8 transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
                  }`}
                >
                  {/* Left Side: Year */}
                  <div className="w-12 sm:w-14 md:w-16 lg:w-14 text-left flex-shrink-0 relative">
                    <span 
                      className={`text-sm md:text-base font-extrabold tracking-tight font-sans transition-colors duration-500 ${
                        isActive ? "text-[#3daeff] drop-shadow-[0_0_6px_rgba(61,174,255,0.4)]" : "text-white/35"
                      }`}
                    >
                      {item.year}
                    </span>

                    {/* Timeline Dot on top of the vertical line */}
                    <div 
                      className={`absolute -left-[22px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border bg-[#02050c] transition-all duration-500 z-20 ${
                        isActive 
                          ? "border-[#3daeff] scale-125 shadow-[0_0_12px_#3daeff]" 
                          : "border-white/20"
                      }`}
                    >
                      {/* Glowing outer core */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-[#3daeff]/20 animate-ping pointer-events-none" />
                      )}
                    </div>
                  </div>

                  {/* Right Side: Premium Milestone Card */}
                  <div 
                    className={`flex-1 flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border bg-[#02050c]/25 backdrop-blur-md transition-all duration-700 hover:-translate-y-1 relative overflow-hidden ${
                      isActive 
                        ? "border-[#0091ff]/35 shadow-[0_6px_30px_rgba(0,145,255,0.08)] bg-[#02050c]/40 scale-[1.01]" 
                        : "border-white/[0.06] hover:border-white/20"
                    }`}
                  >
                    {/* Glowing highlight in active card */}
                    <div 
                      className={`absolute -left-12 -top-12 w-28 h-28 rounded-full bg-[#3daeff]/[0.08] blur-[30px] pointer-events-none transition-opacity duration-700 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Card Icon */}
                    <div 
                      className={`w-16 h-16 rounded-xl border flex items-center justify-center flex-shrink-0 bg-white/[0.02] transition-colors duration-500 relative z-10 ${
                        isActive ? "border-[#3daeff]/35 bg-[#3daeff]/5 text-[#3daeff]" : "border-white/10"
                      }`}
                    >
                      <Icon />
                    </div>

                    {/* Card Text Content */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left relative z-10">
                      <h3 
                        className={`text-[12px] md:text-[13px] font-bold tracking-[0.15em] uppercase font-sans mb-2 transition-colors duration-500 ${
                          isActive ? "text-[#3daeff]" : "text-white"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-[11.5px] md:text-[12.5px] text-white/45 leading-[1.65] font-sans font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
