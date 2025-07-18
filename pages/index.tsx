import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import Features from '../components/Features';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
// pages/index.tsx
import ProductShowcase from '../components/ProductShowcase'
import { getProducts } from '../lib/shopify'

export async function getStaticProps() {
  const products = await getProducts()
  return { props: { products }, revalidate: 60 }
}

export default function Home({ products }) {
  return <ProductShowcase initialProducts={products} />
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <ProductShowcase />
      <Newsletter />
      <Footer />
    </div>
  );
}
