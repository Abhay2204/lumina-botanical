import React from 'react';
import { PRODUCTS } from '../../constants';
import { useCart } from '../../context/CartContext';
import RevealText from '../ui/RevealText';

const ProductCard: React.FC<{ product: typeof PRODUCTS[0] }> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col cursor-pointer overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Add to Cart Slide Up */}
        <button 
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 w-full bg-deep-brown text-earth-beige py-4 uppercase text-xs tracking-widest font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 hover:bg-sage-green"
        >
          Add to Cart — ${product.price}
        </button>
      </div>
      
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="font-serif text-xl text-deep-brown">{product.name}</h3>
          <span className="text-xs uppercase text-sage-green tracking-wider">{product.category}</span>
        </div>
        <span className="font-sans text-deep-brown">${product.price}</span>
      </div>
    </div>
  );
};

const Shop: React.FC = () => {
  return (
    <section id="shop" className="py-32 bg-earth-beige">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <RevealText text="Curated Collection" tag="h2" className="font-serif text-4xl md:text-5xl text-deep-brown mb-4" />
          <RevealText text="Essence of nature, bottled for you." tag="p" className="font-sans text-deep-brown/60" delay={100} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
