import React, { useEffect, useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const titleRef = useRef<HTMLSpanElement>(null);
  const [isShuffling, setIsShuffling] = useState(true);

  useEffect(() => {
    // Reveal animation delay
    const timer = setTimeout(() => setLoaded(true), 100);

    // Specific requested fonts for the shuffle animation
    const fonts = [
      '"Oi"',
      '"Modak"',
      '"Shrikhand"',
      '"Fruktur"',
      '"Rubik Bubbles"',
      '"Zen Dots"',
      '"DynaPuff"',
      '"Luckiest Guy"',
      '"Bungee Shade"',
      '"Kumar One Outline"',
      '"Monoton"',
      '"Creepster"',
      '"Piedra"',
      '"Faster One"',
      '"Nabla"',
      '"Ewert"'
    ];
    
    let count = 0;
    const minChanges = 20; // Increased to show off more fonts
    const intervalDuration = 100; 

    const fontInterval = setInterval(() => {
      if (titleRef.current) {
        if (count >= minChanges) {
          // Final State: Reset to CSS defined font (Playfair Display)
          titleRef.current.style.fontFamily = ''; 
          titleRef.current.style.opacity = '1';
          titleRef.current.style.filter = 'blur(0)';
          titleRef.current.style.letterSpacing = 'normal';
          setIsShuffling(false);
          clearInterval(fontInterval);
        } else {
          // Shuffle State
          const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
          const randomSpacing = Math.floor(Math.random() * 5) + 'px'; 
          
          titleRef.current.style.fontFamily = randomFont;
          // Some of these fonts are very wide/narrow, so we keep spacing minimal to avoid layout breaking
          titleRef.current.style.letterSpacing = 'normal'; 
          
          // No blur, just raw font power as requested
          titleRef.current.style.filter = 'none';
          
          // Slight opacity flicker
          titleRef.current.style.opacity = Math.random() > 0.8 ? '0.8' : '1';
          
          count++;
        }
      }
    }, intervalDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(fontInterval);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-deep-brown">
      {/* Video Background */}
      <div className="absolute inset-0 opacity-60">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 text-center text-earth-beige px-4 flex flex-col items-center">
        {/* Fixed height container to minimize vertical layout shift during font swap */}
        {/* Increased height to accommodate the larger font size */}
        <div className="h-[180px] md:h-[280px] lg:h-[350px] flex items-center justify-center overflow-visible">
          {/* Increased font size significantly */}
          <h1 className="font-serif text-7xl md:text-[10rem] lg:text-[13rem] leading-none whitespace-nowrap">
            <span 
              ref={titleRef}
              className={`block transform transition-transform duration-[1.5s] ease-out will-change-transform ${loaded ? 'translate-y-0' : 'translate-y-full'}`}
              style={{ fontVariantNumeric: 'tabular-nums' }} 
            >
              LUMINA
            </span>
          </h1>
        </div>

        <div className="overflow-hidden mt-4 md:mt-8">
           <p className={`font-sans text-sm md:text-xl tracking-[0.4em] uppercase transform transition-transform duration-[1.5s] delay-300 ease-out ${loaded ? 'translate-y-0' : 'translate-y-full'}`}>
            Ancient Wisdom. Modern Ritual.
           </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-earth-beige/70 transition-opacity duration-1000 ${loaded ? 'opacity-100 animate-bounce' : 'opacity-0'}`}>
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default Hero;