import React from 'react';
import App from './App';
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
