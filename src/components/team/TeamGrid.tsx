"use client";

import React, { useState } from "react";
import { Cpu, Zap, Shield, ChevronRight, X, BarChart3, Database, Globe, Network } from "lucide-react";

interface TelemetryStat {
  label: string;
  value: string;
  percentage?: number; // for visual progress bars
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "exec" | "grid" | "engineering" | "advisors";
  quote: string;
  bio: string;
  fullBio: string;
  status: "ONLINE" | "ENERGIZED" | "ACTIVE" | "STANDBY";
  skills: { name: string; val: number }[];
  telemetry: TelemetryStat[];
  avatarStyle: "director" | "engineer" | "operations" | "advisor";
}

export default function TeamGrid() {
  const [activeTab, setActiveTab] = useState<"all" | "exec" | "grid" | "engineering" | "advisors">("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [cardModes, setCardModes] = useState<Record<string, "bio" | "telemetry">>({});

  const team: TeamMember[] = [
    {
      id: "marcus",
      name: "Marcus Vance",
      role: "Chief Executive Officer",
      category: "exec",
      status: "ONLINE",
      quote: "Compute is energy, and energy is the ultimate bottleneck. We resolve it at the physical source.",
      bio: "A pioneer in energy asset optimization and venture scaling. Formerly scaled multi-gigawatt utility systems and structured wholesale power acquisitions for hyperscale data infrastructures.",
      fullBio: "Marcus Vance leads USDC's mission to bridge clean energy reserves with high-density compute. Over his 18-year career in infrastructure and energy, Marcus has structured over 1.5GW of power interconnection agreements and managed private capital allocations for sovereign cloud deployments. Prior to USDC, he served as Executive VP at GridCap Utilities and founded SolarScale Capital. He believes that the next generation of artificial intelligence is fundamentally a physical infrastructure problem, requiring direct co-location of computing cores at energy nodes.",
      avatarStyle: "director",
      skills: [
        { name: "Power Interconnection", val: 98 },
        { name: "Infrastructure Financing", val: 95 },
        { name: "Sovereign Cloud Structuring", val: 90 },
      ],
      telemetry: [
        { label: "POWER DEPLOYED", value: "160 MW" },
        { label: "EFFICIENCY INDEX", value: "99.1%" },
        { label: "ACTIVE REGIONS", value: "3 Sites" },
        { label: "OPERATIONAL YEARS", value: "18 Yrs" },
      ],
    },
    {
      id: "evelyn",
      name: "Dr. Evelyn Chen",
      role: "Chief Technology Officer",
      category: "engineering",
      status: "ENERGIZED",
      quote: "Vertical integration isn't just about efficiency; it's the only way to cool next-generation silicon at density.",
      bio: "PhD in High-Performance Computing Systems. Lead designer of USDC's proprietary modular compute chassis and thermodynamic cooling interfaces. Veteran builder of dense GPU clusters.",
      fullBio: "Dr. Evelyn Chen oversees all hardware, thermal, and network engineering at USDC. She holds a PhD in Computer Engineering from Stanford, where her research focused on liquid-to-air cooling manifolds for high-density architectures. Evelyn has previously engineered server-grade deployments at NVIDIA and led HPC architecture teams at Oak Ridge National Laboratory. Under her leadership, USDC has developed its proprietary modular chassis that reduces PUE to a record 1.12 for dense GPU hardware environments.",
      avatarStyle: "engineer",
      skills: [
        { name: "Liquid Cooling Design", val: 99 },
        { name: "GPU Cluster Engineering", val: 97 },
        { name: "Network Fabric Routing", val: 92 },
      ],
      telemetry: [
        { label: "MODULE RACKS", value: "220+ Racks" },
        { label: "PUE FACTOR RATING", value: "1.12 PUE" },
        { label: "SILICON READINESS", value: "Blackwell Ready" },
        { label: "FABRIC BANDWIDTH", value: "3.2 Tbps" },
      ],
    },
    {
      id: "devon",
      name: "Devon Thorne",
      role: "Head of Grid Integration",
      category: "grid",
      status: "ACTIVE",
      quote: "We don't draw from the grid; we balance it. Our computing nodes act as dynamic, smart load absorbers.",
      bio: "Former transmission engineer at national energy utility grids. Orchestrates physical grid tie-ins, stranded energy conversion, and virtual power plant (VPP) balancing algorithms.",
      fullBio: "Devon Thorne manages the physical integration between energy assets and USDC modular compute nodes. With a background in electrical engineering and power grids, Devon specializes in high-voltage substations, transformer deployment, and renewable asset integration. Before joining USDC, Devon spent a decade as Chief Grid Architect at NextEra Energy. He holds patents in dynamic load balancing algorithms that allow compute clusters to throttle operational loads instantly in response to real-time grid stress.",
      avatarStyle: "operations",
      skills: [
        { name: "Substation Engineering", val: 96 },
        { name: "Stranded Energy Harnessing", val: 98 },
        { name: "Load Throttle Algorithms", val: 94 },
      ],
      telemetry: [
        { label: "INTERCONNECT SPEED", value: "<12 Mo." },
        { label: "TRANSFORMER LOAD", value: "450 MVA" },
        { label: "GRID CONNECTIONS", value: "4 Grids" },
        { label: "VPP DYNAMIC RANGE", value: "120 MW" },
      ],
    },
    {
      id: "siddharth",
      name: "Siddharth Mehta",
      role: "VP of Infrastructure Operations",
      category: "grid",
      status: "ACTIVE",
      quote: "Redundancy is built into our thermodynamics, not just our power lines.",
      bio: "Infrastructure operations veteran with 15+ years managing tier-III and tier-IV facilities. Oversees liquid cooling manifolds, security protocols, and operational uptime SLAs.",
      fullBio: "Siddharth Mehta leads the daily operations, maintenance, and physical security of USDC's active compute nodes. Siddharth has directed operations for massive multi-tenant data center operators including Equinix and Digital Realty. At USDC, he manages the fluid dynamics of our state-of-the-art liquid-to-air cooling manifolds and guarantees a 99.999% operational uptime SLA. His expertise covers redundant power generators, micro-grid management, and environmental sensory networks.",
      avatarStyle: "operations",
      skills: [
        { name: "Tier IV Facility Mgmt", val: 95 },
        { name: "Fluid System Dynamics", val: 92 },
        { name: "Security Protocols", val: 96 },
      ],
      telemetry: [
        { label: "OPERATIONAL UPTIME", value: "99.999%" },
        { label: "COOLANT FLOW RATE", value: "1200 L/m" },
        { label: "SENSOR NODE TELEM", value: "4,200 Nodes" },
        { label: "THERMAL CONTROL", value: "Closed Loop" },
      ],
    },
    {
      id: "elena",
      name: "Elena Rostova",
      role: "Principal GPU Architect",
      category: "engineering",
      status: "ENERGIZED",
      quote: "Latency is measured in centimeters when you are routing petabytes of tensor data.",
      bio: "Lead developer of fabric architectures. Expert in custom InfiniBand topologies, optical switches, and Blackwell/Hopper cluster optimization.",
      fullBio: "Elena Rostova designs the internal routing networks and hardware fabrics inside USDC clusters. She specializes in optical switching, RDMA systems, and ultra-low-latency high-throughput networking. Elena worked for seven years at Mellanox (now NVIDIA), optimizing network fabric layers for supercomputers. At USDC, she oversees the deployment of high-throughput optical switches and coordinates unified NVLink architectures to maximize computing efficiency for large LLM training operations.",
      avatarStyle: "engineer",
      skills: [
        { name: "InfiniBand Topologies", val: 99 },
        { name: "RDMA / RoCE Protocols", val: 98 },
        { name: "Silicon Interconnects", val: 94 },
      ],
      telemetry: [
        { label: "FABRIC EFFICIENCY", value: "99.98%" },
        { label: "OPTICAL SWITCHES", value: "64 Nodes" },
        { label: "RDMA OVERLAY LEVEL", value: "Ultra-Low" },
        { label: "FIBER DEPTH", value: "14 km" },
      ],
    },
    {
      id: "arthur",
      name: "Gen. Arthur Briggs (Ret.)",
      role: "Advisor, National Grid Security",
      category: "advisors",
      status: "STANDBY",
      quote: "Securing compute sites is a matter of national economic and security priority.",
      bio: "Former commander of critical infrastructure security task force. Advises USDC on physical campus defense, sovereign compliance, and national grid interface protocols.",
      fullBio: "General Arthur Briggs (Ret.) provides counsel on physical security, sovereign compliance, and strategic defense frameworks for USDC. During his 35-year military career, Arthur commanded cybersecurity task forces and critical grid infrastructure protection operations. His expertise ensures USDC data campuses are resilient to physical, digital, and systemic threats, coordinating directly with regional regulatory bodies and federal compliance boards.",
      avatarStyle: "advisor",
      skills: [
        { name: "Physical Security", val: 98 },
        { name: "Federal Compliance", val: 95 },
        { name: "Grid Risk Management", val: 97 },
      ],
      telemetry: [
        { label: "DEFENSE CLEARANCE", value: "Class 1" },
        { label: "REGULATORY COMPL", value: "100%" },
        { label: "CAMPUSES AUDITED", value: "8 Sites" },
        { label: "RISK MITIGATION", value: "Proactive" },
      ],
    },
    {
      id: "sarah",
      name: "Sarah Jenkins",
      role: "Advisor, Renewable Capital",
      category: "advisors",
      status: "STANDBY",
      quote: "Accelerating AI does not require sacrificing our transition to clean energy.",
      bio: "Managing Partner at GreenEnergy Ventures. Structurer of over $2B in renewable energy PPA financing and green asset conversions.",
      fullBio: "Sarah Jenkins advises USDC on sustainable capital structuring, environmental markets, and green energy Power Purchase Agreements (PPAs). As a founding partner of GreenEnergy Ventures, Sarah has facilitated over $2 billion in clean energy funding across wind, solar, and geothermal projects. She advises USDC on tapping green finance avenues, securing carbon offset structures, and validating our sustainable operational claims.",
      avatarStyle: "advisor",
      skills: [
        { name: "Sustainable Financing", val: 98 },
        { name: "PPA Negotiation", val: 96 },
        { name: "Carbon Offsets", val: 90 },
      ],
      telemetry: [
        { label: "CAPITAL DIRECTED", value: "$2.4 B" },
        { label: "RENEWABLE PPAS", value: "15 PPAs" },
        { label: "CARBON OFFSET ACC", value: "1.4 M Tons" },
        { label: "ASSETS STRUCTURED", value: "1.2 GW" },
      ],
    },
  ];

  const filteredTeam = team.filter((member) => {
    if (activeTab === "all") return true;
    return member.category === activeTab;
  });

  const toggleCardMode = (memberId: string) => {
    setCardModes((prev) => ({
      ...prev,
      [memberId]: prev[memberId] === "telemetry" ? "bio" : "telemetry",
    }));
  };

  const getStatusColor = (status: TeamMember["status"]) => {
    switch (status) {
      case "ONLINE":
        return "bg-emerald-500 text-emerald-400 border-emerald-500/30";
      case "ENERGIZED":
        return "bg-cyan-500 text-cyan-400 border-cyan-500/30";
      case "ACTIVE":
        return "bg-blue-500 text-blue-400 border-blue-500/30";
      case "STANDBY":
        return "bg-amber-500 text-amber-400 border-amber-500/30";
    }
  };

  return (
    <section className="relative w-full py-20 bg-[#04070f] z-10 select-none">
      
      {/* Interactive canvas grid particles inside the section */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* ── HIGH TECH CONTROLS PANEL ── */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 border-b border-white/[0.06] pb-8 mb-16">
          <div className="flex flex-col items-start text-left">
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-black mb-2">
              USDC_CORE_TEAM_V4
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              Operational Directory
            </h2>
          </div>

          {/* Filtering Hub */}
          <div className="flex flex-wrap items-center gap-2 p-[2px] rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            {[
              { id: "all", label: "ALL COMMAND" },
              { id: "exec", label: "EXECUTIVE" },
              { id: "grid", label: "GRID & POWER" },
              { id: "engineering", label: "ENGINEERING" },
              { id: "advisors", label: "ADVISORY" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-[10px] font-bold font-mono rounded-lg transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                    : "text-white/40 hover:text-white/80 border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CORE TEAM GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredTeam.map((member) => {
            const isTelemetry = cardModes[member.id] === "telemetry";
            const isHovered = hoveredCard === member.id;

            return (
              <div
                key={member.id}
                onMouseEnter={() => setHoveredCard(member.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative p-[1.5px] rounded-[24px] bg-gradient-to-b from-white/[0.08] via-transparent to-white/[0.03] shadow-[0_15px_35px_rgba(0,0,0,0.45)] overflow-hidden transition-all duration-500 hover:translate-y-[-6px] flex flex-col"
              >
                {/* Neon glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(circle 220px at 50% 25%, rgba(6, 182, 212, 0.12), transparent 100%)`,
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                <div className="relative z-10 w-full h-full bg-[#03060d]/90 backdrop-blur-xl rounded-[22.5px] p-6 flex flex-col justify-between border border-white/[0.02] flex-grow">
                  
                  {/* Card HUD Header */}
                  <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(member.status).split(" ")[0]} animate-pulse`} />
                      <span className="text-[9px] font-mono text-white/30 tracking-wider">
                        SECURE_NODE: {member.id.toUpperCase()}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded border text-[8px] font-mono font-bold tracking-widest ${getStatusColor(member.status).split(" ").slice(1).join(" ")} bg-white/[0.01]`}>
                      {member.status}
                    </span>
                  </div>

                  {/* Top Profile (Avatars & Titles) */}
                  <div className="flex items-start gap-4 mb-5">
                    {/* Futuristic Animated SVG Avatars */}
                    <div className="w-[70px] h-[70px] rounded-2xl bg-white/[0.02] border border-white/[0.08] flex-shrink-0 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-500/35 transition-colors">
                      {renderSvgAvatar(member.avatarStyle, isHovered)}
                      
                      {/* Cyber grid overlays */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_94%,rgba(6,182,212,0.15)_95%,rgba(6,182,212,0.25)_98%)] bg-[size:100%_16px] pointer-events-none opacity-40 animate-[gridScan_8s_linear_infinite]" />
                    </div>

                    <div className="flex flex-col text-left">
                      <h3 className="text-lg font-black text-white tracking-tight leading-tight mb-1 group-hover:text-cyan-400 transition-colors">
                        {member.name}
                      </h3>
                      <span className="text-[11px] font-mono font-extrabold tracking-wide text-cyan-400 uppercase">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Mode Toggle (Bio vs Telemetry Stats) */}
                  <div className="flex items-center gap-1 p-[2px] rounded-lg bg-white/[0.02] border border-white/[0.06] mb-5">
                    <button
                      onClick={() => toggleCardMode(member.id)}
                      className={`flex-1 py-1 text-[9px] font-bold font-mono rounded transition-colors ${
                        !isTelemetry
                          ? "bg-white/[0.05] text-white"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      DOSSIER / BIO
                    </button>
                    <button
                      onClick={() => toggleCardMode(member.id)}
                      className={`flex-1 py-1 text-[9px] font-bold font-mono rounded transition-colors ${
                        isTelemetry
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      TELEMETRY
                    </button>
                  </div>

                  {/* Main Body Content area */}
                  <div className="flex-grow min-h-[135px]">
                    {!isTelemetry ? (
                      /* Dossier Bio Mode */
                      <div className="text-left flex flex-col justify-between h-full">
                        <p className="text-[12.5px] text-white/50 leading-relaxed font-normal mb-4 font-sans line-clamp-4">
                          {member.bio}
                        </p>
                        <div className="border-l border-cyan-500/20 pl-3 italic text-[11px] text-white/40 font-medium py-1">
                          &ldquo;{member.quote}&rdquo;
                        </div>
                      </div>
                    ) : (
                      /* Telemetry Stats Mode */
                      <div className="grid grid-cols-2 gap-4">
                        {member.telemetry.map((stat, idx) => (
                          <div
                            key={idx}
                            className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-3 flex flex-col items-start text-left"
                          >
                            <span className="text-[8px] font-mono tracking-widest text-white/30 uppercase mb-1">
                              {stat.label}
                            </span>
                            <span className="text-sm font-black text-white tracking-tight">
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Link Footer */}
                  <div className="border-t border-white/[0.05] pt-4 mt-5 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="group/btn text-[10px] font-mono font-bold text-white/60 hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>ACCESS FULL SYSTEM DOSSIER</span>
                      <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover/btn:translate-x-0.5 group-hover/btn:text-cyan-400 transition-all" />
                    </button>

                    <span className="text-[9px] font-mono text-white/20">
                      ID_{member.id.toUpperCase()}_v4
                    </span>
                  </div>

                  {/* Motherboard decorative corner brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 rounded-tl-[22px] pointer-events-none group-hover:border-cyan-500/30 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 rounded-br-[22px] pointer-events-none group-hover:border-cyan-500/30 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── SYSTEM DOSSIER MODAL OVERLAY ── */}
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
            <div className="relative w-full max-w-[800px] bg-[#02050c] border border-white/[0.08] rounded-[28px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(6,182,212,0.05)]">
              
              {/* Modal HUD Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06] bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase font-bold">
                    SYSTEM ACCESS: APPROVED // FILE_{selectedMember.id.toUpperCase()}_FULL
                  </span>
                </div>
                
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 text-white/60 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Core Contents */}
              <div className="p-8 md:p-10 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Avatar & Skills (4 cols) */}
                  <div className="md:col-span-4 flex flex-col items-center">
                    <div className="w-[140px] h-[140px] rounded-3xl bg-white/[0.02] border border-cyan-500/20 flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.05)]">
                      {renderSvgAvatar(selectedMember.avatarStyle, true, 110)}
                      
                      {/* Scanning laser line */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/60 shadow-[0_0_10px_#22d3ee] pointer-events-none animate-[scanline_3.5s_ease-in-out_infinite]" />
                    </div>

                    <span className="text-[9px] font-mono text-cyan-400 tracking-widest uppercase mt-4 mb-8">
                      BIOMETRIC STABLE
                    </span>

                    {/* Skill Meters */}
                    <div className="w-full space-y-4">
                      <h4 className="text-[9px] font-mono text-white/30 tracking-widest uppercase text-left">
                        TECHNICAL SKILL MATRIX
                      </h4>
                      <div className="space-y-3">
                        {selectedMember.skills.map((skill, idx) => (
                          <div key={idx} className="flex flex-col items-stretch">
                            <div className="flex items-center justify-between text-[11px] text-white/80 font-bold mb-1.5">
                              <span>{skill.name}</span>
                              <span className="font-mono text-cyan-400">{skill.val}%</span>
                            </div>
                            {/* Visual slider */}
                            <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                                style={{ width: `${skill.val}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Bio, Quote, Telemetry Details (8 cols) */}
                  <div className="md:col-span-8 flex flex-col items-start text-left">
                    <h3 className="text-3xl font-black text-white tracking-tight mb-1">
                      {selectedMember.name}
                    </h3>
                    <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase mb-6">
                      {selectedMember.role}
                    </span>

                    <div className="border-l-2 border-cyan-500 pl-4 py-1.5 italic text-sm text-white/60 font-medium mb-6">
                      &ldquo;{selectedMember.quote}&rdquo;
                    </div>

                    <div className="text-[13.5px] text-white/50 leading-relaxed font-normal mb-8 space-y-4">
                      <p>{selectedMember.fullBio}</p>
                    </div>

                    {/* Telemetry HUD Grid */}
                    <h4 className="text-[9px] font-mono text-white/30 tracking-widest uppercase mb-4">
                      SYSTEM TELEMETRY METRICS
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {selectedMember.telemetry.map((stat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04]"
                        >
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                            {renderTelemetryIcon(idx)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[8px] font-mono tracking-widest text-white/30 uppercase leading-none mb-1">
                              {stat.label}
                            </span>
                            <span className="text-sm font-black text-white tracking-wide">
                              {stat.value}
                            </span>
                          </div>
                        </div>
                      ))}`
                    </div>
                  </div>

                </div>
              </div>

              {/* Decorative Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500 rounded-tl-[28px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500 rounded-br-[28px] pointer-events-none" />
            </div>
          </div>
        )}
      </div>
    </section>
    );
  }

  // Telemetry icons renderer
  function renderTelemetryIcon(idx: number) {
    switch (idx) {
      case 0:
        return <Zap className="w-4 h-4" />;
      case 1:
        return <BarChart3 className="w-4 h-4" />;
      case 2:
        return <Database className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  }

  // Custom Animated SVG Avatars
  function renderSvgAvatar(style: string, active: boolean, size = 52) {
    const activeColor = "rgba(34, 211, 238, 1)"; // cyan-400
    const idleColor = "rgba(255, 255, 255, 0.25)";
    const color = active ? activeColor : idleColor;
    
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-500"
      >
        {/* Background circuit grid */}
        <path d="M10 20 H90 M10 40 H90 M10 60 H90 M10 80 H90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <path d="M20 10 V90 M40 10 V90 M60 10 V90 M80 10 V90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        
        {/* Border HUD crosshairs */}
        <circle cx="50" cy="50" r="46" stroke={active ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.02)"} strokeWidth="1.5" />
        
        {style === "director" && (
          <>
            {/* Directing Leader Concept - Hexagon & Nodes */}
            <polygon
              points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5"
              stroke={color}
              strokeWidth="2"
              className={active ? "animate-[spin_20s_linear_infinite]" : ""}
              style={{ transformOrigin: "50px 50px" }}
            />
            <polygon
              points="50,23 73,36 73,64 50,77 27,64 27,36"
              stroke={active ? "rgba(6,182,212,0.4)" : "rgba(255,255,255,0.08)"}
              strokeWidth="1"
              className={active ? "animate-[spin_10s_linear_infinite_reverse]" : ""}
              style={{ transformOrigin: "50px 50px" }}
            />
            <circle cx="50" cy="50" r="10" stroke={color} strokeWidth="2" />
            <circle cx="50" cy="15" r="4" fill={color} />
            <circle cx="80" cy="32.5" r="4" fill={color} />
            <circle cx="80" cy="67.5" r="4" fill={color} />
            <circle cx="50" cy="85" r="4" fill={color} />
            <circle cx="20" cy="67.5" r="4" fill={color} />
            <circle cx="20" cy="32.5" r="4" fill={color} />
          </>
        )}

        {style === "engineer" && (
          <>
            {/* Systems Engineer - Target Matrix and Silicon Lines */}
            <circle
              cx="50"
              cy="50"
              r="34"
              stroke={color}
              strokeWidth="2"
              strokeDasharray="4 8 16 8"
              className={active ? "animate-[spin_12s_linear_infinite]" : ""}
              style={{ transformOrigin: "50px 50px" }}
            />
            {/* Silicon interconnect gates */}
            <line x1="50" y1="16" x2="50" y2="84" stroke={color} strokeWidth="1.5" />
            <line x1="16" y1="50" x2="84" y2="50" stroke={color} strokeWidth="1.5" />
            <rect x="42" y="42" width="16" height="16" stroke={color} strokeWidth="2.5" fill="#02050c" />
            <rect x="46" y="46" width="8" height="8" fill={active ? "cyan" : "rgba(255,255,255,0.2)"} className={active ? "animate-pulse" : ""} />
            <circle cx="50" cy="28" r="3.5" fill={color} />
            <circle cx="50" cy="72" r="3.5" fill={color} />
            <circle cx="28" cy="50" r="3.5" fill={color} />
            <circle cx="72" cy="50" r="3.5" fill={color} />
          </>
        )}

        {style === "operations" && (
          <>
            {/* Operations - Interconnecting Grid Nodes */}
            <circle cx="50" cy="50" r="14" stroke={color} strokeWidth="2.5" />
            {/* Outer revolving orbital circles */}
            <path d="M 50 12 A 38 38 0 0 1 88 50" stroke={color} strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 50 88 A 38 38 0 0 1 12 50" stroke={color} strokeWidth="2" strokeDasharray="3 3" />
            
            {/* Node junctions */}
            <circle cx="50" cy="12" r="4.5" fill={color} />
            <line x1="50" y1="12" x2="50" y2="36" stroke={color} strokeWidth="1.5" />
            
            <circle cx="88" cy="50" r="4.5" fill={color} />
            <line x1="88" y1="50" x2="64" y2="50" stroke={color} strokeWidth="1.5" />
            
            <circle cx="50" cy="88" r="4.5" fill={color} />
            <line x1="50" y1="88" x2="50" y2="64" stroke={color} strokeWidth="1.5" />
            
            <circle cx="12" cy="50" r="4.5" fill={color} />
            <line x1="12" y1="50" x2="36" y2="50" stroke={color} strokeWidth="1.5" />
          </>
        )}

        {style === "advisor" && (
          <>
            {/* Strategic Advisors - Multi-layered Concentric Shields */}
            <circle
              cx="50"
              cy="50"
              r="38"
              stroke={color}
              strokeWidth="1.5"
              strokeDasharray="40 10 40 10"
              className={active ? "animate-[spin_25s_linear_infinite]" : ""}
              style={{ transformOrigin: "50px 50px" }}
            />
            <circle
              cx="50"
              cy="50"
              r="28"
              stroke={color}
              strokeWidth="2.5"
              strokeDasharray="12 6"
              className={active ? "animate-[spin_15s_linear_infinite_reverse]" : ""}
              style={{ transformOrigin: "50px 50px" }}
            />
            <polygon points="50,40 58,56 42,56" fill={color} />
            <circle cx="50" cy="50" r="16" stroke={active ? "rgba(6,182,212,0.4)" : "rgba(255,255,255,0.06)"} strokeWidth="1" />
          </>
        )}
      </svg>
    );
  }
