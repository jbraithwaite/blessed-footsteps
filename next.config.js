/** @type {import('next').NextConfig} */

const destination = `https://${process.env.PRISMIC_REPOSITORY_NAME}.prismic.io`;

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    PRISMIC_REPOSITORY_NAME: process.env.PRISMIC_REPOSITORY_NAME,
    PRISMIC_API_TOKEN: process.env.PRISMIC_API_TOKEN,
  },
  redirects: async () => {
    return [
      {
        source: '/admin',
        destination,
        permanent: false,
      },
    ];
  },
};
