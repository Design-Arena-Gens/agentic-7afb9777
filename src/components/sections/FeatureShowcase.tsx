"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { fadeInUp, staggerContainer, glowCard } from "@/lib/motion";

type Feature = {
  id: string;
  title: string;
  description: string;
  scene: ComponentType;
  label: string;
};

const featureScenes = {
  spaced: dynamic(() => import("@/components/three/FeatureScenes").then((mod) => mod.SpacedRepetitionScene), { ssr: false }),
  library: dynamic(() => import("@/components/three/FeatureScenes").then((mod) => mod.InteractiveLibraryScene), { ssr: false }),
  trainer: dynamic(() => import("@/components/three/FeatureScenes").then((mod) => mod.MoveTrainerScene), { ssr: false }),
  opponent: dynamic(() => import("@/components/three/FeatureScenes").then((mod) => mod.OpponentPrepScene), { ssr: false }),
  tactics: dynamic(() => import("@/components/three/FeatureScenes").then((mod) => mod.TacticsGeneratorScene), { ssr: false }),
  progress: dynamic(() => import("@/components/three/FeatureScenes").then((mod) => mod.ProgressDashboardScene), { ssr: false }),
  offline: dynamic(() => import("@/components/three/FeatureScenes").then((mod) => mod.OfflineModeScene), { ssr: false })
};

const features: Feature[] = [
  {
    id: "spaced-repetition",
    title: "Spaced Repetition Engine",
    label: "SM-2 MEMORY",
    description: "Neural spaced repetition calibrates SM-2 intervals per line. Each neuron pulse schedules rehearsals right before you forget.",
    scene: featureScenes.spaced
  },
  {
    id: "interactive-library",
    title: "Interactive Course Library",
    label: "COURSE CONSTELLATION",
    description: "Glowing holographic courses track streaks, review due dates, and instantly reveal what’s next in your queue.",
    scene: featureScenes.library
  },
  {
    id: "move-trainer",
    title: "Move Trainer",
    label: "OPENING FLOWS",
    description: "Watch openings animate in cinematic paths, switch to learning mode, then exam under pressure with AI commentary.",
    scene: featureScenes.trainer
  },
  {
    id: "opponent-prep",
    title: "AI Opponent Prep Lab",
    label: "NEURAL SCOUT",
    description: "Fetch opponent databases, map their openings, surface weaknesses, and auto-generate prep trees in seconds.",
    scene: featureScenes.opponent
  },
  {
    id: "tactics-generator",
    title: "Personalized Tactics Generator",
    label: "BLUNDER REWIND",
    description: "Your blunders rewind, highlight red-to-blue corrections, and become custom puzzles calibrated to your blind spots.",
    scene: featureScenes.tactics
  },
  {
    id: "progress-dashboard",
    title: "Progress Dashboard & Achievements",
    label: "NEON ANALYTICS",
    description: "Track accuracy, streaks, moves learned, and collectible badges. Graphs redraw in real-time as you train.",
    scene: featureScenes.progress
  },
  {
    id: "offline-mode",
    title: "Offline Guest Mode",
    label: "DAY ZERO",
    description: "Launch instantly with no account. Local-first encrypted storage keeps you training even airplane mode on.",
    scene: featureScenes.offline
  }
];

export function FeatureShowcase() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0">
        <div className="aurora opacity-40" />
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 md:px-10"
      >
        <motion.div variants={fadeInUp} className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.5em] text-white/60">
            <span className="h-px w-10 bg-gradient-to-r from-transparent via-white/40 to-white/80" />
            Feature Modules
          </span>
          <h2 className="text-3xl font-semibold text-white md:text-5xl">
            Every feature visualized as an interactive 3D scene.
          </h2>
          <p className="text-lg text-white/70">
            Scroll through neural chess labs engineered to amplify your memory, intuition, and opponent prep. Each sequence pulses with Framer Motion transitions and holographic glassmorphism.
          </p>
        </motion.div>
        <div className="grid gap-12">
          {features.map((feature, index) => {
            const Scene = feature.scene;
            return (
              <motion.article
                key={feature.id}
                variants={glowCard}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_45px_140px_rgba(15,23,42,0.65)] backdrop-blur-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-pink/10 opacity-0 transition group-hover:opacity-100" />
                <div className="relative grid gap-10 p-8 md:grid-cols-2 md:p-12">
                  <div className="space-y-6">
                    <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-white/70 backdrop-blur-xl">
                      {feature.label}
                    </p>
                    <h3 className="text-2xl font-semibold text-white md:text-3xl">{feature.title}</h3>
                    <p className="text-base leading-relaxed text-white/75">{feature.description}</p>
                    {feature.id === "offline-mode" ? (
                      <p className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-accent-blue animate-glitch">
                        Works Offline
                      </p>
                    ) : null}
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70 shadow-inner">
                      <p className="font-medium text-accent-blue">Scroll to explore</p>
                      <p className="mt-1 text-white/60">Scenes fade-in with Framer Motion and respond to hover to reveal neural depth and pulse states.</p>
                    </div>
                  </div>
                  <div className="relative h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_35px_110px_rgba(78,212,255,0.35)]">
                    <Scene />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
