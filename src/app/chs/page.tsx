import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Badge from "@/components/ui/Badge";
import FadeInView from "@/components/ui/FadeInView";
import StaggerContainer from "@/components/ui/StaggerContainer";
import { chapters, strategistRoles } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Computing Honour Society",
  description:
    "The Computing Honour Society delivers hyper-local tech education through student-led chapters at schools worldwide.",
};

const chsStats = [
  { value: "25+", label: "Members" },
  { value: "2", label: "Active chapters" },
  { value: "2025", label: "Founded" },
];

export default function CHSPage() {
  return (
    <>
      <Hero
        headline="Computing Honour Society"
        subheadline="Hyper-local tech education delivered through student-led chapters at schools worldwide. Empowering the next generation of technologists, one school at a time."
        variant="ascii-below"
        asciiTheme="circuit"
        ctas={[
          {
            label: "Start a Chapter",
            href: "https://chs.alterna.dev",
            variant: "primary",
            external: true,
          },
        ]}
      />

      {/* What is CHS */}
      <Section>
        <Badge variant="accent">About</Badge>
        <Heading level="h2" className="mt-4">
          What is CHS?
        </Heading>
        <Text variant="muted" className="mt-4">
          The Computing Honour Society (CHS) is a programme within
          Alterna that establishes student-led chapters at schools
          to deliver hyper-local technology education. Each chapter is run
          by a team of strategists who design and deliver programming
          tailored to their school and community.
        </Text>
        <Text variant="muted" className="mt-4">
          CHS chapters provide workshops, mentorship, competition
          preparation, and community outreach - all led by students, for
          students. Our model ensures that tech education is not just
          accessible, but relevant and impactful at the local level.
        </Text>
      </Section>

      {/* Stats - meaningful data, keep animations */}
      <Section variant="dark">
        <StaggerContainer className="grid gap-8 md:grid-cols-3">
          {chsStats.map((stat) => (
            <FadeInView key={stat.label}>
              <div className="text-center">
                <p className="font-heading text-4xl font-bold text-accent md:text-5xl">
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

      {/* Active Chapters */}
      <Section>
        <Heading level="h2">Active chapters</Heading>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {chapters.map((chapter) => (
            <div key={chapter.name} className="rounded-lg border border-grey-200 p-6">
              <div className="flex items-start justify-between">
                <h3 className="font-heading text-xl font-semibold">
                  {chapter.name}
                </h3>
                {chapter.flagship && (
                  <Badge variant="accent">Flagship</Badge>
                )}
              </div>
              <div className="mt-2 flex gap-2">
                <Badge>{chapter.location}</Badge>
                <Badge>Est. {chapter.established}</Badge>
              </div>
              {chapter.members && (
                <p className="mt-3 text-sm font-medium text-accent">
                  {chapter.members} members
                </p>
              )}
              <p className="mt-2 font-body text-sm leading-relaxed text-grey-600">
                {chapter.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Strategist Model */}
      <Section variant="grey">
        <Badge variant="accent">Leadership</Badge>
        <Heading level="h2" className="mt-4">
          The Strategist Model
        </Heading>
        <Text variant="muted" className="mt-4">
          Each CHS chapter is led by a team of strategists - not traditional
          officer titles, but roles designed to reflect the strategic
          thinking and leadership our members bring to their communities.
        </Text>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {strategistRoles.map((role) => (
            <div key={role.title} className="rounded-lg border border-grey-200 bg-white p-6">
              <h3 className="font-heading text-lg font-semibold">
                {role.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-grey-600">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Newsletter CTA */}
      <NewsletterSignup source="web/chs" variant="light" />
    </>
  );
}
