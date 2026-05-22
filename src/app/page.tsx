import AAIMUNCampaignHero from "@/components/sections/AAIMUNCampaignHero";
import ProgrammeShowcase from "@/components/sections/ProgrammeShowcase";
import Impact from "@/components/sections/Impact";
import MissionTeaser from "@/components/sections/MissionTeaser";
import NewsletterSignup from "@/components/sections/NewsletterSignup";

export default function HomePage() {
  return (
    <>
      <AAIMUNCampaignHero />
      <ProgrammeShowcase />
      <Impact />
      <MissionTeaser />
      <NewsletterSignup source="web/landing" variant="grey" />
    </>
  );
}
