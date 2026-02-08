import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Badge from "@/components/ui/Badge";
import { teamMembers } from "@/lib/data/content";

export default function TeamSection() {
  return (
    <Section id="team">
      <Heading level="h2">Our team</Heading>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <div key={member.name}>
            <h3 className="font-heading text-lg font-semibold">
              {member.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-accent">
              {member.role}
            </p>
            <Badge className="mt-2">{member.location}</Badge>
          </div>
        ))}
      </div>
    </Section>
  );
}
