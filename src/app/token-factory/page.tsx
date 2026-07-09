"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerSection from "@/components/PartnerSection";
import Token3DVisual from "@/components/Token3DVisual";
import TokenFactoryForm from "@/components/TokenFactoryForm";
import TokenFactoryFeatures from "@/components/TokenFactoryFeatures";
import gsap from "gsap";
import { Coins, HelpCircle } from "lucide-react";

export default function TokenFactoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // GSAP Page Intro Animation Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.0 } });

      // Animate Main Title and Subtitle
      tl.fromTo(
        ".gsap-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, delay: 0.2 }
      )
      .fromTo(
        ".gsap-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.7"
      )
      // Animate 3D coin float-in
      .fromTo(
        ".gsap-coin",
        { opacity: 0, scale: 0.8, rotate: -15 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.2 },
        "-=0.6"
      )
      // Animate Form Panel
      .fromTo(
        ".gsap-form",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0 },
        "-=1.0"
      )
      // Animate Feature Grid Section Title
      .fromTo(
        ".gsap-features-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 },
        "-=0.8"
      )
      // Animate Feature Cards in staggered fashion
      .fromTo(
        ".gsap-features-grid > div",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.12 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden"
    >
      {/* Ambient background gradients */}
      <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] bg-blue-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-15%] w-[600px] h-[600px] bg-purple-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[20%] w-[700px] h-[700px] bg-cyan-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      {/* Header Navbar */}
      <Navbar />

      {/* Main Page Layout Container */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 xl:px-8 pt-32 pb-24 relative z-10">
        
        {/* Section 1: Hero & Configurator Form */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-24 md:mb-32">
          
          {/* Left Column: Heading and 3D Visual */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 self-center lg:self-start bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-wide shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Coins className="w-3.5 h-3.5" />
              USDC DEVELOPER SUITE
            </div>

            {/* Main Title */}
            <h1 className="gsap-title text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Launch Custom Tokens{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(6,182,212,0.15)]">
                Instantly
              </span>
            </h1>

            {/* Subheading */}
            <p className="gsap-subtitle text-slate-400 text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
              The premier Web3 asset generation toolkit. Deploy optimized, audited ERC-20 smart contracts across major block networks in under 15 seconds. High security, low gas costs, and zero coding required.
            </p>

            {/* Floating 3D Token Visual */}
            <div className="gsap-coin">
              <Token3DVisual />
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="gsap-form lg:col-span-7">
            <TokenFactoryForm />
          </div>

        </section>

        {/* Section 2: Features Panel */}
        <section className="border-t border-white/5 pt-20 md:pt-28 mb-16">
          <div className="gsap-features-header text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Enterprise-Grade Tokenization Suite
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
              Every deployed contract utilizes gas-optimized, industry-vetted code architecture, delivering immediate security and multi-chain reliability.
            </p>
          </div>

          {/* Features cards wrapper */}
          <div className="gsap-features-grid">
            <TokenFactoryFeatures />
          </div>
        </section>

      </main>

      {/* Partner Banner CTA */}
      <PartnerSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
