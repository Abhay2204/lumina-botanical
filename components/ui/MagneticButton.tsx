import React, { useRef, useState } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number; // How far it moves
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = "", 
  strength = 30,
  ...props 
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const x = (e.clientX - centerX) / width * strength;
    const y = (e.clientY - centerY) / height * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={btnRef}
      className={`relative transition-transform duration-100 ease-linear ${className}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-hover
      {...props}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
