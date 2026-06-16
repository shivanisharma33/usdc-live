import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RedefiningData from "@/components/RedefiningData";
import InfrastructureStack from "@/components/InfrastructureStack";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden">
      {/* Background Grids and Ambient Glows */}
      
      {/* Top Center Massive Ambient Blue Glow behind Navbar & Hero */}
      <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-500/[0.08] rounded-full blur-[130px] pointer-events-none animate-float" />
      
      {/* Top Left Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Top Right Ambient Gold Glow */}
      <div className="absolute top-[-15%] right-[-10%] w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[145px] pointer-events-none" />

      {/* Render the Navbar */}
      <Navbar />

      {/* Render the Hero section */}
      <Hero />

      {/* Render the Redefining Data section */}
      <RedefiningData />

      {/* Render the Infrastructure Stack section */}
      <InfrastructureStack />

      {/* Footer / Info section */}
      <footer className="w-full py-10 border-t border-white/[0.04] relative z-10 flex items-center justify-center text-[10px] text-white/25 tracking-[0.2em] font-sans">
        © 2026 USDC CLONE. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
