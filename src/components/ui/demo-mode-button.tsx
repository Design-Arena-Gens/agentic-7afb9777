"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/ui-store";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function DemoModeButton() {
  const demoMode = useUIStore((state) => state.demoMode);
  const toggleDemoMode = useUIStore((state) => state.toggleDemoMode);

  useEffect(() => {
    if (!demoMode) return;
    const timeout = setTimeout(() => {
      useUIStore.getState().setDemoMode(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [demoMode]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => toggleDemoMode()}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-neon backdrop-blur-md transition hover:bg-white/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="h-4 w-4 text-accent-blue" />
        Demo Mode
      </motion.button>

      <AnimatePresence>
        {demoMode ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="pointer-events-none fixed bottom-28 right-6 z-40 max-w-xs rounded-2xl border border-white/10 bg-black/70 p-4 text-sm text-white shadow-lg backdrop-blur-xl"
          >
            <p className="font-semibold text-accent-blue">Demo mode activated</p>
            <p className="mt-2 text-white/80">
              Loading sample course “Neural Najdorf 2025” with spaced repetition cards, opponent prep, and tactics queue.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
