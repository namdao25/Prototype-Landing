/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CompanionMockup } from "./components/CompanionMockup";
import { GamerCardBuilder } from "./components/GamerCardBuilder";
import { GamerAvatar } from "./components/GamerAvatar";
import { INITIAL_TEAMMATES, REVIEWS, FAQ_ITEMS } from "./data";
import { GamerProfile, GameName } from "./types";
import {
  Sparkles,
  Search,
  CheckCircle2,
  Tv,
  Gamepad2,
  Users2,
  MessageCircle,
  HelpCircle,
  Mail,
  Shield,
  Star,
  Zap,
  Volume2,
  Menu,
  X,
  Plus,
  Compass,
  Layers,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function App() {
  // Community active lobby state (includes predefined directory + custom built cards)
  const [activeCommunityMates, setActiveCommunityMates] = useState<GamerProfile[]>(INITIAL_TEAMMATES);
  
  // Interaction/Filtering states for the community board
  const [boardGameFilter, setBoardGameFilter] = useState<string>("all");
  const [boardSearchQuery, setBoardSearchQuery] = useState<string>("");
  const [boardRoleFilter, setBoardRoleFilter] = useState<string>("all");

  // Email Sign Up Form States
  const [registrationEmail, setRegistrationEmail] = useState<string>("");
  const [registeredEmailNumber, setRegisteredEmailNumber] = useState<number | null>(null);
  const [earlyAccessTag, setEarlyAccessTag] = useState<string>("");

  // FAQ Expand states
  const [expandedFAQ, setExpandedFAQ] = useState<Record<number, boolean>>({});

  // Mobile Menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Profile modal inside main community board
  const [selectedBoardDetail, setSelectedBoardDetail] = useState<GamerProfile | null>(null);

  // Local storage backup for registered early access count
  useEffect(() => {
    const savedCount = localStorage.getItem("queuemate_early_access_user");
    if (savedCount) {
      setRegisteredEmailNumber(parseInt(savedCount, 10));
    }
  }, []);

  const handleRegisterProfile = (newProfile: GamerProfile) => {
    // Add custom built gamer card to the top of the directory board
    setActiveCommunityMates((prev) => [newProfile, ...prev]);
    
    // Auto scroll to community lobby to show their card instantly added
    const element = document.getElementById("lobby-board");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEarlyAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationEmail.trim()) return;

    // Simulate early access sequence
    const rngNumber = Math.floor(7000 + Math.random() * 800);
    localStorage.setItem("queuemate_early_access_user", rngNumber.toString());
    setRegisteredEmailNumber(rngNumber);
    setEarlyAccessTag(registrationEmail.split("@")[0].toUpperCase() + "-COMP-64");
    setRegistrationEmail("");
  };

  const toggleFAQ = (idx: number) => {
    setExpandedFAQ((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Switch community search automatically
  const quickSearchGame = (game: string) => {
    setBoardGameFilter(game);
    const element = document.getElementById("lobby-board");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-retro-cream text-retro-maroon font-body selection:bg-retro-orange selection:text-retro-cream">
      {/* 1. Brand Header / Top Navigation Bar */}
      <header className="sticky top-0 bg-retro-cream/90 backdrop-blur-md z-40 border-b-3 border-retro-maroon">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          {/* Logo Brand Frame */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-10 h-10 bg-retro-orange border-wood shadow-wood-sm rounded-lg flex items-center justify-center font-serif text-lg font-black text-retro-cream select-none group-hover:bg-retro-gold transition-colors">
              QM
            </div>
            <div>
              <span className="font-serif font-black text-lg tracking-tight uppercase block leading-none">
                QueueMate
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-retro-orange mt-0.5 block">
                SQUAD MATCHMAKER
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 font-sans text-xs font-bold uppercase tracking-widest text-retro-maroon-light">
            <a href="#companion-app" className="px-3.5 py-1.5 hover:bg-retro-beige/45 rounded-lg border-b-2 border-transparent hover:border-retro-orange transition-colors">
              Companion App
            </a>
            <a href="#features" className="px-3.5 py-1.5 hover:bg-retro-beige/45 rounded-lg border-b-2 border-transparent hover:border-retro-gold transition-colors">
              Trust Engine
            </a>
            <a href="#card-builder" className="px-3.5 py-1.5 hover:bg-retro-beige/45 rounded-lg border-b-2 border-transparent hover:border-retro-sage transition-colors">
              Card Sandbox
            </a>
            <a href="#lobby-board" className="px-3.5 py-1.5 hover:bg-retro-beige/45 rounded-lg border-b-2 border-transparent hover:border-retro-maroon transition-colors">
              Active Lobby
            </a>
            <a href="#faq" className="px-3.5 py-1.5 hover:bg-retro-beige/45 rounded-lg border-b-2 border-transparent hover:border-retro-maroon-light transition-colors">
              Trust FAQ
            </a>
          </nav>

          {/* CTA Header Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <a
              href="#early-access"
              className="px-4 py-2.5 bg-retro-maroon hover:bg-retro-maroon-light text-retro-cream border-wood shadow-wood hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-wood-sm active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-[11px] font-sans font-black tracking-wider uppercase rounded-lg"
            >
              Get Download Handle
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 bg-retro-beige/50 border-wood-thin rounded-lg text-retro-maroon focus:outline-none"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile slide drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-retro-cream border-t-3 border-retro-maroon overflow-hidden font-sans text-xs font-black uppercase tracking-wider text-retro-maroon"
            >
              <div className="px-4 py-4 space-y-3 flex flex-col">
                <a
                  href="#companion-app"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-retro-maroon/5 hover:text-retro-orange flex justify-between"
                >
                  <span>1. Companion App Demo</span>
                  <span>→</span>
                </a>
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-retro-maroon/5 hover:text-retro-gold flex justify-between"
                >
                  <span>2. Core Trust System</span>
                  <span>→</span>
                </a>
                <a
                  href="#card-builder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-retro-maroon/5 hover:text-retro-sage flex justify-between"
                >
                  <span>3. Sandbox Builder</span>
                  <span>→</span>
                </a>
                <a
                  href="#lobby-board"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-retro-maroon/5 hover:text-retro-maroon flex justify-between"
                >
                  <span>4. Active Lobbies</span>
                  <span>→</span>
                </a>
                <a
                  href="#early-access"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 bg-retro-orange text-retro-cream border-wood shadow-wood text-center uppercase tracking-widest mt-2"
                >
                  CLAIM FOUNDER HANDLE
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Cozy Hero segment with display fonts & decorative elements */}
      <section className="relative px-4 md:px-8 py-12 md:py-20 overflow-hidden bg-gradient-to-b from-retro-cream via-retro-cream to-retro-beige/15 border-b-3 border-retro-maroon">
        {/* Background Retro Grid Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#2C0B12_1.5px,transparent_1.5px),linear-gradient(to_bottom,#2C0B12_1.5px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative">
          {/* Aesthetic Stickers and badges */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto select-none">
            <span className="inline-flex items-center space-x-1 text-[10px] font-sans font-black uppercase tracking-wider bg-retro-orange/10 text-retro-orange px-3 py-1 rounded-full border-wood-thin border-retro-orange/20 shadow-wood-sm">
              <Sparkles size={11} className="animate-spin" />
              <span>★ 100% Anti-Toxic Verified</span>
            </span>
            <span className="inline-flex items-center space-x-1 text-[10px] font-sans font-black uppercase tracking-wider bg-retro-gold/10 text-retro-gold px-3 py-1 rounded-full border-wood-thin border-retro-gold/20 shadow-wood-sm">
              <span>✦ SQUAD MATCHES BY VIBE</span>
            </span>
            <span className="inline-flex items-center space-x-1 text-[10px] font-sans font-black uppercase tracking-wider bg-retro-sage/10 text-retro-sage px-3 py-1 rounded-full border-wood-thin border-retro-sage/20 shadow-wood-sm">
              <span>✔ DISCORD SYNC</span>
            </span>
          </div>

          {/* Epic Editorial Header serif typography */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-retro-maroon tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Gamer squads assembled by <span className="text-retro-orange underline decoration-retro-gold decoration-4 underline-offset-4">vibes</span>, not just toxic stats
          </h1>

          {/* Subtext description */}
          <p className="font-body text-sm sm:text-base md:text-lg text-retro-maroon-light/85 max-w-2xl mx-auto leading-relaxed">
            Solo queuing is a lottery of bad communication, toxic matches, and throwers. 
            <strong> QueueMate</strong> pairs you with consistent, reliable, and goal-aligning gamers for Valorant, Apex, CS2, and Overwatch 2.
          </p>

          {/* CTA Hero actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#companion-app"
              className="w-full sm:w-auto px-8 py-4 bg-retro-orange text-retro-cream border-wood shadow-wood-lg hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-wood active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all font-sans font-black text-xs tracking-widest uppercase rounded-xl"
            >
              Launch Live App Demo 🗲
            </a>
            <a
              href="#card-builder"
              className="w-full sm:w-auto px-8 py-4 bg-retro-cream hover:bg-retro-beige/40 text-retro-maroon border-wood shadow-wood-lg hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-wood active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all font-sans font-black text-xs tracking-widest uppercase rounded-xl"
            >
              Build your Gamer Card →
            </a>
          </div>

          {/* Micro stats banner indicator */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center font-sans border-t border-retro-maroon/10">
            <div>
              <div className="text-2xl font-serif font-black text-retro-maroon">2,110+</div>
              <div className="text-[10px] text-retro-maroon-light/60 font-bold uppercase tracking-wider mt-0.5">Lobbies Active Tonight</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-black text-retro-orange">14ms</div>
              <div className="text-[10px] text-retro-maroon-light/60 font-bold uppercase tracking-wider mt-0.5">Average Match Speed</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-black text-retro-sage">99.4%</div>
              <div className="text-[10px] text-retro-maroon-light/60 font-bold uppercase tracking-wider mt-0.5">Non-Toxic Session Rating</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-black text-retro-gold">14,240</div>
              <div className="text-[10px] text-retro-maroon-light/60 font-bold uppercase tracking-wider mt-0.5">Discord Channels Sync</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Desktop Companion App Mockup Frame Section */}
      <section id="companion-app" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto border-b-3 border-retro-maroon bg-retro-beige/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-retro-sage bg-retro-sage/10 px-2.5 py-1 border-wood-thin rounded-full uppercase">
              Interact Live
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-retro-maroon tracking-tight leading-tight">
              A companion deck designed for your second screen
            </h2>
            <p className="font-body text-sm text-retro-maroon-light/85 leading-relaxed">
              We took the desktop mockup from our dev logs and engineered it into a live clickable experience. 
              <strong> Select a game mode, toggle requirements, and hit "Start Queue Setup"</strong> to match within simulated live databases. 
              Review recommendations, click directories, and try ratings immediately.
            </p>
            <div className="space-y-2.5 pt-3">
              <div className="flex items-start space-x-2.5 text-xs text-retro-maroon-light/90">
                <span className="p-1 px-2.5 bg-retro-orange text-retro-cream font-mono font-bold border-wood-thin rounded shadow-wood-sm">P5</span>
                <p className="mt-0.5">
                  <strong>Deep matchmaking algorithm</strong> aligns comms methods, roles, and game speed preferences.
                </p>
              </div>
              <div className="flex items-start space-x-2.5 text-xs text-retro-maroon-light/90">
                <span className="p-1 px-2.5 bg-retro-gold text-retro-cream font-mono font-bold border-wood-thin rounded shadow-wood-sm">P8</span>
                <p className="mt-0.5">
                  <strong>QR mobile pairing</strong> syncs queue alerts, voice chat channels, and lets you accept ready indicators.
                </p>
              </div>
            </div>
          </div>

          {/* Beautiful side caption reminding they are browsing components */}
          <div className="lg:col-span-7 bg-retro-cream border-3 border-retro-maroon shadow-wood p-3.5 rounded-lg text-center font-sans text-xs font-bold bg-[radial-gradient(#ECE2D0_15%,transparent_16%)] bg-[length:12px_12px]">
            <span className="inline-block bg-retro-cream px-3 py-1 border-wood-thin uppercase text-retro-orange font-black mb-1 rounded">
              ★ NO AI SLOP • HAND-CONSTRUCTED DESIGN LAB LOBBY ★
            </span>
          </div>
        </div>

        {/* The Live Interactive App Mockup Component */}
        <CompanionMockup />
      </section>

      {/* 4. Core Features / Trust System Details Grid */}
      <section id="features" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto border-b-3 border-retro-maroon">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-retro-orange uppercase">
            Product Mechanics
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-retro-maroon">
            How we maintain a pristine gaming culture
          </h2>
          <p className="text-sm text-retro-maroon-light/80 max-w-xl mx-auto leading-relaxed">
            Unlike raw chats where toxicity thrives, QueueMate aligns schedules, manners, and competitive strategies via three pillar mechanics:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-retro-cream border-wood shadow-wood rounded-2xl p-6 space-y-4 hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-wood-sm transition-all">
            <div className="w-12 h-12 bg-retro-orange/10 border-wood-thin text-retro-orange rounded-xl flex items-center justify-center font-bold">
              <Zap size={22} />
            </div>
            <h3 className="font-serif text-xl font-black">1. Anti-Toxic Reputation Multipliers</h3>
            <p className="text-xs leading-relaxed text-retro-maroon-light/90">
              When a session completes, buddies exchange quick micro-endorsements ("Clear callouts", "Positive attitude", "Calm mental under pressure"). 
              Accumulating these endorsements scales your user profile <strong>"Trust Multiplier"</strong>, placing you in premium, low-toxic lobbies.
            </p>
            <div className="pt-2 border-t border-retro-maroon/10 text-[10px] font-mono uppercase text-retro-orange font-bold flex items-center gap-1">
              <span>★ SYSTEM ENDORSED PARADIGM</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-retro-cream border-wood shadow-wood rounded-2xl p-6 space-y-4 hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-wood-sm transition-all">
            <div className="w-12 h-12 bg-retro-gold/10 border-wood-thin text-retro-gold rounded-xl flex items-center justify-center font-bold">
              <Shield size={22} />
            </div>
            <h3 className="font-serif text-xl font-black">2. Unified Goal Alignment Selector</h3>
            <p className="text-xs leading-relaxed text-retro-maroon-light/90">
              Stop matching with a duelist who wants to throw for clips when you are pushing for Immortal. 
              Our companion app configures whether your play session is oriented around <strong>intense sweaty climbing, coordination practice, or casual midnight vibes</strong>.
            </p>
            <div className="pt-2 border-t border-retro-maroon/10 text-[10px] font-mono uppercase text-retro-gold font-bold flex items-center gap-1">
              <span>✦ PURPOSE-DRIVEN MATCHINGS</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-retro-cream border-wood shadow-wood rounded-2xl p-6 space-y-4 hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-wood-sm transition-all">
            <div className="w-12 h-12 bg-retro-sage/10 border-wood-thin text-retro-sage rounded-xl flex items-center justify-center font-bold">
              <Tv size={22} />
            </div>
            <h3 className="font-serif text-xl font-black">3. Double-Screen Mobile Link</h3>
            <p className="text-xs leading-relaxed text-retro-maroon-light/90">
              Link up seamlessly using double screen architecture. Monitor waitlists, sync Discord credentials, type quick chats, and accept ready confirmations from your phone while your PC acts as a focused, lag-free gameplay window.
            </p>
            <div className="pt-2 border-t border-retro-maroon/10 text-[10px] font-mono uppercase text-retro-sage font-bold flex items-center gap-1">
              <span>✔ SYSTEM-SYNC ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Playstyle Sandbox & Custom Gamer Card Builder Section */}
      <section id="card-builder" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto border-b-3 border-retro-maroon bg-retro-beige/10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-retro-orange uppercase">
            Interactive Playstyle Sandbox
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-retro-maroon">
            Design your QueueMate card
          </h2>
          <p className="text-sm text-retro-maroon-light/80 max-w-xl mx-auto leading-relaxed">
            Configure your active game, main role category, communication style, and specialty agents. 
            <strong> Clicking "Register Gamer Card"</strong> will append your card live to our active lobby board.
          </p>
        </div>

        {/* Card Builder Component */}
        <GamerCardBuilder onRegister={handleRegisterProfile} />
      </section>

      {/* 6. Live Squad Lobbies Board Section (Integrates predefined profiles + newly created builder profiles) */}
      <section id="lobby-board" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto border-b-3 border-retro-maroon">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-retro-sage bg-retro-sage/10 px-2.5 py-1 border-wood-thin rounded-full uppercase">
              Lobby Directory Board
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mt-3 text-retro-maroon leading-none">
              Gamers ready to queue right now
            </h2>
            <p className="text-xs text-retro-maroon-light/70 mt-1 max-w-xl">
              These players have active client windows loaded. Filter by titles, search strategic terms, or click "Ping Team" to simulate instant connection setup.
            </p>
          </div>

          {/* Quick toggle filter */}
          <div className="flex flex-wrap gap-1 bg-retro-beige p-1 border-wood rounded-lg self-start">
            <button
              onClick={() => setBoardGameFilter("all")}
              className={`text-[11px] font-sans font-bold px-3 py-1.5 rounded uppercase transition-colors ${
                boardGameFilter === "all"
                  ? "bg-retro-maroon text-retro-cream"
                  : "text-retro-maroon hover:bg-retro-beige/60"
              }`}
            >
              All games
            </button>
            {Object.values(GameName).map((g) => (
              <button
                key={g}
                onClick={() => setBoardGameFilter(g)}
                className={`text-[11px] font-sans font-bold px-3 py-1.5 rounded uppercase transition-colors ${
                  boardGameFilter === g
                    ? "bg-retro-maroon text-retro-cream"
                    : "text-retro-maroon hover:bg-retro-beige/60"
                }`}
              >
                {g === GameName.VALORANT ? "Valorant" : g === GameName.APEX_LEGENDS ? "Apex" : g === GameName.CS2 ? "CS2" : "Overwatch"}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Controls and Filters Board Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-retro-beige/20 rounded-xl border-wood-thin">
          <div>
            <label className="text-[9px] font-sans font-black block mb-1">KEYWORD CRITERIA</label>
            <div className="flex bg-retro-cream border-wood-thin rounded-lg p-2 items-center space-x-2">
              <Search size={14} className="opacity-40" />
              <input
                type="text"
                placeholder="Search: Omen, Diamond, aggressive..."
                className="bg-transparent border-none focus:outline-none text-xs font-bold w-full placeholder-retro-maroon/30"
                value={boardSearchQuery}
                onChange={(e) => setBoardSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-[9px] font-sans font-black block mb-1">COMMS COVETED</label>
            <select
              className="w-full text-xs font-bold bg-retro-cream p-2.5 border-wood-thin rounded-lg focus:outline-none cursor-pointer"
              value={boardRoleFilter}
              onChange={(e) => setBoardRoleFilter(e.target.value)}
            >
              <option value="all">Any Strategy Angle / Role</option>
              <option value="duelist">Duelist / Entry Fraggers</option>
              <option value="support">Support / Smoke Maestros / Healers</option>
              <option value="strategic">Strategic / IGL Leaders</option>
            </select>
          </div>

          <div>
            <label className="text-[9px] font-sans font-black block mb-1">TOTAL VERIFIED ACTIVE MATCHES</label>
            <div className="text-xs p-2.5 bg-retro-cream border-wood-thin rounded-lg font-bold flex justify-between items-center text-retro-sage leading-none">
              <span>● MULTIPLIER BROADCASTING</span>
              <span className="font-mono bg-retro-sage/10 rounded px-1.5 py-0.5 border border-retro-sage/20">
                {activeCommunityMates.length} gamers online
              </span>
            </div>
          </div>
        </div>

        {/* Filtered Grid list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCommunityMates
            .filter((p) => {
              // Game constraint
              if (boardGameFilter !== "all" && p.game !== boardGameFilter) return false;
              // Role/Strat Categories
              if (boardRoleFilter !== "all") {
                const roleLower = p.role.toLowerCase();
                const playstyleLower = p.playstyle.toLowerCase();
                if (boardRoleFilter === "duelist") {
                  if (!roleLower.includes("duelist") && !roleLower.includes("entry") && !playstyleLower.includes("aggressive")) return false;
                }
                if (boardRoleFilter === "support") {
                  if (!roleLower.includes("controller") && !roleLower.includes("support") && !roleLower.includes("sentinel") && !roleLower.includes("healer") && !playstyleLower.includes("support")) return false;
                }
                if (boardRoleFilter === "strategic") {
                  if (!roleLower.includes("igl") && !roleLower.includes("initiator") && !playstyleLower.includes("strategic")) return false;
                }
              }
              // Text Search Query
              if (boardSearchQuery) {
                const q = boardSearchQuery.toLowerCase();
                return (
                  p.name.toLowerCase().includes(q) ||
                  p.description.toLowerCase().includes(q) ||
                  p.rank.toLowerCase().includes(q) ||
                  p.role.toLowerCase().includes(q) ||
                  p.favoriteAgents.some((a) => a.toLowerCase().includes(q))
                );
              }
              return true;
            })
            .map((player) => (
              <div
                key={player.id}
                className="bg-retro-cream border-wood shadow-wood rounded-2xl p-5 flex flex-col justify-between group transition-transform hover:scale-101 min-h-[360px]"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <GamerAvatar seed={player.avatarSeed} size={42} bgColor={player.avatarColor} />
                      <div>
                        <h4 className="font-serif font-black text-sm uppercase leading-tight text-retro-maroon group-hover:text-retro-orange transition-colors">
                          {player.name}
                        </h4>
                        <span className="text-[10px] font-mono text-retro-maroon-light/60 block truncate mt-0.5">
                          {player.game} • {player.rank}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-retro-sage font-mono font-bold bg-retro-sage/10 px-1.5 py-0.5 border border-retro-sage/20 rounded">
                      ★ {player.vibeScore}% Vibe
                    </span>
                  </div>

                  {/* Gamer bio snippet */}
                  <p className="text-xs leading-relaxed italic text-retro-maroon-light/80 my-4 bg-retro-beige/15 p-2.5 rounded border border-retro-maroon/10 min-h-[58px]">
                    "{player.description}"
                  </p>

                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] font-mono font-bold bg-retro-orange/10 text-retro-orange border-wood-thin px-2 py-0.5 rounded">
                      {player.role}
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-retro-gold/10 text-retro-gold border-wood-thin px-2 py-0.5 rounded">
                      {player.playstyle}
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-retro-sage/10 text-retro-sage border-wood-thin px-2 py-0.5 rounded">
                      {player.comms.split(" ")[0]}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mt-5 pt-3.5 border-t border-retro-maroon/10">
                  <button
                    onClick={() => setSelectedBoardDetail(player)}
                    className="w-full text-center py-1.5 bg-retro-beige text-[10px] font-sans font-black border-wood-thin hover:bg-retro-maroon hover:text-retro-cream transition-all rounded uppercase"
                  >
                    Dossier Archive
                  </button>
                  <button
                    onClick={() => {
                      alert(`Direct connection established. Lobby Ping Sent to ${player.name}! Discord handle and NFC credentials cached successfully: ${player.discordTag}`);
                    }}
                    className="w-full text-center py-1.5 bg-retro-orange text-retro-cream border-wood shadow-wood-sm text-[10px] font-sans font-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-wood-sm transition-all rounded uppercase"
                  >
                    Ping Gamer
                  </button>
                </div>
              </div>
            ))}

          {activeCommunityMates.length === 0 && (
            <div className="col-span-full py-16 text-center text-retro-maroon-light/50">
              <p className="font-serif italic text-lg text-retro-maroon">No squad members verified inside active lobby.</p>
              <p className="text-xs mt-1">Adjust filters or create your own card above to inject database records!</p>
            </div>
          )}
        </div>
      </section>

      {/* 7. Verification / Editorial Testimonials Section */}
      <section className="px-4 md:px-8 py-16 md:py-24 bg-gradient-to-br from-retro-maroon to-retro-maroon-light text-retro-cream border-t-3 border-b-3 border-retro-maroon relative">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-retro-gold bg-retro-gold/10 px-3 py-1 border border-retro-gold/20 rounded-full uppercase">
              Verifiable Vows
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black mt-3">
              Proven results from the FPS leaderboard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {REVIEWS.map((r, idx) => (
              <div
                key={r.id}
                className="bg-retro-maroon-light border-2 border-retro-cream/20 px-5 py-6 rounded-xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex text-retro-gold text-sm leading-none">
                    {[...Array(r.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-[11.5px] text-retro-cream/80 leading-relaxed italic">
                    "{r.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-2.5 pt-3.5 border-t border-retro-cream/10">
                  <div className="w-8 h-8 rounded-full bg-retro-orange/30 border border-retro-cream/20 flex items-center justify-center">
                    <span className="font-serif font-black text-[10px] text-retro-gold">{r.author.substring(0, 2)}</span>
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black uppercase text-retro-cream">{r.author}</h5>
                    <span className="text-[9px] font-mono text-retro-gold bg-retro-gold/10 px-1 py-0.2 rounded mt-0.5 inline-block border border-retro-gold/15">
                      {r.game} Approved
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center font-sans text-xs text-retro-cream/60">
            ★ Verification ratings calculated based on 12,000+ positive gaming sessions analyzed weekly.
          </div>
        </div>
      </section>

      {/* 8. Trust FAQs Accordions Component Block */}
      <section id="faq" className="px-4 md:px-8 py-16 md:py-24 max-w-4xl mx-auto border-b-3 border-retro-maroon">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-retro-orange">FAQ Directory</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black">Common Inquiries</h2>
          <p className="text-xs text-retro-maroon-light/65">Learn how QueueMate maintains a secure non-toxic matchmaking matrix.</p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-retro-cream border-wood shadow-wood rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full text-left px-5 py-4 font-serif font-black text-sm flex items-center justify-between cursor-pointer focus:outline-none hover:bg-retro-beige/20 text-retro-maroon"
              >
                <span>{item.question}</span>
                <span className="text-retro-orange font-bold font-mono">
                  {expandedFAQ[idx] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              <AnimatePresence>
                {expandedFAQ[idx] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t-2 border-retro-maroon/10 p-5 bg-retro-beige/10 text-xs text-retro-maroon-light/95 leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Final Retro Hand-Crafted Capture CTA Form (LocalStorage backed) */}
      <section id="early-access" className="px-4 md:px-8 py-16 md:py-24 max-w-5xl mx-auto">
        <div className="bg-retro-beige/35 border-wood shadow-wood-lg rounded-2xl p-6 md:p-10 text-center relative overflow-hidden bg-[radial-gradient(#ECE2D0_15%,transparent_16%)] bg-[length:16px_16px]">
          {registeredEmailNumber === null ? (
            <div className="max-w-xl mx-auto space-y-6">
              <span className="inline-block px-3 py-1 bg-retro-maroon text-retro-cream text-[10px] font-mono font-bold uppercase rounded border border-retro-maroon shadow-wood-sm">
                ★ SQUAD RECRUITMENT OPEN ★
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-black text-retro-maroon">
                Claim your early custom profile handle
              </h2>
              <p className="text-xs text-retro-maroon-light/80 leading-relaxed font-body">
                Join our founding network. Register your account to reserve your custom ID handle, skip waitlists on companion app launch, and start climbing ranks toxic-free.
              </p>

              <form onSubmit={handleEarlyAccessSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
                <div className="flex bg-retro-cream border-wood rounded-lg p-3 w-full items-center text-xs space-x-2">
                  <Mail size={16} className="opacity-40" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your gamer email..."
                    value={registrationEmail}
                    onChange={(e) => setRegistrationEmail(e.target.value)}
                    className="bg-transparent border-none focus:outline-none w-full font-bold placeholder-retro-maroon/30 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 bg-retro-orange text-retro-cream border-wood shadow-wood hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-wood-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all font-sans font-black uppercase text-xs tracking-widest cursor-pointer leading-none rounded-lg"
                >
                  SECURE SLOT
                </button>
              </form>
            </div>
          ) : (
            <div className="max-w-xl mx-auto space-y-5 animate-scale-up">
              <CheckCircle2 className="text-retro-sage mx-auto" size={48} />
              <div className="bg-retro-sage/10 text-retro-sage font-sans font-black border-2 border-retro-sage p-3.5 rounded-xl uppercase inline-block text-xs">
                ✔ ENTRY RESERVATION VERIFIED SECURE!
              </div>
              <h2 className="font-serif text-3xl font-black text-retro-maroon mt-2">
                You are Squad Member #{registeredEmailNumber}!
              </h2>
              <p className="text-xs text-retro-maroon-light/80 leading-relaxed max-w-md mx-auto">
                Your personal alpha download verification token is <strong className="text-retro-orange font-mono font-black">{earlyAccessTag}</strong>. 
                We will email link installation instructions directly on beta rollout. Thank you for joining QueueMate!
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem("queuemate_early_access_user");
                  setRegisteredEmailNumber(null);
                }}
                className="text-[9px] font-mono text-retro-maroon-light/40 hover:text-retro-orange uppercase hover:underline cursor-pointer"
              >
                Reset simulation registration
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 10. Hand-Crafted Footer */}
      <footer className="bg-retro-maroon text-retro-cream border-t-4 border-retro-maroon">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-sans">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-retro-orange border-wood rounded flex items-center justify-center font-serif text-sm font-black text-retro-cream">
                QM
              </div>
              <div>
                <span className="font-serif font-black text-sm tracking-widest uppercase">
                  QueueMate
                </span>
                <span className="text-[9px] font-mono font-bold block text-retro-gold leading-none">
                  SQUAD COOPERATIVE
                </span>
              </div>
            </div>
            <p className="text-[11px] text-retro-beige/65 leading-relaxed max-w-sm">
              The premium, non-toxic teammate matchmaking companion built with love for competitive squad gamers. Match by goal, timing, and communication manners.
            </p>
          </div>

          {/* Nav Directory */}
          <div className="md:col-span-3 space-y-3.5">
            <h5 className="text-[10px] uppercase font-bold text-retro-gold font-mono tracking-widest">Active Lobby Links</h5>
            <ul className="space-y-2 text-[11px] text-retro-beige/80">
              <li>
                <button onClick={() => quickSearchGame(GameName.VALORANT)} className="hover:text-retro-orange transition-colors text-left uppercase font-bold cursor-pointer">
                  → Valorant Squad Lobbies
                </button>
              </li>
              <li>
                <button onClick={() => quickSearchGame(GameName.APEX_LEGENDS)} className="hover:text-retro-orange transition-colors text-left uppercase font-bold cursor-pointer">
                  → Apex Legends Squads
                </button>
              </li>
              <li>
                <button onClick={() => quickSearchGame(GameName.CS2)} className="hover:text-retro-orange transition-colors text-left uppercase font-bold cursor-pointer">
                  → CS2 Tactical Matches
                </button>
              </li>
              <li>
                <button onClick={() => quickSearchGame(GameName.OVERWATCH)} className="hover:text-retro-orange transition-colors text-left uppercase font-bold cursor-pointer">
                  → Overwatch 2 Flex Combos
                </button>
              </li>
            </ul>
          </div>

          {/* Social / Sync Link */}
          <div className="md:col-span-3 space-y-3.5">
            <h5 className="text-[10px] uppercase font-bold text-retro-gold font-mono tracking-widest">Developers & Integrity</h5>
            <ul className="space-y-2 text-[11px] text-retro-beige/80 font-bold uppercase leading-relaxed">
              <li><span className="text-retro-beige/60">Community:</span> discord.gg/queuemate-app</li>
              <li><span className="text-retro-beige/60">Integration:</span> steam / epic / riot-verified</li>
              <li><span className="text-retro-beige/60">Etiquette:</span> anti-toxicity agreement</li>
              <li><span className="text-retro-beige/60">Compliance:</span> secure GDPR data</li>
            </ul>
          </div>

          {/* Network Health Col */}
          <div className="md:col-span-2 space-y-3.5 text-right md:text-left">
            <h5 className="text-[10px] uppercase font-bold text-retro-gold font-mono tracking-widest">Connection Pulse</h5>
            <div className="inline-flex items-center space-x-1 bg-retro-sage/20 border border-retro-sage/40 rounded px-2.5 py-1 text-retro-sage text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-retro-sage animate-ping"></span>
              <span>Lobbies: Fully Active</span>
            </div>
            <div className="text-[9px] text-retro-beige/40 mt-2 block leading-snug">
              Client version: v1.1.20b
            </div>
          </div>
        </div>

        {/* Brand Bottom disclaimer */}
        <div className="border-t border-retro-cream/10 py-6 max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-retro-beige/45 gap-4">
          <span>
            © {new Date().getFullYear()} QueueMate. Handcrafted product landing page designed to celebrate pure gaming communities.
          </span>
          <span className="italic text-[10px]">
            Disclaimer: We are not endorsed or affiliated with Riot Games, Valve Inc, EA, or Blizzard Entertainment. Registered marks remain owned by their respectful publishers.
          </span>
        </div>
      </footer>

      {/* GLOBAL BOARD PLAYER DETAIL DOSSIER POPUP DIALOG */}
      {selectedBoardDetail && (
        <div className="fixed inset-0 bg-retro-maroon/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-retro-cream border-wood shadow-wood-lg rounded-2xl p-6 max-w-md w-full relative space-y-4 text-retro-maroon animate-scale-up">
            <button
              onClick={() => setSelectedBoardDetail(null)}
              className="absolute top-4 right-4 p-1.5 bg-retro-beige hover:bg-retro-beige/80 border-wood-thin rounded-full text-retro-maroon transition-transform hover:rotate-90"
            >
              <X size={16} />
            </button>

            <div className="flex items-center space-x-3.5 pb-3.5 border-b-2 border-retro-maroon/10">
              <GamerAvatar seed={player_avatar_seed(player_seed_from_profile(selectedBoardDetail))} size={54} bgColor={selectedBoardDetail.avatarColor} />
              <div>
                <span className="text-[10px] font-mono text-retro-orange bg-retro-orange/10 px-2 py-0.5 rounded border border-retro-maroon/10 font-bold uppercase">
                  {selectedBoardDetail.game}
                </span>
                <h3 className="font-serif text-xl font-black mt-1 leading-none">{selectedBoardDetail.name}</h3>
                <div className="flex gap-2 items-center mt-1.5">
                  <span className="text-xs font-sans font-bold text-retro-maroon-light">
                    {selectedBoardDetail.rank}
                  </span>
                  <span className="text-[10px] text-retro-sage font-sans font-black bg-retro-sage/10 px-1.5 py-0.2 rounded border border-retro-maroon/10 leading-none">
                    ★ {selectedBoardDetail.vibeScore}% positive vibes
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="bg-retro-beige/30 p-3 rounded-lg border-wood-thin">
                <span className="text-[8.5px] font-mono font-bold uppercase text-retro-maroon-light block mb-1">Squad Bio Statement:</span>
                <p className="italic">"{selectedBoardDetail.description}"</p>
              </div>

              <div className="grid grid-cols-2 gap-3.5 font-sans">
                <div className="bg-retro-beige/15 p-2.5 rounded border-wood-thin">
                  <span className="text-[9px] font-mono block text-retro-maroon-light leading-none">ROLE CATEGORY</span>
                  <strong className="text-retro-maroon mt-1.5 block leading-none">{selectedBoardDetail.role}</strong>
                </div>
                <div className="bg-retro-beige/15 p-2.5 rounded border-wood-thin">
                  <span className="text-[9px] font-mono block text-retro-maroon-light leading-none">STRATEGY GRIP</span>
                  <strong className="text-retro-orange mt-1.5 block leading-none">{selectedBoardDetail.playstyle}</strong>
                </div>
                <div className="bg-retro-beige/15 p-2.5 rounded border-wood-thin">
                  <span className="text-[9px] font-mono block text-retro-maroon-light leading-none">HEADSET AUDIO</span>
                  <strong className="text-retro-maroon mt-1.5 block truncate text-[11px] leading-none">{selectedBoardDetail.comms}</strong>
                </div>
                <div className="bg-retro-beige/15 p-2.5 rounded border-wood-thin">
                  <span className="text-[9px] font-mono block text-retro-maroon-light leading-none">DISCORD ID</span>
                  <strong className="text-blue-900 mt-1.5 block truncate text-[11px] leading-none">{selectedBoardDetail.discordTag}</strong>
                </div>
              </div>

              <div>
                <span className="text-[9px] font-mono font-bold block text-retro-maroon-light mb-1">COVETED TRUST INDORSMENTS</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBoardDetail.compliments.map((badge, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-sans font-bold bg-retro-gold/10 text-retro-gold border-wood-thin rounded-full px-2.5 py-0.5 flex items-center space-x-1"
                    >
                      <span>★</span>
                      <span>{badge}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2.5 text-[11px]">
                <strong className="text-retro-maroon font-bold uppercase text-[9px] mt-0.5">Specialties:</strong>
                <span className="text-retro-maroon-light bg-retro-beige px-2 py-0.5 rounded border border-retro-maroon/10 font-bold">
                  {selectedBoardDetail.favoriteAgents.join(" or ")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3.5 border-t border-retro-maroon/10">
              <button
                onClick={() => setSelectedBoardDetail(null)}
                className="py-1.5 hover:bg-retro-beige border-wood-thin font-bold transition-all text-xs uppercase text-center rounded-lg leading-none"
              >
                Close Archive
              </button>
              <button
                onClick={() => {
                  alert(`Direct request processed! Connected to Discord Lobby chat for ${selectedBoardDetail.name}. Connection link: discord.gg/queuemate-applet-${selectedBoardDetail.id}`);
                  setSelectedBoardDetail(null);
                }}
                className="py-1.5 bg-retro-orange hover:bg-retro-orange-hover text-retro-cream font-bold border-wood shadow-wood hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-wood-sm transition-all text-xs uppercase text-center rounded-lg leading-none"
              >
                Launch companion chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helpers for modal avatar matching
function player_seed_from_profile(profile: GamerProfile): string {
  return profile.avatarSeed || "avatar_seed_fallback";
}

function player_avatar_seed(seed: string): string {
  return seed;
}
