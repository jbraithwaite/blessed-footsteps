import * as t from 'io-ts';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { SliceProps } from './types';
import { htmlSerializer } from 'prismic/serializer';
import { richTextBlock } from 'prismic/types';
import { type } from 'types/utils';

export const Quote: React.FunctionComponent<SliceProps<QuoteSlice>> = ({
  slice,
}) => {
  return (
    <blockquote className="font-serif">
      <RichText
        render={slice.primary.quote_content}
        htmlSerializer={htmlSerializer}
      />
      {slice.primary.quote_attribution && (
        <cite>— {slice.primary.quote_attribution}</cite>
      )}
    </blockquote>
  );
};

export type QuoteSlice = t.TypeOf<typeof quoteSlice>;

export const quoteSlice = type({
  slice_type: t.literal('quote'),
  slice_label: t.union([t.string, t.null]),
  primary: t.type({
    quote_content: richTextBlock,
    quote_attribution: t.union([t.string, t.null]),
  }),
});
