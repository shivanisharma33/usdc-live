import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RedefiningData from "@/components/RedefiningData";
import InfrastructureStack from "@/components/InfrastructureStack";
import AIDemand from "@/components/AIDemand";
import Arms200System from "@/components/Arms200System";
import AIInfrastructureExcellence from "@/components/AIInfrastructureExcellence";
import NvidiaRoadmap from "@/components/NvidiaRoadmap";
import Arms200Platform from "@/components/Arms200Platform";
import UsdcByNumbers from "@/components/UsdcByNumbers";
import LatestNews from "@/components/LatestNews";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

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

      {/* Render the AI Demand section */}
      <AIDemand />


      {/* Render the ARMS 200 System section */}
      <Arms200System />

      {/* Render the AI Infrastructure Excellence section */}
      <AIInfrastructureExcellence />

      {/* Render the NVIDIA Roadmap section */}
      <NvidiaRoadmap />
      {/* Render the ARMS 200 Platform section */}
      <Arms200Platform />

      {/* Render the USDC By The Numbers section */}
      <UsdcByNumbers />

      {/* Render the Latest News section */}
      <LatestNews />

      {/* Render the Contact Section */}
      <ContactSection />

      {/* Footer / Info section */}
      <Footer />
    </div>
  );
}
