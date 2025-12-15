import { Hero } from "@/components/Hero";
import { TrustSignalBar } from "@/components/TrustSignalBar";
import { ProblemSection } from "@/components/ProblemSection";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { UseCases } from "@/components/UseCases";
import { DeveloperSection } from "@/components/DeveloperSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-teal/30 selection:text-white font-sans">
      <Hero />
      <TrustSignalBar />
      <ProblemSection />
      <HowItWorks />
      <FeaturesGrid />
      <UseCases />
      <DeveloperSection />

      {/* Short Pricing Tease before Footer (optional, or remove if Footer CTA covers it) */}

      <Footer />
    </main>
  );
}
