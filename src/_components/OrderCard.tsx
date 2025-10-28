'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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

interface OrderCardProps {
  order: Order;
  isExpanded?: boolean;
  onToggle?: (orderId: string) => void;
}

export default function OrderCard({ order, isExpanded = false, onToggle }: OrderCardProps) {
  const [expanded, setExpanded] = useState(isExpanded);
  
  // Get the first item in the order for display
  const firstItem = order.orderItems[0];

  const handleToggle = () => {
    if (onToggle) {
      onToggle(order.id);
    } else {
      setExpanded(!expanded);
    }
  };

  const isCurrentlyExpanded = onToggle ? isExpanded : expanded;

  return (
    <div className="bg-[#2b2725]/50 rounded-2xl border border-[#3a3532] overflow-hidden">
      {/* Main order summary with first item image */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-[#3a3532] pb-4">
          <div className="flex items-start gap-4 flex-1">
            {/* First item image */}
            <div className="flex-shrink-0 w-16 h-16 bg-[#3a3532] rounded-lg overflow-hidden">
              {firstItem?.product.image ? (
                <img 
                  src={firstItem.product.image} 
                  alt={firstItem.product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-[#3a3532] border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Order details */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">Order #{order.orderNumber}</h2>
              <p className="text-white/70 mt-1">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-white/70 mt-1">
                {order.orderItems.length} {order.orderItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          
          {/* Right side - Total, Status, and Toggle */}
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="text-right">
              <p className="text-lg font-semibold text-white">
                ₹{parseFloat(order.total).toFixed(2)}
              </p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              order.status === 'PENDING' 
                ? 'bg-yellow-900/30 text-yellow-400' 
                : order.status === 'CONFIRMED' 
                ? 'bg-blue-900/30 text-blue-400' 
                : order.status === 'SHIPPED' 
                ? 'bg-indigo-900/30 text-indigo-400' 
                : order.status === 'DELIVERED' 
                ? 'bg-green-900/30 text-green-400' 
                : 'bg-gray-900/30 text-gray-400'
            }`}>
              {order.status}
            </span>
            <button 
              onClick={handleToggle}
              className="p-2 rounded-full hover:bg-[#3a3532] transition-colors"
              aria-label={isCurrentlyExpanded ? "Collapse order details" : "Expand order details"}
            >
              <svg 
                className={`w-5 h-5 text-white/70 transform transition-transform ${isCurrentlyExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Expandable order items section */}
        <div className={`mt-6 transition-all duration-300 ease-in-out ${isCurrentlyExpanded ? 'block' : 'hidden'}`}>
          <h3 className="text-lg font-medium text-white mb-4">Items in this order</h3>
          <div className="space-y-4">
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex items-center border-b border-[#3a3532] pb-4 last:border-0 last:pb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-[#3a3532] rounded-lg overflow-hidden">
                  {item.product.image ? (
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-[#3a3532] border-2 border-dashed rounded-xl w-full h-full" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-base font-medium text-white">{item.product.name}</h4>
                  <div className="flex flex-wrap items-center gap-4 mt-1">
                    <p className="text-white/70 text-sm">
                      Qty: {item.quantity}
                    </p>
                    {item.size && (
                      <p className="text-white/70 text-sm">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="text-white font-medium text-sm">
                      ₹{parseFloat(item.price).toFixed(2)} each
                    </p>
                    <p className="text-white font-semibold text-sm">
                      ₹{(parseFloat(item.price) * item.quantity).toFixed(2)} total
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}