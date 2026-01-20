import React, { useEffect, useRef } from 'react';
import RevealText from '../ui/RevealText';
import RevealImage from '../ui/RevealImage';

const Philosophy: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const speed = 0.15;
      
      // Calculate offset when section is in view
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        const offset = (window.innerHeight - rect.top) * speed;
        imageRef.current.style.transform = `translate3d(0, -${offset}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-24 md:py-40 bg-earth-beige overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Text Content - Sticky-ish feel via layout */}
        <div className="order-2 md:order-1 space-y-8 z-10">
          <RevealText 
            text="The Philosophy of Being" 
            tag="h2" 
            className="font-serif text-4xl md:text-6xl text-deep-brown leading-tight" 
          />
          <RevealText 
            text="We believe beauty is not created, but revealed. Through the alchemy of botanicals and intention, we craft vessels of light for your daily ritual." 
            tag="p" 
            className="font-sans text-deep-brown/70 leading-relaxed max-w-md"
            delay={200}
          />
          <div className="pt-8">
            <a href="#about" className="inline-block border-b border-deep-brown pb-1 font-serif italic text-deep-brown hover:text-sage-green transition-colors">
              Read our story
            </a>
          </div>
        </div>

        {/* Parallax Image */}
        <div className="order-1 md:order-2 relative h-[600px] w-full">
           <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%] transition-transform duration-75 ease-linear will-change-transform">
              <RevealImage 
                src="/media/combo set 1.jpeg" 
                alt="Botanical Texture" 
                aspectRatio="h-full"
                className="w-full h-full"
              />
           </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
