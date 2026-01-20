import React, { useRef, useEffect } from 'react';

const DailyRitual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !videoWrapperRef.current || !textRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Start animation when container top hits viewport top
      const start = containerTop;
      const end = containerTop + containerHeight - windowHeight;
      
      if (scrollY >= start && scrollY <= end) {
        const progress = (scrollY - start) / (end - start);
        
        // Clip path expands from 10% circle to 150% circle (full coverage)
        const clipSize = 10 + (progress * 140); 
        videoWrapperRef.current.style.clipPath = `circle(${clipSize}% at 50% 50%)`;
        
        // Text fades in
        textRef.current.style.opacity = progress > 0.6 ? `${(progress - 0.6) * 2.5}` : '0';
        textRef.current.style.transform = `translate(-50%, -50%) scale(${1 + (1-progress) * 0.2})`;

      } else if (scrollY < start) {
        videoWrapperRef.current.style.clipPath = `circle(10% at 50% 50%)`;
        textRef.current.style.opacity = '0';
      } else {
        videoWrapperRef.current.style.clipPath = `circle(150% at 50% 50%)`;
        textRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="ritual" ref={containerRef} className="relative h-[300vh] bg-earth-beige">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        <h2 className="absolute top-20 font-serif text-4xl text-deep-brown z-10 opacity-50">The Daily Ritual</h2>

        {/* Video Wrapper */}
        <div 
          ref={videoWrapperRef}
          className="absolute inset-0 w-full h-full z-20 bg-deep-brown flex items-center justify-center will-change-[clip-path]"
          style={{ clipPath: 'circle(10% at 50% 50%)' }}
        >
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          >
             <source src="/media/products view1.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Revealed Text */}
        <div 
          ref={textRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center text-earth-beige w-full max-w-2xl px-6 opacity-0 will-change-[opacity,transform]"
        >
          <h3 className="font-serif text-5xl md:text-7xl mb-6">Awaken Your Senses</h3>
          <p className="font-sans text-lg md:text-xl leading-relaxed tracking-wide">
            Let the water cleanse more than just skin. Breathe deeply. Inhale the sacred scents of ancient forests and wild blooms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DailyRitual;
