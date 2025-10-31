'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import OrderCard from '@/_components/OrderCard';

interface OrderItem {
  id: string;
  quantity: number;
  price: string;
  size?: string;
  product: {
    id: string;
    name: string;
    image: string;
    price: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  total: string;
  status: string;
  createdAt: string;
  orderItems: OrderItem[];
}

interface TransformedOrder {
  id: string;
  orderNumber: string;
  date: string;
  totalAmount: string;
  status: string;
  orderItems: {
    id: string;
    quantity: number;
    size?: string;
    product: {
      id: number;
      name: string;
      price: string;
      image?: string;
    };
  }[];
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

  const transformOrder = (order: Order): TransformedOrder => {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      date: new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      totalAmount: `₹${parseFloat(order.total).toFixed(2)}`,
      status: order.status,
      orderItems: order.orderItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        size: item.size,
        product: {
          id: parseInt(item.product.id),
          name: item.product.name,
          price: `₹${parseFloat(item.product.price).toFixed(2)}`,
          image: item.product.image
        }
      }))
    };
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-[#322e2c] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#dab187]"></div>
          <p className="mt-4 text-[#dab187] text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#322e2c] flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-2xl font-semibold text-white">Error Loading Orders</h2>
          <p className="mt-2 text-white/70">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-6 px-6 py-3 bg-[#dab187] text-[#322e2c] rounded-lg hover:bg-[#c9a676] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#322e2c]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-[#dab187] hover:text-white transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Metanoia' }}>Your Orders</h1>
          <p className="text-white/70">Track and manage your purchases</p>
        </div>

        <div className="bg-[#2b2725] rounded-2xl p-6">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-24 w-24 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-white">No orders yet</h3>
              <p className="mt-2 text-white/70">Start shopping to see your orders here</p>
              <Link
                href="/"
                className="mt-6 inline-block px-6 py-3 bg-[#dab187] text-[#322e2c] rounded-lg hover:bg-[#c9a676] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={transformOrder(order)}
                  isExpanded={expandedOrders.has(order.id)}
                  onToggle={() => toggleOrderExpansion(order.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}