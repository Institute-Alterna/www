import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import { siteConfig, socialLinks } from "@/lib/data/content";
import ContactFormEmbed from "@/components/ui/ContactFormEmbed";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Alterna. We would love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        headline="Get in touch"
        subheadline="Whether you have a question, want to partner, or wish to learn more about what we do, we would love to hear from you."
        variant="compact"
      />

      {/* Contact Form */}
      <Section className="pb-0">
        <ContactFormEmbed />
        <div className="text-sm text-muted-foreground mt-0 font-body leading-relaxed text-center text-grey-600">
          <p>
            Please do not report security vulnerabilities here. Instead, refer
            to our{" "}
            <a
              href="/security"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Security Vulnerability Disclosure Policy
            </a>
            .
          </p>
          <p>
            To communicate with specific CHS chapters, please find their contact
            information on our{" "}
            <a
              href="https://chs.alterna.dev/chapters"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Chapter Directory
            </a>
            .
          </p>
        </div>
      </Section>

      {/* Social Links */}
      <Section variant="grey">
        <Heading level="h2">Follow us on social media</Heading>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-grey-200 bg-white p-5 transition-colors hover:border-accent/40"
              aria-label={link.label}
            >
              <span className="font-heading text-base font-medium">
                {link.platform}
              </span>
              <svg
                className="h-4 w-4 text-grey-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </a>
          ))}
        </div>
      </Section>

      {/* Financial Transparency */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Heading level="h3">Financial transparency</Heading>
          <p className="mt-4 font-body text-sm leading-relaxed text-grey-600">
            Alterna is fiscally sponsored by The Hack Foundation (d.b.a. Hack
            Club), a 501(c)(3) non-profit. Our finances are publicly available.
          </p>
          <a
            href={siteConfig.hcbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            View on HCB
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>
        </div>
      </Section>
    </>
  );
}
