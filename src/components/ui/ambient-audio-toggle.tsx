"use client";

import { useEffect, useRef } from "react";
import { useUIStore } from "@/store/ui-store";
import { motion } from "framer-motion";
import { Waves, Volume2 } from "lucide-react";

type AmbientNodes = {
  context: AudioContext;
  gain: GainNode;
  oscillators: OscillatorNode[];
};

export function AmbientAudioToggle() {
  const ambientEnabled = useUIStore((state) => state.ambientEnabled);
  const toggleAmbient = useUIStore((state) => state.toggleAmbient);
  const audioNodes = useRef<AmbientNodes | null>(null);

  useEffect(() => {
    if (!ambientEnabled) {
      audioNodes.current?.gain.gain.exponentialRampToValueAtTime(0.0001, (audioNodes.current?.context.currentTime ?? 0) + 1);
      setTimeout(() => {
        audioNodes.current?.oscillators.forEach((osc) => osc.stop());
        audioNodes.current?.context.close();
        audioNodes.current = null;
      }, 1200);
      return;
    }

    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.connect(context.destination);

    const createOscillator = (frequency: number, detune: number) => {
      const osc = context.createOscillator();
      osc.type = "sine";
      osc.frequency.value = frequency;
      osc.detune.value = detune;
      const oscGain = context.createGain();
      oscGain.gain.value = 0.15;
      osc.connect(oscGain).connect(gain);
      osc.start();
      return osc;
    };

    const oscillators = [
      createOscillator(110, -5),
      createOscillator(220, 3),
      createOscillator(440, 0)
    ];

    gain.gain.exponentialRampToValueAtTime(0.3, context.currentTime + 1.5);

    audioNodes.current = { context, gain, oscillators };

    return () => {
      oscillators.forEach((osc) => osc.stop());
      context.close();
      audioNodes.current = null;
    };
  }, [ambientEnabled]);

  return (
    <motion.button
      type="button"
      className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-white shadow-neon backdrop-blur-md transition"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => toggleAmbient()}
      aria-pressed={ambientEnabled}
      aria-label="Toggle ambient audio"
    >
      <motion.span
        key={ambientEnabled ? "waves" : "mute"}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
      >
        {ambientEnabled ? <Waves className="h-5 w-5 text-accent-blue" /> : <Volume2 className="h-5 w-5 text-accent-purple" />}
      </motion.span>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent-blue/40 via-accent-purple/30 to-accent-pink/40 opacity-0 blur-xl transition group-hover:opacity-100" />
    </motion.button>
  );
}
