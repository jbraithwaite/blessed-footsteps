import cx from 'classnames';
import NextLink from 'next/link';
import * as React from 'react';
import { routeDefinitions, RouteParamsMap } from 'prismic/router';
import { useLogger } from 'src/hooks/logger';

export const Link: React.FunctionComponent<
  LinkProps & { query?: string; hash?: string }
> = ({ name, basic, children, query, hash, ...params }) => {
  const logger = useLogger();

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
    <NextLink href={href}>
      {React.cloneElement(child, {
        className: cx(child.props.className, !basic && defaultLinkClassNames),
      })}
    </NextLink>
  );
};

export type LinkProps = {
  [Name in keyof RouteParamsMap]: {
    name: Name;
    basic?: boolean;
  } & RouteParamsMap[Name];
}[keyof RouteParamsMap];

export const defaultLinkClassNames = 'underline hover:text-blue-600';
