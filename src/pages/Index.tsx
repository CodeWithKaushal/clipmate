import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { WhyBuilt } from "@/components/WhyBuilt";
import { Waitlist } from "@/components/Waitlist";
import { PrivacySection } from "@/components/PrivacySection";
import { Footer } from "@/components/Footer";

const Divider = () => <div className="border-t border-border/40" aria-hidden />;

const Index = () => {
  useScrollAnimation();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="absolute left-[-9999px] top-4 z-[100] rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground outline-none focus:left-4 focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Divider />
        <Features />
        <Divider />
        <HowItWorks />
        <Divider />
        <CategoryShowcase />
        <WhyBuilt />
        <Divider />
        <Waitlist />
        <PrivacySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
