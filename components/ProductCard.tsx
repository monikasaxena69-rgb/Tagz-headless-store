import { useState } from 'react';
import { getShopifyProductUrl } from '../lib/shopify';

interface ProductCardProps {
  product: {
    id: string;
    handle: string;
    title: string;
    description?: string;
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
    tags?: string[];
    productType?: string;
  };
  className?: string;
  showWishlist?: boolean;
  showRating?: boolean;
}

export default function ProductCard({ 
  product, 
  className = '', 
  showWishlist = true, 
  showRating = true 
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const mainVariant = product.variants.edges[0]?.node;
  const price = mainVariant?.price.amount;
  const compareAtPrice = mainVariant?.compareAtPrice?.amount;
  const currencyCode = mainVariant?.price.currencyCode || 'USD';

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <a
      href={`/products/${product.handle}`}
      className={`group relative bg-background border border-text-muted/20 rounded-3xl overflow-hidden hover:border-highlight/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 transform ${className}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-highlight/20 overflow-hidden">
        {product.featuredImage ? (
          <>
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-highlight/40 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-highlight border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-highlight rounded-2xl shadow-2xl group-hover:scale-110 transition-transform duration-500" />
          </div>
        )}

        {/* Product hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Sale badge */}
        {compareAtPrice && (
          <div className="absolute top-4 right-4 bg-highlight text-background px-3 py-1 rounded-full text-sm font-semibold animate-pulse shadow-lg">
            Sale
          </div>
        )}

        {/* Wishlist button */}
        {showWishlist && (
          <button 
            onClick={handleWishlistClick}
            className={`absolute top-4 left-4 w-8 h-8 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100 ${
              isWishlisted 
                ? 'bg-highlight text-background' 
                : 'bg-background/80 text-text-muted hover:text-highlight hover:bg-background'
            }`}
          >
            {isWishlisted ? '♥' : '♡'}
          </button>
        )}
      </div>

      {/* Product details */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-light mb-2 group-hover:text-highlight transition-colors duration-300 line-clamp-2">
          {product.title}
        </h3>
        {product.description && (
          <p className="text-text-muted text-sm mb-4 line-clamp-2 group-hover:text-text-light transition-colors duration-300">
            {product.description}
          </p>
        )}
        
        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-highlight group-hover:scale-110 transition-transform duration-300 inline-block">
              {currencyCode === 'INR' ? '₹' : '$'}{parseFloat(price || '0').toFixed(2)}
            </span>
            {compareAtPrice && (
              <span className="text-sm text-text-muted line-through">
                {currencyCode === 'INR' ? '₹' : '$'}{parseFloat(compareAtPrice).toFixed(2)}
              </span>
            )}
          </div>
          {/* Product rating */}
          {showRating && (
            <div className="flex items-center space-x-1 text-highlight text-sm">
              ★★★★★ <span className="text-text-muted">(4.8)</span>
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-2">
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-text-muted/10 hover:bg-primary text-text-light hover:text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 text-center transform hover:scale-105 group/btn relative overflow-hidden"
          >
            <span className="relative z-10">View Details</span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </button>
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
}
