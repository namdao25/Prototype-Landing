/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameName, GamerProfile, Review } from "./types";

export const GAMES_INFO = {
  [GameName.VALORANT]: {
    roles: ["Duelist", "Initiator", "Controller", "Sentinel", "Flex"],
    ranks: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ascendant", "Immortal", "Radiant"],
    agents: ["Jett", "Raze", "Omen", "Sova", "Killjoy", "Reyna", "Clove", "Gekko"]
  },
  [GameName.APEX_LEGENDS]: {
    roles: ["Fragger", "Anchor", "Recon", "Support", "IGL"],
    ranks: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Apex Predator"],
    agents: ["Wraith", "Pathfinder", "Gibraltar", "Bloodhound", "Horizon", "Catalyst", "Lifeline"]
  },
  [GameName.CS2]: {
    roles: ["Entry Fragger", "AWPer", "IGL", "Lurker", "Support"],
    ranks: ["Silver", "Gold Nova", "Master Guardian", "Legendary Eagle", "Global Elite", "Level 5", "Level 8", "Level 10 (Faceit)"],
    agents: ["AK-47 Specialist", "M4 Hold", "Utility King", "Aggressive Entry", "Site Anchor"]
  },
  [GameName.OVERWATCH]: {
    roles: ["Tank", "Hitscan DPS", "Projectiles DPS", "Flex Support", "Main Support"],
    ranks: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Champion"],
    agents: ["Tracer", "Ana", "Reinhardt", "Genji", "Kiri", "Winston", "Widowmaker", "Mercy"]
  }
};

export const INITIAL_TEAMMATES: GamerProfile[] = [
  {
    id: "rec-1",
    name: "EchoZ",
    avatarSeed: "avatar_echo",
    avatarColor: "#506756", // sage
    game: GameName.VALORANT,
    rank: "Platinum 2",
    rankBadgeColor: "bg-emerald-900 border-emerald-500 text-emerald-200",
    role: "Duelist",
    playstyle: "Aggressive",
    comms: "Voice Chat Essential",
    favoriteAgents: ["Jett", "Reyna"],
    vibeScore: 98,
    compliments: ["Excellent Comms", "Space Creator", "Ice In Veins"],
    description: "Looking for an initiator who can flash me in and assist with secondary calls. I'm dynamic, active, and play to win but never toxic. Usually free after 8 PM EST.",
    discordTag: "echoz_gaming#412"
  },
  {
    id: "rec-2",
    name: "RazeMain",
    avatarSeed: "avatar_raze",
    avatarColor: "#DF5834", // retro orange
    game: GameName.VALORANT,
    rank: "Diamond 1",
    rankBadgeColor: "bg-amber-900 border-amber-500 text-amber-200",
    role: "Initiator",
    playstyle: "Strategic",
    comms: "Focused Comms",
    favoriteAgents: ["Sova", "Gekko"],
    vibeScore: 100,
    compliments: ["Strategic Master", "Positive Vibe", "Great Setup Maker"],
    description: "Sova/Gekko main. I memorize double shock darts and execute clear coordinate strategies. Let's coordinate timings and push for Ascendant this season!",
    discordTag: "razemain__#333"
  },
  {
    id: "rec-3",
    name: "ViperVixen",
    avatarSeed: "avatar_viper",
    avatarColor: "#2C0B12", // maroon
    game: GameName.VALORANT,
    rank: "Ascendant 1",
    rankBadgeColor: "bg-purple-950 border-purple-500 text-purple-200",
    role: "Controller",
    playstyle: "Lurker",
    comms: "Focused Comms",
    favoriteAgents: ["Viper", "Omen"],
    vibeScore: 97,
    compliments: ["Vanguard Support", "Smokes Maestro", "Always Calm"],
    description: "Smoke line ups master. I anchor B site with confidence and always hold flanks. Looking for solid consistent duelists to climb with.",
    discordTag: "viper_vixen#499"
  },
  {
    id: "rec-4",
    name: "PathfinderPro",
    avatarSeed: "avatar_path",
    avatarColor: "#EA9F3E", // retro gold
    game: GameName.APEX_LEGENDS,
    rank: "Master",
    rankBadgeColor: "bg-sky-950 border-sky-400 text-sky-200",
    role: "Fragger",
    playstyle: "Aggressive",
    comms: "Voice Chat Essential",
    favoriteAgents: ["Pathfinder", "Horizon"],
    vibeScore: 99,
    compliments: ["Beast Gunplay", "Insane Movement", "Big Brain Roams"],
    description: "Looking for a defensive Anchor and IGL to coordinate rotations on Storm Point. High level gunplay, let's secure the podium.",
    discordTag: "pathfinder_pro#101"
  },
  {
    id: "rec-5",
    name: "CptAmerica",
    avatarSeed: "avatar_cap",
    avatarColor: "#5E3123", // woody mid
    game: GameName.CS2,
    rank: "Faceit Level 10",
    rankBadgeColor: "bg-amber-950 border-amber-600 text-amber-100",
    role: "IGL",
    playstyle: "Strategic",
    comms: "Voice Chat Essential",
    favoriteAgents: ["AK-47 Specialist", "Utility King"],
    vibeScore: 98,
    compliments: ["Tier-1 Tactics", "Stellar Calls", "Patience Of Gold"],
    description: "Forming an amateur competitive squad for weekly Faceit cups. Need a solid entry fragger. Comms must be clean, dry, and tactical.",
    discordTag: "cpt_america#987"
  },
  {
    id: "rec-6",
    name: "MercyForYou",
    avatarSeed: "avatar_mercy",
    avatarColor: "#506756", // retro sage
    game: GameName.OVERWATCH,
    rank: "Grandmaster 3",
    rankBadgeColor: "bg-emerald-950 border-cyan-400 text-cyan-200",
    role: "Flex Support",
    playstyle: "Support",
    comms: "Chill Vibes Only",
    favoriteAgents: ["Ana", "Kiri", "Mercy"],
    vibeScore: 100,
    compliments: ["Unbelievable Peels", "Insane Healing", "Hype Squad Leader"],
    description: "Ana and Kiriko main. Looking for a steady Hitscan DPS partner. I provide amazing heals, nano timings, and a stress-free competitive mental state.",
    discordTag: "mcy_fy#002"
  },
  {
    id: "rec-7",
    name: "Xxx_ShroudLover_xxX",
    avatarSeed: "avatar_shroud",
    avatarColor: "#351A13",
    game: GameName.CS2,
    rank: "Global Elite",
    rankBadgeColor: "bg-red-950 border-red-500 text-red-200",
    role: "Entry Fragger",
    playstyle: "Aggressive",
    comms: "Focused Comms",
    favoriteAgents: ["Aggressive Entry"],
    vibeScore: 94,
    compliments: ["W-Key Warrior", "Amazing Entry", "Headshot Machine"],
    description: "Pure entries, zero fear. Shoot hard, die hard, coordinate retakes. I play nightly around 10 PM. Looking for dynamic flash support and crosshair trades.",
    discordTag: "shroudlover#567"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Zellsiz",
    game: GameName.VALORANT,
    rating: 5,
    tags: ["99% Vibe Match", "Found Duo Partner", "No More Soloqueue"],
    text: "Before QueueMate, solo queuing in Valorant was keeping me in Plat hell, getting match after match with toxic instalock duelists. Through QueueMate I built my regular 5-stack in under a week. We climbed to Immortal 1 together. The vibe-based matching is actually a godsend.",
    avatarSeed: "user_zellsiz"
  },
  {
    id: "rev-2",
    author: "Kandy_CS",
    game: GameName.CS2,
    rating: 5,
    tags: ["Tactical Matches", "Clean Comms", "IGL Leaderboard"],
    text: "As a strategic IGL, it's virtually impossible to execute utility executes when your team has zero mics. QueueMate filtered for Players with 'Voice Essential' and high ratings. I met CptAmerica here, and we've been running Faceit scrims flawlessly.",
    avatarSeed: "user_kandy"
  },
  {
    id: "rev-3",
    author: "HorizonFlyer",
    game: GameName.APEX_LEGENDS,
    rating: 5,
    tags: ["Rank Progress", "No Toxicity", "Playstyle Aligned"],
    text: "Apex is unplayable without coordinated focus fires. QueueMate allowed me to find an aggressive fragger and an anchor who plays Watson. We hit Master for the first time! The best part is the 'Anti-ToX' multiplier — everyone is motivated to stay positive.",
    avatarSeed: "user_horizon"
  }
];

export const FAQ_ITEMS = [
  {
    question: "How does the 'Vibe & Goal' matching system work?",
    answer: "Unlike traditional looking-for-group (LFG) boards that only post 'Need 1 for Plat', QueueMate profiles people by their competitive orientation (Climbing vs. Playing for Fun), comms style (Voice active, Pings only, focused, chatty), and playstyle parameters. Our internal matching index highlights teammates who complement your position and hold similar standards of game etiquette."
  },
  {
    question: "What is the 'Anti-Tox' Reputation multiplier?",
    answer: "Every teammate you queue with can leave a brief vibe review at the end of a session, awarding compliments like 'Great Communicator', 'Always Calm', or 'Strategic Master'. Accumulating these custom badges creates a permanent vibe multiplier on your badge, unlocking priority queues with other top-tier, positive squadmates."
  },
  {
    question: "Is this Discord-integrated?",
    answer: "Absolutely. QueueMate syncs natively with Discord. When you find a compatible mate or squad, you can join a dedicated voice channel with woodcut noise-cancellation settings, exchange gamer cards, or link up within a single click."
  },
  {
    question: "Which games are supported?",
    answer: "We support Valorant, Counter-Strike 2, Apex Legends, and Overwatch 2, with plans for Rainbow Six Siege, Marvel Rivals, and Deadlock launching shortly in our next season update."
  }
];
