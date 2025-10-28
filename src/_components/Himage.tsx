// components/OvalImageFrame.jsx
import React from 'react';
import Image from 'next/image';

interface OvalImageFrameProps {
  src: string;
  alt: string;
  className?: string;
}

export default function OvalImageFrame({ src, alt, className = "" }: OvalImageFrameProps) {
  return (
    <div className={`relative flex items-center justify-center py-1 ${className}`}>
      {/* Unified scaling container */}
      <div className="relative inline-block transition-transform duration-300 will-change-transform hover:scale-105">
        {/* Outer Gold Oval Border */}
        <div
          className="relative flex items-center justify-center w-[260px] h-[370px] md:w-[320px] md:h-[460px]"
          style={{
            border: '2px solid #C0A37F',
            borderRadius: '9999px',
            padding: '15px',
          }}
        >
          {/* Inner Image Mask */}
          <div
            className="relative overflow-hidden w-full h-full"
            style={{
              borderRadius: '9999px',
              clipPath: 'capsule(50% 50% at 50% 50%)',
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 280px, 320px"
            />
          </div>
        </div>

        {/* Left Gold Diamond */}
        <div
          className="absolute left-[-7px] top-1/2 -translate-y-1/2 rotate-45"
          style={{
            width: '15px',
            height: '15px',
            backgroundColor: '#C0A37F',
          }}
        />

        {/* Right Gold Diamond */}
        <div
          className="absolute right-[-7px] top-1/2 -translate-y-1/2 rotate-45"
          style={{
            width: '15px',
            height: '15px',
            backgroundColor: '#C0A37F',
          }}
        />
      </div>
    </div>
  );
}
