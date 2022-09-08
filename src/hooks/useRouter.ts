import { useRouter as useNextRouter } from 'next/router';
import { defined, constVoid } from '@utils/function';

export interface RouteDefinition<T extends {}> {
  href: (params: T) => string;
  /** Paths are used by the Prismic client for routing */
  path?: string;
  /** types are used by the Prismic client for routing */
  type?: string;
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

      nextRouter.push(href).catch(constVoid);
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
  sfTour: {
    href: () => '/san-francisco-tour/',
  },
  sfTourLocation: {
    href: ({ tourLocationUid }: { tourLocationUid: string }) =>
      `/san-francisco-tour/${tourLocationUid}`,
    path: '/san-francisco-tour/:uid',
    type: 'tour_location',
  },
  preview: {
    href: () => '/api/preview',
  },
  exitPreview: {
    href: () => '/api/exit-preview',
  },
};

/**
 * Routes used by Prismic Client
 */
export const routes: Route[] = (Object.keys(routeDefinitions) as RouteName[])
  .map((routeName) => {
    const { path, type }: RouteDefinition<any> = routeDefinitions[routeName];
    return path && type ? { type, path } : undefined;
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
