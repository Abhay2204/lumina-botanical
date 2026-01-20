import React, { useEffect, useRef, useState } from 'react';

interface Ingredient {
  name: string;
  description: string;
  frame: number;
}

const INGREDIENTS: Ingredient[] = [
  {
    name: "Eucalyptus",
    description: "The prominent, rounded silver-green leaves with a waxy texture are characteristic of Eucalyptus pulverulenta (Baby Blue eucalyptus). Used for its purifying and refreshing properties.",
    frame: 1
  },
  {
    name: "Peonies",
    description: "Large, lush white flowers with yellow centers. Rich in antioxidants and known for their skin-soothing benefits.",
    frame: 2
  },
  {
    name: "Hyaluronic Acid",
    description: "Pure botanical waters and moisture-binding ingredients that provide deep hydration and plumpness to the skin.",
    frame: 3
  }
];

const TOTAL_FRAMES = 40;

export default function BotanicalIngredients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload all frame images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Draw current frame on canvas
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[currentFrame - 1];
    if (img && img.complete) {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
  }, [currentFrame, imagesLoaded]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(scrollProgress * TOTAL_FRAMES)
      );

      setCurrentFrame(frameIndex + 1);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine which ingredient to show based on frame
  const getActiveIngredient = () => {
    const progress = currentFrame / TOTAL_FRAMES;
    if (progress < 0.33) return INGREDIENTS[0];
    if (progress < 0.66) return INGREDIENTS[1];
    return INGREDIENTS[2];
  };

  const activeIngredient = getActiveIngredient();

  return (
    <section
      ref={containerRef}
      className="relative bg-earth-beige py-24 md:py-32"
      style={{ height: '300vh' }}
    >
      {/* Section Heading */}
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-4xl md:text-6xl font-serif text-deep-brown">
          Botanical Ingredients
        </h2>
      </div>

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Canvas for frames */}
        <div className="absolute inset-0 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full object-contain"
            style={{ opacity: imagesLoaded ? 1 : 0 }}
          />
          {!imagesLoaded && (
            <div className="text-sage-green text-xl">Loading botanical journey...</div>
          )}
        </div>

        {/* Ingredient info overlay - Right Bottom Corner */}
        <div className="absolute bottom-8 right-8 pointer-events-none max-w-xs md:max-w-sm">
          <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-xl">
            <h3 className="text-xl md:text-2xl font-light text-deep-brown mb-2">
              {activeIngredient.name}
            </h3>
            <p className="text-sm md:text-base text-deep-brown/80 leading-relaxed">
              {activeIngredient.description}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1 bg-sage-green rounded-full" style={{ width: `${(currentFrame / TOTAL_FRAMES) * 100}%`, maxWidth: '150px' }} />
              <span className="text-xs text-deep-brown/60">
                {Math.round((currentFrame / TOTAL_FRAMES) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
