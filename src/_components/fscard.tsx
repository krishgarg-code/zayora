"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedItem from './AnimatedItem';
import PriceTag from './PriceTag';
import { getAllProducts } from '@/data/products';

// We'll select random products from the catalog
const CurateStyleSection: React.FC = () => {
  const [randomProducts, setRandomProducts] = useState<any[]>([]);
  const [selectedProductForNavigation, setSelectedProductForNavigation] = useState<any>(null);

  // Function to get random products from the catalog
  const getRandomProducts = () => {
    const allProducts = getAllProducts();
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  // Initialize random products on component mount
  useEffect(() => {
    const products = getRandomProducts();
    setRandomProducts(products);
    // Select the first product for the main "Indulge Now" button navigation
    if (products.length > 0) {
      setSelectedProductForNavigation(products[0]);
    }
  }, []);

  const CurateCard: React.FC<{ 
    product: any;
    cardIndex: number;
  }> = ({
    product,
    cardIndex,
  }) => {
    return (
      <div className="flex flex-col items-center">
        {/* === Outer Frame with Diamond Corners === */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative w-full max-w-lg p-3"
        >
          {/* Main border with cut corners */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute inset-0 bg-[#C9B99E]" 
            style={{
              clipPath: "polygon(25px 0, calc(100% - 25px) 0, 100% 25px, 100% calc(100% - 25px), calc(100% - 25px) 100%, 25px 100%, 0 calc(100% - 25px), 0 25px)"
            }} 
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-[2px] bg-[#2E2B29]" 
            style={{
              clipPath: "polygon(23px 0, calc(100% - 23px) 0, 100% 23px, 100% calc(100% - 23px), calc(100% - 23px) 100%, 23px 100%, 0 calc(100% - 23px), 0 23px)"
            }} 
          />

          {/* Diamond decorations */}
          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9B99E] rotate-45" />
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9B99E] rotate-45" />

          {/* === Inner Frame with Image === */}
          <div className="relative w-full aspect-3/4 mt-2 overflow-hidden bg-transparent" style={{
            clipPath: "polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)"
          }}>
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transform scale-105" // Slightly scale up to prevent white edges
            />
          </div>
          
          {/* Price Tag - Positioned at top right corner matching range pages */}
          <div className="absolute top-4 right-0 z-20" style={{ transform: 'translate(15%, 0%)' }}>
            <PriceTag 
              price={product.price}
              animationDelay={cardIndex * 0.15}
              swingIntensity={0.8 + (cardIndex % 3) * 0.3}
              duration={3 + (cardIndex % 4) * 0.5}
            />
          </div>
        </motion.div>

        {/* === Button === */}
        <Link href={`/product/${product.id}`}>
          <button className="mt-8 px-16 py-4 text-l font-sans tracking-widest uppercase border-2 border-[#C9B99E] text-[#C9B99E] hover:bg-[#C9B99E] hover:text-[#2E2B29] transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-[#C9B99E]/50 cursor-pointer" style={{ fontFamily: 'norwester',fontWeight: 'bold' }}>
            INDULGE NOW
          </button>
        </Link>
      </div>
    );
  };

  // Handle main "Indulge Now" button click - navigate to the first random product
  const handleMainIndulgeNow = () => {
    if (selectedProductForNavigation) {
      window.location.href = `/product/${selectedProductForNavigation.id}`;
    }
  };

  return (
    <div className=" text-white py-16 px-4 sm:px-8 lg:px-16 min-h-screen flex flex-col items-center relative overflow-hidden">

      {/* Top Left Star Decoration */}
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-10 opacity-70 hidden lg:block -rotate-15"
      >
        <Image
          src="/star-main.svg" // Replace with a small star SVG for the top-left corner
          alt="Star decoration"
          width={100}
          height={100}
        />
      </motion.div>

      {/* Main Title */}
      <AnimatedItem delay={0.15}>
        <h2 className="text-6xl font-serif text-[#C9B99E] tracking-widest uppercase text-center mt-12 mb-20" style={{ fontFamily: 'Metanoia' }}>
          CURATE YOUR STYLE
        </h2>
      </AnimatedItem>

      {/* Card Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-x-8 justify-items-center mb-16">
        {randomProducts.map((product, index) => (
          <AnimatedItem key={product.id} delay={0.2 + index * 0.1}>
            <CurateCard product={product} cardIndex={index} />
          </AnimatedItem>
        ))}
      </div>

      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-16 -right-7 opacity-60 -rotate-90"
      >
        <Image
          src="/star3.svg"
          alt="Star decoration"
          width={120}
          height={120}
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 right-1/2 opacity-80 -rotate-20"
      >
        <Image
          src="/star2.svg"
          alt="Star decoration"
          width={30}
          height={30}
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-40 right-35 opacity-80 -rotate-20"
      >
        <Image
          src="/star2.svg"
          alt="Star decoration"
          width={50}
          height={50}
        />
      </motion.div>

    </div>
  );
};

export default CurateStyleSection;