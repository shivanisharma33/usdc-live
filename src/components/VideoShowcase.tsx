"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full pt-0 md:pt-0 pb-10 md:pb-16 bg-[#04070f] overflow-hidden select-none">
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-blue-600/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {/* ── Main Outer Card Container (Reference Layout Structure) ── */}
        <div className="w-full rounded-[24px] sm:rounded-[32px] border border-white/[0.08] bg-gradient-to-br from-[#070c1a]/90 via-[#050914]/95 to-[#02050c]/90 backdrop-blur-2xl p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.05)] grid grid-cols-1 lg:grid-cols-[0.85fr_1.35fr] gap-8 md:gap-10 lg:gap-12 xl:gap-14 items-center">
          
          {/* ── Left Column: Text + Badges + Buttons ── */}
          <div className="flex flex-col items-start text-left">
            {/* Category / Sub-badge */}
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.25em] text-[#3daeff] uppercase mb-3">
              COLUMBIANA, ALABAMA CAMPUS
            </span>

            {/* Title from Michael Clark Sir */}
            <h2 className="text-xl sm:text-2xl md:text-[25px] lg:text-[28px] font-extrabold text-white leading-[1.25] tracking-tight uppercase mb-4">
              Inside the Company’s AI Infrastructure Campus in <span className="text-[#3daeff]">Columbiana, Alabama</span>
            </h2>

            {/* Blue Accent Underline Line */}
            <div className="w-16 h-[3px] bg-[#3daeff] rounded-full mb-5 shadow-[0_0_10px_rgba(61,174,255,0.6)]" />

            {/* Subheading + Body Copy from Michael Clark Sir */}
            <p className="text-white/90 text-[13.5px] sm:text-[14.5px] font-semibold leading-relaxed mb-3">
              Purpose-built for the next generation of high-performance computing and artificial intelligence.
            </p>
            <p className="text-[#a0aec0] text-[13px] sm:text-[13.5px] leading-[1.75] font-normal max-w-xl">
              The deployment features DigiPower X’s modular ARMS 200 infrastructure, engineered to support NVIDIA B300 GPUs with advanced direct-to-chip liquid cooling, high-density power delivery, resilient infrastructure and modular scalability.
            </p>
          </div>

          {/* ── Right Column: Video Container ── */}
          <div className="relative w-full">
            <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-[20px] sm:rounded-[24px] overflow-hidden border-2 border-[#3daeff] shadow-[0_0_45px_rgba(61,174,255,0.28),0_15px_40px_rgba(0,0,0,0.85)] group bg-black">
              
              {/* Main Video Element */}
              <video
                ref={videoRef}
                src="/USDC%20changes.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Controls Bar Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-5 pointer-events-none">
                <button
                  onClick={togglePlay}
                  className="pointer-events-auto p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-[#3daeff] hover:border-[#3daeff] transition-all cursor-pointer"
                  title={isPlaying ? "Pause Video" : "Play Video"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="pointer-events-auto p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-[#3daeff] hover:border-[#3daeff] transition-all cursor-pointer flex items-center gap-2"
                  title={isMuted ? "Unmute Audio" : "Mute Audio"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-white/70" /> : <Volume2 className="w-4 h-4 text-[#3daeff]" />}
                </button>
              </div>

              {/* Play Badge (Top Right) */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#3daeff] animate-ping" />
                <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase">Columbiana 3D Deployment</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
