import { GetStaticPaths, GetStaticProps } from 'next';
import {
  useGetStaticProps as SliceStaticProps,
  useGetStaticPaths as SliceStaticPaths,
} from 'next-slicezone/hooks';
import React from 'react';
import { Link } from 'components/elements';
import { Container } from 'components/layout';
import { Slices } from 'components/slices/Slices';
import { Header } from 'components/typography/Header';
import { client } from 'prismic/client';

const ChapterPage: React.FunctionComponent = (props: any) => {
  const title = props.data.chapter_title[0]?.text;

  return (
    <Container>
      {title && (
        <div className="sm:-mx-24 text-center mb-24">
          <Header rank="1" styleLevel="display-1">
            <Link name="toc" basic>
              <a>{title}</a>
            </Link>
          </Header>
        </div>
      )}
      <Slices slices={props.data.body} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = SliceStaticProps({
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
