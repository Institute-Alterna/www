import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Prose from "@/components/ui/Prose";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Security",
  description:
    "We welcome responsible and good-mannered security research on the systems that our personnel and learners use.",
};

export default function SecurityPage() {
  return (
    <>
      <Hero
        headline="Security Vulnerability Disclosure"
        subheadline="We welcome responsible and good-mannered security research on the systems that our personnel and learners use."
        variant="ascii-dark"
        asciiTheme="cipher"
      />

      <Section>
        <Prose className="[&>h2]:mb-2 [&>h2]:mt-12">
          <Heading level="h2">Reporting a Vulnerability</Heading>
          <p>
            If you discover a security vulnerability in any Alterna system,{" "}
            <b>
              please report it responsibly by emailing safety [at] alterna.dev
            </b>{" "}
            with the subject line &ldquo;Security Vulnerability Report&rdquo;,
            followed by a descriptive title of the issue. If you are able to, we
            strongly suggest that you encrypt your report using our{" "}
            <a
              href="https://keys.openpgp.org/search?q=C2DCE1413EE82E234FBC14A15AD8DE1D94EBF08A"
              target="_blank"
              rel="noopener noreferrer"
            >
              PGP key
            </a>
            .
          </p>
          <p>
            We kindly ask you to not disclose this vulnerability to outside
            parties nor abuse it maliciously until we have resolved the issue or
            otherwise notified you.
          </p>
          <Heading level="h2">What to Include</Heading>
          <p>Please include the following in your report:</p>
          <ul>
            <li>
              A precise description of the vulnerability and its potential
              impact
            </li>
            <li>Steps to reproduce the issue</li>
            <li>Any relevant screenshots, logs, or proof-of-concept code</li>
            <li>
              Your real name (or pseudonym) and contact information (optional,
              but appreciated)
            </li>
          </ul>

          <Heading level="h2">What We&apos;ll Do</Heading>
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
          <p>
            This policy applies to all systems operated by Institute Alterna,
            including:
          </p>
          <ul>
            <li>alterna.dev and all subdomains</li>
            <li>
              Our public{" "}
              <a
                href="https://github.com/orgs/Institute-Alterna/repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub repositories
              </a>
            </li>
            <li>Any web applications or APIs we operate</li>
          </ul>

          <Heading level="h2">Out of Scope</Heading>
          <p>
            The following are considered out of scope and won&apos;t be
            recognised:
          </p>
          <ul>
            <li>Denial of service attacks</li>
            <li>Social engineering of volunteers or learners</li>
            <li>Physical security testing</li>
            <li>Third-party services we use but do not control</li>
          </ul>

          <Heading level="h2">Safe Harbour</Heading>
          <p>
            We consider security research conducted in accordance with this
            policy to be authorised. We will not pursue civil or criminal action
            against researchers who follow these guidelines. If legal action is
            initiated by a third party, we will take steps to make it known that
            your actions were conducted in compliance with this policy.
          </p>

          <Heading level="h2">Recognition</Heading>
          <p>
            We appreciate the efforts of security researchers in helping keep
            our systems safe. With your permission, we are happy to publicly
            acknowledge your contribution.
          </p>

          <Heading level="h3">Paid Bounties</Heading>
          <p>
            At this time, we do not offer paid bounties for vulnerability
            reports. However, we are open to discussing other forms of
            recognition or rewards for significant contributions.
          </p>
          <p>
            Any attempt to provide a report for which no details are provided
            until a payment is made will not be recognised and will be found in
            violation of this policy.
          </p>
        </Prose>
        <div className="mt-8 flex flex-col items-center gap-4 w-full sm:flex-row sm:justify-center">
          <Button
            href="/security#:~:text=please,key%2E"
            variant="primary"
            fullReload
          >
            Report a Vulnerability
          </Button>
        </div>
      </Section>
    </>
  );
}
