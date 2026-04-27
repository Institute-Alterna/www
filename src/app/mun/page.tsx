import type { Metadata } from "next";
import AAIMUNCampaignHero from "@/components/sections/AAIMUNCampaignHero";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FadeInView from "@/components/ui/FadeInView";

export const metadata: Metadata = {
  title: "AAIMUN 2026",
  description:
    "AAIMUN 2026 is a fully online Model United Nations conference centred on artificial intelligence policy, opening UNx Season 2 in partnership with Futures Summit Alliance.",
};

const conferenceFacts = [
  { label: "Format", value: "Online only" },
  { label: "Date", value: "Late July 2026" },
  { label: "Position", value: "First UNx Conference of Season 2" },
  { label: "Registration", value: "Free delegate registration" },
];

const delegateExpectations = [
  {
    title: "AI policy debate",
    description:
      "Debate urgent questions around artificial intelligence, governance, rights, security, and global co-operation.",
  },
  {
    title: "Online committee rooms",
    description:
      "Join structured committee sessions built for focused debate, accessible participation, and international attendance.",
  },
  {
    title: "Founding delegate recognition",
    description:
      "Delegates will be recognised as part of the founding group opening UNx Season 2.",
  },
  {
    title: "Awards and certificates",
    description:
      "Recognition details, certificates, and delegate materials will be revealed closer to the conference.",
  },
];

const committees = [
  {
    name: "Economic and Social Council",
    shortName: "ECOSOC",
    focus: "Development, economic recovery, humanitarian affairs, and global systems.",
  },
  {
    name: "General Assembly",
    shortName: "GA",
    focus: "A broad deliberative space for international peace, security, and development.",
  },
  {
    name: "Human Rights Committee",
    shortName: "HRC",
    focus: "Digital rights, surveillance, and the human impact of emerging technology.",
  },
  {
    name: "Security Council",
    shortName: "SC",
    focus: "High-stakes debate on international peace, security, and crisis response.",
  },
];

const statusItems = [
  "Committee topics forthcoming",
  "Study guides forthcoming",
  "Speaker details forthcoming",
  "Final schedule forthcoming",
];

export default function AAIMUNPage() {
  return (
    <>
      <AAIMUNCampaignHero variant="page" />

      <section id="conference" className="bg-white py-16 text-black md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
            <FadeInView>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#007C91]">
                Initial announcement
              </p>
              <h2 className="mt-5 max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-6xl">
                AAIMUN 2026 opens UNx Season 2
              </h2>
            </FadeInView>
            <FadeInView delay={0.1}>
              <p className="font-body text-lg leading-8 text-grey-600 md:text-xl md:leading-9">
                AAIMUN 2026 is a fully online, Alterna-organised Model United
                Nations conference delivered in partnership with Futures Summit
                Alliance. The conference returns in late July 2026 with a
                delegate experience centred on artificial intelligence and
                global policy.
              </p>
            </FadeInView>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden bg-grey-200 md:grid-cols-4">
            {conferenceFacts.map((fact) => (
              <FadeInView key={fact.label}>
                <div className="min-h-36 bg-white p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-grey-500">
                    {fact.label}
                  </p>
                  <p className="mt-5 font-heading text-2xl font-semibold text-black">
                    {fact.value}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#071820] py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,124,145,0.24),transparent_36%),radial-gradient(circle_at_80%_10%,rgba(241,90,41,0.12),transparent_28%)]" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)]">
            <FadeInView>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#7fd7df]">
                Delegate brief
              </p>
              <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight md:text-5xl">
                What to expect
              </h2>
              <p className="mt-5 text-base leading-7 text-white/62">
                This is the first reveal. More details will be released as
                conference preparation closes in.
              </p>
            </FadeInView>

            <div className="grid gap-4 md:grid-cols-2">
              {delegateExpectations.map((item, index) => (
                <FadeInView key={item.title} delay={index * 0.04}>
                  <article className="min-h-56 border border-white/12 bg-white/[0.035] p-6 backdrop-blur">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-8 font-heading text-2xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/62">
                      {item.description}
                    </p>
                  </article>
                </FadeInView>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f7f8f8] py-16 text-black md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <FadeInView>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#007C91]">
                Committees
              </p>
              <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight md:text-5xl">
                Four core rooms, one shared question
              </h2>
              <p className="mt-5 text-base leading-7 text-grey-600">
                How should international institutions respond when artificial
                intelligence changes the pace, texture, and risk of global
                decision-making?
              </p>
            </FadeInView>

            <div className="grid gap-4 md:grid-cols-2">
              {committees.map((committee) => (
                <FadeInView key={committee.shortName}>
                  <article className="min-h-60 border border-grey-200 bg-white p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0B3C5D]">
                      {committee.shortName}
                    </p>
                    <h3 className="mt-6 font-heading text-2xl font-semibold">
                      {committee.name}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-grey-600">
                      {committee.focus}
                    </p>
                  </article>
                </FadeInView>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-4">
            {statusItems.map((item) => (
              <FadeInView key={item}>
                <div className="border border-grey-200 bg-white px-4 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-grey-500">
                  {item}
                </div>
              </FadeInView>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 text-black md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <FadeInView>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#007C91]">
                Partnership
              </p>
              <h2 className="mt-5 max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
                Built by Alterna with Futures Summit Alliance
              </h2>
              <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-grey-600 md:text-lg">
                <p>
                  Futures Summit Alliance leads student outreach and supports
                  registration for the conference, helping connect AAIMUN with
                  delegates across the international Model UN community.
                </p>
                <p>
                  Alterna organises the conference experience and technical
                  infrastructure, keeping the focus on strong debate, clear
                  preparation, and a polished online event.
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={0.1}>
              <div className="border border-grey-200 bg-[#0B3C5D] p-6 text-white">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Co-branded announcement
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 min-w-40 items-center justify-center bg-[#0B66D8] px-5">
                    <span className="font-heading text-base font-bold tracking-[0.2em]">
                      AAIMUN
                    </span>
                  </div>
                  <div className="h-12 w-12 bg-[#F15A29]" aria-hidden="true" />
                </div>
                <p className="mt-8 text-sm leading-7 text-white/65">
                  Public assets will use official partner brand files once the
                  final launch kit is published.
                </p>
              </div>
            </FadeInView>
          </div>
        </Container>
      </section>

      <section className="bg-black py-16 text-white md:py-24">
        <Container>
          <FadeInView className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#7fd7df]">
              Registration opens through MyMUN
            </p>
            <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Secure your place in the first conference of the season
            </h2>
            <p className="mt-5 text-base leading-8 text-white/65 md:text-lg">
              Delegate registration is free. The official listing is coming
              soon, with more details to follow for committees, preparation,
              awards, and the conference schedule.
            </p>
            <div className="mt-9 flex justify-center">
              <Button
                href="https://duckduckgo.com"
                external
                size="lg"
                className="!rounded-none !bg-[#F15A29] px-8 !text-black hover:!bg-white"
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
