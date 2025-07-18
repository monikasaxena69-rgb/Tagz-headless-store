import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getProducts } from '../lib/shopify';

interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
}

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Fetch products for the footer links
    const fetchProducts = async () => {
      try {
        const shopifyProducts = await getProducts();
        console.log('Fetched products for footer:', shopifyProducts);
        if (shopifyProducts && shopifyProducts.length > 0) {
          // Take first 3 products
          setProducts(shopifyProducts.slice(0, 3));
        } else {
                     // If no products from Shopify, use fallback
           // Link to products section instead of individual pages that may not exist
           setProducts([
             { id: '1', handle: '/#products', title: 'Zuno Card' },
             { id: '2', handle: '/#products', title: 'Zuno Key' },
             { id: '3', handle: '/#products', title: 'Zuno Pro' }
           ]);
        }
      } catch (error) {
        console.error('Failed to fetch products for footer:', error);
        // Fallback to default products if fetch fails
        // Link to products section instead of individual pages that may not exist
        setProducts([
          { id: '1', handle: '/#products', title: 'Zuno Card' },
          { id: '2', handle: '/#products', title: 'Zuno Clip' },
          { id: '3', handle: '/#products', title: 'Zuno Pro' }
        ]);
      }
    };

    fetchProducts();
  }, []);

  const footerSections = [
    {
      title: "Product",
      links: [
        ...products.map(product => ({
          name: product.title,
          href: `/products/${product.handle}`
        })),
        { name: "Compare All", href: "/compare" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "FAQ's", href: "/help" },
        { name: "Contact Us", href: "/contact" },
        { name: "Warranty", href: "/warranty" },
        { name: "Returns", href: "/returns" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Blog", href: "/blog" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Instagram", icon: "📷", href: "https://instagram.com/tryzuno", color: "hover:text-pink-400" },
    { name: "Twitter", icon: "🐦", href: "https://twitter.com/try_zuno", color: "hover:text-blue-400" },
    { name: "Facebook", icon: "📘", href: "https://facebook.com/tryzuno", color: "hover:text-blue-600" },
    { name: "LinkedIn", icon: "💼", href: "https://linkedin.com/company/zuno", color: "hover:text-blue-500" }
  ];

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-br from-background via-primary/5 to-accent1/10 border-t border-primary/20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-highlight/5 rounded-full blur-3xl animate-float-reverse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className={`lg:col-span-2 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-highlight rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
                Zuno
              </span>
            </div>
            <p className="text-text-muted mb-6 max-w-md leading-relaxed">
              Smart tracking technology that adapts to your lifestyle. Never lose anything again with our revolutionary tracking devices.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-background/50 backdrop-blur-sm border border-primary/20 rounded-full flex items-center justify-center text-text-muted transition-all duration-300 transform hover:scale-110 hover:border-highlight/50 ${social.color} group`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <div 
              key={section.title}
              className={`transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${(sectionIndex + 1) * 200}ms` }}
            >
              <h3 className="text-text-light font-semibold mb-4 text-lg">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={link.name}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-highlight transition-all duration-300 hover:translate-x-1 inline-block relative group"
                      >
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-text-muted hover:text-highlight transition-all duration-300 hover:translate-x-1 inline-block relative group"
                      >
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className={`bg-gradient-to-r from-primary/10 via-accent1/10 to-highlight/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 mb-12 transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-text-light mb-2">
                Stay in the loop
              </h3>
              <p className="text-text-muted">
                Get updates on new products and exclusive offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-0 md:min-w-[300px]">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-background/50 backdrop-blur-sm border border-text-muted/30 rounded-full text-text-light placeholder-text-muted focus:outline-none focus:border-highlight focus:ring-2 focus:ring-highlight/20 transition-all duration-300"
              />
              <button className="px-6 py-2 bg-primary hover:bg-primary/80 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t border-primary/20 pt-8 transition-all duration-1000 delay-1200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-text-muted">
              <span>© 2024 Zuno Technologies. All rights reserved.</span>
              <div className="flex space-x-4">
                <a href="/privacy" className="hover:text-highlight transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-highlight transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="/cookies" className="hover:text-highlight transition-colors duration-300">
                  Cookies
                </a>
              </div>
            </div>
            
            {/* Back to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 text-text-muted hover:text-highlight transition-all duration-300 transform hover:scale-105 group"
            >
              <span className="text-sm">Back to top</span>
              <div className="w-8 h-8 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center group-hover:bg-primary/30 group-hover:border-highlight/50 transition-all duration-300">
                <span className="text-xs transform group-hover:-translate-y-0.5 transition-transform duration-300">
                  ↑
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
