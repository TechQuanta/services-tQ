
  // app/testimonial/page.js
import TestimonialsSection from "../components/section/TestimonialSection";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

export default function TestimonialPage() {
    return (
        <>
            {/* You will likely want the Navbar here */}
            <Navbar /> 
            
            <main className="min-h-screen bg-white">
                {/* The testimonial content */}
                <TestimonialsSection  isPreview={false}/> 
            </main>

            {/* And the Footer */}
            <Footer />
        </>
    );
}