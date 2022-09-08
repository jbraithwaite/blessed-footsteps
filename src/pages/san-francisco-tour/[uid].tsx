import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { PrismicRichText, PrismicText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import { TourLocationDocument } from '@prismic/types.generated';
import { Page } from '@molecules/Page';
import { createClient, linkResolver } from '@prismic/client';

export interface TourLocationPageProps {
  page: TourLocationDocument;
}
export interface TourLocationPageParams {
  [key: string]: string;
  uid: string;
}

const TourLocationPage: React.FunctionComponent<TourLocationPageProps> = ({
  page,
}) => {
  // page.data.;
  return (
    <Page>
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <h1>
          <PrismicText field={page.data.tour_title} />
        </h1>
        <PrismicRichText field={page.data.tour_content} />
        <pre>
          <code>{JSON.stringify(page, null, 4)}</code>
        </pre>
      </div>
      <hr />
      <p>The raw page:</p>
    </Page>
  );
};

export default TourLocationPage;

export const getStaticProps: GetStaticProps<
  TourLocationPageProps,
  TourLocationPageParams
> = async ({ params, previewData }) => {
  const client = createClient({ previewData });

  const uid = params?.uid;

  if (!uid) {
    return {
      notFound: true,
    };
  }

  const page = await client.getByUID<TourLocationDocument>(
    'tour_location',
    uid,
  );

  return {
    props: {
      page,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createClient();

  const pages = await client.getAllByType<TourLocationDocument>(
    'tour_location',
  );
  const paths = pages
    .map((page) => prismicH.asLink(page, linkResolver))
    .filter((path): path is NonNullable<typeof path> => Boolean(path));

  return {
    paths,
    fallback: false,
  };
};
