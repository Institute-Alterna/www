import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

export default function MissionTeaser() {
  return (
    <Section variant="grey">
      <div className="mx-auto max-w-2xl text-center">
        <Heading level="h2">Mission Serenity</Heading>
        <Text variant="muted" className="mt-4">
          We believe that everyone, regardless of background, deserves access
          to world-class technology education. Through our programmes, we
          create resources, impact learning journeys, and advocate for change.
        </Text>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/about" variant="primary">
            Our Mission
          </Button>
          <Button href="/volunteer" variant="secondary">
            Volunteer
          </Button>
        </div>
      </div>
    </Section>
  );
}
