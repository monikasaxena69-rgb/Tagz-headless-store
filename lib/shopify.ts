// Shopify Storefront API helper functions

import { GraphQLClient, gql } from 'graphql-request';

const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;
const client = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || ''
  }
});

export async function getProducts() {
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
  const data = await client.request(query);
  return data.products.edges.map((edge: any) => edge.node);
}
