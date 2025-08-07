import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://assignment4-iq6c.onrender.com/graphql',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
}); 