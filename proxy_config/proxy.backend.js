/**
 * This file allows you to get the data from a real backend server.
 */

const BACKEND_SERVER = 'https://backoffice.christian-spartacus1-s2-public.model-t.myhybris.cloud/';

const PROXY_CONFIG = {
  '/rest': {
    target: BACKEND_SERVER,
    secure: false,
    changeOrigin: true,
    logLevel: 'error'
  },

  '/medias': {
    target: BACKEND_SERVER,
    secure: false,
    changeOrigin: true,
    logLevel: 'error'
  },

  '/authorizationserver': {
      target: BACKEND_SERVER,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
          "^/authorizationserver": "/oauth2"
      },
      logLevel: 'error'
  }
    
};

module.exports = PROXY_CONFIG;
