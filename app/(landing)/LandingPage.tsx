import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";

export const LandingPage = () => {
  return (
    <div className="w-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );

};

