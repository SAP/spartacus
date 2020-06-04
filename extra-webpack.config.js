const webpack = require('webpack');

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
};
