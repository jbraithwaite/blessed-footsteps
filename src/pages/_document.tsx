import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { PRISMIC_REPOSITORY_NAME } from 'prismic/client';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const canonicalDomain = process.env.CANONICAL_DOMAIN;
    const plausibleDomain = process.env.PLAUSIBLE_DOMAIN;

    return (
      <Html>
        <Head>
          <script
            async
            defer
            src={`https://static.cdn.prismic.io/prismic.js?new=true&repo=${PRISMIC_REPOSITORY_NAME}`}
          ></script>
          {canonicalDomain && plausibleDomain && (
            <script
              async
              defer
              data-domain={canonicalDomain.replace('www.', '')}
              src={`https://${plausibleDomain}/js/plausible.js`}
            ></script>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
