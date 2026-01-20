import React from 'react';
import { CartProvider } from './context/CartContext';
import Cursor from './components/ui/Cursor';
import Navbar from './components/layout/Navbar';
import CartSidebar from './components/layout/CartSidebar';
import Hero from './components/sections/Hero';
import Philosophy from './components/sections/Philosophy';
import BotanicalIngredients from './components/sections/BotanicalIngredients';
import Shop from './components/sections/Shop';
import DualFeature from './components/sections/DualFeature';
import SacredTiming from './components/sections/SacredTiming';
import DailyRitual from './components/sections/DailyRitual';
import Testimonials from './components/sections/Testimonials';
import Footer from './components/layout/Footer';

function App() {
  // Footer height is roughly 400px mobile, 500px desktop. 
  // We add margin-bottom to main content to allow the reveal effect.
  
  return (
    <CartProvider>
      <div className="bg-earth-beige text-deep-brown selection:bg-sage-green selection:text-white cursor-none">
        <Cursor />
        <Navbar />
        <CartSidebar />
        
        {/* Main Content Wrapper with Z-Index > Footer */}
        <main className="relative z-10 bg-earth-beige mb-[400px] md:mb-[500px] shadow-2xl">
          <Hero />
          <Philosophy />
          <BotanicalIngredients />
          <DualFeature />
          <Shop />
          <SacredTiming />
          <DailyRitual />
          <Testimonials />
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
