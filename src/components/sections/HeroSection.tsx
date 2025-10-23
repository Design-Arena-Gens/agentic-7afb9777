"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const HeroBoard = dynamic(() => import("@/components/three/HeroBoardScene").then((mod) => mod.HeroBoardScene), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-3xl border border-white/10 bg-black/20 text-white/50 md:h-[540px]">
      Initializing neural board...
    </div>
  )
});

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden pt-28">
      <div className="absolute inset-0">
        <div className="aurora" />
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:px-10"
      >
        <motion.div variants={fadeInUp} className="max-w-3xl space-y-6">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/70 backdrop-blur-md"
            whileHover={{ scale: 1.02 }}
          >
            <span className="h-2 w-2 rounded-full bg-accent-blue shadow-[0_0_20px_rgba(78,212,255,0.8)]" />
            Chess Trainer AI
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-balance text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          >
            Master Chess Openings &amp; Tactics — Smarter, Faster, Forever.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl text-lg text-white/80 md:text-xl"
          >
            AI-powered spaced repetition fused with cinematic 3D visualizations that help you remember every move and crush opponents with neural precision.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="#cta"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-accent-blue/60 bg-gradient-to-r from-accent-blue/80 via-accent-purple/70 to-accent-pink/70 px-8 py-3 text-base font-semibold text-white shadow-[0_25px_60px_rgba(78,212,255,0.5)] transition focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
            >
              <span className="relative z-10">Start Training for Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition group-hover:opacity-100" />
            </Link>
            <Link
              href="#import"
              className="relative inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-base font-semibold text-white/80 backdrop-blur-xl transition hover:border-white/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Import PGN
            </Link>
          </motion.div>
        </motion.div>
        <motion.div variants={fadeInUp} className="relative">
          <HeroBoard />
        </motion.div>
      </motion.div>
      <div className="parallax-gradient" aria-hidden="true" />
    </section>
  );
}
