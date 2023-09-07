const httpProxy = require('http-proxy');
const Log = require('./Log');
const ProxyServer = require('./Server');
const Ssr = require('./Ssr');

const proxy = httpProxy.createProxyServer({ secure: false });

// TODO: Use environment variable instead
// const BACKEND_BASE_URL = process.env.OCC_URL;
const BACKEND_BASE_URL = 'https://40.76.109.9:9002';
// const BACKEND_BASE_URL = 'https://20.83.184.244:9002';

describe('SSR E2E', () => {
  let server;

  beforeAll(async () => {
    Log.clearSsrLogFile();
    await Ssr.startSsrServer();
  });

  afterEach(async () => {
    await server.close();
  });

  afterAll(async () => {
    await Ssr.killSsrServer();
  });

  it('should receive success response with request', async () => {
    server = await ProxyServer.startProxyServer({
      target: BACKEND_BASE_URL,
    });
    const response = await ProxyServer.sendRequest('/');
    expect(response.statusCode).toEqual(200);

    // Rendering should not complete in the first request.
    // App should fall back to csr.
    Log.assertMessages([
      'Rendering started (/)',
      'Request is waiting for the SSR rendering to complete (/)',
    ]);
  });

  // Wait for SSR server to complete rendering.
  it('should complete rendering within a minute', async () => {
    // Waits a time for rendering to finish
    await Log.waitUntilLogContainsText('Rendering completed (/)');

    Log.assertMessages(['Rendering completed (/)']);
  }, 20000);

  it('should receive cached response with next request', async () => {
    server = await ProxyServer.startProxyServer({
      target: BACKEND_BASE_URL,
    });
    const response = await ProxyServer.sendRequest('/');
    expect(response.statusCode).toEqual(200);

    Log.assertMessages(['Render from cache (/)']);
  });

  xit('should receive 500 error response with request', async () => {
    server = await startProxyServer({
      target: BACKEND_BASE_URL,
      throwStatus: 500,
    });
    server.on('proxyRes', function (proxyRes, req, res) {
      proxyRes.statusCode = 500;
    });
    const response = await ProxyServer.sendRequest('/');
    expect(response.statusCode).toEqual(500);
  });

  // Note: Currently, the ssr server still responds with 200 quickly despite the proxy delay
  xit('should receive 500 error response with timed-out request', async () => {
    server = await startProxyServer({
      target: BACKEND_BASE_URL,
      delay: 10000,
    });
    const response = await ProxyServer.sendRequest('/timeout');

    // Waits a time for server to timeout
    await new Promise((res) => setTimeout(res, 15000));

    // TODO: Assert ssr server log for timeout error
    Log.assertMessages(['timeout']);

    expect(response.statusCode).toEqual(500);
  }, 20000);
});
