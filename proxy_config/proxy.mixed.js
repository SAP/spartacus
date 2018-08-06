/**
 *  For development purposes, we use data from Hybris cloud backend,
 *  but for every endpoint, we managed to mock, we use said mock.
 */

const BACKEND_SERVER = 'https://backoffice.christian-spartacus1-s2-public.model-t.myhybris.cloud/';
const MOCK_SERVER = 'http://localhost:3000';
let PROXY_CONFIG = {};

// The list of all endpoints paths, we already mocked
const endpointsMocked = [
  '/rest/v2/electronics/products'
];

// Every created endpoint mock, is set in proxy configuration
for (const endpoint of endpointsMocked) {
  PROXY_CONFIG[endpoint] = {
    target: MOCK_SERVER
  }
}

// At the end, we have to set basic paths/routes, to use Hybris cloud backend
// NOTE: in PROXY_CONFIG, the order of element, does matter
Object.assign(PROXY_CONFIG, {
  '/rest': {
    target: BACKEND_SERVER,
    secure: false,
    changeOrigin: true,
    logLevel: 'debug'
  },

  '/medias': {
    target: BACKEND_SERVER,
    secure: false,
    changeOrigin: true,
    logLevel: 'error'
  }
})

module.exports = PROXY_CONFIG;
