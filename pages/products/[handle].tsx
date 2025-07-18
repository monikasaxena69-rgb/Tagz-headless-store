import { GetStaticProps, GetStaticPaths } from 'next';
import { useState } from 'react';
import { getProducts, getProduct } from '../../lib/shopify';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface ProductPageProps {
  product: any;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-text-light mb-4">Product not found</h1>
          <a href="/" className="text-highlight hover:underline">Go back to home</a>
        </div>
      </div>
    );
  }

  const mainVariant = product.variants.edges[selectedVariant]?.node;
  const price = mainVariant?.price.amount;
  const compareAtPrice = mainVariant?.compareAtPrice?.amount;
  const currencyCode = mainVariant?.price.currencyCode || 'USD';
  const images = product.images.edges.map((edge: any) => edge.node);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-muted">
              <a href="/" className="hover:text-highlight">Home</a>
              <span>/</span>
              <a href="/#products" className="hover:text-highlight">Products</a>
              <span>/</span>
              <span className="text-text-light">{product.title}</span>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-highlight/20 rounded-2xl overflow-hidden">
                {images.length > 0 ? (
                  <img
                    src={images[selectedImageIndex]?.url || product.featuredImage?.url}
                    alt={images[selectedImageIndex]?.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-primary to-highlight rounded-2xl shadow-2xl" />
                  </div>
                )}
              </div>
              
              {/* Thumbnail gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.slice(0, 4).map((image: any, index: number) => (
                    <div 
                      key={index}
                      className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${
                        selectedImageIndex === index ? 'border-highlight' : 'border-text-muted/20 hover:border-text-muted/50'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image.url}
                        alt={image.altText || product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-light mb-4">
                  {product.title}
                </h1>
                
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-highlight">
                    ₹{parseFloat(price || '0').toFixed(2)}
                  </span>
                  {compareAtPrice && (
                    <span className="text-xl text-text-muted line-through">
                      ₹{parseFloat(compareAtPrice).toFixed(2)}
                    </span>
                  )}
                  <span className="text-sm text-text-muted">{currencyCode}</span>
                </div>
              </div>

              {/* Product Description */}
              <div className="prose prose-invert max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: product.descriptionHtml || `<p>${product.description}</p>` 
                  }}
                  className="text-text-muted leading-relaxed"
                />
              </div>

              {/* Variant Selection */}
              {product.variants.edges.length > 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-text-light mb-3">Options:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((variantEdge: any, index: number) => (
                      <button
                        key={variantEdge.node.id}
                        onClick={() => setSelectedVariant(index)}
                        className={`px-4 py-2 rounded-full border transition-colors ${
                          selectedVariant === index
                            ? 'border-highlight bg-highlight text-white'
                            : 'border-text-muted/30 text-text-muted hover:border-highlight hover:text-highlight'
                        }`}
                      >
                        {variantEdge.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <button 
                  className="w-full bg-primary hover:bg-primary/80 text-white py-4 px-8 rounded-full text-lg font-semibold transition-colors duration-200 transform hover:scale-105"
                  disabled={!mainVariant?.availableForSale}
                >
                  {mainVariant?.availableForSale ? `Add to Cart - ₹${parseFloat(price || '0').toFixed(2)}` : 'Out of Stock'}
                </button>
                
                <button className="w-full border border-text-muted hover:border-highlight text-text-light hover:text-highlight py-4 px-8 rounded-full text-lg font-semibold transition-all duration-200">
                  Buy Now
                </button>
              </div>


            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await getProducts();
    const paths = products.map((product) => ({
      params: { handle: product.handle }
    }));

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const handle = params?.handle as string;
    const product = await getProduct(handle);

    if (!product) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        product
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true
    };
  }
};
