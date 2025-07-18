import { useState, useEffect, useRef } from 'react';
import { getProducts, getShopifyProductUrl } from '../lib/shopify';

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
  const [visibleProducts, setVisibleProducts] = useState<boolean[]>([]);
  const productRefs = useRef<(HTMLElement | null)[]>([]);

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

  useEffect(() => {
    const observers = productRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleProducts(prev => {
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
  }, [products]);

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
            <div className="h-8 bg-text-muted/20 rounded w-64 mx-auto mb-4 skeleton"></div>
            <div className="h-4 bg-text-muted/20 rounded w-96 mx-auto mb-12 skeleton"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-text-muted/10 rounded-3xl h-96 skeleton"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accent1/5 via-background to-primary/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 right-20 w-96 h-96 bg-accent2/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-highlight/10 rounded-full blur-3xl animate-float-reverse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-light mb-6 animate-[slideUp_0.8s_ease-out_0.2s_both]">
            <span className="bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
              Our Products
            </span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto animate-[slideUp_0.8s_ease-out_0.4s_both]">
            Find the perfect tracker for every need. From ultra-thin cards to rugged accessories.
          </p>
        </div>

        {/* Enhanced category buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-[slideUp_0.8s_ease-out_0.6s_both]">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-500 transform hover:scale-105 group relative overflow-hidden ${
                activeCategory === category.id
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105'
                  : 'bg-background border-text-muted/30 text-text-muted hover:border-highlight hover:text-highlight hover:shadow-lg hover:shadow-highlight/20'
              }`}
              style={{ 
                animationDelay: `${0.8 + index * 0.1}s`
              }}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
              <span className="font-medium relative z-10">{category.name}</span>
              {/* Shimmer effect */}
              {activeCategory !== category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-highlight/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              )}
            </button>
          ))}
        </div>

        {/* Enhanced product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => {
            const mainVariant = product.variants.edges[0]?.node;
            const price = mainVariant?.price.amount;
            const compareAtPrice = mainVariant?.compareAtPrice?.amount;
            const currencyCode = mainVariant?.price.currencyCode || 'USD';

            return (
              <a
                key={product.id}
                ref={el => productRefs.current[index] = el}
                href={`/products/${product.handle}`}
                className={`group bg-background/70 backdrop-blur-md border border-primary/30 rounded-3xl overflow-hidden hover:border-highlight/70 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 transform block relative ${
                  visibleProducts[index] 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-8 opacity-0 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Product image container */}
                <div className="relative h-64 bg-gradient-to-br from-primary/40 via-accent1/30 to-highlight/40 flex items-center justify-center overflow-hidden">
                  {product.featuredImage ? (
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-highlight rounded-2xl shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 animate-morph" />
                  )}
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Sale badge */}
                  {compareAtPrice && (
                    <div className="absolute top-4 right-4 bg-highlight text-background px-3 py-1 rounded-full text-sm font-semibold animate-pulse shadow-lg">
                      Sale
                    </div>
                  )}

                  {/* Wishlist button */}
                  <button className="absolute top-4 left-4 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text-muted hover:text-highlight hover:bg-background transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100">
                    ♥
                  </button>
                </div>

                {/* Product details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-light mb-2 group-hover:text-highlight transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-4 line-clamp-2 group-hover:text-text-light transition-colors duration-300">
                    {product.description || 'Premium tracking device'}
                  </p>
                  
                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-highlight group-hover:scale-110 transition-transform duration-300 inline-block">
                        ₹{parseFloat(price || '0').toFixed(2)}
                      </span>
                      {compareAtPrice && (
                        <span className="text-sm text-text-muted line-through">
                          ₹{parseFloat(compareAtPrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                    {/* Product rating */}
                    <div className="flex items-center space-x-1 text-highlight text-sm">
                      ★★★★★ <span className="text-text-muted">(4.8)</span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    <a 
                      href={`/products/${product.handle}`}
                      className="flex-1 bg-text-muted/10 hover:bg-primary text-text-light hover:text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 text-center transform hover:scale-105 group/btn relative overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="relative z-10">View Details</span>
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </a>
                    <a
                      href={getShopifyProductUrl(product.handle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 text-center transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30 group/btn relative overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="relative z-10">Buy Now</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    </a>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-highlight/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
              </a>
            );
          })}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12 animate-[slideUp_0.8s_ease-out]">
            <div className="text-6xl mb-4 opacity-50">📦</div>
            <p className="text-text-muted text-lg">No products found in this category.</p>
            <button 
              onClick={() => setActiveCategory('all')}
              className="mt-4 text-highlight hover:text-primary transition-colors duration-300 underline"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
