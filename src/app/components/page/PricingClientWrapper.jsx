// components/page/PricingClientWrapper.jsx
"use client";

// ⬅️ CRITICAL FIX: Import MEETING_SLUGS from a separate, non-component file
import { MEETING_SLUGS } from '@/lib/config/meetingSlugs'; 

// Import components (IntroChatDrawer no longer needs to export MEETING_SLUGS)
import IntroChatDrawer from '@/app/components/ui/Meet';
import Hero from '@/app/components/ui/Hero';
import ServiceSectionWrapper from '@/app/components/section/ServiceSection'; 

// This component encapsulates ALL client-side rendering logic
export default function PricingClientWrapper() {
    return (
        <IntroChatDrawer>
            {({ openChat }) => (
                <main>
                    {/* The client-defined data is now correctly passed down */}
                    <Hero openChat={openChat} MEETING_SLUGS={MEETING_SLUGS} />
                    
                    <ServiceSectionWrapper 
                        openChat={openChat} 
                        MEETING_SLUGS={MEETING_SLUGS} 
                    /> 
                    
                    {/* Include other components previously inside the main tag */}
                </main>
            )}
        </IntroChatDrawer>
    );
}