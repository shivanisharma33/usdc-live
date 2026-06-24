"use client";

import React, { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   1. LAYER 1: GENERATION ASSETS CANVAS
   ────────────────────────────────────────────────────────────────────────── */
function GenerationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 300;
      height = rect.height || 220;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.45;
      const floatOffset = Math.sin(time * 0.002) * 4;

      // Base grid / ground line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 120, cy + 60);
      ctx.lineTo(cx + 120, cy + 60);
      ctx.stroke();

      // Subtle support grid lines
      ctx.strokeStyle = "rgba(0, 145, 255, 0.02)";
      for (let i = -4; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * 25 - 20, cy + 60);
        ctx.lineTo(cx + i * 25 + 20, cy + 85);
        ctx.stroke();
      }

      // --- TRANSMISSION TOWER (Left side) ---
      const tx = cx - 50;
      const ty = cy - 40 + floatOffset;
      const tHeight = 90;
      const bottomY = cy + 60;

      // Outer structure / legs
      ctx.strokeStyle = "rgba(61, 174, 255, 0.5)";
      ctx.lineWidth = 1.25;

      // Left leg
      ctx.beginPath();
      ctx.moveTo(tx - 26, bottomY);
      ctx.lineTo(tx - 6, ty);
      ctx.stroke();

      // Right leg
      ctx.beginPath();
      ctx.moveTo(tx + 26, bottomY);
      ctx.lineTo(tx + 6, ty);
      ctx.stroke();

      // Center spine
      ctx.beginPath();
      ctx.moveTo(tx, bottomY);
      ctx.lineTo(tx, ty);
      ctx.stroke();

      // Horizontal cross beams
      const beamY = [bottomY - 18, bottomY - 36, bottomY - 54, bottomY - 72];
      const beamW = [42, 30, 20, 12];
      
      beamY.forEach((by, idx) => {
        const w = beamW[idx];
        ctx.beginPath();
        ctx.moveTo(tx - w / 2, by);
        ctx.lineTo(tx + w / 2, by);
        ctx.stroke();
      });

      // Diagonal cross-bracing (Lattice)
      ctx.strokeStyle = "rgba(61, 174, 255, 0.25)";
      ctx.beginPath();
      // Section 1
      ctx.moveTo(tx - 26, bottomY); ctx.lineTo(tx + 21, beamY[0]);
      ctx.moveTo(tx + 26, bottomY); ctx.lineTo(tx - 21, beamY[0]);
      // Section 2
      ctx.moveTo(tx - 21, beamY[0]); ctx.lineTo(tx + 15, beamY[1]);
      ctx.moveTo(tx + 21, beamY[0]); ctx.lineTo(tx - 15, beamY[1]);
      // Section 3
      ctx.moveTo(tx - 15, beamY[1]); ctx.lineTo(tx + 10, beamY[2]);
      ctx.moveTo(tx + 15, beamY[1]); ctx.lineTo(tx - 10, beamY[2]);
      // Section 4
      ctx.moveTo(tx - 10, beamY[2]); ctx.lineTo(tx + 6, beamY[3]);
      ctx.moveTo(tx + 10, beamY[2]); ctx.lineTo(tx - 6, beamY[3]);
      ctx.stroke();

      // Cross arms for wire support
      ctx.strokeStyle = "rgba(61, 174, 255, 0.6)";
      ctx.lineWidth = 1.5;
      
      // Upper arm
      const arm1Y = beamY[2];
      ctx.beginPath();
      ctx.moveTo(tx - 32, arm1Y);
      ctx.lineTo(tx + 32, arm1Y);
      ctx.stroke();

      // Lower arm
      const arm2Y = beamY[1];
      ctx.beginPath();
      ctx.moveTo(tx - 38, arm2Y);
      ctx.lineTo(tx + 38, arm2Y);
      ctx.stroke();

      // Insulator strings hanging from arms
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 1;
      const tips = [
        { x: tx - 32, y: arm1Y },
        { x: tx + 32, y: arm1Y },
        { x: tx - 38, y: arm2Y },
        { x: tx + 38, y: arm2Y }
      ];

      tips.forEach((tip) => {
        ctx.beginPath();
        ctx.moveTo(tip.x, tip.y);
        ctx.lineTo(tip.x, tip.y + 12);
        ctx.stroke();

        // Insulator cups
        ctx.fillStyle = "rgba(0, 145, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(tip.x, tip.y + 6, 2, 0, Math.PI * 2);
        ctx.arc(tip.x, tip.y + 12, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- GENERATOR CABINET (Right side) ---
      const bx = cx + 45;
      const by = cy + 18 + floatOffset;
      const bW = 46;
      const bH = 42;

      // Glow effect under hover
      if (hovered) {
        ctx.shadowColor = "rgba(0, 145, 255, 0.35)";
        ctx.shadowBlur = 12;
      }

      // Generator outer shell
      ctx.fillStyle = "rgba(4, 7, 15, 0.9)";
      ctx.strokeStyle = "rgba(0, 145, 255, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(bx, by, bW, bH, 4);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Air vents or details on cabinet
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(bx + 6, by + 10 + i * 5);
        ctx.lineTo(bx + 18, by + 10 + i * 5);
        ctx.stroke();
      }

      // Lightning bolt icon inside cabinet
      const pulseSpeed = hovered ? 0.008 : 0.004;
      const boltIntensity = 0.5 + 0.5 * Math.sin(time * pulseSpeed);
      ctx.shadowColor = "#0091ff";
      ctx.shadowBlur = 6 * boltIntensity;
      ctx.fillStyle = `rgba(61, 174, 255, ${0.4 + 0.6 * boltIntensity})`;
      
      ctx.beginPath();
      ctx.moveTo(bx + 30, by + 10);
      ctx.lineTo(bx + 20, by + 24);
      ctx.lineTo(bx + 27, by + 24);
      ctx.lineTo(bx + 24, by + 34);
      ctx.lineTo(bx + 34, by + 20);
      ctx.lineTo(bx + 27, by + 20);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      // --- CABLES & ENERGY FLOWS ---
      // Curved cable hanging between tower and cabinet
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1;
      const startX = tx + 38;
      const startY = arm2Y + 12;
      const endX = bx;
      const endY = by + 15;
      
      // Control point for quadratic curve
      const cpX = (startX + endX) / 2;
      const cpY = Math.max(startY, endY) + 20;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(cpX, cpY, endX, endY);
      ctx.stroke();

      // Energy pulse flowing along the cable
      const flowRate = hovered ? 0.002 : 0.001;
      const progress = (time * flowRate) % 1.0;

      // Get point along quadratic curve
      const getQuadPoint = (t: number) => {
        const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * cpX + t * t * endX;
        const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * cpY + t * t * endY;
        return { x, y };
      };

      ctx.shadowColor = "#3daeff";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#ffffff";
      
      // Draw 2 pulsing particles
      [0, 0.5].forEach((offset) => {
        const p = (progress + offset) % 1.0;
        const pos = getQuadPoint(p);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [hovered]);

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full h-[220px] block cursor-pointer transition-all duration-300"
    />
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   2. LAYER 2: TRANSFORMATION CANVAS
   ────────────────────────────────────────────────────────────────────────── */
function TransformationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 300;
      height = rect.height || 220;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.45;
      const floatOffset = Math.sin(time * 0.0018) * 4;
      const bottomY = cy + 60;

      // Base grid / ground line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 120, bottomY);
      ctx.lineTo(cx + 120, bottomY);
      ctx.stroke();

      // --- SUBSTATION TRANSFORMER (Center-left) ---
      const tx = cx - 35;
      const ty = cy + 12 + floatOffset;
      const tW = 60;
      const tH = 48;

      if (hovered) {
        ctx.shadowColor = "rgba(0, 145, 255, 0.28)";
        ctx.shadowBlur = 10;
      }

      // Transformer body tank
      ctx.fillStyle = "rgba(4, 7, 15, 0.9)";
      ctx.strokeStyle = "rgba(0, 145, 255, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(tx, ty, tW, tH, 3);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Radiator cooling fins (vertical grill pattern on front)
      ctx.strokeStyle = "rgba(61, 174, 255, 0.3)";
      ctx.lineWidth = 1;
      const finCount = 7;
      const finSpacing = tW / (finCount + 1);
      for (let i = 1; i <= finCount; i++) {
        ctx.beginPath();
        ctx.moveTo(tx + i * finSpacing, ty + 8);
        ctx.lineTo(tx + i * finSpacing, ty + tH - 8);
        ctx.stroke();
      }

      // High voltage bushings (top connectors)
      ctx.strokeStyle = "rgba(61, 174, 255, 0.65)";
      ctx.lineWidth = 1.5;
      const bX = [tx + 18, tx + 42];
      const bHeight = 18;

      bX.forEach((x) => {
        // Main connector rod
        ctx.beginPath();
        ctx.moveTo(x, ty);
        ctx.lineTo(x, ty - bHeight);
        ctx.stroke();

        // Bushing ribs
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1;
        for (let j = 0; j < 3; j++) {
          const ribY = ty - 4 - j * 5;
          ctx.beginPath();
          ctx.moveTo(x - 4, ribY);
          ctx.lineTo(x + 4, ribY);
          ctx.stroke();
        }

        // Top terminal tip
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x, ty - bHeight, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(61, 174, 255, 0.65)";
      });

      // --- AUXILIARY CABINET (Right side) ---
      const bx = cx + 45;
      const by = cy + 18 + floatOffset;
      const bW = 35;
      const bH = 42;

      // Cabinet body
      ctx.fillStyle = "rgba(4, 7, 15, 0.9)";
      ctx.strokeStyle = "rgba(0, 145, 255, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(bx, by, bW, bH, 4);
      ctx.fill();
      ctx.stroke();

      // Cabinet bolt symbol
      const pulseSpeed = hovered ? 0.007 : 0.0035;
      const boltIntensity = 0.5 + 0.5 * Math.sin(time * pulseSpeed);
      ctx.shadowColor = "#0091ff";
      ctx.shadowBlur = 6 * boltIntensity;
      ctx.fillStyle = `rgba(61, 174, 255, ${0.4 + 0.6 * boltIntensity})`;

      ctx.beginPath();
      ctx.moveTo(bx + 20, by + 10);
      ctx.lineTo(bx + 12, by + 22);
      ctx.lineTo(bx + 17, by + 22);
      ctx.lineTo(bx + 14, by + 32);
      ctx.lineTo(bx + 22, by + 18);
      ctx.lineTo(bx + 17, by + 18);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      // --- CONNECTOR LINE & FLOW ---
      const startX = tx + tW;
      const startY = ty + tH / 2;
      const endX = bx;
      const endY = by + bH / 2;

      // Straight connector line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Pulsing node moving along connector
      const flowRate = hovered ? 0.003 : 0.0015;
      const progress = (time * flowRate) % 1.0;
      const px = startX + (endX - startX) * progress;

      ctx.shadowColor = "#3daeff";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(px, startY, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [hovered]);

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full h-[220px] block cursor-pointer transition-all duration-300"
    />
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. LAYER 3: COMPUTE DELIVERY CANVAS
   ────────────────────────────────────────────────────────────────────────── */
function ComputeDeliveryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 300;
      height = rect.height || 220;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.45;
      const floatOffset = Math.sin(time * 0.0015) * 4;
      const bottomY = cy + 60;

      // Base grid / ground line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 120, bottomY);
      ctx.lineTo(cx + 120, bottomY);
      ctx.stroke();

      // --- THREE SERVER RACKS SIDE-BY-SIDE ---
      const rackW = 32;
      const rackH = 75;
      const rackSpacing = 16;
      const startX = cx - (rackW * 3 + rackSpacing * 2) / 2;
      const ry = bottomY - rackH;

      for (let r = 0; r < 3; r++) {
        const rx = startX + r * (rackW + rackSpacing);
        const yOffset = floatOffset * (1 + r * 0.1);

        if (hovered) {
          ctx.shadowColor = "rgba(0, 145, 255, 0.2)";
          ctx.shadowBlur = 8;
        }

        // Rack cabinet frame
        ctx.fillStyle = "rgba(4, 7, 15, 0.92)";
        ctx.strokeStyle = "rgba(0, 145, 255, 0.45)";
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.roundRect(rx, ry + yOffset, rackW, rackH, 3);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw server blades (horizontal slots) inside cabinet
        const bladeCount = 8;
        const bladeH = (rackH - 12) / bladeCount;
        
        for (let b = 0; b < bladeCount; b++) {
          const by = ry + yOffset + 6 + b * bladeH;

          // Blade divider lines
          ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
          ctx.beginPath();
          ctx.moveTo(rx + 2, by + bladeH);
          ctx.lineTo(rx + rackW - 2, by + bladeH);
          ctx.stroke();

          // Server slot detail lines
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.beginPath();
          ctx.moveTo(rx + 4, by + bladeH / 2);
          ctx.lineTo(rx + 16, by + bladeH / 2);
          ctx.stroke();

          // Random flickering LEDs on the right side of the blade
          const blinkRate = hovered ? 0.015 : 0.007;
          const noise = Math.sin(time * blinkRate + r * 20 + b * 13);
          
          if (noise > 0.0) {
            ctx.fillStyle = "rgba(0, 145, 255, 0.85)";
            ctx.shadowColor = "#3daeff";
            ctx.shadowBlur = hovered ? 6 : 4;
            
            // Draw a small indicator LED dot
            ctx.beginPath();
            ctx.arc(rx + rackW - 6, by + bladeH / 2, 1.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        // Compute light sweep (activity scanning line) running down the rack
        const sweepSpeed = hovered ? 0.08 : 0.04;
        const sweepPos = ((time * sweepSpeed + r * 15) % rackH);
        const sweepY = ry + yOffset + sweepPos;

        // Glowing horizontal line sweep
        if (sweepPos > 2 && sweepPos < rackH - 2) {
          ctx.strokeStyle = "rgba(61, 174, 255, 0.7)";
          ctx.shadowColor = "#3daeff";
          ctx.shadowBlur = 6;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(rx + 2, sweepY);
          ctx.lineTo(rx + rackW - 2, sweepY);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [hovered]);

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full h-[220px] block cursor-pointer transition-all duration-300"
    />
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MAIN WRAPPER COMPONENT: EnergyStackGrid
   ────────────────────────────────────────────────────────────────────────── */
export default function EnergyStackGrid() {
  const columns = [
    {
      badge: "LAYER 1",
      title: "GENERATION ASSETS",
      CanvasComponent: GenerationCanvas,
      desc: "Owned power generation secures our foundation, shielding operations from market volatility and eliminating utility-queue bottlenecks.",
      bullets: [
        "Natural gas & renewable integration",
        "80MW+ base capacity scaling to 400MW+",
        "Insulated from grid pricing spikes",
        "Modular generator expansion capabilities"
      ]
    },
    {
      badge: "LAYER 2",
      title: "TRANSFORMATION",
      CanvasComponent: TransformationCanvas,
      desc: "Strategic substation control provides the high-voltage gateway necessary for rapid, large-scale data center deployment.",
      bullets: [
        "Direct high-voltage grid interconnection",
        "Redundant transformer architecture",
        "Tier III equivalent reliability path",
        "Optimized transmission line efficiency"
      ]
    },
    {
      badge: "LAYER 3",
      title: "COMPUTE DELIVERY",
      CanvasComponent: ComputeDeliveryCanvas,
      desc: "We convert raw energy into the highest-margin output: compute-ready capacity optimized for intensive AI workloads.",
      bullets: [
        "High-density rack power architecture",
        "Advanced liquid cooling readiness",
        "Maximized compute-per-megawatt ratio",
        "Flexible colocation & bare-metal deployment"
      ]
    }
  ];

  return (
    <section className="w-full bg-[#04070f] py-16 md:py-24 border-t border-white/[0.03]">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        
        {/* Centered Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
          <span className="text-[10px] font-semibold text-white/90 tracking-[0.25em] uppercase font-sans">
            ENERGY STACK LAYERS
          </span>
        </div>

        {/* Centered Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 font-sans text-center max-w-[800px] leading-[1.12]">
          Powering Compute <br className="sm:hidden" /> From The Ground Up.
        </h2>

        {/* Muted Subdescription */}
        <p className="text-[14px] md:text-[15px] text-white/50 leading-[1.8] max-w-[780px] text-center mb-16 font-sans">
          In the high-density computing era, energy is the ultimate currency. We don't just secure power – we generate it, transform it, and deliver it to the rack with unmatched efficiency and scale.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1160px] mx-auto">
          {columns.map((col) => {
            const Canvas = col.CanvasComponent;
            return (
              <div
                key={col.title}
                className="relative group overflow-hidden h-[480px] flex flex-col justify-between border border-white/[0.08] hover:border-[#0091ff]/30 rounded-2xl bg-[#02050c]/25 backdrop-blur-md transition-all duration-500 hover:shadow-[0_4px_30px_rgba(0,145,255,0.06)]"
              >
                {/* Upper Half: Header & Canvas */}
                <div className="flex flex-col justify-between h-[370px] w-full">
                  {/* 1. Header Section */}
                  <div className="p-8 pb-3 flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#0091ff] mb-3 group-hover:opacity-0 transition-opacity duration-300">
                      {col.title}
                    </h3>
                  </div>

                  {/* 2. 3D Model Section */}
                  <div className="w-full flex-1 flex items-center justify-center relative transition-all duration-[850ms] ease-out group-hover:scale-[0.88] group-hover:-translate-y-8">
                    {/* Radial glow backdrop */}
                    <div className="absolute w-[60%] h-[60%] rounded-full bg-blue-500/[0.02] blur-[40px] pointer-events-none" />
                    <Canvas />
                  </div>
                </div>

                {/* Sliding Drawer Overlay Panel */}
                <div className="absolute inset-0 w-full h-full pt-5 pb-8 px-8 md:px-10 bg-[#02050c]/98 backdrop-blur-md border-t border-white/[0.08] transition-all duration-[850ms] ease-out translate-y-[calc(100%-110px)] group-hover:translate-y-0 z-20 flex flex-col justify-start">
                  
                  {/* Floating top header inside drawer (visible only on hover) */}
                  <div className="absolute top-8 left-8 md:left-10 right-8 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-[850ms] ease-out">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#0091ff]">
                      {col.title}
                    </h3>
                  </div>

                  {/* Pull handle indicator bar */}
                  <div className="w-8 h-[2px] bg-white/10 rounded-full mx-auto mb-4 group-hover:bg-[#3daeff]/40 transition-colors duration-[850ms] ease-out flex-shrink-0" />

                  {/* Description Text wrapper */}
                  <div className="relative overflow-y-auto max-h-[300px] mt-0 group-hover:mt-16 transition-all duration-[850ms] ease-out pr-1">
                    <p className="text-[13px] md:text-sm text-white/50 leading-[1.65] font-normal group-hover:text-white/80 transition-colors duration-300 mb-6">
                      {col.desc}
                    </p>
                    
                    {/* Bullet list */}
                    <ul className="space-y-3.5 text-xs text-white/45 font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-[850ms] ease-out delay-100">
                      {col.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-[#3daeff] mt-0.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fade overlay on preview state (placed at the bottom of the visible 110px boundary) */}
                  <div className="absolute top-[86px] left-0 right-0 h-6 bg-gradient-to-t from-[#02050c] to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
