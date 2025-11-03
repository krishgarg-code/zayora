'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface AuthConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  redirectUrl?: string; // Add redirectUrl parameter
}

export default function AuthConfirmationPopup({
  isOpen,
  onClose,
  onConfirm,
  title = "Authentication Required",
  message = "Please sign in to access this feature and enjoy a personalized shopping experience.",
  confirmText = "Sign In",
  cancelText = "Cancel",
  redirectUrl, // Add redirectUrl parameter
}: AuthConfirmationPopupProps) {
  const router = useRouter();

  const handleConfirm = () => {
    onConfirm();
    // If redirectUrl is provided, use it; otherwise, use the default /auth route
    if (redirectUrl) {
      router.push(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
    } else {
      router.push('/auth');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 text-center" style={{ fontFamily: 'norwester' }}>
                {title}
              </h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 text-center mb-6">
                {message}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-norwester"
                >
                  {cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-3 bg-[#dab187] text-white rounded-full hover:bg-[#c19d6f] transition-colors font-norwester"
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}