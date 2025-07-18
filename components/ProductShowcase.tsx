import { useState } from 'react';

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: "Zuno Card",
      price: "$29",
      originalPrice: "$39",
      category: "cards",
      badge: "Best Seller",
      description: "Ultra-thin smart tracker the size of a credit card"
    },
    {
      id: 2,
      name: "Zuno Key",
      price: "$39",
      category: "keys",
      badge: "New",
      description: "Perfect tracker for your keychain"
    },
    {
      id: 3,
      name: "Zuno Pro",
      price: "$49",
      category: "cards",
      badge: "Premium",
      description: "Professional grade tracker with advanced features"
    },
    {
      id: 4,
      name: "Charging Pad",
      price: "$19",
      category: "accessories",
      description: "Wireless charging station for your Zuno devices"
    },
    {
      id: 5,
      name: "Protective Case",
      price: "$12",
      category: "accessories",
      description: "Durable silicone case for extra protection"
    },
    {
      id: 6,
      name: "Zuno Sticker",
      price: "$24",
      category: "cards",
      badge: "New",
      description: "Adhesive tracker that sticks to any surface"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🎯' },
    { id: 'cards', name: 'Cards', icon: '💳' },
    { id: 'keys', name: 'Keys', icon: '🔑' },
    { id: 'accessories', name: 'Accessories', icon: '⚡' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-light mb-6">
            <span className="bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
              Our Products
            </span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Find the perfect tracker for every need. From ultra-thin cards to rugged accessories.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-white border-primary shadow-lg'
                  : 'bg-background border-text-muted/30 text-text-muted hover:border-highlight hover:text-highlight'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-background/50 backdrop-blur-md border border-text-muted/20 rounded-3xl overflow-hidden hover:border-highlight/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-highlight/20 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-highlight rounded-2xl shadow-lg group-hover:rotate-6 transition-transform duration-300" />
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-highlight text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.badge}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-light mb-2">{product.name}</h3>
                <p className="text-text-muted text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-highlight">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-text-muted line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
