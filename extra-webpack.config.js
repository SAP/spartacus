const webpack = require('webpack');
const path = require('path');

const keyPrefix = 'CX_';

let env = {};

const keys = Object.keys(process.env).filter((key) =>
  key.startsWith(keyPrefix)
);

keys.forEach((key) => (env[key] = process.env[key]));

console.log('env=', env);

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'buildProcess.env': JSON.stringify(env),
    }),
  ],
  resolve: {
    alias: {
      '@spartacus/styles': path.join(__dirname, 'projects/storefrontstyles'),
    },
  },
};
