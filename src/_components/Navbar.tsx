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

  // Custom icon for the View Past Orders link
  const OrderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
      <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
      <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
    </svg>
  );

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
              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  <UserButton.Link 
                    label="View Past Orders" 
                    labelIcon={<OrderIcon />} 
                    href="/orders" 
                  />
                </UserButton.MenuItems>
              </UserButton>
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
              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  <UserButton.Link 
                    label="View Past Orders" 
                    labelIcon={<OrderIcon />} 
                    href="/orders" 
                  />
                </UserButton.MenuItems>
              </UserButton>
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