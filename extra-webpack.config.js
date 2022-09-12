const webpack = require('webpack');
const path = require('path');

const keyPrefix = 'CX_';
const env = {};

const keys = Object.keys(process.env).filter((key) =>
  key.startsWith(keyPrefix)
);

keys.forEach((key) => {
  const value = process.env[key];
  env[key] = value === 'true' ? true : value === 'false' ? false : value;
});

console.log('env=', env);

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'buildProcess.env': JSON.stringify(env),
    }),
  ],
  resolve: {
    alias: {
      '@commerce-storefront-toolset/styles': path.join(__dirname, 'projects/storefrontstyles'),
      '@commerce-storefront-toolset/user': path.join(__dirname, 'feature-libs/user'),
      '@commerce-storefront-toolset/organization': path.join(
        __dirname,
        'feature-libs/organization'
      ),
      '@commerce-storefront-toolset/product': path.join(__dirname, 'feature-libs/product'),
      '@commerce-storefront-toolset/product-configurator': path.join(
        __dirname,
        'feature-libs/product-configurator'
      ),
      '@commerce-storefront-toolset/storefinder': path.join(
        __dirname,
        'feature-libs/storefinder'
      ),
      '@commerce-storefront-toolset/checkout': path.join(__dirname, 'feature-libs/checkout'),
      '@commerce-storefront-toolset/asm': path.join(__dirname, 'feature-libs/asm'),
      '@commerce-storefront-toolset/smartedit': path.join(__dirname, 'feature-libs/smartedit'),
      '@commerce-storefront-toolset/qualtrics': path.join(__dirname, 'feature-libs/qualtrics'),
      '@commerce-storefront-toolset/tracking': path.join(__dirname, 'feature-libs/tracking'),
      '@commerce-storefront-toolset/cart': path.join(__dirname, 'feature-libs/cart'),
      '@commerce-storefront-toolset/order': path.join(__dirname, 'feature-libs/order'),
      '@commerce-storefront-toolset/epd-visualization': path.join(
        __dirname,
        'integration-libs/epd-visualization'
      ),
    },
  },
};
