import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Alterna security vulnerability disclosure policy.",
};

export default function SecurityPage() {
  return (
    <>
      <Hero
        headline="Security Vulnerability Disclosure"
        subheadline="We take the security of our systems and our users seriously. If you believe you have found a vulnerability, we want to hear from you."
        variant="compact"
      />

      <Section>
        <div className="prose prose-grey mx-auto max-w-3xl">
          <Heading level="h2">Reporting a Vulnerability</Heading>
          <p>
            If you discover a security vulnerability in any Institute Alterna
            system, please report it responsibly by emailing{" "}
            <a href="mailto:hey@alterna.dev">hey@alterna.dev</a> with the
            subject line &ldquo;Security Vulnerability Report&rdquo;.
          </p>

          <Heading level="h2">What to Include</Heading>
          <p>Please include the following in your report:</p>
          <ul>
            <li>A description of the vulnerability and its potential impact</li>
            <li>Steps to reproduce the issue</li>
            <li>Any relevant screenshots, logs, or proof-of-concept code</li>
            <li>Your name and contact information (optional, but appreciated)</li>
          </ul>

          <Heading level="h2">Our Commitment</Heading>
          <p>When you report a vulnerability to us, we commit to:</p>
          <ul>
            <li>Acknowledging receipt of your report within 48 hours</li>
            <li>Providing an initial assessment within 5 business days</li>
            <li>Keeping you informed of our progress toward resolution</li>
            <li>
              Not pursuing legal action against researchers who act in good
              faith and follow this disclosure policy
            </li>
          </ul>

          <Heading level="h2">Scope</Heading>
          <p>This policy applies to all systems operated by Institute Alterna, including:</p>
          <ul>
            <li>alterna.dev and all subdomains</li>
            <li>Our public GitHub repositories</li>
            <li>Any web applications or APIs we operate</li>
          </ul>

          <Heading level="h2">Out of Scope</Heading>
          <p>The following are considered out of scope:</p>
          <ul>
            <li>Denial of service attacks</li>
            <li>Social engineering of staff or volunteers</li>
            <li>Physical security testing</li>
            <li>Third-party services we use but do not control</li>
          </ul>

          <Heading level="h2">Safe Harbour</Heading>
          <p>
            We consider security research conducted in accordance with this
            policy to be authorised. We will not pursue civil or criminal
            action against researchers who follow these guidelines. If legal
            action is initiated by a third party, we will take steps to make it
            known that your actions were conducted in compliance with this
            policy.
          </p>

          <Heading level="h2">Recognition</Heading>
          <p>
            We appreciate the efforts of security researchers in helping keep
            our systems safe. With your permission, we are happy to publicly
            acknowledge your contribution.
          </p>
        </div>
      </Section>
    </>
  );
}
