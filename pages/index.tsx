import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import Features from '../components/Features';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { getProducts } from '../lib/shopify';

interface HomeProps {
  products: any[];
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const products = await getProducts();
    return { 
      props: { products }, 
      revalidate: 60 // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching products in getStaticProps:', error);
    return {
      props: { products: [] },
      revalidate: 60
    };
  }
};

export default function Home({ products }: HomeProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Cache Buster: 2025-01-18-18:50 */}
      <Header />
      <Hero />
      <Features />
      <ProductShowcase initialProducts={products} />
      <Newsletter />
      <Footer />
    </div>
  );
}
