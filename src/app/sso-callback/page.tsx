'use client';

import React from 'react';
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallback() {
  return (
    <div className="min-h-screen bg-[#1f1c1a] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#dab187] mb-4">Completing Sign In...</h2>
        <p className="text-gray-400">Please wait while we complete your authentication</p>
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#dab187]"></div>
        </div>
        <div className="mt-6">
          <AuthenticateWithRedirectCallback />
        </div>
      </div>
    </div>
  );
}
