"use client";
import React from "react";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        
        {/* Main Footer Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              TechQuanta<span className="text-[#01f7f7]">_Services</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Building smarter digital products through strategy, design, and modern engineering.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-[#01f7f7] cursor-pointer transition-colors duration-300">
                About Us
              </li>
              <li className="hover:text-[#01f7f7] cursor-pointer transition-colors duration-300">
                Services
              </li>
              <li className="hover:text-[#01f7f7] cursor-pointer transition-colors duration-300">
                Testimonials
              </li>
              <li className="hover:text-[#01f7f7] cursor-pointer transition-colors duration-300">
                Contact
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-gray-400 text-sm mb-6">
              <li className="flex items-center justify-center md:justify-start gap-3 hover:text-[#01f7f7] transition-colors duration-300">
                <Mail size={18} className="text-[#01f7f7] flex-shrink-0" />
                <span>techquanta.services@gmail.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 hover:text-[#01f7f7] transition-colors duration-300">
                <Phone size={18} className="text-[#01f7f7] flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 hover:text-[#01f7f7] transition-colors duration-300">
                <MapPin size={18} className="text-[#01f7f7] flex-shrink-0" />
                <span>Remote • India</span>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="w-full flex justify-center md:justify-start">
              <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg overflow-hidden w-full max-w-sm hover:border-[#01f7f7] transition-colors duration-300">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent px-4 py-3 text-sm text-gray-300 placeholder-gray-600 w-full outline-none"
                />
                <button className="bg-[#01f7f7] px-4 py-3 hover:bg-[#00e5e5] transition-colors duration-300 text-black font-semibold flex-shrink-0">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8"></div>

        {/* Bottom Footer */}
        <div className="w-full flex flex-col items-center justify-center text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TechQuanta_Services — All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}