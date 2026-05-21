/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { GameName, GamerProfile } from "../types";
import { GAMES_INFO, INITIAL_TEAMMATES } from "../data";
import { GamerAvatar } from "./GamerAvatar";
import {
  Home,
  Compass,
  Users,
  Sliders,
  Star,
  Smartphone,
  Search,
  ChevronDown,
  Volume2,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Clock,
  Heart,
  X,
  Plus
} from "lucide-react";

export const CompanionMockup: React.FC = () => {
  // Sidebar tabs
  const [activeTab, setActiveTab] = useState<string>("home");

  // Filter conditions
  const [selectedGame, setSelectedGame] = useState<GameName>(GameName.VALORANT);
  const [selectedRole, setSelectedRole] = useState<string>("Duelist");
  const [selectedComms, setSelectedComms] = useState<string>("Voice Chat Essential");

  // Interaction States
  const [queueStatus, setQueueStatus] = useState<"idle" | "searching" | "found">("idle");
  const [searchProgress, setSearchProgress] = useState<number>(0);
  const [matchedProfile, setMatchedProfile] = useState<GamerProfile | null>(null);
  
  // Modal viewer
  const [selectedProfileModal, setSelectedProfileModal] = useState<GamerProfile | null>(null);

  // Search/Filters in Discover State
  const [discoverSearch, setDiscoverSearch] = useState<string>("");
  const [discoverRoleFilter, setDiscoverRoleFilter] = useState<string>("all");

  // Post Game ratings simulation
  const [ratedPastMates, setRatedPastMates] = useState<Record<string, { rating: number; success: boolean }>>({});
  const [userProfile, setUserProfile] = useState({
    name: "NovaStrike",
    rank: "Platinum 1",
    avatarSeed: "nova_strike",
    avatarColor: "#DF5834",
    commsRating: 100
  });

  // Automatically update role list when game changes
  useEffect(() => {
    const roles = GAMES_INFO[selectedGame].roles;
    setSelectedRole(roles[0]);
  }, [selectedGame]);

  // Queue simulation logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (queueStatus === "searching") {
      const interval = setInterval(() => {
        setSearchProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Find a teammate of that game & role
            const pool = INITIAL_TEAMMATES.filter(
              (p) => p.game === selectedGame && p.role.toLowerCase() === selectedRole.toLowerCase()
            );
            // fallback to any teammate of that game if no exact match
            const backupPool = INITIAL_TEAMMATES.filter((p) => p.game === selectedGame);
            const chosen = pool.length > 0
              ? pool[Math.floor(Math.random() * pool.length)]
              : backupPool.length > 0
                ? backupPool[Math.floor(Math.random() * backupPool.length)]
                : INITIAL_TEAMMATES[0];

            setMatchedProfile(chosen);
            setQueueStatus("found");
            return 100;
          }
          return prev + 12; // increment progress
        });
      } , 350);

      return () => clearInterval(interval);
    }
  }, [queueStatus, selectedGame, selectedRole]);

  const handleStartQueue = () => {
    setSearchProgress(0);
    setMatchedProfile(null);
    setQueueStatus("searching");
  };

  const handleCancelQueue = () => {
    setQueueStatus("idle");
    setSearchProgress(0);
  };

  // Switch to Discover with role filtered
  const viewTeammatesForCurrent = () => {
    setDiscoverRoleFilter(selectedRole);
    setDiscoverSearch("");
    setActiveTab("discover");
  };

  // Submit Feedback on past player
  const submitReview = (id: string, stars: number) => {
    setRatedPastMates((prev) => ({
      ...prev,
      [id]: { rating: stars, success: true }
    }));
  };

  return (
    <div className="w-full bg-retro-cream border-wood shadow-wood-lg rounded-2xl overflow-hidden text-retro-maroon font-body">
      {/* Companion Window Top Titlebar */}
      <div className="bg-retro-maroon text-retro-cream px-4 py-3 flex items-center justify-between border-b-3 border-retro-maroon">
        <div className="flex items-center space-x-2">
          {/* Mock Window Dots */}
          <div className="flex space-x-1.5 mr-2">
            <span className="w-3.5 h-3.5 rounded-full bg-retro-orange border border-retro-maroon"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-retro-gold border border-retro-maroon"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-retro-sage border border-retro-maroon"></span>
          </div>
          <span className="font-serif font-black tracking-wider text-sm flex items-center gap-1.5 uppercase">
            <span className="text-retro-gold">⊞</span> QueueMate Desktop Companion v1.4.1
          </span>
        </div>

        {/* Windows title Search Input Bar */}
        <div className="hidden md:flex items-center space-x-2 bg-retro-maroon-light px-3 py-1.5 rounded-lg border-wood-thin border-retro-beige/30 w-72">
          <Search size={14} className="text-retro-beige/60" />
          <input
            type="text"
            placeholder="Search games, roles, or players..."
            className="bg-transparent border-none text-xs text-retro-cream placeholder-retro-beige/50 focus:outline-none w-full font-sans"
            value={discoverSearch}
            onChange={(e) => {
              setDiscoverSearch(e.target.value);
              if (activeTab !== "discover") setActiveTab("discover");
            }}
          />
        </div>

        <div className="flex items-center space-x-2">
          {/* Simulated Active Gamer State */}
          <span className="hidden sm:inline-flex items-center space-x-1 bg-retro-orange/20 border-wood-thin border-retro-orange/40 text-retro-orange text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-retro-orange animate-pulse"></span>
            <span>Live Companion</span>
          </span>
          <div className="flex items-center space-x-2 bg-retro-beige/10 px-2 py-1 rounded border-wood-thin border-retro-beige/20 text-xs">
            <div className="w-5 h-5 rounded overflow-hidden border border-retro-cream">
              <GamerAvatar seed={userProfile.avatarSeed} size={20} bgColor={userProfile.avatarColor} />
            </div>
            <span className="font-semibold font-sans">{userProfile.name}</span>
            <ChevronDown size={14} className="text-retro-beige/50" />
          </div>
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left Interactive Sidebar */}
        <div className="md:col-span-3 bg-retro-beige/40 p-4 border-r-3 border-retro-maroon space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-bold text-retro-maroon-light/60 tracking-wider px-2.5 mb-2">
              Menu Navigation
            </div>

            <button
              onClick={() => setActiveTab("home")}
              className={`w-full text-left font-sans text-sm font-semibold px-3 py-2.5 rounded-lg flex items-center space-x-3 transition-colors ${
                activeTab === "home"
                  ? "bg-retro-maroon text-retro-cream border-wood-thin font-bold shadow-wood-sm"
                  : "hover:bg-retro-beige/70 text-retro-maroon"
              }`}
            >
              <Home size={16} />
              <span>Dashboard Home</span>
            </button>

            <button
              onClick={() => setActiveTab("discover")}
              className={`w-full text-left font-sans text-sm font-semibold px-3 py-2.5 rounded-lg flex items-center space-x-3 transition-colors ${
                activeTab === "discover"
                  ? "bg-retro-maroon text-retro-cream border-wood-thin font-bold shadow-wood-sm"
                  : "hover:bg-retro-beige/70 text-retro-maroon"
              }`}
            >
              <Compass size={16} />
              <span>Discover Players</span>
            </button>

            <button
              onClick={() => setActiveTab("past")}
              className={`w-full text-left font-sans text-sm font-semibold px-3 py-2.5 rounded-lg flex items-center space-x-3 transition-colors ${
                activeTab === "past"
                  ? "bg-retro-maroon text-retro-cream border-wood-thin font-bold shadow-wood-sm"
                  : "hover:bg-retro-beige/70 text-retro-maroon"
              }`}
            >
              <Users size={16} />
              <span>Past Teammates</span>
            </button>

            <button
              onClick={() => setActiveTab("preferences")}
              className={`w-full text-left font-sans text-sm font-semibold px-3 py-2.5 rounded-lg flex items-center space-x-3 transition-colors ${
                activeTab === "preferences"
                  ? "bg-retro-maroon text-retro-cream border-wood-thin font-bold shadow-wood-sm"
                  : "hover:bg-retro-beige/70 text-retro-maroon"
              }`}
            >
              <Sliders size={16} />
              <span>Goal Preferences</span>
            </button>

            <button
              onClick={() => setActiveTab("post-game")}
              className={`w-full text-left font-sans text-sm font-semibold px-3 py-2.5 rounded-lg flex items-center space-x-3 transition-colors ${
                activeTab === "post-game"
                  ? "bg-retro-maroon text-retro-cream border-wood-thin font-bold shadow-wood-sm"
                  : "hover:bg-retro-beige/70 text-retro-maroon"
              }`}
            >
              <Star size={16} />
              <span>Post-Game Review</span>
            </button>

            <button
              onClick={() => setActiveTab("sync")}
              className={`w-full text-left font-sans text-sm font-semibold px-3 py-2.5 rounded-lg flex items-center space-x-3 transition-colors ${
                activeTab === "sync"
                  ? "bg-retro-maroon text-retro-cream border-wood-thin font-bold shadow-wood-sm"
                  : "hover:bg-retro-beige/70 text-retro-maroon"
              }`}
            >
              <Smartphone size={16} />
              <span>Sync to Mobile</span>
            </button>
          </div>

          {/* Sidebar Footer Badge */}
          <div className="bg-retro-maroon/5 border-wood-thin rounded-lg p-3 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-[11px] font-sans font-bold text-retro-maroon-light">
              <Sparkles size={12} className="text-retro-gold" />
              <span>YOUR TRUST MULTIPLIER</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-serif font-black text-retro-orange">1.42x</span>
              <span className="text-[9px] text-retro-sage font-mono bg-retro-cream px-1.5 py-0.5 rounded border border-retro-maroon/20">
                ★ TOP 2% COMMUNICATOR
              </span>
            </div>
            <div className="w-full bg-retro-beige h-1.5 rounded-full overflow-hidden border border-retro-maroon/20">
              <div className="bg-retro-sage h-full w-[85%]"></div>
            </div>
          </div>
        </div>

        {/* Dynamic Content Panel */}
        <div className="md:col-span-9 p-6 bg-retro-cream/50 flex flex-col justify-between">
          {/* TAB 1: HOME */}
          {activeTab === "home" && (
            <div className="space-y-6 animate-fade-in">
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-retro-maroon/10 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-black">Pre-Game Matcher</h2>
                  <p className="text-xs text-retro-maroon-light/70 mt-0.5">
                    Match with teammates who want to win, coordinate, and stay friendly.
                  </p>
                </div>
                {/* Active game select badge */}
                <div className="inline-flex rounded-lg border-wood p-0.5 bg-retro-beige overflow-hidden">
                  {Object.values(GameName).map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGame(g)}
                      className={`text-[10px] font-sans font-bold px-2.5 py-1 rounded transition-colors ${
                        selectedGame === g
                          ? "bg-retro-maroon text-retro-cream"
                          : "text-retro-maroon/70 hover:text-retro-maroon"
                      }`}
                    >
                      {g === GameName.VALORANT ? "Valorant" : g === GameName.APEX_LEGENDS ? "Apex" : g === GameName.CS2 ? "CS2" : "OW2"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid content based on user layout image */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* START SESSION WIDGET */}
                <div className="lg:col-span-6 bg-retro-cream border-wood shadow-wood rounded-xl p-5 flex flex-col justify-between h-72">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-mono font-bold tracking-widest text-retro-orange bg-retro-orange/10 px-2 py-0.5 border-wood-thin rounded">
                        START SESSION
                      </span>
                      <span className="text-[10px] font-mono text-retro-maroon-light/60">SESSION #512</span>
                    </div>

                    <div className="space-y-3 font-sans">
                      <div className="flex justify-between items-center text-xs pb-1.5 border-b border-retro-maroon/15">
                        <span className="font-medium text-retro-maroon/60">ACTIVE GAME</span>
                        <span className="font-black text-retro-maroon-dark">{selectedGame}</span>
                      </div>

                      <div className="flex justify-between items-center text-xs pb-1.5 border-b border-retro-maroon/15">
                        <span className="font-medium text-retro-maroon/60">WANTED ROLE</span>
                        <select
                          className="font-black bg-retro-beige/30 p-1.5 rounded text-retro-maroon-dark border border-retro-maroon/20 text-xs text-right cursor-pointer"
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                        >
                          {GAMES_INFO[selectedGame].roles.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex justify-between items-center text-xs pb-1.5">
                        <span className="font-medium text-retro-maroon/60">COMMS REQUIREMENT</span>
                        <select
                          className="font-black bg-retro-beige/30 p-1.5 rounded text-retro-maroon-dark border border-retro-maroon/20 text-xs text-right cursor-pointer"
                          value={selectedComms}
                          onChange={(e) => setSelectedComms(e.target.value)}
                        >
                          <option value="Voice Chat Essential">Voice Essential</option>
                          <option value="Voice Optional/Pings">Pings & Chat</option>
                          <option value="Focused Comms">Focused Competitive</option>
                          <option value="Chill Vibes Only">Chill & Casual</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {queueStatus === "idle" ? (
                    <button
                      onClick={handleStartQueue}
                      className="w-full py-3 bg-retro-orange text-retro-cream border-wood shadow-wood hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-wood-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all font-sans font-black tracking-wider uppercase text-xs"
                    >
                      Start Queue Setup
                    </button>
                  ) : queueStatus === "searching" ? (
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="animate-pulse text-retro-orange font-bold">MATCHING INTELLIGENTLY...</span>
                        <span>{searchProgress}%</span>
                      </div>
                      <div className="w-full bg-retro-beige h-4 rounded border-wood overflow-hidden relative">
                        <div
                          className="bg-retro-orange h-full transition-all duration-300"
                          style={{ width: `${searchProgress}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-retro-maroon mix-blend-difference uppercase tracking-wider">
                          Analyzing Reps, Ranks & Vibe Metrics
                        </div>
                      </div>
                      <button
                        onClick={handleCancelQueue}
                        className="w-full py-1.5 bg-retro-beige hover:bg-retro-beige/80 text-retro-maroon border-wood-thin rounded text-[11px] font-sans font-bold transition-all"
                      >
                        Cancel Matchmaking
                      </button>
                    </div>
                  ) : (
                    <div className="bg-retro-sage/10 border-2 border-retro-sage p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="text-retro-sage" size={20} />
                        <div>
                          <div className="text-[11px] font-mono leading-none text-retro-sage font-bold">MATCH SECURED</div>
                          <div className="text-xs font-black font-sans mt-0.5">Matched with {matchedProfile?.name}!</div>
                        </div>
                      </div>
                      <div className="flex space-x-1.5">
                        <button
                          onClick={() => matchedProfile && setSelectedProfileModal(matchedProfile)}
                          className="px-2.5 py-1 bg-retro-sage text-retro-cream border-wood-thin shadow-wood-sm text-[10px] font-sans font-black uppercase hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                        >
                          Dossier
                        </button>
                        <button
                          onClick={handleStartQueue}
                          className="px-2 py-1 bg-retro-orange text-retro-cream border-wood-thin shadow-wood-sm text-[10px] font-sans font-black uppercase hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                        >
                          Requeue
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* RECOMMENDED TEAMMATES WIDGET */}
                <div className="lg:col-span-6 bg-retro-cream border-wood shadow-wood rounded-xl p-5 flex flex-col justify-between h-72">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-mono font-bold tracking-widest text-retro-sage bg-retro-sage/10 px-2 py-0.5 border-wood-thin rounded">
                        COMPATIBLE MATES
                      </span>
                      <span className="text-[10px] font-sans text-retro-maroon-light/60 font-medium">Rank & Goal Aligned</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      {INITIAL_TEAMMATES.filter((p) => p.game === selectedGame)
                        .slice(0, 2)
                        .map((profile) => (
                          <div
                            key={profile.id}
                            className="bg-retro-beige/30 p-2.5 rounded-lg border-wood-thin hover:bg-retro-beige/50 hover:shadow-wood-sm transition-all group flex flex-col justify-between h-32"
                          >
                            <div className="flex items-center space-x-2">
                              <GamerAvatar seed={profile.avatarSeed} size={32} bgColor={profile.avatarColor} />
                              <div className="overflow-hidden">
                                <h4 className="font-sans font-bold text-xs truncate leading-tight">{profile.name}</h4>
                                <span className="text-[9px] font-mono opacity-80 block truncate mt-0.5">{profile.rank}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-2.5 text-[9px] font-sans bg-retro-cream px-1.5 py-0.5 border-wood-thin rounded">
                              <span className="font-bold text-retro-orange">{profile.role}</span>
                              <span className="text-retro-sage font-mono font-bold">★ {profile.vibeScore}% Vibe</span>
                            </div>
                            <button
                              onClick={() => setSelectedProfileModal(profile)}
                              className="mt-2 text-center w-full py-1 bg-retro-cream text-[9.5px] font-sans font-black border-wood-thin group-hover:bg-retro-maroon group-hover:text-retro-cream transition-colors uppercase leading-none rounded"
                            >
                              View Dossier
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>

                  <button
                    onClick={viewTeammatesForCurrent}
                    className="w-full py-2 bg-retro-cream text-retro-maroon border-wood shadow-wood hover:bg-retro-beige hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-wood-sm transition-all font-sans font-black uppercase text-xs text-center"
                  >
                    Browse Directory →
                  </button>
                </div>
              </div>

              {/* QUICK ACTIONS BLOCK */}
              <div className="bg-retro-cream border-wood shadow-wood rounded-xl p-4">
                <h4 className="text-[10px] font-mono font-bold tracking-widest text-retro-maroon-light/60 mb-3 uppercase">
                  Quick System Actions
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => setActiveTab("past")}
                    className="p-3 bg-retro-beige/10 border-wood-thin hover:bg-retro-beige hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-wood-sm transition-all rounded-lg text-left"
                  >
                    <span className="inline-flex items-center justify-center p-1.5 bg-retro-orange/10 border-wood-thin text-retro-orange rounded mb-2">
                      <Users size={14} />
                    </span>
                    <div className="text-[11px] font-sans font-black leading-tight uppercase">Past Mates (3)</div>
                    <div className="text-[9px] text-retro-maroon-light/60 mt-0.5">Leave endorsements</div>
                  </button>

                  <button
                    onClick={() => setActiveTab("preferences")}
                    className="p-3 bg-retro-beige/10 border-wood-thin hover:bg-retro-beige hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-wood-sm transition-all rounded-lg text-left"
                  >
                    <span className="inline-flex items-center justify-center p-1.5 bg-retro-gold/10 border-wood-thin text-retro-gold rounded mb-2">
                      <Sliders size={14} />
                    </span>
                    <div className="text-[11px] font-sans font-black leading-tight uppercase">Goal Selector</div>
                    <div className="text-[9px] text-retro-maroon-light/60 mt-0.5">Adjust play matching</div>
                  </button>

                  <button
                    onClick={() => setActiveTab("post-game")}
                    className="p-3 bg-retro-beige/10 border-wood-thin hover:bg-retro-beige hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-wood-sm transition-all rounded-lg text-left"
                  >
                    <span className="inline-flex items-center justify-center p-1.5 bg-retro-sage/10 border-wood-thin text-retro-sage rounded mb-2">
                      <Star size={14} />
                    </span>
                    <div className="text-[11px] font-sans font-black leading-tight uppercase">Post-Game Vibe</div>
                    <div className="text-[9px] text-retro-maroon-light/60 mt-0.5">Recent feedback checks</div>
                  </button>

                  <button
                    onClick={() => setActiveTab("sync")}
                    className="p-3 bg-retro-beige/10 border-wood-thin hover:bg-retro-beige hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-wood-sm transition-all rounded-lg text-left"
                  >
                    <span className="inline-flex items-center justify-center p-1.5 bg-retro-maroon/15 border-wood-thin text-retro-maroon rounded mb-2">
                      <Smartphone size={14} />
                    </span>
                    <div className="text-[11px] font-sans font-black leading-tight uppercase">Mobile Sync</div>
                    <div className="text-[9px] text-retro-maroon-light/60 mt-0.5">Track queue on the go</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DISCOVER PLAYERS DIRECTORY */}
          {activeTab === "discover" && (
            <div className="space-y-4 animate-fade-in flex-1">
              <div>
                <h2 className="font-serif text-2xl font-black">Teammate Directory</h2>
                <p className="text-xs text-retro-maroon-light/70 mt-0.5">
                  Browse or filter through the current pool of game squads looking for consistent reliable buddies.
                </p>
              </div>

              {/* Filters row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 bg-retro-beige/40 p-3 rounded-lg border-wood-thin">
                <div>
                  <label className="text-[9px] font-sans font-bold block mb-1">GAME CONSOLE / SERVER</label>
                  <select
                    className="w-full text-xs bg-retro-cream p-1.5 rounded border border-retro-maroon/20 font-bold"
                    value={selectedGame}
                    onChange={(e) => {
                      setSelectedGame(e.target.value as GameName);
                      setDiscoverRoleFilter("all");
                    }}
                  >
                    {Object.values(GameName).map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-sans font-bold block mb-1">FILTER ROLE TYPE</label>
                  <select
                    className="w-full text-xs bg-retro-cream p-1.5 rounded border border-retro-maroon/20 font-bold"
                    value={discoverRoleFilter}
                    onChange={(e) => setDiscoverRoleFilter(e.target.value)}
                  >
                    <option value="all">Any Role</option>
                    {GAMES_INFO[selectedGame].roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-[9px] font-sans font-bold block mb-1">SEARCH HANDLE OR VALUE PROPS</label>
                  <div className="flex space-x-1">
                    <input
                      type="text"
                      className="w-full text-xs bg-retro-cream p-1.5 rounded border border-retro-maroon/20 font-bold pl-2 placeholder-retro-maroon-light/35"
                      placeholder="Keyword: Sova, Aggressive, Master, free..."
                      value={discoverSearch}
                      onChange={(e) => setDiscoverSearch(e.target.value)}
                    />
                    {discoverSearch && (
                      <button
                        onClick={() => setDiscoverSearch("")}
                        className="p-1 px-2.5 bg-retro-beige hover:bg-retro-beige/80 border border-retro-maroon text-xs rounded font-bold"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Teammates List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-[350px] overflow-y-auto pr-1">
                {INITIAL_TEAMMATES.filter((profile) => {
                  if (profile.game !== selectedGame) return false;
                  if (discoverRoleFilter !== "all" && profile.role.toLowerCase() !== discoverRoleFilter.toLowerCase()) return false;
                  if (discoverSearch) {
                    const search = discoverSearch.toLowerCase();
                    return (
                      profile.name.toLowerCase().includes(search) ||
                      profile.description.toLowerCase().includes(search) ||
                      profile.rank.toLowerCase().includes(search) ||
                      profile.role.toLowerCase().includes(search) ||
                      profile.favoriteAgents.some((a) => a.toLowerCase().includes(search))
                    );
                  }
                  return true;
                }).map((profile) => (
                  <div
                    key={profile.id}
                    className="bg-retro-cream border-wood shadow-wood p-4 flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-wood-sm transition-all group rounded-xl bg-gradient-to-br from-retro-cream to-retro-beige/20"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2.5">
                          <GamerAvatar seed={profile.avatarSeed} size={40} bgColor={profile.avatarColor} />
                          <div>
                            <h4 className="font-serif font-black text-sm text-retro-maroon">{profile.name}</h4>
                            <span className="text-[9px] font-mono opacity-70 bg-retro-beige px-1.5 py-0.5 rounded border border-retro-maroon/10 mt-0.5 inline-block">
                              {profile.rank}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-retro-sage font-sans font-black flex items-center gap-0.5">
                          ★ {profile.vibeScore}%
                        </span>
                      </div>

                      <p className="text-[11px] text-retro-maroon-light/80 mt-3 line-clamp-3 leading-relaxed italic bg-retro-beige/15 p-2 rounded border border-retro-maroon/10">
                        "{profile.description}"
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        <span className="text-[8px] font-mono font-bold bg-retro-orange/10 text-retro-orange border-wood-thin rounded px-1.5">
                          {profile.role}
                        </span>
                        <span className="text-[8px] font-mono font-bold bg-retro-gold/10 text-retro-gold border-wood-thin rounded px-1.5">
                          {profile.playstyle}
                        </span>
                        <span className="text-[8px] font-mono font-bold bg-retro-sage/10 text-retro-sage border-wood-thin rounded px-1.5">
                          {profile.comms.split(" ")[0]}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-retro-maroon/10">
                      <button
                        onClick={() => setSelectedProfileModal(profile)}
                        className="text-center py-1 bg-retro-beige text-[10px] font-sans font-black border-wood-thin hover:bg-retro-maroon hover:text-retro-cream rounded transition-all uppercase leading-none"
                      >
                        VIEW DOSSIER
                      </button>
                      <button
                        onClick={() => {
                          alert(`Simulating companion network request: Discord alert message pinged to ${profile.name}! Contact verified: ${profile.discordTag}`);
                        }}
                        className="text-center py-1 bg-retro-orange text-retro-cream text-[10px] font-sans font-black border-wood-thin hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-wood-sm rounded transition-all uppercase leading-none"
                      >
                        PING TEAMMATE
                      </button>
                    </div>
                  </div>
                ))}

                {INITIAL_TEAMMATES.filter((p) => p.game === selectedGame).length === 0 && (
                  <div className="col-span-full py-12 text-center text-retro-maroon-light/60">
                    <p className="font-serif italic">No users found match criteria in {selectedGame}.</p>
                    <p className="text-xs mt-1">Try resetting the keyword filter or choose another title.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PAST TEAMMATES */}
          {activeTab === "past" && (
            <div className="space-y-4 animate-fade-in flex-1">
              <div>
                <h2 className="font-serif text-2xl font-black">Past Squad Members</h2>
                <p className="text-xs text-retro-maroon-light/70 mt-0.5">
                  These are players you've queued with recent-past. Leave endorsements to boost their trustworthiness within QueueMate!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[350px] overflow-y-auto">
                {[
                  { id: "past-1", name: "JettViper", game: GameName.VALORANT, date: "2 hours ago", role: "Duelist", avatar: "avatar_jett", col: "#DF5834" },
                  { id: "past-2", name: "ApexWarlord", game: GameName.APEX_LEGENDS, date: "Yesterday", role: "Fragger", avatar: "avatar_apex", col: "#EA9F3E" },
                  { id: "past-3", name: "ClutchLegend", game: GameName.CS2, date: "3 days ago", role: "Lurker", avatar: "avatar_clutch", col: "#5E3123" }
                ].map((mate) => (
                  <div key={mate.id} className="bg-retro-cream border-wood p-4 rounded-xl shadow-wood flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <GamerAvatar seed={mate.avatar} size={36} bgColor={mate.col} />
                        <div>
                          <h4 className="font-sans font-black text-sm uppercase leading-tight">{mate.name}</h4>
                          <span className="text-[9px] font-mono text-retro-maroon-light/60 block mt-0.5">
                            {mate.game} • {mate.role}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-retro-orange bg-retro-orange/10 px-1.5 py-0.5 rounded border border-retro-maroon/10">
                        {mate.date}
                      </span>
                    </div>

                    <div className="my-3 py-2 border-t border-b border-retro-maroon/10 flex items-center justify-between text-xs">
                      <span className="font-medium text-retro-maroon-light/75">Vibe Rating:</span>
                      {ratedPastMates[mate.id] ? (
                        <span className="text-retro-sage font-black flex items-center gap-1">
                          ✔ Endorsed ({ratedPastMates[mate.id].rating}★)
                        </span>
                      ) : (
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((stars) => (
                            <button
                              key={stars}
                              onClick={() => submitReview(mate.id, stars)}
                              className="text-retro-gold hover:scale-125 hover:text-retro-orange transition-transform"
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          alert(`Simulating chat launch on Desktop Client: Direct Discord connection to ${mate.name} loaded.`);
                        }}
                        className="w-full text-center py-1.5 bg-retro-maroon text-retro-cream text-[10px] font-sans font-black border-wood-thin hover:bg-retro-maroon-light rounded uppercase leading-none"
                      >
                        Launch Direct Chat
                      </button>
                      <button
                        onClick={() => {
                          alert(`Invite sent directly to Discord overlay! Direct session launch with ${mate.name} generated.`);
                        }}
                        className="w-full text-center py-1.5 bg-retro-orange text-retro-cream text-[10px] font-sans font-black border-wood-thin hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-wood-sm rounded uppercase leading-none"
                      >
                        Instant Invite
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PREFERENCES */}
          {activeTab === "preferences" && (
            <div className="space-y-4 animate-fade-in flex-1">
              <div>
                <h2 className="font-serif text-2xl font-black">Squad Matching Weights</h2>
                <p className="text-xs text-retro-maroon-light/70 mt-0.5">
                  Tune our intelligence engine metrics to prioritize parameters that match your actual gaming session goals.
                </p>
              </div>

              <div className="bg-retro-cream border-wood p-5 rounded-xl shadow-wood space-y-4 max-w-lg">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center text-xs font-sans font-bold mb-1">
                      <span className="uppercase text-retro-maroon">1. Tactical Comms vs. Backseat Play</span>
                      <span className="text-retro-orange">High priority</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <span className="text-[10px] font-mono text-retro-maroon/60">Loose Chat</span>
                      <input type="range" className="w-full accent-retro-orange cursor-pointer" defaultValue="80" />
                      <span className="text-[10px] font-mono text-retro-maroon/60 font-black">Dry Callouts</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-sans font-bold mb-1">
                      <span className="uppercase text-retro-maroon">2. Rank Up focus vs. Casual fun</span>
                      <span className="text-retro-orange">Top Priority</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <span className="text-[10px] font-mono text-retro-maroon/60">Vibe Centric</span>
                      <input type="range" className="w-full accent-retro-orange cursor-pointer" defaultValue="95" />
                      <span className="text-[10px] font-mono text-retro-maroon/60 font-black">Climb Only</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-sans font-bold mb-1">
                      <span className="uppercase text-retro-maroon">3. Vibe Score threshold limit</span>
                      <span className="text-retro-sage">&gt; 95% Positive Verified</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <span className="text-[10px] font-mono text-retro-maroon/60">Any rating</span>
                      <input type="range" className="w-full accent-retro-orange cursor-pointer" defaultValue="70" />
                      <span className="text-[10px] font-mono text-retro-maroon/60 font-black">Noble Stars</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-retro-maroon/10 text-xs text-retro-maroon-light leading-relaxed">
                  <div className="flex items-center space-x-1.5 text-retro-sage font-bold uppercase text-[10px]">
                    <Sparkles size={12} />
                    <span>ALGORITHM CONFIG UPDATED LIVE</span>
                  </div>
                  Our matching queue will prioritize members matching these strict weightings.
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: POST GAME REVIEW */}
          {activeTab === "post-game" && (
            <div className="space-y-4 animate-fade-in flex-1">
              <div>
                <h2 className="font-serif text-2xl font-black">Post-Match Etiquette Loop</h2>
                <p className="text-xs text-retro-maroon-light/70 mt-0.5">
                  How QueueMate secures non-toxicity. Directly review squad members to build trust maps.
                </p>
              </div>

              <div className="bg-retro-cream border-wood p-5 rounded-xl shadow-wood max-w-lg space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 bg-retro-beige/40 p-2.5 border-wood-thin rounded flex flex-col items-center">
                    <span className="text-2xl font-serif font-black text-retro-orange leading-none">100%</span>
                    <span className="text-[8px] font-mono font-bold leading-tight mt-1 text-center uppercase text-retro-maroon-light/60">Positive feedback</span>
                  </div>
                  <div className="text-xs space-y-1">
                    <span className="font-black uppercase text-retro-maroon block">Your Companion Standing</span>
                    <p className="text-retro-maroon-light leading-relaxed leading-snug">
                      Your recent queue teammates have awarded your profile the <strong className="text-retro-sage">"Clutch setup strategist"</strong> endorsement. Keep it up to boost the squad index.
                    </p>
                  </div>
                </div>

                <div className="bg-retro-orange/5 border-wood-thin p-3 rounded-lg flex items-center justify-between">
                  <span className="text-[11px] font-sans font-bold uppercase text-retro-orange">Latest Vibe Badge Awarded:</span>
                  <span className="text-[10px] font-mono bg-retro-orange/20 text-retro-orange font-bold border-wood-thin px-2 py-0.5 rounded">
                    ★ Tier-1 Comms
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SYNC MOBILE */}
          {activeTab === "sync" && (
            <div className="space-y-4 animate-fade-in flex-1">
              <div>
                <h2 className="font-serif text-2xl font-black">Double-Screen Mobile Sync</h2>
                <p className="text-xs text-retro-maroon-light/70 mt-0.5">
                  QueueMate lets you control and observe queue states, accept matches, and chat with members instantly from your smartphone.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-retro-cream border-wood p-4 rounded-xl shadow-wood space-y-3">
                  <h4 className="text-xs font-sans font-black uppercase text-retro-orange">Generate Sync Token</h4>
                  <p className="text-[11px] text-retro-maroon-light line-clamp-3 leading-relaxed">
                    Open the QueueMate mobile app on your iPhone or Android, scan this barcode, or input the secure code block to link live.
                  </p>
                  <div className="bg-retro-maroon text-retro-cream p-2.5 rounded font-mono text-center text-lg font-bold border border-retro-maroon tracking-widest bg-[radial-gradient(#FAF6EE_12%,transparent_13%)] bg-[length:6px_6px]">
                    <span className="bg-retro-maroon px-2 py-0.5 border border-retro-cream/20">QM-77X-B92</span>
                  </div>
                  <button
                    onClick={() => alert("Simulated companion token regenerated. Secure hash rotated successfully.")}
                    className="w-full text-center py-1 bg-retro-beige hover:bg-retro-beige/80 text-[10px] font-sans font-black border-wood-thin rounded uppercase"
                  >
                    regenerate token
                  </button>
                </div>

                <div className="bg-retro-cream border-wood p-4 rounded-xl shadow-wood flex flex-col justify-between">
                  <h4 className="text-xs font-sans font-black uppercase text-retro-sage">ACTIVE MOBILE APP FEATURES</h4>
                  <ul className="text-[11px] space-y-1.5 list-disc pl-4 text-retro-maroon-light/90">
                    <li>Push notifications when squad matches secure</li>
                    <li>NFC Tap feature to swap Steam/Riot gaming handles instantly</li>
                    <li>Offline instant party chats and stats track</li>
                  </ul>
                  <div className="text-[9px] font-mono text-right opacity-60 mt-1">NFC Sync: Ready</div>
                </div>
              </div>
            </div>
          )}

          {/* Companion Window Footer Bar */}
          <div className="mt-6 pt-4 border-t border-retro-maroon/15 flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold text-retro-maroon-light/60 gap-3">
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-retro-sage"></span>
              <span>Matching Core Server:</span>
              <span className="text-retro-sage font-mono">us-east.queuemate.net</span>
            </div>
            <div className="flex space-x-4">
              <span>Ping: <strong className="text-retro-sage font-mono">14ms</strong></span>
              <span>Lobbies Active: <strong className="text-retro-orange font-mono">2,110</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED PLAYER DOSSIER MODAL */}
      {selectedProfileModal && (
        <div className="fixed inset-0 bg-retro-maroon/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-retro-cream border-wood shadow-wood-lg rounded-2xl p-6 max-w-md w-full relative space-y-4 text-retro-maroon animate-scale-up">
            <button
              onClick={() => setSelectedProfileModal(null)}
              className="absolute top-4 right-4 p-1.5 bg-retro-beige hover:bg-retro-beige/80 border-wood-thin rounded-full text-retro-maroon transition-transform hover:rotate-90"
            >
              <X size={16} />
            </button>

            {/* Header profile info */}
            <div className="flex items-center space-x-3.5 pb-3.5 border-b-2 border-retro-maroon/10">
              <GamerAvatar seed={selectedProfileModal.avatarSeed} size={54} bgColor={selectedProfileModal.avatarColor} />
              <div>
                <span className="text-[10px] font-mono text-retro-orange bg-retro-orange/10 px-2 py-0.5 rounded border border-retro-maroon/10 font-bold uppercase">
                  {selectedProfileModal.game}
                </span>
                <h3 className="font-serif text-xl font-black mt-1 leading-tight">{selectedProfileModal.name}</h3>
                <div className="flex gap-2 items-center mt-0.5">
                  <span className="text-xs font-sans font-bold text-retro-maroon-light">
                    {selectedProfileModal.rank}
                  </span>
                  <span className="text-[10px] text-retro-sage font-black bg-retro-sage/10 px-1.5 py-0.2 rounded border border-retro-maroon/10">
                    ★ {selectedProfileModal.vibeScore}% positive reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Dossier Specifications body */}
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="bg-retro-beige/25 p-3 rounded-lg border-wood-thin">
                <span className="text-[9px] font-mono font-bold uppercase text-retro-maroon-light block mb-1">Gamer Bio / Description:</span>
                <p className="italic">"{selectedProfileModal.description}"</p>
              </div>

              <div className="grid grid-cols-2 gap-3.5 font-sans">
                <div className="bg-retro-beige/10 p-2.5 rounded border-wood-thin">
                  <span className="text-[9px] font-mono block text-retro-maroon-light">ROLE SPECIFICITY</span>
                  <strong className="text-retro-maroon mt-0.5 block">{selectedProfileModal.role}</strong>
                </div>
                <div className="bg-retro-beige/10 p-2.5 rounded border-wood-thin">
                  <span className="text-[9px] font-mono block text-retro-maroon-light">PLAYSTYLE PROFILE</span>
                  <strong className="text-retro-orange mt-0.5 block">{selectedProfileModal.playstyle}</strong>
                </div>
                <div className="bg-retro-beige/10 p-2.5 rounded border-wood-thin">
                  <span className="text-[9px] font-mono block text-retro-maroon-light">COMMS METHOD</span>
                  <strong className="text-retro-maroon mt-0.5 block truncate text-[11px]">{selectedProfileModal.comms}</strong>
                </div>
                <div className="bg-retro-beige/10 p-2.5 rounded border-wood-thin">
                  <span className="text-[9px] font-mono block text-retro-maroon-light">VERIFIED DISCORD</span>
                  <strong className="text-blue-900 mt-0.5 block truncate text-[11px]">{selectedProfileModal.discordTag}</strong>
                </div>
              </div>

              <div>
                <span className="text-[9px] font-mono font-bold block text-retro-maroon-light mb-1">MOST COVETED SQUAD COMPLIMENTS</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProfileModal.compliments.map((badge, idx) => (
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

              <div className="flex flex-wrap gap-2 pt-2 text-[11px]">
                <strong className="text-retro-maroon font-bold">Preferred agents:</strong>
                <span className="text-retro-maroon-light bg-retro-beige px-2 py-0.5 rounded border border-retro-maroon/10">
                  {selectedProfileModal.favoriteAgents.join(" or ")}
                </span>
              </div>
            </div>

            {/* Modal actions */}
            <div className="grid grid-cols-2 gap-3 pt-3.5 border-t border-retro-maroon/10">
              <button
                onClick={() => setSelectedProfileModal(null)}
                className="py-2 hover:bg-retro-beige border-wood-thin font-bold transition-all text-xs uppercase text-center rounded-lg"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  alert(`Request forwarded! Connecting you to Discord voice channel with gamer. Voice link generated: discord.gg/queuemate-overlay-${selectedProfileModal.id}`);
                  setSelectedProfileModal(null);
                }}
                className="py-2 bg-retro-orange hover:bg-retro-orange-hover text-retro-cream font-bold border-wood shadow-wood hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-wood-sm transition-all text-xs uppercase text-center rounded-lg"
              >
                Launch lobby chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
