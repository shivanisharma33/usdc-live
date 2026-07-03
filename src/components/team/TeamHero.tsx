"use client";

import React, { useEffect, useState } from "react";

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
      {/* Ambient Background Image with gradient overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/USDC%20website/Group%20339.png')" }}
        />
        {/* Vignette gradients to blend into the layout */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#030810_75%)]" />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#030810] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#030810] to-transparent" />
      </div>
      {styleTag}





      {/* Ambient scan-lines */}
      <div
        className="absolute inset-0 pointer-events-none z-[3] opacity-[0.03]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.15) 2px, rgba(59,130,246,0.15) 3px)",
        }}
      />


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
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:0ms]">Management&nbsp;</span>
          </span>
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:80ms] text-[#3daeff] select-none">Team</span>
          </span>
        </h1>

        {/* Subtitle description */}
        <p
          style={enterStyle(340)}
          className="text-[14px] md:text-[16px] text-white/50 leading-[1.8] max-w-[620px]"
        >
          Meet the experienced executives driving USDC's vision of revolutionizing AI infrastructure and sustainable data center operations.
        </p>
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
