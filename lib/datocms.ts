import { GraphQLClient } from "graphql-request"

export function request({ query, variables, preview }) {
  console.log(process.env)
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer 8dac47e1dc7e92150edb2b53d3aa8d`,
    },
  })
  return client.request(query, variables)
}
