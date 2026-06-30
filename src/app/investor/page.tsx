"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerSection from "@/components/PartnerSection";
import Link from "next/link";
import {
  FileText,
  Calendar,
  TrendingUp,
  Newspaper,
  Shield,
  Mail,
  ArrowUpRight,
  Download,
  ChevronRight,
  Clock,
} from "lucide-react";

interface StockDataPoint {
  date: string;
  price: number;
  volume: number;
}

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  lastUpdated: string;
}

const generateSvgPath = (points: StockDataPoint[]) => {
  if (!points || points.length === 0) return "M 0 100 L 600 100";
  if (points.length === 1) return `M 0 100 L 600 100`;

  const minPrice = Math.min(...points.map(p => p.price));
  const maxPrice = Math.max(...points.map(p => p.price));
  const range = maxPrice - minPrice || 1;

  const padding = 20;
  const usableHeight = 200 - padding * 2;

  let path = `M 0 ${200 - padding - ((points[0].price - minPrice) / range) * usableHeight}`;
  for (let i = 1; i < points.length; i++) {
    const x = (i / (points.length - 1)) * 600;
    const y = 200 - padding - ((points[i].price - minPrice) / range) * usableHeight;
    path += ` L ${x} ${y}`;
  }
  return path;
};

const formatDate = (isoString: string) => {
  try {
    const d = new Date(isoString + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (e) {
    return isoString;
  }
};

const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function InvestorPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("1M");
  const [animateChart, setAnimateChart] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>("");

  const [liveStockData, setLiveStockData] = useState<StockData | null>(null);
  const [isLoadingStock, setIsLoadingStock] = useState(true);
  const [historicalData, setHistoricalData] = useState<StockDataPoint[]>([]);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [pressReleases, setPressReleases] = useState<any[]>([]);
  const [isLoadingReleases, setIsLoadingReleases] = useState(true);

  const cachedDataRef = React.useRef<Record<string, StockDataPoint[]>>({});
  const heroRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = hero.clientWidth);
    let height = (canvas.height = hero.clientHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = hero.clientWidth;
      height = canvas.height = hero.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initial 3D camera angles
    let yaw = 0.5; // Yaw rotation around Y axis
    let pitch = 0.6; // Pitch tilt around X axis
    let time = 0;

    // 3D projection mathematical function
    const project = (x3d: number, y3d: number, z3d: number, centerX: number, centerY: number) => {
      // 1. Yaw rotation (around Y axis)
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      let x1 = x3d * cosY - z3d * sinY;
      let z1 = x3d * sinY + z3d * cosY;

      // 2. Pitch rotation (around X axis)
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      let y1 = y3d * cosX - z1 * sinX;
      let z2 = y3d * sinX + z1 * cosX;

      // Translate camera distance
      const camZ = z2 + 420;

      // Perspective projection
      const fov = 400;
      const scale = fov / camZ;

      const screenX = centerX + x1 * scale;
      const screenY = centerY + y1 * scale;

      return { x: screenX, y: screenY, z: camZ };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Smooth mouse LERP for coordinates
      if (mouse.active) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.08;
          mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
      } else {
        mouse.x += (-1000 - mouse.x) * 0.06;
        mouse.y += (-1000 - mouse.y) * 0.06;
      }

      time += 0.8;

      // Update 3D Camera Angles
      const baseYaw = time * 0.0018 + 0.5;
      let targetYaw = baseYaw;
      let targetPitch = 0.62;

      if (mouse.active && mouse.x !== -1000) {
        targetYaw = baseYaw + ((mouse.x - centerX) / width) * 0.7;
        targetPitch = 0.62 + ((mouse.y - centerY) / height) * 0.4;
      }

      yaw += (targetYaw - yaw) * 0.08;
      pitch += (targetPitch - pitch) * 0.08;

      // ── Draw 2D Illustrator-style drafting grid pattern in background ──
      const gridSize = 40;
      ctx.lineWidth = 0.5;
      
      // Vertical grid lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.strokeStyle = (x % (gridSize * 4) === 0) ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.012)";
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.strokeStyle = (y % (gridSize * 4) === 0) ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.012)";
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Generate 8x8 Grid of 3D Columns
      const colsCount = 8;
      const rowsCount = 8;
      const spacing = 30; // 3D units distance
      const columnsList = [];

      for (let c = 0; c < colsCount; c++) {
        for (let r = 0; r < rowsCount; r++) {
          const cx3d = (c - 3.5) * spacing;
          const cz3d = (r - 3.5) * spacing;

          // Base waves generating dynamic heights
          const waveVal1 = Math.sin(c * 0.35 + r * 0.35 + time * 0.045) * 26;
          const waveVal2 = Math.cos(c * 0.18 - r * 0.25 + time * 0.02) * 12;
          const baseHeight = 45 + waveVal1 + waveVal2;

          // Temporary projection to compute distance to mouse pointer for proximity growth effect
          const tempProj = project(cx3d, 0, cz3d, centerX, centerY);
          const dx = mouse.x - tempProj.x;
          const dy = mouse.y - tempProj.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);

          const isHovered = mouse.active && distToMouse < 180;
          const hoverHeightBonus = isHovered ? ((180 - distToMouse) / 180) * 55 : 0;
          const h = baseHeight + hoverHeightBonus;

          columnsList.push({
            c, r,
            cx3d, cz3d,
            h,
            depth: tempProj.z,
            distToMouse,
          });
        }
      }

      // Depth sort columns (Back-to-front / Painter's algorithm)
      columnsList.sort((a, b) => b.depth - a.depth);

      // Render the 3D Grid columns
      const w = 7; // Half-width of 3D column box

      columnsList.forEach((col) => {
        const cx = col.cx3d;
        const cz = col.cz3d;
        const h = col.h;

        // Calculate top 4 points coordinates in 3D (Y goes UP in negative values)
        const pT0 = project(cx - w, -h, cz - w, centerX, centerY);
        const pT1 = project(cx + w, -h, cz - w, centerX, centerY);
        const pT2 = project(cx + w, -h, cz + w, centerX, centerY);
        const pT3 = project(cx - w, -h, cz + w, centerX, centerY);

        // Calculate bottom 4 points coordinates in 3D
        const pB0 = project(cx - w, 0, cz - w, centerX, centerY);
        const pB1 = project(cx + w, 0, cz - w, centerX, centerY);
        const pB2 = project(cx + w, 0, cz + w, centerX, centerY);
        const pB3 = project(cx - w, 0, cz + w, centerX, centerY);

        // White Wireframe / Translucent Blueprint Styling
        const opacityIntensity = Math.min(1.0, 0.08 + (h / 120) * 0.16);
        const colorTop = `rgba(255, 255, 255, ${opacityIntensity + 0.08})`; // Brightest top face
        const colorLeft = `rgba(255, 255, 255, ${opacityIntensity})`;        // Medium left face
        const colorRight = `rgba(255, 255, 255, ${opacityIntensity + 0.04})`; // Semi-dark right face
        const strokeColor = `rgba(255, 255, 255, ${0.15 + (h / 120) * 0.22})`; // Wireframe outline edge

        // Draw Left Face (B0 -> T0 -> T3 -> B3)
        ctx.beginPath();
        ctx.moveTo(pB0.x, pB0.y);
        ctx.lineTo(pT0.x, pT0.y);
        ctx.lineTo(pT3.x, pT3.y);
        ctx.lineTo(pB3.x, pB3.y);
        ctx.closePath();
        ctx.fillStyle = colorLeft;
        ctx.fill();

        // Draw Right Face (B1 -> T1 -> T2 -> B2)
        ctx.beginPath();
        ctx.moveTo(pB1.x, pB1.y);
        ctx.lineTo(pT1.x, pT1.y);
        ctx.lineTo(pT2.x, pT2.y);
        ctx.lineTo(pB2.x, pB2.y);
        ctx.closePath();
        ctx.fillStyle = colorRight;
        ctx.fill();

        // Draw Top Face (T0 -> T1 -> T2 -> T3)
        ctx.beginPath();
        ctx.moveTo(pT0.x, pT0.y);
        ctx.lineTo(pT1.x, pT1.y);
        ctx.lineTo(pT2.x, pT2.y);
        ctx.lineTo(pT3.x, pT3.y);
        ctx.closePath();
        ctx.fillStyle = colorTop;
        ctx.fill();

        // Grid wire outlines for high-tech aesthetic
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // If mouse is close to the top of the column, add cyan glow indicator
        if (mouse.active && col.distToMouse < 45) {
          ctx.beginPath();
          ctx.moveTo(pT0.x, pT0.y);
          ctx.lineTo(pT1.x, pT1.y);
          ctx.lineTo(pT2.x, pT2.y);
          ctx.lineTo(pT3.x, pT3.y);
          ctx.closePath();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
          ctx.lineWidth = 1.5;
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 10;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      // Render holographic coordinate overlay and HUD box
      if (mouse.x !== -1000) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 4]);

        // Vertical axis guide
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, height);
        ctx.stroke();

        // Horizontal axis guide
        ctx.beginPath();
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(width, mouse.y);
        ctx.stroke();

        ctx.setLineDash([]);

        // Display dynamic HUD status window next to cursor
        const boxW = 125;
        const boxH = 65;
        let boxX = mouse.x + 15;
        let boxY = mouse.y - 75;

        if (boxX + boxW > width) boxX = mouse.x - boxW - 15;
        if (boxY < 0) boxY = mouse.y + 15;

        ctx.fillStyle = "rgba(4, 7, 15, 0.85)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(boxX, boxY, boxW, boxH, 6);
        } else {
          ctx.rect(boxX, boxY, boxW, boxH);
        }
        ctx.fill();
        ctx.stroke();

        // HUD Text Labels
        ctx.font = "bold 8.5px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText("USDC_MARKET_3D", boxX + 8, boxY + 16);

        // Dynamic Valuation (White theme)
        const indexValue = Math.round((width - mouse.x) * 1.6 + (height - mouse.y) * 2.8 + 600);
        ctx.font = "bold 13px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`$${(indexValue / 10).toFixed(2)}B`, boxX + 8, boxY + 34);

        // Growth Percentage
        const growthPct = ((indexValue % 130) / 26 - 2.5).toFixed(2);
        const isPositiveChange = parseFloat(growthPct) >= 0;
        ctx.font = "bold 9px monospace";
        ctx.fillStyle = isPositiveChange ? "#10b981" : "#ef4444";
        ctx.fillText(`${isPositiveChange ? "+" : ""}${growthPct}%`, boxX + 8, boxY + 50);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" }));
  }, []);

  useEffect(() => {
    const fetchLatestReleases = async () => {
      try {
        setIsLoadingReleases(true);
        const url = "https://thankful-miracle-1ed8bdfdaf.strapiapp.com/api/press-releases?populate[pdf_file][fields]=url,name&fields=title,date,content&sort[0]=date:desc&pagination[page]=1&pagination[pageSize]=4";
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          setPressReleases(json.data || []);
        }
      } catch (err) {
        console.error("Error fetching press releases:", err);
      } finally {
        setIsLoadingReleases(false);
      }
    };
    fetchLatestReleases();
  }, []);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setIsLoadingStock(true);
        const apiKey = process.env.NEXT_PUBLIC_MASSIVE_API_KEY;
        if (!apiKey) throw new Error('API Key missing');

        const symbol = 'DGXX';
        const today = new Date().toISOString().split('T')[0];

        const [snapshotRes, quoteRes, tradeRes, dailyRes] = await Promise.all([
          fetch(`https://api.massive.com/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`).catch(() => null),
          fetch(`https://api.massive.com/v3/quotes/${symbol}?limit=1&order=desc&apiKey=${apiKey}`).catch(() => null),
          fetch(`https://api.massive.com/v3/trades/${symbol}?limit=1&order=desc&apiKey=${apiKey}`).catch(() => null),
          fetch(`https://api.massive.com/v1/open-close/${symbol}/${today}?adjusted=true&apiKey=${apiKey}`).catch(() => null),
        ]);

        const snapshotData = snapshotRes?.ok ? await snapshotRes.json() : null;
        const quoteData = quoteRes?.ok ? await quoteRes.json() : null;
        const tradeData = tradeRes?.ok ? await tradeRes.json() : null;
        const dailyData = dailyRes?.ok ? await dailyRes.json() : null;

        const snapshot = snapshotData?.ticker;
        const quote = quoteData?.results?.[0];
        const trade = tradeData?.results?.[0];
        const daily = dailyData;

        const livePrice = Number(quote?.ask_price) || Number(trade?.price) || Number(snapshot?.day?.c) || Number(daily?.close) || 0;
        const openPrice = Number(snapshot?.day?.o) || Number(daily?.open) || livePrice;
        const volume = Number(snapshot?.day?.v) || Number(daily?.volume) || 0;
        const high = Number(snapshot?.day?.h) || Number(daily?.high) || livePrice;
        const low = Number(snapshot?.day?.l) || Number(daily?.low) || livePrice;

        if (!livePrice) return;

        const change = livePrice - openPrice;
        const changePercent = openPrice ? (change / openPrice) * 100 : 0;

        setLiveStockData({
          symbol: 'USDC',
          price: Number(livePrice.toFixed(2)),
          change: Number(change.toFixed(2)),
          changePercent: Number(changePercent.toFixed(2)),
          volume,
          high: Number(high.toFixed(2)),
          low: Number(low.toFixed(2)),
          open: Number(openPrice.toFixed(2)),
          lastUpdated: new Date().toISOString()
        });
      } catch (err) {
        console.error('Error fetching stock data:', err);
      } finally {
        setIsLoadingStock(false);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        if (cachedDataRef.current[selectedTimeframe]) {
          setHistoricalData(cachedDataRef.current[selectedTimeframe]);
          return;
        }

        if (selectedTimeframe === "1D" && liveStockData) {
          const dataPoints: StockDataPoint[] = [];
          const intervals = 14;
          for (let i = 0; i <= intervals; i++) {
            const timeStr = `${Math.floor(9.5 + i * 0.5)}:${i % 2 === 0 ? '30' : '00'}`;
            const progress = i / intervals;
            let price = liveStockData.open;
            if (progress < 0.3) price = liveStockData.open + (liveStockData.high - liveStockData.open) * (progress / 0.3);
            else if (progress < 0.7) price = liveStockData.high - (liveStockData.high - liveStockData.low) * ((progress - 0.3) / 0.4);
            else price = liveStockData.low + (liveStockData.price - liveStockData.low) * ((progress - 0.7) / 0.3);
            dataPoints.push({ date: timeStr, price: Number(price.toFixed(2)), volume: Math.floor(liveStockData.volume / intervals) });
          }
          setHistoricalData(dataPoints);
          cachedDataRef.current["1D"] = dataPoints;
          return;
        }

        setIsLoadingChart(true);
        let daysToFetch = 30; let intervalDays = 2;
        switch (selectedTimeframe) {
          case "1W": daysToFetch = 7; intervalDays = 1; break;
          case "1M": daysToFetch = 30; intervalDays = 2; break;
          case "3M": daysToFetch = 90; intervalDays = 4; break;
          case "6M": daysToFetch = 180; intervalDays = 7; break;
          case "ALL": daysToFetch = 730; intervalDays = 21; break;
        }

        const dates: string[] = [];
        const today = new Date();
        for (let i = daysToFetch - 1; i >= 0; i -= intervalDays) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          if (d.getDay() !== 0 && d.getDay() !== 6) dates.push(d.toISOString().split('T')[0]);
        }

        const apiKey = process.env.NEXT_PUBLIC_MASSIVE_API_KEY;
        const symbol = 'DGXX';
        const batchPromises = dates.map(dateString =>
          fetch(`https://api.massive.com/v1/open-close/${symbol}/${dateString}?adjusted=true&apiKey=${apiKey}`)
            .then(res => res.ok ? res.json() : null).catch(() => null)
        );

        const results = await Promise.all(batchPromises);
        const dataPoints: StockDataPoint[] = [];

        results.forEach((data, index) => {
          if (data && data.status === 'OK') {
            const currentPrice = data.close ?? data.preMarket ?? data.high ?? data.open;
            if (currentPrice) {
              dataPoints.push({
                date: new Date(dates[index]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                price: Number(currentPrice.toFixed(2)),
                volume: data.volume || 0,
              });
            }
          }
        });

        if (dataPoints.length > 0) {
          setHistoricalData(dataPoints);
          cachedDataRef.current[selectedTimeframe] = dataPoints;
        }
      } catch (e) { } finally {
        setIsLoadingChart(false);
      }
    };
    fetchHistoricalData();
  }, [selectedTimeframe, liveStockData]);

  const handleTimeframeChange = (timeframe: string) => {
    setAnimateChart(true);
    setSelectedTimeframe(timeframe);
    setTimeout(() => setAnimateChart(false), 500);
  };

  const chartPath = generateSvgPath(historicalData);
  const isPositive = liveStockData ? liveStockData.change >= 0 : true;
  const lastY = historicalData.length > 0 ? chartPath.split(' ').pop() : 100;

  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden selection:bg-[#3daeff] selection:text-black">
      {/* Navbar component */}
      <Navbar />

      <main className="flex-grow">

        {/* ── HERO SECTION ── */}
        <section 
          ref={heroRef} 
          className="relative min-h-[560px] md:min-h-[680px] flex items-center px-4 sm:px-6 pt-28 pb-20 md:pt-36 border-b border-white/5 overflow-hidden"
        >
          {/* Background Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#3daeff]/[0.06] blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#3daeff]/[0.04] blur-[140px]" />
            
            {/* Holographic Market Terminal Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
            />
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
            {/* Center Content: Text copy */}
            <div className="flex flex-col items-center text-center transition-all duration-700">

              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#3daeff]/30 bg-[#3daeff]/5 backdrop-blur-sm mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] shadow-[0_0_8px_rgba(61,174,255,0.8)] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#3daeff]">
                  Investor Relations
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10 uppercase">
                <span className="inline-block animate-slide-up [animation-fill-mode:both] [animation-delay:0ms]">Investor&nbsp;</span>
                <span className="inline-block animate-slide-up [animation-fill-mode:both] [animation-delay:80ms] text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] to-[#0091ff] drop-shadow-[0_4px_18px_rgba(61,174,255,0.25)] select-none">Center</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-10 max-w-xl">
                Powering the future of enterprise-scale AI infrastructure. Access financial performance reports, corporate governance files, and the latest business developments from USDC Corporation.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/usdc-deck.pdf"
                  target="_blank"
                  className="group inline-flex items-center gap-3 bg-[#3daeff] px-7 py-4 rounded-xl text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_40px_rgba(61,174,255,0.2)] hover:shadow-[0_0_50px_rgba(61,174,255,0.35)]"
                >
                  <span>Latest Presentation</span>
                  <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  href="/sec-filings"
                  className="group inline-flex items-center gap-3 bg-white/[0.03] border border-white/10 px-7 py-4 rounded-xl text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/[0.06] hover:border-white/20 transition-all backdrop-blur-sm"
                >
                  <span>SEC Filings</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ── STOCK PERFORMANCE & CHART SECTION ── */}
        <section className="py-20 lg:py-24 px-4 sm:px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

              {/* Left & Center: Interactive Stock Chart */}
              <div className="lg:col-span-2 bg-[#080808]/80 border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 flex flex-col backdrop-blur-md">

                {/* Header of Chart container */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-semibold uppercase tracking-tight mb-2">
                      Stock Performance
                    </h2>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-medium">
                      Real-time market tracking (NASDAQ: USDC)
                    </p>
                  </div>

                  {/* Timeframe selector tabs */}
                  <div className="flex flex-wrap justify-center gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/5">
                    {["1D", "1W", "1M", "3M", "6M", "ALL"].map((timeframe) => {
                      const isActive = selectedTimeframe === timeframe;
                      return (
                        <button
                          key={timeframe}
                          onClick={() => handleTimeframeChange(timeframe)}
                          className={`px-4 py-1.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${isActive
                              ? "bg-[#3daeff] text-black shadow-lg shadow-[#3daeff]/20"
                              : "text-white/40 hover:text-white"
                            }`}
                        >
                          {timeframe}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Animated Chart Canvas (SVG mockup) */}
                <div className="flex-1 min-h-[350px] w-full bg-white/[0.01] border border-white/5 rounded-2xl relative overflow-hidden p-6 flex flex-col justify-end">
                  {/* Subtle Grid backdrop inside chart */}
                  <div className="absolute inset-0 grid grid-rows-5 grid-cols-6 pointer-events-none opacity-5">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div key={i} className="border-t border-l border-white" />
                    ))}
                  </div>

                  {/* SVG Chart Graphic */}
                  <div className="absolute inset-x-6 top-12 bottom-12">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 200">
                      {/* Gradient fill underneath the stock line */}
                      <defs>
                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3daeff" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#3daeff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Area pathway */}
                      <path
                        d={`${chartPath} L 600 200 L 0 200 Z`}
                        fill="url(#chartGlow)"
                        className={`transition-all duration-500 ease-in-out ${animateChart || isLoadingChart ? "opacity-30 scale-y-95 origin-bottom" : "opacity-100"
                          }`}
                      />

                      {/* Line pathway */}
                      <path
                        d={chartPath}
                        fill="none"
                        stroke={isPositive ? "#00e878" : "#ff4a4a"}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        className={`transition-all duration-500 ease-in-out ${animateChart || isLoadingChart ? "opacity-40 scale-y-95 origin-bottom" : "opacity-100"
                          }`}
                      />

                      {/* Glowing Endpoint marker */}
                      <circle
                        cx="600"
                        cy={lastY}
                        r="5"
                        fill={isPositive ? "#00e878" : "#ff4a4a"}
                        className={`animate-ping ${animateChart || isLoadingChart ? "opacity-0" : "opacity-100"}`}
                      />
                    </svg>
                  </div>

                  {/* Legend labels */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] text-white/20 border-t border-white/5 pt-4 mt-auto">
                    <span>Performance data is mock historical tracking.</span>
                    <span>Source: Market Center</span>
                  </div>
                </div>

              </div>

              {/* Right: Stock Price and News Card Column */}
              <div className="space-y-6">

                {/* Nasdaq Ticker details */}
                <div className="bg-[#080808]/80 border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[280px] backdrop-blur-md">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[12px] font-black uppercase tracking-[0.12em] text-white/30 mb-2">
                          Nasdaq: USDC
                        </div>
                        {/* Interactive price loader */}
                        <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2 font-sans flex items-baseline gap-1">
                          {isLoadingStock ? (
                            <span className="animate-pulse">---</span>
                          ) : (
                            <span>${liveStockData?.price.toFixed(2) || "0.00"}</span>
                          )}
                          <span className="text-[10px] text-white/30 font-medium font-sans">USD</span>
                        </div>
                      </div>

                      <div className="text-right text-[10px] text-white/30">
                        <div className="mb-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                          {currentDate || "LIVE"}
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                          <Clock className="w-3 h-3 text-white/30" />
                          <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">
                            Real-Time
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stock Metrics summary */}
                    <div className="mt-6 grid grid-cols-2 gap-4 text-sm border-t border-white/5 pt-5">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          Change
                        </div>
                        <div className={`font-bold font-sans ${isPositive ? "text-[#00e878]" : "text-[#ff4a4a]"}`}>
                          {isPositive ? "+" : ""}{liveStockData?.change.toFixed(2) || "0.00"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          Change %
                        </div>
                        <div className={`font-bold font-sans ${isPositive ? "text-[#00e878]" : "text-[#ff4a4a]"}`}>
                          {isPositive ? "+" : ""}{liveStockData?.changePercent.toFixed(2) || "0.00"}%
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          Volume
                        </div>
                        <div className="text-white font-semibold font-sans">
                          {liveStockData ? (liveStockData.volume >= 1000000 ? (liveStockData.volume / 1000000).toFixed(2) + 'M' : (liveStockData.volume / 1000).toFixed(1) + 'K') : "0"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          Open
                        </div>
                        <div className="text-white font-semibold font-sans">${liveStockData?.open.toFixed(2) || "0.00"}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          Today&apos;s High
                        </div>
                        <div className="text-white font-semibold font-sans">${liveStockData?.high.toFixed(2) || "0.00"}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          Today&apos;s Low
                        </div>
                        <div className="text-white font-semibold font-sans">${liveStockData?.low.toFixed(2) || "0.00"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 text-xs text-white/30">
                    <div className="flex items-center justify-between">
                      <div>
                        Market Cap: <span className="text-white font-semibold">$14.2B</span>
                      </div>
                      <div>
                        Avg Vol: <span className="text-white font-semibold">980.5K</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Latest Press Announcements Feed */}
                <div className="bg-[#080808]/80 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md">
                  <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-6 pb-3 border-b border-white/5 text-center lg:text-left">
                    Latest Announcements
                  </h3>

                  <div className="space-y-6">
                    {isLoadingReleases ? (
                      <div className="space-y-6 animate-pulse">
                        {[...Array(3)].map((_, idx) => (
                          <div key={idx} className="block text-center lg:text-left space-y-2">
                            <div className="h-2 w-16 bg-white/5 rounded mx-auto lg:mx-0"></div>
                            <div className="h-4 w-full bg-white/5 rounded"></div>
                            <div className="h-4 w-3/4 bg-white/5 rounded mx-auto lg:mx-0"></div>
                          </div>
                        ))}
                      </div>
                    ) : pressReleases.length === 0 ? (
                      <div className="text-center py-6 text-white/30 text-xs">No press releases found.</div>
                    ) : (
                      pressReleases.slice(0, 3).map((item, idx) => {
                        const dateStr = formatDate(item.date);
                        return (
                          <div key={idx} className="block text-center lg:text-left space-y-1 group">
                            <div className="text-[9px] font-semibold text-[#3daeff] tracking-widest uppercase">
                              {dateStr}
                            </div>
                            <Link
                              href={item.pdf_file?.url || '#'}
                              target={item.pdf_file?.url ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              className="block text-sm font-semibold text-white/80 hover:text-[#3daeff] transition-colors leading-snug line-clamp-2"
                            >
                              {item.title}
                            </Link>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <Link
                      href="/press-release"
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <span>View All Announcements</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ── INVESTOR RESOURCES SECTION ── */}
        <section className="py-20 lg:py-24 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">

            {/* Section Title */}
            <div className="mb-12 lg:mb-16 flex flex-col items-center sm:items-start text-center sm:text-left">
              <h2 className="text-3xl font-semibold uppercase tracking-tighter mb-4">
                Investor Resources
              </h2>
              <div className="h-[2px] w-12 bg-[#3daeff] rounded-full" />
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

              {/* Card 1: SEC Filings */}
              <Link
                href="/sec-filings"
                className="group relative bg-[#0a0a0a]/60 border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#3daeff]/35 transition-all duration-500 block text-center sm:text-left flex flex-col items-center sm:items-start backdrop-blur-sm"
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-[#3daeff] group-hover:bg-[#3daeff]/10 transition-all mx-auto sm:mx-0 mb-6">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-tight">
                    SEC Filings
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    Access financial statements, quarterly reports, and compliance files.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3daeff] hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

              {/* Card 2: Events & Presentations */}
              <Link
                href="/investor"
                className="group relative bg-[#0a0a0a]/60 border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#3daeff]/35 transition-all duration-500 block text-center sm:text-left flex flex-col items-center sm:items-start backdrop-blur-sm"
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-[#3daeff] group-hover:bg-[#3daeff]/10 transition-all mx-auto sm:mx-0 mb-6">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-tight">
                    Events &amp; Presentations
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    View upcoming earnings webcasts and past investor presentations.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3daeff] hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

              {/* Card 3: Stock Information */}
              <Link
                href="/investor"
                className="group relative bg-[#0a0a0a]/60 border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#3daeff]/35 transition-all duration-500 block text-center sm:text-left flex flex-col items-center sm:items-start backdrop-blur-sm"
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-[#3daeff] group-hover:bg-[#3daeff]/10 transition-all mx-auto sm:mx-0 mb-6">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-tight">
                    Stock Information
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    Detailed historical performance and real-time market pricing metrics.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3daeff] hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

              {/* Card 4: Press Releases */}
              <Link
                href="/press-release"
                className="group relative bg-[#0a0a0a]/60 border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#3daeff]/35 transition-all duration-500 block text-center sm:text-left flex flex-col items-center sm:items-start backdrop-blur-sm"
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-[#3daeff] group-hover:bg-[#3daeff]/10 transition-all mx-auto sm:mx-0 mb-6">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-tight">
                    Press Releases
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    Read the latest press distributions and statements from USDC.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3daeff] hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

              {/* Card 5: Governance */}
              <Link
                href="/management-team"
                className="group relative bg-[#0a0a0a]/60 border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#3daeff]/35 transition-all duration-500 block text-center sm:text-left flex flex-col items-center sm:items-start backdrop-blur-sm"
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-[#3daeff] group-hover:bg-[#3daeff]/10 transition-all mx-auto sm:mx-0 mb-6">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-tight">
                    Governance
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    View documents and leadership structure behind corporate oversight.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3daeff] hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

              {/* Card 6: Contact IR */}
              <Link
                href="/contact"
                className="group relative bg-[#0a0a0a]/60 border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#3daeff]/35 transition-all duration-500 block text-center sm:text-left flex flex-col items-center sm:items-start backdrop-blur-sm"
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-[#3daeff] group-hover:bg-[#3daeff]/10 transition-all mx-auto sm:mx-0 mb-6">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-tight">
                    Contact IR
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    Connect with our dedicated investor relations support channels.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3daeff] hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

            </div>

          </div>
        </section>

      </main>

      {/* Partner Section */}
      <PartnerSection />

      {/* Footer component */}
      <Footer />
    </div>
  );
}