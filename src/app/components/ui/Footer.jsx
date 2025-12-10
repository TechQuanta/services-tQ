"use client";
import React from "react";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-wide">
            TechQuanta<span className="text-cyan-400">_Services</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Building smarter digital products through strategy, design, and modern engineering.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-cyan-400 cursor-pointer transition">About Us</li>
            <li className="hover:text-cyan-400 cursor-pointer transition">Services</li>
            <li className="hover:text-cyan-400 cursor-pointer transition">Testimonials</li>
            <li className="hover:text-cyan-400 cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-cyan-400 cursor-pointer transition">MVP Development</li>
            <li className="hover:text-cyan-400 cursor-pointer transition">UI/UX Design</li>
            <li className="hover:text-cyan-400 cursor-pointer transition">Full-Stack Engineering</li>
            <li className="hover:text-cyan-400 cursor-pointer transition">Product Strategy</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-cyan-400" />
              contact@techquanta.com
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-cyan-400" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-cyan-400" />
              Remote • India
            </li>
          </ul>

          {/* Newsletter */}
          <div className="mt-6">
            <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-4 py-2 text-sm text-gray-300 w-full outline-none"
              />
              <button className="bg-cyan-500 px-4 py-2 hover:bg-cyan-400 transition">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-12 pt-6 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} TechQuanta_Services — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
