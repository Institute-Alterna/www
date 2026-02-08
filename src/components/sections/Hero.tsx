"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface HeroCTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  scroll?: boolean;
}

interface HeroProps {
  headline: string;
  subheadline: string;
  ctas?: HeroCTA[];
  variant?: "full" | "compact";
  className?: string;
}

export default function Hero({
  headline,
  subheadline,
  ctas = [],
  variant = "full",
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "flex items-center bg-white",
        variant === "full" ? "min-h-screen" : "py-20 md:py-28",
        className
      )}
    >
      <Container className="w-full">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-heading text-4xl font-bold tracking-tight leading-tight md:text-5xl lg:text-6xl"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="mt-6 font-body text-lg leading-relaxed text-grey-600 md:text-xl"
          >
            {subheadline}
          </motion.p>

          {ctas.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              {ctas.map((cta) => (
                <Button
                  key={cta.label}
                  href={cta.href}
                  variant={cta.variant ?? "primary"}
                  size="lg"
                  external={cta.external}
                >
                  {cta.label}
                </Button>
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
