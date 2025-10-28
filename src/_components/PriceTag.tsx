import React from "react";
import { motion } from "framer-motion";

interface PriceTagProps {
  price: string;
  animationDelay?: number;
  swingIntensity?: number;
  duration?: number;
}

const PriceTag: React.FC<PriceTagProps> = ({ 
  price, 
  animationDelay = 0, 
  swingIntensity = 1, 
  duration = 3.5 
}) => {
  // Calculate rotation values based on intensity
  const baseAngle = -25;
  const swingRange = 12 * swingIntensity; // Increased from 5 to 12 for more pronounced swing
  
  return (
    <motion.div
      className="relative flex justify-center items-center w-16 h-16 z-50"
      style={{
        transformOrigin: "top center",
        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))"
      }}
      animate={{
        rotate: [
          baseAngle, 
          baseAngle + swingRange, 
          baseAngle - swingRange, 
          baseAngle + swingRange * 0.5, 
          baseAngle
        ],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
        delay: animationDelay
      }}
    >
      {/* Tag shape - circular */}
      <div className="relative w-full h-full flex items-center justify-center rounded-full border-[2.5px] border-[#C9B99E] bg-[#E8E3D9] shadow-md">
        {/* Center text */}
        <span
          className="text-[#2E2B29] font-bold text-[10px]"
          style={{ fontFamily: "norwester" }}
        >
          {price}
        </span>

        {/* Hole near top */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#E8E3D9] rounded-full border-[2px] border-[#C9B99E]" />

        {/* Rope loop (SVG) */}
        <svg
          className="absolute -top-5 left-1/2 -translate-x-1/2"
          width="20"
          height="26"
          viewBox="0 0 20 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 26 C5 15, 5 7, 10 0 C15 7, 15 15, 10 26"
            stroke="#4A5568"
            strokeWidth="1.5"
            opacity="0.7"
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default PriceTag;
