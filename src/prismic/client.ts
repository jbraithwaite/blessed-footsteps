import * as prismic from '@prismicio/client';
import { LinkResolverFunction } from '@prismicio/helpers';
import { CreateClientConfig, enableAutoPreviews } from '@prismicio/next';
import { routes } from '../hooks/useRouter';

if (!process.env.PRISMIC_API_TOKEN) {
  throw new Error('Environment variable `PRISMIC_API_TOKEN` not set');
}

const accessToken = process.env.PRISMIC_API_TOKEN;

if (!process.env.PRISMIC_REPOSITORY_NAME) {
  throw new Error('Environment variable `PRISMIC_REPOSITORY_NAME` not set');
}

export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME;

const API_ENDPOINT = `https://${repositoryName}.cdn.prismic.io/api/v2`;

export const linkResolver: LinkResolverFunction = (doc): string => {
  const route = routes.find(({ type }) => doc.type === type);

  if (doc.uid === undefined) {
    throw new Error('Missing uid');
  }

  if (route?.path && doc.uid) {
    return route.path.replace(':uid', doc.uid);
  }

  // Fallback
  return `/${doc.uid}`;
};

export const createClient = (
  config: CreateClientConfig = {},
): prismic.Client => {
  const client = prismic.createClient(API_ENDPOINT, {
    accessToken,
    routes,
    ...config,
  });

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
