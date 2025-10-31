'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ScrollingBanner = () => {
  return (
    <div className="bg-[#322e2c] py-4 overflow-hidden relative">
      <div className="flex items-center justify-center">
        {/* Infinite scrolling text with Framer Motion */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: [0, -50 + '%']
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            <span className="text-[#C9B99E] text-2xl font-norwester tracking-widest uppercase mr-16 flex-shrink-0">
              Redefining Luxury for Every Generation
            </span>
            <span className="text-[#C9B99E] text-2xl font-norwester tracking-widest uppercase mr-16 flex-shrink-0">
              Redefining Luxury for Every Generation
            </span>
            <span className="text-[#C9B99E] text-2xl font-norwester tracking-widest uppercase mr-16 flex-shrink-0">
              Redefining Luxury for Every Generation
            </span>
            <span className="text-[#C9B99E] text-2xl font-norwester tracking-widest uppercase mr-16 flex-shrink-0">
              Redefining Luxury for Every Generation
            </span>
          </motion.div>
          
          <motion.div
            className="flex"
            animate={{
              x: [0, -50 + '%']
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            <span className="text-[#C9B99E] text-2xl font-norwester tracking-widest uppercase mr-16 flex-shrink-0">
              Redefining Luxury for Every Generation
            </span>
            <span className="text-[#C9B99E] text-2xl font-norwester tracking-widest uppercase mr-16 flex-shrink-0">
              Redefining Luxury for Every Generation
            </span>
            <span className="text-[#C9B99E] text-2xl font-norwester tracking-widest uppercase mr-16 flex-shrink-0">
              Redefining Luxury for Every Generation
            </span>
            <span className="text-[#C9B99E] text-2xl font-norwester tracking-widest uppercase mr-16 flex-shrink-0">
              Redefining Luxury for Every Generation
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;
