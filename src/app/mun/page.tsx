import type { Metadata } from "next";
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
  { label: "Where", value: "All-Online" },
  { label: "When", value: "Late July 2026" },
  { label: "Who", value: "All skill levels" },
  { label: "Registration", value: "Free for all" },
];

const delegateExpectations = [
  {
    title: "AI policy debate",
    description:
      "Engage with urgent questions around artificial intelligence, governance, rights, security, and international co-operation.",
  },
  {
    title: "UNx-ready",
    description:
      "Delegates are able to participate in UNx, a competitive MUN circuit with opportunities for recognition and advancement across participating events.",
  },
  {
    title: "Delegate recognition",
    description:
      "Delegates join as UNx Season 2 Founding Delegates, with certificates, awards, and digital badges from Alterna and FSA.",
  },
  {
    title: "Online committee rooms",
    description:
      "Structured committee sessions built for focused debate, accessible participation, and international attendance.",
  },
];

const committees = [
  {
    name: "General Assembly",
    shortName: "GA",
    focus:
      "A broad deliberative space for discussion on sustainable development and international wellness.",
  },
  {
    name: "Economic and Social Council",
    shortName: "ECOSOC",
    focus:
      "Economic development, humanitarian affairs, and the international systems that govern them.",
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
      "High-stakes fast-paced committee centred in international peace and urgent crisis response will prove to be a challenge even to the most veteran delegates.",
  },
];

const statusItems = [
  "Committee topics forthcoming",
  "Study guides forthcoming",
  "Speaker details forthcoming",
  "Full schedule forthcoming",
];

const platformSignals = [
  "Delegate Connectivity",
  "Committee Operations",
  "Resolution Submission",
  "Crisis Simulations",
  "Cryptographic Identity Layer",
  "Smart Embedded Routing",
];

type PointBand = {
  award: string;
  points: string;
};

// Add future UNx point categories here.
const pointBands: PointBand[] = [
  { award: "Best Delegate", points: "5 points" },
  { award: "Outstanding Delegate", points: "3 points" },
  { award: "Honourable Mention", points: "2 points" },
  { award: "All participants", points: "1 point" },
];

type TerminalSegment =
  | { text: string; redactedText?: never; redactionLabel?: never }
  | { text?: never; redactedText: string; redactionLabel: string };

type TerminalLog = {
  time: string;
  segments: TerminalSegment[];
};

function isRedactedSegment(
  segment: TerminalSegment,
): segment is Extract<TerminalSegment, { redactedText: string }> {
  return segment.redactedText !== undefined;
}

// Add future terminal logs here. Redacted strings remain editable in source.
const terminalLogs: TerminalLog[] = [
  {
    time: "14:06:48.789",
    segments: [
      { text: "logged in to " },
      { redactedText: "munos", redactionLabel: "redacted label" },
      {
        text: "as ",
      },
      { redactedText: "a curious mind", redactionLabel: "redacted label" },
      { text: " (maximum clearance / inference floor)" },
    ],
  },
  {
    time: "14:07:18.042",
    segments: [
      { text: "$ " },
      { redactedText: "aaimun", redactionLabel: "redacted command" },
      {
        text: " --simulate-resolution --load-",
      },
      { redactedText: "artefacts", redactionLabel: "redacted flag" },
      { text: " --unsafe true" },
    ],
  },
  {
    time: "14:07:18.219",
    segments: [{ text: "loading committee context... ok" }],
  },
  {
    time: "14:07:18.892",
    segments: [
      { text: "starting " },
      { redactedText: "crisis", redactionLabel: "redacted label" },
      { text: " engine... ready on port 3588" },
    ],
  },
  {
    time: "14:07:19.054",
    segments: [
      { text: "query: " },
      {
        redactedText: "can an AI draft policy without",
        redactionLabel: "redacted query",
      },
      { text: " inheriting power?" },
    ],
  },
  {
    time: "14:07:20.336",
    segments: [
      { text: "risk vector: " },
      { redactedText: "delegation", redactionLabel: "redacted risk" },
      { text: ", bias, " },
      { redactedText: "speed", redactionLabel: "redacted risk" },
      { text: ", accountability" },
    ],
  },
  {
    time: "14:07:21.118",
    segments: [
      { text: "chair advisory: " },
      {
        redactedText: "human judgement required",
        redactionLabel: "redacted advisory",
      },
    ],
  },
  {
    time: "14:07:22.903",
    segments: [
      { text: "status: " },
      { redactedText: "challenge packet", redactionLabel: "redacted packet" },
      { text: " awaiting release" },
    ],
  },
];

const MYMUN_URL = "https://duckduckgo.com";

function InlineRedaction({
  label,
  text,
  tone = "light",
}: {
  label: string;
  text: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={
        tone === "dark"
          ? "inline-block h-[0.85em] select-none bg-black align-middle"
          : "inline-block h-[0.85em] select-none bg-white align-middle"
      }
      style={{ width: `${text.length}ch` }}
      aria-label={label}
    />
  );
}

function TerminalLine({ log }: { log: TerminalLog }) {
  return (
    <li className="grid grid-cols-[8rem_1fr] gap-5">
      <span className="text-white/30" aria-hidden="true">
        {log.time}
      </span>
      <span>
        {log.segments.map((segment, index) =>
          isRedactedSegment(segment) ? (
            <InlineRedaction
              key={`${log.time}-redaction-${index}`}
              label={segment.redactionLabel}
              text={segment.redactedText}
            />
          ) : (
            <span key={`${log.time}-text-${index}`}>{segment.text}</span>
          ),
        )}
      </span>
    </li>
  );
}

function RedactionBars({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-2" aria-label="unreleased details redacted">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={`redaction-${index}`}
          className="block h-3 bg-white"
          style={{ width: `${[86, 68, 78, 52, 92][index % 5]}%` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function AAIMUNPage() {
  return (
    <>
      <MunProgressRail />
      <StickyRegisterCta />

      <AAIMUNCampaignHero variant="page" />

      {/* Sentinel: triggers sticky CTA once hero leaves viewport */}
      <div id="hero-sentinel" aria-hidden="true" />

      {/* 01 / CONFERENCE */}
      <section
        id="conference"
        className="grain-overlay bg-[#050809] py-16 text-white md:py-24"
      >
        <Container>
          <SectionDivider index="01" label="CONFERENCE" />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
            <FadeInView>
              <h2 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-6xl">
                AAIMUN 2026 starts the second UNx season circuit
              </h2>
            </FadeInView>
            <FadeInView delay={0.1}>
              <p className="font-body text-lg leading-8 text-white/70 md:text-xl md:leading-9 lg:pr-10">
                AAIMUN 2026 is the world&apos;s first Model United Nations
                conference to place AI at the center of international policy
                discussions. This fully online MUN is delivered in partnership
                with Futures Summit Alliance, returning in late July 2026 as the
                opening event of UNx Season 2.
              </p>
            </FadeInView>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden bg-white/10 md:grid-cols-4">
            {conferenceFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex min-h-40 h-full flex-col justify-between bg-[#0b1113] p-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {fact.label}
                </p>
                <p className="mt-5 max-w-[12rem] font-heading text-2xl font-semibold leading-tight text-white">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 02 / DELEGATE BRIEF */}
      <section id="brief" className="bg-[#071215] py-16 text-white md:py-24">
        <Container>
          <SectionDivider index="02" label="DELEGATE BRIEF" />

          <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)]">
            <FadeInView>
              <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
                What to expect
              </h2>
              <p className="mt-5 text-base leading-7 text-white/65">
                More details will be released as the conference moves through
                platform testing, outreach, and committee preparation.
              </p>
            </FadeInView>

            <StaggerContainer
              staggerDelay={0.08}
              className="grid gap-4 md:grid-cols-2"
            >
              {delegateExpectations.map((item, index) => (
                <FadeInView key={item.title}>
                  <article className="min-h-52 border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-aaimun/55">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-aaimun"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-7 font-heading text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/62">
                      {item.description}
                    </p>
                  </article>
                </FadeInView>
              ))}
            </StaggerContainer>
          </div>

          <FadeInView delay={0.1}>
            <div className="mt-12 border border-aaimun/35 bg-aaimun/10 p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-aaimun">
                    UNx Points System
                  </p>
                  <h3 className="mt-4 font-heading text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Founding delegates earn Season 2 recognition
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                    AAIMUN 2026 is the first UNx conference of Season 2.
                    Participation, awards, certificates, and digital badges are
                    part of the recognition layer shared by Alterna and FSA.
                  </p>
                </div>
                <div className="grid gap-px overflow-hidden bg-white/10 sm:grid-cols-2">
                  {pointBands.map((band) => (
                    <div key={band.award} className="bg-[#091317] px-5 py-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                        {band.award}
                      </p>
                      <p className="mt-3 font-heading text-2xl font-semibold text-white">
                        {band.points}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInView>
        </Container>
      </section>

      {/* 03 / COMMITTEES */}
      <section
        id="committees"
        className="bg-[#040607] py-16 text-white md:py-24"
      >
        <Container>
          <SectionDivider index="03" label="COMMITTEES" />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <FadeInView>
              <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
                Four rooms, one shared component
              </h2>
              <p className="mt-5 text-base leading-7 text-white/65">
                AAIMUN 2026 features four committee rooms, each with a unique
                focus and set of challenges.
              </p>
            </FadeInView>

            <StaggerContainer
              staggerDelay={0.07}
              className="grid gap-4 md:grid-cols-2"
            >
              {committees.map((committee) => (
                <FadeInView key={committee.shortName}>
                  <article className="relative min-h-56 overflow-hidden border border-white/10 bg-white/[0.04] p-6 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-aaimun">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-aaimun">
                      {committee.shortName}
                    </p>
                    <h3 className="mt-5 font-heading text-xl font-semibold text-white">
                      {committee.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/62">
                      {committee.focus}
                    </p>
                  </article>
                </FadeInView>
              ))}
            </StaggerContainer>
          </div>

          <FadeInView delay={0.1}>
            <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
              {statusItems.map((item) => (
                <p
                  key={item}
                  className="bg-[#0a1012] px-4 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45"
                >
                  {item}
                </p>
              ))}
            </div>
          </FadeInView>
        </Container>
      </section>

      {/* 04 / PLATFORM */}
      <section id="platform" className="bg-[#071215] py-16 text-white md:py-24">
        <Container>
          <SectionDivider index="04" label="PLATFORM" />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <FadeInView>
              <h2 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
                A MUN experience like you&apos;ve never seen before
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
                Registration discovery may begin on MyMUN, but the conference
                experience is centred on next-generation technologies that
                attendees will not find anywhere else.
              </p>
            </FadeInView>

            <FadeInView delay={0.1}>
              <div className="border border-white/10 bg-white/[0.04] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-aaimun">
                  {"■■■■■■ PLATFORM"}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {platformSignals.map((signal, index) => (
                    <div
                      key={signal}
                      className="border border-white/10 bg-[#050809] p-4"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                        {String(index + 1).padStart(2, "0")} / {signal}
                      </p>
                      <div className="mt-4">
                        <RedactionBars count={index % 2 === 0 ? 3 : 4} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInView>
          </div>
        </Container>
      </section>

      {/* 05 / PARTNERSHIP */}
      <section
        id="partnership"
        className="bg-[#050809] py-16 text-white md:py-24"
      >
        <Container>
          <SectionDivider index="05" label="PARTNERSHIP" />

          <FadeInView>
            <h2 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Alterna and Futures Summit Alliance
            </h2>
            <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-white/65 md:text-lg">
              <p>
                Futures Summit Alliance connecting AAIMUN with the broader
                international Model UN community, while enabling attendees to be
                part of a larger competitive circuit through UNx.
              </p>
              <p>
                Alterna organises the conference experience, academic
                programme, and technical infrastructure, keeping the focus on
                rigorous debate, thorough preparation, and a polished online
                event.
              </p>
            </div>
          </FadeInView>
        </Container>
      </section>

      {/* 06 / REGISTER */}
      <section id="register" className="bg-[#071215] py-16 text-white md:py-24">
        <Container>
          <FadeInView className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Secure your place in the first conference of the season
            </h2>
            <p className="mt-5 text-base leading-8 text-white/65 md:text-lg">
              Delegate registration is free through MyMIN. From there, you can view committee assignments, and receive updates as the conference approaches.
            </p>
            <div className="mt-9 flex justify-center">
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
          </FadeInView>
        </Container>
      </section>

      <NewsletterSignup source="web/aaimun" variant="dark" />

      <section
        aria-label="AAIMUN challenge teaser"
        className="bg-[#030506] py-16 text-white md:py-24"
      >
        <Container>
          <FadeInView>
            <div className="mx-auto max-w-4xl border border-white/10 bg-black p-5 font-mono text-[11px] leading-7 text-white/60 md:p-7">
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <p className="uppercase tracking-[0.22em] text-white/45">
                  <InlineRedaction label="redacted system" text="Embassy" />{" "}
                  simulation trace
                </p>
                <p className="uppercase tracking-[0.22em] text-aaimun">
                  Awaiting{" "}
                  <InlineRedaction
                    label="redacted unlock state"
                    text="unlock"
                  />
                </p>
              </div>
              <ol
                className="space-y-1"
                aria-label="terminal output with timestamps"
              >
                {terminalLogs.map((log) => (
                  <TerminalLine key={log.time} log={log} />
                ))}
              </ol>
            </div>
          </FadeInView>
        </Container>
      </section>
    </>
  );
}
