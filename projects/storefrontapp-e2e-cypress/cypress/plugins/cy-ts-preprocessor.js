const wp = require('@cypress/webpack-preprocessor');
const webpack = require('webpack');

const webpackOptions = {
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      util: false,
      url: false,
      assert: false,
      domain: false,
      os: false,
      child_process: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^node:(.*)$/, (resource) => {
      resource.request = resource.request.replace(/^node:/, '');
    }),
  ],
};

const options = {
  webpackOptions,
};

module.exports = wp(options);
