'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function AuthModal({ isOpen, onClose, message }: AuthModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSignIn = () => {
    onClose();
    router.push('/auth');
  };

  const handleSignUp = () => {
    onClose();
    router.push('/auth/sign-up');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur and transparency */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#322e2c] mb-4">
            Sign in Required
          </h2>
          <p className="text-gray-600 mb-8">
            {message || 'Please sign in to continue with this action.'}
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleSignIn}
              className="w-full px-6 py-3 bg-[#dab187] text-white rounded-full hover:bg-[#c19d6f] transition-colors font-norwester text-lg"
            >
              Sign In
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-gray-300" />
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            <button 
              onClick={handleSignUp}
              className="w-full px-6 py-3 bg-white text-[#322e2c] border-2 border-[#dab187] rounded-full hover:bg-[#dab187] hover:text-white transition-colors font-norwester text-lg"
            >
              Create Account
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Join us to unlock exclusive features and personalized shopping experience
          </p>
        </div>
      </div>
    </div>
  );
}