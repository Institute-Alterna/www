import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Learning",
  description:
    "The Alterna Learning Platform - comprehensive computer science resources for learners of all ages. Coming soon.",
};

export default function LearningPage() {
  return (
    <>
      <Hero
        headline="Learning Platform"
        subheadline="Comprehensive computer science resources designed for learners of all ages and skill levels. From introductory concepts to advanced topics."
        variant="compact"
      />

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="accent">Coming Soon</Badge>
          <Heading level="h2" className="mt-4">
            Something new is on the way
          </Heading>
          <Text variant="muted" className="mt-4">
            We are building a comprehensive learning platform that makes
            quality computer science education accessible to everyone. Stay
            tuned for updates.
          </Text>
        </div>
      </Section>
    </>
  );
}
