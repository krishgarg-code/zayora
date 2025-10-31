'use client';

import React from 'react';
import Image from 'next/image';
import AnimatedItem from './AnimatedItem';

const IMAGE_1_URL = '/a1.jpeg';
const IMAGE_2_URL = '/a2.png';

const AboutUs = () => {
  return (
    <div className="bg-[#322e2c] text-white py-16 px-4 sm:px-8 lg:px-16 min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Main Content Grid */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">

        {/* === LEFT SECTION: Text Content === */}
        <AnimatedItem delay={0.2} className="space-y-6 max-w-md relative">
          <h2
            className="text-5xl font-serif text-[#C9B99E] tracking-widest uppercase mb-6 absolute -top-20 "
            style={{ fontFamily: 'Metanoia' }}
          >
            ABOUT US
          </h2>

          <div className="pt-12">
            <p className="text-base font-light leading-relaxed ">
              At <span className='font-bold'>Zayora</span>, luxury is more than a label — it&apos;s a lifestyle.
              We craft timeless pieces that celebrate individuality, sophistication, and modern elegance. Designed for men, women, and kids, every collection embodies the art of effortless style and refined comfort.
            </p>

            <p className="text-base font-light leading-relaxed mt-6">
              Each garment is meticulously tailored using premium fabrics and thoughtful detailing — where contemporary design meets classic craftsmanship. From the first stitch to the final finish, Zayora represents a commitment to quality, confidence, and quiet luxury.
            </p>
          </div>
        </AnimatedItem>

        {/* === RIGHT SECTION: Images === */}
        {/* === RIGHT SECTION: Images === */}
        <AnimatedItem delay={0.4} className="flex justify-center items-center h-full relative p-4">
          {/* Image 1 (Front) */}
          <div
            className="relative flex items-center justify-center transition-transform duration-300 hover:scale-105 z-20"
            style={{
              border: '2px solid #C0A37F',
              borderRadius: '9999px',
              padding: '1px',
              transform: 'translateX(-80px)', // moves image slightly left
            }}
          >
            <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden 
                    border-[10px] border-[#322e2c] shadow-xl">
              <Image
                src={IMAGE_1_URL}
                alt="Model showcasing a product"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Image 2 (Back, slightly higher and to the right) */}
          <div
            className="absolute transition-transform duration-300 hover:scale-105 z-10 hidden md:flex items-center justify-center"
            style={{
              border: '2px solid #C0A37F',
              borderRadius: '9999px',
              padding: '1px',
              top: '10%',
              right: '-10%',
              transform: 'translateY(-40px) translateX(80px)', // moves image far apart
            }}
          >
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden 
                    border-[10px] border-[#322e2c] shadow-xl">
              <Image
                src={IMAGE_2_URL}
                alt="Close-up of a handbag"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </AnimatedItem>

      </div>

      {/* Star Decorations */}

      <Image
        src="/star-main.svg"
        alt="Star decoration"
        width={50}
        height={50}
        className="absolute top-40 left-30 opacity-100 animate-pulse rotate-[-25deg]"
      />

      <Image
        src="/star-main.svg"
        alt="Star decoration"
        width={50}
        height={50}
        className="absolute bottom-20 right-150 opacity-100 animate-pulse rotate-[-25deg]"
      />

      <Image
        src="/star2.svg"
        alt="Star decoration"
        width={50}
        height={50}
        className="absolute top-18 right-1/4 opacity-80 animate-pulse"
      />

      <Image
        src="/star2.svg"
        alt="Star decoration"
        width={50}
        height={50}
        className="absolute bottom-10 left-15 opacity-80 animate-pulse"
      />
      <Image
        src="/star3.svg"
        alt="Star decoration"
        width={100}
        height={100}
        className="absolute bottom-10 -right-7 opacity-60 animate-pulse -rotate-90"
      />
    </div>
  );
};

export default AboutUs;
