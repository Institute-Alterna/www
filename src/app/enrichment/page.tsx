"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import AsciiCanvas from "@/components/sections/AsciiCanvas";

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

interface WordEntry {
  text: string;
  isAccent: boolean;
  visibleIndex: number;
}

// Precompute word data at module level — avoids mutable counter during render
const { processedWords, totalVisible } = (() => {
  const words: Array<WordEntry | null> = [];
  const lastLineIdx = lines.length - 1;
  let idx = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") {
      words.push(null);
      continue;
    }
    const lineWords = line.split(" ");
    for (const word of lineWords) {
      words.push({ text: word, isAccent: i === lastLineIdx, visibleIndex: idx++ });
    }
    if (i < lines.length - 1 && lines[i + 1] !== "") {
      words.push(null);
    }
  }

  return { processedWords: words, totalVisible: idx };
})();

function ScrollWord({
  word,
  progress,
}: {
  word: WordEntry;
  progress: MotionValue<number>;
}) {
  const start = (word.visibleIndex / totalVisible) * 0.8;
  const end = start + 0.15;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [16, 0]);

  return (
    <motion.span
      style={{ opacity, y, display: "inline-block" }}
      className={word.isAccent ? "text-accent italic" : "text-grey-400"}
    >
      {word.text}
    </motion.span>
  );
}

export default function EnrichmentPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);

  // Disable horizontal overflow scrolling on this page
  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "";
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: textSectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="-mt-16 bg-black">
      {/* Scroll-driven topography canvas — sticky inside 300vh container */}
      <div ref={scrollContainerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen">
          <AsciiCanvas
            theme="topography"
            colorMode="dark"
            scrollTarget={scrollContainerRef}
          />
        </div>
      </div>

      {/* Scroll-driven text section — word-by-word reversible reveal */}
      <div ref={textSectionRef} className="relative h-[250vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <div className="mx-auto max-w-xl px-6 text-center font-heading text-lg leading-relaxed tracking-wide">
            {processedWords.map((entry, i) => {
              if (entry === null) {
                return <br key={`br-${i}`} />;
              }

              return (
                <span key={`${entry.text}-${i}`}>
                  <ScrollWord word={entry} progress={scrollYProgress} />
                  {" "}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
