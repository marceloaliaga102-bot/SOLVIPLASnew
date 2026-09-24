import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: 'up' | 'down' | 'none';
  threshold?: number;
  distance?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.12,
  distance = 32,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Bidirectional IntersectionObserver:
    // Triggers reveal when entering viewport, and triggers fade-out when leaving viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    if (direction === 'up') return `translate3d(0, ${distance}px, 0) scale(0.98)`;
    if (direction === 'down') return `translate3d(0, -${distance}px, 0) scale(0.98)`;
    return 'translate3d(0, 0, 0) scale(0.98)';
  };

  return (
    <div
      ref={elementRef}
      style={{
        transform: getTransform(),
        transitionDuration: '750ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
      className={`transition-all will-change-transform ${
        isVisible
          ? 'opacity-100 blur-0'
          : 'opacity-0 blur-[2px] pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
};
