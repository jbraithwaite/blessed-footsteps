const destination = `https://${process.env.PRISMIC_REPOSITORY_NAME}.prismic.io`;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    PRISMIC_REPOSITORY_NAME: process.env.PRISMIC_REPOSITORY_NAME,
    PRISMIC_API_TOKEN: process.env.PRISMIC_API_TOKEN,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    images: {
      unoptimized: true,
    },
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
