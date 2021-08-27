import cx from 'classnames';
import * as React from 'react';
import { noop } from 'src/utils';

export const Header: React.FunctionComponent<HeaderProps> = ({
  rank,
  styleLevel,
  anchor,
  children,
}) => {
  const id =
    anchor && typeof children === 'string' ? createAnchor(children) : undefined;

  const handleClick = React.useCallback(() => {
    if (id) {
      const url = new URL(window.location.href);
      url.hash = id;
      window.history.replaceState({}, window.document.title, url.toString());
      navigator.clipboard.writeText(url.toString()).catch(noop);
    }
  }, [id]);

  const component = rankMap[rank];

  return React.createElement(
    component,
    {
      className: cx(styleMap[styleLevel ?? component], 'mt-5'),
      id,
      onClick: handleClick,
    },
    [children],
  );
};

export interface HeaderProps {
  /** https://html.spec.whatwg.org/multipage/sections.html#rank */
  rank: HeaderRank;
  /**
   * The heading's rank and styling are independent. If no style level is
   * specified, the component will be styled at its rank.
   */
  styleLevel?: HeaderStyleLevel;
  anchor?: boolean;
}

export type HeaderRank = '1' | '2' | '3' | '4' | '5' | '6';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeaderStyleLevel =
  | HeadingLevel
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4';

const rankMap: Record<HeaderRank, HeadingLevel> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

const styleMap: Record<HeaderStyleLevel, string> = {
  'display-1': 'text-8xl mb-8 font-extralight',
  'display-2': 'text-8xl mb-8 font-extralight',
  'display-3': 'text-8xl mb-8 font-extralight',
  'display-4': 'text-8xl mb-8 font-extralight',
  h1: 'text-4xl mb-8 font-light leading-snug',
  h2: 'text-3xl mb-4 font-light leading-snug',
  h3: 'text-2xl mb-3.5',
  h4: 'text-xl mb-3',
  h5: 'text-lg mb-2',
  h6: 'text-base mb-1',
};

export function createAnchor(str: string): string | undefined {
  const seed = unescape(encodeURIComponent(str.toLocaleLowerCase().trim()));

  if (seed === '') {
    return undefined;
  }

  const anchor =
    typeof process !== undefined
      ? Buffer.from(seed).toString('base64')
      : window.btoa(seed);

  return anchor.substring(0, 10);
}
