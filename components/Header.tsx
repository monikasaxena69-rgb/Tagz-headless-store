import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-text-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="Zuno Logo" 
              className="w-6 h-6 md:w-8 md:h-8 object-contain"
            />
            
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-text-muted hover:text-highlight transition-colors text-sm">Features</a>
            <a href="#products" className="text-text-muted hover:text-highlight transition-colors text-sm">Products</a>
            <a href="#support" className="text-text-muted hover:text-highlight transition-colors text-sm">Support</a>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <button className="text-text-muted hover:text-highlight transition-colors text-sm">
              🛒 <span className="ml-1">0</span>
            </button>
            <button className="bg-primary hover:bg-primary/80 text-white px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-colors">
              Shop Now
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-text-muted hover:text-highlight"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-text-muted/20">
            <nav className="flex flex-col space-y-3">
              <a href="#features" className="text-text-muted hover:text-highlight transition-colors text-sm">Features</a>
              <a href="#products" className="text-text-muted hover:text-highlight transition-colors text-sm">Products</a>
              <a href="#support" className="text-text-muted hover:text-highlight transition-colors text-sm">Support</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
