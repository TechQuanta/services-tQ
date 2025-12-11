"use client";

import React from "react";
import Image from "next/image";
import { Globe, Cpu, Database, Settings, Zap, GitBranch } from "lucide-react";

export default function TechStackSection() {
  const accent = "#01f7f7"; // Electric Blue

  const techStacks = [
    {
      title: "Frontend Frameworks",
      icon: <Globe size={20} color={accent} />,
      items: [
        { name: "React.js", icon: "/icons/react.svg" },
        { name: "Next.js", icon: "/icons/nextjs.svg" },
        { name: "Angular", icon: "/icons/angular.svg" },
      ],
    },
    {
      title: "Backend & APIs",
      icon: <Cpu size={20} color={accent} />,
      items: [
        { name: "Node.js", icon: "/icons/nodejs.svg" },
        { name: "Express", icon: "/icons/express.svg" },
        { name: "GraphQL", icon: "/icons/graphql.svg" },
        { name: "Serverless Functions", icon: "/icons/serverless.svg" },
      ],
    },
    {
      title: "Databases & ORMs",
      icon: <Database size={20} color={accent} />,
      items: [
        { name: "MongoDB", icon: "/icons/mongodb.svg" },
        { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
        { name: "MySQL", icon: "/icons/mysql.svg" },
        { name: "Firebase", icon: "/icons/firebase.svg" },
        { name: "Supabase", icon: "/icons/supabase.svg" },
      ],
    },
    {
      title: "Automation & Integrations",
      icon: <Settings size={20} color={accent} />,
      items: [
        { name: "n8n Workflows", icon: "/icons/n8n.svg" },
        { name: "Zapier", icon: "/icons/zapier.svg" },
        { name: "Third-party APIs", icon: "/icons/api.svg" },
      ],
    },
    {
      title: "AI, NLP & Agent Systems",
      icon: <Zap size={20} color={accent} />,
      items: [
        { name: "AI Agents Integration", icon: "/icons/ai.svg" },
        { name: "RAG Systems", icon: "/icons/rag.svg" },
        { name: "Vector Databases", icon: "/icons/vector.svg" },
        { name: "LLM Workflows", icon: "/icons/llm.svg" },
        { name: "NLP Pipelines", icon: "/icons/nlp.svg" },
      ],
    },
    {
      title: "Messaging & Pub/Sub",
      icon: <GitBranch size={20} color={accent} />,
      items: [
        { name: "Redis Pub/Sub", icon: "/icons/redis.svg" },
        { name: "Apache Kafka", icon: "/icons/kafka.svg" },
        { name: "RabbitMQ", icon: "/icons/rabbitmq.svg" },
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
                    <Image src={item.icon} alt={item.name} width={18} height={18} />
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
