"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import AsciiCanvas from "@/components/sections/AsciiCanvas";
import { cn } from "@/lib/utils";
import type { AsciiTheme } from "@/lib/ascii/types";

interface HeroCTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  scroll?: boolean;
  className?: string;
}

interface HeroProps {
  headline: string;
  subheadline: string;
  ctas?: HeroCTA[];
  variant?: "full" | "compact" | "ascii-background" | "ascii-below" | "ascii-dark";
  asciiTheme?: AsciiTheme;
  className?: string;
}

function HeroText({
  headline,
  subheadline,
  ctas,
  dark = false,
  align = "center",
}: {
  headline: string;
  subheadline: string;
  ctas: HeroCTA[];
  dark?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-xl"
      )}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "font-heading text-4xl font-bold tracking-tight leading-tight md:text-5xl lg:text-6xl",
          dark && "text-white"
        )}
      >
        {headline}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className={cn(
          "mt-2 font-body text-lg leading-relaxed md:text-xl",
          dark ? "text-grey-400" : "text-grey-600"
        )}
      >
        {subheadline}
      </motion.p>

      {ctas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className={cn(
            "mt-10 flex flex-col gap-4 sm:flex-row pointer-events-auto",
            align === "center"
              ? "items-center sm:justify-center"
              : "items-start"
          )}
        >
          {ctas.map((cta) => (
            <Button
              key={cta.label}
              href={cta.href}
              variant={cta.variant ?? "primary"}
              size="lg"
              external={cta.external}
              className={cta.className}
            >
              {cta.label}
            </Button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function Hero({
  headline,
  subheadline,
  ctas = [],
  variant = "full",
  asciiTheme,
  className,
}: HeroProps) {
  // Original full variant
  if (variant === "full") {
    return (
      <section className={cn("flex min-h-screen items-center bg-white", className)}>
        <Container className="w-full">
          <HeroText headline={headline} subheadline={subheadline} ctas={ctas} />
        </Container>
      </section>
    );
  }

  // Original compact variant
  if (variant === "compact") {
    return (
      <section className={cn("flex items-center bg-white py-20 md:py-28", className)}>
        <Container className="w-full">
          <HeroText headline={headline} subheadline={subheadline} ctas={ctas} />
        </Container>
      </section>
    );
  }

  // ASCII Background (Home) — canvas behind centred text
  if (variant === "ascii-background") {
    return (
      <section className={cn("relative flex min-h-screen items-center bg-white", className)}>
        {asciiTheme && (
          <div className="absolute inset-0">
            <AsciiCanvas theme={asciiTheme} colorMode="light" />
          </div>
        )}
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white via-white to-transparent pointer-events-none z-10" />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white to-transparent pointer-events-none z-10" />
        <Container className="relative z-20 w-full pointer-events-none">
          <HeroText headline={headline} subheadline={subheadline} ctas={ctas} />
        </Container>
      </section>
    );
  }

  // ASCII Below (AAIMUN, CHS) — compact text, canvas area below
  if (variant === "ascii-below") {
    return (
      <section className={cn("bg-white", className)}>
        <div className="flex items-center py-20 md:py-28">
          <Container className="w-full">
            <HeroText headline={headline} subheadline={subheadline} ctas={ctas} />
          </Container>
        </div>
        {asciiTheme && (
          <div className="h-80 md:h-[28rem] lg:h-[32rem]">
            <AsciiCanvas theme={asciiTheme} colorMode="light" />
          </div>
        )}
      </section>
    );
  }

  // ASCII Dark (Security, Privacy) — full-screen dark, text bottom-left
  if (variant === "ascii-dark") {
    return (
      <section className={cn("relative flex h-screen items-end bg-black md:min-h-screen", className)}>
        {asciiTheme && (
          <div className="absolute inset-0">
            <AsciiCanvas theme={asciiTheme} colorMode="dark" />
          </div>
        )}
        <Container className="relative z-10 w-full pb-16 md:pb-24 pointer-events-none">
          <HeroText
            headline={headline}
            subheadline={subheadline}
            ctas={ctas}
            dark
            align="left"
          />
        </Container>
      </section>
    );
  }

  return null;
}
