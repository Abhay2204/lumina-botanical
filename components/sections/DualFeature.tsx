import React, { useRef, useEffect } from 'react';
import RevealText from '../ui/RevealText';

const DualFeature: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check intersection
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Calculate progress 0 to 1
        const progress = 1 - (rect.top + rect.height) / (viewportHeight + rect.height);
        // Subtle zoom scale 1 to 1.1
        const scale = 1 + Math.min(Math.max(progress * 0.1, 0), 0.1);
        imgRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="flex flex-col md:flex-row md:min-h-screen bg-earth-beige border-t border-deep-brown/10">
      <div className="w-full md:w-1/2 overflow-hidden h-[40vh] md:h-screen md:sticky md:top-0">
        <img 
          ref={imgRef}
          src="/media/combo set 2.jpeg" 
          alt="Natural Ingredients" 
          className="w-full h-full object-cover origin-center transition-transform duration-100 ease-out will-change-transform"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 py-16 md:p-24 bg-deep-brown text-earth-beige min-h-[60vh] md:min-h-screen">
        <div className="max-w-md space-y-6 md:space-y-8">
           <span className="text-royal-gold uppercase tracking-widest text-xs">Pure Origins</span>
           <RevealText text="Sourced from the Sacred Earth" tag="h2" className="font-serif text-3xl md:text-6xl leading-tight" />
           <p className="font-sans text-earth-beige/70 leading-relaxed text-sm md:text-base">
             Our botanicals are harvested at the peak of their potency, respecting the cycles of the moon and the rhythm of the seasons. We work directly with small-scale growers who treat the land as a living entity.
           </p>
           <div className="grid grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8 border-t border-earth-beige/10">
              <div>
                <h4 className="font-serif text-xl md:text-2xl mb-2">100%</h4>
                <p className="text-xs uppercase tracking-wider opacity-60">Organic</p>
              </div>
              <div>
                <h4 className="font-serif text-xl md:text-2xl mb-2">Cruelty</h4>
                <p className="text-xs uppercase tracking-wider opacity-60">Free</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default DualFeature;
