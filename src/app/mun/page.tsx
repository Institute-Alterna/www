import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeInView from "@/components/ui/FadeInView";
import StaggerContainer from "@/components/ui/StaggerContainer";

export const metadata: Metadata = {
  title: "AAIMUN",
  description:
    "AAIMUN is the world's first competitive Model United Nations centred in artificial intelligence legislation and policy.",
};

const conferenceStats = [
  { value: "60+", label: "Delegates" },
  { value: "30+", label: "Countries represented" },
];

export default function AAIMUNPage() {
  return (
    <>
      <Hero
        headline="AAIMUN"
        subheadline="The world's first competitive Model United Nations centred in artificial intelligence legislation and policy, in partnership with the Futures Summit Alliance and competing under the UNx Conference league."
        variant="ascii-below"
        asciiTheme="parliament"
        ctas={[{ label: "Contact Us", href: "/contact", variant: "primary" }]}
      />

      {/* What is AAIMUN */}
      <Section>
        <Badge variant="accent">About</Badge>
        <Heading level="h2" className="mt-4">
          What is AAIMUN?
        </Heading>
        <Text variant="muted" className="mt-4">
          AAIMUN (Alterna Artificial Intelligence Model United Nations) is a
          pioneering programme that brings together students from around the
          world to debate, draft, and defend legislation focused on artificial
          intelligence policy. Unlike traditional MUN, AAIMUN centres its
          committees entirely around the intersection of AI and global
          governance.
        </Text>
        <Text variant="muted" className="mt-4">
          Through our partnership with the Futures Summit Alliance, AAIMUN
          operates under the UNx Conference league - a competitive framework
          that raises the standard for Model United Nations globally.
          Delegates engage with real-world AI policy challenges, from
          algorithmic bias to autonomous systems regulation.
        </Text>
      </Section>

      {/* Inaugural Conference - stats are meaningful, keep animations */}
      <Section variant="dark">
        <div className="text-center">
          <Badge variant="accent">Past Event</Badge>
          <Heading level="h2" className="mt-4">
            Inaugural Conference
          </Heading>
          <Text className="mt-2 text-grey-400">20 September 2025</Text>
        </div>

        <StaggerContainer className="mt-12 grid gap-8 md:grid-cols-2">
          {conferenceStats.map((stat) => (
            <FadeInView key={stat.label}>
              <div className="text-center">
                <p className="font-heading text-4xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="mt-2 font-body text-sm text-grey-400">
                  {stat.label}
                </p>
              </div>
            </FadeInView>
          ))}
        </StaggerContainer>
      </Section>

      {/* Partnership */}
      <Section>
        <Badge variant="accent">Partnership</Badge>
        <Heading level="h2" className="mt-4">
          Future Summit Alliance
        </Heading>
        <Text variant="muted" className="mt-4">
          AAIMUN is proudly partnered with the Florida Scholastic Association,
          a leading scholastic competition organisation. This partnership
          places AAIMUN within the UNx Conference league, ensuring competitive
          rigour and recognition for participating delegates.
        </Text>
      </Section>

      {/* CTA */}
      <Section variant="grey">
        <div className="mx-auto max-w-3xl text-center">
          <Heading level="h2">Stay updated</Heading>
          <Text variant="muted" className="mt-4">
            Interested in the next AAIMUN conference? Get in touch to stay
            informed about upcoming events, delegate registration, and
            partnership opportunities.
          </Text>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/contact" variant="primary">
              Get in Touch
            </Button>
            <Button href="/volunteer" variant="secondary">
              Join the Team
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
