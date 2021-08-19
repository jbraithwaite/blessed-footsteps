import NextLink from 'next/link';
import { Elements, HTMLSerializer } from 'prismic-reactjs';
import React from 'react';
import { defaultLinkClassNames } from 'components/elements/Link';

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
        <h6 className="mb-5 font-bold text-lg" key={key}>
          {children}
        </h6>
      );

    case Elements.paragraph:
      return (
        <p className="mb-5 oldstyle-nums" key={key}>
          {children}
        </p>
      );

    case Elements.oList:
      return (
        <ol className="list-decimal" key={key}>
          {children}
        </ol>
      );

    case Elements.list:
      return (
        <ul className="list-disc" key={key}>
          {children}
        </ul>
      );

    case Elements.hyperlink:
      return (
        <NextLink href={element.data.url} key={key}>
          <a className={defaultLinkClassNames}>{children}</a>
        </NextLink>
      );

    // Return null to stick with the default behavior for all other elements
    default:
      return null;
  }
};
