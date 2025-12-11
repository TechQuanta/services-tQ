"use client";

import { Spotlight } from "../../../components/ui/spotlight";
import { DotPattern } from "../../../components/ui/dot-pattern";
import { ContainerTextFlip } from "../../../components/ui/container-text-flip";

export default function Hero() {
  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-4 py-20 text-center">

      {/* Main Heading */}
    <h1 className="text-center text-4xl font-bold text-neutral-900 md:text-6xl lg:text-7xl relative">

  {/* Rocket Image Positioned Above "Ship" */}
  <div className="absolute -top-12 -left-10 md:-top-16 md:-left-20 z-20 rotate-[-5deg]">
    <img
      src="/rocket.png"
      alt="Rocket"
      className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
    />
  </div>

  {/* WORD: Ship */}
  <span className="relative z-10">
    Ship
  </span>

  {" "}AI-Driven Web Apps Fast <br />
  From{" "}
  <span
    className="inline-block px-4 py-1 text-white md:px-6 md:py-2 font-bold ml-2 rounded-md"
    style={{
      backgroundColor: "#01f7f7",
      boxShadow:
        "0 0 20px rgba(1, 247, 247, 0.4), inset 0 0 10px rgba(1, 247, 247, 0.2)",
    }}
  >
    {/* your animated words stay unchanged */}
    Idea to MVP in <ContainerTextFlip words={["Months", "Weeks", "Days"]} />
  </span>

</h1>


      {/* Subtext */}
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-neutral-600 md:text-xl">
        Build production-ready MVPs with cutting-edge AI technology.  
        We handle the complexity, you focus on growth.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
        {/* Google Meet Button */}
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-8 py-3 font-semibold text-white transition-all hover:bg-neutral-800 active:scale-95">
          <img src="/google-meet.svg" alt="Meet Icon" className="h-5 w-5" />
          Google Meet
        </button>

        {/* Portfolio Button */}
        <button className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-neutral-900 px-8 py-3 font-semibold text-neutral-900 transition-all hover:bg-neutral-50 active:scale-95">
          <img src="/portfolio.png" alt="Portfolio" className="h-5 w-5" />
          Portfolio
        </button>
      </div>
    </div>
  );
}