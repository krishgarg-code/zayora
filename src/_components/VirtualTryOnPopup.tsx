'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VirtualTryOnPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onTryOn: () => void;
}

export default function VirtualTryOnPopup({
  isOpen,
  onClose,
  onTryOn,
}: VirtualTryOnPopupProps) {
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasReachedEndRef = useRef(false); // Ref to track if user has scrolled to end once

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const isAtEnd = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold
      
      // Only update state if user hasn't reached end before
      if (isAtEnd && !hasReachedEndRef.current) {
        setIsScrolledToEnd(true);
        hasReachedEndRef.current = true; // Mark that user has reached end once
      }
    }
  };

  // Reset scroll state when popup opens
  useEffect(() => {
    if (isOpen) {
      setIsScrolledToEnd(false);
      hasReachedEndRef.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  const guidelines = [
    "✅ Stand Alone – Only one person should be in the image. Avoid group photos.",
    "✅ Full Body Visible – Ensure your entire body (head to feet) is clearly visible.",
    "✅ Proper Lighting – Use bright, even lighting. Avoid dark or shadowy areas.",
    "✅ Neutral Background – Prefer a plain or light-colored background.",
    "❌ No Posing or Angled Views – Stand straight facing the camera. Avoid side profiles or tilted poses.",
    "⚠️ Avoid Blurry or Cropped Images – Make sure the image is clear and not cut off."
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[50vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'norwester' }}>
                  Virtual Try-On Guidelines
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable Content - Still scrollable but with limited initial content */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="overflow-y-auto flex-grow p-4"
            >
              {/* Images */}
              <div className="flex justify-center gap-3 mb-4">
                <div className="flex flex-col items-center relative">
                  <div className="bg-gray-100 rounded-lg overflow-hidden w-20 h-30 flex items-center justify-center">
                    <img 
                      src="/vt1.png" 
                      alt="Example 1" 
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  {/* Red badge with X for incorrect example */}
                  <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="mt-1 text-xs text-gray-600">Example 1</span>
                </div>
                
                <div className="flex flex-col items-center relative">
                  <div className="bg-gray-100 rounded-lg overflow-hidden w-20 h-30 flex items-center justify-center">
                    <img 
                      src="/vt2.png" 
                      alt="Example 2" 
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  {/* Red badge with X for incorrect example */}
                  <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="mt-1 text-xs text-gray-600">Example 2</span>
                </div>
                
                <div className="flex flex-col items-center relative">
                  <div className="bg-gray-100 rounded-lg overflow-hidden w-20 h-30 flex items-center justify-center">
                    <img 
                      src="/vt3.png" 
                      alt="Example 3" 
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  {/* Green badge with checkmark for correct example */}
                  <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="mt-1 text-xs text-gray-600">Example 3</span>
                </div>
              </div>

              {/* All guidelines */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-gray-800" style={{ fontFamily: 'norwester' }}>
                  Image Requirements
                </h3>
                {guidelines.map((guideline, index) => (
                  <p key={index} className="text-gray-700 text-xs leading-relaxed">
                    {guideline}
                  </p>
                ))}
              </div>

            </div>

            {/* Footer with Button - Properly integrated within popup */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <button
                onClick={onTryOn}
                disabled={!isScrolledToEnd}
                className={`w-full py-2.5 rounded-full font-norwester text-sm tracking-wider transition-all ${
                  isScrolledToEnd 
                    ? 'bg-[#cba285] text-white hover:bg-[#b89275] cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isScrolledToEnd ? 'TRY ON NOW' : 'SCROLL TO READ ALL GUIDELINES'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}