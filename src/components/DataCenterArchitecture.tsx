"use client";

import React, { useState } from "react";
import { Zap, Activity, Cpu, Server, ArrowUpRight } from "lucide-react";

export default function DataCenterArchitecture() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const items = [
    {
      title: "POWER PATH",
      desc: "High-capacity power delivery and progression through each infrastructure layer.",
      icon: <Zap className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      title: "MONITORING LAYER",
      desc: "Real-time monitoring, processing, and intelligent control checkpoints.",
      icon: <Activity className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      title: "COMPUTE LAYER",
      desc: "AI-ready compute infrastructure delivered to production environments.",
      icon: <Cpu className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      title: "HIGH DENSITY",
      desc: "Supports 120kW+ per-rack GPU power density.",
      icon: <Server className="w-5 h-5" strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="w-full relative bg-[#04070f] py-20 md:py-28 overflow-hidden select-none border-t border-white/[0.03]">
      {/* Dynamic Keyframes Injection */}
      <style>{`
        @keyframes spinCube {
          0% { transform: rotateX(-22deg) rotateY(0deg); }
          100% { transform: rotateX(-22deg) rotateY(360deg); }
        }
        .animate-rotate-cube {
          animation: spinCube 14s linear infinite;
        }
        @keyframes spinCcw {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes spinCw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-ccw {
          animation: spinCcw 28s linear infinite;
        }
        .animate-spin-cw {
          animation: spinCw 36s linear infinite;
        }
        @keyframes pulseLight {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-glow {
          animation: pulseLight 4s ease-in-out infinite;
        }
        @keyframes dashTravel {
          to { stroke-dashoffset: -40; }
        }
        .animate-dash-travel {
          stroke-dasharray: 5, 5;
          animation: dashTravel 2s linear infinite;
        }
      `}</style>

      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-[20%] left-[-15%] w-[600px] h-[600px] bg-blue-600/[0.03] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-15%] w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ══════ LEFT COLUMN: Info Stack ══════ */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#02050c]/60 mb-6">
              <span className="w-6 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[10px] font-black tracking-[0.25em] text-white/95 uppercase font-sans">
                DATA CENTER ARCHITECTURE
              </span>
            </div>

            {/* Title */}
            <h2 className="text-[38px] sm:text-[46px] md:text-[54px] lg:text-[60px] font-black tracking-tight leading-[1.08] text-white font-sans uppercase">
              HEAT OUT. <br />
              <span className="text-[#3daeff]">PERFORMANCE IN.</span>
            </h2>

            {/* Subtext */}
            <p className="text-[13.5px] md:text-[14.5px] text-white/50 font-normal leading-[1.8] max-w-[500px] mt-6 mb-8 font-sans">
              A multi-layer infrastructure architecture routes power, cooling, and compute
              resources through dedicated processing layers, ensuring maximum efficiency,
              thermal stability, and AI performance.
            </p>

            {/* Feature List */}
            <div className="flex flex-col w-full max-w-[500px]">
              {items.map((item, idx) => {
                const isHovered = activeNode === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveNode(idx)}
                    onMouseLeave={() => setActiveNode(null)}
                    className={`flex items-start gap-5 py-5 border-b border-white/[0.05] transition-all duration-300 cursor-pointer ${
                      isHovered ? "border-t-transparent border-b-[#3daeff]/40" : ""
                    }`}
                  >
                    {/* Icon bubble */}
                    <div
                      className={`flex items-center justify-center w-11 h-11 rounded-full border flex-shrink-0 transition-all duration-300 ${
                        isHovered
                          ? "border-[#3daeff] bg-[#3daeff]/10 text-white shadow-[0_0_15px_rgba(61,174,255,0.25)]"
                          : "border-white/10 bg-white/[0.02] text-white/60"
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-black tracking-wider uppercase transition-colors duration-300 ${
                            isHovered ? "text-[#3daeff]" : "text-white"
                          }`}
                        >
                          {item.title}
                        </span>
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 transition-all duration-300 ${
                            isHovered ? "text-[#3daeff] translate-x-0.5 -translate-y-0.5" : "text-white/40"
                          }`}
                        />
                      </div>
                      <span className="text-[12px] text-white/50 leading-relaxed font-normal mt-1.5">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══════ RIGHT COLUMN: Animated 3D concentric model ══════ */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
              <div className="relative w-full aspect-[680/600] max-w-[550px] md:max-w-[580px] bg-transparent">
              
              {/* SVG concentric orbits & lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 680 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ── Orbits & concentric rings (centered at 340, 300) ── */}
                
                {/* Dotted Inner Ring */}
                <circle
                  cx="340"
                  cy="300"
                  r="105"
                  className="animate-spin-ccw origin-[340px_300px]"
                  stroke="rgba(0, 145, 255, 0.15)"
                  strokeWidth="1.2"
                  strokeDasharray="4 6"
                  style={{ transformOrigin: "340px 300px" }}
                />

                {/* Solid Middle Ring */}
                <circle
                  cx="340"
                  cy="300"
                  r="175"
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="1.5"
                />

                {/* Dotted Outer Ring */}
                <circle
                  cx="340"
                  cy="300"
                  r="225"
                  className="animate-spin-cw origin-[340px_300px]"
                  stroke="rgba(0, 145, 255, 0.18)"
                  strokeWidth="1.5"
                  strokeDasharray="5 8"
                  style={{ transformOrigin: "340px 300px" }}
                />

                {/* Concentric glow halo */}
                <circle
                  cx="340"
                  cy="300"
                  r="175"
                  className="animate-pulse-glow"
                  stroke="rgba(0, 145, 255, 0.02)"
                  strokeWidth="8"
                />

                {/* ── Connection Lines (radial paths with traveling pulses) ── */}
                
                {/* Top Line */}
                <line
                  x1="340"
                  y1="300"
                  x2="340"
                  y2="120"
                  stroke={activeNode === 0 ? "rgba(61,174,255,0.4)" : "rgba(255,255,255,0.06)"}
                  strokeWidth="1.5"
                  className="transition-colors duration-300"
                />
                <circle cx="340" cy="300" r="2" fill="#3daeff">
                  <animate attributeName="cy" from="300" to="120" dur="2.2s" repeatCount="indefinite" />
                </circle>

                {/* Right Line */}
                <line
                  x1="340"
                  y1="300"
                  x2="520"
                  y2="300"
                  stroke={activeNode === 1 ? "rgba(61,174,255,0.4)" : "rgba(255,255,255,0.06)"}
                  strokeWidth="1.5"
                  className="transition-colors duration-300"
                />
                <circle cx="340" cy="300" r="2" fill="#3daeff">
                  <animate attributeName="cx" from="340" to="520" dur="2.2s" repeatCount="indefinite" />
                </circle>

                {/* Bottom Line */}
                <line
                  x1="340"
                  y1="300"
                  x2="340"
                  y2="480"
                  stroke={activeNode === 2 ? "rgba(61,174,255,0.4)" : "rgba(255,255,255,0.06)"}
                  strokeWidth="1.5"
                  className="transition-colors duration-300"
                />
                <circle cx="340" cy="300" r="2" fill="#3daeff">
                  <animate attributeName="cy" from="300" to="480" dur="2.2s" repeatCount="indefinite" />
                </circle>

                {/* Left Line */}
                <line
                  x1="340"
                  y1="300"
                  x2="160"
                  y2="300"
                  stroke={activeNode === 3 ? "rgba(61,174,255,0.4)" : "rgba(255,255,255,0.06)"}
                  strokeWidth="1.5"
                  className="transition-colors duration-300"
                />
                <circle cx="340" cy="300" r="2" fill="#3daeff">
                  <animate attributeName="cx" from="340" to="160" dur="2.2s" repeatCount="indefinite" />
                </circle>


                {/* ── Node Label Text Elements inside SVG (Scales dynamically) ── */}

                {/* Top Node Text (POWER PATH) */}
                <g className="transition-all duration-300" style={{ opacity: activeNode === null || activeNode === 0 ? 1 : 0.45 }}>
                  <text x="340" y="45" textAnchor="middle" className="font-sans font-black text-[10px] tracking-wider uppercase" fill="#3daeff">POWER PATH</text>
                  <text x="340" y="60" textAnchor="middle" className="font-sans font-normal text-[9.5px]" fill="rgba(255,255,255,0.45)">High-capacity power</text>
                  <text x="340" y="73" textAnchor="middle" className="font-sans font-normal text-[9.5px]" fill="rgba(255,255,255,0.45)">delivery</text>
                </g>

                {/* Right Node Text (MONITORING) */}
                <g className="transition-all duration-300" style={{ opacity: activeNode === null || activeNode === 1 ? 1 : 0.45 }}>
                  <text x="565" y="285" textAnchor="start" className="font-sans font-black text-[10px] tracking-wider uppercase" fill="#3daeff">MONITORING</text>
                  <text x="565" y="300" textAnchor="start" className="font-sans font-normal text-[9.5px]" fill="rgba(255,255,255,0.45)">Real-time monitoring</text>
                  <text x="565" y="313" textAnchor="start" className="font-sans font-normal text-[9.5px]" fill="rgba(255,255,255,0.45)">& intelligent control</text>
                </g>

                {/* Bottom Node Text (COMPUTE LAYER) */}
                <g className="transition-all duration-300" style={{ opacity: activeNode === null || activeNode === 2 ? 1 : 0.45 }}>
                  <text x="340" y="535" textAnchor="middle" className="font-sans font-black text-[10px] tracking-wider uppercase" fill="#3daeff">COMPUTE LAYER</text>
                  <text x="340" y="550" textAnchor="middle" className="font-sans font-normal text-[9.5px]" fill="rgba(255,255,255,0.45)">AI-ready compute</text>
                  <text x="340" y="563" textAnchor="middle" className="font-sans font-normal text-[9.5px]" fill="rgba(255,255,255,0.45)">infrastructure</text>
                </g>

                {/* Left Node Text (HIGH DENSITY) */}
                <g className="transition-all duration-300" style={{ opacity: activeNode === null || activeNode === 3 ? 1 : 0.45 }}>
                  <text x="115" y="285" textAnchor="end" className="font-sans font-black text-[10px] tracking-wider uppercase" fill="#3daeff">HIGH DENSITY</text>
                  <text x="115" y="300" textAnchor="end" className="font-sans font-normal text-[9.5px]" fill="rgba(255,255,255,0.45)">120kW+ per-rack</text>
                  <text x="115" y="313" textAnchor="end" className="font-sans font-normal text-[9.5px]" fill="rgba(255,255,255,0.45)">GPU power density</text>
                </g>

              </svg>

              {/* ── CENTRAL HUB (Positioned absolutely over SVG center) ── */}
              <div 
                className="absolute w-[140px] h-[140px] rounded-full border border-[#3daeff]/35 bg-[#03060d] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,145,255,0.15)] z-20"
                style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
              >
                {/* 3D Wireframe Rotating Cube */}
                <div className="w-11 h-11 relative flex items-center justify-center mb-1.5" style={{ perspective: "400px" }}>
                  <div 
                    className="w-7 h-7 relative transform-style-3d animate-rotate-cube"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Face 1: Front */}
                    <div className="absolute inset-0 border border-white/60 bg-[#3daeff]/10" style={{ transform: "translateZ(14px)" }} />
                    {/* Face 2: Back */}
                    <div className="absolute inset-0 border border-white/40 bg-[#3daeff]/10" style={{ transform: "rotateY(180deg) translateZ(14px)" }} />
                    {/* Face 3: Left */}
                    <div className="absolute inset-0 border border-white/40 bg-[#3daeff]/10" style={{ transform: "rotateY(-90deg) translateZ(14px)" }} />
                    {/* Face 4: Right */}
                    <div className="absolute inset-0 border border-white/40 bg-[#3daeff]/10" style={{ transform: "rotateY(90deg) translateZ(14px)" }} />
                    {/* Face 5: Top */}
                    <div className="absolute inset-0 border border-white/40 bg-[#3daeff]/10" style={{ transform: "rotateX(90deg) translateZ(14px)" }} />
                    {/* Face 6: Bottom */}
                    <div className="absolute inset-0 border border-white/40 bg-[#3daeff]/10" style={{ transform: "rotateX(-90deg) translateZ(14px)" }} />
                  </div>
                </div>

                {/* Central Title */}
                <span className="text-white font-sans text-base font-black tracking-wide leading-none uppercase">USDC</span>
                <span className="text-[#3daeff] font-sans text-[7.5px] font-black tracking-wider uppercase leading-none mt-1">
                  AI INFRASTRUCTURE
                </span>
              </div>

              {/* ── FOUR OUTERSATELLITE NODES (Positioned absolutely over SVG nodes) ── */}

              {/* Top Node (Power Path) */}
              <div 
                className={`absolute w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 z-20 ${
                  activeNode === 0 
                    ? "border-[#3daeff] bg-[#3daeff]/15 text-white shadow-[0_0_15px_rgba(61,174,255,0.3)] scale-110" 
                    : "border-white/10 bg-[#03060d] text-white/70 hover:border-white/20 hover:scale-105"
                }`}
                style={{ left: "50%", top: "20%", transform: "translate(-50%, -50%)" }}
                onMouseEnter={() => setActiveNode(0)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <Zap className="w-5 h-5" strokeWidth={1.5} />
              </div>

              {/* Right Node (Monitoring) */}
              <div 
                className={`absolute w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 z-20 ${
                  activeNode === 1 
                    ? "border-[#3daeff] bg-[#3daeff]/15 text-white shadow-[0_0_15px_rgba(61,174,255,0.3)] scale-110" 
                    : "border-white/10 bg-[#03060d] text-white/70 hover:border-white/20 hover:scale-105"
                }`}
                style={{ left: "76.47%", top: "50%", transform: "translate(-50%, -50%)" }}
                onMouseEnter={() => setActiveNode(1)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <Activity className="w-5 h-5" strokeWidth={1.5} />
              </div>

              {/* Bottom Node (Compute Layer) */}
              <div 
                className={`absolute w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 z-20 ${
                  activeNode === 2 
                    ? "border-[#3daeff] bg-[#3daeff]/15 text-white shadow-[0_0_15px_rgba(61,174,255,0.3)] scale-110" 
                    : "border-white/10 bg-[#03060d] text-[#3daeff] hover:border-white/20 hover:scale-105"
                }`}
                style={{ left: "50%", top: "80%", transform: "translate(-50%, -50%)" }}
                onMouseEnter={() => setActiveNode(2)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <Cpu className="w-5 h-5" strokeWidth={1.5} />
              </div>

              {/* Left Node (High Density) */}
              <div 
                className={`absolute w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 z-20 ${
                  activeNode === 3 
                    ? "border-[#3daeff] bg-[#3daeff]/15 text-white shadow-[0_0_15px_rgba(61,174,255,0.3)] scale-110" 
                    : "border-white/10 bg-[#03060d] text-white/70 hover:border-white/20 hover:scale-105"
                }`}
                style={{ left: "23.53%", top: "50%", transform: "translate(-50%, -50%)" }}
                onMouseEnter={() => setActiveNode(3)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <Server className="w-5 h-5" strokeWidth={1.5} />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
