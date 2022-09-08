import { Header } from '@atoms/Header';
import { createClient } from '@prismic/client';
import { GetStaticProps } from 'next';
import * as React from 'react';

export interface SfTourProps {
  locations: unknown;
}

export const SfTour: React.FunctionComponent<SfTourProps> = ({ locations }) => {
  return (
    <main className="max-w-full py-20 px-5 sm:px-24 sm:max-w-5xl sm:mx-auto">
      <Header rank="1" styleLevel="display-1">
        San Francisco Tour
      </Header>
      <pre>{JSON.stringify(locations, null, 2)}</pre>
    </main>
  );
};

export default SfTour;

export const getStaticProps: GetStaticProps<SfTourProps> = async ({
  previewData,
}) => {
  const client = createClient({ previewData });

  const locations = await client.getAllByType('tour_location', {
    orderings: { field: 'tour_sort_order', direction: 'asc' },
  });

  return {
    props: {
      locations,
    },
  };
};
