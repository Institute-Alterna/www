import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import { coreValues } from "@/lib/data/content";

export default function ValuesGrid() {
  return (
    <Section variant="dark">
      <Heading level="h2" className="text-center">
        Our values
      </Heading>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {coreValues.map((value) => (
          <div key={value.title} className="rounded-lg bg-grey-900 p-6">
            <h3 className="font-heading text-lg font-semibold text-white">
              {value.title}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-grey-400">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
