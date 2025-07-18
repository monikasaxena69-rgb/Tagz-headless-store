// lib/shopify.ts
import { GraphQLClient, gql } from 'graphql-request'

const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`
const client = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
  }
})

// Helper function to get the Shopify store URL
export function getShopifyStoreUrl(): string {
  return `https://${process.env.SHOPIFY_STORE_DOMAIN}`;
}

// Helper function to get direct Shopify product URL
export function getShopifyProductUrl(handle: string): string {
  return `${getShopifyStoreUrl()}/products/${handle}`;
}

interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  featuredImage?: {
    url: string;
    altText: string;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
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
      };
    }>;
  };
}

interface ShopifyProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

interface ShopifyProductResponse {
  productByHandle: ShopifyProduct;
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  const query = gql`
    query {
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
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
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
  `
  
  try {
    const { products } = await client.request<ShopifyProductsResponse>(query)
    return products.edges.map((edge) => edge.node)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const query = gql`
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
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
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
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
  `
  
  try {
    const { productByHandle } = await client.request<ShopifyProductResponse>(query, { handle })
    return productByHandle
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}
