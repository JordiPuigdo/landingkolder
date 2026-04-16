import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AboutKolder } from "@/components/sections/AboutKolder";
import { DetailedPoints } from "@/components/sections/DetailedPoints";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero — título, vídeo y formulario WhatsApp */}
        <Hero />

        {/* 2. Sobre Kölder — empresa, fotos y CTA WhatsApp */}
        <AboutKolder />

        {/* 3. Puntos detallados — contenido del díptico */}
        <DetailedPoints />

        {/* 4. FAQs — preguntas frecuentes + FAQPage schema */}
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
