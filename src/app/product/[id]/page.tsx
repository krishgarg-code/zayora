/* eslint react/no-unescaped-entities: "off" */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import MyNavbar from '@/_components/Navbar';
import Footer from '@/_components/Footer';
import OvalImageFrame from '@/_components/Himage';
import BackButton from '@/_components/BackButton';
import ScrollingBanner from '@/_components/ScrollingBanner';
import PriceTag from '@/_components/PriceTag';
import AuthModal from '@/_components/AuthModal';
import Popup from '@/_components/Popup';
import ConfirmationPopup from '@/_components/ConfirmationPopup';
import { getProductById } from '@/data/products';
import { Product } from '@/types/product';
import { useAuth } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';

const loadingMessages = [
  "Tailoring your perfect look...",
  "Crafting digital couture...",
  "Refining the fit just for you...",
  "Steaming the final details...",
  "Adding a touch of elegance...",
  "Polishing your virtual mirror...",
  "Almost ready to reveal your style..."
];

const errorMessages = [
  "Hmm... the fabric seems to have snagged. Let's try that again.",
  "Our virtual tailor is taking a short break. Please refresh.",
  "Looks like the wardrobe needs a quick adjustment. Try once more.",
  "The luxury experience is momentarily on pause. We'll be right back.",
  "Our digital stylist dropped a pin — give us a moment to recover.",
  "Apologies, your look couldn't be rendered. Let's refit and retry.",
  "Something went off the stitch. Refresh to perfect your look."
];

const LoadingPopup = ({ 
  isOpen, 
  message 
}: { 
  isOpen: boolean; 
  message: string;
}) => {
  const [prevMessage, setPrevMessage] = React.useState(message);
  const [isFlipping, setIsFlipping] = React.useState(false);

  React.useEffect(() => {
    if (message !== prevMessage) {
      setIsFlipping(true);
      const timeout = setTimeout(() => {
        setPrevMessage(message);
        setIsFlipping(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [message, prevMessage]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-10 overflow-hidden"
          >
            <div className="flex flex-col items-center text-center relative z-10">
              {/* Elegant rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                className="rounded-full h-16 w-16 border-t-2 border-b-2 border-[#dab187] mb-8"
              ></motion.div>

              {/* 3D flipping text */}
              <div className="perspective-1000 h-8">
                <motion.p
                  key={prevMessage}
                  initial={{ rotateX: -90, opacity: 0, y: -10 }}
                  animate={{ rotateX: isFlipping ? 90 : 0, opacity: 1, y: 0 }}
                  exit={{ rotateX: 90, opacity: 0, y: 10 }}
                  transition={{ duration: 0.6, ease: [0.45, 0, 0.55, 1] }}
                  className="text-lg text-gray-800 font-medium"
                  style={{ fontFamily: 'norwester', transformOrigin: 'top center' }}
                >
                  {prevMessage}
                </motion.p>
              </div>
            </div>

            {/* Subtle reflection for luxury feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-pulse pointer-events-none"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const productId = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalImageRef = useRef<string>('');
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  // Remove unused setter to satisfy @typescript-eslint/no-unused-vars
  const [authMessage] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [isProcessingTryOn, setIsProcessingTryOn] = useState(false);
  const [productImageUrl, setProductImageUrl] = useState<string>('');
  const [loadingMessage, setLoadingMessage] = useState('');
  
  // Fetch product data from centralized source
  const product = getProductById(productId) as Product | undefined;
  
  // Set the initial product image URL
  React.useEffect(() => {
    if (product) {
      // Ensure we have a valid image URL
      const imageUrl = product.image || product.imageurl || "/file.svg";
      setProductImageUrl(imageUrl);
      originalImageRef.current = imageUrl;
    }
  }, [product]);
  
  // Rotate loading messages during virtual try-on
  useEffect(() => {
    if (!isProcessingTryOn) return;
    
    let currentIndex = 0;
    setLoadingMessage(loadingMessages[currentIndex]);
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[currentIndex]);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [isProcessingTryOn]);
  
  // Handle adding to cart
  const handleAddToWardrobe = async () => {
    if (!isSignedIn) {
      setConfirmationMessage('Sign in to add items to your wardrobe');
      setPendingAction(() => () => router.push('/auth'));
      setShowConfirmationPopup(true);
      return;
    }

    if (!product) return;

    if (!selectedSize) {
      setPopupMessage('Please select a size before adding to wardrobe');
      setPopupType('error');
      setShowPopup(true);
      return;
    }

    setIsAddingToCart(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id.toString(),
          quantity: 1,
          size: selectedSize,
        }),
      });

      if (response.ok) {
        // Trigger cart count refresh by reloading navbar
        window.dispatchEvent(new Event('cartUpdated'));
        setPopupMessage('Item added to your wardrobe!');
        setPopupType('success');
        setShowPopup(true);
      } else {
        setPopupMessage('Failed to add item to wardrobe');
        setPopupType('error');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setPopupMessage('An error occurred. Please try again.');
      setPopupType('error');
      setShowPopup(true);
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle Indulge Now (go to checkout)
  const handleIndulgeNow = async () => {
    if (!isSignedIn) {
      setConfirmationMessage('Sign in to indulge in this product');
      setPendingAction(() => () => router.push('/auth'));
      setShowConfirmationPopup(true);
      return;
    }

    if (!product) return;

    if (!selectedSize) {
      setPopupMessage('Please select a size before indulging');
      setPopupType('error');
      setShowPopup(true);
      return;
    }

    // Silently add to cart without any feedback
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id.toString(),
          quantity: 1,
          size: selectedSize,
        }),
      });
      
      // Trigger cart count refresh
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    
    // Redirect to cart immediately
    router.push('/cart');
  };

  // Handle Virtual Try On
  const handleVirtualTryOn = () => {
    if (!isSignedIn) {
      setConfirmationMessage('Sign in to access Virtual Try-On feature');
      setPendingAction(() => () => router.push('/auth'));
      setShowConfirmationPopup(true);
      return;
    }

    // Remove the size validation - virtual try-on should work without size selection
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection for virtual try-on
  const handleTryOnFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !product) return;

    setIsProcessingTryOn(true);
    setLoadingMessage(loadingMessages[0]);
    setShowPopup(false);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const userImageBase64 = reader.result as string;
          
          // Call our backend API for virtual try-on
          const response = await fetch('/api/virtual-try-on', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              productImageUrl: product.imageurl || product.image,
              userImageBase64
            }),
          });

          const result = await response.json();
          
          if (response.ok && result.success) {
            // Close the loading popup
            setIsProcessingTryOn(false);
            
            // Update the product image with the generated try-on image
            setProductImageUrl(result.imageUrl);
          } else {
            // Handle error - close loading popup and show error
            setIsProcessingTryOn(false);
            throw new Error(result.error || 'Failed to process virtual try-on');
          }
        } catch (error: unknown) {
          const err = error instanceof Error ? error : new Error('Unknown error');
          console.error('Virtual Try-On Error:', err);
          setIsProcessingTryOn(false);
          const randomErrorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
          setPopupMessage(randomErrorMessage);
          setPopupType('error');
          setShowPopup(true);
        } finally {
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      console.error('File Reading Error:', err);
      setIsProcessingTryOn(false);
      const randomErrorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      setPopupMessage(randomErrorMessage);
      setPopupType('error');
      setShowPopup(true);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Reset to original product image
  const handleResetImage = () => {
    setProductImageUrl(originalImageRef.current);
  };

  // Handle confirmation
  const handleConfirmation = () => {
    if (pendingAction) {
      pendingAction();
    }
  };

  // Fallback if product not found
  if (!product) {
    return (
      <>
        <MyNavbar />
        <div className="bg-[#2E2B29] text-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl text-[#C9B99E] mb-4" style={{ fontFamily: 'Metanoia' }}>
              Product Not Found
            </h1>
            <p className="text-gray-300">The product you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MyNavbar />
      <div className="relative bg-[#2E2B29] text-white min-h-screen overflow-hidden">

        {/* Back Button */}
        <div className="px-6 sm:px-12 lg:px-20 pt-8">
          <BackButton label="Back" />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left - Image with Oval Frame */}
          <div className="relative flex justify-start items-center lg:-ml-25">
            {/* Wrapper for image and price tag positioning */}
            <div className="relative transform scale-[1.35]" style={{ transformOrigin: 'left center' }}>
              <OvalImageFrame 
                src={productImageUrl}
                alt={product.name}
                className=""
              />
              
              {/* Price Tag - Positioned at top right corner matching range pages */}
              <div className="absolute top-12 right-12 z-20" style={{ transform: 'translate(5%, 0%) scale(1.15)' }}>
                <PriceTag 
                  price={product.price}
                  animationDelay={parseInt(productId) * 0.12}
                  swingIntensity={0.9 + (parseInt(productId) % 3) * 0.25}
                  duration={3.2 + (parseInt(productId) % 4) * 0.4}
                />
              </div>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="flex flex-col justify-center items-start gap-6 -ml-20">
            <p
              className="text-4xl tracking-widest uppercase text-[#C9B99E]"
              style={{ fontFamily: 'norwester' }}
            >
              {product.name}
            </p>

            {/* Decorative Stars - Rating Display */}
            <div className="flex gap-2 items-center">
              {/* Render full stars */}
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <svg
                  key={`full-${i}`}
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#C9B99E] opacity-70"
                >
                  <path
                    d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              ))}
              
              {/* Render half star if rating has decimal */}
              {product.rating % 1 !== 0 && (
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#C9B99E] opacity-70"
                >
                  <defs>
                    <linearGradient id="half-star">
                      <stop offset="50%" stopColor="currentColor" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                    fill="url(#half-star)"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>
              )}
              
              {/* Rating text */}
              <span className="text-[#C9B99E] text-sm ml-2" style={{ fontFamily: 'norwester' }}>
                {product.rating}/5
              </span>
            </div>

            {/* Select Size Section */}
            <div className="space-y-4">
              <h2 
                className="text-[#C9B99E] text-2xl font-normal tracking-wider"
                style={{ fontFamily: 'Metanoia' }}
              >
                Select size
              </h2>
              
              {/* Size Options */}
              <div className="flex flex-wrap gap-4">
                {[ 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-20 h-20 rounded-lg border-2 font-semibold text-lg transition-all duration-300 cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#C9B99E] text-[#2E2B29] border-[#C9B99E]'
                        : 'border-[#C9B99E] bg-transparent text-[#dab187] hover:bg-[#C9B99E] hover:text-[#2E2B29]'
                    }`}
                    style={{ fontFamily: 'Metanoia' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

              <p className="text-gray-300 leading-relaxed max-w-lg mt-2">
                {product.description}
              </p>

            {/* Buttons */}
            <div className="flex flex-row gap-4 pt-4 flex-wrap">
              <button
                onClick={handleIndulgeNow}
                className="flex-1 min-w-[180px] px-8 py-3 text-sm sm:text-base font-bold uppercase border-2 border-[#C9B99E] text-[#C9B99E] tracking-wider hover:bg-[#C9B99E] hover:text-[#2E2B29] transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center"
                style={{ fontFamily: 'norwester' }}
              >
                INDULGE NOW
              </button>
              
              <button
                onClick={handleAddToWardrobe}
                disabled={isAddingToCart}
                className="flex-1 min-w-[180px] px-8 py-3 text-sm sm:text-base font-bold uppercase border-2 border-[#C9B99E] text-[#C9B99E] tracking-wider hover:bg-[#C9B99E] hover:text-[#2E2B29] transition-all duration-300 cursor-pointer disabled:opacity-50 whitespace-nowrap flex items-center justify-center"
                style={{ fontFamily: 'norwester' }}
              >
                {isAddingToCart ? 'ADDING...' : 'ADD TO WARDROBE'}
              </button>
              
              <button
                onClick={handleVirtualTryOn}
                disabled={isProcessingTryOn}
                className="flex-1 min-w-[180px] px-8 py-3 text-sm sm:text-base font-bold uppercase border-2 border-[#C9B99E] text-[#C9B99E] tracking-wider hover:bg-[#C9B99E] hover:text-[#2E2B29] transition-all duration-300 cursor-pointer disabled:opacity-50 whitespace-nowrap flex items-center justify-center"
                style={{ fontFamily: 'norwester' }}
              >
                {isProcessingTryOn ? 'PROCESSING...' : 'VIRTUAL TRY ON'}
              </button>
              
              {/* Reset Image Button - only show when virtual try-on image is displayed */}
              {productImageUrl !== originalImageRef.current && (
                <button
                  onClick={handleResetImage}
                  className="flex-1 min-w-[180px] px-8 py-3 text-sm sm:text-base font-bold uppercase border-2 border-[#C9B99E] text-[#C9B99E] tracking-wider hover:bg-[#C9B99E] hover:text-[#2E2B29] transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center"
                  style={{ fontFamily: 'norwester' }}
                >
                  VIEW ORIGINAL
                </button>
              )}
            </div>
            
            {/* Hidden file input for virtual try-on */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleTryOnFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          message={authMessage}
        />

        {/* Confirmation Popup */}
        <ConfirmationPopup
          isOpen={showConfirmationPopup}
          onClose={() => {
            setShowConfirmationPopup(false);
            setPendingAction(null);
          }}
          onConfirm={handleConfirmation}
          message={confirmationMessage}
        />

        {/* Loading Popup - Custom component for virtual try-on loading state */}
        <LoadingPopup 
          isOpen={isProcessingTryOn} 
          message={loadingMessage} 
        />

        {/* Regular Popup - used for success and error messages */}
        <Popup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          message={popupMessage}
          type={popupType}
        />

        {/* Decorative Star - Bottom Right */}
        <div className="absolute bottom-14 -right-10 opacity-40 -rotate-90">
          <Image
            src="/star3.svg"
            alt="Decoration"
            width={160}
            height={160}
            className="animate-pulse"
          />
        </div>
      </div>
      
      <ScrollingBanner />        
      <Footer />
    </>
  );
};

export default ProductDetailPage;