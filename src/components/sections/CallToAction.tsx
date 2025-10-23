"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function CallToAction() {
  return (
    <section id="cta" className="relative py-28">
      <div className="absolute inset-0">
        <div className="aurora opacity-30" />
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 mx-auto w-full max-w-4xl overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.02] to-transparent px-6 py-16 text-center shadow-[0_45px_140px_rgba(15,23,42,0.7)] backdrop-blur-3xl sm:px-12"
      >
        <motion.h2 variants={fadeInUp} className="text-balance text-3xl font-semibold text-white md:text-5xl">
          Train smarter. Master faster. Play fearlessly.
        </motion.h2>
        <motion.p variants={fadeInUp} className="mx-auto mt-6 max-w-2xl text-base text-white/70 md:text-lg">
          Hyper-personalized chess training that fuses AI, spaced repetition, and cinematic 3D guidance. No paywall, no friction — just relentless improvement.
        </motion.p>
        <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="#hero"
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
        <motion.p variants={fadeInUp} className="mt-6 text-sm uppercase tracking-[0.35em] text-white/50">
          No signup required · Works offline · 100% free forever
        </motion.p>
      </motion.div>
    </section>
  );
}
