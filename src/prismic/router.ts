import { useRouter as useNextRouter } from 'next/router';
import { Doc } from './types';
import { defined, noop } from 'src/utils';

export interface RouteDefinition<T extends {}> {
  href: (params: T) => string;
  /** Paths are used by the Prismic client for routing */
  path?: string;
}

interface Router {
  push(args: PushArgs): void;
  isPreview: boolean;
}

export function useRouter(): Router {
  const nextRouter = useNextRouter();

  return {
    push: ({ name, ...params }) => {
      const route = routeDefinitions[name];
      const href = route.href(params as any);

      nextRouter.push(href).catch(noop);
    },
    isPreview: nextRouter.isPreview,
  };
}

type PushArgs = {
  [Name in keyof RouteParamsMap]: {
    name: Name;
  } & RouteParamsMap[Name];
}[keyof RouteParamsMap];

/**
 * Mapping of pages to their path (for Prismic) and href (for Next)
 *
 * @see https://nextjs.org/docs/api-reference/next/link
 */
export const routeDefinitions = {
  home: {
    href: () => '/',
  },
  toc: {
    href: () => '/table-of-contents',
  },
  chapter: {
    href: ({ chapterUid }: { chapterUid: string }) => `/chapter/${chapterUid}`,
    path: '/chapter/:uid',
  },
  citation: {
    href: ({ citationUid }: { citationUid: string }) =>
      `/citation/${citationUid}`,
    path: '/citation/:uid',
  },
};

/**
 * Routes used by Prismic Client
 */
export const routes: Route[] = Object.keys(routeDefinitions)
  .map((type) => {
    const { path }: RouteDefinition<any> = routeDefinitions[type as RouteName];
    return path ? { type, path } : undefined;
  })
  .filter(defined);

export const linkResolver = (doc: Doc): string => {
  const route = routes.find(({ type }) => doc.type === type);

  if (route?.path) {
    return route.path;
  }

  // Fallback
  return `/${doc.uid}`;
};

export interface Route {
  type: string;
  path: string;
}

export type RouteDefinitionMap = typeof routeDefinitions;

export type RouteName = keyof RouteDefinitionMap;

export type RouteParamsMap = {
  [Name in RouteName]: RouteDefinitionMap[Name] extends RouteDefinition<infer T>
    ? T
    : never;
};
