// src/components/TechStackSection.js

"use client";

import React from "react";
import Image from "next/image";
// 1. IMPORT ICONS FOR CATEGORY HEADERS
import { Globe, Cpu, Database, Settings, Zap, GitBranch } from "lucide-react";

// 2. IMPORT ALL ICON PATHS (AS YOU ALREADY HAVE THEM)
import { 
  ReactIcon, Nextjs, PostgreSQL, MongoDB,
  Nodejs, FastAPI, Prisma, n8n, Zapier,
  GenAI, Python, Git, Docker, Kubernetes,
  Vercel, TailwindCSS, TypeScript, HTML, CSS,
  AppScript
} from "@/lib/imagepath";

// 3. IMPORT THE CENTRAL CONFIG DATA
import configData from "@/lib/data.json"; // Adjust path to your central JSON file

// --- HELPER MAPPING OBJECTS ---

// Map the 'iconKey' strings from JSON to the imported icon path variables
const ICON_PATH_MAP = {
  ReactIcon, Nextjs, PostgreSQL, MongoDB,
  Nodejs, FastAPI, Prisma, n8n, Zapier,
  GenAI, Python, Git, Docker, Kubernetes,
  Vercel, TailwindCSS, TypeScript, HTML, CSS,
  AppScript
};

// Map the 'iconName' strings from JSON to the Lucide React components
const CATEGORY_ICON_MAP = {
  Globe: Globe,
  Cpu: Cpu,
  Database: Database,
  Settings: Settings,
  Zap: Zap,
  GitBranch: GitBranch
};
// ------------------------------


export default function TechStackSection() {
  // 4. FETCH ALL REQUIRED DATA FROM CENTRAL JSON
  const techStackData = configData.pages.aboutPage.sections.techStack;
  const { title, subtitle, accentColor, stacks } = techStackData;
  
  // Create the component for the category icon dynamically
  const getCategoryIcon = (iconName, color) => {
    const IconComponent = CATEGORY_ICON_MAP[iconName];
    if (IconComponent) {
      return <IconComponent size={20} color={color} />;
    }
    return null; // Fallback
  };
  
  // Get the icon path based on the key
  const getTechIconPath = (iconKey) => {
      return ICON_PATH_MAP[iconKey];
  };

  return (
    <section className="w-full py-20 px-4 bg-white text-gray-700">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-black">
          {title}
        </h2>
        <p className="text-gray-600 mt-4">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {stacks.map((stack, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
          >
            <h4 className="flex items-center gap-2 text-black font-semibold text-lg mb-4">
              {/* Render the category icon using the helper */}
              {getCategoryIcon(stack.iconName, accentColor)} {stack.title}
            </h4>

            <div className="flex flex-wrap gap-2">
              {stack.items.map((item, i) => {
                const iconSrc = getTechIconPath(item.iconKey);
                
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded border border-dashed border-gray-400 bg-gray-100 text-gray-900 text-sm font-semibold"
                  >
                    {iconSrc && (
                      <Image 
                        src={iconSrc} 
                        alt={item.alt || item.name}
                        width={18} 
                        height={18} 
                        // Using a simple check for external URL (you'll need to define AppScript as a full URL)
                        unoptimized={typeof iconSrc === 'string' && iconSrc.startsWith('http')} 
                      />
                    )}
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}