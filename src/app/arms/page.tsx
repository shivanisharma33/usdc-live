import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArmsHero from "@/components/ArmsHero";
import Arms200Advantages from "@/components/Arms200Advantages";
import ArmsModelShowcase from "@/components/ArmsModelShowcase";
import ArmsInfrastructureGrid from "@/components/ArmsInfrastructureGrid";
import Arms200System from "@/components/Arms200System";
import ArmsGallery from "@/components/ArmsGallery";
import ArmsTechnicalSpecs from "@/components/ArmsTechnicalSpecs";
import PartnerSection from "@/components/PartnerSection";

export const metadata: Metadata = {
  title: "ARMS Modular Systems — USDC | Enterprise-Scale AI Infrastructure",
  description:
    "Discover ARMS Modular Systems - USDC's premier modular datacenter platform delivering up to 600 kW of critical IT load with Tier III redundancy and rapid deployment.",
};

export default function ArmsPage() {
  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero section */}
      <ArmsHero />

      {/* ARMS 200 Advantages section */}
      <Arms200Advantages />

      {/* Interactive 3D ARMS Model Showcase */}
      <ArmsModelShowcase />

      {/* 3D Modular Infrastructure Grid Section */}
      <ArmsInfrastructureGrid />

      {/* ARMS 200 System detailed specs grid & Certificate section */}
      <Arms200System />

      {/* Real-world deployment image gallery section */}
      <ArmsGallery />

      {/* ARMS Technical Specifications list & Future Ready platform */}
      <ArmsTechnicalSpecs />

      {/* Partner Section */}
      <PartnerSection />

      {/* Footer component */}
      <Footer />
    </div>
  );
}

