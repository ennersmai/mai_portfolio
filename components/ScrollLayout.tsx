import React, { useEffect, useRef, useState } from 'react';

interface ScrollLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollLayout: React.FC<ScrollLayoutProps> = ({ children, className = '' }) => {
  // The fixed container that moves
  const contentRef = useRef<HTMLDivElement>(null);
  // The invisible container that gives the body height
  const heightRef = useRef<HTMLDivElement>(null);

  // Physics State
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // 1. Resize Observer to update the spacer height based on content
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(content);

    // Physics Variables
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let ease = 0.075; 
    let rafId: number;

    // 2. The Animation Loop
    const animate = () => {
      targetScroll = window.scrollY;
      
      // Linear Interpolation (Lerp) for inertia
      const diff = targetScroll - currentScroll;
      const delta = diff * ease;

      if (Math.abs(diff) < 0.1) {
        currentScroll = targetScroll;
      } else {
        currentScroll += delta;
      }

      // Apply transform to the FIXED content
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, -${currentScroll}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* The Fixed "Viewport" Container - This is what the user sees */}
      <div 
        ref={contentRef}
        className={`fixed top-0 left-0 w-full will-change-transform z-10 ${className}`}
        style={{ backfaceVisibility: 'hidden' }}
      >
        {children}
      </div>

      {/* The Ghost Spacer - This pushes the body height so native scroll works */}
      <div 
        ref={heightRef} 
        style={{ height: `${height}px`, pointerEvents: 'none' }} 
      />
    </>
  );
};

export default ScrollLayout;