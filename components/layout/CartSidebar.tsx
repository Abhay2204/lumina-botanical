import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartSidebar: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleCart}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-earth-beige z-[70] shadow-2xl transition-transform duration-500 ease-out transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="h-full flex flex-col p-8">
          <div className="flex justify-between items-center mb-8 border-b border-deep-brown/10 pb-4">
            <h2 className="font-serif text-2xl text-deep-brown">Your Sanctuary</h2>
            <button onClick={toggleCart} className="text-deep-brown hover:rotate-90 transition-transform duration-300">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-deep-brown/50 italic">
                Your spirit vessel is empty.
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover" />
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-deep-brown">{item.name}</h3>
                    <p className="text-sage-green text-sm">${item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                       <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-deep-brown/20 flex items-center justify-center text-deep-brown hover:bg-deep-brown hover:text-white transition-colors"
                      >
                         <Minus size={12} />
                       </button>
                       <span className="font-sans text-sm w-4 text-center">{item.quantity}</span>
                       <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-deep-brown/20 flex items-center justify-center text-deep-brown hover:bg-deep-brown hover:text-white transition-colors"
                      >
                         <Plus size={12} />
                       </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs uppercase tracking-wider text-deep-brown/50 hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-deep-brown/10 pt-6 mt-4">
            <div className="flex justify-between items-center mb-6 text-xl font-serif text-deep-brown">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-deep-brown text-earth-beige py-4 uppercase tracking-widest text-sm hover:bg-sage-green transition-colors duration-300">
              Begin Journey
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
