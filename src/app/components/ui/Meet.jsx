"use client";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft } from 'lucide-react'; 

// Define constants
const DESKTOP_DRAWER_WIDTH_CLASS = 'w-96'; // 24rem
const DESKTOP_DRAWER_WIDTH = 384; // 384px
const DEFAULT_CAL_LINK_SLUG = "techquanta-ukwkct/30min"; // Default meeting for the general CTA
const PROJECT_DISCUSSION_SLUG = "techquanta-ukwkct/project-discussion"; // New meeting type

// Function to load Cal.com embed JS (same as before)
const getCalApi = (config) => {
    // ... (function body remains the same) ...
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


export default function IntroChatDrawer({ children }) {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [calLinkType, setCalLinkType] = useState(DEFAULT_CAL_LINK_SLUG); 

    // Handlers (remain the same)
    const openChat = useCallback((type, e) => {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        const newType = type || DEFAULT_CAL_LINK_SLUG;
        setCalLinkType(newType); 
        setIsChatOpen(true);
    }, []);
    
    const closeChat = useCallback(() => setIsChatOpen(false), []);

    // Use dynamic calLinkType to construct the specific path/link for cal.com
    const calPath = calLinkType.split('/').pop();


    // Load Cal.com Embed API (remains the same)
    useEffect(() => {
        if (isChatOpen && calLinkType) {
            (async function () {
                const cal = await getCalApi({ "namespace": calPath }); 
                if (cal) {
                    cal("ui", { "theme": "light", "hideEventTypeDetails": false, "layout": "month_view" });
                }
            })();
        }
    }, [isChatOpen, calLinkType, calPath]); 

    // Propagate the state and control functions to children (remains the same)
    const childrenWithProps = children({ 
        isChatOpen, 
        openChat, 
        closeChat, 
        DESKTOP_DRAWER_WIDTH,
        MEETING_SLUGS: {
            DEFAULT: DEFAULT_CAL_LINK_SLUG,
            PROJECT_DISCUSSION: PROJECT_DISCUSSION_SLUG
        }
    });


    return (
        <>
            {childrenWithProps}
            
            {/* ========================================================== */}
            {/* 1. LEFT SIDEBAR (INTRO CHAT DRAWER) */}
            {/* ========================================================== */}
            
            {/* Overlay (Mobile ONLY) - Ensure it's below the cursor (z-index < 9999) */}
            <div
                className={`fixed top-0 left-0 h-full w-full bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-[9990] ${
                    isChatOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } md:hidden`}
                onClick={closeChat}
            />

            {/* Drawer Content */}
            <div
                id="chat-drawer"
                // FIX 2: Apply a high Z-Index, but still less than the cursor (9999)
                className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-[9991]
                    transition-transform duration-500 ease-in-out
                    w-full md:${DESKTOP_DRAWER_WIDTH_CLASS} md:max-w-md`}
                style={{
                    transform: isChatOpen ? 'translateX(0)' : 'translateX(-100%)',
                }}
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="p-6 h-full flex flex-col">
                    
                    {/* Header with Back/Close Button (remains the same) */}
                    <div className="flex items-center pb-6 border-b border-gray-100 flex-shrink-0">
                        <button 
                            onClick={closeChat}
                            className="p-2 text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Go back or close chat window"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <span className="text-xl font-bold text-gray-900 ml-4">
                            Book a 
                            {calPath === '30min' ? ' Quick Intro' : ' Project Discussion'}
                        </span>
                    </div>

                    {/* Cal.com Content Container */}
                    <div className="flex-grow pt-4 overflow-y-auto">
                        
                        {/* IFRAME IMPLEMENTATION with DYNAMIC LINK */}
                        {isChatOpen && calLinkType && (
                            <iframe
                                src={`https://cal.com/${calLinkType}?embed=true&layout=month_view&theme=light`}
                                data-cal-namespace={calPath}
                                data-cal-link={calLinkType}
                                data-cal-config='{"layout":"month_view","theme":"light"}'
                                // It is crucial that the iframe content itself does not obscure the cursor.
                                // While we can't style the iframe's content, the high z-index on SmoothCursor 
                                // and the fixed z-index on the drawer should resolve the conflict.
                                style={{ width: '100%', height: '100%', minHeight: '600px', border: 'none', overflow: 'hidden' }}
                                key={calLinkType} 
                                title={`Schedule a meeting: ${calPath}`}
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>
            
            {/* GLOBAL CSS FOR CONTENT SHIFTING (remains the same) */}
            <style jsx global>{`
                @media (min-width: 768px) {
                    :root {
                        --drawer-width: ${DESKTOP_DRAWER_WIDTH}px;
                    }

                    .page-wrapper-for-content-shift {
                        transition: margin-left 0.5s ease-in-out;
                        margin-left: ${isChatOpen ? 'var(--drawer-width)' : '0'}; 
                        width: ${isChatOpen ? 'calc(100% - var(--drawer-width))' : '100%'};
                    }
                }
            `}</style>
        </>
    );
}