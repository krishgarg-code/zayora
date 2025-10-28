'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getProductById } from '@/data/products';
import { SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs';

export default function MyNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  // Fetch cart count
  useEffect(() => {
    if (isSignedIn) {
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [isSignedIn, pathname]);

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      if (isSignedIn) {
        fetchCartCount();
      }
    };

    // Listen for custom cart update events
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [isSignedIn]);

  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        const count = data.cartItems?.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0) || 0;
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartCount(0);
    }
  };

  // Determine active menu item
  const getActiveItem = () => {
    // Home page
    if (pathname === '/') return 'Home';
    
    // Men's range page
    if (pathname === '/ranges/men') return 'Men';
    
    // Women's range page
    if (pathname === '/ranges/women') return 'Women';
    
    // Kids' range page
    if (pathname === '/ranges/kids') return 'Kids';
    
    // Product detail page - determine by product range
    if (pathname?.startsWith('/product/')) {
      const productId = pathname.split('/product/')[1];
      const product = getProductById(productId);
      
      if (product) {
        if (product.range === 'men') return 'Men';
        if (product.range === 'women') return 'Women';
        if (product.range === 'kids') return 'Kids';
      }
    }
    
    return null;
  };
  
  const activeItem = getActiveItem();

  // Navigation links
  const navItems = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'Men', href: '/ranges/men', isRoute: true },
    { name: 'Women', href: '/ranges/women', isRoute: true },
    { name: 'Kids', href: '/ranges/kids', isRoute: true },
  ];

  return (
    // Outer container with background and bottom border line
    <div className="w-full" style={{ backgroundColor: '#322e2c', borderBottom: '1px solid #dab187' }}> 
      <div className="container mx-auto ">
        {/* Main Flex container for the navbar content */}
        <div className="flex justify-between items-center h-20 "> 

          {/* Logo (ZWORA) */}
          <div className="flex-shrink-0 flex items-center md:-ml-10 lg:-ml-20">
            <Link href="/" className="text-xl md:text-2xl font-normal text-white flex items-center space-x-2 tracking-widest uppercase">
              <Image 
                src="/logo.svg" 
                alt="Zayora Logo" 
                width={40} 
                height={40} 
                className="mr-5"
              />
              <span className=" ml-3" style={{ color: '#dab187', fontFamily: 'Metanoia' }}>Zayora</span>
            </Link>
          </div>

          {/* Desktop Navigation and Join Us Button */}
          <div className="hidden md:flex items-center space-x-12 ml-auto md:-mr-10 lg:-mr-20">
            
            {/* Nav Links */}
            <div className="flex items-center space-x-12">
              {navItems.map((item) => {
                const isActive = activeItem === item.name;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`relative py-2 text-base font-norwester transition-all duration-300 tracking-wide transform hover:scale-110 hover:brightness-125 cursor-pointer ${
                      isActive 
                        ? 'text-[#dab187]' 
                        : 'text-white hover:text-gray-300'
                    }`}
                  >
                    {item.name}
                    {/* Underline for active item */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#dab187] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Cart Icon & Join Us Button / User Profile */}
            <SignedIn>
              <Link
                href="/cart"
                className="relative text-white hover:text-[#dab187] transition-colors"
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#dab187] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link 
                href="/auth"
                className="text-white text-base font-norwester border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#4F453F] transition-colors cursor-pointer"
              >
                Join Us
              </Link>
            </SignedOut>
          </div>

          {/* Mobile menu button (Hidden for simplicity in this visual recreation, but kept for functionality) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (Hidden by default, shown on small screens) */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-20 left-0 right-0 bg-[#322e2c] z-50 py-4 px-6 border-t border-[#dab187]`}>
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`relative py-2 text-base font-norwester transition-colors ${
                  isActive 
                    ? 'text-[#dab187]' 
                    : 'text-white hover:text-gray-300'
                }`}
              >
                {item.name}
                {/* Underline for active item */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#dab187] rounded-full" />
                )}
              </Link>
            );
          })}
          <SignedIn>
            <Link
              href="/cart"
              className="mt-4 flex items-center gap-2 text-white hover:text-[#dab187] transition-colors"
              onClick={() => setIsOpen(false)}
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="font-norwester">Cart {cartCount > 0 && `(${cartCount})`}</span>
            </Link>
            <div className="mt-4 flex justify-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <SignedOut>
            <Link 
              href="/auth"
              className="mt-4 text-center text-white text-base font-norwester border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#4F453F] transition-colors w-40 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Join Us
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}