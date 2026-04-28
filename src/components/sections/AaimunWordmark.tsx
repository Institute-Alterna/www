"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface AaimunWordmarkProps {
  className?: string;
  delay?: number;
}

export default function AaimunWordmark({
  className,
  delay = 0.1,
}: AaimunWordmarkProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
      animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
      transition={
        reduced
          ? { duration: 0.2 }
          : { duration: 1.1, ease: EASE, delay }
      }
      className={cn("inline-block", className)}
    >
      <Image
        src="/mun/aaimun-wordmark.svg"
        alt="AAIMUN"
        width={126}
        height={35}
        className="h-full w-auto"
        priority
      />
    </motion.div>
  );
}
