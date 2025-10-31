'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  fallbackUrl?: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ fallbackUrl = '/', label = 'Back' }) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else if (fallbackUrl) {
      router.push(fallbackUrl);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-[#C9B99E] hover:text-white transition-colors duration-300 group cursor-pointer"
    >
      {/* Back Arrow Icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform group-hover:-translate-x-1 transition-transform duration-300"
      >
        <path
          d="M19 12H5M5 12L12 19M5 12L12 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-sm font-medium tracking-wide uppercase" style={{ fontFamily: 'norwester' }}>
        {label}
      </span>
    </button>
  );
};

export default BackButton;
