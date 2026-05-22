"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "conference", label: "01" },
  { id: "brief", label: "02" },
  { id: "committees", label: "03" },
  { id: "partnership", label: "04" },
  { id: "register", label: "05" },
] as const;

export default function MunProgressRail() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35, rootMargin: "-80px 0px -35% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="AAIMUN page sections"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label={`Go to section ${label}`}
          aria-current={active === id ? "true" : undefined}
          className="group flex flex-col items-center gap-1.5 p-1"
        >
          <motion.div
            animate={{
              backgroundColor: active === id ? "#0097b2" : "#cccccc",
              scale: active === id ? 1.3 : 1,
            }}
            transition={{ duration: 0.25 }}
            className="h-1.5 w-1.5 rounded-full"
          />
        </button>
      ))}
    </nav>
  );
}
