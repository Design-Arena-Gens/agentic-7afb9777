"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme ?? theme;

  if (!mounted) {
    return null;
  }

  const isDark = currentTheme === "dark";

  return (
    <motion.button
      type="button"
      className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-white shadow-neon backdrop-blur-md transition"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 30, opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="text-accent-blue"
      >
        {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-amber-400" />}
      </motion.span>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent-blue/30 via-accent-purple/20 to-accent-pink/30 opacity-0 blur-xl transition group-hover:opacity-100" />
    </motion.button>
  );
}
