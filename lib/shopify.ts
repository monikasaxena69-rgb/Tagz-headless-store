// Shopify Storefront API helper functions

import { GraphQLClient, gql } from 'graphql-request';

// Enhanced type definitions
interface ProductImage {
  url: string;
  altText: string;
  width: number;
  height: number;
}

interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
}

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage?: ProductImage;
  images: {
    edges: Array<{
      node: ProductImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  tags: string[];
  productType: string;
}

interface ProductEdge {
  node: Product;
}

interface ProductsResponse {
  products: {
    edges: ProductEdge[];
  };
}

interface SingleProductResponse {
  product: Product;
}

// Initialize client
function getShopifyClient(): GraphQLClient {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  if (!domain || !token) {
    console.log('Shopify environment variables not found, using mock data');
    return null as any;
  }
  
  const endpoint = `https://${domain}/api/2023-10/graphql.json`;
  return new GraphQLClient(endpoint, {
    headers: {
      'X-Shopify-Storefront-Access-Token': token
    }
  });
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  const client = getShopifyClient();
  
  if (!client) {
    console.log('No Shopify client, returning mock data');
    return getMockProducts();
  }
  
  try {
    const query = gql`
      {
        products(first: 20) {
          edges {
            node {
              id
              handle
              title
              description
              descriptionHtml
              productType
              tags
              featuredImage {
                url
                altText
                width
                height
              }
              images(first: 10) {
                edges {
                  node {
                    url
                    altText
                    width
                    height
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    const data = await client.request<ProductsResponse>(query);
    console.log(`Fetched ${data.products.edges.length} products from Shopify`);
    return data.products.edges.map((edge: ProductEdge) => edge.node);
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
    return getMockProducts();
  }
}

// Get single product by handle
export async function getProduct(handle: string): Promise<Product | null> {
  const client = getShopifyClient();
  
  if (!client) {
    return getMockProducts().find(p => p.handle === handle) || null;
  }
  
  try {
    const query = gql`
      query getProduct($handle: String!) {
        product(handle: $handle) {
          id
          handle
          title
          description
          descriptionHtml
          productType
          tags
          featuredImage {
            url
            altText
            width
            height
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    `;
    
    const data = await client.request<SingleProductResponse>(query, { handle });
    return data.product;
  } catch (error) {
    console.error(`Error fetching product ${handle} from Shopify:`, error);
    return getMockProducts().find(p => p.handle === handle) || null;
  }
}

// Mock data for development/fallback
function getMockProducts(): Product[] {
  return [
    {
      id: 'mock-1',
      handle: 'zuno-card',
      title: 'Zuno Card',
      description: 'Ultra-thin smart tracker the size of a credit card. Perfect for wallets, this 2mm thin device offers precision tracking with 1-year battery life.',
      descriptionHtml: '<p>Ultra-thin smart tracker the size of a credit card. Perfect for wallets, this 2mm thin device offers precision tracking with 1-year battery life.</p><ul><li>2mm ultra-thin design</li><li>Fits in any wallet</li><li>1 year battery life</li><li>Precision tracking</li></ul>',
      productType: 'Tracker',
      tags: ['tracking', 'card', 'wallet', 'thin'],
      featuredImage: {
        url: '/Logo.png',
        altText: 'Zuno Card - Ultra-thin tracker',
        width: 500,
        height: 500
      },
      images: {
        edges: [
          {
            node: {
              url: '/Logo.png',
              altText: 'Zuno Card',
              width: 500,
              height: 500
            }
          }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'variant-1',
              title: 'Default',
              price: {
                amount: '29.00',
                currencyCode: 'USD'
              },
              compareAtPrice: {
                amount: '39.00',
                currencyCode: 'USD'
              },
              availableForSale: true
            }
          }
        ]
      }
    },
    {
      id: 'mock-2',
      handle: 'zuno-key',
      title: 'Zuno Key',
      description: 'Perfect tracker for your keychain with loud 120dB speaker and rugged water-resistant design.',
      descriptionHtml: '<p>Perfect tracker for your keychain with loud 120dB speaker and rugged water-resistant design.</p><ul><li>120dB loud speaker</li><li>Water resistant</li><li>Keychain ready</li><li>Drop resistant</li></ul>',
      productType: 'Tracker',
      tags: ['tracking', 'keychain', 'loud', 'waterproof'],
      featuredImage: {
        url: '/Logo.png',
        altText: 'Zuno Key - Keychain tracker',
        width: 500,
        height: 500
      },
      images: {
        edges: [
          {
            node: {
              url: '/Logo.png',
              altText: 'Zuno Key',
              width: 500,
              height: 500
            }
          }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'variant-2',
              title: 'Default',
              price: {
                amount: '39.00',
                currencyCode: 'USD'
              },
              availableForSale: true
            }
          }
        ]
      }
    },
    {
      id: 'mock-3',
      handle: 'zuno-pro',
      title: 'Zuno Pro',
      description: 'Premium aluminum tracker with extended 500ft range and luxury leather pouch included.',
      descriptionHtml: '<p>Premium aluminum tracker with extended 500ft range and luxury leather pouch included.</p><ul><li>Premium aluminum build</li><li>500ft extended range</li><li>Luxury leather pouch</li><li>Custom alerts</li></ul>',
      productType: 'Tracker',
      tags: ['premium', 'aluminum', 'extended-range', 'luxury'],
      featuredImage: {
        url: '/Logo.png',
        altText: 'Zuno Pro - Premium tracker',
        width: 500,
        height: 500
      },
      images: {
        edges: [
          {
            node: {
              url: '/Logo.png',
              altText: 'Zuno Pro',
              width: 500,
              height: 500
            }
          }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'variant-3',
              title: 'Default',
              price: {
                amount: '49.00',
                currencyCode: 'USD'
              },
              availableForSale: true
            }
          }
        ]
      }
    }
  ];
}
