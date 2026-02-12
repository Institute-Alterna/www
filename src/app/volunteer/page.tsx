import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import {
  volunteerTeams,
  volunteerBenefits,
  volunteerFAQs,
} from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Join Alterna as a volunteer. Flexible, remote, and impactful - contribute to programmes that shape the future of learning.",
};

export default function VolunteerPage() {
  return (
    <>
      <Hero
        headline="Join the mission"
        subheadline="Volunteer with Alterna and help build the future of technology education. Flexible, fully remote, and deeply impactful."
        variant="compact"
        ctas={[
          { label: "Open Roles", href: "#open-roles", variant: "primary" },
        ]}
      />

      {/* Why Volunteer */}
      <Section>
        <Badge variant="accent">Benefits</Badge>
        <Heading level="h2" className="mt-4">
          Why volunteer with us
        </Heading>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {volunteerBenefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3 rounded-lg border border-grey-200 p-5">
              <span className="mt-0.5 text-accent" aria-hidden="true">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <p className="font-body text-sm leading-relaxed text-grey-600">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* What We Expect */}
      <Section variant="grey">
        <Heading level="h2">What we expect</Heading>
        <Text variant="muted" className="mt-4">
          We are looking for individuals who share our values and are
          committed to making a difference. You do not need to be an expert
          - what matters most is your dedication, willingness to learn, and
          enthusiasm for the mission.
        </Text>
        <Text variant="muted" className="mt-4">
          Volunteers are expected to communicate openly, meet reasonable
          deadlines, and treat all members of the community with respect.
          We operate on trust, and we value reliability.
        </Text>
      </Section>

      {/* Available Teams */}
      <Section>
        <Badge variant="accent">Teams</Badge>
        <Heading level="h2" className="mt-4">
          Available teams
        </Heading>
        <Text variant="muted" className="mt-4">
          Choose the team that best fits your skills and interests. Each team
          plays a critical role in our mission.
        </Text>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {volunteerTeams.map((team) => (
            <div key={team.name} className="rounded-lg border border-grey-200 p-6">
              <h3 className="font-heading text-lg font-semibold">
                {team.name}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-grey-600">
                {team.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Role Exploration Placeholder */}
      <Section variant="dark" id="open-roles">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="accent">Coming Soon</Badge>
          <Heading level="h2" className="mt-4">
            Role exploration
          </Heading>
          <Text className="mt-4 text-grey-400">
            Individual role pages with detailed descriptions, requirements,
            and application forms are coming soon. In the meantime, reach out
            to us directly.
          </Text>
          <div className="mt-8">
            <Button href="/contact" variant="primary">
              Get in Touch
            </Button>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Heading level="h2">Frequently asked questions</Heading>
        <Accordion items={volunteerFAQs} className="mt-8" />
      </Section>

      {/* Talent Network CTA */}
      <NewsletterSignup source="web/volunteer" type="talent" variant="grey" />
    </>
  );
}
