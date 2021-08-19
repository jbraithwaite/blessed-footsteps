import { either } from 'fp-ts';
import gql from 'graphql-tag';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';
import { GetStaticProps } from 'next';
import { Elements } from 'prismic-reactjs';
import React from 'react';
import { Link } from 'components/elements';
import { Container } from 'components/layout';
import { createAnchor, Header } from 'components/typography/Header';
import { graphql } from 'prismic/client';
import { optional } from 'types/utils';

const TableOfContents: React.FunctionComponent<TableOfContentsProps> = ({
  allChapters,
}) => {
  return (
    <Container>
      <Header rank="1">
        <Link name="home">
          <a>Contents</a>
        </Link>
      </Header>
      <ol className="list-decimal">
        {allChapters.edges.map((chapter, i) => {
          const sections = chapter.node.body.filter(
            (p): p is t.TypeOf<typeof section> =>
              either.isRight(section.decode(p)),
          );

          const chapterUid = chapter.node._meta.uid;

          return (
            <li key={i}>
              <strong>
                {chapterUid ? (
                  <Link name="chapter" chapterUid={chapterUid} basic>
                    <a className="hover:underline">
                      {chapter.node.chapter_title[0].text}
                    </a>
                  </Link>
                ) : (
                  chapter.node.chapter_title[0].text
                )}
              </strong>

              {sections.map(({ primary }, key) => {
                const heading = primary.heading_content[0];
                const hash = createAnchor(heading.text);
                const className = styleMap[heading.type];

                return chapterUid ? (
                  <Link
                    name="chapter"
                    chapterUid={chapterUid}
                    basic
                    hash={hash}
                    key={key}
                  >
                    <a className={className}>{heading.text}</a>
                  </Link>
                ) : (
                  <div key={key} className={className}>
                    {heading.text}
                  </div>
                );
              })}
            </li>
          );
        })}
      </ol>
    </Container>
  );
};

export const getStaticProps: GetStaticProps<TableOfContentsProps> =
  async ({}) => {
    try {
      const { data } = await graphql.query({
        query: gql`
          query {
            allChapters(sortBy: chapter_number_ASC) {
              edges {
                node {
                  _meta {
                    uid
                  }
                  chapter_title
                  body {
                    __typename
                    ... on ChapterBodyHeading {
                      primary {
                        heading_content
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      });
      const validation = tocProps.decode(data);

      if (either.isLeft(validation)) {
        // eslint-disable-next-line no-console
        console.error('Validation failed', PathReporter.report(validation));
        return { notFound: true };
      } else {
        return { props: validation.right };
      }
    } catch (e) {
      return { notFound: true };
    }
  };

export default TableOfContents;

export type TableOfContentsProps = t.TypeOf<typeof tocProps>;

const section = t.type({
  __typename: t.literal('ChapterBodyHeading'),
  primary: t.type({
    heading_content: t.array(
      t.type({
        text: t.string,
        type: t.keyof({
          heading2: null,
          heading3: null,
          heading4: null,
        }),
      }),
    ),
  }),
});

const tocProps = t.type({
  allChapters: t.type({
    edges: t.array(
      t.type({
        node: t.type({
          _meta: t.type({
            uid: optional(t.string),
          }),
          chapter_title: t.array(
            t.type({
              text: t.string,
              type: t.keyof({
                heading1: null,
              }),
            }),
          ),
          body: t.array(
            t.union([
              t.type({
                __typename: t.string,
              }),
              section,
            ]),
          ),
        }),
      }),
    ),
  }),
});

const styleMap: Record<
  Elements.heading2 | Elements.heading3 | Elements.heading4,
  string
> = {
  [Elements.heading2]: 'block ml-4 mb-1 hover:underline',
  [Elements.heading3]: 'block ml-12 mb-1 hover:underline italic',
  [Elements.heading4]: 'block ml-18 mb-1 hover:underline italic',
};
