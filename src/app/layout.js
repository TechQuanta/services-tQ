import { Poppins, Roboto, Raleway } from "next/font/google";
import "./globals.css";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ValuesProvider } from "@/context/ValuesContext";

// Headings
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"], // you can adjust
});

// Body text
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Accent / highlights
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "TechQuanta_Services",
  description: "A web development agency specializing in modern, scalable applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${roboto.variable} ${raleway.variable} antialiased`}
      >
        <SmoothCursor  className="z-[110] overflow-hidden"/>
        <ValuesProvider>
          {children}
        </ValuesProvider>
      </body>
    </html>
  );
}
