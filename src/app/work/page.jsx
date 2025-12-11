"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();
  const accent = "#01f7f7"; // Electric Blue

  // Sample project data
  const allProjects = [
    {
      name: "AI Chatbot Platform",
      description:
        "A platform that allows businesses to integrate intelligent chatbots for customer service.",
      image: "/images/ai-chatbot.png", // Add your image in public/images
      features: [
        "Multi-lingual support",
        "RAG-based knowledge retrieval",
        "Custom AI agent workflows",
        "Analytics dashboard",
      ],
    },
    {
      name: "E-commerce Web App",
      description:
        "A scalable online store platform with advanced features and seamless UX.",
      image: "/images/ecommerce.png",
      features: [
        "Next.js + Tailwind CSS frontend",
        "Node.js & Express backend",
        "Stripe payment integration",
        "Inventory & order management",
      ],
    },
    {
      name: "Project Management Tool",
      description:
        "A full-stack project management solution for teams and enterprises.",
      image: "/images/project-management.png",
      features: [
        "Kanban & Scrum boards",
        "AI-powered task suggestions",
        "Real-time collaboration",
        "Notifications & reminders",
      ],
    },
    {
      name: "Social Media Analytics",
      description:
        "Tool to analyze social media trends, engagement, and audience growth.",
      image: "/images/social-media.png",
      features: [
        "Analytics dashboard",
        "Data visualization",
        "Integration with multiple platforms",
        "Custom reports",
      ],
    },
    {
      name: "Fitness Tracking App",
      description:
        "Mobile app to track fitness, workouts, and health data.",
      image: "/images/fitness.png",
      features: [
        "Activity tracking",
        "Diet and nutrition logging",
        "Workout plans",
        "Push notifications",
      ],
    },
    {
      name: "Online Learning Platform",
      description:
        "Platform for interactive courses, quizzes, and progress tracking.",
      image: "/images/learning.png",
      features: [
        "Video courses",
        "Progress tracking",
        "Quizzes & certificates",
        "Discussion forums",
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
                  className="w-full h-48 object-cover rounded-lg mb-4"
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
