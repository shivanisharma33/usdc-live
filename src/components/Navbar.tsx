"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  Menu,
  X,
  Users,
  Newspaper,
  Server,
  Zap,
  Database,
  ChevronRight,
  TrendingUp,
  Globe,
} from "lucide-react";

/* ────────────── Dropdown item config with icons & descriptions ────────────── */

interface DropdownItem {
  label: string;
  href: string;
  description: string;
  icon: React.ElementType;
}

interface NavLink {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

const navLinks: NavLink[] = [
  { label: "About us", href: "/about" },
  { label: "Investor", href: "/investor" },
  { label: "News & insight", href: "/news-insights" },
  {
    label: "Company",
    href: "#",
    dropdown: [
      {
        label: "Management Team",
        href: "/management-team",
        description: "Meet our leadership",
        icon: Users,
      },
      {
        label: "Press Release",
        href: "/press-release",
        description: "Latest announcements",
        icon: Newspaper,
      },
    ],
  },
  {
    label: "Infrastructure",
    href: "#",
    dropdown: [
      {
        label: "ARMS",
        href: "/arms",
        description: "Modular AI systems",
        icon: Server,
      },
      {
        label: "Energy",
        href: "/energy",
        description: "Sustainable power grid",
        icon: Zap,
      },
      {
        label: "Global Network",
        href: "/global-network",
        description: "US footprint backbone",
        icon: Globe,
      },
      {
        label: "Data Center",
        href: "/data-center",
        description: "Enterprise facilities",
        icon: Database,
      },
    ],
  },
  { label: "Career", href: "/career" },
];

/* ═══════════════════════════ Stock Ticker Component ═══════════════════════════ */

function NavbarStockTicker() {
  const [stock, setStock] = useState({ price: 0, changePercent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_MASSIVE_API_KEY;
        if (!apiKey) return;

        const symbol = 'DGXX';
        const today = new Date().toISOString().split('T')[0];
        const [snapshotRes, dailyRes] = await Promise.all([
          fetch(`https://api.massive.com/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`).catch(() => null),
          fetch(`https://api.massive.com/v1/open-close/${symbol}/${today}?adjusted=true&apiKey=${apiKey}`).catch(() => null),
        ]);

        const snapshotData = snapshotRes?.ok ? await snapshotRes.json() : null;
        const dailyData = dailyRes?.ok ? await dailyRes.json() : null;

        const snapshot = snapshotData?.ticker;
        const daily = dailyData;

        const livePrice = Number(snapshot?.day?.c) || Number(daily?.close) || 0;
        const openPrice = Number(snapshot?.day?.o) || Number(daily?.open) || livePrice;

        if (!livePrice) return;
        const change = livePrice - openPrice;
        const changePercent = openPrice ? (change / openPrice) * 100 : 0;

        setStock({ price: livePrice, changePercent });
      } catch (e) {
        console.error("Navbar ticker error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
    const int = setInterval(fetchStock, 60000);
    return () => clearInterval(int);
  }, []);

  if (loading) return <div className="h-9 w-[110px] bg-white/5 animate-pulse rounded-[10px]" />;

  const isPositive = stock.changePercent >= 0;

  return (
    <div className="hidden lg:flex items-center rounded-[10px] border border-white/10 bg-[#070c1a]/50 overflow-hidden backdrop-blur-md cursor-default hover:border-white/20 transition-colors">
      <div className="flex flex-col justify-center px-3 py-1.5 h-[38px]">
        <span className="text-[12px] font-bold text-white font-sans leading-none mb-1">${stock.price.toFixed(2)}</span>
        <span className={`text-[9px] font-bold font-sans leading-none flex items-center gap-0.5 ${isPositive ? 'text-[#00e878]' : 'text-[#ff4a4a]'}`}>
          {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
          <TrendingUp className="w-2.5 h-2.5" style={{ transform: isPositive ? 'none' : 'scaleY(-1)' }} />
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Navbar Component ═══════════════════════════ */

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Delayed close so the dropdown doesn't vanish when moving cursor to it */
  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }, []);

  const handleLinkClick = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(null);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${isScrolled
        ? "bg-[#04070f]/75 border-b border-white/[0.06] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] h-[70px]"
        : "bg-transparent h-[85px]"
        }`}
    >
      

      {/* ═══ Desktop Navigation ═══ */}
      <nav className="hidden md:flex items-center gap-6 ml-auto px-8 py-2.5 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-[10px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300">
      {/* Left Section - USDC Logo */}
      <div className="flex-shrink-0">
        <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
          <Image
            src="/USDC_3 1.png"
            alt="USDC Logo"
            width={140}
            height={50}
            className="h-[46px] w-auto transition-all duration-300"
            priority
          />
        </Link>
      </div>
        <div className="flex items-center gap-[38px]">
          {navLinks.map((link) => {
            if (link.dropdown) {
              const isOpen = openDropdown === link.label;
              return (
                <div
                  key={link.label}
                  className="relative py-1.5"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Dropdown trigger button */}
                  <button
                    className={`flex items-center gap-1.5 text-[15px] font-medium transition-all duration-300 cursor-pointer font-sans ${isOpen ? "text-[#3daeff]" : "text-white/80 hover:text-[#3daeff]"
                      }`}
                  >
                    <span>{link.label}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-all duration-400 ${isOpen ? "rotate-180 text-[#3daeff]" : "text-white/50"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* ═══ Premium Dropdown Panel ═══ */}
                  <div
                    className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[260px] rounded-[16px] overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 ${isOpen
                      ? "opacity-100 visible translate-y-0 scale-100"
                      : "opacity-0 invisible translate-y-3 scale-[0.96] pointer-events-none"
                      }`}
                  >
                    {/* Outer glow border wrapper */}
                    <div
                      className={`rounded-[16px] p-[1px] transition-all duration-500 ${isOpen
                        ? "bg-gradient-to-b from-[#3daeff]/30 via-white/[0.06] to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(61,174,255,0.08)]"
                        : "bg-transparent"
                        }`}
                    >
                      <div className="bg-[#070c1a]/98 backdrop-blur-2xl rounded-[15px] overflow-hidden">
                        {/* Top neon shimmer bar */}
                        <div className="relative h-[2px] w-full overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#3daeff]/60 to-transparent transition-transform duration-700 ${isOpen ? "translate-x-0" : "-translate-x-full"
                              }`}
                          />
                        </div>

                        {/* Menu items */}
                        <div className="p-2">
                          {link.dropdown.map((subLink, idx) => {
                            const IconComp = subLink.icon;
                            return (
                              <Link
                                key={subLink.label}
                                href={subLink.href}
                                onClick={handleLinkClick}
                                className="group relative flex items-center gap-3.5 px-3.5 py-3 rounded-[10px] transition-all duration-300 hover:bg-white/[0.04] overflow-hidden"
                                style={{
                                  transitionDelay: isOpen ? `${idx * 60}ms` : "0ms",
                                  opacity: isOpen ? 1 : 0,
                                  transform: isOpen ? "translateX(0)" : "translateX(-8px)",
                                  transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${isOpen ? idx * 60 : 0}ms, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${isOpen ? idx * 60 : 0}ms, background-color 0.3s`,
                                }}
                              >
                                {/* Hover glow background */}
                                <div className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-[#3daeff]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                                {/* Left accent bar */}
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-0 bg-[#3daeff] rounded-r-full group-hover:h-[55%] transition-all duration-400 shadow-[0_0_10px_#3daeff,0_0_4px_#3daeff]" />

                                {/* Icon container */}
                                <div className="relative flex items-center justify-center w-9 h-9 rounded-[9px] bg-white/[0.03] border border-white/[0.06] group-hover:border-[#3daeff]/25 group-hover:bg-[#3daeff]/[0.06] transition-all duration-300 flex-shrink-0">
                                  <IconComp className="w-4 h-4 text-white/40 group-hover:text-[#3daeff] transition-colors duration-300" />
                                </div>

                                {/* Text content */}
                                <div className="relative flex-1 min-w-0">
                                  <div className="text-[13px] font-semibold text-white/80 group-hover:text-white transition-colors duration-300 leading-tight">
                                    {subLink.label}
                                  </div>
                                  <div className="text-[10.5px] text-white/30 group-hover:text-white/45 transition-colors duration-300 mt-0.5 leading-tight">
                                    {subLink.description}
                                  </div>
                                </div>

                                {/* Arrow indicator */}
                                <ChevronRight className="w-3.5 h-3.5 text-white/0 group-hover:text-[#3daeff]/70 transition-all duration-300 flex-shrink-0 -translate-x-1 group-hover:translate-x-0" />
                              </Link>
                            );
                          })}
                        </div>

                        {/* Bottom subtle gradient fade */}
                        <div className="h-[1px] mx-3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
                        <div className="px-4 py-2.5 flex items-center justify-center">
                          <span className="text-[9px] font-semibold text-white/15 tracking-[0.2em] uppercase font-mono">
                            {link.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-white/80 text-[15px] font-medium hover:text-[#3daeff] transition-colors duration-300 py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#3daeff] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left font-sans"
              >
                {link.label}
              </Link>
            );
          })}

          {/* DigiPowerX Logo */}
          <Link
            href="https://digipowerx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center transition-all duration-300 hover:scale-105 group"
          >
            <div className="absolute inset-0 rounded-[8px] bg-yellow-500/20 blur-md group-hover:bg-yellow-400/40 group-hover:blur-lg transition-all duration-500 opacity-80 group-hover:opacity-100" />
            <div className="relative rounded-[8px] border border-yellow-500/35 group-hover:border-yellow-400/60 overflow-hidden shadow-[0_0_12px_rgba(234,179,8,0.3)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.6)] transition-all duration-500">
              <Image
                src="/digipowerx_logo.png"
                alt="DigiPowerX Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-5 bg-white/[0.12] hidden md:block" />

        <div className="flex items-center gap-4 lg:gap-6">
          <NavbarStockTicker />

          {/* Contact Us Button */}
          <Link
            href="/contact"
            className="hidden sm:flex items-center justify-center gap-2 h-[38px] px-6 bg-gradient-to-r from-[#3daeff] to-[#0082f3] hover:from-[#58c4ff] hover:to-[#0091ff] rounded-[10px] text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(61,174,255,0.25)] hover:shadow-[0_4px_16px_rgba(61,174,255,0.35)] transition-all duration-300 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </Link>
        </div>
      </nav>

      {/* ═══ Mobile Menu Toggle ═══ */}
      <div className="flex md:hidden items-center gap-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-11 h-11 text-white hover:text-[#3daeff] transition-colors duration-200 cursor-pointer border border-white/[0.08] bg-white/[0.03]"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5.5 h-5.5" />
          ) : (
            <Menu className="w-5.5 h-5.5" />
          )}
        </button>
      </div>

      {/* ═══ Mobile Drawer ═══ */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#04070f]/95 border-b border-white/[0.08] backdrop-blur-xl flex flex-col py-6 px-8 gap-[18px] md:hidden shadow-[0_10px_30px_rgba(0,0,0,0.65)] animate-in slide-in-from-top-3 duration-300">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.label} className="flex flex-col w-full border-b border-white/[0.03] pb-2">
                  <div className="text-white/45 text-[11px] font-bold tracking-[0.15em] uppercase py-1.5 font-sans">
                    {link.label}
                  </div>
                  <div className="flex flex-col pl-4 gap-2 mt-1">
                    {link.dropdown.map((subLink) => (
                      <Link
                        key={subLink.label}
                        href={subLink.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white text-[15px] font-[500] hover:text-[#3daeff] transition-colors duration-200 py-1 font-sans"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            if (link.label === "Career") {
              return (
                <div key={link.label} className="flex items-center justify-between py-2 border-b border-white/[0.03] w-full">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-[16px] font-[500] hover:text-[#3daeff] transition-colors duration-200 font-sans"
                  >
                    {link.label}
                  </Link>
                  {/* DigiPowerX Logo with Glow */}
                  <Link
                    href="https://digipowerx.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative flex items-center justify-center transition-all duration-300 hover:scale-105 group mr-2"
                  >
                    <div className="absolute inset-0 rounded-[6px] bg-yellow-500/25 blur-sm group-hover:bg-yellow-400/45 group-hover:blur-md transition-all duration-500 opacity-90" />
                    <div className="relative rounded-[6px] border border-yellow-500/40 overflow-hidden shadow-[0_0_8px_rgba(234,179,8,0.4)] transition-all duration-500">
                      <Image
                        src="/digipowerx_logo.png"
                        alt="DigiPowerX Logo"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-[16px] font-[500] hover:text-[#3daeff] transition-colors duration-200 py-2 border-b border-white/[0.03] font-sans"
              >
                {link.label}
              </Link>
            );
          })}

          <div className="flex items-center justify-center gap-4 mt-2 w-full">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full h-[42px] bg-gradient-to-r from-[#3daeff] to-[#0082f3] rounded-[10px] text-[12px] font-bold text-white hover:from-[#58c4ff] hover:to-[#0091ff] transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
