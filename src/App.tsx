/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  CalendarClock,
  ChevronRight,
  Gamepad2,
  HeartHandshake,
  Layers,
  Menu,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users2,
  X
} from "lucide-react";

type PrototypeTab = "home" | "teams" | "schedule";

const figmaLink = "https://www.figma.com/design/05ThwPHYBaLyvEQOu4OdQJ/Something-Random--QueueMate-?node-id=0-1&t=UaeSlosexKXSJ7bu-1";
const githubLink = "https://github.com/namdao25/Prototype-Landing";
const conceptVideo = "https://www.youtube.com/embed/t8aAmrrVfxc";

const navItems = [
  { href: "#overview", label: "Overview" },
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#prototype", label: "Prototype" },
  { href: "#process", label: "Process" },
  { href: "#video", label: "Video" },
  { href: "#team", label: "Team" }
];

const featureCards = [
  {
    icon: Search,
    title: "Quick Teammate Queue",
    eyebrow: "Find someone now",
    body: "Queue for compatible players based on game, language, rank range, communication style, and teammate preferences."
  },
  {
    icon: Users2,
    title: "Add to Team",
    eyebrow: "Keep the good ones",
    body: "Turn a good match into a duo, small group, or full squad instead of losing that player after one game."
  },
  {
    icon: Target,
    title: "Team Fit",
    eyebrow: "Explain compatibility",
    body: "Break down fit by roles, rank, communication, shared goals, and availability overlap so users know why a team works."
  },
  {
    icon: HeartHandshake,
    title: "Invite Missing Players",
    eyebrow: "Reconnect without recall",
    body: "Invite suggested, recently met, liked, or username-searched players when a team needs another teammate."
  },
  {
    icon: CalendarClock,
    title: "Availability Overlap",
    eyebrow: "Plan the next session",
    body: "Add availability, compare team overlap, and choose a window when the most teammates can play."
  },
  {
    icon: ShieldCheck,
    title: "Safer Session Invites",
    eyebrow: "Confirm and recover",
    body: "Review details before sending, undo sent invites, edit sessions, and confirm changes to important scheduling actions."
  }
];

const prototypeTabs: Record<PrototypeTab, { title: string; subtitle: string; images: { src: string; title: string; caption: string }[] }> = {
  home: {
    title: "Home / Desktop: queue for compatible players",
    subtitle: "QueueMate starts with quick teammate discovery, then shows how a good match can become someone to play with now, add to a team, or reconnect with later.",
    images: [
      { src: "/assets/home-queue.png", title: "Start a quick queue", caption: "The Home tab begins with a simple queue action for the selected game." },
      { src: "/assets/home-settings.png", title: "Tune preferences", caption: "Players can narrow matches by communication, language, rank disparity, and past teammates." },
      { src: "/assets/home-found.png", title: "Teammate found", caption: "The user can queue in-game now or add the found teammate to a team." },
      { src: "/assets/desktop-postgame.png", title: "Post-game feedback", caption: "Desktop review closes the loop by letting users rate, save, and reconnect after a match." }
    ]
  },
  teams: {
    title: "Teams: keep and organize teammates",
    subtitle: "Teams can represent a duo, small group, or full squad. The goal is to keep good teammates from disappearing.",
    images: [
      { src: "/assets/team-main.png", title: "My teams", caption: "Users can view existing squads, join recommended teams, search, or create a new team." },
      { src: "/assets/team-detail.png", title: "Team detail", caption: "A selected team shows members, next session, chat, scheduling, and management actions." },
      { src: "/assets/team-fit.png", title: "Team fit", caption: "Compatibility is broken into role balance, rank, communication, goals, and availability." },
      { src: "/assets/invite-methods.png", title: "Invite method", caption: "Users can choose suggested, recently met, liked, or username-based invite pathways." },
      { src: "/assets/invite-suggested.png", title: "Suggested players", caption: "Recommendations surface players who appear to fit the team’s needs." },
      { src: "/assets/invite-recently-met.png", title: "Recently met", caption: "Recently queued teammates can be found again without remembering exact usernames." },
      { src: "/assets/invite-liked.png", title: "Liked players", caption: "Players rated positively are easy to invite into a lasting team." }
    ]
  },
  schedule: {
    title: "Schedule: plan future sessions",
    subtitle: "The scheduling flow helps a team coordinate availability, choose the best overlap, and send a safer invite.",
    images: [
      { src: "/assets/schedule-main.png", title: "Current team", caption: "The selected team state makes it clear which squad the schedule applies to." },
      { src: "/assets/schedule-add-availability.png", title: "Add availability", caption: "Users add availability for a specific date instead of guessing which weekday is meant." },
      { src: "/assets/schedule-saved-availability.png", title: "Saved availability", caption: "Saved times remain visible so users can review or edit what they already added." },
      { src: "/assets/schedule-best-overlap.png", title: "Best overlap", caption: "QueueMate ranks time windows by how many teammates are available." },
      { src: "/assets/schedule-create-invite.png", title: "Create invite", caption: "The user builds a session invite with game, goal, time, and message." },
      { src: "/assets/schedule-confirm-invite.png", title: "Confirm invite", caption: "A review step helps prevent accidentally sending the wrong details." },
      { src: "/assets/schedule-invite-sent.png", title: "Invite sent", caption: "The final state includes recovery actions like Undo Invite and Edit Session." }
    ]
  }
};

const processSteps = [
  {
    title: "Problem framing",
    body: "We started with a shared interest in games and online connection, then framed the problem around players who want compatible teammates instead of one-off random matches."
  },
  {
    title: "Design research",
    body: "Interviews and a graffiti wall showed repeated pain points: toxic behavior, poor communication, mismatched goals, uneven skill, and schedules that make stable teams hard to maintain."
  },
  {
    title: "Divergent ideation",
    body: "Before settling on the final direction, we explored multiple forms: mobile finder flows, a desktop companion, a passive physical device, and even AR-style concepts."
  },
  {
    title: "Storyboarding + paper prototype",
    body: "We storyboarded the teammate lifecycle, then built paper prototypes for reconnecting with teammates and keeping a team together through availability overlap."
  },
  {
    title: "Usability testing",
    body: "Testing showed that users needed clearer invite wording, safer confirmation states, and ways to find past teammates without relying on exact username recall."
  },
  {
    title: "Digital mockup",
    body: "The final mockup connects Home, Teams, Schedule, and the desktop companion into one system for finding, keeping, and coordinating with teammates."
  }
];

const processArtifacts = [
  {
    src: "/assets/process-device-sketch.png",
    title: "Exploring a physical companion",
    caption: "One early direction imagined a small passive desktop device that paired with a desktop teammate-finding interface."
  },
  {
    src: "/assets/process-ar-sketch.png",
    title: "Exploring hands-free ideas",
    caption: "Another exploratory sketch considered AR-style controls and lightweight notifications around a gaming setup."
  },
  {
    src: "/assets/process-storyboard.png",
    title: "Storyboarding the scheduling pain",
    caption: "The storyboard clarified the core Task 5 journey: a good one-time team falls apart unless the app helps them coordinate future sessions."
  },
  {
    src: "/assets/process-paper-overview.png",
    title: "Paper prototype across platforms",
    caption: "The paper prototype mapped mobile, desktop, and in-game touchpoints before the visual system was polished."
  },
  {
    src: "/assets/process-digital-overview.png",
    title: "Finished digital mockup",
    caption: "The final Figma board brought the mobile and desktop flows together into a polished system."
  }
];

const iterationCards = [
  {
    title: "Connected quick queue to team-building",
    body: "The Home flow now leads into Teams by letting users play immediately, add a found teammate to a team, or reconnect later through recently met and liked players.",
    image: "/assets/home-found.png"
  },
  {
    title: "Added safer confirmation and recovery states",
    body: "QueueMate confirms important actions before they affect other people, then gives users recovery options like Undo Invite, Edit Session, Keep Time, and Delete.",
    image: "/assets/schedule-confirm-invite.png"
  },
  {
    title: "Improved visual consistency and polish",
    body: "The final mockup uses consistent dark cards, purple active states, rounded controls, bottom navigation, and clearer typography across the app.",
    image: "/assets/invite-methods.png"
  }
];

const teamMembers = ["Nam Dao", "MarcusRaine Salvino", "Kody Abrams", "Ben Yang", "Charles Zhou"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] font-mono font-black tracking-widest text-retro-orange uppercase bg-retro-orange/10 px-3 py-1 border-wood-thin border-retro-orange/20 rounded-full shadow-wood-sm">
      <Sparkles size={12} />
      {children}
    </span>
  );
}

function WoodButton({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "cream" }) {
  const classes = variant === "primary"
    ? "bg-retro-orange text-retro-cream hover:bg-retro-gold"
    : "bg-retro-cream text-retro-maroon hover:bg-retro-beige/60";

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 border-wood shadow-wood-lg hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-wood active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all font-sans font-black text-xs tracking-widest uppercase rounded-xl ${classes}`}
    >
      {children}
      <ChevronRight size={16} />
    </a>
  );
}

function ScreenshotCard({ image, large = false }: { image: { src: string; title: string; caption: string }; large?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35 }}
      className={`bg-retro-cream border-wood shadow-wood rounded-2xl overflow-hidden ${large ? "md:col-span-2" : ""}`}
    >
      <div className="bg-retro-maroon text-retro-cream px-4 py-2 flex items-center justify-between border-b-3 border-retro-maroon">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest">{image.title}</span>
        <span className="text-retro-gold">●</span>
      </div>
      <div className="p-3 bg-retro-beige/25">
        <div className="bg-retro-cream/70 rounded-xl border-2 border-retro-maroon/15 overflow-hidden flex items-center justify-center">
          <img
            src={image.src}
            alt={image.title}
            className="w-full max-h-[520px] object-contain bg-retro-maroon/5"
          />
        </div>
      </div>
      <p className="px-4 pb-4 text-xs leading-relaxed text-retro-maroon-light/85">{image.caption}</p>
    </motion.article>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PrototypeTab>("home");
  const activePrototype = prototypeTabs[activeTab];

  return (
    <div className="min-h-screen bg-retro-cream text-retro-maroon font-body selection:bg-retro-orange selection:text-retro-cream">
      <header className="sticky top-0 bg-retro-cream/90 backdrop-blur-md z-40 border-b-3 border-retro-maroon">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          <a href="#overview" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-retro-cream border-wood shadow-wood-sm rounded-lg flex items-center justify-center overflow-hidden group-hover:bg-retro-gold transition-colors">
              <img src="/assets/logo.png" alt="QueueMate logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-serif font-black text-lg tracking-tight uppercase block leading-none">QueueMate</span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-retro-orange mt-0.5 block">Something Random</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center space-x-1 font-sans text-xs font-bold uppercase tracking-widest text-retro-maroon-light">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 hover:bg-retro-beige/45 rounded-lg border-b-2 border-transparent hover:border-retro-orange transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a href={figmaLink} target="_blank" rel="noreferrer" className="px-4 py-2.5 bg-retro-maroon hover:bg-retro-maroon-light text-retro-cream border-wood shadow-wood hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-wood-sm transition-all text-[11px] font-sans font-black tracking-wider uppercase rounded-lg">
              View Figma
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="lg:hidden p-2 bg-retro-beige/50 border-wood-thin rounded-lg text-retro-maroon focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-retro-cream border-t-3 border-retro-maroon overflow-hidden font-sans text-xs font-black uppercase tracking-wider text-retro-maroon">
            <div className="px-4 py-4 space-y-3 flex flex-col">
              {navItems.map((item, index) => (
                <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-retro-maroon/5 hover:text-retro-orange flex justify-between">
                  <span>{index + 1}. {item.label}</span>
                  <span>→</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="overview" className="relative px-4 md:px-8 py-14 md:py-22 overflow-hidden bg-gradient-to-b from-retro-cream via-retro-cream to-retro-beige/25 border-b-3 border-retro-maroon">
          <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#2C0B12_1.5px,transparent_1.5px),linear-gradient(to_bottom,#2C0B12_1.5px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
            <div className="lg:col-span-6 space-y-7">
              <div className="flex flex-wrap gap-2 select-none">
                <span className="inline-flex items-center gap-1 text-[10px] font-sans font-black uppercase tracking-wider bg-retro-orange/10 text-retro-orange px-3 py-1 rounded-full border-wood-thin border-retro-orange/20 shadow-wood-sm">
                  <Sparkles size={11} /> CSE 440 Final Project
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-sans font-black uppercase tracking-wider bg-retro-gold/10 text-retro-gold px-3 py-1 rounded-full border-wood-thin border-retro-gold/20 shadow-wood-sm">
                  FPS teammate finder
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-sans font-black uppercase tracking-wider bg-retro-sage/10 text-retro-sage px-3 py-1 rounded-full border-wood-thin border-retro-sage/20 shadow-wood-sm">
                  Mobile + desktop concept
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-black text-retro-maroon tracking-tight leading-[1.02]">
                  Find compatible teammates. <span className="text-retro-orange underline decoration-retro-gold decoration-4 underline-offset-4">Keep</span> the good ones.
                </h1>
                <p className="font-body text-base md:text-lg text-retro-maroon-light/85 leading-relaxed max-w-2xl">
                  QueueMate helps FPS and competitive team-game players find reliable teammates, save good matches, build teams or duos, and schedule future sessions around everyone’s availability.
                </p>
                <p className="font-serif italic text-lg text-retro-maroon-light">Making mates and keeping them together since 2026.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <WoodButton href="#video"><PlayCircle size={16} /> Watch Concept Video</WoodButton>
                <WoodButton href={figmaLink} variant="cream"><Layers size={16} /> View Figma Prototype</WoodButton>
              </div>

              <div className="pt-5 grid grid-cols-3 gap-3 max-w-xl border-t border-retro-maroon/10">
                <div>
                  <div className="text-3xl font-serif font-black text-retro-maroon">3</div>
                  <div className="text-[10px] text-retro-maroon-light/60 font-bold uppercase tracking-wider">Connected surfaces</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-black text-retro-orange">2</div>
                  <div className="text-[10px] text-retro-maroon-light/60 font-bold uppercase tracking-wider">Primary tasks</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-black text-retro-sage">1</div>
                  <div className="text-[10px] text-retro-maroon-light/60 font-bold uppercase tracking-wider">Teammate loop</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative min-h-[520px]">
                <motion.div initial={{ rotate: -4, y: 10 }} animate={{ rotate: -3, y: 0 }} transition={{ duration: 0.6 }} className="absolute left-0 top-14 w-[48%] bg-retro-cream border-wood shadow-wood-lg rounded-2xl p-3">
                  <img src="/assets/home-found.png" alt="Teammate found screen" className="rounded-xl border-2 border-retro-maroon/10" />
                  <p className="mt-2 text-[10px] font-mono font-black uppercase text-retro-orange">Play now or add to team</p>
                </motion.div>
                <motion.div initial={{ rotate: 3, y: -8 }} animate={{ rotate: 2, y: 0 }} transition={{ duration: 0.8 }} className="absolute right-0 top-0 w-[52%] bg-retro-cream border-wood shadow-wood-lg rounded-2xl p-3 z-10">
                  <img src="/assets/team-fit.png" alt="Team fit screen" className="rounded-xl border-2 border-retro-maroon/10" />
                  <p className="mt-2 text-[10px] font-mono font-black uppercase text-retro-sage">Understand team fit</p>
                </motion.div>
                <motion.div initial={{ rotate: 2, y: 14 }} animate={{ rotate: 1, y: 0 }} transition={{ duration: 0.7 }} className="absolute left-[20%] bottom-0 w-[54%] bg-retro-cream border-wood shadow-wood-lg rounded-2xl p-3 z-20">
                  <img src="/assets/schedule-best-overlap.png" alt="Best overlap screen" className="rounded-xl border-2 border-retro-maroon/10" />
                  <p className="mt-2 text-[10px] font-mono font-black uppercase text-retro-gold">Find team overlap</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto border-b-3 border-retro-maroon">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <SectionLabel>Problem</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tight leading-tight">Random matchmaking is fast, but connections disappear.</h2>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <p className="text-lg leading-relaxed text-retro-maroon-light/85">
                Random matchmaking helps players get into games quickly, but it does not help them build lasting teammate connections. Players can find someone with good communication, similar goals, or compatible roles, but lose that connection after the match ends. Even when players form a group, school, work, and life schedules can make it hard to keep playing together.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  ["Lost teammates", "Good matches disappear after one game."],
                  ["Mismatched goals", "Ranked climbers, casual players, and clip hunters collide."],
                  ["Schedule conflicts", "Even good teams fall apart when times do not line up."]
                ].map(([title, body]) => (
                  <div key={title} className="bg-retro-beige/25 border-wood-thin shadow-wood-sm rounded-xl p-4">
                    <h3 className="font-serif font-black text-lg">{title}</h3>
                    <p className="text-xs leading-relaxed text-retro-maroon-light/80 mt-2">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="px-4 md:px-8 py-16 md:py-24 bg-retro-beige/20 border-b-3 border-retro-maroon">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <SectionLabel>Solution</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tight leading-tight">From one good match to a team users can keep.</h2>
              <p className="text-base md:text-lg leading-relaxed text-retro-maroon-light/85">
                QueueMate connects quick teammate discovery with long-term team building. Players can queue for compatible teammates, add good matches to teams or duos, view team fit, invite missing players, compare availability overlap, and send safer session invites.
              </p>
            </div>

            <div id="how-it-works" className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {[
                { icon: Search, title: "Queue", body: "Start with a quick teammate search based on game, communication, language, rank, and teammate preferences." },
                { icon: Gamepad2, title: "Play", body: "Queue with a compatible player right away instead of waiting to build a full squad." },
                { icon: HeartHandshake, title: "Keep", body: "Add good matches to a team or reconnect later through recently met or liked players." },
                { icon: CalendarClock, title: "Schedule", body: "Use team availability overlap to plan future sessions and send invites safely." }
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative bg-retro-cream border-wood shadow-wood rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-retro-orange/10 border-wood-thin text-retro-orange rounded-xl flex items-center justify-center">
                        <Icon size={22} />
                      </div>
                      <span className="font-serif text-3xl font-black text-retro-maroon/15">0{index + 1}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-black">{step.title}</h3>
                    <p className="text-xs leading-relaxed text-retro-maroon-light/85">{step.body}</p>
                  </div>
                );
              })}
            </div>

            <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="bg-retro-cream border-wood shadow-wood rounded-2xl p-6 space-y-4 hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-wood-sm transition-all">
                    <div className="w-12 h-12 bg-retro-gold/10 border-wood-thin text-retro-gold rounded-xl flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono font-black uppercase tracking-widest text-retro-orange">{feature.eyebrow}</p>
                      <h3 className="font-serif text-xl font-black mt-1">{feature.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-retro-maroon-light/90">{feature.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="prototype" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto border-b-3 border-retro-maroon">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <SectionLabel>Final Prototype</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tight leading-tight">Three connected surfaces, one teammate lifecycle.</h2>
            <p className="text-sm md:text-base text-retro-maroon-light/80 leading-relaxed">
              QueueMate combines a mobile app, a desktop/game companion, and scheduling flows so players can find, keep, and coordinate with teammates over time.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.entries(prototypeTabs).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as PrototypeTab)}
                className={`px-5 py-3 rounded-xl border-wood font-sans text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === key
                    ? "bg-retro-maroon text-retro-cream shadow-wood"
                    : "bg-retro-cream text-retro-maroon shadow-wood-sm hover:bg-retro-beige/60"
                }`}
              >
                {key === "home" ? "Home + Desktop" : key === "teams" ? "Teams" : "Schedule"}
              </button>
            ))}
          </div>

          <div className="bg-retro-beige/20 border-wood shadow-wood-lg rounded-3xl p-5 md:p-8">
            <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <h3 className="font-serif text-3xl font-black">{activePrototype.title}</h3>
                <p className="text-sm text-retro-maroon-light/85 max-w-2xl mt-2">{activePrototype.subtitle}</p>
              </div>
              <a href={figmaLink} target="_blank" rel="noreferrer" className="text-xs font-mono font-black uppercase text-retro-orange hover:text-retro-maroon inline-flex items-center gap-1">
                Open full Figma <ChevronRight size={14} />
              </a>
            </div>
            {activeTab === "home" ? (
              <div className="space-y-8">
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-serif text-2xl font-black">Mobile queue flow</h4>
                      <p className="text-xs text-retro-maroon-light/80 mt-1">
                        The mobile flow moves from starting a queue, to setting preferences, to choosing whether to play now or add the teammate to a team.
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex text-[10px] font-mono font-black uppercase tracking-widest text-retro-orange bg-retro-orange/10 border-wood-thin border-retro-orange/20 rounded-full px-3 py-1">
                      3-step mobile flow
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {activePrototype.images.slice(0, 3).map((image) => (
                      <ScreenshotCard key={image.src} image={image} />
                    ))}
                  </div>
                </div>

                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.35 }}
                  className="bg-retro-cream border-wood shadow-wood rounded-2xl overflow-hidden"
                >
                  <div className="bg-retro-maroon text-retro-cream px-4 py-2 flex items-center justify-between border-b-3 border-retro-maroon">
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest">Desktop companion: post-game feedback</span>
                    <span className="text-retro-gold">●</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 md:p-5 bg-retro-beige/25">
                    <div className="lg:col-span-4 flex flex-col justify-center space-y-3 p-2">
                      <h4 className="font-serif text-2xl font-black text-retro-maroon">Close the loop after the match</h4>
                      <p className="text-sm leading-relaxed text-retro-maroon-light/85">
                        After queueing and playing together, the desktop view lets users rate teammates, save good matches, update preferences, and reconnect later.
                      </p>
                    </div>
                    <div className="lg:col-span-8 bg-retro-cream/70 border-2 border-retro-maroon/15 rounded-xl p-3 flex items-center justify-center">
                      <img
                        src="/assets/desktop-postgame.png"
                        alt="Desktop post-game feedback screen"
                        className="w-full max-h-[560px] object-contain rounded-lg"
                      />
                    </div>
                  </div>
                </motion.article>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePrototype.images.map((image, index) => (
                  <ScreenshotCard key={image.src} image={image} large={index === 0 && activePrototype.images.length < 5} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="process" className="px-4 md:px-8 py-16 md:py-24 bg-retro-beige/15 border-b-3 border-retro-maroon">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
              <SectionLabel>Peek into the process</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tight leading-tight">From rough teammate ideas to a connected product.</h2>
              <p className="text-sm leading-relaxed text-retro-maroon-light/85">
                QueueMate did not start as one fixed screen. We moved from broad teammate-finding ideas, to research-backed task flows, to paper testing, and finally to a polished mobile/desktop mockup.
              </p>
              <div className="bg-retro-cream border-wood shadow-wood rounded-2xl p-4">
                <img src="/assets/process-storyboard.png" alt="QueueMate storyboard" className="rounded-xl border-2 border-retro-maroon/10" />
                <p className="mt-3 text-xs text-retro-maroon-light/80 leading-relaxed">
                  The storyboard helped us focus on the core promise: one good match should be able to become a lasting team.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="bg-retro-cream border-wood shadow-wood rounded-2xl p-5 flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-retro-maroon text-retro-cream border-wood-thin border-retro-maroon flex items-center justify-center font-serif font-black shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-black">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-retro-maroon-light/85 mt-1">{step.body}</p>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {processArtifacts.map((artifact, index) => (
                  <motion.article
                    key={artifact.src}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.03 }}
                    className={`${index === 2 || index === 4 ? "md:col-span-2" : ""} bg-retro-cream border-wood shadow-wood rounded-2xl overflow-hidden`}
                  >
                    <div className="bg-retro-maroon text-retro-cream px-4 py-2 flex items-center justify-between border-b-3 border-retro-maroon">
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest">{artifact.title}</span>
                      <span className="text-retro-gold">●</span>
                    </div>
                    <div className="p-3 bg-retro-beige/25">
                      <img src={artifact.src} alt={artifact.title} className="w-full max-h-[430px] object-contain rounded-xl border-2 border-retro-maroon/10 bg-retro-cream" />
                    </div>
                    <p className="px-4 pb-4 text-xs leading-relaxed text-retro-maroon-light/85">{artifact.caption}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="iterations" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto border-b-3 border-retro-maroon">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <SectionLabel>Key iterations</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tight leading-tight">What changed after testing and digital refinement.</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {iterationCards.map((iteration) => (
              <article key={iteration.title} className="bg-retro-cream border-wood shadow-wood rounded-2xl overflow-hidden">
                <div className="p-3 bg-retro-beige/30 border-b-3 border-retro-maroon">
                  <img src={iteration.image} alt={iteration.title} className="rounded-xl border-2 border-retro-maroon/10" />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-serif text-xl font-black">{iteration.title}</h3>
                  <p className="text-xs leading-relaxed text-retro-maroon-light/85">{iteration.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="video" className="px-4 md:px-8 py-16 md:py-24 bg-gradient-to-br from-retro-maroon to-retro-maroon-light text-retro-cream border-b-3 border-retro-maroon">
          <div className="max-w-5xl mx-auto space-y-8 text-center">
            <span className="text-[10px] font-mono font-bold tracking-widest text-retro-gold bg-retro-gold/10 px-3 py-1 border border-retro-gold/20 rounded-full uppercase">
              Concept Video
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-black">The Idea Played Out in Cinema</h2>
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border-4 border-retro-cream/25 shadow-wood-lg bg-retro-maroon">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={conceptVideo}
                title="QueueMate concept video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section id="team" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto border-b-3 border-retro-maroon">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <SectionLabel>Team</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tight leading-tight">Something Random</h2>
              <p className="text-sm leading-relaxed text-retro-maroon-light/85">
                QueueMate was created for CSE 440 by a team interested in games, social connection, and better ways to keep good teammate experiences from disappearing.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <div key={member} className="bg-retro-cream border-wood shadow-wood rounded-2xl p-5 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-retro-orange/10 border-wood-thin text-retro-orange flex items-center justify-center">
                    <Star size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-lg">{member}</h3>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-retro-maroon-light/55">CSE 440 • Section A</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-retro-maroon text-retro-cream px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif font-black text-2xl">QueueMate</h2>
            <p className="text-xs text-retro-cream/70 mt-1">Find compatible teammates. Keep the good ones. Queue again.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-[10px] font-sans font-black uppercase tracking-widest">
            <a href={figmaLink} target="_blank" rel="noreferrer" className="px-4 py-2 bg-retro-cream text-retro-maroon border-2 border-retro-cream rounded-lg hover:bg-retro-gold transition-colors">Figma Prototype</a>
            <a href={githubLink} target="_blank" rel="noreferrer" className="px-4 py-2 border-2 border-retro-cream/50 rounded-lg hover:bg-retro-cream hover:text-retro-maroon transition-colors">GitHub Repo</a>
            <a href="https://www.youtube.com/watch?v=t8aAmrrVfxc" target="_blank" rel="noreferrer" className="px-4 py-2 border-2 border-retro-cream/50 rounded-lg hover:bg-retro-cream hover:text-retro-maroon transition-colors">Concept Video</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
