"use client";
import { useState, useMemo, useEffect } from "react";
// Import ArrowLeft for the back option
import { Menu, X, ArrowRight, ArrowLeft } from 'lucide-react'; 

// Function to load Cal.com embed JS (provided by Cal.com documentation)
const getCalApi = (config) => {
  if (typeof window !== "undefined") {
    // Check if the script is already loaded
    if (window.Cal) return Promise.resolve(window.Cal);

    const script = document.createElement("script");
    script.src = "https://cal.com/embed/embed.js";
    script.onload = () => {
      // Once script loads, initialize Cal
      if (window.Cal) {
        window.Cal.init(config);
      }
    };
    document.head.appendChild(script);
    return new Promise((resolve) => {
      // Wait for the script to load and set up window.Cal
      script.onload = () => resolve(window.Cal);
    });
  }
  return Promise.resolve(null);
};


// Define the fixed width for the desktop drawer for margin calculation
const DESKTOP_DRAWER_WIDTH_CLASS = 'w-96'; // 24rem
const DESKTOP_DRAWER_WIDTH = 384; // 384px

export default function Navbar() {
  const [open, setOpen] = useState(false); // Right-side Nav Menu
  const [isChatOpen, setIsChatOpen] = useState(false); // Left-side Intro Chat Drawer

  // Load Cal.com Embed API with 'theme: light' when component mounts or isChatOpen changes
  useEffect(() => {
    // Only load the script if the drawer is opened at least once
    if (isChatOpen) {
        (async function () {
            const cal = await getCalApi({ "namespace": "30min" });
            if (cal) {
                // 🚨 Applying 'theme: light' here
                cal("ui", { "theme": "light", "hideEventTypeDetails": false, "layout": "month_view" });
            }
        })();
    }
  }, [isChatOpen]);


  // Define Navigation Links (Centralized Data)
  const navLinks = useMemo(() => [
    { name: "Our Work", href: "/work" },
    { name: "Testimonials", href: "/testimonial" },
    { name: "FAQs", href: "/faqs" },
    { name: "Blog", href: "/blog" }, 
  ], []);

  // --- DESKTOP RENDERERS ---
  const DesktopLink = ({ name, href }) => (
    <a 
      href={href} 
      className="relative text-gray-700 hover:text-black transition-colors duration-300 group font-medium"
    >
      {name}
      {/* Animated Underline Effect */}
      <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </a>
  );

  // --- MOBILE RENDERERS ---
  const MobileLink = ({ name, href, onClick }) => (
    <a 
      href={href} 
      onClick={onClick}
      className="block py-3 text-gray-800 hover:bg-gray-100/70 rounded-md px-3 transition-colors duration-200"
    >
      {name}
    </a>
  );
  
  // Handlers
  const openChat = (e) => {
    e.preventDefault();
    setIsChatOpen(true);
  };
  const closeChat = () => setIsChatOpen(false);
  const toggleMenu = () => setOpen(prev => !prev);
  const closeMenu = () => setOpen(false);


  return (
    <>
      {/* NAVBAR */}
      <nav 
        className="w-full fixed top-0 left-0 bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50 transition-all duration-500 ease-in-out shadow-lg"
        // 🚨 SHIFTING NAVBAR LOGIC 🚨
        style={{
            transform: isChatOpen ? `translateX(${DESKTOP_DRAWER_WIDTH}px)` : 'translateX(0)',
            width: isChatOpen ? `calc(100% - ${DESKTOP_DRAWER_WIDTH}px)` : '100%',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          
          {/* LOGO */}
          <div className="text-2xl font-bold text-gray-900 tracking-wider">

          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-gray-700 text-base">
            
            {navLinks.filter(link => link.name !== "Blog").map((link) => (
              <DesktopLink key={link.name} {...link} />
            ))}

            {/* CTA Button - OPENS LEFT SIDEBAR */}
            <button
              onClick={openChat} 
              className="px-6 py-2 bg-black text-white rounded-full flex items-center gap-2 hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 text-sm font-semibold shadow-md"
            >
              <img src="/google-meet.svg" alt="Google Meet icon" className="h-4 w-4" />
              Intro Chat 
            </button>
          </div>

          {/* MOBILE ICON */}
          <button
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
      
      {/* ========================================================== */}
      {/* 1. LEFT SIDEBAR (INTRO CHAT DRAWER) - SHIFTING CONTENT LOGIC */}
      {/* ========================================================== */}
      
      {/* Overlay (Mobile ONLY) */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black/50 backdrop-blur-sm z-[110] transition-opacity duration-300 ${
            isChatOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } md:hidden`}
        onClick={closeChat}
      />

      {/* Drawer Content */}
      <div
        id="chat-drawer"
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-[110] 
          transition-transform duration-500 ease-in-out
          
          // Mobile: full width, Desktop: fixed width
          w-full md:${DESKTOP_DRAWER_WIDTH_CLASS} md:max-w-md`}
        // Control slide in/out
        style={{
            transform: isChatOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="p-6 h-full flex flex-col">
          
          {/* Header with Back/Close Button */}
          <div className="flex items-center pb-6 border-b border-gray-100 flex-shrink-0">
            <button 
              onClick={closeChat}
              className="p-2 text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back or close chat window"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="text-xl font-bold text-gray-900 ml-4">Book an Intro Chat</span>
          </div>

          {/* Cal.com Content Container */}
          <div className="flex-grow pt-4 overflow-y-auto">
            
            {/* 🚨 IFRAME IMPLEMENTATION with Theme: Light 🚨 */}
            {isChatOpen && (
                <iframe
                    // Note: Adding the theme=light parameter to the iframe src URL ensures it's passed directly to the embed.
                    src="https://cal.com/techquanta-ukwkct/30min?embed=true&layout=month_view&theme=light"
                    data-cal-namespace="30min"
                    data-cal-link="techquanta-ukwkct/30min"
                    data-cal-config='{"layout":"month_view","theme":"light"}'
                    style={{ width: '100%', height: '100%', minHeight: '600px', border: 'none', overflow: 'hidden' }}
                    title="Schedule a 30 Minute Meeting"
                ></iframe>
            )}
          </div>
        </div>
      </div>
      

      {/* ======================================================================== */}
      {/* 2. RIGHT SIDEBAR (MOBILE NAVIGATION MENU) - UNCHANGED LOGIC (Overlay) */}
      {/* ======================================================================== */}
      
      {open && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300"
          onClick={closeMenu}
          aria-hidden={!open}
        >
          {/* Sidebar Content */}
          <div
            className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()} 
          >
            
            <div className="p-6 h-full flex flex-col">
              
              <div className="flex justify-between items-center pb-8 border-b border-gray-100">
                <span className="text-2xl font-bold text-gray-900">Navigation</span>
                <X
                  className="text-gray-700 w-7 h-7 cursor-pointer hover:text-red-600 transition-colors"
                  onClick={closeMenu}
                  aria-label="Close menu"
                />
              </div>

              <div className="flex flex-col gap-2 text-gray-700 text-xl pt-4 flex-grow">
                {navLinks.map((link) => (
                  <MobileLink 
                    key={link.name} 
                    name={link.name} 
                    href={link.href} 
                    onClick={closeMenu}
                  />
                ))}
              </div>
              
              {/* Mobile CTA Button (triggers left drawer) */}
              <div className="pt-8 border-t border-gray-100 mt-auto">
                <button
                  onClick={() => { closeMenu(); openChat({ preventDefault: () => {} }); }} 
                  className="w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-blue-700 transition-colors duration-300 font-semibold text-lg"
                >
                  <img src="/google-meet.svg" alt="Google Meet icon" className="h-4 w-4" />
                  Book an Intro Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 🚨 GLOBAL CSS FOR CONTENT SHIFTING 🚨
        This style block is critical. Remember to apply the CSS class 
        `.page-wrapper-for-content-shift` to the main content container 
        (the parent of your page content) outside of this Navbar component.
      */}
      <style jsx global>{`
        /* Target the <html> or <body> element, or a main layout wrapper */
        @media (min-width: 768px) {
            :root {
                --drawer-width: ${DESKTOP_DRAWER_WIDTH}px;
            }

            .page-wrapper-for-content-shift {
                transition: margin-left 0.5s ease-in-out;
                /* If chat is open, shift content to the right by the drawer width */
                margin-left: ${isChatOpen ? 'var(--drawer-width)' : '0'}; 
                /* Ensures content width is correct */
                width: ${isChatOpen ? 'calc(100% - var(--drawer-width))' : '100%'};
            }
        }
      `}</style>
    </>
  );
}