'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import OrderCard from '@/_components/OrderCard';

interface OrderItem {
  id: string;
  quantity: number;
  price: string; // Decimal from Prisma becomes string in JSON
  size?: string;
  product: {
    id: string;
    name: string;
    image: string;
    price: string; // Decimal from Prisma becomes string in JSON
  };
}

interface Order {
  id: string;
  orderNumber: string;
  total: string; // Decimal from Prisma becomes string in JSON
  status: string;
  createdAt: string;
  orderItems: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push('/auth');
      return;
    }

    fetchOrders();
  }, [isLoaded, isSignedIn, router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      setOrders(data.orders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  if (!isLoaded || loading) {
    return (
      <div className="w-full h-screen flex flex-col bg-[#1f1c1a] text-white overflow-hidden relative">
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,177,135,0.08)_1px,transparent_1px)] [background-size:50px_50px] opacity-40 pointer-events-none" />
        
        <div className="container mx-auto px-4 py-12 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#dab187] mb-4"></div>
            <p className="text-white/70">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col bg-[#1f1c1a] text-white overflow-hidden relative">
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,177,135,0.08)_1px,transparent_1px)] [background-size:50px_50px] opacity-40 pointer-events-none" />
        
        <div className="container mx-auto px-4 py-12 flex-1 flex items-center justify-center">
          <div className="max-w-md w-full bg-[#2b2725]/50 p-6 rounded-2xl border border-[#3a3532]">
            <h1 className="text-2xl font-semibold text-[#dab187] mb-4">Orders</h1>
            <div className="text-red-400 bg-red-900/20 p-4 rounded-lg mb-4">
              <p className="font-medium">Error loading orders</p>
              <p className="mt-2 text-sm">{error}</p>
            </div>
            <button 
              onClick={fetchOrders}
              className="w-full py-3 bg-[#dab187] hover:bg-[#c19d6f] text-[#1f1c1a] font-medium rounded-full transition-all text-sm shadow-lg shadow-[#dab187]/20"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#1f1c1a] text-white overflow-hidden relative">
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,177,135,0.08)_1px,transparent_1px)] [background-size:50px_50px] opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-white">Your Order History</h1>
              <p className="text-white/70 mt-1">View and manage your past orders</p>
            </div>
            <Link 
              href="/"
              className="py-3 px-6 bg-[#dab187] hover:bg-[#c19d6f] text-[#1f1c1a] font-medium rounded-full transition-all text-sm shadow-lg shadow-[#dab187]/20 whitespace-nowrap"
            >
              Continue Shopping
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="bg-[#2b2725]/50 rounded-2xl border border-[#3a3532] p-8 text-center">
              <svg 
                className="mx-auto h-16 w-16 text-[#dab187]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                />
              </svg>
              <h3 className="mt-4 text-xl font-semibold text-white">No orders yet</h3>
              <p className="mt-2 text-white/70">Get started by placing your first order.</p>
              <div className="mt-6">
                <Link 
                  href="/"
                  className="inline-flex items-center py-3 px-6 bg-[#dab187] hover:bg-[#c19d6f] text-[#1f1c1a] font-medium rounded-full transition-all text-sm shadow-lg shadow-[#dab187]/20"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <OrderCard 
                  key={order.id}
                  order={order}
                  isExpanded={expandedOrders.has(order.id)}
                  onToggle={toggleOrderExpansion}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}