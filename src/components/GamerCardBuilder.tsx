/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { GameName, GamerProfile, PlaystyleType, CommsType } from "../types";
import { GAMES_INFO } from "../data";
import { GamerAvatar } from "./GamerAvatar";
import { Sparkles, Check, RefreshCw, UserPlus, HelpCircle } from "lucide-react";

interface GamerCardBuilderProps {
  onRegister: (newProfile: GamerProfile) => void;
}

export const GamerCardBuilder: React.FC<GamerCardBuilderProps> = ({ onRegister }) => {
  // Developer inputs state
  const [name, setName] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<GameName>(GameName.VALORANT);
  const [selectedRole, setSelectedRole] = useState<string>("Duelist");
  const [selectedPlaystyle, setSelectedPlaystyle] = useState<PlaystyleType>("Strategic");
  const [selectedComms, setSelectedComms] = useState<CommsType>("Voice Chat Essential");
  const [selectedRank, setSelectedRank] = useState<string>("Platinum");
  const [favoriteAgents, setFavoriteAgents] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [discordTag, setDiscordTag] = useState<string>("");

  // Avatar customization
  const [avatarSeed, setAvatarSeed] = useState<string>("rand_seed_" + Math.floor(Math.random() * 1000));
  const [avatarColor, setAvatarColor] = useState<string>("#DF5834"); // retro orange default

  const [isSuccessfullyRegistered, setIsSuccessfullyRegistered] = useState<boolean>(false);

  // Automatically adjust rank & role options when game changes
  useEffect(() => {
    const info = GAMES_INFO[selectedGame];
    setSelectedRole(info.roles[0]);
    setSelectedRank(info.ranks[0]);
    setFavoriteAgents(info.agents.slice(0, 2).join(", "));
  }, [selectedGame]);

  const randomizeAvatar = () => {
    setAvatarSeed("rand_seed_" + Math.floor(Math.random() * 10000));
    const randomColors = ["#DF5834", "#EA9F3E", "#506756", "#2C0B12", "#4D1822", "#351A13", "#5E3123"];
    const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    setAvatarColor(randomColor);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Build the solid GamerProfile
    const generatedProfile: GamerProfile = {
      id: "usr-" + Date.now(),
      name: name.trim(),
      avatarSeed: avatarSeed,
      avatarColor: avatarColor,
      game: selectedGame,
      rank: selectedRank,
      rankBadgeColor: "bg-retro-maroon-light border-retro-gold/60 text-retro-cream",
      role: selectedRole,
      playstyle: selectedPlaystyle,
      comms: selectedComms,
      favoriteAgents: favoriteAgents.split(",").map((a) => a.trim()).filter(Boolean),
      vibeScore: 100, // new user starts fresh with amazing attitude
      compliments: ["Strategic Master", "Positive Comrade"],
      description: description.trim() || "Ready to queue up, coordinate roles, and secure the winning bracket!",
      discordTag: discordTag.trim() || `${name.trim().toLowerCase().replace(/\s+/g, "")}#001`
    };

    onRegister(generatedProfile);
    setIsSuccessfullyRegistered(true);

    // Reset success badge after 3 seconds
    setTimeout(() => {
      setIsSuccessfullyRegistered(false);
    }, 4000);
  };

  return (
    <div className="bg-retro-beige/35 border-wood shadow-wood-lg rounded-2xl p-6 lg:p-8 text-retro-maroon">
      <div className="mb-6">
        <span className="text-xs font-mono font-bold tracking-widest text-retro-orange bg-retro-orange/10 px-2.5 py-1 border-wood-thin rounded-full uppercase">
          Profile Sandbox
        </span>
        <h3 className="font-serif text-3xl font-black mt-2">Gamer Card Builder</h3>
        <p className="text-xs text-retro-maroon-light/70 mt-1 max-w-xl leading-relaxed">
          Design your custom digital card with our profile configurer to specify how you approach communication, scheduling, and tactical setups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile config options Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gamertag Input */}
            <div>
              <label className="text-[10px] font-sans font-black uppercase text-retro-maroon mb-1 block">
                1. GAMERTAG HANDLE *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. NovaStrike, ShroudMaster"
                className="w-full text-xs font-bold p-3 bg-retro-cream border-wood rounded-lg focus:outline-none focus:ring-1 focus:ring-retro-orange placeholder-retro-maroon/30"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Discord Username */}
            <div>
              <label className="text-[10px] font-sans font-black uppercase text-retro-maroon mb-1 block">
                2. DISCORD (VERIFIED SQUAD CONTACT)
              </label>
              <input
                type="text"
                placeholder="e.g. novastrike#123"
                className="w-full text-xs font-bold p-3 bg-retro-cream border-wood rounded-lg focus:outline-none focus:ring-1 focus:ring-retro-orange placeholder-retro-maroon/30"
                value={discordTag}
                onChange={(e) => setDiscordTag(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Main Game Selector */}
            <div>
              <label className="text-[10px] font-sans font-black uppercase text-retro-maroon mb-1 block">
                3. ACTIVE FPS TITLE
              </label>
              <select
                className="w-full text-xs font-bold p-3 bg-retro-cream border-wood rounded-lg focus:outline-none cursor-pointer"
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value as GameName)}
              >
                {Object.values(GameName).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Main Role Selector */}
            <div>
              <label className="text-[10px] font-sans font-black uppercase text-retro-maroon mb-1 block">
                4. FAVORED ROLE CATEGORY
              </label>
              <select
                className="w-full text-xs font-bold p-3 bg-retro-cream border-wood rounded-lg focus:outline-none cursor-pointer"
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

            {/* Peak Rank Selector */}
            <div>
              <label className="text-[10px] font-sans font-black uppercase text-retro-maroon mb-1 block">
                5. CURRENT PEAK COMPETITIVE RANK
              </label>
              <select
                className="w-full text-xs font-bold p-3 bg-retro-cream border-wood rounded-lg focus:outline-none cursor-pointer"
                value={selectedRank}
                onChange={(e) => setSelectedRank(e.target.value)}
              >
                {GAMES_INFO[selectedGame].ranks.map((rk) => (
                  <option key={rk} value={rk}>
                    {rk}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Playstyle orientation */}
            <div>
              <label className="text-[10px] font-sans font-black uppercase text-retro-maroon mb-1 block">
                6. STRATEGIC PLAYSTYLE ORIENTATION
              </label>
              <select
                className="w-full text-xs font-bold p-3 bg-retro-cream border-wood rounded-lg focus:outline-none cursor-pointer"
                value={selectedPlaystyle}
                onChange={(e) => setSelectedPlaystyle(e.target.value as PlaystyleType)}
              >
                <option value="Strategic">Strategic Planner (Defensive/Calculated)</option>
                <option value="Aggressive">Aggressive Entry (W-Key/Duelist style)</option>
                <option value="Lurker">Site Lurker (Flank holding/Quiet Trades)</option>
                <option value="Support">Passive Support (Smokes/Peels/Heals)</option>
                <option value="Flex">Flex Adaptable (Fills anything required)</option>
              </select>
            </div>

            {/* Comms behavior */}
            <div>
              <label className="text-[10px] font-sans font-black uppercase text-retro-maroon mb-1 block">
                7. SQUAD COMMS MANNERISM
              </label>
              <select
                className="w-full text-xs font-bold p-3 bg-retro-cream border-wood rounded-lg focus:outline-none cursor-pointer"
                value={selectedComms}
                onChange={(e) => setSelectedComms(e.target.value as CommsType)}
              >
                <option value="Voice Chat Essential">Voice Chat Essential (Clean brief calls)</option>
                <option value="Voice Optional/Pings">Voice Optional (Active pinging wheel)</option>
                <option value="Focused Comms">Focused Competitive (Strict dry callouts)</option>
                <option value="Chill Vibes Only">Chill Vibes Only (Late night casual jokes)</option>
              </select>
            </div>
          </div>

          {/* Specialty Agents */}
          <div>
            <label className="text-[10px] font-sans font-black uppercase text-retro-maroon mb-1 block bg-[radial-gradient(#FAF6EE_10%,transparent_11%)]">
              8. PREFERRED AGENTS SPECIALTIES (COMMA SEPARATED)
            </label>
            <input
              type="text"
              placeholder="e.g. Jett, Omen, Killjoy..."
              className="w-full text-xs font-bold p-3 bg-retro-cream border-wood rounded-lg focus:outline-none focus:ring-1 focus:ring-retro-orange placeholder-retro-maroon/30"
              value={favoriteAgents}
              onChange={(e) => setFavoriteAgents(e.target.value)}
            />
          </div>

          {/* Custom Description */}
          <div>
            <label className="text-[10px] font-sans font-black uppercase text-retro-maroon mb-1 block">
              9. PROFILE BIOGRAPHY SLOGAN
            </label>
            <textarea
              rows={2}
              maxLength={150}
              placeholder="What are your hours, play style goals, and squad types? Keep it positive!"
              className="w-full text-xs font-bold p-3 bg-retro-cream border-wood rounded-lg focus:outline-none focus:ring-1 focus:ring-retro-orange placeholder-retro-maroon/30 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="text-[9px] text-retro-maroon-light/50 float-right mt-1 font-mono">
              {description.length}/150 char limit
            </span>
          </div>

          {/* Avatar customization tools banner */}
          <div className="bg-retro-beige/40 p-3.5 rounded-lg border-wood-thin flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs font-medium">
              <span className="font-bold flex items-center gap-1">
                <Sparkles size={13} className="text-retro-gold" /> Custom Hand-Drawn Face Engine
              </span>
              <p className="text-[9.5px] text-retro-maroon-light/60 mt-0.5">
                Generate custom headsets, shades, spikes, and visors deteministically.
              </p>
            </div>
            <button
              type="button"
              onClick={randomizeAvatar}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-retro-cream border-wood shadow-wood hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-wood-sm transition-all text-[10px] font-sans font-black uppercase"
            >
              <RefreshCw size={11} />
              <span>MUTATE FACE STYLE</span>
            </button>
          </div>

          {/* Form Submit with beautiful feedback banner */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={!name.trim()}
              className={`w-full sm:w-auto px-8 py-4 text-xs font-sans font-black uppercase tracking-wider border-wood shadow-wood hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-wood-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all ${
                name.trim()
                  ? "bg-retro-orange text-retro-cream cursor-pointer"
                  : "bg-retro-beige text-retro-maroon/20 border-retro-maroon/20 shadow-none cursor-not-allowed"
              }`}
            >
              ✔ REGISTER GAMER CARD TO LOBBY
            </button>

            {isSuccessfullyRegistered && (
              <div className="flex items-center space-x-2 text-retro-sage font-sans font-black text-xs animate-pulse bg-retro-sage/10 p-2.5 rounded border border-retro-sage">
                <Check size={16} />
                <span>CARD RE-INDEXED WITHIN DIRECTORY DATABASE LOBBY!</span>
              </div>
            )}
          </div>
        </form>

        {/* Live Card Preview Box */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-3.5 bg-retro-cream/40 p-6 rounded-2xl border-wood border-dashed">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-retro-maroon-light/50">
            ★ Real-time Card Screen Preview ★
          </span>

          {/* Custom retro playercard container */}
          <div className="w-full max-w-[270px] bg-retro-cream border-wood shadow-wood p-5 rounded-2xl group transition-transform hover:scale-102 flex flex-col justify-between min-h-[380px] bg-gradient-to-br from-retro-cream to-retro-beige/10">
            <div>
              {/* Card top banner */}
              <div className="flex items-start justify-between">
                <GamerAvatar seed={avatarSeed} size={48} bgColor={avatarColor} />
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold bg-retro-orange/15 text-retro-orange border-wood-thin px-2 py-0.5 rounded-full uppercase">
                    {selectedGame.split(" ")[0]}
                  </span>
                  <div className="text-[9px] font-mono opacity-60 leading-none mt-2">PEAK LEVEL</div>
                  <strong className="text-[11px] font-serif font-black">{selectedRank || "Gold"}</strong>
                </div>
              </div>

              {/* Name & custom badging */}
              <div className="mt-4 pb-2 border-b-2 border-retro-maroon/10">
                <h4 className="font-serif font-black text-lg text-retro-maroon tracking-tight truncate leading-tight">
                  {name ? name : "NovaStrike"}
                </h4>
                <div className="flex gap-1.5 items-center mt-1">
                  <span className="text-[9px] bg-retro-maroon text-retro-cream px-2 py-0.5 rounded uppercase font-bold font-sans">
                    ★ {selectedRole}
                  </span>
                  <span className="text-[9px] text-retro-sage font-mono font-bold bg-retro-sage/10 border-wood-thin px-1.5 py-0.1 rounded">
                    100% VIBE
                  </span>
                </div>
              </div>

              {/* Custom biography content */}
              <p className="text-[11px] leading-relaxed italic text-retro-maroon-light/80 mt-3 line-clamp-4 bg-retro-beige/15 p-2 rounded border border-retro-maroon/10 min-h-[64px]">
                "{description ? description : "Ready to log on, connect headsets, and play with unified setups. Let's secure the podium this evening!"}"
              </p>

              {/* Specs parameters lists */}
              <div className="mt-4 space-y-1.5 font-sans">
                <div className="flex justify-between text-[9px] items-baseline border-b border-retro-maroon/10 pb-0.5">
                  <span className="opacity-60 uppercase font-medium">Strategic Grip</span>
                  <strong className="font-bold text-retro-maroon">{selectedPlaystyle}</strong>
                </div>
                <div className="flex justify-between text-[9px] items-baseline border-b border-retro-maroon/10 pb-0.5">
                  <span className="opacity-60 uppercase font-medium">Headset Channel</span>
                  <strong className="font-bold text-retro-orange truncate max-w-[130px] text-right">
                    {selectedComms.split(" ")[0]}
                  </strong>
                </div>
                <div className="flex justify-between text-[9px] items-baseline">
                  <span className="opacity-60 uppercase font-medium">Target agents</span>
                  <strong className="font-bold text-retro-sage truncate max-w-[130px] text-right">
                    {favoriteAgents ? favoriteAgents : "Jett / Omen"}
                  </strong>
                </div>
              </div>
            </div>

            {/* Card footer verification string */}
            <div className="pt-3 border-t border-retro-maroon/10 flex justify-between items-center mt-4">
              <span className="font-mono text-[7.5px] opacity-50 uppercase">VERIFIED: {discordTag ? discordTag : "novastrike#001"}</span>
              <span className="font-sans text-[7.5px] bg-retro-sage text-retro-cream px-1 py-0.2 rounded font-bold leading-none select-none">
                SQUAD-READY
              </span>
            </div>
          </div>

          <div className="text-[10px] text-center text-retro-maroon-light/50 font-sans leading-relaxed max-w-[240px]">
            Once registered, this profile will automatically populate within the live matching simulation lobby stream.
          </div>
        </div>
      </div>
    </div>
  );
};
