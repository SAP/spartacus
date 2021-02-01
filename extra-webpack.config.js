const webpack = require('webpack');

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
};
