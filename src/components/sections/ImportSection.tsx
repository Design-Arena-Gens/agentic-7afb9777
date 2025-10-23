"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { Upload, Sparkles } from "lucide-react";

export function ImportSection() {
  return (
    <section id="import" className="relative py-24">
      <div className="absolute inset-0">
        <div className="aurora opacity-25" />
      </div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-12 rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-[0_45px_140px_rgba(15,23,42,0.65)] backdrop-blur-3xl md:p-12"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <p className="inline-flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
            <Sparkles className="h-4 w-4 text-accent-blue" />
            Instantly ingest your prep
          </p>
          <h3 className="text-3xl font-semibold text-white md:text-4xl">Import PGNs. Generate training plans instantly.</h3>
          <p className="text-base text-white/70">
            Drop your repertoire PGNs or let AI scrape from Lichess and Chess.com. The engine tags critical moments, builds recall cards, and queues tactics in under 10 seconds.
          </p>
        </div>
        <div className="group relative mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/20 bg-white/10 px-10 py-12 text-white/70 shadow-neon transition hover:border-white/40">
          <Upload className="h-10 w-10 text-accent-blue" />
          <p className="text-sm font-semibold uppercase tracking-[0.35em]">Drag &amp; Drop PGN</p>
          <p className="max-w-sm text-sm text-white/60">
            Supports multi-file import. PGNs are parsed client-side for zero data leakage.
          </p>
          <button className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/70 transition hover:bg-white/20">
            Browse files
          </button>
        </div>
      </motion.div>
    </section>
  );
}
