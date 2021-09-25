import { either } from 'fp-ts';
import { PathReporter } from 'io-ts/PathReporter';
import * as React from 'react';
import { Audio } from './Audio';
import { Content } from './Content';
import { Heading } from './Heading';
import { Quote } from './Quote';
import { isKnownSlice, knownSlice, Slice } from './types';
import { useLogger } from 'src/hooks/logger';

export const Slices: React.FunctionComponent<SlicesProps> = ({ slices }) => {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      {slices.map((slice, index) => (
        <SingleSlice slice={slice} key={index} />
      ))}
    </div>
  );
};

export interface SlicesProps {
  slices: Slice[];
}

const SingleSlice: React.FunctionComponent<{ slice: Slice }> = ({ slice }) => {
  const logger = useLogger();

  if (!isKnownSlice(slice)) {
    logger.error('Unknown slice', { extra: { type: slice.slice_type } });
    return null;
  }

  const validation = knownSlice.decode(slice);

  if (either.isLeft(validation)) {
    logger.error('validation failed', {
      extra: {
        type: slice.slice_type,
        report: PathReporter.report(validation),
      },
    });
    return null;
  }

  switch (validation.right.slice_type) {
    case 'heading':
      return <Heading slice={validation.right} />;
    case 'quote':
      return <Quote slice={validation.right} />;
    case 'content':
      return <Content slice={validation.right} />;
    case 'audio_clip':
      return <Audio slice={validation.right} />;
  }
};
