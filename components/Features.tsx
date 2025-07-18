import { useState } from 'react';

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

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

  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-br from-background via-primary/5 to-accent1/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-light mb-6">
            <span className="bg-gradient-to-r from-primary via-accent2 to-highlight bg-clip-text text-transparent">
              Why Choose Zuno?
            </span>
          </h2>
          <p className="text-xl text-text-muted">
            Experience the future of item tracking with cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative p-6 bg-gradient-to-br ${featureColors[index]} backdrop-blur-sm border border-primary/20 rounded-2xl hover:border-highlight/60 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 transform hover:scale-105 group overflow-hidden`}
            >
              <div className="absolute inset-0 bg-background/60 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-text-light mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm mb-3">
                  {feature.description}
                </p>
                <div className="text-highlight font-bold text-sm bg-highlight/10 px-3 py-1 rounded-full inline-block">
                  {feature.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
