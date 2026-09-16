import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Ticker } from "@/components/site/ticker";
import { Segments } from "@/components/site/segments";
import { Products } from "@/components/site/products";
import { Process } from "@/components/site/process";
import { Conditions } from "@/components/site/conditions";
import { Rfq } from "@/components/site/rfq";
import { Partners } from "@/components/site/partners";
import { About } from "@/components/site/about";
import { Faq } from "@/components/site/faq";
import { Contacts } from "@/components/site/contacts";
import { Footer } from "@/components/site/footer";
import { LeadModal } from "@/components/site/lead-modal";
import { LegalModal } from "@/components/site/legal-modal";
import { StickyBar } from "@/components/site/sticky-bar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-[76px] sm:pb-0">
        <Hero />
        <Ticker />
        <Segments />
        <Products />
        <Process />
        <Conditions />
        <Rfq />
        <Partners />
        <About />
        <Faq />
        <Contacts />
      </main>
      <Footer />

      {/* Слои конверсии и юридических документов */}
      <LeadModal />
      <LegalModal />
      <StickyBar />
    </div>
  );
}
