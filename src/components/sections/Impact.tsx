import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import FadeInView from "@/components/ui/FadeInView";
import StaggerContainer from "@/components/ui/StaggerContainer";
import { impactStats } from "@/lib/data/content";

export default function Impact() {
  return (
    <Section variant="dark">
      <FadeInView>
        <Heading level="h2" className="text-center">
          Impact in numbers
        </Heading>
      </FadeInView>

      <StaggerContainer className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
        {impactStats.map((stat) => (
          <FadeInView key={stat.label}>
            <div className="text-center">
              <p className="font-heading text-4xl font-bold text-accent md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 font-body text-sm text-grey-400">
                {stat.label}
              </p>
            </div>
          </FadeInView>
        ))}
      </StaggerContainer>
    </Section>
  );
}
