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
    fallback: {
      '@spartacus/styles': path.join(__dirname, 'projects/storefrontstyles'),
      '@spartacus/user': path.join(__dirname, 'feature-libs/user'),
      '@spartacus/organization': path.join(
        __dirname,
        'feature-libs/organization'
      ),
      '@spartacus/product': path.join(__dirname, 'feature-libs/product'),
      '@spartacus/product-configurator': path.join(
        __dirname,
        'feature-libs/product-configurator'
      ),
      '@spartacus/storefinder': path.join(
        __dirname,
        'feature-libs/storefinder'
      ),
      '@spartacus/checkout': path.join(__dirname, 'feature-libs/checkout'),
      '@spartacus/asm': path.join(__dirname, 'feature-libs/asm'),
      '@spartacus/smartedit': path.join(__dirname, 'feature-libs/smartedit'),
      '@spartacus/qualtrics': path.join(__dirname, 'feature-libs/qualtrics'),
      '@spartacus/requested-delivery-date': path.join(
        __dirname,
        'feature-libs/requested-delivery-date'
      ),
      '@spartacus/tracking': path.join(__dirname, 'feature-libs/tracking'),
      '@spartacus/cart': path.join(__dirname, 'feature-libs/cart'),
      '@spartacus/order': path.join(__dirname, 'feature-libs/order'),
      '@spartacus/epd-visualization': path.join(
        __dirname,
        'integration-libs/epd-visualization'
      ),
      '@spartacus/customer-ticketing': path.join(
        __dirname,
        'feature-libs/customer-ticketing'
      ),
      '@spartacus/pickup-in-store': path.join(
        __dirname,
        'feature-libs/pickup-in-store'
      ),
      '@spartacus/s4om': path.join(__dirname, 'integration-libs/s4om'),
    },
  },
};
