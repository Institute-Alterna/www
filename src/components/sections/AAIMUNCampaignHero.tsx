"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AsciiCanvas from "@/components/sections/AsciiCanvas";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const MYMUN_PLACEHOLDER_URL = "https://duckduckgo.com";

const statusLines = [
  "FRAMEWORK READY",
  "ONLINE COMMITTEES PRIMED",
  "UNX SEASON 2 OPENING CONFERENCE",
  "FINAL DATE TO BE CONFIRMED",
];

function LogoLockup() {
  return (
    <div className="flex flex-wrap items-center gap-4" aria-label="AAIMUN and Futures Summit Alliance">
      <div className="flex h-12 min-w-44 items-center justify-center bg-[#0B66D8] px-5">
        <span className="font-heading text-lg font-bold tracking-[0.22em] text-white">
          AAIMUN
        </span>
      </div>
      <div className="h-12 w-12 shrink-0 bg-[#F15A29]" aria-hidden="true" />
    </div>
  );
}

function StatusStack({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "font-mono text-[10px] uppercase leading-5 tracking-[0.2em] text-white/45",
        compact ? "max-w-xs" : "max-w-sm"
      )}
      aria-label="Conference status"
    >
      {statusLines.map((line, index) => (
        <p key={line}>
          <span className="text-white/25">
            {String(index + 1).padStart(2, "0")}
          </span>{" "}
          {line}
        </p>
      ))}
    </div>
  );
}

function HeroCtas({ showLearnMore }: { showLearnMore: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button
        href={MYMUN_PLACEHOLDER_URL}
        external
        size="lg"
        className="!rounded-none !bg-[#F15A29] px-8 !text-black hover:!bg-white"
      >
        Register on MyMUN
      </Button>
      {showLearnMore ? (
        <Button
          href="/mun"
          variant="ghost"
          size="lg"
          className="rounded-none px-0 text-white hover:text-[#7fd7df]"
        >
          Learn more
        </Button>
      ) : (
        <Link
          href="#conference"
          className="inline-flex min-h-12 items-center font-body text-base font-medium text-white/75 transition-colors hover:text-[#7fd7df]"
        >
          Explore the announcement
        </Link>
      )}
    </div>
  );
}

interface AAIMUNCampaignHeroProps {
  variant?: "home" | "page";
}

export default function AAIMUNCampaignHero({
  variant = "home",
}: AAIMUNCampaignHeroProps) {
  const isHome = variant === "home";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-black text-white",
        isHome
          ? "min-h-[calc(100svh-8rem)]"
          : "min-h-[calc(100svh-4rem)]"
      )}
    >
      <div className="absolute inset-0 opacity-35">
        <AsciiCanvas theme="parliament" colorMode="dark" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(0,124,145,0.28),transparent_30%),radial-gradient(circle_at_78%_76%,rgba(11,60,93,0.45),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <Container
        className={cn(
          "relative z-10 flex min-h-[inherit] flex-col justify-between",
          isHome ? "py-8 md:py-10" : "py-10 md:py-14"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className={isHome ? "pt-2 md:pt-4" : "pt-8 md:pt-12"}
        >
          <LogoLockup />
        </motion.div>

        <div
          className={cn(
            "grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_25rem]",
            isHome ? "py-10 lg:py-12" : "py-14 lg:py-20"
          )}
        >
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              className="font-mono text-xs uppercase tracking-[0.24em] text-[#7fd7df]"
            >
              AAIMUN 2026, first UNx Conference of Season 2
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.16 }}
              className="mt-7 max-w-3xl font-heading text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl"
            >
              The world needs you again, delegate
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.26 }}
              className="mt-7 max-w-2xl font-body text-lg leading-8 text-white/74 md:text-xl md:leading-9"
            >
              Register for AAIMUN 2026 in late July and join an online
              conference built for delegates ready to debate artificial
              intelligence, global policy, and the systems shaping what comes
              next.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.36 }}
              className="mt-10"
            >
              <HeroCtas showLearnMore={isHome} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.42 }}
            className="flex justify-start lg:justify-end"
          >
            <StatusStack compact={!isHome} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
          className="grid gap-4 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 sm:grid-cols-3"
        >
          <p>Online only</p>
          <p>Late July 2026</p>
          <p>Futures Summit Alliance</p>
        </motion.div>
      </Container>
    </section>
  );
}
