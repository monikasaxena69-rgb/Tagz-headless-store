// Shopify Storefront API helper functions

import { GraphQLClient, gql } from 'graphql-request';

// Type definitions for Shopify GraphQL response
interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
}

interface ProductEdge {
  node: Product;
}

interface ProductsResponse {
  products: {
    edges: ProductEdge[];
  };
}

// Initialize client only when needed to avoid build-time errors
function getShopifyClient(): GraphQLClient {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  if (!domain || !token) {
    throw new Error('Missing Shopify environment variables. Please set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.');
  }
  
  const endpoint = `https://${domain}/api/2023-10/graphql.json`;
  return new GraphQLClient(endpoint, {
    headers: {
      'X-Shopify-Storefront-Access-Token': token
    }
  });
}

export async function getProducts(): Promise<Product[]> {
  const query = gql`
    {
      products(first: 10) {
        edges {
          node {
            id
            handle
            title
            description
          }
        }
      }
    }
  `;
  
  const client = getShopifyClient();
  const data = await client.request<ProductsResponse>(query);
  return data.products.edges.map((edge: ProductEdge) => edge.node);
}
