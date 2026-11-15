import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { About, LogoMarquee } from "@/components/Proof";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import Showcase from "@/components/Showcase";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Ribbon from "@/components/Ribbon";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { CursorGlow, MobileCTA } from "@/components/Chrome";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Preloader />
      <CursorGlow />
      <Navbar />
      <main id="main">
        <Hero />
        <LogoMarquee />
        <About />
        <Services />
        <BeforeAfter />
        <Showcase />
        <Benefits />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Ribbon />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
