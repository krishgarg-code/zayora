"use client";
import { useEffect, useRef } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
  delay?: number;
  duration?: number;
  className?: string;
}

export const AnimateOnScroll = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  className = ''
}: AnimateOnScrollProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-up':
        return 'opacity-0 translate-y-10';
      case 'fade-in':
        return 'opacity-0';
      case 'slide-left':
        return 'opacity-0 translate-x-10';
      case 'slide-right':
        return 'opacity-0 -translate-x-10';
      default:
        return '';
    }
  };

  const getAnimationStyle = () => ({
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDelay: `${delay}ms`,
  });

  return (
    <div
      ref={elementRef}
      className={`${className} ${getAnimationClass()} [&.animate]:opacity-100 [&.animate]:translate-x-0 [&.animate]:translate-y-0`}
      style={getAnimationStyle()}
    >
      {children}
    </div>
  );
};