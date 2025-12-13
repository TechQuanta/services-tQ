// src/components/Navbar.jsx

"use client";
import { useMemo, useContext } from "react";
import { Menu, X } from 'lucide-react'; 
import { ValuesContext } from "@/context/ValuesContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const MenuSidebar = dynamic(
  () => import("@/components/ui/MenuSidebar"),
  { ssr: false }
);

// 1. IMPORT THE CENTRAL CONFIG DATA
import configData from "@/lib/data.json"; // Adjust path as needed

/* ----------------------------------------------------
 * EXTRACT DATA FROM JSON
 * ---------------------------------------------------- */
const { 
    navLinks, 
    desktopDrawerWidth, 
    meetingSlugs // Note: Already passed as MEETING_SLUGS prop, but good to have config here
} = configData.components.navbar; // New path in JSON

// The Navbar now accepts the control functions as props from the parent (AppWrapper)
export default function Navbar({ openChat, MEETING_SLUGS, isChatOpen }) {
    const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

    // ValuesContext still handles the Mobile Nav Sidebar (Right Drawer)
    const { openSidebar, setOpenSidebar } = useContext(ValuesContext);
    
    // Handlers
    const handleOpenChat = (e) => {
        // Prevent default navigation if the button is a link/anchor
        e.preventDefault(); 
        
        // Use the passed function to open the central drawer 
        // with the default 'Quick Intro' slug for the Navbar CTA.
        if (openChat && MEETING_SLUGS) {
            openChat(MEETING_SLUGS.QUICK_INTRO);
        }
    };

    // Smooth scroll to section
    const handleSmoothScroll = (e, sectionId) => {
        e.preventDefault();
        
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setOpenSidebar(false); // Close mobile menu if open
        }
    };
    
    // --- DESKTOP RENDERERS ---
    const DesktopLink = ({ name, href }) => {
        // Check if link should scroll to a section (ID-based)
        const isSectionLink = href.startsWith("#");
        
        if (isSectionLink) {
            return (
                <button
                    onClick={(e) => handleSmoothScroll(e, href.slice(1))}
                    className="relative text-gray-700 hover:text-black transition-colors duration-300 group font-medium bg-none border-none cursor-pointer"
                >
                    {name}
                    {/* Animated Underline Effect */}
                    <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
            );
        }

        return (
            <Link 
                href={href} 
                className="relative text-gray-700 hover:text-black transition-colors duration-300 group font-medium"
            >
                {name}
                {/* Animated Underline Effect */}
                <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
        );
    };

    // --- MOBILE RENDERERS ---
    const MobileLink = ({ name, href, onClick }) => {
        // Check if link should scroll to a section (ID-based)
        const isSectionLink = href.startsWith("#");
        
        if (isSectionLink) {
            return (
                <button
                    onClick={(e) => {
                        handleSmoothScroll(e, href.slice(1));
                        onClick?.();
                    }}
                    className="block w-full text-left py-3 text-gray-800 hover:bg-gray-100/70 rounded-md px-3 transition-colors duration-200 bg-none border-none cursor-pointer"
                >
                    {name}
                </button>
            );
        }

        return (
            <Link 
                href={href} 
                onClick={onClick}
                className="block py-3 text-gray-800 hover:bg-gray-100/70 rounded-md px-3 transition-colors duration-200"
            >
                {name}
            </Link>
        );
    };

    // Using the imported JSON config for the width and the passed prop for state
    const DESKTOP_DRAWER_WIDTH = desktopDrawerWidth; 

    return (
        <>
            {/* NAVBAR */}
            <nav 
                className="w-full fixed top-0 left-0 bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50 transition-all duration-500 ease-in-out shadow-lg"
                // 🚨 SHIFTING NAVBAR LOGIC 🚨
                // This logic is now dependent on the isChatOpen prop from the parent
                style={
  mounted
    ? {
        transform: isChatOpen
          ? `translateX(${DESKTOP_DRAWER_WIDTH}px)`
          : "translateX(0)",
        width: isChatOpen
          ? `calc(100% - ${DESKTOP_DRAWER_WIDTH}px)`
          : "100%",
      }
    : undefined
}

            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    
                    {/* LOGO */}
                    <div className="text-2xl font-bold text-gray-900 tracking-wider pl-10">
  <Link href="/">
    <Image
      src="/tech.png"
      alt="TechQuanta Logo"
      width={160}
      height={40}
      priority
      className="h-10 w-auto rounded-md"
    />
  </Link>
</div>


                    {/* DESKTOP LINKS (DATA FROM JSON) */}
                    <div className="hidden md:flex items-center gap-8 lg:gap-10 text-gray-700 text-base">
                        
                        {navLinks.filter(link => link.name !== "Blog").map((link) => (
                            <DesktopLink key={link.name} {...link} />
                        ))}

                        {/* CTA Button - USES CENTRALIZED openChat PROP */}
                        <button
                            onClick={handleOpenChat} 
                            className="px-6 py-2 bg-black text-white rounded-full flex items-center gap-2 hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 text-sm font-semibold shadow-md"
                        >
                            <img src="/google-meet.svg" alt="Google Meet icon" className="h-4 w-4" />
                            Intro Chat 
                        </button>
                    </div>

                    {/* MOBILE ICON */}
                    <button
                        className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setOpenSidebar(!openSidebar)}
                        aria-label="Open menu"
                    >
                        <div className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <MenuSidebar /> 
                        </div>
                    </button>
                </div>
            </nav>
            
            {/* ======================================================================== */}
            {/* RIGHT SIDEBAR (MOBILE NAVIGATION MENU) - DATA FROM JSON */}
            {/* ======================================================================== */}
            
            {openSidebar && (
                <div
                    className="fixed top-0 left-0 h-full w-full bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300"
                    onClick={() => setOpenSidebar(false)}
                    aria-hidden={!openSidebar}
                >
                    {/* Sidebar Content */}
                    <div
                        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[1000] ${
                            openSidebar ? "translate-x-0" : "translate-x-full"
                        }`}
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <div className="p-6 h-full flex flex-col">
                            
                            <div className="flex justify-between items-center pb-8 border-b border-gray-100">
                                <span className="text-2xl font-bold text-gray-900">Navigation</span>
                                <X
                                    className="text-gray-700 w-7 h-7 cursor-pointer hover:text-red-600 transition-colors"
                                    onClick={() => setOpenSidebar(false)}
                                    aria-label="Close menu"
                                />
                            </div>

                            <div className="flex flex-col gap-2 text-gray-700 text-xl pt-4 flex-grow">
                                {navLinks.map((link) => (
                                    <MobileLink 
                                        key={link.name} 
                                        name={link.name} 
                                        href={link.href} 
                                        onClick={() => setOpenSidebar(false)}
                                    />
                                ))}
                            </div>
                            
                            {/* Mobile CTA Button - USES CENTRALIZED openChat PROP */}
                            <div className="pt-8 border-t border-gray-100 mt-auto">
                                <button
                                    // Close the mobile menu (setOpenSidebar(false)) and then open the chat drawer (handleOpenChat)
                                    onClick={(e) => { 
                                        setOpenSidebar(false); 
                                        handleOpenChat(e); 
                                    }} 
                                    className="w-full text-center px-4 py-3 bg-black text-white rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-gray-800 transition-colors duration-300 font-semibold text-lg"
                                >
                                    <img src="/google-meet.svg" alt="Google Meet icon" className="h-4 w-4" />
                                    Book an Intro Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}