import type { Metadata } from "next";
import Image from "next/image";
import AAIMUNCampaignHero from "@/components/sections/AAIMUNCampaignHero";
import MunProgressRail from "@/components/sections/MunProgressRail";
import StickyRegisterCta from "@/components/sections/StickyRegisterCta";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FadeInView from "@/components/ui/FadeInView";
import SectionDivider from "@/components/ui/SectionDivider";
import StaggerContainer from "@/components/ui/StaggerContainer";

export const metadata: Metadata = {
  title: "AAIMUN 2026",
  description:
    "AAIMUN 2026 is a fully online Model United Nations conference centred on artificial intelligence policy, opening UNx Season 2 in partnership with Futures Summit Alliance.",
};

const conferenceFacts = [
  { label: "Format", value: "Online only" },
  { label: "Date", value: "Late July 2026" },
  { label: "Position", value: "Opening UNx Season 2" },
  { label: "Registration", value: "Free for delegates" },
];

const delegateExpectations = [
  {
    title: "AI policy debate",
    description:
      "Engage with urgent questions around artificial intelligence, governance, rights, security, and international co-operation.",
  },
  {
    title: "Online committee rooms",
    description:
      "Structured committee sessions built for focused debate, accessible participation, and international attendance.",
  },
  {
    title: "Founding delegate recognition",
    description:
      "Delegates join as part of the founding group opening UNx Season 2 — the first cohort to shape the conference's standards.",
  },
  {
    title: "Awards and certificates",
    description:
      "Recognition details, delegate materials, and certificates will be confirmed closer to the conference.",
  },
];

const committees = [
  {
    name: "Economic and Social Council",
    shortName: "ECOSOC",
    focus:
      "Economic development, humanitarian affairs, and the international systems that govern them.",
  },
  {
    name: "General Assembly",
    shortName: "GA",
    focus:
      "A broad deliberative space for international peace, security, and sustainable development.",
  },
  {
    name: "Human Rights Committee",
    shortName: "HRC",
    focus:
      "Digital rights, algorithmic accountability, surveillance, and the human impact of emerging technology.",
  },
  {
    name: "Security Council",
    shortName: "SC",
    focus:
      "High-stakes debate on international peace, security, and urgent crisis response.",
  },
];

const statusItems = [
  "Committee topics forthcoming",
  "Study guides forthcoming",
  "Speaker details forthcoming",
  "Full schedule forthcoming",
];

const MYMUN_PLACEHOLDER_URL = "https://duckduckgo.com";

export default function AAIMUNPage() {
  return (
    <>
      <MunProgressRail />
      <StickyRegisterCta />

      <AAIMUNCampaignHero variant="page" />

      {/* Sentinel: triggers sticky CTA once hero leaves viewport */}
      <div id="hero-sentinel" aria-hidden="true" />

      {/* 01 / CONFERENCE */}
      <section id="conference" className="bg-white py-16 md:py-24">
        <Container>
          <SectionDivider index="01" label="CONFERENCE" />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
            <FadeInView>
              <h2 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-6xl">
                AAIMUN 2026 opens UNx Season 2
              </h2>
            </FadeInView>
            <FadeInView delay={0.1}>
              <p className="font-body text-lg leading-8 text-grey-600 md:text-xl md:leading-9">
                AAIMUN 2026 is a fully online, Alterna-organised Model United
                Nations conference delivered in partnership with Futures Summit
                Alliance. Returning in late July 2026, the conference centres on
                artificial intelligence and global policy — and opens the second
                season of the UNx competitive circuit.
              </p>
            </FadeInView>
          </div>

          <StaggerContainer
            staggerDelay={0.08}
            className="mt-12 grid gap-px overflow-hidden bg-grey-200 md:grid-cols-4"
          >
            {conferenceFacts.map((fact) => (
              <FadeInView key={fact.label}>
                <div className="min-h-36 bg-white p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-grey-400">
                    {fact.label}
                  </p>
                  <p className="mt-5 font-heading text-2xl font-semibold text-black">
                    {fact.value}
                  </p>
                </div>
              </FadeInView>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* 02 / DELEGATE BRIEF */}
      <section id="brief" className="bg-aaimun-soft py-16 md:py-24">
        <Container>
          <SectionDivider index="02" label="DELEGATE BRIEF" />

          <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)]">
            <FadeInView>
              <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
                What to expect
              </h2>
              <p className="mt-5 text-base leading-7 text-grey-600">
                This is the first reveal. More details will be released as
                conference preparation progresses.
              </p>
            </FadeInView>

            <StaggerContainer
              staggerDelay={0.08}
              className="grid gap-4 md:grid-cols-2"
            >
              {delegateExpectations.map((item, index) => (
                <FadeInView key={item.title}>
                  <article className="min-h-52 border border-aaimun/15 bg-white p-6 transition-shadow hover:shadow-md">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-aaimun"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-7 font-heading text-xl font-semibold text-black">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-grey-600">
                      {item.description}
                    </p>
                  </article>
                </FadeInView>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* 03 / COMMITTEES */}
      <section id="committees" className="bg-grey-100 py-16 md:py-24">
        <Container>
          <SectionDivider index="03" label="COMMITTEES" />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <FadeInView>
              <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
                Four rooms, one shared question
              </h2>
              <p className="mt-5 text-base leading-7 text-grey-600">
                How should international institutions respond when artificial
                intelligence changes the pace, texture, and risk of global
                decision-making?
              </p>
            </FadeInView>

            <StaggerContainer
              staggerDelay={0.07}
              className="grid gap-4 md:grid-cols-2"
            >
              {committees.map((committee) => (
                <FadeInView key={committee.shortName}>
                  <article className="relative min-h-56 overflow-hidden border border-grey-200 bg-white p-6 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-aaimun">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-aaimun-deep">
                      {committee.shortName}
                    </p>
                    <h3 className="mt-5 font-heading text-xl font-semibold text-black">
                      {committee.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-grey-600">
                      {committee.focus}
                    </p>
                  </article>
                </FadeInView>
              ))}
            </StaggerContainer>
          </div>

          <FadeInView delay={0.1}>
            <div className="mt-10 grid divide-x divide-aaimun/15 overflow-hidden border border-grey-200 bg-white md:grid-cols-4">
              {statusItems.map((item) => (
                <p
                  key={item}
                  className="px-4 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-grey-400"
                >
                  {item}
                </p>
              ))}
            </div>
          </FadeInView>
        </Container>
      </section>

      {/* 04 / PARTNERSHIP */}
      <section id="partnership" className="bg-white py-16 md:py-24">
        <Container>
          <SectionDivider index="04" label="PARTNERSHIP" />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <FadeInView>
              <h2 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
                Institute Alterna and Futures Summit Alliance
              </h2>
              <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-grey-600 md:text-lg">
                <p>
                  Futures Summit Alliance leads student outreach and supports
                  delegate registration, connecting AAIMUN with the broader
                  international Model UN community.
                </p>
                <p>
                  Institute Alterna organises the conference experience, academic
                  programme, and technical infrastructure — keeping the focus on
                  rigorous debate, thorough preparation, and a polished online
                  event.
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={0.1}>
              <div className="border border-aaimun/25 bg-white p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-grey-400">
                  Co-organised conference
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <Image
                    src="/mun/aaimun-wordmark.svg"
                    alt="AAIMUN"
                    width={126}
                    height={35}
                    className="h-8 w-auto"
                  />
                  <Image
                    src="/mun/fsa-badge.webp"
                    alt="Futures Summit Alliance"
                    width={48}
                    height={48}
                    className="h-10 w-10"
                  />
                </div>
                <p className="mt-7 text-sm leading-7 text-grey-500">
                  AAIMUN is designed and run by Institute Alterna, a fiscally
                  sponsored 501(c)(3) nonprofit, with Futures Summit Alliance as
                  the official outreach partner.
                </p>
              </div>
            </FadeInView>
          </div>
        </Container>
      </section>

      {/* 05 / REGISTER */}
      <section id="register" className="bg-aaimun-soft py-16 md:py-24">
        <Container>
          <SectionDivider index="05" label="REGISTER" />

          <FadeInView className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Secure your place in the first conference of the season
            </h2>
            <p className="mt-5 text-base leading-8 text-grey-600 md:text-lg">
              Delegate registration is free. The official listing is coming soon
              on MyMUN, with committee assignments, preparation guides, and the
              full schedule to follow.
            </p>
            <div className="mt-9 flex justify-center">
              <Button
                href={MYMUN_PLACEHOLDER_URL}
                external
                size="lg"
                className="!rounded-none !bg-aaimun px-10 !text-white hover:!bg-aaimun-deep"
              >
                Register on MyMUN
              </Button>
            </div>
          </FadeInView>
        </Container>
      </section>

      <NewsletterSignup source="web/aaimun" variant="grey" />
    </>
  );
}
