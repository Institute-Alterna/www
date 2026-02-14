"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedDetailsProps {
  summary: string;
  children: React.ReactNode;
}

export default function AnimatedDetails({
  summary,
  children,
}: AnimatedDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 rounded-xl border border-grey-200 bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between p-6 font-heading text-base font-semibold"
      >
        {summary}
        <motion.svg
          className="h-5 w-5 shrink-0 text-grey-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.25, ease: "easeInOut" },
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-grey-200">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
