import type { Metadata } from "next";
import { getPressReleases } from "@/sanity/client";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Badge from "@/components/ui/Badge";
import FadeInView from "@/components/ui/FadeInView";
import FeaturedRelease from "@/components/newsroom/FeaturedRelease";
import PressReleaseCard from "@/components/newsroom/PressReleaseCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "Press releases, announcements, and company news from Institute Alterna.",
};

export default async function NewsroomPage() {
  const releases = await getPressReleases();
  const featured = releases.find((release) => release.featured) ?? releases[0];
  const rest = featured
    ? releases.filter((release) => release._id !== featured._id)
    : [];

  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-32 pb-16 text-white md:pt-40 md:pb-24">
        <Container>
          <Badge variant="accent">Newsroom</Badge>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            News and announcements from Institute Alterna
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-grey-400">
            Official press releases, programme announcements, and company news —
            straight from the team building computer science opportunities for
            people of all ages.
          </p>
        </Container>
      </section>

      {releases.length === 0 ? (
        <Section>
          <div className="mx-auto max-w-xl py-12 text-center">
            <Heading level="h3">No releases yet</Heading>
            <Text variant="muted" className="mt-3">
              There are no press releases to show right now. Check back soon for
              the latest news from Institute Alterna.
            </Text>
          </div>
        </Section>
      ) : (
        <Section>
          {featured && (
            <FadeInView>
              <FeaturedRelease release={featured} />
            </FadeInView>
          )}

          {rest.length > 0 && (
            <div className="mt-20 md:mt-28">
              <div className="flex items-center gap-4">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-grey-500">
                  Latest
                </h2>
                <div className="h-px flex-1 bg-grey-200" />
              </div>
              <FadeInView className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((release) => (
                  <PressReleaseCard key={release._id} release={release} />
                ))}
              </FadeInView>
            </div>
          )}
        </Section>
      )}
    </>
  );
}
