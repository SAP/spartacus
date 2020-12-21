const webpack = require('webpack');
const path = require('path');

const keyPrefix = 'SPARTACUS_';

let env = {};

const keys = Object.keys(process.env).filter((key) =>
  key.startsWith(keyPrefix)
);

keys.forEach((key) => (env[key] = JSON.stringify(process.env[key])));

console.log('env=', env);

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'build.process.env': env,
    }),
  ],
  resolve: {
    alias: {
      '@spartacus/styles': path.join(__dirname, 'projects/storefrontstyles'),
    },
  },
};
