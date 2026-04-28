"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AaimunWordmark from "@/components/sections/AaimunWordmark";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;
const MYMUN_URL = "https://duckduckgo.com";

type StatusLine =
  | {
      id: string;
      text: string;
      redactedText?: never;
      redactionLabel?: never;
    }
  | {
      id: string;
      text?: never;
      redactedText: string;
      redactionLabel: string;
    };

// Add or reorder hero status points here.
const statusLines: StatusLine[] = [
  { id: "format", text: "ALL-ONLINE CONFERENCE" },
  { id: "season", text: "UNx SEASON 2 OPENING" },
  { id: "date", text: "LATE JULY 2026" },
  {
    id: "platform",
    redactedText: "EMBASSY PLATFORM",
    redactionLabel: "unreleased feature information redacted",
  },
  {
    id: "features",
    redactedText: "UNRELEASED FEATURES",
    redactionLabel: "unreleased feature information redacted",
  },
  { id: "schedule", text: "FULL SCHEDULE FORTHCOMING" },
];

function isRedactedStatusLine(
  line: StatusLine,
): line is Extract<StatusLine, { redactedText: string }> {
  return line.redactedText !== undefined;
}

function RedactedStatusText({ label, text }: { label: string; text: string }) {
  return (
    <span
      className="inline-block h-[0.85em] select-none bg-black align-middle"
      style={{ width: `${text.length}ch` }}
      aria-label={label}
    />
  );
}

function StatusStack() {
  return (
    <ol
      className="max-w-xs font-mono text-[10px] uppercase leading-7 tracking-[0.22em] text-grey-800"
      aria-label="Conference status"
    >
      {statusLines.map((line, i) => (
        <li
          key={line.id}
          className="flex items-center gap-3"
        >
          <span className="shrink-0 text-grey-600" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          {isRedactedStatusLine(line) ? (
            <RedactedStatusText
              label={line.redactionLabel}
              text={line.redactedText}
            />
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
      id="aaimun-hero"
      className="grain-overlay relative isolate min-h-[calc(100svh-4rem)] bg-white text-black"
      aria-label="AAIMUN 2026 campaign"
    >
      <Container className="flex min-h-[inherit] flex-col justify-between py-10 md:py-14 lg:py-20">
        {/* Logo Lockup */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={
            reduced
              ? { duration: 0.2 }
              : { duration: 0.8, ease: EASE, delay: 1.05 }
          }
          className="flex items-center gap-3 pt-8 md:gap-4 md:pt-12"
        >
          <AaimunWordmark className="h-10 md:h-12" animate={false} />
          <span className="h-9 w-px bg-black md:h-10" aria-hidden="true" />
          <div className="inline-block">
            <Image
              src="/mun/fsa-badge.webp"
              alt="Futures Summit Alliance"
              width={48}
              height={48}
              className="h-10 w-10 md:h-12 md:w-12"
            />
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid items-end gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:py-20">
          <div>
            <motion.h1
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={
                reduced
                  ? { duration: 0.2 }
                  : { duration: 0.8, ease: EASE, delay: 1.05 }
              }
              className="max-w-3xl font-heading text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl"
            >
              The world needs you again, delegate
            </motion.h1>

            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={
                reduced
                  ? { duration: 0.2 }
                  : { duration: 0.7, ease: EASE, delay: 1.25 }
              }
              className="mt-7 max-w-2xl font-body text-lg leading-8 text-grey-600 md:text-xl md:leading-9"
            >
              Join AAIMUN 2026 for free this summer and bring your voice to the
              debate on artificial intelligence, global policy, and the systems
              shaping what comes next.
            </motion.p>

            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={
                reduced
                  ? { duration: 0.2 }
                  : { duration: 0.6, ease: EASE, delay: 1.4 }
              }
              className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6"
            >
              <Button
                href={MYMUN_URL}
                external
                showExternalIcon={false}
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
                  className="px-0 text-grey-700 hover:text-aaimun sm:ml-3"
                >
                  Learn more
                </Button>
              ) : (
                <Link
                  href="#conference"
                  className="inline-flex min-h-12 items-center font-body text-base font-medium text-grey-700 transition-colors hover:text-aaimun sm:ml-3"
                >
                  Explore the announcement
                </Link>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 16 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={
              reduced
                ? { duration: 0.2 }
                : { duration: 0.7, ease: EASE, delay: 1.5 }
            }
            className="flex justify-start lg:justify-end"
          >
            <StatusStack />
          </motion.div>
        </div>

        {/* Footer Meta Strip */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1 }}
          transition={
            reduced
              ? { duration: 0.2 }
              : { duration: 0.7, ease: EASE, delay: 1.7 }
          }
          className="grid gap-3 border-t border-grey-200 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-grey-700 sm:grid-cols-3"
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
