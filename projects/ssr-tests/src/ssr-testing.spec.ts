import * as Log from './log.utils';
import * as ProxyServer from './proxy.utils';
import * as Ssr from './ssr.utils';

const BACKEND_BASE_URL: string = process.env.CX_BASE_URL || '';

describe('SSR E2E', () => {
  let proxy: any;
  const REQUEST_PATH = '/electronics-spa/en/USD/';

  beforeEach(async () => {
    Log.clearSsrLogFile();
    await Ssr.startSsrServer();
  });

  afterEach(async () => {
    await proxy.close();
    await Ssr.killSsrServer();
  });

  it('should receive success response with request', async () => {
    proxy = await ProxyServer.startProxyServer({
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

  it('should receive 404 response when page is not existing', async () => {
    proxy = await ProxyServer.startProxyServer({
      target: BACKEND_BASE_URL,
    });
    const response: any = await ProxyServer.sendRequest(
      REQUEST_PATH + '/not-existing-page'
    );
    expect(response.statusCode).toEqual(404);
  });

  it('should receive 500 error response when a backend API returned server error', async () => {
    proxy = await ProxyServer.startProxyServer({
      target: BACKEND_BASE_URL,
      throwStatus: 500,
    });
    const response: any = await ProxyServer.sendRequest('/');
    expect(response.statusCode).toEqual(500);
  });
});
