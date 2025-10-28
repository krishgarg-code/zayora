import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Zayora",
  description: "Elevate your wardrobe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#dab187',
        },
        elements: {
          card: 'shadow-none',
          headerTitle: 'hidden',
          headerSubtitle: 'hidden',
          socialButtons: 'hidden',
          dividerText: 'hidden',
          formFieldInput: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dab187] focus:border-transparent',
          formButtonPrimary: 'w-full py-3 px-4 bg-[#dab187] hover:bg-[#c19d6f] text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dab187]',
          footerAction: 'hidden'
        }
      }}
      signInUrl="/auth"
      signUpUrl="/auth/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}