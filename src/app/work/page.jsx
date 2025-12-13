"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();
  const accent = "#01f7f7"; // Electric Blue

  // Sample project data
  const allProjects = [
    {
      name: "Ai Connect",
      description:
        "AIConnect is a fast, all-in-one AI platform featuring multi-model AI Chat, a one-click App Builder for websites, an ATS-optimized Resume Builder, and a creative Image Generator. It is designed for security and scalability, offering comprehensive documentation to maximize user productivity and creativity across diverse tasks.",
      image: "/aiconnect.png", // Add your image in public/images
      features: [
        "Multi-Agent support",
        "Editing Tools",
        "Automate App Creation",
        "App Building Tool Integrated",
      ],
    },
    {
      name: "SCSIT Last Miniute",
      description:
        "LastMinute SCSIT is the comprehensive academic partner for SCSIT, Indore students. It centralizes previous year question papers and study resources for MCA and other programs. Key features include academic tools like CGPA/SGPA calculators and a file upload system for community contribution, ensuring students are organized and prepared for their exams.",
      image: "/last.png",
      features: [
        "Next.js + Tailwind CSS frontend",
        "Node.js & Express backend",
        "College Student Funded",
        "Documentation Support For Student",
      ],
    },
    {
      name: "Applicant Ace",
      description:
        "ApplicantAce Resume Builder helps users secure jobs at top companies by creating professional, ATS-friendly resumes in minutes. Its four-step process guides users from selecting a template and filling details to tailoring and downloading an error-free document. Features include expert blogs and options to attach cover letters, simplifying the entire job application process.",
      image: "/aa.png",
      features: [
        "Ai CV Creation",
        "Drive Upload",
        "Integrated Paraphrasing Tool",
        "Resume Templates",
      ],
    },
        {
      name: "Social X",
      description:
        "SocialX is a powerful automation platform to schedule up to 500 posts across Twitter, Reddit, and LinkedIn. It ensures real-time publishing with a cron-based system and secure OAuth 2.0 authentication. Key features include bulk scheduling, precise timing control, and a visual calendar view to manage your entire social media presence effectively.",
      image: "/socialx.png",
      features: [
        "Automation Tool Integration",
        "Multi App Support",
        "Post Scheduling",
        "Efficient Pipelining",
      ],
    },

  ];

  const [visibleCount, setVisibleCount] = useState(3); // show 3 projects initially

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, allProjects.length));
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-700 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 md:mb-0">
            Our Projects
          </h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 rounded-lg border bg-black border-gray-300 text-white font-semibold hover:bg-gray-100 transition-colors"
          >
            Go Back to Home
          </button>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.slice(0, visibleCount).map((project, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-contain rounded-lg mb-4"
                />
              )}
              <h2 className="text-2xl font-bold text-black mb-2">{project.name}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>

              <h3 className="text-lg font-semibold mb-2" style={{ color: accent }}>
                Features:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 flex-1">
                {project.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < allProjects.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadMore}
              className="px-6 py-2 rounded-lg border bg-black border-gray-300 text-white font-semibold hover:bg-gray-100 transition-colors"
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
