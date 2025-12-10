"use client";
import React from "react";
import WorldMap from "../../../components/ui/world-map";
import MagicBento from "../../../components/ui/MagicBento";

// Import the centralized configuration
import appConfig from '@/lib/data.json'; 

// Destructure the necessary data
const { howWeWork, coverage } = appConfig.pages.aboutPage.sections;

function AboutSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-20 py-20">

      {/* SECTION 1 — How We Work */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center px-4 gap-6">
        <h1 className="text-4xl font-bold text-black">
          {howWeWork.title}
        </h1>

        <p className="text-lg text-black max-w-2xl opacity-80">
          {howWeWork.subtitle}
        </p>

        {/* Spread the configuration object directly into props for brevity */}
        <MagicBento
          {...howWeWork.magicBentoConfig}
        />
      </div>

      {/* SECTION 2 — Worldwide Service Coverage */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center px-4 gap-6">
        <h1 className="text-4xl font-bold text-black">
          {coverage.title}
        </h1>

        <p className="text-lg text-black max-w-xl opacity-80">
          {coverage.subtitle}
        </p>

        {/* Map the worldMapDots array to the format expected by the WorldMap component */}
        <WorldMap
          dots={coverage.worldMapDots.map(dot => ({
            start: dot.start,
            end: dot.end,
          }))}
        />
      </div>

    </div>
  );
}

export default AboutSection;