// app/page.jsx (FINAL FIX for Drawer Integration)
"use client";

import React from "react";
import Meet from "./components/ui/Meet"; 
import Navbar from "./components/ui/Navbar";
import AboutSection from "./components/section/AboutSection";
import ServiceSection from "./components/section/ServiceSection";
import TestimonialsSection from "./components/section/TestimonialSection";
import Footer from "./components/ui/Footer";
import Chatbot from "@/app/components/ui/AiAssist";
import TechStack from "./components/section/TechStack";

import { DotPattern } from "../../src/components/ui/dot-pattern";
import { Spotlight } from "../../src/components/ui/spotlight";
import Hero from "./components/ui/Hero";

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
                    <div className="page-wrapper-for-content-shift">
                        
                        <main
                            className="
                                relative min-h-screen w-full 
                                flex flex-col items-center justify-center
                                text-center
                                overflow-hidden
                            "
                        >
                            {/* Background Pattern and Spotlight */}
                            <div className="absolute inset-0 flex items-center justify-center -z-10">
                                <DotPattern className="h-full w-full opacity-40" />
                            </div>

                            <Spotlight
                                className="-top-40 left-1/2 -translate-x-1/2 md:-top-20"
                                fill="white"
                            />

                            {/* HERO SECTION */}
                            <section className="w-full flex flex-col items-center justify-center px-4">
                                {/* 4. Pass the required drawer control props to Hero */}
                                <Hero
                                    openChat={openChat}
                                    MEETING_SLUGS={MEETING_SLUGS} // CRUCIAL: Pass the slugs
                                />
                            </section>
                        </main>

                        {/* Other sections — now inside the shifting wrapper */}
                        <div className="w-full flex flex-col items-center justify-center text-center px-4">
                            <TechStack/>
                            <AboutSection />
                            {/* FIX: ServiceSection MUST receive props */}
                            <ServiceSection 
                                openChat={openChat}
                                MEETING_SLUGS={MEETING_SLUGS} 
                            />
                            
                            <TestimonialsSection isPreview={true} />
                            <Footer />
                        </div>

                        {/* <Chatbot /> */}
                    </div>
                </>
            )}
        </Meet>
    );
}