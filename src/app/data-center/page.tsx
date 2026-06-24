import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Server, Thermometer, Shield, Columns } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Center — USDC | High-Density GPU Computing Environment",
  description:
    "Discover USDC's high-density modular datacenter platform, liquid cooling configurations, and robust structural designs built for AI compute cluster operations.",
};

export default function DataCenterPage() {
  const dcFeatures = [
    {
      title: "Direct-to-Chip Liquid Cooling",
      desc: "Native liquid-cooling manifolds supporting blind-mate configurations and high coolant flow rates to maintain optimal temperatures for heavy GPU clusters.",
      Icon: Thermometer,
    },
    {
      title: "Structural Load Capacity",
      desc: "Racks constructed from aircraft-grade aluminum and heavy-duty steel, structurally rated to support up to 4,500 lbs of server weight per enclosure.",
      Icon: Columns,
    },
    {
      title: "Modular Deployment Speed",
      desc: "Standardized pod units manufactured off-site and commissioned on-site within 4 to 8 weeks, ensuring rapid scale and capacity growth.",
      Icon: Server,
    },
    {
      title: "Physical Security Standards",
      desc: "Featuring biometric multi-factor authentication, constant surveillance, and secure enclosures conforming to corporate security baselines.",
      Icon: Shield,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden">
      {/* Navigation Header */}
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-[85vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden select-none">
        {/* Ambient Background Glows */}
        <div className="absolute top-1/2 right-[-20%] -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-blue-600/[0.06] rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-1/3 w-[500px] h-[500px] bg-[#3daeff]/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

        {/* Subtle grid line backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_75%,transparent_100%)] pointer-events-none z-0" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Column: Heading and Description */}
            <div className="flex-1 flex flex-col items-start text-left relative z-20">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
                <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
                  Next-Gen Compute Environments
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight leading-[1.05] text-white mb-2 font-sans">
                DATA CENTER
              </h1>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] font-bold tracking-tight leading-[1.05] text-[#3daeff] mb-8 font-sans">
                PLATFORM
              </h2>

              {/* Description */}
              <p className="text-[14px] md:text-[15px] text-white/70 font-normal leading-[1.75] max-w-[620px] mb-10 font-sans">
                Designed to house massive clusters of next-generation GPU servers, USDC's modular data center platforms deliver advanced fluid dynamics, structural support, and physical-logical security to maximize operational efficiency.
              </p>

              {/* Metrics Card */}
              <div className="w-full max-w-[440px] border border-white/[0.12] rounded-[16px] bg-[#080d1a]/50 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex flex-col items-center flex-1">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1.5 font-sans">
                      80 kW+
                    </div>
                    <div className="text-[9px] font-semibold text-white/50 tracking-[0.15em] uppercase text-center font-sans">
                      Per-Rack Density
                    </div>
                  </div>

                  <div className="w-[1px] h-12 bg-white/[0.12]" />

                  <div className="flex flex-col items-center flex-1">
                    <div className="text-3xl md:text-4xl font-bold text-[#3daeff] mb-1.5 font-sans">
                      Tier III
                    </div>
                    <div className="text-[9px] font-semibold text-white/50 tracking-[0.15em] uppercase text-center font-sans">
                      Uptime Standard
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Specs Card */}
            <div className="flex-1 w-full max-w-[500px] relative">
              <div className="absolute inset-0 bg-[#0091ff]/[0.05] rounded-3xl blur-[40px] pointer-events-none" />
              <div className="relative border border-white/[0.08] bg-[#02050c]/40 backdrop-blur-md rounded-3xl p-8 shadow-[0_24px_50px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#3daeff]/10 border border-[#3daeff]/35 flex items-center justify-center">
                    <Server className="w-6 h-6 text-[#3daeff]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">Datacenter Pods</h3>
                    <p className="text-xs text-white/40 font-sans">Structural & Thermal Enclosure Specs</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[
                    { label: "Cooling Architecture", val: "Direct-to-Chip Liquid Cooling" },
                    { label: "Rack Structural Capacity", val: "Up to 4,500 lbs Per Rack" },
                    { label: "Deployment Cycle", val: "4 to 8 Weeks Commissioning" },
                    { label: "Compliance & Safety", val: "Conforms to ANSI/TIA-942 Rated-3" },
                  ].map((spec, i) => (
                    <li key={i} className="flex justify-between items-center py-2.5 border-b border-white/[0.05] last:border-0">
                      <span className="text-xs text-white/50 font-sans">{spec.label}</span>
                      <span className="text-xs font-semibold text-white font-sans">{spec.val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES SECTION ── */}
      <section className="w-full relative bg-[#04070f] border-t border-white/[0.03] py-20 md:py-28">
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-sans">
              Designed for <span className="text-[#3daeff]">Dense Compute</span>
            </h2>
            <p className="text-sm text-white/40 leading-relaxed font-sans">
              Our modular datacenter solutions deploy rapidly and support continuous GPU workloads, delivering enterprise-scale concurrent maintainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {dcFeatures.map((feat, idx) => {
              const Icon = feat.Icon;
              return (
                <div
                  key={idx}
                  className="group relative flex items-start gap-5 p-6 rounded-2xl border border-white/[0.06] bg-[#02050c]/30 hover:bg-[#02050c]/60 hover:border-[#0091ff]/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] group-hover:bg-[#3daeff]/10 border border-white/10 group-hover:border-[#3daeff]/30 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-white/60 group-hover:text-[#3daeff] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 transition-colors duration-300 group-hover:text-[#3daeff] font-sans">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-white/45 leading-[1.65] font-sans">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
