"use client";
"use client";
import React from "react";
import { Play } from "lucide-react";

export default function TestimonialsSection() {
  const videoTestimonials = [
    {
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
      duration: "0:10 / 0:30",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop",
      duration: "0:00 / 1:45",
    },
    {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop",
      duration: "0:00 / 2:15",
    },
  ];

  const textTestimonials = [
    {
      name: "Pradeep Telnar",
      title: "Founder, Skill Labs (Exited: $1M)",
      quote:
        "DreamLaunch Studios took complete ownership at every stage — incredibly reliable, fast, and always delivering high-quality work.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      name: "Arav Bhosale",
      title: "Founder, TechInitHere",
      quote:
        "Their technical execution was top-tier. Quick iterations, strong communication, and clean results.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      name: "Arit Ennerath",
      title: "Founder, Fview | Softaile 23",
      quote:
        "A genuinely flexible and professional team. They handled every custom request with confidence and creativity.",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            What Our Clients Say About Us
          </h2>
          <p className="text-black/70 text-lg max-w-2xl mx-auto">
            Real founders. Real products. Real impact. Hear from teams who trusted DreamLaunch to build their vision.
          </p>
        </div>

        {/* GRID LAYOUT LIKE THE SCREENSHOT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[260px]">

          {/* Small video #1 */}
          <TestimonialVideoCard video={videoTestimonials[0]} className="md:col-span-1" />

          {/* Small text #1 */}
          <TestimonialTextCard testimonial={textTestimonials[0]} className="md:col-span-1" />

          {/* Large wide video */}
          <TestimonialVideoCard
            video={videoTestimonials[2]}
            className="md:col-span-2 md:row-span-2"
          />

          {/* Large tall text */}
          <TestimonialTextCard
            testimonial={textTestimonials[1]}
            className="md:col-span-2 md:row-span-2"
          />

          {/* Small text #3 */}
          <TestimonialTextCard testimonial={textTestimonials[2]} className="md:col-span-1" />

          {/* Small video #2 */}
          <TestimonialVideoCard video={videoTestimonials[1]} className="md:col-span-1" />

        </div>
      </div>
    </div>
  );
}

/* VIDEO CARD COMPONENT */
function TestimonialVideoCard({ video, className = "" }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden bg-gray-100 relative ${className}`}
    >
      <img src={video.image} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
          <Play size={28} className="text-black ml-1" />
        </div>
      </div>
      <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
        {video.duration}
      </div>
    </div>
  );
}

/* TEXT CARD COMPONENT */
function TestimonialTextCard({ testimonial, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-gray-100 p-6 flex flex-col justify-between ${className}`}
    >
      <p className="text-black text-sm leading-relaxed opacity-90">
        {testimonial.quote}
      </p>

      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-300">
        <img
          src={testimonial.image}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-black text-sm">
            {testimonial.name}
          </h4>
          <p className="text-black/60 text-xs">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
}
