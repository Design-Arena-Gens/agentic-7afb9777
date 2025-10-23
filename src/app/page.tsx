import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { TechnologyStrip } from "@/components/sections/TechnologyStrip";
import { CallToAction } from "@/components/sections/CallToAction";
import { ImportSection } from "@/components/sections/ImportSection";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col gap-16 pb-32">
      <HeroSection />
      <FeatureShowcase />
      <ImportSection />
      <TechnologyStrip />
      <CallToAction />
    </main>
  );
}
