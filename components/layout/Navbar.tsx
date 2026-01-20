import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import MagneticButton from '../ui/MagneticButton';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleCart, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-earth-beige/80 backdrop-blur-md py-4 shadow-sm border-b border-deep-brown/5' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="font-serif text-2xl tracking-wider text-deep-brown font-bold z-50 relative">
            LUMINA
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-12 text-sm uppercase tracking-widest font-medium text-deep-brown">
            <a href="#philosophy" className="hover:opacity-60 transition-opacity" data-hover>Philosophy</a>
            <a href="#shop" className="hover:opacity-60 transition-opacity" data-hover>Shop</a>
            <a href="#ritual" className="hover:opacity-60 transition-opacity" data-hover>Ritual</a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
             <MagneticButton onClick={toggleCart} className="relative p-2 text-deep-brown" aria-label="Open Cart">
               <ShoppingBag size={20} />
               {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-royal-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-bold">
                   {cartCount}
                 </span>
               )}
             </MagneticButton>
             
             {/* Mobile Menu Toggle */}
             <button 
                className="md:hidden text-deep-brown z-50 relative"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             >
                {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-earth-beige z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="font-serif text-3xl text-deep-brown">Philosophy</a>
         <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="font-serif text-3xl text-deep-brown">Shop</a>
         <a href="#ritual" onClick={() => setMobileMenuOpen(false)} className="font-serif text-3xl text-deep-brown">Ritual</a>
      </div>
    </>
  );
};

export default Navbar;
