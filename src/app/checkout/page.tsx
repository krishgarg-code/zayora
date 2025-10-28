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

export default function CheckoutPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    } else if (isSignedIn) {
      fetchCartItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, isLoaded, router]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems || []);
        
        if (data.cartItems.length === 0) {
          router.push('/cart');
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + item.product.priceValue * item.quantity;
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['fullName', 'email', 'phone', 'street', 'city', 'state', 'postalCode'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      setPopupMessage('Please fill in all required fields');
      setPopupType('warning');
      setShowPopup(true);
      return;
    }

    setProcessing(true);
    
    try {
      // Create shipping address string
      const shippingAddress = `${formData.fullName}
${formData.street}
${formData.city}, ${formData.state} ${formData.postalCode}
${formData.country}
Phone: ${formData.phone}
Email: ${formData.email}`;

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shippingAddress }),
      });

      if (response.ok) {
        const data = await response.json();
        setPopupMessage(`Order placed successfully! Order Number: ${data.order.orderNumber}`);
        setPopupType('success');
        setShowConfetti(true);
        setShowPopup(true);
        
        // Redirect to home after popup closes
        setTimeout(() => {
          router.push('/');
        }, 5000);
      } else {
        const error = await response.json();
        setPopupMessage(`Failed to place order: ${error.error}`);
        setPopupType('error');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setPopupMessage('An error occurred. Please try again.');
      setPopupType('error');
      setShowPopup(true);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <>
        <MyNavbar />
        <div className="bg-[#2E2B29] min-h-screen flex items-center justify-center">
          <p className="text-[#C9B99E] text-xl">Loading checkout...</p>
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
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Shipping Form */}
            <div>
              <h2
                className="text-2xl text-[#C9B99E] mb-6"
                style={{ fontFamily: 'Metanoia' }}
              >
                Shipping Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#3a3632] border border-[#C9B99E] text-white rounded focus:outline-none focus:border-[#dab187]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#3a3632] border border-[#C9B99E] text-white rounded focus:outline-none focus:border-[#dab187]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#3a3632] border border-[#C9B99E] text-white rounded focus:outline-none focus:border-[#dab187]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Street Address *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#3a3632] border border-[#C9B99E] text-white rounded focus:outline-none focus:border-[#dab187]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#3a3632] border border-[#C9B99E] text-white rounded focus:outline-none focus:border-[#dab187]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#3a3632] border border-[#C9B99E] text-white rounded focus:outline-none focus:border-[#dab187]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#3a3632] border border-[#C9B99E] text-white rounded focus:outline-none focus:border-[#dab187]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#3a3632] border border-[#C9B99E] text-white rounded focus:outline-none focus:border-[#dab187]"
                      readOnly
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full mt-6 px-8 py-4 bg-[#C9B99E] text-[#2E2B29] font-bold uppercase tracking-wider hover:bg-[#dab187] transition-colors disabled:opacity-50"
                  style={{ fontFamily: 'norwester' }}
                >
                  {processing ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <h2
                className="text-2xl text-[#C9B99E] mb-6"
                style={{ fontFamily: 'Metanoia' }}
              >
                Order Summary
              </h2>

              <div className="bg-[#3a3632] rounded-lg p-6">
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center pb-4 border-b border-gray-600">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-[#2E2B29] rounded overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{item.product.name}</p>
                        <p className="text-gray-400 text-sm">
                          Size: {item.size} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-[#C9B99E] font-bold">
                        ₹{(item.product.priceValue * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>₹0</span>
                  </div>
                  <div className="border-t border-gray-600 pt-3 flex justify-between text-white text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[#C9B99E]">
                      ₹{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup with Confetti for Order Confirmation */}
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        message={popupMessage}
        type={popupType}
        showConfetti={showConfetti}
        duration={showConfetti ? 5000 : (popupType === 'warning' ? 0 : 3000)}
      />

      <Footer />
    </>
  );
}
