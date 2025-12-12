// Hero.jsx 
"use client";

import { Spotlight } from "../../../components/ui/spotlight";
import { DotPattern } from "../../../components/ui/dot-pattern";
import { ContainerTextFlip } from "../../../components/ui/container-text-flip";

export default function Hero({ openChat, MEETING_SLUGS }) {
    
    // Console error check is kept to track the rogue rendering
    if (!openChat || !MEETING_SLUGS) {
        console.error("Hero component requires openChat and MEETING_SLUGS props.");
    }
    
    return (
        <div className="relative z-10 mx-auto mt-[100px] md:mt-0 flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-4 py-20 text-center">

            {/* Background Elements */}
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="#01f7f7"
            />
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className="[mask-image:linear-gradient(to_bottom,white,transparent)] opacity-40"
            />

            {/* Main Heading */}
            <h1 className="text-center text-4xl font-bold text-neutral-900 md:text-6xl lg:text-7xl relative">

                <div className="absolute -top-12 -left-10 md:-top-16 md:-left-20 z-20 rotate-[-5deg] pl-6 ">
                    <img
                        src="/rocket.png"
                        alt="Rocket"
                        className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] "
                    />
                </div>

                <span className="relative z-10">
                    Ship
                </span>

                {" "}AI-Driven Web Apps Fast <br />
                From{" "}
                <span
                    className="inline-block px-4 py-1 text-white md:px-6 md:py-2 font-bold ml-2 rounded-md"
                    style={{
                        backgroundColor: "#01f7f7",
                        boxShadow:
                            "0 0 20px rgba(1, 247, 247, 0.4), inset 0 0 10px rgba(1, 247, 247, 0.2)",
                    }}
                >
                    Idea to MVP in <ContainerTextFlip words={["Months", "Weeks", "Days"]} />
                </span>

            </h1>

            {/* Subtext */}
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-neutral-600 md:text-xl">
                Build production-ready MVPs with cutting-edge AI technology. 
                We handle the complexity, you focus on growth.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
                <button 
                    onClick={() => openChat(MEETING_SLUGS.PROJECT_DISCUSSION)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-8 py-3 font-semibold text-white transition-all hover:bg-neutral-800 active:scale-95"
                >
                    <img src="/google-meet.svg" alt="Meet Icon" className="h-5 w-5" />
                    Book Project Discussion
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-neutral-900 px-8 py-3 font-semibold text-neutral-900 transition-all hover:bg-neutral-50 active:scale-95"
                onClick={() => window.location.href='/work'}>
                    <img src="/portfolio.png" alt="Portfolio" className="h-5 w-5" />
                    Portfolio
                </button>
            </div>
        </div>
    );
}