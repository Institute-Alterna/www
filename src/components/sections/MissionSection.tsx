import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Badge from "@/components/ui/Badge";
import Text from "@/components/ui/Text";
import { missionPillars } from "@/lib/data/content";

export default function MissionSection() {
  return (
    <Section>
      <Badge variant="accent">Mission Serenity</Badge>
      <Heading level="h2" className="mt-4">
        Our mission
      </Heading>
      <Text variant="muted" className="mt-4">
        Like the lotus flower that rises through murky waters to bloom in
        clarity, we believe transformative learning can emerge from any
        circumstance. Our mission rests on three pillars.
      </Text>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {missionPillars.map((pillar) => (
          <div key={pillar.number} className="rounded-lg border border-grey-200 p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 font-heading text-lg font-bold text-accent">
              {pillar.number}
            </span>
            <h3 className="mt-4 font-heading text-lg font-semibold">
              {pillar.title}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-grey-600">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
