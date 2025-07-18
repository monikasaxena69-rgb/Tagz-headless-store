import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-lg border-b border-primary/30 shadow-lg shadow-primary/10' 
        : 'bg-background/60 backdrop-blur-md border-b border-text-muted/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-18">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:opacity-80 transition-all duration-300 transform hover:scale-105 group">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Zuno Logo" 
                  className="w-24 h-24 md:w-28 md:h-28 object-contain cursor-pointer transition-transform duration-300 group-hover:rotate-3"
                />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Features', id: 'features' },
              { name: 'Products', id: 'products' },
              { name: 'Support', id: 'support' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-text-muted hover:text-highlight transition-all duration-300 text-base font-medium group py-2"
              >
                {item.name}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-highlight transition-all duration-300 group-hover:w-full" />
                {/* Hover glow */}
                <span className="absolute inset-0 bg-highlight/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </button>
            ))}
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Cart Button */}
            <button className="relative text-text-muted hover:text-highlight transition-all duration-300 text-base group p-2 rounded-full hover:bg-primary/10">
              <div className="relative">
                🛒 <span className="ml-1">0</span>
                {/* Cart badge animation */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-highlight rounded-full animate-pulse" />
              </div>
            </button>

            {/* CTA Button */}
            <button className="bg-primary hover:bg-primary/80 text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30 group relative overflow-hidden">
              <span className="relative z-10">Shop Now</span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-text-muted hover:text-highlight transition-all duration-300 p-2 rounded-lg hover:bg-primary/10 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 relative flex flex-col justify-center space-y-1">
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-text-muted/20 pt-4 pb-6">
            <nav className="flex flex-col space-y-4">
              {[
                { name: 'Features', id: 'features' },
                { name: 'Products', id: 'products' },
                { name: 'Support', id: 'support' }
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-text-muted hover:text-highlight transition-all duration-300 text-base font-medium text-left p-3 rounded-lg hover:bg-primary/10 relative group animate-[slideInLeft_0.5s_ease-out] opacity-0"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Mobile item background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-highlight/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
