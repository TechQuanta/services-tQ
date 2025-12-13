// src/components/IntroChatDrawer.jsx (The Central Intro Chat Drawer)

"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react'; 

// 1. IMPORT THE CENTRAL CONFIG DATA
import configData from "@/lib/data.json"; // Adjust path as needed

/* ----------------------------------------------------
 * EXTRACT DATA FROM JSON
 * ---------------------------------------------------- */
const { 
    desktopDrawerWidth: DESKTOP_DRAWER_WIDTH, 
    desktopDrawerWidthClass: DESKTOP_DRAWER_WIDTH_CLASS, 
    meetingSlugs: MEETING_SLUGS 
} = configData.components.navbar; // Re-using the navbar path, or create a new 'chatDrawer' path

// Function to load Cal.com embed JS (kept as is)
const getCalApi = (config) => {
    if (typeof window !== "undefined") {
        if (window.Cal) return Promise.resolve(window.Cal);

        const script = document.createElement("script");
        script.src = "https://cal.com/embed/embed.js";
        script.onload = () => {
            if (window.Cal) {
                window.Cal.init(config);
            }
        };
        document.head.appendChild(script);
        return new Promise((resolve) => {
            script.onload = () => resolve(window.Cal);
        });
    }
    return Promise.resolve(null);
};


/**
 * The IntroChatDrawer component acts as the centralized state manager.
 * It uses the Render Prop pattern to expose control functions to its children.
 */
export default function IntroChatDrawer({ children }) {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [calLinkType, setCalLinkType] = useState(MEETING_SLUGS.QUICK_INTRO); // Default

    // Function to close the drawer
    const closeChat = useCallback(() => {
        setIsChatOpen(false);
    }, []);

    // Function to open the drawer and set the specific meeting link
    const openChat = useCallback((slug) => {
        setCalLinkType(slug);
        setIsChatOpen(true);
    }, []);

    // Effect to load the Cal.com embed script and re-render the iframe
    useEffect(() => {
        if (isChatOpen && calLinkType) {
            (async function () {
                const cal = await getCalApi({ "namespace": "default" });
                if (cal) {
                    cal("ui", { "theme": "light", "hideEventTypeDetails": false, "layout": "month_view" });
                }
            })();
        }
    }, [isChatOpen, calLinkType]);

    // Construct the dynamic iframe source URL
    const iframeSrc = `https://cal.com/${calLinkType}?embed=true&layout=month_view&theme=light`;

    return (
        <>
            {/* 1. RENDER PROP: Pass ALL control props and constants to children */}
            {children({ 
                openChat, 
                isChatOpen, 
                closeChat, 
                DESKTOP_DRAWER_WIDTH, 
                MEETING_SLUGS // CRUCIAL: Pass the slugs inside the render prop
            })}
            
            {/* 2. DRAWER OVERLAY (Mobile ONLY) */}
            <div
                className={`fixed top-0 left-0 h-full w-full bg-black/50 backdrop-blur-sm z-[110] transition-opacity duration-300 ${
                    isChatOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } md:hidden`}
                onClick={closeChat}
            />

            {/* 3. DRAWER CONTENT */}
            <div
                id="chat-drawer"
                className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-[110] 
                    transition-transform duration-500 ease-in-out
                    w-full md:${DESKTOP_DRAWER_WIDTH_CLASS} md:max-w-md`}
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
                        <span className="text-xl font-bold text-gray-900 ml-4">Book Meet</span>
                    </div>

                    {/* Cal.com Content Container */}
                    <div className="flex-grow pt-4 overflow-y-auto">
                        
                        {isChatOpen && calLinkType && (
                            <iframe
                                key={calLinkType} 
                                src={iframeSrc}
                                data-cal-namespace="default"
                                data-cal-link={calLinkType}
                                data-cal-config='{"layout":"month_view","theme":"light"}'
                                style={{ width: '100%', height: '100%', minHeight: '600px', border: 'none', overflow: 'hidden' }}
                                title="Schedule a Meeting"
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>
            
            {/* 4. GLOBAL CSS FOR CONTENT SHIFTING */}
            <style jsx global>{`
                @media (min-width: 768px) {
                    :root {
                        --drawer-width: ${DESKTOP_DRAWER_WIDTH}px;
                    }

                    .page-wrapper-for-content-shift {
                        transition: margin-left 0.5s ease-in-out;
                        /* Shift content to the right if the chat is open */
                        margin-left: ${isChatOpen ? 'var(--drawer-width)' : '0'}; 
                        /* Adjust width to fit next to the open drawer */
                        width: ${isChatOpen ? 'calc(100% - var(--drawer-width))' : '100%'};
                        min-height: 100vh;
                        overflow-x: hidden;
                    }
                }
            `}</style>
        </>
    );
}