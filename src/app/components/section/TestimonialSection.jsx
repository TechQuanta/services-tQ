// src/components/TestimonialsSection.js

"use client";
import React from "react";
import { Play, Star, Quote } from "lucide-react";

// 1. IMPORT THE CENTRAL CONFIG DATA
import configData from "@/lib/data.json"; // Adjust path as needed

/* ----------------------------------------------------
 * EXTRACT DATA FROM JSON
 * ---------------------------------------------------- */
const { header, cta, testimonials: ALL_TESTIMONIALS } = 
    configData.pages.testimonialsPage;
// --- No more hard-coded ALL_TESTIMONIALS array here! ---


/* ----------------------------------------------------
 * VIDEO CARD COMPONENT 
 * ---------------------------------------------------- */
function TestimonialVideoCard({ video, className = "" }) {
    // Note: The structure and appearance of this card remain purely presentational
    return (
        <div
            className={`rounded-2xl overflow-hidden relative shadow-lg transition-transform duration-300 ease-out hover:scale-[1.01] h-full ${className}`}
        >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-neutral-100 transition shadow-xl">
                    <Play size={30} className="text-black ml-1" fill="currentColor" />
                </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-medium">
                {/* Data (duration) is dynamically passed via the 'video' prop */}
                {video.duration}
            </div>
        </div>
    );
}

/* ----------------------------------------------------
 * TEXT CARD COMPONENT
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
                    {/* Data (quote) from JSON */}
                    {testimonial.quote}
                </p>
            </div>

            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-200">
                <div>
                    {/* Data (name) from JSON */}
                    <h4 className="font-bold text-neutral-900 text-md">{testimonial.name}</h4>
                    {/* Data (title) from JSON */}
                    <p className="text-black/70 text-sm">{testimonial.title}</p>
                </div>
            </div>
        </div>
    );
}


/* ----------------------------------------------------
 * MAIN TESTIMONIALS SECTION
 * ---------------------------------------------------- */

export default function TestimonialsSection({ isPreview = false }) {
    
    // Uses the array fetched from the central JSON
    const displayedTestimonials = isPreview 
        ? ALL_TESTIMONIALS.slice(0, 4)
        : ALL_TESTIMONIALS;

    /**
     * Renders Tailwind classes for grid size. The grid logic remains the same.
     */
    const getResponsiveGridClass = (index) => {
        // --- Preview Layout (For /) ---
        if (isPreview) {
            if (index === 2 || index === 3) {
                return "col-span-1 md:col-span-2 md:row-span-2"; 
            }
            return "col-span-1 md:col-span-1";
        }

        // --- Full Page Layout (For /testimonial) ---
        if (index === 2 || index === 3) {
             return "col-span-1 sm:col-span-2 md:col-span-2 md:row-span-2"; 
        }
        if (index === 6 || index === 7) {
            return "col-span-1 sm:col-span-2 md:col-span-2";
        }

        return "col-span-1 md:col-span-1";
    }

    return (
        <div className="bg-white py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Heading (DATA FROM JSON) */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 mb-4">
                        {header.title}
                    </h2>
                    <p className="text-neutral-600 text-xl max-w-3xl mx-auto">
                        {header.subtitle}
                    </p>
                </div>

                {/* GRID LAYOUT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"> 
                    {displayedTestimonials.map((item, index) => {
                        const ItemComponent = item.type === 'video' ? TestimonialVideoCard : TestimonialTextCard;
                        const className = getResponsiveGridClass(index);
                        
                        return (
                            <ItemComponent 
                                key={index} 
                                // Pass 'item' as 'video' or 'testimonial' based on type
                                video={item.type === 'video' ? item : null} 
                                testimonial={item.type === 'text' ? item : null}
                                className={className} 
                            />
                        );
                    })}
                </div>

                {isPreview && (
                    <div className="flex justify-center mt-16">
                        <a 
                            href={cta.link} 
                            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3 sm:py-4 font-semibold text-white rounded-full 
                                        transition-all border-2 border-neutral-900 bg-neutral-900 
                                        hover:bg-black hover:border-black shadow-lg hover:shadow-xl active:scale-[0.98]
                                        text-base sm:text-lg tracking-wide"
                        >
                            <Star size={20} style={{ color: cta.iconColor, fill: cta.iconColor }} /> 
                            {cta.buttonText}
                        </a>
                    </div>
                )}

                {!isPreview && (
                    <div className="pt-20">
                        <hr className="border-gray-300"/>
                    </div>
                )}
            </div>
        </div>
    );
}