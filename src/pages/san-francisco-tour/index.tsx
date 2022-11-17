import { Link } from '@atoms/Link';
import { createClient } from '@prismic/client';
import { TourLocationDocument } from '@prismic/types.generated';
import { PrismicImage, PrismicRichText } from '@prismicio/react';
import { GetStaticProps } from 'next';
import * as React from 'react';

export interface SfTourProps {
  locations: TourLocation[];
}

export const SfTour: React.FunctionComponent<SfTourProps> = ({ locations }) => {
  return (
    <main className="max-w-full py-20 px-5 sm:mx-auto sm:max-w-5xl sm:px-24">
      <div className="prose-sm mb-10 sm:prose lg:prose-lg xl:prose-xl">
        <h1>Remembering &#39;Abdu&#39;l-Bahá’s Time in San Francisco, 1912</h1>
      </div>

      <div className="flex max-w-3xl flex-col space-y-16">
        {locations.map(
          ({ uid, id, data: { tour_title, tour_blub, tour_main_image } }) =>
            tour_title[0]?.text ? (
              <article className="md:grid md:grid-cols-4 md:items-baseline">
                <div className="group relative flex flex-col items-start md:col-span-3">
                  <h2 className="text-base font-semibold tracking-tight text-zinc-800 ">
                    <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100  sm:-inset-x-6 sm:rounded-2xl"></div>
                    <Link name="sfTourLocation" tourLocationUid={uid} key={id}>
                      <a>
                        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                        <span className="relative z-10">
                          {tour_title[0].text}
                        </span>
                      </a>
                    </Link>
                  </h2>
                  <div className="relative z-10 order-first mb-3 flex items-center md:hidden">
                    <PrismicImage field={tour_main_image} />
                  </div>
                  {tour_blub && (
                    <span className="relative z-10 mt-2 text-sm text-zinc-600 ">
                      <PrismicRichText field={tour_blub} />
                    </span>
                  )}

                  <div
                    aria-hidden="true"
                    className="text--700 relative z-10 mt-4 flex items-center text-sm font-medium"
                  >
                    Read article
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="ml-1 h-4 w-4 stroke-current"
                    >
                      <path
                        d="M6.75 5.75 9.25 8l-2.5 2.25"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="relative z-10 order-first mt-1 mb-3 hidden items-center pr-10 md:block">
                  <PrismicImage field={tour_main_image} />
                </div>
              </article>
            ) : null,
        )}
      </div>
    </main>
  );
};

export default SfTour;

export const getStaticProps: GetStaticProps<SfTourProps> = async ({
  previewData,
}) => {
  const client = createClient({ previewData });

  try {
    const locations = (await client.getAllByType('tour_location', {
      orderings: { field: 'tour_sort_order', direction: 'asc' },
      fetch: [
        'tour_location.tour_title',
        'tour_location.tour_blub',
        'tour_location.tour_main_image',
      ],
    })) as TourLocation[];
  } catch (e) {
    console.log(e);

    return {
      props: {
        locations: [],
      },
    };
  }

  return {
    props: {
      locations,
    },
  };
};

type TourLocation = Omit<TourLocationDocument, 'data'> & {
  data: Pick<
    TourLocationDocument['data'],
    'tour_title' | 'tour_blub' | 'tour_main_image'
  >;
};
