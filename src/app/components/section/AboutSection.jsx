"use client";

import React from "react";
import WorldMap from "../../../components/ui/world-map";
import MagicBento from "../../../components/ui/MagicBento";
import appConfig from '@/lib/data.json'; 

const { howWeWork, coverage } = appConfig.pages.aboutPage.sections;

function AboutSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center gap-20 py-20 px-4">

      {/* SECTION 1 — How We Work */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
        
        <h1 className="text-4xl font-bold text-black">
          {howWeWork.title}
        </h1>

        <p className="text-lg text-black max-w-2xl opacity-80">
          {howWeWork.subtitle}
        </p>

        <MagicBento {...howWeWork.magicBentoConfig} />
      </div>

      {/* SECTION 2 — Worldwide Service Coverage */}
     {/* SECTION 2 — Worldwide Service Coverage */}
<div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center px-4 gap-6">

  <h1 className="text-4xl font-bold text-black">
    {coverage.title}
  </h1>

  <p className="text-lg text-black max-w-xl opacity-80">
    {coverage.subtitle}
  </p>

  {/* World Map Styled Container */}
  <div className="
      w-full max-w-6xl 
      border border-gray-200 
      rounded-2xl 
      p-6 
      flex items-center justify-center 
      bg-white
    "
  >
    <WorldMap
      dots={coverage.worldMapDots.map(dot => ({
        start: dot.start,
        end: dot.end,
      }))}
      lineColor="#01f7f7"
    />
  </div>
</div>


    </section>
  );
}

export default AboutSection;
