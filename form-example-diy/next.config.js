const { resolve } = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.actions\.ts$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: resolve(__dirname, "loader.js"),
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
