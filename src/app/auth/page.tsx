'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SignIn, SignUp } from '@clerk/nextjs';
import { products } from '../../data/products';
import Image from 'next/image';

export default function AuthPage() {
  // Determine mode from client URL search params to avoid server/client mismatch
  // Default to sign-up mode (true) instead of sign-in mode (false)
  const [isSignUp, setIsSignUp] = React.useState(true);
  
  // Function to update auth mode based on URL
  const updateAuthMode = React.useCallback(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      // Check if mode parameter is explicitly set to 'sign-up'
      // If not, default to sign-in (false)
      setIsSignUp(params.get('mode') === 'sign-up');
    } catch {
      // fallback: not running in browser or malformed URL
      setIsSignUp(true); // Default to sign-up on error
    }
  }, []);

  React.useEffect(() => {
    // Initial update
    updateAuthMode();
    
    // Set up an interval to periodically check for URL changes
    // This is needed because Clerk's hash routing might not trigger standard events
    const interval = setInterval(updateAuthMode, 100);
    
    // Also listen for standard events as a backup
    window.addEventListener('popstate', updateAuthMode);
    window.addEventListener('hashchange', updateAuthMode);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('popstate', updateAuthMode);
      window.removeEventListener('hashchange', updateAuthMode);
    };
  }, [updateAuthMode]);

  const getRandomProducts = () => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  };
  const [showcaseProducts] = React.useState(getRandomProducts());

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row bg-[#1f1c1a] text-white overflow-hidden relative">
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,177,135,0.08)_1px,transparent_1px)] [background-size:50px_50px] opacity-40 pointer-events-none" />

      {/* === LEFT SECTION - AUTH === */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full lg:w-1/2 flex items-center justify-center bg-[#1f1c1a]/90 relative px-6 md:px-12 lg:px-20 py-10"
      >
        <div className="w-full max-w-md z-10 space-y-6">
          {/* --- Custom Header --- */}
          <div className="text-center mb-2">
            <h2 className="text-3xl font-semibold text-[#dab187]">
              {isSignUp ? 'Join the Zayora Family' : 'Welcome Back'}
            </h2>
            <p className="text-white/70 mt-1 text-sm">
              {isSignUp
                ? 'Create your account and start your journey with timeless fashion.'
                : 'Sign in to continue your Zayora experience.'}
            </p>
          </div>

          {/* --- Clerk Authentication --- */}
          <div className="space-y-5 bg-[#2b2725]/50 p-6 rounded-2xl border border-[#3a3532]">
            {isSignUp ? (
              <SignUp
                appearance={{
                  elements: {
                    card: 'bg-transparent shadow-none border-0',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    socialButtons: 'hidden',
                    dividerText: 'hidden',
                    formFieldInput:
                      'w-full px-4 py-3 bg-[#2b2725] border border-[#3a3532] rounded-lg focus:ring-2 focus:ring-[#dab187] text-sm text-white',
                    formButtonPrimary:
                      'w-full py-3 mt-2 bg-[#dab187] hover:bg-[#c19d6f] text-[#1f1c1a] font-medium rounded-full transition-all text-sm shadow-lg shadow-[#dab187]/20',
                  },
                }}
                signInUrl="/auth"
                routing="hash"
              />
            ) : (
              <SignIn
                appearance={{
                  elements: {
                    card: 'bg-transparent shadow-none border-0',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    socialButtons: 'hidden',
                    dividerText: 'hidden',
                    formFieldInput:
                      'w-full px-4 py-3 bg-[#2b2725] border border-[#3a3532] rounded-lg focus:ring-2 focus:ring-[#dab187] text-sm text-white',
                    formButtonPrimary:
                      'w-full py-3 mt-2 bg-[#dab187] hover:bg-[#c19d6f] text-[#1f1c1a] font-medium rounded-full transition-all text-sm shadow-lg shadow-[#dab187]/20',
                  },
                }}
                signUpUrl="/auth?mode=sign-up"
                routing="hash"
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* === RIGHT SECTION - Infinite Floating Showcase === */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full lg:w-1/2 bg-[#201C1A] relative overflow-hidden flex items-center justify-center p-4 sm:p-6"
      >
        <div className="text-center max-w-md z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              Discover premium craftsmanship by{' '}
              <span className="text-[#dab187]">Zayora.</span>
            </h2>
          </motion.div>

          <div className="relative h-[500px] sm:h-[600px] w-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#201C1A] to-transparent z-20" />
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#201C1A] to-transparent z-20" />
            <motion.div
              animate={{ y: ['0%', '-100%'] }}
              transition={{ duration: 70, ease: 'linear', repeat: Infinity }}
              className="flex flex-col items-center gap-6"
            >
              {[...showcaseProducts, ...showcaseProducts].map((product, i) => (
                <div
                  key={i}
                  className={`relative w-48 sm:w-56 h-60 sm:h-64 rounded-2xl overflow-hidden border border-white/10 ${
                    i % 2 === 0 ? 'self-start ml-4' : 'self-end mr-4'
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}