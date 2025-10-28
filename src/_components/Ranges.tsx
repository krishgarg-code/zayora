'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedItem from './AnimatedItem';


const IMAGE_GENTLEMEN_URL = '/mr.jpeg'; // Updated to use mr.jpeg
const IMAGE_LADIES_URL = '/wr.jpeg';     // Updated to use wr.jpeg
const IMAGE_LITTLE_LUXE_URL = '/kr.jpeg'; // Updated to use kr.jpeg

const RangesSection: React.FC = () => {
  return (
    <div className="bg-[#322e2c] text-white py-16 px-4 sm:px-8 lg:px-16 min-h-screen flex flex-col items-center justify-between relative overflow-hidden  pt -20 mb-10">


      {/* Main Title */}

      <AnimatedItem delay={0.25}>
        <h2 className="text-6xl font-serif text-[#C9B99E] tracking-widest uppercase text-center mt-12 mb-20 lg:mb-24" style={{ fontFamily: 'Metanoia' }}>
          WHAT DO WE SELL?
        </h2>
      </AnimatedItem>

      {/* Categories Grid */}
      <AnimatedItem delay={0.5} className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-8 lg:gap-x-16 justify-items-center mb-16">


        {/* === Category 1: Gentlemen === */}
        <Link href="/ranges/men" className="flex flex-col items-center text-center max-w-sm cursor-pointer group">
          {/* Arched Image Container */}




          <div className="relative flex items-center justify-center p-5 pb-2 rounded-t-full border-4 border-[#C9B99E] scale-90 transition-all duration-300 group-hover:scale-[1] hover:shadow-2xl hover:shadow-[#C9B99E]/20">
            {/* Stars on the outer border */}
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9B99E] rotate-45 block rounded-[1px]" />
            <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9B99E] rotate-45 block rounded-[1px]" />

            {/* Inner arched image container (no border now, closer to bottom) */}
            <div
              className="relative w-[250px] h-[320px] sm:w-[280px] sm:h-[360px] lg:w-[300px] lg:h-[390px]
    rounded-t-full overflow-hidden mb-3 flex items-center justify-center
    before:content-[''] before:absolute before:inset-0 before:bg-white before:opacity-10 before:rounded-t-full will-change-transform"
            >
              <Image
                src={IMAGE_GENTLEMEN_URL}
                alt="Gentlemen's collection"
                layout="fill"
                objectFit="cover"
                className="rounded-t-full"
              />
            </div>
          </div>







          <h3 className="text-3xl font-serif text-[#C9B99E] mb-4 group-hover:underline">Gentlemen</h3>
          <p className="text-sm font-light leading-relaxed px-4">
            Our Gentlemen Collection blends refined tailoring, premium materials, and a touch of understated class.
            Designed for those who dress with purpose — because <span className='font-bold'>style is your signature.</span>
          </p>
        </Link>

        {/* === Category 2: Ladies === */}
        <Link href="/ranges/women" className="flex flex-col items-center text-center max-w-sm cursor-pointer group">
          {/* Arched Image Container */}



          <div className="relative flex items-center justify-center p-5 pb-2 rounded-t-full border-4 border-[#C9B99E] scale-90 transition-all duration-300 group-hover:scale-[1] hover:shadow-2xl hover:shadow-[#C9B99E]/20">
            {/* Stars on the outer border */}
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9B99E] rotate-45 block rounded-[1px]" />
            <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9B99E] rotate-45 block rounded-[1px]" />

            {/* Inner arched image container (no border now, closer to bottom) */}
            <div
              className="relative w-[250px] h-[320px] sm:w-[280px] sm:h-[360px] lg:w-[300px] lg:h-[390px]
    rounded-t-full overflow-hidden mb-3 flex items-center justify-center
    before:content-[''] before:absolute before:inset-0 before:bg-white before:opacity-10 before:rounded-t-full will-change-transform"
            >
              <Image
                src={IMAGE_LADIES_URL}
                alt="Ladies' collection"
                layout="fill"
                objectFit="cover"
                className="rounded-t-full"
              />


            </div>
          </div>



          <h3 className="text-3xl font-serif text-[#C9B99E] mb-4 group-hover:underline">Ladies</h3>
          <p className="text-sm font-light leading-relaxed px-4">
            Where grace meets confidence. Our Women Collection is crafted from luxurious fabrics that move with elegance and ease.
             Designed for the <span className='font-bold'>woman who knows her worth</span>
          </p>
        </Link>

        {/* === Category 3: Little Luxe === */}
        <Link href="/ranges/kids" className="flex flex-col items-center text-center max-w-sm cursor-pointer group">
          {/* Arched Image Container */}




          <div className="relative flex items-center justify-center p-5 pb-2 rounded-t-full border-4 border-[#C9B99E] scale-90 transition-all duration-300 group-hover:scale-[1] hover:shadow-2xl hover:shadow-[#C9B99E]/20">
            {/* Stars on the outer border */}
<span className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9B99E] rotate-45 block rounded-[1px]" />
            <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9B99E] rotate-45 block rounded-[1px]" />

            {/* Inner arched image container (no border now, closer to bottom) */}
            <div
              className="relative w-[250px] h-[320px] sm:w-[280px] sm:h-[360px] lg:w-[300px] lg:h-[390px]
    rounded-t-full overflow-hidden mb-3 flex items-center justify-center
    before:content-[''] before:absolute before:inset-0 before:bg-white before:opacity-10 before:rounded-t-full will-change-transform"
            >
              <Image
                src={IMAGE_LITTLE_LUXE_URL}
                alt="Little Luxe collection"
                layout="fill"
                objectFit="cover"
                className="rounded-t-full"
              />

            </div>
          </div>



          <h3 className="text-3xl font-serif text-[#C9B99E] mb-4 group-hover:underline">Little Luxe</h3>
          <p className="text-sm font-light leading-relaxed px-4">
            Our Kids Collection blends gentle fabrics, modern design, and effortless charm — made for comfort without compromise.
            Luxury begins early — let them<span className='font-bold'> shine with Zayora.</span>
          </p>
        </Link>
      </AnimatedItem>


      {/* Bottom Right: Decorative Star Burst */}
      <Image
        src="/star3.svg"
        alt="Star decoration"
        width={120}
        height={120}
        className="absolute bottom-16 -right-7 opacity-60 animate-pulse -rotate-90"
      />

      <Image
        src="/star2.svg"
        alt="Star decoration"
        width={100}
        height={100}
        className="absolute bottom-100 left-5 opacity-80 animate-pulse -rotate-20"
      />
      <Image
        src="/star2.svg"
        alt="Star decoration"
        width={100}
        height={100}
        className="absolute top-40 right-5 opacity-80 animate-pulse -rotate-20"
      />
    </div>


  );
};

export default RangesSection;