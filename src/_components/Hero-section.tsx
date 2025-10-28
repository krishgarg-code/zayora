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
    <section className="relative w-full h-[700px] md:h-[800px] lg:h-[900px] overflow-hidden" style={{ backgroundColor: '#322e2c' }}>
      {/* Diagonal Grid Background */}
      <DiagonalGrid />

      {/* Shop Now Button */}
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
      {/* Central Text */}
      <motion.div 
        className="absolute top-150 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          delay: 0.8 
        }}
      >
        <motion.h2 
          className="text-7xl  font-light tracking-widest uppercase mb-8" 
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
          className="text-4xl pt -100  font-light tracking-widest uppercase" 
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
      </motion.div>

      {/* Oval Image Frames */}
      {/* Central Frame */}
      <motion.div 
        className="absolute top-70 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
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

      {/* Left Middle Frame */}
      <motion.div 
        className="absolute top-85 left-113 transform -translate-x-1/2 -translate-y-1/2 z-10"
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

      {/* Right Middle Frame */}
      <motion.div 
        className="absolute top-85 right-113 transform translate-x-1/2 -translate-y-1/2 z-10"
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

      {/* Far Left Frame */}
      <motion.div 
        className="absolute bottom-50 left-40 transform -translate-x-1/2 z-10"
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

      {/* Far Right Frame */}
      <motion.div 
        className="absolute bottom-50 right-40 transform translate-x-1/2 z-10"
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

       {/* <motion.div
         initial={{ scale: 0, opacity: 0, rotate: -45 }}
         animate={{ scale: 1, opacity: 1, rotate: -45 }}
         transition={{ 
           duration: 0.6, 
           ease: "easeOut",
           delay: 2.3 
         }}
       >
         <Image 
           src="/star-main.svg" 
           alt="Star" 
           width={30} 
           height={30} 
           className="absolute top-1/3 right-1/4 opacity-75 animate-pulse" 
         />
       </motion.div> */}
       
     </section>
  );
}