import React from "react";
import { ChevronDown, Cpu, Globe, Database, Layers, GitBranch, Settings, Zap, Box, Workflow } from "lucide-react";

export default function FAQPage() {
  const accent = "#01f7f7";

  const faqs = [
    {
      q: "What tech stack do we use?",
      a: (
        <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
          <p>
            We use a powerful modern tech stack for building scalable, fast, and secure applications:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Frontend */}
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <h4 className="flex items-center gap-2 text-black font-semibold text-base">
                <Globe size={18} color={accent} /> Frontend Frameworks
              </h4>
              <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                <li>React.js</li>
                <li>Next.js</li>
                <li>Angular</li>
              </ul>
            </div>

            {/* Backend */}
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <h4 className="flex items-center gap-2 text-black font-semibold text-base">
                <Cpu size={18} color={accent} /> Backend & APIs
              </h4>
              <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                <li>Node.js / Express</li>
                <li>REST APIs & GraphQL</li>
                <li>Serverless Functions</li>
              </ul>
            </div>

            {/* Databases */}
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <h4 className="flex items-center gap-2 text-black font-semibold text-base">
                <Database size={18} color={accent} /> Databases & ORMs
              </h4>
              <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                <li>MongoDB (Mongoose)</li>
                <li>PostgreSQL (Prisma)</li>
                <li>MySQL</li>
                <li>Firebase</li>
                <li>Supabase</li>
              </ul>
            </div>

            {/* Tools */}
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <h4 className="flex items-center gap-2 text-black font-semibold text-base">
                <Settings size={18} color={accent} /> Automation & Integrations
              </h4>
              <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                <li>n8n Workflows</li>
                <li>Zapier / Make.com</li>
                <li>Third‑party API Integrations</li>
              </ul>
            </div>

            {/* AI Stack */}
            <div className="p-4 bg-white rounded-xl border border-gray-200 col-span-full">
              <h4 className="flex items-center gap-2 text-black font-semibold text-base">
                <Zap size={18} color={accent} /> AI, NLP & Agent Systems
              </h4>
              <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                <li>AI Agents Integration</li>
                <li>RAG Systems (Retrieval‑Augmented Generation)</li>
                <li>Vector Databases (Pinecone / Qdrant)</li>
                <li>LLM Workflows & Automation</li>
                <li>NLP Pipelines</li>
              </ul>
            </div>

            {/* Messaging & Pub/Sub */}
            <div className="p-4 bg-white rounded-xl border border-gray-200 col-span-full">
              <h4 className="flex items-center gap-2 text-black font-semibold text-base">
                <GitBranch size={18} color={accent} /> Messaging Queues & Pub/Sub
              </h4>
              <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                <li>Redis Pub/Sub</li>
                <li>Apache Kafka</li>
                <li>RabbitMQ</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      q: "How long does a project take?",
      a: (
        <p className="text-gray-700 text-sm leading-relaxed">
          Depending on the complexity: landing pages (3–7 days), websites (2–3 weeks), and
          full‑stack apps (4–10 weeks). We provide exact timelines after reviewing requirements.
        </p>
      ),
    },
    {
      q: "Do you provide ongoing maintenance?",
      a: (
        <p className="text-gray-700 text-sm leading-relaxed">
          Yes — we offer monthly maintenance and feature‑update plans for all delivered projects.
        </p>
      ),
    },
    {
      q: "Can you integrate AI or automation into my product?",
      a: (
        <p className="text-gray-700 text-sm leading-relaxed">
          Absolutely. We build AI agents, RAG systems, chatbots, automation flows, and custom
          integrations using advanced AI models.
        </p>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white text-black py-20 px-4">
      <div className="max-w-5xl mx-auto">
            {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12" style={{ color: accent }}>
          Frequently Asked Questions
        </h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 rounded-lg border bg-black border-gray-300 text-white font-semibold hover:bg-gray-100 transition-colors"
          >
            Go Back to Home
          </button>
        </div>

        <div className="space-y-6">
          {faqs.map((item, i) => (
            <details
              key={i}
              className="group bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none text-lg font-semibold text-black">
                {item.q}
                <ChevronDown
                  className="group-open:rotate-180 transition-transform duration-300"
                  color={accent}
                />
              </summary>
              <div className="mt-4">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
