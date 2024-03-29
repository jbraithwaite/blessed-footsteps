import cx from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import * as React from 'react';
import { routeDefinitions, RouteParamsMap } from '@hooks/useRouter';
import { logger } from '@utils/logger';

export const Link: React.FunctionComponent<
  React.PropsWithChildren<LinkProps>
> = ({ name, children, query, hash, ...params }) => {
  const route = routeDefinitions[name];
  const queryString = query ? '?' + query : '';
  const hashString = hash ? '#' + hash : '';

  const href = route.href(params as any) + queryString + hashString;

  const child = React.Children.only(children);

  if (
    typeof child !== 'object' ||
    !React.isValidElement(child) ||
    child.type !== 'a'
  ) {
    logger.warn('Children must be a single anchor element');
    return <NextLink href={href}>{children}</NextLink>;
  }

  return (
    <NextLink href={href} legacyBehavior>
      {React.cloneElement(child, {
        className: cx(child.props.className),
      } as any)}
    </NextLink>
  );
};

export type LinkProps = {
  [Name in keyof RouteParamsMap]: {
    name: Name;
  } & RouteParamsMap[Name] &
    Pick<NextLinkProps, 'prefetch'> & {
      query?: string;
      hash?: string;
      basic?: boolean;
    };
}[keyof RouteParamsMap];
