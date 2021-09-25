import cx from 'classnames';
import NextLink from 'next/link';
import { Elements, HTMLSerializer } from 'prismic-reactjs';
import React from 'react';
import { Hyperlink } from './types';
import { Ol } from 'components/typography/Ol';

export const htmlSerializer: HTMLSerializer<React.ReactNode> = function (
  kind,
  element,
  _content,
  children,
  key,
) {
  switch (kind) {
    case Elements.heading1:
    case Elements.heading2:
    case Elements.heading3:
    case Elements.heading4:
    case Elements.heading5:
    case Elements.heading6:
      return (
        <h6 className="font-bold text-lg" key={key}>
          {children}
        </h6>
      );

    case Elements.paragraph:
      return <p key={key}>{children}</p>;

    case Elements.image:
      const isPortrait = element.dimensions.width > element.dimensions.height;

      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={element.url}
          alt={element.alt}
          width={element.dimensions.width}
          height={element.dimensions.height}
          className={cx(
            'app-image',
            'px-0',
            isPortrait ? 'app-image-portrait' : undefined,
          )}
          key={key}
        />
      );
    case Elements.oList:
      return <Ol key={key}>{children}</Ol>;

    case Elements.list:
      return (
        <ul className="list-disc list-inside sm:list-outside" key={key}>
          {children}
        </ul>
      );

    case Elements.hyperlink:
      const hyperlink = element.data as Hyperlink;

      return hyperlink.url ? (
        <NextLink href={hyperlink.url} key={key}>
          <a>{children}</a>
        </NextLink>
      ) : (
        // todo: Fix document link
        <>[Fix me]</>
      );

    // Return null to stick with the default behavior for all other elements
    default:
      return null;
  }
};
