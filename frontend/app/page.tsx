import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TechShowcase from "@/components/TechShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProjectGallery from "@/components/ProjectGallery";
import TeamDirectory from "@/components/TeamDirectory";
import TestimonialSlider from "@/components/TestimonialSlider";

import LeadCaptureForm from "@/components/LeadCaptureForm";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Workflow from "@/components/Workflow";
import FAQSection from "@/components/FAQSection";
import AIChatBot from "@/components/AIChatBot";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-bg selection:bg-brand-blue/10 selection:text-brand-blue flex flex-col items-center justify-start w-full overflow-x-hidden">
      {/* 1. Navigation Header */}
      <Navbar />

      {/* 2. Brand Awakenings (Phase 1 & 2) */}
      <Hero />
      <About />
      <Services />
      <TechShowcase />
      <WhyChooseUs />

      {/* 3. Data-Driven Evidence Slices (Phase 3, 4 & 5) */}
      <ProjectGallery />
      <TeamDirectory />
      <TestimonialSlider />

      {/* 4. Interactive Conversion Slices (Phase 7 & 8) */}

      <LeadCaptureForm />
      <Workflow />
      <FAQSection />

      {/* 5. Direct General Communications (Phase 6) */}
      <ContactForm />
      <AIChatBot />

      {/* 6. Global Footers (ONLY ONE) */}
      <Footer />
    </main>
  );
}