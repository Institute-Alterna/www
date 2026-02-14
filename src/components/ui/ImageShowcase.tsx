"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ShowcaseSlide } from "@/lib/types";

interface ImageShowcaseProps {
  slides: ShowcaseSlide[];
  interval?: number;
  className?: string;
}

const FADE_DURATION = 0.8;
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export default function ImageShowcase({
  slides,
  interval = 4000,
  className,
}: ImageShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1 || activeIndex >= slides.length - 1) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
    }, interval);

    return () => clearTimeout(timer);
  }, [activeIndex, slides.length, interval]);

  if (slides.length === 0) return null;

  return (
    <div className={cn("w-full", className)}>
      {/* Fixed-height wrapper prevents layout collapse during crossfade */}
      <div className="relative aspect-[16/9] w-full">
        <AnimatePresence>
          {slides.map(
            (slide, index) =>
              index === activeIndex && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: FADE_DURATION, ease: EASE }}
                  className="absolute inset-0 overflow-hidden rounded-xl bg-grey-100"
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Text synced with image via its own AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION * 0.5, ease: EASE }}
        >
          <p className="mt-4 font-heading text-lg font-semibold">
            {slides[activeIndex].title}
          </p>
          <p className="mt-1 font-body text-sm text-grey-600">
            {slides[activeIndex].subtitle}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
