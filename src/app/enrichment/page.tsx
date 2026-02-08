"use client";

import { motion } from "framer-motion";

const lines = [
  "The answers you seek",
  "are not found in the places you expect.",
  "",
  "They live in the quiet spaces",
  "between what is known",
  "and what is yet to be discovered.",
  "",
  "Keep looking.",
];

export default function EnrichmentPage() {
  return (
    <div className="-mt-16 flex min-h-screen items-center justify-center bg-[#0d0d0d]">
      <div className="max-w-xl px-6 text-center">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: line === "" ? 0 : 1 }}
            transition={{
              duration: 1.2,
              delay: i * 0.6,
              ease: "easeOut",
            }}
            className={`font-heading text-lg leading-relaxed tracking-wide ${
              line === ""
                ? "h-6"
                : i === lines.length - 1
                  ? "mt-4 text-accent italic"
                  : "text-grey-400"
            }`}
          >
            {line || "\u00A0"}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
