import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Never Lose Anything Again",
      subtitle: "Smart tracking technology that adapts to your lifestyle",
      cta: "Shop Trackers",
      highlight: "New Release",
      bg: "from-primary/40 via-accent1/30 to-highlight/40"
    },
    {
      title: "Ultra-Precision Location",
      subtitle: "Find your items within inches, anywhere in the world",
      cta: "Explore Technology", 
      highlight: "Advanced GPS",
      bg: "from-accent2/40 via-primary/30 to-highlight/50"
    },
    {
      title: "30-Day Battery Life",
      subtitle: "Worry-free tracking with our revolutionary power system",
      cta: "Learn More",
      highlight: "Long Lasting",
      bg: "from-highlight/50 via-accent1/30 to-primary/40"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bg} transition-all duration-1000`} />
      
      <div className="absolute inset-0">
        <div className="absolute top-10 left-5 md:top-20 md:left-10 w-32 h-32 md:w-64 md:h-64 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-5 md:bottom-20 md:right-10 w-48 h-48 md:w-96 md:h-96 bg-highlight/35 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 md:w-80 md:h-80 bg-accent1/25 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 md:w-72 md:h-72 bg-accent2/30 rounded-full blur-3xl animate-pulse delay-1500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 rounded-full bg-highlight/40 border border-highlight/60 text-highlight font-semibold text-xs md:text-sm mb-6 animate-bounce shadow-lg shadow-highlight/20">
          <span className="mr-2">✨</span>
          {slides[currentSlide].highlight}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-text-light mb-6 leading-tight px-2">
          <span className="bg-gradient-to-r from-text-light via-highlight to-primary bg-clip-text text-transparent">
            {slides[currentSlide].title}
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          {slides[currentSlide].subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
          <button className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-200 transform hover:scale-105">
            {slides[currentSlide].cta}
          </button>
          <button className="w-full sm:w-auto border border-text-muted hover:border-highlight text-text-light hover:text-highlight px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-200 transform hover:scale-105">
            Watch Demo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto px-4">
          {[
            { name: "Zuno Card", price: "$29", feature: "Ultra-thin design" },
            { name: "Zuno Key", price: "$39", feature: "Keychain friendly" },
            { name: "Zuno Pro", price: "$49", feature: "Premium materials" }
          ].map((product, index) => (
            <div key={product.name} className="bg-background/70 backdrop-blur-md border border-primary/30 rounded-2xl p-4 md:p-6 hover:border-highlight/70 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 group">
              <div className="w-full h-24 md:h-32 bg-gradient-to-br from-primary/40 via-accent1/30 to-highlight/40 rounded-lg mb-4 flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary via-accent2 to-highlight rounded-lg shadow-xl group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-text-light mb-2">{product.name}</h3>
              <p className="text-text-muted text-xs md:text-sm mb-3">{product.feature}</p>
              <p className="text-highlight font-bold text-lg md:text-xl">{product.price}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-3 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-highlight scale-125' : 'bg-text-muted/50 hover:bg-text-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 md:w-6 md:h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
