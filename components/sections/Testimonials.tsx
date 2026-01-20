import React, { useRef, useEffect } from 'react';
import { TESTIMONIALS } from '../../constants';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const start = containerTop;
      const end = containerTop + containerHeight - windowHeight;

      if (scrollY >= start && scrollY <= end) {
        const progress = (scrollY - start) / (end - start); // 0 to 1
        // Move track left. We want to show 3-4 items, assume width is sufficient.
        // Calculate max translation based on track scrollWidth vs window width
        const maxTranslate = trackRef.current.scrollWidth - window.innerWidth;
        const translateX = maxTranslate * progress;
        
        trackRef.current.style.transform = `translate3d(-${translateX}px, 0, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-sage-green">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div 
          ref={trackRef}
          className="flex items-center gap-12 px-20 w-max will-change-transform"
        >
           {/* Intro Card */}
           <div className="w-[80vw] md:w-[40vw] shrink-0">
             <h2 className="font-serif text-6xl text-earth-beige">Voices of the <br/> Community</h2>
           </div>

           {/* Testimonials */}
           {TESTIMONIALS.map(item => (
             <div 
                key={item.id} 
                className="w-[80vw] md:w-[35vw] shrink-0 bg-earth-beige p-12 md:p-16 shadow-lg border border-deep-brown/5"
             >
               <div className="flex gap-1 text-royal-gold mb-6">
                 {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
               </div>
               <p className="font-serif text-2xl text-deep-brown mb-8 leading-relaxed">
                 "{item.text}"
               </p>
               <p className="font-sans text-sm uppercase tracking-widest text-deep-brown/50">
                 — {item.author}
               </p>
             </div>
           ))}

           {/* End Spacer */}
           <div className="w-[10vw] shrink-0"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
