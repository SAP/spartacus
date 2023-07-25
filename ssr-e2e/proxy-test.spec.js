const httpProxy = require('http-proxy');
const http = require('http');

const proxy = httpProxy.createProxyServer({ secure: false });

// TODO: Use environment variable instead
// const BACKEND_BASE_URL = process.env.OCC_URL;
const BACKEND_BASE_URL = 'https://40.76.109.9:9002';

const REQUEST_OPTIONS = {
  host: 'localhost',
  port: 4201,
};

describe('SSR E2E', () => {
  let server;

  afterEach(async () => {
    await server.close();
  });

  it('should receive success response with request', async () => {
    server = await startProxyServer({
      target: BACKEND_BASE_URL,
    });
    const response = await sendRequest('/');
    expect(response.statusCode).toEqual(200);
  });

  it('should receive 500 error response with request', async () => {
    server = await startProxyServer({
      target: BACKEND_BASE_URL,
      throwStatus: 500,
    });
    server.on('proxyRes', function (proxyRes, req, res) {
      proxyRes.statusCode = 500;
      console.log(proxyRes.statusCode);
    });
    const response = await sendRequest('/');
    expect(response.statusCode).toEqual(500);

    // TODO: Assert ssr server log for error
  });

  // Note: Currently, the ssr server still responds with 200 quickly despite the proxy delay
  it('should receive 500 error response with timed-out request', async () => {
    server = await startProxyServer({
      target: BACKEND_BASE_URL,
      delay: 10000,
    });
    const response = await sendRequest('/');
    expect(response.statusCode).toEqual(500);

    // TODO: Assert ssr server log for timeout error
  }, 15000);
});

/**
 * @param {Object} options Setup options for proxy server.
 * @param {string} options.target The url to reroute requests to.
 * @param {number} options.delay Number of seconds to delay requests before sending.
 * @param {number} options.throwStatus Number of status code to set response to.
 */
async function startProxyServer(options) {
  return new Promise((resolve) => {
    const server = http.createServer(function (req, res) {
      const forwardRequest = () =>
        proxy.web(req, res, { target: options.target });

      if (options.throwStatus) {
        proxy.on('proxyRes', function (proxyRes, req, res) {
          proxyRes.statusCode = options.throwStatus;
          console.log(proxyRes.statusCode);
        });
      }

      if (options.delay) {
        setTimeout(forwardRequest, options.delay);
      } else {
        forwardRequest();
      }
    });

    server.listen(9002, () => {
      resolve(server);
    });
  });
}

// TODO: Assert ssr server receives request and sends to proxy server
async function sendRequest(path) {
  return new Promise((resolve) => {
    var req = http.get({ ...REQUEST_OPTIONS, path }, function (res) {
      // Buffer the body entirely for processing as a whole.
      var bodyChunks = [];
      res
        .on('data', function (chunk) {
          bodyChunks.push(chunk);
        })
        .on('end', () => {
          return resolve(res);
        });
    });

    req.on('error', function (e) {
      console.log('ERROR: ' + e.message);
    });
  });
}
