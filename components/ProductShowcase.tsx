import { useState, useEffect } from 'react';
import { getProducts } from '../lib/shopify';

interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage?: {
    url: string;
    altText: string;
  };
  variants: {
    edges: Array<{
      node: {
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
  tags: string[];
  productType: string;
}

interface ProductShowcaseProps {
  initialProducts?: ShopifyProduct[];
}

export default function ProductShowcase({ initialProducts = [] }: ProductShowcaseProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>(initialProducts);
  const [loading, setLoading] = useState(!initialProducts.length);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // Only fetch products if we don't have initial products
    if (!initialProducts.length) {
      const fetchProducts = async () => {
        try {
          const shopifyProducts = await getProducts();
          setProducts(shopifyProducts);
        } catch (error) {
          console.error('Failed to fetch products:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [initialProducts.length]);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🎯' },
    { id: 'tracker', name: 'Trackers', icon: '📍' },
    { id: 'accessory', name: 'Accessories', icon: '⚡' },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.productType.toLowerCase() === activeCategory || 
        product.tags.some(tag => tag.toLowerCase().includes(activeCategory))
      );

  if (loading) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-text-muted/20 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-text-muted/20 rounded w-96 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-text-muted/10 rounded-3xl h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
          {filteredProducts.map((product) => {
            const mainVariant = product.variants.edges[0]?.node;
            const price = mainVariant?.price.amount;
            const compareAtPrice = mainVariant?.compareAtPrice?.amount;
            const currencyCode = mainVariant?.price.currencyCode || 'USD';

            return (
              <a
                key={product.id}
                href={`/products/${product.handle}`}
                className="group bg-background/50 backdrop-blur-md border border-text-muted/20 rounded-3xl overflow-hidden hover:border-highlight/50 transition-all duration-300 transform hover:scale-105 block"
              >
                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-highlight/20 flex items-center justify-center overflow-hidden">
                  {product.featuredImage ? (
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-highlight rounded-2xl shadow-lg group-hover:rotate-6 transition-transform duration-300" />
                  )}
                  
                  {compareAtPrice && (
                    <div className="absolute top-4 right-4 bg-highlight text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Sale
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-light mb-2">{product.title}</h3>
                  <p className="text-text-muted text-sm mb-4 line-clamp-2">
                    {product.description || 'Premium tracking device'}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-highlight">
                        ${parseFloat(price || '0').toFixed(2)}
                      </span>
                      {compareAtPrice && (
                        <span className="text-sm text-text-muted line-through">
                          ${parseFloat(compareAtPrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200">
                      View Details
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
