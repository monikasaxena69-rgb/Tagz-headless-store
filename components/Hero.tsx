import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Never Lose Anything Again",
      subtitle: "Smart tracking technology that adapts to your lifestyle",
      cta: "Shop Trackers",
      highlight: "New Release",
      bg: "from-primary/20 to-accent1/20"
    },
    {
      title: "Ultra-Precision Location",
      subtitle: "Find your items within inches, anywhere in the world",
      cta: "Explore Technology", 
      highlight: "Advanced GPS",
      bg: "from-accent2/20 to-highlight/20"
    },
    {
      title: "30-Day Battery Life",
      subtitle: "Worry-free tracking with our revolutionary power system",
      cta: "Learn More",
      highlight: "Long Lasting",
      bg: "from-highlight/20 to-primary/20"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bg} transition-all duration-1000`} />
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-highlight/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-highlight/20 text-highlight font-semibold text-sm mb-6 animate-bounce">
          <span className="mr-2">✨</span>
          {slides[currentSlide].highlight}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-text-light mb-6 leading-tight">
          <span className="bg-gradient-to-r from-text-light via-highlight to-primary bg-clip-text text-transparent">
            {slides[currentSlide].title}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
          {slides[currentSlide].subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105">
            {slides[currentSlide].cta}
          </button>
          <button className="border border-text-muted hover:border-highlight text-text-light hover:text-highlight px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105">
            Watch Demo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: "Zuno Card", price: "$29", feature: "Ultra-thin design" },
            { name: "Zuno Key", price: "$39", feature: "Keychain friendly" },
            { name: "Zuno Pro", price: "$49", feature: "Premium materials" }
          ].map((product, index) => (
            <div key={product.name} className="bg-background/50 backdrop-blur-md border border-text-muted/20 rounded-2xl p-6 hover:border-highlight/50 transition-all duration-300 transform hover:scale-105 group">
              <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-highlight/20 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-highlight rounded-lg shadow-lg group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-text-light mb-2">{product.name}</h3>
              <p className="text-text-muted text-sm mb-3">{product.feature}</p>
              <p className="text-highlight font-bold text-xl">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
