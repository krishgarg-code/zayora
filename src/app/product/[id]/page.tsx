'use client';

import React, { useState } from 'react';
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
import { useAuth } from '@clerk/nextjs';

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const productId = params.id as string;
  
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  
  // Fetch product data from centralized source
  const product = getProductById(productId);
  
  // Handle adding to cart
  const handleAddToWardrobe = async () => {
    if (!isSignedIn) {
      setConfirmationMessage('Sign in to add items to your wardrobe');
      setPendingAction(() => () => router.push('/auth'));
      setShowConfirmationPopup(true);
      return;
    }

    if (!product) return;

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
    
    // Implement virtual try-on logic here
    setPopupMessage('Virtual Try On feature coming soon!');
    setPopupType('info');
    setShowPopup(true);
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
                src={product.image}
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
                className="flex-1 min-w-[180px] px-8 py-3 text-sm sm:text-base font-bold uppercase border-2 border-[#C9B99E] text-[#C9B99E] tracking-wider hover:bg-[#C9B99E] hover:text-[#2E2B29] transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center"
                style={{ fontFamily: 'norwester' }}
              >
                VIRTUAL TRY ON
              </button>
            </div>
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

        {/* Popup */}
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