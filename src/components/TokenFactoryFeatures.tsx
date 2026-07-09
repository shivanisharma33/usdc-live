"use client";

import React from "react";
import { 
  ShieldCheck, 
  Globe, 
  Zap, 
  FileCheck, 
  RefreshCw, 
  Flame 
} from "lucide-react";

// List of features
const features = [
  {
    icon: ShieldCheck,
    title: "Secure Smart Contracts",
    description: "Built upon industry-standard, fully audited OpenZeppelin templates. Free from backdoors, flash-loan vulnerabilities, or coding exploits.",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/40",
    iconColor: "text-emerald-400 bg-emerald-500/10",
  },
  {
    icon: Globe,
    title: "Multi-Chain Support",
    description: "Launch your token instantly across Ethereum, BNB Chain, Polygon, Arbitrum, Optimism, or Avalanche with zero network-switching friction.",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] group-hover:border-blue-500/40",
    iconColor: "text-blue-400 bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description: "No coding required. Fill out the configuration and launch your token to mainnets in under 15 seconds through optimized bytecode compilation.",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:border-cyan-500/40",
    iconColor: "text-cyan-400 bg-cyan-500/10",
  },
  {
    icon: FileCheck,
    title: "Explorer Verification",
    description: "Automatically upload and verify contract source code on block explorers like Etherscan, BscScan, or Polygonscan for total transparency.",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] group-hover:border-purple-500/40",
    iconColor: "text-purple-400 bg-purple-500/10",
  },
  {
    icon: RefreshCw,
    title: "Ownership Transfer",
    description: "Securely delegate the Administrator keys to hardware cold storage or Multi-Sig Gnosis wallets instantly post-deployment.",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] group-hover:border-rose-500/40",
    iconColor: "text-rose-400 bg-rose-500/10",
  },
  {
    icon: Flame,
    title: "Low Gas Fees",
    description: "Highly optimized solidity bytecode compilation routines reduce blockchain smart contract deployment gas costs by up to 35%.",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] group-hover:border-amber-500/40",
    iconColor: "text-amber-400 bg-amber-500/10",
  },
];

export default function TokenFactoryFeatures() {
  return (
    <div className="w-full relative z-10">
      {/* Grid of features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={idx}
              className={`group relative bg-[#0b1020]/45 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 hover:bg-[#0d162d]/60 active:scale-[0.99] transition-all duration-300 ${feature.glowColor}`}
            >
              {/* Subtle Grid Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.015] group-hover:opacity-[0.035] transition-opacity rounded-2xl pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              />

              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-white/10 ${feature.iconColor} transition-transform group-hover:scale-110 duration-300`}>
                <IconComponent className="w-6 h-6" />
              </div>

              {/* Feature Title */}
              <h4 className="text-base md:text-lg font-bold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h4>

              {/* Feature Description */}
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
