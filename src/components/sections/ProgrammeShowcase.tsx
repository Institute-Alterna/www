import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Badge from "@/components/ui/Badge";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { programmes } from "@/lib/data/content";

export default function ProgrammeShowcase() {
  return (
    <Section id="programmes">
      <Badge variant="accent">Our Programmes</Badge>
      <Heading level="h2" className="mt-4">
        Building the future of learning
      </Heading>
      <Text variant="muted" className="mt-4">
        From AI-centred Model United Nations to hyper-local tech education,
        our programmes serve learners at every level.
      </Text>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {programmes.map((programme) => (
          <div
            key={programme.name}
            className="group rounded-lg border border-grey-200 p-6 transition-colors hover:border-accent/40"
          >
            <h3 className="font-heading text-xl font-semibold">
              {programme.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-accent">
              {programme.tagline}
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-grey-600">
              {programme.description}
            </p>
            <Button
              href={programme.href}
              variant="ghost"
              className="mt-4 text-sm"
              external={programme.external}
            >
              Learn more &rarr;
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}
