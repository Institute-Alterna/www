import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Badge from "@/components/ui/Badge";
import FadeInView from "@/components/ui/FadeInView";

export const metadata: Metadata = {
  title: "(Alterna)tive",
  description: "The story behind Alterna. Coming soon.",
};

export default function AlternativePage() {
  return (
    <>
      <Hero
        headline="(Alterna)tive"
        subheadline="Every organisation has a story. This is ours."
        variant="compact"
      />

      <Section>
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent">Coming Soon</Badge>
            <Heading level="h2" className="mt-4">
              The story is being written
            </Heading>
            <Text variant="muted" className="mt-4">
              We are putting together the full story of how Alterna
              came to be - the ideas, the people, and the alternative path we
              chose. Check back soon.
            </Text>
          </div>
        </FadeInView>
      </Section>
    </>
  );
}
