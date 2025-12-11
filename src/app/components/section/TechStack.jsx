// src/components/TechStackSection.js

"use client";

import React from "react";
import Image from "next/image";
import { Globe, Cpu, Database, Settings, Zap, GitBranch } from "lucide-react";

// 1. IMPORT NECESSARY ICON PATHS
// Adjust the path below if your imagepath.js is located elsewhere
import { 
  ReactIcon, Nextjs, PostgreSQL, MongoDB,
  Nodejs, FastAPI, Prisma, n8n, Zapier,
  GenAI, Python, Git, Docker, Kubernetes,
  Vercel, TailwindCSS, TypeScript, HTML, CSS,
  AppScript,
// Example of a non-tech external URL icon
} from "@/lib/imagepath";

export default function TechStackSection() {
  const accent = "#01f7f7"; // Electric Blue

  const techStacks = [
    {
      title: "Frontend & UI",
      icon: <Globe size={20} color={accent} />,
      items: [
        { name: "React.js", icon: ReactIcon, alt: "React Logo" },
        { name: "Next.js", icon: Nextjs, alt: "Next.js Logo" },
        { name: "TypeScript", icon: TypeScript, alt: "TypeScript Logo" },
        { name: "Tailwind CSS", icon: TailwindCSS, alt: "Tailwind CSS Logo" },
        { name: "HTML5", icon: HTML, alt: "HTML5 Logo" },
        { name: "CSS3", icon: CSS, alt: "CSS3 Logo" },
      ],
    },
    {
      title: "Backend & APIs",
      icon: <Cpu size={20} color={accent} />,
      items: [
        { name: "Python", icon: Python, alt: "Python Logo" },
        { name: "Node.js", icon: Nodejs, alt: "Node.js Logo" },
        { name: "FastAPI", icon: FastAPI, alt: "FastAPI Logo" },
        { name: "Prisma ORM", icon: Prisma, alt: "Prisma Logo" },
        // { name: "Express", icon: "/icons/express.svg", alt: "Express Logo" }, // Placeholder for unmapped
      ],
    },
    {
      title: "Databases & ORMs",
      icon: <Database size={20} color={accent} />,
      items: [
        { name: "PostgreSQL", icon: PostgreSQL, alt: "PostgreSQL Logo" },
        { name: "MongoDB", icon: MongoDB, alt: "MongoDB Logo" },
        { name: "Prisma", icon: Prisma, alt: "Prisma Logo" }, // Reused for clarity
        // { name: "MySQL", icon: "/icons/mysql.svg", alt: "MySQL Logo" }, // Placeholder for unmapped
      ],
    },
    {
      title: "AI & Generative Systems",
      icon: <Zap size={20} color={accent} />,
      items: [
        { name: "Gen-AI", icon: GenAI, alt: "Generative AI Icon" },
        { name: "Python (ML)", icon: Python, alt: "Python Logo" }, // Reused
        // { name: "RAG Systems", icon: "/icons/rag.svg", alt: "RAG Icon" }, // Placeholder for unmapped
        // { name: "LLM Workflows", icon: "/icons/llm.svg", alt: "LLM Icon" }, // Placeholder for unmapped
      ],
    },
    {
      title: "DevOps & Deployment",
      icon: <Settings size={20} color={accent} />,
      items: [
        { name: "Docker", icon: Docker, alt: "Docker Logo" },
        { name: "Kubernetes", icon: Kubernetes, alt: "Kubernetes Logo" },
        { name: "Vercel", icon: Vercel, alt: "Vercel Logo" },
        { name: "Git", icon: Git, alt: "Git Logo" },
        // { name: "AWS", icon: AWS, alt: "AWS Logo" }, // Assuming you want to use the main AWS icon
      ],
    },
    {
      title: "Automation & Integrations",
      icon: <GitBranch size={20} color={accent} />,
      items: [
        { name: "n8n Workflows", icon: n8n, alt: "n8n Logo" },
        { name: "Zapier", icon: Zapier, alt: "Zapier Logo" },
        { name: "Sheet's", icon: AppScript, alt: "AppScript Logo" }, // Example using an external URL
      ],
    },
  ];

  return (
    <section className="w-full py-20 px-4 bg-white text-gray-700">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-black">
          Our Tech Stack
        </h2>
        <p className="text-gray-600 mt-4">
          The tools and technologies we use to build modern, scalable applications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {techStacks.map((stack, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
          >
            <h4 className="flex items-center gap-2 text-black font-semibold text-lg mb-4">
              {stack.icon} {stack.title}
            </h4>

            <div className="flex flex-wrap gap-2">
              {stack.items.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded border border-dashed border-gray-400 bg-gray-100 text-gray-900 text-sm font-semibold"
                >
                  {item.icon && (
                    <Image 
                      src={item.icon} 
                      alt={item.alt || item.name} // Use the alt property or item.name
                      width={18} 
                      height={18} 
                      // Conditionally use unoptimized for external URLs (like Excel's)
                      unoptimized={item.icon.startsWith('http')} 
                    />
                  )}
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}