import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Badge from "@/components/ui/Badge";
import Accordion from "@/components/ui/Accordion";
import ImageShowcase from "@/components/ui/ImageShowcase";
import RolesList from "@/components/sections/RolesList";
import {
  approachToWork,
  volunteerBenefits,
  volunteerFAQs,
  volunteerShowcase,
} from "@/lib/data/content";
import { getActiveRoles } from "@/sanity/client";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Join Alterna as a volunteer. Flexible, remote, and impactful — contribute to programmes that shape the future of learning.",
};

export default async function VolunteerPage() {
  const roles = await getActiveRoles();
  const highlightBenefits = volunteerBenefits.slice(0, 2);
  const restBenefits = volunteerBenefits.slice(2);

  return (
    <>
      <Hero
        headline="Join the mission"
        subheadline="We're reshaping the way learners across the world receive technology education, and we need people who ship their best work in a fully remote and async-first team."
        variant="split"
        ctas={[
          { label: "Open Roles", href: "#open-roles", variant: "primary" },
        ]}
        rightContent={<ImageShowcase slides={volunteerShowcase} />}
      />

      {/* What We Expect */}
      <Section className="pt-0 md:pt-0">
        <Text variant="muted" className="mt-4 max-w-3xl">
          <b>
            We are looking for exceptional high school and undergraduate
            students
          </b>{" "}
          who are driven by our mission{" "}
          <a href="/about" className="font-medium text-accent underline">
            to revolutionise the computer science learning journey
          </a>{" "}
          for learners of all ages. You don&apos;t need to be an expert. You
          need to be reliable, communicative, and genuinely interested in the
          work that you do with <b>humility over ego</b>.
        </Text>
        <Text variant="muted" className="mt-4 max-w-3xl">
          As a non-profit, we rely on unpaid volunteers. However, that does not
          stop us from operating on trust and moving fast. Our personnel are
          expected to flag blockers early and treat every collaboration as a
          chance to raise the bar, while treated with a degree of
          professionalism that makes it hard to tell this is a student-run
          organisation.
        </Text>
      </Section>

      {/* Benefits */}
      <Section variant="grey" id="benefits">
        <Badge variant="accent">Benefits</Badge>
        <Heading level="h2" className="mt-4">
          Why volunteer with us
        </Heading>

        {/* Two highlighted benefits */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {highlightBenefits.map((benefit) => (
            <div
              key={benefit.label}
              className="rounded-xl border border-grey-200 bg-white p-8"
            >
              <h3 className="font-heading text-xl font-semibold">
                {benefit.label}
              </h3>
              <p className="mt-3 font-body text-base leading-relaxed text-grey-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Remaining benefits as a compact list */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {restBenefits.map((benefit) => (
            <div
              key={benefit.label}
              className="flex items-start gap-3 rounded-lg border border-grey-200 bg-white px-5 py-4"
            >
              <span className="mt-0.5 shrink-0 text-accent" aria-hidden="true">
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
              <div>
                <p className="font-heading text-base font-semibold">
                  {benefit.label}
                </p>
                <p className="mt-1 font-body text-sm leading-relaxed text-grey-600">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* How We Work */}
      <Section>
        <Badge variant="accent">Culture</Badge>
        <Heading level="h2" className="mt-4">
          How we ship great programmes
        </Heading>
        <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {approachToWork.map((method) => (
            <div key={method.name}>
              <h3 className="font-heading text-base font-semibold">
                {method.name}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-grey-600">
                {method.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Open Roles */}
      <Section variant="dark" id="open-roles">
        {roles.length > 0 ? (
          <>
            <Badge variant="accent">Now Hiring</Badge>
            <Heading level="h2" className="mt-4">
              Open roles
            </Heading>
            <div className="mt-10">
              <RolesList roles={roles} />
            </div>
          </>
        ) : (
          <RolesList roles={[]} />
        )}
      </Section>

      {/* FAQ */}
      <Section>
        <Heading level="h2">Frequently asked questions</Heading>
        <Accordion items={volunteerFAQs} className="mt-8" />
      </Section>

      {/* Talent Network CTA */}
      <Section id="talent-network">
          <NewsletterSignup source="web/volunteer" type="talent" />
      </Section>
    </>
  );
}
