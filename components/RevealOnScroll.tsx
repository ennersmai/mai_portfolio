import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number; // Delay in ms
  className?: string;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after triggering to run only once
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  const style = {
    transitionDelay: `${delay}ms`,
    transform: isVisible 
      ? 'perspective(1000px) rotateX(0deg) translateZ(0) scale(1)' 
      : 'perspective(1000px) rotateX(20deg) translateZ(-50px) scale(0.95)',
    opacity: isVisible ? 1 : 0,
    filter: isVisible ? 'blur(0px)' : 'blur(4px)',
    transformOrigin: 'top center',
    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)', // Smooth ease-out
  };

  return (
    <div ref={ref} style={style} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default RevealOnScroll;