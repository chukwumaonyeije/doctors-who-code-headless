import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://lightslategray-turtle-256743.hostingersite.com/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;
