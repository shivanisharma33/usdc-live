"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

/* ═══════════════════════ ContactSection Component ═══════════════════════ */

export default function ContactSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Action handler
  };

  const contactDetails = [
    {
      label: "EMAIL US",
      value: "HELLO@USDC.COM",
      icon: <Mail className="w-4 h-4 text-white" strokeWidth={2.5} />,
    },
    {
      label: "CALL US",
      value: "(555) 123-4567",
      icon: <Phone className="w-4 h-4 text-white" strokeWidth={2.5} />,
    },
    {
      label: "USDC HEADQUARTERS",
      value: "218 NW 24TH ST 2ND FL, MIAMI, FL 33127",
      icon: <MapPin className="w-4 h-4 text-white" strokeWidth={2.5} />,
    },
  ];

  return (
    <section
      id="contact-section"
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#04070f] py-20 md:py-28"
    >
      {/* ── Ambient Glows ── */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-5%] w-[450px] h-[450px] bg-blue-600/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* ── Top decorative line ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

      <div className="relative z-10 w-full max-w-[1140px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* ── Main Container Box ── */}
        <div
          className="w-full rounded-[24px] bg-[#eaeef6] border border-white/[0.08] p-6 sm:p-10 md:p-12 lg:p-14 shadow-[0_10px_50px_rgba(0,0,0,0.3)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch"
          style={fadeUp(0)}
        >
          
          {/* ══════ LEFT COLUMN — Form Card ══════ */}
          <div
            className="lg:col-span-6 rounded-2xl bg-[#d3d8df] border border-black/[0.04] p-6 sm:p-8 flex flex-col justify-between shadow-inner"
            style={fadeUp(100)}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
              
              {/* First Name & Last Name (Grid Column) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-black/65 tracking-wider uppercase">
                    FIRST NAME (required)
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-black/15 py-1 text-[11px] text-black font-extrabold outline-none focus:border-[#0091ff] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-black/65 tracking-wider uppercase">
                    LAST NAME (required)
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-black/15 py-1 text-[11px] text-black font-extrabold outline-none focus:border-[#0091ff] transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-black/65 tracking-wider uppercase">
                  EMAIL ADDRESS (required)
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border-b border-black/15 py-1 text-[11px] text-black font-extrabold outline-none focus:border-[#0091ff] transition-colors"
                />
              </div>

              {/* Message Block */}
              <div className="flex flex-col gap-1.5 relative mb-2">
                <label className="text-[9px] font-black text-black/65 tracking-wider uppercase">
                  MESSAGE (required)
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-black/15 py-1 text-[11px] text-black font-extrabold outline-none focus:border-[#0091ff] resize-none transition-colors pr-6"
                />
                {/* Decorative resize lines handle at bottom right */}
                <span className="absolute bottom-2.5 right-0 flex flex-col items-end gap-[2px] pointer-events-none opacity-30">
                  <span className="w-3.5 h-[1px] bg-black rotate-[-45deg] origin-bottom-right" />
                  <span className="w-2 h-[1px] bg-black rotate-[-45deg] origin-bottom-right" />
                </span>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#0a0f1d] hover:bg-[#121a30] text-white text-[10.5px] font-black tracking-[0.2em] flex items-center justify-center gap-2.5 shadow-[0_4.5px_0_#3daeff] active:shadow-[0_1.5px_0_#3daeff] active:translate-y-[3px] transition-all cursor-pointer"
              >
                <span>SEND MESSAGE</span>
                <Send className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>

            </form>
          </div>

          {/* ══════ RIGHT COLUMN — Details ══════ */}
          <div
            className="lg:col-span-6 flex flex-col justify-between gap-8 py-2"
            style={fadeUp(180)}
          >
            <div>
              {/* Connect Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#0091ff] to-[#3daeff] text-white shadow-sm mb-6 w-fit">
                <span className="w-4 h-[1.5px] bg-white rounded-full" />
                <span className="text-[8.5px] font-black tracking-[0.25em] uppercase">
                  CONNECT WITH US
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-[34px] sm:text-[42px] font-extrabold tracking-tight leading-[1.1] text-[#080d1a] mb-5">
                Let&apos;s build <br />
                <span className="text-[#0091ff]">something great.</span>
              </h2>

              {/* Excerpt */}
              <p className="text-[12px] md:text-[13px] text-black/55 max-w-[440px] leading-[1.8] font-normal">
                Whether you&apos;re interested in asset conversion, partnerships, or our technology, our team is ready to assist you.
              </p>
            </div>

            {/* Info Capsules */}
            <div className="flex flex-col gap-4">
              {contactDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="w-full rounded-2xl border border-black/[0.06] bg-[#dbe0e7]/65 backdrop-blur-sm p-4 flex items-center gap-4 shadow-[0_4px_15px_rgba(0,0,0,0.015)] hover:bg-[#dbe0e7]/80 transition-colors"
                >
                  {/* Black Circle Icon Box */}
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0a0f1d] flex-shrink-0">
                    {detail.icon}
                  </div>
                  
                  {/* Info Text */}
                  <div className="flex flex-col">
                    <span className="text-[8.5px] font-bold text-black/40 tracking-[0.12em] uppercase leading-none mb-1">
                      {detail.label}
                    </span>
                    <span className="text-[11px] font-black text-black/80 tracking-wide uppercase leading-tight">
                      {detail.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* ── Bottom decorative line ── */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
}
