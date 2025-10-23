"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

const stack = [
  "React",
  "TypeScript",
  "Puter.js",
  "Zustand",
  "TailwindCSS",
  "Stockfish",
  "Framer Motion",
  "Three.js"
];

export function TechnologyStrip() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0">
        <div className="aurora opacity-20" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 text-center md:px-10">
        <motion.h3
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-lg font-semibold uppercase tracking-[0.4em] text-white/70"
        >
          Powered by modern web tech — secure, serverless, lightning fast
        </motion.h3>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
          className="relative h-[320px] w-[320px] max-w-full"
        >
          <div className="absolute inset-0 rounded-full border border-white/20" />
          <div className="absolute inset-[18%] rounded-full border border-white/10" />
          {stack.map((item, index) => {
            const angle = (index / stack.length) * Math.PI * 2;
            const radius = 140;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <motion.div
                key={item}
                className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-xs font-semibold uppercase tracking-wide text-white shadow-neon backdrop-blur-xl"
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 0 0 rgba(78,212,255,0.0)",
                    "0 0 30px rgba(78,212,255,0.35)",
                    "0 0 0 rgba(78,212,255,0.0)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 6, delay: index * 0.4, ease: "easeInOut" }}
              >
                {item}
              </motion.div>
            );
          })}
          <motion.div
            className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent-blue/40 bg-gradient-to-br from-accent-blue/50 via-accent-purple/50 to-accent-pink/50 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-[0_35px_120px_rgba(78,212,255,0.45)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          >
            Quantum
            <span className="text-[0.6rem] text-white/70">CORE</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
