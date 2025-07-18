import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-text-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-18">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="Zuno Logo" 
              className="w-24 h-24 md:w-28 md:h-28 object-contain"
            />
            
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-text-muted hover:text-highlight transition-colors text-base">Features</a>
            <a href="#products" className="text-text-muted hover:text-highlight transition-colors text-base">Products</a>
            <a href="#support" className="text-text-muted hover:text-highlight transition-colors text-base">Support</a>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <button className="text-text-muted hover:text-highlight transition-colors text-base">
              🛒 <span className="ml-1">0</span>
            </button>
            <button className="bg-primary hover:bg-primary/80 text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full text-sm md:text-base font-semibold transition-colors">
              Shop Now
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-text-muted hover:text-highlight"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-text-muted/20">
            <nav className="flex flex-col space-y-3 py-4">
              <a href="#features" className="text-text-muted hover:text-highlight transition-colors text-base">Features</a>
              <a href="#products" className="text-text-muted hover:text-highlight transition-colors text-base">Products</a>
              <a href="#support" className="text-text-muted hover:text-highlight transition-colors text-base">Support</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
