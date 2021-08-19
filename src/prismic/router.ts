import { defined } from 'src/utils';

export interface RouteDefinition<T extends {}> {
  href: (params: T) => string;
  /** Paths are used by the Prismic client for routing */
  path?: string;
}

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
