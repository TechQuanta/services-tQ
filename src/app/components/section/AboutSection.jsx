"use client";
import WorldMap from "../../../components/ui/world-map";
import MagicBento from "../../../components/ui/MagicBento";
import React from "react";

function AboutSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-20 py-20">

      {/* SECTION 1 — How We Work */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center px-4 gap-6">
        <h1 className="text-4xl font-bold text-black">
          How We Work
        </h1>

        <p className="text-lg text-black max-w-2xl opacity-80">
          We help startups build high-quality MVPs faster with powerful strategy,
          modern tech, and efficient development workflows.
        </p>

        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="1, 247, 247"
        />
      </div>

      {/* SECTION 2 — Worldwide Service Coverage */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center px-4 gap-6">
        <h1 className="text-4xl font-bold text-black">
          Worldwide Service Coverage
        </h1>

        <p className="text-lg text-black max-w-xl opacity-80">
          Our team collaborates across continents—delivering global solutions
          with local precision.
        </p>

       <WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]}
      />
      </div>

    </div>
  );
}

export default AboutSection;
