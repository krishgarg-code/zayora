"use client";
import React from "react";
import Image from "next/image";
import AnimatedItem from "./AnimatedItem";

const Contact: React.FC = () => {
    return (
        <section className="bg-[#322e2c] text-white py-24 px-10 lg:px-24 mt-10 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
                {/* Left side */}
                <AnimatedItem delay={0.2}>
                    <div className="lg:pr-12">
                        <h2
                            className="text-5xl whitespace-nowrap font-serif text-[#C9B99E] tracking-[0.2em] uppercase mb-8"
                            style={{ fontFamily: "Metanoia" }}
                        >
                            OUR CONTACT
                        </h2>

                        <p className="text-sm text-gray-200 max-w-xl mb-10 leading-relaxed">
                            At Zayora, we believe true luxury lies in personal attention. Whether you need styling guidance, assistance with your order, or have a bespoke request — our team is here to help.

                            Reach out to us anytime, and experience Zayora’s signature service — refined, responsive, and always personal.
                        </p>

                        <ul className="space-y-6 text-sm text-gray-200">
                            {/* Phone */}
                            <li className="flex items-center gap-4 transition-all duration-300 hover:text-white hover:scale-105">
                                <span className="flex-none w-9 h-9 rounded-full bg-[#C9B99E] text-[#322e2c] flex items-center justify-center">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 3.08 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.12.97.34 1.92.66 2.82a2 2 0 0 1-.45 2.11L9.91 9.91a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45c.9.32 1.85.54 2.82.66A2 2 0 0 1 22 16.92z"
                                            fill="#322e2c"
                                        />
                                    </svg>
                                </span>
                                <span>+123-456-7890</span>
                            </li>

                            {/* Website */}
                            <li className="flex items-center gap-4 transition-all duration-300 hover:text-white hover:scale-105">
                                <span className="flex-none w-9 h-9 rounded-full bg-[#C9B99E] text-[#322e2c] flex items-center justify-center">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12s4.03 9 9 9 9-4.03 9-9zM5 12h14"
                                            stroke="#322e2c"
                                            strokeWidth="1.3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                <span>www.Zayora.com</span>
                            </li>

                            {/* Email */}
                            <li className="flex items-center gap-4 transition-all duration-300 hover:text-white hover:scale-105">
                                <span className="flex-none w-9 h-9 rounded-full bg-[#C9B99E] text-[#322e2c] flex items-center justify-center">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4 4h16v16H4z"
                                            stroke="#322e2c"
                                            strokeWidth="1.3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M22 6l-10 7L2 6"
                                            stroke="#322e2c"
                                            strokeWidth="1.3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                <span>support@zayora.com</span>
                            </li>

                            {/* Address */}
                            <li className="flex items-center gap-4 transition-all duration-300 hover:text-white hover:scale-105">
                                <span className="flex-none w-9 h-9 rounded-full bg-[#C9B99E] text-[#322e2c] flex items-center justify-center">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 21s-6-4.35-6-9a6 6 0 1 1 12 0c0 4.65-6 9-6 9z"
                                            stroke="#322e2c"
                                            strokeWidth="1.3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <circle cx="12" cy="12" r="2" fill="#322e2c" />
                                    </svg>
                                </span>
                                <span>123 Anywhere ST., Any City, ST 12345</span>
                            </li>
                        </ul>
                    </div>
                </AnimatedItem>

                {/* Right side - Arch framed image */}
                <AnimatedItem delay={0.4}>
                    <div className="relative flex justify-center items-end hover:scale-105 transition-transform duration-300">
                        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#C9B99E] rotate-45 rounded-[1px] shadow-md transition-transform duration-300" />
                        <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#C9B99E] rotate-45 rounded-[1px] shadow-md transition-transform duration-300" />

                        <div className="relative w-[380px] sm:w-[480px] lg:w-[580px] h-[520px] sm:h-[600px] lg:h-[720px] border-[3px] border-[#C9B99E] rounded-t-[50%] flex items-end justify-center overflow-hidden transition-transform duration-300">
                            <div className="relative w-[340px] sm:w-[440px] lg:w-[540px] h-[480px] sm:h-[560px] lg:h-[680px] rounded-t-[50%] overflow-hidden mb-2">
                                <Image
                                    src="/heroi1.png"
                                    alt="Little Luxe collection"
                                    fill
                                    priority
                                    className="object-cover rounded-t-[50%]"
                                />
                            </div>
                        </div>
                    </div>
                </AnimatedItem>


            </div>

            <Image
                src="/star3.svg"
                alt="Star decoration"
                width={120}
                height={120}
                className="absolute bottom-10 -right-8 opacity-60 animate-pulse -rotate-90 z-10"
            />
            <Image
                src="/star3.svg"
                alt="Star decoration"
                width={150}
                height={150}
                className="absolute top-13 -left-8 opacity-60 animate-pulse rotate-90 z-10"
            />
        </section>
    );
};

export default Contact;
