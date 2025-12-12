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
            <img src="/tech.png" alt="TechQuanta Logo" className="h-12 w-auto rounded-md" />
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
                Testimonials
              </li>
              <li className="hover:text-[#01f7f7] cursor-pointer transition-colors duration-300">
                Our work
              </li>
              <li className="hover:text-[#01f7f7] cursor-pointer transition-colors duration-300">
                  FAQ's
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

            <div>
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