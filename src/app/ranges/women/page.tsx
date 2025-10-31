'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTag from '@/_components/PriceTag';
import MyNavbar from '@/_components/Navbar';
import Footer from '@/_components/Footer';
import BackButton from '@/_components/BackButton';
import { getProductsByRange } from '@/data/products';
import { Product } from '@/types/product';

const WomenRangesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Get women's products
  const womenProducts = getProductsByRange('women') as Product[];

  // Filter products based on search term and category filter
  let filteredProducts = womenProducts.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products based on selected option
  if (sortOption === 'priceLowToHigh') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.priceValue - b.priceValue);
  } else if (sortOption === 'priceHighToLow') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.priceValue - a.priceValue);
  }

  return (
    <>
      <MyNavbar />
      <div className="bg-[#322e2c] text-white min-h-screen py-8 px-4 sm:px-8 lg:px-16">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto mb-4">
          <BackButton fallbackUrl="/ranges" label="Back" />
        </div>

        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto mb-8">
          <nav className="flex items-center gap-2 text-sm text-[#C9B99E]">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/ranges" className="hover:underline">Ranges</Link>
            <span>/</span>
            <span className="text-white">Women</span>
          </nav>
        </div>

        {/* Hero Section with Large Image and Title */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Large Featured Image - Left Side */}
            <div className="relative flex items-center justify-center">
              {/* Outer frame with clipped corners */}
              <div className="relative w-full max-w-lg p-5">
                {/* Main border with cut corners */}
                <div className="absolute inset-0 bg-[#C9B99E]"
                  style={{
                    clipPath: "polygon(35px 0, calc(100% - 35px) 0, 100% 35px, 100% calc(100% - 35px), calc(100% - 35px) 100%, 35px 100%, 0 calc(100% - 35px), 0 35px)"
                  }}
                />
                <div className="absolute inset-[2px] bg-[#2E2B29]"
                  style={{
                    clipPath: "polygon(33px 0, calc(100% - 33px) 0, 100% 33px, 100% calc(100% - 33px), calc(100% - 33px) 100%, 33px 100%, 0 calc(100% - 33px), 0 33px)"
                  }}
                />

                {/* Diamond decorations */}
                <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#C9B99E] rotate-45" />
                <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#C9B99E] rotate-45" />

                {/* Image */}
                <div className="relative w-full aspect-[3/4] mt-2 overflow-hidden bg-transparent"
                  style={{
                    clipPath: "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)"
                  }}>
                  <Image
                    src={womenProducts.length > 0 ? womenProducts[0].image : "/womens/ivory-cropped-blazer-wide-leg-pants-set.png"}
                    alt="Ladies collection"
                    layout="fill"
                    objectFit="cover"
                    className="transform scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Title and Description - Right Side */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl lg:text-7xl font-serif text-[#C9B99E] tracking-widest uppercase mb-8"
                style={{ fontFamily: 'Metanoia', lineHeight: '1.2' }}>
                THE ELEGANT WOMAN
              </h1>
              <p className="text-base leading-relaxed text-gray-300 max-w-xl">
                Where grace meets confidence. Our Women Collection is crafted from luxurious fabrics that move with elegance and ease.
                Designed for the woman who knows her worth — every piece tells a story of sophistication and timeless beauty.
              </p>

              {/* Search Bar */}
              <div className="mt-8">
                <div className="relative w-full max-w-xl">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 bg-[#2E2B29] border-2 border-[#C9B99E] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B99E] focus:border-transparent transition-all duration-300"
                    style={{ fontFamily: 'norwester' }}
                  />
                  <svg
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9B99E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Sort and Filter Panel */}
              <div className="mt-6 w-full max-w-xl">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Sort Dropdown */}
                  <div className="flex-1">
                    <label className="block text-[#C9B99E] text-sm mb-2" style={{ fontFamily: 'norwester' }}>
                      SORT BY
                    </label>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="w-full px-4 py-3 bg-[#2E2B29] border-2 border-[#C9B99E] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B99E] focus:border-transparent transition-all duration-300 cursor-pointer"
                      style={{ fontFamily: 'norwester' }}
                    >
                      <option value="" className="bg-[#2E2B29]">Default</option>
                      <option value="priceLowToHigh" className="bg-[#2E2B29]">Price: Low to High</option>
                      <option value="priceHighToLow" className="bg-[#2E2B29]">Price: High to Low</option>
                    </select>
                  </div>

                  {/* Filter Dropdown */}
                  <div className="flex-1">
                    <label className="block text-[#C9B99E] text-sm mb-2" style={{ fontFamily: 'norwester' }}>
                      FILTER BY
                    </label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-[#2E2B29] border-2 border-[#C9B99E] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B99E] focus:border-transparent transition-all duration-300 cursor-pointer"
                      style={{ fontFamily: 'norwester' }}
                    >
                      <option value="" className="bg-[#2E2B29]">All Categories</option>
                      <option value="topwear" className="bg-[#2E2B29]">Topwear</option>
                      <option value="bottomwear" className="bg-[#2E2B29]">Bottomwear</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid - 4x4 Layout or No Results Message */}
        <div className="max-w-7xl mx-auto px-2">
          {filteredProducts.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <p className="text-2xl text-[#C9B99E] tracking-wide" style={{ fontFamily: 'Metanoia' }}>
                Product not in inventory, sorry
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-x-4 justify-items-center">
              {filteredProducts.map((product: Product, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  {/* === Outer Frame with Diamond Corners === */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative w-full max-w-4xl p-6"
                  >
                    {/* Main border with cut corners */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute inset-0 bg-[#C9B99E]"
                      style={{
                        clipPath: "polygon(35px 0, calc(100% - 35px) 0, 100% 35px, 100% calc(100% - 35px), calc(100% - 35px) 100%, 35px 100%, 0 calc(100% - 35px), 0 35px)"
                      }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute inset-[2px] bg-[#2E2B29]"
                      style={{
                        clipPath: "polygon(33px 0, calc(100% - 33px) 0, 100% 33px, 100% calc(100% - 33px), calc(100% - 33px) 100%, 33px 100%, 0 calc(100% - 33px), 0 33px)"
                      }}
                    />

                    {/* Diamond decorations */}
                    <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9B99E] rotate-45" />
                    <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9B99E] rotate-45" />

                    {/* === Inner Frame with Image === */}
                    <div className="relative w-full aspect-3/4 mt-2 overflow-hidden bg-transparent" style={{
                      clipPath: "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)"
                    }}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="transform scale-105"
                      />
                    </div>

                    {/* Price Tag in Top Right Corner - Outside clipped container */}
                    <div className="absolute top-4 right-0 z-20" style={{ transform: 'translate(15%, 0%)' }}>
                      <PriceTag 
                        price={product.price} 
                        animationDelay={index * 0.15}
                        swingIntensity={0.8 + (index % 3) * 0.3}
                        duration={3 + (index % 4) * 0.5}
                      />
                    </div>
                  </motion.div>

                  {/* === Button === */}
                  <Link href={`/product/${product.id}`}>
                    <button className="mt-8 px-16 py-4 text-l font-sans tracking-widest uppercase border-2 border-[#C9B99E] text-[#C9B99E] hover:bg-[#C9B99E] hover:text-[#2E2B29] transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-[#C9B99E]/50 cursor-pointer" style={{ fontFamily: 'norwester', fontWeight: 'bold' }}>
                      INDULGE NOW
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Page Number */}

        {/* Decorative Star */}
        <div className="absolute -bottom-15 -right-10 opacity-60 -rotate-90">
          <Image
            src="/star3.svg"
            alt="Star decoration"
            width={150}
            height={150}
            className="animate-pulse"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WomenRangesPage;
