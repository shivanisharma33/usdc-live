"use client";

import React, { useState } from "react";
import { Gauge, Zap, ShieldCheck, BarChart3, Lock, Link, Layers } from "lucide-react";

type TabType = "speed" | "scale" | "sovereignty";

export default function SpeedScaleSovereignty() {
  const [activeTab, setActiveTab] = useState<TabType>("speed");
  const [sliderVal, setSliderVal] = useState<number>(52.6768); // Yields exactly 1.16 Megawatts initially

  // Left column content configuration
  const tabData = {
    speed: {
      heading: (
        <>
          Engineered for
          <span className="block text-white">performance.</span>
          <span className="block text-white">Built for efficiency.</span>
        </>
      ),
      description:
        "Purpose-built infrastructure and optimized design deliver faster time-to-online and lower total cost of ownership.",
    },
    scale: {
      heading: (
        <>
          Deploy at the
          <span className="block text-white">scale you</span>
          <span className="block text-white">need, today.</span>
        </>
      ),
      description:
        "Right-size your deployment to match your current workloads—with the ability to scale seamlessly as your AI demands grow.",
    },
    sovereignty: {
      heading: (
        <>
          Total control,
          <span className="block text-white">wherever you</span>
          <span className="block text-white">operate.</span>
        </>
      ),
      description:
        "Keep your data, workloads, and operations under your control. USDC infrastructure is built for data sovereignty and compliance at every layer.",
    },
  };

  // Logarithmic-like piecewise mapping for the slider:
  // 0%   -> 300 W (0.3 kW)
  // 25%  -> 1 kW
  // 50%  -> 100 kW
  // 75%  -> 10 MW (10000 kW)
  // 100% -> 50 MW (50000 kW)
  const getPowerKw = (val: number): number => {
    if (val <= 25) {
      const pct = val / 25;
      return 0.3 + pct * (1.0 - 0.3);
    } else if (val <= 50) {
      const pct = (val - 25) / 25;
      return 1.0 + pct * (100.0 - 1.0);
    } else if (val <= 75) {
      const pct = (val - 50) / 25;
      return 100.0 + pct * (10000.0 - 100.0);
    } else {
      const pct = (val - 75) / 25;
      return 10000.0 + pct * (50000.0 - 10000.0);
    }
  };

  const powerKw = getPowerKw(sliderVal);

  // Formatting output power values
  const getFormattedPower = (kW: number) => {
    if (kW < 1) {
      return { value: (kW * 1000).toFixed(0), unit: "Watts" };
    } else if (kW < 1000) {
      return { value: kW.toFixed(0), unit: "Kilowatts" };
    } else {
      return { value: (kW / 1000).toFixed(2), unit: "Megawatts" };
    }
  };

  const formattedPower = getFormattedPower(powerKw);

  // Dynamic configuration metrics
  const cruiserCount = Math.round(powerKw / 60);
  const tritonCount = Math.round(powerKw / 90);
  const leviathanCount = Math.round(powerKw / 1000);

  // Ordering of cubes to activate as capacity increases (center outwards)
  const nodeOrder = [
    { c: 1, r: 1 },
    { c: 2, r: 1 },
    { c: 1, r: 0 },
    { c: 2, r: 0 },
    { c: 1, r: 2 },
    { c: 2, r: 2 },
    { c: 0, r: 1 },
    { c: 3, r: 1 },
    { c: 0, r: 0 },
    { c: 3, r: 0 },
    { c: 0, r: 2 },
    { c: 3, r: 2 },
  ];

  // Map slider value (0-100) to 1-12 active nodes
  const activeNodesCount = Math.max(1, Math.ceil((sliderVal / 100) * 12));

  // Isometric projection params
  const x0 = 200;
  const y0 = 90;
  const dx = 42;
  const dy = 20;

  // Render a 3D isometric cube
  const renderCube = (c: number, r: number, isActive: boolean, hasRadar = false) => {
    const cx = x0 + (c - r) * dx;
    const cy = y0 + (c + r) * dy;

    // Cube height and width
    const h = 18;
    const w = 18;

    // Color definitions
    const topColor = isActive ? "#52b6ff" : "#e2e8f0";
    const leftColor = isActive ? "#0084ff" : "#94a3b8";
    const rightColor = isActive ? "#0052cc" : "#64748b";
    const opacity = isActive ? 1.0 : 0.45;

    return (
      <g key={`cube-${c}-${r}`} className="transition-all duration-500">
        {/* Glow effect at the base of active nodes */}
        {isActive && (
          <ellipse
            cx={cx}
            cy={cy + 4}
            rx={20}
            ry={10}
            fill="url(#blue-glow-gradient)"
            opacity="0.6"
          />
        )}

        {/* Radar Rings on central node for Sovereignty Tab */}
        {hasRadar && (
          <>
            <ellipse
              cx={cx}
              cy={cy + 4}
              rx={20}
              ry={10}
              fill="none"
              stroke="#3daeff"
              strokeWidth="1.5"
            >
              <animate attributeName="rx" values="12;60;110" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="ry" values="6;30;55" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.9;0.35;0" dur="3.5s" repeatCount="indefinite" />
            </ellipse>
            <ellipse
              cx={cx}
              cy={cy + 4}
              rx={20}
              ry={10}
              fill="none"
              stroke="#3daeff"
              strokeWidth="1.5"
            >
              <animate attributeName="rx" values="12;60;110" dur="3.5s" begin="1.75s" repeatCount="indefinite" />
              <animate attributeName="ry" values="6;30;55" dur="3.5s" begin="1.75s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.9;0.35;0" dur="3.5s" begin="1.75s" repeatCount="indefinite" />
            </ellipse>
          </>
        )}

        {/* Left Face */}
        <polygon
          points={`${cx - w},${cy} ${cx},${cy + 8} ${cx},${cy - h + 8} ${cx - w},${cy - h}`}
          fill={leftColor}
          opacity={opacity}
          className="transition-colors duration-500"
        />

        {/* Right Face */}
        <polygon
          points={`${cx},${cy + 8} ${cx + w},${cy} ${cx + w},${cy - h} ${cx},${cy - h + 8}`}
          fill={rightColor}
          opacity={opacity}
          className="transition-colors duration-500"
        />

        {/* Top Face */}
        <polygon
          points={`${cx},${cy - h + 8} ${cx + w},${cy - h} ${cx},${cy - h - 8} ${cx - w},${cy - h}`}
          fill={topColor}
          opacity={opacity}
          className="transition-colors duration-500"
        />
      </g>
    );
  };

  return (
    <section className="w-full relative overflow-hidden bg-[#04070f] px-4 py-12 md:py-16">
      {/* Centered Rounded Container Card matching the design image */}
      <div
        className="w-full max-w-[1280px] mx-auto bg-[#03060d] rounded-[24px] overflow-hidden p-8 sm:p-10 md:p-12 lg:p-16 relative"
        style={{
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-8 lg:gap-12 xl:gap-16 items-start">

          {/* ═══ Left Column: Static Layout Structure (Content varies by activeTab) ═══ */}
          <div className="flex flex-col justify-between min-h-[280px] lg:min-h-[320px]">
            <div>
              {/* Tab-specific Heading */}
              <h2 className="text-[32px] sm:text-[36px] md:text-[38px] lg:text-[40px] font-extrabold tracking-[-0.02em] leading-[1.1] text-white">
                {tabData[activeTab].heading}
              </h2>

              {/* Tab Trigger Buttons */}
              <div className="flex items-center gap-6 mt-8 mb-6 border-b border-white/[0.08] pb-3">
                {(["speed", "scale", "sovereignty"] as TabType[]).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative text-[14px] sm:text-[15px] font-bold tracking-[0.06em] uppercase transition-all duration-300 pb-3 cursor-pointer ${isActive ? "text-white" : "text-white/35 hover:text-white/60"
                        }`}
                    >
                      {tab}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3daeff] rounded-full animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab-specific Description */}
            <p className="text-[13.5px] sm:text-[14.5px] text-white/50 leading-[1.7] font-normal max-w-[340px]">
              {tabData[activeTab].description}
            </p>
          </div>

          {/* ═══ Right Column: Dynamic View Panels ═══ */}
          <div className="w-full flex items-center justify-center">

            {/* ── SPEED TAB VIEW ── */}
            {activeTab === "speed" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-y-0 w-full">

                {/* Stat 1: 10x */}
                <div className="flex flex-col items-start pb-6 border-b border-white/[0.08] sm:pr-6 sm:border-r sm:border-b sm:border-white/[0.08] sm:pb-6 lg:pb-0 lg:border-b-0 lg:pr-6 xl:pr-8 lg:border-r lg:border-white/[0.08]">
                  <div className="w-[44px] h-[44px] rounded-full border border-[#3daeff]/35 flex items-center justify-center mb-4 text-[#3daeff]">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <span className="text-[28px] sm:text-[32px] lg:text-[24px] xl:text-[30px] font-extrabold text-[#3daeff] leading-none mb-3">
                    10x
                  </span>
                  <span className="text-[13px] font-bold text-white leading-tight mb-2 min-h-[36px] block">
                    Faster Deployment
                  </span>
                  <p className="text-[12px] text-white/50 leading-[1.6]">
                    Modular ARMS 200 pods enable delivery in weeks, not years—getting you to compute faster.
                  </p>
                </div>

                {/* Stat 2: ~$0.04/kWh */}
                <div className="flex flex-col items-start py-6 border-b border-white/[0.08] sm:pt-0 sm:pl-6 sm:border-b sm:border-white/[0.08] sm:pb-6 lg:py-0 lg:border-b-0 lg:px-6 lg:pl-6 xl:px-8 xl:pl-8 lg:border-r lg:border-white/[0.08]">
                  <div className="w-[44px] h-[44px] rounded-full border border-[#3daeff]/35 flex items-center justify-center mb-4 text-[#3daeff]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[28px] sm:text-[32px] lg:text-[24px] xl:text-[30px] font-extrabold text-[#3daeff] leading-none mb-3">
                    ~$0.04<span className="text-[14px] sm:text-[16px] lg:text-[12px] xl:text-[15px] font-bold text-[#3daeff]">/kWh</span>
                  </span>
                  <span className="text-[13px] font-bold text-white leading-tight mb-2 min-h-[36px] block">
                    Lower Operating Cost
                  </span>
                  <p className="text-[12px] text-white/50 leading-[1.6]">
                    Access to low-cost power and efficient infrastructure drives industry-leading economics.
                  </p>
                </div>

                {/* Stat 3: 2N */}
                <div className="flex flex-col items-start py-6 border-b border-white/[0.08] sm:pt-6 sm:pr-6 sm:border-r sm:border-white/[0.08] sm:border-b-0 sm:pb-0 lg:py-0 lg:px-6 lg:pl-6 xl:px-8 xl:pl-8 lg:border-r lg:border-white/[0.08]">
                  <div className="w-[44px] h-[44px] rounded-full border border-[#3daeff]/35 flex items-center justify-center mb-4 text-[#3daeff]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[28px] sm:text-[32px] lg:text-[24px] xl:text-[30px] font-extrabold text-[#3daeff] leading-none mb-3">
                    2N
                  </span>
                  <span className="text-[13px] font-bold text-white leading-tight mb-2 min-h-[36px] block">
                    Enterprise Reliability
                  </span>
                  <p className="text-[12px] text-white/50 leading-[1.6]">
                    Redundant power, cooling, and network architecture delivers Tier III uptime and resilience.
                  </p>
                </div>

                {/* Stat 4: 400MW+ */}
                <div className="flex flex-col items-start pt-6 sm:pt-6 sm:pl-6 lg:pt-0 lg:pl-6 xl:pl-8">
                  <div className="w-[44px] h-[44px] rounded-full border border-[#3daeff]/35 flex items-center justify-center mb-4 text-[#3daeff]">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-[28px] sm:text-[32px] lg:text-[24px] xl:text-[30px] font-extrabold text-[#3daeff] leading-none mb-3">
                    400MW+
                  </span>
                  <span className="text-[13px] font-bold text-white leading-tight mb-2 min-h-[36px] block">
                    Scalable Capacity
                  </span>
                  <p className="text-[12px] text-white/50 leading-[1.6]">
                    Existing and planned capacity pipeline supports long-term growth and expansion.
                  </p>
                </div>

              </div>
            )}

            {/* ── SCALE TAB VIEW ── */}
            {activeTab === "scale" && (
              <div className="w-full max-w-[550px] mx-auto py-4">

                {/* Configurator Controls */}
                <div className="flex flex-col w-full">

                  {/* Top display value + Button */}
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <span className="text-[34px] sm:text-[38px] font-extrabold text-[#3daeff] leading-none tracking-tight block">
                        {formattedPower.value}
                      </span>
                      <span className="text-[10px] font-bold text-white/35 uppercase tracking-widest block mt-0.5">
                        {formattedPower.unit}
                      </span>
                    </div>
                    <button className="px-4 py-2 text-[10px] font-bold text-[#3daeff] uppercase tracking-wider border border-[#3daeff]/35 rounded-md hover:bg-[#3daeff]/10 transition-all duration-300 cursor-pointer">
                      Configure Yours &gt;
                    </button>
                  </div>

                  {/* Range Slider Container */}
                  <div className="relative mb-8 pt-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="0.01"
                      value={sliderVal}
                      onChange={(e) => setSliderVal(parseFloat(e.target.value))}
                      className="w-full h-1 bg-white/[0.08] rounded-lg appearance-none cursor-pointer accent-[#3daeff]"
                      style={{
                        background: `linear-gradient(to right, #3daeff 0%, #3daeff ${sliderVal}%, rgba(255,255,255,0.08) ${sliderVal}%, rgba(255,255,255,0.08) 100%)`,
                      }}
                    />

                    {/* Tick Mark Labels */}
                    <div className="flex justify-between text-[8px] font-semibold text-white/30 tracking-wider mt-3.5 uppercase">
                      <span>300 W</span>
                      <span>1 kW</span>
                      <span>100 kW</span>
                      <span>10 MW</span>
                      <span>50 MW</span>
                    </div>
                  </div>

                  {/* Configuration Outputs */}
                  <div className="grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-6 mb-4">
                    <div>
                      <span className="text-[8px] font-semibold text-white/25 tracking-widest uppercase block mb-1">
                        Configuration 1
                      </span>
                      <span className="text-[12.5px] sm:text-[13.5px] font-bold text-white">
                        {cruiserCount > 0 ? `${cruiserCount} Cruisers` : "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] font-semibold text-white/25 tracking-widest uppercase block mb-1">
                        Configuration 2
                      </span>
                      <span className="text-[12.5px] sm:text-[13.5px] font-bold text-white">
                        {tritonCount > 0 ? `${tritonCount} Tritons` : "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] font-semibold text-white/25 tracking-widest uppercase block mb-1">
                        Configuration 3
                      </span>
                      <span className="text-[12.5px] sm:text-[13.5px] font-bold text-white">
                        {leviathanCount > 0 ? `${leviathanCount} Leviathan${leviathanCount > 1 ? "s" : ""}` : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Slider Disclaimer */}
                  <span className="text-[8px] font-medium text-white/20 tracking-wide block leading-[1.3] mt-2">
                    Nearest-fit configurations. Units outside their practical range are excluded.
                  </span>
                </div>

              </div>
            )}

            {/* ── SOVEREIGNTY TAB VIEW ── */}
            {activeTab === "sovereignty" && (
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 w-full items-center">

                {/* 3D Isometric visual with Radar concentric rings (Left) */}
                <div className="relative w-full aspect-[4/3] max-w-[360px] mx-auto border border-white/[0.04] bg-[#02050c]/30 rounded-xl overflow-hidden shadow-inner">
                  <svg width="100%" height="100%" viewBox="0 0 400 280">
                    <defs>
                      <radialGradient id="blue-glow-gradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#0084ff" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#0084ff" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Floor Mesh lines */}
                    {Array.from({ length: 4 }).map((_, r) => {
                      const startX = x0 - r * dx;
                      const startY = y0 + r * dy;
                      const endX = x0 + 3 * dx - r * dx;
                      const endY = y0 + 3 * dy + r * dy;
                      return (
                        <line
                          key={`col-line-${r}`}
                          x1={startX}
                          y1={startY}
                          x2={endX}
                          y2={endY}
                          stroke="rgba(255, 255, 255, 0.05)"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                      );
                    })}
                    {Array.from({ length: 5 }).map((_, c) => {
                      const startX = x0 + c * dx;
                      const startY = y0 + c * dy;
                      const endX = x0 + c * dx - 2 * dx;
                      const endY = y0 + c * dy + 2 * dy;
                      return (
                        <line
                          key={`row-line-${c}`}
                          x1={startX}
                          y1={startY}
                          x2={endX}
                          y2={endY}
                          stroke="rgba(255, 255, 255, 0.05)"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                      );
                    })}

                    {/* Cubes, with (c=1, r=1) set as the central glowing active node with radar rings */}
                    {Array.from({ length: 3 }).map((_, r) =>
                      Array.from({ length: 4 }).map((_, c) => {
                        const isCenter = c === 1 && r === 1;
                        return renderCube(c, r, isCenter, isCenter);
                      })
                    )}
                  </svg>
                </div>

                {/* Vertical Features list (Right) - cardless design */}
                <div className="flex flex-col gap-5 w-full">

                  {/* Feature 1: Data Stays Yours */}
                  <div className="flex items-start gap-4">
                    <div className="w-[38px] h-[38px] rounded-full border border-[#3daeff]/35 flex items-center justify-center flex-shrink-0 text-[#3daeff]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-1">
                        Data Stays Yours
                      </h4>
                      <p className="text-[11.5px] text-white/50 leading-[1.5]">
                        Your data remains on-site, within your organization, or inside your country&apos;s borders.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2: Complete Access Control */}
                  <div className="flex items-start gap-4">
                    <div className="w-[38px] h-[38px] rounded-full border border-[#3daeff]/35 flex items-center justify-center flex-shrink-0 text-[#3daeff]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-1">
                        Complete Access Control
                      </h4>
                      <p className="text-[11.5px] text-white/50 leading-[1.5]">
                        You decide who has access, what stays, and where it runs.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3: Compliance by Design */}
                  <div className="flex items-start gap-4">
                    <div className="w-[38px] h-[38px] rounded-full border border-[#3daeff]/35 flex items-center justify-center flex-shrink-0 text-[#3daeff]">
                      <Link className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-1">
                        Compliance by Design
                      </h4>
                      <p className="text-[11.5px] text-white/50 leading-[1.5]">
                        Built to meet enterprise, regulatory, and sovereignty requirements.
                      </p>
                    </div>
                  </div>

                  {/* Feature 4: Isolation at Every Layer */}
                  <div className="flex items-start gap-4">
                    <div className="w-[38px] h-[38px] rounded-full border border-[#3daeff]/35 flex items-center justify-center flex-shrink-0 text-[#3daeff]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-1">
                        Isolation at Every Layer
                      </h4>
                      <p className="text-[11.5px] text-white/50 leading-[1.5]">
                        Physical, operational, and network isolation for true control.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
