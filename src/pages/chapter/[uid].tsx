import { GetStaticPaths, GetStaticProps } from 'next';
import {
  useGetStaticProps as SliceStaticProps,
  useGetStaticPaths as SliceStaticPaths,
} from 'next-slicezone/hooks';
import React from 'react';
import { Link } from 'components/elements';
import { Page } from 'components/layout';
import { Slices } from 'components/slices/Slices';
import { UnknownSlice } from 'components/slices/types';
import { Header } from 'components/typography/Header';
import { client } from 'prismic/client';
import { usePreview } from 'prismic/hooks';
import * as types from 'prismic/types';

const ChapterPage: React.FunctionComponent<ChapterPageProps> = (props) => {
  usePreview(props.id, props.previewData?.ref);

  const title = props.data.chapter_title[0]?.text;
  const hero = props.data.chapter_hero;

  return (
    <Page>
      {'url' in hero && (
        <div
          className="app-hero"
          style={{ backgroundImage: `url(${hero.url})` }}
        ></div>
      )}
      {title && (
        <div className="text-center mb-24 bg-white sm:max-w-5xl pt-10 sm:pt-12">
          <Header rank="1" styleLevel="display-1">
            <Link name="toc" basic>
              <a>{title}</a>
            </Link>
          </Header>
        </div>
      )}
      <Slices slices={props.data.body} />
    </Page>
  );
};

export const getStaticProps: GetStaticProps<ChapterPageProps> =
  SliceStaticProps({
    client: client(),
    queryType: 'repeat',
    type: 'chapter',
    apiParams: ({ params }) => {
      return {
        uid: params.uid,
      };
    },
  });

export const getStaticPaths: GetStaticPaths = SliceStaticPaths({
  client: client(),
  type: 'chapter',
  apiParams: ({ params }) => {
    return {
      uid: params.uid,
    };
  },
  formatPath: ({ uid }) => {
    return {
      params: {
        uid,
      },
    };
  },
});

export default ChapterPage;

export interface ChapterPageProps {
  data: {
    body: UnknownSlice[];
    chapter_title: types.TitleBlock;
    chapter_hero: {} | types.Image;
  };
  preview: boolean | null;
  previewData: { ref?: string };
  type: string;
  id: string;
  uid: string;
  url: string;
  linked_documents: unknown[];
}
