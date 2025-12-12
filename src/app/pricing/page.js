// /pricing/page.jsx (or MyPage.jsx)
// NO "use client" directive here.

import PricingClientWrapper from '@/app/components/page/PricingClientWrapper'; // Import the new wrapper
// NOTE: You no longer need to import IntroChatDrawer, Hero, or ServiceSectionWrapper here.
// NOTE: You no longer need to import MEETING_SLUGS here IF it's only used inside the wrapper.

export default function MyPage() {
    // This is the clean server component render.
    // It passes a serializable component tag, not a function prop.
    return (
        <PricingClientWrapper />
    );
}