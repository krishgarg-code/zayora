'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MyNavbar from '@/_components/Navbar';
import Footer from '@/_components/Footer';
import Popup from '@/_components/Popup';
import { useAuth } from '@clerk/nextjs';

interface CartItem {
  id: string;
  quantity: number;
  size: string | null;
  product: {
    id: string;
    name: string;
    image: string;
    price: string;
    priceValue: number;
  };
}

export default function CartPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    } else if (isSignedIn) {
      fetchCartItems();
    }
  }, [isSignedIn, isLoaded, router]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems || []);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdatingItem(cartItemId);
    try {
      const response = await fetch('/api/cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItemId, quantity: newQuantity }),
      });

      if (response.ok) {
        await fetchCartItems();
        // Trigger cart count refresh in navbar
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdatingItem(null);
    }
  };

  const removeItem = async (cartItemId: string) => {
    setItemToDelete(cartItemId);
    setPopupMessage('Remove this item from your cart?');
    setPopupType('warning');
    setShowPopup(true);
  };

  const confirmRemoveItem = async () => {
    if (!itemToDelete) return;

    setUpdatingItem(itemToDelete);
    try {
      const response = await fetch(`/api/cart?cartItemId=${itemToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCartItems();
        // Trigger cart count refresh in navbar
        window.dispatchEvent(new Event('cartUpdated'));
        setPopupMessage('Item removed from cart');
        setPopupType('success');
        setShowPopup(true);
      } else {
        setPopupMessage('Failed to remove item');
        setPopupType('error');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error removing item:', error);
      setPopupMessage('An error occurred. Please try again.');
      setPopupType('error');
      setShowPopup(true);
    } finally {
      setUpdatingItem(null);
      setItemToDelete(null);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + item.product.priceValue * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (loading) {
    return (
      <>
        <MyNavbar />
        <div className="bg-[#2E2B29] min-h-screen flex items-center justify-center">
          <p className="text-[#C9B99E] text-xl">Loading your cart...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MyNavbar />
      <div className="bg-[#2E2B29] min-h-screen text-white py-16 px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <h1
            className="text-5xl text-[#C9B99E] mb-12 tracking-widest uppercase"
            style={{ fontFamily: 'Metanoia' }}
          >
            Your Wardrobe
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl mb-8">Your cart is empty</p>
              <button
                onClick={() => router.push('/ranges/men')}
                className="px-8 py-3 bg-[#C9B99E] text-[#2E2B29] font-bold uppercase tracking-wider hover:bg-[#dab187] transition-colors"
                style={{ fontFamily: 'norwester' }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#3a3632] rounded-lg p-6 flex gap-6 items-center"
                  >
                    {/* Product Image */}
                    <div className="relative w-32 h-32 flex-shrink-0 bg-[#2E2B29] rounded-lg overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3
                        className="text-xl text-[#C9B99E] mb-2"
                        style={{ fontFamily: 'norwester' }}
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        Size: {item.size || 'N/A'}
                      </p>
                      <p className="text-white text-lg font-semibold">
                        {item.product.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={updatingItem === item.id || item.quantity <= 1}
                        className="w-8 h-8 border border-[#C9B99E] text-[#C9B99E] hover:bg-[#C9B99E] hover:text-[#2E2B29] transition-colors disabled:opacity-30"
                      >
                        −
                      </button>
                      <span className="text-white w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={updatingItem === item.id}
                        className="w-8 h-8 border border-[#C9B99E] text-[#C9B99E] hover:bg-[#C9B99E] hover:text-[#2E2B29] transition-colors disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={updatingItem === item.id}
                      className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-30"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-[#3a3632] rounded-lg p-6 sticky top-24">
                  <h2
                    className="text-2xl text-[#C9B99E] mb-6"
                    style={{ fontFamily: 'Metanoia' }}
                  >
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-gray-600 pt-4 flex justify-between text-white text-xl font-bold">
                      <span>Total</span>
                      <span className="text-[#C9B99E]">
                        ₹{calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full px-8 py-4 bg-[#C9B99E] text-[#2E2B29] font-bold uppercase tracking-wider hover:bg-[#dab187] transition-colors"
                    style={{ fontFamily: 'norwester' }}
                  >
                    Indulge Now
                  </button>

                  <button
                    onClick={() => router.push('/ranges/men')}
                    className="w-full mt-4 px-8 py-4 border-2 border-[#C9B99E] text-[#C9B99E] font-bold uppercase tracking-wider hover:bg-[#C9B99E] hover:text-[#2E2B29] transition-colors"
                    style={{ fontFamily: 'norwester' }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popup */}
      <Popup
        isOpen={showPopup}
        onClose={() => {
          setShowPopup(false);
          // If it's a warning (delete confirmation), execute delete on OK
          if (popupType === 'warning' && itemToDelete) {
            confirmRemoveItem();
          }
        }}
        message={popupMessage}
        type={popupType}
        duration={popupType === 'warning' ? 0 : 3000} // No auto-close for confirmations
      />

      <Footer />
    </>
  );
}
