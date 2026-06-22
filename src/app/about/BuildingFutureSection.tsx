"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BuildingFutureSection() {
  return (
    <section className="w-full bg-[#04070f] py-20 md:py-28 text-white select-none overflow-hidden relative border-t border-white/[0.03]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-sky-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Left Column: Isometric Glowing Wireframe Stack SVG ── */}
          <div className="lg:col-span-6 flex items-center justify-center relative pt-10">
            <div className="w-full max-w-[420px] md:max-w-[480px] aspect-square flex items-center justify-center">
              <svg
                viewBox="0 0 500 550"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-contain"
              >
                {/* ── Floor Projection Dotted Lines ── */}
                <line x1="250" y1="460" x2="130" y2="520" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="4 4" />
                <line x1="250" y1="460" x2="370" y2="520" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="4 4" />
                
                {/* Blue projection dots */}
                <circle cx="130" cy="520" r="5" fill="#3daeff" stroke="#04070f" strokeWidth="1.5" />
                <circle cx="370" cy="520" r="5" fill="#3daeff" stroke="#04070f" strokeWidth="1.5" />

                {/* ── Transparent Wireframe Cube ── */}
                {/* Cube Top Face */}
                <polygon points="250,220 370,280 250,340 130,280" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" fill="none" />
                {/* Cube Back Vertical (Dotted) */}
                <line x1="250" y1="220" x2="250" y2="400" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" strokeDasharray="3 3" />
                {/* Cube Bottom Back Edges (Dotted) */}
                <line x1="130" y1="400" x2="250" y2="460" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" strokeDasharray="3 3" />
                <line x1="370" y1="400" x2="250" y2="460" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" strokeDasharray="3 3" />
                
                {/* Cube Outer Verticals */}
                <line x1="130" y1="280" x2="130" y2="460" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
                <line x1="250" y1="340" x2="250" y2="520" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                <line x1="370" y1="280" x2="370" y2="460" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
                
                {/* Cube Front Bottom Edges */}
                <line x1="130" y1="460" x2="250" y2="520" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                <line x1="370" y1="460" x2="250" y2="520" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

                {/* ── Vertical Hanging Slabs/Plates inside Cube ── */}
                {/* Slab 3 (Backmost/Right) */}
                <polygon
                  points="290,265 315,252 315,395 290,408"
                  fill="rgba(61,174,255,0.03)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.2"
                />
                
                {/* Slab 2 (Center) */}
                <polygon
                  points="260,250 285,237 285,380 260,393"
                  fill="rgba(61,174,255,0.06)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                
                {/* Slab 1 (Frontmost/Left) */}
                <polygon
                  points="230,235 255,222 255,365 230,378"
                  fill="rgba(61,174,255,0.12)"
                  stroke="#3daeff"
                  strokeWidth="1.5"
                />

                {/* ── Platform 4 (Bottom-most Stack Plate) ── */}
                <polygon points="250,225 370,165 250,105 130,165" fill="#03050a" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
                <polygon points="130,165 250,225 250,233 130,173" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
                <polygon points="250,225 370,165 370,173 250,233" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />

                {/* ── Platform 3 (Blue Dotted Middle Plate) ── */}
                <polygon points="250,200 370,140 250,80 130,140" fill="rgba(61,174,255,0.06)" stroke="#3daeff" strokeWidth="1.5" strokeDasharray="3 3" />
                <polygon points="130,140 250,200 250,206 130,146" fill="rgba(61,174,255,0.09)" stroke="#3daeff" strokeWidth="1.5" strokeDasharray="3 3" />
                <polygon points="250,200 370,140 370,146 250,206" fill="rgba(61,174,255,0.12)" stroke="#3daeff" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* ── Platform 2 (Second Stack Plate) ── */}
                <polygon points="250,175 370,115 250,55 130,115" fill="#03050a" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
                <polygon points="130,115 250,175 250,183 130,123" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
                <polygon points="250,175 370,115 370,123 250,183" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />

                {/* ── Platform 1 (Top Stack Plate) ── */}
                <polygon points="250,150 370,90 250,30 130,90" fill="#03050a" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <polygon points="130,90 250,150 250,158 130,98" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <polygon points="250,150 370,90 370,98 250,158" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* ── Right Column: Clean Copy & Action Button ── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Title Heading */}
            <h2 className="text-[40px] md:text-[50px] font-bold tracking-tight text-white leading-[1.1] mb-6 font-sans">
              Building the <span className="text-[#3daeff]">future</span> <br />
              from day one
            </h2>

            {/* Paragraph Subtitle Description */}
            <p className="text-[15px] md:text-[16px] text-white/50 font-normal leading-[1.75] max-w-[540px] mb-8 font-sans">
              Lorem ipsum dolor sit amet consectetur nec scelerisque nibh
              volutpat ante a enim augue sed tincidunt pellentesque amet
              blandit egestas morbi quam ornare neque ac sit quis in a elit vel
              ac euismod vitae cras nunc elit fringilla tempor ornare ridiculus
              velit viverra pretium et tellus sit sed cras vulputate.
            </p>

            {/* Blue Action Button */}
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#3daeff] hover:bg-[#52b9ff] text-white text-[13px] font-bold rounded-lg transition-all duration-200"
            >
              <span>Join our team</span>
              <ChevronRight className="w-4 h-4 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
