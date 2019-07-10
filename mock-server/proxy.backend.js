const BACKEND_SERVER = 'https://storefront.c39j2-walkersde1-d4-public.model-t.cc.commerce.ondemand.com/';

const PROXY_CONFIG = {
  '/rest': {
    target: BACKEND_SERVER,
    secure: false,
    changeOrigin: true,
    logLevel: 'error'
  },

  '/authorizationserver': {
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
  }
};

module.exports = PROXY_CONFIG;
