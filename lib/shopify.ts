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
    throw new Error('Missing Shopify environment variables.');
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
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  if (!domain || !token) {
    console.log('Shopify environment variables not set, returning mock data');
    return getMockProducts();
  }
  
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
  
  const client = getShopifyClient();
  const data = await client.request<ProductsResponse>(query);
  return data.products.edges.map((edge: ProductEdge) => edge.node);
}

// Get single product by handle
export async function getProduct(handle: string): Promise<Product | null> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  if (!domain || !token) {
    return getMockProducts().find(p => p.handle === handle) || null;
  }
  
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
  
  const client = getShopifyClient();
  const data = await client.request<SingleProductResponse>(query, { handle });
  return data.product;
}

// Mock data for development
function getMockProducts(): Product[] {
  return [
    {
      id: 'mock-1',
      handle: 'zuno-card',
      title: 'Zuno Card',
      description: 'Ultra-thin smart tracker the size of a credit card',
      descriptionHtml: '<p>Ultra-thin smart tracker the size of a credit card</p>',
      productType: 'Tracker',
      tags: ['tracking', 'card', 'slim'],
      featuredImage: {
        url: '/Logo.png',
        altText: 'Zuno Card',
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
      description: 'Perfect tracker for your keychain',
      descriptionHtml: '<p>Perfect tracker for your keychain</p>',
      productType: 'Tracker',
      tags: ['tracking', 'keychain'],
      featuredImage: {
        url: '/Logo.png',
        altText: 'Zuno Key',
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
    }
  ];
}
