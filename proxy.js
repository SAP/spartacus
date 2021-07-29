var BACKEND_SERVER = 'https://electronics.local:9002/';

var PROXY_CONFIG = {
  context: ['/yacceleratorstorefront/'],
  logLevel: 'debug',
  target: BACKEND_SERVER,
  secure: false,
};

module.exports = PROXY_CONFIG;
