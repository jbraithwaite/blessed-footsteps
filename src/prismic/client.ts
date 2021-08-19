import { ApolloClient, InMemoryCache } from '@apollo/client';
import Prismic from '@prismicio/client';
import { ApiOptions } from '@prismicio/client/types/Api';
import { DefaultClient } from '@prismicio/client/types/client';
import { PrismicLink } from 'apollo-link-prismic';
import { routes } from './router';

const accessToken = process.env.ACCESS_TOKEN;
const REPO_NAME = process.env.REPO_NAME;

if (!accessToken) {
  throw new Error('Environment variable `ACCESS_TOKEN` not set');
}

if (!REPO_NAME) {
  throw new Error('Environment variable `REPO_NAME` not set');
}

const API_ENDPOINT = `https://${REPO_NAME}.cdn.prismic.io/api/v2`;
const GRAPHQL_ENDPOINT = `http://${REPO_NAME}.prismic.io/graphql`;

export const graphql = new ApolloClient({
  link: PrismicLink({
    uri: GRAPHQL_ENDPOINT,
    accessToken,
  }),
  cache: new InMemoryCache(),
});

export const client = (
  req: Request | null = null,
  options: ApiOptions = {},
): DefaultClient =>
  Prismic.client(API_ENDPOINT, { accessToken, routes, req, ...options });
