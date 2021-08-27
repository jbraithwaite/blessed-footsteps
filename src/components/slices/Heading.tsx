import * as t from 'io-ts';
import { Elements } from 'prismic-reactjs';
import React from 'react';
import { SliceProps } from './types';
import { Header, HeaderRank } from 'components/typography/Header';
import { Headings, titleBlock } from 'prismic/types';
import { useLogger } from 'src/hooks/logger';
import { type } from 'types/utils';

export const Heading: React.FunctionComponent<SliceProps<HeadingSlice>> = ({
  slice,
}) => {
  const logger = useLogger();

  const heading = slice.primary.heading_content[0];

  if (!heading) {
    logger.warn('`heading_content` missing content');
    return null;
  }

  return (
    <Header rank={rankMap[heading.type]} anchor>
      {heading.text}
    </Header>
  );
};

export type HeadingSlice = t.TypeOf<typeof headingSlice>;

export const headingSlice = type({
  slice_type: t.literal('heading'),
  slice_label: t.union([t.string, t.null]),
  primary: t.type({
    heading_content: titleBlock,
  }),
});

const rankMap: Record<Headings, HeaderRank> = {
  [Elements.heading1]: '1',
  [Elements.heading2]: '2',
  [Elements.heading3]: '3',
  [Elements.heading4]: '4',
  [Elements.heading5]: '5',
  [Elements.heading6]: '6',
};
