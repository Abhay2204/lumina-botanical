import React, { useEffect, useRef, useState } from 'react';

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const RevealText: React.FC<RevealTextProps> = ({ text, className = "", delay = 0, tag: Tag = 'div' }) => {
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

  // Split logic can be improved for complex nested tags, but keeping simple for text blocks
  return (
    <Tag ref={ref} className={`overflow-hidden block ${className}`}>
      <span 
        className={`block transition-transform duration-1000 ease-out`}
        style={{ 
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
          transitionDelay: `${delay}ms`
        }}
      >
        {text}
      </span>
    </Tag>
  );
};

export default RevealText;
