import { Poppins, Roboto, Raleway } from "next/font/google";
import "./globals.css";
import { ValuesProvider } from "@/context/ValuesContext";
import { HydrationProvider } from "@/components/HydrationProvider";
// Headings
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

// Body text
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Accent / highlights
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "TechQuanta - Web Development & MVP Services",
  description: "Transform your ideas into production-ready MVPs. Expert web development agency specializing in React, Next.js, and modern technologies.",
  keywords: "web development, MVP development, React, Next.js",
  authors: [{ name: "TechQuanta" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${roboto.variable} ${raleway.variable} antialiased`}
        suppressHydrationWarning
      >
        <HydrationProvider>
          <ValuesProvider>
            {children}
          </ValuesProvider>
        </HydrationProvider>
      </body>
    </html>
  );
}