import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TechShowcase from "@/components/TechShowcase"; // 👈 New Import
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-bg selection:bg-brand-blue/10 selection:text-brand-blue">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <TechShowcase /> {/* 👈 Added right in the layout sequence */}
      <WhyChooseUs />
      
      {/* Lead forms coming up next */}
      <div className="h-24 bg-white flex items-center justify-center text-brand-text text-xs font-semibold tracking-widest uppercase border-b border-slate-100">
        --- Upcoming Phase: Dynamic Lead Capture Forms & Database Pipeline ---
      </div>

      <Footer />
    </main>
  );
}