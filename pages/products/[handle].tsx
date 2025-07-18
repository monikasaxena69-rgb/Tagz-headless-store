import { GetStaticProps, GetStaticPaths } from 'next';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  category: string;
  badge?: string;
  description: string;
  handle: string;
  features?: string[];
  images?: string[];
}

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);

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
              <span className="text-text-light">{product.name}</span>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-highlight/20 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-primary to-highlight rounded-2xl shadow-2xl transform rotate-12" />
                </div>
              </div>
              
              {/* Thumbnail gallery */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <div 
                    key={index} 
                    className="aspect-square bg-gradient-to-br from-primary/10 to-highlight/10 rounded-lg border border-text-muted/20 flex items-center justify-center cursor-pointer hover:border-highlight/50 transition-colors"
                    onClick={() => setSelectedImage(index)}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-highlight rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                {product.badge && (
                  <div className="inline-block bg-highlight text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {product.badge}
                  </div>
                )}
                
                <h1 className="text-3xl md:text-4xl font-bold text-text-light mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-highlight">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-text-muted line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-text-muted text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-light">Key Features:</h3>
                <ul className="space-y-2">
                  {getProductFeatures(product.handle).map((feature, index) => (
                    <li key={index} className="flex items-center text-text-muted">
                      <span className="w-2 h-2 bg-highlight rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-primary hover:bg-primary/80 text-white py-4 px-8 rounded-full text-lg font-semibold transition-colors duration-200 transform hover:scale-105">
                  Add to Cart - {product.price}
                </button>
                
                <button className="w-full border border-text-muted hover:border-highlight text-text-light hover:text-highlight py-4 px-8 rounded-full text-lg font-semibold transition-all duration-200">
                  Buy Now
                </button>
              </div>

              {/* Product specs */}
              <div className="border-t border-text-muted/20 pt-6">
                <h3 className="text-lg font-semibold text-text-light mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-muted">Category:</span>
                    <span className="text-text-light ml-2 capitalize">{product.category}</span>
                  </div>
                  <div>
                    <span className="text-text-muted">Battery:</span>
                    <span className="text-text-light ml-2">1 Year</span>
                  </div>
                  <div>
                    <span className="text-text-muted">Range:</span>
                    <span className="text-text-light ml-2">400 feet</span>
                  </div>
                  <div>
                    <span className="text-text-muted">Warranty:</span>
                    <span className="text-text-light ml-2">2 Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-text-light mb-8 text-center">
              You might also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getRelatedProducts(product.handle).map((relatedProduct) => (
                <a
                  key={relatedProduct.handle}
                  href={`/products/${relatedProduct.handle}`}
                  className="group bg-background/50 border border-text-muted/20 rounded-2xl p-6 hover:border-highlight/50 transition-all duration-300"
                >
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-highlight/20 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-highlight rounded-lg group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <h3 className="font-semibold text-text-light mb-2">{relatedProduct.name}</h3>
                  <p className="text-highlight font-bold">{relatedProduct.price}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Helper function to get product features
function getProductFeatures(handle: string): string[] {
  const features: { [key: string]: string[] } = {
    'zuno-card': [
      'Ultra-thin 2mm design',
      'Wireless charging compatible',
      'Water resistant IP67',
      'Bluetooth 5.0 connectivity',
      '1 year battery life'
    ],
    'zuno-key': [
      'Keychain-friendly design',
      'Loud 120dB speaker',
      'Drop-resistant build',
      'Quick setup via app',
      '400 feet range'
    ],
    'zuno-pro': [
      'Premium aluminum body',
      'Extended 500 feet range',
      'Custom alert sounds',
      'Advanced precision tracking',
      'Luxury leather pouch included'
    ],
    'charging-pad': [
      'Fast wireless charging',
      'LED charging indicators',
      'Non-slip silicone base',
      'Compatible with all Zuno devices',
      'USB-C powered'
    ],
    'protective-case': [
      'Durable silicone material',
      'Drop protection up to 6 feet',
      'Easy access to all ports',
      'Available in multiple colors',
      'Lifetime replacement warranty'
    ],
    'zuno-sticker': [
      'Strong 3M adhesive',
      'Ultra-thin 1.5mm profile',
      'Removable without residue',
      'Perfect for laptops and tablets',
      'Heat resistant up to 80°C'
    ]
  };
  
  return features[handle] || ['Advanced tracking technology', 'Long battery life', 'Easy setup'];
}

// Helper function to get related products
function getRelatedProducts(currentHandle: string) {
  const allProducts = [
    { name: "Zuno Card", price: "$29", handle: "zuno-card" },
    { name: "Zuno Key", price: "$39", handle: "zuno-key" },
    { name: "Zuno Pro", price: "$49", handle: "zuno-pro" },
    { name: "Charging Pad", price: "$19", handle: "charging-pad" },
    { name: "Protective Case", price: "$12", handle: "protective-case" },
    { name: "Zuno Sticker", price: "$24", handle: "zuno-sticker" }
  ];
  
  return allProducts.filter(p => p.handle !== currentHandle).slice(0, 3);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = [
    { handle: 'zuno-card' },
    { handle: 'zuno-key' },
    { handle: 'zuno-pro' },
    { handle: 'charging-pad' },
    { handle: 'protective-case' },
    { handle: 'zuno-sticker' }
  ];

  const paths = products.map((product) => ({
    params: { handle: product.handle }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const handle = params?.handle as string;
  
  const products = [
    {
      id: 1,
      name: "Zuno Card",
      price: "$29",
      originalPrice: "$39",
      category: "cards",
      badge: "Best Seller",
      description: "The Zuno Card is our most popular tracker, designed to fit perfectly in your wallet. At just 2mm thin, it's the same size as a credit card but packed with advanced tracking technology. Never lose your wallet again with precision location tracking and smart notifications.",
      handle: "zuno-card"
    },
    {
      id: 2,
      name: "Zuno Key",
      price: "$39",
      category: "keys",
      badge: "New",
      description: "Keep track of your keys with the Zuno Key. This compact tracker features a built-in keychain hole and the loudest speaker in our lineup. With its rugged design and water-resistant coating, it's built to handle daily wear and tear.",
      handle: "zuno-key"
    },
    {
      id: 3,
      name: "Zuno Pro",
      price: "$49",
      category: "cards",
      badge: "Premium",
      description: "The Zuno Pro is our flagship tracker, crafted from premium aluminum with an extended range of 500 feet. Perfect for professionals who demand the best, it includes a luxury leather pouch and advanced customization options.",
      handle: "zuno-pro"
    },
    {
      id: 4,
      name: "Charging Pad",
      price: "$19",
      category: "accessories",
      description: "Keep your Zuno devices powered with our sleek wireless charging pad. Features fast charging technology and LED indicators to show charging status. The non-slip base ensures your devices stay secure while charging.",
      handle: "charging-pad"
    },
    {
      id: 5,
      name: "Protective Case",
      price: "$12",
      category: "accessories",
      description: "Protect your Zuno tracker with our durable silicone case. Designed to provide maximum protection while maintaining full functionality. Available in multiple colors to match your style.",
      handle: "protective-case"
    },
    {
      id: 6,
      name: "Zuno Sticker",
      price: "$24",
      category: "cards",
      badge: "New",
      description: "The Zuno Sticker uses strong 3M adhesive to attach to any surface. Perfect for laptops, tablets, or any valuable item. Despite its ultra-thin profile, it delivers the same powerful tracking capabilities as our other devices.",
      handle: "zuno-sticker"
    }
  ];

  const product = products.find(p => p.handle === handle);

  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product
    }
  };
};
