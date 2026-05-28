import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeStrip } from "@/components/ui/MarqueeStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { DirectionsSection } from "@/components/sections/DirectionsSection";
import { TeachersSection } from "@/components/sections/TeachersSection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TrialFormSection } from "@/components/sections/TrialFormSection";
import { ContactsSection } from "@/components/sections/ContactsSection";

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <DirectionsSection />
      <MarqueeStrip reverse dark />
      <TeachersSection />
      <ScheduleSection />
      <PricingSection />
      <TestimonialsSection />
      <GallerySection />
      <TrialFormSection />
      <ContactsSection />
      <Footer />
    </main>
  );
}
