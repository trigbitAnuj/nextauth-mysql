const { config } = require("process");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, context) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      use: [require.resolve("graphql-tag/loader")],
    });
    return config;
  },
};

module.exports = nextConfig;
