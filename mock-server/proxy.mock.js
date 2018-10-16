const BACKEND_SERVER = 'http://localhost:3000';

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
  }
};

module.exports = PROXY_CONFIG;
