import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";

export default function ProgrammeHighlights() {
  return (
    <Section variant="grey">
      <Heading level="h2">Programme highlights</Heading>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div id="learning" className="rounded-lg border border-grey-200 bg-white p-6">
          <h3 className="font-heading text-xl font-semibold">
            Learning Platform
          </h3>
          <Text variant="muted" className="mt-3">
            A comprehensive library of computer science resources designed for
            learners of all ages and skill levels. From introductory concepts
            to advanced topics, our platform makes quality education
            accessible to everyone.
          </Text>
        </div>

        <div id="workshops" className="rounded-lg border border-grey-200 bg-white p-6">
          <h3 className="font-heading text-xl font-semibold">Workshops</h3>
          <Text variant="muted" className="mt-3">
            Interactive sessions and events designed to bridge the gap between
            theory and practice. Our workshops bring technology education
            directly to communities, creating hands-on learning experiences
            that inspire and empower.
          </Text>
        </div>
      </div>
    </Section>
  );
}
