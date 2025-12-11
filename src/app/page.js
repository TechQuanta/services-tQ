// app/page.jsx (FINAL FIX for Drawer Integration)
"use client";

import React, { useState } from "react";
// 🚨 Import the Meet component (your drawer)
import Meet from "./components/ui/Meet"; 
import Navbar from "./components/ui/Navbar";
import AboutSection from "./components/section/AboutSection";
import ServiceSection from "./components/section/ServiceSection";
import TestimonialsSection from "./components/section/TestimonialSection";
import Footer from "./components/ui/Footer";
import Chatbot from "@/app/components/ui/AiAssist";

import { DotPattern } from "../../src/components/ui/dot-pattern";
import { Spotlight } from "../../src/components/ui/spotlight";
import Hero from "./components/ui/Hero";

// We remove the local isChatOpen state as Meet handles it now.
export default function Page() {

  return (
    // 🚨 1. WRAP THE ENTIRE PAGE CONTENT WITH THE SINGLE <Meet> COMPONENT 🚨
    <Meet>
      {({ isChatOpen, openChat, closeChat, DESKTOP_DRAWER_WIDTH, MEETING_SLUGS }) => (
        <>
          {/* 2. RENDER NAVBAR OUTSIDE THE SHIFTING CONTENT */}
          {/* Pass ALL necessary drawer control props to Navbar */}
          <Navbar 
            isChatOpen={isChatOpen}
            openChat={openChat}
            closeChat={closeChat}
            DESKTOP_DRAWER_WIDTH={DESKTOP_DRAWER_WIDTH}
            MEETING_SLUGS={MEETING_SLUGS}
          />

          {/* 3. SHIFTING CONTENT WRAPPER */}
          {/* This div uses the global CSS class defined in Meet.jsx for content shifting */}
          <div className="page-wrapper-for-content-shift">
            
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
                {/* 4. Pass ONLY the needed drawer control props to Hero */}
                <Hero
                  openChat={openChat}
                  MEETING_SLUGS={MEETING_SLUGS}
                />
              </section>
            </main>

            {/* Other sections — now inside the shifting wrapper */}
            <div className="w-full flex flex-col items-center justify-center text-center px-4">
              <AboutSection />
              <ServiceSection />
              <TestimonialsSection isPreview={true} />
              <Footer />
            </div>

            {/* Chatbot should also be within the shifting content if it's not fixed */}
            <Chatbot />
          </div>
        </>
      )}
    </Meet>
  );
}