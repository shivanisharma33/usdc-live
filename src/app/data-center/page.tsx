import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Server, Thermometer, Shield, Columns } from "lucide-react";
import DataCenterArchitecture from "@/components/DataCenterArchitecture";
import BuiltForAiSection from "@/components/BuiltForAiSection";
import FacilitySpecification from "@/components/FacilitySpecification";
import WhyUsdcSection from "@/components/WhyUsdcSection";
import ArmsGallery from "@/components/ArmsGallery";
import DcimSection from "@/components/DcimSection";
import PartnerSection from "@/components/PartnerSection";


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
      <section className="relative w-full min-h-[80vh] flex items-center pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden select-none">
        {/* Ambient Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-600/[0.05] rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-sky-500/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto animate-fade-in">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#02050c]/50 mb-8">
              <span className="w-6 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[10px] font-black tracking-[0.25em] text-white/95 uppercase font-sans">
                AI READY. BUILT DIFFERENT.
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10 uppercase">
              <span className="inline-block animate-slide-up [animation-fill-mode:both] [animation-delay:0ms]">Data&nbsp;</span>
              <span className="inline-block animate-slide-up [animation-fill-mode:both] [animation-delay:80ms] text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] to-[#0091ff] drop-shadow-[0_4px_18px_rgba(61,174,255,0.25)] select-none">Centers</span>
            </h1>

            {/* Description */}
            <p className="text-[13.5px] md:text-[14.5px] text-white/50 font-normal leading-[1.8] max-w-[480px] mx-auto mt-8 mb-10 font-sans">
              Purpose-built AI-ready facilities engineered for high-density GPU infrastructure, advanced cooling, and rapid deployment.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto mx-auto">
              <a
                href="#facilities"
                className="group flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-[#3daeff] hover:bg-[#52b9ff] text-white text-[11px] font-black tracking-[0.12em] uppercase rounded-lg transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>EXPLORE FACILITIES</span>
                <svg className="w-5 h-5 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M6.5 10H13.5M13.5 10L10.5 7M13.5 10L10.5 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 flex items-center justify-center gap-3 px-6 py-3.5 border border-white/20 hover:border-white/50 bg-transparent text-white text-[11px] font-black tracking-[0.12em] uppercase rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <span>DOWNLOAD BROCHURE</span>
                <svg className="w-5 h-5 text-white/90 transition-transform duration-200 group-hover:translate-y-0.5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M10 6.5V13.5M10 13.5L7 10.5M10 13.5L13 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS BANNER SECTION ── */}
      <section className="w-full bg-[#04070f] pb-16 md:pb-24 select-none relative z-10">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.01] backdrop-blur-sm py-8 px-6 md:px-10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 items-center text-center">
              
              {/* Metric 1 */}
              <div className="flex flex-col items-center md:border-r md:border-[#3daeff]/25">
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1.5 font-sans tracking-tight">120KW+</div>
                <div className="text-[9px] font-black text-white/50 tracking-[0.18em] uppercase font-sans">RACK DENSITY</div>
                <div className="w-6 h-[1.5px] bg-[#3daeff] mt-2 rounded-full" />
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col items-center md:border-r md:border-[#3daeff]/25">
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1.5 font-sans tracking-tight">1-50MW+</div>
                <div className="text-[9px] font-black text-white/50 tracking-[0.18em] uppercase font-sans">POWER CAPACITY</div>
                <div className="w-6 h-[1.5px] bg-[#3daeff] mt-2 rounded-full" />
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col items-center md:border-r md:border-[#3daeff]/25">
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1.5 font-sans tracking-tight">4 MTHS</div>
                <div className="text-[9px] font-black text-white/50 tracking-[0.18em] uppercase font-sans">RAPID DEPLOYMENT</div>
                <div className="w-6 h-[1.5px] bg-[#3daeff] mt-2 rounded-full" />
              </div>

              {/* Metric 4 */}
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1.5 font-sans tracking-tight">TIER III</div>
                <div className="text-[9px] font-black text-white/50 tracking-[0.18em] uppercase font-sans">RELIABILITY</div>
                <div className="w-6 h-[1.5px] bg-[#3daeff] mt-2 rounded-full" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── DATA CENTER ARCHITECTURE SECTION ── */}
      <DataCenterArchitecture />

      {/* ── BUILT FOR AI SECTION ── */}
      {/* <BuiltForAiSection /> */}

      {/* ── WHY USDC: INTEGRATED INFRASTRUCTURE ── */}
      <WhyUsdcSection />

      {/* Real-world deployment image gallery section */}
      <ArmsGallery />

      {/* ── FACILITY SPECIFICATION SECTION ── */}
      <FacilitySpecification />

      {/* USDC DCIM software telemetry dashboard section */}
      <DcimSection />

      {/* ── CORE CAPABILITIES SECTION ── */}
      <section id="facilities" className="w-full relative bg-[#04070f] border-t border-white/[0.03] py-20 md:py-28">
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

      {/* Partner Section */}
      <PartnerSection />

      {/* Footer component */}
      <Footer />
    </div>
  );
}
