import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import MissionSection from "@/components/sections/MissionSection";
import ValuesGrid from "@/components/sections/ValuesGrid";
import TeamSection from "@/components/sections/TeamSection";
import ProgrammeHighlights from "@/components/sections/ProgrammeHighlights";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Institute Alterna's mission, values, and the team behind our programmes.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        headline="About Institute Alterna"
        subheadline="A fiscally sponsored 501(c)(3) nonprofit on a mission to create world-class computer science resources for people of all ages, backgrounds, and circumstances."
        variant="compact"
      />
      <MissionSection />
      <ValuesGrid />
      <TeamSection />
      <ProgrammeHighlights />
    </>
  );
}
