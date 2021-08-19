import * as t from 'io-ts';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { SliceProps } from './types';
import { label, richTextBlock, titleBlock } from 'prismic/types';
import { type } from 'types/utils';

export const Audio: React.FunctionComponent<SliceProps<AudioSlice>> = ({
  slice,
}) => {
  const title = slice.primary.audio_title[0]?.text;

  return (
    <figure className="bg-gray-50 rounded-lg px-10 py-7 my-5">
      <figcaption className="font-bold mb-5">{title}</figcaption>
      <audio controls src={slice.primary.audio_clip.url} className="mb-5">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <RichText render={slice.primary.audio_description} />
    </figure>
  );
};

export type AudioSlice = t.TypeOf<typeof audioSlice>;

const audioClip = type({
  kind: t.literal('document'),
  link_type: t.literal('Media'),
  name: t.string,
  size: t.string,
  url: t.string,
});

export const audioSlice = type({
  slice_type: t.literal('audio_clip'),
  slice_label: label,
  primary: t.type({
    audio_clip: audioClip,
    audio_description: richTextBlock,
    audio_title: titleBlock,
  }),
});
