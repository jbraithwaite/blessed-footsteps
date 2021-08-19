import * as t from 'io-ts';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { SliceProps } from './types';
import { htmlSerializer } from 'prismic/serializer';
import { richTextBlock } from 'prismic/types';
import { type } from 'types/utils';

export const Content: React.FunctionComponent<SliceProps<ContentSlice>> = ({
  slice,
}) => {
  return (
    <RichText
      render={slice.primary.slice_content}
      htmlSerializer={htmlSerializer}
    />
  );
};

export type ContentSlice = t.TypeOf<typeof contentSlice>;

export const contentSlice = type({
  slice_type: t.literal('content'),
  slice_label: t.union([t.string, t.null]),
  primary: t.type({
    slice_content: richTextBlock,
  }),
});
