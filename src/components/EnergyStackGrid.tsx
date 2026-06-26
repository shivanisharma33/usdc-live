"use client";

import React, { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   Shared colours & helpers
   ────────────────────────────────────────────────────────────────────────── */
const C = {
  line: "rgba(61,174,255,0.50)",
  lineBright: "rgba(61,174,255,0.72)",
  lineDim: "rgba(61,174,255,0.22)",
  lineVDim: "rgba(61,174,255,0.10)",
  fill: "rgba(4,7,15,0.93)",
  fillLighter: "rgba(14,18,28,0.85)",
  white8: "rgba(255,255,255,0.08)",
  white15: "rgba(255,255,255,0.15)",
  white25: "rgba(255,255,255,0.25)",
  dot: "rgba(61,174,255,0.90)",
  glow: "#3daeff",
};

function initCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const r = canvas.getBoundingClientRect();
  const w = r.width || 340; const h = r.height || 260;
  const d = window.devicePixelRatio || 1;
  canvas.width = w * d; canvas.height = h * d;
  ctx.setTransform(d, 0, 0, d, 0, 0);
  return { w, h };
}

/* Tiny helper: draw a dot with glow */
function glowDot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.fillStyle = C.dot;
  ctx.shadowColor = C.glow; ctx.shadowBlur = 7;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;
}

/* ══════════════════════════════════════════════════════════════════════════
   1.  GENERATION ASSETS
   ══════════════════════════════════════════════════════════════════════════ */
function GenerationCanvas() {
  const ref = useRef<HTMLCanvasElement|null>(null);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    let w = 0, h = 0, af = 0;
    const resize = () => { const d = initCanvas(cv, ctx); w = d.w; h = d.h; };
    resize();
    const ro = new ResizeObserver(resize);
    if (cv.parentElement) ro.observe(cv.parentElement);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      const cx = w / 2, by = h * 0.84;
      const f = Math.sin(t * 0.0016) * 2;
      const s = Math.min(w / 340, h / 260);

      // ── ground ──
      ctx.strokeStyle = C.white8; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - 150*s, by); ctx.lineTo(cx + 150*s, by); ctx.stroke();
      ctx.strokeStyle = C.lineVDim;
      for (let i = -6; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(cx+i*22*s, by); ctx.lineTo(cx+i*26*s, by+16*s); ctx.stroke(); }

      /* ─── WIND TURBINE (lattice tower) ─── */
      const wx = cx - 100*s, wby = by, wty = by - 130*s + f;

      // Lattice tower legs
      ctx.strokeStyle = C.line; ctx.lineWidth = 1*s;
      ctx.beginPath(); ctx.moveTo(wx-10*s, wby); ctx.lineTo(wx-3*s, wty+8*s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(wx+10*s, wby); ctx.lineTo(wx+3*s, wty+8*s); ctx.stroke();
      // Center spine
      ctx.beginPath(); ctx.moveTo(wx, wby); ctx.lineTo(wx, wty+8*s); ctx.stroke();

      // Cross bracing
      ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.6*s;
      const segs = 6;
      for (let i = 0; i < segs; i++) {
        const y1 = wby - i*(wby-wty-8*s)/segs;
        const y2 = wby - (i+1)*(wby-wty-8*s)/segs;
        const w1 = 10*s - i*(7*s/segs);
        const w2 = 10*s - (i+1)*(7*s/segs);
        ctx.beginPath(); ctx.moveTo(wx-w1, y1); ctx.lineTo(wx+w2, y2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(wx+w1, y1); ctx.lineTo(wx-w2, y2); ctx.stroke();
        // Horizontal rung
        ctx.beginPath(); ctx.moveTo(wx-w1, y1); ctx.lineTo(wx+w1, y1); ctx.stroke();
      }

      // Base footer plates
      ctx.strokeStyle = C.line; ctx.lineWidth = 1*s;
      ctx.beginPath(); ctx.moveTo(wx-14*s, wby); ctx.lineTo(wx-10*s, wby); ctx.lineTo(wx-8*s, wby-5*s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(wx+14*s, wby); ctx.lineTo(wx+10*s, wby); ctx.lineTo(wx+8*s, wby-5*s); ctx.stroke();

      // Nacelle housing
      ctx.fillStyle = C.fill; ctx.strokeStyle = C.lineBright; ctx.lineWidth = 1.2*s;
      ctx.beginPath();
      ctx.moveTo(wx-8*s, wty+8*s); ctx.lineTo(wx+12*s, wty+6*s);
      ctx.lineTo(wx+12*s, wty+2*s); ctx.lineTo(wx-8*s, wty+4*s); ctx.closePath();
      ctx.fill(); ctx.stroke();

      // Blades (3, rotating)
      const bLen = 42*s, bAng = (t * 0.0007) % (Math.PI*2);
      ctx.strokeStyle = C.lineBright; ctx.lineWidth = 1.4*s;
      for (let b = 0; b < 3; b++) {
        const a = bAng + b*Math.PI*2/3;
        const tx = wx + Math.cos(a)*bLen;
        const ty = wty+5*s + Math.sin(a)*bLen;
        ctx.beginPath(); ctx.moveTo(wx, wty+5*s); ctx.lineTo(tx, ty); ctx.stroke();
        // Blade taper width lines
        const mx = wx + Math.cos(a)*bLen*0.45;
        const my = wty+5*s + Math.sin(a)*bLen*0.45;
        const pa = a + Math.PI/2;
        ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.5*s;
        ctx.beginPath();
        ctx.moveTo(mx+Math.cos(pa)*4*s, my+Math.sin(pa)*4*s);
        ctx.lineTo(mx-Math.cos(pa)*4*s, my-Math.sin(pa)*4*s);
        ctx.stroke();
        ctx.strokeStyle = C.lineBright; ctx.lineWidth = 1.4*s;
      }
      glowDot(ctx, wx, wty+5*s, 2.5*s);

      /* ─── SOLAR PANELS (2 angled panels) ─── */
      const spx = cx - 58*s, spy = by - 12*s + f;
      for (let i = 0; i < 2; i++) {
        const px = spx + i*30*s;
        const py = spy - i*10*s;
        // Support pole
        ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.8*s;
        ctx.beginPath(); ctx.moveTo(px+13*s, py+2*s); ctx.lineTo(px+13*s, by); ctx.stroke();
        // Angled bracket
        ctx.beginPath(); ctx.moveTo(px+13*s, py); ctx.lineTo(px+8*s, py-4*s); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(px+13*s, py); ctx.lineTo(px+18*s, py-4*s); ctx.stroke();

        // Panel face
        ctx.fillStyle = C.fill; ctx.strokeStyle = C.line; ctx.lineWidth = 1*s;
        const pw = 26*s, ph = 15*s;
        ctx.beginPath();
        ctx.moveTo(px+2*s, py-3*s); ctx.lineTo(px+pw, py-6*s);
        ctx.lineTo(px+pw-2*s, py-6*s-ph); ctx.lineTo(px, py-3*s-ph+2*s);
        ctx.closePath(); ctx.fill(); ctx.stroke();

        // Cell grid
        ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.4*s;
        // Horizontal mid
        ctx.beginPath();
        ctx.moveTo(px+1*s, py-3*s-ph/2+1*s); ctx.lineTo(px+pw-1*s, py-6*s-ph/2);
        ctx.stroke();
        // Verticals
        for (let v = 1; v <= 3; v++) {
          const frac = v/4;
          const topX = px + frac*(pw-2*s); const topY = py-3*s-ph+2*s + frac*(-3*s);
          const botX = px+2*s + frac*(pw-2*s); const botY = py-3*s + frac*(-3*s);
          ctx.beginPath(); ctx.moveTo(topX, topY); ctx.lineTo(botX, botY); ctx.stroke();
        }
      }

      /* ─── MAIN GENERATOR / POWER PLANT ─── */
      const gx = cx - 8*s, gy = by - 88*s + f, gw = 90*s, gh = 82*s;

      // Main housing body
      ctx.fillStyle = C.fill; ctx.strokeStyle = C.line; ctx.lineWidth = 1.2*s;
      ctx.beginPath(); ctx.rect(gx, gy, gw, gh); ctx.fill(); ctx.stroke();

      // Top rim plate
      ctx.strokeStyle = C.lineBright; ctx.lineWidth = 1.5*s;
      ctx.beginPath(); ctx.moveTo(gx-4*s, gy); ctx.lineTo(gx+gw+4*s, gy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx-4*s, gy+3*s); ctx.lineTo(gx+gw+4*s, gy+3*s); ctx.stroke();

      // Bottom plate
      ctx.strokeStyle = C.line; ctx.lineWidth = 1*s;
      ctx.beginPath(); ctx.moveTo(gx-2*s, gy+gh); ctx.lineTo(gx+gw+2*s, gy+gh); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx-2*s, gy+gh+3*s); ctx.lineTo(gx+gw+2*s, gy+gh+3*s); ctx.stroke();

      // Vertical structural frame sections
      ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.7*s;
      const secCount = 7;
      for (let i = 1; i < secCount; i++) {
        const sx = gx + (gw/secCount)*i;
        ctx.beginPath(); ctx.moveTo(sx, gy+5*s); ctx.lineTo(sx, gy+gh-3*s); ctx.stroke();
      }

      // Horizontal bands
      ctx.strokeStyle = C.lineVDim; ctx.lineWidth = 0.6*s;
      for (let i = 1; i <= 4; i++) {
        const ly = gy + i*(gh/5);
        ctx.beginPath(); ctx.moveTo(gx+3*s, ly); ctx.lineTo(gx+gw-3*s, ly); ctx.stroke();
      }

      // Ventilation louvers (lower left)
      ctx.strokeStyle = C.white15; ctx.lineWidth = 0.5*s;
      for (let i = 0; i < 7; i++) {
        const vy = gy+gh-22*s+i*2.6*s;
        ctx.beginPath(); ctx.moveTo(gx+5*s, vy); ctx.lineTo(gx+28*s, vy); ctx.stroke();
      }

      // Control panel box (mid-right face)
      ctx.strokeStyle = C.line; ctx.lineWidth = 0.8*s;
      ctx.beginPath(); ctx.roundRect(gx+gw-28*s, gy+20*s, 22*s, 16*s, 1*s); ctx.stroke();
      // Gauges inside
      ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.6*s;
      ctx.beginPath(); ctx.arc(gx+gw-20*s, gy+28*s, 4*s, 0, Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.arc(gx+gw-10*s, gy+28*s, 4*s, 0, Math.PI*2); ctx.stroke();
      // Gauge needles
      ctx.strokeStyle = C.lineBright; ctx.lineWidth = 0.6*s;
      const needleAng = t*0.001;
      ctx.beginPath(); ctx.moveTo(gx+gw-20*s, gy+28*s); ctx.lineTo(gx+gw-20*s+Math.cos(needleAng)*3*s, gy+28*s-Math.sin(needleAng)*3*s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx+gw-10*s, gy+28*s); ctx.lineTo(gx+gw-10*s+Math.cos(needleAng+1)*3*s, gy+28*s-Math.sin(needleAng+1)*3*s); ctx.stroke();

      // Exhaust pipes on top (2)
      for (let i = 0; i < 2; i++) {
        const px = gx+12*s+i*20*s;
        ctx.strokeStyle = C.line; ctx.lineWidth = 1*s;
        // Left pipe wall
        ctx.beginPath(); ctx.moveTo(px, gy); ctx.lineTo(px, gy-20*s); ctx.stroke();
        // Right pipe wall
        ctx.beginPath(); ctx.moveTo(px+6*s, gy); ctx.lineTo(px+6*s, gy-18*s); ctx.stroke();
        // Top cap
        ctx.beginPath(); ctx.moveTo(px-2*s, gy-20*s); ctx.lineTo(px+8*s, gy-20*s); ctx.stroke();
        // Inner detail
        ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.5*s;
        ctx.beginPath(); ctx.moveTo(px+3*s, gy-2*s); ctx.lineTo(px+3*s, gy-16*s); ctx.stroke();
        // Flanges
        ctx.strokeStyle = C.line; ctx.lineWidth = 0.7*s;
        ctx.beginPath(); ctx.moveTo(px-1*s, gy-8*s); ctx.lineTo(px+7*s, gy-8*s); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(px-1*s, gy-14*s); ctx.lineTo(px+7*s, gy-14*s); ctx.stroke();
      }

      // Side cooling radiator fins (right side)
      ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.6*s;
      for (let i = 0; i < 7; i++) {
        const fy = gy+10*s+i*9*s;
        ctx.beginPath();
        ctx.moveTo(gx+gw, fy); ctx.lineTo(gx+gw+10*s, fy+1.5*s);
        ctx.lineTo(gx+gw+10*s, fy+7*s); ctx.lineTo(gx+gw, fy+8*s);
        ctx.stroke();
      }

      // Pipe connections (left side going down to base)
      ctx.strokeStyle = C.line; ctx.lineWidth = 0.8*s;
      ctx.beginPath(); ctx.moveTo(gx, gy+25*s); ctx.lineTo(gx-12*s, gy+25*s); ctx.lineTo(gx-12*s, by); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx, gy+40*s); ctx.lineTo(gx-8*s, gy+40*s); ctx.lineTo(gx-8*s, by); ctx.stroke();

      // Bolts on body corners
      ctx.fillStyle = C.line;
      [[gx+3*s,gy+5*s],[gx+gw-3*s,gy+5*s],[gx+3*s,gy+gh-4*s],[gx+gw-3*s,gy+gh-4*s]].forEach(([bx,by2])=>{
        ctx.beginPath(); ctx.arc(bx,by2,1.2*s,0,Math.PI*2); ctx.fill();
      });

      /* ─── BATTERY CABINET ─── */
      const bx2 = cx+100*s, by2 = by-48*s+f, bw2=34*s, bh2=42*s;
      ctx.fillStyle = C.fill; ctx.strokeStyle = C.line; ctx.lineWidth = 1.2*s;
      ctx.beginPath(); ctx.roundRect(bx2, by2, bw2, bh2, 3*s); ctx.fill(); ctx.stroke();
      // Top handle
      ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.8*s;
      ctx.beginPath(); ctx.moveTo(bx2+8*s, by2); ctx.lineTo(bx2+8*s, by2-4*s);
      ctx.lineTo(bx2+bw2-8*s, by2-4*s); ctx.lineTo(bx2+bw2-8*s, by2); ctx.stroke();
      // Vent lines
      ctx.strokeStyle = C.white15; ctx.lineWidth = 0.5*s;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(bx2+4*s, by2+7*s+i*3.5*s); ctx.lineTo(bx2+14*s, by2+7*s+i*3.5*s); ctx.stroke();
      }
      // Lightning bolt
      const bi = 0.5+0.5*Math.sin(t*(hov?0.008:0.004));
      ctx.fillStyle = `rgba(61,174,255,${0.4+0.6*bi})`;
      ctx.shadowColor = C.glow; ctx.shadowBlur = 6*bi;
      const lx = bx2+16*s, ly = by2+7*s;
      ctx.beginPath();
      ctx.moveTo(lx+10*s,ly); ctx.lineTo(lx+2*s,ly+13*s); ctx.lineTo(lx+7*s,ly+13*s);
      ctx.lineTo(lx+4*s,ly+25*s); ctx.lineTo(lx+12*s,ly+11*s); ctx.lineTo(lx+7*s,ly+11*s);
      ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
      // Terminal posts on top
      glowDot(ctx, bx2+10*s, by2-4*s, 2*s);
      glowDot(ctx, bx2+bw2-10*s, by2-4*s, 2*s);

      /* ─── CABLES & PULSES ─── */
      // Cable 1: turbine → generator
      ctx.strokeStyle = "rgba(255,255,255,0.10)"; ctx.lineWidth = 0.8*s;
      const c1s = {x:wx+6*s, y:wby-25*s+f};
      const c1cp = {x:cx-45*s, y:by-8*s+f};
      const c1e = {x:gx, y:gy+gh*0.55};
      ctx.beginPath(); ctx.moveTo(c1s.x,c1s.y); ctx.quadraticCurveTo(c1cp.x,c1cp.y,c1e.x,c1e.y); ctx.stroke();

      // Cable 2: generator → battery
      const c2s = {x:gx+gw, y:gy+gh*0.4};
      const c2e = {x:bx2, y:by2+bh2*0.35};
      ctx.beginPath(); ctx.moveTo(c2s.x,c2s.y); ctx.lineTo(c2e.x,c2e.y); ctx.stroke();

      // Energy pulses
      ctx.shadowColor = C.glow; ctx.shadowBlur = 8; ctx.fillStyle = "#fff";
      const fr = hov ? 0.002 : 0.001;
      [0,0.5].forEach(o => {
        const p = ((t*fr)+o)%1;
        const qx = (1-p)*(1-p)*c1s.x+2*(1-p)*p*c1cp.x+p*p*c1e.x;
        const qy = (1-p)*(1-p)*c1s.y+2*(1-p)*p*c1cp.y+p*p*c1e.y;
        ctx.beginPath(); ctx.arc(qx,qy,2.2*s,0,Math.PI*2); ctx.fill();
      });
      [0,0.5].forEach(o => {
        const p = ((t*fr*1.3)+o)%1;
        ctx.beginPath();
        ctx.arc(c2s.x+(c2e.x-c2s.x)*p, c2s.y+(c2e.y-c2s.y)*p, 2.2*s, 0, Math.PI*2); ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Junction dots
      [c1s,c1e,c2s,c2e].forEach(pt => glowDot(ctx, pt.x, pt.y, 3*s));

      af = requestAnimationFrame(draw);
    };
    af = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(af); ro.disconnect(); };
  }, [hov]);

  return <canvas ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} className="w-full h-[220px] block cursor-pointer" />;
}


/* ══════════════════════════════════════════════════════════════════════════
   2.  TRANSFORMATION
   ══════════════════════════════════════════════════════════════════════════ */
function TransformationCanvas() {
  const ref = useRef<HTMLCanvasElement|null>(null);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    let w = 0, h = 0, af = 0;
    const resize = () => { const d = initCanvas(cv, ctx); w = d.w; h = d.h; };
    resize();
    const ro = new ResizeObserver(resize);
    if (cv.parentElement) ro.observe(cv.parentElement);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      const cx = w / 2, by = h * 0.84;
      const f = Math.sin(t * 0.0016) * 2;
      const s = Math.min(w / 340, h / 260);

      // ground
      ctx.strokeStyle = C.white8; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx-140*s, by); ctx.lineTo(cx+140*s, by); ctx.stroke();
      ctx.strokeStyle = C.lineVDim;
      for (let i = -6; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(cx+i*22*s, by); ctx.lineTo(cx+i*26*s, by+16*s); ctx.stroke(); }

      /* ─── TRANSFORMER MAIN TANK ─── */
      const tx = cx - 50*s, ty = by - 68*s + f, tw = 82*s, th = 62*s;

      // Tank body
      ctx.fillStyle = C.fill; ctx.strokeStyle = C.line; ctx.lineWidth = 1.3*s;
      ctx.beginPath(); ctx.roundRect(tx, ty, tw, th, 3*s); ctx.fill(); ctx.stroke();

      // Top flange plate (thick)
      ctx.strokeStyle = C.lineBright; ctx.lineWidth = 1.6*s;
      ctx.beginPath(); ctx.moveTo(tx-5*s, ty); ctx.lineTo(tx+tw+5*s, ty); ctx.stroke();
      ctx.strokeStyle = C.line; ctx.lineWidth = 0.8*s;
      ctx.beginPath(); ctx.moveTo(tx-5*s, ty+3*s); ctx.lineTo(tx+tw+5*s, ty+3*s); ctx.stroke();

      // Bottom flange
      ctx.strokeStyle = C.lineBright; ctx.lineWidth = 1.2*s;
      ctx.beginPath(); ctx.moveTo(tx-3*s, ty+th); ctx.lineTo(tx+tw+3*s, ty+th); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(tx-3*s, ty+th+3*s); ctx.lineTo(tx+tw+3*s, ty+th+3*s); ctx.stroke();

      // Vertical cooling fin lines inside tank face
      ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.65*s;
      const fins = 10;
      for (let i = 1; i <= fins; i++) {
        const fx = tx + (tw/(fins+1))*i;
        ctx.beginPath(); ctx.moveTo(fx, ty+6*s); ctx.lineTo(fx, ty+th-4*s); ctx.stroke();
      }

      // Horizontal detail bands
      ctx.strokeStyle = C.lineVDim;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath(); ctx.moveTo(tx+3*s, ty+i*(th/4)); ctx.lineTo(tx+tw-3*s, ty+i*(th/4)); ctx.stroke();
      }

      // ── SIDE RADIATOR FINS (zig-zag corrugated look, left) ──
      ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.7*s;
      const radH = th - 12*s;
      const radW = 14*s;
      const zigCount = 8;
      // Left side
      ctx.beginPath(); ctx.moveTo(tx-1*s, ty+6*s);
      for (let i = 0; i < zigCount; i++) {
        const zy = ty+6*s + i*(radH/zigCount);
        const zy2 = ty+6*s + (i+0.5)*(radH/zigCount);
        ctx.lineTo(tx - radW, zy + radH/(zigCount*2));
        ctx.lineTo(tx - 1*s, zy2 + radH/(zigCount*2));
      }
      ctx.stroke();
      // Right side
      ctx.beginPath(); ctx.moveTo(tx+tw+1*s, ty+6*s);
      for (let i = 0; i < zigCount; i++) {
        const zy = ty+6*s + i*(radH/zigCount);
        const zy2 = ty+6*s + (i+0.5)*(radH/zigCount);
        ctx.lineTo(tx+tw + radW, zy + radH/(zigCount*2));
        ctx.lineTo(tx+tw + 1*s, zy2 + radH/(zigCount*2));
      }
      ctx.stroke();

      // Transformer symbol (coils)
      ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.8*s;
      const ccx = tx+tw/2, ccy = ty+th/2;
      ctx.beginPath(); ctx.arc(ccx-10*s, ccy, 12*s, -Math.PI*0.55, Math.PI*0.55); ctx.stroke();
      ctx.beginPath(); ctx.arc(ccx+10*s, ccy, 12*s, Math.PI*0.45, Math.PI*1.55); ctx.stroke();

      // Bolt details at corners
      ctx.fillStyle = C.line;
      [[tx+4*s,ty+5*s],[tx+tw-4*s,ty+5*s],[tx+4*s,ty+th-4*s],[tx+tw-4*s,ty+th-4*s]].forEach(([bx,by2])=>{
        ctx.beginPath(); ctx.arc(bx,by2,1.2*s,0,Math.PI*2); ctx.fill();
      });

      /* ─── HIGH-VOLTAGE BUSHINGS (3 tall) ─── */
      const bushPos = [tx+tw*0.22, tx+tw*0.5, tx+tw*0.78];
      const bushH = 48*s;

      bushPos.forEach(bpx => {
        const topY = ty - bushH;

        // Main insulator rod
        ctx.strokeStyle = C.lineBright; ctx.lineWidth = 1.8*s;
        ctx.beginPath(); ctx.moveTo(bpx, ty); ctx.lineTo(bpx, topY); ctx.stroke();

        // Inner rod (thinner)
        ctx.strokeStyle = C.line; ctx.lineWidth = 0.5*s;
        ctx.beginPath(); ctx.moveTo(bpx, ty-2*s); ctx.lineTo(bpx, topY+3*s); ctx.stroke();

        // Insulator disc ribs (6 discs, wider at bottom)
        ctx.strokeStyle = C.line; ctx.lineWidth = 1*s;
        const discCount = 6;
        for (let d = 0; d < discCount; d++) {
          const dy = ty - 5*s - d*(bushH-12*s)/discCount;
          const dw = (7 - d*0.6)*s;
          // Top surface
          ctx.beginPath(); ctx.moveTo(bpx-dw*1.4, dy); ctx.lineTo(bpx+dw*1.4, dy); ctx.stroke();
          // Underside (slightly lower, shorter)
          ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.6*s;
          ctx.beginPath(); ctx.moveTo(bpx-dw, dy+2*s); ctx.lineTo(bpx+dw, dy+2*s); ctx.stroke();
          ctx.strokeStyle = C.line; ctx.lineWidth = 1*s;
          // Connecting vertical edges
          ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.4*s;
          ctx.beginPath(); ctx.moveTo(bpx-dw*1.4, dy); ctx.lineTo(bpx-dw, dy+2*s); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(bpx+dw*1.4, dy); ctx.lineTo(bpx+dw, dy+2*s); ctx.stroke();
          ctx.strokeStyle = C.line; ctx.lineWidth = 1*s;
        }

        // Terminal sphere top
        glowDot(ctx, bpx, topY, 3.5*s);

        // Base mounting plate
        ctx.strokeStyle = C.line; ctx.lineWidth = 0.8*s;
        ctx.beginPath(); ctx.moveTo(bpx-6*s, ty-1*s); ctx.lineTo(bpx+6*s, ty-1*s); ctx.stroke();
      });

      // Wire connecting bushing tops
      ctx.strokeStyle = C.white15; ctx.lineWidth = 0.8*s;
      ctx.beginPath();
      ctx.moveTo(bushPos[0]-8*s, ty-bushH-2*s);
      ctx.lineTo(bushPos[0], ty-bushH);
      ctx.lineTo(bushPos[1], ty-bushH-5*s);
      ctx.lineTo(bushPos[2], ty-bushH);
      ctx.lineTo(bushPos[2]+8*s, ty-bushH-2*s);
      ctx.stroke();

      /* ─── AUXILIARY CABINET (right) ─── */
      const ax = cx+60*s, ay = by-52*s+f, aw=38*s, ah=46*s;
      ctx.fillStyle = C.fill; ctx.strokeStyle = C.line; ctx.lineWidth = 1.2*s;
      ctx.beginPath(); ctx.roundRect(ax, ay, aw, ah, 3*s); ctx.fill(); ctx.stroke();

      // Display screen
      ctx.fillStyle = "rgba(61,174,255,0.06)";
      ctx.strokeStyle = C.lineBright; ctx.lineWidth = 0.8*s;
      const sx = ax+4*s, sy = ay+5*s, sw = aw-8*s, sh = 16*s;
      ctx.beginPath(); ctx.roundRect(sx, sy, sw, sh, 2*s); ctx.fill(); ctx.stroke();

      // Oscilloscope wave inside screen
      ctx.strokeStyle = C.dot; ctx.lineWidth = 0.7*s;
      ctx.beginPath();
      for (let i = 0; i <= 20; i++) {
        const px = sx+2*s+i*(sw-4*s)/20;
        const py = sy+sh/2 + Math.sin(i*0.9+t*0.003)*5*s;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Buttons / indicator LEDs
      for (let i = 0; i < 4; i++) {
        glowDot(ctx, ax+6*s+i*7*s, ay+ah-8*s, 1.5*s);
      }

      // Lightning bolt
      const bi2 = 0.5+0.5*Math.sin(t*(hov?0.007:0.0035));
      ctx.fillStyle = `rgba(61,174,255,${0.4+0.6*bi2})`;
      ctx.shadowColor = C.glow; ctx.shadowBlur = 5*bi2;
      const lx2 = ax+14*s, ly2 = ay+24*s;
      ctx.beginPath();
      ctx.moveTo(lx2+7*s,ly2); ctx.lineTo(lx2,ly2+9*s); ctx.lineTo(lx2+4*s,ly2+9*s);
      ctx.lineTo(lx2+2*s,ly2+17*s); ctx.lineTo(lx2+9*s,ly2+7*s); ctx.lineTo(lx2+5*s,ly2+7*s);
      ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;

      /* ─── CONNECTING PIPE & FLOW ─── */
      const cs = {x:tx+tw+2*s, y:ty+th*0.42};
      const ce = {x:ax, y:ay+ah*0.38};
      // Pipe outline (thicker, double-line)
      ctx.strokeStyle = C.lineDim; ctx.lineWidth = 3*s;
      ctx.beginPath(); ctx.moveTo(cs.x, cs.y); ctx.quadraticCurveTo((cs.x+ce.x)/2, Math.max(cs.y,ce.y)+14*s, ce.x, ce.y); ctx.stroke();
      ctx.strokeStyle = C.fill; ctx.lineWidth = 1.8*s;
      ctx.beginPath(); ctx.moveTo(cs.x, cs.y); ctx.quadraticCurveTo((cs.x+ce.x)/2, Math.max(cs.y,ce.y)+14*s, ce.x, ce.y); ctx.stroke();

      // Energy pulses
      ctx.shadowColor = C.glow; ctx.shadowBlur = 8; ctx.fillStyle = "#fff";
      const fr2 = hov ? 0.003 : 0.0015;
      const gQ = (p: number) => {
        const cpx = (cs.x+ce.x)/2, cpy = Math.max(cs.y,ce.y)+14*s;
        return { x:(1-p)*(1-p)*cs.x+2*(1-p)*p*cpx+p*p*ce.x, y:(1-p)*(1-p)*cs.y+2*(1-p)*p*cpy+p*p*ce.y };
      };
      [0,0.5].forEach(o => {
        const pt = gQ(((t*fr2)+o)%1);
        ctx.beginPath(); ctx.arc(pt.x,pt.y,2.2*s,0,Math.PI*2); ctx.fill();
      });
      ctx.shadowBlur = 0;
      glowDot(ctx, cs.x, cs.y, 3*s);
      glowDot(ctx, ce.x, ce.y, 3*s);

      af = requestAnimationFrame(draw);
    };
    af = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(af); ro.disconnect(); };
  }, [hov]);

  return <canvas ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} className="w-full h-[220px] block cursor-pointer" />;
}


/* ══════════════════════════════════════════════════════════════════════════
   3.  COMPUTE DELIVERY
   ══════════════════════════════════════════════════════════════════════════ */
function ComputeDeliveryCanvas() {
  const ref = useRef<HTMLCanvasElement|null>(null);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    let w = 0, h = 0, af = 0;
    const resize = () => { const d = initCanvas(cv, ctx); w = d.w; h = d.h; };
    resize();
    const ro = new ResizeObserver(resize);
    if (cv.parentElement) ro.observe(cv.parentElement);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      const cx = w / 2, by = h * 0.87;
      const f = Math.sin(t * 0.0014) * 1.5;
      const s = Math.min(w / 340, h / 260);

      // ground
      ctx.strokeStyle = C.white8; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx-140*s, by); ctx.lineTo(cx+140*s, by); ctx.stroke();
      ctx.strokeStyle = C.lineVDim;
      for (let i = -6; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(cx+i*22*s, by); ctx.lineTo(cx+i*26*s, by+14*s); ctx.stroke(); }

      /* ─── THREE SERVER RACKS ─── */
      const rw = 50*s, rh = 130*s, gap = 14*s;
      const totalW = rw*3 + gap*2;
      const rx0 = cx - totalW/2;

      // ── Overhead cable tray (drawn first) ──
      const trayY = by - rh - 14*s + f;
      ctx.strokeStyle = C.line; ctx.lineWidth = 1*s;
      ctx.beginPath(); ctx.moveTo(rx0-8*s, trayY); ctx.lineTo(rx0+totalW+8*s, trayY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(rx0-8*s, trayY-5*s); ctx.lineTo(rx0+totalW+8*s, trayY-5*s); ctx.stroke();
      // Cross bars on tray
      ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.5*s;
      for (let i = 0; i < 12; i++) {
        const tbx = rx0-4*s + i*(totalW+16*s)/12;
        ctx.beginPath(); ctx.moveTo(tbx, trayY); ctx.lineTo(tbx, trayY-5*s); ctx.stroke();
      }

      for (let r = 0; r < 3; r++) {
        const rx = rx0 + r*(rw+gap);
        const ry = by - rh + f*(1+r*0.05);

        // Cable drops from tray
        ctx.strokeStyle = C.line; ctx.lineWidth = 0.8*s;
        ctx.beginPath(); ctx.moveTo(rx+rw*0.3, trayY); ctx.lineTo(rx+rw*0.3, ry); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(rx+rw*0.7, trayY); ctx.lineTo(rx+rw*0.7, ry); ctx.stroke();

        // Main rack body
        ctx.fillStyle = C.fill; ctx.strokeStyle = C.line; ctx.lineWidth = 1.3*s;
        ctx.beginPath(); ctx.roundRect(rx, ry, rw, rh, 2*s); ctx.fill(); ctx.stroke();

        // Top ventilation panel
        ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.6*s;
        ctx.beginPath(); ctx.moveTo(rx+3*s, ry+5*s); ctx.lineTo(rx+rw-3*s, ry+5*s); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(rx+3*s, ry+7*s); ctx.lineTo(rx+rw-3*s, ry+7*s); ctx.stroke();

        // Server blade rows
        const bladeCount = 12;
        const bTop = ry + 10*s;
        const bBot = ry + rh - 16*s;
        const bH = (bBot - bTop) / bladeCount;

        for (let b = 0; b < bladeCount; b++) {
          const bladeY = bTop + b * bH;

          // Blade divider
          ctx.strokeStyle = "rgba(255,255,255,0.05)";
          ctx.lineWidth = 0.4*s;
          ctx.beginPath(); ctx.moveTo(rx+3*s, bladeY+bH); ctx.lineTo(rx+rw-3*s, bladeY+bH); ctx.stroke();

          // Faceplate detail lines
          ctx.strokeStyle = C.white15; ctx.lineWidth = 0.5*s;
          // Long detail bar
          ctx.beginPath(); ctx.moveTo(rx+5*s, bladeY+bH*0.5); ctx.lineTo(rx+rw*0.5, bladeY+bH*0.5); ctx.stroke();
          // Short handle
          ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.4*s;
          ctx.beginPath(); ctx.moveTo(rx+5*s, bladeY+bH*0.3); ctx.lineTo(rx+14*s, bladeY+bH*0.3); ctx.stroke();
          // Right-side detail lines
          ctx.strokeStyle = C.lineVDim; ctx.lineWidth = 0.4*s;
          ctx.beginPath(); ctx.moveTo(rx+rw*0.58, bladeY+bH*0.35); ctx.lineTo(rx+rw-18*s, bladeY+bH*0.35); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(rx+rw*0.58, bladeY+bH*0.65); ctx.lineTo(rx+rw-18*s, bladeY+bH*0.65); ctx.stroke();

          // LED indicators
          const noise = Math.sin(t*(hov?0.015:0.007)+r*20+b*13.7);
          if (noise > -0.3) {
            const intensity = (noise+0.3)/1.3;
            ctx.fillStyle = `rgba(61,174,255,${0.45+0.55*intensity})`;
            ctx.shadowColor = C.glow; ctx.shadowBlur = hov ? 5 : 3;
            // Activity LED
            ctx.beginPath(); ctx.arc(rx+rw-7*s, bladeY+bH*0.4, 1.3*s, 0, Math.PI*2); ctx.fill();
            // Status LED
            ctx.fillStyle = `rgba(61,174,255,${0.25+0.35*intensity})`;
            ctx.beginPath(); ctx.arc(rx+rw-13*s, bladeY+bH*0.4, 1*s, 0, Math.PI*2); ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        // Activity sweep line
        const sweepPos = ((t*(hov?0.06:0.03)+r*15) % rh);
        if (sweepPos > 10 && sweepPos < rh-10) {
          ctx.strokeStyle = "rgba(61,174,255,0.45)";
          ctx.shadowColor = C.glow; ctx.shadowBlur = 4;
          ctx.lineWidth = 0.7*s;
          ctx.beginPath(); ctx.moveTo(rx+3*s, ry+sweepPos); ctx.lineTo(rx+rw-3*s, ry+sweepPos); ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Bottom power supply unit
        ctx.strokeStyle = C.lineDim; ctx.lineWidth = 0.7*s;
        ctx.beginPath(); ctx.roundRect(rx+4*s, ry+rh-14*s, rw-8*s, 10*s, 1.5*s); ctx.stroke();
        // PSU internal detail
        ctx.strokeStyle = C.lineVDim; ctx.lineWidth = 0.4*s;
        ctx.beginPath(); ctx.moveTo(rx+rw/2, ry+rh-13*s); ctx.lineTo(rx+rw/2, ry+rh-5*s); ctx.stroke();
        // Power connector dots
        glowDot(ctx, rx+rw-10*s, ry+rh-9*s, 1.8*s);
        glowDot(ctx, rx+12*s, ry+rh-9*s, 1.8*s);

        // Side panel vertical edge details
        ctx.strokeStyle = C.lineVDim; ctx.lineWidth = 0.4*s;
        ctx.beginPath(); ctx.moveTo(rx+2*s, ry+10*s); ctx.lineTo(rx+2*s, ry+rh-16*s); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(rx+rw-2*s, ry+10*s); ctx.lineTo(rx+rw-2*s, ry+rh-16*s); ctx.stroke();
      }

      af = requestAnimationFrame(draw);
    };
    af = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(af); ro.disconnect(); };
  }, [hov]);

  return <canvas ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} className="w-full h-[220px] block cursor-pointer" />;
}


/* ══════════════════════════════════════════════════════════════════════════
   MAIN WRAPPER
   ══════════════════════════════════════════════════════════════════════════ */
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
          In the high-density computing era, energy is the ultimate currency. We don&apos;t just secure power – we generate it, transform it, and deliver it to the rack with unmatched efficiency and scale.
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
                  <div className="p-8 pb-3 flex flex-col">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#0091ff] mb-3 group-hover:opacity-0 transition-opacity duration-300">
                      {col.title}
                    </h3>
                  </div>
                  <div className="w-full flex-1 flex items-center justify-center relative transition-all duration-[850ms] ease-out group-hover:scale-[0.88] group-hover:-translate-y-8">
                    <div className="absolute w-[60%] h-[60%] rounded-full bg-blue-500/[0.02] blur-[40px] pointer-events-none" />
                    <Canvas />
                  </div>
                </div>

                {/* Sliding Drawer */}
                <div className="absolute inset-0 w-full h-full pt-5 pb-8 px-8 md:px-10 bg-[#02050c]/98 backdrop-blur-md border-t border-white/[0.08] transition-all duration-[850ms] ease-out translate-y-[calc(100%-110px)] group-hover:translate-y-0 z-20 flex flex-col justify-start">
                  <div className="absolute top-8 left-8 md:left-10 right-8 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-[850ms] ease-out">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#0091ff]">{col.title}</h3>
                  </div>
                  <div className="w-8 h-[2px] bg-white/10 rounded-full mx-auto mb-4 group-hover:bg-[#3daeff]/40 transition-colors duration-[850ms] ease-out flex-shrink-0" />
                  <div className="relative overflow-y-auto max-h-[300px] mt-0 group-hover:mt-16 transition-all duration-[850ms] ease-out pr-1">
                    <p className="text-[13px] md:text-sm text-white/50 leading-[1.65] font-normal group-hover:text-white/80 transition-colors duration-300 mb-6">{col.desc}</p>
                    <ul className="space-y-3.5 text-xs text-white/45 font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-[850ms] ease-out delay-100">
                      {col.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-[#3daeff] mt-0.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
