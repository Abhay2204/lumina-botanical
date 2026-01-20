import React, { useEffect, useRef, useState } from 'react';

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // e.g. "aspect-[4/5]"
}

const RevealImage: React.FC<RevealImageProps> = ({ src, alt, className = "", aspectRatio = "aspect-[3/4]" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden block ${aspectRatio} ${className}`}>
      {/* The Image */}
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${isVisible ? 'scale-100' : 'scale-110'}`} 
      />
      {/* The Curtain */}
      <div 
        className={`absolute inset-0 bg-sage-green z-10 transition-transform duration-[1.2s] ease-expo`}
        style={{ transform: isVisible ? 'translateY(-100%)' : 'translateY(0)' }}
      />
    </div>
  );
};

export default RevealImage;
