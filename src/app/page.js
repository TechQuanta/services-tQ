import { Spotlight } from "../../src/components/ui/spotlight";
import { DotPattern } from "../../src/components/ui/dot-pattern";
import Navbar from "./components/ui/Navbar";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import AboutSection from "./components/section/AboutSection";
import ServiceSection from "./components/section/ServiceSection";
import TestimonialsSection from "./components/section/TestimonialSection";
import Footer from "./components/ui/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen w-full bg-white">
        {/* Dot Pattern Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <DotPattern className="h-full w-full opacity-40" />
        </div>

        {/* Spotlight Effect */}
        <Spotlight
          className="-top-40 left-1/2 -translate-x-1/2 md:-top-20"
          fill="white"
        />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-4 py-20">
          {/* Main Heading */}
          <h1 className="text-center text-4xl font-bold text-neutral-900 md:text-6xl lg:text-7xl">
            Ship AI-Driven Web Apps Fast <br />
            From
            <span 
  className="inline-block px-4 py-1 text-white md:px-6 md:py-2 font-bold ml-2 rounded-md"
  style={{ 
    backgroundColor: '#01f7f7',
    // Removed the 'border' style to achieve a cleaner circular look
    boxShadow: '0 0 20px rgba(1, 247, 247, 0.4), inset 0 0 10px rgba(1, 247, 247, 0.2)',
  }}
>
              <span style={{ display: 'inline-block', animation: 'slideInRight 0.6s ease-out 0s' }}>Idea</span>
              <span style={{ display: 'inline-block', marginLeft: '0.4em', animation: 'slideInRight 0.6s ease-out 0.2s backwards' }}>to</span>
              <span style={{ display: 'inline-block', marginLeft: '0.4em', animation: 'slideInRight 0.6s ease-out 0.4s backwards' }}>MVP</span>
              <span style={{ display: 'inline-block', marginLeft: '0.4em', animation: 'slideInRight 0.6s ease-out 0.6s backwards' }}>in</span>
           <ContainerTextFlip words={["Months", "Weeks", "Days"]} />   
            </span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-neutral-600 md:text-xl">
            Build production-ready MVPs with cutting-edge AI technology. We handle the complexity, you focus on growth.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            {/* Free Chat Button */}
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-8 py-3 font-semibold text-white transition-all hover:bg-neutral-800 active:scale-95">
              <span>💬</span>
              Free Chat
            </button>

            {/* Google Meet Button */}
            <button className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-neutral-900 px-8 py-3 font-semibold text-neutral-900 transition-all hover:bg-neutral-50 active:scale-95">
              <span>📹</span>
              Google Meet
            </button>
          </div>
        </div>

        {/* Animation Keyframes */}
       
      </main>
      <AboutSection/>
      <ServiceSection/>
      <TestimonialsSection/>
      <Footer/>
    </>
  );
}