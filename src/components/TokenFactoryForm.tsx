"use client";

import React, { useState, useEffect } from "react";
import { 
  Coins, 
  HelpCircle, 
  Layers, 
  ShieldCheck, 
  Flame, 
  PauseCircle, 
  Lock, 
  Wallet, 
  Plus, 
  Loader2, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

// Mock Networks list with custom details
const networks = [
  { id: "eth", name: "Ethereum", logo: "ETH", color: "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:border-blue-500/80" },
  { id: "bsc", name: "BNB Chain", logo: "BSC", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30 hover:border-yellow-500/80" },
  { id: "polygon", name: "Polygon", logo: "MATIC", color: "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:border-purple-500/80" },
  { id: "arb", name: "Arbitrum", logo: "ARB", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:border-cyan-500/80" },
  { id: "opt", name: "Optimism", logo: "OP", color: "bg-red-500/10 text-red-500 border-red-500/30 hover:border-red-500/80" },
  { id: "avax", name: "Avalanche", logo: "AVAX", color: "bg-rose-500/10 text-rose-500 border-rose-500/30 hover:border-rose-500/80" },
];

export default function TokenFactoryForm() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    supply: "1000000",
    decimals: "18",
    network: "eth",
    ownerAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  });

  // Token Type / Features
  const [tokenType, setTokenType] = useState({
    mintable: false,
    burnable: true, // Default checked
    pausable: false,
    standard: true,
  });

  // Handle changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (type: "mintable" | "burnable" | "pausable" | "standard") => {
    if (type === "standard") {
      setTokenType({
        standard: true,
        mintable: false,
        burnable: false,
        pausable: false,
      });
    } else {
      setTokenType((prev) => {
        const updated = { ...prev, [type]: !prev[type], standard: false };
        // If all are unchecked, fallback to standard
        if (!updated.mintable && !updated.burnable && !updated.pausable) {
          updated.standard = true;
        }
        return updated;
      });
    }
  };

  const connectWallet = () => {
    setWalletConnected(true);
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
  };

  // Run mock deployment steps
  const handleCreateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletConnected) return;
    if (!formData.name || !formData.symbol) return;

    setLoading(true);
    setDeployStep(0);
    setSuccess(false);
  };

  // Mock deployment log animation
  useEffect(() => {
    if (!loading) return;

    const intervals = [1000, 1200, 1500, 1800, 1200];
    let step = 0;

    const executeStep = () => {
      if (step < 4) {
        step++;
        setDeployStep(step);
        setTimeout(executeStep, intervals[step - 1]);
      } else {
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
        }, 1000);
      }
    };

    setTimeout(executeStep, intervals[0]);
  }, [loading]);

  const deployLogs = [
    "Compiling smart contract templates & optimizing solidity bytecode...",
    "Simulating contract deployment & calculating transaction gas limits...",
    "Awaiting MetaMask cryptographic wallet signature approval...",
    "Broadcasting signed transaction to network nodes mempool...",
    "Contract mined successfully! Optimizing storage slots & verifying bytecode...",
  ];

  return (
    <div className="w-full relative z-10">
      {/* Outer border glow wrap */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl -z-10" />

      {/* Main Glassmorphic Panel */}
      <div className="bg-[#0b1020]/75 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Neon accent top bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_1px_15px_rgba(6,182,212,0.8)]" />

        {/* Header / Wallet Status */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/5 pb-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Token Configurator
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Configure parameters to deploy your custom ERC-20 token on-chain.
            </p>
          </div>

          {/* Wallet State Button */}
          {walletConnected ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-mono font-medium shadow-[0_0_15px_rgba(16,185,129,0.05)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{formData.ownerAddress.slice(0, 6)}...{formData.ownerAddress.slice(-4)}</span>
              <button 
                onClick={disconnectWallet}
                className="ml-2 text-slate-400 hover:text-white transition-colors"
                title="Disconnect Wallet"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.45)] border border-cyan-400/20 active:scale-95 transition-all"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          )}
        </div>

        {/* SUCCESS PANEL */}
        {success ? (
          <div className="py-8 text-center flex flex-col items-center justify-center animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Token Launched!</h4>
            <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
              Your custom token <span className="text-cyan-400 font-bold">{formData.name} ({formData.symbol})</span> has been successfully deployed and verified on-chain.
            </p>

            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 w-full max-w-md font-mono text-xs text-left mb-8 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Contract Address:</span>
                <span className="text-slate-300 select-all hover:text-cyan-400 cursor-pointer">0x9F7aF...bA57</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Supply:</span>
                <span className="text-slate-300">
                  {Number(formData.supply).toLocaleString()} {formData.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Network:</span>
                <span className="text-cyan-400 capitalize">{formData.network === "eth" ? "Ethereum Mainnet" : networks.find(n => n.id === formData.network)?.name}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                View on Block Explorer
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setSuccess(false)}
                className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium text-sm rounded-xl transition-all"
              >
                Create Another Token
              </button>
            </div>
          </div>
        ) : loading ? (
          /* DEPLOYMENT PROCESS PANEL */
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="relative w-20 h-20 mb-8">
              {/* Pulsing ring outer */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
              {/* Spinner inside */}
              <div className="absolute inset-0 bg-[#070c1a] border-4 border-t-cyan-400 border-b-purple-500 border-l-cyan-400/30 border-r-purple-500/30 rounded-full animate-spin" />
              <div className="absolute inset-2 bg-[#0b1020] rounded-full flex items-center justify-center">
                <Coins className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
            </div>

            <h4 className="text-xl font-bold text-white mb-2">Deploying Custom Token</h4>
            <p className="text-slate-400 text-xs text-center max-w-sm mb-8">
              Running compiler routines, estimating gas fees, and submitting contract deployment details.
            </p>

            {/* Stepper Display */}
            <div className="w-full max-w-lg space-y-4">
              {deployLogs.map((log, index) => {
                const isCompleted = index < deployStep;
                const isActive = index === deployStep;

                return (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 p-3 rounded-xl border text-xs transition-all duration-300 ${
                      isCompleted 
                        ? "bg-emerald-950/10 border-emerald-500/20 text-emerald-400" 
                        : isActive 
                        ? "bg-blue-950/30 border-blue-500/40 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                        : "bg-transparent border-transparent text-slate-600"
                    }`}
                  >
                    <div className="mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isActive ? (
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-sans font-bold text-slate-500">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 font-mono">{log}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* CONFIGURATION FORM */
          <form onSubmit={handleCreateToken} className="space-y-6">
            
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Token Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  Token Name
                  <span className="cursor-help" title="The full readable name of your token (e.g. Tether)">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Aetherium"
                    required
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-400/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
                  />
                  <div className="absolute right-3.5 top-3.5 text-slate-600">
                    <Coins className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Token Symbol */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  Token Symbol
                  <span className="cursor-help" title="The ticker symbol of your token (e.g. USDT)">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  </span>
                </label>
                <input
                  type="text"
                  name="symbol"
                  value={formData.symbol}
                  onChange={handleInputChange}
                  placeholder="e.g. ATH"
                  required
                  className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-400/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* Initial Supply */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  Initial Supply
                  <span className="cursor-help" title="Total number of tokens created at initialization.">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  </span>
                </label>
                <input
                  type="number"
                  name="supply"
                  value={formData.supply}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-400/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* Decimals */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  Decimals
                  <span className="cursor-help" title="Usually 18, representing the decimal divisions of the token.">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  </span>
                </label>
                <select
                  name="decimals"
                  value={formData.decimals}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-400/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="18">18 (Standard/EVM)</option>
                  <option value="9">9 (Solana SPL)</option>
                  <option value="8">8 (Bitcoin Wrapper)</option>
                  <option value="6">6 (USDC/USDT Style)</option>
                  <option value="0">0 (Non-divisible)</option>
                </select>
              </div>

            </div>

            {/* Network Selection (Premium Styled Grid) */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 block">
                Target Network Selection
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {networks.map((net) => {
                  const isSelected = formData.network === net.id;
                  return (
                    <button
                      key={net.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, network: net.id }))}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                        isSelected 
                          ? "bg-gradient-to-br from-blue-900/30 via-slate-900/50 to-purple-900/30 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-white" 
                          : "bg-slate-900/30 border-white/5 text-slate-400 hover:bg-slate-900/60"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30" : "bg-white/5 border border-white/10"
                      }`}>
                        {net.logo}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-tight">{net.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {net.id === "eth" ? "Mainnet" : "L2 Chain"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Token Type Option Cards */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 block">
                Token Type Options & Logic Features
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {/* Standard */}
                <button
                  type="button"
                  onClick={() => handleToggle("standard")}
                  className={`flex flex-col items-start p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    tokenType.standard
                      ? "bg-blue-500/10 border-blue-500/40 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                      : "bg-slate-900/30 border-white/5 text-slate-400 hover:bg-slate-900/60"
                  }`}
                >
                  <Layers className={`w-5 h-5 mb-2 ${tokenType.standard ? "text-blue-400" : "text-slate-500"}`} />
                  <span className="text-xs font-bold">Standard</span>
                  <span className="text-[10px] text-slate-500 mt-1">Simple ERC-20 fixed supply transfer.</span>
                </button>

                {/* Mintable */}
                <button
                  type="button"
                  onClick={() => handleToggle("mintable")}
                  className={`flex flex-col items-start p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    tokenType.mintable
                      ? "bg-purple-500/10 border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                      : "bg-slate-900/30 border-white/5 text-slate-400 hover:bg-slate-900/60"
                  }`}
                >
                  <Plus className={`w-5 h-5 mb-2 ${tokenType.mintable ? "text-purple-400" : "text-slate-500"}`} />
                  <span className="text-xs font-bold">Mintable</span>
                  <span className="text-[10px] text-slate-500 mt-1">Allows creating new tokens after deployment.</span>
                </button>

                {/* Burnable */}
                <button
                  type="button"
                  onClick={() => handleToggle("burnable")}
                  className={`flex flex-col items-start p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    tokenType.burnable
                      ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                      : "bg-slate-900/30 border-white/5 text-slate-400 hover:bg-slate-900/60"
                  }`}
                >
                  <Flame className={`w-5 h-5 mb-2 ${tokenType.burnable ? "text-cyan-400" : "text-slate-500"}`} />
                  <span className="text-xs font-bold">Burnable</span>
                  <span className="text-[10px] text-slate-500 mt-1">Tokens can be burned/deleted to reduce supply.</span>
                </button>

                {/* Pausable */}
                <button
                  type="button"
                  onClick={() => handleToggle("pausable")}
                  className={`flex flex-col items-start p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    tokenType.pausable
                      ? "bg-red-500/10 border-red-500/40 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                      : "bg-slate-900/30 border-white/5 text-slate-400 hover:bg-slate-900/60"
                  }`}
                >
                  <PauseCircle className={`w-5 h-5 mb-2 ${tokenType.pausable ? "text-red-400" : "text-slate-500"}`} />
                  <span className="text-xs font-bold">Pausable</span>
                  <span className="text-[10px] text-slate-500 mt-1">Emergency freeze capability in contract.</span>
                </button>
              </div>
            </div>

            {/* Owner Address (Initially Disabled) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                Owner / Admin Address
                <Lock className="w-3.5 h-3.5 text-slate-500" />
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="ownerAddress"
                  value={walletConnected ? formData.ownerAddress : "Please connect your cryptographic wallet..."}
                  disabled
                  className={`w-full border rounded-xl px-4 py-3 text-sm font-mono outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] ${
                    walletConnected 
                      ? "bg-slate-950 border-emerald-500/30 text-emerald-400 cursor-not-allowed" 
                      : "bg-slate-900/40 border-white/5 text-slate-600 cursor-not-allowed"
                  }`}
                />
                {!walletConnected && (
                  <button
                    type="button"
                    onClick={connectWallet}
                    className="absolute right-2 top-2 bg-blue-500 hover:bg-blue-600 text-white font-medium text-xs rounded-lg px-3 py-1.5 flex items-center gap-1 shadow-md transition-colors"
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    Unlock
                  </button>
                )}
              </div>
            </div>

            {/* Submit / Create CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
              {!walletConnected ? (
                <button
                  type="button"
                  onClick={connectWallet}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all active:scale-98 cursor-pointer"
                >
                  <Wallet className="w-5 h-5 animate-pulse" />
                  Connect Wallet to Deploy Token
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button
                    type="button"
                    onClick={disconnectWallet}
                    className="w-full sm:w-1/3 px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl active:scale-98 transition-all"
                  >
                    Disconnect Wallet
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-2/3 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500 text-white font-black rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:shadow-[0_0_35px_rgba(6,182,212,0.65)] hover:scale-[1.01] active:scale-98 cursor-pointer"
                  >
                    Create Token & Deploy
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
