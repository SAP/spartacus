const httpProxy = require('http-proxy');
const http = require('http');
const fs = require('fs');

const proxy = httpProxy.createProxyServer({ secure: false });

// TODO: Use environment variable instead
// const BACKEND_BASE_URL = process.env.OCC_URL;
const BACKEND_BASE_URL = 'https://40.76.109.9:9002';

const SSR_LOG_PATH = './ssr-e2e/ssr.log';

const REQUEST_OPTIONS = {
  host: 'localhost',
  port: 4000,
};

describe('SSR E2E', () => {
  let server;

  beforeAll(async () => {
    // Hacky way to make sure server starts
    await new Promise((res) => setTimeout(res, 30000));

    clearSsrLogFile();
  }, 35000);

  afterEach(async () => {
    await server.close();
  });

  it('should receive success response with request', async () => {
    server = await startProxyServer({
      target: BACKEND_BASE_URL,
    });
    const response = await sendRequest('/');
    expect(response.statusCode).toEqual(200);

    // Rendering should not complete in the first request.
    // App should fall back to csr.
    assertMessages([
      'Rendering started (/)',
      'Request is waiting for the SSR rendering to complete (/)',
    ]);
  });

  // Wait for SSR server to complete rendering.
  it('should complete rendering', async () => {
    // Waits a time for rendering to finish
    await new Promise((res) => setTimeout(res, 15000));

    assertMessages([
      'Rendering started (/)',
      'Request is waiting for the SSR rendering to complete (/)',
      'Rendering completed (/)',
    ]);
  }, 20000);

  it('should receive cached response with next request', async () => {
    server = await startProxyServer({
      target: BACKEND_BASE_URL,
    });
    const response = await sendRequest('/');
    expect(response.statusCode).toEqual(200);

    assertMessages([
      'Rendering started (/)',
      'Request is waiting for the SSR rendering to complete (/)',
      'Rendering completed (/)',
      'Render from cache (/)',
    ]);
  });

  xit('should receive 500 error response with request', async () => {
    server = await startProxyServer({
      target: BACKEND_BASE_URL,
      throwStatus: 500,
    });
    server.on('proxyRes', function (proxyRes, req, res) {
      proxyRes.statusCode = 500;
    });
    const response = await sendRequest('/');
    expect(response.statusCode).toEqual(500);
  });

  // Note: Currently, the ssr server still responds with 200 quickly despite the proxy delay
  xit('should receive 500 error response with timed-out request', async () => {
    server = await startProxyServer({
      target: BACKEND_BASE_URL,
      delay: 10000,
    });
    const response = await sendRequest('/timeout');

    // Waits a time for server to timeout
    await new Promise((res) => setTimeout(res, 15000));

    // TODO: Assert ssr server log for timeout error
    assertMessages(['timeout']);

    expect(response.statusCode).toEqual(500);
  }, 20000);
});

/**
 * @param {Object} options Setup options for proxy server.
 * @param {string} options.target The url to reroute requests to.
 * @param {number} options.delay Number of seconds to delay requests before sending.
 * @param {number} options.throwStatus Number of status code to set response to.
 */
async function startProxyServer(options) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const forwardRequest = () =>
        proxy.web(req, res, { target: options.target });

      if (options.throwStatus) {
        proxy.on('proxyRes', (proxyRes, req, res) => {
          proxyRes.statusCode = options.throwStatus;
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

function clearSsrLogFile() {
  fs.writeFileSync(SSR_LOG_PATH, '');
}

function getLogMessages() {
  const data = fs.readFileSync(SSR_LOG_PATH);
  console.log(data, data.toString()); // TODO: Temp read log in ci
  const messages = data
    .toString()
    .split('\n')
    .filter((text) => text.indexOf('"message":') > -1)
    .map((text) => text.split('":"')[1].split('",')[0]);
  return messages;
}

function assertMessages(expected) {
  const messages = getLogMessages();
  console.log(messages);
  expect(messages).toEqual(expected);
}
