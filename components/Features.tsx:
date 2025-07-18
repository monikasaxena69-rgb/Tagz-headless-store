import { useState } from 'react';

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Precision Tracking",
      description: "Locate your items within 1-inch accuracy using our advanced ultra-wideband technology.",
      icon: "🎯",
      stats: "99.9% accuracy",
      color: "from-primary to-primary/60"
    },
    {
      title: "Global Network",
      description: "Leverage millions of devices worldwide to find your items anywhere on the planet.",
      icon: "🌍",
      stats: "200+ countries",
      color: "from-accent1 to-accent1/60"
    },
    {
      title: "Smart Alerts",
      description: "Get intelligent notifications when you're about to leave something behind.",
      icon: "🔔",
      stats: "AI-powered",
      color: "from-accent2 to-accent2/60"
    },
    {
      title: "Long Battery",
      description: "Up to 1 year of battery life with our revolutionary power management system.",
      icon: "🔋",
      stats: "365 days",
      color: "from-highlight to-highlight/60"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-light mb-6">
            <span className="bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
              Why Choose Zuno?
            </span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Experience the future of item tracking with cutting-edge technology 
            designed for your modern lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  activeFeature === index
                    ? 'border-highlight bg-gradient-to-r ' + feature.color + ' shadow-2xl'
                    : 'border-text-muted/20 bg-background/50 hover:border-text-muted/50'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-text-light mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted text-sm mb-2">
                      {feature.description}
                    </p>
                    <div className="text-highlight font-bold text-sm">
                      {feature.stats}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative h-96 bg-gradient-to-br from-background/80 to-text-muted/10 rounded-3xl border border-text-muted/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-48 h-48 rounded-3xl bg-gradient-to-br ${features[activeFeature].color} shadow-2xl transform transition-all duration-500`}>
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {features[activeFeature].icon}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "1M+", label: "Items Tracked", icon: "📍" },
            { number: "99.9%", label: "Success Rate", icon: "✅" },
            { number: "24/7", label: "Support", icon: "🚀" },
            { number: "1 Year", label: "Warranty", icon: "🛡️" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-background/50 backdrop-blur-md border border-text-muted/20 rounded-2xl hover:border-highlight/50 transition-all duration-300 group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-highlight mb-2">
                {stat.number}
              </div>
              <div className="text-text-muted text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
