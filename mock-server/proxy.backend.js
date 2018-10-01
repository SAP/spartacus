const BACKEND_SERVER = 'https://localhost:9002';

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
