// const httpProxy = require('http-proxy');
import * as Log from './Log';
//const Log = require('./Log');
// const ProxyServer = require('./Server');
import * as ProxyServer from './Server';
const Ssr = require('./Ssr');

// TODO: Use environment variable instead
// const BACKEND_BASE_URL = process.env.OCC_URL;
const BACKEND_BASE_URL = 'https://40.76.109.9:9002';
// const BACKEND_BASE_URL = 'https://20.83.184.244:9002';

describe('SSR E2E', () => {
  let server: any;
  const REQUEST_PATH = '/electronics-spa/en/USD/';

  beforeAll(async () => {
    Log.clearSsrLogFile();
    await Ssr.startSsrServer();
  });

  afterEach(async () => {
    await server.close();
  });

  //afterAll(async () => {
  //  await Ssr.killSsrServer();
  //});

  it('should receive success response with request', async () => {
    server = await ProxyServer.startProxyServer({
      target: BACKEND_BASE_URL,
    });
    const response: any = await ProxyServer.sendRequest(REQUEST_PATH);
    expect(response.statusCode).toEqual(200);

    // Rendering should not complete in the first request.
    // App should fall back to csr.
    Log.assertMessages([
      `Rendering started (${REQUEST_PATH})`,
      `Request is waiting for the SSR rendering to complete (${REQUEST_PATH})`,
    ]);
  });

  // Wait for SSR server to complete rendering.
  it('should complete rendering within a minute', async () => {
    await Log.waitUntilLogContainsText(`Rendering completed (${REQUEST_PATH})`);
    await Log.waitUntilLogContainsText(
      `Request is resolved with the SSR rendering result (${REQUEST_PATH})`
    );

    Log.assertMessages([
      `Rendering completed (${REQUEST_PATH})`,
      `Request is resolved with the SSR rendering result (${REQUEST_PATH})`,
    ]);
  });

  xit('should receive cached response with next request', async () => {
    server = await ProxyServer.startProxyServer({
      target: BACKEND_BASE_URL,
    });
    const response: any = await ProxyServer.sendRequest(REQUEST_PATH);
    expect(response.statusCode).toEqual(200);

    Log.assertMessages(['Render from cache (/)']);
  });

  xit('should receive 404 response when page is not existing', () => {});

  xit('should receive 500 error response with request', async () => {
    server = await ProxyServer.startProxyServer({
      target: BACKEND_BASE_URL,
      throwStatus: 500,
    });
    server.on('proxyRes', function (proxyRes: any) {
      proxyRes.statusCode = 500;
    });
    const response: any = await ProxyServer.sendRequest('/');
    expect(response.statusCode).toEqual(500);
  });

  // Note: Currently, the ssr server still responds with 200 quickly despite the proxy delay
  xit('should receive 500 error response with timed-out request', async () => {
    server = await ProxyServer.startProxyServer({
      target: BACKEND_BASE_URL,
      delay: 10000,
    });
    const response: any = await ProxyServer.sendRequest('/timeout');

    // Waits a time for server to timeout
    await new Promise((res) => setTimeout(res, 15000));

    // TODO: Assert ssr server log for timeout error
    Log.assertMessages(['timeout']);

    expect(response.statusCode).toEqual(500);
  }, 20000);
});
