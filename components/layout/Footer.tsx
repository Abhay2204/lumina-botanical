import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer 
      className="fixed bottom-0 left-0 w-full h-[400px] md:h-[500px] bg-deep-brown text-earth-beige flex flex-col justify-center items-center z-0"
      style={{ zIndex: 0 }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-5xl md:text-8xl mb-8 opacity-90">Lumina Botanics</h2>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center mb-12 font-sans tracking-widest text-sm uppercase opacity-70">
          <a href="#" className="hover:text-royal-gold transition-colors">Instagram</a>
          <a href="#" className="hover:text-royal-gold transition-colors">Pinterest</a>
          <a href="#" className="hover:text-royal-gold transition-colors">Journal</a>
          <a href="#" className="hover:text-royal-gold transition-colors">Contact</a>
        </div>

        <p className="text-xs font-sans opacity-30 tracking-widest">
          © {new Date().getFullYear()} Lumina Botanics. Crafted with Spirit.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
