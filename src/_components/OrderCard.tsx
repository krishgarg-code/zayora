"use client";

import React, { useState } from "react";
import Image from "next/image";

interface OrderItem {
  id: string;
  quantity: number;
  size?: string;
  product: {
    id: number;
    name: string;
    price: string;
    image?: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  totalAmount: string;
  status: string;
  orderItems: OrderItem[];
}

interface OrderCardProps {
  order: Order;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function OrderCard({ order, isExpanded = false, onToggle }: OrderCardProps) {
  const [isCurrentlyExpanded, setIsCurrentlyExpanded] = useState(isExpanded);

  const handleToggle = () => {
    setIsCurrentlyExpanded(!isCurrentlyExpanded);
    onToggle?.();
  };

  const firstItem = order.orderItems[0];

  return (
    <div className="bg-[#2b2725]/50 rounded-2xl p-6 border border-[#3a3532] hover:border-[#dab187]/30 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          {/* Order preview image */}
          <div className="flex-shrink-0">
            <div className="flex-shrink-0 w-16 h-16 bg-[#3a3532] rounded-lg overflow-hidden relative">
              {firstItem?.product.image ? (
                <Image src={firstItem.product.image} alt={firstItem.product.name} fill className="object-cover" sizes="64px" />
              ) : (
                <div className="bg-[#3a3532] border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Order details */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">Order #{order.orderNumber}</h2>
            <p className="text-white/70 mt-1">
              {order.date} • {order.orderItems.length} {order.orderItems.length === 1 ? "item" : "items"}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-[#dab187]">{order.totalAmount}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === "Delivered" ? "bg-green-500/20 text-green-400" : order.status === "Processing" ? "bg-yellow-500/20 text-yellow-400" : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* Expand/Collapse button */}
        <div className="flex items-center gap-3">
          <button onClick={handleToggle} className="p-2 hover:bg-[#3a3532] rounded-lg transition-colors group" aria-label={isCurrentlyExpanded ? "Collapse order details" : "Expand order details"}>
            <svg className={`w-5 h-5 text-white/70 group-hover:text-white transition-all ${isCurrentlyExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expandable order items section */}
      <div className={`mt-6 transition-all duration-300 ease-in-out ${isCurrentlyExpanded ? "block" : "hidden"}`}>
        <h3 className="text-lg font-medium text-white mb-4">Items in this order</h3>
        <div className="space-y-4">
          {order.orderItems.map((item) => (
            <div key={item.id} className="flex items-center border-b border-[#3a3532] pb-4 last:border-0 last:pb-0">
              <div className="flex-shrink-0 w-16 h-16 bg-[#3a3532] rounded-lg overflow-hidden relative">
                {item.product.image ? (
                  <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="bg-[#3a3532] border-2 border-dashed rounded-xl w-full h-full" />
                )}
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-base font-medium text-white">{item.product.name}</h4>
                <div className="flex flex-wrap items-center gap-4 mt-1">
                  <p className="text-white/70 text-sm">Qty: {item.quantity}</p>
                  {item.size && <p className="text-white/70 text-sm">Size: {item.size}</p>}
                  <p className="text-[#dab187] font-semibold text-sm">{item.product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}