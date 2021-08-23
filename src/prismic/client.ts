import { ApolloClient, InMemoryCache } from '@apollo/client';
import Prismic from '@prismicio/client';
import { ApiOptions } from '@prismicio/client/types/Api';
import { DefaultClient } from '@prismicio/client/types/client';
import { PrismicLink } from 'apollo-link-prismic';
import { routes } from './router';

const accessToken = process.env.PRISMIC_API_TOKEN;

if (!accessToken) {
  throw new Error('Environment variable `PRISMIC_API_TOKEN` not set');
}

if (!process.env.PRISMIC_REPOSITORY_NAME) {
  throw new Error('Environment variable `PRISMIC_REPOSITORY_NAME` not set');
}

export const PRISMIC_REPOSITORY_NAME = process.env.PRISMIC_REPOSITORY_NAME;

const API_ENDPOINT = `https://${PRISMIC_REPOSITORY_NAME}.cdn.prismic.io/api/v2`;
const GRAPHQL_ENDPOINT = `http://${PRISMIC_REPOSITORY_NAME}.prismic.io/graphql`;

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
