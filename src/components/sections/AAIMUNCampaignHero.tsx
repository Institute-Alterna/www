"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AaimunWordmark from "@/components/sections/AaimunWordmark";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;
const MYMUN_PLACEHOLDER_URL = "https://duckduckgo.com";

type StatusLine = { text: string; censored?: boolean };
const statusLines: StatusLine[] = [
  { text: "ALL-ONLINE CONFERENCE" },
  { text: "UNx SEASON 2 OPENING" },
  { text: "LATE JULY 2026" },
  { text: "UNx POINTS SYSTEM", censored: true },
  { text: "FULL SCHEDULE FORTHCOMING" },
];

function StatusStack() {
  return (
    <ol
      className="max-w-xs font-mono text-[10px] uppercase leading-7 tracking-[0.22em] text-grey-700"
      aria-label="Conference status"
    >
      {statusLines.map((line, i) => (
        <li key={line.text} className="flex items-baseline gap-3">
          <span className="shrink-0 text-grey-400" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          {line.censored ? (
            <span
              className="inline-block select-none rounded-sm bg-black/85 px-1 text-transparent"
              aria-label="information redacted"
            >
              {line.text}
            </span>
          ) : (
            <span>{line.text}</span>
          )}
        </li>
      ))}
    </ol>
  );
}

interface AAIMUNCampaignHeroProps {
  variant?: "home" | "page";
}

export default function AAIMUNCampaignHero({
  variant = "home",
}: AAIMUNCampaignHeroProps) {
  const isHome = variant === "home";
  const reduced = useReducedMotion();

  return (
    <section
      className="grain-overlay relative isolate min-h-[calc(100svh-4rem)] bg-white text-black"
      aria-label="AAIMUN 2026 campaign"
    >
      <Container className="flex min-h-[inherit] flex-col justify-between py-10 md:py-14 lg:py-20">

        {/* Logo Lockup */}
        <div className="flex items-center gap-5 pt-8 md:pt-12">
          <AaimunWordmark className="h-10 md:h-12" delay={0.1} />
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.88, y: 8 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            transition={reduced ? { duration: 0.2 } : { duration: 0.7, ease: EASE, delay: 0.9 }}
          >
            <Image
              src="/mun/fsa-badge.webp"
              alt="Futures Summit Alliance"
              width={48}
              height={48}
              className="h-10 w-10 md:h-12 md:w-12"
            />
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid items-end gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:py-20">
          <div>
            <motion.h1
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reduced ? { duration: 0.2 } : { duration: 0.8, ease: EASE, delay: 1.05 }}
              className="max-w-3xl font-heading text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl"
            >
              The world needs you again, delegate
            </motion.h1>

            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reduced ? { duration: 0.2 } : { duration: 0.7, ease: EASE, delay: 1.25 }}
              className="mt-7 max-w-2xl font-body text-lg leading-8 text-grey-600 md:text-xl md:leading-9"
            >
              Registration for AAIMUN 2026 opens in late July. Join an online
              conference built for delegates ready to debate artificial
              intelligence, global policy, and the systems shaping what comes
              next.
            </motion.p>

            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reduced ? { duration: 0.2 } : { duration: 0.6, ease: EASE, delay: 1.4 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                href={MYMUN_PLACEHOLDER_URL}
                external
                size="lg"
                className="!rounded-none !bg-aaimun px-8 !text-white hover:!bg-aaimun-deep"
              >
                Register on MyMUN
              </Button>
              {isHome ? (
                <Button
                  href="/mun"
                  variant="ghost"
                  size="lg"
                  className="px-0 text-grey-600 hover:text-aaimun"
                >
                  Learn more →
                </Button>
              ) : (
                <Link
                  href="#conference"
                  className="inline-flex min-h-12 items-center font-body text-base font-medium text-grey-500 transition-colors hover:text-aaimun"
                >
                  Explore the announcement →
                </Link>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 16 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={reduced ? { duration: 0.2 } : { duration: 0.7, ease: EASE, delay: 1.5 }}
            className="flex justify-start lg:justify-end"
          >
            <StatusStack />
          </motion.div>
        </div>

        {/* Footer Meta Strip */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1 }}
          transition={reduced ? { duration: 0.2 } : { duration: 0.7, ease: EASE, delay: 1.7 }}
          className="grid gap-3 border-t border-grey-200 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-grey-400 sm:grid-cols-3"
        >
          <p>Open to All</p>
          <p>Late July 2026</p>
          <p>
            Institute Alterna
            {/* separator: slash on wide, line-break on narrow */}
            <span className="hidden sm:inline"> / </span>
            <br className="sm:hidden" />
            Futures Summit Alliance
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

