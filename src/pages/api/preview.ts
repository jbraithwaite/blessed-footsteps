import { NextApiHandler } from 'next';
import { client } from 'prismic/client';
import { linkResolver } from 'prismic/router';

const preview: NextApiHandler = async (req, res) => {
  const { token: ref, documentId } = req.query;

  if (typeof ref !== 'string') {
    return res.status(401).json({ message: 'Invalid ref' });
  }

  if (typeof documentId !== 'string') {
    return res.status(401).json({ message: 'Invalid documentId' });
  }

  // Check the token parameter against the Prismic SDK
  const url = await client()
    .getPreviewResolver(ref, documentId)
    .resolve(linkResolver, '/');

  if (!url) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    ref, // pass the ref to pages so that they can fetch the draft ref
  });

  // Redirect the user to the share endpoint from same origin. This is
  // necessary due to a Chrome bug:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=696204
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`,
  );

  res.end();
};

export default preview;
