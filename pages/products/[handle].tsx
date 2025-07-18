import { GetStaticProps, GetStaticPaths } from 'next';
import { getProducts, getProduct } from '../../lib/shopify';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface ProductPageProps {
  product: any;
}

export default function ProductPage({ product }: ProductPageProps) {
  if (!product) {
    return <div>Product not found</div>;
  }

  const mainVariant = product.variants.edges[0]?.node;
  const price = mainVariant?.price.amount;
  const compareAtPrice = mainVariant?.compareAtPrice?.amount;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-highlight/20 rounded-2xl overflow-hidden">
                {product.featuredImage ? (
                  <img
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-highlight rounded-2xl" />
                  </div>
                )}
              </div>
              
              {/* Thumbnail gallery */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.edges.slice(0, 4).map((edge: any, index: number) => (
                  <div key={index} className="aspect-square bg-background/50 rounded-lg overflow-hidden border border-text-muted/20">
                    <img
                      src={edge.node.url}
                      alt={edge.node.altText || product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-light mb-4">
                  {product.title}
                </h1>
                
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-highlight">
                    ${price}
                  </span>
                  {compareAtPrice && (
                    <span className="text-xl text-text-muted line-through">
                      ${compareAtPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  className="text-text-muted"
                />
              </div>

              <div className="space-y-4">
                <button className="w-full bg-primary hover:bg-primary/80 text-white py-4 px-8 rounded-full text-lg font-semibold transition-colors duration-200">
                  Add to Cart
                </button>
                
                <button className="w-full border border-text-muted hover:border-highlight text-text-light hover:text-highlight py-4 px-8 rounded-full text-lg font-semibold transition-all duration-200">
                  Buy Now
                </button>
              </div>

              {/* Product features */}
              <div className="border-t border-text-muted/20 pt-6">
                <h3 className="text-lg font-semibold text-text-light mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.tags.map((tag: string, index: number) => (
                    <li key={index} className="flex items-center text-text-muted">
                      <span className="w-2 h-2 bg-highlight rounded-full mr-3"></span>
                      {tag}
                    </li>
                  ))}
                </ul>
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
  const products = await getProducts();
  const paths = products.map((product) => ({
    params: { handle: product.handle }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
};
