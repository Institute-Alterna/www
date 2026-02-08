import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Institute Alterna privacy policy.",
};

export default function PrivacyPage() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="Last updated: February 2026"
        variant="compact"
      />

      <Section>
        <div className="prose prose-grey mx-auto max-w-3xl">
          <Heading level="h2">Introduction</Heading>
          <p>
            Institute Alterna (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
            &ldquo;us&rdquo;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website and use our services.
          </p>
          <p>
            Institute Alterna is fiscally sponsored by The Hack Foundation
            (d.b.a. Hack Club), a 501(c)(3) nonprofit (EIN: 81-2908499).
          </p>

          <Heading level="h2">Information We Collect</Heading>
          <Heading level="h3">Information you provide</Heading>
          <p>
            We may collect information that you voluntarily provide when you
            contact us, apply to volunteer, register for programmes, or
            otherwise interact with our services. This may include your name,
            email address, school or organisational affiliation, and any other
            information you choose to provide.
          </p>

          <Heading level="h3">Automatically collected information</Heading>
          <p>
            When you visit our website, we may automatically collect certain
            information about your device, including your IP address, browser
            type, operating system, referring URLs, and information about how
            you interact with our website. We use this information to maintain
            the security and operation of our services and for internal
            analytics.
          </p>

          <Heading level="h2">How We Use Your Information</Heading>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Operate, maintain, and improve our website and programmes</li>
            <li>Respond to your enquiries and communications</li>
            <li>Process volunteer applications</li>
            <li>Send administrative information, such as updates to our policies</li>
            <li>Comply with legal obligations</li>
          </ul>

          <Heading level="h2">Sharing Your Information</Heading>
          <p>
            We do not sell, rent, or trade your personal information. We may
            share information with our fiscal sponsor (The Hack Foundation) as
            necessary for our operations, and with service providers who assist
            us in operating our website and programmes, subject to
            confidentiality agreements.
          </p>

          <Heading level="h2">Data Security</Heading>
          <p>
            We implement reasonable administrative, technical, and physical
            security measures to protect your personal information. However, no
            method of transmission over the Internet or electronic storage is
            completely secure.
          </p>

          <Heading level="h2">Children&apos;s Privacy</Heading>
          <p>
            Some of our programmes serve individuals under the age of 18. We
            are committed to protecting the privacy of young participants. We
            only collect information from minors as necessary for programme
            participation, and we require parental or guardian consent where
            required by law.
          </p>

          <Heading level="h2">Your Rights</Heading>
          <p>
            You may request access to, correction of, or deletion of your
            personal information by contacting us at{" "}
            <a href="mailto:hey@alterna.dev">hey@alterna.dev</a>. We will
            respond to your request within a reasonable timeframe.
          </p>

          <Heading level="h2">Changes to This Policy</Heading>
          <p>
            We may update this Privacy Policy from time to time. We will
            notify you of any changes by posting the new Privacy Policy on this
            page and updating the &ldquo;Last updated&rdquo; date.
          </p>

          <Heading level="h2">Contact Us</Heading>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at <a href="mailto:hey@alterna.dev">hey@alterna.dev</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
