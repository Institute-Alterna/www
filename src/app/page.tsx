import Hero from "@/components/sections/Hero";
import ProgrammeShowcase from "@/components/sections/ProgrammeShowcase";
import Impact from "@/components/sections/Impact";
import MissionTeaser from "@/components/sections/MissionTeaser";

export default function HomePage() {
  return (
    <>
      <Hero
        headline="Redefining learning for the next generation"
        subheadline="Institute Alterna is a fiscally sponsored 501(c)(3) non-profit developing computer science resources for people of all ages - from AI-centred Model United Nations to student-led chapters worldwide."
        ctas={[
          { label: "Explore Programmes", href: "#programmes", variant: "primary" },
          { label: "Volunteer", href: "/volunteer", variant: "secondary", className: "bg-white" },
        ]}
        variant="ascii-background"
        asciiTheme="code-flow"
      />
      <ProgrammeShowcase />
      <Impact />
      <MissionTeaser />
    </>
  );
}
