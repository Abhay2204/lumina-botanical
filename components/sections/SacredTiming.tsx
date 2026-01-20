import React, { useEffect, useRef, useState } from 'react';

const SacredTiming: React.FC = () => {
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = 108;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);
            
            setCount(Math.floor(start + (end - start) * ease));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="relative py-40 bg-earth-beige flex items-center justify-center overflow-hidden">
      {/* Background Rotating Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
         <svg className="w-[600px] h-[600px] animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="48" stroke="#2A1B18" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
         </svg>
         <svg className="absolute w-[500px] h-[500px] animate-[spin_15s_linear_infinite_reverse]" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="48" stroke="#8A9A7B" strokeWidth="0.5" fill="none" strokeDasharray="10 10" />
         </svg>
      </div>

      <div className="relative z-10 text-center">
        <span className="block text-sage-green font-sans text-sm uppercase tracking-[0.4em] mb-4">Sacred Number</span>
        <div className="font-serif text-9xl md:text-[12rem] text-deep-brown leading-none tabular-nums">
          {count}
        </div>
        <p className="mt-6 font-serif text-xl italic text-deep-brown/60">
          Days of Infusion
        </p>
      </div>
    </section>
  );
};

export default SacredTiming;
