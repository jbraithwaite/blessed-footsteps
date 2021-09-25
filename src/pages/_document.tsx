import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

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
          {canonicalDomain && plausibleDomain && (
            <>
              <script
                async
                defer
                data-domain={canonicalDomain.replace('www.', '')}
                src={`https://${plausibleDomain}/js/plausible.js`}
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html:
                    'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }',
                }}
              ></script>
            </>
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
