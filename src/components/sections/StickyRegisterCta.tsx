"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MYMUN_URL } from "@/lib/data/mun";

export default function StickyRegisterCta() {
  const [heroPassed, setHeroPassed] = useState(false);
  const [registerReached, setRegisterReached] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("aaimun-hero");
    const register = document.getElementById("register");
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const heroObs = new IntersectionObserver(
        ([entry]) => setHeroPassed(!entry.isIntersecting),
        { threshold: 0 }
      );
      heroObs.observe(hero);
      observers.push(heroObs);
    }

    if (register) {
      const registerObs = new IntersectionObserver(
        ([entry]) =>
          setRegisterReached(
            entry.isIntersecting || entry.boundingClientRect.top < 0
          ),
        { threshold: 0 }
      );
      registerObs.observe(register);
      observers.push(registerObs);
    }

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const visible = heroPassed && !registerReached;

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
            href={MYMUN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Register for AAIMUN 2026 on MyMUN"
            className="flex items-center gap-2 bg-aaimun px-5 py-3 font-body text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,151,178,0.3)] transition-colors hover:bg-aaimun-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aaimun focus-visible:ring-offset-2"
          >
            Register on MyMUN
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
