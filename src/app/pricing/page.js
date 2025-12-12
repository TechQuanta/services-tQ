// Example: The file where IntroChatDrawer actually wraps the content

import IntroChatDrawer, { MEETING_SLUGS } from '@/app/components/ui/Meet';
import Hero from '@/app/components/ui/Hero';
import ServiceSectionWrapper from '@/app/components/section/ServiceSection'; // The integrated one

export default function MyPage() {
    return (
        <IntroChatDrawer>
            {({ openChat }) => (
                <main>
                    {/* The Hero component receives the props */}
                    <Hero openChat={openChat} MEETING_SLUGS={MEETING_SLUGS} />
                    
                    {/* The ServiceSectionWrapper already handles the props internally */}
                    <ServiceSectionWrapper /> 
                    
                    {/* Other components... */}
                </main>
            )}
        </IntroChatDrawer>
    );
}