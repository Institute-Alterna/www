"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface SectionDividerProps {
  index: string;
  label: string;
}

export default function SectionDivider({ index, label }: SectionDividerProps) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-aaimun">
        {index} / {label}
      </p>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ transformOrigin: "left" }}
        className="h-px w-full bg-aaimun/40"
      />
    </div>
  );
}
