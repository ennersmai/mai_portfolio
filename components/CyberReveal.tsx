import React, { useEffect, useRef } from 'react';

interface CyberRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; 
}

const CyberReveal: React.FC<CyberRevealProps> = ({ children, className = '' }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let rafId: number;

    const update = () => {
      // Get position relative to viewport
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const elementCenter = rect.top + rect.height / 2;
      const progress = elementCenter / viewportHeight;

      // Logic: 0.5 is center of screen.
      const distFromCenter = Math.abs(progress - 0.5);
      
      // Reduced intensity so items stay visible longer
      const intensity = 1.5; 

      // Math.max ensures we never go below 0 opacity
      // 0.15 buffer means items are fully opaque for 30% of the screen height in the middle
      const opacity = Math.max(0, 1 - (Math.max(0, distFromCenter - 0.15) * intensity));
      
      // Subtler scale effect
      const scale = 1 - (distFromCenter * 0.1);
      
      // RotateX based on position (Tilt back at bottom, forward at top)
      const rotateX = (progress - 0.5) * 30; 

      // Blur at edges
      const blur = Math.max(0, (distFromCenter - 0.1) * 8);

      el.style.opacity = opacity.toString();
      el.style.filter = `blur(${blur}px)`;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) scale(${scale})`;

      rafId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div 
      ref={elementRef} 
      className={`will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

export default CyberReveal;