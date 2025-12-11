"use client";

import React, { useState } from "react";
import Navbar from "./components/ui/Navbar";
 // <-- NEW COMPONENT
import AboutSection from "./components/section/AboutSection";
import ServiceSection from "./components/section/ServiceSection";
import TestimonialsSection from "./components/section/TestimonialSection";
import Footer from "./components/ui/Footer";
import Chatbot from "@/app/components/ui/AiAssist";

import { DotPattern } from "../../src/components/ui/dot-pattern";
import { Spotlight } from "../../src/components/ui/spotlight";
import Hero from "./components/ui/Hero";
import TechStackSection from "./components/section/TechStack";

export default function Page() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Navbar />

      {/* GLOBAL CENTERED LAYOUT */}
      <main
        className="
          relative min-h-screen w-full 
          flex flex-col items-center justify-center
          text-center
          overflow-hidden
        "
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <DotPattern className="h-full w-full opacity-40" />
        </div>

        {/* Spotlight */}
        <Spotlight
          className="-top-40 left-1/2 -translate-x-1/2 md:-top-20"
          fill="white"
        />

        {/* HERO SECTION */}
        <section className="w-full flex flex-col items-center justify-center px-4">
          <Hero/>
        </section>
      </main>

      {/* Other sections — now automatically centered because each gets mx-auto + text-center */}
      <div className="w-full flex flex-col items-center justify-center text-center px-4">
        <AboutSection />
        <TechStackSection/>
        <ServiceSection />
        <TestimonialsSection isPreview={true} />
        <Footer />
      </div>

      <Chatbot />
    </>
  );
}