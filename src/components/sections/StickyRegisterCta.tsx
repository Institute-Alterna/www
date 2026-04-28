"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const MYMUN_PLACEHOLDER_URL = "https://duckduckgo.com";

export default function StickyRegisterCta() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50"
        >
          <a
            href={MYMUN_PLACEHOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Register for AAIMUN 2026 on MyMUN"
            className="flex items-center gap-2 bg-aaimun px-5 py-3 font-body text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,151,178,0.3)] transition-colors hover:bg-aaimun-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aaimun focus-visible:ring-offset-2"
          >
            Register on MyMUN
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
