"use client";
import { useState } from "react";

import { Menu, X } from 'lucide-react';

// Recommended: If you are using Next.js, you should import the Link component.
// import Link from 'next/link'; 

// For this example, we'll use standard <a> tags with the new href value.

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Define the path for the testimonials page
  const testimonialsPath = "/testimonial";

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 left-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* LOGO */}
          <div className="flex items-center gap-2">
          
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-10 text-gray-700 text-[17px]">
            
            {/* 🎯 CHANGE 1: Update Testimonials link for desktop */}
            <a href="/work">Our Work</a>
            <a href={testimonialsPath}>Testimonials</a>
            <a href="/faqs">FAQs</a>

            {/* CTA Button */}
            <a
              href="#"
              className="px-5 py-2 bg-black text-white rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
            >
              <img src="/google-meet.svg" alt="" className="h-4" />
              Intro Chat
            </a>
          </div>

          {/* MOBILE ICON */}
          <button
            className="md:hidden text-3xl text-gray-700"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-white/30 backdrop-blur-xl z-50 transform transition-transform duration-300 p-4 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full w-full max-w-xs ml-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-lg p-6">
          
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold">Menu</span>
            <X
              className="text-3xl cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="flex flex-col gap-6 text-gray-700 text-lg">
            <a href="/blog" onClick={() => setOpen(false)}>Blog</a>
            
            {/* 🎯 CHANGE 2: Update Testimonials link for mobile */}
            <a href={testimonialsPath} onClick={() => setOpen(false)}>Testimonials</a>
            
            <a href="/work" onClick={() => setOpen(false)}>Our Work</a>
            <a href="/faqs" onClick={() => setOpen(false)}>FAQs</a>

            <a
              href="#"
              className="px-4 py-2 bg-black text-white rounded-full w-fit flex items-center gap-2 shadow-md"
              onClick={() => setOpen(false)}
            >
              <img src="/google-meet.png" alt="" className="h-4" />
              Intro Chat
            </a>
          </div>
        </div>
      </div>
    </>
  );
}