'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollingTextProps {
  children: React.ReactNode;
  direction?: number;
  speed?: number;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({ children, direction = 1, speed = 1 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `${-100 * speed * direction}%`]);

  return (
    <div className="overflow-hidden whitespace-nowrap " ref={ref}>
      <motion.div className="flex" style={{ x }}>
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-[#C9B99E] text-2xl font-norwester tracking-widest uppercase mr-16 shrink-0">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const ScrollingBanner2 = () => {
  return (
    <div className="bg-[#322e2c] py-8 overflow-hidden relative flex flex-col gap-4 mt-20 mb-20">
      <ScrollingText direction={1} speed={0.2}>
        Complimentary Express Delivery on Every Order
      </ScrollingText>
      <ScrollingText direction={-1} speed={0.3}>
        Complimentary Returns & Exchanges
      </ScrollingText>
      <ScrollingText direction={1} speed={0.15}>
        Exclusive 24/7 Concierge Service
      </ScrollingText>
    </div>
  );
};

export default ScrollingBanner2;
