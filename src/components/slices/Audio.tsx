import * as t from 'io-ts';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { SliceProps } from './types';
import { label, richTextBlock, titleBlock } from 'prismic/types';
import { useLogger } from 'src/hooks/logger';
import { type } from 'types/utils';

export const Audio: React.FunctionComponent<SliceProps<AudioSlice>> = ({
  slice,
}) => {
  const logger = useLogger();

  const title = slice.primary.audio_title[0];

  if (!title) {
    logger.warn('`audio_title` missing content');
    return null;
  }

  return (
    <figure className="bg-white rounded-lg px-3 sm:px-10 py-7 my-12 filter drop-shadow-2xl print:hidden">
      <figcaption className="font-bold">{title.text}</figcaption>
      <audio controls src={slice.primary.audio_clip.url}>
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
