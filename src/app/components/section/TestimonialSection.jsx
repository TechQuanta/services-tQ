"use client";
import React from "react";
import { Play, Star, Quote } from "lucide-react";

/* ----------------------------------------------------
 * DATA DEFINITION (Unchanged)
 * ---------------------------------------------------- */
const ALL_TESTIMONIALS = [
    {
        type: 'video',
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit-crop",
        duration: "0:10 / 0:30",
    },
    {
        type: 'text',
        name: "Pradeep Telnar",
        title: "Founder, Skill Labs (Exited: $1M)",
        quote: " took complete ownership at every stage — incredibly reliable, fast, and always delivering high-quality work.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit-crop",
    },
    {
        type: 'video',
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit-crop",
        duration: "0:00 / 2:15",
    },
    {
        type: 'text',
        name: "Arav Bhosale",
        title: "Founder, TechInitHere",
        quote: "Their technical execution was top-tier. Quick iterations, strong communication, and clean results.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit-crop",
    },
    {
        type: 'text',
        name: "Arit Ennerath",
        title: "Founder, Fview | Softaile 23",
        quote: "A genuinely flexible and professional team. They handled every custom request with confidence and creativity.",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit-crop",
    },
    {
        type: 'video',
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit-crop",
        duration: "0:00 / 1:45",
    },
    
    // ADD MORE TESTIMONIALS HERE FOR THE FULL PAGE
    {
        type: 'text',
        name: "Extra Reviewer 1",
        title: "CEO, NextGen Corp",
        quote: "This review will only appear on the dedicated /testimonial page, and it's quite long to test wrapping.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit-crop",
    },
    {
        type: 'video',
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit-crop",
        duration: "0:00 / 1:45",
    },
];

/* ----------------------------------------------------
 * VIDEO CARD COMPONENT 
 * ---------------------------------------------------- */
function TestimonialVideoCard({ video, className = "" }) {
    // Ensuring image fills the container height/width
    return (
        <div
            className={`rounded-2xl overflow-hidden relative shadow-lg transition-transform duration-300 ease-out hover:scale-[1.01] h-full ${className}`}
        >
            <img src={video.image} className="w-full h-full object-cover" alt="Video Testimonial Preview"/>
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-neutral-100 transition shadow-xl">
                    <Play size={30} className="text-black ml-1" fill="currentColor" />
                </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-medium">
                {video.duration}
            </div>
        </div>
    );
}

/* ----------------------------------------------------
 * TEXT CARD COMPONENT (Quote icon fix applied)
 * ---------------------------------------------------- */
function TestimonialTextCard({ testimonial, className = "" }) {
    return (
        <div
            className={`
                rounded-xl 
                p-6 md:p-8 
                flex flex-col justify-between 
                border border-dashed border-gray-400 
                bg-white
                shadow-sm 
                h-full 
                ${className}
            `}
        >
            <div className="relative pt-4">
                <Quote size={24} className="text-gray-200 absolute -top-1 -left-2" />
                <p className="text-neutral-900 text-base sm:text-lg md:text-xl font-medium leading-snug tracking-tight mb-6">
                    {testimonial.quote}
                </p>
            </div>

            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-200">
                <img
                    src={testimonial.image}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-[#01f7f7]"
                    alt={testimonial.name + ' profile picture'}
                />
                <div>
                    <h4 className="font-bold text-neutral-900 text-md">{testimonial.name}</h4>
                    <p className="text-black/70 text-sm">{testimonial.title}</p>
                </div>
            </div>
        </div>
    );
}


/* ----------------------------------------------------
 * MAIN TESTIMONIALS SECTION (Simplified Grid Logic)
 * ---------------------------------------------------- */

export default function TestimonialsSection({ isPreview = false }) {
    
    const displayedTestimonials = isPreview 
        ? ALL_TESTIMONIALS.slice(0, 4)
        : ALL_TESTIMONIALS;

    /**
     * Renders Tailwind classes for grid size. Defaults to col-span-1 (full width on mobile).
     * Now primarily handles the desktop (md) spanning.
     */
    const getResponsiveGridClass = (index) => {
        // --- Preview Layout (For /) ---
        if (isPreview) {
            // Item 3 (index 2) and Item 4 (index 3) are the large cards in the preview
            if (index === 2 || index === 3) {
                // Mobile: col-span-1, Desktop: col-span-2 and row-span-2
                return "col-span-1 md:col-span-2 md:row-span-2"; 
            }
            // Items 1 & 2 (index 0 and 1) are small/normal size cards
            return "col-span-1 md:col-span-1";
        }

        // --- Full Page Layout (For /testimonial) ---
        // Indices 2 and 3 are the primary large cards
        if (index === 2 || index === 3) {
             return "col-span-1 sm:col-span-2 md:col-span-2 md:row-span-2"; 
        }
        // Indices 6 and 7 are the extra cards added at the end (made them full width on md for cleaner stacking)
        if (index === 6 || index === 7) {
            return "col-span-1 sm:col-span-2 md:col-span-2";
        }

        // All other small cards (indices 0, 1, 4, 5)
        return "col-span-1 md:col-span-1";
    }

    return (
        <div className="bg-white py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 mb-4">
                        What Our Clients Say About Us
                    </h2>
                    <p className="text-neutral-600 text-xl max-w-3xl mx-auto">
                        Real founders. Real products. Real impact. Hear from teams who trusted techQuanta_Services to build their vision.
                    </p>
                </div>

                {/* GRID LAYOUT: Removed fixed auto-rows height for natural wrapping */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"> 
                    {displayedTestimonials.map((item, index) => {
                        const ItemComponent = item.type === 'video' ? TestimonialVideoCard : TestimonialTextCard;
                        const className = getResponsiveGridClass(index);
                        
                        return (
                            <ItemComponent 
                                key={index} 
                                video={item.type === 'video' ? item : null} 
                                testimonial={item.type === 'text' ? item : null}
                                className={className} 
                            />
                        );
                    })}
                </div>
                
                {/* CTA Button */}
                {isPreview && (
                    <div className="flex justify-center mt-16">
                        <a 
                            href="/testimonial" 
                            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3 sm:py-4 font-semibold text-white rounded-full 
                                       transition-all border-2 border-neutral-900 bg-neutral-900 
                                       hover:bg-black hover:border-black shadow-lg hover:shadow-xl active:scale-[0.98]
                                       text-base sm:text-lg tracking-wide"
                        >
                            <Star size={20} className="text-[#01f7f7]" fill="#01f7f7" /> 
                            Read All 50+ Client Stories
                        </a>
                    </div>
                )}

                {/* Optional: Separator for the full list */}
                {!isPreview && (
                    <div className="pt-20">
                        <hr className="border-gray-300"/>
                    </div>
                )}
            </div>
        </div>
    );
}