"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "@/components/ui/Section";
import FadeInView from "@/components/ui/FadeInView";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { MAILING_COPY, type Source, type ListType } from "@/lib/data/mailing";

type FormStatus = "idle" | "loading" | "success" | "error";
type Variant = "light" | "dark" | "grey";

interface NewsletterSignupProps {
  source: Source;
  type?: ListType;
  variant?: Variant;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function getStyles(variant: Variant) {
  switch (variant) {
    case "dark":
      return {
        containerBorder: "border-grey-700",
        containerBg: "bg-grey-900",
        inputText: "text-white",
        placeholder: "placeholder:text-grey-500",
        subtext: "text-grey-400",
        error: "text-red-400",
        success: "text-accent",
      };
    case "grey":
      return {
        containerBorder: "border-grey-200",
        containerBg: "bg-white",
        inputText: "text-black",
        placeholder: "placeholder:text-grey-500",
        subtext: "text-grey-600",
        error: "text-red-600",
        success: "text-accent",
      };
    default:
      return {
        containerBorder: "border-grey-200",
        containerBg: "bg-white",
        inputText: "text-black",
        placeholder: "placeholder:text-grey-500",
        subtext: "text-grey-600",
        error: "text-red-600",
        success: "text-accent",
      };
  }
}

export default function NewsletterSignup({
  source,
  type = "general",
  variant = "light",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const styles = getStyles(variant);
  const copy = MAILING_COPY[type];
  const showButton = email.length > 0;
  const inputId = `newsletter-email-${source.replace("/", "-")}`;
  const errorId = `newsletter-error-${source.replace("/", "-")}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (status === "loading" || status === "success") return;

    const trimmed = email.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/mailing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source, type }),
      });

      const data: { success: boolean; error?: string } = await res.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  return (
    <Section variant={variant}>
      <FadeInView>
        <div className="mx-auto max-w-2xl text-center">
          <Heading level="h2">{copy.heading}</Heading>
          <Text
            variant="muted"
            className={cn("mt-4", variant === "dark" && styles.subtext)}
          >
            {copy.description}
          </Text>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={cn(
                    "flex items-center justify-center gap-2 py-3 font-body text-base",
                    styles.success
                  )}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span>{copy.success}</span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <label htmlFor={inputId} className="sr-only">
                    Email address
                  </label>
                  <div
                    className={cn(
                      "flex items-center rounded-xl border p-1.5 transition-colors focus-within:border-accent",
                      styles.containerBorder,
                      styles.containerBg
                    )}
                  >
                    <input
                      id={inputId}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      aria-invalid={status === "error" ? "true" : undefined}
                      aria-describedby={
                        status === "error" ? errorId : undefined
                      }
                      disabled={status === "loading"}
                      style={{ outline: "none" }}
                      className={cn(
                        "min-w-0 flex-1 bg-transparent px-3 py-2 font-body text-base",
                        styles.inputText,
                        styles.placeholder
                      )}
                    />
                    <AnimatePresence>
                      {showButton && (
                        <motion.button
                          type="submit"
                          disabled={status === "loading"}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="shrink-0 whitespace-nowrap rounded-lg bg-accent px-5 py-2.5 font-heading text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-60"
                        >
                          {status === "loading"
                            ? "Subscribing\u2026"
                            : "Subscribe"}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>

                  {status === "error" && errorMessage && (
                    <p
                      id={errorId}
                      role="alert"
                      className={cn(
                        "mt-2 font-body text-sm",
                        styles.error
                      )}
                    >
                      {errorMessage}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </FadeInView>
    </Section>
  );
}
