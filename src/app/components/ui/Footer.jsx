// src/components/Footer.jsx

"use client";
import React from "react";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

// 1. IMPORT THE CENTRAL CONFIG DATA
import configData from "@/lib/data.json"; // Adjust path as needed

/* ----------------------------------------------------
 * EXTRACT DATA FROM JSON
 * ---------------------------------------------------- */
const { 
    logoPath,
    logoText,
    logoAccent,
    motto,
    quickLinks,
    contact,
    copyright
} = configData.components.footer;

export default function Footer() {
    
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-black text-white py-20 px-4">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
                
                {/* Main Footer Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Brand Section (Data from JSON) */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        <img src={logoPath} alt={`${logoText} Logo`} className="h-12 w-auto rounded-md" />
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                            {logoText}<span className={`text-[${logoAccent}]`}>_Services</span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            {motto}
                        </p>
                    </div>

                    {/* Quick Links (Data from JSON) */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-gray-400">
                            {quickLinks.map((link) => (
                                <li 
                                    key={link.name} 
                                    className="hover:text-[#01f7f7] cursor-pointer transition-colors duration-300"
                                >
                                    <a href={link.href}>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section (Data from JSON) */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
                        <ul className="space-y-4 text-gray-400 text-sm mb-6">
                            {/* Email */}
                            <li className="flex items-center justify-center md:justify-start gap-3 hover:text-[#01f7f7] transition-colors duration-300">
                                <Mail size={18} className={`text-[${logoAccent}] flex-shrink-0`} />
                                <span>{contact.email}</span>
                            </li>
                            {/* Phone */}
                            <li className="flex items-center justify-center md:justify-start gap-3 hover:text-[#01f7f7] transition-colors duration-300">
                                <Phone size={18} className={`text-[${logoAccent}] flex-shrink-0`} />
                                <span>{contact.phone}</span>
                            </li>
                            {/* Location */}
                            <li className="flex items-center justify-center md:justify-start gap-3 hover:text-[#01f7f7] transition-colors duration-300">
                                <MapPin size={18} className={`text-[${logoAccent}] flex-shrink-0`} />
                                <span>{contact.location}</span>
                            </li>
                        </ul>

                        <div>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8"></div>

                {/* Bottom Footer (Data from JSON) */}
                <div className="w-full flex flex-col items-center justify-center text-center">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} {copyright}
                    </p>
                </div>

            </div>
        </footer>
    );
}