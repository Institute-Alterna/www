/**
 * Mailing configuration
 * Centralizes all mailing list and subscription settings
 */

/* ------------------------------------------------------------------ */
/*  Sources                                                            */
/* ------------------------------------------------------------------ */

/**
 * Subscription sources — tracks where signups originated.
 * Stored in contact properties for segmentation.
 *
 * To add a new source: append to this array and update the Source type export.
 *
 * Example: Adding a "web/events" source
 * ```
 * export const VALID_SOURCES = [
 *   "web/landing",
 *   "web/aaimun",
 *   "web/chs",
 *   "web/volunteer",
 *   "web/events",  // ← new entry
 * ] as const;
 * ```
 */
export const VALID_SOURCES = [
  "web/landing",
  "web/aaimun",
  "web/chs",
  "web/volunteer",
] as const;

export type Source = (typeof VALID_SOURCES)[number];

/* ------------------------------------------------------------------ */
/*  Mailing Lists                                                      */
/* ------------------------------------------------------------------ */

/**
 * Mailing list configuration.
 * Maps subscription types to env var keys for Loops mailing list IDs.
 * Multiple env vars means the contact is added to all those lists.
 *
 * To add a new type:
 * 1. Add entry here mapping to env var key(s)
 * 2. Add the env var(s) to .env.example and Vercel
 * 3. Update MAILING_COPY below with heading, description, and success message
 *
 * Example: Adding a "partner" type that goes to its own list
 * ```
 * export const MAILING_LIST_CONFIG = {
 *   general: ["LOOPS_GENERAL_MAILING_LIST_ID"],
 *   talent: ["LOOPS_GENERAL_MAILING_LIST_ID", "LOOPS_TALENT_MAILING_LIST_ID"],
 *   partner: ["LOOPS_PARTNER_MAILING_LIST_ID"],  // ← new entry
 * } as const;
 * ```
 */
export const MAILING_LIST_CONFIG = {
  general: ["LOOPS_GENERAL_MAILING_LIST_ID"],
  talent: ["LOOPS_GENERAL_MAILING_LIST_ID", "LOOPS_TALENT_MAILING_LIST_ID"],
} as const;

export type ListType = keyof typeof MAILING_LIST_CONFIG;

/* ------------------------------------------------------------------ */
/*  UI Copy                                                            */
/* ------------------------------------------------------------------ */

/**
 * Copy configuration for each mailing list type.
 * Used by the NewsletterSignup component to display appropriate messaging.
 */
export const MAILING_COPY: Record<
  ListType,
  { heading: string; description: string; success: string }
> = {
  general: {
    heading: "Stay in the loop",
    description:
      "Get updates on our programmes, events, and resources. No spam, unsubscribe at any time.",
    success: "You\u2019re in! Check your inbox.",
  },
  talent: {
    heading: "Join our talent network",
    description:
      "Get notified when new volunteer roles open. No spam, unsubscribe at any time.",
    success: "You\u2019re all set! You\u2019ll hear from us whenever new roles open.",
  },
};
