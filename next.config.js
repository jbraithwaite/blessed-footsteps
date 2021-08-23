/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['next-slicezone']);
module.exports = withTM({
  reactStrictMode: true,
  trailingSlash: true,
});
