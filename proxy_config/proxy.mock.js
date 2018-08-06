/**
 * This file allows you to get the data from a local mock server.
 */

const MOCK_SERVER = 'http://localhost:3000';

const PROXY_CONFIG = {
  '/rest': {
    target: MOCK_SERVER,
    secure: false,
    changeOrigin: true,
    logLevel: 'error'
  },

  '/medias': {
    target: MOCK_SERVER,
    secure: false,
    changeOrigin: true,
    logLevel: 'error'
  }
};

module.exports = PROXY_CONFIG;
