import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllRoleSlugs, getRoleBySlug } from "@/sanity/client";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import PortableText from "@/components/ui/PortableText";
import AnimatedDetails from "@/components/ui/AnimatedDetails";
import TallyRoleEmbed from "@/components/ui/TallyRoleEmbed";

interface RolePageProps {
  params: Promise<{ role: string }>;
}

function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function generateStaticParams() {
  const slugs = await getAllRoleSlugs();
  return slugs.map((role) => ({ role }));
}

export async function generateMetadata({
  params,
}: RolePageProps): Promise<Metadata> {
  const { role: slug } = await params;
  const role = await getRoleBySlug(slug);
  if (!role) return { title: "Role Not Found" };

  return {
    title: `${role.name} | Role`,
    description: `Join Institute Alterna as ${role.name} on the ${role.team} team. ${capitalise(role.workMode)}, ${role.workload} hrs/week.`,
  };
}

export default async function RolePage({ params }: RolePageProps) {
  const { role: slug } = await params;
  const role = await getRoleBySlug(slug);
  if (!role) notFound();

  const tallyBaseUrl = process.env.TALENT_APPLICATION_URL ?? "";
  const tallyEmbedUrl = tallyBaseUrl
    ? `${tallyBaseUrl.replace("/r/", "/embed/")}?hideTitle=1&transparentBackground=1&alignLeft=1&position=${encodeURIComponent(role.name)}`
    : "";

  const interviewSteps = [
    {
      number: 1,
      title: "Application",
      description:
        "Take your time telling us why you want to join Alterna and make a strong first impression.",
    },
    {
      number: 2,
      title: "General Competencies Assessment",
      description:
        "Immediately after your application, you will receive a link to complete the GCA: a 15-minute multiple-choice questionnaire, which allows us to learn more about your skills in the workplace.",
    },
    ...(role.specialisedCompetencyAssessment
      ? [
          {
            number: 3,
            title: "Specialised Competency Assessment",
            description:
              "After you complete the GCA, we\u2019ll send you a 60-minute-or-less asynchronous assignment to help us understand how you work and approach problems specific to your position.",
          },
        ]
      : []),
    {
      number: role.specialisedCompetencyAssessment ? 4 : 3,
      title: "Interview",
      description:
        "Meet with Alterna\u2019s Director to talk about who you are beyond a resume, your approach to leadership, problem-solving, and gain a deeper understanding of Alterna\u2019s strategy, values, and processes.",
    },
    {
      number: role.specialisedCompetencyAssessment ? 5 : 4,
      title: "Offer",
      description:
        "We discuss the final details and ensure you are ready to jump in if you choose to accept.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-32 pb-8 md:pt-40 md:pb-20">
        <Container>
          <Link
            href="/volunteer#open-roles"
            className="mb-6 flex w-fit items-center gap-1.5 font-body text-sm font-medium text-grey-400 transition-colors hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            All roles
          </Link>
          <Badge variant="accent">{role.team}</Badge>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
            {role.name}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-grey-400">
            <span>
              {capitalise(role.workMode)}{" "}
              {role.compensation.salary ? ` ` : "Volunteer"}
            </span>
            <span aria-hidden="true">&middot;</span>
            <span>{role.region}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{role.workload} hrs/week</span>
          </div>
        </Container>
      </section>

      {/* Overview */}
      <Section>
        <PortableText value={role.overview} className="space-y-2" />
      </Section>

      {/* Responsibilities & What You'll Learn */}
      <Section variant="grey">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Heading level="h3">You&apos;ll get to</Heading>
            {role.responsibilities.length > 0 &&
            typeof role.responsibilities[0] === "string" ? (
              <ul className="mt-6 space-y-3">
                {(role.responsibilities as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-1 shrink-0 text-accent"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-4 w-4"
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
                    <Text variant="small" as="span">
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
            ) : (
              <PortableText value={role.responsibilities} className="mt-6" />
            )}
          </div>
          <div>
            <Heading level="h3">You&apos;ll learn to</Heading>
            <ul className="mt-6 space-y-3">
              {role.whatYouWillLearn.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-1 shrink-0 text-accent"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-4 w-4"
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
                  <Text variant="small" as="span">
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Requirements */}
      <Section>
        <Heading level="h2">We seek that you have</Heading>
        <ul className="mt-6 space-y-3">
          {role.requirements.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 shrink-0 text-grey-500" aria-hidden="true">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <circle cx="10" cy="10" r="3" />
                </svg>
              </span>
              <Text variant="muted" as="span">
                {item}
              </Text>
            </li>
          ))}
        </ul>
      </Section>

      {/* Exceptional Points */}
      {role.exceptionalPoints && role.exceptionalPoints.length > 0 && (
        <Section variant="grey">
          <Heading level="h2">We prefer if you have</Heading>
          <Text variant="muted" className="mt-2">
            These aren&apos;t required, but they&apos;ll make your application
            shine.
          </Text>
          <ul className="mt-6 space-y-3">
            {role.exceptionalPoints.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 shrink-0 text-accent" aria-hidden="true">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 1l2.39 6.66H19l-5.3 3.84L15.7 18 10 14.16 4.3 18l2-6.5L1 7.66h6.61z" />
                  </svg>
                </span>
                <Text variant="muted" as="span">
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Benefits */}
      <Section>
        <Heading level="h2">Benefits</Heading>
        <Text variant="muted" className="mt-2">
          Part of our{" "}
          <Link
            href="/volunteer#benefits"
            className="font-medium text-accent underline"
          >
            {role.compensation.salary ? "employee" : "volunteer"} benefits
            package
          </Link>
          .
        </Text>
        <ul className="mt-6 space-y-3">
          {role.compensation.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <span className="mt-1 shrink-0 text-accent" aria-hidden="true">
                <svg
                  className="h-4 w-4"
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
              <Text variant="small" as="span" className="capitalize">
                {benefit}
              </Text>
            </li>
          ))}
        </ul>
      </Section>

      {/* Role Details */}
      <Section variant="grey">
        <Heading level="h2">Role details</Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-grey-200 bg-white p-6">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-grey-500">
              Compensation
            </p>
            <p className="mt-2 font-heading text-lg font-semibold">
              {role.compensation.salary ? "Paid" : "Volunteer"}
            </p>
            <p className="mt-1 font-body text-sm text-grey-600">
              {role.compensation.salary
                ? `${role.compensation.salary} USD`
                : "Unpaid with benefits"}
            </p>
          </div>
          <div className="rounded-xl border border-grey-200 bg-white p-6">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-grey-500">
              Location
            </p>
            <p className="mt-2 font-heading text-lg font-semibold">
              {capitalise(role.workMode)}
            </p>
            <p className="mt-1 font-body text-sm text-grey-600">
              {role.region}
            </p>
          </div>
          <div className="rounded-xl border border-grey-200 bg-white p-6">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-grey-500">
              Duration
            </p>
            <p className="mt-2 font-heading text-lg font-semibold">
              {role.duration.ongoing ? "Ongoing" : "Fixed term"}
            </p>
          </div>
          <div className="rounded-xl border border-grey-200 bg-white p-6">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-grey-500">
              Communication
            </p>
            <p className="mt-2 font-heading text-lg font-semibold">
              {role.communication.asynchronous ? "Async-first" : "Synchronous"}
            </p>
            <p className="mt-1 font-body text-sm text-grey-600">
              {role.communication.language}
            </p>
          </div>
        </div>

        {/* Expandable extra details */}
        <AnimatedDetails summary="More about this role">
          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-grey-100 p-5">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-grey-500">
                Average Workload
              </p>
              <p className="mt-2 font-heading text-lg font-semibold">
                {role.workload} hrs/week
              </p>
              <p className="mt-1 font-body text-sm text-grey-600">
                This is an estimate which may fluctuate based on project needs
                and your availability.
              </p>
            </div>
            <div className="rounded-lg bg-grey-100 p-5">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-grey-500">
                Live collaboration
              </p>
              <p className="mt-2 font-heading text-lg font-semibold">
                {role.communication.liveCollaboration
                  ? "Required"
                  : "Not required"}
              </p>
              <p className="mt-1 font-body text-sm text-grey-600">
                {role.communication.liveCollaboration
                  ? "Most collaboration happens asynchronously. You'll get to participate in real-time sessions with the team only when needed."
                  : "All collaboration happens asynchronously. Work on your own schedule and communicate through written updates."}
              </p>
            </div>
            {role.communication.liveCollaboration && (
              <div className="rounded-lg bg-grey-100 p-5">
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-grey-500">
                  Equipment
                </p>
                <p className="mt-2 font-heading text-lg font-semibold">
                  Device required
                </p>
                <p className="mt-1 font-body text-sm text-grey-600">
                  A reliable device with camera, microphone, and internet
                  connectivity is required.
                </p>
              </div>
            )}
          </div>
        </AnimatedDetails>
      </Section>

      {/* Interview Process */}
      <Section>
        <Heading level="h2">Interview process</Heading>
        <Text variant="muted" className="mt-2 max-w-3xl">
          Our hiring process is designed to be thorough yet respectful of your
          time.
        </Text>
        <div className="mt-10 space-y-0">
          {interviewSteps.map((step, i) => (
            <div key={step.title} className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold text-white">
                  {step.number}
                </div>
                {i < interviewSteps.length - 1 && (
                  <div className="w-px grow bg-grey-200" />
                )}
              </div>
              <div className={i < interviewSteps.length - 1 ? "pb-8" : ""}>
                <h3 className="font-heading text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-grey-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Apply */}
      <Section id="apply">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Heading level="h2">Apply for {role.name}</Heading>
          </div>

          {/* Diversity statement */}
          <div className="mt-8 rounded-xl border border-grey-700 bg-grey-900 p-6">
            <p className="font-body text-sm leading-relaxed text-grey-400">
              We value diversity of experience, and we know that comes in many
              forms; which is why we&apos;re dedicated to adding new
              perspectives to the team. If you believe your experience is close
              to what we&apos;re looking for in this role, please consider
              applying.
            </p>
          </div>

          {/* Tally embed */}
          {tallyEmbedUrl ? (
            <TallyRoleEmbed
              src={tallyEmbedUrl}
              title={`Application form for ${role.name}`}
            />
          ) : (
            <div className="mt-10 text-center">
              <p className="font-body text-sm text-grey-500">
                Application form is currently unavailable. This should not have
                happened. If you have the chance, please{" "}
                <a href="/contact" className="text-accent underline">
                  contact us
                </a>{" "}
                directly.
              </p>
            </div>
          )}

          {/* Privacy notice */}
          <p className="font-body text-xs leading-relaxed text-grey-500">
            By submitting the application, you consent to Institute Alterna
            collecting and processing your personal data for recruiting
            purposes. Find more details in our{" "}
            <a href="/privacy" className="text-accent underline">
              Privacy Policy
            </a>
            . Alterna is an equal opportunity provider committed to inclusion
            and diversity. Our recruitment process is driven by a merit-first
            approach that does not discriminate candidates due to their
            ethnicity, religion, sexual orientation, identity, national origin,
            disability, or any other legally protected characteristic.
          </p>
        </div>
      </Section>
    </>
  );
}
