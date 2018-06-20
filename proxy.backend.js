const BACKEND_SERVER = 'https://dev-com-17.accdemo.b2c.ydev.hybris.com:9002';

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
