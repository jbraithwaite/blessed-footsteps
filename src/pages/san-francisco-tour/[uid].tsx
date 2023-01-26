import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { PrismicImage, PrismicRichText, PrismicText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import { TourLocationDocument } from '@prismic/types.generated';
import { Page } from '@molecules/Page';
import { createClient, linkResolver } from '@prismic/client';
import { useRouter } from '@hooks/useRouter';

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
  const { push } = useRouter();
  return (
    <Page>
      <div></div>
      {/* <div className="prose prose-sm px-3 sm:prose sm:px-0 lg:prose-lg xl:prose-xl"></div> */}
      <div className="prose-sm mt-5 px-3 sm:prose sm:px-0 md:mt-20 lg:prose-lg xl:prose-xl">
        <button
          type="button"
          aria-label="Go back to tour locations"
          className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:left-5 lg:mb-0 lg:-mt-2 xl:mt-0"
          onClick={() => {
            push({ name: 'sfTour' });
          }}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
          >
            <path
              d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <h6>
          <small>
            <i>
              Remembering &#39;Abdu&#39;l-Bahá’s Time in San Francisco, 1912
            </i>
          </small>
        </h6>
        <h1>
          <PrismicText field={page.data.tour_title} />
        </h1>

        <PrismicImage
          field={page.data.tour_main_image}
          className="md:ml-[-10%] md:max-w-[120%]"
        />

        <PrismicRichText field={page.data.tour_content} />
        <hr />
        <footer className="text-center  text-gray-300">
          © {new Date().getFullYear()} Blessed Footsteps
        </footer>
      </div>
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
