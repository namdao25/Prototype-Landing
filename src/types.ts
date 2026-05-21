/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum GameName {
  VALORANT = "Valorant",
  APEX_LEGENDS = "Apex Legends",
  CS2 = "Counter-Strike 2",
  OVERWATCH = "Overwatch 2"
}

export type PlaystyleType = "Aggressive" | "Strategic" | "Lurker" | "Support" | "Flex";
export type CommsType = "Voice Chat Essential" | "Voice Optional/Pings" | "Focused Comms" | "Chill Vibes Only";

export interface GamerProfile {
  id: string;
  name: string;
  avatarSeed: string; // for custom stylized generated avatars
  avatarColor: string; // background color for avatar hex
  game: GameName;
  rank: string;
  rankBadgeColor: string; // styles for high quality rank badge UI
  role: string;
  playstyle: PlaystyleType;
  comms: CommsType;
  favoriteAgents: string[];
  vibeScore: number; // e.g. 98% positive vibe
  compliments: string[]; // e.g. ["Solid IGL", "Clutch God", "Always positive"]
  description: string;
  discordTag: string;
}

export interface Review {
  id: string;
  author: string;
  game: GameName;
  rating: number;
  tags: string[];
  text: string;
  avatarSeed: string;
}
