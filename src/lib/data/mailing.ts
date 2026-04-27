/**
 * Mailing configuration
 * Centralises mailing list and subscription settings.
 */

/**
 * Subscription sources track where signups originated.
 * Stored in contact properties for segmentation.
 */
export const VALID_SOURCES = [
  "web/landing",
  "web/aaimun",
  "web/chs",
  "web/volunteer",
] as const;

export type Source = (typeof VALID_SOURCES)[number];

/**
 * Mailing list configuration.
 * Maps subscription types to env var keys for Loops mailing list IDs.
 * Multiple env vars means the contact is added to all those lists.
 */
export const MAILING_LIST_CONFIG = {
  general: ["LOOPS_GENERAL_MAILING_LIST_ID"],
  talent: ["LOOPS_GENERAL_MAILING_LIST_ID", "LOOPS_TALENT_MAILING_LIST_ID"],
} as const;

export type ListType = keyof typeof MAILING_LIST_CONFIG;

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
