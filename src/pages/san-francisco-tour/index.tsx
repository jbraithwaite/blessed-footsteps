import { Link } from '@atoms/Link';
import { createClient } from '@prismic/client';
import { TourLocationDocument } from '@prismic/types.generated';
import { PrismicImage, PrismicRichText } from '@prismicio/react';
import { GetStaticProps } from 'next';
import * as React from 'react';
import { Map, Marker } from '../../components/molecules/Map';

import { DM_Serif_Display } from '@next/font/google';
import { Wrapper } from '@googlemaps/react-wrapper';
import { defined } from '@utils/function';

const font = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
});

export interface SfTourProps {
  locations: TourLocation[];
}

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const sanFranciscoPosition = { lat: 37.7576948, lng: -122.4726192 };

export const SfTour: React.FunctionComponent<SfTourProps> = ({ locations }) => {
  const [currentLocation, setCurrentLocation] = React.useState<
    string | undefined
  >();

  React.useEffect(() => {
    if (currentLocation) {
      console.log({ currentLocation });
    }
  }, [currentLocation]);

  const positions = React.useMemo(() => {
    return locations
      .map(({ data: { tour_coords }, uid }) =>
        tour_coords?.latitude && tour_coords?.longitude
          ? { lat: tour_coords.latitude, lng: tour_coords.longitude, uid }
          : undefined,
      )
      .filter(defined);
  }, [locations]);

  return (
    <main className=" bg-neutral-100">
      <section className="flex h-[100vh] justify-center bg-[url('/ferry-building-san-francisco-1912-mobile.jpg')] bg-cover bg-center bg-no-repeat text-center md:bg-[url('/ferry-building-san-francisco-1912.jpg')]	md:bg-left ">
        <h1
          className={`${font.className} max-w-5xl bg-gradient-to-t from-gray-600 to-gray-400 bg-clip-text pt-5 text-5xl text-transparent drop-shadow invert-0 sm:text-7xl md:pt-16 md:text-8xl lg:pt-20`}
        >
          Remembering{' '}
          <span className="whitespace-nowrap">&#39;Abdu&#39;l-Bahá’s</span> Time
          in <span className="whitespace-nowrap">San Francisco</span>, 1912
        </h1>
      </section>
      <section className="container mx-auto grid grid-cols-1 gap-4 pt-5 md:grid-cols-3 lg:grid-cols-4">
        {locations.map(
          ({ uid, id, data: { tour_title, tour_blub, tour_main_image } }) =>
            tour_title[0]?.text ? (
              <article key={id}>
                <div className="max-w-md rounded-lg bg-white py-4 px-8 shadow-lg">
                  {/* <div>
                    <img src="https://via.placeholder.com/150" alt="" />
                  </div> */}
                  <div>
                    <h2 className={`text-3xl text-gray-800 ${font.className}`}>
                      {tour_title[0].text}
                    </h2>
                    {tour_blub && (
                      <div className="mt-2 text-gray-600">
                        <PrismicRichText field={tour_blub} />
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link name="sfTourLocation" tourLocationUid={uid}>
                      <a
                        href="#"
                        className="text-xl font-medium text-indigo-500"
                      >
                        Learn More
                      </a>
                    </Link>
                  </div>
                </div>

                {/* <PrismicImage field={tour_main_image} /> */}
              </article>
            ) : null,
        )}
      </section>
      {googleMapsApiKey && (
        <Wrapper
          apiKey={googleMapsApiKey}
          render={(status: string) => <div>{status}</div>}
        >
          <Map
            center={sanFranciscoPosition}
            zoom={12}
            style={{ width: '100%', height: '100vh' }}
          >
            {positions.map(({ lat, lng, uid }, i) => (
              <Marker
                key={uid}
                position={{ lat, lng }}
                clickable
                label={`${i + 1}`}
                onClick={() => {
                  setCurrentLocation(uid);
                }}
              />
            ))}
          </Map>
        </Wrapper>
      )}
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
        'tour_location.tour_coords',
      ],
    })) as TourLocation[];

    return {
      props: {
        locations,
      },
    };
  } catch (e) {
    return {
      props: {
        locations: [],
      },
    };
  }
};

type TourLocation = Omit<TourLocationDocument, 'data'> & {
  data: Pick<
    TourLocationDocument['data'],
    'tour_title' | 'tour_blub' | 'tour_main_image' | 'tour_coords'
  >;
};
