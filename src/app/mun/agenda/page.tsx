import type { Metadata } from "next";
import Link from "next/link";
import AaimunWordmark from "@/components/sections/AaimunWordmark";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FadeInView from "@/components/ui/FadeInView";
import SectionDivider from "@/components/ui/SectionDivider";
import StaggerContainer from "@/components/ui/StaggerContainer";
import {
  AGENDA_UPDATED,
  AI_DISCLOSURE_NOTE,
  committeeAgendas,
  compulsoryParagraphs,
  EXAMPLE_PAPER_NOTE,
  EXAMPLE_PAPER_URL,
  FORMATTING_LEAD,
  formattingStructure,
  generalRules,
  MYMUN_URL,
  ORIGINALITY_LEAD,
  PAPER_DEADLINE,
  plagiarismIncludes,
  POSITION_PAPER_DEFINITION,
} from "@/lib/data/agenda";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "AAIMUN 2026 committee agendas and the official position paper guidelines — what a position paper is, how to format it, and how submitting one by 15 July earns priority country selection.",
};

const tableOfContents = [
  { id: "agendas", label: "01 / Agendas" },
  { id: "position-papers", label: "02 / Position papers" },
  { id: "guidelines", label: "03 / General guidelines" },
  { id: "formatting", label: "04 / Formatting" },
  { id: "priority", label: "05 / Submission & priority" },
];

export default function AgendaPage() {
  return (
    <>
      {/* Header */}
      <header className="grain-overlay bg-white text-black">
        <Container className="py-16 md:py-24">
          <FadeInView>
            <AaimunWordmark className="h-9 md:h-10" animate={false} />
          </FadeInView>

          <FadeInView delay={0.05}>
            <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-aaimun">
              AAIMUN 2026 / Agenda
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl">
              Agenda &amp; position papers
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-grey-700 md:text-xl md:leading-9">
              Everything you need to know before Conference Weekend.
            </p>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-grey-500">
              Guidelines as of {AGENDA_UPDATED}
            </p>
          </FadeInView>

          <FadeInView delay={0.1}>
            <nav
              aria-label="On this page"
              className="mt-12 border-t border-grey-200 pt-6"
            >
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-grey-600 transition-colors hover:text-aaimun"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </FadeInView>
        </Container>
      </header>

      {/* 01 / AGENDAS */}
      <section id="agendas" className="bg-grey-100 py-16 text-black md:py-24">
        <Container>
          <SectionDivider index="01" label="AGENDAS" />

          <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)]">
            <FadeInView>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                Four committees, four topics
              </h2>
              <p className="mt-5 text-base leading-7 text-grey-600">
                Each committee debates a single agenda topic. Your position
                paper should argue your assigned country&apos;s stance on the
                topic for your committee.
              </p>
            </FadeInView>

            <StaggerContainer
              staggerDelay={0.07}
              className="grid gap-4 sm:grid-cols-2"
            >
              {committeeAgendas.map((committee) => (
                <FadeInView key={committee.name}>
                  <article className="flex h-full min-h-48 flex-col border border-grey-200 bg-white p-6 transition-colors hover:border-aaimun/50">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-aaimun">
                      {committee.name}
                    </p>
                    {committee.fullName ? (
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-grey-500">
                        {committee.fullName}
                      </p>
                    ) : null}
                    <h3 className="mt-auto pt-8 font-heading text-xl font-semibold leading-snug text-grey-900">
                      {committee.topic}
                    </h3>
                  </article>
                </FadeInView>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* 02 / POSITION PAPERS */}
      <section id="position-papers" className="bg-white py-16 text-black md:py-24">
        <Container>
          <SectionDivider index="02" label="POSITION PAPERS" />

          <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-start">
            <FadeInView>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                What is a position paper?
              </h2>
            </FadeInView>
            <FadeInView delay={0.05}>
              <p className="max-w-2xl font-body text-lg leading-8 text-grey-700">
                {POSITION_PAPER_DEFINITION}
              </p>
            </FadeInView>
          </div>
        </Container>
      </section>

      {/* 03 / GENERAL GUIDELINES */}
      <section id="guidelines" className="bg-grey-100 py-16 text-black md:py-24">
        <Container>
          <SectionDivider index="03" label="GENERAL GUIDELINES" />

          <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-start">
            <FadeInView>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                The ground rules
              </h2>
              <p className="mt-5 text-base leading-7 text-grey-600">
                A few firm requirements keep the process fair and the writing
                your own.
              </p>
            </FadeInView>

            <div className="space-y-4">
              <FadeInView>
                <article className="border border-grey-200 bg-white p-6 md:p-7">
                  <h3 className="font-heading text-lg font-semibold text-grey-900">
                    Original writing only
                  </h3>
                  <p className="mt-3 text-base leading-7 text-grey-700">
                    {ORIGINALITY_LEAD}
                  </p>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-grey-500">
                    Plagiarism includes
                  </p>
                  <ul className="mt-3 space-y-2">
                    {plagiarismIncludes.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-base leading-7 text-grey-700"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-aaimun"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-l-2 border-aaimun/40 pl-4 text-base leading-7 text-grey-700">
                    {AI_DISCLOSURE_NOTE}
                  </p>
                </article>
              </FadeInView>

              <StaggerContainer staggerDelay={0.07} className="grid gap-4 sm:grid-cols-2">
                {generalRules.map((rule) => (
                  <FadeInView key={rule}>
                    <article className="h-full border border-grey-200 bg-white p-6">
                      <p className="text-base leading-7 text-grey-700">{rule}</p>
                    </article>
                  </FadeInView>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </Container>
      </section>

      {/* 04 / FORMATTING */}
      <section id="formatting" className="bg-white py-16 text-black md:py-24">
        <Container>
          <SectionDivider index="04" label="FORMATTING" />

          <div className="max-w-3xl">
            <FadeInView>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                Suggested structure
              </h2>
              <p className="mt-5 text-base leading-7 text-grey-700">
                {FORMATTING_LEAD}
              </p>
            </FadeInView>
          </div>

          <StaggerContainer staggerDelay={0.07} className="mt-10 grid gap-4 lg:grid-cols-2">
            {formattingStructure.map((step, index) => (
              <FadeInView key={step.title}>
                <article className="flex h-full flex-col border border-grey-200 bg-white p-6 md:p-7">
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-mono text-sm text-aaimun"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-heading text-xl font-semibold text-grey-900">
                      {step.title}
                    </h3>
                    {step.required ? (
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-grey-500">
                        Required
                      </span>
                    ) : null}
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-base leading-7 text-grey-700"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-grey-400"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeInView>
            ))}
          </StaggerContainer>

          <FadeInView delay={0.1}>
            <div className="mt-10 flex flex-col gap-5 border border-grey-200 bg-grey-100 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="max-w-2xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-aaimun">
                  Example paper
                </p>
                <p className="mt-3 text-base leading-7 text-grey-700">
                  {EXAMPLE_PAPER_NOTE}
                </p>
              </div>
              <Button
                href={EXAMPLE_PAPER_URL}
                external
                size="lg"
                className="shrink-0 !rounded-none !bg-aaimun px-8 !text-white hover:!bg-aaimun-deep"
              >
                View example
              </Button>
            </div>
          </FadeInView>
        </Container>
      </section>

      {/* 05 / SUBMISSION & PRIORITY */}
      <section id="priority" className="bg-grey-100 py-16 text-black md:py-24">
        <Container>
          <SectionDivider index="05" label="SUBMISSION & PRIORITY" />

          <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-start">
            <FadeInView>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                Is a position paper compulsory?
              </h2>
            </FadeInView>
            <FadeInView delay={0.05}>
              <div className="max-w-2xl space-y-5 font-body text-lg leading-8 text-grey-700">
                {compulsoryParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </FadeInView>
          </div>

          <FadeInView delay={0.1}>
            <div className="mt-12 border border-aaimun/35 bg-aaimun/5 p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-aaimun">
                    Priority deadline
                  </p>
                  <p className="mt-4 font-heading text-3xl font-semibold leading-tight text-grey-900 md:text-4xl">
                    {PAPER_DEADLINE}
                  </p>
                  <p className="mt-3 text-base leading-7 text-grey-700">
                    The priority deadline for country matrix preference. Submit a
                    well-written paper by this date through MUNOS to receive
                    priority country selection.
                  </p>
                </div>
                <Button
                  href={MYMUN_URL}
                  external
                  showExternalIcon={false}
                  size="lg"
                  className="!rounded-none !bg-aaimun px-10 !text-white hover:!bg-aaimun-deep"
                >
                  Register on MyMUN
                </Button>
              </div>
            </div>
          </FadeInView>
        </Container>
      </section>

      <NewsletterSignup source="web/aaimun" variant="light" />
    </>
  );
}
