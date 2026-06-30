"use client";

import React, { useEffect, useState } from "react";
import { Cpu, Zap, Shield } from "lucide-react";

export default function TeamHero() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  const enterStyle = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      className="relative w-full min-h-[90vh] overflow-hidden flex flex-col items-center justify-center pt-28 pb-16"
      style={{ background: "#030810" }}
    >
      {styleTag}

      {/* MULTI-LAYERED AURORA GLOWS */}
      {/* Outer ambient blur */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          left: "50%",
          width: "1200px",
          height: "800px",
          animation: "auroraShift 22s ease-in-out infinite",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.06) 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />



      {/* Grid Pattern mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[1]" />
      
      {/* Ambient scan-lines */}
      <div
        className="absolute inset-0 pointer-events-none z-[3] opacity-[0.03]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.15) 2px, rgba(59,130,246,0.15) 3px)",
        }}
      />

      {/* Floating telemetry lines */}
      <div
        className="absolute left-0 w-full h-[1px] pointer-events-none z-[4] opacity-[0.08]"
        style={{
          background:
            "linear-gradient(90deg, transparent 15%, rgba(6, 182, 212, 0.5) 50%, transparent 85%)",
          animation: "heroScanline 9s linear infinite",
        }}
      />

      {/* Vignette fadeouts */}
      <div className="absolute top-0 left-0 w-full h-[25%] bg-gradient-to-b from-[#04070f] to-transparent pointer-events-none z-[5]" />
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[#04070f] to-transparent pointer-events-none z-[5]" />

      {/* MAIN TEXT SECTION */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center select-none">
        {/* Futuristic Status Badge */}
        <div
          style={enterStyle(100)}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-white/[0.02] backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(6,182,212,0.08)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-[10px] font-bold text-white/70 tracking-[0.25em] uppercase font-mono">
            Governance
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10 uppercase"
        >
          <span className="inline-block animate-slide-up [animation-fill-mode:both] [animation-delay:0ms]">Management&nbsp;</span>
          <span className="inline-block animate-slide-up [animation-fill-mode:both] [animation-delay:80ms] text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] to-[#0091ff] drop-shadow-[0_4px_18px_rgba(61,174,255,0.25)] select-none">Team</span>
        </h1>

        {/* Subtitle description */}
        <p
          style={enterStyle(340)}
          className="text-[14px] md:text-[16px] text-white/50 leading-[1.8] max-w-[620px] mb-12"
        >
          Meet the experienced executives driving USDC's vision of revolutionizing AI infrastructure and sustainable data center operations.
        </p>

        {/* HUD Stats telemetry */}
        <div
          style={enterStyle(460)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-2"
        >
          {[
            { icon: <Cpu className="w-4 h-4 text-cyan-400" />, title: "DEPLOYED SYSTEM CAPACITY", val: "120MW+" },
            { icon: <Zap className="w-4 h-4 text-blue-400" />, title: "GRID INTERCONNECTION", val: "≤12 Months" },
            { icon: <Shield className="w-4 h-4 text-indigo-400" />, title: "HARDWARE STANDARDS", val: "Blackwell Ready" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative p-[1px] rounded-xl overflow-hidden bg-gradient-to-b from-white/[0.08] to-transparent group"
            >
              <div className="relative z-10 w-full h-full bg-[#02050c]/80 backdrop-blur-md rounded-[11px] p-5 flex flex-col items-center justify-center border border-white/[0.02]">
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <span className="text-[8px] font-mono tracking-widest text-white/40 uppercase">
                    {item.title}
                  </span>
                </div>
                <span className="text-[20px] font-extrabold text-white tracking-tight">
                  {item.val}
                </span>
                
                {/* Tech Corners */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/20 rounded-tl-[11px] pointer-events-none group-hover:border-cyan-400/40 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/20 rounded-br-[11px] pointer-events-none group-hover:border-cyan-400/40 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Inline custom CSS keyframes to avoid external CSS bundle dependency
const styleTag = (
  <style
    dangerouslySetInnerHTML={{
      __html: `
        @keyframes auroraShift {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          33% { transform: translate(-47%, -53%) scale(1.06) rotate(4deg); }
          66% { transform: translate(-53%, -47%) scale(0.95) rotate(-3deg); }
        }
        @keyframes orbBreath {
          0%, 100% { opacity: 0.65; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.95; transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes heroScanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(90vh); }
        }
      `,
    }}
  />
);
