import { useState, useEffect, useRef } from 'react';

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([]);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const featureColors = [
    "from-primary/30 to-accent1/20",
    "from-accent2/30 to-highlight/20", 
    "from-highlight/30 to-primary/20",
    "from-accent1/30 to-accent2/20"
  ];

  const features = [
    {
      title: "Precision Tracking",
      description: "Locate your items within 1-inch accuracy using our advanced ultra-wideband technology.",
      icon: "🎯",
      stats: "99.9% accuracy"
    },
    {
      title: "Global Network", 
      description: "Leverage millions of devices worldwide to find your items anywhere on the planet.",
      icon: "🌍",
      stats: "200+ countries"
    },
    {
      title: "Smart Alerts",
      description: "Get intelligent notifications when you're about to leave something behind.",
      icon: "🔔", 
      stats: "AI-powered"
    },
    {
      title: "Long Battery",
      description: "Up to 1 year of battery life with our revolutionary power management system.",
      icon: "🔋",
      stats: "365 days"
    }
  ];

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleFeatures(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-br from-background via-primary/5 to-accent1/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-highlight/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent1/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-light mb-6 opacity-0 animate-[slideUp_0.8s_ease-out_0.2s_forwards]">
            <span className="bg-gradient-to-r from-primary via-accent2 to-highlight bg-clip-text text-transparent">
              Why Choose Zuno?
            </span>
          </h2>
          <p className="text-xl text-text-muted opacity-0 animate-[slideUp_0.8s_ease-out_0.4s_forwards]">
            Experience the future of item tracking with cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => featureRefs.current[index] = el}
              className={`relative p-6 bg-gradient-to-br ${featureColors[index]} backdrop-blur-sm border border-primary/20 rounded-2xl hover:border-highlight/60 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 transform group overflow-hidden ${
                visibleFeatures[index] 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-highlight/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="absolute inset-0 bg-background/60 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 transform-gpu">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-text-light mb-2 group-hover:text-highlight transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm mb-3 group-hover:text-text-light transition-colors duration-300">
                  {feature.description}
                </p>
                <div className="text-highlight font-bold text-sm bg-highlight/10 px-3 py-1 rounded-full inline-block group-hover:bg-highlight/20 group-hover:scale-105 transition-all duration-300">
                  {feature.stats}
                </div>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary via-highlight to-accent2 bg-clip-border opacity-0 group-hover:opacity-30 transition-opacity duration-500" 
                   style={{background: 'linear-gradient(45deg, transparent, transparent), linear-gradient(45deg, #5D3FD3, #FFD700, #3B82F6)', backgroundClip: 'padding-box, border-box'}} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
