'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProductCardProps {
  imageUrl: string;
  altText: string;
  productName: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  altText,
  productName,
  price,
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* === Outer Frame with Diamond Corners === */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative w-full max-w-sm p-3"
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
            src={imageUrl}
            alt={altText}
            layout="fill"
            objectFit="cover"
            className="transform scale-105"
          />
        </div>
      </motion.div>

      {/* Product Name */}
      <h3 className="mt-4 text-xl font-serif text-[#C9B99E] tracking-wide text-center">
        {productName}
      </h3>

      {/* Price */}
      <p className="mt-2 text-lg text-white font-light tracking-wider">
        {price}
      </p>

      {/* === Button === */}
      <button className="mt-6 px-12 py-3 text-sm font-sans tracking-widest uppercase border-2 border-[#C9B99E] text-[#C9B99E] hover:bg-[#C9B99E] hover:text-[#2E2B29] transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-[#C9B99E]/50 cursor-pointer" 
        style={{ fontFamily: 'norwester', fontWeight: 'bold' }}>
        INDULGE NOW
      </button>
    </div>
  );
};

export default ProductCard;
