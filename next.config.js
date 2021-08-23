/** @type {import('next').NextConfig} */
require('dotenv').config();

const withTM = require('next-transpile-modules')(['next-slicezone']);
module.exports = withTM({
  reactStrictMode: true,
  trailingSlash: true,
});
