'use client';

import React from 'react';
import Link from 'next/link';
import OvalImageFrame from './Himage';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedItem from './AnimatedItem';

const DiagonalGrid = () => (
  <div
    className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center"
    style={{
      backgroundColor: 'transparent',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: '-60%',
        left: '-60%',
        width: '250%',
        height: '250%',
        backgroundImage: `
          linear-gradient(90deg, rgba(218,177,135,0.3) 1px, transparent 1px),
          linear-gradient(rgba(218,177,135,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        transform: 'rotate(-45deg)',
        transformOrigin: 'center center',
        opacity: 0.5,
      }}
    />
  </div>
);

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[700px] md:h-[700px] md:min-h-[700px] lg:h-[800px] xl:h-[900px] overflow-hidden flex flex-col items-center justify-center md:block" style={{ backgroundColor: '#322e2c' }}>
      {/* Diagonal Grid Background */}
      <DiagonalGrid />

      {/* Shop Now Button - hidden on small screens, visible on md and up */}
      <div className="hidden md:block">
        <AnimatedItem delay={0.3} className="absolute top-20 right-40 z-20">
          <Link 
            href="/ranges/women" 
            className="flex items-center px-6 py-3 rounded-full text-black text-base font-semibold transition-all duration-300 group transform hover:scale-110 hover:shadow-2xl hover:shadow-[#D4B892]/50"
            style={{ backgroundColor: '#D4B892' }}
          >
            Shop Now 
            <svg 
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </AnimatedItem>
      </div>

      {/* Central Text - centered on small screens, positioned on larger screens */}
      <motion.div 
        className="absolute md:top-150 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 text-center z-10 flex flex-col items-center justify-center w-full h-full md:h-auto md:w-auto md:relative md:flex-none"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          delay: 0.8 
        }}
      >
        <motion.h2 
          className="text-5xl md:text-7xl font-light tracking-widest uppercase mb-4 md:mb-8" 
          style={{ color: '#dab187', fontFamily: 'Metanoia' ,fontWeight:'bold' }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 1.2 
          }}
        >
          ELEVATE
        </motion.h2>
        <motion.h1 
          className="text-3xl md:text-4xl pt-0 font-light tracking-widest uppercase" 
          style={{ color: '#dab187', fontFamily: 'Metanoia', fontWeight:'bold' }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 1.4 
          }}
        >
          YOUR STYLE
        </motion.h1>
        {/* Mobile Shop Now Button - visible only on small screens */}
        <div className="md:hidden mt-8">
          <Link 
            href="/ranges/women" 
            className="flex items-center px-6 py-3 rounded-full text-black text-base font-semibold transition-all duration-300 group transform hover:scale-110 hover:shadow-2xl hover:shadow-[#D4B892]/50"
            style={{ backgroundColor: '#D4B892' }}
          >
            Shop Now 
            <svg 
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </motion.div>

      {/* Progressive Image Display System */}
      {/* Central Frame - Visible on tablet and up */}
      <motion.div 
        className="absolute top-70 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
        initial={{ y: 200, opacity: 0, scale: 0.5 }}
        whileHover={{ scale: 0.8 }}
        animate={{ 
          y: [0, -8, 0],
          opacity: 1, 
          scale: 0.75 
        }}
        transition={{ 
          duration: 1.2, 
          ease: "easeOut",
          delay: 0.5,
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <OvalImageFrame src="/heroi1.png" alt="Central Model" />
      </motion.div>

      {/* Left Middle Frame - Visible on tablet and up */}
      <motion.div 
        className="absolute top-85 left-113 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block"
        initial={{ x: -100, y: 200, opacity: 0, scale: 0.5 }}
        whileHover={{ scale: 0.8 }}
        animate={{ 
          x: [0, -5, 0],
          y: [0, -6, 0],
          opacity: 1, 
          scale: 0.75 
        }}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          delay: 0.5,
          x: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          },
          y: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <OvalImageFrame src="/heroi2.png" alt="Left Model" />
      </motion.div>

      {/* Right Middle Frame - Visible on tablet and up */}
      <motion.div 
        className="absolute top-85 right-113 transform translate-x-1/2 -translate-y-1/2 z-10 hidden md:block"
        initial={{ x: 100, y: 200, opacity: 0, scale: 0.5 }}
        whileHover={{ scale: 0.8 }}
        animate={{ 
          x: [0, 5, 0],
          y: [0, -7, 0],
          opacity: 1, 
          scale: 0.75 
        }}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          delay: 0.5,
          x: {
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut"
          },
          y: {
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <OvalImageFrame src="/heroi4.png" alt="Right Model" />
      </motion.div>

      {/* Far Left Frame - Visible on desktop only */}
      <motion.div 
        className="absolute bottom-50 left-40 transform -translate-x-1/2 z-10 hidden lg:block"
        initial={{ x: -150, y: 100, opacity: 0, scale: 0.5 }}
        whileHover={{ scale: 0.8 }}
        animate={{ 
          x: [0, -4, 0],
          y: [0, -5, 0],
          opacity: 1, 
          scale: 0.75 
        }}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          delay: 0.5,
          x: {
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut"
          },
          y: {
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <OvalImageFrame src="/heroi3.png" alt="Far Left Model" />
      </motion.div>

      {/* Far Right Frame - Visible on desktop only */}
      <motion.div 
        className="absolute bottom-50 right-40 transform translate-x-1/2 z-10 hidden lg:block"
        initial={{ x: 150, y: 100, opacity: 0, scale: 0.5 }}
        whileHover={{ scale: 0.8 }}
        animate={{ 
          x: [0, 4, 0],
          y: [0, -6, 0],
          opacity: 1, 
          scale: 0.75 
        }}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          delay: 0.5,
          x: {
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut"
          },
          y: {
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <OvalImageFrame src="/heroi5.png" alt="Far Right Model" />
      </motion.div>

      {/* Stars - Visible on tablet and up */}
      <div className="hidden md:block">
        <Image 
          src="/star-main.svg" 
          alt="Star" 
          width={50} 
          height={50} 
          className="absolute top-40 left-50 opacity-100 animate-pulse -rotate-25" 
        />
        
        <Image 
          src="/star-main.svg" 
          alt="Star" 
          width={35} 
          height={35} 
          className="absolute bottom-43 left-75 opacity-100 animate-pulse delay-300 rotate-25" 
        />
        <Image 
          src="/star-main.svg" 
          alt="Star" 
          width={35} 
          height={35} 
          className="absolute bottom-50 right-90 opacity-100 animate-pulse delay-400" 
        />
      </div>
    </section>
  );
}