// lib/shopify.ts
import { GraphQLClient, gql } from 'graphql-request'

const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`
const client = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
  }
})

export async function getProducts() {
  const query = gql`
    query {
      products(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            productType
            tags
            featuredImage { url altText }
            variants(first: 1) {
              edges {
                node {
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  `
  const { products } = await client.request<{ products: any }>(query)
  return products.edges.map(edge => edge.node)
}
