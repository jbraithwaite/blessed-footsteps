import cx from 'classnames';
import * as React from 'react';

export const Header: React.FunctionComponent<HeaderProps> = ({
  rank,
  styleLevel,
  anchor,
  children,
}) => {
  const component = rankMap[rank];

  const id =
    anchor && typeof children === 'string' ? createAnchor(children) : undefined;

  return React.createElement(
    component,
    { className: cx(styleMap[styleLevel ?? component], 'mt-5'), id },
    [children],
  );
};

export interface HeaderProps {
  /** https://html.spec.whatwg.org/multipage/sections.html#rank */
  rank: Rank;
  /**
   * The heading's rank and styling are independent. If no style level is
   * specified, the component will be styled at its rank.
   */
  styleLevel?: StyleLevel;
  anchor?: boolean;
}

export type Rank = '1' | '2' | '3' | '4' | '5' | '6';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type StyleLevel =
  | HeadingLevel
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4';

const rankMap: Record<Rank, HeadingLevel> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

const styleMap: Record<StyleLevel, string> = {
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

export function createAnchor(str: string): string {
  const seed = unescape(encodeURIComponent(str.toLocaleLowerCase()));

  const anchor =
    typeof process !== undefined
      ? Buffer.from(seed).toString('base64')
      : window.btoa(seed);

  return anchor.substring(0, 10);
}
