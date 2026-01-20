import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const requestRef = useRef<number>(0);
  
  // Mouse position
  const mouse = useRef({ x: 0, y: 0 });
  // Ring position (lagging)
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Update dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check for hover targets
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.hasAttribute('data-hover');
      
      setHovered(!!isClickable);
    };

    window.addEventListener('mousemove', onMouseMove);

    const animateRing = () => {
      // Linear interpolation for smooth lag
      const dx = mouse.current.x - ring.current.x;
      const dy = mouse.current.y - ring.current.y;
      
      ring.current.x += dx * 0.15;
      ring.current.y += dy * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) scale(${hovered ? 1.5 : 1})`;
      }

      requestRef.current = requestAnimationFrame(animateRing);
    };

    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [hovered]);

  return (
    <>
      <style>{`body { cursor: none; }`}</style>
      {/* The main dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-deep-brown rounded-full pointer-events-none z-[9999] -mt-1 -ml-1 mix-blend-difference"
      />
      {/* The follower ring */}
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 border border-deep-brown rounded-full pointer-events-none z-[9998] -mt-5 -ml-5 transition-colors duration-300 mix-blend-difference ${hovered ? 'bg-deep-brown/10 border-transparent' : ''}`}
      />
    </>
  );
};

export default Cursor;
