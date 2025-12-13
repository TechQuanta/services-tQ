"use client";
import React, { useState, useEffect, useId } from "react";
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700
}) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const [isMounted, setIsMounted] = useState(false);
  const textRef = React.useRef(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      // Add some padding to the text width (30px on each side)
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  };

  // Initialize on client side only to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    updateWidthForWord();
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    // Update width whenever the word changes
    updateWidthForWord();
  }, [currentWordIndex, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval, isMounted]);

  // Render placeholder on server to match client hydration
  if (!isMounted) {
    return (
      <div
        className={cn(
          "relative inline-block rounded-lg pt-2 pb-3 text-center text-4xl font-bold text-black md:text-7xl",
          "bg-transparent",
          "shadow-none",
          className
        )}
      >
        <span className={cn("inline-block", textClassName)} ref={textRef}>
          {words[0]}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg pt-2 pb-3 text-center text-4xl font-bold text-black md:text-7xl",
        "bg-transparent",
        "shadow-none",
        className
      )}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className={cn("inline-block", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.span 
          className="inline-block"
          initial={{
            opacity: 0,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: animationDuration / 1000,
          }}
          key={words[currentWordIndex]}
        >
          {words[currentWordIndex]}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}